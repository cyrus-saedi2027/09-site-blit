# To the next Claude (or developer) — read this first

**The owner's subscription with the previous session ended; you are continuing the work.** The owner writes and reads **Persian**. He wants **short, honest, simple replies**, never questions back, and everything he asks finished. (Details of how he likes to work are in `HANDOFF.md` §5 and in `START-HERE.md` §4.)

## 0. The most important thing to know

> **The site's details need a lot more work.** I (the previous session) built the structure, the logic and the tests, and verified them with automatic audits and screenshots — **but many small things are still unfinished or ugly, and the owner keeps finding them by looking at the screen.**

What the owner has repeatedly found, and will find again:
- **Buttons that look half-made, are hard to see, or are missing a state** (for example the «+ ساعت» in the session planner was a bare chip with a faded red button under it; the «بعدی» button of the wizard was squeezed into a 40 px square by a duplicate CSS class). I fixed the ones my audit (`tools/ad-btn-audit.js`) could find. It only finds *measurable* problems (too small, no frame, overlapping, clipped, nameless, faded-red disabled) — **not** ugliness, wrong spacing, wrong wording, or a control that exists but is pointless.
- **Empty or stretched areas** (a gallery whose tiles were all as tall as the tallest one; panels with big holes). Look for them at 1500, 1920 and 390 px.
- **Panels and desks on a phone** are the least polished part. The site is dark/light; the desks default to dark. Check **both themes**.
- **Things that exist but are not obvious**: the owner asked «where is the percent discount code?» (it existed only in the organiser's panel); «why isn't the smart waiting room there?» (it exists, but only for busy shows by default). If a feature is not visible where he would look, it does not exist for him.

**What I did NOT verify (do not assume):** real phones, Safari and Firefox (only Chromium was ever run), real printers, screen readers beyond `axe`, slow phones, a real network under the real server, a real payment gateway, a real SMS gateway, a database.

### How to find what is wrong (do this before adding anything)
1. Build and serve (see `START-HERE.md`), open `http://localhost:8005/index.html?debug&notiles`.
2. Click **every** tab of the organiser desk (`#/org/...`), the admin desk (`#/admin/...`), the door control (`#/gate`) and every wizard step (`#/org/new` → 6 steps), in **dark and light**, at **1500 / 1920 / 390 px**. Screenshot each (`tools/ad-sheet.js` makes contact sheets; `tools/ad-shot.js`, `ad-wzshot.js` take single ones).
3. For each control ask: is it visible? does it have hover / focus / disabled / loading? does it say what it does? is it where a person would look? Is anything covering it (the wizard has a sticky bottom bar)?
4. Run `tools/ad-btn-audit.js` (it lists what is measurable) and `final-checks-ad.sh` (the full regression, ~50 min). Known acceptable leftovers of the audit: filter-chip rows (`.sec-chips`), the hall builder's palette rows, the ticket-design filter.
5. Fix in `source/parts9/*` (never in `index.html`), rebuild, add a test next to the old ones, update `SPEC.md` (§10.x), `BRIEF.md`, `HANDOFF.md`.

## 1. The queue / waiting room — what exists and what does not
- **In the site (`parts9/queue.js`)**: a *simulated* waiting room (`#/q/<show>/<session>`). It is shown for busy shows by default; the admin switches it **off / busy shows / all shows** in «دسته‌ها و تنظیمات». It now says «الان N نفر از ۵۰۰ نفر ظرفیت تو مرحله‌ی خرید هستن … نفر جلوی تو …».
- **The real thing (`server/`)**: `queue-engine.js` + `server.js` + `public/wait.html`. Tested up to **100 000 people**: every seat sold, nobody refused while seats were free, no seat sold twice, audit ok, also with phones that sleep and people who spend minutes on the bank's page (see `server/LOADTEST.md`, `server/ساده.md`).
- **Not done:** the site's `queue.js` is **not wired** to this server (first job once a server exists: the sale's link opens `/wait`, then the site reads `qt` and uses `/api/seats`, `/api/hold`, `/api/pay/start`, `/api/pay`).
- The recommended servers: **main irVPS3, test irVPS2** (ParsPack plans), room of up to **1000 people buying at once** (it shrinks by itself in a small hall), up to 100 000 waiting.

## 2. Other things not built (honest list)
Real payment gateway · SMS gateway · database (everything lives in the browser's storage in the prototype) · a real Google Maps picker (needs a key; today: OSM tiles + search + pasting a Google link) · removing a show from the home banner takes effect at the next load · the site's queue is a simulation · client files are single HTML files for the owner's client (rules: only the site, nothing under the footer, no «همکاران» links, desks dark by default, no network).

## 3. A few traps I fell into (so you don't)
- A CSS class defined twice (`wz-nav`) silently overrode the first. `grep` before you name a class.
- A picture placed inside a `<button>` must contain **no** buttons or links (the parser closes the outer button and breaks the page).
- A test with made-up network answers hid a real bug (the map search failed from a local file because OSM's Nominatim answers 429 without a Referer). Test the real network, from `http` **and** `file://`.
- `button.buy:disabled` must be plain grey, never a faded red.
- Do not trust numbers you did not measure; the owner asked «don't say it from your head» — say what was measured and what was not.
- `q-test.js` and `poster-test.js` are stale (they look for markup that was removed in round S); the rest of `final-checks-ad.sh` is green.

## 4. Files to read, in order
`START-HERE.md` → `repo/ui-reference/BRIEF.md` → `repo/ui-reference/01-hero/v9/SPEC.md` (§10.24 is the latest) → `repo/ui-reference/HANDOFF.md` → `repo/server/README.md` + `LOADTEST.md` + `ساده.md`.

## Added in round AF (the owner's fourth message)
- **The single-seat rule** is in `ui-reference/01-hero/v9` (the site, in `parts9/buy.js` between `orphan:begin` and `orphan:end`) and in `server/orphan.js` (generated from it; the real shop must call `orphanCheck` where a hold is asked for). Test: `tools/af-orphan-test.js`.
- **Bare patches** (a page where one side ends and only the background shows) are the owner's pet hate. `tools/af-gap-audit.js` finds them; `sfill` (in `parts9/more.js`) mends the common ones. Run it after any layout change.
- **Sessions** (wizard step 4) are one line to add and one list; **halls**: «ساخت سریع» plus six sample big halls; tests `af-sessions-test`, `af-hall-test`.
- Still to do (the owner said so): more halls and a still easier hall system (he finds it «complicated»); every panel still deserves a look from a first-time user's eyes.
