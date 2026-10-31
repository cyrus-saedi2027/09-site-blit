# هیرو · نسخه‌ها · Hero versions

همه‌ی نسخه‌های هیرو اینجا کنار هم هستن. `index.html` همین پوشه یه صفحه‌ست با زبانه‌های ۱ تا ۸ که هر نسخه رو زیرش نشون می‌ده، برای مقایسه.

Every hero version, side by side. `index.html` in this folder is the comparison page: tabs 1–8 on top (or keys 1–8, or `#v1` … `#v8` in the URL), and the chosen version underneath.

| Version | Folder | What it is | Status |
|---|---|---|---|
| ۱ | [`v1/`](v1/) | First round: WebGL stage with stage lights reacting to synthesised music, ticket deck, big countdown, bento player | kept for comparison |
| ۲ | [`v2/`](v2/) | Sharp photos, the featured rail like reference B, a date card, the player with rhythm detection, four reaction modes | kept (the owner's preferred base so far) |
| ۳ | [`v3/`](v3/) | Graphic posters (original artwork) in a calm, poster-centred layout | kept for comparison; the owner didn't like it |
| ۴ | [`v4/`](v4/) | Formal editorial spread with more life: colour photo melting into the page, the show's own colour, Nastaliq line, drifting light and a cursor spotlight, light that breathes with the music | kept for comparison; the owner didn't find it interesting |
| ۵ | [`v5/`](v5/) | Built closely on the owner's two references: a cut-out performer tinted in the show's colour in front of a striped circle of light that moves with the music, a huge condensed two-line title with a Nastaliq line, a ticket card, featured cards, countdown and player | kept; the owner liked it («خیلی بهتره») |
| ۶ | [`v6/`](v6/) | v5's stage working with whatever the admin has. The organiser's poster or banner becomes a big ticket. A person is cut out of a photo or poster by the server. Otherwise a ready-made 3D object stands in. Colours come from a fixed 8-colour palette suggested from the image. Includes a demo admin panel and the tools (`v6/tools/`) | kept; the owner likes it, but it is busy and needs a cut-out person or a tilted ticket |
| ۷ | [`v7/`](v7/) | Third round, rebuilt from a screenshot the owner sent of the reference. The show's photo fills the screen, starts zoomed in and slowly zooms out while its seconds pass, then fades into the next. The words sit on the left, right-aligned: title, venue and date, two lines of description and a buy button in the show's colour. A column of 16:9 cards with up and down buttons sits on the right. The header is a floating capsule with softly rounded corners. The music is in the header | kept; the owner likes it, but it is only a photo with words on it, and a real banner (words already in the image) collides with them |
| ۸ | [`v8/`](v8/) | Fourth round: the **featured slot**. Whatever an organiser uploads is shown whole and uncropped, because real banners have their words baked in. Three templates the admin picks from: **banner** (the banner in a frame with a strip of facts under it: type, title, date card, venue, price, buy button), **poster** (the poster whole, the words beside it) and **photo** (v7: full screen, zoom-out, fade). Behind a banner or poster sits the same picture, tiny and blurred, so any shape fills the screen and the page takes its colours. The capsule header, the rail, the music and the fixed palette are v7's and v6's. Includes a demo admin panel (template, your own image, colour, texts). Uses four real shows (banner + poster each; the files aren't in git) | new, waiting for feedback |

Each version has its own `SPEC.md` handoff and assets. The songs are shared in `assets/music/` and aren't committed (see the README there). Version 8's real posters and banners aren't committed either (`v8/assets/events/README.md`).

```bash
cd ui-reference && npx http-server -p 8000
# open http://localhost:8000/01-hero/         (the comparison page)
# or   http://localhost:8000/01-hero/v8/      (one version on its own)
```
Version 1 needs WebGL for its stage; without it, it shows a CSS fallback.
