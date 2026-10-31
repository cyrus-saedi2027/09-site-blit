# ویجت ۰۳ · تحلیل درآمد · handoff spec

> **خلاصه برای خودت:** کارت شیشه‌ای «Revenue Analytics» با لبه‌ی نئونی بنفش، از روی عکسی که فرستادی؛ با همون زاویه‌ی سه‌بعدی و نور روی زمین. ظاهر همونه؛ هر چی اضافه شده حرکت و تعامله.
> - **ماوس روی کارت:** کارت از زاویه‌ی طرح می‌چرخه رو به تو و کمی دنبال ماوس می‌ره؛ لبه‌ی نئونی زیر نشانگر روشن‌تر می‌شه و نور کف پررنگ‌تر.
> - **روی نمودار بکش:** یه نقطه‌ی نورانی روی منحنی سُر می‌خوره، خط راهنما تا محور پایین میاد و یه کارت شیشه‌ای روز، مبلغ و تغییر نسبت به روز قبل رو (سبز یا قرمز) نشون می‌ده. برچسب همون روز روی محور روشن می‌شه.
> - **منوها:** «This Month» بین ماه و ۷ روز آخر زوم می‌کنه؛ «Apr 2025» ماه رو عوض می‌کنه (منحنی شکل عوض می‌کنه و عددها می‌چرخن)؛ «⋯» خط‌چین ماه قبل رو برای مقایسه می‌کشه و نقطه‌ها رو روشن/خاموش می‌کنه.
> - **همیشه:** یه نور دور لبه‌ی کارت می‌چرخه، یه پالس روی خط تا نقطه‌ی آخر می‌ره، نقطه‌ی آخر نفس می‌کشه، نور کف آروم نفس می‌کشه.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` ویجت شماره‌ی ۳ـه.

**Status:** first version, waiting for the owner's feedback. The shot shows the card tilted in 3D, so it was first rectified: the card's four edges were fitted, their vanishing points gave the focal length (≈ 2140 px) and the card's true shape (700 × 431, 1.62 : 1) and angle. Every position below was measured on that flat copy. The poster text around the card (brand name, slogans) is not part of the widget and is left out.

---

## 1. Units, angle and anatomy

All numbers are pixels of the rectified card (**u**): the card is **700 × 431 u**, radius 28, placed at (30, 34) in a **760 × 560 u** stage (room for the tilt and the floor light). CSS: `--u = 100cqi / 760`.

**Resting angle (the shot's):** `perspective(2140u) rotateZ(-3.1°) rotateX(9.4°) rotateY(21.75°)` about the card's centre. Hovered: Z and X/Y relax to 0 (spring 90/16) plus a pointer follow of ±4° X / ±6° Y.

| Part | Position (u) | Notes |
|---|---|---|
| Card | 700 × 431 | `#0d0c26 → #06071a`; purple light in the top-left and bottom-left corners and along the bottom; inner glow `inset 0 0 22u rgba(124,92,255,.3)`; `overflow: clip` |
| Neon rim | 2u stroke + 9u blurred copy | gradient from bottom-left `#d9ccff` through `#9d83f5`/`#6e5bc4` to top-right `#cfc2ff`; a white spot follows the pointer; outer halo biased to the left and bottom |
| Gloss | diagonal band | `linear-gradient(118deg, …)` with a sharp edge at 42 %, slides against the turn |
| Floor light | 640 × 70, 486 u from the stage top | white core, purple spread, blurred; brighter when the card faces you |
| "Revenue Analytics" | x 50.5, baseline 59 | Inter 400, 22 u, tracking −.03 em, `#f3f1ff` |
| "This Month ⌄" | x 50.5, baseline 94 | Inter 400, 15 u, `#a7a4bf`, chevron 11 u (a menu button) |
| Total "$1,429,550" | x 50, baseline 152 | Inter 400, 26 u, tracking .045 em, white |
| Badge | 48, 171, height 33, radius 9 | `rgba(104,76,236,.17)`; "↑ 20.8%" `#ab93ff` 500, "vs last month" `#b8b2d8` 400, 12 u |
| "Apr 2025 ⌄" | 489, 32, 120 × 39, radius 11 | `rgba(22,22,48,.8)`, 1.5 u border `rgba(255,255,255,.1)`, Inter 15 u |
| "⋯" | dots 3.2 u at 641 / 648 / 655, y 51 | a menu button |
| Chart | days at x 103 → 593, line starts at x 58 | $1.6M at y 180.5, 133.33 u per $1M, baseline y 367 |
| Line | | core `#ebe2ff` 2.2 u, glows `#c2adff` 6.5 u (blur 3.2) and `#8b5cf6` 20 u (blur 9); fades in over x 58 → 178 |
| Fill | | `#6b4be3 → #0e0a36` top to bottom, plus a blurred `#7c5cff` band hugging the line |
| End marker | last day | white dot r 3.4, ring `#e5dcff` r 6.4, glow; a light drops from it to the axis |
| Labels | y: x 631, centred on their values; x: baseline 390 | Inter 11.5 u, `#8e8aa9`; the last x label is right-aligned |

## 2. Data

- April 2025 is traced from the shot (`APRIL` in `widget.js`, $M per day, day 0 = 31 March); January–March are generated with the same feel (`synth`, seeded, so they never change).
- Totals: Jan $1,086,420 · Feb $1,124,760 · Mar $1,183,400 · Apr **$1,429,550**; the badge compares with the month before (Apr **+20.8%**).
- **Last 7 days:** the window tweens from days 1–30 to 24–30 (`expo.inOut`, 1.15 s), so the curve really zooms; the total becomes this month's total × (last 7 days ÷ all days), compared with the 7 days before.
- **Compare:** the previous month, stretched to this month's length, drawn as a dashed ghost line at 86 % height.
- **Tooltip:** the day, its value ("$1.20M") and the change on the previous day.
- **Live** (gallery button): every 2.2 s the last day rises a little and the total gains $600–3,200.

## 3. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | card scales up from .82 and swings from twice the resting angle to it | 1.5–1.7 s `expo.out` |
| | the rim draws itself all the way round (dash 0 → 1000) | .15 s in, 1.5 s `power2.inOut` |
| | floor light and halo fade up; title, range, pill and ⋯ slide in | .2–.55 s |
| | total spins up from "$0,000,000"; badge pops (`back.out(2)`), its arrow springs up | .62–1 s |
| | grid lines grow left → right, y labels slide in, x labels rise | .75–.95 s |
| | the line draws with a glowing head; the fill uncovers behind it; dots appear as it passes | 1 s in, 1.45 s `power2.inOut` |
| | end marker blooms (`elastic.out(1,.45)`); idle motion ramps up | 2.4–3.8 s |
| Face | pointer over the card: angle relaxes to face you, follow ±4°/±6°, rim spot follows | springs 90/16 and 110/17 |
| Scrub | probe x spring 230/24 riding the curve; guide drops to the axis; tooltip chases (150/19), leans ±12°, scales in | continuous |
| Menus | panel scales from its anchor (`back.out(1.7)`), items stagger in; chevron flips; closes after a choice | .4 s |
| Month | every value morphs (`elastic.out(1,.7)`, 1.2 s); total and percent roll; pill text slides | |
| Idle | a light runs round the rim every 4.5–7.5 s; a pulse runs along the line every 3.6–6 s and bumps the end marker; end halo every 2.4 s; floor light breathes | |

## 4. Interaction and accessibility

- The three header controls are real buttons with menus (`menuitemradio` / `menuitemcheckbox`), arrow keys move, Escape closes and returns focus, a click outside closes.
- Chart: `role="slider"`; arrows, Home, End; `aria-valuetext` reads "19 Apr: $1.20 million, up 0.7% on the day before". `touch-action: pan-y`.
- A polite live region repeats the period, total and change.
- **Reduced motion:** no tilt or follow (the card stays at rest), no intro (a .5 s fade), no idle motion, numbers change without rolling.

## 5. Performance

- The tilt, gloss, floor and tooltip move with `transform` / `opacity`; the curve is rebuilt only while the window or values tween.
- The blurred strokes are static at rest; the rim spot is a gradient whose centre moves.
- The loop stops off screen or in a hidden tab.

## 6. Porting notes

- The angle constants are `REST` and `PERSP`; drop them for a flat card inside an app screen.
- `X_FIRST`, `X_LAST`, `Y_TOP`, `PER_M` map days and dollars to the chart; the curve is a monotone cubic through the daily points.
