# Hero · نسخه‌ی ۹ · جایگاه ویژه، دقیقاً اندازه‌ی دسکتاپ، همه‌چیز قابل‌تنظیم · handoff spec

> **خلاصه برای خودت:** نسخه‌ی ۹ همون نسخه‌ی ۸ است (چند کادر جدای نرم‌گوشه با فاصله‌ی کم: **هدر**، **کادر کارت‌ها**، **کادر خودِ بنر**، **کادر اطلاعات**) که سه دور کار روش شده:
> 1. **دقیقاً اندازه‌ی دسکتاپ:** کادرها کل پنجره رو لبه‌به‌لبه پر می‌کنن (حاشیه‌ی برابر از چهار طرف، فاصله‌ی برابر بینشون)، روی هر دسکتاپی از ۱۲۸۰×۶۰۰ تا ۲۵۶۰×۱۴۴۰ و عریض‌تر. بنر همیشه کامل و بی‌برش وسط کادرش می‌شینه؛ جای خالی کنارش (وقتی شکل پنجره فرق داره) **سیاهه**.
> 2. **همه‌چیز تو «تنظیمات نمونه» (دکمه‌ی گرد پایین‌چپ) قابل‌تنظیمه:** فاصله‌ی بین کادرها و تا لبه‌ها، ارتفاع‌ها، گردی گوشه‌ها، خط دور، سایه، رنگ کادرها (حتی سفید)، رنگ نوشته‌ها، فونت، اندازه‌ی هر دسته نوشته، نوشته‌های ثابت (اسم سایت، دسته‌ها، دکمه‌ها…)، آیتم‌های هدر، شدت و نوع حرکت. ۱۰ «حالت آماده» (فشرده، باز، گرد، تیز، چسبیده، سفید…) و «کپی تنظیمات» که متنش رو می‌شه برای ما فرستاد تا همون بشه پیش‌فرض. تب «اندازه‌ها»: اندازه‌ی هر کادر و خودِ بنر به پیکسل، اندازه‌ای که از برگزارکننده می‌خوایم، و یه لایه که اندازه‌ها و فاصله‌ها رو روی صفحه می‌کشه.
> 3. **حرفه‌ای‌تر:** هدر ثابته و با اسکرول یه کپسول کوچیک وسط‌چین می‌شه (با حرکت)؛ هیرو سرجاش می‌مونه و **بخش دوم** مثل ورقه از روش رد می‌شه؛ جستجوی پنجره‌ای (`/` یا Ctrl+K)، منوی شهر، لینک‌هایی که پیل زیرشون می‌لغزه، نور دنبال‌کننده‌ی موس روی کادرها، دکمه‌ی خرید آهنربایی با موج، کشیدن بنر برای عوض کردن اجرا، چهار نوع جابه‌جایی بین اجراها (محو، کشویی، زوم، پرده)، ۱۶ رنگ + رنگ دلخواه.
>
> **موزیک کلاً حذف شد** (خواسته‌ی صاحب پروژه): نه پخش‌کننده، نه تحلیل ریتم، نه واکنش تصویر به ضرب.
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v9, the fifth owner round (the fourth round of version 9 itself). History of v9:
- *Round A* (v8 liked, «make 9 a copy and more professional, with the exact desktop size»): the panels tile the window; the rail's cards fill the rail with a line of words under the picture; a mirrored edge beside a banner whose shape differs.
- *Round B* (this one): «make the blurred background black», «let me control the gaps between the panels and from the panels to the edges, to build exactly what I want», «write the banners' sizes», «all of it in the floating settings button», «let me control many things (texts, the roundness beside the panels …) so I can tell you which modes are best and make them the default», «more colours, white and black for example», «more professional, stronger interactions and motion», «remove the music completely, no music in the page and the header», «what else could the header have», «a modest second section to scroll to, in harmony», «the header should shrink, with a strong professional motion, as I scroll, stay centred and come down with the page».

The owner sent four real shows, each with a 16:9 banner and a tall poster, all with their words baked in. The sample data in `index.html` uses the **banners**. They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v8 | From v7 | New in v9 |
|---|---|---|
| the panels, the solid colours, the two layouts, the facts panel, the scenes and their fades, the admin panel, the palette | the picture's zoom-out and fade; the capsule header | panels that tile the window; a banner panel that takes what is left; cards with a line of words under them; the look system (67 settings, 10 modes, copy/paste); 16 colours and light panels; a fixed header that becomes a pill; the search window; the second section and the pinned hero; the measuring layer; the preview sizes. **Removed:** the music |

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
.s2 ──── the second section: a sheet with round top corners that slides up over the hero
.notes ─ the design notes (not part of the site)
```

Every panel is a solid rounded frame: background `--capsule` (`#120f1b`, opaque), a border, a 1px highlight on its top edge, radius `--r`, a soft shadow. The gap between any two is `--gap`. No `backdrop-filter`, no see-through. The page behind is black (`--bg`).

| Piece | What it is |
|---|---|
| **Header** (`.nav`) | outside the hero, `position: fixed`, so it stays above the second section; at the top of the page it sits exactly on the empty first row of the hero's grid (§9) |
| **Rail** (`.rail`) | a panel as tall as the banner column: up bar, the cards, the down bar and the pause button (§7) |
| **Banner** (`.frame`) | the banner's panel: all the room between the header and the facts. The banner is shown whole inside it (§5). It is a link to the show |
| **Facts** (`.dock`, layout bar) | the same solid panel, `--dock-h` tall, exactly as wide as the banner's panel |
| **Second section** (`.s2`) | §10 |

---

## 2. One geometry

Every number is a variable, and the settings panel writes them (§11). `--px` is one pixel of the 1920-wide design (`--u / 19.2`), so the numbers the owner types are pixels of that design and scale with the window.

```
--u        clamp(8px, min(1vw, 1.7778svh), 26px)         --px   --u / 19.2
--edge-x   max(edgeX·px, (100vw − hero-h × 2.25) / 2)    the side margin; grows only on a window wider than 2.25 : 1
--pad-t/b  max(edgeT / edgeB · px, safe-area)            --gap  gap · px
--nav-h    max(50px, navH·px)      --dock-h  max(56px, dockH·px)      --r  max(radius·px, min(12px, radius))
--hero-h   max(440px, 100svh)      --main-h  hero-h − pad-t − pad-b − nav-h − gap
--n        the number of shows (the script sets it)
--rail-pad .75u   --arrow-h max(28px, 1.85u)   --card-gap .6u   --cap-h max(22px, 1.3u)   --cap-gap .35u   (0 when the captions are over the picture or off)
--cell-h   (main-h − 2·rail-pad − 2·border − 2·arrow-h − (n + 1)·card-gap) / n
--thumb-w  (cell-h − cap-h − cap-gap) × 16/9
--rail-w   clamp(11u, thumb-w + 2·rail-pad + 2·border, railMax·px)
```

- **The grid** (hero and every scene): columns `--rail-w` and `1fr` (swapped with the cards on the left), rows `--nav-h` and `1fr`, areas `"nav nav" "rail main"` or `"nav nav" "main rail"`, `gap`, and the page margins as padding. The rail and the banner column take **all** the width, so nothing is left over at the sides.
- **The banner column** (`.tk`): rows `1fr` and `--dock-h`, so the banner's panel is `main-h − dock-h − gap` tall and as wide as the column.
- **At 1920×1080 with the defaults:** margin 23 px, gap 15 px, rail 326 px, banner panel 1533×849, the banner 1505×847. `geom(W, H)` in the script is this same arithmetic for any window (the sizes tab uses it; a test checks it against the page at 22 sizes).
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

The banner is **never cut and never covered** (unless the owner asks for «پر کردن کادر»). It is drawn with `object-fit: contain` in a panel that takes whatever room is left, so:

- if the panel has the banner's own shape (to within 0.4 %), the banner fills it;
- otherwise the banner sits whole in the middle and the rest of the panel is **black** (`fill: black`, the default) or **the banner's own edge, mirrored and blurred** (`fill: edge`): two copies of the same picture, one on each side (class `is-h`) or one above and one below (`is-v`), flipped so the column of pixels next to the picture is the picture's own edge column, blurred with `blur(1.4u)` and darkened by 26 %. The script measures the panel (`ResizeObserver`) and writes the picture's size as `--pw` and `--ph`; the CSS places the copies from those;
- `fit: cover` fills the panel and cuts the banner (to compare);
- the picture and its extension are one layer (`.pic`), so the zoom-out moves them together.

**The page behind** is black (`bg: black`), a colour of the owner's (`bg: color`), or, as an option, the banner's own colours tiny and blurred (`bg: glow`: a 64×36 version, `blur 2.5px saturate 1.45`, made once on upload by the server).

**Why not crop or leave margins:** cropping would cut the baked words (the sample «SkyKings» is half a per cent from the edge); leaving margins is the v8 problem (§2).

---

## 6. Motion

| t (s) | What happens when the next show comes (the «محو» style) |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 0.38 | The old panels' content fades out (`0.32 × fade`). |
| 0.36 → 1.2 | The new panels' content fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0 → 8.2 | The picture (and its extension, as one layer) zooms out inside its panel (linearly) over the show's 7 s plus the next fade's 1.2 s. |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The accent (the colour of the buy button, the ring, the hairline) changes. |
| 7 | The next show starts. |

- **Four styles** («جابه‌جایی بین اجراها»): *fade*; *slide* (the new panel rises from below when going down the rail, from above when going up, `expo.out`); *zoom* (the old one shrinks away, the new one settles from 1.07); *wipe* (a clip opens from the start side, `expo.inOut`). Each leaves nothing behind (a test checks the opacity, the transform and the clip after each).
- **Intensity** («شدت حرکت»: آروم 0.6 / متعادل 1 / قوی 1.6) multiplies the distances, the zoom and the hover lifts. Reduced motion makes it 0 and the change a 0.4 s fade.
- **The zoom** starts small, because the banner's words are near its edges: banner 1.02 / **1.05** / 1.09, photo 1.08 / **1.15** / 1.24.
- **Pausing** (the timer, the time sign and the picture's motion pause together): the pointer over the rail or a drag in progress, focus inside the rail, the pause button, the settings panel open, the search window open, the hero covered by the second section, the tab hidden.
- **Quick clicking:** a scene is never reused while it is still fading, and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Entrance:** the header drops in, the rail's pieces slide in one by one, the banner's panel opens from the start side (a clip, `expo.out`, 1.4 s) while the first scene fades in already zooming out, the facts panel rises, then the words.
- **Touch of the page:** a soft light follows the pointer over a panel (`.spot`, a radial wash of the text colour at 8 %); the buy button leans toward the pointer (up to 0.22 × and 0.32 × the distance, `elastic.out` back) and ripples where it is pressed; the banner can be dragged (more than 70 px sideways, or less than that and it springs back) to go to the next or the previous show; the arrow keys go to the next or previous show (← is next, as the rail); `/` and Ctrl/⌘+K open the search. Each of the light, the lean and the drag can be switched off.

---

## 7. The rail

A panel with one card per show, the up and down bars and the pause button. It is as tall as the banner column.

- **A card** is a 16:9 picture (the banner's 640 px version) with one line under it: «کنسرت SkyKings» on the start side and the short day («۷ آبان», «۲۵–۳۰ مهر») on the end side. The line can be under the picture, over it (on a gradient) or off; the day can be left out; it goes by itself when the picture is narrower than 190 px.
- **The cards share the height equally** (`--cell-h`), centred in their cell; the rail's width follows from the picture's (at most `railMax`).
- **More cards than fit:** each cell keeps a minimum height and the list scrolls inside the panel.
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

A `position: fixed` capsule outside the hero (so it stays above the second section). Its content, right to left in RTL: the logo (five bars that dance on hover) and the name; the **categories** (a highlight pill slides under the one the pointer is on; the first is current); a **search** button that looks like a field («جستجوی اجرا، هنرمند یا سالن…» and a `/` key); a **city** button (a menu of eight cities); **my tickets** and **notifications** (a dot) as icon buttons; the **login** button (the text colour as its fill, the panel's colour as its text, so it flips on light panels); a menu button on phones. Each of search, city, tickets, bell and login can be switched off; the names and the categories are fixed texts.

**The search window** (a command palette): a dialog with a field, the shows as rows (picture, title, venue and day, badge), the arrow keys and Enter, Esc to close, the focus kept inside and given back. It filters on the title, the kind, the name, the venue, the badge, the day and the description, after normalising Arabic letters, half-spaces and digits. A pick opens that show (and scrolls to the top). The show's timer stays paused while it is open.

**On scroll** the header becomes a small pill and stays centred, as a function of one number `--hs` (0 at the top, 1 after about 170 px of scroll, eased in and out, followed with a little weight by `gsap.ticker`):

```
top      pad-t → 10px                         width   grid width × hdWidth% → compact width (hdCompactW · px, at least 760px)
left     so that it stays centred             height  nav-h → nav-h × .8
radius   r → min(nav-h × .4, r × 2.2) (a pill)  gap, padding and the links' padding shrink; the search field and the city name fold into icons;
                                               tickets and bell fade out; the shadow grows
```

A 2px line in the ring colour along the bottom edge shows how far down the page is (`--pg`). The morph, its width and the line can be switched off. The header never wraps or overflows during the morph (`overflow: hidden`, popups are separate elements).

---

## 10. The second section and the pinned hero

**The stack.** `.pin` is as tall as the hero plus one more screen; the hero inside it is `position: sticky; top: 0`; `.s2` has `margin-top: −one screen`, so it starts right under the hero and slides up over it while the hero stays. As `p` (0 → 1) goes from the top to one screen of scroll the hero shrinks to 94 % and moves up 1.6 %, its corners round to 26 px and a black veil rises to 82 %; at 98.5 % the hero is covered and its timer pauses. `story: off` makes the hero scroll away like any section. Not used on stacked layouts.

**The section** is plain on purpose, and made of the hero's own material (the same panels, gap, margins, radii, text sizes and colours, so every setting changes it too): a head panel (a label, a title, one line, and a filter «همه / کنسرت / تئاتر»), the shows as cards in a row (a 16:9 picture whole, kind and badge, title, day and venue, price and a small buy button in that show's colour; hover lifts and brightens the border; the picture opens that show in the hero), and a strip with three numbers that count up when seen and the button «دیدن همه‌ی اجراها». The filter moves the cards that stay to their new places and lets the ones that return rise in. Pieces rise as they come into view (`IntersectionObserver`). The numbers (120, 48, 98 %) are samples.

---

## 11. The look: what the owner can change

Every setting is a variable or an attribute; the settings panel writes it, `localStorage` keeps it (`hero9.look`), **«کپی تنظیمات»** gives the changes as a small JSON text (`{ "version": 9, "look": {…}, "texts": {…} }`) to send to us, **«وارد کردن»** takes such a text back, **«بازگردانی همه»** returns the defaults. **«حالت آماده»** applies a mode over the defaults: پیش‌فرض، فشرده، باز و نرم، خیلی گرد، تیز و رسمی، چسبیده (بدون فاصله و گوشه)، کادرهای سیاه خالص، کادرهای سفید، نوشته‌ی درشت، حرکت قوی. Double-clicking a slider puts it back. While a slider is dragged the panel fades so the page can be seen.

To change a **default**, change `LOOK_DEF` / `TXT_DEF` at the top of the script (and the matching `--*-n` in `:root` if the number is a CSS one).

All the controls, with their ranges and defaults (the sizes are pixels of the 1920 design):

**تب «چیدمان»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `gap` | فاصله‌ها · فاصله‌ی بین کادرها | 0–60 px | 15 |
| `edgeX` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی چپ و راست | 0–140 px | 23 |
| `edgeT` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی بالا | 0–140 px | 23 |
| `edgeB` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی پایین | 0–140 px | 23 |
| `navH` | اندازه‌ی کادرها · ارتفاع هدر | 44–110 px | 63 |
| `dockH` | اندازه‌ی کادرها · ارتفاع کادر اطلاعات | 56–200 px | 92 |
| `railMax` | اندازه‌ی کادرها · حداکثر عرض ستون کارت‌ها | 160–480 px | 326 |
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

**تب «سبک»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `radius` | گوشه‌ها و لبه‌ها · گردی گوشه‌ی کادرها | 0–60 px | 19 |
| `radiusThumb` | گوشه‌ها و لبه‌ها · گردی کارت‌ها و عکس‌ها | 0–40 px | 10.5 |
| `btn` | گوشه‌ها و لبه‌ها · شکل دکمه‌ها | pill / soft / sharp | pill |
| `borderW` | گوشه‌ها و لبه‌ها · ضخامت خط دور کادرها | 0–4 px | 1 |
| `borderO` | گوشه‌ها و لبه‌ها · پررنگی خط دور کادرها | 0–100 ٪ | 22 |
| `shadow` | گوشه‌ها و لبه‌ها · سایه‌ی کادرها | 0–100 ٪ | 80 |
| `panelColor` | رنگ‌ها · رنگ کادرها | رنگ | #120f1b |
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
| `hdCompactW` | هدر · عرض هدر کوچیک‌شده | 760–1400 px | 920 |
| `hdHover` | هدر · نشونه‌ی لینک‌ها | pill / line / off | pill |
| `hdProg` | هدر · خط پیشرفت اسکرول رو هدر | روشن / خاموش | روشن |
| `brand` | نوشته‌های ثابت · اسم سایت | متن | بلیت |
| `cats` | نوشته‌های ثابت · دسته‌های هدر (با ویرگول جدا کن) | متن | کنسرت، تئاتر، استندآپ، فستیوال، خانوادگی |
| `login` | نوشته‌های ثابت · دکمه‌ی ورود | متن | ورود | ثبت‌نام |
| `search` | نوشته‌های ثابت · نوشته‌ی جستجو | متن | جستجوی اجرا، هنرمند یا سالن… |
| `city` | نوشته‌های ثابت · شهر | متن | تهران |
| `buy` | نوشته‌های ثابت · دکمه‌ی خرید | متن | خرید بلیت |
| `priceLab` | نوشته‌های ثابت · برچسب «قیمت از» | متن | قیمت از |
| `venueLab` | نوشته‌های ثابت · برچسب «مکان» | متن | مکان |
| `unit` | نوشته‌های ثابت · واحد پول | متن | تومان |
| `s2Eye` | بخش دوم · برچسب بالای عنوان | متن | این هفته |
| `s2Title` | بخش دوم · عنوان | متن | اجراهایی که نباید از دست بدی |
| `s2Sub` | بخش دوم · توضیح | متن | همه‌ی اجراهای ویژه‌ی این هفته یک‌جا. دسته رو انتخاب کن و بلیتت رو بگیر. |
| `s2Cta` | بخش دوم · دکمه | متن | دیدن همه‌ی اجراها |

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
| `story` | اسکرول · هیرو سرجاش می‌مونه و بخش دوم می‌ره روش | روشن / خاموش | روشن |

**Not in the tables:** the colour of each show (the «جایگاه» tab: 16 colours and a colour of its own), the texts of each show (title, kind, short name, venue, price, badge), the banner and the layout of each show.

**Light panels.** The text colour is `--fg` (as r, g, b); every line, wash and hover in the panels is made from it. When the panels' colour is light (relative luminance above 0.22) the text turns dark by itself (`textColor: auto`); the words over a photo and over a card's picture stay white; the login button and the small coloured words adapt. **Fonts:** Vazirmatn; IBM Plex Sans Arabic and Noto Sans Arabic load from Google Fonts when chosen. **Digits:** Persian or English everywhere, including the Intl dates.

---

## 12. Colours

Sixteen sets (`PALETTE`): violet, blue, teal, green, gold, orange, crimson, pink, **white, silver, black**, cyan, lime, yellow, indigo, brown, and a colour of the owner's (`custom`, the other values are made from it). A set is: `accent` (the buy button's fill, the date's band), `light` (the badge's text), `onAccent` (the text on the fill), `ring` (the thin things: the active card's ring and glow, the hairline, the dot, the time sign, the logo's bars; the accent itself unless the accent is too dark to be seen on a dark panel, as black is: then white). The picture suggests one of the first eight on upload (`suggestPalette()`); on the four sample banners it gives gold, crimson, orange and crimson.

---

## 13. Data model

```
slot {
  id, order, activeFrom?, activeTo?,                  // the slot is sold for a period
  layout: 'bar' | 'text',
  pal: 'violet' | … | 'brown' | 'custom', cust?,      // 16 keys, or a colour
  type, name, title, desc, venue, startsAt, endsAt?, price, badge?,
  banner: { src, srcset, thumb, ambient, w, h },      // 16:9; (the photo for layout 'text')
  fp?: { o, op, mop }                                 // the photo layout's focal point
}
// global (the look, one setting for the whole hero): see §11
```
- `title` is the full line (also the `<h1>`; in the bar layout a visually hidden one). `type` and `name` label the rail card («کنسرت SkyKings»). `desc` is two lines, used by the text layout.
- `startsAt`, `endsAt`: ISO with +03:30. `price` is the lowest price in toman. `badge` is one of: پیش‌فروش، پرفروش، ظرفیت رو به اتمام، اجرای ویژه، جدید (or none). The short day under a rail card comes from `startsAt` / `endsAt`.
- Banners: 640, 1024 and 1672 (or 1920) wide; `srcset` + `sizes="(min-width: 761px) 82vw, 100vw"`. Photos: 640, 1920, 2560.
- **No poster field.** A show's tall poster belongs to the poster shelf, not here. **No track field** (no music).
- The sample's prices, the three numbers in the second section, and the dates and venues the banners don't state, are made up.

---

## 14. The settings panel (what the real admin does for a slot)

The panel in `index.html` («تنظیمات نمونه», the round button at the bottom left) has seven tabs: **نسخه‌ها** (only inside the comparison page: the versions and the preview sizes), **جایگاه** (this show), **چیدمان**, **سبک**, **هدر و متن**, **حرکت** (§11) and **اندازه‌ها** (§15). It can move to the other side of the screen. The «جایگاه» tab is the one the real admin would have:

1. **Image:** drop or pick a file; the box «روی بنر نوشته (عنوان، تاریخ…) هست» picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · تو قابش کامل و بدون برش دیده می‌شه», or «نسبت ۳٫۰۰ به ۱ … کامل دیده می‌شه، ولی بالا و پایینش خالی می‌مونه (سیاهه)». **A tall or square picture (ratio under 1.15) is refused** («پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا»), and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot.
2. **Info:** کادر پایین / متن روی عکس. 3. **Colour:** 16 swatches (the one suggested from the picture is marked) and a colour of one's own. 4. **Texts:** title, kind, short name, venue, price from, badge. 5. **Reset** puts the slot back as it was.

Validation worth having in the real one: at least 1600×900 (warn below 1920×1080); JPEG, PNG or WebP up to 10 MB; refuse a ratio under 1.15; warn how the panel will look for a ratio other than 16:9; warn if the banner's words come closer than 4 % to an edge (the zoom clips them for a moment).

---

## 15. The sizes

The tab «اندازه‌ها» says, for the window it is in: the window and its pixel ratio; the size of the header, the rail, the banner's panel, **the banner itself inside it**, the facts panel; the gap and the margins; the file of the current banner (size, ratio) and what size it should be to look sharp here; **the size to ask the organiser for** (§16); and a table of the banner's panel and of the banner on common windows (2560×1440 … 1280×720) for the current look. With the defaults:

| Window | Banner's panel | The banner | Rail | Gap | Margin |
|---|---|---|---|---|---|
| 2560×1440 | 2044×1132 | 2007×1130 | 435 | 20 | 31 |
| **1920×1080** | **1533×849** | **1505×847** | 326 | 15 | 23 |
| 1920×937 | 1584×737 | 1305×735 | 283 | 13 | 20 |
| 1536×864 | 1228×679 | 1203×677 | 259 | 12 | 18 |
| 1440×900 | 1150×724 | 1148×646 | 245 | 11 | 17 |
| 1366×768 | 1101×599 | 1060×597 | 222 | 11 | 16 |
| 1280×720 | 1037×558 | 988×556 | 202 | 10 | 15 |

The switch «اندازه‌ی کادرها، فاصله‌ها و حاشیه‌ها رو روی صفحه بکش» draws a layer over the page: each panel's outline with its size, each gap in pink with its number, each margin in blue with its number, and the banner's own size. It follows the window, the scroll and every change of the look.

---

## 16. What we ask of the organiser, and what the server does

| Step | Detail |
|---|---|
| Ask for | a **16:9 banner of 1920×1080** (at least 1600×900), JPEG, PNG or WebP up to 10 MB, with the important words at least 4 % from the edges (the picture starts 5 % zoomed in); for the text layout a **2560×1440** photo with no words. Another shape is accepted whole (with black beside it); a poster (ratio under 1.15) is refused |
| Make the sizes | WebP: 640 (the cards), 1024 and 1672 (or 1920 if the source has it); photos 640, 1920, 2560. Never upscale |
| Make the ambient | 64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, ~1 KB WebP (only used when the page's background is the glow) |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest of the first eight colours; a black-and-white picture gets violet |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them |
| Never | tint, crop, redraw or put anything on the organiser's picture. (The mirrored edge, if chosen, is drawn by the page, outside the picture, from the same file.) |

---

## 17. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`. Each scene has one `<h1>`.
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button. A card's accessible name is «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان». A visually hidden `role="status"` line says the same when the visitor (not the timer) changes the show.
- The search is a modal `dialog` with a labelled `listbox`, `aria-activedescendant`, Esc, and the focus returned. The city menu is a `role="menu"` closed by Esc or a click outside. The settings panel is a dialog with `role="tablist"` tabs (arrow keys), switches (`role="switch"`) and labelled sliders.
- The banner is a link labelled «… صفحه‌ی اجرا»; it can also be dragged, but nothing needs dragging. Focus rings follow the text colour. Under `prefers-reduced-motion` nothing moves (a 0.4 s fade, no zoom, no pin effect, no light, no lean), and auto-advance starts paused.

---

## 18. Performance

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
- **Scrolling:** at the top the header is the full bar exactly on the grid's first row; at 400 px it is a pill centred to 0.02 px, top 10, width 767 and height 42 at 1600×900; the sheet rises over a pinned, shrinking hero; at one screen it covers it (top 0) and the show's timer is paused; at the bottom the progress line is full; back at the top everything is as it was.
- **Interactions:** search by kind, by name and by venue, a miss, Enter, `/`, Esc and Ctrl+K; the city menu; the highlight sliding to within 0.2 px; every header piece switched off; the second section's filter and numbers; the measuring layer's twelve labels; the arrow keys; dragging left and right; the lean (x 8.4 px) and its return; the four changes between shows each ending with opacity 1 and no transform or clip left; the ring and the bar; captions over, under, off; English digits; the title at 140 %; sharp buttons; the mode «چسبیده» (0 margin, 0 gap, 0 radius).
- **Behaviour:** one scene after five quick clicks and after fourteen changes in a row; the timer pauses over the rail; the panel pauses the show; a 16:9 file is accepted, a poster refused, a 3:1 file accepted whole; no audio element, no player, no equaliser anywhere; reduced motion: paused, no zoom, shown.
- **The comparison page:** the sample fills the window exactly; `1920x1080` makes the page inside exactly 1920×1080; the size and the version survive each other; v1 gets the capsule.
- **Cost** (1920×1080, software rendering, per second of wall time): paused 0–1 ms of script; running (zoom + the time sign) 9 ms of script, 13 ms of style, 1 ms of layout; during a change 11 ms of script, 46 ms of style, 6 ms of layout.

---

## 21. What this version leaves out, and why

- **Music** (the player, the playlist, the rhythm analysis, the beat on the picture and the logo): the owner asked for it to be removed completely.
- **Posters:** the owner doesn't want them in the hero. **Cropping the banner, or covering it:** the baked words must stay whole (unless the owner picks «پر کردن کادر»).
- **A safe-area guide:** not needed when nothing covers the banner.
- **A language switch, a theme switch, a cart, a mega menu in the header:** possible; each is a button in the same place. The header has the ones that matter most to a ticket buyer: search, city, my tickets, notifications, login.
- **A second info column for very wide windows, a 2 × 2 card grid, a taller facts panel for tall windows:** each would use the spare room better in one shape of window and complicate every other.
- **A ticket-shaped card, cut-out people, 3D objects, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in their own panel. A countdown can come back as an optional chip.
