# Hero · نسخه‌ی ۹ · جایگاه ویژه، دقیقاً اندازه‌ی دسکتاپ، همه‌چیز قابل‌تنظیم · handoff spec

> **خلاصه برای خودت:** نسخه‌ی ۹ همون نسخه‌ی ۸ است (چند کادر جدای نرم‌گوشه با فاصله‌ی کم: **هدر**، **کادر کارت‌ها**، **کادر خودِ بنر**، **کادر اطلاعات**) که سه دور کار روش شده:
> 1. **دقیقاً اندازه‌ی دسکتاپ:** کادرها کل پنجره رو لبه‌به‌لبه پر می‌کنن (حاشیه‌ی برابر از چهار طرف، فاصله‌ی برابر بینشون)، روی هر دسکتاپی از ۱۲۸۰×۶۰۰ تا ۲۵۶۰×۱۴۴۰ و عریض‌تر. کادر بنر هر چی از پنجره می‌مونه رو می‌گیره (**حالت «آزاد»، همون که صاحب پروژه تأیید کرده؛ پیش‌فرضه**)، پس شکلش با ارتفاع پنجره عوض می‌شه: ۱٫۷۴ تو ۱۹۲۰×۱۰۸۰ (۱۵۵۳×۸۹۳)، ۲٫۰۷ تو ۱۹۲۰×۹۳۷، ۲٫۳ تو ۱۹۲۰×۸۶۲. بنری که تا ۲٫۵٪ با شکل کادر فرق داشته باشه کادر رو پر می‌کنه؛ دورتر از اون کامل و با سیاهی کنارش دیده می‌شه. اگه یه سایز ثابت برای همه‌ی پنجره‌ها لازم شد، **گزینه‌ی «قفل»** (تنظیمات ← چیدمان ← شکل کادر بنر، نسبت ۱٫۷۴، سایز `۱۷۴۰×۱۰۰۰`) هست؛ ساختار صفحه رو عوض می‌کنه (ستون کارت‌ها جای اضافی عرض رو می‌گیره و تو پنجره‌ی عریض کارت‌ها ردیفی می‌شن)، پس خاموشه تا خودش بخواد.
> 2. **همه‌چیز تو «تنظیمات نمونه» (دکمه‌ی گرد پایین‌چپ) قابل‌تنظیمه:** فاصله‌ی بین کادرها و تا لبه‌ها، ارتفاع‌ها، گردی گوشه‌ها، خط دور، سایه، رنگ کادرها (حتی سفید)، رنگ نوشته‌ها، فونت، اندازه‌ی هر دسته نوشته، نوشته‌های ثابت (اسم سایت، دسته‌ها، دکمه‌ها…)، آیتم‌های هدر، شدت و نوع حرکت. ۱۰ «حالت آماده» (فشرده، باز، گرد، تیز، چسبیده، سفید…) و «کپی تنظیمات» که متنش رو می‌شه برای ما فرستاد تا همون بشه پیش‌فرض. تب «اندازه‌ها»: اندازه‌ی هر کادر و خودِ بنر به پیکسل، اندازه‌ای که از برگزارکننده می‌خوایم، و یه لایه که اندازه‌ها و فاصله‌ها رو روی صفحه می‌کشه.
> 3. **حرفه‌ای‌تر:** هدر ثابته و با اسکرول یه کپسول کوچیک وسط‌چین می‌شه (با حرکت)؛ هیرو سرجاش می‌مونه و **بخش دوم** مثل ورقه از روش رد می‌شه؛ جستجوی پنجره‌ای (`/` یا Ctrl+K)، منوی شهر، لینک‌هایی که پیل زیرشون می‌لغزه، نور دنبال‌کننده‌ی موس روی کادرها، دکمه‌ی خرید آهنربایی با موج، کشیدن بنر برای عوض کردن اجرا، چهار نوع جابه‌جایی بین اجراها (محو، کشویی، زوم، پرده)، ۱۶ رنگ + رنگ دلخواه.
> 4. **دور L (تازه‌ترین):** دکمه‌ها نرم‌اند (پیش‌فرض) و لبه‌شون تو تم روشن هم دیده می‌شه؛ آهنربا یک‌سوم شد؛ لیست زیر هیرو کم‌شلوغ‌تره (کارت‌های ۴ به ۵ با فاصله، جای شهر روی کارت، همه‌ی حالت‌ها، پیش‌فروش فشرده)؛ سه طرح برای بلیت‌های خرج‌شده؛ و به‌جای هدر دوم، یا یه ویجت کنار صفحه داری یا فقط یه هدر که خودش دسته‌ی جلوی چشم رو نشون می‌ده (تنظیمات ← هدر ← «وقتی اسکرول می‌کنی»). §10.6.
>
> **موزیک کلاً حذف شد** (خواسته‌ی صاحب پروژه): نه پخش‌کننده، نه تحلیل ریتم، نه واکنش تصویر به ضرب.
>
> `index.html` همین پوشه مرجع زنده‌ست.

**Status:** v9, now at round T (the latest owner round, §10.14). History of v9:
- *Round A* (v8 liked, «make 9 a copy and more professional, with the exact desktop size»): the panels tile the window; the rail's cards fill the rail with a line of words under the picture; a mirrored edge beside a banner whose shape differs.
- *Round B* (this one): «make the blurred background black», «let me control the gaps between the panels and from the panels to the edges, to build exactly what I want», «write the banners' sizes», «all of it in the floating settings button», «let me control many things (texts, the roundness beside the panels …) so I can tell you which modes are best and make them the default», «more colours, white and black for example», «more professional, stronger interactions and motion», «remove the music completely, no music in the page and the header», «what else could the header have», «a modest second section to scroll to, in harmony», «the header should shrink, with a strong professional motion, as I scroll, stay centred and come down with the page».

- *Round C*: the owner's own settings became the defaults (gap and margins 9, header 71, facts panel 80, rail up to 480, thumbs' radius 7, 0.5 px line at 8 %, shadow 91 %, panels `#0d0d0d`, the small header 1400 wide); **six new banners** in a given order (the first one's name is the show «دختر بودن یا پسر نبودن، مسئله این است»; then «هانی نظریان»; «زندگی شاید…»; «برفاب»; «دو دقیقه به هشت»; «امان»), sized to fill the banner's panel; «when the zoom-out ends the banner must be completely visible».
- *Round D*: «the size you told me isn't the frame's size at all; tell me exactly what size to make; let me add pictures myself in the settings» — the owner views the page in claude.ai, in a window of about 1920×862, where the (then flexible) frame was 1637×711, not the 1553×893 of a 1920×1080 window. And then: «what matters is that when the site is built the sizes are right: give me a size that fills the frame with no problem». I built **a locked shape** (`frame: lock`, ratio 1.74; the rail takes the width the window has over) and made it the default — and the owner answered: «I asked you for a size, not to change the site's structure; the small frames' look changed; make it as I approved it». **So the default is the approved layout again (`frame: free`, the pixels are identical to version 7848741), and the lock is an option, off.** What stays from this round: the settings' «جایگاه» tab says the size to make (for the window it is in) and takes the owner's own pictures (in place of a banner, or as new shows).
- *Round F*: «now let's build the rest» (the list in `../../BRIEF.md`) and one note: «make the city part bigger from left and right, and put almost all the cities in it, only the counties not yet, because the names are not read whole». Built in the hero and the header, **without changing anything the owner approved** (the panels, the sizes, the motion are as they were): the **city button** is wider and the **city menu** is a wide grid of 32 cities (§9); the **status labels** (§9.1); the **sale-start countdown** (§9.1); the header's **categories** as menus that take the page to a list (§9.2). The sample keeps the dates the banners print (§13).
- *Round G*: «take more ideas from the sample I gave you; I don't much like what you made for the next sections: the layouts and arrangements (**don't change the first section any more**, it turned out good)». The hero and the header were not touched (their panels are pixel-identical to the version the owner last saw: `tools/parity2.js`; only what round F added to the header and the rail's cards changed). The section under the hero was **made again after the sample's home page**: a category bar with a sliding pill that follows the page, a section for each category (name, how many, tickets), ticket-shaped cards with a perforation, labels, the countdown, a stamp for a full show and a tag for the city, and a footer with the trust badges' slots (§10). The old head panel, the filter chips and the three numbers are gone.
- *Round H*: «I didn't much like it, especially since the organisers give **tall posters**; every place except the home page's first section must be poster-style; and put real posters, other concerts and theatre shows, from other Iranian ticket sites». The hero and the header are untouched. The list's cards are now **poster cards** (§10): a tall frame (2 : 3) with the poster whole, the words under it (or over it, as in the sample: an option), 6 across at 1920. The sample's content grew to the owner's own sample (its 26 events and their photos as posters) plus six finished posters and the real posters the owner sent (3 of the 6 real shows and SkyKings). **What could not be done:** the Iranian ticket sites do not answer from the server this was built on (every request is reset), so posters could not be fetched from them; the owner can send posters (a zip, as with the banners) or put them in from the panel (§14).
- *Round I*: «use the sample I gave you more; make the sections more separate so they are clearer; add the **white theme** to the header so I can see it, and make the theme's change very smooth and attractive; I want it stronger, I'm still not that happy; then build the **next section**». The hero's panels and motion are untouched (pixel-identical in the dark theme: `tools/parity2.js`); the header gained one button. Built: a **light (white) theme** for the whole site, turned by a sun/moon button in the header, the new colours opening as a circle from the button (§9, §12); the list redone after the sample's home page (§10, *the list in round I*): the sample's search and city on top, every category **a panel of its own** with its own colour, icon and head, two rows and «نمایش همه», the presale as wide tickets with a big flip countdown, the sample's white buy buttons, its back-to-top ring and its trust badges; and the next section, **the show's page** (§10.1): the first of the four steps of a purchase (choose the session), after the sample's event page.
- *Round J*: «continue and build the other sections, until the tokens run out» and «take the halls' plans and places from iranejra.com/maps, but make the maps much more professional». The site does not answer from the build server (the connection is reset; the fetch tool gets 503), so the plans are the TYPES of the sample's halls until the owner sends the real ones. Built: steps 2–4 of a purchase (§10.2): the hall plan engine (seven plan types with boxes, tables, standing), the live seat map, the 15-minute hold, guest checkout with an SMS code for busy shows, a discount code and VAT, a demo gateway, the tickets with QR codes; «مسیریابی» to Neshan, Balad, Google Maps, Waze. Then (§10.3): the purchase tracking, sign-in with an SMS code and «حساب من», the phone's menu, the rules / about / contact pages, the archive, the search's page, a page for each category and each city. Then (§10.4): the entry control at the doors (camera, hand scanner, offline), the organiser's panel (live sales, a six-step wizard, settlement, discount codes with a promo picture and printed cards, controllers), the admin's panel (the review queue, cancellations with refunds, orders, roles, cities, the hall designer, reports, gift codes, history) and the wallet.
- *Round K*: «add the halls package with a robust system; the site friendlier; better categories; a compact city filter». The halls library (147 halls, 150 layouts, 487 cities), one city filter for the whole site, the categories by kind, and the admin's cities / halls / shows (§9, §9.2, §10.5).
- *Round L*: «the buttons soft by default and never full round; the light theme loses the buttons' frames; the magnet at a third; the site is too crowded; the cards are not attractive (a place for the city, every state); the presale is too long and big; the posters are too tall, big and stuck together; sold tickets after my three samples; the second header is bad — build both a widget on the right edge and one header that changes itself, so I can compare». §10.6 (the plan and everything built), §11 (the new options). **The hero's panels are still pixel-identical**; only the corners of the buttons and tags inside it changed shape, as asked.
- *Round M*: «the site is still crowded; the way from a program to a ticket (the show's page, the mobile check, the seats, the rules, the ticket choice) has a bad structure and some of it is very stretched, make the rules and the nights bigger; the posters are not the size of their frames; then, after three samples, change the program frames entirely». §10.7.
- *Round N*: «the purchase page is bad again; the program card must stand still like the samples, with a buy button (a rectangle with soft corners), and the pocket in its corner is fuzzy; the banners' zoom-out ends much sooner than its seconds; the road to a ticket is still not liked, some frames are very long and stretched, remake it from the root: clearer, more compact, more professional; look for other problems». §10.8 (the framed card, the whole-time zoom, one centred column, the other problems found). **The hero's panels are pixel-identical** (only the zoom's timing changed, as asked).
- *Round O*: «the pages inside a program still have too many empty places: put a dotted background like the picture but not in order, faded here and not there, in the black-and-white theme, changing very calmly and never hurting the speed; the poster is very small, make it seen much better; remove the search for an empty seat, the buyer chooses; the phone's check must not be a separate frame: a button in the number's own box, the number goes with an animation and squares for the code come, and a verified number signs the buyer in; **the home page is perfect, do not touch it**». §10.9.
- *Round P*: «inside a program there used to be an ending, a footer, and now it is gone: give it an ending, do not just leave it; the emptiness is better but there is room to be more professional, smoother and fuller, so that even someone who does not understand sees the road to a ticket and how to choose the seats; do not keep writing «do this and that», make the road plain for the buyer». §10.10.
- *Round Q*: «the programs' pages have too much empty space: bring the booking block toward the left and put the poster on its right; the footer the whole width and the row of other programs the full width; fill the next pages too and the customer's page, nothing stretched; the header's logo goes to the start of the home page; «add to calendar» and «print tickets» made right (download as an image and a PDF, keep on the phone, share); then say how much of the client's brief is built and what remains»; and: «make the panels much more professional in spacing and UI, curved shapes and small details». §10.11.
- *Round R*: «the programs' pages are still empty at their sides, fill 75% of the emptiness; under the part where the rules are accepted and the next step is taken it is very empty: carry out a brilliant idea». §10.12.
- *Round S*: «I do not like it at all, it feels messy; make it luxurious, professional and modern; reorganise the sub-pages; the sizing right everywhere, nothing stretched; put the Google map in; responsive is broken everywhere; the panels' UI is useless: fix everything». §10.13.
- *Round T*: «one fixed size for every banner and poster, no faded sides; a designed backdrop under the poster, not its blur; the background almost invisible; white by default; fewer programs; the settings for the admin only; two banners (desktop, phone and tablet); a full review before an approval; placing a picture in its frame». §10.14.

The owner sent real shows, each with a banner with its words baked in. The sample data in `index.html` uses six **banners** (1649–1651 × 953–954 PNGs, resized by a hair to 1672×960, 1024×588, 640×368). They are other people's artwork and the repository is public, so the files are **not in git** (`assets/events/README.md`); the page draws a stand-in picture when a file is missing.

What comes from where:

| From v8 | From v7 | New in v9 |
|---|---|---|
| the panels, the solid colours, the two layouts, the facts panel, the scenes and their fades, the admin panel, the palette | the picture's zoom-out and fade; the capsule header | panels that tile the window; a banner panel that takes what is left; cards with a line of words under them; the look system (75 settings, 10 modes, copy/paste); 16 colours and light panels; a fixed header that becomes a pill; the search window; the second section and the pinned hero; the measuring layer; the preview sizes. **Removed:** the music |

Shared with earlier versions and unchanged:
- **Sizing unit:** `--u` (`../v5/SPEC.md`).
- **Rules:** Persian/RTL (`../v2/SPEC.md` §11) and performance (`../v2/SPEC.md` §10).

---

## 1. The page, from top to bottom

```
fixed ─ ╭─ header ──────────────────────────────────────────────────────╮   (a small centred pill once the page is scrolled)
        ╰─────────────────────────────────────────────────────────────────╯
.pin ─┬─ .hero (sticky, one screen tall; stays while the sheet slides over it)
      │   ╭ rail ──╮  ╭─ the banner's panel (takes all that is left) ───╮
      │   │ ˄      │  │░░░░░░ ┌──────────────────────────────┐ ░░░░░░░░ │   ░ = black (or, as an option, the banner's own edge)
      │   │ [pic]  │  │░░░░░░ │   the banner, whole, centred │ ░░░░░░░░ │
      │   │ caption│  │░░░░░░ └──────────────────────────────┘ ░░░░░░░░ │
      │   │ [pic]  │  ╰──────────────────────────────────────────────────╯
      │   │ ⏸  ˅   │  ╭─ the facts ──────────────────────────────────────╮
      │   ╰────────╯  ╰──────────────────────────────────────────────────╯
.s2 ──── the list under the hero (the category bar, a section for each category, the footer): a sheet with round top corners that slides up over the hero
.notes ─ the design notes (not part of the site)
```

Every panel is a solid rounded frame: background `--capsule` (`#120f1b`, opaque), a border, a 1px highlight on its top edge, radius `--r`, a soft shadow. The gap between any two is `--gap`. No `backdrop-filter`, no see-through. The page behind is black (`--bg`).

| Piece | What it is |
|---|---|
| **Header** (`.nav`) | outside the hero, `position: fixed`, so it stays above the second section; at the top of the page it sits exactly on the empty first row of the hero's grid (§9) |
| **Rail** (`.rail`) | a panel as tall as the banner column: up bar, the cards, the down bar and the pause button (§7) |
| **Banner** (`.frame`) | the banner's panel: all the room between the header and the facts. The banner is shown whole inside it (§5). It is a link to the show |
| **Facts** (`.dock`, layout bar) | the same solid panel, `--dock-h` tall, exactly as wide as the banner's panel |
| **The list under the hero** (`.s2`) | §10 |

---

## 2. One geometry

Every number is a variable, and the settings panel writes them (§11). `--px` is one pixel of the 1920-wide design (`--u / 19.2`), so the numbers the owner types are pixels of that design and scale with the window.

```
--u        clamp(8px, min(1vw, 1.7778svh), 26px)         --px   --u / 19.2
--edge-x   max(edgeX·px, (100vw − hero-h × 2.25) / 2)    the side margin; grows only on a window wider than 2.25 : 1
--pad-t/b  max(edgeT / edgeB · px, safe-area)            --gap  gap · px
--nav-h    max(50px, navH·px)      --dock-h  max(56px, dockH·px)      --r  max(radius·px, min(12px, radius))
--hero-h   max(440px, 100svh)      --main-h  hero-h − pad-t − pad-b − nav-h − gap
--n        min(the number of shows, 4): the rail has room for four cards; the script sets it
--rail-pad .75u   --arrow-h max(28px, 1.85u)   --card-gap .6u   --cap-h max(22px, 1.3u)   --cap-gap .35u   (0 when the captions are over the picture or off)
--cell-h   (main-h − 2·rail-pad − 2·border − 2·arrow-h − (n + 1)·card-gap) / n
--thumb-w  (cell-h − cap-h − cap-gap) × 16/9
--rail-w   clamp(11u, thumb-w + 2·rail-pad + 2·border, railMax·px)
```

- **The grid** (hero and every scene): columns `--rail-w` and `1fr` (swapped with the cards on the left), rows `--nav-h` and `1fr`, areas `"nav nav" "rail main"` or `"nav nav" "main rail"`, `gap`, and the page margins as padding. The rail and the banner column take **all** the width, so nothing is left over at the sides.
- **The banner column** (`.tk`): rows `1fr` and `--dock-h`, so the banner's panel is `main-h − dock-h − gap` tall and as wide as the column.
- **At 1920×1080 with the defaults:** margin 9 px, gap 9 px, rail 339.5 px, banner panel 1553.5×892.8 (ratio 1.74), the banner fills it.
- **The locked panel, an option** (`frame: lock`; `:root[data-frame="lock"]`, only on a window that isn't stacked): `--frame-h0 = main-h − dock-h − gap` (the height the window allows), `--lk-room = 100vw − 2·edge-min − gap` (the width for the rail and the panel), `--frame-w = min(frame-h0 × ratio, lk-room − rail-nat)` (as wide as the shape needs, never leaving the rail less than its natural width), `--rail-w = min(rail-cap, lk-room − frame-w)` (the rail takes what is left, up to `railMax`) and `--edge-x = (100vw − rail-w − gap − frame-w) / 2` (the margins take any rest, so they grow only when the rail has hit its cap). `.frame { aspect-ratio: ratio }` and `.tk { grid-template-rows: auto dock-h; align-content: center }`: on a window taller than the shape needs, the banner and the facts panel stay together in the middle of the column. `rail-nat` is the old (free) rail width, from the cards. On a 16:9 window the numbers are the free layout's to within 2 px. `geom(W, H)` in the script is this same arithmetic for any window (the sizes tab uses it; a test checks it against the page at 22 sizes).
- **In production** the hero is a size container (`container-type: size`) and the page's `100vw` / `100svh` become `100cqw` / `100cqh` of the hero; declare the variables on the hero element, not on `:root`.

---

## 3. Layout bar (a banner with its own words)

- The banner's panel, then the facts panel. Nothing is drawn over the banner (no badge, no title, no gradient).
- **The facts**, right to left in RTL; a 2px hairline in the show's ring colour runs along the panel's top edge, strongest on the start side:
  1. kicker (a dot, the type «کنسرت/تئاتر…», the badge pill) over the **title** (one line, ellipsis, full title in `title=`).
  2. a **date card**: a `3.3u` rounded square, the month in an accent band, the day big (a run shows «۲۳–۲۶»); next to it the weekday (or «۲۳ تا ۲۶ مهر» for a run) and «ساعت ۱۹:۰۰» / «هر شب ساعت ۱۹:۰۰». Persian calendar via `Intl.DateTimeFormat('fa-IR-u-ca-persian', { timeZone: 'Asia/Tehran' })` (with `-nu-latn` when the digits are English); the clock is LTR.
  3. **venue** (label «مکان»), 4. **price** (label «قیمت از», the amount, small «تومان»), 5. the **buy button** (a pill, at least 40px tall). The labels are the fixed texts the owner can change.
  - Thin 1px separators. The panel is a size container (`container: dock / inline-size`): under 800 px wide the date's second line goes, under 660 px the venue goes.

## 4. Layout text (a photo; as v7, inside its panel)

- The photo fills one panel as tall as the banner's and the facts' together, and there is no facts panel: the words sit on the photo. A photo may be cropped (`object-fit: cover`, with the focal point) because it has no words in it. The words are always white, whatever the panels' colour.
- A dark gradient on the words' side plus a light top and bottom one. The words go on the side **away from the cards**: cards on the left → words on the right.
- The words (a `34u` column): kicker, title (at most 3 lines), «venue · date», two lines of description, price + buy button.
- **What makes a good photo:** landscape, 2560×1440 (at least 1920×1080), no words in it, the subject on the cards' side.

---

## 5. The banner's panel and what is beside the banner

**By default the panel takes whatever room is left** (`frame: free`, as approved), so its shape follows the window; the rest of this section is for that. With the option `frame: lock` (`ratio: 1.74`, §2) the panel's shape never changes, so a banner of that shape fills it in every window: one size to make, **1740×1000** (3480×2000 for sharp screens).

The banner is **never cut and never covered** (unless the owner asks for «پر کردن کادر»). It is drawn with `object-fit: contain` in the panel, so:

- if the panel's shape is the banner's own to within **2.5 %** (`FILL_TOL`, the script's `is-fill`), the banner **fills the panel**: `object-fit: fill`, so nothing is cut and no bar is left; the stretch is less than 2.5 % (the six sample banners are 1.7417, the panel at 1920×1080 is 1.7404: 0.07 %), which the eye can't see. A 16:9 banner (1.7778) is 2.1 % off and fills as well;
- otherwise (a wider difference: a 16:10 window, an ultra-wide one, a banner of 3:1) the banner sits whole in the middle and the rest of the panel is **black** (`fill: black`, the default) or **the banner's own edge, mirrored and blurred** (`fill: edge`): two copies of the same picture, one on each side (class `is-h`) or one above and one below (`is-v`), flipped so the column of pixels next to the picture is the picture's own edge column, blurred with `blur(1.4u)` and darkened by 26 %. The script measures the panel (`ResizeObserver`) and writes the picture's size as `--pw` and `--ph`; the CSS places the copies from those;
- `fit: cover` fills the panel and cuts the banner (to compare);
- the picture and its extension are one layer (`.pic`), so the zoom-out moves them together.

**The page behind** is black (`bg: black`), a colour of the owner's (`bg: color`), or, as an option, the banner's own colours tiny and blurred (`bg: glow`: a 64×36 version, `blur 2.5px saturate 1.45`, made once on upload by the server).

**Why a stretch and not a crop:** cropping would cut the baked words (the samples have credits, logos and dates one or two per cent from an edge); a stretch of under 2.5 % cuts nothing; leaving margins is the v8 problem (§2).

---

## 6. Motion

| t (s) | What happens when the next show comes (the «محو» style) |
|---|---|
| 0 | The words of the current scene fade out (0.35 s, `power2.in`, up 8px, stagger 0.03). |
| 0 | The next scene is built or taken from the pool, its picture decoded (`img.decode()`), and put on top at `opacity 0`. |
| 0 → 0.38 | The old panels' content fades out (`0.32 × fade`). |
| 0.36 → 1.2 | The new panels' content fades in (starts at `0.3 × fade`, lasts `0.7 × fade`, `power2.out`). |
| 0 → 8.2 | A banner (and its extension, as one layer) zooms out inside its panel **linearly over the whole time of the show** (`dur` + the fade after it: 7 s + 1.2 s; round N: it used to run `sine.out` over 70 % of the time, so it looked finished in the first two seconds). `zoomShare` (100 % by default; 85 % and 70 % are the old ending, with its easing) is the look's choice. |
| 4.9 → 7 | **The banner stands still, whole and at its full size**, so its words can be read; the time bar goes on. (A photo with the words over it, the text layout, keeps zooming out linearly over 8.2 s, until the next fade has finished.) |
| 0.42 → | The new words fade in from 14px below (0.85 s, `power3.out`, stagger 0.07). |
| 0.4 | The accent (the colour of the buy button, the ring, the hairline) changes. |
| 7 | The next show starts. |

- **Four styles** («جابه‌جایی بین اجراها»): *fade*; *slide* (the new panel rises from below when going down the rail, from above when going up, `expo.out`); *zoom* (the old one shrinks away, the new one settles from 1.07); *wipe* (a clip opens from the start side, `expo.inOut`). Each leaves nothing behind (a test checks the opacity, the transform and the clip after each).
- **Intensity** («شدت حرکت»: آروم 0.6 / متعادل 1 / قوی 1.6) multiplies the distances, the zoom and the hover lifts. Reduced motion makes it 0 and the change a 0.4 s fade.
- **The zoom** starts small, because the banner's words are near its edges: banner 1.02 / **1.05** / 1.09, photo 1.08 / **1.15** / 1.24. A banner's zoom ends at 1 **when its time and its fade end** (round N; with `zoomShare` below 100 it ends earlier, after `dur × share` seconds, easing out); it is paused with the timer.
- **Pausing** (the timer, the time sign and the picture's motion pause together): the pointer over the rail or a drag in progress, focus inside the rail, the pause button, the settings panel open, the search window open, the hero covered by the second section, the tab hidden.
- **Quick clicking:** a scene is never reused while it is still fading, and a scene is let go once a newer one has fully faded in. After five clicks 120 ms apart and after fourteen changes in a row exactly one scene is showing, with the right words and the right active card.
- **Entrance:** the header drops in, the rail's pieces slide in one by one, the banner's panel opens from the start side (a clip, `expo.out`, 1.4 s) while the first scene fades in already zooming out, the facts panel rises, then the words.
- **Touch of the page:** a soft light follows the pointer over a panel (`.spot`, a radial wash of the text colour at 8 %); the buy button leans toward the pointer (up to 0.22 × and 0.32 × the distance, `elastic.out` back) and ripples where it is pressed; the banner can be dragged (more than 70 px sideways, or less than that and it springs back) to go to the next or the previous show; the arrow keys go to the next or previous show (← is next, as the rail); `/` and Ctrl/⌘+K open the search. Each of the light, the lean and the drag can be switched off.

---

## 7. The rail

A panel with one card per show, the up and down bars and the pause button. It is as tall as the banner column.

- **A card** is a 16:9 picture (the banner's 640 px version) with one line under it: «تئاتر برفاب» on the start side and the short day («۱۲–۱۷ آبان», «۲۵–۳۰ مهر») on the end side. The line can be under the picture, over it (on a gradient) or off; the day can be left out; it goes by itself when the picture is narrower than 190 px.
- **The cards share the height equally** (`--cell-h`), centred in their cell; the rail's width follows from the picture's (at most `railMax`).
- **A wide rail** (only with the locked shape, on a window wider than 16:9, §2; never in the default layout): the rail gets the extra width. When its inner width is at least `cell-h × 16/9 + 9.4u` (a picture as tall as the card plus room for about eight em of words), the script sets `data-rail="wide"` and each card is a row: the picture (as tall as the cell), and beside it, over up to three lines, the show (two lines at most), the days and the place. Narrower, the cards stay as they were (a picture with one line under it, centred). The rows, the four-card window and the scroll are the same in both. At 1920×937 the rail is 548 px, at 1920×862 658 px, at 1536×730 474 px; at 3440×1440 it stops at its cap (840 × 1.33 = 1120 px) and the margins grow.
- **More cards than fit:** the rail has room for four cards (`VIS`; `--n` = min(shows, 4); every row is exactly `--cell-h`, so the width the owner tuned doesn't change with the number of shows). With six shows the list scrolls inside the panel in **whole cards**: the window shows four cards, the active one second from the top (`scrollTo` on the list, `scroll-snap`, so no card is left cut at rest), and slides when the active card leaves it (smooth; the page doesn't move). The bars, the arrow keys and the timer move the show and the window follows. The wheel over the rail scrolls the list and, at its end, the page.
- **States:** the active card has a 2px ring in the show's ring colour and a glow, its words are white; the others are dimmed by `dim` % (14 by default) and come back on hover (and lift a little); focus has a ring; keys, `role="tab"`, hover pause: as v7.
- **The time left on this show** («نشونه‌ی زمان باقی‌مونده»): a 3px bar at the bottom of the active picture that grows from the right, or a line that draws itself round the picture, or nothing. It is the timer itself; only the visible sign is written each frame.
- **Side:** `.hero.rail-left` (the default) or not. With the cards on the left the pause button sits on the banner's side of the footer, so the prototype's settings button (bottom left) can float over the end of the down bar.

---

## 8. Other window shapes

- **Wide** (wider than 2.25 : 1): the composition stops growing; the side margin grows instead.
- **Short:** `--u` shrinks down to 8 px and the hero may be as short as 440 px.
- **Tall and narrow** (under 761 px wide, or taller than 4 : 5): the panels stack in one column: header, banner, facts, then the rail as a row of small cards. The banner's panel keeps the banner's own shape (`aspect-ratio`). **The hero is only as tall as its pieces here** (not the whole screen) and nothing is pinned: the page just scrolls, and the second section's rounded top shows at the bottom of the first screen.
- **4 : 3 windows** (1024×768) use the side-by-side grid. A 5 : 4 window (1280×1024) is already stacked.

---

## 9. The header

A `position: fixed` capsule outside the hero (so it stays above the second section). Its content, right to left in RTL: the logo (five bars that dance on hover) and the name; the **categories** (the three kinds and the presale list, each a link with its count; a highlight pill slides under the one the pointer is on; §9.2); a **search** button that looks like a field («جستجوی اجرا، هنرمند یا سالن…» and a `/` key); a **city** button (a fixed-width select-like button that shows any city name whole; it opens the one city picker, §9); **my tickets** and **notifications** (a dot) as icon buttons; the **login** button (the text colour as its fill, the panel's colour as its text, so it flips on light panels); a menu button on phones. Each of search, city, tickets, bell and login can be switched off; the names and the categories are fixed texts.

**The search window** (a command palette): a dialog with a field, the shows as rows (picture, title, venue and day, badge), the arrow keys and Enter, Esc to close, the focus kept inside and given back. It filters on the title, the kind, the name, the venue, the badge, the day and the description, after normalising Arabic letters, half-spaces and digits. A pick opens that show (and scrolls to the top). The show's timer stays paused while it is open.

**On scroll** the header gets **narrower** and stays centred. It has **two resting states** (wide, narrow) and a motion between them: `--hs` is a registered number (`@property --hs`) that the browser animates when the class `is-compact` is set (0.8 s `cubic-bezier(.22, 1, .36, 1)` going narrow, 0.6 s `cubic-bezier(.4, 0, .2, 1)` coming back; none under `prefers-reduced-motion`). **The scroll only starts it**: after 10 px (it stays narrow down to 3 px, so a small shake doesn't flick it), or in the very frame of the wheel's first turn when the smooth scroll has been asked to go down (the page itself starts slowly; the header doesn't wait for it). It never waits for more scroll and is never left half way (the owner: «a tiny lag, and it collapses more completely with more scroll»). A resize or a setting changes it with no motion (`is-still`). **Only its width changes** (the owner: «don't make it shorter, the buttons fall on its edge; don't round its corners either»):

```
width    grid width × hdWidth% → compact width (hdCompactW · px, at least 760px); left: so that it stays centred
SAME     top (pad-t), height (nav-h), corner radius (r), the room round its buttons (padding), the shadow's shape
shrink   the gaps between the pieces (2.2u → 1.2u) and the links' padding; the search field and the city name fold into icons;
         tickets and bell go away. The words and the small buttons FADE OUT FIRST (gone by 40 % of the way), and only then do
         their boxes narrow (from 10 %): --hq, --hw. A piece is never seen cut in half.
```

The nearest piece to the header's edge (the login button) is 10.2 px away at every step of the motion at 1920×862, and 10.6 px at 1600×900, both resting states.

A 2px line in the ring colour along the bottom edge shows how far down the page is (`--pg`). The morph, its width and the line can be switched off. The header never wraps or overflows during the morph (`overflow: hidden`, popups are separate elements).

**The theme button** (round I): a round button like the bell, between the bell and the login button; it stays in the narrow header and on a phone. It shows a **sun** in the dark theme and a **moon** in the light one (the sun's disc grows and a dark circle slides over its corner; the rays turn and shrink away; 0.8 s, `--ease`). A press changes `LOOK.mode` (dark ⇄ light, kept with the look). The change is a **View Transition**: the page as it was is captured, the page in the new theme is shown through a **circle that grows from the button** to the farthest corner (`clip-path: circle()`, 1.15 s, `cubic-bezier(.76, 0, .24, 1)`), while the old page under it sinks back a little (scale 1 → 0.965, darker going to light, brighter going to dark). While it runs, nothing else animates its colours (`.vt-mode`: every transition is 0 s, except the icon's). Options (`themeFx`): the circle (default), a soft fade, none. A browser without View Transitions cross-fades every colour that comes from the theme (`.mode-fade`, 0.8 s); with reduced motion the colours change at once.

**The header on scroll: three ways** (round L; «تنظیمات ← هدر ← وقتی اسکرول می‌کنی», `hdScroll`). The owner found the category bar that slid in under the header a second header, and asked for both a widget on the right edge and one header that changes itself, to compare:

| `hdScroll` | What the visitor sees while scrolling the list |
|---|---|
| **`dock`** (default) | The header does what it always did (narrows to a capsule). The category bar is a normal strip of the page (it scrolls away). After the hero is passed (0.9 of a screen) **a capsule appears on the page's right edge** (§10.6, *the side dock*): the categories, with a mark that slides to the one in view, the quick things and the way back to the top. No second header. |
| **`one`** | Only the header. The category bar scrolls away; the header's own category links carry **a mark in the colour of the section in view** that slides from link to link (`.ind`, positioned from `offsetLeft`/`offsetWidth`, so it follows the narrowing header: a `ResizeObserver` re-places it) and the link in view turns full-colour. |
| **`bar`** | The earlier way: the header and the sticky category bar under it (`top: pad-t + nav-h + gap`). |

The three ways change three things only: `data-hds` on the page (the stylesheet shows the mark, makes the bar sticky or hides the old back-to-top ring), `sdock.setMode` (shows or hides the dock) and `s2.probe` / `s2.go` (the reference line for «the section in view» and the scroll offset of a jump: the header's bottom edge, or the bar's when the bar is sticky). Switching ways re-arms the bar's stuck-observer.

### The city control (one filter for the whole site)

The owner found the city filter in several places and asked for it to be compact, so **there is one city filter** and one place to choose it. `geo` (`hallslib.js`) keeps the visitor's city as a **slug** (a key, never a name); it is saved in `localStorage` («blit.city») so the choice is remembered; a city the admin hides or deletes stops being the filter by itself. At first no city is chosen: «همه‌ی شهرها».

The control is the header's button (the pin, the name from the start, the chevron; as wide as «همه‌ی شهرها» needs: `ib + max(132 px of the 1920 design, 9.4em − ib/2)`; checked at fourteen window sizes by `tools/hdr-fit.js`). Where the header has none — a phone, or the button switched off in the settings — the same control is the button under the search, and the phone's menu has a row for it. All of them open **one picker** (`cityPick`, `header.js`): a search over every city of the country (the name first, then its county's and its province's name), «همه‌ی شهرها», **the cities that have shows** (with their counts), then the **31 provinces** (one open at a time) with their cities. The picker lists all the cities the admin leaves shown (487 at first), because every county stays in the filter whether or not it has halls or shows (the owner's rule); a city with no show is a normal choice and gets a helpful empty state. On a phone the picker is a bottom sheet with a backdrop, a focus trap and Esc; on a wide window a popover under the button. The keyboard: the search has the focus, Down/Up walk the list, Enter picks the first match, Esc closes.

Everything that depends on the city reads it from one place: `csOf(show)` (the show's hall's city slug) and `inCity(list)` (`status.js`). The sections and counts under the hero, the header links' counts, the category bar's counts, a category's page and the city tag on a poster (shown only while no city is chosen, and not for Tehran) all follow it. The only other sign of the filter is one line under the category bar («برنامه‌های اصفهان · ۲ برنامه» with «همه‌ی شهرها ✕»); the category, city and search pages carry the same control as one chip.

## 9.1 The status labels and the sale-start countdown

**Labels** (the brief's list): **لغو شد** (red), **به‌تعویق افتاد** (amber), **برگزار شد** (grey), **تمام شد** (grey), **تمدید شد** (green), **به‌زودی** (blue), and the show's own free text (`badge`, any words) beside them. The colour is the label's *meaning* and does not follow the show's accent. Which one a show has comes from `statusOf(show)`:

1. the owner's choice, if there is one (`status`; «خودکار» in the panel means none);
2. else **برگزار شد** when the last day's show (its start + 3 h) is past, automatically;
3. else **به‌زودی** while the sale hasn't started (`saleAt` is in the future);
4. else **تمام شد** when `seatsLeft` is 0, automatically;
5. else nothing (a normal show).

(The server will own this logic; the sample works it out in the page so every state can be looked at. «عادی» in the panel turns the automatic rules off for a show.)

**Where they are:** a chip in the facts panel's first line (before the show's own label), in the text layout's first line, in the corner of the rail card's picture, in the corner of the picture of the ticket in the list below (a full show has a stamp there), and at the end of a search row. **Nothing is ever laid over the hero banner** (it has its own words). A cancelled or past show's thumbnail loses its colour (greyscale) until it is hovered. The labels are said by screen readers in the cards' names and in the live region that announces the show.

**The buy button follows the state:** the real button (a normal or extended show), the **countdown** (the sale hasn't started), or a grey button with the reason («تمام شد»، «لغو شد»، «برگزار شد»، «به‌تعویق افتاد»; `aria-disabled`, no lean toward the pointer, no ripple). A press on a button that can't be pressed says why («فروش … شنبه ۱۲ آبان، ساعت ۱۸:۰۰ شروع می‌شه»).

**The countdown** is the button itself: two lines, «شروع فروش» and `N روز و hh:mm:ss` (days only when there are some; Persian or English digits with the look's digits setting). One clock for every place it shows (the facts panel, the text layout, the tickets in the list: there as boxes of hours, minutes and seconds). It reads `Date.now()` every second at the second's own edge (so it never drifts and a hidden tab is right when it comes back), compares the text before writing (no needless work), and the digits are tabular: the button's width does not change while it ticks (layout shift 0, measured over 5 s). For a screen reader the button's name is the start time, not the ticking digits (the digits are `aria-hidden`). **When it reaches zero** the sale opens: the show loses its label, its button becomes the real one everywhere, the presale count in the header goes down, and the toast says «فروش بلیت «…» شروع شد!». In production the server decides when the sale opens (the page must not rely on the visitor's clock for anything but the display), and the moment of opening is the high-traffic moment of the brief: the page's own work at that moment is one small update and nothing is fetched.

## 9.2 The categories

A category is a **kind**: کنسرت‌ها، تئاترها، جُنگ و کمدی, and **به‌زودی (پیش‌فروش)** for the shows whose sale hasn't started (they are also in their kind). The city is *not* a category: the older split «کنسرت‌های تهران / کنسرت‌های شهرستان‌ها» is gone, because the city is the visitor's own filter (§9). The header's four links take the list to its sections (each with the count for the chosen city; the kinds no longer have a menu), the bar under the search has five pills (همه and the four) with counts, and every section's «همه» opens **its own page**, `#/c/<kind>` or `#/c/soon` (the old `#/c/concert-tehran` still opens `concert`), with its filters: **the day** (همه‌ی روزها، امروز، ۷ روز آینده، ۳۰ روز آینده: a show is in when any of its days falls in the window), **only what can be bought**, **the order** (نزدیک‌ترین، ارزان‌ترین، گران‌ترین), the city (the same control as everywhere) and a count with the days it covers. An empty result says why and offers «برداشتن فیلترها» and «همه‌ی شهرها». A new category with its own label is still made in the admin's «دسته‌ها و تنظیمات».

---

## 10. The second section and the pinned hero

**The stack.** `.pin` is as tall as the hero plus one more screen; the hero inside it is `position: sticky; top: 0`; `.s2` has `margin-top: −one screen`, so it starts right under the hero and slides up over it while the hero stays. As `p` (0 → 1) goes from the top to one screen of scroll the hero shrinks to 94 % and moves up 1.6 %, its corners round to 26 px and a black veil rises to 82 %; at 98.5 % the hero is covered and its timer pauses. `story: off` makes the hero scroll away like any section. Not used on stacked layouts.

**Smooth scrolling** (`scroll: smooth`, `scrollSoft: 55`; `native` gives the browser's own). The wheel moves a *target*; the page follows it through **four lags in a row**, each closing its gap with a time constant of `scrollSoft` ms (worked out in 1/240 s steps, so the move is the same at any frame rate). One 300 px turn of the wheel starts slowly (1 % of the way after 50 ms), builds its speed to a peak at about 150 ms (30 % of the way), arrives (80 % at 350 ms) and settles softly (99.5 % at 700 ms): a bell-shaped speed, like a speed ramp in a video editor (slow, peak, slow). More turns add to the target and the move goes on without a jerk; the end of the page stops it. The browser keeps: the keyboard, the scroll bar, links, touch, Ctrl/Shift/Alt+wheel, and an element under the pointer that can still scroll itself (the rail's list, the settings, the search list). Off with `prefers-reduced-motion`. Each frame it also calls the header's and the hero's update, so they move in the very frame the page does (a scroll event would come one frame later). «نرمی اسکرول» (30–140 ms) makes the start and the end longer or shorter.

**The list under the hero** (round G; laid out after the owner's own sample, the home page of `blit-prototype.html`, because the first version of this section — a head panel, a filter and three cards — was «not liked: the layouts and arrangements»). It is made of the hero's own material (the same panels, gap, margins, radii, text sizes and colours, so every setting changes it too), in four parts:

1. **The category bar** (`#catnav`, a panel): «همه‌ی برنامه‌ها» and the four lists (§9.2), each a pill with an icon (grid, clock, music note, mask, smile); a **pill slides** (`transform` and `width`, `expo.out`) to the one in view. **Round L: it is `position: sticky` under the header (`top: pad-t + nav-h + gap`) only in the `bar` way of §9; by default it is an ordinary strip that scrolls away** (the owner called it a second header), and the categories ride on the side dock or on the header's mark (§9, §10.6). In the `bar` way a shadow appears while it is stuck (an `IntersectionObserver` on the bar with a one-pixel root margin, re-armed when the way changes). On a narrow window the bar scrolls sideways and keeps the pill in view. A list with no show keeps its pill, dimmed; pressing it says «فعلاً اجرایی تو «…» نیست.» and leaves the page where it is.
2. **A section for each category that has a show**, in this order: «به‌زودی (پیش‌فروش)»، کنسرت‌ها، تئاترها، جُنگ و کمدی. Each has its name (a dot in the show's colour), «N برنامه», and a grid of cards (round G had 4 columns; the columns now are in item 3 and §10.6), sorted by day (the presale list by the sale's start). A show whose sale hasn't started is in its list and also in the presale list, as in the sample. The section whose title has passed the bar is the one in view (`scroll` → one `requestAnimationFrame` → the sections' rectangles), and it marks the pill and the header's link.
3. **The poster card** (`.tkt`; the organisers give tall posters, so this is the card for the whole list and for every section after the hero; **redone in round L, with its states: §10.6**): the poster **whole** in a frame of its shape (`--pr`, width ÷ height, default **4 : 5** since round L: it was 2 : 3 in round H, and 0.667 is still a choice). When the poster's shape is the frame's (to 2.5 %, `FILL_TOL`) it fills the frame; any other shape (3:4, 9:16, 7:10, even a wide banner) is shown whole, `object-fit: contain`, and the rest of the frame is a **soft copy of the same picture**. Then the **perforation** (a dashed line) with a **notch** at each side (a `mask`, so the notch really is a hole; the drop-shadow on hover follows it), and under it, on the panel's own colour, the kind and the days, the name, **the city and the hall**, and the price with the buy button — or the **countdown boxes**, or a line saying why it can't be bought. A show that has **no poster yet** shows its banner whole in the frame (3 of the 6 real shows, until their organisers send posters); a poster that is not there is drawn by the page (a stand-in from the title and the colour: 32 of the 43 cards in the repository, which does not carry the real files). **The words** are under the poster by default (so nothing printed on a poster is covered); the look has «روی پوستر» (`posterInfo: over`), as in the owner's sample, where the words sit on the poster's lower part. The columns (round L): 7 from 2200 px, 6 from 1300, 5 from 1100, 4 from 860, 3 from 600, 2 under that (round H had 6 from 1500). Hover lifts the card, zooms the poster (4 %) and brightens the perforation; the poster and the name open the show's page; the button opens it at the sessions.
4. **The presale** (round I made it three wide tickets with a big flip clock; **round L made it a row of small tickets**, `presale: compact`, the default; `cards` makes it like the others: §10.6).
5. **The poster cards** as in round H, plus: the buy button is **white**, as in the sample (`buyStyle: accent` gives each show's own colour); a **sheen** crosses the poster once when the pointer arrives (as the sample's «glare»); every countdown's numbers turn over; a poster, its name and its buy button open **the show's page** (the buy button opens it at the sessions).
6. **Back to the top** (bottom right, as in the sample): a round button with a ring that fills as the page goes down; it shows once the hero is passed.
7. **The footer**: a line of the three kinds' colours on its top edge, a «تماس با ما» link, and the two trust badges' places as **cards with an icon** (as in the sample: «نماد اعتماد الکترونیکی»، «نشان ساماندهی»).

---

## 10.1 The show's page (the next section)

> **Round M made this page over (§10.7):** a slim top row, a short cover, the information in two tabs, the prices as one panel, one big buy panel (the rules, the nights as cards, how many, «the best seats» or the map). The list below is round I's and is kept for what did not change (the in-and-out motion, the map's block, the facts). **Round O** took «the best seats» and the stepper away, put the facts into the cover beside a big poster, the prices under the booking card, and the place with its map under the words on a big window (§10.9).
>
> **Round N (§10.8) put the cover in the main column beside the booking card, in one centred column of 1180 px, and made the rules one short line.**

The first of the four steps of a purchase (**choose the session** → the seats → book and pay → the ticket), after the sample's event page (`#/e/{slug}`), on our panels. Its address is **`#/e/<show>`** (a shared link opens it; the browser's back button closes it). The home page steps aside (`.is-page`: the hero and the list are hidden, not destroyed) and comes back **where it was** (the scroll is kept); «همه‌ی برنامه‌ها» goes back through every show opened since the list (the history stays honest). The hero's timer stops while the page is open.

**In and out.** A poster that is pressed **flies** into the page's poster (a View Transition with `view-transition-name: poster`, 0.72 s) while the rest fades out and the page rises in (0.42 s / 0.62 s); closing flies it back into its card when the card is on the screen. The page's panels rise one after another (26 px, 0.75 s, a stagger of 45 ms), the title's words rise one by one (50 ms apart), the steps' bar slides under step 1. Without View Transitions or with reduced motion: no flight, the panels just appear.

From top to bottom:

1. **A path**: «← همه‌ی برنامه‌ها / کنسرت‌ها / name» (the kind takes the list to its section).
2. **The steps** (a panel): four steps with their numbers, the current one dark-on-light with a bar in the section's colour under it.
3. **The cover** (a panel, 300–470 px tall): the show's **banner** behind (drifting slowly, 24 s), or, when the show has no banner, its **poster softened** (blur 34 px), darkened toward the words; a few **motes** float up in its light (the sample's «motes»); the **poster** stands on it (13.2u wide, tilted a little in 3D, straightens on hover); the kind (an icon and «کنسرت»), the status label and the show's own label; the **title** (26–45 px, weight 900, its words rise); the hall, the city and the days. At its corner: **نشان کردن** (a heart) and **هم‌رسانی** (the system's share sheet, or the address copied).
4. Two columns on a wide window (on a phone, and under 1100 px, one; the sessions come right after the facts):
   - **The facts** (a panel): the days, the hour and how long (concert 120, theatre 90, comedy 100 minutes), the hall and its **address** (both are the hall's own, from the library by the hall's id; the hall's name is a link to its page), each with an icon tile in the section's colour.
   - **The location** (a panel, **only when the hall has a position**): **Google Maps itself, in a frame, at the hall's exact point, and nothing else** (round O, at the owner's word: it was a map of OpenStreetMap tiles with the pin, zoom, the name and address, and Neshan / Balad / Google Maps / Waze links; all of that is gone, §10.9). A hall without a position has **no such panel and no words about it**, on this page or anywhere (the owner's rule).
   - **About** (a panel): the show's people as **gradient tags** (as in the sample: «نویسنده فرهاد تقدعلی»، «کارگردان شیوا علیخانیان» …, from the six real shows' banners), a line in red when the show has one, and its text.
   - **The price plan** (a panel, «طرح بها + ۱۰٪ مالیات بر ارزش افزوده»): each run of rows of each zone (همکف، بالکن …, by the hall's size) with **the colour of its tier** (A violet, B pink, C orange, D sky, as in the sample), its price in toman and a bar that shows how dear it is. The cheapest tier is the show's «قیمت از»; the others are steps above it (×1.25, ×1.6, ×2.2, rounded to 10,000) until the organiser's real prices come from the admin panel.
   - **The sessions** (a panel that **follows the page** on a wide window): «انتخاب سانس» and how many; for a presale show, the sale's start and the big flip countdown; **the rules to accept** («اینجانب قوانین خرید را خوانده‌ام و همه‌ی شرایط را می‌پذیرم»; the link opens the rules in a window with «خوندم و می‌پذیرم»); then each session as a **small ticket**: a dark stub with the weekday, the day and the hour, a perforation with notches, its state (موجود است · رو به اتمام · تکمیل ظرفیت · به‌زودی) and a bar of the seats left, and «خرید بلیت». Until the rules are accepted, «خرید بلیت» is dim and a press **shakes** the rules' box and says so; once accepted, a session is chosen (a ring in the section's colour) and step 2 (the seats) is the next section to build. A line at the end: «از ۹۸۰ هزار تومان · قیمت‌ها بدون ۱۰٪ مالیات…».
5. **More of the same kind** (a panel): up to six poster cards (same city first); each opens its own page.
6. **The footer** (the same as the list's).

On a phone a **bar at the bottom** says the lowest price and «انتخاب سانس» (it takes you to the sessions, which flash in the section's colour). The sessions' seats and the map are made from the show's id, so they are the same on every visit; the real ones come from the hall's seat map and the sale.

---

## 10.2 Steps 2–4: the seats, the booking and payment, the tickets

> **Round M compacted all three (§10.7):** one slim top row, one panel for the show / the night / the prices on the seats' page, a narrow centred checkout whose SMS check remembers a verified number, and a «continue your purchase» pill. The seat map itself did not change.
>
> **Round N (§10.8) made the seats' page one bar on top (the way back, the show, the night, the steps), put the price chips beside the tabs, and made the seats shrink to fit a row (a column of 1440–1650 px).**

After the owner's sample (its seat page, payment and ticket) and the brief (§2.3 the hall designer, a live seat map, a
15-minute hold; guest checkout by mobile; an SMS code for busy shows; 10 % VAT; a discount code; the ticket with its QR).
The addresses: `#/e/<show>/s/<session>` (the seats), `…/pay` (the booking), `#/ticket/<code>` (the tickets). Everything is
simulated until the real gateway and SMS panel are connected (brief §2.5); orders are kept in this browser
(`localStorage` «blit.orders», the seats bought «blit.taken», the hold `sessionStorage` «blit.hold»).

**The halls' plans** (`hall.js`: `hallLayout`, `hallLayoutGrid`; the plans themselves come from `hallslib.js`, §10.5). A plan is a stage and its sections. A real hall's section is the table of its cells: seats, aisles, row labels, blocks, texts (`k: 'grid'`; the seat's key is its own number in the package; seat 1 is where the package puts it); the designer's plans (what the admin draws) are `fan` (rows on arcs round the stage), `rect`, `boxes`, `tables` and `stand`, as before. A section whose seat numbers are only a count (`sym`: a stand, a balcony sold by number) is sold by quantity, like a standing area. The seats outside the capacity are drawn but not for sale.

**The seats** (step 2): the show and the session (another session from a menu), the price chips (a tier's colour and
price; a chip dims the other prices), the map and «صندلی‌های تو». (Round P: on a wide window the filter is the prices' legend under the cart, and the first-time bar of orders is a ringed seat with a small finger; §10.10.)
- **The map (round J, rebuilt for speed and big seats; `seatmap.js`).** No zoom is ever needed to pick a seat. On top:
  the **overview** (a small drawing of the whole hall on a `<canvas>`: the stage, every seat as a dot in its tier's colour,
  the standing areas; the section on show is framed and bright, the others dim) (round O: the **«بهترین صندلی‌ها» box that stood beside it is gone**, the buyer chooses; the overview is on a top row with the show's poster and the guide of the colours, §10.9). Under them the tabs (one per section, each with its free seats) and **one section, big**:
  its rows in the hall's own shape (a fan's rows curve round the stage, the ends a little nearer it; straight rows stay straight), each seat a button of 28–34 px (34 px on a touch screen, the
  size a finger needs) with its number, the aisles as gaps where the plan has them, the row's number at both ends (it stays
  in view when a wide section scrolls sideways), «صحنه» above. Boxes and tables are cards (a box's four seats, a table's six
  chairs round it), a standing area is a card with − +. A press on the overview (or a tab) changes the section; the overview's
  tip names the section under the pointer. «پیدا کن» takes the best run of free seats side by side in one block (nearest the
  stage and the middle), picks them, opens their section and makes them glow (a toast names them).
- **The overview is also the navigator:** when a section is bigger than its panel (a phone, a wide parterre), a frame on
  the overview shows the part of it in view and follows the panel's scroll; a tap inside the section on show takes the panel
  there (the seat under the finger glows), a sideways drag follows the finger (an up-and-down swipe still scrolls the page).
- **The map reads only the plan** (`hallLayout(plan)`: sections, rows, blocks, seats with x/y), so the library's plans, the designer's and the admin's copies all draw with the same code.
- **Fast:** one section is in the page at a time (the parterre of a big hall is 488 buttons, not 1,500); a press repaints
  one seat; the live updates repaint the seats they touch; nothing is measured while the pointer moves. CPU ×4 (a slow
  phone): opening the map 250 ms longest task (was 2.4 s), moving the pointer over it 5–34 ms of blocking in all (was
  7.9 s), a pick 0 long tasks, a change of section about 150 ms (was 400 ms).
- Keys: the arrows go from seat to seat (along the row; up and down to the nearest one), Enter or Space picks.
- A seat: free (its tier's colour, its number), yours (solid), held by someone paying (amber stripes), sold, not for sale.
  The map is **live**: every 2.6–5.2 s a free seat is held by another buyer, a held one is bought or let go (a small
  pulse), «زنده · N نفر همین الان دارن صندلی انتخاب می‌کنن»; your own seats are never touched. A press on a seat that
  can't be had says why.
- Up to 10 seats; their list (zone, row, seat, price; × to drop), the sum without VAT, «ادامه و رزرو صندلی‌ها». Standing
  places are added by a press on the area and counted with − +. On a phone a bar at the bottom says how many and the sum.

**The booking** (step 3): the seats are **held for 15 minutes** (a ring and «صندلی‌هات تا ۱۴:۵۸ دیگه برات نگه داشته
می‌شن»); when the time is up a window says so and the seats are let go. The buyer: the mobile number only (no sign-up;
«بلیت همین‌جا نشونت داده می‌شه و پیامک هم می‌شه»), a name for the ticket (optional); a busy show (a best seller, a
presale) asks for a **5-digit SMS code** (five boxes, the cursor moves on, a paste fills them; a resend timer of 90 s; the
demo code is ۱۲۳۴۵). The way to pay: the bank gateway (Shaparak) or the wallet (balance 0, off). The invoice: the seats,
a discount code (demo: BLIT10 = 10 %, HEDIYE = 50,000 toman), the sum, the discount, **VAT 10 %**, the total; «پرداخت …
تومان» opens a **demo gateway** (card, CVV2, expiry, the dynamic password; any numbers), then the tickets.

**The tickets** (step 4): a check that draws itself and a burst of the three kinds' colours, «پرداخت موفق بود؛ بلیت‌هات
آماده‌ست», where they were sent by SMS (the number masked), the **tracking code** (copy), «افزودن به تقویم» (an .ics file),
«چاپ یا ذخیره‌ی PDF», «پیگیری خرید»; then one **ticket per seat** (round L: look A of §10.6; the text below is round J's): the poster, the show, the day, the hour, the seat, the
hall and its address, a perforation, a real **QR code** (qrcode-generator, MIT, from cdnjs: `BLIT|code|seat`) and the
price; and the notes for the night (an hour early, one scan per code). The seats bought are sold when the session is opened
again.

**Checked everywhere (round J):** every page (41 addresses: the list, a show, its seats, the fixed pages, archive, search,
categories, cities, tracking, the account, the wallet, the halls, the gate, every desk tab, the waiting room, an unknown
address), the buying flow (seats → payment → the bank's page → the tickets → tracking → the account), every step of the
wizard and the gate's answers, in both themes at 1920, 1366 and 390 px wide (*round L's correction: those «light» runs never saw the light theme, see §10.6*): no script error, no sideways scroll, nothing
cut by the window or by its box, no text spilling out, no broken picture, no label too long for its button, no press
smaller than 24 px on the phone, and every link inside the site opens a page (`tools/qa-crawl.js`, `qa-flow.js`). An accessibility check (axe-core, WCAG 2.1 A and AA) of 21 pages in both themes, on a desktop and a phone, finds nothing (*the same correction applies to its light runs*): links in the pages' panels are a tint of their colour with 4.5 : 1 contrast, the charts' bars and the sessions' capacity meters are images with a name. A strip
that scrolls sideways (the desks' tabs, the wizard's steps, the categories on a phone) fades at the edge with more to show.

**Checked everywhere (round K):** the same crawl over some fifty addresses (adds the halls' library, a hall's page with and without a position, a city's page, the admin's cities, halls, one hall and a new hall, the admin's new show) finds nothing, and the 355 links inside the site all open the page they name. Along the way it caught, and these are fixed: a ticket's button cut in the narrow column of a hall's page; on a phone the city page (the long label of «my city») and the admin's zones table (a select with a 190 px minimum) made the page wider than the window, which makes the phone's browser abort the page transition («Viewport size changed»), so all the transitions' promises are now caught (`page.vt`, `modeFx`); the counts in the admin's cities table (halls, shows) were 4 px wide to press. Accessibility (axe, WCAG 2.1 A and AA, 21 pages in both themes, desktop and phone) finds nothing, keyboard focus shows on every stop (the admin's selects got a ring), and the layout shift is 0.000 on the first load and under 0.01 when a page opens. The halls' page has 31 panels, so only the first twelve rise one after another (the rest are below the fold), which also keeps a checker from reading a half-faded colour.

**Speed at CPU ×4** (`tools/perf-halls.js`, the library's heaviest places; a section of 2,025 seats is the biggest in the 150 layouts): the city picker opens in one task of 88 ms, the halls' library in 193 ms, the biggest hall's page in 83 ms, its seat map (2,025 seats drawn) in under 400 ms (before: 484 ms; the seat labels asked `toLocaleString` for each seat's price 2,025 times, so `money()` now makes each amount once), a press on a seat in 4 ms of script, the admin's halls list in 122 ms and a hall's editor in 78 ms. What stays slow is only the browser's own layout of a big section (about 200 ms at ×4, 50 ms at full speed); `content-visibility`, `contain` and flex seats were tried and gain nothing.

**A plan as a table of rows** (`planFromText`, and back `planToText`, in `admin.js`): the way a real hall's chart is typed in,
by the admin or by us when the owner sends the plans. One line per row, the rows nearest the stage first:

```
صحنه: قوسی                     the stage: قوسی, صاف or پهن (if not written: قوسی)
پارتر: نیم‌دایره                a section: its name, «:», its shape (نیم‌دایره or مستطیل); «فاصله ۱۱۰» = its distance from the
۸ ۱۴ ۸ A                       section before (a row is ۲۸); then its rows: the seats of each block, an aisle between two
۹ ۱۵ ۹                         numbers; a letter at the end (A, B, C, D, V) is the price of that row and of the rows after it
لژ راست: ۶ × ۴                 boxes on a wall (how many × seats; «راست» or «چپ»)
میزها: ۱۲ × ۶                  round tables (how many × chairs)
ایستاده: ۸۰۰                   a standing area (how many people)
```

Digits Persian or Latin; «#» starts a note; a mistake is named by its line («خط ۳: …»). Where no price is written, the first
seated section is cut in three (A, B, C from the stage) and the others are D. Every plan of the library written this way and
read back keeps its seats (`tools/plantxt-test.js`). The seat map reads the result like any other plan.

## 10.3 The other pages: tracking, sign-in, the phone's menu, the fixed pages, archive, search, a category, a city

All in `pages.js` (inside `index.html`), all pages of the same router (§10.1) and the same look (a head with the page's
icon and colour, panels, the footer under them):
- **«بلیت‌های من» / «پیگیری خرید»** (`#/receipts`): by the tracking code (BL-XXXX-XXXX, Persian or Latin digits, any case)
  it opens that order's tickets; by the mobile and an SMS code (the same five boxes as step 3) it lists every order of that
  number (the poster, the show, the day, how many seats, the sum, «گذشته» for a past night) and signs the buyer in.
- **Sign-in** (the header's «ورود / ثبت‌نام»): a window with the mobile and the SMS code, no password and no sign-up form
  (brief: «ثبت‌نام اجباری نیست»); a short or wrong number is refused with why. Signed in, the button says «حساب من» and
  opens a small menu: my tickets, the theme, sign out. The order's mobile in step 3 is filled from it.
- **The phone's menu** (the header's ☰, only on a phone): a sheet from the right with the categories (each with its
  count), the pages, sign-in and the theme. A link closes it.
- **The fixed pages:** `#/p/rules` (the rules of buying: the hold, refunds when a show is cancelled or postponed, one
  scan per code, …), `#/p/about` (what blit is, four numbers), `#/p/contact` (six questions and answers that open, a form
  with a subject, a message and an optional order code; it says it was sent). The footer's links go to them.
- **The map of every page** (`#/p/map`, «نقشه‌ی سایت» in the footer): every page for the buyer and for the partners, each with a line on what it does, so the whole prototype can be walked. «شروع تور» on it starts **a guided walk** (`tour.js`): twelve stops from the home page to the admin's reports, each opening its page with a small card at the bottom (what to look at there; «قبلی», «بعدی», Esc). Nothing is added to the home page.
- **The archive** (`#/archive`): the shows that took place, poster cards, newest first.
- **Search** (`#/search/<words>`): Enter in the list's search (when no row was picked with the arrows) opens this page:
  every show whose name, artist, hall or city has the words, grouped by category, «چیزی پیدا نشد» with suggestions.
- **A category** (`#/c/<kind>` or `#/c/soon`): all its shows, with the filters of §9.2.
- **A city** (`#/city/<slug>`; an old `#/city/<name>` still opens it when the name is one city): the city's shows, its halls (cards with their small plans), and a button that makes it the visitor's city. A city that doesn't exist says so.
- **Search** also finds **cities and halls** (the search box under the list, the header's palette and the results page): each opens its own page.

In the real site these are ordinary pages with their own addresses (server-rendered for search engines); the SMS code and
the orders come from the server (brief §2.5).

## 10.4 The desks: the entry control, the organiser's panel, the admin's panel, the wallet

Brief §2.4. All simulated in this browser (localStorage), all on the site's panels and both themes; the footer's line
«همکاران» and the phone's menu open them.

**The entry control** (`gate.js`, `#/gate` → `#/gate/<session>`): the session, the door (درِ ۱ اصلی، درِ ۲ بالکن و سکوها،
درِ ۳ لژ و میزها) and the controller's 4-digit code (the organiser gives it; demo ۱۲۳۴). The session's list of tickets is
downloaded first (the seats the seat map shows sold, in orders of one to four, and the ones bought in this browser), so the
door works offline. A ticket is read by the **camera** (`getUserMedia`, BarcodeDetector where the browser has it, jsQR 1.4.0
from jsDelivr otherwise; a QR left in front of the camera is read once), a **hand scanner** (it types and ends with Enter),
or the code typed in (a tracking code with several tickets lists them: one by one or all in). The answer fills the camera's
frame, with a sound and a buzz: green «ورود مجاز» (the seat; «۲ از ۴ بلیت این خرید»; amber when another door is nearer),
red «قبلاً وارد شده» (when and at which door), amber «مال این سانس نیست» (which session it is for), red «بلیت نامعتبر».
The ticket's QR is now `BLIT2|code|session|seat|signature` (a demo signature: a forged or edited QR is refused without the
server). Live: the share in (a ring), each door's count, the last hour by 5 minutes, the problems, the last scans; the
other doors are simulated. Offline (the browser's own state, or the button): the scans wait in a queue; back online they
are sent, what the other doors did comes in, and a ticket let in at two doors meanwhile is reported. «پایان شیفت» sums the
shift.

**The organiser** (`desk.js`, `wizard.js`, `codes.js`, `#/org/<tab>`): a side bar (pills on a phone).
- پیشخوان: four stat tiles (today's sales against yesterday up to the same hour, tickets, 30 days, the sessions'
  occupancy), the last two hours of sales by 5 minutes (columns with a readout and a table), the last purchases (live),
  the sessions ahead (sold of capacity), the best sellers (ranked bars).
- برنامه‌ها: what is on the site, what waits for the admin, the drafts and what came back (with the reason).
  **نقشه‌ی فروش** (`#/org/show/<show>`): a session at a time, its hall with every seat in its state, live (sold in its tier's colour, held as a ring, free, not for sale), each section's sold of capacity, the money by tier.
- برنامه‌ی جدید (six steps, a draft at every step, the card as it will look in the list beside them): what it is; the
  poster (a file, scaled in the browser; or a stand-in from the name and a colour); the hall from the **library**, each
  with its plan drawn small; the sessions on a **Persian calendar** (days × hours) and the sale's start (at once, or a time
  with the countdown); the prices **per tier of the hall's plan** (the plan coloured by tier, the weekend 10 % dearer, what
  a full house brings) and **seat by seat** (a brush on the plan, a press or a drag: «ویژه» with a price of its own, which
  becomes a price chip «صندلی‌های ویژه» on the buyer's seat map, or «فروشی نیست» for the guests' quota, grey for the buyer); a last look and «فرستادن برای تأیید مدیر».
- فروش و تسویه: what the buyers paid in three parts (the organiser's share, the 8 % fee, the VAT), the payouts, per show,
  a CSV file.
- کدهای تخفیف: for a show or all, a percentage or an amount, uses and a last day; they work at checkout at once (a show's
  code only for it) and count their uses. **The promo message**: a 1080 × 1080 picture drawn on a canvas (the poster, the
  discount, the code in a ticket) to download, and its words to copy. **The printed cards**: 85.6 × 54 mm (a bank card),
  ten to an A4 sheet with crop marks, music or theatre graphics, a unique code per card or one for all; print or PDF.
- کنترل‌چی‌ها: name, mobile, doors, a code sent by SMS (it opens the entry control).

**The admin** (`admin.js`, `#/admin/<tab>`): the dashboard (30 days); **محتوای صفحه‌ی اصلی** (the six featured slots of the hero with their banner, layout, colour and label; «ویرایش» goes home and opens that slot's settings: the settings panel is the admin's slot editor, §14); **برنامه‌ها و تأیید** (the queue: «تأیید و انتشار»
puts a show on the site at once, «برگردوندن» with a reason; a show on the site can be **cancelled**: its label becomes «لغو
شد» and every buyer's money goes back, to the wallet at once or to the card); سفارش‌ها (search by code, mobile or show;
today / 7 / 30 days; the state; a refund; CSV); کاربرها و نقش‌ها (مدیر کل، مالی، اپراتور and what each may do);
**شهرها** (which cities the buyer's filter shows, and the list itself), **سالن‌ها** (the library: add, edit, delete a hall, its position, its layouts, its zones' classes) and **برنامه‌ی تازه** (a show for any hall of any city; §10.5); دسته‌ها و تنظیمات (a new category by label, the SMS check, the virtual queue); گزارش‌ها (a period, a city, a kind: every number and chart
below follows; CSV); کیف پول و کد هدیه (batches of gift codes of an organisation: a file or printed cards);
تاریخچه‌ی تغییرات (who changed what, when).

**The halls' pages** (`halls.js`): `#/halls` (every hall by province and city, each with its small plan, a search, «only halls with shows») and `#/hall/<id>[/<layout>]` (the plan large with each section's name, a table of the sections and seats, the map's notes, the layouts, the halls of the same building, the shows there, and the location block **only when the hall has a position**); the show's page, a city's page and the search link to them. **The SMS check at checkout** is the admin's choice (off, busy shows only, always: «دسته‌ها و تنظیمات»).

**The notifications** (`notif.js`, the header's bell; the button itself is as it was): a list under it of the presales the buyer asked to be reminded of («یادم بنداز» is now kept), the tickets bought, a cancelled show's money back, the shows newly on the site and the sales that started today; each opens its page. The dot means something not seen yet (a first visit shows it, as before); opening the list marks all of it seen.

**The waiting room** (`queue.js`, `#/q/<show>/<session>`; brief §2.2 «سایت زیر فشار سریع بماند»): when a busy show's sale opens, «خرید» leads into a line instead of the seat map: the people ahead (a big number that counts down), about how long, a line of dots moving to the door, the whole line, the rate of entry, the people behind; at the front «نوبت توئه!» and a pass of ten minutes for the seat map. The seats' address can't skip it (without a pass it comes back to the line). The admin's switch: off, busy shows (the default), all. The demo's line moves faster than a real one and has a skip link. In the real site the line is the server's (a token per buyer, admitted at the rate the seat map can bear).

**A change to a show on the site** (`changes.js`): the organiser's «درخواست تغییر» on each show (the prices per tier, the words about it, or to cancel it, with a note); the card says what waits; the admin sees what would change (old ← new) in «برنامه‌ها و تأیید» and says yes (kept and laid over the show on every visit; a cancellation refunds every buyer to the wallet and the label becomes «لغو شد») or no.

**The account** (`account.js`, `#/account`, the first item of «حساب من»): signed out, a prompt to sign in (buying never needs it); signed in, four numbers, the tickets ahead, the reminders (each can be removed), the name printed on the tickets (it fills step 3), which notices come by SMS, the wallet, sign out. **The SMS templates** (`#/admin/sms`): the six texts the site sends (the code, the tickets, the sale's reminder, the night, a cancellation, a controller's code) with their fields in braces, a preview on a phone with sample values, and the count of letters and SMS parts (70 Persian letters in one, 67 in each part of a long one).

**The wallet** (`#/wallet`, from «حساب من» and the phone's menu): the balance, a charge by the gateway, a gift code (demo
code on the admin's page), what came in and went out; it pays at checkout (step 3) when it has enough; it has no paying out.

The charts follow one method: a single series in one hue, thin marks, a readout on hover and focus, a table of the numbers
under each chart; the four colours of the parts were checked for colour-blind separation on both themes.

---

## 10.5 The halls library, the cities and the admin's geography (round K)

The owner's **halls package** is the source (its README's «قواعد صاحب پروژه» are item 19 of `BRIEF.md`'s checklist and are kept to the letter): 147 halls with their cities, addresses, seat maps (150 layouts, 81,855 seats, 261 sections), zones and positions. The package, its images and `blit-prototype.html` are never committed (the repo is public); only the data derived for the page is, inside `index.html`.

**Data.** `tools/halls/build_halls.py` reads the package and `data/cities-source.json` (the 31 provinces and 482 counties from Persian Wikipedia, with the 5 extra cities: رویان، زیراب، کلارآباد، طبل، کیش; **provisional**, the owner has his own list of 485 — it replaces this with `tools/halls/make_cities_source.py` or the admin's «افزودن گروهی») and writes `halls-data.js` (`GEO_DATA`, `HALLS_DATA`, `HALL_ALIAS`, `PLANS_JSON`) that the page build puts into `index.html`. Every layout is run-length encoded; the script **decodes each one again and compares it with the package** (seats, capacity, sections) and asserts that the halls without a position are exactly the package's list. Positions: 104 high confidence, 16 medium, 19 single-source, 8 none.

**Runtime** (`hallslib.js`). A hall is found **only by its id** (`hallById`), never by its name or by what its name looks like; its city is a slug of the cities list; a show keeps `hall`, `hallLay` and `cs`, and `bindHall(show, id, layout)` sets its city, city slug and «city، hall» line from the hall — so a show's map, address and position are always its hall's, and a hall's city is always the city it is in. The admin's changes are kept **apart** from the package's data (`localStorage` «blit.lib») and laid over it (`hallsAll`, `citiesAll`), so the package can be replaced without losing them; a broken, wrong-shaped or stale saved value is the same as none (`tools/integrity-test.js`). `libSet` is the one way to change anything: it saves, clears the caches and every list redraws (`lib.on`). `libCheck()` audits the whole library (the tests run it). Plan keys are `h:<hall id>:<layout>`.

**Capacity, zones, prices.** A hall's capacity is counted from its map: the seats, minus the ones the map marks as outside the capacity (`outside_capacity`) and the ones in a zone of class X. Each **zone** (the package's `pl`) is in a price class: A–H (A dearest), V (special) or X (outside the capacity, not for sale); the admin changes the class of a zone and the capacity and the buyer's colours follow. A show gives **each class its price** (`show.prices[class]`, per seat from `seatTier` for the organiser's special seats); the lowest price is its «قیمت از». A hall with **several layouts** (the same hall, other plans) keeps all of them and a show picks one; the halls of **one building** link to each other; the map's **notes** are shown under the section; the sections with only a count of seats are sold by quantity.

**The position is optional.** `hallLoc(h)` is null for a hall without one, and then `locBlockHTML` returns nothing: no block and no words, on the hall's page, the show's page and everywhere else (the eight halls: 154, 84, 195, 176, 186, 114, 146, 177). No coordinate is ever invented. The admin sets, changes or removes a position at any time; the map appears and disappears by itself. **The map is Google Maps itself** (round O, §10.9).

**The cities.** 31 provinces and all the counties and the five extra cities are in **the admin's** list whether or not they have halls or shows (**the visitor's lists hold only the cities that have a hall since round O, §10.9**); the extras are made like every other city. The admin chooses which are shown in the filter (`hide`), and adds, renames, moves and deletes cities (`libSet.city*`); a city that has halls or shows is not deleted.

**The admin** (`admin.js`, `adminlib.js`):
- **شهرها** `#/admin/cities`: search; chips (all, shown, hidden, with halls, with shows, added or edited, deleted); a table with a switch per city (what the buyer's filter shows), edit (name, province, county, shown — the key stays), delete (refused while the city has halls or shows; a city of the package can be brought back), add, **bulk add** («استان، شهر» lines, counted before they are added), «همه نمایان باشن» and «شهرهای بدون سالن و برنامه پنهان بشن».
- **سالن‌ها** `#/admin/halls`: the list (search; province; chips: with a position, without, several layouts, the admin's own, edited, with shows, deleted). `#/admin/halls/<id>`: name, **province then city**, address; **the position** (paste a Neshan, Balad or Google link or «lat, lng» and it is read; the numbers; a live map; save / remove / back to the package's own; a point outside Iran is refused); **the layouts** (the package's are read-only; add one with the designer — numbers or a table of rows — or **copy another hall's**; rename; delete the last one added when no show uses it); **the class of each zone**; the shows in this hall; delete (refused while any show uses the hall) or reset. `#/admin/halls/new` makes a hall with its first layout.
- **برنامه‌ی تازه** `#/admin/new[/hall:<id>]`: the organiser's wizard for the admin — any hall of any city, any time; «انتشار روی سایت» puts the show on at once (`by: 'admin'`, so it is not in an organiser's lists). The wizard's hall step is the library's: a city (by province), a search, the halls with their small plans, and, when a hall has several layouts, a choice of layout; the prices step has one price per class of that layout's plan.

## 10.6 Round L: a calmer site (the plan, the cards, the presale, the side dock, the sold tickets)

> **The card of this section is now the `below` look (a choice).** The default is round N's framed card (`posterInfo: frame`, §10.8: round M's hover card is gone); everything said here about the states, the stamp, the label and the meter still holds for it.

The owner's words: the site is **too crowded**; the event cards are **not attractive**; they want «very professional, attractive curves, a place for the show's city, every state (ended, started, presale…)»; the presale section is **too long, tall and big** («minimal, compact, detailed»); the posters are **too tall, too big and stuck together**; the sold tickets should follow **three sample looks**; and the category bar that slides under the header is **a second header** («bad»). Buttons must be **soft** and never full-round; the light theme lost the buttons' frames; the magnet should be a third as strong.

### The plan (what made it crowded, and what each cause got)

| What crowded the page | What it is now |
|---|---|
| **Three or four things shouted on one card** (a status chip, the show's badge, a city tag, a stamp, the countdown) | **One label per card** (`cardState`): the status if there is one, else «آخرین بلیت‌ها» when a night is nearly full, else the show's own word («پرفروش»…), else nothing. The city is no longer a tag on the poster: it has **its own line** (see *the card* below). A sold-out or cancelled show gets a stamp on its grey poster instead of a label |
| **Cards stuck together** (a 9 px gap) | The cards' gap is its own token, `--cg` = 1.05u (**20 px** at 1920, where it was 9), and the panels are 2.6 gaps apart (23 px; it was 2: 18 px). The sections' padding grew from 1.35u to 1.5u |
| **Posters too tall and too big** | The frame is **4 : 5** (`posterRatio` 0.8; it was 2 : 3), **6 columns from 1300 px** (7 from 2200, 5 from 1100, 4 from 860, 3 from 600, 2 under that; it was 6 from 1500), the words' part is `max(9.2u, 152 px)` (it was `max(10.4u, 134 px)`). **A card at 1920 × 1080 is 290 × 539 px (the poster 288 × 360), where it was 300 × 649**; a section of two rows (the concerts) is 1321 px tall, where it was 1523 |
| **The presale** (wide tickets with a big flip clock) | **A row of small tickets** (see *the presale rows* below): two across from 1000 px, one under it. A row is **149 px tall at 1920, where a ticket was 370**; the whole section is **465 px, where it was 891** |
| **Loud section heads** | A smaller head: the name 17.5–24 px (it was 19–26.5), the icon tile 50 px (58), and **one quiet line** under the name («۱۲ برنامه · ۷ آبان تا ۲۴ آذر») with a small «همه ›» link; the section's colour is a 3 px line on the panel's top edge |
| **A second header** (the sticky category bar) | Gone by default (§9, and *the side dock* below): the bar scrolls away like any strip, and the visitor chooses between a widget on the right edge and a header that marks the category in view |
| **Hard, full-round buttons** | `btn: soft` is the default: a rounded rectangle (`--rb` = 0.55 radius), the same value as the old capsule's «نرم» preset. Nothing is full-round unless the visitor picks `pill` (and `tagPill` for the labels) |

**All together, with the same 43 shows at 1920 × 1080, the home page went from 7,947 px tall to 7,025 (−12 %)**, with the cards 17 % shorter, the cards' gap twice as wide and the presale a little over half as tall (`tools/l-measure.js`, on the round-K build and on this one).

### Buttons, edges, the magnet

- **Soft by default.** `--rb` (a button's radius) and `--rg` (a tag's radius) come from `btn` (`BTN`, `BTN_TAG` in `look.js`: **soft** = 0.55 × the panels' radius (10.5 px) for a button and the thumbs' radius (7 px) for a tag; pill = 999 px; sharp = 4 px and 3 px); `tagPill` keeps the labels (status, countdown boxes) full-round if wanted. Every hard-coded `999px` on a button, a chip, a hover or a fade effect was replaced by `var(--rb)` / `var(--rg)`; `tools/radii-scan.py` lists every rule that still has a round radius (about seventy): they are dots, avatars, step numbers, switch knobs, bars, the seat map's stage and the settings panel's own controls, and none is a button of the site. `pill` and `sharp` stay as choices.
- **Edges in the light theme.** A button's fill and edge come from two tokens, `--bt-fill-a` and `--bt-line-a` (dark: .06 / .14); on the light theme they are .07 / .34, and a field's border is 40 % of the text colour, so a button on a white panel has a line. The buy button on a card is the text colour (dark on light) and carries a shadow. **Checked with pixels**, not with the stylesheet: `tools/l-btn-audit.js` screenshots a page, finds each button's edge and compares it with the panel behind it. *The light theme was not truly audited before this round*: the earlier audits wrote the look to `localStorage` in a shape the page does not read (`{mode: 'light'}` instead of `{version, rev, look: {mode: 'light'}}`), so they looked at the dark theme twice. Every audit now sets the theme through `window.__hero.look.set('mode', 'light')` and checks `data-mode` before it measures.
- **The magnet** (`magnetPow`, «قدرت آهنربا (۱۰۰٪ = قدر قبلی)», 0–150 %, default **33**): the pull of a buy button toward the pointer (`lean()` in `fx.js`: 0.22 of the pointer's horizontal and 0.32 of its vertical distance, as before) is multiplied by `magnetPow / 100`, so the effect is a third of what it was and still there. 0 stops it; 100 is the old strength. The switch `magnet` (on/off) is unchanged.

### The light theme's text: what the first real audit found, and the remedy

The first axe run that was truly in the light theme found **133 contrast failures in 19 kinds of element**, none of them in the dark theme (WCAG 1.4.3, 4.5 : 1 for text this size): the small grey notes (a dim text on a light panel is the dark text going toward white, so `rgba(var(--fg), .5)` to `.6` reads 3.6 to 4.2 : 1 on white), the small counts dimmed with `opacity` (3.4 to 3.7 : 1), the status chips' green on its own tinted fill (4.2 : 1), the bright greens, ambers and reds that were chosen for dark panels (2.3 : 1 on white: the admin's tiles, the live dots, the session's «موجود است»), and the kind-word of a card whose show colour is white or silver (3.6 : 1). Almost all of it was in the organiser's and the admin's desks, the steps' bars, the session list and the city picker; the home page's cards were already fine. The remedy leaves the dark theme exactly as it is (**the computed colours of 72,506 elements on 29 pages, before and after: no difference**) and has five parts:

1. **A floor for dim text.** `--dmin` is 0 on dark panels and .64 on light ones, and every `color: rgba(var(--fg), A)` under .64 (127 declarations) reads `max(A, var(--dmin))`; `--omin` (0, and 1 on light panels) does the same for the dozen small counts dimmed with `opacity`. A sold seat's number is left alone: it is meant to look gone.
2. **The four text tones are tokens**: `--t-ok`, `--t-warn`, `--t-bad`, `--t-info`. Dark panels keep their brights (`#22c55e`, `#f59e0b`, `#f43f5e`, `#38bdf8`); light panels get deep ones (`#166534`, `#92400e`, `#9f1239`, `#075985`: 5.7 to 8.0 : 1 on white, on the page's grey `#eceef3`, on the session stubs' `#e3e5ea` and on their own tinted chips). 27 text colours use them, and the status chips' light text (`--st-l`) is the same deep set.
3. **A card's tint** (`--tk-c`) is 40 % of the show's colour mixed into the text colour, so any of the 16 colours reads at 5.9 : 1 or more on white (white and silver were 3.6).
4. The flip clock's 3D `perspective` moved from its container into its keyframes: a 3D container made the checker lose the ground behind the show page's small «روز» label, and a static page has no need of it. The sale box keeps a flat dark colour under its gradient.
5. The page needs a browser that takes `max()` inside a colour's alpha and in `opacity`, like the rest of it (`color-mix`, `@property`, view transitions).

### The card (`.tkt`, `ticketHTML` in `section2.js`)

From top to bottom, on a card whose corners are the panel's radius and whose two **notches** (a mask, so they are really holes) sit where the perforation meets the sides:

1. **The poster**, whole, in its frame (`--pr`; a poster of another shape is shown whole with a soft copy of itself behind it; the frame is filled when the shape is the frame's to 2.5 %). In its corner, at the start side, **the date stub**: a white tile with the first night's day and month (and, above them, a band in the show's colour saying **«امشب»** or **«فردا»** when that is true). In the opposite corner **the one label**. At the foot, for a nearly full night, a thin bar as full as the sold part. A sheen crosses the poster once when the pointer arrives.
2. **The perforation**: a dashed line that brightens on hover.
3. **The words**, on the panel's own colour with a breath of the show's colour in the corner (so it reads in the light theme too): the kind (an icon and «کنسرت») and the days («۱۱ تا ۱۳ آبان»); the **name** (two lines at most); **the place**: a pin, **the city in bold**, a dot, the hall (a venue written «تهران، سالن X» or «سالن X تهران» says its city only once: `placeOf`); and the foot: **the lowest price and the buy button**, or the countdown, or the reason it can't be bought.

**The states** (`statusOf` + `fewOf`; `data-st` on the card):

| State | The poster | The one label | The foot |
|---|---|---|---|
| on sale | in colour | none (or the show's own word: «پرفروش») | price and «خرید بلیت» |
| a night is nearly full (at most 20 % of the biggest session's seats are left) | in colour, the thin bar at its foot | «آخرین بلیت‌ها» (a flame, amber) | price and «خرید بلیت» |
| presale (the sale hasn't started) | in colour | «به‌زودی» (a clock, blue) | «شروع فروش» and the clock (hours : minutes : seconds, each number turns over like a flip clock) |
| extended | in colour | «تمدید شد» (a tick, green) | price and «خرید بلیت» |
| sold out | grey and dark, the stamp **«تمام شد»** | none (the stamp says it) | «بلیت‌ها به اتمام رسید» |
| over | grey until hovered | «برگزار شد» (grey) | «این برنامه برگزار شده است» |
| cancelled | grey until hovered, a red stamp | «لغو شد» (red) | «این برنامه لغو شد» |
| postponed | in colour | «به‌تعویق افتاد» (amber) | «این برنامه به‌تعویق افتاد» |

A poster, its name, a reason and a button all open the show's page (the button at its sessions). The words are **under** the poster by default; `posterInfo: over` puts them on its lower part, on a frosted panel, as in the owner's first sample. On a phone the cards are two across and the buy button is an icon beside the price (its name is still said by screen readers).

### The presale rows (`.ptk`, `presaleHTML`; `presale: compact`, the default)

A small ticket per show, two across from 1000 px, one under: the poster's **stub** (66–100 px wide, 0.68) on one side of a **vertical perforation** with a notch at its top and its bottom; in the middle the kind and the city, the name (one line), and a calendar line with the days and the hall; at the far end «شروع فروش · سه‌شنبه ۱۲ آبان، ساعت ۱۶:۴۲», a **small clock** («۲ روز و ۰۶:۱۲:۳۰»: days only when there are some, each number turning over) and **«یادم بنداز»** (it toggles, is kept in `localStorage` «blit.remind», lights the bell's dot, and says «ده دقیقه قبل از شروع فروش … پیامک می‌گیری»). `presale: cards` makes the section like the others (poster cards with the clock in their foot). On a phone the row wraps into the card's grid areas: stub, text, then the clock and the button underneath.

### The side dock (`sdock`, `header.js` and `header.css`; `hdScroll: dock`, the default)

In place of the second header: **one capsule on the page's right edge**, joined to the edge by a **curve** at its top and its bottom (two radial-gradient fillets in the capsule's colour), at the vertical middle. It appears when the hero has been passed (0.9 of a screen) on the home page only (not on a show's page or a desk), sliding in from the edge. From top to bottom:

- **the categories** — «همه‌ی برنامه‌ها», پیش‌فروش, کنسرت, تئاتر, جُنگ و کمدی — each a round-cornered button with its icon and, in a corner, how many shows (for the chosen city); **a mark** with the section's colour slides to the one in view (`sdock.mark`, driven by the same probe as the bar's pill, and by a jump), and a thin line of that colour shows on its inner side. A category with no show is dimmed;
- the quick things: **search**, **city** (it opens the one city picker, §9), **theme** (sun or moon; the same circle-from-the-button change), **my tickets**, **my account**;
- **back to the top**, with a ring that fills as the page goes down.

Its name appears in a small tag on a button's inner side on hover or focus. The buttons come in one after another (a stagger of 32 ms) when it opens.

**It folds itself away.** Closed, it is only a small **tab** on the edge (with a chevron that nudges three times to say it is there). It opens when the pointer comes near it (within 54 px of the edge, or within its own width + 46 px when open, and not further than 40 px above or below it), when a key is inside it (focus), while the city menu it opened is out, for 3.6 s when it first arrives, and always when it is **pinned**; the tab pins it (a tack; kept in `localStorage` «blit.dockpin») or lets it fold again. It closes 650 ms after the pointer leaves. **Esc** closes it (focus is released, and it stays shut for 0.9 s so the focus it left doesn't reopen it). While it is not shown it is `inert`. It never covers the page: the closed tab is 22 px wide.

**On a phone** it is a single soft-cornered button in the bottom-right corner (12 px from the right edge) that opens a labelled list upward (name, count, the mark on its side); a press outside or Esc closes it, and choosing a category closes it. At heights under 760 px the «my tickets» button goes, under 640 px the quick things too.

The other two ways, for comparison: **`one`** (only the header; its links get the mark, §9) and **`bar`** (the earlier sticky bar). The switch is in the settings: «هدر ← وقتی اسکرول می‌کنی (دسته‌ها کجا باشن)», and a look can be sent back with «کپی تنظیمات».

### The three sold-ticket looks (after the owner's three sample images; step 4, the tracking page, the account and the entry)

| Look | Where | What it is |
|---|---|---|
| **A, the boarding pass** | the tickets after payment (`#/ticket/<code>`, `passHTML` in `buy.js`; also what is printed) | a card of two parts on a perforation with a notch at its top and bottom: on the one side the poster, the kind and «بلیت ۱ از ۲», the title, the day and the hour, the facts (zone, row, seat, city, hall) and the hall's address; on the other a **dark stub** with a white **QR tile**, the code and the price. A press on the QR opens look C |
| **B, the booking card** | each order in «پیگیری خرید» and «حساب من» (`orderCardHTML` in `pages.js`) | a card tinted with the show's colour: the kind and the city on top, the title, a row of the hour / how many tickets / the sum, the tracking code; across a perforation a **white date stub** (weekday, day, month) with the order's state («گذشته», «بازپرداخت شد», …) |
| **C, the mobile pass** | the QR's large view (`passOpen`); **on a phone (≤ 760 px) look A itself turns into it**: a vertical card, the poster dropped, the round badge half over the top edge, the words centred, the stub (QR, code, price) under a horizontal perforation | a vertical card: a **round badge** with the kind's icon at its top (it sits half over the edge: the card is split in an outer shell and an inner masked body so the mask doesn't clip it), «این کد رو دم در نشون بده», a **big QR** (scaled in), the code, a dashed divider with notches, then the route (city — date), the title and three facts (seat, hour, hall) |

All three take the show's colour and the theme's colours; the QR stays dark on white in both themes (a scanner needs it) and the codes are `dir="ltr"`. **Printing** (or «ذخیره‌ی PDF») drops the mask and the shadows and prints the stub white with black text, one ticket per block (`break-inside: avoid`). The sample images are the owner's and are **not in the repository**: the looks are redrawn, not copied.

### Checked (round L)

`tools/dock-test.js` (the dock: hidden at the top, shows after the hero, the mark follows the section in view and a jump, folds and opens by pointer, focus and pin, Esc, `inert`, the three ways, the phone's button and list, light and dark), `ui-test.js`, `poster-test.js` (the 4 : 5 frames, 43 cards, the columns at five windows, the sizes asked of the organiser), `status-test.js` (the eight states' labels, stamps and feet) and the older tests, updated where they assumed the old sticky bar, the old frame or the old ticket DOM. A pixel audit of every button's edge in **both** themes (`l-btn-audit.js`), a radius scan (`radii-scan.py`) and a QA crawl in the real light theme are in §20.

## 10.7 Round M: from a program to a ticket in fewer, bigger steps; the new program card

> **Round N replaced this section's card** (the owner did not like the words going away under the pointer) with the framed card of §10.8 and made the show's page, the seats' page and the checkout over again. What is said here stays true of what did not change: the quick way («the best seats» held at once), the rules asked when they are needed, the continue pill, the remembered SMS check, the posters' fit (`posterFit`) and the columns of the list. **Round O then removed the quick way and «the best seats» altogether** (§10.9): the show's page has one button, to the map, where the buyer chooses.

**What the owner said** (two messages, short): the site still felt crowded; the road from a program to a ticket (the show's page, the mobile check, the seats, the rules, the ticket choice) had a bad structure and some parts were very stretched; the rules and the ticket choice should be bigger and easier to see; posters did not fill their frames and the frames should be more attractive, curved and soft; then, with three sample images: *change the program frames entirely* (the picture a little tall, about 3 : 4, not the whole poster; with the mouse on it the **whole picture** is seen, and when the mouse leaves the words rise back with a smooth, professional motion; on a desktop only, and on a phone something else that is attractive). «Don't ask me anything; go on until all of it is done.»

### The road, before and after

| | before (round L) | now (round M) |
|---|---|---|
| **The show's page** | steps panel, a 336 px cover, four panels one under another (facts, map, about, prices), a column of sessions each with its own buy button, the rules a small tick at the top | one slim row (the way back + four dots), a 200 px cover, the information in **two tabs** and the prices as one panel, and **one big buy panel**: the rules (a large line), the nights as big cards (the first with seats is chosen already), how many seats, two ways on |
| **The rules** | a tick that had to be found before the buttons worked | asked **when they are needed**: a press on either way on opens them («می‌پذیرم و ادامه» goes on with what was pressed); the tick stays in the panel for who wants it first |
| **To the payment** | session → seats (always) → pay | **«بهترین صندلی‌ها رو بگیر»**: the best seats side by side are held at once and the buyer lands on the payment (two presses); «خودم روی نقشه انتخاب می‌کنم» is the long way |
| **The seats' page** | steps panel, two sparse panels (the show; the prices), then a 210 px overview + «best seats» box; the seats began at 600 px of a 900 px window | one slim row, **one** panel (show, night, prices), the overview and the best-seats box a third shorter; the seats begin at about 480 px |
| **The payment** | a full-width hold panel, a form two panels wide (the phone and the name each across ~950 px), the code field always open, the SMS check forgot a verified number (and let a changed number through) | a **narrow centred column** (1120 px), a slim hold line, the phone and the name side by side, the code a link, the SMS check **remembers** a verified number for the visit and asks again for another one; on a phone the details come first and a **bar at the bottom pays** |
| **Leaving in the middle** | the hold ran on unseen | **«ادامه‌ی پرداخت»**: a pill on every other page with the time left, one press back to the payment |
| **The card** | a poster (4 : 5) with the words under it; 6 across | the picture **is** the card (3 : 4); the words are a sheet over its lower part; 5 across |

### The show's page (`page.render` / `page.wire` in `page.js`; the styles in `page.css`)

1. **The top row** (`.evp-toprow`): the path and the steps (`stepsHTML` in `buy.js`: a slim `ol.steps`, numbered dots with a connector between them; the ones done are green and take you back, the present one is filled; under 760 px only the present one is named). The same row sits on the seats' page, the payment and the ticket.
2. **The cover** (`clamp(190px, 12.5u, 270px)`): the banner or the softened poster behind it, the poster **in its own shape** (its picture's ratio, 0.6–1, set on load as `--ps`: no bars), the title. On a phone the poster is beside the title and the cover is about 190 px.
3. **The information** (`.evp-info`): two tabs (about: the facts, the people, the line, the text; the place: the map, **only when the hall has a position**); with no map there is no tab bar at all. Real tabs: `role=tablist`, arrow keys go from tab to tab, one panel at a time. **The prices** are a panel of their own (the tiers in a grid), because it is the first thing a buyer asks.
4. **The buy panel** (`#evpBook`, on the page's side, following it; on a phone right after the cover):
   - for a presale show the sale's start and the flip countdown; when the sale is open:
   - **the rules**: one large line (at least 54 px high, 14.5 px, a 2.15 em box that nudges until it is ticked);
   - **the nights**: radio cards (a dark stub with the weekday, a big day number and the month; the hour; the state; how full; a round tick). The first night with seats is chosen already; a night with none cannot be chosen (`aria-disabled`); the arrow keys move between nights;
   - **how many**: a stepper (1–10, remembered as `blit.qty`) and «از X تومان» for that many;
   - **two buttons**: «بهترین صندلی‌ها رو بگیر» (the main one, 54 px) and «خودم روی نقشه انتخاب می‌کنم».
5. **The rules' window** (`page.rules({ then })`): opened by the link, by the tick's label, or by a press on either button when the rules are not accepted yet; the button says «می‌پذیرم و ادامه» when it was a press that opened it (it accepts, ticks the box, then does what was pressed); Esc or «بستن» closes it and nothing else happens. Accepted rules are kept per show for the visit. The list's numbers are Persian digits.
6. **The quick way** (`buy.quick(e, s, n)`): the same scoring as the map's «best seats» (a run of *n* free seats side by side, in a row, a box or a table; the nearest the stage first, then the middle), or *n* standing places; a show with a waiting room still goes through it (to the seats' page); with no run of *n* a toast says so and the buyer stays. The seats are held for 15 minutes (`blit.hold`) and the buyer lands on the payment.
7. **A phone**: the cover, the buy panel (it is on the first screen), the information, the prices, more shows. The bar at the bottom («انتخاب سانس» and the lowest price) is out of the way while the panel is on the screen (`IntersectionObserver`, `.is-hide`) and comes when it is not.

### The seats' page, the payment, the ticket (`buy.js`, `buy.css`, `seatmap.js`, `seatmap.css`)

- **Seats**: the top row; **one panel** `.bk-head` (poster, title and hall, the night's button with «تغییر سانس», the price chips: they slide in one row on a phone); the map's top is shorter: the overview `clamp(130px, 17svh, 190px)`, the best-seats box is a grid of title, a line, and the count with its button on one row.
- **Payment** (`.bk-narrow`): every child at most 1120 px and centred; the hold is a slim line (56 px) with its ring; **the phone and the name side by side** (`.bk-duo`); the discount code is a dashed link «کد تخفیف دارم» that opens its field and puts the cursor in it; the SMS check (when the show asks for one) **remembers a verified number** (`sessionStorage blit.otpOk`) and folds into one line; another number is asked again (it used to be let through); on a phone the invoice and the pay button come **after** the details and a bar (`.bk-paybar`) pays from anywhere, stepping aside while the invoice's own button is on the screen.
- **The ticket**: the same slim row (with «همه‌ی برنامه‌ها»).

### «Continue your purchase» (`resume` in `buy.js`)

While a hold runs (`blit.hold` has time left) and the page is not that purchase's seats or payment, a pill at the foot of the page says «۱۴:۵۶ · ۲ صندلی نگه داشته شده — ادامه‌ی پرداخت» and goes to the payment in one press. It is gone when the hold ends or the buyer is back on that purchase; on a phone it sits above the pages' own bottom bars.

### The program card, new (`posterInfo: reveal`, the default; `ticketHTML` in `section2.js`, the rules at the end of the card's block in `s2.css`)

The DOM did not change (the three looks, `reveal`, `below` and `over`, are choices of the same markup); the whole card is the link now (a press on its words opens the show; the buy button opens it at the sessions).

- **The card is the picture**: 3 : 4 (`posterRatio` 0.75), a very soft corner (`--cr` = 1.7 radius), five across on a normal desktop (six from 1700 px, seven from 2200, four under 1200, three under 860, two under 600). On a phone the card is a little taller (0.70).
- **The date is a pocket** in the picture's top corner (the card's own colour, with two **concave fillets** drawn with radial gradients, one pixel overlapping what they join); the status label stays a glass chip in the other corner.
- **The words are a sheet** floating over the picture's lower part (`--sh` = `max(8.4u, 121px)`, one height for every card so the words begin on one line), with a **tab** on its edge (the kind and the days) with a fillet of its own. The sheet is a solid colour (`--capsule`, so it reads in both themes), with `drop-shadow` so the tab, the fillet and the sheet cast one shadow.
- **The motion** (a desktop: `@media (hover: hover) and (pointer: fine)`): under the pointer the sheet and its tab **drop out of the card** (0.55 s) and the words fade (0.2 s): the whole picture is seen; when the pointer leaves, the sheet **rises** (0.95 s, `expo.out`) and the tab with it, and **the words come one after another** (name, place, price: 0.22, 0.28, 0.34 s). A wide banner (shown whole over its soft copy) sits a little higher while the words are over it and comes to the middle when they are gone; a sold card's stamp does the same. The picture is **not zoomed** under the pointer (the whole of it is what the pointer is shown). Keyboard focus keeps the sheet (`:has(:focus-visible)`). Reduced motion: the same two states with no travel.
- **A touch screen** (no hover) keeps the sheet: it is simply there, smaller (106 px), the tab says only the kind (the date is in the pocket).
- **All the states** are in it: on sale, presale with its countdown, last tickets (the label and the meter along the foot), sold out (a stamp in the middle of what is seen, «بلیت‌ها به اتمام رسید»), ended, cancelled, extended.
- **The grid's gap** (`--cg`) was only defined inside the home list, so on a category page, a search, a city and the show's «more» strip the cards touched; it has a fallback now.

### Posters in their frames (`posterFit`, `fit()` in `section2.js`)

A picture is **`is-fill`** (its shape is the frame's, to 2.5 %: drawn as it is), **`is-cover`** (close, to 14 %: it fills the frame and the extra is cut; the upper part stays), or **`is-inset`** (further: a wide banner, a square: shown whole at its own shape, rounded, over the soft copy of itself). With the frame at 3 : 4: 27 of the 39 pictures fill it, 9 (2 : 3) are covered with a 11 % cut, 3 wide banners are shown whole. `posterFit` in the panel: smart (the default), always whole, always fill. A drawn stand-in (a show with no picture) has the frame's own shape.

### The other pages

The head of a page (icon, name, line) is slimmer (it was a tall, mostly empty panel); the one-field forms of the tracking and the wallet pages are at most 640 px across; the category page's filters slide in one row on a phone (they took four lines).

### The look: new and changed choices (§11)

`posterInfo` gets **`reveal`** (the default); `posterRatio` is **0.75** (it was 0.8); `posterFit` is new; `listCols` says «خودکار (۵؛ از ۱۷۰۰ شش؛ از ۲۲۰۰ هفت؛ زیر ۱۲۰۰ چهار)». A look saved before keeps only what it had changed (the saved look is a diff), so the new defaults reach everyone who had not.

---

### Checked (round M)

- **The regression** (`tools/regress.sh`): **31 tests, all pass.** `m-flow-test.js` is new (**35 checks**: the show page's slim steps, short cover, poster shape, two tabs and arrow keys, the buy panel, the rules asked when needed with Esc, the quick way's two seats side by side for 15 minutes, the narrow checkout, the discount link, the SMS check remembered for a verified number and asked again for another, the continue pill, the cards' shape, pocket, tab and the sheet's drop and return under the pointer, a phone's cards, cover, bottom bars and pay bar, and the old `below` look as a choice). `buy-test.js`, `ui-test.js` and `poster-test.js` were taught the new flow and the new default card (they asserted the old card: notches, a perforation, the words under a 4 : 5 poster, six columns).
- **The cards** (`m-card-audit.js`): 39 cards × 8 windows (1100, 1280, 1440, 1700, 1920, 2560, 768 and 390 px wide) × both themes: every card is 3 : 4 (0.70 on a phone), and in every one the sheet holds its name, place and price row, the tab stays inside the card, the foot is not wider than the sheet: **0 problems in 624 cards** (the audit found the first version's 2-line names overlapping the place; the sheet is taller now).
- **The hero** (Rule 0): the banner's panel and the facts panel are **pixel-identical** to the approved version (commit d4cc53c) with the pill look, at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900.
- **Accessibility** (axe-core, WCAG 2.1 A and AA): **no violations** on 26 pages × both themes × a desktop and a phone, and **none in 38 states** that need a press (the search window, the city picker, the bell, the sign-in, the dock, the rules asked before the best seats, the payment with its discount code and its SMS check, another page with the continue pill; a phone's menu and dock). Axe found two things in the first version and both are fixed: the nights' dark stub read as light text on a light ground in the light theme (a gradient it cannot read: the stub is one colour now, and each word has its own ground), and the steps' links on a phone had no name (the label is hidden for the eye, not for a reader).
- **The crawl** (`qa-crawl.js`, every page, both themes, 1920 / 1366 / 390): no script error, no sideways overflow, no cut-off, no broken picture; **354 links, none to nowhere**.
- **Layout shift**: 0.000 on the first load (desktop and phone); a show's page opened by its link 0.000 to 0.0003 (two causes found by `m-cls-show.js` and fixed: the path wrapped before the font came and moved the page up 20 px; and the cover's poster took its shape only when its picture loaded: its frame has a fixed height now and its width follows its shape).
- **Speed** (CPU ×4, 30 wheel turns, `tools/perf-bisect.js`): **no clear change from round L**. The run-to-run spread on this machine is large (the same page measured 120 to 650 ms of blocking time going down and 170 to 830 coming up on different runs); three alternating pairs of the new card against the round-L card (`posterInfo: below`) did not separate them. Taking the sheets away (`v19`) cut a quiet run from 123 to 31 ms, so the sheets are most of what a card costs; the shadow filter and the cards' size containers alone changed nothing measurable.
- **The client's single file** (`export.py`, `client-test.js`): opens offline from the disk, dark, no notes, the font and 67 pictures inside, no failed request.

### Honest notes (round M)

- **At rest the sheet covers about 40 % of a desktop card (44–48 % of a phone's).** That is the price of the owner's sample (the words over the picture); the whole picture is one pointer-move away on a desktop. `posterInfo: below` brings round L's card back, and `posterRatio` and the columns are settings.
- **`:has()`** (keyboard focus keeps the sheet) needs Chrome 105, Safari 15.4 or Firefox 121; without it the rule is dropped and the sheet simply stays under the pointer.
- **Only Chromium was used** (no iOS Safari, no Firefox, no real touch screen): the touch layout was tested with an emulated phone (`hover: none`).
- **The rules' tick** nudges every 3.4 s until it is ticked; with reduced motion it does not move.

## 10.8 Round N: a card that stands still, one column for the road to a ticket, a banner that zooms for its whole time

**What the owner said** (one message, with two sample cards: a white card with the picture on top, the words and a soft raised button under it; and a dark one with a picture in a frame, notched tabs cut into the picture's edge and a box of figures under it): the purchase page is bad again; *remove the mode where the words go away under the pointer, make the **fixed** state of the samples, the frame fixed altogether*; the pocket in the top corner is good but its surroundings are fuzzy; make the cards like the samples **with a buy button (square or a rectangle with soft corners like the other buttons)**; the banners' zoom-out ends much sooner than the seconds it should last; the purchase path is still not liked: *some frames on the page after choosing a program are very long and stretched; remake it from the root, clearer, more compact, more professional*; and *look for other problems and fix them*.

### The card (`posterInfo: frame`, the default; the styles are at the end of the card's block in `s2.css`; `ticketHTML` did not change)

A card is a **mat** (the card's own colour, a little lighter than the section on the dark theme) round a picture with a soft corner of its own; nothing on it moves or hides while the pointer is over it (the hover that dropped the words away, the lift, the shadow's change and the sheen are gone; the picture grows 4 % inside its frame and a ring of the show's colour comes up round the card, nothing else).

| part | what it is |
|---|---|
| the picture | the frame's shape (`posterRatio`, 0.75 by default: the owner's 3 : 4); a corner of `--ir` (concentric with the card's `--cr`); the top corner under the pocket is square |
| **the pocket** | the date (the day, the month, «tonight» / «tomorrow» in a small capsule) cut into the picture's top corner: the card's colour, a convex corner towards the picture and **a concave curve where it meets each edge** (two `radial-gradient`s that go a pixel under their neighbour) |
| the label | the show's one word (a status, «last tickets», its own word) as a small glass chip in the other top corner, as before; a night that is nearly full has its thin bar along the picture's foot |
| **the tab** | the kind and the days (`.tkt-sub`): a tab at the picture's foot, rising from the words into the picture, curved out at both feet; on a phone it says only the kind |
| the words | the name (two lines at most), the city (bold) and the hall |
| **the foot** | the price (the small «from» over the figure) and **the buy button**: a soft rectangle of the look's radius (`--rb`), the words' colour as everywhere (`buyStyle`), with a slight sheen; side by side when the card is 262 px wide or more, else the price's line over a full-width button (a container query on the card). A sold, ended or cancelled show has its reason in the same place, a show not on sale yet its countdown |

*Why the old pocket looked fuzzy* (found by reading the pixels of a screenshot at the real size, not by looking): the picture's rounded corner was cut by `overflow: hidden` *under* a square corner of the pocket, and two layers that are both cut by an anti-aliased edge leave a line a few levels darker than either (3–5 of 255 here, a ring round the pocket); the picture's own colour behind it (`#14121d`) added a dark rim at every cut corner. Now the card's colour is behind the picture, and the corner the pocket covers is square, so the pocket's outer edge and the mat are one flat colour (measured at the real pixel size: the ring is gone, every pixel of the mat is 30, and the test `m-flow-test.js` reads those pixels). Every length that touches a curve (`--fw`, `--cr`, `--tr`) is a whole number of pixels (`round()`, Chrome 125; where it is not known the curves are still drawn, from the plain lengths).

**The choices** (the look's panel, «کارت برنامه»): `frame` (this card), `below` (round L's card: the picture whole, the words under it), `over` (the words on the picture, always). A look saved with round M's `reveal` takes `frame`. `posterRatio` goes to 1.2 (a squarer picture, if the owner wants the samples' proportions).

### The banner's zoom (`zoomShare`, `stage.show` in `app.js`)

The zoom-out used to end after 70 % of the time with an easing that is fastest at the start (`sine.out`), so it looked finished in the first two seconds. It now runs **linearly over the whole time of the banner** (the show's `dur` and the fade after it: 7 s + 1.2 s), so it is still moving when the next one comes in. `zoomShare` (the look's panel, «مدت زوم‌اوت بنر») is 100 % by default; 85 % and 70 % bring back an ending earlier, with the old easing. (Rule 0: the hero's panels are pixel-identical to the approved version, checked: «Checked» below.)

### The road, made over (round N)

What was wrong, from a screenshot at 1920 × 1080: **every block was the window's whole width** (about 1900 px), so a poster, a title and a night's button were three small things at three ends of a long strip; the facts panel had three short facts and an empty middle; the prices panel was a strip of three chips; on the seats' page a panel for the show, a panel for the night and another for the prices were three frames of one row's worth of words, and the overview's frame was 900 px wide round a drawing 160 px wide.

1. **One centred column** (`--fl` in `page.css`: 1180 px, or `62u` on a big window; the seats' page 1440 px or `86u` (the window's whole width up to 1440; 1651 px at 1920); the checkout 1060 px): the top row, the body and the strip of other shows are in it, so no block is wider than its words need.
2. **The show's page**: the cover is **in the main column**, beside the booking card (not a strip over both); the poster first, then the name; one tab strip for the facts and the map; the prices as chips under it. **The booking card** (400 px, follows the page): a header with the lowest price, the nights as smaller cards, how many, **the rules as one short line** (they are still asked when a button is pressed and they are not accepted), and the two ways on. On a phone the order is the cover, the card, the information.
3. **The seats' page**: **one bar** on top (the way back, the show with its poster, the night's button, the steps) instead of a row and a panel; **the price chips are the legend and the filter in one** and sit beside the sections' tabs (the legend under the map keeps only the seats' states); the overview is 104–132 px high; the title of the section, its free seats and the live count are one line; the order column is 320–390 px. **Seats are as big as they can be (34 px) while the widest row still fits the panel, down to 26 px on a mouse** (a touch screen keeps its big seats and scrolls), so the sample hall's widest row needs no sideways scroll at 1920 or at 1440.
4. **The checkout**: two columns of the same weight in a column of 1060 px; the note under the pay button is one block of words (it was cut into pieces by the flex row).
5. **The sold tickets' page** is in its own column too (1340 px, two tickets side by side at most).

*Measured (dark):* at 1920 × 1080 the first seat is at 539 px (it was about 640 px), the seats are 31 px and the widest row fits (no sideways scroll); at 1440 × 900 the seats are 26 px and the widest row fits too; the seats' bar is 69–84 px high; no block of a purchase page is wider than 1651 px.

### Other problems found and fixed (round N)

- **The checkout's note under the pay button** was cut into pieces (its words and its link were separate items of a flex row; in the narrower column they wrapped apart): the words are one block now.
- **The seats' page on a phone was 30 px wider than the screen** (the one bar's night button could not wrap), so the whole page shifted sideways: the bar wraps (the way back and the steps, then the show and the night). `scrollWidth` is 390.
- **A hall's widest row needed a sideways scroll** once the page's column was narrower than the window: the seats shrink to fit (34 → 26 px, a mouse only).
- **The buy button's words were hidden on a phone** by an older rule of round L's card (an icon button of 36 px); the framed card shows them.
- **The legend under the map repeated the price chips** (colour, price) that are above it as the filter: the legend says only what a seat's state is.
- **The two fields of the checkout were not level** when a label wrapped in a half-width column: the row aligns them at the bottom.
- **A countdown digit was measured by axe at a quarter of its opacity** in its flip (light theme, a phone; found by the states' audit, not by the pages'): the flip turns the digit in without fading it.
- **The sold tickets' page had its top row in one width and its tickets in another**: one column of 1340 px.

### Checked (round N)

- **The regression** (`tools/regress.sh`): **31 tests; 30 passed at the first run and the six-banner test failed two old checks that asserted the old early-ending zoom** (the zoom is over at 5.6 s; the layer is exactly the panel at that time): they were rewritten for the whole-time zoom (it is still going at 5.6 s and 6.5 s, its speed is even, 0.61 % of the size a second at the start and at the end, and at its end the layer is exactly the panel) and pass. After the last small edits (the checkout's columns and note, the seats' fit, the column's width, the digits' flip) the tests that touch the road, the cards and the zoom ran again on the final build: buying, flow, seat-price, map navigation, map, sales map, queue, pages, UI, poster and six-banner, all pass. `m-flow-test.js` has **36 checks** now (the framed card: the 3 : 4 frame, the pocket, the tab, the buy button's size and radius, nothing moves under the pointer, **the pocket's corner is one flat colour at the real pixel size**; the show's page: the cover in the main column level with the booking card, the column ≤ 1180 px, the rules one line, the card's order; the seats' page: one bar, the chips beside the tabs, a column ≤ 1651 px, seats of 26–34 px that fit the widest row; a phone's card). `ui-test.js` and `poster-test.js` were taught the framed card.
- **The cards** (`tools/n-card-audit.js`): 39 cards × 8 windows (1100, 1280, 1440, 1700, 1920, 2560, 768 and 390 px wide) × both themes: the name does not meet the place, the place does not meet the foot, the button is whole and ≥ 33 px with its words, the price and the button do not overlap, the tab is on the picture's foot and inside it, the pocket and the label do not meet, every row of a section has cards of one height: **0 problems in 624 cards**.
- **The pocket, at the pixel**: the mat is one colour (30 of 255 at the real size); before, a ring of 25–27 ran round the pocket and a dark rim round every cut corner.
- **The hero** (Rule 0): the banner's panel and the facts panel are **pixel-identical** to the approved version (commit d4cc53c) with the pill look: banner 0 and facts 0 differing pixels at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900. The zoom's timing is the one thing asked to change: at 100 % a banner's scale goes from 1.048 to 1.008 evenly over its 7 s (and reaches 1.000 when its fade ends); at 70 % (the old ending) it is 1.017 at 2 s, with 64 % of the way gone, and 1.000 from 4.6 s.
- **Accessibility** (axe-core, WCAG 2.1 A and AA): **no violations** on every page in both themes, on a desktop and a phone (`a11y-audit.js`); and **in all 38 states that need a press** (the search window, the city picker, the bell, the sign-in, the dock, the show's page, the rules asked before the best seats, the payment with its discount code and its SMS check, another page with the continue pill; a phone's menu and dock); its first run found one thing: a countdown digit caught at a quarter of its opacity in its flip (light theme, a phone), so the flip no longer fades the digit.
- **The crawl** (`qa-crawl.js`, every page, both themes, 1920 / 1366 / 390): no script error, no sideways overflow, no cut-off, no broken picture; **354 links, none to nowhere**.
- **Layout shift**: 0.000 on the first load (desktop and phone); a show's page opened by its link 0.000 to 0.0004; the seats' page on a phone 0.002 (all of it the View Transition's own layers).
- **Speed** (CPU ×4, 30 wheel turns, `tools/perf-bisect.js`): **no clear change**: four runs measured 127 to 455 ms of blocking time (round M: 120 to 830 ms); the spread on this machine is larger than any difference between builds.
- **The client's single file** (`client/export.py`, `client-test.js`): opens offline from the disk, dark, no notes, the font and 67 pictures inside, no failed request.

### Honest notes (round N)

- **The card is taller than round M's** (about 0.55 wide to high on a desktop; round M's was 0.75): the words are under the picture now, so a section of two rows is about 1100 px at 1920 × 1080. `posterRatio` (up to 1.2), `listCols` and `secRows` are the settings if the owner wants it shorter.
- **A picture is cut a little** (a 3 : 4 frame, a 2 : 3 poster: a 11 % cut from the foot; a banner is shown whole over a soft copy of itself): `posterFit` has the other two choices.
- **`round()` and `container-type`** (Chrome 125 / 105, Safari 15.4 / 16, Firefox 118+): without them the curves are still drawn from the plain lengths, and the price and the button stay side by side on a narrow card.
- **Only Chromium was used** (no iOS Safari, no Firefox, no real touch screen).
- **The seats' page keeps a sideways scroll on a touch screen** for a wide section (a seat of 34 px is the smallest a thumb should be asked to press).
## 10.9 Round O: a dotted background behind a program's pages, the poster seen, the buyer chooses the seats, the phone checked in its own box

**What the owner said** (one message, with a picture of a plain, regular grid of dots on white): the pages inside a program (the show, the seats, the payment, the ticket) are tidier than before but still have **too many empty places**: *put a background like this grid, but not the same everywhere, not in order, faded in some places and not in others, in the black-and-white theme, changing very calmly by itself, and never, ever hurting the site's speed*; the **poster becomes very small and is not seen**, make it seen *much* better; **remove entirely** the box that searches for an empty seat by itself, *the buyer chooses the seat*, and try to improve the arrangement and add ideas; **the phone's check must not open a separate frame** (it is not even seen): in the box where the number is typed put a «verify» button beside it, and when it is pressed *the number goes with an attractive animation and the same box fills with squares for the code, with a line under it* (my choice of words); **whoever verifies a number is logged in to the account at once**; and *«the home page is perfect now, the cards are excellent, do not touch the home page at all»*.

**Two more messages in the same round** (they came while this was being built, and were done last, as asked): *«make the maps run properly; the locations: you must put them right»*, then *«put Google Maps itself; no map of your own; forget Neshan and Balad and the rest, only the genuine Google map, and write nothing under the map; only the maps I gave you, for their halls, and be careful not to put one wrong»*; and *«keep only the cities that have a hall in them; take the other cities out of the location»*.

**The home page was not touched** (Rule 0, and the owner's last sentence): its panels are pixel-identical to the approved version, the cards pass the same audit as in round N, and a check reads that nothing of the dotted background is on it (§ «Checked» below).

### «The best seats» is gone

The show page has the rules line and **one** button, «انتخاب صندلی روی نقشه»: no stepper (`blit.qty` is no longer read or written), no estimate, no second button, no quick buy (`buy.quick` is deleted). The seats' page has no «find» box: `best()`, `bestN`, the box's markup, its styles (`.sm-best`, `.sm-bn`, `.sm-s.is-best`, `@keyframes smBest`), its words in the first-time guide and in the tour are gone; the guide says «صندلی‌های رنگی رو خودت انتخاب کن». A press on the show page's button still asks the rules first (Esc leaves everything as it was) and then opens the map with **nothing chosen and nothing held**; the hold starts at «ادامه» on the seats' page, as before. `m-flow-test.js` asserts that none of it is left (no `[data-go="best"]`, no `#evpQty`, no `buy.quick`, no `buy.best`, no `bestN`).

### The phone's box (`buy.phoneBox`; the styles at the end of `buy.css`)

One frame, one height (`--ph`, 48 px or more) in every stage, so nothing jumps:

| stage (`#bkOtp[data-stage]`) | what is in the frame |
|---|---|
| `idle` | the number and, in the same frame, the button **«تأیید شماره»** (the line under it says the check is optional, or, for a busy show, that it is needed) |
| `code` | pressed: the number slides away (46 px, 0.5 s) and five squares come in its place, one after another (60 ms apart, 0.55 s, a spring-like ease); the cursor goes to the first square after 0.46 s (never over a buyer who is already typing); the line under it says «کد تأیید به ۰۹۱۲•••۴۵۶۷ پیامک شد؛ لطفاً همین‌جا واردش کن (برای آزمایش: ۱۲۳۴۵)»; «تغییر شماره» and «ارسال دوباره‌ی کد» (90 s) are under the frame |
| `ok` | the frame turns green and says «✓ تأیید شد»; the buyer is **signed in** at once (`auth.in(phone)`: the header says «حساب من», a toast says so, the line says «شماره تأیید شد و وارد حسابت شدی.») unless the account is already that number |

The code is checked when the fifth square is filled (a paste fills all five; Backspace goes back; the demo code is `12345`); a wrong code shakes the frame, says so and clears the squares. A number verified in this visit (`sessionStorage blit.otpOk`) or the signed-in account's number is verified at once; a changed number is checked again (the old page let a changed number through); a show that asks for the check (busy shows, or `otpMode: always`) still cannot be paid for before it. The part that is not shown is `inert`; the frame is a group named by its label; the line under it is a live region; with reduced motion the slide and the pop are a plain change of opacity. The name field is **under** the phone's box now (a column: the squares need the room, and a half-width column made the two fields unlevel).

### The dotted background (`dots` in `page.js`; `.evp-dots` in `page.css`)

A fixed `<canvas>` (`z-index: -1`, inside `#app` before `#evp`, so no stacking context is made; `pointer-events: none`; `aria-hidden`), shown only while the page is a **show, seats, pay or ticket** page (`html.has-dots.is-page`), never on the home page, and not on paper.

| | |
|---|---|
| **scattered, not a grid** | a seeded jittered grid (46 px apart, the jitter 115 % of a place) in which a place gets a dot with the chance `0.8 · density + 0.24`; the density swells and thins over the page, so a good part (about 30 %) of the places is empty: about **740 dots** on 1920 × 1080 (310 on 1100 × 760) |
| **uneven** | sizes `0.9 + r² · 1.7` px, and 4.5 % of the dots are big (2.1–3.5 px): 25 different sizes in a window |
| **faded here, not there** | four soft patches of light wander over the page (a lap of 80–130 s, a Gaussian of 0.2 of the window's long side); a dot's alpha is the floor (0.15) plus the patches over it, times its own alpha and a slow breathing: in a window 41 % of the dots are faint (< 0.25) and 29 % strong (> 0.45) on the dark theme (51 % and 16 % on the light one, whose top alpha is lower) |
| **the page's own colour** | `--fg`: white on the dark theme (alpha up to 0.74), black on the light one (up to 0.60); a change of theme is drawn again at once |
| **calm** | a second later the picture differs by 1 % of the range, four seconds later by 3 %, a minute later by 16–20 % |
| **cheap** | the dots go into 12 alpha buckets, one path each: a draw takes **0.3–0.6 ms** (three a second are 0.12–0.17 % of the time); it is drawn about **3 times a second** (every 330 ms, a second when a draw averages more than 5 ms), **not at all while the tab is hidden**, not after the page is left, **once only with reduced motion**; no long task while it runs; it fades in over 1.6 s |

`dotsPow` (0–150 %; 7 since round T, it was 100) makes the dots fainter or stronger and `pageDots` turns them off (§11).

### The poster is seen

| page | poster before | now (1920 × 1080 · 1440 × 900 · 1280 × 720) | a phone (390) |
|---|---|---|---|
| the show | 162 × 214 px (smaller on a laptop) | **301 × 402 · 226 × 300 · 201 × 266** | 92 wide → **143 × 190** |
| the seats' map | 40 × 60 px in the bar | **136 × 181 · 110 × 147 · 87 × 116** (a card on the map's top row) | 34 × 51 → **58 × 87** (in the bar) |
| the checkout | 58 × 86 px | **132 × 177 · 111 × 148 · 111 × 148** | 111 × 148 |
| the tickets | 67 × 101 px | **130 × 173 · 97 × 130 · 93 × 124** | not on the vertical pass (as before) |

(The sizes are those of the sample photos, which are 3 : 4; a 2 : 3 poster, like the owner's, is narrower at the same height.)

Each frame has the picture's own shape (`--ps`), so there are no bars round a poster of another shape. The frame has that shape **from the first paint**: the sample photos are 3 : 4 while their data said 2 : 3 (the data's 2 × 3 only shapes the stand-in drawn for a missing file, which the home page's cards use, so it was left as it is), and a frame that grew 12 % when the picture came moved the title beside it (a layout shift of 0.018 at 1440 px once the poster was big). The sample photos' data now carries the file's own shape (`nat`, read by the show, seats, pay and ticket pages), and the shift is 0.

### What each page did about its empty places

1. **The show's page.** The column is `max(1180px, 74u)` (1421 px at 1920; it was 1190). The cover holds the **big poster** (the 3-D tilt is kept), the name and, under it, the three facts (the days, the hour, the hall with its address; a phone keeps them in the information panel, a desktop does not repeat them there). The **prices moved under the booking card**, so the side column is as tall as it needs to be. On a big window **the words and, under them, the place with its map are one under the other** (`evpPlace: inline`, headings in place of the tabs): the information panel is no longer an empty card; a tablet or a phone keeps the two tabs. The side follows the page (sticky) on windows 800 px high or more and scrolls with it on shorter ones. A tablet (one column) has the nights on one side of the booking card and the rules and the button on the other: no strips a thousand pixels long.
2. **The seats' page.** The map's panel starts with **a row of three**: the show (its poster, its name, the hall, the night), the hall's **overview as wide as the hall is** (`--oa` is the plan's width ÷ height; it was a strip 1250 px long with a drawing 160 px wide), and **the guide** (what each of the four colours is, a line each; it moved up from under the map). Then the sections' tabs with the price chips, the section's title, the seats. The row is `clamp(140px, 19svh, 236px)` high; on a phone it is the overview and one line of colours, and the bar's poster is bigger.
3. **The checkout.** The column is 1200 px; the summary has the poster, big, beside the name, the night and the hall.
4. **The tickets.** A bigger poster in each pass; the name is a size smaller so it does not wrap to three lines.

### The location map is Google Maps itself

The block (`locBlockHTML` in `hallslib.js`; on the show's page, the hall's page and the admin's preview) is **one Google Maps frame** (`https://www.google.com/maps?q=<lat>,<lng>&z=16&hl=fa&output=embed`, no key) at **the point the package gave for that hall** (`hallLoc(h)`: its own `loc`; the admin's change of it is the only other source) and **nothing else**: no tiles or drawing of ours, no route buttons (Neshan, Balad, Waze, the coordinates), no caption under it (the name and the address are in the cover's facts); the tab and its heading say «مکان». The frame is given its address when its block comes near the screen **and the page is idle** (Google's map is heavy; it is `loading="lazy"` too); with `?notiles` (the tests) no frame is asked. A hall with no position has no block and **no words** (the eight: 154, 84, 195, 176, 186, 114, 146, 177).

**Where the page may not frame Google** (the claude.ai preview does not let a page frame other sites) the frame is replaced by **one link**, «باز کردن در Google Maps», at the same point (the browser's `securitypolicyviolation` event says so; nothing else is written). A vector map of our own, built from OpenFreeMap's tiles so that it needed no outside request, was made first and **taken out again at the owner's word**: nothing of it is in the page or the repository.

*Checked* (`o-map-test.js`): all 147 halls (139 frames, each at its own point and with the link at the same point, no word but the link's, nothing of another service; the 8 with no position have no block), the 39 shows that have a hall (each shows its own hall's point), a hall's page, the preview's fallback, the admin's new, removed and reset positions, and, with the network on, that the frame really asks Google for that point. The positions were also read against the map's own data: **84 of the 139 have a place with the hall's own name within 250 m, and the rest are in the right city; none was changed** (they are the package's).

### Only the cities that have a hall

The visitor's lists (the header's city picker, the search window and the results, the city pages, the saved filter) hold **the cities that have at least one hall** (`cityHasHall`, `citiesShown` in `hallslib.js`): **63 of the 487 cities**, in 22 provinces, with the package's 147 halls. The picker says «شهرهایی که سالن دارن»; a search that finds nothing says only those cities are in it; `#/city/<a city with no hall>` says «هنوز سالنی نیست»; a saved filter for a city that has no hall (any more) is dropped. **The admin's list keeps every city**, so a first hall can be added to any of them: a city with no hall says «سالن نداره؛ تو فیلتر نیست» in its row, the chips count what the buyer sees, and a first hall brings a city in at once (the deletion of its last one takes it out). BRIEF item 19 (2) («all the cities in the filter») is replaced by this. `o-cities-test.js` checks it (13 checks).

### The look: new choices (§11)

`pageDots` (on), `dotsPow` (7 % since round T; it was 100 %), `evpPlace` (`inline`; `tabs` brings back the tabs on a big window): the panel's «چیدمان» tab, the group «صفحه‌های برنامه (اجرا، صندلی، پرداخت، بلیت)».

### Checked (round O)

- **The whole regression**, 23 suites on the final build (buy, m-flow, seatprice, smnav, map, salesmap, queue, pages, ui, poster, six, tour, look, o-dots, o-layout, o-cities, o-map, geo, search-places, admin-geo, integrity, halls, content): all pass, no script error. One check failed on the second day and it was the check's fault, not the page's: m-flow's «the pocket's corner is one flat colour» read a 12 px square whose left edge touched the date's digit, and the digit's edge moves with the day's number (which follows the clock); the round N build gives the same 9 colours on the same day. The square is 8 px now, and all six cards of the concert section give one colour on both builds.
- **The dotted background** (`o-dots-test.js`, 37 checks, dark and light, 1920 × 1080 and 1100 × 760): 737 dots on 69 % of a loose grid's places; 25 sizes from 0.9 to 3.5 px; the gaps to the nearest dot vary by 41 % (not a lattice); alpha from 0.01 to 0.71 (dark: 41 % faint, 29 % strong) and to 0.58 (light: 51 % and 16 %); a second later the picture differs by 0.8–1.0 % of the range, four seconds later by 2.9–3.5 %, a minute later by 16–20 %; a draw takes 0.4–0.6 ms (three a second: 0.13–0.17 % of the time), 11 draws in 3.6 s and no long task; a hidden tab draws nothing and it goes on when the tab is back; the home page has no canvas and nothing is drawn for it; none on paper; with reduced motion one draw only (0 draws in 3 s).
- **The layouts** (`o-layout-test.js`, 44 checks at 1920 × 1080, 1440 × 900, 1280 × 720 light, 1024 × 768 and a phone of 390): nothing is wider than the window; the posters are the sizes of the table above; the show's main column is never shorter than its booking card (50–165 px longer); the seats' top row is full (98–99 %) and the first seat is at 622 / 506 / 468 / 451 px; the payment's column is 1200 px; the tickets show both passes.
- **axe-core** (WCAG 2.1 A and AA): 26 routes in both themes at 1440 px and on a phone, and 46 open states (the windows, the dock, the rules asked, the seats' page, the payment with the discount open, the phone's box in its code and verified stages, the continue pill): **no violation**. The first run showed six contrast findings on the home page's «soon» cards (the countdown: 4.0 : 1 and 3.7 : 1) and, in one state, two more: each was a card caught half-way through its fade-in (the colour is read at a part of its opacity). The audits now wait for the page's own animations to end, and at rest the colour is the full one (white or `#110e1a` at 0.7 and 1); nothing of the cards was changed.
- **The crawl** (every page, both themes, desktop and phone): no console error, no failed request (what Google's own map frame asks for is not counted: the frame is Google's page), no overflow, no broken picture; 353 links, none to nowhere.
- **The home page was not touched**: the hero's panels (the banner and the facts) are pixel-identical to the approved version at six window sizes (the pill look; 0 differing pixels); the cards pass the audit (312 cards at 8 sizes in each theme, 0 problems, as in round N); the pocket corner of the cards is flat on the round N build and on this one; no dotted canvas is on the home page (checked in the tests).
- **Layout shift and speed**: the show, the category and the seats' pages 0 (the sample show's page was 0.018 at 1440 px until the photos' shape fix; one phone page shows 0.0007, from text); first loads 0.000; the seats' page 0.003 on a desktop and 0.007 on a phone (the page transition). The list's scroll cost (CPU × 4) was measured on the round N build and on this one, one after another on the same machine, four runs each, twice: the total blocking time of the downward scroll is 248–799 ms for round N and 291–1096 ms for this build (medians about 460 and 445 ms), long tasks 18–28 and 13–41. The machine's own noise is as large as the difference, so no change can be claimed either way; nothing of the new pages is on the home page's scroll.
- **The client's single file** (rebuilt from the same parts; 6.2 MB, 52 pictures, 3 font files): opened from the disk with no network it is dark by default, has no design notes, carries the font and GSAP, every picture is embedded (67 of 67), the theme button and a reload keep the choice, no script error; the one request that fails offline is the Google map frame (it needs the network).

### Honest notes (round O)

- **The dots are quiet by design**: they are behind the panels, so they are seen between and round them (mostly in the margins of a big window). `dotsPow` makes them stronger.
- **A tall window asks Google for the map by itself** (`evpPlace: inline`: the place is under the words, and its frame gets its address when it is near the screen and the page is idle; Google's map is a heavy page from Google's servers, as any embedded Google map is). `tabs` brings back the old way (the frame is asked for only when the tab is opened).
- **The Google frame itself could not be seen in the preview or checked pixel by pixel here**: the claude.ai preview does not let a page frame another site (hence the one link), and in the test browser Google's own sub-requests are cut by the sandbox's network. What is checked is that every hall's frame asks Google for exactly that hall's point and that, with the network on, Google answers the first request for it; the first look at the real frame is on a real site.
- **The seats' page's first row is lower** by about 70 px at 1080 (the first seat at 622 px of a 1080 px window; 506 of 900; 468 of 720): the top row is the price of the seen poster and the guide.
- **The check is a demo**: the code is `12345` and no SMS is sent; the real gateway and SMS panel come with the server.
- **Only Chromium was used** (no iOS Safari, no Firefox, no real touch screen); a wide section of the seats' page still scrolls sideways on a touch screen.

## 10.10 Round P: the pages inside a program end again, and the road to a ticket shows itself

**What the owner said** (one message): *inside a program there used to be an ending, a footer, and now it is gone: give it an ending, do not just leave it*; *the emptiness is better, but there is still room to make the pages more professional, smoother and fuller, so that someone who does not understand still sees the road to a ticket and how to choose the seats; and do not keep writing «do this and do that», make the road plain for the buyer; it is good now, but it can be better*. And, mid-round: *continue, and do the rest of what I asked*.

**The home page was not touched** (Rule 0 and round O's «do not touch it»): its panels are pixel-identical to the approved version and its cards pass the same audit (§ «Checked» below).

### The footer: it was there, and nobody could see it

The show's page and the fixed pages (rules, about, the archive, a category, a city, the hall's page) did carry a copy of the list's footer, but the copy **kept the list's «waiting to be revealed» state** (`rv-wait`: opacity 0, its room kept in the layout) whenever the list's own footer had not been scrolled into view yet, which is how most buyers arrive (they press a card). So the page ended in an empty stretch of the page's height. The seats', the payment's and the ticket's pages never had one.

Now `page.addFooter()` (`page.js`) puts **a clean copy after the page's column**, as a sibling of `.evp-in` inside `.evp` (a flex column of at least the window's height): a short page has its footer **at the bottom of the window**, a long one at its **end**, and it is as wide as that page's own column (the show's, the map's 1440–1650, the payment's 1200, the tickets' 1340). It is called by the show's page, the three steps and the fixed pages; it is not printed with the tickets; on a phone, where the seats' and the payment's pages have a fixed bar at the bottom, the footer keeps room under its last line (`.evp:has(.bk-bar)`).

### The seats' page: guided by what it shows, not by sentences

| before | now |
|---|---|
| a bar of orders on a first visit: «سه قدم تا بلیت: ۱) … ۲) … ۳) …» with «فهمیدم» | **gone**. One free seat near the middle of the section on show is **ringed, and a small finger taps it** (CSS only: `.sm-s.is-coach`, `smCoach`, `smFinger`), until the buyer touches the map; a first seat chosen ends it for good (`blit.tipSeat`) |
| the empty cart: a sentence («روی صندلی‌های آزاد نقشه بزن …») | **two dashed place-holders** that the chosen seats replace (one hidden line is kept for a screen reader) |
| the button: «ادامه و رزرو صندلی‌ها» always | the button **says what goes on**: «ادامه با ۲ صندلی» (or «بلیت» for standing places); the first seat makes it pulse twice (`is-pulse`) |
| a sentence under the button («با «ادامه» صندلی‌ها ۱۵ دقیقه برات نگه داشته می‌شن …») | **three small lines with icons**: ۱۵ دقیقه نگه‌داری صندلی‌ها · تا ۱۰ صندلی در هر خرید · پرداخت امن بانکی |
| price chips above the map; the left column empty under the cart | on a wide window **a panel «قیمت‌ها» under the cart**: the price tiers as a legend that **is** the filter (colour, name, price, how many seats are free, live), the chips above the map are not shown; on a narrower window (under 1100 px or a portrait window) the chips stay and the panel is not shown |
| the section on show scrolled inside a box of its own (`max-height: min(64svh, 760px)`), which hid the back rows | the section shows all its rows; **the page scrolls** and the cart and the prices follow it (a phone and a touch screen keep the sideways scroll of a wide section) |

### The show's page: the hall, in the colours of its prices

The prices' panel (under the booking card) starts with **the hall, small, every seat in the colour of its price** (`page.priceMap`, drawn from the same plan as the seats' page, `seatPlan`): the buyer sees where the cheaper and the dearer seats are before choosing, and the list under it is the legend. It is drawn once, **when the page is idle**, on a canvas in a box of a fixed 16 : 9 shape, so **nothing moves when it comes** (the panel is the same height before and after); it uses colours that read on both themes; a show with no session (one that sells elsewhere) has no box.

### The payment, and the steps' bar

- Under «روش پرداخت»: a panel **«بعد از پرداخت»** with three small steps and icons: تأیید پرداخت (همین‌جا، بدون انتظار) → پیامک بلیت (به شماره‌ی تو) → QR دم در (روی گوشی یا چاپی). The payment's right column used to end 82 px above the left one (an empty stretch under it); with the panel it ends 69 px below it, and the page's end is the footer.
- **The steps' bar says what was chosen**: on the payment's and the ticket's pages a step that is done has a second line (the night; the number of seats; «پرداخت شد»). On the seats' page (the bar already holds the night) and on a phone the second line is not shown.

### The look: nothing new

No new setting. The footer follows the page's theme; `evpPlace`, `pageDots`, `dotsPow` (§11) are as in round O.

### Checked (round P)

- **The whole regression**, 24 suites on the final build (the 23 of round O and the new `p-test.js`): all pass, no script error. Three older checks were changed with the page (m-flow's phone pay bar, buy-test's price filter; see the honest notes).
- **`p-test.js`** (35 checks): a show's page opened straight from a link ends with the footer, seen (opacity 1, one copy, after the page's column); the footer's link opens the rules page which ends with it; the seats' page, the payment and the ticket pages end with it; it is not printed; on a tall window a short page has it at the bottom of the window; the first-time bar of orders is gone and one free seat is ringed with a small finger, ended by a touch and, for good, by a first seat; the cart is two place-holders with no sentence; the button says «ادامه با ۲ صندلی»; the three facts; the prices' legend (count of each price against the plan's own, the filter, the chip that follows, the chips not shown on a wide window and the legend not shown on a narrow one); the section has no box with a scroll of its own; the show's page draws the hall in the colours of its prices without moving anything (the panel is 434 px before and after) and so do the halls of three more shows; the payment's «بعد از پرداخت» and the steps' bar with what was chosen (on the payment's and the ticket's pages); on a phone nothing is wider than the screen, the footer is above the fixed bar on the seats' and the payment's pages, and the three small steps fit.
- **axe-core** (WCAG 2.1 A and AA): 26 routes in both themes at 1440 px and on a phone, and 46 open states (the windows, the dock, the rules asked, the seats' page, the payment with the discount open, the phone's box in its stages, the continue pill): **no violation**.
- **The crawl** (every page, both themes, desktop and phone): no console error, no failed request (what Google's own map frame asks for is not counted), no overflow, no broken picture; 353 links, none to nowhere.
- **The home page was not touched**: the hero's panels are pixel-identical to the approved version (d4cc53c) at five of six window sizes, and at 2560 × 1440 the only difference is the status labels of two cards of the rail («تمدید شد», «تمام شد»: the design has had them since round G, and that size shows more cards); against round O's build, drawn the same minute with the same look, **the whole page is identical** at five sizes and differs by two pixels at the sixth; the cards pass the audit (312 cards at 8 sizes in each theme, 0 problems). (The first comparison with round O's build showed differences: the check applied the pill look to one side only; with the look on both sides they are gone.)
- **Layout shift and speed**: the show, the category and the seats' pages 0 (with the footer and the price map added); first loads 0.000; the seats' page 0.003 on a desktop and 0.007 on a phone (the page transition). The list's scroll cost (CPU × 4), round O's build against this one, one after another on the same machine, four runs each, twice: the total blocking time of the downward scroll is 216–953 ms for round O and 220–932 ms for this build (medians about 530 and 375 ms), long tasks 20–31 and 16–27; the machine's own noise is large, and this build is not slower on this path (nothing of the new pages is on the home page's scroll).
- **The client's single file** (rebuilt from the same parts): opened from the disk with no network it is dark by default, has no design notes, carries the font and GSAP, every picture is embedded, the theme button and a reload keep the choice, no script error; the one request that fails offline is the Google map frame (it needs the network).

### Honest notes (round P)

- **Three older checks had to change with the page, not the other way round**: m-flow's «the pay bar steps aside on a phone» scrolled to the end of the document to find the invoice's button (the end is the footer now: it brings the button itself into view); buy-test pressed a price chip (on a wide window the legend is the filter; the chips are for the narrower ones); and the pocket-corner check of the cards, in round O.
- **The cue is a finger on one seat**, not a walk-through: a buyer who has never seen a seat map sees where to press, and the cart, the button and the steps' bar then say what happened; the first look of a real first-time buyer on a real phone is still to be seen on the real site.
- **The hall's picture on the show's page is a picture, not a map**: pressing it does nothing (the seats' page has the map that is pressed).
- **A page opened under a fixed bar on a phone** keeps 88 px under the footer; the footer's own links stay above it.
- **The footer's two trust badges** («نماد اعتماد الکترونیکی», «نشان ساماندهی») are still places for the real badges (as on the home page).

## 10.11 Round Q: the programs' pages filled without stretching, the logo goes home, the tickets leave the page as files, the panels finished

**What the owner said**: *everything is almost fine and nothing should be stretched, but the programs' pages have too much empty space: on the show's page bring the block with the program, the map and the ticket choice a little toward the left, and put the poster on its right side, so the programs' pictures live there; make the footer longer so that it takes the whole site from left to right, and the row of sample programs above it (two more programs) fill the full width; fill the emptiness of the next pages too, in a fitting way, without stretching anything, and do the same for the customer's own page (more compact, nothing stretched, the empty places filled); the logo in the header goes to the start of the home page; «add to calendar» and «print tickets» made right: the buyer can download them and keep them on the phone, as an image and as a PDF, or share them on social media; then check how much of what the client wanted is built and exactly what remains*. And, in a second message: *make the panels much more professional in spacing, arrangement and UI; curved shapes and small details make the work professional*.

**The home page was not touched** (Rule 0): every rule below is scoped to the pages inside a program (`.evp`) or to the fixed pages; its panels are pixel-identical to the approved version and its cards pass the same audit (§ «Checked» below).

### The show's page on a wide window: a column for the picture

On a wide window (`(min-width: 1600px) and (min-aspect-ratio: 5/4)`, the window the empty space was in) the page has **three columns** instead of two: the **picture** first (at the start of the line, the right), then the **words and the place**, then the **booking block** with the prices (moved toward the left, as drawn).

- `.evp-pic` (`page.js`): a sticky column of `--pic: clamp(300px, 19.5u, 480px)`. A show with a poster: the poster, whole, in its frame (the frame's shape is the poster's own, `--ps`). A show with only a banner: the banner shown whole on a blurred copy of itself (`.is-banner`), never cropped. Under it a panel with the three facts (the day, the hour and the length, the hall with its address): the cover's own poster and facts are not shown on this window (they stay on narrower ones).
- Nothing is stretched: the picture keeps its shape, the main column keeps its measure (`--fl: max(1180px, 74u + pic + gap)`), the booking block keeps its width.
- **The row of other programs** (`.evp-more`) shows **six cards in one row** on this window (`--cols: 6`, the seventh and later are hidden), all of one size, filling the row; on narrower windows it is as it was.
- **The footer** is as wide as the window (minus the page's side room) on every page inside a program (`.evp > .evp-ft`: `width: calc(100% - pad-l - pad-r)`), not as wide as the page's column. Its last line keeps clear of the «back to top» button.

### The payment, the ticket and the customer's pages

- **Payment** (`.bk-narrow.has-pic`) and **ticket** (`.evp-in.tkp.has-pic`) get the same picture column (`picAside(e, s)` in `buy.js`) on the wide window; the summary's own small poster is hidden there. The payment is three columns (picture, buyer and ways of paying, the bill); the ticket page has the picture beside the tickets and the «روز اجرا» panel. Narrower windows are as before.
- **The fixed pages and the customer's page** (`.evp-in.pg`): the way back, the head and the stats were as wide as the window while the page's column was narrower, which read as stretched; they are now as wide as the column (`max-width: var(--fl)`). The stat tiles are **one row each** (a small icon chip, the number, the words) instead of tall boxes with air in them; the head has two quick links (all purchases, the programs) on its far side; the columns end where their own content ends (`align-items: start`: no panel is stretched to its neighbour's height); the empty reminders are a small dashed state with a bell instead of a bare line. «NaN days ago» (a sign-in with no date) is gone.

### The logo

From any page inside the site (a program, the seats, the rules, the account, a panel) the header's logo **closes the page and shows the start of the home page** (`header.js`: `page.close({ then: scrollTo top })`); on the home page it scrolls to the top, as before.

### The tickets as files (`tkx` in `buy.js`)

A ticket page has a row of actions and each ticket has three small buttons under its QR (an image, a PDF, share):

| action | what it gives |
|---|---|
| **افزودن به تقویم** | a calendar file (`.ics`, `BEGIN:VCALENDAR` … `VEVENT` with the night as a UTC time, the hall and its address, the tracking code, and **an alarm two hours before**): opens in the phone's calendar |
| **ذخیره‌ی PDF** | a PDF (1.4, hand built, no library) with **a page for each ticket** (the ticket drawn as a JPEG, a valid cross-reference table); a single ticket's own button gives a one-page PDF |
| **ذخیره‌ی تصویر** | a PNG, 2400 px wide: one picture of all the tickets, or one ticket's own (2400 × 1040), drawn on a canvas (the card, the details, the QR in its white square, rounded transparent corners), so it keeps well on the phone and in the gallery |
| **اشتراک‌گذاری** | the phone's own share sheet with the picture **as a file** and the words (Web Share, level 2); where there is none (a computer), a small menu: Telegram, WhatsApp (the address of the ticket's page and the words), copy the words, save the picture |
| **چاپ** | as before (the page's print style; the new buttons are not printed) |

Nothing leaves the buyer's device: the picture, the PDF and the calendar file are made in the page.

### The panels' finish (inside a program only)

The panels (`.evp .panel`, not the cover) have **a fine light on their top edge and a thin inner line**, and **a layered soft shadow** (a close one and a long one) instead of one flat shadow; a theme-aware variant for the light theme. The headings of the booking and the side panels carry **an icon chip** (a rounded square in the show's colour); the booking, bill, cart and buyer panels have **an accent hairline** on their top edge; the poster has a soft glow in the show's colour; an active buy button has a coloured shadow. No new setting; no new colours (everything takes the show's own colour, `--sc`).

### The look: nothing new

No new setting. `evpPlace`, `pageDots`, `dotsPow` (§11) are as in round O.

### Checked (round Q)

- all 26 test suites pass with no failure, one after another on the final build (the new `q-test` and `q-tk-test`, then round P's `p-test`, buy, m-flow, seatprice, smnav, map, salesmap, queue, pages, ui, poster, six, tour, look, o-dots, o-layout, o-cities, o-map, geo, search-places, admin-geo, integrity, halls and content); after the last small change (a refused share sheet falls back to the menu) `q-test` and `q-tk-test` were run again: both pass
- `q-test.js` (26 checks: the poster column, three columns in the right order, the footer's width, six cards of one size in one row, the payment's and the ticket's picture column, the customer's page as a column, the panels' finish, the home page's panels without the finish, no sideways scroll at 2560, 1920, 1440, 1280, 1024, 768 and 390 px) and `q-tk-test.js` (16 checks: the logo from a show, a fixed page and the home page; the calendar file's contents and alarm; the PDF's pages and cross-reference table; the picture's size, its white QR square and transparent corners; a ticket's own picture and PDF; the phone's share sheet with a file; the menu where there is none, and where the sheet is refused)
- axe finds nothing on 26 routes and 46 states, both themes, desktop and phone; the card audit finds 312 cards and 0 problems in the dark theme and in the light one
- the QA crawl (every page, both themes, desktop and phone) finds no error, no overflow and no broken picture; 353 links checked, none to nowhere
- the hero's panels are identical to the approved version (`d4cc53c`) at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900 (the banner's and the facts' differing pixels: 0, with the pill look on both sides); the home page was not touched
- layout shift is 0 on the show pages (desktop and phone) and on the category page, 0 on the first load, 0.003 / 0.007 on the seats' page (the page change's own transition, as in round P); the list's scroll cost against the round P build, two runs each on one machine, is inside the same range (total blocking time on a fast scroll down 145–1068 ms against 261–926 ms: the home list was not changed)
- the client's single file was rebuilt (6.2 MB, 52 pictures, 3 font files) and its own test passes (every picture and font inside the file, the theme kept after a reload, the page opens, no script error; the only outside request is the Google Maps frame, as before)

### Honest notes (round Q)

- **Two older checks had to change with the page, not the other way round**: o-layout-test measured the show's own cover poster and the payment's small poster, which are not shown on the wide window any more (it measures the picture column there); the pocket-corner and price-chip checks of round P stay as they were.
- **The seats' page has no wide fill** yet: its map and its cart already take the page's width; a third column there would shrink the seats, which the owner has asked for big. If the owner still sees emptiness there, it is the next thing to look at.
- **Downloads and sharing cannot be tried inside the private preview page** (the viewer's frame blocks downloads and the share sheet); they are tried on the site itself and in the client's single file. On an iPhone the PNG and the PDF go to «Files» / the share sheet (Safari does not save to the gallery by itself); the calendar file opens the Calendar app.
- **A phone may refuse the share sheet** if the tap lapses while the picture is drawn (about a second); the buyer then gets the small menu (Telegram, WhatsApp, copy, save the picture), not a silence.
- **The Google Maps frame** (round O) shows only on a real site; inside the test browser and the preview it is an empty tile.
- **The first-time cue** on the seats' page (round P) was seen only in the tests; a real first-time buyer on a real phone is still to be seen on the real site.
- **The ticket's PDF is a picture of the ticket** (not selectable text): its QR is as sharp as the picture (2400 px wide), which scans from a phone screen and from a print.

## 10.12 Round R: the programs' pages fill the window; «بلیتِ تو», a living ticket under the booking card

**What the owner said** (one message): *the programs' pages are still empty at their sides; they must be fuller, not this empty: 75% of the emptiness must be filled; and under the part where we accept the rules and go on to the next step it is very empty, it spoils the eye: sit down, carry out a brilliant idea and fix it.*

**The home page was not touched** (Rule 0): every rule below is scoped to the pages inside a program (`.evp`); its panels are pixel-identical to the approved version (§ «Checked»).

### The emptiness, measured

`tools/r-empty2.js` measures a program's page: between the top of the columns and their end, across the **whole window's width**, the share that no panel, picture or ticket covers (a 12 px grid, three programs: one on sale with a plan, one sold out, one in presale with a banner; five windows).

| window | the round Q build | now |
|---|---|---|
| 1366 × 768 | 21% | 5% |
| 1440 × 900 | 25% | 5% |
| 1536 × 864 | 31% | 4% |
| 1920 × 1080 | 14% | 5% |
| 2560 × 1440 | 15% | 4% |

What is left is the gap between the panels (14 px) and the panels' rounded corners: **about 4.8%** is the floor of a page made of panels (computed from the gaps, the margins and the corners), so what could be filled **is filled**. On a laptop (1366–1536) the cut is 76–87%; on a big window the old page was already nearer the floor.

### The window: all of it, in three columns that end together

- **Three modes**, chosen by the window and kept by `page.modeNow()` / `page.place()` (the panels move between the columns when the window changes; nothing is drawn twice): `m-w3` (from 1360 px, landscape: the picture · the words and the place · the booking), `m-w2` (from 1100 px: the words and the place · the booking), `m-w1` (a tablet, a phone, a tall window: one column). The table is `SHOW_LAY` in `page.js`.
- The frame is the window's width (`--fl: min(100%, 2600px)`): the page reaches the header's edges; the booking and the picture keep their widths (`--side`, `--pic`), the words and the place take the rest. Nothing is stretched: every panel keeps its own shape; the columns are made to end together instead.
- **Every column has one thing that takes up what the others leave**, so there is no blank inside a stretched panel: the main column's **location card** and map (a map is fine bigger), the picture column's **list of other programs** (as many rows as fit; the rows that do not fit wrap out of sight and `fitRows()` makes them `inert`, out of the keyboard's reach), the booking column's **share** panel (its row of buttons stays in the middle of what is left).
- The prices' panel stands **wide in the main column** (the hall in the colours of its prices beside the tiers) on the two wide modes, and under the booking card on the narrow one.

### «بلیتِ تو»: the idea

Under the booking card (where the owner saw the emptiness) stands **a ticket drawn the way the real one is** (the dark stub with a QR, the perforation with its two notches, the show's colour and its picture blurred behind, a sheen that crosses it now and then), and it is alive:

| what the buyer does | what the ticket does |
|---|---|
| picks a night | its date **turns over** (`is-flip`) to that night |
| accepts the rules (the tick) | its **QR clears** (it was blurred behind a lock), the lock becomes a tick, **«آماده‌ی رزرو»** is stamped on it and a green light runs round it; taking the tick away locks it again |
| a show that cannot be bought (sold out, ended, cancelled …) | it is grey, **stamped** with the status («تمام شد», «برگزار شد» …), its QR locked |
| chooses seats (the seats' page) | its three boxes (section · row · seat) **fill** with the first seat and its top says «N صندلی» |
| goes on to the payment | the ticket stands under the bill with the same seats; the QR is still locked: «QR بعد از پرداخت» |
| (the ticket page) | the real tickets |

So the road is told by one object: the night, the rules, the seats, the payment, the QR. It leans toward a mouse pointer and catches the light (not on a touch screen, not with reduced motion). A screen reader gets one sentence that is rewritten with each change («نمونه‌ی بلیت تو: …، ۲۵ آبان ساعت ۲۱:۳۰، تالار وحدت. ۲ صندلی انتخاب شده؛ QR بعد از پرداخت می‌آد.»); its drawing is `aria-hidden`. The QR is a real QR of a sample text, never a scannable ticket. On a phone it is not shown (the page is already long). The class is **`ltk`** (the ticket page's own class is `tkp`; a first version with that name broke the footer and the ticket page: `liveTicketHTML()` in `page.js`).

### The new panels (real data only)

- **The hall at a glance** (`.evp-hall`): the hall's name (a link to its page), its city, **how many seats it sells, how many sections, how many price classes** (counted from the same plan as the seats' page, filled when the page is idle), «مسیریابی تا سالن» (Google Maps directions to the hall's own point, where it has one) and the hall's page.
- **Share** (`.evp-share`): Telegram, WhatsApp, copy the address, and **the program's nights as a calendar file** (`.ics`, one event for each coming night, with the hall and the address).
- **Other programs** (`.evp-same`): the hall's own first, then the city's, then the kind's, the soonest first; each row is the poster, the name, the day (with «همین سالن» or the city) and the price. It is also the end of the picture column on the payment and the ticket pages.
- **The location card** (`.lm-fb`, under Google's frame in every location block): where Google's frame cannot load (the private preview, a blocked network, the tests) the block is no longer an empty dark box but a card with the hall's name, its address, a pin with rings and the link to Google Maps; where the frame loads, the map covers it. It is not a map of ours (round O's rule): no coordinates are drawn.

### The seats', the payment's and the ticket's pages

- **The seats' page**: the window's width (`--fl: min(100%, 2400px)`); under the prices stands the ticket, filling as seats are chosen (the left column no longer ends where the cart ends).
- **The payment**: the window's width (the picture · the buyer, the ways and what comes after · the bill, 460–600 px); under the bill the ticket with the chosen seats; **the phone and the name stand side by side** (a field a thousand pixels long is a stretched field); the picture column ends with the other programs, level with the rest.
- **The ticket page**: the page's tips («روز اجرا») are **three tiles with an icon** instead of three lines in a wide panel; the picture column ends level with the page, with the other programs under the poster.

### The look: nothing new

No new setting. `evpPlace` (the place's tabs or inline), `pageDots`, `dotsPow` (§11) are as before; the sticky booking card of the older two-column page is gone on the wide modes (the columns end together, so there is nothing to float over).

### Checked (round R)

- 27 test suites: the first run on the day's build passed all but three (`p-test` and `m-flow-test` assumed the old two-column page and were changed with it; `o-map-test` caught words in the location card, against the owner's rule, and the card became a wordless drawing); after that the seven suites that touch these pages (`r-test`, `p-test`, `m-flow-test`, `o-map-test`, `o-layout-test`, `q-test`, `q-tk-test`) were run again on the final build and all pass; the other twenty were run on the build before the card's words were taken out (the card is the only difference between the two builds)
- `r-test.js`, 36 checks: the three columns end together at 1920 and at nine windows from 2560 to 390 px; the whole width; the living ticket under the booking card, its date turning over with the night, its QR clearing and its stamp falling with the rules and locking again when the tick goes; a sold-out show stamped; the hall's numbers and its way; the other programs' rows that fit and the rest out of the keyboard's reach; the share's four controls; the nights' calendar file; the location drawing with no words; the panels moving when the window changes and back; the seats' ticket filling with the chosen seats; the payment's ticket, its width and its two fields side by side; the ticket page's three tiles; the light theme
- axe finds nothing on 26 routes and 46 states, both themes, desktop and phone; the card audit finds 312 cards and 0 problems in the dark theme and in the light one
- the QA crawl (every page, both themes, desktop and phone) finds no error, no overflow and no broken picture; 353 links checked, none to nowhere
- the hero's panels are identical to the approved version (`d4cc53c`) at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900 (the banner's and the facts' differing pixels: 0, the pill look on both sides); one run showed 893 differing pixels in the facts panel at 2560 (an animation frame caught at another phase) and the next run showed 0 at all six; the home page was not touched
- layout shift is 0 on the show pages at 1920 (on sale and in presale), 0.0006 at most on the sold-out one (a text node), 0.0002 on a phone, 0 on the first load; 0.005 / 0.007 on the seats' page (the page change's own transition, as before); the list's scroll cost against the round Q build, on one machine, is in the same range (total blocking time on a fast scroll down 260–1077 ms for the round Q build in two runs, 279–888 ms for this one in the one run that finished; the second run of this build hung and was stopped: the home list was not changed)
- the client's single file was rebuilt (6.2 MB, 52 pictures, 3 font files) and its own test passes (every picture and font inside the file, the theme kept after a reload, the page opens, no script error; the only outside request is the Google Maps frame, as before)

### Honest notes (round R)

- **The 75% is of what can be filled**: the measure counts a panel as covered even if its inside has air; a panel is never stretched to a neighbour's height (the last panel of a column takes the rest with its content: the map, the rows, the buttons' row), but a show with very little to say still has panels with some air in them.
- **Four older checks had to change with the page, not the other way round**: `p-test` (the prices' picture is no longer 16 : 9 on a wide window: it takes the height of the tiers beside it), `m-flow-test` (its desktop window is now 1280 × 800, the two-column mode, and says that the columns end together instead of «the booking card is sticky»), `o-layout-test` and `q-test` where they measured the old column widths.
- **Opening Telegram / WhatsApp, saving the calendar file and the Google frame cannot be tried inside the private preview page** (its frame blocks new windows, downloads and Google); they are tried on the site itself and in the client's single file.
- **The hall's numbers** (seats, sections) are the plan's, i.e. what the seats' page sells (a seat the organiser marked «not for sale» is not counted); they are not a figure from the hall's library.
- **The seats' page**: its left column (cart, prices, ticket) is taller than a window of 950 px; its sticky behaviour keeps the cart in view, the ticket below it shows when the page is scrolled to the end of the map. If the owner prefers the ticket above the prices, that is a one-line move.
- **A real first-time buyer on a real phone** has still not been seen on the real site; the phone shows no ticket and no list of other programs (the page and the row of cards under it are as before).

## 10.13 Round S: the pages inside the site rebuilt (luxury, tidy, nothing stretched), the desks as an app, every size checked

**What the owner said** (one message): *I do not like it at all; it feels messy. I want it luxurious, professional and modern. Review everything once and, with professional, modern, new ideas, reorganise the sub-pages and make them stronger. The home page is about right (its frames, the banner part; only I do not know the right banner size); if needed make its small details more professional. Make the sizing right everywhere: not stretched, placed professionally. The main problem is the sub-pages: sizing, arrangement, stretching, crowding, untidiness. Except the home page every page needs work; in some places the structure and even the shapes should change. You did not put the map system in: can't Google Maps be shown locally? Responsive is broken everywhere, even the home page. The panels' UI is useless, and in some places they could be more complete. Sit down and fix everything.*

**The home page's desktop was not touched** (Rule 0): its panels are pixel-identical to the approved version (§ «Checked»). Its phone and tablet layout changed (below).

### One idea instead of many panels

Rounds Q and R filled the program's page with more and more panels (a picture column, «بلیتِ تو», share, the hall at a glance, other programs, three layouts that moved panels between columns). The owner saw the result as crowded. Round S **removes all of that** and builds the page from two pieces:

1. **The stage** (`.lx-stage`): a dark, cinematic band the width of the window (up to 2400 px). Behind it the show's own picture, blurred and drifting slowly, under two gradients and a soft glow in the show's colour. On it, from right to left: **the poster** (or the banner, wide), **the name** with its kind, three **facts** as chips (the nights, the time and length, the hall), two round buttons (**save**, **share**), and the **booking card**: a frosted glass card (`backdrop-filter`) with the price, the nights, the rules' tick and the one big button.
2. **The information row** (`.lx-info`, a 12-column grid): **about** and **the prices** on the right (7 columns), **the place** on the left (5 columns, two rows): the hall, its address, its numbers, «مسیریابی», and Google's own map in a frame at the hall's point. A hall without a point has no place block; the row is then about and prices side by side (`no-place`).

The share button opens the phone's own share sheet on a touch screen; elsewhere a small menu (`menuPop`): Telegram, WhatsApp, copy the address, the nights as a calendar file (`.ics`).

| window | the stage | the booking card |
|---|---|---|
| ≥ 1100, landscape | poster · name and facts · card, in one row | 340–470 px, on the stage |
| 761–1099 or upright | poster and name in one row | the whole row under them, two columns inside (nights · rules and button) |
| ≤ 760 (phone) | poster beside the name, facts under them | the whole row, one column; a bar at the bottom when it is out of sight |

### The seats' page

- The show's card inside the map panel (a repeat of the bar above it) is gone. The legend is **one quiet line** beside the sections' tabs (four states: yours, being paid by others, sold, not for sale).
- **The hall's overview is a panel of its own** (`.bk-ov`, «نمای کلی سالن», tap a section) beside the map, above the cart and the prices. In one column (a phone, a tablet, a tall window) the order is **overview → map → cart → prices**, and the overview is a band 150 px high on a phone and 190–300 px on a tablet (it was as tall as the hall's shape: 570 px on a 768 × 1024 tablet).
- The page is the window's width (up to 2400 px); the side column is 320–410 px.

### The payment and the ticket pages

Back to calm, centred pages (the payment 1200 px, the ticket 1340 px): the picture column and the living ticket are gone; the buyer's details, the ways to pay and the bill side by side; on a phone the details first, then the bill and a pay bar at the bottom.

### The fixed pages (account, wallet, receipts, rules, about, contact, halls, gate …)

- **One frame for everything on a page** (`--fl: min(100%, 1320px)`; the pages that are lists of programs take the window like the home page's list). Before, the head band was narrower than the body under it.
- The head band has a soft glow in the page's colour; every box's heading has the same **icon chip** as the purchase pages.
- In one column (a phone, a tablet) **the main column comes first and the side second**, each box the column's whole width (the help box stood above the search on the receipts page, the history above the balance in the wallet, and the account's details box was 70% of the column).

### The desks (organiser, admin)

- **An app's shell**: inside a desk the site's categories and city picker step aside; the open tab has an accent background and a bar; tiles carry a soft glow; tables have calmer padding.
- **Charts are drawn at the size of their box** (`viz.columns(…, { w })`): on a wide window their numbers were blown up.
- **No half-empty boxes**: the organiser's «latest purchases» starts with the last seven sales, as many as it shows (it waited for the next live sale, empty); every admin tile has a second line (the refunds' sum, «N در حال فروش · M پیش‌فروش»); the admin's queue box lists who waits; boxes in one row end together.
- **On a phone**: every table is a list of cards (each cell with its heading as a small label, taken from the table's head and kept up to date by a `MutationObserver`); a table longer than 12 rows shows 12 and a button «همه‌ی N ردیف» (the orders' 60 cards made a page 16 000 px long); the tab row scrolls, fades at its edge and brings the open tab into view; a tile never sits alone in a row.
- **The gate**: its three steps keep their order on a phone (the third came first).

### The home page on a phone and a tablet

- The hero's old floor of 600 px is gone: on a phone the hero is the banner (16 : 9 of the width), the facts and the rail, nothing more (512 px on a 390 × 844 phone; the banner starts 18 px under the header, it was 64).
- Inner pages have no floating «back to top» button on a phone (it covered the booking bar).
- The footer is two columns on a phone (the brand and the last column take the whole row).

### The map

Google's map works **locally**, without a server of ours, whenever the computer has internet: the frame `https://www.google.com/maps?q=<lat>,<lng>&z=16&hl=fa&output=embed` was loaded through the real network (`tools/s-gmap.js`) both from the served page and from the client's single file opened from the disk (`file://`), and shows the real map at the hall's point. It is blocked **only inside the private preview page** (claude.ai's frame does not allow Google); there the block shows its wordless drawing and «باز کردن در Google Maps». Nothing has to wait for the server.

### The banner's size (the owner's question)

The banner's frame takes what the window leaves: about **1553 × 893** at 1920 × 1080 (1.74 : 1), 1603 × 775 at 1920 × 937, 1630 × 709 at 1920 × 860 (2.3 : 1). A banner within 2.5% of the frame's shape fills it exactly; otherwise it is cut a little at two sides. **Advice: design banners at 1740 × 1000 px (or 2560 × 1471 for big screens) and lock the frame's shape** (Settings → Layout → «شکل کادر بنر» → 1740 × 1000), so every window shows the whole banner; keep words and faces 4% from the edges (the slow zoom of 5%).

### The look: nothing new

No new setting. `evpPlace` (the place's tabs or inline) is gone with the old page.

### Checked (round S)

- `s-test.js` (new, 40 checks): the stage and the information row (about and prices level with the place at the top and the bottom); ten windows from 2560 × 1440 to 360 × 740 with nothing wider than the window (the stage in a row from 1100 px, stacked below); Google's frame at the hall's own point; the share menu; the road from the show to the seats, the payment and the ticket; the seats' page tidy (one legend line, the overview panel, no repeated card); a banner show and a sold-out show; seven fixed pages each in one frame; the desks' shell and charts drawn at their box's size (× 1.00); the phone's hero without the empty band (512 px, the banner 18 px under the header); no floating button on a phone's inner page; the footer in two columns; nine phone routes with nothing wider than the screen — ALL OK.
- 26 test suites on the day's build (`tools/final-checks-s.sh`): 25 passed whole; `p-test` caught the prices' panel growing 5 px when the hall's numbers came (the numbers' line was hidden and appeared: now its line is kept from the start), and passed after the fix, with `s-test` and `m-flow-test` run again on the final build
- axe finds nothing on 26 routes and 46 states, both themes, desktop and phone (its first run flagged one card under the show page in the light theme on a phone, caught in the middle of its entrance fade; its words are dark, and the run on the final build is clean); the card audit finds 312 cards and 0 problems in the dark theme and in the light one
- the QA crawl (every page, both themes, desktop and phone) found one problem: the settlement's long number («۱۵٬۵۷۸٬۴۲۴٬۰۰۰») cut by its tile at 1366 and 1920; a tile's number now follows the tile's width when it is long, and a check of every desk tile at four windows finds them all inside; no error, no overflow, no broken picture; 353 links checked, none to nowhere
- layout shift is 0 on the show pages (on sale, sold out) at 1920 and on a phone, 0.0028 at most on the presale one (a text node); the organiser's desk 0.001 (it was 0.008: its list of purchases grew by a row with the first live sale; it starts full now); the seats' page 0.004 (the page change's own transition, as before); 0 on the first load
- the hero's panels are identical to the approved version (`d4cc53c`) at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900 (the banner's and the facts' differing pixels: 0, the pill look on both sides)
- the client's single file was rebuilt (6.2 MB, 52 pictures, 3 font files) and its own test passes (every picture and font inside the file, the theme kept after a reload, the page opens, no script error; the only outside request is the Google Maps frame, which the test runs without internet)

### Honest notes (round S)

- **Much of rounds Q and R is gone on purpose**: the picture column, «بلیتِ تو», the share / hall / other-programs panels and the three layouts. The owner called the page crowded; the stage and one information row say the same with less. The share and the calendar file are still there (the round button on the stage); the hall's numbers are in the place block.
- **Three older tests were retired, not bent**: `r-test`, `q-test` and `o-layout-test` measured the panels and layouts that were removed. Five others were changed with the page (`m-flow-test`, `ui-test`, `integrity-test`, `admin-geo-test`, `p-test`): they now look for the stage and the information row; nothing they guard (the road to a ticket, a hall's map never under another hall, the footer, the prices) was dropped.
- **Google's map inside the private preview page** still shows only the drawing and the link: that page's frame blocks Google, not our code. On the site, on a server or in the client's single file opened on a computer with internet, the real map shows.
- **The banner's size** depends on the window unless the frame's shape is locked; the advice above (1740 × 1000 and the lock) is the only way one banner fits every window exactly.
- **A tablet held upright** gets the phone's hero (a 16 : 9 banner); a tablet held sideways gets the desktop's.
- **A real first-time buyer on a real phone** has still not been seen on the real site.

## 10.14 Round T: one fixed size for every picture, a designed stage, a faint background, white by default, the settings for the admin only, a full review before an approval

**What the owner said** (one message, shortened): *make the banners' and the posters' sizes fixed once and for all, so no different sizes and no faded sides: one size for every banner, one for every poster; on a program's page the poster sits in its frame at the top, bigger, with a very small gap to the frame under it; the frame under the poster must not be the blurred poster itself but a fixed, attractive, professional design related to our subject; the seats' page and the pages after it show their background far too much: it should be hardly seen at all (5% at most); the page that shows my tickets must be built so that no background shows; some posters do not sit right in their frames and show blurred empty places; the theme should be white by default; the client's HTML file must be the site only: no notes under the footer, no floating settings button; far too many programs: fewer, and tell me the sizes so I can send the programs, posters and banners; in the panels the posters must be easy to place in their frames, bigger, with the sizes told; the live settings are for the admin and are too many: fewer, and fixed sizes; the home page's banner needs two sizes: one for phones and tablets, one for the desktop; the admin must see everything a producer entered before he approves; keep the small rail's spacing; remind me to send the programs; make the panels simpler but with options.*

**Rule 0 (the home page):** the hero's rail, the facts' panel and the header are as they were. What changed is the banner's frame (it is locked to one shape now, below) and the theme's default; the hero's panels are checked against the approved version in the dark theme, set explicitly (§ «Checked»).

### The three fixed sizes

| picture | size (px) | shape | used for |
|---|---|---|---|
| **poster** | 1000 × 1500 (2000 × 3000 for sharp screens) | 2 : 3 | every program's card, its page, its tickets, the seats' and the payment's small pictures |
| **desktop banner** | ~~1740 × 1000~~ **2000 × 1000** (4000 × 2000); the important part in the centre 1740 × 1000 (round U, §10.15) | 2 : 1 (the panel is 1.74 to 2.1 : 1) | the top of the home page on a computer |
| **phone and tablet banner** | 1080 × 1440 (2160 × 2880) | 3 : 4, upright | the top of the home page in a window that is taller than wide (a phone, a tablet standing up) |

(`SIZES_FIXED` in `framer.js` is the one place that says them; the settings' «اندازه‌ها» tab and the review page read it.)

- **Every frame has its kind's shape in every window** (the poster's `--pr: .6667`; the banner's frame is locked to 1.74 by default: `frame: 'lock'`; in a window taller than wide it is the upright 3 : 4, `--mr: .75`; a stacked window that is wider than tall (820 × 700, a phone lying down) keeps the desktop banner's 1.74). The window no longer decides a picture's shape.
- **A picture always fills its frame** (`object-fit: cover`) around the point (`--fx`, `--fy`, in %) and the zoom (`--fz` ≥ 1) the admin chose when he placed it (below). Nothing is letterboxed, nothing is mirrored, nothing is blurred behind it: the soft copy behind the cards' pictures, the hero's «edge» fill (`.ext`) and the show page's blurred cover are gone. A file of any shape is accepted (it is cut to the frame; the admin places it).
- **A program with no poster file** gets a drawn 2 : 3 poster (its name, its kind, its colour; `artOf()`), never a crop of its banner. The six real programs have banners; three of them have no poster yet (their posters are drawn until they are sent).
- The poster-less cards, the show page, the seats', payment's and ticket's pictures, the gate's list and the admin's lists all read the same `artOf()`.

### The show page's stage

- **A fixed designed backdrop** (`DECO` in `page.js`, drawn once as an SVG): twelve arcs of dots (the rows of a hall seen from the stage) fading upward, and two soft lights from the top corners, in the theme's own colour at 10% (white theme: soft grey on white). It is the same for every program, so the poster is the only picture on the stage.
- **The poster** is 2 : 3, as tall as the stage allows (`--ph: clamp(360px, 29u, 590px)`: 418 px at 1440, 557 at 1920) with a thin gap round it (`--sp: clamp(10px, .9u, 18px)`: 13 px at 1440, 17 at 1920). The booking card stands inside the same height (its nights scroll inside it when they are many).
- On a phone the poster is bigger (39% of the width, 132–200 px) beside the name; on a tablet 300–430 px tall.

### The background

- **The dotted background** (`dotsPow`) is 7 (it was 100): the strongest dot is about 4% (10 of 255 on the seats' page; the test measures it). The **tickets' page has none** (`dots.KINDS` is the show, the seats and the payment); the coloured glows behind a fixed page's head and a desk's tiles are gone.
- Everything else on those pages is the theme's flat panel colour.

### White by default, fewer programs

- `LOOK_DEF.mode` is `light`. A look saved by someone keeps only what differs from the default, so those who never changed the theme see white; the theme button still changes it.
- **19 programs instead of 39**: the six real ones (their banners, three of their posters), ten of the owner's sample (`s-1 s-2 s-3 s-5 s-7 s-8 s-9 s-21 s-24 s-25`; the ids are kept) and three finished posters (`o-bitaarof`, `o-chaharmezrab`, `real-skykings`). 9 concerts, 7 plays, 3 comedy/kids; every state is still there (on sale, presale, sold out, extended, over). The rest was removed from `more.js`.

### The settings belong to the admin

- **No floating settings button for anyone.** `?dev` (or `?debug`, which the tests use) shows it with every tab (`data-dev="1"`); the design notes under the footer show only with `?notes`. The artifact's version page loads the site with `?dev` (the owner's own tool).
- **The admin's live editor** («ویرایش زنده») opens from his desk: «محتوای صفحه‌ی اصلی» → a slot's «ویرایش». It has two tabs: **the slot** and **the sizes**. The slot has the three pictures (below), then four folds (the layout of the words on the banner, the colour, the words, the category / hall / status); the old drop zones, the presets, the copy and the developer's tabs are for `?dev`. «جایگاه تازه از یه بنر» on the desk's tab adds a slot from a file.
- The sizes tab says the three fixed sizes (and the sharp ones); the measuring readout stays in `?dev`.

### Two banners per slot

A slot's banner is two files: the desktop banner (1740 × 1000) and the phone-and-tablet banner (**1080 × 1440, upright 3 : 4**, `e.bannerM`). The hero builds its scenes from the one that fits the window (`PORT`: a window taller than wide shows the upright one, everything else the desktop one), and builds them again when the window changes between the two. A slot with no phone banner shows its desktop banner cut to that shape. The six samples' phone banners are **upright 3 : 4 cuts of their desktop banners** (`*-mobile-1080.webp`, not in git like the other banners): they stand in until the real ones are sent (a 3 : 4 cut of a 16 : 9 banner shows 42% of its width). The owner first asked for a square, then for «4 : 5, a little bigger»: 3 : 4 is the next step up (the frame is 493 px high on a 390-px phone, it was 463 at 4 : 5 and 370 as a square), and it is a common art size (Instagram's 1080 × 1440).

### The phone's hero is one screen (`style.css` → the stacked block, `--dock-m`)

In a window taller than wide the hero is, top to bottom: the header, the banner (3 : 4, as wide as the screen), **one compact strip** of words (the title with its kind and status under it, the date and the price under them, the buy button at the end; 78 px, it was 122), then the small program cards with the bar of the time left (4 px thick, it fills, then the banner and the card move on), then the rest of the page. The hero's height is the exact sum of those pieces (no empty bands): 731 px on a 390 × 844 phone, so the first screen shows the whole hero and the top of the next section; on a phone with the browser's bars (about 750 px) it still fits. A tablet standing up shows the same 3 : 4 banner at full width (800 × 1067 on an 820 × 1180 tablet; its cards are a little below the fold).

**For whoever draws the phone banner:** keep the words and faces in the middle; on a phone the banner is shown whole (3 : 4), but the same file is cut to other shapes when the admin zooms it in his editor, and its 4 % edges are the safe margin.

### Placing a picture («چیدن تصویر», `framer.js`)

Wherever a picture is added there is a **row**: the frame of its fixed shape and, beside it (under it in a narrow place), its name, its size, what it is for and its settings (zoom, «وسط», replace, remove); the rows are one under the other (the second step: poster, desktop banner, phone banner; the editor: desktop banner, phone banner, poster; the admin's review: the same three, read-only). An empty row has a drop place of the same shape. In a row the picture is in a big frame of its fixed shape, the picture in it: **drag it** to choose what stays in view, **zoom** with the slider, the wheel or + and −, the arrows nudge it (Shift: more), «وسط» centres it. The point and the zoom are saved with the picture (`fx`, `fy`, `fz`) and every place that shows it uses them. It is in: the new-program wizard's second step (now «تصویرها»: the poster, and the two banners as options), the live editor (the slot's three pictures; the hero and the cards follow at once), and the admin's review shows each picture in its frame as it will be seen.

### The admin sees everything before he approves

The queue's row has one button, «باز کردن و بررسی» (`#/admin/review/<id>`); there is no yes without opening. The review page shows what the organiser entered, field by field: the facts (name, kind, organiser, city, hall with its layout and seats, address, duration, age, sale start, the weekend price), the whole text, every night, every price per tier, the three pictures in their frames, the card as it will look, a checklist (poster, text, hall, nights, nights in the future, every price, banners) and **the yes and the no (with its reason) are there**. The two programs of other organisers in the demo are full drafts now (hall, nights, prices, text), so the review is never half-empty.

### The panels, simpler

The live editor went from seven tabs to two and its long pane folds; the wizard's picture step is one screen with three frames; the queue is one button; the price step already fills itself from the hall and the kind (the organiser only changes what he wants).

### The look: nothing new for the owner

`posterRatio`, `posterFit`, `fill` and the frame's «free» mode are still in `?dev`'s panel but the site no longer reads a window's shape into a picture. `evpPlace` is gone (round S).

### Checked (round T, on the final build)

- **The whole regression, 29 suites, 0 failures** (`tools/final-checks-t2.sh`; `six-test` and `o-dots-test`, whose expectations were out of date, were run again after they were brought to the new design and pass): the new `t-test` (sizes, backdrops, white, dots, 19 programs), `u-test` (the phone's hero and the picture rows, below), `t-wizard`, `t-editor`, `t-review`, and every older suite (`s-test`, `m-flow-test`, `seatprice-test`, `ui-test`, `six-test`, `look-test`, `o-dots-test`, `o-map-test`, the purchase, map, queue, hall, city and integrity suites). `poster-test` is retired (it tested the soft copy, the inset and the 3 : 4 frame that no longer exist); `six-test`, `ui-test`, `m-flow-test`, `s-test`, `look-test`, `o-dots-test` and `o-map-test` were brought to the new design (19 programs, 2 : 3 frames, white by default, faint dots, no black beside a banner).
- **The phone's hero** (`u-test`, 390 × 844): the banner 370 × 493 = 3 : 4 from the 1080 × 1440 file; then the strip (78 px, the title not cut), the small cards (6) with a 4-px bar that fills (0.31 → 0.59 in two seconds) and the banner and card moving on by themselves; the gaps 10 · 10 · 10 px; the whole hero 731 px of an 844-px screen, the next section's top showing; a tablet standing up (820 × 1180) has the same banner (800 × 1067); a small window wider than tall (820 × 700) shows the desktop banner in its own shape.
- **The picture rows** (`u-test`): the new program's second step, the editor and the review each list the pictures one under the other with the same width and left edge; every frame has the fixed shape (0.667 · 1.74 · 0.75) and is big (276 · 214 · 272 px high at 1440), its name, size, zoom, centre and buttons beside it (under it on a phone, and the page does not scroll sideways).
- **axe** (WCAG 2.1 A and AA, both themes, desktop and phone, every route and every state): no violations. **Cards**: 152 cards in both themes, 0 problems. **CLS**: 0 on every page (0.010 once, in the seats' view transition). **Links**: 324 checked, none to nowhere.
- **Parity with the approved hero** (`d4cc53c`, the pill look, dark set explicitly): at 1920 × 1080 the banner's panel is pixel-identical (0 pixels) and the facts' panel differs by 108 pixels (edge anti-aliasing of the locked frame; 0 with the free frame); at 2560 × 1440 the banner is identical, the facts 363 pixels. With the free frame the panels' rectangles are identical at all six window sizes; the banner's pixels differ at 1920 × 862, 1536 × 730 and 1440 × 900 because the banner now fills its panel (cut a little) where it used to sit whole with black beside it (the owner's request).

### Honest notes (round T)

- **The hero's frame is locked by default now** (the owner asked for one banner size). At 1920 × 1080 it is exactly what it was; in a window of another shape the frame no longer takes what is left (it keeps 1.74 and the other panels take the rest), so the hero's panels differ from the approved version there, by the owner's request; the parity is checked at 1920 × 1080 and, for the pixels of the panels, in the dark theme set explicitly.
- **Three of the six real programs have no poster yet** (هانی نظریان، برفاب، امان): their cards and pages show a drawn poster with their name and colour. Posters in the 2 : 3 size will replace them with no change to the code.
- **The phone banners of the six are placeholders** (upright 3 : 4 cuts of the desktop banners). Real phone banners at 1080 × 1440 will replace them.
- **A poster of another shape is cut** (it is never shown with bars): the admin places it with the framer; a 3 : 4 photo loses 5.5% of its width on each side by default.
- **The sample photos** (the owner's prototype) are 3 : 4 and are cut to 2 : 3 by their own focus (the centre).
- **The admin's editor opens from his desk** and not from a button on the home page: that is how the client opens it in the single file too (the footer's «مدیر سایت»).
- Opening the page inside the private preview, the version page's own floating menu (the comparison tool) is still there; it is the owner's, not the site's.
- **A real first-time buyer on a real phone** has still not been seen on the real site.

## 10.15 Round U: a banner that ends whole, a tight rail and a longer banner, saved tickets, the print studio, the desks in a black bezel

**What the owner said** (one message, shortened): *the banners are zoomed too much: in the 7 seconds of the zoom-out the whole banner must be seen and no zoom must be left; the program cards lag or glitch beside the date that is written (check white and black); in the locked mode the frame of the small banners beside the big one became too big: keep only a tiny margin, do not stretch them, make the big banner bigger and longer and tell me how it changes; tell me the sizes of the banners and posters to prepare, and give them again after the fixes; let me download the tickets I buy from this html file as an image and as a PDF, saved on the system or the phone, and make sure the QR codes fully work; make a very strong, professional graphic design for the cards management prints in batches (the codes / discount / gift system is useless: what is printed and sent is terrible, unclear, not downloadable); many places in the panels have no UI; work much more on the admin's and the producer's panels in the style of the picture (a black bezel and a slim icon rail on the left, the page inset with a tiny soft gap, buttons that open a bit more and have motion), and finish what was built too thin, e.g. the gift codes.*

**Rule 0 (the home page):** the rail's size at 1920 × 1080 is unchanged; the banner panel's shape follows the owner's request below, so the parity with the approved version `d4cc53c` is exact only at 1920 × 1080 (§ «Checked»).

### The banner ends whole (`app.js`, zoom)

The slow zoom-out goes **linearly from 1.035 to exactly 1** over `LOOK.dur` (7 s) and stops there; the cross-fade no longer runs the zoom on (it used to end a little past the slide's end, still zoomed). At the end of the 7 s the whole banner, cut only to its panel, is on the screen. (`ZOOM.bar` mid = 1.035; the zoom share tween has `duration = LOOK.dur`, not `dur + fade`.) Measured by `n-zoom-time.js`.

### The program cards beside the date

No single defect was reproduced (recorded frames of the dock in both themes show no flash at the date). What changed anyway: the dock's parts leave in 0.24 s and come in 0.6 s after 0.2 s (the separators belong to the parts that move, `data-part`), the scene's fade eases out (`power2.out`), so a part never shows its old and new text together while the date is typed. If it still shows on the owner's machine, the frame he sees it in is what we need.

### The locked layout: a tight rail, a longer banner (`style.css`, `sizes.js`)

The rail keeps its natural width (`--rail-nat`) and the room that is left goes to the **big banner's panel**, whose width is the window's room up to a shape of **2.1 : 1** (`--lock-rmax`) and never below **1.74 : 1** (`--lock-r`). So at 16 : 9 (1920 × 1080) the panel is 1.74 : 1 as before; in an ordinary browser window (1920 × 937) it is about **2.07 : 1**, and it stops growing at 2.1 (the other panels take the rest). The small banners are not stretched: their frame has only the gap the owner asked for. A banner file in 1.74 : 1 is cut a little at the top and bottom in the wider panel (it fills, it is never bars); this is why the file is now asked in **2 : 1** (below). `u3-measure.js` measured the rail and the panel at 12 window sizes.

### The fixed sizes, again (the answer to «which sizes»)

| picture | size (px) | sharp | note |
|---|---|---|---|
| **poster** | **1000 × 1500** (2 : 3) | 2000 × 3000 | every card, the program's page, the tickets |
| **desktop banner** | **2000 × 1000** (2 : 1) | 4000 × 2000 | keep the important part (faces, words) in the centre **1740 × 1000**; at least 4 % clear on each edge, 8 % at the top and bottom for words |
| **phone and tablet banner** | **1080 × 1440** (3 : 4, upright) | 2160 × 2880 | words and faces in the middle; 4 % safe edges |

`SIZES_FIXED` (`framer.js`) says them, and the settings' «اندازه‌ها» tab and the picture rows read it. (§10.14's table is replaced by this one.)

### The phone's hero (unchanged in idea, tightened)

The frame is 3 : 4 from `--mr: .75` in a window taller than wide; the dock is a strip of `--dock-m: 78px`; a wide-stacked window (820 × 700) uses the desktop banner with `--mr: var(--lock-r)`.

### Saved tickets (`buy.js`, `tkx`)

The success page's two main buttons are **«دانلود PDF» and «دانلود تصویر»** (all the tickets); each ticket also has its own image and PDF buttons, the calendar file and the share. A browser may block a download in a page shown inside a frame (the online preview): there `tkx.save` also opens a window with the picture (touch and hold to save it), a save link and a link to open it in a tab. **The QR code** says `BLIT2|code|session|seat|signature`; the file the owner saves is read back by a real scanner (OpenCV) and by the entry control's manual entry (`u-ticket.js` + `u-qr.py`): the PNG of one ticket, of all, the PDF's pages, each says its own seat; the entry control lets it in once and refuses it the second time.

### The print studio (`printlab.js`, `codes.js`)

One studio for the discount codes (the organiser's «کارت چاپی» and «پیام تبلیغاتی») and the gift batches (the admin's):

- **Five designs**, each drawn on a canvas at the size asked (so a PDF is sharp): *noir* (the night ticket with a notched stub and a QR), *aurora* (the show's colours as light, the poster blurred behind glass), *velvet* (a curtain and a gold mask, for theatre), *paper* (light, ink-saving), *gold* (a matte gift card with a gold frame). Each has a **QR of at least 15 mm with a white margin round it**, a serial number, the offer in big type, the code in a box.
- **The outputs**: a **PDF of A4 sheets** (ten cards of 85.6 × 54 mm to a sheet, crop marks, 300 dpi), the same as **PNG** pictures, a **single-card PDF** (one card to a page, for a print shop), the **codes as a CSV** (with each code's link), «چاپ» (opens the pages to print), and for the message **a picture in three sizes** (square 1080², story 1080 × 1920, wide 1920 × 1080) with its text to copy. The PDF is written by hand (JPEG pages, no library). A gift batch can be printed in parts («from the code number …»).
- **Every card has its own code**: «AVA20-K7QX» for the code AVA20; the same ones every time (a reprint gives the same cards); each is registered at the checkout (`c.subs`) and works **once** (`c.subUsed`), counted in the code's total. The cards' QR opens **`#/code/<CODE>`** (`codes.land`): a discount code is kept (`blit.pendingCode`) and the checkout puts it in by itself; a gift code (`GF-…`) opens the wallet with the code in its field. **The address on the QR is a setting** (`blit.siteUrl`, the client's real domain; it is `https://blit.example` until it is set) in the studio.
- Checked by `u-print.js` + `u-print.py`: the files are read back by a real PDF reader (page count and size) and a real QR scanner (every card's QR, the same codes as the CSV), a card's code is accepted once at the checkout and refused the second time, the gift QR opens the wallet with its code.

### The codes pages made complete (`codes.js`)

*The organiser's «کدهای تخفیف»*: four numbers (active, uses, near the limit, ending soon); the codes as **coupon cards** (the offer on a stub, the code with a copy button, the show it is for, a meter of the uses, the days left, the minimum purchase and the cap), a filter and a search; four **templates** (Nowruz, first purchase, presale, a special night); a form with the **minimum purchase** and the **cap** (for a percentage); after the making, buttons for the message and the cards at once; **edit** (the limit, extend a week / two weeks / a month or end it now, the minimum, the cap, on / off, **remove with a second press**), **the uses** (written at every purchase: the code, the tracking code, the discount); **a card opens a bit more when pressed** (made, type, printed codes, the last use, the link with a copy button). The checkout knows the minimum (it says why a small basket is refused: «این کد برای خرید بالای … تومانه») and the cap.
*The admin's «کیف پول و کد هدیه»*: four numbers (batches, credit issued, spent, still open); the batches as cards (the credit, a meter, the days left; open: made, count, spent, what is left, ready codes to copy); **make a batch** (an organisation or an occasion, quick amounts 100 thousand to 1 million, quick counts 10 to 500, the term, the sum line, «prepare the cards after making»); per batch **the cards, every code with its state (ready / spent) with a search, the file of codes, extend, pause**. The wallet refuses a paused batch and a batch past its term, and a batch can hold up to 5000 codes (it was cut at 500).

### The desks in a bezel (`desk.js`, `desk.css`)

The two desks sit in a **black rounded bezel with a slim icon rail** (on the **right** by default, in a right-to-left page; the picture the owner sent had it on the left, and «side» moves it) and the page inset in it with a tiny gap and soft corners (the picture the owner sent); the cards inside are separated by tiny gaps (`--gap` 6–9 px). The rail: the logo's bars (they move on hover), an icon for every section, **the open one is a dark circle that slides to the next** (`.dk-ind`), **a name floats beside an icon on hover** (one label that glides from icon to icon), **«names»** widens the rail to show the names and the person, **«side»** moves the rail to the other side (both kept in the browser: `blit.deskUi`); a count is a small dot on the icon (a number when the names are shown). On a phone the rail is a strip on top (the open section shows its name). The desks' buttons have motion: a light sweeps across a main button, it lifts and squeezes; the chips lift and squeeze; reduced motion turns all of it off. Also: the controllers' page can change a controller's doors and send a new code; the admin's orders show thirty rows and «thirty more».

**A desk has no site header, and its frame does not scroll** (the owner's follow-up): on `#/org` and `#/admin` the site's header, the scroll-to-top button and the window's own scroll are gone (`html.is-desk`, set by `desk.render` and taken off when the desk is left); the bezel is the whole window (6 px of page round it, 4 px on a phone), and **only the page inside it scrolls** (`.dk-main`), so the rail's buttons stay where they are; a wheel over a table passes on to the page (the table's own box scrolls sideways only). What the header gave is in the rail: **the theme's switch** («حالت تیره / حالت روشن», it changes the theme with the same circle that opens from the button), the way back to the site, the entry control, and the person. A short window (under 820 px high) makes the rail's buttons 40 px, and the rail scrolls by itself if its buttons still do not fit. Checked by `u-fixed-test.js` (a desktop, a short window and a phone: no header, the bezel fills the window, the window does not scroll, the wheel moves only the inner page while the rail and the bezel do not move by a pixel, the rail is on the right, the switch changes the theme, leaving the desk brings the header back).

### «No UI»: the audit and what it found

Two tools (`u-ui-audit.js` and `u-click-crawl.js`, with `u-wizard-audit.js`) look at every desk route, every window and every step of the wizard in both themes and on a phone: a control with the browser's own look (a font that is not the site's, a default border, a native checkbox / radio / slider / file field / spin buttons), a window that opens empty, a control that does nothing, a script error. What they found and fixed: the admin's «جایگاه تازه از یه بنر» showed the browser's own file field; the native checkboxes (the controllers' doors, the team's table, the designer's option), the hall designer's slider and the number fields' spin buttons (one look for all: `:where(.dk-main, .evp-dlg, .wz-body)`); **the organiser's sales map of a show with an open (no-seat) section crashed and left the page empty**.

### The look: nothing new for the owner

No new setting except two kept in the browser (`blit.deskUi`, `blit.siteUrl`); `LOOK_DEF` gets `ratioMax: 2.1` (the longest shape of the big banner's panel, in the sizes tab).

### Checked (round U, on the final build)

- **The whole regression** (`tools/final-checks-u.sh` and `-u2.sh`; the client's file is exported first): the 30 older suites (`t-test`, `u-test`, `t-wizard`, `t-editor`, `t-review`, `s-test`, `q-tk-test`, `p-test`, `buy-test`, `m-flow-test`, `seatprice-test`, `smnav-test`, `map-test`, `salesmap-test`, `queue-test`, `pages-test`, `ui-test`, `six-test`, `tour-test`, `look-test`, `o-dots-test`, `o-cities-test`, `o-map-test`, `geo-test`, `search-places-test`, `admin-geo-test`, `integrity-test`, `halls-test`, `content-test`, `desk-test`) **0 failures**, and the new ones: `u-codes` (the codes' and gifts' pages: 22 checks), `u-open-shot` (the opening cards), `u-print` + `u-print.py`, `u-ticket` + `u-qr.py` (on the client's file), `client-test`. Two real findings on the way, both fixed: `ui-test` caught that the coupon cards' class names (`.cp-*`) were the header's city menu's names too and broke the menu (the coupons are `.cpn-*` now); `queue-test` found that no busy show was left on sale because **the six real programs have fixed dates that are now in the past** (the sample's `s-21`, ten nights ahead, is a busy show now, so the waiting room has something to show).
- **The print files read back by real tools** (`u-print.py`): the A4 sheet is a valid PDF (1 page, 595.28 × 841.89 pt), **all ten QR codes on it are read by OpenCV and are the same ten as the CSV**; the PNG sheet gives the same ten; the print shop's PDF has 10 pages of 242.6 × 153.07 pt, each page one QR; a gift sheet (the gold design, the smallest QR) is read 9 of 10 at 300 dpi by OpenCV (a phone is better than that detector). A card's code is accepted once at the checkout (the other nine still work), its QR address leads to the checkout, and a gift QR to the wallet with its code in.
- **The saved ticket** (`u-ticket.js`, the client's file opened from the disk with no network): a purchase, then PNG and PDF of all the tickets and of one ticket each, all downloaded as real files; the scanner reads each QR (`BLIT2|code|session|seat|signature`), the entry control lets the saved ticket in and refuses the same QR the second time; inside a frame the save window shows the picture, a save link and an open-in-a-tab link.
- **The unstyled-UI audits**: `u-ui-audit.js` (every desk route and the windows they open, both themes, desktop and phone) and `u-wizard-audit.js` (every step of the new-program wizard, both themes, desktop and phone): the only things left are a time field that keeps the browser's picker in the site's font and frame, and a bulleted tips list on the gate and receipts pages (both meant). `u-click-crawl.js` (every control of every desk page): after the fixes nothing is dead, empty or crashing in the light and dark desktop runs (the few reports left are a hidden radio, a file chooser, and a filter that is already chosen); the phone run was not finished (it stopped on a control that waits), the wizard audit covers the phone.
- **axe** (WCAG 2.1 A and AA, both themes, desktop and phone, every route and every state): no violations. **Cards**: 152 in both themes, 0 problems. **CLS**: 0 on every page. **Links**: 323 checked, none to nowhere.
- **Parity with the approved hero** (`d4cc53c`, pill look, dark set explicitly): at **1920 × 1080 the banner's panel is pixel-identical (0)** and the facts' panel differs by 108 px (anti-aliasing of the locked frame, as before); at the other five sizes the panels differ **by design** (the longer banner and the tight rail). With the free frame the panels' rectangles are **identical at all six sizes**; the banner's pixels differ at 1920 × 862, 1536 × 730 and 1440 × 900 (it fills now), the facts' at 1920 × 1080 (309 px) and 2560 × 1440 (490 px): the cards' status chip («تمام شد») of the rail and the header's contents, which are the known differences.
- **Measured**: the rail and the banner panel at 12 window sizes (`u3-measure.js`); the zoom's end (`n-zoom-time.js`); the phone's hero (`u-test.js`: 22 checks).

### Honest notes (round U)

- **The date's glitch was not reproduced** (above); the transitions were smoothed instead. If it persists, we need the window size and a screen recording.
- **The hero's panels are not the approved version's** in a window that is not 16 : 9 (the owner's request: the big banner takes the room the rail gave back); at 1920 × 1080 the rail is as it was.
- **A real phone and a real printer were not used**: the PDF's size and the QR were read back by software; print a sheet on the real printer at «100 %» and scan a card with the owner's phone before a big run. A 15-mm QR scans on a phone; the print shop should not shrink it.
- The six phone banners are still placeholders; three programs still have no poster (a drawn one stands in).
- **The client's file does not remember the theme** (by design: dark by default since round V).
- The rail is on the right by default (the owner asked for it after seeing it on the left, as in his picture); «side» moves it and the choice is kept.
- The studio's «چاپ» opens a new window with the pages; a browser that blocks pop-ups needs the PDF button.

## 10.16 Round V: dark by default, accounts for the desks, analytics for each role, dressed selects

The owner's round-V message (seven points) and what was done:

- **The few pixels round the desks' bezel are the bezel's own black** in both themes (`html.is-desk, body, .evp { background: #050506 }`); before, the white theme showed its light ground there. Nothing else changed.
- **No scroll bar in a desk** (`html.is-desk *`: `scrollbar-width: none`, `::-webkit-scrollbar { display: none }`); the wheel, the touch and the keys still scroll. The rail's tabs now scroll *inside* the rail (the logo and the foot stay), so the foot's buttons (theme, names, side, way out, my account) are always in reach however many tabs there are.
- **Dark is the default everywhere** (`LOOK_DEF.mode = 'dark'`). Saved settings from before this round (`rev` < 4) are reset once for the theme and for the locked layout (below); the sun/moon switch still changes it and the choice is kept. The client's file never saves the theme, so it always opens dark.
- **The locked, fixed-size layout is the default** («قفل»: one banner shape in every window, `frame: 'lock'`, the fixed picture sizes) and the same reset (`rev` 4) takes a saved «free» layout, fit, fill, poster fit and ratios back to it; a developer or the admin can still change them in the editor.
- **The jump beside the date.** Measured (`tools/v-dock-cells.js`): each show's dock has cells as wide as their words, so from one show to the next the date's tile moved 11–36 px, the dividers 34 px, the price 39 px and the buy button grew from 173 to 211 px (a «soon» show's countdown). `dockFix` (`app.js`) measures the widest tile, date cell, price cell and buy button over all the shows in a hidden dock of the same width and each dock gives its cell that width (CSS `--dkw-*`, desktop only); after the change all six shows have identical cell positions at 1366, 1536, 1920 and 2560. The swap of the words is shorter (the old ones leave in 0.2 s, the new ones come 0.1 s later, 9 px not 14) so the old and the new date are never both seen. The list's cards were tracked frame by frame (hover, scroll, the countdown's flip): no card moved.

### Accounts for the desks (`deskauth.js`)

- **The admin makes an organiser** (`#/admin/orgs`): name, person, mobile, e-mail, IBAN, a **user name** (suggested from the name) and a **password** (generated, editable), what they may do besides the basics, and which shows are theirs. The password is shown once (with a ready message to copy); it is kept only as a salted SHA-256 (a real site hashes slowly on a server). The same page: look at their panel as they see it (a strip says so and takes you back), a new password, close or open a panel, delete (their shows go back to the site), search and filter.
- **Sign-in** at `#/org` and `#/admin` (a card with user name, password, the eye, «keep me here»; five wrong tries lock it for 30 s; the demo accounts are listed in a folded box until their password is changed: `admin / blit-admin`, `avaye-no / avaye-1404`, `sarv / sarv-1404`, `ayeneh / ayeneh-1404`). «حساب من» (the person at the foot of the rail) changes the password and signs out; the rail has a way-out button. An admin who opens `#/org` chooses whose panel to see. `?debug` opens the desks without a sign-in (the tests); `?debug&gate` keeps it.
- **What an organiser has**: their dashboard, their shows, a new show (it goes to the admin before it is on the site) — always; analytics, money (sales and settlement), discount codes and the controllers only when the admin ticked them. Never: the first page's banner (the wizard has the poster only, with a tick «I would like to be in the first banner» that the admin sees in the review; the banners are the admin's, from «محتوای صفحه‌ی اصلی»), the site's settings, cities and halls, other organisers' shows, orders or numbers. Their codes, controllers and drafts are theirs only (`org` on each record); the entry control takes any organiser's controller code.
- **Whose a show is** (`orgs.ownerOf`): what the admin gave (`blit.owners`), else the organiser who made it, else spread over the three first accounts.

### Analytics (`analytics.js`)

One sample model gives each show its sale day by day (a launch burst, a quiet middle, a rush before the first night, busier Thursdays and Fridays, nothing before the sale opens, no day over a twentieth of the hall) adding up to what the seat map already shows as sold; every number on a dashboard is a sum of these. Scope: an organiser's own shows; the admin's the whole site, one organiser or one show. The page (`#/admin/analytics`, `#/org/analytics`): ranges 7 / 30 / 90 days and a year with the period before (a switch), the **cell-column trend** (the owner's preferred chart: a column of cells per day or week, four KPI tabs — sales, tickets, orders, average order — that flip the board in a wave, a hairline and a tooltip, the arrow keys), a **line chart** of this period against the last (dotted area, the last point pulsing, a crosshair, a legend that switches a line off), **insights** written from the numbers, a **weekday × two-hour heat map**, the **funnel** from seeing a show to buying it (and where most leave), ranked shows, cities and kinds, devices and a CSV; the organiser also gets the sessions in the next 14 days that are under half full (with a button for a discount code); the admin also gets the organisers' table (sales, share, change), the site's own income (the 8 % fee, the VAT, refunds), and a line chart that compares organisers. Both dashboards' 30 days are the same trend board. Sample data: the real ones come from the server.

### The dressed select (`selui.js`)

Every `<select>` on a desk and in its windows (the province menu, the cities, the filters) is a button and a list that opens with a soft motion: the groups' headings, a search box when there are more than nine options, a check on the chosen one, the arrow keys, Home, End, Enter, Escape and the first letters, and a sheet from the bottom on a phone. The real select stays (hidden) and takes the same value and the same `change` (the `value` and `selectedIndex` setters too), so no code that reads it changed.

### Checked (round V)

`tools/v-flow.js` (sign-in: a wrong password, the demo account, an organiser refused at `#/admin`, the admin making an organiser, the password not in the stored record, the new organiser's own tabs and shows, no banner slots for an organiser, the account's password change, the admin looking as an organiser and going back), `tools/v-select.js`, `tools/v-dock-cells.js`, `tools/v-date-jump.js`, `tools/v-card-jump.js`/`v-card-hover.js`, `tools/u-ui-audit.js` (the unstyled-UI audit, now with the new pages), plus the older suites: **all of them pass** (seven of them had to be told what changed on purpose: dark by default, the organiser's wizard with the poster only, the admin's dashboard with the cell board, the plain page asking the admin to sign in), axe on every route including the new ones in both themes (the first run found the placeholder and the green «+» text under 4.5 : 1 in the white theme; fixed), the cards' audit 152 cards 0 problems in both themes, CLS 0.003 at most, the QA crawl 324 links none to nowhere, `v-ana-test.js` (the model adds up: the site equals the organisers plus its own, nothing sells before its sale opens, a tab flips the board, the tooltip, the keys, the ranges and the compare switch, the CSV, an organiser's scope, the empty states).

### Honest notes (round V)

- **The accounts are a demo**: the passwords are checked in the browser (anyone who can open the developer tools can read what is stored, a hash). A real site needs a server for the sign-in, sessions and the data.
- **The numbers are sample data** shaped like real ones; the analytics tie to the seat maps but not to real sales.
- **The date's jump** was found and measured (the cells' widths), not a recording of the owner's screen; if something else still moves beside a date, the window size and a recording are needed.
- **The theme switch is still there** (the owner asked for dark everywhere; dark is the default and what the client's file opens with). Removing the switch altogether is one line, if wanted.
- The six phone banners are still placeholders; three programs still have no poster.

## 10.17 Round W: the hall builder of the panel, analytics that stay small, the side widget off, the line at a card's edge

The owner's round-W message (seven points) and what was done:

- **The hall builder (`hallbuilder.js`, in the admin's panel, «سالن‌ها» → a new hall, and «ویرایش چیدمان» on a layout the admin made).** A layout is a list of **sections** the admin adds one by one, from the stage back: *rows of seats* (a semicircle round the stage, or straight rows: rows, seats of the first row, how many more each row gets, 1–5 blocks, the aisle's width, the gap from the section before), *a side stand* (rows along a wall, facing the stage), *boxes* (لژ: how many, how many seats, which side), *round tables*, *a standing area*. **A floor is a seated section further back** («+ طبقه‌ی تازه» copies the last one a little wider, with the next price class), so any number of floors, any shape. Nine templates to start from (classic hall with boxes and two balconies, rectangular hall, small hall, amphitheatre, concert with a standing floor, cabaret, a stadium with side stands, a four-floor hall, from nothing). The price class of the rows of a section: one class, three cuts (the front dearest), or a hand-made table («تا ردیف ۳ رده‌ی A، تا ردیف ۷ رده‌ی C»). A drawing that follows every change, the number of seats and of each class beside it, and a message that says why a plan cannot be saved yet. The older text table of rows stays as «جدول متنی (پیشرفته)».
  - What it makes is a plan like the others (`planFromBuilder(b)` → `{stage, secs}`; the state `b` is kept in the layout so it can be opened again; `bFromP` opens a layout made with the older numbers). `hall.js` gives a section its own aisle (`sec.aisle`), `hallslib.js` accepts `l.b`, `planOfHall` builds it, and **`libSet.layEdit`** changes a layout in place only when no show uses it (else the old one stays and the new one is added after it, so a show keeps its seats).
  - The buyer's map takes these halls without change (`tools/w-hall-buy.js`: floors, stadium, cabaret, concert).
- **The poster and banner sizes** were given once in the reply (poster 1000×1500, desktop banner 2000×1000, phone and tablet banner 1080×1440 (3:4; the desktop banner keeps its important part in the middle 1740×1000), the files as they are or 2× for sharp screens); nothing in the files changed.
- **Analytics** (`analytics.js`): small columns in every range: 7 days = 42 columns of 4 hours, 30 days = 60 of 12 hours, 3 months = 45, **6 months = 45 (new range)**, a year = 53 weeks; none wider than 40 px (the column count is fixed per range, not the width). The line charts use daily points up to 30 days. New panels: the forecast of every session (sold, speed, expected sell-out), buyers (new and returning, tickets per order), discount codes and the payment methods. «تحلیل کامل» on both dashboards is now a filled button beside the box's title.
- **Money flow** was described to the owner as it is in the code (a demo gateway; the site's 8 % and the 10 % VAT are constants; the settlement page is sample data; no real money moves) and **nothing was changed**, as asked.
- **The line at a card's right edge.** Found by measuring: the side widget (`.sdock`) was only translated out of the window, so its drop shadow (8 px + 24 px blur) showed at the right edge as a thin vertical line that came and went with the scroll. It is now `visibility: hidden` when it is off (the visibility changes after the slide, `transition: visibility 0s linear .75s`).
- **The side widget is off by default** (`hdScroll: 'one'`: the single morphing header; the setting «dock» is still there under «هدر و متن» and says it is off for now). `look.js` keeps the old saved value, so the owner can turn it back on.
- **What the client can change** was listed from the code (see the reply and the table in HANDOFF 30).

### Checked (round W)

`tools/w-hall-test.js` (every template: no two seats on one spot, none outside the drawing, the count on the screen = the count of the plan; floors, side stand, standing area and tables added, copied, moved, removed; an empty plan cannot be saved; a hall made with it survives a reload; the layout opened again and changed in place; a layout a show uses stays and a new one is added; the text mode; nothing outside the screen on a phone), `tools/w-hall-buy.js` (the buyer's map of four such halls), `tools/w-hall-axe.js` (axe on the builder, dark and light, desktop and phone: nothing), `tools/v-ana-test.js` (columns per range and their width).

Found while checking and fixed: two tests left stale since round V (`u-test.js` went to the organiser's wizard for the three picture rows, which only the admin has now; `desk-test.js` drove the old designer's slider) were counted as «0 FAIL» because they ended in a crash, not in a FAIL line, in round V's run: now they use `#/admin/new` and the builder, and **a crash is read as a failure**; the white theme's countdown colons and labels of a presale card (`.cd-b em`, `.cd-b i`) were 3.7 : 1 and are 4.5 : 1 now; `u-qr.py` read a ticket's QR with OpenCV's classic detector only, which misses a valid code now and then (120 random tickets: 119 read, the missed one reads with the Aruco detector): it uses both now (five runs in a row clean); the admin's size hint gave 3480×2000 and 2160×2160 as the 2× sizes, now it follows `SIZES_FIXED` (2000×3000, 4000×2000, 2160×2880).

### Honest notes (round W)

- The analytics are still sample data; the settlement page is sample numbers and the gateway is a demonstration. Real money needs a bank gateway (in the management's name), a server and a settlement rule agreed with the client.
- The builder draws plans from rules (rows on arcs or lines); an odd hall (a curved side, a column in the middle) is closest by combining sections; a hall's own exact drawing would be a package like the library's.
- A layout a show uses cannot be changed in place; this is by design (the tickets already sold point at its seats).

## 10.18 Round X: the hairline beside the date found, four client files, a smaller live editor, designed posters

The owner's round-X message (six points) and what was done:

- **The line beside the date on the program cards (third time it was reported): found by measuring, not by guessing.** The cause: the picture is clipped by a rounded box (`.tkt-pic`, `overflow: hidden`) whose edge is a fraction of a device pixel; the date's pocket was *inside* that clip, so its own square edge was pixel-snapped a row (or a column) away from the clip's, and the picture's edge showed through as a 1-pixel grey line over the pocket's top edge and beside it. It comes and goes with the scroll position (a different fraction every time) and only shows at fractional pixel ratios (125 % and 150 %: what a Windows laptop has; at 100 % and 200 % nothing). `tools/x-seam.js` + `x-seam.py` reproduce it (before: 54 of 72 shots had a seam, all at 1.25 and 1.5) and prove the fix (after: 0 of 72, with and without a half-pixel transform, both themes). The fix: the date is now a sibling of the picture, not inside its clip, and reaches 2 px past the picture's top and side over the card's own colour (its two curves moved to keep their places); the foot's tab got the same 2 px below. **The card's shape is pixel-identical** (the only pixels that changed against the old build are the hairline's row at 1.25 and 1.5).
- **The client's live editor** is one pane in the client's files: the pictures (desktop banner, phone banner, poster, each with its place in the frame) and the few words (title, kind, short name, place, price, label). No tabs, no layout of the words on the banner, no colour, no category / hall / status, no sizes, no presets, no copy-paste of settings. It is done in the export (`html[data-client]` + a CSS trim); the developer's preview (`?dev`) keeps everything.
- **Four files for the client** (`client/export.py`, `KIND=site|org|admin|gate`): `blit-site.html` (the public site: no «همکاران» in the footer, the site map or the phone's menu, no tour of the desks, a desk's address typed in goes back to the home page), `blit-org.html` (opens on the organiser's sign-in), `blit-admin.html` (the admin's), `blit-gate.html` (the entry control). The same build; the files share the browser's storage when opened from the same disk (a banner changed in the admin's file shows in the site's file in Chrome); a real site needs a server. `tools/x-client-files.js` tests all of it.
- **Posters.** Nine programs got designed 1000×1500 posters (2 : 3, so every frame shows them whole): آرمان کیان، پردهٔ سرخ (drawn: a stage, curtains and a spotlight), پینوکیو، شب خنده، بی‌تعارف (drawn: bubbles and a microphone), چهار مضراب، امان، برفاب، هانی نظریان (a window of the program's own banner and our type). The three programs that had none (امان، برفاب، هانی نظریان) have one now. **The sites the owner named (iranejra, melotik, fidibo) refuse this server (from this server they reset the connection or answer 503), so no poster was copied from them**; the printed dates agree with each program's data.
- The text for an image AI to make the gift / discount cards is in `ui-reference/card-ai-prompt.md`.

### Checked (round X)

`tools/x-seam.js` + `x-seam.py` (above), `tools/x-client-files.js` (the four files), the card and poster tests, the editor's test in the developer's preview.

### Honest notes (round X)

- The posters are designs for a demonstration, with invented credits; a real organiser's poster goes in through the poster slot (any shape: it is fitted to the 2 : 3 frame).
- The four files are one build in four dresses: the desks' code is in the site file too (unreachable from it).
- Tests that had to follow: the card audit lets the date's pocket reach 2 px past the picture (and fails if it does not: that is the hairline guard), the tests that needed a program with no poster take the poster away in memory, the one that opens the entry control uses `blit-gate.html` (the files share the browser's storage when opened from the same disk), and one that picks the first buyable card skips the presale cards. `poster-test.js` is older than the 2 : 3 frame (it still looks for 3 : 4) and is not part of the round's regression.

## 11. The look: what the owner can change

Every setting is a variable or an attribute; the settings panel writes it, `localStorage` keeps it (`hero9.look`), **«کپی تنظیمات»** gives the changes as a small JSON text (`{ "version": 9, "look": {…}, "texts": {…} }`) to send to us, **«وارد کردن»** takes such a text back, **«بازگردانی همه»** returns the defaults. **«حالت آماده»** applies a mode over the defaults: پیش‌فرض، فشرده، باز و نرم، خیلی گرد، تیز و رسمی، چسبیده (بدون فاصله و گوشه)، کادرهای سیاه خالص، کادرهای سفید، نوشته‌ی درشت، حرکت قوی. Double-clicking a slider puts it back. While a slider is dragged the panel fades so the page can be seen.

To change a **default**, change `LOOK_DEF` / `TXT_DEF` at the top of the script (and the matching `--*-n` in `:root` if the number is a CSS one).

All the controls, with their ranges and defaults (the sizes are pixels of the 1920 design):

**تب «چیدمان»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `frame` | شکل کادر بنر · کادر بنر | lock / free | free |
| `ratio` | شکل کادر بنر · نسبت کادر بنر (عرض ÷ ارتفاع) | 1.30–2.60 | 1.74 |
| `gap` | فاصله‌ها · فاصله‌ی بین کادرها | 0–60 px | 9 |
| `edgeX` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی چپ و راست | 0–140 px | 9 |
| `edgeT` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی بالا | 0–140 px | 9 |
| `edgeB` | فاصله‌ها · فاصله‌ی کادرها تا لبه‌ی پایین | 0–140 px | 9 |
| `navH` | اندازه‌ی کادرها · ارتفاع هدر | 44–110 px | 71 |
| `dockH` | اندازه‌ی کادرها · ارتفاع کادر اطلاعات | 56–200 px | 80 |
| `railMax` | اندازه‌ی کادرها · حداکثر عرض ستون کارت‌ها | 160–1400 px | 480 |
| `rail` | اندازه‌ی کادرها · جای ستون کارت‌ها | left / right | left |
| `fit` | بنر · نمایش بنر | contain / cover | contain |
| `fill` | بنر · جای خالی کنار بنر | black / edge | black |
| `zoom` | بنر · زوم اول تصویر | low / mid / high | mid |
| `zoomShare` | بنر · مدت زوم‌اوت بنر | ۱۰۰٪ / ۸۵٪ / ۷۰٪ | ۱۰۰٪ (کل زمان نمایش) |
| `bg` | پس‌زمینه‌ی صفحه · پس‌زمینه | black / color / glow | black |
| `bgColor` | پس‌زمینه‌ی صفحه · رنگ پس‌زمینه | رنگ | #000000 |
| `pageDots` | صفحه‌های برنامه · پس‌زمینه‌ی نقطه‌ای | روشن / خاموش | روشن |
| `dotsPow` | صفحه‌های برنامه · پررنگی نقطه‌ها | ۰–۱۵۰ ٪ | ۷ (دور T؛ قبلاً ۱۰۰) |
| ~~`evpPlace`~~ | (از دور S حذف شد: صفحه‌ی اجرا دیگه زبانه نداره؛ مکان همیشه تو ردیف اطلاعاته؛ مقدار ذخیره‌شده اثری نداره) | — | — |
| `caps` | کارت‌ها · نوشته‌ی کارت‌ها | under / over / off | under |
| `capDate` | کارت‌ها · روز اجرا کنار اسم | روشن / خاموش | روشن |
| `dim` | کارت‌ها · کم‌رنگ بودن کارت‌های غیرفعال | 0–60 ٪ | 14 |
| `progress` | کارت‌ها · نشونه‌ی زمان باقی‌مونده | bar / ring / off | bar |
| `posterRatio` | لیست زیر هیرو · نسبت کادر پوستر (عرض ÷ ارتفاع) | ۰٫۵–۱٫۲ | ۰٫۷۵ (۳ به ۴) |
| `posterInfo` | لیست زیر هیرو · کارت برنامه | قاب ثابت (مثل نمونه‌ها) / پوستر با نوشته‌ی زیرش (کارت دور L) / نوشته‌ها روی پوستر، همیشه | قاب ثابت (`frame`؛ `reveal` دور M حذف شد و لوک ذخیره‌شده‌ش به `frame` می‌ره) |
| `posterFit` | لیست زیر هیرو · جا شدن پوستر تو کادرش | هوشمند / همیشه کامل / همیشه پر | هوشمند |
| `listFill` | لیست زیر هیرو · اجراهای نمونه برای پر کردن لیست | روشن / خاموش | روشن |
| `secRows` | لیست زیر هیرو · ردیف‌های هر بخش (بقیه با «نمایش همه») | ۱ / ۲ / ۳ / همه | ۲ |
| `listCols` | لیست زیر هیرو · تعداد پوستر در هر ردیف (پنجره‌ی پهن) | خودکار / ۵ / ۶ / ۷ / ۸ | خودکار (۵؛ از ۱۷۰۰ شش؛ از ۲۲۰۰ هفت؛ زیر ۱۲۰۰ چهار) |
| `presale` | لیست زیر هیرو · بخش پیش‌فروش | compact (ردیف بلیت‌های کوچیک با شمارنده) / cards (مثل بقیه‌ی بخش‌ها) | compact |
| `buyStyle` | لیست زیر هیرو · دکمه‌ی خرید کارت‌ها | سفید (مثل نمونه) / رنگ خود اجرا | سفید |

**تب «سبک»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `mode` | تم سایت · تم (دکمه‌ی خورشید و ماه هدر هم همین رو عوض می‌کنه) | تیره / روشن (سفید) | تیره |
| `lightPanel` | تم سایت · رنگ کادرها در تم روشن | ۴ رنگ + دلخواه | `#ffffff` |
| `lightBg` | تم سایت · زمینه‌ی صفحه در تم روشن | ۵ رنگ + دلخواه | `#eceef3` |
| `themeFx` | تم سایت · حرکت عوض‌شدن تم | دایره از دکمه / محو نرم / بدون حرکت | دایره |
| `radius` | گوشه‌ها و لبه‌ها · گردی گوشه‌ی کادرها | 0–60 px | 19 |
| `radiusThumb` | گوشه‌ها و لبه‌ها · گردی کارت‌ها و عکس‌ها | 0–40 px | 7 |
| `btn` | گوشه‌ها و لبه‌ها · شکل دکمه‌ها | pill (گرد کامل) / soft (نرم) / sharp (تیز) | **soft** (تا دور K pill بود) |
| `tagPill` | گوشه‌ها و لبه‌ها · برچسب‌ها (وضعیت، شمارنده) گرد کامل بمونن | روشن / خاموش | خاموش |
| `borderW` | گوشه‌ها و لبه‌ها · ضخامت خط دور کادرها | 0–4 px | 0.5 |
| `borderO` | گوشه‌ها و لبه‌ها · پررنگی خط دور کادرها | 0–100 ٪ | 8 |
| `shadow` | گوشه‌ها و لبه‌ها · سایه‌ی کادرها | 0–100 ٪ | 91 |
| `panelColor` | رنگ‌ها · رنگ کادرها | رنگ | #0d0d0d |
| `textColor` | رنگ‌ها · رنگ نوشته‌ها | auto / white / black / custom | auto |
| `textCustom` | رنگ‌ها · رنگ دلخواهِ نوشته‌ها | رنگ | #ffffff |
| `font` | نوشته‌ها · فونت | vazir / plex / noto / system | vazir |
| `weight` | نوشته‌ها · ضخامت نوشته‌ها | light / normal / heavy | normal |
| `tx` | نوشته‌ها · اندازه‌ی همه‌ی نوشته‌ها | 70–140 ٪ | 100 |
| `txNav` | نوشته‌ها · نوشته‌های هدر | 70–150 ٪ | 100 |
| `txMain` | نوشته‌ها · عنوان و قیمت (کادر اطلاعات) | 70–160 ٪ | 100 |
| `txSmall` | نوشته‌ها · برچسب‌های ریز (مکان، قیمت از، …) | 70–170 ٪ | 100 |
| `txCap` | نوشته‌ها · نوشته‌ی کارت‌ها | 70–160 ٪ | 100 |
| `txCopy` | نوشته‌ها · نوشته‌های روی عکس (چیدمان متن) | 70–150 ٪ | 100 |
| `digits` | نوشته‌ها · رقم‌ها | fa / en | fa |

**تب «هدر و متن»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `hdSearch` | هدر · جستجو | روشن / خاموش | روشن |
| `hdCity` | هدر · انتخاب شهر | روشن / خاموش | روشن |
| `hdTickets` | هدر · بلیت‌های من | روشن / خاموش | روشن |
| `hdBell` | هدر · اعلان‌ها | روشن / خاموش | روشن |
| `hdLogin` | هدر · دکمه‌ی ورود | روشن / خاموش | روشن |
| `hdWidth` | هدر · عرض هدر بالای صفحه | 60–100 ٪ | 100 |
| `hdCompact` | هدر · هدر با اسکرول کوچیک بشه | روشن / خاموش | روشن |
| `hdCompactW` | هدر · عرض هدر کوچیک‌شده | 760–1400 px | 1400 |
| `hdSpeed` | هدر · سرعت جمع‌شدن هدر | 0.5 / 0.8 / 1.2 s (تند / معمولی / آروم) | 0.8 |
| `hdHover` | هدر · نشونه‌ی لینک‌ها | pill / line / off | pill |
| `hdProg` | هدر · خط پیشرفت اسکرول رو هدر | روشن / خاموش | روشن |
| `hdScroll` | هدر · وقتی اسکرول می‌کنی (دسته‌ها کجا باشن) | dock (ویجت کناری، سمت راست، بدون هدر دوم) / one (فقط یه هدر که خودش نشون می‌ده کدوم دسته‌ایم) / bar (هدر + نوار دسته‌ها زیرش، قبلی) | dock |
| `brand` | نوشته‌های ثابت · اسم سایت | متن | بلیت |
| `cats` | نوشته‌های ثابت · اسم دسته‌های هدر (با ویرگول؛ به ترتیب کنسرت، تئاتر، جُنگ و کمدی، پیش‌فروش) | متن | کنسرت، تئاتر، جُنگ و کمدی، به‌زودی (پیش‌فروش) |
| `login` | نوشته‌های ثابت · دکمه‌ی ورود | متن | ورود | ثبت‌نام |
| `search` | نوشته‌های ثابت · نوشته‌ی جستجو | متن | جستجوی اجرا، هنرمند یا سالن… |
| `city` | نوشته‌های ثابت · شهر | متن | تهران |
| `buy` | نوشته‌های ثابت · دکمه‌ی خرید | متن | خرید بلیت |
| `priceLab` | نوشته‌های ثابت · برچسب «قیمت از» | متن | قیمت از |
| `venueLab` | نوشته‌های ثابت · برچسب «مکان» | متن | مکان |
| `unit` | نوشته‌های ثابت · واحد پول | متن | تومان |

**تب «حرکت»**

| کلید | چی رو عوض می‌کنه | مقدارها | پیش‌فرض |
|---|---|---|---|
| `mot` | حرکت · شدت حرکت | soft / balanced / strong | balanced |
| `trans` | حرکت · جابه‌جایی بین اجراها | fade / slide / zoom / wipe | fade |
| `dur` | حرکت · زمان هر اجرا | 5 / 7 / 10 | 7 |
| `fade` | حرکت · سرعت محو شدن | 0.8 / 1.2 / 1.8 | 1.2 |
| `intro` | حرکت · حرکت ورود صفحه | روشن / خاموش | روشن |
| `spot` | تعامل · نور دنبال‌کننده‌ی موس روی کادرها | روشن / خاموش | روشن |
| `magnet` | تعامل · دکمه‌ی خرید آهنربایی | روشن / خاموش | روشن |
| `magnetPow` | تعامل · قدرت آهنربا (۱۰۰٪ = قدر قبلی) | 0–150 ٪ | 33 |
| `swipe` | تعامل · کشیدن بنر برای عوض کردن اجرا | روشن / خاموش | روشن |
| `scroll` | اسکرول · اسکرول چرخ ماوس | smooth / native | smooth |
| `scrollSoft` | اسکرول · نرمی اسکرول | 30–140 ms | 55 |
| `story` | اسکرول · هیرو سرجاش می‌مونه و بخش دوم می‌ره روش | روشن / خاموش | روشن |

**Not in the tables:** the colour of each show (the «جایگاه» tab: 16 colours and a colour of its own), the texts of each show (title, kind, short name, venue, price, badge), the banner and the layout of each show.

**Light panels.** The text colour is `--fg` (as r, g, b); every line, wash and hover in the panels is made from it. When the panels' colour is light (relative luminance above 0.22) the text turns dark by itself (`textColor: auto`); the words over a photo and over a card's picture stay white; the login button and the small coloured words adapt. **Fonts:** Vazirmatn; IBM Plex Sans Arabic and Noto Sans Arabic load from Google Fonts when chosen. **Digits:** Persian or English everywhere, including the Intl dates.

---

## 12. Colours

Sixteen sets (`PALETTE`): violet, blue, teal, green, gold, orange, crimson, pink, **white, silver, black**, cyan, lime, yellow, indigo, brown, and a colour of the owner's (`custom`, the other values are made from it). A set is: `accent` (the buy button's fill, the date's band), `light` (the badge's text), `onAccent` (the text on the fill), `ring` (the thin things: the active card's ring and glow, the hairline, the dot, the time sign, the logo's bars; the accent itself unless the accent is too dark to be seen on a dark panel, as black is: then white). The picture suggests one of the first eight on upload (`suggestPalette()`); on the six sample banners it gives crimson, orange, crimson, violet, orange and violet (a black-and-white picture gets the brand violet); the sample data hand-picks gold for the golden concert banner and white for the black-and-white one.

**The light theme** (round I, `mode: light`). The look keeps two sets of page colours: the dark one (`panelColor`, `bg`, `bgColor`, `textColor`: what the owner approved) and the light one (`lightPanel` white, `lightBg` `#eceef3`; the words follow the panels: `#110e1a`). `theme()` writes `--capsule`, `--fg`, `--bg` for the theme in use and `data-mode` on the page; the stylesheet adds what a light page needs: shadows at a fifth (`--shk: .2`), the veil over the hero (when the list slides over it) in the page's colour instead of black, the browser's own light parts (`color-scheme`), a softer shadow for the menus and the search window, and the phone's bars in the page's colour (`<meta name="theme-color">`). What is a picture stays dark: the stage behind the banner (`--stage: #0b0a10`, so the fade between two banners goes through dark, as in a cinema), the words of the poster cards (they sit on a soft dark copy of the poster, as in the sample), the presale tickets, the cover of the show's page. The status labels and the sections' colours have a deeper tone on light panels. (Round L found with a real light-theme axe run that the dim texts and the bright green, amber and red were short of 4.5 : 1 on light panels, and fixed them with a floor for dim text and four deep text tones: §10.6.)

---

## 13. Data model

```
slot {
  id, order, activeFrom?, activeTo?,                  // the slot is sold for a period
  layout: 'bar' | 'text',
  pal: 'violet' | … | 'brown' | 'custom', cust?,      // 16 keys, or a colour
  kind: 'concert' | 'theatre' | 'comedy',             // the category (the city is not a category: it is the visitor's filter, §9)
  hall, hallLay, cs, city,                            // the hall's id in the library, the layout's number; the city's slug and name FOLLOW the hall (bindHall, §10.5)
  by?: 'admin',                                       // a show the admin made (not in an organiser's lists)
  venueKeep?,                                         // the hero's six shows keep the venue words the owner saw (the hall is the library's)
  type, name, title, desc, venue, startsAt, endsAt?, price, badge?,
  status?: 'normal' | 'soon' | 'extended' | 'soldout' | 'postponed' | 'cancelled' | 'held',   // none = automatic (§9.1)
  saleAt?, seatsLeft?,                                 // the sale's start; seats left (0 = sold out)
  banner: { src, srcset, thumb, ambient, w, h },      // 16:9; (the photo for layout 'text')
  poster?: { src, w, h },                            // tall (4:5 asked since round L; 2:3 before); for the lists after the hero; none = the banner is shown in the frame
  fp?: { o, op, mop }                                 // the photo layout's focal point
}
// global (the look, one setting for the whole hero): see §11
```
- `hall` is the hall's **id** (a string); with it the show's address, its seat map, its price classes, its capacity and its position are the hall's own (`hallOf(show)`). A show never carries an address or a map of its own, so it cannot show another hall's.
- `title` is the full line (also the `<h1>`; in the bar layout a visually hidden one). `type` and `name` label the rail card («کنسرت هانی نظریان»). `desc` is two lines, used by the text layout.
- `startsAt`, `endsAt`: ISO with +03:30. `price` is the lowest price in toman. `badge` is any text (the panel suggests: پرفروش، ظرفیت رو به اتمام، اجرای ویژه، اجرای جدید، تک‌اجرا، پیش‌فروش) or none; it is the owner's own label, apart from the status (§9.1). The short day under a rail card comes from `startsAt` / `endsAt`.
- Banners: 640, 1024 and 1672 (or 1920) wide, **ratio about 1.74** (the sample: 1672×960, 1024×588, 640×368); `srcset` + `sizes="(min-width: 761px) 82vw, 100vw"`. Photos: 640, 1920, 2560.
- **The poster** (round H) is separate from the banner: the banner is the hero's (wide, 16:9-ish); the poster is the lists' (tall, 4 : 5 asked since round L, 1000×1250 or 2000×2500; it was 2 : 3, 1000×1500). The hero never shows a poster. **No track field** (no music).
- **The sample's dates are the banners' own** (so the facts panel agrees with the banner above it; the six shows are 23–26 Mehr, 28–29 Aban, 21 Aban, 12–17 Aban, 25–30 Mehr and 18 Aban 1405). They are in the past by now or will be soon, so **every sample show carries the owner's choice of status** (normal, normal, normal, «تمدید شد», «تمام شد», normal; the second one is «به‌زودی» with a sale that starts 1 day 2 h 37 min after the page is opened) and the sample does not turn into «برگزار شد» as the calendar moves. Choose «خودکار» in the panel to see the automatic rules work on the real dates (the first show becomes «برگزار شد»). Only the countdown is counted from the moment the page is opened. Cities: رامسر (the first; a county, so it is in «شهرستان‌ها»), تهران, تهران, ساری, تهران, تهران.
- The sample's prices, and the dates, times and venues the banners don't state, are made up. («برفاب» says 1404 on its banner; the sample puts it in 1405, 12–17 Aban, so it is «this week»; the concert's hall, which the banner prints with a word the page can't read, is left out.)

---

## 14. The settings panel (what the real admin does for a slot)

The panel in `index.html` («تنظیمات نمونه», the round button at the bottom left) has seven tabs: **نسخه‌ها** (only inside the comparison page: the versions and the preview sizes), **جایگاه** (this show), **چیدمان**, **سبک**, **هدر و متن**, **حرکت** (§11) and **اندازه‌ها** (§15). It can move to the other side of the screen. The «جایگاه» tab is the one the real admin would have:

1. **Image:** at the top a box says the size to make: by default (the free shape) the panel's own size **in this window** (e.g. 1629×711 at 1920×862), its ratio, the double of it for a sharp screen, and what it is on a 1920×1080 window (it follows the window and every setting); with the locked shape (an option) **one size for every window, `1740×1000`**, and, smaller, what the panel measures here. Then drop or pick one or several files (the box «بنر خودت رو اینجا بنداز یا انتخاب کن»); two buttons say where they go: «جای بنر این اجرا» (the default) or «اجرای جدید، آخر لیست» (each file becomes a new show at the end of the list with made-up words to change in the fields below it; the rail's window slides to it; it lasts until the page is reloaded). The note under says whether the file fills the panel and, if not, the size to make; the box «روی بنر نوشته (عنوان، تاریخ…) هست» picks the layout: ticked → *bar*, unticked → *text*. The panel says what it found: «بنر ۱۶:۹ · ۱۶۷۲×۹۴۱ · تو قابش کامل و بدون برش دیده می‌شه» (or that it fills the panel), or «نسبت ۳٫۰۰ به ۱ … کامل دیده می‌شه، ولی بالا و پایینش خالی می‌مونه (سیاهه)». **A tall or square picture (ratio under 1.15) is refused** («پوستر عمودی جای خودش رو تو قفسه‌ی پوستر داره، نه اینجا»), and the slot stays as it was. «عکس نمونه، بدون نوشته» puts a text-free photo in the slot.
1b. **Poster** (round H): under the banner's box, the size to ask for the lists' posters (**1000×1250**, ratio 0.8 since round L (it was 1000×1500), and the double for sharp screens: it follows the «نسبت کادر پوستر» setting), a button to pick **a tall picture as this show's poster** (a wide one is refused), a note saying what the show's poster is and how it sits in the frame, and «برگردوندن پوستر». The list under the hero changes at once.
2. **Info:** کادر پایین / متن روی عکس. 3. **Colour:** 16 swatches (the one suggested from the picture is marked) and a colour of one's own. 4. **Texts:** title, kind (the word on the card), short name, venue, price from, and a free label (any text). 5. **Category, city and status:** the kind (کنسرت / تئاتر / جُنگ و کمدی; changing it also changes the kind's word if it was the default one), the city (the 32 of the menu), the status label (خودکار, or any of the seven, to look at each one on the facts panel, the rail card and the second section's card) with a note under it saying what it is now and why, and the sale's start (none, 10 seconds from now (to see the sale open), 1 hour, 1 day 2 h, 3 days; it shows «همین که هست» while one is waiting). 6. **Reset** puts the slot back as it was (its kind, city, status and seats too).

Validation worth having in the real one: at least 1600×900 (warn below 1920×1080); JPEG, PNG or WebP up to 10 MB; refuse a ratio under 1.15; warn how the panel will look for a ratio that isn't the panel's own (about 1.74 with the default look; within 2.5 % it fills the panel); warn if the banner's words come closer than 4 % to an edge (the zoom clips them for a moment).

---

## 15. The sizes

The tab «اندازه‌ها» says, for the window it is in: the window and its pixel ratio; the size of the header, the rail, the banner's panel, **the banner itself inside it**, the facts panel; the gap and the margins; the file of the current banner (size, ratio); **the size that fills the banner's panel in this window** (with the locked shape: one size, `1740×1000`) and the size to ask the organiser for (§16); and a table of the banner's panel on common windows for the current look. With the defaults (the free shape, the approved layout) the panel's shape follows the window:

| Window | Banner's panel | The banner | Rail | Gap | Margin |
|---|---|---|---|---|---|
| 2560×1440 | 2072×1191 | 2071×1190 | 452 | 12 | 12 |
| **1920×1080** | **1553×893** | **1552×892** | 340 | 9 | 9 |
| 1920×937 (a maximised browser) | 1603×775 | 1349×774 | 294 | 8 | 8 |
| 1920×862 (the owner's claude.ai window; on his own screenshot the panel measured 1637×711 inside) | 1631×713 | 1629×711 | 267 | 7 | 7 |
| 1536×864 | 1246×714 | 1245×713 | 268 | 7 | 7 |
| 1440×900 | 1132×760 | 1131×649 | 288 | 7 | 7 |
| 1366×768 | 1115×635 | 1114×634 | 232 | 6 | 6 |
| 1280×720 | 1050×590 | 1049×589 | 212 | 6 | 6 |

On every 16:9 window the panel is 1.74 : 1, so a 1.74 banner fills it. A 16:10 window (1440×900) leaves bars above and below (55 px each), a wide one (1920×937) 127 px at each side — black, or the banner's mirrored edge — unless the file has the panel's own shape (within 2.5 %). **With the locked shape (an option, §5)** the panel is always 1.74 : 1 and only its size and the rail change: 1553×893 at 1920×1080 (rail 340), 1348×775 at 1920×937 (rail 548), 1240×713 at 1920×862 (rail 658), 1043×600 at 1536×730 (rail 474); on a window taller than 1.74 the banner and the facts panel stay together in the middle of the column (1440×900: 55 px of black above and below).

**To be sharp** the banner should have at least as many pixels as the biggest panel it will be drawn in: 2072×1191 on a 2560×1440 screen, double that on a high-density one.

The switch «اندازه‌ی کادرها، فاصله‌ها و حاشیه‌ها رو روی صفحه بکش» draws a layer over the page: each panel's outline with its size, each gap in pink with its number, each margin in blue with its number, and the banner's own size. It follows the window, the scroll and every change of the look.

---

## 16. What we ask of the organiser, and what the server does

| Step | Detail |
|---|---|
| Ask for | a banner of the panel's shape. **By default (the free shape) there is no one size for every window:** the panel takes what the window leaves, so its shape follows the window's height (1.74 at 1920×1080 → 1553×893; 2.07 at 1920×937 → 1603×775; 2.3 at 1920×862, the owner's claude.ai window → about 1637×711); the settings' «جایگاه» tab says the number for the window it is in. A banner within 2.5 % of the panel's shape fills it (a 1.74 one fills every 16:9 window); further off it is shown whole with black beside it or above and below. **For one size for every window use the locked shape (an option): 1740×1000** (ratio 1.74; **3480×2000** for sharp screens). JPEG, PNG or WebP up to 10 MB, with the important words at least 4 % from the edges (the picture starts 5 % zoomed in). For the text layout a **2560×1440** photo with no words. A poster (ratio under 1.15) is refused |
| Ask for (the poster) | a **tall poster, 1000×1250 (ratio 4 : 5 since round L; 2000×2500 for sharp screens)**, for every list after the hero (a 2 : 3 poster, the earlier ask, is still shown whole with a soft copy of itself beside it). Any other tall shape is shown whole with a soft copy of itself beside it; within 2.5 % of 4 : 5 it fills the frame; a wide picture is refused as a poster. The poster carries its own words (title, day, hall, time, the ticket site's address), so nothing is laid over it except the status label and the stamp «تمام شد», and the words are under it by default |
| Make the sizes | WebP: 640 (the cards), 1024 and 1672 (or 1920 if the source has it); photos 640, 1920, 2560. Never upscale |
| Make the poster's sizes | WebP: 360 (a card on a phone), 720 and 1000 wide (a card at 1920 × 1080 is 290 px), never upscaled; the soft copy comes from the same file, scaled by the page (or a 32 px copy made once, as the ambient) |
| Make the ambient | 64 × 36, cover-fitted with a little bleed, `blur 2.5px saturate 1.45`, ~1 KB WebP (only used when the page's background is the glow) |
| Suggest the colour | `suggestPalette()`: shrink to 64 px, skip transparent, grey (saturation < .28) and dark (value < .2) pixels, a 36-bin hue histogram weighted by `s²·v`, smoothed, the peak snapped to the nearest of the first eight colours; a black-and-white picture gets violet |
| Alt text | `title · venue · date`. A banner has its words baked in, so the alt carries them |
| Never | tint, crop, redraw or put anything on the organiser's picture. (The mirrored edge, if chosen, is drawn by the page, outside the picture, from the same file.) |

---

## 17. Accessibility

- The hero is a `section` with `aria-roledescription="carousel"`; the scenes' container is the `tabpanel`, each scene a `group`. Only the scene on top is interactive: the others are `inert` and `aria-hidden`. Each scene has one `<h1>`.
- The rail is a `tablist`; arrow keys (Down/Left next, Up/Right previous, Home/End) move the show; clicking the active card focuses its buy button. A card's accessible name is «کنسرت SkyKings، سالن …، پنجشنبه ۷ آبان». A visually hidden `role="status"` line says the same when the visitor (not the timer) changes the show.
- The search is a modal `dialog` with a labelled `listbox`, `aria-activedescendant`, Esc, and the focus returned. The city picker is a `role="dialog"` (a labelled search field, `aria-current` on the chosen city, the arrows walk the list, Esc or a click outside closes it, on a phone a bottom sheet with a focus trap, the focus goes back to its button); the account menu is a `role="menu"` (the arrows, Home and End, Esc). A status label is text in the card's name (and a chip); a buy button that can't be pressed is `aria-disabled` and named by its reason or its start time; the ticking digits are `aria-hidden`. The settings panel is a dialog with `role="tablist"` tabs (arrow keys), switches (`role="switch"`) and labelled sliders.
- **The side dock** (round L) is an `aside` labelled «دسترسی سریع», `inert` (out of the keys' and the readers' way) until it is shown; its categories are links with names (count included) and `aria-current` on the one in view, its actions are buttons with names, its tab is a button with `aria-pressed` (pinned) and `aria-expanded`; focus inside it opens it, Esc closes it and keeps it shut for a moment so the focus it left does not reopen it; on a phone the same tab opens a list and a press outside closes it. A card's status label is in its poster link's name; a sold-out, over, cancelled or postponed card says so in its foot in words, not only in colour. The ticket's QR is a button with a name («نمایش بزرگ کد QR بلیت ۱»).
- **Contrast, in both themes truly** (round L): axe (WCAG 2.1 A and AA) finds nothing on 26 pages in the dark and the light theme, on a desktop and a phone, and nothing on what only shows after a press (the search window, the city picker, the bell, the sign-in window, the side dock open and on a phone, the phone's menu, the show page with its rules accepted, a chosen seat). Dim text on light panels never goes under 64 % of the text colour (§10.6); the tones of green, amber, red and blue are deep ones there.
- **Round M (the flow):** the show page's information is a real `tablist` (arrow keys, one panel at a time; with no map there is no tab bar); the nights are a `radiogroup` of `radio`s with one tab stop and arrow keys (a night with no seats is `aria-disabled`); the rules' window is a `dialog` with its focus kept inside, Esc, and the focus given back; the continue pill is a link with a name and the time; the steps' labels are kept for a reader on a phone (hidden for the eye only); the sheet of a card is plain text in the reading order whether or not the pointer has dropped it. Axe: nothing on 26 pages and in 38 states (§10.7).
- **Round N:** the framed card keeps the same semantics as before (the whole card is one target, its picture link and its buy button are real controls, the tab and the pocket are `aria-hidden` copies of what the words already say, and the words are in the reading order with nothing hidden under the pointer); the seats' page's one bar is a `panel` with the way back (a named link), the show, the night's button (`aria-haspopup`) and the steps. Axe: see «Checked» in §10.8.
- **Round O:** the dotted canvas is `aria-hidden` and takes no clicks; the phone's box is a group named by its label, the part that is not shown is `inert`, the line under it is a live region, the squares are named «رقم n کد» (the first has `autocomplete=one-time-code`); on a big window the information's two panes are one under the other with real headings and the tab bar is not shown (a tablet or a phone keeps the `tablist`); the seats' top row has the poster with its alt text, the overview as a named image and the guide as a named group; axe finds nothing (§10.9).
- **Round P:** the footer is one `<footer>` landmark after the page's column (the list's own is hidden with the home page, so there is one); the seats' cue is a class on a seat (no new words, `aria-label` unchanged); the cart's place-holders are `aria-hidden` and one hidden line says nothing is chosen; the prices' legend is a group of toggle buttons (`aria-pressed`) with the free count in each; the hall's picture on the show's page is an image with a label (its prices are the list under it); the steps' second line is plain text; axe finds nothing on 26 routes and 46 states (§10.10).
- **Round Q:** the poster column is an `<aside>` with a label (its picture has the program's name as its text; the facts under it are plain text); the ticket's new buttons are real `<button>`s with words («ذخیره‌ی PDF», «ذخیره‌ی تصویر», «اشتراک‌گذاری», «افزودن به تقویم»), a busy state (disabled and dimmed) while a file is made, and white-on-dark colours on the ticket's dark stub in both themes; the share menu is the site's own menu (`menuPop`, the one the nights' menu uses); the account's stat tiles keep their number and their words in one tile; the icon chips are `aria-hidden`; axe finds nothing on the routes and the states (§10.11).
- **Round R:** the living ticket is one labelled picture (`role="img"`, a sentence rewritten with every change; its drawing is `aria-hidden`); the stamp and the lock are decoration; the share panel's four controls are real `<button>`s with words; the hall panel's numbers are plain text, its directions a link; the other programs are links, and the rows that do not fit are `inert` and `aria-hidden` (out of the keyboard's and the reader's reach); the location card is `aria-hidden` (the block's own words are the one link); the ticket page's tips are a list of three; axe finds nothing on the routes and the states (§10.12).
- **Round S:** the living ticket is gone. The stage's two round buttons have names («نشان کردن», «هم‌رسانی») and the save one says whether it is pressed (`aria-pressed`); the share menu is the site's own menu (`menuPop`: arrow keys, Esc, focus back on the button). The hall's overview on the seats' page is one labelled picture with its heading («نمای کلی سالن»). On a phone a desk's table is still a `<table>` (only its look changes), so a screen reader reads its headings; each cell's label is drawn with CSS from the cell's own heading.
- The banner is a link labelled «… صفحه‌ی اجرا»; it can also be dragged, but nothing needs dragging. Focus rings follow the text colour. Under `prefers-reduced-motion` nothing moves (a 0.4 s fade, no zoom, no pin effect, no light, no lean), and auto-advance starts paused.

---

## 18. Performance

- **Layout shift (the brief asks for none):** the page has 0 on load and while its content scrolls. The header's width morph is a *layout* animation (`width`/`left` on a fixed element), and Chrome counts it: about 0.05–0.06 per morph at 1920×862 (a tight shadow only brings it to 0.03), so under the 0.1 limit but not zero. **In the production site animate it with `transform` / `clip-path` (FLIP)** so that it counts nothing; the look stays the same.
- Continuous motion is `transform` and `opacity`. The per-frame style writes are the time sign (one element, and only the one that shows), the picture's zoom, the header's `--hs` and `--pg` while the page scrolls, and the hero's transform while it is covered. The scroll listener is passive and its work is skipped when nothing changed.
- No `backdrop-filter`, no blend modes, no WebGL, **no audio** (no `AudioContext`, no analyser, no beat). The mirrored edge (off by default) is the only `filter` on a big element: blurred once inside the layer that zooms.
- Scenes are built once and reused; after the intro the other shows' scenes are built one at a time. At most `shows + 1` free scenes are kept.
- The first banner is preloaded (`<link rel="preload" … imagesrcset imagesizes>`). When the tab is hidden, the hero is covered or the search is open, the timer and the zoom pause.
- **Layout shift on every page (round J):** 0 on the first load and after opening each of 17 pages, on a desktop and a phone; the seat map's opening counts 0.003–0.007, all of it the page change's own crossfade (`::view-transition-*`).
- **Round J (the whole site, CPU ×4):** the scroll is read once a frame, before anything is written (the header's step, the
  pill of the section in view and the ring of «back to the top» follow it in the same step), so the browser no longer
  redoes the styles several times a frame: the styles and layout forced by scripts while the list scrolls fell from 1.5 s
  to 0.4–0.7 s for the same scroll; the header's progress line gets its value on itself (on the header, every part of it
  was redone each frame). The cards' soft copy behind the poster is a tiny picture made in a **worker** (fetched, decoded,
  shrunk to 24 × 36 and tinted there) instead of two live `blur()` filters per card. The banner's ambient is drawn only
  when it shows (the «glow» background). The live dots grow a copy of themselves (transform and opacity) instead of a
  shadow, so a desk at rest repaints nothing (172 paints in 2 s → 2). The reveal of the cards is the stylesheet's own
  transition (the same curve and timing as before).
- **Round L (the list's scroll, CPU ×4; `tools/perf-bisect.js`, four warm runs of 30 wheel turns):** total blocking time is about the same as round K's (median 190 ms going down and 240 coming up in round K, 260 and 150 now). **It was 1.3 s until a trace showed why**: the side dock's progress ring was a custom property written on the dock every frame, which restyled its whole subtree (36 elements) and made the next layout read (`s2.probe`'s `getBoundingClientRect`, 17 ms a call at ×4) wait; with the dock hidden the same scroll blocked for 0.1 s. The ring is now one inline write (`stroke-dashoffset`) on the one element that draws it, only while the dock shows, in 1 % steps, and the old back-to-top ring is written only where it shows. The cards were not the cost: switching off their label's backdrop blur, their masks, transitions, glare, background gradient or every shadow in turn changed nothing measurable (the runs vary by a factor of two among themselves). A trace of the layout work (`perf-trace.js`) shows the same 70–100 layouts of about 20 dirty objects for a scroll in both builds.
- **Round M:** layout shift 0.000 on the first load and 0.000 to 0.0003 on a show's page opened by its link (§10.7); the list's scroll cost is not clearly different from round L's (the measurement's spread is larger than the difference).
- **Round N:** see «Checked» in §10.8 (layout shift, the list's scroll cost with the framed card, the seats' page).
- **Round O (the dotted background):** a draw is 0.3–0.6 ms (about 740 dots in 12 paths), about three a second, nothing while the tab is hidden or after the page is left, once with reduced motion; no long task; the canvas is fixed and out of the flow, so layout shift stays 0.000 (§10.9).
- **Round P (the footer, the price map):** the hall's picture on the show's page is drawn once, when the page is idle (`requestIdleCallback`), on a canvas in a box of a fixed shape (no layout shift), a resize redraws it; the seats' cue is two CSS animations on one seat; the legend's free counts are recounted with the cart and with the live changes (one pass over the plan's seats); the footer is a copy of the list's (no new request). Layout shift stays 0 on the show pages (§10.10).
- **Round Q (the poster column, the files):** the picture column is one image (the one the poster already loaded; no new request), sticky with CSS only; the panels' finish is box-shadows and an inner line (no filters, no blur); the files are made **on demand** when a button is pressed (a canvas, `toBlob`, a hand-built PDF of JPEGs, a text file), never at page load, the pressed button is disabled and dimmed while a file is made (about a second on a phone, drawn on the page's thread); the file's address is released a few seconds after the save. Layout shift stays 0 on the show, payment and ticket pages (§10.11).
- **Round R (the columns, the ticket):** the panels move between the columns by `appendChild` when the window's mode changes (no redraw, no new request); the columns' heights are the grid's (one layout pass, no script measures them); the ticket's drawing is CSS and one inline SVG (a QR made once from a sample text), the tilt is one `requestAnimationFrame` on `pointermove` (a mouse only); the hall's numbers come from the plan the price map already draws (no second plan is made); `fitRows()` reads the rows' boxes once after layout and on a debounced resize. Layout shift stays under 0.001 on the show pages (§10.12).
- **Round S (the stage, the desks):** the stage's blurred picture is the one the poster already loaded (no new request), drawn once under a CSS blur, and its slow drift is a transform (stopped with reduced motion). The three layouts of round R are gone, so a window's resize moves no panels. A desk's labels are written once per table row (a `MutationObserver` on the desk's body adds them to rows drawn later; it is let go when the page is left).

---

## 19. The comparison page (`../index.html`)

- **No bar.** The chosen version is an `<iframe>` that fills the whole window, so a sample opens at its own size.
- **The switcher is in each version's settings panel** (versions 6 to 9): a group «مقایسه‌ی نسخه‌ها» and a group «اندازه‌ی نمایش» (in v9 they are the tab «نسخه‌ها»). It works by `postMessage`: the page says `{ heroReady }`, the comparison page answers `{ heroVersions: […], current, sizes: […], size, scale }`, a click sends `{ heroSwitch: 'v7' }` or `{ heroSize: '1920x1080' }`.
- **Preview sizes.** `auto` is the real window. A fixed size (`1920x1080`, `1536x864`, `1440x900`, `1366x768`, `1024x768`, `390x844`) puts the version in a frame of exactly that many CSS pixels, centred, scaled down when the window is smaller, never up. Inside, the page really has that viewport. It survives a switch of version and is in the address: `#v9@1920x1080`.
- A version without those groups (v1–v5) gets a tiny floating capsule. Keys 1–9 and `#v9` also switch. The private preview carries versions 6–9 only.

---

## 20. Measured

- **Fit:** 22 window sizes × cards on both sides × bar and text layouts = 132 checks, all passing (2560×1440 … 1280×520, 3440×1440, 1024×768, 1280×1024, 820×1180, 390×844, 360×700): no horizontal scroll; header, rail, banner and facts reach the same margin on every side to within 1 px; the gaps equal `--gap`; the rail's top and bottom are the banner column's; no overlap; corners soft and panels opaque; no clipped text; the banner's rectangle has the banner's ratio and lies inside its panel; the cards are 16:9, inside the rail, evenly spaced; no text under 10.4 px; `geom()` equals the page to within 1.5 px.
- **The look:** each setting changes the page by the amount it says (gap 30 → 30.0 px, margins 60/10/40 → 60.0 / 10.0 / 40.0, radius, border); white panels turn the text dark; the texts reach the header, the dock and the cards; a reload keeps the look; copy then paste brings it back; reset restores the defaults.
- **Smooth scroll (round F):** one 300 px wheel turn ends exactly at 300 px and follows the four-lag curve in time (the largest gap 10 px of 300), never goes back or overshoots; the header starts with the wheel's first turn (17 ms in, the page still 0 px down) and finishes by itself (605 ms later); the hero's effects are written in the very frame the page moves in (a scroll event would come one frame later); a wheel over the rail's list moves the list and not the page; `native` gives the browser's scroll back; a long spin stops at the end of the page.
- **Scrolling:** at the top the header is the full bar exactly on the grid's first row; at 14 px the motion has started (hs 0.6 after 140 ms), at 400 px it is narrower and centred to 0.02 px, with the same top, height (59.2 px), corners (15.8 px) and room round its buttons (10.6 px at the top and when scrolled), width 1585 → 1167 at 1600×900 (the default small header is 1400 px of the 1920 design); the sheet rises over a pinned, shrinking hero; at one screen it covers it (top 0) and the show's timer is paused; at the bottom the progress line is full; back at the top everything is as it was.
- **Round F** (`tools/status-test.js`, 68 checks): the city button shows every name whole and keeps one width for every name at 1920×1080, 1536×864, 1366×768, 1280×720 and 2560×1440; the menu is 32 names in four columns, inside the window, none cut, in the alphabet, no counties; the keys (Enter, ↓, ←, Home, End, Esc) and the narrow header; the automatic rules and their priorities, the owner's choice, the six labels' words and colours, in the facts panel, on the rail's cards, on the tickets of the list below and in the search, never over the banner; the countdown counts down in Persian digits, the same clock in two places, the button's width never changes while it ticks (layout shift 0 over 5 s), a press says when the sale starts, and a sale set to 10 s opens 10 s later (message, the real button everywhere, the card's label and the header's count gone); the header's menus (counts ۱/۰, ۳/۲, ۰/۰), an empty list (the page goes to the section, the message, the chip and the header link marked), a list with shows, the presale link, the chips, ↓ on a kind; a changed kind and city change the lists and counts; a light panel (dark text on the labels) and English digits. And the header's pieces sit at least 7.4 px from the capsule's edge and never overlap at 14 window sizes from 1101 to 3440 px wide, wide and narrow.
- **Interactions:** search by kind, by name and by venue, a miss, Enter, `/`, Esc and Ctrl+K; the city menu; the highlight sliding to within 0.2 px; every header piece switched off; the list's category bar, sections and tickets (`tools/ui-test.js`); the measuring layer's twelve labels; the arrow keys; dragging left and right; the lean (x 8.4 px) and its return; the four changes between shows each ending with opacity 1 and no transform or clip left; the ring and the bar; captions over, under, off; English digits; the title at 140 %; sharp buttons; the mode «چسبیده» (0 margin, 0 gap, 0 radius).
- **Behaviour:** one scene after five quick clicks and after fourteen changes in a row; the timer pauses over the rail; the panel pauses the show; a 16:9 file is accepted, a poster refused, a 3:1 file accepted whole; no audio element, no player, no equaliser anywhere; reduced motion: paused, no zoom, shown.
- **Six banners (round C):** fit 132 of 132 again, with six shows and the owner's defaults (the rail shows four whole cards in every window, 1920×1080: banner 1553.5×893, rail 339.5, `is-fill`, a stretch of 0.2 %); each of the six banners fills that panel (object-fit fill, picture 1552×891 in a 1553.5×893 panel); at 1920×937 the banner stays whole with black beside it (`contain`); the zoom is 1.027 at 1.5 s, 1.009 at 3 s and **exactly 1.0000 at 5.6 s and at 6.5 s**, when the banner's layer is the panel's size; the rail's window starts at card 0 0 1 2 2 2 for the six shows, each active card whole between the bars; the second section lays six cards in three columns; the measuring layer draws its twelve labels; the six files (18 sizes) load with no stand-in picture; no script errors.
- **The locked shape (an option):** at 1920×1080, 1920×937, 1920×862, 1536×730, 1366×650, 2560×1440, 2560×1300, 1440×780, 1280×720 and 3440×1440 the banner's panel is 1.7400 : 1 (to 0.01 %), the banner fills it (`is-fill`), `geom()` agrees with the page to 0.1 px, and the header, rail, panel and facts reach the same margins (the rail at its natural width on 16:9 windows, wider on the others; the margins grow only at 3440×1440, where the rail stops at its cap); on 1440×900 and 1024×768 the banner and the facts sit together in the middle of the column. The wide rail's cards are rows: pictures 16:9, words inside their cell, four whole cards in view.
- **The comparison page:** the sample fills the window exactly; `1920x1080` makes the page inside exactly 1920×1080; the size and the version survive each other; v1 gets the capsule.
- **Cost** (1920×1080, software rendering, per second of wall time): paused 0–1 ms of script; running (zoom + the time sign) 9 ms of script, 13 ms of style, 1 ms of layout; during a change 11 ms of script, 46 ms of style, 6 ms of layout.

---

- **Round K** (the halls library, the cities, the city filter, the categories, the admin's geography): `tools/integrity-test.js` (all 147 halls and 150 layouts: the capacity counted from the map is the package's, no seat key twice, the buyer's seat map of each layout is that layout's own and priced from its zones, every hall's page is its own — its name, its city, a map block only with a position and then only its own, none of the words about a map for the eight halls without one; every show's city is its hall's; broken, wrong-shaped or stale saved data never breaks a page; a show whose hall was deleted still opens), `tools/admin-geo-test.js` (cities: hide, add, refuse a twin, rename, delete only when empty, bring back, bulk add; halls: a pasted link sets the position, a point outside Iran is refused, remove, back to the package's, rename, move to another city and its shows follow, add and delete a layout, a zone's class changes the capacity, make a hall with the designer, a show for it made by the admin goes on the site at once, the city filter finds it; the library is sound after a reload), `tools/geo-test.js` (the picker, the remembered city, a city with no show, a hidden city, the categories' pages with their filters, a city's page by slug and by the old name, the phone's sheet), `tools/search-places-test.js`, the hero's pixel parity (`tools/parity2.js`: the banner's and the facts' panels identical at six window sizes; only the header's contents differ), `tools/hdr-fit.js` (the wider city button fits at fourteen sizes), and the older tests, rewritten where they assumed halls found by name.

- **Round L** (the tools are in the session's scratchpad, not in git; HANDOFF §7 names them):
  - **The regression**: the 28 tests all pass (three were taught the new order card `.oc` and the header's mark beside its links; `dock-test.js` is new).
  - **The hero**: with `btn: 'pill', tagPill: true` the banner's panel and the facts panel are **pixel-identical (0 pixels)** to the version the owner last saw (d4cc53c) and to round K at 1920×1080, 1920×862, 1536×730, 1366×768, 2560×1440 and 1440×900 (`parity3.js`). Against round K the whole viewport differs in one thing only: the header's «پیش‌فروش» link is no longer marked while the hero is in view (`s2.cur` said «soon» there: a leftover of the sticky bar's reference line). With the default (soft) look the corners of the hero's own buttons and tags are soft, as asked.
  - **The crawl** (`qa-crawl.js`; every page × the dark and the **real** light theme × 1920, 1366 and 390 px): nothing found; the 355 links inside the site all open the page they name. Each audit now proves the theme is on (`data-mode`) before it measures, and stops if it is not.
  - **Contrast** (axe, WCAG 2.1 A and AA): in the real light theme **133 failures at first, 0 after the remedy of §10.6**, on 26 pages × both themes × a desktop and a phone, and on the states that need a press (`a11y-states.js`: the search window, the city picker, the bell, the sign-in window, the side dock open and on a phone, the phone's menu, the show page with its rules accepted, a chosen seat). The dark theme is unchanged: the computed colours of 72,506 elements on 29 pages are identical before and after (`style-snap.js`).
  - **Buttons' edges** (`l-btn-audit.js`, on pixels: the contrast between a button's first pixels inside its box and the pixels just outside): in the light theme at 1440 × 900 no button is under 1.6 : 1 after two fixes (the dock's tab, a white tab on the page's grey, and the phone's city button); on a phone the three left in the list are a poster that is a link, buttons of cards the page had not revealed yet when the audit jumped to them, and chips scrolled out of a table (they are measured off the screen). The dark theme's buttons keep the faint frames the owner approved.
  - **The keyboard** (Tab through the first 60 stops of 18 pages, both themes): every stop shows its focus except eight the audit lists, which are the audit's blind spots and the same in round K: the search fields show it on their wrapper (`:focus-within`), the sales chart's hit areas by their stroke, two fields by a transition that has not ended when the audit reads them, the hero's active card inside (`l-focus-cmp.js`, `l-focus-wrap.js`).
  - **Layout shift**: 0.000 on the first load; 0.003 (desktop) and 0.007 (phone) when the seat page opens, all of it the page change's own crossfade.
  - **Speed**: §18. **Sizes**: §10.6 (`l-measure.js`).

## 21. What this version leaves out, and why

- **Music** (the player, the playlist, the rhythm analysis, the beat on the picture and the logo): the owner asked for it to be removed completely.
- **Posters:** the owner doesn't want them in the hero. **Cropping the banner, or covering it:** the baked words must stay whole (unless the owner picks «پر کردن کادر»).
- **A locked banner panel by default:** built, tested (132 fit checks) and then **switched off by default**: the owner asked for a size, not for a change of the site's structure («the small frames' look changed, make it as I approved it»). It stays as an option (`frame: lock`). The cost of the lock, for whoever turns it on: on a window wider than 16:9 (every browser window) the cards get more room than they need, so they become rows; on an ultra-wide window the margins grow (the rail stops at `railMax`).
- **A second header** (the category bar that slid in under the header): removed by default in round L, because the owner found it bad. It stays as the way `hdScroll: bar` for comparison; the default is the side dock (`dock`), and the single header that marks the category (`one`) is the other choice.
- **The wide presale tickets with the big flip clock** (round I): replaced by the compact rows; they are gone, not an option. The flip numbers stay in the small clocks.
- **A safe-area guide:** not needed when nothing covers the banner.
- **A language switch, a theme switch, a cart, a mega menu in the header:** possible; each is a button in the same place. The header has the ones that matter most to a ticket buyer: search, city, my tickets, notifications, login.
- **A second info column for very wide windows, a 2 × 2 card grid, a taller facts panel for tall windows:** each would use the spare room better in one shape of window and complicate every other.
- **A ticket-shaped card, cut-out people, 3D objects, a big countdown, a giant condensed title** (v5, v6): the banner has its own title and the facts sit in their own panel. (The sale-start countdown is built, as the buy button's own state: §9.1. What stays out is a *big* countdown in the banner's panel.)
- **A «tap to peek» on a phone** (round M): a phone has no pointer, so the card's sheet stays (a little smaller) and a tap opens the show; a first tap that only hid the sheet would take the tap away from opening the show.
- **Round L's card as the default** (the picture with the words under it): kept as `posterInfo: below`, not the default; the owner's samples asked for the words over the picture.
- **The first-time bar of orders on the seats' page** («سه قدم تا بلیت: ۱) … ۲) … ۳) …», «فهمیدم»), the cart's sentence and the sentence under the button: removed in round P at the owner's word («do not keep writing «do this and that»»); a ringed seat with a small finger, two place-holders, the button's words and three small lines with icons took their places. **The section's own scroll box** on a mouse screen is gone too (the page scrolls).
- **«The best seats»** (rounds J–M: the seats' box, the show page's main button, the quick buy and the how-many stepper): removed in round O at the owner's word («the buyer chooses the seat»); nothing of it is kept as a choice.
- **Tabs for the show's information on a big window** (round M): the place and its map are under the words now (`evpPlace: inline`); `evpPlace: tabs` brings the tabs back.
- **Round M's hover card** (the words over the picture, dropping away under the pointer, a phone keeping them smaller): removed in round N at the owner's word; nothing of it is kept as a choice (`reveal` in a saved look becomes `frame`).
- **A hover that lifts or zooms the card:** only the picture grows 4 % inside its frame and a ring of the show's colour comes up; the frame itself is fixed (the owner: «the frame fixed altogether»).
