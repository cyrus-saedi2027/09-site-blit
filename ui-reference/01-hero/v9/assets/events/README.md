# بنرهای نمونه · Sample banners

این فایل‌ها تو گیت نیستن. بنرها کار برگزارکننده‌ها و هنرمندهاست و این مخزن عمومیه. نسخه‌ی خصوصی پیش‌نمایش خودش فایل‌ها رو داره.

These files are **not committed** (the banners are other people's artwork: organisers, artists, a ticketing site's logos; this repository is public). Without them version 9 still runs: when a file is missing the page draws a stand-in banner from the show's title and colour, so the layouts can still be judged.

Only banners are used here. The hero's background is always a wide banner; tall posters belong to other sections (the poster shelf) and the admin panel refuses them.

## دو بنر برای هر اجرا · Two banners for every program

هر اجرا **دو بنر** داره: **بنر دسکتاپ ۲۰۰۰×۱۰۰۰** (۲ به ۱؛ برای صفحه‌ی اصلی روی کامپیوتر؛ مهم‌ترین چیزها رو تو بخش وسط ۱۷۴۰×۱۰۰۰ بذار چون تو بعضی پنجره‌ها دو طرفش کمی بریده می‌شه؛ دو برابرش ۴۰۰۰×۲۰۰۰) و **بنر موبایل و تبلت ۱۰۸۰×۱۴۴۰** (عمودی، نسبت ۳ به ۴؛ دو برابرش ۲۱۶۰×۲۸۸۰). کادر بنر تو هر پنجره همین شکل رو داره و بنر همیشه کادرش رو پر می‌کنه؛ هیچ نوار سیاه یا محوی کنارش نیست. اگه بنر موبایل نباشه، تو موبایل بنر دسکتاپ به شکل عمودی ۳ به ۴ بریده می‌شه. اسم فایل بنر موبایل: `<slug>-mobile-1080.webp`.

Every program has **two banners**: the **desktop banner 2000×1000** (2 : 1, the top of the home page on a computer; keep what matters inside the centre 1740×1000, because a little of each side is cut in some windows; 4000×2000 for sharp screens) and the **phone-and-tablet banner 1080×1440** (upright, 3 : 4; 2160×2880). The banner's frame has that shape in every window and the banner always fills it, with no black or blurred side beside it. Without a phone banner, a phone shows the desktop banner cut to the upright 3 : 4. The phone banner's file name: `<slug>-mobile-1080.webp` (the samples' are upright 3 : 4 cuts of the desktop banners, placeholders until the real ones are sent).

## اجرا روی سیستم خودت · Running locally with the real art

Put the files here with exactly these names, in this order (the order of the rail). The size to make is **2000×1000** (2 : 1; the banner's panel is 1.74 : 1 on a 16 : 9 window and up to 2.1 : 1 in an ordinary browser window, so keep the important part in the centre 1740×1000; **4000×2000** for sharp screens). The samples here are **1672×960** (ratio 1.7417, the same shape to 0.1 %; a 16:9 banner works as well, it is stretched by 2 %), in three widths: 1672 (the source), 1024×588 and 640×368 (the rail cards). The owner's originals were 1649–1651 × 953–954 PNGs; they were resampled to these sizes (a stretch of under 1 %).

| # | Show | Files |
|---|---|---|
| 1 | دختر بودن یا پسر نبودن، مسئله این است | `dokhtar-pesar-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 2 | هانی نظریان · Sequence | `hani-nazarian-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 3 | زندگی شاید… | `zendegi-shayad-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 4 | برفاب · Mebwater | `barfab-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 5 | دو دقیقه به هشت | `do-daghighe-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 6 | امان | `aman-banner-1672.webp` · `-1024.webp` · `-640.webp` |

All WebP, quality 80–84 (`PIL`: `resize(..., LANCZOS)` then `save(..., "WEBP", quality=…, method=6)`).
