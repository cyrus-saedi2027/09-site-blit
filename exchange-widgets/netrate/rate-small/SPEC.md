# N09 · rate-small · نرخ امروز، کوچک · handoff spec

> **خلاصه برای خودت:** ویجت کوچک از روی «Progress Report» ویجت ۰۵. کارت تیره با نشانک N (جای‌خالی)، عنوان و نام صرافی، پنل رنگی بزرگ با برچسب، عدد درشت و نازک، قرص براق تغییر، «از روز کاری قبل» + سن، و دکمه‌ی گرد «+».
> - **رنگ پنل = جهت:** آبی روشن بالا، مرجانی پایین، خاکستری بدون تغییر. قرص هم همون رنگ، با فلش و علامت. گوشه‌ی روشن پنل سمت دکمه‌ست تا متن‌ها روی تیره بمونن (AA).
> - **«+»** روزهای کاری این هفته رو کپسولی نشون می‌ده (کپسول‌های هدف روزانه‌ی نمونه)؛ دوباره بزنی برمی‌گرده.
> - یک مقصد لمس: همون صرافی (`netrate://office/<id>?…`).

**Status:** first version. Sizes: 170 × 170 (iPhone 393), 158 × 158 (390), 160 × 160 dp (Android 2 × 2). 1u = 1 pt of 170 (`--u = 100cqi / 170`).
Data: `best[0]` (rate, exchange, change_pct, recorded_at), `week.days[].this`, `week.this_average / change_pct / best_day`. Data request: `week` for receive and for Sunday / morning states.
Differences, motion table (A / B / C), buttons, VoiceOver sentences: under the widget on the page.
