# ویجت ۰۲ · اندازه‌ی بازار · handoff spec

> **خلاصه برای خودت:** کارت تیره‌ی «Market Size» با نور آبی، رقم «$12B»، تغییر نسبت به فصل قبل، خط سفید تا امروز و پیش‌بینی خاکستری بعدش، از روی عکسی که فرستادی. ظاهر همونه؛ هر چی اضافه شده حرکت و تعامله.
> - **روی نمودار بکش یا بزن:** نشانگر روی منحنی فنری سُر می‌خوره و مرز سفید/خاکستری و خط‌چین هم باهاش میان. تولتیپ با تأخیر دنبالش تاب می‌خوره و برای رشد سبز، برای افت قرمز می‌شه. رقم بزرگ، درصد و جمله‌ی زیرش می‌چرخن و برچسب فصل زیر خط‌چین میاد. ول کنی، برمی‌گرده به امروز.
> - **سه‌نقطه:** به ضربدر تبدیل می‌شه و منو باز می‌شه: فصلی یا سالانه (منحنی شکلش رو عوض می‌کنه) و روشن/خاموش کردن پیش‌بینی (خط خاکستری کشیده یا جمع می‌شه).
> - **ماوس روی کارت:** لبه و شیشه‌ی کارت زیر نور ماوس روشن می‌شن، نور آبی به سمتش خم می‌شه، کارت کمی سه‌بعدی کج می‌شه.
> - **همیشه:** نور آبی آروم نفس می‌کشه و جابه‌جا می‌شه، هر چند ثانیه یه درخشش روی خط سفید تا نشانگر می‌ره، خط‌چین آروم پایین می‌ره.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` ویجت شماره‌ی ۲ـه.

**Status:** first version, waiting for the owner's feedback. Built from the owner's reference shot (a 500 × 203 dark card on a black grid background). Positions, the curve and the colours of the light were measured from the image.

---

## 1. Units and anatomy

All numbers are pixels of the reference card (**u**): the card is **500 × 203 u**, radius 21. CSS: `--u = 100cqi / 500` on the widget's container; JS: `unit = stageWidth / 500`.

| Part | Position (u) | Notes |
|---|---|---|
| Card | 500 × 203 | `#2a2a2b → #111112` top to bottom; 1u inner rim `rgba(255,255,255,.1)`, 1u black outline; `overflow: clip` |
| Light | three layers | a horizontal ramp `#74b9fe → #3446c4 → transparent` (52 %) with a navy pool at (50 %, 62 %); a cyan rim on the left edge; a royal-blue ellipse 400 × 260 centred at (185, 200) that drifts; a white top sheen (10 % → 0 at 22 %) |
| "Market Size" | x 25.8, baseline 33 | Inter 400, 17.2 u, `rgba(216,228,255,.8)` |
| Value "$12B" | x 23.65, baseline 138 | Inter 420, 87 u, tracking .044 em, no kerning. Shrinks (spring) to stay within 214 u when a decimal appears ("$11.9B") |
| Subtitle | x 26.5, baselines 169 / 182.5, box 150 u | Inter 10.85 u / 13.5 u; "-2.4% decrease" 600 white, the rest `rgba(214,226,255,.72)` |
| Kebab | dots r 2 at x 470.5, y 22 / 30.75 / 39.5 | white; 29 × 31.5 u button |
| Line | stroke 6.2 u, round caps | white `#fbfcff` up to the split, `#282829` after it |
| Area under the white part | | navy `#05061c`, transparent 170 u before the split → 92 % at the split |
| Marker | r 8.75 u, ring 3.5 u | ring `#e4582f` (drop) / `#2fca72` (rise), centre `#08090d` |
| Dashed rule | from 10.5 u under the marker to the bottom | `rgba(255,255,255,.24)`, 1.6 u, dash 5.4 / 2.6 |
| Tooltip | pill ≥ 43.5 × 22.5 u, radius 4.5, nib 7 × 3.6 u, nib tip 26 u above the marker | drop: `#2b1009` / edge `#4b2d27` / text `#ff5540`; rise: `#0d2a19` / `#22482f` / `#45df88`; Inter 600 11.2 u |
| Quarter tag | centred under the rule, 13 u above the bottom | only while scrubbing; kept inside the card |

**Font note.** The shot's "1" has a foot; Inter (the closest free face) has none and its `cv01` does not add one in the Google Fonts build. IBM Plex Sans has the foot but spaces "$12B" too loosely. With the designer's licensed face the "1" can be restored; nothing else changes.

## 2. Data

```
x      222 · 273 · 316.5 · 369 · 394.5 · 413.3 · 467 · 518      (points 0 and 7 lie outside the card)
y      lowest value → 214, highest → 92.8 (linear)
curve  monotone cubic: flat at every peak and trough, no overshoot; the two outside points are flat troughs
```

| Set | Labels | Values ($B) | Today |
|---|---|---|---|
| Quarterly (default) | Q3 ’25 … Q2 ’27 | 10.8 · 11.92 · 11.43 · 12.3 · **12.0** · 11.82 · 12.7 · 11.87 | Q3 ’26 (point 4) |
| Yearly | 2020 … 2027 | 36.2 · 40.8 · 38.9 · 44.6 · 43.1 · **47.9** · 46.8 · 51.2 | 2025 (point 5) |

- Points after today are forecast: grey line, "forecast" in the subtitle, "· est." on the tag, a dashed tooltip edge.
- **Value** = the shown point, one decimal, ".0" hidden ("$12B").
- **Change** = against the previous point: `(v − prev) / prev`, "-2.4%" / "+7.6%". The subtitle's word is "decrease", "increase" or "forecast"; its unit is "quarter" or "year".
- **Live** (gallery button): every 2.3 s the visible points take a small random step (forecast points more), morphing with `expo.out` over 1.1 s.

## 3. Motion

Springs are `k` / `c`, stepped at 120 Hz; everything follows the gallery's slow-motion switch.

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | card rises from 14 % lower, scale .94, tilted 14° back | 1.15 s `expo.out` |
| | the light switches on as a circle growing from the bottom-left corner | .12 s in, 1.6 s `expo.out` |
| | label slides in; "$12B" spins up from "$00B" (3 extra turns, left to right) | .3 s in, 1.7 s |
| | subtitle wipes in left → right while its number spins | .62 s in, .9 s |
| | kebab dots pop one by one | .5 s in, `back.out(3)` |
| | white line draws to today | .72 s in, 1.05 s `power2.inOut` |
| | dashed rule drops, marker pops with a ripple, grey forecast draws on | 1.62–1.7 s |
| | tooltip rises (`back.out(2.2)`) and rolls up to "-2.4%"; idle motion ramps up | 1.78–3.4 s |
| Scrub | split x spring 210/22 (marker, rule, white/grey split and area move together); tooltip chases it (150/19) and leans ±14° (210/13); marker bump on each new point; tone fades red ⇄ green (.45 s); numbers roll (.8–.9 s `expo.out`); the word slides; tag scales in | continuous |
| Release | back to today after 1.1–1.4 s (.65 s after the pointer leaves) | |
| Menu | ⋮ → ×: outer dots slide in, stretch (scaleX 3.6) and rotate ±45°, the middle one shrinks; panel scales from its top-right corner (`back.out(1.8)`) with items staggering in; closes after a choice | .45–.5 s |
| Quarterly ⇄ yearly | every point morphs (`elastic.out(1,.55)`, 1.3 s), the split springs to the new today, the value hops, the light dips | |
| Forecast off / on | grey line retracts from the right end (.55 s `power3.in`) / draws out (.9 s `power2.out`) | |
| Pointer light | rim highlight (150 u radial in the 1u border) and glass sheen follow the pointer; light leans ±10 u, hotspot ±34 u; tilt ±6° / ±4.5° | mouse and pen only |
| Idle | light breathes (±2.5 % scale) and drifts; a glow runs along the white line every 3.4–5.6 s and ripples the marker; marker breathes; dashes flow down 9 u/s | |

## 4. Interaction and accessibility

- Chart: `role="slider"` over the six visible points; arrows / Home / End move, Escape returns to today; `aria-valuetext` reads "Q2 ’26: $12.3 billion, +7.6% from the previous quarter". `touch-action: pan-y` keeps vertical page scrolling.
- Menu: a real menu (`menuitemradio`, `menuitemcheckbox`), arrow keys move, Escape closes and returns focus to ⋮, a click outside closes it.
- A polite live region repeats the shown point.
- **Reduced motion:** no intro (a .5 s fade), no idle motion, no tilt or pointer light, numbers change without rolling, the menu appears without motion.

## 5. Performance

- Continuous motion only on `transform` / `opacity`; the clip rectangles and the area gradient are attributes written only when the split moves.
- The path is rebuilt only while values morph; the length up to the split is cached per split position.
- The loop stops off screen or in a hidden tab and writes only changed styles.

## 6. Porting notes

- Geometry lives in `widget.js` (`VX`, `Y_MIN`, `Y_MAX`, `SETS`); the curve is d3's `curveMonotoneX` rule, so a native chart library with a monotone curve gives the same shape.
- The split is two clips of one path (left: white + area, right: grey); the marker, rule and tooltip all hang off one x.
