# Hero · نسخه‌ی ۸ · جایگاه ویژه · handoff spec

> **خلاصه برای خودت:** هیرو چند **کادر جداست**، هر کدوم با گوشه‌ی نرم و فاصله‌ی کم از بقیه (مثل بنتوی مرجع الف): **هدر**، **کادر کارت‌ها** (همه‌ی اجراها)، **کادر خودِ بنر** و **کادر اطلاعات** زیرش. بنر کامل و با نسبت خودش (بدون هیچ برشی) تو کادر خودش می‌شینه و هیچ‌چیز روش نمی‌افته؛ پس هر چی طراح بنر گذاشته (عنوان، تاریخ، سالن) دیده می‌شه.
> - پشت کادرها همون بنر خیلی محو شده پخش می‌شه (ambient) تا صفحه رنگ بنر رو بگیره؛ تو فاصله‌ها و حاشیه‌ها دیده می‌شه.
> - **پوستر عمودی تو هیرو جا نداره.** پنل مدیریت ردش می‌کنه. جاش قفسه‌ی پوستره.
> - **دو چیدمان** برای اطلاعات: *کادر پایین* (بنری که متن خودش رو داره؛ پیش‌فرض) و *متن روی عکس* (عکس بدون نوشته؛ همون ۷، ولی تو کادر خودش).
> - کادر کارت‌ها پیش‌فرض سمت چپه (راستش هم هست، مثل ۷). هدر و کادر اطلاعات مات‌ان، نه شیشه‌ای.
> - **صفحه‌ی مقایسه نوار بالا نداره.** نمونه کل پنجره رو می‌گیره. جابه‌جایی بین نسخه‌ها تو «تنظیمات نمونه» (دکمه‌ی گرد پایین‌چپ) هست: گروه «مقایسه‌ی نسخه‌ها».
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v8, third round. Round 1 put one banner in a frame on a blurred copy of itself, with the facts attached, and showed one show by its tall poster. The owner: *incomplete: the banners must cover the whole 1920×1080, and vertical posters must not be in the background.* Round 2 made the banner the full-screen background, with the header, the rail and a capsule over it. The owner: *the banner is buried under the frames; make it a bit smaller and framed: the rail with all the images one section, the banner one section, the facts one section, each in its own frame with soft corners and a small gap; and the header's background must be opaque (it looked like glass).* And about the comparison page: *its top bar eats the window, so the sample looks cut; take it away, put the switcher in the floating settings capsule.* This round does that.

The owner sent four real shows, each with a 16:9 banner and a tall poster, all with their words baked in. The sample data in `index.html` uses the **banners**. They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v7 | From v6 and the owner's reference A (bento) | New |
|---|---|---|
| the picture's zoom-out and fade; capsule header; the rail's cards; music | fixed 8-colour palette suggested from the picture; the facts of the show (date card, venue, price, badge); the demo admin panel; separate rounded sections with small gaps | the banner's own panel; the rail as a panel; one block that lines up; the ambient behind; two layouts; the switcher in the settings panel; the time-left bar on the rail card; one self-contained scene per show |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Music:** playlist, stored rhythm analysis, `audioSys`, `analyseTrack()`, the player (`../v2/SPEC.md` §7). The beat swells the banner's panel (a little less than v7, so it stays inside the gap).
- **Colours:** the fixed palette (`../v6/SPEC.md` §4).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The panels

```
┌──────────────────────────────────────────────────────────────────────┐
│ ╭─ header ───────────────────────────────────────────────────────╮   │
│ ╰────────────────────────────────────────────────────────────────╯   │
│ ╭ rail ──╮  ╭─ the banner (its own proportions) ─────────────────╮   │
│ │ ˄      │  │                                                    │   │
│ │ [card] │  │                                                    │   │
│ │ [card] │  │                                                    │   │
│ │ [card] │  ╰────────────────────────────────────────────────────╯   │
│ │ [card] │  ╭─ the facts ────────────────────────────────────────╮   │
│ │ ⏸  ˅   │  ╰────────────────────────────────────────────────────╯   │
│ ╰────────╯                                                           │
└──────────────────────────────────────────────────────────────────────┘
        (behind everything: the same banner, tiny and soft)
```

Every panel is a solid rounded frame: background `--capsule` (`#120f1b`, opaque), a 1px border at 22 % white, radius `--r`, a soft shadow (`0 14px 40px -20px`). The gap between any two is `--gap`. No `backdrop-filter`, no see-through: the owner called the old header "glass".

| Piece | What it is |
|---|---|
| **Header** (`.nav`) | the v7 capsule: logo with five bars, five categories, the music player, «ورود \| ثبت‌نام». `--nav-h` tall. Spans the whole block (the rail and the banner column), so it is as wide as they are. |
| **Rail** (`.rail`) | a panel `--rail-w` wide (`17u`), padding `.75u`: the up bar at the top, the cards (16:9, `15.5u` wide) centred, the down bar and the pause button at the bottom. Its height is the banner column's (below), so the two line up top and bottom. |
| **Banner** (`.frame`) | the banner in its own panel, `object-fit: cover` on a panel that has the banner's own proportions, so nothing is cut (the zoom aside, §6). It is a link to the show. Behind the picture the panel is `#0c0a14`. |
| **Facts** (`.dock`, layout bar) | the same solid panel, `--dock-h` tall (`max(56px, 4.8u)`), exactly as wide as the banner, `--gap` under it. |

---

## 2. One geometry

All sizes are in `--u` (1 % of the width on a 16:9 screen, at most 1.7778 % of the height; clamped 8–26 px, so a short window shrinks the composition instead of cutting it). The hero is `100svh` tall (at least 440 px).

```
--pad-t/r/b/l  max(1.2u, safe-area)            --gap    .8u
--nav-h  max(50px, 3.3u)    --rail-w 17u        --dock-h max(56px, 4.8u)
--r      max(12px, 1u)      --capsule #120f1b   --ratio-n 1.7778 (the banner proportions the rail lines up with)
```

- **The hero is a size container** (`container: hero / size`). That lets every part work out the same room from the same numbers:
  ```
  --main-w  100cqw − rail − gap                    (the width of the banner column)
  --main-h  100cqh − header − gap                  (the height under the header)
  --col-w   min(--main-w, (--main-h − facts − gap) × 16/9)    (the widest column a 16:9 banner allows)
  ```
  The hero's own grid can't use container units, so it has the same width as `--col` (`%` and `svh`).
- **The grid** (hero and every scene): `"nav nav" "rail main"` with columns `--rail-w` and `--col` and `justify-content: center`, so the rail and the banner column are **one block, centred**; on a window wider than 16:9 the extra room becomes equal margins on the two sides, where the ambient shows (never a gap between the rail and the banner). With the cards on the left (`.rail-left`, the default) it is `"nav nav" "main rail"`.
- **The banner column** (`.tk`): width `min(--col-w, (--main-h − facts − gap) × the banner's ratio)`, the banner panel on top (`aspect-ratio` = the banner's), the facts panel `--gap` under it; centred in the room. A 16:9 banner at 1920×1080 is 1506×847 (78 % of the width), at 1440×760 about 1000×563, at 1366×560 735×414.
- **The rail's height** is `min(--main-h, --col-w / 16:9 + gap + facts)`, so its top is the banner's top and its bottom is the facts panel's bottom, in every window shape (checked to within 3 px).
- A banner that isn't 16:9 is still shown whole: a 3:1 one gets a short, wide panel (the panel never exceeds the column). The rail keeps the 16:9 height.

---

## 3. Layout bar (a banner with its own words)

- The banner panel, then the facts panel. Nothing is drawn over the banner (no badge, no title, no gradient).
- **The facts**, right to left in RTL; a 2px accent hairline runs along the panel's top edge, strongest on the start side:
  1. kicker (an accent dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a `3.3u` rounded square, the month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })`; the clock is LTR.
  3. **venue** (label «مکان», one line, ellipsis).
  4. **price** (label «قیمت از», the amount, small «تومان»).
  5. the **buy button** (the v7 pill: at least `40px` tall, `3.1u`, at least 9u wide, in the accent with `onAccent` text, a soft glow).
  - Thin 1px separators between 1–2, 2–3 and 3–4. The panel is a size container (`container: dock / inline-size`): under 800 px wide the date's second line goes, under 660 px the venue goes.

## 4. Layout text (a photo; as v7, inside its panel)

- The photo fills one panel as tall as the banner column (banner + gap + facts), and there is no facts panel: the words sit on the photo.
- A dark gradient on the words' side (`0.84` at the edge, `0.66` at 28 %, `0.22` at 52 %, clear by 68 %) plus a light top and bottom one. The words go on the side **away from the cards**, so the gradient and the words follow the rail: cards on the left → words on the right.
- The words (a `34u` column, vertically centred): kicker, title (`1.95u`, at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, at least 1920 px wide (2560 is better), no words in it, the subject on the cards' side. The sample photo comes in two mirror images for that (`pop-frequency-*` and `-flip-*`); the panel picks by the rail's side.

---

## 5. The ambient

Behind the panels, the same banner, tiny and soft, fills the whole hero (`background: var(--amb) center / cover`), with a radial wash of the accent (24 %) and a vertical dark gradient (0.5 → 0.28 → 0.5). It is why the page takes each show's colours, and what shows in the gaps and the margins. **It is made once on upload by the server** (64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, stored as a ~1 KB WebP); the page never computes it and never needs CORS on the picture. (The prototype computes it in the browser.)

---

## 6. Motion

| t (s) | What happens when the next show comes |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 1.2 | The ambient fades in over the old one (`sine.inOut`). |
| 0 → 0.38 | The old panels' content fades out (`0.32 × fade`, `sine.out`). |
| 0.36 → 1.2 | The new panels' content fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0 → 8.2 | The picture zooms out inside its panel (linearly) over the show's 7 s plus the next fade's 1.2 s, so it is still moving while the next one fades in. |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The header's accent (the bars, the music ring, the rail ring and bar) changes. |
| 7 | The next show starts (the time-left bar is full). |

- **Why the content fades apart from the ambient.** Two designed banners overlapped for a whole fade show two sets of words on top of each other. This way the old one is gone before the new one arrives, and for a moment there is only the soft colour between them.
- **The zoom** starts small, because the banner's words are near its edges and a panel clips the picture while it zooms: banner 1.02 / **1.05** / 1.09, photo 1.08 / **1.15** / 1.24 (the panel's «زوم اول تصویر»: کم / متوسط / زیاد).
- **Pausing** (the timer, the bar and the picture's motion pause together): the pointer over the rail, focus inside it, the pause button, the admin panel open, the hero off screen, the tab hidden.
- **Reduced motion:** no zoom, a 0.4 s fade, auto-advance starts paused.
- **Quick clicking:** a scene is never reused while it is still fading (a second instance of the same show is built if needed), and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Intro:** the header drops in, the rail slides in, the first scene fades in from the dark page already zooming out, then its words.
- **Music:** with «تپش آروم تصویر» (default) the banner's panel swells `scale(1 + (kick·0.006 + downbeat·0.003)·level)` on each beat; the logo's bars and the four small bars follow the song.

---

## 7. The rail

A panel with one 16:9 card per show (the banner), the up and down bars and the pause button. The cards: radius `max(9px, .6u)`, gap `.6u`; the active card has a 2px accent ring and a glow; keys, `role="tab"`, hover pause: as v7.

- **Side:** `.hero.rail-left` (the default) or not (the owner's v7 reference had it on the right). One setting for the whole hero; the rail must not jump sides between shows.
- **Time left:** a 3px bar at the bottom of the active card grows from the right (the reading direction) over the show's seconds. It is the timer itself: pausing the timer pauses the bar.
- **How many shows:** two to four (the owner's «نهایت ۴ تا»). With more, the card list scrolls inside the panel so the active card stays in view. With one show, hide the rail and the timer.

---

## 8. Phones and short windows

- **Under 761 px wide** the panels stack in one column: header, banner, facts, then the rail as a row of small cards in a thin panel. The facts panel is two rows (kicker and title; then date, price and the buy button; the venue joins the kicker). The text layout is the photo with the words at the bottom over a gradient. `--gap` and the padding are 10px.
- **Short windows** (the preview pane of a laptop can be 500–600 px tall): `--u` shrinks down to 8 px and the hero may be as short as 440 px, so the whole composition still fits; before, a 600 px minimum cut the bottom off.
- **Tablets and 4:3 windows** use the same two-column grid; the column is as wide as the window allows.

---

## 9. Data model

```
slot {
  id, order, activeFrom?, activeTo?,                  // the slot is sold for a period
  layout: 'bar' | 'text',
  pal: 'violet' | 'blue' | 'teal' | 'green' | 'gold' | 'orange' | 'crimson' | 'pink',
  type, name, title, desc, venue, startsAt, endsAt?, price, badge?, track?,
  banner: { src, srcset, thumb, ambient, w, h },      // 16:9; (the photo for layout 'text')
  fp?: { o, op, mop }                                 // the photo layout's focal point
}
// global (one setting for the whole hero): rail: 'left' | 'right'
```
- `title` is the full line (also the `<h1>`; in the bar layout a visually hidden one). `type` and `name` label the rail card («کنسرت SkyKings»). `desc` is two lines, used by the text layout.
- `startsAt`, `endsAt`: ISO with +03:30. `price` is the lowest price in toman. `badge` is one of: پیش‌فروش، پرفروش، ظرفیت رو به اتمام، اجرای ویژه، جدید (or none).
- Banners: 640, 1024 and 1672 (or 1920) wide; `srcset` + `sizes="100vw"`. Photos: 640, 1920, 2560.
- **No poster field.** A show's tall poster belongs to the poster shelf, not here.
- The sample's prices, and the dates and venues the banners don't state, are made up.

---

## 10. The admin panel (what the real one does)

The panel in `index.html` («تنظیمات نمونه» / «پنل مدیریت · نمونه», the round button at the bottom left) runs all of this in the browser. The production version should look the same. It works on the active slot, and every change shows on the real stage at once (the scene is built again and fades in over the old one; auto-advance pauses while it is open).

0. **مقایسه‌ی نسخه‌ها** (only inside the comparison page): buttons for every version; the current one is marked. This is the switcher; see §14.
1. **Image:** drop or pick a file; the box «روی بنر نوشته (عنوان، تاریخ…) هست» (ticked by default) picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · تو قابش کامل و بدون برش دیده می‌شه», or «نسبت ۳٫۰۰ به ۱ … کامل دیده می‌شه، ولی قابش کم‌ارتفاع‌تر می‌شه». **A tall or square picture (ratio under 1.15) is refused** («پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا»), and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot (to see the text layout).
2. **Info:** کادر پایین / متن روی عکس (a tiny wireframe on each).
3. **Colour:** eight swatches; the one suggested from the picture is marked (`suggestPalette()`, v6 §4).
4. **Texts:** title, venue, price from, badge. (The real panel also has the date and time, the type, the short name, the description and the focal point.)
5. **Cards' side:** left (default) or right. (A sample photo turns into its mirror image with it.)
6. **Motion and music:** zoom at the start, seconds per show, fade, the beat's reaction.
7. **Reset** puts the slot back as it was.

Validation worth having in the real one: at least 1600×900 (warn below 1920×1080); JPEG, PNG or WebP up to 10 MB; refuse a ratio under 1.15; warn how the panel will look for a ratio other than 16:9; warn if the banner's words come closer than 4 % to an edge (the zoom clips them for a moment).

---

## 11. What the server does on upload

| Step | Detail |
|---|---|
| Read the file | JPEG, PNG or WebP. Note the size and the ratio. Refuse a ratio under 1.15 (a poster). |
| Make the sizes | WebP: 640, 1024, 1672 (1920 if the source has it); photos 640, 1920, 2560. Never upscale. |
| Make the ambient | 64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, stored as a ~1 KB WebP (§5). |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest palette colour; a black-and-white picture gets violet. Store the key. On the four sample banners it gives gold, crimson, orange and crimson. |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them. |
| Never | tint, crop, redraw or put anything on the organiser's picture. |

---

## 12. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`.
- Each scene has one `<h1>` (visible in the text layout, visually hidden in the bar layout).
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button.
- A visually hidden `role="status"` line says «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان» when the visitor (not the timer) changes the show.
- The buy button's label has the title and the price. The banner is a link labelled «… صفحه‌ی اجرا». The DOM order is header, scenes, rail.
- Focus rings are white, 2px, with an offset. The solid panels keep white text at a high contrast on any banner.

---

## 13. Performance

- Continuous motion is `transform` and `opacity` only. The only per-frame style writes are the time-left bar's scale, the picture's zoom and (with music) the panel's scale and the equaliser bars, each written only when its value changed.
- No `backdrop-filter`, no blend modes, no WebGL, no `filter` on a big element (the old glow is gone).
- Scenes are built once and reused (kept hidden, `visibility: hidden`); after the intro the other shows' scenes are built one at a time, so each fade starts at once. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset>`).
- When the tab is hidden or the hero is scrolled away, the timer, the time-left bar and the picture's motion pause (`IntersectionObserver`, `visibilitychange`).

---

## 14. The comparison page (`../index.html`)

- **No bar.** The chosen version is an `<iframe>` that fills the whole window, so a sample opens at its own size.
- **The switcher is in each version's settings panel** (the round button at the bottom left of v6, v7 and v8): a group «مقایسه‌ی نسخه‌ها» that lists the versions. It works by `postMessage`: the page says `{ heroReady }`, the comparison page answers `{ heroVersions: [{ id, label, name }…], current }`, a click sends `{ heroSwitch: 'v7' }`. The group is hidden when the page is opened on its own.
- A version without that group (v1–v5 in the repository's page) is noticed after 1.6 s and gets a tiny floating capsule («نسخه ۸») at the bottom right that opens a list.
- Keys 1–8 (6–8 in the private preview), and `#v8` in the address, also switch.
- The private preview carries versions 6–8 only.

---

## 15. Measured

- **Fit:** no horizontal scroll, nothing outside the hero, no overlap between the panels, no clipped text, no description over two lines, the rail lined up with the banner column, the gaps equal, the corners soft and the panels opaque, with the cards on the left and on the right, in both layouts (102 combinations in all), at 1920×1080, 1920×1028, 1920×940, 2560×1300, 1536×730, 1440×900, 1440×760, 1366×768, 1366×650, **1366×560**, 1280×720, 1280×600, **1280×520**, 1024×768, 820×1180 (portrait tablet), 390×844 and 360×700.
- **The banner is whole:** the banner panel has the banner's proportions to within 2 % at every size (no cut), 1506×847 at 1920×1080.
- **Pictures of any shape:** a 3:1 test picture is accepted («قابش کم‌ارتفاع‌تر می‌شه»); a 9:16 and a 1:1 are refused.
- **Motion:** after five quick clicks 120 ms apart and fourteen changes in a row: one scene showing, the right active card, one scene interactive. Reduced motion: paused, no zoom, shown.
- **The comparison page:** the sample fills the window exactly (1440×760 → 1440×760); the switcher is in the settings panels of v6, v7 and v8 and switches both ways; v1 gets the fallback capsule; key 7 switches.
- **Without the real art:** with the files removed the page draws stand-in pictures and everything still fits.
- **Cost** (1920×1080, software rendering, per second of wall time): paused 2 ms of script, 0 of style and layout; running (zoom + bar) 6 ms of script, 8 ms of style, 2 ms of layout; during a change 6 ms of script, 33 ms of style, 4 ms of layout. The motion is `transform` and `opacity` only, so layout stays at a few milliseconds a second.

---

## 16. What this version leaves out, and why

- **Posters** (round 1): the owner doesn't want them in the hero.
- **The banner under the interface** (round 2): the full-screen banner was hidden by the header, the rail and the capsule; real banners keep words near every edge. The panels replace it. (The owner asked for it, saw it, and asked for the panels.)
- **A safe-area guide** (round 2): not needed when nothing covers the banner.
- **A ticket-shaped card, cut-out people, 3D objects, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in their own panel. A countdown can come back as an optional chip.
