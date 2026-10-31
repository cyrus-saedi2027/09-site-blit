# ویجت‌های اپلیکیشن صرافی · Exchange Widget Lab

این پوشه کتابخونه‌ی ویجت‌های اپلیکیشن صرافیه. هر ویجت یه **شماره** داره (۰۱، ۰۲، …) که هم تو صفحه کنار خودش نوشته شده و هم اسم پوشه‌ش با همون شروع می‌شه. هر وقت درباره‌ی یه ویجت حرف می‌زنیم، فقط شماره‌ش رو می‌گیم.

This folder is the widget library for the exchange app. Every widget has a **number** (01, 02, …) that is printed on its stage in the gallery and starts its folder name. The gallery page shows all widgets on one background, live, with their motion and interaction. Each widget's `SPEC.md` is the handoff for building it in the real app. This is separate from `ui-reference/` (the ticketing site).

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
| 01 | بودجه‌ی هفتگی | Budget · weekly chart, from the owner's reference shot: rolling numbers, scrub the chart, throw the bills, 3D tilt | [`widgets/01-budget`](widgets/01-budget/) | **new, waiting for feedback** |

## ساختار · Structure

```
exchange-widgets/
  index.html            the gallery: masthead, then one stage per widget
  lab/lab.css           background, layout, dark (default) and light themes
  lab/lab.js            registry, theme and slow-motion tools, background, plays each intro when the widget comes into view
  widgets/01-budget/    widget.js (markup and behaviour), widget.css, SPEC.md
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

## قواعد مشترک · Shared rules

- Widgets are LTR and in English, like the references; the gallery around them is Persian and RTL.
- The widget number uses Latin digits (it matches the folder); Persian text uses Persian digits.
- Every number shown in a widget is sample data.
- The model name of the AI is never written in the code, the files or the commit messages.
