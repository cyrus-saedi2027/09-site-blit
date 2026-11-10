# N14 · convert-medium · مبدل، متوسط · handoff spec

> **خلاصه برای خودت:** از «Live Earnings» ویجت ۰۸: کارت زغالی، برچسب خاکستری با چیپ، عدد درشتِ دم‌خاموش (سه رقم آخر کم‌رنگ مثل اعشار نمونه)، خط تمام‌عرض با سطح زیرش، سطر «جای نرخ امروز در ماه» با اسلایدر نقطه‌چین و نقطه. چیپ مبلغ رو می‌چرخونه (۵۰۰ ← ۱٬۰۰۰ ← ۲٬۰۰۰ ← ۵٬۰۰۰).
> - «زنده» نیست: عدد خودش حرکت نمی‌کنه (نرخ‌ها روزی یه‌بارن). خط سبز نمونه شد خط جهت (آبی / مرجانی).

**Status:** first version. Sizes: 364 × 170, 338 × 158, 336 × 160 dp. Chip hit area 110 × 50.
Data: `convert.amounts[]`, `series["1w"].points[].best` (the line, scaled so it ends on the figure), `series["1m"].stats`, `market`. Data requests: `convert` for receive / other assets; `convert.history` (this amount's result for the last six days) so the line needs no scaling.
