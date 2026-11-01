# مجموعه‌ی ۰۴ · سلامت روزانه · handoff spec

> **خلاصه برای خودت:** پنج کارت سیاه با عددهای نقطه‌ای، از روی عکسی که فرستادی. ظاهر همونه؛ فونت نقطه‌ای هم نقطه‌به‌نقطه از روی عکس خونده شده. هر چی اضافه شده حرکت و تعامله. شماره‌ی هر کارت بالای خودش روی پس‌زمینه نوشته شده:
> **۰۴·۱** فعالیت · **۰۴·۲** زمان خواب · **۰۴·۳** ضربان قلب · **۰۴·۴** استرس · **۰۴·۵** انرژی
> - **روی ردیف نمودار هر کارت بکش:** عدد نقطه‌ای مقدار همون لحظه رو نشون می‌ده و نقطه‌به‌نقطه موج برمی‌داره. زیرعنوان ساعت رو می‌گه و باقی روز پشت یه لبه‌ی متحرک کم‌رنگ می‌شه. ول کنی، برمی‌گرده به الان.
> - **دکمه‌ی کنار عدد:** دقیقه ⇄ کالری، خواب ⇄ زمان در رخت‌خواب (ماه و ساعت)، ضربان ⇄ HRV، الان ⇄ میانگین روز.
> - **ماوس روی کارت:** نقطه‌ها زیر نشانگر درشت می‌شن، کارت کمی به سمتت خم می‌شه و یه نور ملایم دنبال ماوس می‌آد.
> - **همیشه:** قلب با همون ضربانی که نشون می‌ده می‌زنه و آخرین میله‌ی ضربان باهاش می‌تپه. نقطه‌های استرس نفس می‌کشن و پس‌زمینه آروم جابه‌جا می‌شه.
>
> `set.js` و `set.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` مجموعه‌ی شماره‌ی ۴ـه.

**Status:** first version, waiting for the owner's feedback. Everything was measured on the shot (736 × 885 px): card edges, every dot of the digits, the tick grid, the chart shapes and the text sizes.

---

## 1. Units and layout

1u = 1px of the shot. The set is **460 × 736 u** (CSS: `--u = 100cqi / 460`): a blurred wallpaper with rounded corners (30u) and five cards. The cards keep the shot's sizes and its 8u gap between columns; the rows sit 34u apart (the shot has 10u) to leave room for each card's number chip above it.

| # | Card | Position (x, y) | Size |
|---|---|---|---|
| 04·1 | Activity | 19, 34 | 207 × 205 |
| 04·2 | Sleep time | 234, 34 | 207 × 205 |
| 04·3 | Heart Rate | 19, 273 | 422 × 204 |
| 04·4 | Stress | 19, 511 | 207 × 205 |
| 04·5 | Energy | 234, 511 | 207 × 205 |

Positions below are in each card's own units (origin at its top-left corner).

## 2. Card anatomy

| Part | Position (u) | Notes |
|---|---|---|
| Card | radius 27 | `#1b1716 → #1c1817 (40%) → #221e1b (78%) → #282320`; top rim `inset 0 1.2u 0 rgba(255,255,255,.09)`, edge glow `inset 0 0 14u rgba(255,255,255,.03)`, soft drop shadow |
| Title | x 18, baseline 46.3 | Inter **340**, 27.4u, tracking .007em, white (cap height 20u) |
| Subtitle | x 18.4, baseline 63.5 | Inter 400, 13.6u, `#9e9994` |
| Digits | top-left dot centre at (21.75, 90); heart: top-right dot at (366.6, 29) | 5 × 7 dots, pitch 6.8u, dot radius 2.85u, white; digit advance 6 columns, the colon sits 2.2 columns after the digit before it and the next digit 2.2 after it |
| Side pill | x 164, y 88.5, 24 × 44, radius 12 | `rgba(0,0,0,.2)`; icon centred 11u below its top; unit text Inter 500 8.6u (`%`: 600 13u); heart pill x 379.5, y 27, 23 × 45, `rgba(0,0,0,.38)` |
| Tick row | x = 18.2 + 12.13·k, k = 0…14, y 154.5 → 166.5 | 1u lines, white at 26% fading to 0 at both ends; hidden where data is drawn |
| Range labels | baseline 181.5, left x 17.8, right end x 188.8 | Inter 400, 12.4u, `#a29d98` |

**Dot font** (rows top to bottom, `1` = dot). Read off the shot; 0 and 9 are drawn to match.

| | | | |
|---|---|---|---|
| 0 `01110 10001 10001 10001 10001 10001 01110` | 1 `00100 01100 10100 00100 00100 00100 11111` | 2 `01110 10001 00001 00110 01000 10000 11111` | 3 `11111 00001 00010 00110 00001 10001 01110` |
| 4 `00010 00110 01010 10010 11111 00010 00010` | 5 `11111 10000 10110 11001 00001 10001 01110` | 6 `00110 01000 10000 10110 11001 10001 01110` | 7 `11111 00001 00010 00010 00100 01000 01000` |
| 8 `01110 10001 10001 01110 10001 10001 01110` | 9 `01110 10001 10011 01101 00001 00010 01100` | : dots at rows 3 and 5 | |

## 3. Charts and data (sample)

- **04·1 Activity · 52 min:** three blocks centred at x 91.2 / 106 / 128.7, y 156.8, height 9.25; width = minutes × .43 (18, 24 and 10 min). kcal = minutes × 6.1 (317).
- **04·2 Sleep time · 7:45:** a stepped skyline from x 44 to 159.5, bottom 164; edges `44 56.2 62.3 76.3 83.9 86.3 91.7 105.8 120.7 135.2 144.4 146.3 152.3 159.5`, tops `159.3 155.4 151.4 155.4 159.4 154.9 151.4 154.8 151.4 154.8 159.4 157.1 159.3`. Time axis 9 PM → 9 AM. In bed: 8:30.
- **04·3 Heart Rate · 61 bpm resting:** 64 bars [min, max] bpm (`HEART` in `set.js`), bar i at x 46.3 + 5.66·i, width 2.2, round ends; y = 94.5 + (130 − bpm) × .8375. Labels 130 / 90 / 50 at x 17.2 (the "90" is smaller, 9.6u, and dimmer, as in the shot); a dotted baseline every 12u at y 164.5; time labels 1 AM / 6 AM / 1 PM at baseline 182. HRV at rest: 48 ms.
- **04·4 Stress · 13:** eight dots on ticks 0–7, y 159.8, radius = .4 + value × .115 (values 10 10 10 20 27 10 10 13). Day average 14.
- **04·5 Energy · 86%:** four steps, bottom 166, height = value / 86 × 8: x 19–31 (25%), 31–61 (49%), 61–101 (68%), 101–128.5 (86%). Day average 63 (time-weighted).

## 4. Motion

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | cards rise 46u, scale .9 → 1, tip back from 14° | staggered 0–.4 s, 1.15 s `expo.out` |
| | ticks and labels fade in left to right; the dim copy of each chart appears; the bright copy wipes in behind a moving edge | +.35–.55 s, 1.1 s `power3.inOut` |
| | numbers count up, scoreboard style; each change ripples through the dots | 1.35 s `power3.out` |
| Dots | each dot has a size spring (260/20, a small pop); a change starts at an origin and spreads 3.5–7 ms per u; dots slide on an x spring when the number gets wider | continuous |
| Lens | dots within ~18u of the pointer grow up to ×1.42 | continuous |
| Scrub | the number shows the picked moment; a thin line marks it; everything after it dims to 22% behind an edge spring (220/26) | continuous |
| Pill | pill pops (`back.out(3)`), the unit slides up; energy's toggle knob slides; stress's pulse redraws | .5 s |
| Lean | card turns up to ±3.5° / ±4.5° toward the pointer (heart ±2.6°), soft glare follows it | springs 120/18 |
| Idle | heart icon beats at the shown bpm (with a second, softer beat) and the newest bar swells with it; stress dots breathe ±10%; wallpaper blobs drift and follow the pointer a little | |
| Live (gallery button) | every 1.6 s a new heart bar slides in from the right (`expo.out`), resting bpm and HRV drift; activity sometimes gains a minute and its last block widens | |

## 5. Interaction and accessibility

- Each chart row is a `role="slider"` with `aria-valuetext` ("Heart Rate: 69 bpm, at 12:25 PM"). Arrow keys step 15 minutes (Shift: one hour), a dot (stress) or a bar (heart); Home / End; Escape returns to now. A polite live region repeats keyboard and pill changes.
- Pointer: hover with a mouse, press and drag with touch (`touch-action: pan-y`, so the page still scrolls); after a touch the card goes back to now after 1.4 s.
- Pills are buttons (`aria-label` says what they switch to); sleep's two icons are toggle buttons with `aria-pressed`.
- The gallery's sub-number chips (04·1 … 04·5) call `api.focus(i)`: that card lifts and its chip lights up, the others dim.
- **Reduced motion:** no intro (a .5 s fade), no lean, lens, glare or idle motion, numbers change at once, the dimming edge jumps.

## 6. Performance

- 525 dot circles in all; a dot's `r` / `cx` is written only when it changes, so a resting set writes almost nothing per frame.
- Cards, glare and wallpaper move with `transform` / `opacity`; the dimming is one clip rectangle per card.
- The loop stops off screen or in a hidden tab.

## 7. Porting notes

- `FONT`, `PITCH` and `DOT_R` are the dot font; `Dots` is a self-contained dot-matrix number (left- or right-aligned) that can be reused anywhere.
- `GRID` maps the small cards' tick row to time (`c.start` = the first label's time in minutes); the heart card maps bars with `HX` / `HY`.
- The number chips above the cards (`.s04-tag`) belong to the gallery, not to the design: drop them in the app.
