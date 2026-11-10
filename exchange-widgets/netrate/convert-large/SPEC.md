# N11 · convert-large · مبدل، بزرگ · handoff spec

> **خلاصه برای خودت:** از «Conversion» ویجت ۰۶. «اگر ۱٬۰۰۰ پوند بفرستی» → نتیجه نزد اولین ردیف (عدد درشت و نازک)، موج لوله‌ای نورانی با پنج نقطه‌ی یک‌شکل (نتیجه‌ی هر پنج صرافی) و خط‌چین میانگین بازار، قرص شیشه‌ای «… تومان بیشتر از میانگین بازار» با «مبلغ بعدی +»، و چهار خط پایین = چهار مبلغ.
> - **هیچ نقطه یا نور ویژه‌ای برای ردیف اول نیست** (قاعده‌ی «همه‌ی صرافی‌ها برابرن»)؛ رتبه فقط عدد زیر نقطه‌ست.
> - نور = جهت میانگین بازار.

**Status:** first version. Sizes: 364 × 382, 338 × 354, 336 × 340 dp. Dashes 50 × 48, "Next amount" 112 × 50.
Data: `convert.amounts[]` (amount, offices[], average_result, best_vs_average), `market.average_change_pct`. Data requests: `convert` for receive, other assets, Sunday / morning states.
