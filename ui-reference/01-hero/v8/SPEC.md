# Hero · نسخه‌ی ۸ · جایگاه ویژه · handoff spec

> **خلاصه برای خودت:** بنر ۱۶:۹ که برگزارکننده می‌ده **پس‌زمینه‌ی کل هیروئه** (۱۹۲۰×۱۰۸۰ رو کامل می‌پوشونه، مثل عکس تمام‌صفحه‌ی ۷). روش فقط سه چیز می‌شینه: هدر کپسولی (مات)، ستون کارت‌ها و یه کپسول مات پایین با اطلاعات و دکمه‌ی خرید. بنر واقعی متن خودش رو داره، پس تیتر درشتی روش نمی‌نویسیم.
> - **پوستر عمودی تو هیرو جا نداره.** پنل مدیریت ردش می‌کنه. جاش قفسه‌ی پوستره (بخش بعدی).
> - **دو چیدمان** که مدیریت برای هر جایگاه یکی‌شون رو انتخاب می‌کنه: *کپسول پایین* (بنری که متن خودش رو داره؛ پیش‌فرض) و *متن سمت چپ* (عکس بدون نوشته؛ همون ۷).
> - **ستون کارت‌ها پیش‌فرض سمت چپه**، چون متن بنرهای فارسی (عنوان، اعتبارات، سالن) تقریباً همیشه سمت راسته و کارت‌ها اگه اونجا باشن می‌پوشوننش. تو پنل می‌شه راست کرد (مثل نسخه‌ی ۷).
> - **ناحیه‌ی امن:** تو پنل «ناحیه‌ی امن رو نشون بده» جاهایی از بنر رو که رابط می‌پوشونه با خط‌خطی نشون می‌ده. متن مهم بنر باید بیرون اونا باشه.
> - تنها جایی که بنر کل صفحه رو نمی‌پوشونه صفحه‌ی باریک یا بلنده (موبایل، تبلت عمودی، نسبت باریک‌تر از ۴:۳): اونجا یه بنر ۱۶:۹ فقط یه تکه‌ی باریکش دیده می‌شه، پس بنر کامل تو قاب می‌شینه، پشتش همون بنر محو شده و اطلاعات زیرشه.
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v8, second round. The first round put the banner in a frame with the facts under it and a blurred copy around it, and also showed one show by its tall poster. The owner's answer: *it is incomplete; the banners must cover the whole 1920×1080, and the vertical posters must not be in the background at all; use the four banners.* This round does that. The owner also asked for the header's background to be opaque («الان حالت شیشه‌ایه»): the header and the bottom capsule are now one solid colour.

The owner sent four real shows, each with a 16:9 banner and a tall poster, all with their words baked in. The sample data in `index.html` uses the **banners**. They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v7 | From v6 | New |
|---|---|---|
| the picture is the background of the whole hero; zoom-out and fade for photos; capsule header; the rail; music | fixed 8-colour palette suggested from the picture; the facts of the show (date card, venue, price, badge); the demo admin panel | the bottom capsule; two layouts; the safe-area guide; the rail on the left; the framed layout for narrow screens; the time-left bar on the rail card; one self-contained scene per show |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Music:** playlist, stored rhythm analysis, `audioSys`, `analyseTrack()`, the player (`../v2/SPEC.md` §7). The beat swells the picture instead of the old background.
- **Colours:** the fixed palette (`../v6/SPEC.md` §4).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The two layouts (and the narrow one)

| Layout | For | On a wide screen | Motion of the picture |
|---|---|---|---|
| **bar** (default) | a banner that has its words in it | the banner covers the hero; a solid capsule at the bottom holds the facts | zooms out from 1.06 to 1 (fixed levels 1.03 / 1.06 / 1.10) |
| **text** | a photo with no words in it | the photo covers the hero; a dark gradient on one side and the words on it (v7) | zooms out from 1.15 to 1 (levels 1.08 / 1.15 / 1.24) |

- **Always 16:9.** The picture is `object-fit: cover` on the whole hero. On a 16:9 screen nothing is cut; the ratio of the screen decides how much is (§14: 5 % at 1920×1028, 13 % at 1920×940, 17 % at 1280×600).
- **Why the banner zooms less:** a banner has words near its edges; a 1.15 start would cut them for the first seconds. A photo has none, so it keeps v7's 1.15.
- **The narrow layout** (`max-width: 760px` or aspect ratio under 1.34) is not a third layout but the same banner shown whole (§6).
- A wide screen is `min-width: 761px` and `min-aspect-ratio: 1.34`. The same test runs in JS (`FRAMED`, `framed()`); keep the two in step.

---

## 2. One geometry for the header, the rail, the capsule and every scene

All sizes are in `--u` (1 % of the width on a 16:9 screen, at most 1.7778 % of the height; clamped 11–26 px). The hero is `100svh` tall, at least 600 px.

```
--pad-t  max(1.2u, safe-area-top)       --pad-b  1.2u
--pad-r  max(2.6u, safe-area-right)     --pad-l  max(4.2u, safe-area-left)    (swapped when the cards are on the left)
--nav-h  max(54px, 3.3u)                --rail-w 15.5u          --dock-h max(60px, 4.8u)
--gap-x  3u                             --gap-y  1.4u
--r1 max(9px, .5u)  --r2 max(12px, .75u) (the capsules)  --r3 max(14px, 1.05u) (the narrow layout's frame)
--capsule #120f1b   (the one solid colour of the header and the bottom capsule)
```

- `.hero`, every `.scene` and the `.guides` overlay are the same grid: `"nav nav" "rail main"` (two columns `--rail-w` and `1fr`; in RTL the first column is on the right). With the cards on the left (`.rail-left`, the default) it is `"nav nav" "main rail"` and the left and right paddings swap. The `text` layout has a third column for the words: `"nav nav nav" "rail . copy"` (or `"copy . rail"`).
- The header sits in `nav`, the rail in `rail`, the capsule in `main` (aligned to the bottom), the words in `copy`. So these pieces **cannot overlap each other**. They overlap only the banner.
- Nothing is measured in JS.

---

## 3. The picture and the capsule (bar)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ╭─ solid header capsule ───────────────────────────────────────────╮ │
│ ╰──────────────────────────────────────────────────────────────────╯ │
│ ┌ card ┐                                                              │
│ ├ card ┤        the banner covers everything                          │
│ ├ card ┤                                                              │
│ └ card ┘   ╭──────── solid capsule: the facts ────────────────────╮    │
│  ⏸ ⌄      ╰──────────────────────────────────────────────────────╯    │
└──────────────────────────────────────────────────────────────────────┘
```

- **The picture** (`.frame > img`): `position: absolute; inset: 0` over the scene, `object-fit: cover`, `object-position: var(--op, 50% 50%)`. It is the first thing in the stack (`z-index: -1`); the header, rail and capsule are above. It is an `<a>` (the whole banner links to the show).
- **The header** (`.nav`): a floating bar `3.3u` tall, radius `.75u`, **solid** `--capsule`, a 1px border at 24 % white, a soft shadow. No `backdrop-filter`, no see-through. (v7's was 64 % opaque; the owner called it "glass".)
- **The capsule** (`.dock`): the same solid colour, border, radius and shadow as the header, `4.8u` tall, in the `main` area at the bottom (`1.2u` above the edge, like the header's `1.2u` below the top). A 2px accent hairline runs along its top, strongest on the start side. Right to left in RTL:
  1. kicker (an accent dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a `3.3u` rounded square, the month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })`; the clock is LTR.
  3. **venue** (label «مکان», one line, ellipsis).
  4. **price** (label «قیمت از», the amount, small «تومان»).
  5. the **buy button** (the v7 pill: `max(44px, 3.1u)` tall, at least 9u wide, in the accent with `onAccent` text, a soft glow).
  - Thin 1px separators between 1–2, 2–3 and 3–4. It is a size container (`container: dock / inline-size`): under 800 px wide the date's second line goes, under 660 px the venue goes.
- **The safe area** (§8): the header, the rail and the capsule hide parts of the banner. At 1920×1080 with the cards on the left they cover the top 8 %, the left 18 % (from 16 % to 92 % of the height) and the bottom 11 % (from 21 % to 96 % of the width). Keep the banner's important words out of them. The banner's own words above 11 % and below 87 % of the height, and between 21 % and 96 % of the width, are safe.

---

## 4. Layout: text (a photo; as v7)

- The photo fills the scene (`object-fit: cover`, `object-position` from the show's `fp.op`, `fp.mop` on phones, zoom origin `fp.o`).
- A dark gradient on the words' side (`0.8` at the edge, `0.62` at 26 %, `0.22` at 50 %, clear by 64 %) plus a light top and bottom one. The gradient follows the words: with the cards on the right the words are on the left; with the cards on the left they are on the right and the gradient turns.
- The words (a `36u` column, vertically centred): kicker, title (`1.95u`, at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, at least 1920 px wide (2560 is better), no words in it, the subject on the cards' side (so the words don't sit on it).

---

## 5. The rail

A column 15.5u wide: the up bar, one 16:9 card per show (the banner), the down bar and the pause button. Radius `max(10px, .6u)`, gap `.75u`; the active card has a 2px accent ring and a glow; keys, `role="tab"`, hover pause: as v7.

- **Side:** `.hero.rail-left` (the default here) or none (the owner's reference had it on the right). It is one setting for the whole hero; the rail must not jump sides between shows.
- **Time left:** a 3px bar at the bottom of the active card grows from the right (the reading direction) over the show's seconds. It is the timer itself: pausing the timer pauses the bar.
- **How many shows:** two to four (the owner's «نهایت ۴ تا»). With more, the column scrolls so the active card stays in view. With one show, hide the rail and the timer and drop the rail column (`--rail-w: 0`, `--gap-x: 0`).

---

## 6. The narrow layout

Under 761 px wide, or with an aspect ratio under 1.34 (a phone, a portrait tablet, a 4:3 window), a 16:9 picture that covers the screen would show only a thin strip of itself. So there:
- the banner is shown **whole** in a frame (the stage is a size container; the ticket `.tk` is as wide and as tall as fits, in the picture's own proportions, radius `--r3`, 1px ring, deep shadow, a faint accent glow);
- behind it the same picture, tiny and soft (the **ambient**: 64 px wide, `blur(2.5px) saturate(1.45)`, stretched over the whole scene, with a radial wash of the accent and a vertical gradient), so any shape fills the screen;
- the facts are under the frame (on phones in two rows: kicker and title, then date, price and the buy button; the venue joins the kicker);
- the rail is a row of small cards at the bottom (phones) or the column (tablets);
- the picture settles (`scale 1.04 → 1` on the whole frame) instead of zooming, and the fade is the "words never sit on words" one: the old frame leaves in `0.32 × fade`, the new one arrives from `0.3 × fade`, so for a moment only the soft colour shows between two designed banners.
- The text layout on a phone is v7's: the photo behind, the words at the bottom over a gradient.

**The ambient** is made once on upload by the server and stored as a ~1 KB WebP; the page never computes it and never needs CORS on the picture. (The prototype computes it in the browser.)

---

## 7. Motion

| t (s) | What happens when the next show comes (a wide screen) |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 1.2 | It fades in over the old one (`sine.inOut`), as in v7. |
| 0 → 8.2 | Its picture zooms out linearly over the show's 7 s plus the next fade's 1.2 s, so it is still moving while the next one fades in. |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The header's accent (the bars, the music ring, the rail ring and bar) changes. |
| 7 | The next show starts (the time-left bar is full). |

- **The panel's options:** the zoom at the start (کم / متوسط / زیاد; `ZOOM` table), 5 / 7 / 10 s per show, a fade of 0.8 / 1.2 / 1.8 s.
- **Pausing** (the timer, the bar and the picture's motion pause together): the pointer over the rail, focus inside it, the pause button, the admin panel open, the hero off screen, the tab hidden.
- **Reduced motion:** no zoom, no settle, a 0.4 s fade, auto-advance starts paused.
- **Quick clicking:** a scene is never reused while it is still fading (a second instance of the same show is built if needed), and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Intro:** the header drops in, the rail slides in, the first scene fades in from the dark page already zooming out, then its words.

---

## 8. Music

Unchanged from v7 (§6 of `../v7/SPEC.md`): playlist panel, waveform scrub, «آهنگ خودت رو امتحان کن». With «تپش آروم تصویر» (default) the whole picture swells `scale(1 + (kick·0.01 + downbeat·0.005)·level)` on each beat (the glow of the narrow layout breathes too); the logo's bars and the four small bars follow the song. «فقط میله‌ها» leaves the picture alone. The songs are not in git (`../assets/music/README.md`).

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
- `startsAt`, `endsAt`: ISO with +03:30. A run shows «۲۳ تا ۲۶ مهر» and «هر شب ساعت …».
- `price` is the lowest price in toman, shown «قیمت از …». `badge` is one of: پیش‌فروش، پرفروش، ظرفیت رو به اتمام، اجرای ویژه، جدید (or none).
- `ambient` is the stored tiny picture (§6). `thumb` is 640 px wide.
- Banners: 640, 1024 and 1672 (or 1920) wide; `srcset` + `sizes="100vw"`. Photos: 640, 1920, 2560.
- **No poster field.** A show's tall poster belongs to the poster shelf, not here.
- The sample's prices, and the dates and venues the banners don't state, are made up.

---

## 10. The admin panel (what the real one does)

The panel in `index.html` («پنل مدیریت · نمونه», the button at the bottom left) runs all of this in the browser. The production version should look the same. It works on the active slot, and every change is shown on the real stage at once (the scene is built again and fades in over the old one; auto-advance pauses while the panel is open).

1. **Image:** drop or pick a file; the box «روی بنر نوشته (عنوان، تاریخ…) هست» (ticked by default) picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found and what will happen: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · کل صفحه رو بدون برش می‌پوشونه», or «نسبت ۳٫۰۰ به ۱ … حدود ۴۱٪ از دو طرف بریده می‌شه». **A tall or square picture (ratio under 1.15) is refused** with «پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا», and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot (to see the text layout).
2. **Info on the banner:** two buttons with a tiny wireframe each: کپسول پایین / متن سمت چپ.
3. **Colour:** eight swatches; the one suggested from the picture is marked (`suggestPalette()`, v6 §4). The admin can pick another.
4. **Texts:** title, venue, price from, badge. (The real panel also has the date and time, the type, the short name, the description and the focal point.)
5. **Page:** the cards on the left (default) or the right; and «ناحیه‌ی امن رو نشون بده», which draws dashed, hatched boxes over the places the header, the rail and the capsule cover.
6. **Reset** puts the slot back as it was.

Validation worth having in the real one: at least 1600×900 (warn below 1920×1080); JPEG, PNG or WebP up to 10 MB; refuse a ratio under 1.15; warn how much a ratio other than 16:9 will lose; warn if the banner's words come closer than 4 % to an edge.

---

## 11. What the server does on upload

| Step | Detail |
|---|---|
| Read the file | JPEG, PNG or WebP. Note the size and the ratio. Refuse a ratio under 1.15 (a poster). |
| Make the sizes | WebP: 640, 1024, 1672 (1920 if the source has it); photos 640, 1920, 2560. Never upscale. |
| Make the ambient | 64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, stored as a ~1 KB WebP (§6). |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest palette colour; a black-and-white picture gets violet. Store the key. On the four sample banners it gives gold, crimson, orange and crimson. |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them. |
| Never | tint, crop, redraw or put anything on the organiser's picture beyond the interface in §3. |

---

## 12. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`.
- Each scene has one `<h1>` (visible in the text layout, visually hidden in the bar layout).
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button.
- A visually hidden `role="status"` line says «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان» when the visitor (not the timer) changes the show.
- The buy button's label has the title and the price. The banner is a link labelled «… صفحه‌ی اجرا». The DOM order is header, scenes, rail.
- Focus rings are white, 2px, with an offset (on the banner, inside it).
- The solid capsules keep white text at a high contrast on any banner.

---

## 13. Performance

- Continuous motion is `transform` and `opacity` only. The only per-frame style writes are the time-left bar's scale, the zoom (or settle) and (with music) the picture's scale, the narrow layout's glow and the equaliser bars, each written only when its value changed.
- No `backdrop-filter`, no blend modes, no WebGL. The one blur is on a static element (the narrow layout's glow).
- Scenes are built once and reused (kept hidden, `visibility: hidden`); after the intro the other shows' scenes are built one at a time, so each fade starts at once. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset>`).
- When the tab is hidden or the hero is scrolled away, the timer, the time-left bar and the picture's motion pause (`IntersectionObserver`, `visibilitychange`).

---

## 14. Measured

- **The banner covers the screen:** at 1920×1080 and 1366×768 the picture box is exactly the hero and the banner is shown with 0 % cut; at 1920×1028 5 %, at 1920×940 13 %, at 1440×900 and 2560×1300 10 %, at 1280×600 17 % (the ratio of the screen).
- **Fit:** no horizontal scroll, nothing outside the hero, no overlap between the header, the rail and the capsule (or the words), no clipped text and no description over two lines, with the cards on the left and on the right, in both layouts, at 1920×1080, 1920×1028, 1920×940, 2560×1300, 1536×730, 1440×900, 1366×768, 1366×650, 1280×720, 1280×600, 1024×768, 820×1180 (portrait tablet), 390×844 and 360×700.
- **Solid:** the header and the capsule are opaque (`rgb(18, 15, 27)`).
- **Pictures of any shape:** a 3:1 test picture is accepted with «حدود ۴۱٪ از دو طرف بریده می‌شه»; a 9:16 and a 1:1 are refused.
- **Motion:** after five quick clicks 120 ms apart and fourteen changes in a row: one scene showing, the right active card, one scene interactive. Reduced motion: paused, no zoom, shown.
- **Without the real art:** with the files removed the page draws stand-in pictures and everything still fits.
- **Cost** (1920×1080, software rendering): paused 3 ms of script per second; running (zoom + bar) 6 ms of script and 16 ms of style; during a change 13 ms of script and 23 ms of style. Layout 0–3 ms. There is no layout per frame.

---

## 15. What this version leaves out, and why

- **Posters** (round 1): the owner doesn't want them in the hero. A tall poster as the background means either a thin strip of it or a blurred one behind a small copy.
- **A framed banner on a wide screen** (round 1): replaced by the full-bleed banner. The frame survives only on narrow screens.
- **Cut-out people and 3D objects** (v6): they need a server-side segmentation step that fails on real banners, and the organiser's picture is never meant to be redrawn.
- **The tilted big ticket, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in the capsule. A countdown can come back as an optional chip.
