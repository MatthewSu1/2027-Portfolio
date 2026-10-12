# Wordmark + carousel research

Reference sites for a split sans + italic-serif name lockup and a centered project strip.

## iamrossmason.com (primary)

- Full-viewport white field, black type, no chrome on the intro frame.
- Name is one line: gothic/sans caps + italic serif lowercase, no gap.
- Type is viewport-sized (~17vw on display titles) so the lockup reads as the page.
- Letters rise from a clip mask (translateY ~105%), staggered ~70ms, ease cubic-bezier(0.075, 0.82, 0.165, 1).
- Italic serif uses the same em size and line-height as the sans so both halves share one cap line (not the 1.1em optical scale from the reference).
- Body uses `font-kerning: none` and antialiased smoothing.
- After the intro, work sits in an infinite horizontal strip. Neighbors share one midline; the middle slide is larger.
- Page scroll / wheel advances one project and wraps. No autoplay.
- Awwwards BTS: first scroll is meant to move the work, not the page.

## Comparable carousels

- **Basic / studio work indexes (Awwwards):** one featured still, dimmer neighbors, no dots or arrows. Focus stays on the image.
- **Apple product galleries:** snap-to-center, side items stay on the same baseline and scale down. Motion uses transform/opacity only.
- **Coverflow-style strips (Swiper / editorial portfolios):** cloned slides so the row never shows a blank edge; the active index wraps.

## Decisions we take

- Recreate the Ross Mason intro sequence: rise → split around a portrait still → enlarge → settle.
- Free pairing already in-repo: Inter Semibold + Cormorant Garamond Semibold Italic.
- Copy is `SU` + `MATTHEW` (italic caps).
- Video is paused (first frame). File is served from `/projects`.
- Settled homepage is an indexed infinite strip: wheel / swipe / arrows snap one slot; side click brings that slide to center. Selected AirAlly opens `/projects/airally`.
- Case study pages follow Ross Mason’s work-detail pattern: small home lockup, hero with basic info + the work, then short title + paragraph sections. Only AirAlly has a page so far.
- Uploaded projects only, cloned so rotation never ends. No gray placeholder cards.
- Center slide max 450×550 (9:11). Sides are 78% × 72% of that. A 10px (`--carousel-gap`) gutter sits between every tile. The selected work stays raised; farther slides drop so the row curves.

## BMW Group + Design Academy case study

References: BMW.com / BMW M product pages, BMW Type Next guidelines (2020), BMW Group digital CI.

- Dark charcoal canvas, not pure black. White type. Hierarchy from contrast and space, not shadow or radius.
- Display is light-weight and uppercase; body is sentence case. Inter stands in for BMW Type Next.
- Hairline rules. Rectangular geometry. No pills.
- Corporate BMW Blue for index numbers and links. ColourPADS cyan / navy / red only as a tricolor stripe — the Academy mark already on the page.
- Single content rail, wide measure. Process reads as a numbered spine, not Mason left-title / right-copy.
- Photography and UI stills go full-bleed when supplied; until then, token ghost plates.
- Closing reflections (QUT / Design Academy unit write-ups, BMW Group case closings, Polar / Pentagram project notes): stay on the numbered spine. Title, chosen-project line, then four short essays. No cards, quotes, or dividers. Measure stays `--bmw-measure`.

## Top chrome

References: iamrossmason.com (no chrome on the work index; name is the home control).

- No About / Contact tabs and no top-left role line. The work index is the page.
- Inner pages keep the wordmark top-left as the home control.
- Homepage SUMATTHEW is the About control. Click retracts the strip and slides the name up to center top, same size. That lockup stays on About.

## About page

Reference: iamrossmason.com/about.

- Full-viewport hero: wide white field under SUMATTHEW.
- First-screen footer: short bio left; AirAlly still + huge ABOUT ME right.
- Chapters: small `01.` index, mixed headline (uppercase Inter with lowercase Cormorant italic inserts), `[LABEL]` left, gray body right with a bold black lead.
- SUMATTHEW stays top-center as the home control. No shaped content panels.

## Wordmark cursor hint

References: Figma multiplayer cursor labels (name chip offset from the pointer, inverted fill, no lag), Linear hover chips (Inter-like sans, compact padding, sharp radius), Notion hover tooltips (appear only while the pointer is on the trigger; leave hides immediately).

- Follow `clientX` / `clientY` only while the pointer is over SUMATTHEW. Do not track the cursor elsewhere.
- Offset the chip down-right of the pointer so the glyph stays visible. `pointer-events: none` so the bubble cannot steal hover.
- Inverted field (fg fill, bg type) on light pages; invert again on the dark project surface.
- Inter SemiBold at caption size. Speech tail is a rotated square, not a pill. Radius matches media (`--radius-media`).
