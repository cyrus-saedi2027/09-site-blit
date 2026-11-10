# N03 · week-large · این هفته در برابر هفته‌ی پیش، بزرگ · handoff spec

> **خلاصه برای خودت:** ویجت بزرگ «این هفته» برای نت‌ریت، از روی ویجت ۰۳ (تحلیل درآمد). کارت شیشه‌ای تیره با نور بنفش گوشه‌ها، عدد بزرگ و نازک، حباب تغییر، نمودار سطحی با خط‌چین مقایسه و نشانگر حلقه‌دار.
> - **عدد بزرگ:** میانگین بازار در این هفته‌ی کاری (`week.this_average`)، با حباب «+۰٫۸۶٪» نسبت به هفته‌ی پیش.
> - **نمودار:** خط ممتد = هر روز کاری این هفته؛ خط‌چین = همون روز در هفته‌ی پیش (مثل «مقایسه با ماه قبل» نمونه). محور روز همیشه چپ‌به‌راسته. نشانگر روی «امروز».
> - **دکمه‌ها:** «ارسال ⌄» جهت رو عوض می‌کنه (App Intent)؛ «⋯» خط‌چین هفته‌ی پیش رو روشن و خاموش می‌کنه.
> - **سطر پایین:** بهترین روز هفته و مقدارش، و سنِ عدد.
> - مثل N01 و N02: همه‌ی حالت‌ها، دو زبان، سه تم + «طرح نمونه»، تک‌رنگ iOS ۱۸، iOS و Android.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو صفحه‌ی `../index.html` ویجت N03ـه.

**Status:** first version, waiting for the owner's feedback. Layout built from the sample's card (700 × 431) re-proportioned to the large widget (364 × 382 design units); the figure is deliberately larger than the sample's (a phone widget is read at arm's length).

---

## 1. Units and anatomy

1u = 1 pt of an iPhone 393; `--u = 100cqi / 364`. The card is always an "ink" card (dark in every theme). In the "sample" theme it is the sample's indigo-black glass (`#0D0C26 → #06071A`) lit violet from its start-side corners and its base.

| Part | Position (u) | Notes |
|---|---|---|
| Title | start 20, top 18 | "This week" 22u 500; sub-line "vs last week" 13.5u (hidden when a status chip takes its place) |
| Status chip | start 20, top 46 | closed / not posted / expired / offline |
| Direction button | end 8, top 10, hit area 104 × 50 | a 36u pill: "Send ⌄" / "Receive ⌄"; cycles the direction |
| Compare button "⋯" | end of the row, 50 × 50 | three dots; dimmed when the dashed line is off (`aria-pressed`) |
| Big figure | start 20, top 80 | Vazirmatn 300, 46u, rolling digits |
| Unit | under the figure | 12.5u `--oi3` |
| Change badge | 11u below the unit, 30 tall | arrow + signed percent (14u 600) in the direction colour; "vs last week" beside it |
| Chart | x 24 → 300, y 200 → 312 (base follows the widget height) | line 2.6u, a blurred glow line under it, area fading in 3 stops, dashed last-week line 1.7u (5 / 5) |
| Axis labels | y: end side, x 350; days: under the base | 11.5u / 12u; the day axis runs left to right in both languages |
| Marker | on today | ring 6.4u, core in the direction colour; a halo ring pulses (C) |
| Foot | bottom 14 | "Best day: Sat, 91,733" and the age (amber + clock when old) |

## 2. Data (shape of `NR_DATA`)

| Shown | Field |
|---|---|
| Figure | `week.this_average` |
| Badge | `week.change_pct` |
| Line / dashed line | `week.days[].this` / `week.days[].last` (one point per working day, `weekday` 1–6) |
| Best day | `week.best_day` |
| Age, status | `market.recorded_at`, `market.status` |

Scale: values → y over both lines, never from zero, at least 1.1 % of the price level wide. The sample file's week is a smooth ramp; the preview adds the same seeded wobble as the other charts (a little stronger, six days only) so the week reads as days.

## 3. States, motion, accessibility

States, the A / B / C table, buttons and data requests are under the widget on the page. VoiceOver sentence: "This week's average, 91,396 toman per pound, up 0.86% against last week, best day Sat, 3 min ago". Colours only mean direction (violet-blue up, coral down, amber for age, never green); every direction also has an arrow and a sign. Every text box in every theme and state passes AA (`tools/netrate/aa.js`: 2240 boxes, 0 below).

## 4. Porting notes

- iOS: Swift Charts `AreaMark` + two `LineMark` (the last-week one with `StrokeStyle(dash:)`) + `PointMark` for today; the glass is a `containerBackground` of gradients.
- The dashed line's switch and the direction are two `Button(intent:)` / `actionRunCallback`s storing a value per widget instance.
- The resting 3D tilt of the card is display-only (C); on a phone the card is flat.
- Data requests: `week` for `direction=recv`, for Sundays and for the morning before rates are posted (the file only has the send week); and `null` for days that have not happened yet so the line stops at today.
