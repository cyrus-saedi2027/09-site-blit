# N02 · chart-medium · نمودار بازار، متوسط · handoff spec

> **خلاصه برای خودت:** ویجت متوسط «نمودار بازار» برای نت‌ریت، از روی ویجت ۰۲ (اندازه‌ی بازار). کارت تیره با نور کناری، عدد بزرگ و نازک، جمله‌ی دوخطی تغییر، خط سفید با نشانگر و حباب.
> - **عدد بزرگ:** میانگین بازار امروز، با «+۰٫۲۳٪ بالا رفته»، «+۲۱۰ تومان نسبت به روز کاری قبل» و «۹ صرافی نرخ زده‌اند، ۳ دقیقه پیش».
> - **نمودار:** خط سفید = بازه‌ی انتخابی، خط خاکستری = همون مدت (حدود دو سوم) قبل از بازه. «پیش‌بینی» نمونه ممنوعه؛ خاکستری یعنی گذشته. نشانگر روی «امروز» و حباب روی نشانگر تغییر کل بازه‌ست.
> - **دکمه‌ی بازه:** یه دکمه که ۱ هفته ← ۱ ماه ← ۳ ماه ← ۱ سال رو می‌چرخونه (به‌جای منوی ⋮ نمونه؛ هدف لمس ۴۸ × ۱۵۲).
> - **جهت** (ارسال / دریافت) تنظیم خود ویجته (ویرایش ویجت)، نه دکمه.
> - مثل N01: همه‌ی حالت‌ها، دو زبان، سه تم، تک‌رنگ iOS ۱۸، iOS و Android.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو صفحه‌ی `../index.html` ویجت N02ـه.

**Status:** first version, waiting for the owner's feedback. Layout measured against the sample (card 500 × 203 → 364 × 170 design units).

---

## 1. Units and anatomy

1u = 1 pt of an iPhone 393; `--u = 100cqi / 364`. The card is always an "ink" card (dark in every theme: `#1E1E22 → #0D0D0E` black, `#222226 → #0A0A0B` white, `#3B302C → #221B18` dawn), text on it uses the on-ink set.

| Part | Position (u) | Notes |
|---|---|---|
| Label (and status chip) | start 18, top 13, height 24 | "Market average" 13.5u; a status chip sits beside it |
| Big figure | start 18, top 38 | Vazirmatn 300, 45u |
| Unit | under the figure | 11.5u `--oi3` |
| Change | 8u below the unit | line 1: arrow (direction colour) + signed percent + "up / down" (13.5u 600); line 2: signed toman + "vs last working day" (11.5u) |
| Trust line | 7u below | "9 offices posted," + the age (11.2u; amber with a clock when old) |
| Chart | end side, x 196 → 344 (mirrored for RTL; time still runs left to right) | plot y 56 → 118; white line 3.2u, grey earlier period 3u; the area under the white line fades in over 44u |
| Marker | on the last point | ring 3.2u in the direction colour, dark core; a dashed rule (1.5u, 5.4 / 2.6) runs to the baseline |
| Change pill | above the marker, 24 tall | dark fill, edge and text in the direction colour; beside / below if the line would run under it |
| Range button | end side, bottom 3, 152 × 48 hit area | a 28u pill: the range (12.5u 600) and four dots showing where it is in the cycle |
| Light | start edge | a ramp hugging the edge (62 % at the very edge, 6 % behind the text), a soft pool, a top sheen; neutral silver (`--glow`), ember in the dawn theme |

## 2. Data (shape of `NR_DATA`)

| Shown | Field |
|---|---|
| Figure | `market.average`; change `average_change`, `average_change_pct` |
| Trust line | `market.posted`, `market.recorded_at` |
| Status | `market.status` (`closed` / `not_posted`), the age tier, offline |
| White line | `series[range].points[].average` |
| Grey line | the same length (about 2/3) of history before the range, taken from the next longer series (`1w` ← `1m`, `1m` ← `3m`, `3m` ← `1y`; `1y` has none) |
| Pill | `series[range].average_change_pct` |

Scale: value → y over the visible values (white and grey), never from zero, at least 1.6 % of the price level wide so a quiet week does not look like a crash.

## 3. States, motion, accessibility

States, the A / B / C motion table, the buttons and the data requests are under the widget on the page (and match N01's rules): a status chip says anything unusual, only figures fade, ages stay readable, "not set up" shows no figure. One sentence for VoiceOver: "Market average, 91,733 toman per pound, up 0.23% against the previous working day, 9 offices posted, 3 min ago". The glow is deliberately weak behind text: every text box in every theme and state passes AA (checked by `tools/netrate/aa.js`).

## 4. Porting notes

- On iOS the two lines are two `LineMark` series; the marker is a `PointMark`, the dashed rule a `RuleMark`; the pill an `.annotation`. On Android the chart is a bitmap the app draws.
- The range button is one `Button(intent:)` / `actionRunCallback` that advances the stored range of that widget instance.
- The preview's volatile-day samples (±5 %) are demo transformations; the app gets real numbers from the server.
