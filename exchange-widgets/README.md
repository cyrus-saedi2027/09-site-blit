# ویجت‌های اپلیکیشن صرافی · Exchange Widget Lab

این پوشه کتابخونه‌ی ویجت‌های اپلیکیشن صرافیه. هر ویجت یه **شماره** داره (۰۱، ۰۲، …) که هم تو صفحه کنار خودش نوشته شده و هم اسم پوشه‌ش با همون شروع می‌شه. از ۰۴ به بعد هر شماره یه **مجموعه**‌ست: همه‌ی طرح‌های یه عکس که هارمونی یکسانی دارن، و هر کارتش یه زیرشماره داره (مثلاً ۰۴·۲). هر وقت درباره‌ی یه ویجت حرف می‌زنیم، فقط شماره‌ش رو می‌گیم.

This folder is the widget library for the exchange app. Every widget has a **number** (01, 02, …) that is printed on its stage in the gallery and starts its folder name. From 04 on, a number is a **set**: all the designs of one reference shot, which share one look; each card in it has a sub-number (04·1, 04·2, …) printed above it. The gallery page shows all widgets on one background, live, with their motion and interaction. Each widget's `SPEC.md` is the handoff for building it in the real app. This is separate from `ui-reference/` (the ticketing site).

## چطور ببینی · How to view

- Open `index.html` in a browser (double-clicking works). Fonts and GSAP come from Google Fonts and cdnjs, so be online.
- Or serve the folder:

```bash
cd exchange-widgets && npx http-server -p 8000
```

- Private preview (owner only): https://claude.ai/artifact/BTiquurgTiZ1PMPsitsU8i
- `index.html?still` shows the final frame with no motion (for screenshots).
- Top bar: **حرکت آهسته** slows every motion to a quarter of its speed; the sun/moon button switches the background between dark and light (widgets keep their own colours).

## ویجت‌ها · Widgets

| # | ویجت | Widget | Folder | Status |
|---|---|---|---|---|
| 01 | بودجه‌ی هفتگی | Budget · weekly chart, from the owner's reference shot: rolling numbers, scrub the chart, throw the bills, 3D tilt | [`widgets/01-budget`](widgets/01-budget/) | first version |
| 02 | اندازه‌ی بازار | Market size · quarterly chart, from the owner's reference shot: dark card with blue light, the white/grey split follows the scrub, red/green tooltip, ⋮ menu (quarterly / yearly, forecast on/off), pointer-lit rim | [`widgets/02-market-size`](widgets/02-market-size/) | first version |
| 03 | تحلیل درآمد | Revenue analytics · monthly chart, from the owner's reference shot: glass card with a neon rim kept at the shot's 3D angle and floor light; it turns to face you, the rim follows the pointer, a probe and glass tooltip ride the curve, working "This Month" (zoom to 7 days), month and "⋯" (compare with last month) menus | [`widgets/03-revenue`](widgets/03-revenue/) | first version |
| 04 | سلامت روزانه (مجموعه، ۵ کارت) | Daily health · a set of five dot-matrix cards from one shot: **04·1** Activity, **04·2** Sleep time, **04·3** Heart Rate, **04·4** Stress, **04·5** Energy. The dot font is read off the shot; numbers ripple dot by dot, every chart scrubs (the rest of the day dims behind a moving edge), the side pills switch the measure, the heart beats at its bpm | [`widgets/04-health`](widgets/04-health/) | **new, waiting for feedback** |
| 05 | گزارش پیشرفت | Progress Report · weekly steps, from the owner's shot (it had one design, so 05 is one card): the panel's colours are sampled from the shot and live (they drift, follow the pointer, ring when pressed); "+" turns into × and opens seven daily goal capsules to scrub; the red pill flips between steps and percent | [`widgets/05-progress`](widgets/05-progress/) | **new, waiting for feedback** |
| 06 | بینش و نرخ تبدیل (مجموعه، ۲ کارت) | Insights pager · **06·1** Insights (revenue growth, orange) and **06·2** Conversion (blue). In the shot they are pages 4 and 5 of one deck; here each card is its own six-page deck: dashes, swipe or keys turn pages (charts morph, numbers roll), a working Daily / Weekly / Monthly menu, the marker and the glowing dot scrub their charts, "Explore more +" opens a glass panel, the fitted background lights lean toward the pointer | [`widgets/06-insights`](widgets/06-insights/) | **new, waiting for feedback** |
| 07 | کارت‌های پوشه‌ای (مجموعه، ۶ کارت) | Folder cards · six black folder-shaped widgets: **07·1** clock & sleep, **07·2** flight, **07·3** walking, **07·4** stock, **07·5** recorder, **07·6** radio. All controls work: the clock runs, the recorder records / pauses / flags, the radio tunes by dragging the dial and seeks stations, the stock ticks and converts currencies, the flight swaps direction, every strip scrubs | [`widgets/07-folders`](widgets/07-folders/) | **new, waiting for feedback** |
| 08 | درآمد زنده | Live earnings · rewards and APR, from the owner's shot (one design, so 08 is one card): the rewards count up live, the chart flows and scrubs, the yellow APR knob drags and recomputes the totals, the "24h" chip turns through 7d / 30d / 1y | [`widgets/08-earnings`](widgets/08-earnings/) | **new, waiting for feedback** |

## ساختار · Structure

```
exchange-widgets/
  index.html            the gallery: masthead, then one stage per widget
  lab/lab.css           background, layout, dark (default) and light themes
  lab/lab.js            registry, theme and slow-motion tools, background, plays each intro when the widget comes into view
  lab/kit.js            helpers the sets share: springs, rolling digits, monotone curves, pointer
  widgets/01-budget/    widget.js (markup and behaviour), widget.css, SPEC.md
  widgets/02-market-size/  the same three files
  widgets/03-revenue/      the same three files
  widgets/04-health/       a set: set.js, set.css, SPEC.md
  widgets/05-progress/     the same three files (a set of one card)
  widgets/06-insights/     the same three files (a full-width set: `.stage.is-full`)
  widgets/07-folders/      the same three files (full width; uses Oswald for the numbers)
  widgets/08-earnings/     the same three files (one card)
  tools/bundle.mjs      builds single-file copies into dist/ (one to send, one for a claude.ai Artifact)
```

```bash
node tools/bundle.mjs
```

## اضافه کردن ویجت تازه · Adding a widget

1. Take the next free number, e.g. `02`, and make `widgets/02-<name>/` with `widget.css`, `widget.js` and `SPEC.md`.
2. `widget.js` registers itself: `WidgetLab.register({ id: 2, slug, mount(host) { …; return { intro, replay, setLive, setVisible } } })`. The lab calls `intro()` the first time the widget is in view and `setVisible()` when it leaves or comes back.
3. In `index.html`: add the two files inside the `bundle:css` and `bundle:js` blocks, copy the `<article class="stage" id="w01">` block, change the number everywhere in it (`id`, the big number, the kicker, `data-mount`, the corner tag, the folder path) and add a chip to the `.index` list.
4. Prefix every class with the widget's number (`.w02-…`) so widgets never collide, and size everything from the container (`--u`), so a widget looks the same at any width.
5. Shared rules: continuous motion only on `transform` and `opacity`; always a reduced-motion path; stop the loop when off screen; GSAP 3.13 is the only library.
6. **A set** (one shot with several designs) works the same way with `set.js` / `set.css`, a `.stage.is-set` stage and a `.stage-subs` list of chips (`data-sub="0"`, …). Print each card's sub-number (`05·1`, …) next to it inside the set, and return `focus(i)` from `mount` so the chips can point at a card.

## قواعد مشترک · Shared rules

- Widgets are LTR and in English, like the references; the gallery around them is Persian and RTL.
- The widget number uses Latin digits (it matches the folder); Persian text uses Persian digits.
- Every number shown in a widget is sample data.
- The model name of the AI is never written in the code, the files or the commit messages.
