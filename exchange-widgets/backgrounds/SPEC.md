# بک‌گراندها · Background Lab · handoff spec

> **خلاصه برای خودت:** بخش جدای بک‌گراندها، با ۱۶ بک‌گراند زنده.
> - **۰۱ تا ۰۷ از ویجت‌ها:** همون نورها و رنگ‌ها، بدون کارت. **۰۱ منشور** همون پنل رنگی ویجت ۰۵ـه (همون شبکه‌ی رنگ‌ها که از عکس درآوردیم)، **۰۲** و **۰۳** نورهای کارت‌های ۰۶، **۰۴** شیشه و نور زمین ۰۳، **۰۵** نور آبی ۰۲، **۰۶** شفق خود گالری، **۰۷** دیوار پشت کارت‌های ۰۴.
> - **۰۸ تا ۱۶ سری تازه:** همون هارمونی‌ها با رنگ یا ترکیب تازه. پنج تا از روی ۰۵ (چون بهترینش بود): ابریشم منشوری، مد کهربایی، تالاب، شاهانه، رزکوارتز؛ و چهار تا از روی ۰۶ و ۰۳: جریان زمردی، اخگر سرخابی، دو شعله، کسوف.
> - **زنده:** رنگ‌ها آروم مثل مایع جریان دارن. اشاره‌گر رو تکون بدی رنگ‌ها زیرش باد می‌کنن و دنبالش کشیده می‌شن، کلیک کنی موج حلقه‌ای می‌خورن، نگه داری جمع می‌شن و ول کنی با لرزش برمی‌گردن. تو بعضی‌ها نورها هم به سمت اشاره‌گر خم می‌شن (۰۲، ۰۳، ۰۷) یا دنبالش میان (۰۵، ۰۶)؛ تو کسوف نور دور لبه‌ی سیاره می‌چرخه.
> - **تمام‌صفحه:** دکمه‌ی گوشه‌ی هر کارت (یا دابل‌کلیک). با ← و → (یا کشیدن سریع روی گوشی) بین‌شون می‌ری، Space حرکت رو نگه می‌داره.
> - **دانلود:** موبایل (۱۱۷۹ × ۲۵۵۶) و دسکتاپ (۲۵۶۰ × ۱۴۴۰)، PNG، همون لحظه‌ای که داری می‌بینی.
> - **بافت:** دکمه‌ی «بافت» بالای صفحه یه دونه‌ی فیلمی روشون می‌ذاره (روی فایل‌های دانلودی هم). پیش‌فرض خاموشه تا مثل خود ویجت‌ها صاف باشن.
>
> `engine.js` مرجع زنده‌ی همه‌ی بک‌گراندهاست؛ صفحه‌ش `index.html` همین پوشه‌ست.

**Status:** first version, waiting for the owner's feedback. The seven recreations were checked side by side against the widgets, each rendered still at its widget's own shape.

---

## 1. Files

| File | What it holds |
|---|---|
| `engine.js` | `window.BGLab`: every background (`SCENES`), the two field kinds, fitting, the painter (live frames) and `render()` (exports). No dependencies. |
| `page.js` | The page: tiles, one animation loop, pointer input, the full-window viewer, downloads, the grain switch. Uses `lab/lab.js` for the theme and slow-motion tools. |
| `page.css` | Tiles, viewer, toast; tokens and header come from `lab/lab.css`. |
| `index.html` | The page markup; tiles are generated from `SCENES`. |

## 2. The backgrounds

Design units are the source widget's shot units (1u = 1px of that shot).

| # | Name | From | Kind | Design (u) | Notes |
|---|---|---|---|---|---|
| 01 | Prism · منشور | 05 | grid | 425 × 291 | widget 05's 34 × 24 colour grid, Catmull-Rom, the panel's rounded-corner bleed cleaned from the four corners |
| 02 | Deep Current · جریان عمیق | 06·2 | layers | 476 × 615 | base `rgb(1,18,36) → rgb(1,7,14)`, the six fitted lights, the card's fade to black (70% → 92% → 100%) |
| 03 | Ember · اخگر | 06·1 | layers | 476 × 615 | base `rgb(22,1,1) → #000`, the five fitted lights, the same fade |
| 04 | Violet Glass · شیشه‌ی بنفش | 03 | layers | 700 × 520 | the card's base and four corner lights, the chart's light (`#6b4be3`, 20%) without the chart, the floor light and its streak, an inner violet edge glow, the 118° gloss (overlay) |
| 05 | Blue Hour · ساعت آبی | 02 | layers | 500 × 203 | the card's charcoal base, the blue band and navy ellipse, the cyan spot, the bottom glow, the top sheen; a pointer sheen. On tall frames the design turns a quarter (its left edge becomes the bottom) and the sheen is left out |
| 06 | Night Aurora · شفق شب | gallery | layers | 1440 × 900 | the gallery's three auroras (72vmax / 58vmax at their places), its resting pointer light, the 56px grid and the two market lines (overlay) |
| 07 | Fog · مه | 04 | layers | 460 × 736 | the wall's six gradients on `#8a8681` and its four drifting lights |
| 08 | Prism Silk · ابریشم منشوری | new · 05 | grid + warp | 425 × 291 | 05's grid bent by two slow sine folds (92u / 70u) with mirrored edges |
| 09 | Amber Tide · مد کهربایی | new · 05 | grid (re-tint) | 425 × 291 | cool → sunset (gold, amber, wine), warm → violet / indigo; mirrored left to right |
| 10 | Lagoon · تالاب | new · 05 | grid (re-tint) | 425 × 291 | cool → aqua / teal, warm → magenta / berry |
| 11 | Royal · شاهانه | new · 05 | grid (re-tint) | 425 × 291 | cool → lavender / violet, warm → apricot / tangerine; turned half round |
| 12 | Rose Quartz · رزکوارتز | new · 05 | grid (re-tint) | 425 × 291 | lightness lifted to 0.6 + 0.37·L, chroma × 0.62 (more in the dark cells), lilac and rose |
| 13 | Emerald Current · جریان زمردی | new · 06·2 | layers | 476 × 615 | 06·2's lights turned −86° in OKLCH |
| 14 | Fuchsia Ember · اخگر سرخابی | new · 06·1 | layers | 476 × 615 | 06·1's lights turned −42° |
| 15 | Twin Flame · دو شعله | new · 06 | layers | 720 × 720 | 06·1's lights (mirrored) at the top right, 06·2's (turned half round) at the bottom left |
| 16 | Eclipse · کسوف | new · 03 | layers | 1000 × 700 | 03's corner lights over a planet (r 820 at 500, 1290): a thin white rim (σ 4.5u), violet glow outside (46u), haze inside (70u), brightest where the light falls (cos²·²); a floor-light streak on the horizon |

**Re-tints (09–12).** Each grid cell goes to OKLab and is split into lightness plus a mix of the two families of widget 05: cool (hue 238°) and warm (hue 27°). The mix is kept; each family gets new hues from a small table indexed by lightness (so a dark cool cell can become wine instead of a muddy gold), then back to sRGB with chroma pulled into gamut. The tables are `PALETTES` in `engine.js`.

## 3. Rendering

- **Field kinds.** `grid`: Catmull-Rom over the grid, pre-sampled to an 8× texture, read bilinearly. `layers`: listed bottom first and composited "over"; kinds `blob` (rotated ellipse, alpha·(1 − d²)², the widgets' fitted lights), `rad` and `lin` (CSS-style stops, premultiplied), `planet`.
- **Fitting.** A design fills any frame partly by stretching and partly by cropping around its focus point: `stretch` 0.45–0.7 per background (1 = fill exactly). Positions and sizes come along; pointer effects stay round on screen.
- **Liquid displacement** (frame pixels, S = the frame's short side, t in seconds), the same for live frames and exports:
  `dx = A·(sin(5.3y + .31t) + .66·cos(3.9x − .23t) + .5·sin(4.7(x + y) + .19t))`
  `dy = A·(sin(4.6x − .27t) + .7·cos(3.4y + .37t) + .5·sin(5.1(x − y) − .21t))`, x, y in S units, `A = 0.032·S·flow` (`flow` 0.35–1 per background). The cross terms are split into row × column tables.
- **Breathing.** The whole design zooms ± 2.2% (0.11 rad/s) and pans ± 1.8% (0.07 / 0.059 rad/s).
- **Pointer** (springs, per frame): swell under the pointer `lens` 0.17 hovering, 0.72 while held (spring 110 / 7, so it wobbles when let go); sweep = the pointer's speed × 0.045, at most 0.3·S; both through a gaussian of σ = 0.21·S.
- **Ripples:** a ring at 0.95·S per second, width 0.075·S, push 0.045·S, fading to 20% each second; up to five.
- **Lights that move:** drift `ax, ay` at their own rates, breathing scale, lean toward the pointer (`lean`, `leanX`, `leanY` in design units).
- **Resolution.** Live frames are a sixth of the tile's CSS size (the viewer a fifth), capped at 16,000 px (hero tiles 30,000, the viewer 56,000) and scaled up smooth by the browser. Idle tiles redraw at 30 fps, touched ones at 60.
- **Overlays** (full resolution, not displaced): the gallery grid and market lines (06), the glass gloss sliding with the pointer (04).
- **Grain and dither.** On screen: a 192px noise tile blended `overlay` at 30% (the grain switch), else 7% (only dithers). Exports: overlay-style grain of 3.5% (none in pure black or white) when the switch is on, and a triangular ±1 level dither always, so dark gradients never band.

## 4. Page

| Moment | What happens |
|---|---|
| A tile scrolls in | every tile already shows a still frame; the first time it is in view its colours pinch, ring out from the centre and spring back (1.6 s) |
| Hover (mouse) | swell and sweep; the page glow takes the tile's most vivid colour |
| Press / hold / drag | ring; pull in (released with a wobble); stir |
| Touch | tap = ring; horizontal drags stir (vertical ones scroll the page) |
| Open (corner button or double-click) | the viewer grows out of the tile (0.8 s `expo.inOut`) and keeps the tile's moment; closing shrinks it back |
| Viewer | ← next, → previous (right-to-left order), Space pause, F real fullscreen where allowed, Esc close; a quick swipe changes background on touch; the bar hides after 2.8 s of stillness |
| Next / previous | the old frame fades out over the new one (0.9 s) and a ring starts on the side you came from |

- **Downloads.** Phone 1179 × 2556, desktop 2560 × 1440, PNG, named `bg-<nn>-<slug>-<phone|desktop>-<w>x<h>.png`, rendered at the tile's current moment (without the pointer). Inside claude.ai the page uses the Artifact `downloads` capability (the viewer confirms each file); where it is not available the buttons hide, because a download the page starts itself does nothing there. Opened as a saved file or from any other site, a plain download link is used. The button fills as the file renders (0.4–1.6 s).
- **Numbers.** Chips read `BG·01`; captions say «بک‌گراند ۱ · از ویجت ۰۵», a set's card stays left to right (`06·2`).

## 5. Accessibility

- Each live frame is `role="img"` with the background's name; buttons have Persian labels; the viewer is a modal dialog that holds focus (Tab cycles its buttons) and returns it to the tile's open button.
- **Reduced motion** (and `?still`): one still frame per tile, no flow, rings or swell; the viewer opens without growing.

## 6. Performance

- One `requestAnimationFrame` loop for the tiles on screen (or only the viewer while it is open); it stops when nothing is visible or the tab is hidden.
- A live frame costs about 1.2–1.6 ms (desktop). An export renders in 0.4–1.6 s in slices, so the page keeps moving.

## 7. Porting notes

- `SCENES` is plain data plus a colour function per kind: to use a background in the app, export a PNG, or port the field to a fragment shader (the formulas above are the whole of it; a grid becomes a small texture).
- Widget 05's grid lives in both `widgets/05-progress/set.js` and `engine.js` (here with its corners cleaned).
- The re-tint (`retint`, `PALETTES`) works on any colour grid: a new palette is two `[lightness, hue]` tables.
