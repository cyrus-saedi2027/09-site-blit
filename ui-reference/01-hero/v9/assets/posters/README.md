# پوسترهای نمونه · Sample posters

لیست زیر هیرو (و هر بخش بعد از هیرو) پوستر عمودی نشون می‌ده، نه بنر افقی. هیرو همچنان بنر افقی داره.

The list under the hero (and every section after the hero) is made of **tall posters**; the hero keeps its wide banner.

## اندازه · The size to ask the organisers for

**۱۰۰۰×۱۵۰۰ (نسبت ۲ به ۳)**، و برای صفحه‌ی تیز **۲۰۰۰×۳۰۰۰**. کادر پوستر تو سایت همین نسبته (`posterRatio`، پیش‌فرض ۰٫۶۶۷، تو تنظیمات قابل تغییره). پوستری با نسبت دیگه (۳:۴، ۹:۱۶، ۷:۱۰ …) هم **کامل و بدون برش** دیده می‌شه و جای خالی کنارش با نسخه‌ی محوِ خودش پر می‌شه. تا ۲٫۵٪ فرق با کادر رو چشم نمی‌بینه و پوستر کادر رو کامل پر می‌کنه. تصویر افقی به‌عنوان پوستر قبول نمی‌شه.

**1000×1500 (ratio 2 : 3)**, and **2000×3000** for sharp screens. The frame on the site has that shape (`posterRatio`, default 0.667, a setting). A poster of another shape (3:4, 9:16, 7:10 …) is shown **whole, never cut**, and what is left of the frame is filled with a soft copy of the poster; within 2.5 % of the frame's shape it fills the frame. A wide picture is not accepted as a poster.

## فایل‌ها · The files

| Name | What | In git? |
|---|---|---|
| `orig-*.webp` (6) | finished posters designed for this prototype (the names and logos on them are fictional; 720×1080) | yes |
| `real-*.webp` | the real posters the owner sent (iranejra.com): دختر بودن یا پسر نبودن، زندگی شاید…، دو دقیقه به هشت، SkyKings | **no** |
| `photo-*.webp` | the photos of the owner's sample (`blit-prototype.html`), 480×640, used as posters | **no** |

`real-*` و `photo-*` کار دیگرانن و ریپو عمومیه، پس کامیت نمی‌شن (`.gitignore`). بدون اونا صفحه برای هر پوستر که نیست یه پوستر جایگزین (از روی عنوان و رنگ اجرا) می‌کشه، پس چیدمان همچنان دیده می‌شه. پیش‌نمایش خصوصی خودش فایل‌ها رو داره.

`real-*` and `photo-*` are other people's art and this repository is public, so they are not committed (`.gitignore`). Without them the page draws a tall stand-in for every missing poster (from the show's title and colour), so the layout can still be judged. The private hosted preview has the files.

## اجرا روی سیستم خودت · Running locally with the real art

فایل‌ها رو با همین اسم‌ها اینجا بذار. اسم هر پوستر = `real-<شناسه‌ی اجرا>` برای اجراهای هیرو (`real-dokhtar-pesar`، `real-zendegi-shayad`، `real-do-daghighe`) و `photo-<اسم عکس نمونه>` برای اجراهای نمونه (`photo-pop-green` …؛ فهرست کامل تو `more.js` بخش `SAMPLE`). تو سایت واقعی پوستری که برگزارکننده آپلود می‌کنه جاشون رو می‌گیره؛ تو پنل نمونه هم تب «جایگاه» ← «پوستر این اجرا» یه پوستر دلخواه می‌ذاره.

Put the files here with these names: `real-<show id>` for the hero's shows and `photo-<sample photo>` for the sample shows. On the live site the poster an organiser uploads takes their place; in the sample's panel the «جایگاه» tab › «پوستر این اجرا» takes a poster of your own.
