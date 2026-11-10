# N01 · rate-large · نرخ امروز، بزرگ · handoff spec

> **خلاصه برای خودت:** ویجت بزرگ «نرخ امروز» برای نت‌ریت، از روی ویجت ۰۱ (بودجه‌ی هفتگی). فرم، چیدمان و حال‌وهوا همونه: عدد بزرگ و نازک، حباب تغییر، دسته‌ای از اشیا گوشه‌ی بالا، خط با سرفلش و سطح نرم زیرش.
> - **عدد بزرگ:** بیشترین تومان برای هر پوند (یا کمترین، هنگام دریافت)، با اسم صرافی و «۸ دقیقه پیش».
> - **سه برگه** به‌جای اسکناس‌ها: صرافی‌های رتبه ۱ تا ۳ با نرخ و سن خودشون. هر سه یک‌اندازه و یک‌سبک‌ان.
> - **نمودار** بیشترین تومان تو ۱ هفته / ۱ ماه / ۳ ماه / ۱ سال؛ حباب روی سرفلش تغییر همون بازه‌ست.
> - **دکمه‌های واقعی:** «ارسال | دریافت» و چهار بازه (App Intent / Action، بدون باز شدن اپ). لمس هر جا اپ رو باز می‌کنه؛ روی هر برگه همون صرافی.
> - **حالت‌ها:** عادی، پیش از نرخ، یکشنبه، منقضی، آفلاین، تنظیم‌نشده و پیش‌نمایش گالری؛ فارسی و English؛ سه تم؛ رنگی و تک‌رنگ iOS ۱۸؛ iOS (۳۹۰ و ۳۹۳) و Android.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو صفحه‌ی `../index.html` ویجت N01ـه. زیر هر ویجت تو صفحه جدول «ساخت»، «حرکت‌ها (الف/ب/ج)»، «دکمه‌ها»، «داده و درخواست داده» و «تفاوت‌ها» هست؛ این فایل همون‌هاست به‌علاوه‌ی اندازه‌ها.

**Status:** first version, waiting for the owner's feedback. Layout measured against the sample (card 931 × 981 → 364 × 382 design units); everything is relative to the widget's width, so it holds at 338 wide (iPhone 390) and 336 wide (Android).

---

## 1. Units and anatomy

1u = 1 pt of an iPhone 393 (a 364-wide widget); `--u = 100cqi / 364`, so every length scales with the widget. Height is whatever the platform gives (382 / 354 / 340): the chart absorbs the difference.

| Part | Position (u) | Notes |
|---|---|---|
| Card | 364 × 382, radius 22 (iOS) / 28 (Android) | `--card` of the theme |
| Direction buttons | top 13, start 16, height 30 | two pills; the chosen one is inverse (`--sel` on `--on-sel`); hit area 50 tall |
| Trust line / status chip | top 13, end 16 | "9 offices posted" (11.5u) or a status chip |
| Label | start 18, top 54 | Vazirmatn 500 13.5u `--ink2` |
| Big figure | below the label | Vazirmatn **300**, 47u, tracking −.012em, proportional digits |
| Unit | below the figure | 11.5u `--ink3` |
| Change chip | 9u below the unit, height 30 | arrow + signed percent (14u 600) on `--chip`; the day it is about ("Today" / "Last working day") beside it |
| Office and age | 6u below the chip | name 13.5u 600, age 12u |
| Slips | end 14, top 50, 152 × 56 each, 40 apart | rotations −6.5° / −3.2° / 0°, shifts −9 / −4.5 / 0 (mirrored in RTL); 35u stub with the rank (21u 300), dashed perforation |
| Chart | plot from y 234 to height − 54 | line 3u, round joins; area `--dir` .34 → 0; four faint columns; fade-in over the first 90u |
| Arrowhead | on the last point | follows the end of the line, never flatter than 22° when the range moved |
| Change pill | above the arrowhead, 25 tall | `--dirc` fill, `--ondir` text; moves beside / below if the line would run under it |
| Range buttons | bottom 3, height 48 | four equal columns; the chosen one inverse |

## 2. Data (shape of `NR_DATA`)

| Shown | Field |
|---|---|
| Title | `query.direction` → "Most toman" (send) / "Least toman" (recv) |
| Big figure | `best[0].rate`; change chip `best[0].change_pct`; age `best[0].recorded_at` |
| Slips | `best[0..2]`: `rank`, `exchange.id`, `rate`, `recorded_at` (names and cities come from the `offices` table in the demo) |
| Trust line | `market.posted` |
| Status | `market.status` (`closed` / `not_posted`), the age tier, offline |
| Chart | `series[range].points[].best` (date-spaced), `series[range].best_change_pct` |

The widget computes nothing: it formats (digits, separators, ages), scales (value → y with a domain that is never from zero and is at least 2 % of the price level wide) and draws. Age text: just now / N min / N h (same local day) / yesterday / N d.

## 3. States

| State | What it shows |
|---|---|
| Normal | as above |
| Not posted (`not_posted`) | status chip "No rates yet"; yesterday's figures faded (figures only; labels and ages stay at full strength) with their true ages |
| Sunday (`closed`) | chip "It's Sunday"; last working day's rate, age "yesterday" (not flagged); the day word reads "Last working day" |
| Expired | chip "Expired", figures faded; age amber with a clock |
| Offline | chip "Offline", the last stored figures with their age |
| Not set up | grey shapes and "Set up the widget"; **no figure anywhere** (the real content is `visibility: hidden`) |
| Gallery preview | the same shapes with the name and one line |

Colour: blue = up, coral = down, amber = age warning (more than 90 minutes); never green, never "good / bad". Every direction is also an arrow and a sign. Tinted (iOS 18): one colour, shape only.

## 4. Motion

See the A / B / C table under the widget. In short: A static drawing; B digits roll and the chart cross-fades when a button is pressed or the widget refreshes (iOS only); C (display only) the sample's intro, float, fan, tilt, sparkles, the glint along the line and the ping.

## 5. Accessibility

- The card is a group with one sentence ("Today's rate, 92,900 toman per pound, Aria, up 0.06%, 8 min ago"), prefixed by the state when there is one.
- Buttons are real buttons with labels; hit areas are at least 44 × 44 (probed in the tests, also at the 390 scale).
- Reduced motion: no C effects, no rolls.

## 6. Tests

`tools/netrate/qa.js` (rules, 312 combinations) and `tools/netrate/aa.js` + `aa.py` (contrast of every text box, 120 combinations); both run clean.
