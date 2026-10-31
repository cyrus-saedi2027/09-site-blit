# ویجت ۰۱ · بودجه‌ی هفتگی · handoff spec

> **خلاصه برای خودت:** کارت سفید «Budget» با موجودی، تغییر هفته، سه اسکناس سه‌بعدی و نمودار هفت روز، دقیقاً از روی عکسی که فرستادی. ظاهرش عوض نشده؛ هر چی اضافه شده حرکت و تعامله.
> - **روی نمودار بکش یا بزن:** نشانگر روی خود خط سُر می‌خوره (فنری)، تولتیپ با کمی تأخیر دنبالش میاد و تاب می‌خوره، هر سه عدد (موجودی، تغییر، تولتیپ) مثل کیلومترشمار می‌چرخن، ستون اون روز روشن می‌شه. کلیک یا رها کردن، روز رو نگه می‌داره.
> - **اسکناس جلویی رو بکش و پرت کن** (یا فقط بزن): ۱۰۰ دلار از روزِ انتخاب‌شده به بعد اضافه می‌شه؛ برچسب «+$100» تا موجودی پرواز می‌کنه، نمودار فنری بالا می‌ره، اسکناس‌ها یکی جلو میان و یکی تازه از پشت میاد.
> - **ماوس روی کارت:** کارت سه‌بعدی کج می‌شه، هر اسکناس با عمق خودش جابه‌جا می‌شه، روی اسکناس‌ها باز می‌شن.
> - **همیشه:** اسکناس‌ها شناورن، نقطه‌های سفید داخل نمودار آروم بالا می‌رن و از ماوس فرار می‌کنن، هر چند ثانیه یه نور از روی خط رد می‌شه و به نوک فلش می‌خوره.
> - روی «+ $317» بزنی بین دلار و درصد عوض می‌شه.
>
> `widget.js` و `widget.css` همین پوشه مرجع زنده‌ان؛ تو گالری `../../index.html` ویجت شماره‌ی ۱ـه.

**Status:** first version, waiting for the owner's feedback. Built from the owner's reference shot (a light widget card in a grey tray). The static frame matches the shot almost pixel for pixel (positions measured from the image); everything new is motion and interaction.

---

## 1. Units and anatomy

All numbers are pixels of the reference image (**u**). The tray is **1021 × 1071 u**, the card **931 × 981 u** at (45, 45). Card coordinates below start at the card's top-left. CSS: `--u = 100cqi / 1021` on the widget's container; JS: `unit = stageWidth / 1021`.

| Part | Position (card u) | Notes |
|---|---|---|
| Tray | whole widget, radius 150 | presentation only (the shot's grey frame); in the app the card is the widget |
| Card | 931 × 981, radius 96 | white, shadow `0 20u 40u rgba(18,20,52,.2)` |
| "Budget" | x 89.5, baseline 196.6 | Outfit 500, 35.5 u, `#7c7c7c` |
| Total "$30.739" | x 90.2, baseline 313.5 | Outfit 400, 96.5 u, `#0a0a0b`; `.` groups thousands (as in the shot) |
| Badge "+ $317" | box 89, 355, 175 × 62, radius 31 | border 3 u `#dcdcdc`, fill `#f2f2f2`, Outfit 600, 34.7 u; trend icon 38.6 u box, stroke 2 (in a 24 grid) |
| Bills | one outline, three slots | see §3 |
| Chart columns | x 93.7 + 106.667·i, 7 columns | dividers at the column edges |
| Day labels | centres 147 + 106.667·i, baseline 890.7 | Outfit 500, 26.4 u, `#777` |
| Line | 8 points, stroke 7 u, corners rounded 22 u | `#1117B0`; fades in over x 89 → 214 |
| Marker | r 14.5 u, stroke 8 u | white fill, `#1117B0` ring |
| Tooltip | pill ≥ 125 × 58 u, nib 23 × 17.5 u, nib tip 31 u above the marker centre | gradient `#6a72f2 → #a1a4f7`, inner ring 2.6 u `#5a60e1`, Outfit 500 34.8 u white; soft glow `rgba(104,110,244,.42)` behind |
| Fill | from the line to y 874 | vertical gradient `#6067ee → #fff`, a blurred band of `#3a41db` under the line, white sheen on the right, fade on the left, a light spot under the marker |
| Sparkles | 27 dots, r 3.3 u | white, positions from the shot |

## 2. Data

```
open   433                                  week opening level (left end of the line)
values Sun 433 · Mon 610 · Tue 610 · Wed 750 · Thu 750 · Fri 654 · Sat 898
x      Sun 190 · Mon 299 · Tue 407 · Wed 495 · Thu 623 · Fri 731 · Sat 844   (end-of-day points; open at x 89)
y(v) = 793 − (v − lo) · 313 / (hi − lo)     lo = 433, hi = 910 at rest
```

- **Total** for the shown day = `29 989 + value` (so Wed shows **$30.739**).
- **Badge** = `value − open`, the change since the week opened (Wed: **+ $317**). Tap: `+ 1,04%` (= change / (29 989 + open)). A drop shows `− $…` and the trend arrow flips.
- **Tooltip** = the day's value (Wed **$750**).
- **Shown day** = the hovered day, otherwise the pinned day (Wed at rest).
- **Deposit** (+$100) is added to the pinned day and every day after it (a balance moves up from that day on).
- **Auto-scale:** when a value leaves 433–910, `lo`/`hi` widen (with 12–14 u of room) and tween with the values, so the line never runs under the bills.
- **Live** (gallery button): every 2.4 s each value takes a small random step (Sat a bigger one), morphing with `expo.out` over 1.2 s.

## 3. Bills

One outline (the front bill, curved like the shot) drawn in SVG; the other two are the same outline rotated around (134, 524):

| Slot | Rotation | Translate (about the bill centre 650, 395) | Left-end fade (local x) | z |
|---|---|---|---|---|
| back | −19.2° | −71.1, −149.5 | 503 → 591 | 2 |
| middle | −11.7° | −36.9, −102 | 474 → 562 | 3 |
| front | 0 | 0, 0 | none | 4 |

- Face gradient `#e2e2e4 → #fafafb` (light from the bottom left), holes `#dddde0 → #cdcdd1`, a white rim along the top edge, a 1.6/3.6 u edge in `#cfcfd4`, two soft shadows. The two back bills fade out on their left so they never cover the total.
- A fourth bill waits hidden; when the front one is thrown, middle → front, back → middle (`back.out(1.25)`, 0.8 s) and the hidden one slides into the back (`expo.out`, 0.9 s).

## 4. Motion

Springs are `k` (stiffness) / `c` (damping), stepped at 120 Hz. Every GSAP tween and every spring follow the gallery's slow-motion switch.

| Moment | What moves | Timing |
|---|---|---|
| Intro (once in view) | tray rises from 8 % lower, scale .9, tilted 16° back | 1.3 s `expo.out` |
| | "Budget" slides up | .2 s in, .8 s |
| | total spins up from $00.000, 3 extra turns, left to right | .3 s in, 1.9 s, stagger .085 |
| | badge pops (scale .55 → 1), digits spin, icon strokes draw | .62 s in, `back.out(2.2)` |
| | bills fly in from top-right (+330, −380 u, +48°, rotateX 58°, rotateY −46°, scale .62) | .24 s + .13 s per slot, 1.35 s `expo.out` |
| | dividers grow from the bottom, labels rise | .55–.6 s in |
| | line draws left → right with a light at its tip; fill uncovers behind it | .78 s in, 1.25 s `power2.inOut` |
| | marker pops (`elastic.out(1,.48)`) with a ripple; tooltip drops (`back.out(2.4)`) and rolls up to $750 | 1.5–1.7 s |
| | arrowhead opens (`back.out(3.2)`) and pings; sparkles fade in; idle motion ramps up | 1.75–3.5 s |
| Scrub | marker x spring 230/23 riding the line; tooltip chases it (150/19) and leans by its lag (±16°, 210/13); marker bump on each new day; column light (260/26); numbers roll (.8–.95 s `expo.out`, rightmost digit first, up for gains, down for drops) | continuous |
| Leave | back to the pinned day after .42 s | |
| Bill drag | follows the finger, tilts by speed (rotate ±28°, rotateX/Y ±24/30°) | direct |
| Release | throw if speed > 900 u/s or distance > 170 u, else spring home (`elastic.out(1,.45)`, .9 s) | |
| Throw / tap | bill flies along the throw (≥ 1300 u/s) with spin, fades; "+$100" chip arcs to the total; on landing: chart springs (`elastic.out(1,.5)`, 1.25 s), total pulses, sparkles burst, dots kick up, a light runs along the line | ~1.6 s |
| Tilt | card rotateX ±5.5°, rotateY ±7° toward the pointer (110/17); floor shadow moves against it; bills parallax by depth .45 / .75 / 1.1 | mouse and pen only |
| Fan | pointer over the bills: spread ±4.2° per slot, front lifts 10 u | 160/18 |
| Idle | bills float (5.5 u, periods 5.4–7 s); dots rise 4–12 u/s, sway, twinkle, dodge the pointer (90 u radius); marker breathes; halo ring every 2.6 s; light along the line every 3.2–5.2 s, then an arrow ping | |
| Badge tap | 360° flip on X while the value changes unit | .7 s `back.out(1.6)` |

## 5. Interaction and accessibility

- Chart: `role="slider"` (0–6), arrow keys / Home / End pin a day; `aria-valuetext` reads "Wed: $750, budget $30.739". `touch-action: pan-y`, so a vertical swipe still scrolls the page.
- Bills: one grab area over the stack (`touch-action: none`); it is a button, so Enter / Space throws a bill.
- Badge: a button; its label says what a tap does.
- A polite live region repeats the shown day, value and total.
- **Reduced motion:** no intro (a .5 s fade), no idle motion, no tilt or parallax, numbers change without rolling, a thrown bill just fades. Everything still works.

## 6. Performance

- Continuous motion only on `transform` / `opacity`. The chart path is rebuilt only while data changes.
- The blur under the line lives in a layer that is static at rest; the dots, column light and marker are in their own SVG layers.
- The loop stops when the widget is off screen or the tab is hidden (`setVisible`), and only writes styles that changed.
- Measured in headless Chromium (software rendering): about 14 ms of script per second at rest.

## 7. Porting notes

- The geometry is all in `widget.js` (`VX`, `MAP`, `BILL`, `SLOTS`, `DOTS`); everything else is relative to the card.
- On a native platform the same parts map to: the card and tray (views with shadows), the bills (one vector path, three transforms), the chart (one path + gradient + a blurred copy of the line), the odometer (a clipped column of digits per place).
- The tray is the reference's presentation frame; drop it if the app shows the card on its own.
