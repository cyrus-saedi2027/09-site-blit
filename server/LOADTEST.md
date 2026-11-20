# Load test of the waiting room + seat desk (round AD)

What was tested: `queue-engine.js` + `server.js` (Node 22, no packages) against `loadgen.js` virtual buyers, in one 4-core / 16 GB sandbox (server = one process, one core; the buyers = three other processes).
Every virtual buyer does what a real one does: joins the line, polls for its turn (the server tells it how long to wait: 1–15 s with jitter, by distance), looks at the seat map (a few seconds old: that is what makes seat clashes real), holds 1–8 seats, pays (7 % fail) or abandons (8 % leave the line, some leave before paying).
`SCALE=4` means **every wait is four times shorter** (so the server sees four times the requests per buyer, and a 90 s run is ≈ 6 minutes of a real sale). It is a harder test than real life, not an easier one. The first run (`s1`) is real-time (`SCALE=1`).
Raw logs: `results/*.log` (the JSON at the end of each is the verdict). Re-run: `./run-scenarios.sh` (≈ 15 min), then `node summarize.js results/*.log`.

## Results

| run | people | seats | room (inside at once) | requests/s avg / peak | server CPU (of ONE core) | RAM | loop lag p99 | errors | seats sold | seat clashes per order | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| s1 (real time) | 50 000 | 3 000 | adaptive ≤ 500 | 4 100 / 6 400 | 24–37 % | 108 MB | 2 ms | 0 | 2 488 in 300 s | 1.8 | audit ok |
| a1 | 50 000 | 3 000 | fixed 500 | 13 900 / 16 700 | 60 % | 132 MB | 18 ms | 0 | **3 000 (sold out in 83 s)** | **5.1** | 2 047 people left without finding seats |
| a2 | 50 000 | 3 000 | adaptive ≤ 500 | 15 800 / 16 700 | 60 % | 136 MB | 5 ms | 0 | 2 583 in 90 s | 1.9 | calm: 178 found no seats |
| b1 | 50 000 | 20 000 | fixed 500 | 15 500 / 16 700 | 62 % | 128 MB | 4 ms | 0 | 8 520 in 90 s | **0.3** | slowest to sell |
| b2 | 50 000 | 20 000 | fixed 1 000 | 15 300 / 16 600 | 59 % | 120 MB | 50 ms | 0 | 14 020 in 90 s | 1.8 | |
| b3 | 50 000 | 20 000 | fixed 2 000 | 14 900 / 16 400 | 59 % | 135 MB | 14 ms | 0 | 19 980 in 90 s | 4.5 | 5 571 found no seats |
| b4 | 50 000 | 20 000 | fixed 5 000 | 12 700 / 17 200 | 66 % | 139 MB | 14 ms | 0 | 20 000 in 80 s | **8.4** | 22 527 found no seats |
| c1 | **10 000 in 2 s** | 1 000 | adaptive ≤ 500 | 4 900 / 5 200 | 36 % | 91 MB | 8 ms | 0 | 777 in 60 s | 1.5 | join p99 138 ms |
| d1 | **100 000** | 20 000 | adaptive ≤ 1 000 | 27 000 / 29 700 | **91 %** | 128 MB | 31 ms | 0 | 13 838 in 91 s | 1.7 | the one core is nearly full (at 4× speed); join p99 416 ms |

In every run: **zero errors, zero timeouts, the audit passed** (no seat sold twice, no seat both free and held, never more people inside than allowed, every order paid exactly once). Latency p99 of status / seats / hold / pay: 4–12 ms (d1: 150–180 ms).

## What it means

1. **The server is not the bottleneck; the buyers' fight over seats is.** 50 000 waiting people cost ≈ 130 MB and 15 % of one core at real speed. The load is almost all polls of 215 bytes.
2. **How many may be inside at once** (the room) decides two things: how fast the sale goes, and how many seat clashes (a buyer picks seats someone else already holds) each order costs. Rule of thumb from the table: keep the room at about **12–15 % of the free seats**, never above ≈ 1 000 for a normal sale. 500 on a 3 000-seat hall already gives 5 clashes per order (a1); on a 20 000-seat hall 1 000 gives 1.8 (fine), 2 000 gives 4.5 (annoying), 5 000 gives 8.4 and 22 000 people give up (bad).
3. **The adaptive room** (`ADAPTIVE=1`, default: `cap = min(CAP, 0.35 × freeSeats / 2.4)`) keeps that ratio all the time and shrinks as seats sell. Result: 1.8–1.9 clashes per order on a small hall and nobody told «no seats» after waiting. Its price: the tail of the sale (last ~15 % of seats) is slower. Use it. `CAP` is only the ceiling: **500 for halls ≤ 5 000 seats, 1 000 for bigger ones**; 2 000 only if the owner wants speed over comfort.
4. **Traffic is the real limit of the plans, not CPU.** The site's first visit is 4.33 MB on the wire (HTML 0.76 MB + 51 images 3.57 MB). 50 000 people × 4.33 MB = **216 GB**. So the sale link must open the tiny waiting page (`/wait`, **1.5 KB** brotli / 2 KB gzip, then one 215-byte poll every few seconds ≈ 15–20 KB per person for a whole wait): 50 000 people ≈ **1 GB**. Only people who are let in load the big site (≈ 1 250 buyers for a 3 000-seat hall ≈ 5 GB). Static files and images should come from nginx with cache or a CDN, not from Node.
5. **One core of the VPS is enough for the queue API up to ≈ 100 000 waiting people at real speed** (d1 at 4× speed used 91 %; real speed ≈ 25 %). TLS is the cost the sandbox did not include: the first seconds of a big sale (10 000 people in 2 s) mean ≈ 5 000 TLS handshakes/s; on 1–2 vCores they queue for a second or two (slow connect, not errors). Let nginx terminate TLS with session resumption.

## Not measured here (be honest)

- Real network (latency, packet loss, mobile clients), a real VPS (shared cores are slower than this sandbox, count on 30–50 % less), TLS, a database, the payment gateway. The queue state is in memory: a restart empties the line (people re-join; held seats are lost) — fine for a test server, for the real shop persist `sold` to the database at `pay` and re-read it on start.
- 500 000+ people: not tested; one core would be full at ≈ 100 000 (at 4× speed) so the answer there is a second process (shard by show) behind nginx.

---

# Part 2 — the realistic runs (the owner asked: every seat must sell, no error, what does irVPS3 carry?)

What changed in the test (and in the engine, `queue-engine.js`): the buying page asks for the map about every 2 s (`LOOKMAX=2`, not 2–8 s), **a seat that someone else took a moment ago is swapped for the nearest free seat** and the person is told (`FLEX`; the real shop must look for the nearest free seat *of the same price class* and ask the person when there is none), the people inside keep showing signs of life (`KEEPALIVE`) and **one who closes the tab is let go after 60 s with his seats** (`INSIDE_STALE_S`; before it was the whole 10 minutes of the hold), half of the people who do not pay vanish silently (`VANISH=0.5`). Every run goes on until the hall is sold out. Script: `run-final.sh`, summary: `node summarize2.js results/r*.log`.

| run | people | hall | room ≤ | the whole hall sold | time to sell out (real, ×4) | seat taken by another → neighbour | refused while ≥ 20 seats free | found no seat (they came at the very end) | errors | audit | CPU of one core | RAM | p99 of every call |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| r1 | 50 000 | 3 000 | 500 (adaptive) | **3 000 / 3 000** | 10 min | 612 → 1 389 seats | **0** | 24 | 0 | ok | 62 % | 118 MB | ≤ 20 ms |
| r6 (`MINCAP=40`) | 50 000 | 3 000 | 500 (adaptive, never below 40) | **3 000 / 3 000** | **8 min** | 678 → 1 435 | **0** | 78 | 0 | ok | 62 % | 118 MB | ≤ 56 ms |
| r2 | 20 000 | 1 200 | 500 (adaptive) | **1 200 / 1 200** | 8 min | 196 → 420 | **0** | 9 | 0 | ok | 41 % | 105 MB | ≤ 4 ms |
| r3 | 50 000 | 20 000 | 1 000 (adaptive) | **20 000 / 20 000** | 17 min | 4 618 → 11 017 | **0** | 29 | 20 of 3.7 M requests (the test tool's own socket resets) | ok | 63 % | 140 MB | ≤ 123 ms |
| r4 | **10 000 in 2 s** | 3 000 | 500 (adaptive) | **3 000 / 3 000** | 10 min | 671 → 1 471 | **0** | 18 | 0 | ok | 32 % | 91 MB | join 151 ms, the rest ≤ 8 ms |
| r5 | **100 000** | 20 000 | 1 000 (adaptive) | **20 000 / 20 000** | 18 min | 4 699 → 11 181 | **0** | 31 | 0 | ok | **90 %** | 147 MB | ≤ 103 ms |

(All with the clock four times faster: CPU and requests per second are four times what a real sale gives; the minutes are real minutes. The `found no seat` people are the last few admitted when nothing was left: they are told at once.)

## What it proves, in plain words
1. **Every seat is sold.** In every run the whole hall was sold, never a seat twice, never one left unsold behind a forgotten hold (the audit checks it at the end of each run).
2. **Nobody is refused while seats are free** (0 in every run). When two people want the same seat the second is moved to the nearest free one; the only people who meet «no seat» are the last handful, when the hall is really full.
3. **The last 1 % is the slow part** (people who have seats held take 15–50 s to pay): with the room never below 40 people the sale of 3 000 seats ends in 8 min instead of 10. Use `MINCAP=40`.

## TLS (the cost a plain Node test does not show) — `./tls-test.sh`
One core accepts ≈ **1 500 new HTTPS connections per second at the client's pace (the server used 56 % of the core, so ≈ 2 700/s is its limit)** with an ECDSA P-256 certificate (Let's Encrypt's); a returning phone with session resumption costs the same order. A 10 000-person burst therefore connects in **about 4–7 s on one or two cores** (nginx terminates TLS; a slower VPS: count 1 000/s per core). Nobody gets an error; the first seconds are just slower. Keep-alive and session resumption in nginx make every poll after the first nearly free.

---

# Part 3 — «nobody has a problem»: sleeping phones, the bank's page, a room of 1 000, 100 000 people

The owner's rule: *even with 100 000 people nobody may have a problem.* What was found and changed in `queue-engine.js` (read this with `server/ساده.md`, the same in plain Persian):

1. **The room counted the wrong people.** The first rule limited *everybody inside* by the free seats, so people who already held seats or were at the bank's page shut the door on people who were looking: the last seats sold slowly (34 min for 3 000 seats) and 322 people were let in to find nothing. Now the room is `CAP` people at most (1 000), and only the people still **looking** for seats are limited by the free seats (`seekCap = max(min(free, 6), min(CAP, free × share / seats-per-person))`, free = not sold and not held). Same 3 000 seats: **17 min, 6 people found nothing, up to 975 people inside.**
2. **A sleeping phone no longer loses the place.** A waiting person who does not ask for a minute is skipped (so the front is not blocked) but is remembered for 30 min (`LATE_S`); when the page wakes up he goes in **before anybody new**. Same for a person let in who did not arrive in 45 s, and for one inside who went silent (3 min: `INSIDE_STALE_S`).
3. **The bank's page cannot take the seats away.** `POST /api/pay/start` (when the person is sent to the bank) locks the hold for 15 min (`PAY_S`) whatever the page does; `POST /api/pay` (the bank's answer) sells it. Without it a 3-minute silence would have released seats of somebody who is paying.
4. The status shows `inside` and `cap` so the page can say «now N of 1 000 are buying», `back: true` for a returning person.

| run (every wait ÷ 4; 25 % of the people let the phone sleep 70–180 s, 80 % of the payers spend 90–300 s at the bank's page) | the hall sold | time to sell out (real) | found no seat | phones asleep → came back first | bank trips → paid too late | lost their place (re-joined as new) | errors | audit | one core |
|---|---|---|---|---|---|---|---|---|---|
| p1: 50 000 people, 3 000 seats, room 1 000 **adaptive** | **3 000 / 3 000** | 17 min | **6** | 33 604 → 183 | 953 → **0** | **0** | 4 of ~4 M requests | ok | 67 % |
| p2: the same, room **fixed** at 1 000 (adaptive off) | 3 000 / 3 000 | 17 min | **21 414** (they were let in and found nothing) | 32 444 → 3 047 | 1 005 → 0 | 0 | 0 | ok | 67 % |
| p3: **10 000 in 2 s**, 3 000 seats | 3 000 / 3 000 | 16 min | 3 | 7 149 → 181 | 967 → 0 | 0 | 0 | ok | 39 % |
| p4: **100 000** people, 20 000 seats, room 1 000 | **20 000 / 20 000** | 38 min | 6 | 86 731 → 922 | 6 401 → **0** | **0** | 0 | ok | 89 % (at 4× speed) |

**Lesson of p2: never switch the adaptive room off.** With a fixed room of 1 000 in a small hall, 21 000 people are let in for nothing.
In all four runs: every seat sold, never a seat twice, nobody refused while ≥ 20 seats were free, everybody finished (bought, left, or was told «sold out»), `paid too late` 0. The `errors` are the test tool's own socket resets (≤ 0.0001 %).
Test: `./run-people.sh` (about 30 min) then `node summarize2.js results/p*.log`; the waiting page against a tiny room: `tools/ad-waitpage.js`.
