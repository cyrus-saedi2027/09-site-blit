# ویجت ۰۵ · گزارش پیشرفت · handoff spec

> **خلاصه برای خودت:** کارت تیره‌ی «Progress Report» با آیکون نارنجی و پنل رنگیِ مات، از روی عکسی که فرستادی. این عکس فقط یه طرح داشت، پس شماره‌ی ۵ همین یه کارته. ظاهر همونه؛ رنگ‌های پنل هم از روی خود عکس نمونه‌برداری شدن. هر چی اضافه شده حرکت و تعامله.
> - **پنل رنگی زنده‌ست:** رنگ‌ها آروم مثل مایع جابه‌جا می‌شن. ماوس یا انگشت که روش باشه نور زیرش جمع می‌شه و رنگ‌ها دنبال حرکتش می‌آن. هر ضربه هم یه موج تو رنگ‌ها پخش می‌کنه.
> - **دکمه‌ی +:** وقتی ماوس نزدیکش می‌شه کمی به سمتش کشیده می‌شه. بزنی، ضربدر می‌شه و هفت کپسول هدف روزانه (دوشنبه تا یکشنبه) بالا می‌آن. روی‌شون بکشی، عدد بزرگ قدم‌های همون روز رو نشون می‌ده و دکمه‌ی قرمز فرقش با همون روزِ هفته‌ی قبل رو.
> - **دکمه‌ی قرمز:** با یه چرخش بین «+7K Steps» و درصد رشد (+123%) عوض می‌شه.
> - **همیشه:** عددها می‌غلتن، کارت کمی به سمت ماوس خم می‌شه و لایه‌هاش از هم فاصله می‌گیرن، کفش تو آیکون وقتی ماوس نزدیکه راه می‌ره و نور زیر آیکون نفس می‌کشه.
>
> `set.js` و `set.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` ویجت شماره‌ی ۵ـه.

**Status:** first version, waiting for the owner's feedback. Measured on the shot (1199 × 1025 px): card and panel edges and radii, text sizes (fitted to cap heights and widths in the browser), the pill, the round button, and the panel's colours.

---

## 1. Units and anatomy

1u = 1px of the shot. The card is **448 × 427 u**, radius 40, at (76, 66) in a **600 × 560 u** stage (CSS: `--u = 100cqi / 600`). Positions are in card units unless noted.

| Part | Position (u) | Notes |
|---|---|---|
| Wall | the whole stage, radius 30 | dark tiles 343u square, lit from the top left; grooves 4u (1.8u highlight + dark) at x 301 and y 107.5 / 451.5 in stage units, as in the shot; a soft light follows the pointer |
| Card | 448 × 427, radius 40 | `#222 → #1c1c1c → #141414 → #0d0d0d` top to bottom; top rim `inset 0 1.2u 0 rgba(255,255,255,.2)`; long shadow `0 56u 110u rgba(0,0,0,.7)` |
| App icon | 32, 36.5, 58 × 58, radius 15 | `#f9b08a → #f39461 → #eb622b`; white sneaker (40u, turned 31°); orange glow under it |
| Title | x 104.2, baseline 63 | Inter 400, 24u, tracking −.032em, white |
| Subtitle | x 104.6, baseline 85.7 | Inter 400, 14u, `#bababa` |
| Panel | 12, 123.5, 425 × 291, radius 28 | the colour field (below); positions in the next rows are panel units |
| Round button | centre 378.5, 45; ⌀ 62 | dark glass `rgba(3,7,18,.52)`, rim `inset 0 0 0 1.2u rgba(122,146,214,.4)`; plus 11u, stroke 1.7 |
| "Total Steps" | x 27.2, cap top 172 | Inter 300, 17.1u, tracking .035em, white 90% |
| "12.7K" | x 21.3, cap top 203 (cap 61u) | Inter 440, 84u, tracking −.068em, `#f6f4f4` |
| Pill | right edge 19.5 from the panel's right, top 202, height 39 | padding 16.5u; `#f8171c → #df1520 → #8a1019` left to right, darker at the top, light rim; red glow; text Inter 400 17.8u |
| "Compare to Last week" | right 21, top 249.8 | Inter 400, 10.7u, white 62% |

## 2. The colour field

The panel's colours were sampled from the shot on a **34 × 24 grid** (`HEX` in `set.js`, 816 colours), after painting out the text, the pill and the round button. Each frame the grid is drawn into an 88 × 61 canvas with Catmull-Rom interpolation and scaled up to cover the panel (plus 16u on each side). The sampling point is displaced by:

- **drift:** sums of slow sines in x and y (±9–10u), always on;
- **pointer:** a gaussian (σ ≈ 78u) around the pointer that magnifies (lens .3) and carries the colours along the pointer's recent velocity (up to 38u);
- **ring:** a press sends a wave out from the point (420u/s, fading in about a second).

The drift is redrawn every other frame; anything the pointer does, every frame.

## 3. Data (sample)

| | Mon | Tue | Wed | Thu | Fri (today) | Sat | Sun |
|---|---|---|---|---|---|---|---|
| This week (K steps) | 2.1 | 3.4 | 1.8 | 2.9 | 2.5 | – | – |
| Last week | 1.2 | 0.9 | 1.4 | 1.0 | 1.2 | 1.6 | 1.1 |

Week so far: 12.7K against 5.7K last week → **+7K Steps**, **+123%**. Daily goal 3.2K (a full capsule).

## 4. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | card rises 70u, tips back from 22°, scales .92 → 1 | 1.35 s `expo.out` |
| | icon pops (from .3, −28°, `back.out(2.2)`); title and subtitle slide up | .3–.5 s |
| | the colour field fades in from black and a wave rolls out from the bottom left | .45 s |
| | "12.7K" spins up from 0.0K; pill pops (`back.out(2)`); the round button spins in from −180° | .75–1.9 s |
| Lean | up to 4° / 5° toward the pointer; the field moves 7u against it, the text 3.5u with it, the shadow 14u away | springs 90/15 |
| Round button | pulled up to 22% of the way toward a pointer within 70u; + turns 135° into × | springs 160/16 and 170/15 |
| Week | capsules rise and grow one after another (45 ms apart, springy), fills rise to the day's share of the goal; the veil darkens the top of the field | |
| Day | the picked capsule grows 6%, the others fade to half; label, number, pill and caption roll or slide to that day | |
| Pill | flips on its X axis (−90° → swap → 0, `back.out(2.4)`) with an elastic squeeze and a wave in the field | .75 s |
| Icon | the sneaker rocks heel to toe while the pointer is over the header; the glow breathes | |
| Live (gallery button) | today gains 100 steps now and then: the number, the pill and today's capsule follow | every 1.4 s |

## 5. Interaction and accessibility

- The round button has `aria-expanded` and controls the week. The week is a `role="slider"` (Tab when open): arrows step days, Home / End, Escape goes back to the total and a second Escape closes it; `aria-valuetext` reads "Wednesday: 1.8 thousand steps, up 0.4 thousand on last Wednesday".
- The pill is a toggle button (`aria-pressed`). A polite live region repeats keyboard and pill changes.
- Touch: drag across the capsules; after a tap the day stays for 1.6 s.
- **Reduced motion:** no intro (a .5 s fade), the field stays still, no lean, pull or walking shoe, numbers change at once, capsules appear at once.

## 6. Performance

- The field costs about 5,400 interpolated pixels a frame (half the frames at rest); everything else moves with `transform` / `opacity`.
- The loop stops off screen or in a hidden tab.

## 7. Porting notes

- `HEX`, `GW`, `GH` and `Field()` are the whole colour field; swap the grid to recolour the panel, or keep only the drift for a calmer card.
- `WEEK` and `GOAL` hold the data; `fmtK`, `fmtDiff` and `fmtPct` format it the way the shot does ("12.7K", "+7K Steps").
- The wall (`.w05-back`) belongs to the gallery shot, not to the widget.
