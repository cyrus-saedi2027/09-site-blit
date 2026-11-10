# N04 · trend-medium · روند بازار، متوسط · handoff spec

> **خلاصه برای خودت:** ویجت متوسط «روند بازار» از روی کارت «Heart Rate» ویجت ۰۴ (سلامت روزانه). کارت زغالی گرم، عدد نقطه‌ای، قرص گرد کنار عدد، میله‌های عمودی (هر روز از کف تا سقف) با برچسب‌های محور و خط نقطه‌چین پایین.
> - **عدد نقطه‌ای:** میانگین بازار امروز؛ با قرص می‌شه «بیشترین تومان» (ارسال) یا «کمترین تومان» (دریافت).
> - **زیر عنوان:** فلش، درصد با علامت و «بالا رفته / پایین آمده» + «از روز کاری قبل»؛ زیر عدد: واحد و سن.
> - **میله‌ها:** یه میله برای هر روز کاری یک ماه (`series["1m"].points[].low … high`)؛ آخری کلفت‌تر.
> - **روی میله‌ها بکش** (فقط نمایش): عدد و روز همون روز، بقیه کم‌رنگ.
> - **ارقام فارسی نقطه‌ای** (`dots.js`) رو خودم کشیدم؛ نمونه فقط لاتین داشت.

**Status:** first version. Sizes: 364 × 170 (iPhone 393), 338 × 158 (390), 336 × 160 dp (Android 4 × 2).

## Units and anatomy (u = 1 pt of 364)
| Part | Position | Notes |
|---|---|---|
| Title | start 18, top 11 | 18.5u 500 |
| Change line | under the title | arrow in the direction's colour + signed % + word (14u 600); "vs last working day" 12.5u under it |
| Dot number | end 54, top 15 | 5 × 7 dots, pitch 4.4u, radius 1.85u; 6 glyphs wide (digits and the thousands mark) |
| Unit / age | under the number, end-aligned | 12.5u; age amber with a clock when old |
| Pill | end 6, top 10, hit area 50 × 54 | a 30 × 46 round pill; three bars, the lit one says what is shown (middle = average, top = most toman, bottom = least toman) |
| Bars | x 62 → 346, y 92 → base | round caps, width 3u (last 3.8u); y labels at x 18, a dotted baseline 8u under the bars, three time labels |

## Data
`market.average`, `market.average_change_pct`, `best[0].rate`, `best[0].change_pct`, `series["1m"].points[].low / high / average / best`, ages from `market.recorded_at` / `best[0].recorded_at`, status from `market.status`. No data requests.

## States, motion, accessibility
Status chip replaces the change lines; unset shows grey shapes only; every figure has its age. One sentence: "Market average, 91,733 toman per pound, up 0.23% against the last working day, 3 min ago". A / B / C table and the build table are under the widget on the page. AA checked by `tools/netrate/aa.js`.

## Porting notes
The dot number is a `Canvas` with the table in `dots.js` (Latin and Persian); on Android the app draws the same table into a bitmap. The pill is `Button(intent:)` / `actionRunCallback` storing the metric per widget instance.
