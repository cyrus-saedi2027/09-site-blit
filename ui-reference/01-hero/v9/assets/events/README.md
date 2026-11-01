# بنرهای نمونه · Sample banners

این فایل‌ها تو گیت نیستن. بنرها کار برگزارکننده‌ها و هنرمندهاست و این مخزن عمومیه. نسخه‌ی خصوصی پیش‌نمایش خودش فایل‌ها رو داره.

These files are **not committed** (the banners are other people's artwork: organisers, artists, a ticketing site's logos; this repository is public). Without them version 9 still runs: when a file is missing the page draws a stand-in banner from the show's title and colour, so the layouts can still be judged.

Only banners are used here. The hero's background is always a wide banner; tall posters belong to other sections (the poster shelf) and the admin panel refuses them.

## اجرا روی سیستم خودت · Running locally with the real art

Put the files here with exactly these names, in this order (the order of the rail). Every banner is **1672×960** (a ratio of 1.7417, the shape of the banner's panel at 1920×1080 with the default look; a 16:9 banner works as well, it is stretched by 2 %), in three widths: 1672 (the source), 1024×588 and 640×368 (the rail cards). The owner's originals were 1649–1651 × 953–954 PNGs; they were resampled to these sizes (a stretch of under 1 %).

| # | Show | Files |
|---|---|---|
| 1 | دختر بودن یا پسر نبودن، مسئله این است | `dokhtar-pesar-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 2 | هانی نظریان · Sequence | `hani-nazarian-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 3 | زندگی شاید… | `zendegi-shayad-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 4 | برفاب · Mebwater | `barfab-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 5 | دو دقیقه به هشت | `do-daghighe-banner-1672.webp` · `-1024.webp` · `-640.webp` |
| 6 | امان | `aman-banner-1672.webp` · `-1024.webp` · `-640.webp` |

All WebP, quality 80–84 (`PIL`: `resize(..., LANCZOS)` then `save(..., "WEBP", quality=…, method=6)`).
