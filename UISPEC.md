# Intro + project carousel — SUMATTHEW

## Component

`IntroHome` + `ProjectCarousel` on `/`

## Layout

- White field, black type.
- **Rise:** small centered lockup, `SU` Inter Semibold caps + `MATTHEW` Cormorant Semibold italic caps, same size and shared cap line, letters rise from a clip.
- **Split:** the paused featured still (AirAlly Main Hero) pops in between `SU` and `MATTHEW` on one line and is what parts the lockup.
- **Settled:** the still and type enlarge while moving into their final layout — caption space is reserved from the start of this move so the featured still does not drop when titles appear. Featured media becomes the carousel slide (max 450×550, 9:11, scales down to the leftover viewport) and sits at the top of the leftover field under `--space-wordmark-gutter`. Lockup sits on one line at the bottom.
- **Projects:** AirAlly (Main Hero video, featured), RealView (image), WhoSays (WhoSalads2 still; MP4 plays only while selected). Older AirAlly hero files are not in the strip.
- **Project pages:** AirAlly opens at `/projects/airally`. Wordmark returns home. Hero copy on the left, product still in the center. No video on the case-study page.
- **Carousel:** full-viewport repeating strip of uploaded projects only (no gray placeholders). Side slides share one size (78% of featured width, 72% of featured height). `--carousel-gap` (10px) sits between the featured work and each neighbor, and between every pair of side slides. Every still, including the selected work, uses `--radius-media` (2.5px). Immediate neighbors sit on the featured midline so the selected work stays raised; farther clones drop by `--carousel-curve` per slot so the strip reads as a curve. After the featured settle, side stills slide down from the top of their boxes — they do not pop in. Enough clones are always mounted that the row never shows a blank edge or a slide popping in.
- **Captions:** two lines above every card, left-aligned to the image — project name in Inter SemiBold (600), client in Inter Regular (400), same family as About / Contact. Type is not shown. Name and client are `1rem`.

## Interaction

- Sequence is automatic on first load.
- After settle, the strip is still until the user acts.
- Wheel, trackpad, swipe, or arrow keys move one slot and wrap forever. Slot motion is `--duration-carousel` (0.6s).
- Click a side slide to bring that slide to the center (multiple steps if it is the far clone). Click the selected AirAlly slide to open `/projects/airally`. Other center slides do nothing until they have a page.
- Click homepage SUMATTHEW (after settle) to open `/about`. Side and center stills retract; the lockup keeps its homepage size and center and slides straight up to the top, then stays there. Inner-page wordmarks on project pages go home, not About.
- Video is muted and `playsInline`. The center video loops. WhoSays shows its PNG thumbnail unless it is the selected slide, then it plays the MP4 and holds the last frame for 2s before replaying. AirAlly uses Main Hero: first frame when not selected, plays when selected. Image slides stay static.
- `prefers-reduced-motion: reduce` jumps to the settled layout and snaps slots with no tween.

## Accessibility

- One `h1` named SUMATTHEW.
- Carousel is a `region` named “Projects”.
- Active slide is `aria-current="true"` and named after the project.
- Side slides are buttons, minimum 44×44, visible `:focus-visible` ring.
- Arrow keys move the strip. Live region announces the active project.
- Contrast 21:1 on type. Placeholder cards are 10% black on white.

## Definition of done

- [x] Letters rise, then the video pops in between `SU` and `MATTHEW` on one line.
- [x] Center video loops when selected; side copies stay paused.
- [x] Featured AirAlly video paints on first homepage load. Do not seek the visible video before it has metadata.
- [x] Still and type enlarge while settling: video to the carousel (max 450×550, scales down), lockup to the bottom.
- [x] Wheel / swipe / arrows snap one slot; the strip wraps with no blank edge.
- [x] Side click brings that slide to center; selected AirAlly opens its project page.
- [x] Center slide is large and raised; neighbors are 78% wide; farther clones sit lower so the strip curves.
- [x] The strip already spans the full viewport; scrolling does not spawn a new slide.
- [x] No overflow at 375 / 768 / 1280.
- [x] Reduced-motion users see the settled state only, and carousel snaps without a tween.
- [x] Homepage SUMATTHEW click retracts the strip and slides the name up to center top at the same size. About keeps that lockup at the top.

## BMW Passport case study — `BmwCaseStudy`

### Component
`BmwCaseStudy` on `/projects/bmw`. Dark surface already owned by `project-page`.

### Layout
- Header unchanged: SUMATTHEW + ColourPADS.
- Opening: light uppercase `BMW PASSPORT`, role / practice / span / client meta.
- Numbered chapters: 01 challenge, 02 research, 03 opportunity, 04 companion, 05 concept exploration and testing, 06 final, 07 marketing, 08 reflection.
- 08 is supplied copy only: title, chosen-project line, What I LIKED / LEARNED / LACK / LONG FOR. Same chapter grid and measure as 01. No cards or dividers.
- Ghost plates where UI stills will go. No invented screenshots.

### Interaction
- In-page chapter links, 44×44, visible focus on dark.
- No carousels. Scroll only.

### Accessibility
- One visible `h1`: BMW Passport.
- Body contrast on dark charcoal ≥ 4.5:1.
- Slots are labeled for upcoming images.

### Definition of done
- [x] Challenge, problem, and lead-to-build process are on the page.
- [x] Layout is not the AirAlly two-column story.
- [x] No UI photographs until supplied.
- [x] 375 / 768 / 1280 do not overflow.
- [x] Wordmark still returns home.
- [x] 08 sits after Visual marketing with the supplied reflection copy.
- [x] Four parts are titled What I LIKED / LEARNED / LACK / LONG FOR. No invented sentences.

## Top chrome

### Layout
- No About / Contact tabs and no top-left role line.
- Inner pages keep the wordmark (and optional mark) in the sticky header.

### Definition of done
- [x] Home has no top chrome besides the carousel and wordmark.
- [x] Project pages keep the wordmark.

## WordmarkCursorHint

### Layout
- Fixed chip, copy `Click Me!`, Inter SemiBold caption size, inverted fill.
- Position from `--bubble-x` / `--bubble-y` (pointer `clientX` / `clientY`) plus `--space-split` down-right.
- Rotated-square tail at the chip’s top-left. Not interactive.

### Interaction
- Visible only while the pointer is over SUMATTHEW (home lockup halves or inner-page wordmark).
- Tracks the pointer on `pointermove`. Hides on leave unless the next target is still SUMATTHEW.
- Does not follow the cursor over the carousel or page chrome.

### Accessibility
- `aria-hidden="true"` (visual hint only). Inner-page wordmark keeps its home `aria-label`.
- Bubble has `pointer-events: none`. Wordmark links keep a 44×44px hit area.

### Definition of done
- [ ] Hover SU or MATTHEW on home: bubble appears at the pointer with `Click Me!`.
- [ ] Moving within the lockup updates position; leaving the letters hides it.
- [ ] Hover on inner-page SUMATTHEW shows the same chip; hover elsewhere does not.
- [ ] 375 / 768 / 1280: chip stays on-screen while hovering the letters.

## About field — `AboutField`

### Layout
Follows iamrossmason.com/about. White field, Inter + Cormorant. Large homepage SUMATTHEW stays top-center as the home control.
- Hero: bio left, AirAlly still + ABOUT ME right, pinned to the bottom of the first screen.
- Chapters 01–03: small index, mixed-case display headline (sans caps with italic serif inserts), bracket label left, muted body right.
- Supplied About copy is in the bio and chapter bodies. Headlines, labels, and lead lines are structural and meant for review.

### Accessibility
- One `h1`: About Me (visually hidden).
- Body copy 4.5:1 on the muted mix. Wordmark remains 44×44.
- No overflow at 375 / 768 / 1280.

### Definition of done
- [x] Panel layout removed.
- [x] Hero matches Ross: display + bio / kicker.
- [x] Numbered chapters match Ross: index, mixed headline, label, copy.
