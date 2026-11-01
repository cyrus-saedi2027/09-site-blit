# ویجت ۰۸ · درآمد زنده · handoff spec

> **خلاصه برای خودت:** کارت تیره‌ی «Your Rewards» با نمودار سبز و اسلایدر APR، از روی عکسی که فرستادی. این عکس هم فقط یه طرح داشت، پس شماره‌ی ۸ یه کارته (نوشته‌های «LIVE EARNINGS» و «2024» دور عکس جزو ویجت نیستن). ظاهر همونه؛ هر چی اضافه شده حرکت و تعامله.
> - **زنده:** پاداش‌ها همیشه دارن زیاد می‌شن و رقم‌های آخر عدد می‌غلتن. نمودار هم آروم جلو می‌ره. «داده‌ی زنده» هر دو رو تندتر می‌کنه.
> - **دکمه‌ی زرد APR:** بکشیش، درصد می‌غلته، «Total Rewards» و «Total Amount» عوض می‌شن و سرعت شمردن پاداش با نرخ بالا و پایین می‌ره. موقع کشیدن، خط‌چین تا جای دکمه زرد می‌شه.
> - **روی نمودار بکش:** یه نشانگر روی خط سبز سُر می‌خوره و عدد بزرگ می‌گه تا اون ساعت چقدر پاداش جمع شده بود («At 14:20:»).
> - **«24h»:** بین ۲۴ ساعت، ۷ روز، ۳۰ روز و یک سال می‌چرخه. نمودار شکل عوض می‌کنه و تقویم یه دور می‌چرخه.
>
> `set.js` و `set.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` ویجت شماره‌ی ۸ـه.

**Status:** first version, waiting for the owner's feedback. Measured on the shot (736 × 736 px): card edge and corner, text sizes and weights (fitted to the shot's widths and cap heights), the line (traced column by column), the slider, and the colours.

---

## 1. Units and anatomy

1u = 1px of the shot. The card is **434 × 434 u**, radius **80**, `#121212`, at (53, 43) in a **540 × 520 u** stage on the shot's pale grey (`--u = 100cqi / 540`). Positions are card units.

| Part | Position (u) | Notes |
|---|---|---|
| "Your Rewards:" | x 30.8, baseline 63 | Inter 400, 20u, `#a0a0a0` |
| Period chip | right 29, top 41, height 30 | calendar 17 × 19 + "24h", Inter 600 20u, `#f8e136` |
| Big number | x 29.5, cap top 86 (cap 45) | Inter 600, 62u, tracking −.012em; "$12" white, ".311" `#8c8c8c` (two rolling-digit groups) |
| Chart | the full width, y 166 → 254 | line `#57fa87` 2.6u over glows 6u (11%) and 12u (4%); fill `#57fa87` 17% → 0 from y 166 to 252; both ends fade out |
| "APR:" / value | baseline 268–270, value right 29.4 | label as above; value Inter 600 20u, tracking .012em, white |
| Track | dashes 6 × 2u every 12u from x 31 to 404 at y 283, `#707070` | lights up yellow to the knob while dragged or focused |
| Knob | centre (120.5, 283), ⌀ 17 | `#f8e136`; grows 25% while dragged |
| Range labels | baseline 307; "2.63%" at x 31, "15.32%" right 32 | Inter 400 13.5u, `#a0a0a0` |
| "Total Rewards:" / "Total Amount:" | baselines 345.5–348 and 388–390, values right 29.5–30 | as above |

## 2. Data (sample)

- APR 6.42% between 2.63% and 15.32%. The knob's scale is the shot's: 2.63 at x 31, **6.42 at x 120.5**, 15.32 at x 403 (linear between them).
- Rewards per period at 6.42%: 24h **$12.311**, 7d $86.177, 30d $369.330, 1y $1,521.320; all scale with the APR.
- Total Rewards = $1,521.32 × APR / 6.42; Total Amount = $22,000.31 + Total Rewards (= **$23,521.63** at 6.42%).
- The line is the shot's for 24h; the other periods are seeded reshapes. When you scrub, what had been earned by a moment follows the area under the line.

## 3. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | card rises 56u and tips back from 18° | 1.3 s `expo.out` |
| | labels and chip slide up; every number spins up from zero | .3–1.8 s |
| | the line and its fill wipe in from the left | 1.4 s `power2.inOut` |
| | the knob slides in from 2.63% to its place; dashes appear one by one | 1.2 s `expo.out` |
| Live | the last digits roll every .55 s (scaled by APR / 6.42, ×3 in live mode); the chart shifts one sample every 2 s (every .45 s live) | continuous |
| APR | knob on a spring (260/26); figures roll (quickly while dragging) | |
| Scrub | cross-hair on a spring (260/24), dot rides the line | |
| Period | the line morphs (1 s `expo.out`); "24h" slides out and the next slides in; the calendar spins once around its Y axis | |
| Lean | up to 3.4° / 4° toward the pointer; a faint green light follows it | springs 90/15 |

## 4. Interaction and accessibility

- The track is a `role="slider"` (APR): arrows step 0.1% (Shift: 1%), Home / End go to the ends; `aria-valuetext` reads "12.39 percent a year".
- The chart is a `role="slider"` too: arrows step an hour's width, Escape returns to the live figure.
- The chip is a button whose label names the period. A polite live region repeats keyboard changes.
- Touch: drag the knob (the track blocks page scrolling only under the finger), drag across the chart (it holds 1.4 s after a tap).
- **Reduced motion:** no intro (a .5 s fade), no ticking, flowing chart or lean; numbers change at once.

## 5. Performance

- One path rebuilt per frame for the line (monotone curve through 110 samples); everything else moves with `transform` / `opacity`.
- The loop stops off screen or in a hidden tab.

## 6. Porting notes

- `TRACE` is the shot's line; `PERIODS`, `APR`, `PRINCIPAL` and `TOTAL_REWARDS` the sample data; `aprAt` / `xAt` map the knob.
- The pale grey stage belongs to the gallery shot.
