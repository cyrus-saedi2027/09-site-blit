# N08 · strip-4x1 · تیکر نرخ، نوار ۴×۱ اندروید · handoff spec

> **خلاصه برای خودت:** نوار باریک اندروید از ویجت ۰۴ (کارت‌های نقطه‌ای). چهار فریم آماده: میانگین بازار، بعد سه صرافی اول (به ترتیب نرخ). هر فریم: نام، تغییر، سن، عدد نقطه‌ای؛ ردیف نقطه‌های پایین (ردیف تیک نمونه) کدوم فریم بودن رو می‌گه. سه صرافی یک‌شکل‌ان؛ فقط شماره‌ی رتبه فرق می‌کنه.

**Status:** first version. Size: 336 × 72 dp (Android 4 × 1). Android only.

| Part | Notes |
|---|---|
| Frame 1 | `market.average`, `average_change_pct`, `market.recorded_at`; link `netrate://rates?…` |
| Frames 2–4 | `best[0..2]`: office name (from the `offices` table), `rate`, `change_pct`, `recorded_at`, rank numeral in a plain square; link `netrate://office/<id>?…` |
| Ticks | four dots; the lit one is a 14u pill |
| Flip | every ~4 s (`AdapterViewFlipper` with `flipInterval`); in the preview the display-only switch turns the auto-flip on, and "Next frame" steps by hand |

Needs classic `RemoteViews` (pure Glance cannot flip frames). One sentence: "Market average, 91,733 toman per pound, up 0.23%; first three rates: Aria 92,900, Pars 92,850, …; 3 min ago". No data requests.
