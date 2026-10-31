# Hero · نسخه‌ی ۸ · جایگاه ویژه · handoff spec

> **خلاصه برای خودت:** هر برگزارکننده یه بنر یا پوستر می‌ده و ما کنترلی روی شکل و اندازه‌ش نداریم؛ تازه، روی بنرهای واقعی خودِ متن (عنوان، تاریخ، سالن) پخته شده. برای همین این نسخه **هیچ‌چیز روی بنر نمی‌کشه و هیچ‌جاش رو نمی‌بره**.
> - **سه قالب** که مدیریت برای هر جایگاه یکی‌شون رو انتخاب می‌کنه:
>   1. **بنر کامل** (پیش‌فرض): بنر با نسبت خودش و بدون برش تو یه قاب می‌شینه؛ پشتش همون بنر خیلی محو شده پخش می‌شه (رنگ صفحه رو از بنر می‌گیره). اطلاعات (دسته، عنوان، تاریخ، مکان، قیمت، دکمه) تو یه نوار زیر قاب میاد.
>   2. **پوستر**: پوستر عمودی کامل و بزرگ، با نوشته‌ها کنارش.
>   3. **عکس و متن**: عکسِ بدون نوشته کل صفحه رو می‌گیره، زوم‌اوت می‌شه و روی بعدی محو می‌شه (دقیقاً نسخه‌ی ۷)؛ عنوان و توضیح رو سایت روش می‌نویسه.
> - هدر کپسولی، ستون کارت‌های سمت راست، موزیک و پالت ثابت ۸ رنگ همون نسخه‌ی ۷ و ۶ هستن.
> - تو `index.html` یه **پنل مدیریت نمونه** هست (دکمه‌ی پایین‌چپ): قالب رو عوض کن، عکس خودت رو بنداز، رنگ و نوشته‌ها رو عوض کن؛ همه‌چیز همون لحظه رو صحنه‌ی واقعی دیده می‌شه.
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v8, new. After the first seven versions the owner said none of them fully won them over, that they liked 6 and 7, and that each lacked something:
- 7 is simple and attractive, but it is only a photo with words on it: no date, no price, no sense of a "featured slot", and any real banner (words already in the image) collides with the words it draws and gets cropped by `object-fit: cover`.
- 6 is complete, but it needs a cut-out person or a tilted "big ticket", it is busy, and the poster-as-ticket didn't sit right.
- The site owner (the client) will sell this section as a **featured slot** to organisers, so whatever an organiser uploads must sit well without anyone editing it.

The owner sent four real shows, each with a 16:9 banner and a tall poster (all with their words baked in). The sample data in `index.html` uses them. They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v7 | From v6 | New |
|---|---|---|
| capsule header; vertical rail of 16:9 cards, arrows, pause; fade into the next; zoom-out for photos; music in the header | fixed 8-colour palette suggested from the picture; the facts of the show (date card, venue, price, badge); the demo admin panel; the idea that the organiser's picture is never redrawn | the three templates; the ambient; the info strip; scenes (one self-contained layout per show); the time-left bar on the rail card |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Music:** playlist, stored rhythm analysis, `audioSys`, `analyseTrack()`, the player (`../v2/SPEC.md` §7). The beat now swells the frame (or the photo) instead of the whole background.
- **Colours:** the fixed palette (`../v6/SPEC.md` §4).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The three templates

| Template | For | What is on screen | Motion of the picture |
|---|---|---|---|
| **banner** | a finished wide banner (words in it) | ambient; the banner whole in a rounded frame; under it a strip with the facts | the frame settles from `scale(1.04)` to 1 (never crops) |
| **poster** | a tall poster | ambient; the poster whole; the words and the buy button next to it | the poster settles from 1.04 to 1 |
| **photo** | a photo with no words in it | the photo full screen, a dark gradient on the words' side, the words over it (v7) | zooms out from 1.15 to 1 (v7) |

- **Which one?** The admin chooses; the panel suggests (§11). Rule of thumb: ratio below 1.15 → poster; wider and with words in it → banner; wider and without words → photo.
- **A show may have both a banner and a poster** (organisers usually do). The template says which one is used. The other stays for later sections (a poster shelf).
- Showing a banner that has words in it with the *photo* template is the one wrong choice: the words collide and the picture is cropped. The demo panel lets you try it on purpose.

---

## 2. One geometry for the header, the rail and every scene

All sizes are in `--u` (1 % of the width on a 16:9 screen, at most 1.7778 % of the height; clamped 11–26 px). The hero is `100svh` tall, at least 600 px.

```
--pad-t  max(1.2u, safe-area-top)       --pad-r  max(2.6u, safe-area-right)
--pad-b  2.4u                           --pad-l  max(4.2u, safe-area-left)
--nav-h  max(54px, 3.3u)                --rail-w 15.5u
--gap-x  3u                             --gap-y  1.4u
--r1 max(9px, .5u)  --r2 max(12px, .75u) (capsule)  --r3 max(14px, 1.05u) (the big frame)
```

- The hero and every scene are the same grid: two columns (`--rail-w`, then `1fr`; in RTL the rail is on the right) and two rows (`--nav-h`, then `1fr`), with the same paddings and gaps. The header spans both columns of row 1; the rail sits in column 1 of row 2.
- A scene never draws under the rail or the header (banner and poster); the photo scene does (it is full screen, as in v7).
- So the pieces cannot overlap by construction. Nothing is measured in JS.

---

## 3. Template: banner

```
┌──────────────────────────────────────────────────────────────────────┐
│ ╭────────────────────────── capsule header ───────────────────────╮   │
│ ╰─────────────────────────────────────────────────────────────────╯   │
│  ┌── frame: the banner, whole, its own proportions ──────┐  ┌ card ┐   │
│  │                                                       │  ├ card ┤   │
│  │                                                       │  ├ card ┤   │
│  ├─ accent hairline ─────────────────────────────────────┤  └ card ┘   │
│  │ [خرید بلیت]  قیمت از │ مکان │ [ماه|روز] │ ● دسته [برچسب] عنوان │   (RTL) │
│  └───────────────────────────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────────────┘
```

- **The stage** is column 2 / row 2. It is a size container (`container-type: size`) and centres the ticket.
- **The ticket** (`.tk`) is the frame plus the strip:
  - width `min(100cqw, (100cqh − dock-h) × ratio)`, where `ratio` is the picture's own width ÷ height, clamped to 0.5–3.4. So it is as wide as the stage allows, but never taller than the stage: a 16:9 banner is width-limited on a 16:9 screen (74.7u wide), a 4:3 picture is height-limited and narrower.
  - `dock-h` is `max(66px, 5.4u)`.
  - It is also a size container named `tk`, so the strip can drop parts by the frame's width instead of the screen's: `d-when` second line under 800 px, the venue cell under 660 px.
- **The frame** (`.frame`, an `<a>`): `aspect-ratio: ratio`; the `<img>` is `object-fit: cover` but, since the frame has the picture's own ratio, nothing is cut. A 1px inner ring at 7 % white defines the edge on dark art. Hover: the picture grows 1.2 %.
- **The card** (`.tk-card`): radius `--r3`, `overflow: hidden`, a 1px ring at 15 % white, a deep shadow (`0 2.6u 6.4u -1.6u` at 82 % black) and a faint glow in the show's accent (`0 0 5u -.6u`, 30 %).
- **The glow** (`.tk-glow`): the ambient picture again, behind the card, `inset: -7% -4.5%`, blurred `2.4u`, saturated 1.5×, 62 % opacity. It is a light spill in the banner's own colours (it breathes with the music).
- **The strip** (`.dock`), right to left in RTL; a 2px accent hairline runs along its top edge, strongest on the start side:
  1. kicker (an accent dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a 3.4u × 3.6u rounded square, month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })`; the clock is LTR.
  3. **venue** (label «مکان», one line, ellipsis).
  4. **price** (label «قیمت از», the amount, small «تومان»).
  5. the **buy button** (the v7 pill: `max(44px, 3.1u)` tall, at least 9u wide, in the accent with `onAccent` text, a soft glow of the accent).
  - Thin 1px separators between 1–2, 2–3 and 3–4.
- **Nothing is drawn over the banner.** The badge, the title and the buttons all live in the strip.

---

## 4. Template: poster

- The stage is a centred row: **poster, gap 5.5u, words**.
- **Poster** (`.pfig`): height `min(100cqh, 35u / ratio)`, `aspect-ratio: ratio` (so width is never more than 35u). The same card, glow and 1.2 % hover as the banner.
- **Words** (`.copy`, 37u wide, right-aligned): kicker, title (`2.45u`, at least 26px, at most 3 lines), «venue · date», two lines of description, then the price and the buy button side by side.
- The ambient is darkened on the words' side (`linear-gradient(to right, rgba(7,6,12,.5), transparent 56%)`) so the words read on any colour.

---

## 5. Template: photo (as v7)

- The photo fills the scene (`object-fit: cover`, `object-position` from the show's `fp.op`, `fp.mop` on phones, zoom origin `fp.o`).
- The v7 gradient (`0.8` at the words' edge, `0.62` at 26 %, `0.22` at 50 %, clear by 64 %) plus a light top and bottom gradient.
- The words (36u column on the left, vertically centred): kicker, title (`1.95u`, at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, at least 1920 px wide (2560 is better), no words in it, subject in the middle or on the right (the left 40 % sits under the words).

---

## 6. The ambient

Behind a banner or a poster, the same picture, tiny and soft, fills the whole scene (`background: var(--amb) center / cover`). It means:
- any shape (3:1, 4:3, 1:1, 9:16 …) fills the screen with no black bars;
- the page takes the show's colours without anyone choosing them;
- the glow, the rail card of a poster and the fade between two shows all have something soft to dissolve into.

On top of it: a radial wash of the accent (30 %, 66 % × 78 % at 42 % / 52 %) and a vertical gradient (0.6 → 0.3 at 34 % → 0.42 at 70 % → 0.84, so the bottom and the top sit calm).

**How it is made.** The picture is drawn into a 64 × 36 canvas, cover-fitted with 5 px of bleed so the blur doesn't fade at the edges, with `blur(2.5px) saturate(1.45)`, and used as a data URL. **On the server this is done once, on upload**, and stored next to the picture as a ~1 KB WebP; the page never computes it and never needs CORS on the picture. (The prototype computes it in the browser.)

No `backdrop-filter`. The only `filter` on a big element is the glow's blur, and it is static.

---

## 7. The rail (as v7, plus two things)

A column on the right, 15.5u wide: up bar, one 16:9 card per show, down bar and the pause button. Radius `max(10px, .6u)`, gap `.75u`; the active card has a 2px accent ring and a glow; keys, `role="tab"`, hover pause: all as v7.

New:
- **Time left.** A 3px bar at the bottom of the active card grows from the right (the reading direction) over the show's seconds. It is the timer itself: pausing the timer pauses the bar.
- **A card shows what its show shows.** A banner (or a photo) fills the card; a **poster** sits whole (`object-fit: contain`) on its own ambient, dimmed by 42 % so it never looks muddy.

**How many shows:** two to four is the intended use (the owner's «نهایت ۴ تا»). With more, the column scrolls so the active card stays in view (v7). With one show, hide the rail and the timer and drop the rail column from the grid (`--rail-w: 0`, `--gap-x: 0`).

---

## 8. Motion

| t (s) | What happens when the next show comes |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 1.2 | Its **ambient** fades in over the old one (`sine.inOut`). |
| 0 → 0.38 | The old banner or poster fades out (`0.32 × fade`, `sine.out`). |
| 0.36 → 1.2 | The new banner or poster fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The header's accent (the bars, the music ring, the rail ring and bar) changes. |
| 0 → 8.2 | The picture zooms out linearly (photo: 1.15 → 1) or settles (banner, poster: 1.04 → 1) over the show's 7 s plus the next fade's 1.2 s, so it is still moving while the next one fades in. |
| 7 | The next show starts (the time-left bar is full). |

- **Why the banner and the poster fade apart from the ambient.** Two designed banners overlapped for a whole fade show two sets of words on top of each other. This way the old one is gone before the new one arrives, and for a moment there is only the soft colour between them. A photo has no such problem and fades as in v7.
- **Settle, not zoom.** A banner or poster is never cropped, so it can't zoom in the v7 way. Its whole frame starts 4 % larger and settles back. The strip is part of the ticket, so it settles with the picture (the poster template settles only the poster; its words stay still).
- **The panel's options:** photo zoom 1.08 / 1.15 / 1.24; 5 / 7 / 10 s per show; a fade of 0.8 / 1.2 / 1.8 s.
- **Pausing** (the timer, the bar and the picture's motion pause together): the pointer over the rail, focus inside it, the pause button, the admin panel open, the hero off screen, the tab hidden.
- **Reduced motion:** no zoom, no settle, a 0.4 s fade, auto-advance starts paused.
- **Quick clicking:** a scene is never reused while it is still fading (a second instance of the same show is built if needed), and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Intro:** the header drops in, the rail slides in from the right, the first scene fades in from the dark page already settling, then its words.

---

## 9. Music

Unchanged from v7 (§6 of `../v7/SPEC.md`): playlist panel, waveform scrub, «آهنگ خودت رو امتحان کن». With «تپش آروم قاب» (default) the frame (or the photo) swells `scale(1 + (kick·0.01 + downbeat·0.005)·level)` on each beat and the glow breathes (`opacity .62 + kick·.28·level`); the logo's bars and the four small bars follow the song. «فقط میله‌ها» leaves the frame alone. The songs are not in git (`../assets/music/README.md`).

---

## 10. Data model

```
slot {
  id, order, activeFrom?, activeTo?,                  // the slot is sold for a period
  template: 'banner' | 'poster' | 'photo',
  pal: 'violet' | 'blue' | 'teal' | 'green' | 'gold' | 'orange' | 'crimson' | 'pink',
  type, name, title, desc, venue, startsAt, endsAt?, price, badge?, track?,
  banner?: { src, srcset, thumb, ambient, w, h },     // 16:9-ish, words in it (or a photo)
  poster?: { src, srcset, thumb, ambient, w, h },     // tall
  fp?: { o, op, mop }                                 // the photo template's focal point
}
```
- `title` is the full line (also the `<h1>`; in the banner template a visually hidden one). `type` and `name` label the rail card («کنسرت SkyKings»). `desc` is two lines, used by poster and photo.
- `startsAt`, `endsAt`: ISO with +03:30. A run shows «۲۳ تا ۲۶ مهر» and «هر شب ساعت …».
- `price` is the lowest price in toman, shown «قیمت از …».
- `badge` is one of: پیش‌فروش، پرفروش، ظرفیت رو به اتمام، اجرای ویژه، جدید (or none).
- `ambient` is the stored tiny picture (§6). `thumb` is 640 px wide for banners, 400 px for posters.
- Banners: 640, 1024 and 1672 (or 1920) wide; `srcset` + `sizes="(max-width: 760px) 100vw, 78vw"`. Posters: 400 and 800 (`sizes` 40vw). Photos: 640, 1920, 2560 (`sizes` 100vw).
- The sample's prices, and the dates and venues the posters don't state, are made up.

---

## 11. The admin panel (what the real one does)

The panel in `index.html` («پنل مدیریت · نمونه», the button at the bottom left) runs all of this in the browser. The production version should look the same. It works on the active slot, and every change is shown on the real stage at once (the scene is built again and fades in over the old one; auto-advance pauses while the panel is open).

1. **Template:** three buttons with a tiny wireframe each: بنر کامل / پوستر / عکس و متن.
2. **Image:** drop or pick a file. The panel reads its size and says what it found: «بنر عریض · ۱۶۷۲×۹۴۱», «تصویر مربع», «پوستر عمودی», and the template it suggests:
   - ratio below 1.15 → **poster**;
   - otherwise, with the box «روی تصویر نوشته (عنوان، تاریخ…) هست» ticked → **banner**; unticked → **photo**.
   - «عکس نمونه، بدون نوشته» puts a text-free photo in the slot, to see the photo template.
3. **Colour:** eight swatches; the one suggested from the picture is marked (`suggestPalette()`, v6 §4). The admin can pick another.
4. **Texts:** title, venue, price from, badge. (The real panel also has the date and time, the type, the short name, the description and the focal point.)
5. **Reset** puts the slot back as it was.

Validation worth having in the real one: at least 1600×900 for banners and photos (warn below 1920×1080), at least 800×1200 for posters; JPEG, PNG or WebP up to 10 MB; a warning for a banner whose words come closer than 4 % to an edge (it looks cramped in the frame).

---

## 12. What the server does on upload

| Step | Detail |
|---|---|
| Read the file | JPEG, PNG or WebP. Note the size and the ratio. |
| Suggest the template | As §11. The admin's «has words» box decides between banner and photo. |
| Make the sizes | WebP: banners 640, 1024, 1672 (1920 if the source has it); posters 400, 800; photos 640, 1920, 2560. Never upscale. |
| Make the ambient | 64 × 36, cover-fitted, `blur 2.5px saturate 1.45`, stored as a ~1 KB WebP (§6). |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest palette colour; a black-and-white picture gets violet. Store the key. On the four sample shows it gives gold, crimson, orange and crimson. |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them. |
| Never | tint, crop, redraw or put anything on the organiser's picture. |

---

## 13. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`.
- Each scene has one `<h1>` (visible in poster and photo, visually hidden in banner).
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button.
- A visually hidden `role="status"` line says «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان» when the visitor (not the timer) changes the show.
- The buy button's label has the title and the price. The banner frame is a link labelled «… صفحه‌ی اجرا».
- Focus rings are white, 2px, with an offset (on the frame, inside it).

---

## 14. Performance

- Continuous motion is `transform` and `opacity` only. The only per-frame style writes are the time-left bar's scale, the settle or zoom, and (with music) the frame's scale, the glow's opacity and the equaliser bars, each written only when its value changed.
- No `backdrop-filter`, no blend modes, no WebGL. The one blur is on a static element.
- Scenes are built once and reused (kept hidden, `visibility: hidden`); after the intro the other shows' scenes are built one at a time, so each fade starts at once. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset>`).
- When the tab is hidden or the hero is scrolled away, the timer, the time-left bar and the picture's motion pause (`IntersectionObserver`, `visibilitychange`).

---

## 15. Measured

- **Fit:** no horizontal scroll, nothing outside the hero, no overlap between the header, the rail and the ticket / poster / words, no clipped text and no description over two lines, in all three templates at:
  - 1920×1080, 1920×1028 (inside the comparison page) and 1920×940
  - 2560×1300, 1536×730 and 1440×900
  - 1366×768, 1366×650, 1280×720, 1280×600 and 1024×768
  - 390×844 and 360×700
- **Pictures of any shape:** a 3:1, a 21:9, a 4:3, a 1:1 and a 9:16 test picture (white frame lines at the very edge) were each uploaded in the panel; every one showed whole, uncropped, with its own colour and the right template.
- **Motion:** the change was checked frame by frame on GSAP's own clock for banner → banner. After five quick clicks 120 ms apart and fourteen changes in a row: one scene showing, the right words, the right active card, one scene interactive. Reduced motion: paused, no zoom, shown.
- **Without the real art:** with the files removed the page draws stand-in pictures and everything still fits.
- **Cost** (1920×1080, software rendering): idle (paused) 3 ms of script per second; running (settle + bar) 6 ms of script and 16 ms of style; during a change 13 ms of script and 23 ms of style. Layout 0–3 ms. There is no layout per frame.

---

## 16. What this version leaves out, and why

- **Cut-out people and 3D objects** (v6): they need a server-side segmentation step that fails on real posters (six people, an eye, a cube), and the organiser's picture is never meant to be redrawn.
- **The tilted big ticket** (v6): a banner is already wide; the strip under it is the ticket stub, quieter.
- **A big countdown** (v6): the real slots here have fixed dates and the countdown needed "now" to be before every show. A badge («ظرفیت رو به اتمام») says the same without the clock. It can come back as an optional chip.
- **A giant condensed title** (v5, v6): the banner already has its own title; repeating it large would fight it.
