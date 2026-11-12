# پوسترهای نمونه · Sample posters

لیست زیر هیرو (و هر بخش بعد از هیرو) پوستر عمودی نشون می‌ده، نه بنر افقی. هیرو همچنان بنر افقی داره.

The list under the hero (and every section after the hero) is made of **tall posters**; the hero keeps its wide banner.

## اندازه · The size to ask the organisers for

**۱۰۰۰×۱۵۰۰ (نسبت ۲ به ۳)**، و برای صفحه‌ی تیز **۲۰۰۰×۳۰۰۰**. این **تنها اندازه‌ی پوستر** تو کل سایته: کارت‌ها، صفحه‌ی اجرا، بلیت‌ها، همه کادر ۲ به ۳ دارن و پوستر همیشه کادرش رو پر می‌کنه (بدون نوار، بدون نسخه‌ی محو). پوستری با نسبت دیگه (۳:۴، ۹:۱۶ …) هم قبول می‌شه؛ برش می‌خوره و مدیر تو «ویرایش زنده» یا تو قدم «تصویرها»ی برنامه‌ی تازه جاش رو تو کادر تنظیم می‌کنه (بکش و بزرگ کن). متن مهم رو دست‌کم ۴٪ از لبه‌ها دور نگه دارید.

**1000×1500 (ratio 2 : 3)**, and **2000×3000** for sharp screens. This is **the one poster size** of the whole site: the cards, the program's page and the tickets all have a 2 : 3 frame, and a poster always fills it (no bars, no blurred copy). A poster of another shape (3:4, 9:16 …) is accepted; it is cut to the frame, and the admin places it in the frame («ویرایش زنده», or the «تصویرها» step of a new program: drag it, zoom it). Keep important words 4% from the edges. A program with no poster gets a drawn 2 : 3 poster (its name and colour).

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
