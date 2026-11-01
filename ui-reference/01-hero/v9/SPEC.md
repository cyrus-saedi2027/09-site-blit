# Hero · نسخه‌ی ۹ · جایگاه ویژه، دقیقاً اندازه‌ی دسکتاپ · handoff spec

> **خلاصه برای خودت:** نسخه‌ی ۹ همون نسخه‌ی ۸ است (همون چند کادر جدای نرم‌گوشه با فاصله‌ی کم: **هدر**، **کادر کارت‌ها**، **کادر خودِ بنر**، **کادر اطلاعات**) که **دقیقاً اندازه‌ی دسکتاپ** شده. قبلاً تو یه پنجره‌ی واقعی مرورگر (مثلاً ۱۹۲۰×۹۳۷) دو طرف حدود ۱۵۰ پیکسل جای خالی می‌موند، چون ترکیب وسط پنجره می‌نشست و عرضش از ارتفاع در می‌اومد. حالا:
> - **کادرها کل پنجره رو لبه‌به‌لبه پر می‌کنن**، با یه حاشیه‌ی برابر از هر چهار طرف و یه فاصله‌ی برابر بینشون. روی هر دسکتاپی (۱۲۸۰×۶۰۰ تا ۲۵۶۰×۱۴۴۰ و عریض‌تر) و بدون اسکرول.
> - **کادر بنر هر جایی که می‌مونه رو می‌گیره.** بنر همیشه کامل و بی‌برش وسطش می‌شینه. اگه شکل کادر با شکل بنر فرق داشت، دو طرفش (یا بالا و پایینش) با **لبه‌ی آینه‌شده و محوشده‌ی خودِ بنر** پر می‌شه، پس رنگ‌ها بدون درز ادامه پیدا می‌کنن. هیچ‌چیز روی بنر نمی‌افته.
> - **کادر کارت‌ها:** هر اجرا یه تصویر ۱۶:۹ دارد و **زیرش یه خط** (اسم اجرا و روزش). کارت‌ها ارتفاع ستون رو مساوی بین خودشون تقسیم می‌کنن، پس جای خالی بالا و پایین نمی‌مونه.
> - **پنجره‌ی خیلی عریض** (عریض‌تر از ۲٫۲۵ به ۱): ترکیب بزرگ‌تر نمی‌شه و وسط می‌مونه. **پنجره‌ی بلند** (بلندتر از ۴ به ۵) و موبایل: کادرها زیر هم.
> - تو **صفحه‌ی مقایسه** تنظیمات نمونه یه گروه «اندازه‌ی نمایش» داره: ۱۹۲۰×۱۰۸۰ و چند اندازه‌ی دیگه، دقیق و با مقیاس، حتی تو پنجره‌ی کوچک.
> - کنار صفحه اسکرول‌بار نیست (یادداشت‌ها زیر هیرو هستن؛ لینکشون تو پنل تنظیمات است).
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v9, the fourth owner round. The owner about v8: *it turned out really good*; then: *copy it to version 9, make 9 more professional, and make its size right, it isn't the exact desktop size right now.*

What was wrong: v8 worked out one block (the rail and a banner column in the banner's own 16:9) and centred it. On a 16:9 screen (1920×1080) that block is the whole window. In a real browser window, which is almost always wider than 16:9 (1920×937 is 2.05 : 1, a 1366×650 laptop window is 2.1 : 1), the block is limited by the height and leaves about 8–10 % empty at each side. v9 lets every panel take what is left instead, so the page is the window.

What else changed (the "professional" part):
- the rail's cards fill the rail (no empty strips above and below) and carry a line of words under the picture instead of on it, so the organiser's art is never covered, even in the thumbnails;
- the shows that are not on are a little quieter (86 % brightness) and wake on hover; the banner's frame answers the pointer;
- a hair of light on the top edge of every panel; no type below 10.5 px at any window size (the unit «تومان» used to fall to 8.7 px);
- the picture sizes (`sizes`) say what the browser really needs (the panel is about four fifths of the width);
- no scrollbar beside the hero; the notes under it are one click from the panel.

The owner sent four real shows, each with a 16:9 banner and a tall poster, all with their words baked in. The sample data in `index.html` uses the **banners**. They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v8 | From v7 | New in v9 |
|---|---|---|
| the panels, the solid colours, the two layouts, the facts panel, the scenes and their fades, the admin panel, the ambient behind, the palette | the picture's zoom-out and fade; the capsule header; the music | panels that tile the window; a banner panel that takes what is left; the mirrored edge; cards with a line of words under them, sized by the room; wide and tall window rules; the preview sizes |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Music:** playlist, stored rhythm analysis, `audioSys`, `analyseTrack()`, the player (`../v2/SPEC.md` §7). The beat swells the banner's panel a little (up to 0.9 %, so it stays inside the gap).
- **Colours:** the fixed palette (`../v6/SPEC.md` §4).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The panels

```
┌──────────────────────────────────────────────────────────────────────┐
│ ╭─ header ───────────────────────────────────────────────────────╮   │
│ ╰────────────────────────────────────────────────────────────────╯   │
│ ╭ rail ──╮  ╭─ the banner's panel (takes all that is left) ──────╮   │
│ │ ˄      │  │░░░░░░ ┌────────────────────────────────┐ ░░░░░░░░ │   │
│ │ [pic]  │  │░ edge │   the banner, whole, centred   │ edge ░░░ │   │
│ │ caption│  │░░░░░░ └────────────────────────────────┘ ░░░░░░░░ │   │
│ │ [pic]  │  ╰────────────────────────────────────────────────────╯   │
│ │ caption│  ╭─ the facts ────────────────────────────────────────╮   │
│ │ ⏸  ˅   │  ╰────────────────────────────────────────────────────╯   │
│ ╰────────╯                                                           │
└──────────────────────────────────────────────────────────────────────┘
        (behind everything: the same banner, tiny and soft)
```

Every panel is a solid rounded frame: background `--capsule` (`#120f1b`, opaque), a 1px border at 22 % white, a 1px highlight on its top edge (`inset 0 1px 0 rgba(255,255,255,.05)`), radius `--r`, a soft shadow (`0 14px 40px -20px`). The gap between any two is `--gap`. No `backdrop-filter`, no see-through.

| Piece | What it is |
|---|---|
| **Header** (`.nav`) | the v7 capsule: logo with five bars, five categories, the music player, «ورود \| ثبت‌نام». `--nav-h` tall, the whole width of the block. |
| **Rail** (`.rail`) | a panel as tall as the banner column. Up bar, the cards, the down bar and the pause button. Width: §7. |
| **Banner** (`.frame`) | the banner's panel: all the room between the header and the facts. The banner is shown whole inside it (§5). It is a link to the show. |
| **Facts** (`.dock`, layout bar) | the same solid panel, `--dock-h` tall (`max(56px, 4.8u)`), exactly as wide as the banner's panel, `--gap` under it. |

---

## 2. One geometry

All sizes are in `--u` (1 % of the width on a 16:9 screen, at most 1.7778 % of the height; clamped 8–26 px, so a short window shrinks the composition instead of cutting it). The hero is `100svh` tall (at least 440 px).

```
--u        clamp(8px, min(1vw, 1.7778svh), 26px)
--edge-x   max(1.2u, (100vw − max(440px, 100svh) × 2.25) / 2)        the side margin; grows only on a window wider than 2.25 : 1
--pad-t/b  max(1.2u, safe-area)        --pad-l/r  max(--edge-x, safe-area)        --gap  .8u
--nav-h    max(50px, 3.3u)             --dock-h   max(56px, 4.8u)                 --r    max(12px, 1u)
--main-h   max(440px, 100svh) − pad-t − pad-b − nav-h − gap                     the height of the row under the header
--n        the number of shows (the script sets it)
--rail-pad .75u    --arrow-h max(28px, 1.85u)    --card-gap .6u    --cap-h max(22px, 1.3u)    --cap-gap .35u
--cell-h   (main-h − 2·rail-pad − 2px − 2·arrow-h − (n + 1)·card-gap) / n                   what each card has
--thumb-w  (cell-h − cap-h − cap-gap) × 16/9                                                 the widest 16:9 picture that fits it
--rail-w   clamp(11u, thumb-w + 2·rail-pad + 2px, 17u)
```

- **The grid** (hero and every scene): `grid-template-columns: var(--rail-w) minmax(0, 1fr)`, `grid-template-rows: var(--nav-h) minmax(0, 1fr)`, areas `"nav nav" "rail main"` (with the cards on the left, `.rail-left`, the default: `"nav nav" "main rail"`), `gap: var(--gap)`, `padding: var(--pad-t) var(--pad-r) var(--pad-b) var(--pad-l)`. The rail and the banner column take **all** the width, so nothing is left over at the sides. (v8 centred a block whose width came from the height.)
- **The banner column** (`.tk`): `grid-template-rows: minmax(0, 1fr) var(--dock-h)`, `row-gap: var(--gap)`. The banner's panel is the first row, the facts the second, so the banner's panel is `main-h − dock-h − gap` tall and as wide as the column.
- **At 1920×1080** the numbers are v8's: margin 23 px, rail 326 px (17u), banner panel 1532×847 (the banner is 1506×847, so the panel's 26 px extra is the mirrored edge, 13 px each side). **At 1920×937** (a typical browser window): margin 19 px, rail 283 px, banner panel 1583×735 (picture 1307×735, edge 140 px each side).
- **In production** the hero is a size container (`container-type: size`) and the page's `100vw` / `100svh` above become `100cqw` / `100cqh` of the hero, so the same maths works when the hero is not the whole window. Declare the variables on the hero element, not on `:root`, so the container units resolve against it.

---

## 3. Layout bar (a banner with its own words)

- The banner's panel, then the facts panel. Nothing is drawn over the banner (no badge, no title, no gradient).
- **The facts**, right to left in RTL; a 2px accent hairline runs along the panel's top edge, strongest on the start side:
  1. kicker (an accent dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a `3.3u` rounded square, the month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })`; the clock is LTR.
  3. **venue** (label «مکان», one line, ellipsis).
  4. **price** (label «قیمت از», the amount, small «تومان», never under 10.5 px).
  5. the **buy button** (the v7 pill: at least `40px` tall, `3.1u`, at least 9u wide, in the accent with `onAccent` text, a soft glow).
  - Thin 1px separators between 1–2, 2–3 and 3–4. The panel is a size container (`container: dock / inline-size`): under 800 px wide the date's second line goes, under 660 px the venue goes.

## 4. Layout text (a photo; as v7, inside its panel)

- The photo fills one panel as tall as the banner's and the facts' together (the whole row), and there is no facts panel: the words sit on the photo. A photo is allowed to be cropped (`object-fit: cover`, with the focal point), because it has no words in it.
- A dark gradient on the words' side (`0.84` at the edge, `0.66` at 28 %, `0.22` at 52 %, clear by 68 %) plus a light top and bottom one. The words go on the side **away from the cards**, so the gradient and the words follow the rail: cards on the left → words on the right.
- The words (a `34u` column, vertically centred): kicker, title (`1.95u`, at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, at least 1920 px wide (2560 is better), no words in it, the subject on the cards' side. The sample photo comes in two mirror images for that (`pop-frequency-*` and `-flip-*`); the panel picks by the rail's side.

---

## 5. The banner's panel and its edge

The banner is **never cut and never covered**. It is drawn with `object-fit: contain` in a panel that takes whatever room is left, so:

- if the panel has the banner's own shape (to within 0.4 %), the banner fills it;
- otherwise the banner sits whole in the middle, and the rest of the panel is **the banner's own edge, mirrored and blurred**: two copies of the same picture, one on each side (class `is-h`) or one above and one below (`is-v`), flipped (`scaleX(-1)` or `scaleY(-1)`) so the column of pixels next to the picture is the picture's own edge column, blurred with `blur(1.4u)` and darkened by 26 %. The colours therefore run on from the picture without a seam. Each copy is `3σ` wider than the part that shows, and the picture sits on top, so the blur never fades into a gap at the seam.
- The script measures the panel (`ResizeObserver`) and writes the picture's size as `--pw` and `--ph` on the panel; the CSS places the copies from those. The class says which way the bars go. No second image file is needed (the copies use the banner's own URL, already cached).
- The picture and its extension are one layer (`.pic`), so the zoom-out (§6) moves them together and no edge slides over the fill.
- **The alternatives, and why not:** cropping the banner to the panel would cut the baked words (the sample «SkyKings» is half a per cent from the edge); leaving margins is the v8 problem; a vertical info column beside a full-height banner needs a window wider than about 2.4 : 1.
- A 3:1 banner in a 16:9 panel gets bars above and below; a 4:3 one gets bars at the sides. The admin panel says so.

### The page's own ambient

Behind the panels, the same banner, tiny and soft, fills the whole hero (`.amb`: `background: var(--amb) center / cover`, a radial wash of the accent at 24 %, a vertical dark gradient). It is what shows in the page margin and the gaps, so the page takes each show's colours. **It is made once on upload by the server** (64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, stored as a ~1 KB WebP); the page never computes it and never needs CORS on the picture. (The prototype computes it in the browser.)

---

## 6. Motion

| t (s) | What happens when the next show comes |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 1.2 | The ambient fades in over the old one (`sine.inOut`). |
| 0 → 0.38 | The old panels' content fades out (`0.32 × fade`, `sine.out`). |
| 0.36 → 1.2 | The new panels' content fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0 → 8.2 | The picture (and its extension, as one layer) zooms out inside its panel (linearly) over the show's 7 s plus the next fade's 1.2 s, so it is still moving while the next one fades in. |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The header's accent (the bars, the music ring, the rail ring and bar) changes. |
| 7 | The next show starts (the time-left bar is full). |

- **Why the content fades apart from the ambient.** Two designed banners overlapped for a whole fade show two sets of words on top of each other. This way the old one is gone before the new one arrives, and for a moment there is only the soft colour between them.
- **The zoom** starts small, because the banner's words are near its edges and a panel clips the picture while it zooms: banner 1.02 / **1.05** / 1.09, photo 1.08 / **1.15** / 1.24 (the panel's «زوم اول تصویر»: کم / متوسط / زیاد). When the banner has bars at its sides the zoom grows into them, so the sides lose nothing; only the top and the bottom are clipped for a moment.
- **Pausing** (the timer, the bar and the picture's motion pause together): the pointer over the rail, focus inside it, the pause button, the admin panel open, the hero off screen, the tab hidden.
- **Reduced motion:** no zoom, a 0.4 s fade, auto-advance starts paused.
- **Quick clicking:** a scene is never reused while it is still fading (a second instance of the same show is built if needed), and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Intro:** the header drops in, the rail slides in, the first scene fades in from the dark page already zooming out, then its words.
- **Music:** with «تپش آروم تصویر» (default) the banner's panel swells `scale(1 + (kick·0.006 + downbeat·0.003)·level)` on each beat; the logo's bars and the four small bars follow the song.

---

## 7. The rail

A panel with one card per show, the up and down bars and the pause button. The panel is as tall as the banner column, so its top is the banner's top and its bottom is the facts panel's bottom (or the photo's, in the text layout).

- **A card** is a 16:9 picture (the banner's 640 px version) with one line under it: «کنسرت SkyKings» on the start side and the short day («۷ آبان», «۲۵–۳۰ مهر») on the end side. Nothing is drawn on the picture except the 2px ring of the active card and the time-left bar. The line is one row, `--cap-h` tall; the day goes when the picture is narrower than 190 px; a long name is cut with an ellipsis.
- **The cards share the height equally** (`--cell-h`), centred in their cell, so the gaps are equal and the first and the last card have the same room above and below. The picture's width is the smaller of the rail's inner width and `--thumb-w`; the rail's width follows (§2), at most `17u`, so on a 16:9 screen the pictures fill the rail exactly.
- **More cards than fit** (`--n` above four): each cell keeps a minimum height and the list scrolls inside the panel, the active card kept in view.
- **States:** the active card has the accent ring and a glow, its words are white; the others are at 86 % brightness and 92 % saturation and come back to full on hover; focus has a white ring; keys, `role="tab"`, hover pause: as v7.
- **Side:** `.hero.rail-left` (the default) or not (the v7 reference had it on the right). One setting for the whole hero; the rail must not jump sides between shows. With the cards on the left the pause button sits on the banner's side of the footer, so the prototype's settings button (bottom left) can float over the end of the down bar.
- **Time left:** a 3px bar at the bottom of the active picture grows from the right (the reading direction) over the show's seconds. It is the timer itself: pausing the timer pauses the bar.
- **How many shows:** two to four (the owner's «نهایت ۴ تا»). With one show, hide the rail and the timer.

---

## 8. Other window shapes

- **Wide** (wider than 2.25 : 1, e.g. 3440×1440 or 1920×800): the composition stops growing; the side margin grows instead (`--edge-x`), so the panels never become long strips.
- **Short** (the preview pane of a laptop can be 500–600 px tall): `--u` shrinks down to 8 px and the hero may be as short as 440 px, so the whole composition still fits.
- **Tall and narrow** (under 761 px wide, or taller than 4 : 5): the panels stack in one column: header, banner, facts, then the rail as a row of small cards in a thin panel (no captions). The banner's panel keeps the banner's own shape here (`aspect-ratio`), so nothing needs an extension. The facts panel is two rows (kicker and title; then date, price and the buy button; the venue joins the kicker). The text layout is the photo with the words at the bottom over a gradient. `--gap` and the padding are 10px.
- **4 : 3 windows** (1024×768) use the same side-by-side grid; the banner shows bars above and below. A 5 : 4 window (1280×1024) is already stacked.

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
- `startsAt`, `endsAt`: ISO with +03:30. `price` is the lowest price in toman. `badge` is one of: پیش‌فروش، پرفروش، ظرفیت رو به اتمام، اجرای ویژه، جدید (or none). The short day under a rail card comes from `startsAt` / `endsAt`.
- Banners: 640, 1024 and 1672 (or 1920) wide; `srcset` + `sizes="(min-width: 761px) 82vw, 100vw"`. Photos: 640, 1920, 2560.
- **No poster field.** A show's tall poster belongs to the poster shelf, not here.
- The sample's prices, and the dates and venues the banners don't state, are made up.

---

## 10. The admin panel (what the real one does)

The panel in `index.html` («تنظیمات نمونه» / «پنل مدیریت · نمونه», the round button at the bottom left) runs all of this in the browser. The production version should look the same. It works on the active slot, and every change shows on the real stage at once (the scene is built again and fades in over the old one; auto-advance pauses while it is open).

0. **مقایسه‌ی نسخه‌ها** and **اندازه‌ی نمایش** (only inside the comparison page): buttons for every version and for the preview sizes; the current ones are marked, and the second says the scale when the frame is scaled down. See §14.
1. **Image:** drop or pick a file; the box «روی بنر نوشته (عنوان، تاریخ…) هست» (ticked by default) picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · تو قابش کامل و بدون برش دیده می‌شه», or «نسبت ۳٫۰۰ به ۱ … کامل دیده می‌شه، ولی بالا و پایینش با رنگ‌های محوشده‌ی خودش پر می‌شه». **A tall or square picture (ratio under 1.15) is refused** («پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا»), and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot (to see the text layout).
2. **Info:** کادر پایین / متن روی عکس (a tiny wireframe on each).
3. **Colour:** eight swatches; the one suggested from the picture is marked (`suggestPalette()`, v6 §4).
4. **Texts:** title, venue, price from, badge. (The real panel also has the date and time, the type, the short name, the description and the focal point.)
5. **Cards' side:** left (default) or right. (A sample photo turns into its mirror image with it.)
6. A link to the design notes under the hero.
7. **Motion and music:** zoom at the start, seconds per show, fade, the beat's reaction.
8. **Reset** puts the slot back as it was.

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
| Never | tint, crop, redraw or put anything on the organiser's picture. (The mirrored edge is drawn by the page, outside the picture, from the same file.) |

---

## 12. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`.
- Each scene has one `<h1>` (visible in the text layout, visually hidden in the bar layout).
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button. A card's accessible name is «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان»; the visible caption is decoration for it.
- A visually hidden `role="status"` line says the same when the visitor (not the timer) changes the show.
- The buy button's label has the title and the price. The banner is a link labelled «… صفحه‌ی اجرا». The mirrored edge is `aria-hidden` and has empty alt text. The DOM order is header, scenes, rail.
- Focus rings are white, 2px, with an offset. The solid panels keep white text at a high contrast on any banner.

---

## 13. Performance

- Continuous motion is `transform` and `opacity` only. The only per-frame style writes are the time-left bar's scale, the picture's zoom and (with music) the panel's scale and the equaliser bars, each written only when its value changed.
- No `backdrop-filter`, no blend modes, no WebGL. The mirrored edge is the only `filter` on a big element: it is blurred once, inside the layer that zooms (`will-change: transform`), so the zoom moves a finished texture; the copies exist only in the bar layout and only when the panel's shape differs from the banner's.
- Scenes are built once and reused (kept hidden, `visibility: hidden`); after the intro the other shows' scenes are built one at a time, so each fade starts at once. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset imagesizes>`).
- When the tab is hidden or the hero is scrolled away, the timer, the time-left bar and the picture's motion pause (`IntersectionObserver`, `visibilitychange`).

---

## 14. The comparison page (`../index.html`)

- **No bar.** The chosen version is an `<iframe>` that fills the whole window, so a sample opens at its own size.
- **The switcher is in each version's settings panel** (the round button at the bottom left of v6, v7, v8 and v9): a group «مقایسه‌ی نسخه‌ها» that lists the versions and a group «اندازه‌ی نمایش». It works by `postMessage`: the page says `{ heroReady }`, the comparison page answers `{ heroVersions: [{ id, label, name }…], current, sizes: [{ id, label }…], size, scale }`, a click sends `{ heroSwitch: 'v7' }` or `{ heroSize: '1920x1080' }`.
- **Preview sizes.** `auto` is the real window. A fixed size (`1920x1080`, `1536x864`, `1440x900`, `1366x768`, `1024x768`, `390x844`) puts the version in a frame of exactly that many CSS pixels, centred, scaled down (`transform: scale()`) when the window is smaller, never up. Inside, the page really has that viewport, so a desktop design can be seen at the desktop size even in a small preview pane. The size survives a switch of version and is in the address: `#v9@1920x1080`.
- A version without those groups (v1–v5 in the repository's page) is noticed after 1.6 s and gets a tiny floating capsule («نسخه ۹») at the bottom right that opens a list of versions and sizes.
- Keys 1–9 (6–9 in the private preview), and `#v9` in the address, also switch.
- The private preview carries versions 6–9 only.

---

## 15. Measured

- **Fit:** 22 window sizes × cards on both sides × bar and text layouts = 132 checks, all passing: 2560×1440, 2560×1300, 1920×1080, 1920×1028, 1920×937, 1920×800, 1680×900, 1536×730, 1536×864, 1440×900, 1440×790, 1366×768, 1366×650, 1280×720, 1280×600, 1280×520, 1024×768, 1280×1024, 3440×1440, 820×1180, 390×844, 360×700. Each checks: no horizontal scroll; header, rail, banner and facts reach the same margin on every side to within 1 px (23 px at 1920×1080, 19 px at 1920×937); the three gaps equal `--gap`; the rail's top and bottom are the banner column's; no overlap; corners soft and panels opaque; no clipped text; the banner's own rectangle has the banner's ratio and lies inside its panel; the mirrored edge is on exactly when the shapes differ; the cards are 16:9, inside the rail, evenly spaced and centred between the arrow bars; no text under 10.4 px.
- **The picture is whole:** the picture's rectangle inside the panel has the banner's ratio to within 1.2 % at every size.
- **Pictures of any shape:** a 3:1 test picture is accepted (bars above and below); a 9:16 and a 1:1 are refused.
- **Motion:** after five quick clicks 120 ms apart and fourteen changes in a row: one scene showing, the right active card, one scene interactive. Reduced motion: paused, no zoom, shown.
- **The comparison page:** the sample fills the window exactly (1440×760 → 1440×760); `1920x1080` makes the page inside exactly 1920×1080, scaled to 70 % and centred; the size and the version survive each other; v1 gets the fallback capsule; keys switch.
- **Without the real art:** with the files removed the page draws stand-in pictures and everything still fits.
- **Cost** (1920×1080, software rendering, per second of wall time): paused 4 ms of script, nothing in style and layout; running (zoom + bar) 7 ms of script, 9 ms of style, 1 ms of layout; during a change 8 ms of script, 37 ms of style, 5 ms of layout.

---

## 16. What this version leaves out, and why

- **Posters:** the owner doesn't want them in the hero.
- **Cropping the banner to the panel, or covering it:** the baked words must stay whole and visible.
- **A safe-area guide:** not needed when nothing covers the banner.
- **A second info column for very wide windows, a 2 × 2 card grid, a taller facts panel for tall windows:** each would use the spare room better in one shape of window and complicate every other; the mirrored edge handles all of them the same way.
- **A ticket-shaped card, cut-out people, 3D objects, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in their own panel. A countdown can come back as an optional chip.
