# مرجع رابط کاربری سایت بلیت · UI reference

این پوشه مرجع طراحی (UI) سایت بلیت است. صفحه‌ی اصلی رو بخش به بخش اینجا می‌سازیم. هر بخش یه پروتوتایپ زنده‌ی HTML داره، با یه فایل `SPEC.md` که Claude دسکتاپ از روش همون بخش رو تو سایت اصلی پیاده می‌کنه.

This folder is the UI reference for the ticketing site. The home page is designed **one section at a time**. Each section has a live HTML prototype plus a `SPEC.md` handoff that the desktop agent uses to build it in the real codebase. The prototypes are the source of truth for look and motion.

**قبل از هر کاری [`BRIEF.md`](BRIEF.md) رو بخون** (معرفی پروژه‌ی «بلیت» و چک‌لیستی که هر دور باید چک بشه) · **Read [`BRIEF.md`](BRIEF.md) first**: the project brief and the checklist to run every round.

## چطور ببینی · How to view

```bash
cd ui-reference && npx http-server -p 8000
```
Then open http://localhost:8000/01-hero/ to compare the hero versions (each fills the whole window; switch versions from the round settings button at the bottom-left). Use a local server rather than double-clicking the file. Pick one that supports range requests (`http-server` does), so the music player can seek. The songs aren't in git; see [`01-hero/assets/music/README.md`](01-hero/assets/music/README.md).

Hosted previews (private to the owner; the hero preview includes the songs):
- Moodboard of 16 international ticketing, festival and theatre sites: https://claude.ai/artifact/G67hnwxgRA75NhkLfJZUAP
- Hero, versions 1–7 on one page (the first owner's account; still has the old tab bar): https://claude.ai/artifact/FMdoTVhR22nUCmfX76FvjU
- Hero, versions 6, 7, 8 and 9 on one page (new account, with the real banners; no songs; no bar, the versions and the preview sizes switch from the settings button): https://claude.ai/artifact/SWmrAjx1oGu4Lj6zokerLp

## بخش‌ها · Sections

| # | بخش | Section | Status | Refs |
|---|---|---|---|---|
| 1 | هیرو · جایگاه ویژه | Hero: nine versions side by side (v1 WebGL stage, v2 photo + featured rail, v3 posters, v4 formal and alive, v5 cut-out performer and striped halo, v6 = v5 working with posters, banners, photos or nothing, plus a demo admin panel, v7 after the owner's reference screenshot: a full-screen photo that slowly zooms out and fades into the next, cards on the right and a capsule header, **v8 the featured slot: a bento of separate rounded panels (header, the cards, the banner shown whole, the facts) with a small gap between them and the banner's own blurred colours behind; a demo admin panel; v9 = v8 made exactly the desktop's size (the panels tile the window edge to edge), made controllable (a settings button with tabs for gaps, margins, roundness, colours, texts, header, motion, sizes; 10 modes; copy/paste) and livelier (a fixed header that shrinks into a pill on scroll, a search window, a second section sliding over the pinned hero, no music), and the comparison page can show a version at exactly 1920×1080**) | **v9 approved (the hero is not changed any more); under it, the list (round I: every category a panel of its own, the presale's countdown, search and city as in the owner's sample) and the show's page (step 1 of a purchase) wait for feedback; the whole site has a light (white) theme** → [`01-hero`](01-hero/) | الف، ب، ۱۰، ۱۵، leemeenal.app |
| 2 | جستجو با حال‌وهوا | Mood search ("something funny", "date night", "this weekend") | next | ۳، ۵ |
| 3 | پرفروش‌های هفته | Weekly best sellers with giant numbers | later | ۳ |
| 4 | قفسه‌ی تئاتر | Theatre poster shelf | later | ۵، ۱۴ |
| 5 | تقویم رویدادها | Events calendar (month + selected day) | later | ۱۳، ۹ |
| 6 | هنرمندها | Artists as stories | later | ۷، ۲ |
| 7 | سالن‌ها | Venues: the halls library (147 halls from the owner's package, real seat maps, optional map position), the cities (487) and the admin's cities/halls pages; built inside the site (round K, see `HANDOFF.md`) | built | ۸، ۱۶ |
| 8 | قسطی، پکیج، اپ، فوتر | Instalments, packages, app, footer | later | ۱۱، ۵ |

Reference numbers point to [`references.md`](references.md).

## قواعد مشترک همه‌ی بخش‌ها · Shared rules

- Dark stage look: neutrals `#07060b / #0e0c15`, solid translucent panels (no backdrop blur), one accent at a time through `--accent` (per event; brand violet `#a78bfa` as the default).
- Type: Lalezar (display), Vazirmatn (UI and body), Noto Nastaliq Urdu (taglines only).
- Motion: GSAP for timelines, WAAPI or CSS for compositor-only effects; `expo.out` for entrances, `power3.in` for exits; always a reduced-motion path.
- Performance: continuous animation only on `transform` and `opacity`; no WebGL, backdrop-filter or blend modes; nothing restyles the whole page per frame. See [`01-hero/v2/SPEC.md` §10](01-hero/v2/SPEC.md#10-performance-rules).
- RTL rules (no per-letter splitting, LTR clocks and media bars, mirrored arrows, unmirrored media icons) are in [`01-hero/v2/SPEC.md` §11](01-hero/v2/SPEC.md#11-persian--rtl-rules).

## ادامه‌ی کار با Claude یا حساب دیگه · Handoff

برای ادامه‌ی پروژه با یه Claude دیگه، اول [`HANDOFF.md`](HANDOFF.md) رو بخون: پروژه چیه، نسخه‌ها و نظر صاحب پروژه، قواعد، تست و کار باز مونده.
