# N06 · lock-circle · جای امروز در ماه، دایره · handoff spec

> **خلاصه برای خودت:** دایره‌ی صفحه‌ی قفل از ردیف نقطه‌های کارت «Stress» ویجت ۰۴. حلقه‌ای از ۲۸ نقطه روی کمان ۲۵۰ درجه؛ نقطه‌ها تا جای امروز روشن‌ان و نقطه‌ی بزرگ‌تر خود امروزه. وسط: فلش جهت و درصدِ جای امروز بین کف و سقف ماه (عدد نقطه‌ای). سن تو دهانه‌ی پایین.

**Status:** first version. Sizes: 76 × 76 (iPhone 393), 72 × 72 (390). iOS only (`accessoryCircular`).

Position = (today's average − month low) ÷ (month high − month low), from `series["1m"].stats` and `market.average`. Arrow from `market.average_change_pct`; status icons (clock / pause / offline) take the arrow's place; age from `market.recorded_at` (10.5u beside the number's ring, the one place a caption is this small). Dots: 28, r 1.6u lit, 0.7u unlit; today's marker ring r 5.2u. Centre number: pitch 2.1u.
No buttons; a tap opens the chart with a one-month range. One sentence: "Market average, 91,733 toman per pound, at 87 percent of the one-month range from low to high, up, 3 min ago". Data request: none (if the server sends "place in the month" itself, the widget stops computing it).
