# The reference server: waiting room + seat desk

A small Node (≥ 18, **no packages**) server that is the *real* version of what the site's prototype fakes in `queue.js`: a fair line, a limited room of people who may buy at once, seat holds that cannot clash, and the audit that proves nobody paid for the same seat twice. It also serves the site's files for a test (`ROOT`), so a test server needs only this.

```bash
node server.js                       # http://localhost:8080  (the site)  ·  /wait?e=<show>&s=<session>  (the line)
CAP=500 SEATS=3000 PORT=8080 node server.js
```

| env | default | meaning |
|---|---|---|
| `PORT` | 8080 | |
| `CAP` | 500 | the room: the most people in the buying step at once (looking, holding seats, paying). **Use 1000.** |
| `ADAPTIVE` | 1 | **keep it 1**: the people still LOOKING for seats are at most `SHARE × free seats / 2.4` (people who hold seats or pay do not count); `0` = up to `CAP` people look at once (a fixed room of 1 000 in a 3 000-seat hall let 21 000 people in for nothing) |
| `SEATS` | 3000 | seats of a session (a room is made per `show|session` on first use) |
| `HOLD_S` / `CLAIM_S` / `STALE_S` | 600 / 45 / 60 | seconds: a held seat is kept · a person let in must come within · a waiting person who stopped polling is skipped after |
| `SECRET` | random | signs the line tickets (set it so a restart does not void them) |
| `SHARE` | 0.35 | the people inside may hold at most this share of the free seats |
| `INSIDE_STALE_S` | 180 | a person inside who shows no sign of life (the page asks for the map every 1–2 s) for this long is let go with his seats (not while he is at the bank: `PAY_S`) |
| `LATE_S` | 1800 | a skipped person (a sleeping phone) who comes back within this time goes in before anybody new |
| `PAY_S` | 900 | after `POST /api/pay/start` nothing is taken from the person for this long |
| `ROOT` | `../ui-reference/01-hero/v9` | the folder of the site to serve |
| `TIME_SCALE` | 1 | `4` makes every time four times shorter (tests only) |

## How the line works (`queue-engine.js`)

- A ticket is `show.session.number.signature` (HMAC); nothing is stored for a waiting person but 4 bytes (when it last asked). **Position = ticket number − admitted**, so the line costs O(1) per request and ≈ 4 KB RAM per 1 000 people (the process itself sits at ≈ 100–140 MB with 100 000 waiting).
- `join` → ticket. `status` → `wait {ahead, eta, poll}` | `in {left}` | `soldout` | `gone`. The server tells each client when to ask again (1 s near the front … 15 s far back, ±20 % jitter), so 50 000 people are ≈ 4 000 requests/s, not a storm.
- A person who stops polling for `STALE_S` is skipped (nobody waits for a closed tab) **but keeps the right to come back first for 30 minutes**; a person admitted but not coming for `CLAIM_S` is treated the same.
- `hold` swaps a seat taken a moment ago for the nearest free one (`flex`, on by default; `moved` says how many; the real shop must keep it inside the same price class); `seats` returns the map as bytes (and counts as a sign of life) (0 free, 1 held, 2 sold). `hold` is all-or-nothing and replaces the person's earlier choice; `pay/start` (he goes to the bank) locks the hold for 15 min, `pay` (the bank's answer) turns it into sold exactly once; `leave` frees everything. A hold expires after `HOLD_S`.
- When all seats are sold every waiting person is told `soldout` at once (no more waiting for nothing).
- `GET /api/audit?e=&s=` checks the invariants (no seat in two states, counts match, never more inside than the room). `GET /api/stats` shows the room, RAM, CPU, event-loop lag.

## Putting the site behind it (what the front end must do)

1. The sale's link is `/wait?e=<show>&s=<session>` (a 1.5 KB page: `public/wait.html`). It joins, shows the place and the time left, polls `status`, and when `in` sends the person to `/#/e/<show>/<session>?qt=<ticket>`.
2. The big site (4.3 MB) must **not** load for people who are still waiting. The site's own `queue.js` (prototype) should, in production mode, read `qt`, call `/api/seats`, `/api/hold`, `/api/pay` with it instead of its local simulation. (Not wired yet: the prototype keeps its simulation so the preview works without a server.)
3. Put nginx in front (`nginx.conf.example`): TLS, gzip/brotli, long cache for images, proxy `/api/` and `/wait` to Node. In a real shop the payment callback marks the order in the database and *then* calls `pay`.

## Files

`queue-engine.js` (the room) · `server.js` (HTTP) · `public/wait.html` (the tiny waiting page) · `loadgen.js`, `loadtest.js`, `run-scenarios.sh`, `summarize.js` (the load test) · `LOADTEST.md` + `results/` (what it measured) · `nginx.conf.example`.

## The single-seat rule (`orphan.js`)
A hold must not leave ONE free seat alone in its row (nobody can buy a single seat later). `orphan.js` is the same text as the site's (made by `tools/af-orphan-sync.py` from `parts9/buy.js`): build the runs of the hall's plan once with `orphanRuns(plan)`, then on every hold request call `orphanCheck(plan, new Set(seatKeys), cfg)`; in mode `block` refuse a request that returns lonely seats (with the seats named), unless the hall has `cfg.last` (default 3) free seats or fewer. The queue engine does not need it; the shop's hold route does.
