# مجموعه‌ی ۰۶ · بینش و نرخ تبدیل · handoff spec

> **خلاصه برای خودت:** دو کارت تیره با نور نارنجی و آبی، از روی عکسی که فرستادی. تو عکس این دو تا صفحه‌ی ۴ و ۵ از یه دسته‌ی ورق‌خوردنی بودن (خط سفید پایین‌شون اینو می‌گه)؛ اینجا هر کارت دسته‌ی شش‌صفحه‌ای خودش رو داره و رنگ خودش رو نگه می‌داره. ظاهر همونه؛ هر چی اضافه شده حرکت و تعامله.
> **۰۶·۱** بینش (رشد درآمد) · **۰۶·۲** نرخ تبدیل
> - **نور پس‌زمینه:** از روی عکس اندازه گرفته شده (پنج-شش نور نرم برای هر کارت) و آروم به سمت ماوس خم می‌شه. با هر صفحه‌ی تازه هم یه کم جابه‌جا می‌شه.
> - **روی نمودار بکش:** تو ۰۶·۱ نشانگر نارنجی و خط‌چینش روی خط سُر می‌خورن و زیر خط تا نشانگر روشن‌تر می‌شه. تو ۰۶·۲ نقطه‌ی نورانی روی موج حرکت می‌کنه. عدد و عنوان (مثلاً «Week 2» یا «Friday») همون لحظه رو می‌گن.
> - **صفحه‌ها:** روی خط‌های پایین بزن، کارت رو به چپ و راست بکش، یا با فلش‌ها. عنوان و متن سُر می‌خورن، عدد می‌غلته و نمودار به شکل صفحه‌ی تازه درمیاد.
> - **«Weekly»:** منوی روزانه / هفتگی / ماهانه؛ داده و شکل نمودار عوض می‌شه.
> - **«Explore more +»** (۰۶·۲): شیشه بالا میاد و نشون می‌ده تبدیل‌ها از کجا اومدن.
>
> `set.js` و `set.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` مجموعه‌ی شماره‌ی ۶ـه.

**Status:** first version, waiting for the owner's feedback. Measured on the shot (1199 × 1042 px): card edges and radius, every text block (sizes fitted to cap heights and widths in the browser), the pill, the dashes, the line chart, the wave (traced column by column) and the glass pill. The background lights were fitted to the shot with a small optimiser (text and charts masked out).

---

## 1. Units and layout

1u = 1px of the shot. Each card is **476 × 615 u**, radius 19. The set sits on the shot's pale grey:

- container ≥ 760px: **1098 × 731 u**, cards at (40, 56) and (582, 56) (the shot's 66u gap);
- narrower: **556 × 1412 u**, cards stacked at (40, 56) and (40, 747).

CSS: `--u = 100cqi / 1098` (or `/ 556`) through a container query on `.s06`. The chips 06·1 / 06·2 sit 12u above each card. Positions below are card units.

## 2. Anatomy (both cards)

| Part | Position (u) | Notes |
|---|---|---|
| Card | 476 × 615, radius 19 | base gradient + five or six soft lights (below); a fade to black over the last 30%; long shadow on the grey |
| Title | x 28.6, baseline 44.5 | Inter 400, 17.8u, white |
| Period pill | 347.5, 19.5, 100.5 × 35 | `rgba(255,255,255,.1)`, Inter 400 13.5u, chevron 15u (stroke 1.5); opens a menu |
| Label | centred, baseline 106.8 | Inter 400, 13.7u, tracking .025em; `#ffb39b` (06·1) / `#a3bdd8` (06·2) |
| Number | centred, cap top 124 | Inter **300**, 54.1u, tracking −.008em, white; rolling digits |
| Arrow ↗ | 7.4u right of the number, level with the top of the digits | 9u, stroke .95, `#ff6b3d` / `#8fd0ff` |
| Dashes | x 114, centre y 572.5 | six, 34 × 3.6u, 10.2u apart; `rgba(255,255,255,.14)`, active `#f7f7f7` |

**Lights** (`GLOW` in `set.js`, each `cx, cy, rx, ry, angle, colour, alpha`, drawn bottom first as `radial-gradient(closest-side, c 1, .88 at 25%, .56 at 50%, .19 at 75%, 0)`). 06·1 base `#160101 → #000`; 06·2 base `#011224 → #01070e`.

### 06·1 Insights

- **Line:** the shot's weekly page is (158.5, 40%) → (240.5, 75%) → (317.5, 75%), y = 286.5 − (v − 40) × 45/35; stroke `#f2622f` 3u, round joins.
- **Fill:** from the line down to y 478, `#ff5a24` 34% → 14% → 0.
- **Guides:** dashed 3/3, 1u, `rgba(255,98,48,.5)`, at every point.
- **Marker:** dot r 4.6 `#ff5a24` at y 185 above the "now" point, dashed guide down to 478, a pulse ring every 2.4 s.
- **Note:** two lines centred, first baseline 509.3, Inter 400 14.25u / 18u, `#858585`.

### 06·2 Conversion

- **Wave:** y(x) = 330 − Σ A·exp(−|x − c|^p / σ^p) with a small bump (128, 27, 40, 2.2), the main peak (288, 113, 58, 2.8) and a rise at the right edge (487, 113, 58, 2.8): flat-topped peaks, as traced on the shot. Drawn as a light-blue tube: strokes 30 / 17 / 9.5 / 4.4u (`#1e6fd0` 7%, `#2f8de0` 15%, `#5fb4f0` 34%, `#a4d5f6` 95%) plus a 2u white highlight that only shows near the dot; faded in from the left and out at the right.
- **Dot:** r 10.5, gradient `#f6feff → #c9f2ff → #6fd0ff`, glow r 30, a pulse ring every 2.2 s; it sits 3u under the peak.
- **Glass pill:** 56, 409.5, 366 × 120, fully round; `rgba(8,10,16,.25)` with `rgba(255,255,255,.05)` on top (measured against the shot). Note text x 95, Inter 400 12.5u / 17u, `#7c8794`; "Explore more +" Inter 400 12.6u.

## 3. Pages and data (sample)

| # | 06·1 (daily / weekly / monthly) | 06·2 (daily / weekly / monthly) |
|---|---|---|
| 1 | Sales Volume 9 / 32 / 88% | Visitors 34 / 120 / 310% |
| 2 | New Customers 14 / 48 / 121% | Sign-ups 22 / 86 / 204% |
| 3 | Average Order 6 / 21 / 54% | Click-through 17 / 64 / 150% |
| 4 | **Revenue Growth 18 / 75 / 168%** (the shot) | Retention 28 / 92 / 214% |
| 5 | Profit Margin 4 / 18 / 41% | **Conversion Rate 64 / 250 / 590%** (the shot) |
| 6 | Repeat Buyers 19 / 64 / 132% | Checkout 11 / 38 / 96% |

06·1 lines have 4 / 3 / 5 points (daily / weekly / monthly) with "now" second to last; each page's "now" sits at the shot's height. 06·2 moves its peak per page and period. Each page has its own note and (06·2) three sources for "Explore more".

## 4. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | cards rise 60u, tip back from 16°, 160 ms apart | 1.3 s `expo.out` |
| | lights fade in from 125% scale; title and pill drop in; label rises | .1–.45 s |
| | the line grows out of a low flat line / the wave rises from calm; numbers spin up from 0% | 1.2–1.4 s |
| | dashes stretch in one by one; note or glass slides up | .7–.9 s |
| Lights | each light leans 5–15% of the way to the pointer (springs 40/12) and drifts ±9u; a page change parks them somewhere new | continuous |
| Lean | card turns up to 3° / 3.6° toward the pointer | springs 90/15 |
| Page | label and note slide out and in (26u, direction-aware); number rolls; chart morphs (.95 s `expo.out`); arrow springs back in | |
| Swipe | the page body follows the finger at 35% (max 60u) and springs back; past 50u it turns the page | |
| Scrub | 06·1: marker on a spring (200/24), the fill brightens up to it; 06·2: the dot rides the wave | continuous |
| Menu | panel scales in from its corner (`back`-like), items drop in 40 ms apart; chevron flips | .35–.45 s |
| Glass | clip opens upward 150u (spring 150/17), corners tighten, list rows rise; the wave dims behind it; + turns into × | |
| Idle | the wave breathes (amplitudes ±3.5%, the small bump sways); pulse rings on the marker and the dot | |
| Live (gallery button) | the shown figures tick up or down a point every 1.8 s | |

## 5. Interaction and accessibility

- The dashes are a `tablist` (arrows, Home, End move pages; the active dash is the tab stop). The period pill opens a `menu` of `menuitemradio` items (arrow keys, Escape returns focus, a click outside closes).
- Each chart is a `role="slider"` with `aria-valuetext` ("Conversion Rate, Friday: 250%, weekly"); arrows step, Home / End, Escape returns to now. A polite live region repeats keyboard and page changes.
- Touch: drag on a chart to scrub (it holds 1.4 s after a tap), swipe elsewhere on the card to turn the page.
- "Explore more" has `aria-expanded`; the list is `aria-hidden` while closed.
- **Reduced motion:** no intro (a .5 s fade), no lean, drift or breathing, instant page and period changes.

## 6. Performance

- Lights, lean and swipe move with `transform`; the charts rewrite one path per frame only while something changes.
- The glass opens with `clip-path`, no backdrop blur.
- The loop stops off screen or in a hidden tab.

## 7. Porting notes

- `GLOW` holds the fitted lights; `INS_PAGES` / `CONV_PAGES` the pages; `insSeries`, `waveParams` and `waveY` the chart shapes.
- The pale grey stage (`.s06-back`) and the chips above the cards belong to the gallery shot.
