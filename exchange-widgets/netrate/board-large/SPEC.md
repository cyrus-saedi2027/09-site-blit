# N10 · board-large · تابلوی ارزها، بزرگ · handoff spec

> **خلاصه برای خودت:** از «Insights» ویجت ۰۶. کارت تیره با نور بالا، عنوان و قرص، برچسب وسط (ارز)، عدد درشت نازک با فلش، نمودار شش‌روزه با خط‌چین عمودی روی هر نقطه و نشانگر، یادداشت واقعی (تعداد صرافی + سن) و شش خط پایین = شش ارز.
> - **نور = جهت ارزِ همون صفحه** (مرجانی پایین، آبی بالا)، با صفحه عوض می‌شه.
> - **قرص بالا:** عدد بین «میانگین» و «بیشترین تومان».
> - پیش‌بینی نمونه («Expect your revenue to rise…») ممنوعه و نیست.

**Status:** first version. Sizes: 364 × 382, 338 × 354, 336 × 340 dp. Page dashes: six buttons, each 48 × 48 (the dash itself 34 × 3.6).
Data: `board.currencies[]` (asset, average, best, spark, posted, recorded_at). Data requests: `board` for receive and for Sunday / morning states; real six-day values (the file's `spark` is a smooth ramp, the preview gives each currency its own ups and downs and recomputes the change; today is untouched).
