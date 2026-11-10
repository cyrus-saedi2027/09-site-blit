# N05 · lock-rect · نرخ روی صفحه‌ی قفل، مستطیل · handoff spec

> **خلاصه برای خودت:** مستطیل صفحه‌ی قفل از روی کارت «Activity» ویجت ۰۴. بی‌کارت و تک‌رنگ (سیستم همه‌چیز رو تک‌رنگ می‌کشه): برچسب «بیشترین / کمترین تومان» با فلش و درصد، عدد نقطه‌ای، واحد، سن و جهت.

**Status:** first version. Sizes: 172 × 76 (iPhone 393), 160 × 72 (390). iOS only (`accessoryRectangular`).

| Row | Content |
|---|---|
| 1 (top 8) | label (12.5u 600) at the start, arrow + signed % at the end; a status chip (clock / pause / offline) replaces both |
| 2 | dot number, pitch 3.1, radius 1.3; the unit "toman" beside it |
| 3 | age (clock when old) at the start, direction ("Send" / "Receive") at the end |

Data: `best[0].rate`, `best[0].change_pct`, `best[0].recorded_at`, `query.direction`, `market.status`. No data requests. No buttons; a tap opens `netrate://rates?cur=gbp&type=cash&dir=send`.
One sentence: "Most toman, 92,900 toman per pound, up 0.06%, Send, 8 min ago". Colour is never used (the lock screen is one colour): direction is the arrow and the sign.
