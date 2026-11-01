# مجموعه‌ی ۰۷ · کارت‌های پوشه‌ای · handoff spec

> **خلاصه برای خودت:** شش کارت سیاه به شکل پوشه، هر کدوم با یه رنگ، از روی عکسی که فرستادی. ظاهر همونه؛ همه‌ی دکمه‌ها و نوارها کار می‌کنن.
> **۰۷·۱** ساعت و خواب · **۰۷·۲** پرواز · **۰۷·۳** پیاده‌روی · **۰۷·۴** سهم · **۰۷·۵** ضبط صدا · **۰۷·۶** رادیو
> - **۰۷·۱:** ساعت ثانیه‌به‌ثانیه راه می‌ره و عددها می‌غلتن. وای‌فای و بلوتوث روشن/خاموش می‌شن. روی نوار سبز بکش تا ساعت و مرحله‌ی خواب (REM / LIGHT / DEEP) رو ببینی. روی دما بزن تا فارنهایت بشه.
> - **۰۷·۲:** روی نوار سبز بکش، هواپیما دنبال انگشت میاد و وسط کارت زمانِ گذشته و وضعیت («At Halifax») رو می‌گه. هواپیمای بالای کارت مسیر رو برعکس می‌کنه: کدهای فرودگاه از روی هم رد می‌شن و پرواز برگشت میاد. تو «داده‌ی زنده» هواپیما خودش پرواز می‌کنه.
> - **۰۷·۳:** روی نوار زرد بکش، عدد بزرگ قدم‌های همون پیاده‌روی رو نشون می‌ده. ضربان قلب زنده‌ست و نمودارش جلو می‌ره. رو عددهای پایین بزن تا واحدشون عوض بشه (km ⇄ mi، min ⇄ ساعت، kCal ⇄ kJ). آدمک تو دایره وقتی ماوس روی کارته راه می‌ره.
> - **۰۷·۴:** قیمت زنده‌ست و نمودار جلو می‌ره. روی نمودار بکش تا قیمت هر لحظه رو ببینی. «10 Sec» سرعت به‌روزرسانی رو عوض می‌کنه، «USD» ارز رو (یورو، پوند، ین) و «Key Events» هشدار رویدادها رو روشن/خاموش می‌کنه.
> - **۰۷·۵:** یه ضبط‌کننده‌ی واقعی: توقف/ضبط، مکث/ادامه و پرچم. موج صدا جلو می‌ره، حجم فایل زیاد می‌شه، و نوار نارنجی زیر هر دکمه‌ای که می‌زنی فرو می‌ره.
> - **۰۷·۶:** موج‌یاب رو بکش و ول کن تا روی نزدیک‌ترین ایستگاه بشینه. ⏮ و ⏭ ایستگاه قبلی و بعدی، ⏸ پخش رو نگه می‌داره، ☆ ایستگاه رو نگه می‌داره، AM و FM باند رو عوض می‌کنن. اسم آهنگ مثل تابلو حرکت می‌کنه.
> - **«•••»** هر کارت، همون کارت رو از اول اجرا می‌کنه.
>
> `set.js` و `set.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` مجموعه‌ی شماره‌ی ۷ـه.

**Status:** first version, waiting for the owner's feedback. Measured on the shot (1199 × 853 px): the folder outline, every panel's outline, text sizes (Inter and Oswald fitted to cap heights, widths and stroke weight), and colours. Two deliberate departures: the stock card's logo is a generic chip (the brand logo is not ours to copy), and its axis reads "12 PM" where the shot says "12 AM" between 11 AM and 1 PM.

---

## 1. Units, layout and the folder

1u = 1px of the shot. Every card is **340 × 320 u**. The set sits on the shot's grey with 77u above the first row, 47u at the sides, 42u between columns and 50u between rows; three columns (the shot), two below 900px, one below 560px of container width (`--u = 100cqi / 1199`, `/ 816`, `/ 420`). Each card's number chip (07·1 …) sits 10u above its tab.

**Folder outline** (`SHAPE`): `M0,31 A31,31 0 0 1 31,0 H193 C215,0 228,31 250,31 H309 A31,31 0 0 1 340,62 V289 A31,31 0 0 1 309,320 H31 A31,31 0 0 1 0,289 Z` — the tab is 31u higher than the right part; "•••" (three 6.6u dots, `#161616`) sits on the grey at x 264 / 276 / 288, y 11. Fill `#101010 → #050505 → #000`, a hairline `rgba(255,255,255,.07)`, drop shadow `0 16u 18u rgba(0,0,0,.34)`.

**Panels** are x 17.5 → 322.5, radius 14. Tabbed panels step up 19–20u on the right with the same S-curve:

| Card | Colour | Panel (top, tab top, step from → to, bottom) |
|---|---|---|
| 07·1 | `#00ff37` | 201, 181, 236 → 267, 262 |
| 07·2 | `#02fe71` | 153 → 213.5, no tab |
| 07·3 | `#dbfe01` | 94 → 136.5, no tab |
| 07·4 | `#fdf703` | 196, 176, 251 → 282, 256 |
| 07·5 | `#fd4b05` | 247 → 303.5, the top dips 7u under each button (gaussian, σ 16u at x 166.5 / 226.5 / 286.5) |
| 07·6 | `#ff0149` | 169, 150, 268 → 297, 229; a 6u gap at x 167 is the needle |

Each panel throws a soft glow of its colour onto the card (`.s07-halo`, a radial gradient at 42–50%).

## 2. Type

- Labels: **Inter**. Titles 19.9u (`#dadada`; "Walking" / "Recording" 20.5u, tracking −.03em; "Radio Hard™" 18u; "EK426" 17.1u), small greys 11–13.5u (`#8a8a8a`–`#9a9a9a`), panel labels Inter 700–800 at 7.6–12u in black.
- Numbers: **Oswald 345** (a touch heavier than Light, matched to the shot's stroke width), `#b4b4b4`: clocks 74.4u (tracking −.05em) with 23u superscripts; airport codes 54.9u; times 31.7u; steps 72u; price 56.1u with a 40u currency sign; frequency 57.3u; small figures 16.5–29.3u.

## 3. Cards

| # | Anatomy | Data (sample) | Interaction |
|---|---|---|---|
| 07·1 | day + date superscript; clock; Wi-Fi / Bluetooth keys (33u, radius 9; on = green tint + glow); SLEEP; strip with dotted line and two REM bars (61–102.5, 201–262.5); tab "8H 42M"; weather | clock starts 09:34:53; strip runs 07:23 → 16:09 | clock runs; keys toggle; scrub the strip (time in the tab, stage over the cursor, the REM bar under it thickens); tap the temperature for °F |
| 07·2 | code; LHR / JFK + cities; plane between dotted lines; "7 hrs 19 mins"; route strip (first leg solid, layover dotted, second leg solid up to the plane, the rest dotted); departure / arrival times and dates | EK426 LHR 15:00 → JFK 22:19 via Halifax 19:22; return EK427 JFK 18:30 → LHR 07:45 | drag along the strip (plane follows on a spring; elapsed time and status in the middle); the top plane swaps the direction; live mode flies it |
| 07·3 | glossy round icon with a walker; title; clock on the grey; strip with three walks; steps; footprints; "Steps Today"; BPM with a smooth area chart; three figures | walks 08:00 2,251 · 16:10 841 · 20:34 1,340 = 4,432; heart rate traced from the shot | point at a walk (its bar thickens, the big number shows it); heart rate scrolls; tap a figure for its other unit; the walker walks while the pointer is on the card |
| 07·4 | glossy round icon; name + ticker; price; change chip; day change with an arrow; "Strong Buy"; chart strip with a "now" line and a dotted base; tab "10 Sec"; Open / USD / Key Events | 160.08 against 159.76 (chip) and an open of 158.12 (1.24%); European number style | live price and growing chart; scrub (crosshair, time replaces the label); "10 Sec" → 1 Min → 5 Min; currency USD → EUR → GBP → JPY; Key Events alerts on/off (switching on marks today's events for a moment) |
| 07·5 | dot + "Recording"; timer with hundredths; size chip; ".WAV"; three glass buttons (⌀ 54); waveform strip | starts at 02:52.26, 2.4 MB | stop ⇄ record, pause ⇄ resume, flag (marker on the waveform + toast); the waveform adds a bar every .25 s and scrolls; the strip dips under a pressed button |
| 07·6 | dot + station; frequency + unit; AM / FM keys; song line (fades at the right); dial strip with a needle gap; tab with the decimal; ☆ ⏮ ⏸ ⏭ | FM 98.7 / 99.4 / 101.1 / **102.6 Radio Hard™** / 104.3 / 105.8; AM 540 / 880 / 1080 / 1310 | drag the dial (41u per MHz) and throw it: it glides onto the nearest station within 1 MHz; seek; pause; favourite; band switch; off a station the needle flickers |

## 4. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | cards rise 50u and tip back from 12° in a 3 × 2 cascade (100 ms across, 160 ms down) | 1.15 s `expo.out` |
| | panels stretch out from 20% width; glows fade in; keys and buttons pop (`back.out(2.2)`); "•••" dots pop | .25–.5 s |
| | every number spins up from zero | 1.1–1.4 s |
| Lean | each card turns up to 3.2° / 3.8° toward the pointer | springs 90/15 |
| Numbers | rolling digits on every change | .45–.9 s |
| Idle | the cloud drifts, the plane hovers, the sun turns, the recording dot breathes, the station dot pulses | |

## 5. Interaction and accessibility

- Every strip is a `role="slider"` with `aria-valuetext`; arrows step, Escape returns; the radio also takes PageUp / PageDown for stations. Each card has a polite live region for its changes.
- Every control is a real button with an `aria-label`; toggles use `aria-pressed`.
- Touch: drag on a strip; after a tap the reading stays 1.4 s.
- **Reduced motion:** no intro (a .5 s fade), no lean or idle motion, numbers change at once, the dial jumps.

## 6. Performance

- Cards lean with `transform`; the charts rebuild one path when they change; the dial is one translated group.
- Dotted lines are rebuilt only when their end moves by at least half a unit.
- The loop stops off screen or in a hidden tab.

## 7. Porting notes

- `SHAPE`, `tabPanel()` and `rectPanel()` draw the folder and its panels; each card is one `…HTML()` function plus a block in `mount()`.
- The data (`SLEEP`, `FLIGHTS`, `WALKS`, `STOCK_LINE`, `CURRENCIES`, `FM`, `AM`) is sample data; the radio's song titles other than the shot's are invented.
- The grey stage and the number chips belong to the gallery shot.
