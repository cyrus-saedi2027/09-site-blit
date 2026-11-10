# N07 · lock-inline · نرخ تو یک خط · handoff spec

> **خلاصه برای خودت:** خط inline بالای ساعت صفحه‌ی قفل: آیکون (فلش جهت یا وضعیت) + بیشترین / کمترین تومان + واحد + سن. فقط متن و یه آیکون؛ سیستم با فونت خودش می‌کشتش، پس نقطه‌ها نیستن.

**Status:** first version. Sizes: 172 × 24 (iPhone 393), 160 × 24 (390). iOS only (`accessoryInline`).

Data: `best[0].rate`, `best[0].change_pct` (arrow only), `best[0].recorded_at`, `market.status` (the icon). One sentence: "Most toman, 92,900 toman per pound, up, 8 min ago". The figure rolls on refresh (`.contentTransition(.numericText())`). Width is tight on purpose: the longest case (Persian, "۵ ساعت پیش" with the clock) ends 4u inside the line (checked by `tools/netrate/qa.js`).
