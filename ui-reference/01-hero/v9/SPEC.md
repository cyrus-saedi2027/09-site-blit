# Hero · نسخه‌ی ۹ · جایگاه ویژه، دقیقاً اندازه‌ی دسکتاپ، همه‌چیز قابل‌تنظیم · handoff spec

> **خلاصه برای خودت:** نسخه‌ی ۹ همون نسخه‌ی ۸ است (چند کادر جدای نرم‌گوشه با فاصله‌ی کم: **هدر**، **کادر کارت‌ها**، **کادر خودِ بنر**، **کادر اطلاعات**) که سه دور کار روش شده:
> 1. **دقیقاً اندازه‌ی دسکتاپ:** کادرها کل پنجره رو لبه‌به‌لبه پر می‌کنن (حاشیه‌ی برابر از چهار طرف، فاصله‌ی برابر بینشون)، روی هر دسکتاپی از ۱۲۸۰×۶۰۰ تا ۲۵۶۰×۱۴۴۰ و عریض‌تر. کادر بنر هر چی از پنجره می‌مونه رو می‌گیره (**حالت «آزاد»، همون که صاحب پروژه تأیید کرده؛ پیش‌فرضه**)، پس شکلش با ارتفاع پنجره عوض می‌شه: ۱٫۷۴ تو ۱۹۲۰×۱۰۸۰ (۱۵۵۳×۸۹۳)، ۲٫۰۷ تو ۱۹۲۰×۹۳۷، ۲٫۳ تو ۱۹۲۰×۸۶۲. بنری که تا ۲٫۵٪ با شکل کادر فرق داشته باشه کادر رو پر می‌کنه؛ دورتر از اون کامل و با سیاهی کنارش دیده می‌شه. اگه یه سایز ثابت برای همه‌ی پنجره‌ها لازم شد، **گزینه‌ی «قفل»** (تنظیمات ← چیدمان ← شکل کادر بنر، نسبت ۱٫۷۴، سایز `۱۷۴۰×۱۰۰۰`) هست؛ ساختار صفحه رو عوض می‌کنه (ستون کارت‌ها جای اضافی عرض رو می‌گیره و تو پنجره‌ی عریض کارت‌ها ردیفی می‌شن)، پس خاموشه تا خودش بخواد.
> 2. **همه‌چیز تو «تنظیمات نمونه» (دکمه‌ی گرد پایین‌چپ) قابل‌تنظیمه:** فاصله‌ی بین کادرها و تا لبه‌ها، ارتفاع‌ها، گردی گوشه‌ها، خط دور، سایه، رنگ کادرها (حتی سفید)، رنگ نوشته‌ها، فونت، اندازه‌ی هر دسته نوشته، نوشته‌های ثابت (اسم سایت، دسته‌ها، دکمه‌ها…)، آیتم‌های هدر، شدت و نوع حرکت. ۱۰ «حالت آماده» (فشرده، باز، گرد، تیز، چسبیده، سفید…) و «کپی تنظیمات» که متنش رو می‌شه برای ما فرستاد تا همون بشه پیش‌فرض. تب «اندازه‌ها»: اندازه‌ی هر کادر و خودِ بنر به پیکسل، اندازه‌ای که از برگزارکننده می‌خوایم، و یه لایه که اندازه‌ها و فاصله‌ها رو روی صفحه می‌کشه.
> 3. **حرفه‌ای‌تر:** هدر ثابته و با اسکرول یه کپسول کوچیک وسط‌چین می‌شه (با حرکت)؛ هیرو سرجاش می‌مونه و **بخش دوم** مثل ورقه از روش رد می‌شه؛ جستجوی پنجره‌ای (`/` یا Ctrl+K)، منوی شهر، لینک‌هایی که پیل زیرشون می‌لغزه، نور دنبال‌کننده‌ی موس روی کادرها، دکمه‌ی خرید آهنربایی با موج، کشیدن بنر برای عوض کردن اجرا، چهار نوع جابه‌جایی بین اجراها (محو، کشویی، زوم، پرده)، ۱۶ رنگ + رنگ دلخواه.
>
> **موزیک کلاً حذف شد** (خواسته‌ی صاحب پروژه): نه پخش‌کننده، نه تحلیل ریتم، نه واکنش تصویر به ضرب.
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v9, the ninth owner round (the sixth round of version 9 itself). History of v9:
- *Round A* (v8 liked, «make 9 a copy and more professional, with the exact desktop size»): the panels tile the window; the rail's cards fill the rail with a line of words under the picture; a mirrored edge beside a banner whose shape differs.
- *Round B* (this one): «make the blurred background black», «let me control the gaps between the panels and from the panels to the edges, to build exactly what I want», «write the banners' sizes», «all of it in the floating settings button», «let me control many things (texts, the roundness beside the panels …) so I can tell you which modes are best and make them the default», «more colours, white and black for example», «more professional, stronger interactions and motion», «remove the music completely, no music in the page and the header», «what else could the header have», «a modest second section to scroll to, in harmony», «the header should shrink, with a strong professional motion, as I scroll, stay centred and come down with the page».

- *Round C*: the owner's own settings became the defaults (gap and margins 9, header 71, facts panel 80, rail up to 480, thumbs' radius 7, 0.5 px line at 8 %, shadow 91 %, panels `#0d0d0d`, the small header 1400 wide); **six new banners** in a given order (the first one's name is the show «دختر بودن یا پسر نبودن، مسئله این است»; then «هانی نظریان»; «زندگی شاید…»; «برفاب»; «دو دقیقه به هشت»; «امان»), sized to fill the banner's panel; «when the zoom-out ends the banner must be completely visible».
- *Round D*: «the size you told me isn't the frame's size at all; tell me exactly what size to make; let me add pictures myself in the settings» — the owner views the page in claude.ai, in a window of about 1920×862, where the (then flexible) frame was 1637×711, not the 1553×893 of a 1920×1080 window. And then: «what matters is that when the site is built the sizes are right: give me a size that fills the frame with no problem». I built **a locked shape** (`frame: lock`, ratio 1.74; the rail takes the width the window has over) and made it the default — and the owner answered: «I asked you for a size, not to change the site's structure; the small frames' look changed; make it as I approved it». **So the default is the approved layout again (`frame: free`, the pixels are identical to version 7848741), and the lock is an option, off.** What stays from this round: the settings' «جایگاه» tab says the size to make (for the window it is in) and takes the owner's own pictures (in place of a banner, or as new shows).
- *Round F*: «now let's build the rest» (the list in `../../BRIEF.md`) and one note: «make the city part bigger from left and right, and put almost all the cities in it, only the counties not yet, because the names are not read whole». Built in the hero and the header, **without changing anything the owner approved** (the panels, the sizes, the motion are as they were): the **city button** is wider and the **city menu** is a wide grid of 32 cities (§9); the **status labels** (§9.1); the **sale-start countdown** (§9.1); the header's **categories** as menus that take the page to a list (§9.2). The sample keeps the dates the banners print (§13).
- *Round G*: «take more ideas from the sample I gave you; I don't much like what you made for the next sections: the layouts and arrangements (**don't change the first section any more**, it turned out good)». The hero and the header were not touched (their panels are pixel-identical to the version the owner last saw: `tools/parity2.js`; only what round F added to the header and the rail's cards changed). The section under the hero was **made again after the sample's home page**: a category bar with a sliding pill that follows the page, a section for each category (name, how many, tickets), ticket-shaped cards with a perforation, labels, the countdown, a stamp for a full show and a tag for the city, and a footer with the trust badges' slots (§10). The old head panel, the filter chips and the three numbers are gone.
- *Round H*: «I didn't much like it, especially since the organisers give **tall posters**; every place except the home page's first section must be poster-style; and put real posters, other concerts and theatre shows, from other Iranian ticket sites». The hero and the header are untouched. The list's cards are now **poster cards** (§10): a tall frame (2 : 3) with the poster whole, the words under it (or over it, as in the sample: an option), 6 across at 1920. The sample's content grew to the owner's own sample (its 26 events and their photos as posters) plus six finished posters and the real posters the owner sent (3 of the 6 real shows and SkyKings). **What could not be done:** the Iranian ticket sites do not answer from the server this was built on (every request is reset), so posters could not be fetched from them; the owner can send posters (a zip, as with the banners) or put them in from the panel (§14).
- *Round I*: «use the sample I gave you more; make the sections more separate so they are clearer; add the **white theme** to the header so I can see it, and make the theme's change very smooth and attractive; I want it stronger, I'm still not that happy; then build the **next section**». The hero's panels and motion are untouched (pixel-identical in the dark theme: `tools/parity2.js`); the header gained one button. Built: a **light (white) theme** for the whole site, turned by a sun/moon button in the header, the new colours opening as a circle from the button (§9, §12); the list redone after the sample's home page (§10, *the list in round I*): the sample's search and city on top, every category **a panel of its own** with its own colour, icon and head, two rows and «نمایش همه», the presale as wide tickets with a big flip countdown, the sample's white buy buttons, its back-to-top ring and its trust badges; and the next section, **the show's page** (§10.1): the first of the four steps of a purchase (choose the session), after the sample's event page.

The owner sent real shows, each with a banner with its words baked in. The sample data in `index.html` uses six **banners** (1649–1651 × 953–954 PNGs, resized by a hair to 1672×960, 1024×588, 640×368). They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v8 | From v7 | New in v9 |
|---|---|---|
| the panels, the solid colours, the two layouts, the facts panel, the scenes and their fades, the admin panel, the palette | the picture's zoom-out and fade; the capsule header | panels that tile the window; a banner panel that takes what is left; cards with a line of words under them; the look system (75 settings, 10 modes, copy/paste); 16 colours and light panels; a fixed header that becomes a pill; the search window; the second section and the pinned hero; the measuring layer; the preview sizes. **Removed:** the music |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The page, from top to bottom

```
fixed ─ ╭─ header ──────────────────────────────────────────────────────╮   (a small centred pill once the page is scrolled)
        ╰─────────────────────────────────────────────────────────────────╯
.pin ─┬─ .hero (sticky, one screen tall; stays while the sheet slides over it)
      │   ╭ rail ──╮  ╭─ the banner's panel (takes all that is left) ───╮
      │   │ ˄      │  │░░░░░░ ┌──────────────────────────────┐ ░░░░░░░░ │   ░ = black (or, as an option, the banner's own edge)
      │   │ [pic]  │  │░░░░░░ │   the banner, whole, centred │ ░░░░░░░░ │
      │   │ caption│  │░░░░░░ └──────────────────────────────┘ ░░░░░░░░ │
      │   │ [pic]  │  ╰──────────────────────────────────────────────────╯
      │   │ ⏸  ˅   │  ╭─ the facts ──────────────────────────────────────╮
      │   ╰────────╯  ╰──────────────────────────────────────────────────╯
.s2 ──── the list under the hero (the category bar, a section for each category, the footer): a sheet with round top corners that slides up over the hero
.notes ─ the design notes (not part of the site)
```

Every panel is a solid rounded frame: background `--capsule` (`#120f1b`, opaque), a border, a 1px highlight on its top edge, radius `--r`, a soft shadow. The gap between any two is `--gap`. No `backdrop-filter`, no see-through. The page behind is black (`--bg`).

| Piece | What it is |
|---|---|
| **Header** (`.nav`) | outside the hero, `position: fixed`, so it stays above the second section; at the top of the page it sits exactly on the empty first row of the hero's grid (§9) |
| **Rail** (`.rail`) | a panel as tall as the banner column: up bar, the cards, the down bar and the pause button (§7) |
| **Banner** (`.frame`) | the banner's panel: all the room between the header and the facts. The banner is shown whole inside it (§5). It is a link to the show |
| **Facts** (`.dock`, layout bar) | the same solid panel, `--dock-h` tall, exactly as wide as the banner's panel |
| **The list under the hero** (`.s2`) | §10 |

---

## 2. One geometry

Every number is a variable, and the settings panel writes them (§11). `--px` is one pixel of the 1920-wide design (`--u / 19.2`), so the numbers the owner types are pixels of that design and scale with the window.

```
--u        clamp(8px, min(1vw, 1.7778svh), 26px)         --px   --u / 19.2
--edge-x   max(edgeX·px, (100vw − hero-h × 2.25) / 2)    the side margin; grows only on a window wider than 2.25 : 1
--pad-t/b  max(edgeT / edgeB · px, safe-area)            --gap  gap · px
--nav-h    max(50px, navH·px)      --dock-h  max(56px, dockH·px)      --r  max(radius·px, min(12px, radius))
--hero-h   max(440px, 100svh)      --main-h  hero-h − pad-t − pad-b − nav-h − gap
--n        min(the number of shows, 4): the rail has room for four cards; the script sets it
--rail-pad .75u   --arrow-h max(28px, 1.85u)   --card-gap .6u   --cap-h max(22px, 1.3u)   --cap-gap .35u   (0 when the captions are over the picture or off)
--cell-h   (main-h − 2·rail-pad − 2·border − 2·arrow-h − (n + 1)·card-gap) / n
--thumb-w  (cell-h − cap-h − cap-gap) × 16/9
--rail-w   clamp(11u, thumb-w + 2·rail-pad + 2·border, railMax·px)
```

- **The grid** (hero and every scene): columns `--rail-w` and `1fr` (swapped with the cards on the left), rows `--nav-h` and `1fr`, areas `"nav nav" "rail main"` or `"nav nav" "main rail"`, `gap`, and the page margins as padding. The rail and the banner column take **all** the width, so nothing is left over at the sides.
- **The banner column** (`.tk`): rows `1fr` and `--dock-h`, so the banner's panel is `main-h − dock-h − gap` tall and as wide as the column.
- **At 1920×1080 with the defaults:** margin 9 px, gap 9 px, rail 339.5 px, banner panel 1553.5×892.8 (ratio 1.74), the banner fills it.
- **The locked panel, an option** (`frame: lock`; `:root[data-frame="lock"]`, only on a window that isn't stacked): `--frame-h0 = main-h − dock-h − gap` (the height the window allows), `--lk-room = 100vw − 2·edge-min − gap` (the width for the rail and the panel), `--frame-w = min(frame-h0 × ratio, lk-room − rail-nat)` (as wide as the shape needs, never leaving the rail less than its natural width), `--rail-w = min(rail-cap, lk-room − frame-w)` (the rail takes what is left, up to `railMax`) and `--edge-x = (100vw − rail-w − gap − frame-w) / 2` (the margins take any rest, so they grow only when the rail has hit its cap). `.frame { aspect-ratio: ratio }` and `.tk { grid-template-rows: auto dock-h; align-content: center }`: on a window taller than the shape needs, the banner and the facts panel stay together in the middle of the column. `rail-nat` is the old (free) rail width, from the cards. On a 16:9 window the numbers are the free layout's to within 2 px. `geom(W, H)` in the script is this same arithmetic for any window (the sizes tab uses it; a test checks it against the page at 22 sizes).
- **In production** the hero is a size container (`container-type: size`) and the page's `100vw` / `100svh` become `100cqw` / `100cqh` of the hero; declare the variables on the hero element, not on `:root`.

---

## 3. Layout bar (a banner with its own words)

- The banner's panel, then the facts panel. Nothing is drawn over the banner (no badge, no title, no gradient).
- **The facts**, right to left in RTL; a 2px hairline in the show's ring colour runs along the panel's top edge, strongest on the start side:
  1. kicker (a dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a `3.3u` rounded square, the month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })` (with `-nu-latn` when the digits are English); the clock is LTR.
  3. **venue** (label «مکان»), 4. **price** (label «قیمت از», the amount, small «تومان»), 5. the **buy button** (a pill, at least 40px tall). The labels are the fixed texts the owner can change.
  - Thin 1px separators. The panel is a size container (`container: dock / inline-size`): under 800 px wide the date's second line goes, under 660 px the venue goes.

## 4. Layout text (a photo; as v7, inside its panel)

- The photo fills one panel as tall as the banner's and the facts' together, and there is no facts panel: the words sit on the photo. A photo may be cropped (`object-fit: cover`, with the focal point) because it has no words in it. The words are always white, whatever the panels' colour.
- A dark gradient on the words' side plus a light top and bottom one. The words go on the side **away from the cards**: cards on the left → words on the right.
- The words (a `34u` column): kicker, title (at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, 2560×1440 (at least 1920×1080), no words in it, the subject on the cards' side.

---

## 5. The banner's panel and what is beside the banner

**By default the panel takes whatever room is left** (`frame: free`, as approved), so its shape follows the window; the rest of this section is for that. With the option `frame: lock` (`ratio: 1.74`, §2) the panel's shape never changes, so a banner of that shape fills it in every window: one size to make, **1740×1000** (3480×2000 for sharp screens).

The banner is **never cut and never covered** (unless the owner asks for «پر کردن کادر»). It is drawn with `object-fit: contain` in the panel, so:

- if the panel's shape is the banner's own to within **2.5 %** (`FILL_TOL`, the script's `is-fill`), the banner **fills the panel**: `object-fit: fill`, so nothing is cut and no bar is left; the stretch is less than 2.5 % (the six sample banners are 1.7417, the panel at 1920×1080 is 1.7404: 0.07 %), which the eye can't see. A 16:9 banner (1.7778) is 2.1 % off and fills as well;
- otherwise (a wider difference: a 16:10 window, an ultra-wide one, a banner of 3:1) the banner sits whole in the middle and the rest of the panel is **black** (`fill: black`, the default) or **the banner's own edge, mirrored and blurred** (`fill: edge`): two copies of the same picture, one on each side (class `is-h`) or one above and one below (`is-v`), flipped so the column of pixels next to the picture is the picture's own edge column, blurred with `blur(1.4u)` and darkened by 26 %. The script measures the panel (`ResizeObserver`) and writes the picture's size as `--pw` and `--ph`; the CSS places the copies from those;
- `fit: cover` fills the panel and cuts the banner (to compare);
- the picture and its extension are one layer (`.pic`), so the zoom-out moves them together.

**The page behind** is black (`bg: black`), a colour of the owner's (`bg: color`), or, as an option, the banner's own colours tiny and blurred (`bg: glow`: a 64×36 version, `blur 2.5px saturate 1.45`, made once on upload by the server).

**Why a stretch and not a crop:** cropping would cut the baked words (the samples have credits, logos and dates one or two per cent from an edge); a stretch of under 2.5 % cuts nothing; leaving margins is the v8 problem (§2).

---

## 6. Motion

| t (s) | What happens when the next show comes (the «محو» style) |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 0.38 | The old panels' content fades out (`0.32 × fade`). |
| 0.36 → 1.2 | The new panels' content fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0 → 4.9 | A banner (and its extension, as one layer) zooms out inside its panel (`sine.out`: it slows down into its place) over 70 % of the show's time (`ZOOM_SHARE`). |
| 4.9 → 7 | **The banner stands still, whole and at its full size**, so its words can be read; the time bar goes on. (A photo with the words over it, the text layout, keeps zooming out linearly over 8.2 s, until the next fade has finished.) |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The accent (the colour of the buy button, the ring, the hairline) changes. |
| 7 | The next show starts. |

- **Four styles** («جابه‌جایی بین اجراها»): *fade*; *slide* (the new panel rises from below when going down the rail, from above when going up, `expo.out`); *zoom* (the old one shrinks away, the new one settles from 1.07); *wipe* (a clip opens from the start side, `expo.inOut`). Each leaves nothing behind (a test checks the opacity, the transform and the clip after each).
- **Intensity** («شدت حرکت»: آروم 0.6 / متعادل 1 / قوی 1.6) multiplies the distances, the zoom and the hover lifts. Reduced motion makes it 0 and the change a 0.4 s fade.
- **The zoom** starts small, because the banner's words are near its edges: banner 1.02 / **1.05** / 1.09, photo 1.08 / **1.15** / 1.24. A banner's zoom ends at 1 after `dur × 0.7` seconds (4.9 s of 7) and the banner then rests whole for the rest of its time; it is paused with the timer.
- **Pausing** (the timer, the time sign and the picture's motion pause together): the pointer over the rail or a drag in progress, focus inside the rail, the pause button, the settings panel open, the search window open, the hero covered by the second section, the tab hidden.
- **Quick clicking:** a scene is never reused while it is still fading, and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Entrance:** the header drops in, the rail's pieces slide in one by one, the banner's panel opens from the start side (a clip, `expo.out`, 1.4 s) while the first scene fades in already zooming out, the facts panel rises, then the words.
- **Touch of the page:** a soft light follows the pointer over a panel (`.spot`, a radial wash of the text colour at 8 %); the buy button leans toward the pointer (up to 0.22 × and 0.32 × the distance, `elastic.out` back) and ripples where it is pressed; the banner can be dragged (more than 70 px sideways, or less than that and it springs back) to go to the next or the previous show; the arrow keys go to the next or previous show (← is next, as the rail); `/` and Ctrl/⌘+K open the search. Each of the light, the lean and the drag can be switched off.

---

## 7. The rail

A panel with one card per show, the up and down bars and the pause button. It is as tall as the banner column.

- **A card** is a 16:9 picture (the banner's 640 px version) with one line under it: «تئاتر برفاب» on the start side and the short day («۱۲–۱۷ آبان», «۲۵–۳۰ مهر») on the end side. The line can be under the picture, over it (on a gradient) or off; the day can be left out; it goes by itself when the picture is narrower than 190 px.
- **The cards share the height equally** (`--cell-h`), centred in their cell; the rail's width follows from the picture's (at most `railMax`).
- **A wide rail** (only with the locked shape, on a window wider than 16:9, §2; never in the default layout): the rail gets the extra width. When its inner width is at least `cell-h × 16/9 + 9.4u` (a picture as tall as the card plus room for about eight em of words), the script sets `data-rail="wide"` and each card is a row: the picture (as tall as the cell), and beside it, over up to three lines, the show (two lines at most), the days and the place. Narrower, the cards stay as they were (a picture with one line under it, centred). The rows, the four-card window and the scroll are the same in both. At 1920×937 the rail is 548 px, at 1920×862 658 px, at 1536×730 474 px; at 3440×1440 it stops at its cap (840 × 1.33 = 1120 px) and the margins grow.
- **More cards than fit:** the rail has room for four cards (`VIS`; `--n` = min(shows, 4); every row is exactly `--cell-h`, so the width the owner tuned doesn't change with the number of shows). With six shows the list scrolls inside the panel in **whole cards**: the window shows four cards, the active one second from the top (`scrollTo` on the list, `scroll-snap`, so no card is left cut at rest), and slides when the active card leaves it (smooth; the page doesn't move). The bars, the arrow keys and the timer move the show and the window follows. The wheel over the rail scrolls the list and, at its end, the page.
- **States:** the active card has a 2px ring in the show's ring colour and a glow, its words are white; the others are dimmed by `dim` % (14 by default) and come back on hover (and lift a little); focus has a ring; keys, `role="tab"`, hover pause: as v7.
- **The time left on this show** («نشونه‌ی زمان باقی‌مونده»): a 3px bar at the bottom of the active picture that grows from the right, or a line that draws itself round the picture, or nothing. It is the timer itself; only the visible sign is written each frame.
- **Side:** `.hero.rail-left` (the default) or not. With the cards on the left the pause button sits on the banner's side of the footer, so the prototype's settings button (bottom left) can float over the end of the down bar.

---

## 8. Other window shapes

- **Wide** (wider than 2.25 : 1): the composition stops growing; the side margin grows instead.
- **Short:** `--u` shrinks down to 8 px and the hero may be as short as 440 px.
- **Tall and narrow** (under 761 px wide, or taller than 4 : 5): the panels stack in one column: header, banner, facts, then the rail as a row of small cards. The banner's panel keeps the banner's own shape (`aspect-ratio`). **The hero is only as tall as its pieces here** (not the whole screen) and nothing is pinned: the page just scrolls, and the second section's rounded top shows at the bottom of the first screen.
- **4 : 3 windows** (1024×768) use the side-by-side grid. A 5 : 4 window (1280×1024) is already stacked.

---

## 9. The header

A `position: fixed` capsule outside the hero (so it stays above the second section). Its content, right to left in RTL: the logo (five bars that dance on hover) and the name; the **categories** (three kinds that each open a small menu, and the presale list; a highlight pill slides under the one the pointer is on; §9.2); a **search** button that looks like a field («جستجوی اجرا، هنرمند یا سالن…» and a `/` key); a **city** button (a fixed-width select-like button that shows any city name whole, and a wide menu of 32 cities); **my tickets** and **notifications** (a dot) as icon buttons; the **login** button (the text colour as its fill, the panel's colour as its text, so it flips on light panels); a menu button on phones. Each of search, city, tickets, bell and login can be switched off; the names and the categories are fixed texts.

**The search window** (a command palette): a dialog with a field, the shows as rows (picture, title, venue and day, badge), the arrow keys and Enter, Esc to close, the focus kept inside and given back. It filters on the title, the kind, the name, the venue, the badge, the day and the description, after normalising Arabic letters, half-spaces and digits. A pick opens that show (and scrolls to the top). The show's timer stays paused while it is open.

**On scroll** the header gets **narrower** and stays centred. It has **two resting states** (wide, narrow) and a motion between them: `--hs` is a registered number (`@property --hs`) that the browser animates when the class `is-compact` is set (0.8 s `cubic-bezier(.22, 1, .36, 1)` going narrow, 0.6 s `cubic-bezier(.4, 0, .2, 1)` coming back; none under `prefers-reduced-motion`). **The scroll only starts it**: after 10 px (it stays narrow down to 3 px, so a small shake doesn't flick it), or in the very frame of the wheel's first turn when the smooth scroll has been asked to go down (the page itself starts slowly; the header doesn't wait for it). It never waits for more scroll and is never left half way (the owner: «a tiny lag, and it collapses more completely with more scroll»). A resize or a setting changes it with no motion (`is-still`). **Only its width changes** (the owner: «don't make it shorter, the buttons fall on its edge; don't round its corners either»):

```
width    grid width × hdWidth% → compact width (hdCompactW · px, at least 760px); left: so that it stays centred
SAME     top (pad-t), height (nav-h), corner radius (r), the room round its buttons (padding), the shadow's shape
shrink   the gaps between the pieces (2.2u → 1.2u) and the links' padding; the search field and the city name fold into icons;
         tickets and bell go away. The words and the small buttons FADE OUT FIRST (gone by 40 % of the way), and only then do
         their boxes narrow (from 10 %): --hq, --hw. A piece is never seen cut in half.
```

The nearest piece to the header's edge (the login button) is 10.2 px away at every step of the motion at 1920×862, and 10.6 px at 1600×900, both resting states.

A 2px line in the ring colour along the bottom edge shows how far down the page is (`--pg`). The morph, its width and the line can be switched off. The header never wraps or overflows during the morph (`overflow: hidden`, popups are separate elements).

**The theme button** (round I): a round button like the bell, between the bell and the login button; it stays in the narrow header and on a phone. It shows a **sun** in the dark theme and a **moon** in the light one (the sun's disc grows and a dark circle slides over its corner; the rays turn and shrink away; 0.8 s, `--ease`). A press changes `LOOK.mode` (dark ⇄ light, kept with the look). The change is a **View Transition**: the page as it was is captured, the page in the new theme is shown through a **circle that grows from the button** to the farthest corner (`clip-path: circle()`, 1.15 s, `cubic-bezier(.76, 0, .24, 1)`), while the old page under it sinks back a little (scale 1 → 0.965, darker going to light, brighter going to dark). While it runs, nothing else animates its colours (`.vt-mode`: every transition is 0 s, except the icon's). Options (`themeFx`): the circle (default), a soft fade, none. A browser without View Transitions cross-fades every colour that comes from the theme (`.mode-fade`, 0.8 s); with reduced motion the colours change at once.

### The city button and the city menu

The button is **as wide as the longest name needs, and the same width for every name** (so the search field beside it never moves when a city is picked): `width: ib + max(112 px of the 1920 design, enough for «بندرعباس» + the icons at the type size's floor)`, a select-like layout (the pin, the name from the start, the chevron at the end). At 1920 it is 154 px (it was at most 126, and cut «بندرعباس»); at 1280×720 it is 121 px; checked at five window sizes for every name (`tools/status-test.js`). In the narrow header it is, as before, a round icon (its width goes to the icon's, with the words fading first).

The menu is a **grid of 32 cities in four columns, filled down the columns in the alphabet**: the 31 provincial capitals and Kish (اراک، اردبیل، ارومیه، اصفهان، اهواز، ایلام، بجنورد، بندرعباس، بوشهر، بیرجند، تبریز، تهران، خرم‌آباد، رشت، زاهدان، زنجان، ساری، سمنان، سنندج، شهرکرد، شیراز، قزوین، قم، کرج، کرمان، کرمانشاه، کیش، گرگان، مشهد، همدان، یاسوج، یزد). **The counties («شهرستان‌ها») are left out for now**, as the owner asked; the brief wants them later (31 provinces and all counties, a province filter and a city filter, a page for each city, and the admin choosing which cities appear in the customer's filter, e.g. only «تهران، شهرستان‌ها، کیش»). Its width is 26 units (499 px at 1920, 333 at 1280) at the header's type size, so a name is never cut; it stays inside the window, opens from the narrow header too, and closes on Esc, on a click outside and when the header starts to narrow. Keys: Enter or a click opens it with the focus on the chosen city; ↓ ↑ move down a column, ← → move to the next column in the same row, Home and End go to the ends, Enter picks (the label changes, a message says «اجراهای … رو نشون می‌دم»), the focus goes back to the button. Picking a city does not filter the shows in this sample (it did not before either).

## 9.1 The status labels and the sale-start countdown

**Labels** (the brief's list): **لغو شد** (red), **به‌تعویق افتاد** (amber), **برگزار شد** (grey), **تمام شد** (grey), **تمدید شد** (green), **به‌زودی** (blue), and the show's own free text (`badge`, any words) beside them. The colour is the label's *meaning* and does not follow the show's accent. Which one a show has comes from `statusOf(show)`:

1. the owner's choice, if there is one (`status`; «خودکار» in the panel means none);
2. else **برگزار شد** when the last day's show (its start + 3 h) is past, automatically;
3. else **به‌زودی** while the sale hasn't started (`saleAt` is in the future);
4. else **تمام شد** when `seatsLeft` is 0, automatically;
5. else nothing (a normal show).

(The server will own this logic; the sample works it out in the page so every state can be looked at. «عادی» in the panel turns the automatic rules off for a show.)

**Where they are:** a chip in the facts panel's first line (before the show's own label), in the text layout's first line, in the corner of the rail card's picture, in the corner of the picture of the ticket in the list below (a full show has a stamp there), and at the end of a search row. **Nothing is ever laid over the hero banner** (it has its own words). A cancelled or past show's thumbnail loses its colour (greyscale) until it is hovered. The labels are said by screen readers in the cards' names and in the live region that announces the show.

**The buy button follows the state:** the real button (a normal or extended show), the **countdown** (the sale hasn't started), or a grey button with the reason («تمام شد»، «لغو شد»، «برگزار شد»، «به‌تعویق افتاد»; `aria-disabled`, no lean toward the pointer, no ripple). A press on a button that can't be pressed says why («فروش … شنبه ۱۲ آبان، ساعت ۱۸:۰۰ شروع می‌شه»).

**The countdown** is the button itself: two lines, «شروع فروش» and `N روز و hh:mm:ss` (days only when there are some; Persian or English digits with the look's digits setting). One clock for every place it shows (the facts panel, the text layout, the tickets in the list: there as boxes of hours, minutes and seconds). It reads `Date.now()` every second at the second's own edge (so it never drifts and a hidden tab is right when it comes back), compares the text before writing (no needless work), and the digits are tabular: the button's width does not change while it ticks (layout shift 0, measured over 5 s). For a screen reader the button's name is the start time, not the ticking digits (the digits are `aria-hidden`). **When it reaches zero** the sale opens: the show loses its label, its button becomes the real one everywhere, the presale count in the header goes down, and the toast says «فروش بلیت «…» شروع شد!». In production the server decides when the sale opens (the page must not rely on the visitor's clock for anything but the display), and the moment of opening is the high-traffic moment of the brief: the page's own work at that moment is one small update and nothing is fetched.

## 9.2 The categories

The brief's six automatic categories come from a show's **kind** (کنسرت، تئاتر، جُنگ و کمدی) and its **city** (تهران, or any other city = «شهرستان‌ها»): کنسرت‌های تهران، کنسرت‌های شهرستان‌ها، تئاترهای تهران، تئاترهای شهرستان‌ها، جُنگ و تئاتر کمدی تهران، جُنگ و تئاتر کمدی شهرستان‌ها. A show whose sale hasn't started is also in the seventh list, **به‌زودی (پیش‌فروش)**. The header has the three kinds as buttons (a chevron that turns when open): each opens a small menu with its two lists and the number of shows in each; the presale list is a link with its count. The menu opens on hover (after 110 ms, closes 220 ms after the pointer leaves both the button and the menu; a mouse only), on a click, or with ↓ (the focus goes in); ↓ ↑ move, Esc closes and keeps the focus on the button, a pick takes the page to that list's section (§10); an empty list says so and the page stays. The link of the list on view is marked. A new category is a new kind (and a new name in the text setting «اسم دسته‌های هدر»: the first three names are the kinds in order, the fourth the presale list, any more are plain links for now); in production the admin adds them. The header has no links under 1100 px of width (as before; the city button stays down to 760 px): they go into the menu button later.

---

## 10. The second section and the pinned hero

**The stack.** `.pin` is as tall as the hero plus one more screen; the hero inside it is `position: sticky; top: 0`; `.s2` has `margin-top: −one screen`, so it starts right under the hero and slides up over it while the hero stays. As `p` (0 → 1) goes from the top to one screen of scroll the hero shrinks to 94 % and moves up 1.6 %, its corners round to 26 px and a black veil rises to 82 %; at 98.5 % the hero is covered and its timer pauses. `story: off` makes the hero scroll away like any section. Not used on stacked layouts.

**Smooth scrolling** (`scroll: smooth`, `scrollSoft: 55`; `native` gives the browser's own). The wheel moves a *target*; the page follows it through **four lags in a row**, each closing its gap with a time constant of `scrollSoft` ms (worked out in 1/240 s steps, so the move is the same at any frame rate). One 300 px turn of the wheel starts slowly (1 % of the way after 50 ms), builds its speed to a peak at about 150 ms (30 % of the way), arrives (80 % at 350 ms) and settles softly (99.5 % at 700 ms): a bell-shaped speed, like a speed ramp in a video editor (slow, peak, slow). More turns add to the target and the move goes on without a jerk; the end of the page stops it. The browser keeps: the keyboard, the scroll bar, links, touch, Ctrl/Shift/Alt+wheel, and an element under the pointer that can still scroll itself (the rail's list, the settings, the search list). Off with `prefers-reduced-motion`. Each frame it also calls the header's and the hero's update, so they move in the very frame the page does (a scroll event would come one frame later). «نرمی اسکرول» (30–140 ms) makes the start and the end longer or shorter.

**The list under the hero** (round G; laid out after the owner's own sample, the home page of `blit-prototype.html`, because the first version of this section — a head panel, a filter and three cards — was «not liked: the layouts and arrangements»). It is made of the hero's own material (the same panels, gap, margins, radii, text sizes and colours, so every setting changes it too), in four parts:

1. **The category bar** (`#catnav`, a panel): «همه‌ی برنامه‌ها» and the seven lists, each a pill with an icon (grid, clock, music note, mask, smile); a **pill slides** (`transform` and `width`, `expo.out`) to the one in view. It is `position: sticky` under the header (`top: pad-t + nav-h + gap`), so it stays with the page; a shadow appears while it is stuck (an `IntersectionObserver` on the bar with a one-pixel root margin). On a narrow window the bar scrolls sideways and keeps the pill in view. A list with no show keeps its pill, dimmed; pressing it says «فعلاً اجرایی تو «…» نیست.» and leaves the page where it is.
2. **A section for each list that has a show**, in this order: «به‌زودی (پیش‌فروش)»، کنسرت‌های تهران، کنسرت‌های شهرستان‌ها، تئاترهای تهران، تئاترهای شهرستان‌ها، جُنگ و تئاتر کمدی تهران، جُنگ و تئاتر کمدی شهرستان‌ها. Each has its name (a dot in the show's colour), «N برنامه», and a grid of tickets (4 columns from 1500 px, 5 from 2200, 3 from 1100 down, 2 under 1100, 1 under 520), sorted by day (the presale list by the sale's start). A show whose sale hasn't started is in its list and also in the presale list, as in the sample. The section whose title has passed the bar is the one in view (`scroll` → one `requestAnimationFrame` → the sections' rectangles), and it marks the pill and the header's link.
3. **The poster card** (`.tkt`; the organisers give tall posters, so this is the card for the whole list and for every section after the hero): a **frame in the shape of a poster** (`--pr`, width ÷ height, default **2 : 3**, a setting) and the poster **whole** in it: when its shape is the frame's (to 2.5 %, `FILL_TOL`) it fills the frame; any other shape (3:4, 9:16, 7:10, even a wide banner) is shown whole, `object-fit: contain`, and the rest of the frame is a **soft copy of the same picture** (blurred, darker). Then the **perforation** (a dashed line) with a **notch** at each side (a `mask`, so the notch really is a hole; the drop-shadow on hover follows it) and under it the words on a soft, blurred copy of the poster (so the colours go on from the picture into the words): the kind and name, the place (pin), the day (calendar), and then the price with the buy button, or the **countdown boxes** (hours : minutes : seconds), or a grey line saying why it can't be bought. On the poster: the status label in its top corner (a full show has the **stamp «تمام شد»** instead and its poster loses its colour), a tag with the city at the bottom corner for any city but Tehran; a cancelled or past show's poster is grey until hovered. A show that has **no poster yet** shows its banner whole in the frame (that is the case of 3 of the 6 real shows, until their organisers send posters). **The words** are under the poster by default (so nothing printed on a poster is covered); the look has «روی پوستر» (`posterInfo: over`), as in the owner's sample, where the words sit on the poster's lower part. The columns: 7 from 2200 px, 6 from 1500, 5 from 1250, 4 from 1000, 3 from 700, 2 under that (on a phone the price waits and the button fills the card). The height of the words' part is `max(10.4 units, 134 px) × the text scale`, so the perforation is in the same place on every card. Hover lifts the card, zooms the poster (4 %) and brightens the perforation; the poster and the name open the show in the hero (a featured show) or say where its page will be; the button says what a press will do. A poster that is not there is drawn by the page (a tall stand-in from the title and the colour: 32 of the 43 cards in the repository, which does not carry the real files).
4. **The footer** (`#ft`, a panel): the logo and a line, the pages (برنامه‌ها، پشتیبانی، درباره‌ی ما، آرشیو برنامه‌ها), the categories (they take the page to their section), the help (پیگیری خرید، ثبت مشکل یا طرح پرسش، قوانین خرید), «خرید امن» with **two dashed slots for the trust badges** (اینماد and the other: brief item 11), and the line at the end with «برگشت به بالای صفحه». The links to pages that aren't built say so in a message.

**The sample's content** (`listFill`, **on**, «چیدمان» › «لیست زیر هیرو»): the six real shows make a short list (4 sections, 7 posters), and the way a list of forty reads is the point of this section. So the list also has **the owner's own sample** (`blit-prototype.html`: its 26 events with their fictional names, public halls, dates counted from today and prices, **their photos as posters**), **six finished posters of ours** (`orig-*`: with the day, the hall and the time printed on them, so their days are fixed: they are the kind of poster an organiser sends) and **the real poster of SkyKings**, a concert that is over (it shows «برگزار شد» on a real poster, last in its section). They are in the list only: the hero and its rail have the six real shows. 43 cards at 1920 (a show whose sale hasn't started is also in the presale list). The posters of the sample and the real ones are other people's art and are not in git (`assets/posters/README.md`).

Pieces rise as they come into view (`IntersectionObserver`; a card that has been seen doesn't rise again when the list is redrawn). The list is drawn again a moment after the last change in the settings' fields (160 ms, so typing doesn't redraw twenty cards on every key), at once on a kind, city, status or colour change. Layout shift while the whole page is scrolled through: 0.0004 from the list (the sliding pill), the rest is the header's own width morph (§18).

**The list in round I** («use the sample more; make the sections more separate»). From top to bottom:

1. **The search and the city** (`.s2-top`, as on the sample's home page): a wide panel with a field, its answers open under it while you type (up to six: the poster, the name with the typed words marked, the hall and the day, the status label; «N نتیجه‌ی دیگه» when there are more); the arrows move, Enter opens the show's page, Esc closes. Beside it the **city** (`شهر: همه‌ی شهرها`): the 32 cities in a grid with how many shows each has; a city **filters the whole list** (every section, the bar's pills), a line under the bar says so with «همه‌ی شهرها ×». The header's city menu sets the same city (its old message «اجراهای … رو نشون می‌دم» is now true).
2. **The category bar**: as before, but the sliding pill and the icon of the pill in view take **the colour of that section**.
3. **Each category is a panel of its own** (`.tkt-sec.panel`), with a gap of two gaps between panels. Each kind has **its own colour** (`SEC_COLOR`: presale sky `#38bdf8`, concerts violet `#a78bfa`, theatre rose `#fb7185`, comedy amber `#fbbf24`; deeper tones on the light theme): a line of it on the panel's top edge, a glow of it in the panel's corner, a breath of it in the panel's colour (5 % dark, 2.5 % light), and the head's **icon tile** (46 px, the kind's icon). The head: the name (19–27 px), under it how many shows and the days they cover («۱۲ برنامه · ۷ آبان تا ۲۴ آذر»; for the presale: the nearest sale's start). The sections of the other cities have **city chips** (همه، اصفهان ۱، مشهد ۱ …) that filter that section. A section shows **two rows** (`secRows`: 1, 2, 3 or all) and then «نمایش همه‌ی N برنامه» (the rest rise in, a stagger of 50 ms; «بستن» closes and brings the section's head back into view).
4. **The presale** (`presale: wide`; `cards` makes it like the others, as in the sample): **wide tickets**, three in a row at 1920 (two under 1500 px, one under 1000 px), a short last row in the middle. The poster (2 : 3, 11.4u wide) on one side of a **vertical perforation** with a notch at its top and bottom, and on the other: a «پیش‌فروش» label and the kind, the name (18–27 px), the hall and the days, **when the sale starts** («شروع فروش · سه‌شنبه ۱۲ آبان، ساعت ۱۶:۴۲») and a **big countdown** (days : hours : minutes : seconds, read left to right like the cards' clock; each number **turns over like a flip clock** when it changes: `rotateX(-88°) → 0`, 0.55 s), the lowest price and «یادم بنداز» (it turns white with a little ring of the bell; «ده دقیقه قبل از شروع فروش … پیامک می‌گیری»).
5. **The poster cards** as in round H, plus: the buy button is **white**, as in the sample (`buyStyle: accent` gives each show's own colour); a **sheen** crosses the poster once when the pointer arrives (as the sample's «glare»); every countdown's numbers turn over; a poster, its name and its buy button open **the show's page** (the buy button opens it at the sessions).
6. **Back to the top** (bottom right, as in the sample): a round button with a ring that fills as the page goes down; it shows once the hero is passed.
7. **The footer**: a line of the three kinds' colours on its top edge, a «تماس با ما» link, and the two trust badges' places as **cards with an icon** (as in the sample: «نماد اعتماد الکترونیکی»، «نشان ساماندهی»).

---

## 10.1 The show's page (the next section)

The first of the four steps of a purchase (**choose the session** → the seats → book and pay → the ticket), after the sample's event page (`#/e/{slug}`), on our panels. Its address is **`#/e/<show>`** (a shared link opens it; the browser's back button closes it). The home page steps aside (`.is-page`: the hero and the list are hidden, not destroyed) and comes back **where it was** (the scroll is kept); «همه‌ی برنامه‌ها» goes back through every show opened since the list (the history stays honest). The hero's timer stops while the page is open.

**In and out.** A poster that is pressed **flies** into the page's poster (a View Transition with `view-transition-name: poster`, 0.72 s) while the rest fades out and the page rises in (0.42 s / 0.62 s); closing flies it back into its card when the card is on the screen. The page's panels rise one after another (26 px, 0.75 s, a stagger of 45 ms), the title's words rise one by one (50 ms apart), the steps' bar slides under step 1. Without View Transitions or with reduced motion: no flight, the panels just appear.

From top to bottom:

1. **A path**: «← همه‌ی برنامه‌ها / کنسرت‌های تهران / name» (the category takes the list to its section).
2. **The steps** (a panel): four steps with their numbers, the current one dark-on-light with a bar in the section's colour under it.
3. **The cover** (a panel, 300–470 px tall): the show's **banner** behind (drifting slowly, 24 s), or, when the show has no banner, its **poster softened** (blur 34 px), darkened toward the words; a few **motes** float up in its light (the sample's «motes»); the **poster** stands on it (13.2u wide, tilted a little in 3D, straightens on hover); the kind (an icon and «کنسرت»), the status label and the show's own label; the **title** (26–45 px, weight 900, its words rise); the hall, the city and the days. At its corner: **نشان کردن** (a heart) and **هم‌رسانی** (the system's share sheet, or the address copied).
4. Two columns on a wide window (on a phone, and under 1100 px, one; the sessions come right after the facts):
   - **The facts** (a panel): the days, the hour and how long (concert 120, theatre 90, comedy 100 minutes), the hall and its **address** (`HALLS`: the real public addresses of the halls of the sample and of the six shows; an unknown hall shows its own name), each with an icon tile in the section's colour.
   - **The map** (a panel, 190–300 px): the streets round the hall **drawn** from the show's id (blocks, parks, a river, roads, two avenues; the theme's colours, the sample's on the light theme), the hall's **pin** dropping in with a pulse under it, zoom (+ −, up to 2.6×) and «مسیریابی» (Neshan, Balad or Google Maps later).
   - **About** (a panel): the show's people as **gradient tags** (as in the sample: «نویسنده فرهاد تقدعلی»، «کارگردان شیوا علیخانیان» …, from the six real shows' banners), a line in red when the show has one, and its text.
   - **The price plan** (a panel, «طرح بها + ۱۰٪ مالیات بر ارزش افزوده»): each run of rows of each zone (همکف، بالکن …, by the hall's size) with **the colour of its tier** (A violet, B pink, C orange, D sky, as in the sample), its price in toman and a bar that shows how dear it is. The cheapest tier is the show's «قیمت از»; the others are steps above it (×1.25, ×1.6, ×2.2, rounded to 10,000) until the organiser's real prices come from the admin panel.
   - **The sessions** (a panel that **follows the page** on a wide window): «انتخاب سانس» and how many; for a presale show, the sale's start and the big flip countdown; **the rules to accept** («اینجانب قوانین خرید را خوانده‌ام و همه‌ی شرایط را می‌پذیرم»; the link opens the rules in a window with «خوندم و می‌پذیرم»); then each session as a **small ticket**: a dark stub with the weekday, the day and the hour, a perforation with notches, its state (موجود است · رو به اتمام · تکمیل ظرفیت · به‌زودی) and a bar of the seats left, and «خرید بلیت». Until the rules are accepted, «خرید بلیت» is dim and a press **shakes** the rules' box and says so; once accepted, a session is chosen (a ring in the section's colour) and step 2 (the seats) is the next section to build. A line at the end: «از ۹۸۰ هزار تومان · قیمت‌ها بدون ۱۰٪ مالیات…».
5. **More of the same kind** (a panel): up to six poster cards (same city first); each opens its own page.
6. **The footer** (the same as the list's).

On a phone a **bar at the bottom** says the lowest price and «انتخاب سانس» (it takes you to the sessions, which flash in the section's colour). The sessions' seats and the map are made from the show's id, so they are the same on every visit; the real ones come from the hall's seat map and the sale.

---

## 11. The look: what the owner can change

Every setting is a variable or an attribute; the settings panel writes it, `localStorage` keeps it (`hero9.look`), **«کپی تنظیمات»** gives the changes as a small JSON text (`{ "version": 9, "look": {…}, "texts": {…} }`) to send to us, **«وارد کردن»** takes such a text back, **«بازگردانی همه»** returns the defaults. **«حالت آماده»** applies a mode over the defaults: پیش‌فرض، فشرده، باز و نرم، خیلی گرد، تیز و رسمی، چسبیده (بدون فاصله و گوشه)، کادرهای سیاه خالص، کادرهای سفید، نوشته‌ی درشت، حرکت قوی. Double-clicking a slider puts it back. While a slider is dragged the panel fades so the page can be seen.

To change a **default**, change `LOOK_DEF` / `TXT_DEF` at the top of the script (and the matching `--*-n` in `:root` if the number is a CSS one).

All the controls, with their ranges and defaults (the sizes are pixels of the 1920 design):

**تب «چیدمان»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `frame` | شکل کادر بنر · کادر بنر | lock / free | free |
| `ratio` | شکل کادر بنر · نسبت کادر بنر (عرض ÷ ارتفاع) | 1.30–2.60 | 1.74 |
| `gap` | فاصله‌ها · فاصله‌ی بین کادرها | 0–60 px | 9 |
| `edgeX` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی چپ و راست | 0–140 px | 9 |
| `edgeT` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی بالا | 0–140 px | 9 |
| `edgeB` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی پایین | 0–140 px | 9 |
| `navH` | اندازه‌ی کادرها · ارتفاع هدر | 44–110 px | 71 |
| `dockH` | اندازه‌ی کادرها · ارتفاع کادر اطلاعات | 56–200 px | 80 |
| `railMax` | اندازه‌ی کادرها · حداکثر عرض ستون کارت‌ها | 160–1400 px | 480 |
| `rail` | اندازه‌ی کادرها · جای ستون کارت‌ها | left / right | left |
| `fit` | بنر · نمایش بنر | contain / cover | contain |
| `fill` | بنر · جای خالی کنار بنر | black / edge | black |
| `zoom` | بنر · زوم اول تصویر | low / mid / high | mid |
| `bg` | پس‌زمینه‌ی صفحه · پس‌زمینه | black / color / glow | black |
| `bgColor` | پس‌زمینه‌ی صفحه · رنگ پس‌زمینه | رنگ | #000000 |
| `caps` | کارت‌ها · نوشته‌ی کارت‌ها | under / over / off | under |
| `capDate` | کارت‌ها · روز اجرا کنار اسم | روشن / خاموش | روشن |
| `dim` | کارت‌ها · کم‌رنگ بودن کارت‌های غیرفعال | 0–60 ٪ | 14 |
| `progress` | کارت‌ها · نشونه‌ی زمان باقی‌مونده | bar / ring / off | bar |
| `posterRatio` | لیست زیر هیرو · نسبت کادر پوستر (عرض ÷ ارتفاع) | ۰٫۵–۱ | ۰٫۶۶۷ (۲ به ۳) |
| `posterInfo` | لیست زیر هیرو · نوشته‌های کارت | زیر پوستر / روی پوستر | زیر پوستر |
| `listFill` | لیست زیر هیرو · اجراهای نمونه برای پر کردن لیست | روشن / خاموش | روشن |
| `secRows` | لیست زیر هیرو · ردیف‌های هر بخش (بقیه با «نمایش همه») | ۱ / ۲ / ۳ / همه | ۲ |
| `listCols` | لیست زیر هیرو · تعداد پوستر در هر ردیف (پنجره‌ی پهن) | خودکار / ۵ / ۶ / ۷ / ۸ | خودکار (۶ در ۱۹۲۰) |
| `presale` | لیست زیر هیرو · بخش پیش‌فروش | بلیت افقی با شمارنده‌ی بزرگ / مثل بقیه | بلیت افقی |
| `buyStyle` | لیست زیر هیرو · دکمه‌ی خرید کارت‌ها | سفید (مثل نمونه) / رنگ خود اجرا | سفید |

**تب «سبک»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `mode` | تم سایت · تم (دکمه‌ی خورشید و ماه هدر هم همین رو عوض می‌کنه) | تیره / روشن (سفید) | تیره |
| `lightPanel` | تم سایت · رنگ کادرها در تم روشن | ۴ رنگ + دلخواه | `#ffffff` |
| `lightBg` | تم سایت · زمینه‌ی صفحه در تم روشن | ۵ رنگ + دلخواه | `#eceef3` |
| `themeFx` | تم سایت · حرکت عوض‌شدن تم | دایره از دکمه / محو نرم / بدون حرکت | دایره |
| `radius` | گوشه‌ها و لبه‌ها · گردی گوشه‌ی کادرها | 0–60 px | 19 |
| `radiusThumb` | گوشه‌ها و لبه‌ها · گردی کارت‌ها و عکس‌ها | 0–40 px | 7 |
| `btn` | گوشه‌ها و لبه‌ها · شکل دکمه‌ها | pill / soft / sharp | pill |
| `borderW` | گوشه‌ها و لبه‌ها · ضخامت خط دور کادرها | 0–4 px | 0.5 |
| `borderO` | گوشه‌ها و لبه‌ها · پررنگی خط دور کادرها | 0–100 ٪ | 8 |
| `shadow` | گوشه‌ها و لبه‌ها · سایه‌ی کادرها | 0–100 ٪ | 91 |
| `panelColor` | رنگ‌ها · رنگ کادرها | رنگ | #0d0d0d |
| `textColor` | رنگ‌ها · رنگ نوشته‌ها | auto / white / black / custom | auto |
| `textCustom` | رنگ‌ها · رنگ دلخواهِ نوشته‌ها | رنگ | #ffffff |
| `font` | نوشته‌ها · فونت | vazir / plex / noto / system | vazir |
| `weight` | نوشته‌ها · ضخامت نوشته‌ها | light / normal / heavy | normal |
| `tx` | نوشته‌ها · اندازه‌ی همه‌ی نوشته‌ها | 70–140 ٪ | 100 |
| `txNav` | نوشته‌ها · نوشته‌های هدر | 70–150 ٪ | 100 |
| `txMain` | نوشته‌ها · عنوان و قیمت (کادر اطلاعات) | 70–160 ٪ | 100 |
| `txSmall` | نوشته‌ها · برچسب‌های ریز (مکان، قیمت از، …) | 70–170 ٪ | 100 |
| `txCap` | نوشته‌ها · نوشته‌ی کارت‌ها | 70–160 ٪ | 100 |
| `txCopy` | نوشته‌ها · نوشته‌های روی عکس (چیدمان متن) | 70–150 ٪ | 100 |
| `digits` | نوشته‌ها · رقم‌ها | fa / en | fa |

**تب «هدر و متن»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `hdSearch` | هدر · جستجو | روشن / خاموش | روشن |
| `hdCity` | هدر · انتخاب شهر | روشن / خاموش | روشن |
| `hdTickets` | هدر · بلیت‌های من | روشن / خاموش | روشن |
| `hdBell` | هدر · اعلان‌ها | روشن / خاموش | روشن |
| `hdLogin` | هدر · دکمه‌ی ورود | روشن / خاموش | روشن |
| `hdWidth` | هدر · عرض هدر بالای صفحه | 60–100 ٪ | 100 |
| `hdCompact` | هدر · هدر با اسکرول کوچیک بشه | روشن / خاموش | روشن |
| `hdCompactW` | هدر · عرض هدر کوچیک‌شده | 760–1400 px | 1400 |
| `hdSpeed` | هدر · سرعت جمع‌شدن هدر | 0.5 / 0.8 / 1.2 s (تند / معمولی / آروم) | 0.8 |
| `hdHover` | هدر · نشونه‌ی لینک‌ها | pill / line / off | pill |
| `hdProg` | هدر · خط پیشرفت اسکرول رو هدر | روشن / خاموش | روشن |
| `brand` | نوشته‌های ثابت · اسم سایت | متن | بلیت |
| `cats` | نوشته‌های ثابت · اسم دسته‌های هدر (با ویرگول؛ به ترتیب کنسرت، تئاتر، جُنگ و کمدی، پیش‌فروش) | متن | کنسرت، تئاتر، جُنگ و کمدی، به‌زودی (پیش‌فروش) |
| `login` | نوشته‌های ثابت · دکمه‌ی ورود | متن | ورود | ثبت‌نام |
| `search` | نوشته‌های ثابت · نوشته‌ی جستجو | متن | جستجوی اجرا، هنرمند یا سالن… |
| `city` | نوشته‌های ثابت · شهر | متن | تهران |
| `buy` | نوشته‌های ثابت · دکمه‌ی خرید | متن | خرید بلیت |
| `priceLab` | نوشته‌های ثابت · برچسب «قیمت از» | متن | قیمت از |
| `venueLab` | نوشته‌های ثابت · برچسب «مکان» | متن | مکان |
| `unit` | نوشته‌های ثابت · واحد پول | متن | تومان |

**تب «حرکت»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `mot` | حرکت · شدت حرکت | soft / balanced / strong | balanced |
| `trans` | حرکت · جابه‌جایی بین اجراها | fade / slide / zoom / wipe | fade |
| `dur` | حرکت · زمان هر اجرا | 5 / 7 / 10 | 7 |
| `fade` | حرکت · سرعت محو شدن | 0.8 / 1.2 / 1.8 | 1.2 |
| `intro` | حرکت · حرکت ورود صفحه | روشن / خاموش | روشن |
| `spot` | تعامل · نور دنبال‌کننده‌ی موس روی کادرها | روشن / خاموش | روشن |
| `magnet` | تعامل · دکمه‌ی خرید آهنربایی | روشن / خاموش | روشن |
| `swipe` | تعامل · کشیدن بنر برای عوض کردن اجرا | روشن / خاموش | روشن |
| `scroll` | اسکرول · اسکرول چرخ ماوس | smooth / native | smooth |
| `scrollSoft` | اسکرول · نرمی اسکرول | 30–140 ms | 55 |
| `story` | اسکرول · هیرو سرجاش می‌مونه و بخش دوم می‌ره روش | روشن / خاموش | روشن |

**Not in the tables:** the colour of each show (the «جایگاه» tab: 16 colours and a colour of its own), the texts of each show (title, kind, short name, venue, price, badge), the banner and the layout of each show.

**Light panels.** The text colour is `--fg` (as r, g, b); every line, wash and hover in the panels is made from it. When the panels' colour is light (relative luminance above 0.22) the text turns dark by itself (`textColor: auto`); the words over a photo and over a card's picture stay white; the login button and the small coloured words adapt. **Fonts:** Vazirmatn; IBM Plex Sans Arabic and Noto Sans Arabic load from Google Fonts when chosen. **Digits:** Persian or English everywhere, including the Intl dates.

---

## 12. Colours

Sixteen sets (`PALETTE`): violet, blue, teal, green, gold, orange, crimson, pink, **white, silver, black**, cyan, lime, yellow, indigo, brown, and a colour of the owner's (`custom`, the other values are made from it). A set is: `accent` (the buy button's fill, the date's band), `light` (the badge's text), `onAccent` (the text on the fill), `ring` (the thin things: the active card's ring and glow, the hairline, the dot, the time sign, the logo's bars; the accent itself unless the accent is too dark to be seen on a dark panel, as black is: then white). The picture suggests one of the first eight on upload (`suggestPalette()`); on the six sample banners it gives crimson, orange, crimson, violet, orange and violet (a black-and-white picture gets the brand violet); the sample data hand-picks gold for the golden concert banner and white for the black-and-white one.

**The light theme** (round I, `mode: light`). The look keeps two sets of page colours: the dark one (`panelColor`, `bg`, `bgColor`, `textColor`: what the owner approved) and the light one (`lightPanel` white, `lightBg` `#eceef3`; the words follow the panels: `#110e1a`). `theme()` writes `--capsule`, `--fg`, `--bg` for the theme in use and `data-mode` on the page; the stylesheet adds what a light page needs: shadows at a fifth (`--shk: .2`), the veil over the hero (when the list slides over it) in the page's colour instead of black, the browser's own light parts (`color-scheme`), a softer shadow for the menus and the search window, and the phone's bars in the page's colour (`<meta name="theme-color">`). What is a picture stays dark: the stage behind the banner (`--stage: #0b0a10`, so the fade between two banners goes through dark, as in a cinema), the words of the poster cards (they sit on a soft dark copy of the poster, as in the sample), the presale tickets, the cover of the show's page. The status labels and the sections' colours have a deeper tone on light panels.

---

## 13. Data model

```
slot {
  id, order, activeFrom?, activeTo?,                  // the slot is sold for a period
  layout: 'bar' | 'text',
  pal: 'violet' | … | 'brown' | 'custom', cust?,      // 16 keys, or a colour
  kind: 'concert' | 'theatre' | 'comedy', city,       // the category (with the city: Tehran or the others)
  type, name, title, desc, venue, startsAt, endsAt?, price, badge?,
  status?: 'normal' | 'soon' | 'extended' | 'soldout' | 'postponed' | 'cancelled' | 'held',   // none = automatic (§9.1)
  saleAt?, seatsLeft?,                                 // the sale's start; seats left (0 = sold out)
  banner: { src, srcset, thumb, ambient, w, h },      // 16:9; (the photo for layout 'text')
  poster?: { src, w, h },                            // tall (2:3 asked); for the lists after the hero; none = the banner is shown in the frame
  fp?: { o, op, mop }                                 // the photo layout's focal point
}
// global (the look, one setting for the whole hero): see §11
```
- `title` is the full line (also the `<h1>`; in the bar layout a visually hidden one). `type` and `name` label the rail card («کنسرت هانی نظریان»). `desc` is two lines, used by the text layout.
- `startsAt`, `endsAt`: ISO with +03:30. `price` is the lowest price in toman. `badge` is any text (the panel suggests: پرفروش، ظرفیت رو به اتمام، اجرای ویژه، اجرای جدید، تک‌اجرا، پیش‌فروش) or none; it is the owner's own label, apart from the status (§9.1). The short day under a rail card comes from `startsAt` / `endsAt`.
- Banners: 640, 1024 and 1672 (or 1920) wide, **ratio about 1.74** (the sample: 1672×960, 1024×588, 640×368); `srcset` + `sizes="(min-width: 761px) 82vw, 100vw"`. Photos: 640, 1920, 2560.
- **The poster** (round H) is separate from the banner: the banner is the hero's (wide, 16:9-ish); the poster is the lists' (tall, 2 : 3 asked, 1000×1500 or 2000×3000). The hero never shows a poster. **No track field** (no music).
- **The sample's dates are the banners' own** (so the facts panel agrees with the banner above it; the six shows are 23–26 Mehr, 28–29 Aban, 21 Aban, 12–17 Aban, 25–30 Mehr and 18 Aban 1405). They are in the past by now or will be soon, so **every sample show carries the owner's choice of status** (normal, normal, normal, «تمدید شد», «تمام شد», normal; the second one is «به‌زودی» with a sale that starts 1 day 2 h 37 min after the page is opened) and the sample does not turn into «برگزار شد» as the calendar moves. Choose «خودکار» in the panel to see the automatic rules work on the real dates (the first show becomes «برگزار شد»). Only the countdown is counted from the moment the page is opened. Cities: رامسر (the first; a county, so it is in «شهرستان‌ها»), تهران, تهران, ساری, تهران, تهران.
- The sample's prices, and the dates, times and venues the banners don't state, are made up. («برفاب» says 1404 on its banner; the sample puts it in 1405, 12–17 Aban, so it is «this week»; the concert's hall, which the banner prints with a word the page can't read, is left out.)

---

## 14. The settings panel (what the real admin does for a slot)

The panel in `index.html` («تنظیمات نمونه», the round button at the bottom left) has seven tabs: **نسخه‌ها** (only inside the comparison page: the versions and the preview sizes), **جایگاه** (this show), **چیدمان**, **سبک**, **هدر و متن**, **حرکت** (§11) and **اندازه‌ها** (§15). It can move to the other side of the screen. The «جایگاه» tab is the one the real admin would have:

1. **Image:** at the top a box says the size to make: by default (the free shape) the panel's own size **in this window** (e.g. 1629×711 at 1920×862), its ratio, the double of it for a sharp screen, and what it is on a 1920×1080 window (it follows the window and every setting); with the locked shape (an option) **one size for every window, `1740×1000`**, and, smaller, what the panel measures here. Then drop or pick one or several files (the box «بنر خودت رو اینجا بنداز یا انتخاب کن»); two buttons say where they go: «جای بنر این اجرا» (the default) or «اجرای جدید، آخر لیست» (each file becomes a new show at the end of the list with made-up words to change in the fields below it; the rail's window slides to it; it lasts until the page is reloaded). The note under says whether the file fills the panel and, if not, the size to make; the box «روی بنر نوشته (عنوان، تاریخ…) هست» picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · تو قابش کامل و بدون برش دیده می‌شه» (or that it fills the panel), or «نسبت ۳٫۰۰ به ۱ … کامل دیده می‌شه، ولی بالا و پایینش خالی می‌مونه (سیاهه)». **A tall or square picture (ratio under 1.15) is refused** («پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا»), and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot.
1b. **Poster** (round H): under the banner's box, the size to ask for the lists' posters (**1000×1500**, ratio 0.67, and the double for sharp screens: it follows the «نسبت کادر پوستر» setting), a button to pick **a tall picture as this show's poster** (a wide one is refused), a note saying what the show's poster is and how it sits in the frame, and «برگردوندن پوستر». The list under the hero changes at once.
2. **Info:** کادر پایین / متن روی عکس. 3. **Colour:** 16 swatches (the one suggested from the picture is marked) and a colour of one's own. 4. **Texts:** title, kind (the word on the card), short name, venue, price from, and a free label (any text). 5. **Category, city and status:** the kind (کنسرت / تئاتر / جُنگ و کمدی; changing it also changes the kind's word if it was the default one), the city (the 32 of the menu), the status label (خودکار, or any of the seven, to look at each one on the facts panel, the rail card and the second section's card) with a note under it saying what it is now and why, and the sale's start (none, 10 seconds from now (to see the sale open), 1 hour, 1 day 2 h, 3 days; it shows «همین که هست» while one is waiting). 6. **Reset** puts the slot back as it was (its kind, city, status and seats too).

Validation worth having in the real one: at least 1600×900 (warn below 1920×1080); JPEG, PNG or WebP up to 10 MB; refuse a ratio under 1.15; warn how the panel will look for a ratio that isn't the panel's own (about 1.74 with the default look; within 2.5 % it fills the panel); warn if the banner's words come closer than 4 % to an edge (the zoom clips them for a moment).

---

## 15. The sizes

The tab «اندازه‌ها» says, for the window it is in: the window and its pixel ratio; the size of the header, the rail, the banner's panel, **the banner itself inside it**, the facts panel; the gap and the margins; the file of the current banner (size, ratio); **the size that fills the banner's panel in this window** (with the locked shape: one size, `1740×1000`) and the size to ask the organiser for (§16); and a table of the banner's panel on common windows for the current look. With the defaults (the free shape, the approved layout) the panel's shape follows the window:

| Window | Banner's panel | The banner | Rail | Gap | Margin |
|---|---|---|---|---|---|
| 2560×1440 | 2072×1191 | 2071×1190 | 452 | 12 | 12 |
| **1920×1080** | **1553×893** | **1552×892** | 340 | 9 | 9 |
| 1920×937 (a maximised browser) | 1603×775 | 1349×774 | 294 | 8 | 8 |
| 1920×862 (the owner's claude.ai window; on his own screenshot the panel measured 1637×711 inside) | 1631×713 | 1629×711 | 267 | 7 | 7 |
| 1536×864 | 1246×714 | 1245×713 | 268 | 7 | 7 |
| 1440×900 | 1132×760 | 1131×649 | 288 | 7 | 7 |
| 1366×768 | 1115×635 | 1114×634 | 232 | 6 | 6 |
| 1280×720 | 1050×590 | 1049×589 | 212 | 6 | 6 |

On every 16:9 window the panel is 1.74 : 1, so a 1.74 banner fills it. A 16:10 window (1440×900) leaves bars above and below (55 px each), a wide one (1920×937) 127 px at each side — black, or the banner's mirrored edge — unless the file has the panel's own shape (within 2.5 %). **With the locked shape (an option, §5)** the panel is always 1.74 : 1 and only its size and the rail change: 1553×893 at 1920×1080 (rail 340), 1348×775 at 1920×937 (rail 548), 1240×713 at 1920×862 (rail 658), 1043×600 at 1536×730 (rail 474); on a window taller than 1.74 the banner and the facts panel stay together in the middle of the column (1440×900: 55 px of black above and below).

**To be sharp** the banner should have at least as many pixels as the biggest panel it will be drawn in: 2072×1191 on a 2560×1440 screen, double that on a high-density one.

The switch «اندازه‌ی کادرها، فاصله‌ها و حاشیه‌ها رو روی صفحه بکش» draws a layer over the page: each panel's outline with its size, each gap in pink with its number, each margin in blue with its number, and the banner's own size. It follows the window, the scroll and every change of the look.

---

## 16. What we ask of the organiser, and what the server does

| Step | Detail |
|---|---|
| Ask for | a banner of the panel's shape. **By default (the free shape) there is no one size for every window:** the panel takes what the window leaves, so its shape follows the window's height (1.74 at 1920×1080 → 1553×893; 2.07 at 1920×937 → 1603×775; 2.3 at 1920×862, the owner's claude.ai window → about 1637×711); the settings' «جایگاه» tab says the number for the window it is in. A banner within 2.5 % of the panel's shape fills it (a 1.74 one fills every 16:9 window); further off it is shown whole with black beside it or above and below. **For one size for every window use the locked shape (an option): 1740×1000** (ratio 1.74; **3480×2000** for sharp screens). JPEG, PNG or WebP up to 10 MB, with the important words at least 4 % from the edges (the picture starts 5 % zoomed in). For the text layout a **2560×1440** photo with no words. A poster (ratio under 1.15) is refused |
| Ask for (the poster) | a **tall poster, 1000×1500 (ratio 2 : 3; 2000×3000 for sharp screens)**, for every list after the hero. Any other tall shape is shown whole with a soft copy of itself beside it; within 2.5 % of 2 : 3 it fills the frame; a wide picture is refused as a poster. The poster carries its own words (title, day, hall, time, the ticket site's address), so nothing is laid over it except the status label and the stamp «تمام شد», and the words are under it by default |
| Make the sizes | WebP: 640 (the cards), 1024 and 1672 (or 1920 if the source has it); photos 640, 1920, 2560. Never upscale |
| Make the poster's sizes | WebP: 360 (a card on a phone), 720 and 1000 wide (a card at 1920 is 310 px; at 2560, 350), never upscaled; the soft copy comes from the same file, scaled by the page (or a 32 px copy made once, as the ambient) |
| Make the ambient | 64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, ~1 KB WebP (only used when the page's background is the glow) |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest of the first eight colours; a black-and-white picture gets violet |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them |
| Never | tint, crop, redraw or put anything on the organiser's picture. (The mirrored edge, if chosen, is drawn by the page, outside the picture, from the same file.) |

---

## 17. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`. Each scene has one `<h1>`.
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button. A card's accessible name is «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان». A visually hidden `role="status"` line says the same when the visitor (not the timer) changes the show.
- The search is a modal `dialog` with a labelled `listbox`, `aria-activedescendant`, Esc, and the focus returned. The city menu and the kinds' menus are `role="menu"`s (`aria-haspopup`, `aria-expanded` on their button, the arrows, Home and End move in them, Esc or a click outside closes them, the focus goes back). A status label is text in the card's name (and a chip); a buy button that can't be pressed is `aria-disabled` and named by its reason or its start time; the ticking digits are `aria-hidden`. The settings panel is a dialog with `role="tablist"` tabs (arrow keys), switches (`role="switch"`) and labelled sliders.
- The banner is a link labelled «… صفحه‌ی اجرا»; it can also be dragged, but nothing needs dragging. Focus rings follow the text colour. Under `prefers-reduced-motion` nothing moves (a 0.4 s fade, no zoom, no pin effect, no light, no lean), and auto-advance starts paused.

---

## 18. Performance

- **Layout shift (the brief asks for none):** the page has 0 on load and while its content scrolls. The header's width morph is a *layout* animation (`width`/`left` on a fixed element), and Chrome counts it: about 0.05–0.06 per morph at 1920×862 (a tight shadow only brings it to 0.03), so under the 0.1 limit but not zero. **In the production site animate it with `transform` / `clip-path` (FLIP)** so that it counts nothing; the look stays the same.
- Continuous motion is `transform` and `opacity`. The per-frame style writes are the time sign (one element, and only the one that shows), the picture's zoom, the header's `--hs` and `--pg` while the page scrolls, and the hero's transform while it is covered. The scroll listener is passive and its work is skipped when nothing changed.
- No `backdrop-filter`, no blend modes, no WebGL, **no audio** (no `AudioContext`, no analyser, no beat). The mirrored edge (off by default) is the only `filter` on a big element: blurred once inside the layer that zooms.
- Scenes are built once and reused; after the intro the other shows' scenes are built one at a time. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset imagesizes>`). When the tab is hidden, the hero is covered or the search is open, the timer and the zoom pause.

---

## 19. The comparison page (`../index.html`)

- **No bar.** The chosen version is an `<iframe>` that fills the whole window, so a sample opens at its own size.
- **The switcher is in each version's settings panel** (versions 6 to 9): a group «مقایسه‌ی نسخه‌ها» and a group «اندازه‌ی نمایش» (in v9 they are the tab «نسخه‌ها»). It works by `postMessage`: the page says `{ heroReady }`, the comparison page answers `{ heroVersions: […], current, sizes: […], size, scale }`, a click sends `{ heroSwitch: 'v7' }` or `{ heroSize: '1920x1080' }`.
- **Preview sizes.** `auto` is the real window. A fixed size (`1920x1080`, `1536x864`, `1440x900`, `1366x768`, `1024x768`, `390x844`) puts the version in a frame of exactly that many CSS pixels, centred, scaled down when the window is smaller, never up. Inside, the page really has that viewport. It survives a switch of version and is in the address: `#v9@1920x1080`.
- A version without those groups (v1–v5) gets a tiny floating capsule. Keys 1–9 and `#v9` also switch. The private preview carries versions 6–9 only.

---

## 20. Measured

- **Fit:** 22 window sizes × cards on both sides × bar and text layouts = 132 checks, all passing (2560×1440 … 1280×520, 3440×1440, 1024×768, 1280×1024, 820×1180, 390×844, 360×700): no horizontal scroll; header, rail, banner and facts reach the same margin on every side to within 1 px; the gaps equal `--gap`; the rail's top and bottom are the banner column's; no overlap; corners soft and panels opaque; no clipped text; the banner's rectangle has the banner's ratio and lies inside its panel; the cards are 16:9, inside the rail, evenly spaced; no text under 10.4 px; `geom()` equals the page to within 1.5 px.
- **The look:** each setting changes the page by the amount it says (gap 30 → 30.0 px, margins 60/10/40 → 60.0 / 10.0 / 40.0, radius, border); white panels turn the text dark; the texts reach the header, the dock and the cards; a reload keeps the look; copy then paste brings it back; reset restores the defaults.
- **Smooth scroll (round F):** one 300 px wheel turn ends exactly at 300 px and follows the four-lag curve in time (the largest gap 10 px of 300), never goes back or overshoots; the header starts with the wheel's first turn (17 ms in, the page still 0 px down) and finishes by itself (605 ms later); the hero's effects are written in the very frame the page moves in (a scroll event would come one frame later); a wheel over the rail's list moves the list and not the page; `native` gives the browser's scroll back; a long spin stops at the end of the page.
- **Scrolling:** at the top the header is the full bar exactly on the grid's first row; at 14 px the motion has started (hs 0.6 after 140 ms), at 400 px it is narrower and centred to 0.02 px, with the same top, height (59.2 px), corners (15.8 px) and room round its buttons (10.6 px at the top and when scrolled), width 1585 → 1167 at 1600×900 (the default small header is 1400 px of the 1920 design); the sheet rises over a pinned, shrinking hero; at one screen it covers it (top 0) and the show's timer is paused; at the bottom the progress line is full; back at the top everything is as it was.
- **Round F** (`tools/status-test.js`, 68 checks): the city button shows every name whole and keeps one width for every name at 1920×1080, 1536×864, 1366×768, 1280×720 and 2560×1440; the menu is 32 names in four columns, inside the window, none cut, in the alphabet, no counties; the keys (Enter, ↓, ←, Home, End, Esc) and the narrow header; the automatic rules and their priorities, the owner's choice, the six labels' words and colours, in the facts panel, on the rail's cards, on the tickets of the list below and in the search, never over the banner; the countdown counts down in Persian digits, the same clock in two places, the button's width never changes while it ticks (layout shift 0 over 5 s), a press says when the sale starts, and a sale set to 10 s opens 10 s later (message, the real button everywhere, the card's label and the header's count gone); the header's menus (counts ۱/۰, ۳/۲, ۰/۰), an empty list (the page goes to the section, the message, the chip and the header link marked), a list with shows, the presale link, the chips, ↓ on a kind; a changed kind and city change the lists and counts; a light panel (dark text on the labels) and English digits. And the header's pieces sit at least 7.4 px from the capsule's edge and never overlap at 14 window sizes from 1101 to 3440 px wide, wide and narrow.
- **Interactions:** search by kind, by name and by venue, a miss, Enter, `/`, Esc and Ctrl+K; the city menu; the highlight sliding to within 0.2 px; every header piece switched off; the list's category bar, sections and tickets (`tools/ui-test.js`); the measuring layer's twelve labels; the arrow keys; dragging left and right; the lean (x 8.4 px) and its return; the four changes between shows each ending with opacity 1 and no transform or clip left; the ring and the bar; captions over, under, off; English digits; the title at 140 %; sharp buttons; the mode «چسبیده» (0 margin, 0 gap, 0 radius).
- **Behaviour:** one scene after five quick clicks and after fourteen changes in a row; the timer pauses over the rail; the panel pauses the show; a 16:9 file is accepted, a poster refused, a 3:1 file accepted whole; no audio element, no player, no equaliser anywhere; reduced motion: paused, no zoom, shown.
- **Six banners (round C):** fit 132 of 132 again, with six shows and the owner's defaults (the rail shows four whole cards in every window, 1920×1080: banner 1553.5×893, rail 339.5, `is-fill`, a stretch of 0.2 %); each of the six banners fills that panel (object-fit fill, picture 1552×891 in a 1553.5×893 panel); at 1920×937 the banner stays whole with black beside it (`contain`); the zoom is 1.027 at 1.5 s, 1.009 at 3 s and **exactly 1.0000 at 5.6 s and at 6.5 s**, when the banner's layer is the panel's size; the rail's window starts at card 0 0 1 2 2 2 for the six shows, each active card whole between the bars; the second section lays six cards in three columns; the measuring layer draws its twelve labels; the six files (18 sizes) load with no stand-in picture; no script errors.
- **The locked shape (an option):** at 1920×1080, 1920×937, 1920×862, 1536×730, 1366×650, 2560×1440, 2560×1300, 1440×780, 1280×720 and 3440×1440 the banner's panel is 1.7400 : 1 (to 0.01 %), the banner fills it (`is-fill`), `geom()` agrees with the page to 0.1 px, and the header, rail, panel and facts reach the same margins (the rail at its natural width on 16:9 windows, wider on the others; the margins grow only at 3440×1440, where the rail stops at its cap); on 1440×900 and 1024×768 the banner and the facts sit together in the middle of the column. The wide rail's cards are rows: pictures 16:9, words inside their cell, four whole cards in view.
- **The comparison page:** the sample fills the window exactly; `1920x1080` makes the page inside exactly 1920×1080; the size and the version survive each other; v1 gets the capsule.
- **Cost** (1920×1080, software rendering, per second of wall time): paused 0–1 ms of script; running (zoom + the time sign) 9 ms of script, 13 ms of style, 1 ms of layout; during a change 11 ms of script, 46 ms of style, 6 ms of layout.

---

## 21. What this version leaves out, and why

- **Music** (the player, the playlist, the rhythm analysis, the beat on the picture and the logo): the owner asked for it to be removed completely.
- **Posters:** the owner doesn't want them in the hero. **Cropping the banner, or covering it:** the baked words must stay whole (unless the owner picks «پر کردن کادر»).
- **A locked banner panel by default:** built, tested (132 fit checks) and then **switched off by default**: the owner asked for a size, not for a change of the site's structure («the small frames' look changed, make it as I approved it»). It stays as an option (`frame: lock`). The cost of the lock, for whoever turns it on: on a window wider than 16:9 (every browser window) the cards get more room than they need, so they become rows; on an ultra-wide window the margins grow (the rail stops at `railMax`).
- **A safe-area guide:** not needed when nothing covers the banner.
- **A language switch, a theme switch, a cart, a mega menu in the header:** possible; each is a button in the same place. The header has the ones that matter most to a ticket buyer: search, city, my tickets, notifications, login.
- **A second info column for very wide windows, a 2 × 2 card grid, a taller facts panel for tall windows:** each would use the spare room better in one shape of window and complicate every other.
- **A ticket-shaped card, cut-out people, 3D objects, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in their own panel. (The sale-start countdown is built, as the buy button's own state: §9.1. What stays out is a *big* countdown in the banner's panel.)
