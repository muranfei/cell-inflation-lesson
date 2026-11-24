# Cell Inflation — Bilingual EDA Lesson

A dark-teal bilingual lesson on congestion-aware cell inflation for placement.
The English-led videos, Chinese explanation, subtitles, presentation, exercises,
and browser lab use one consistent set of numbers.

## Website

**Live site:** <https://muranfei.github.io/cell-inflation-lesson/>

The public site is published from [`docs/`](docs/) with GitHub Pages.

## Lesson scope

- Why a congested region needs a stronger footprint signal for the next
  placement pass
- Mapping a 12×8 toy chip onto a 4×2 GCell grid
- Demand, capacity, congestion, and overflow
- The local width rule `w' = w × (1 + α(c − 1))`
- The lab values `demand = 7`, `capacity = 2`, `c = 3.5`, `α = 0.5`
- Correct multiplier `2.25×`
- A–D width `2 → 4.5`; E–F width `1 → 2.25`
- Why coordinates stay fixed and inflation is feedback rather than final layout
- Common implementation mistakes and a browser-lab walkthrough

## Site features

- English and Chinese interface switching
- English and Chinese 3:36 video versions with burned-in bilingual subtitles
- Ten chapter jumps and `0.75×`–`2×` playback speed
- Five bilingual scored exercises with feedback and reset
- Interactive 4×2 GCell experiment with a draggable hotspot, adjustable demand,
  capacity, and alpha, plus live congestion, overflow, multiplier, and widths
- Downloadable bilingual SRT and editable eight-slide PowerPoint
- Desktop and mobile responsive layout

## Local preview

Open `docs/index.html` directly, or run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/docs/`.

## Files

- `docs/videos/cell_inflator_full_en_v2.mp4`
- `docs/videos/cell_inflator_full_zh_v2.mp4`
- `docs/downloads/cell_inflator_full_bilingual_v2.srt`
- `docs/downloads/cell_inflator_lesson_deck_v2.pptx`
- `source/lesson-script-en.json`
- `source/lesson-script-zh.json`
- `source/lesson-timeline.json`
- `HANDOFF.md`

## Source and attribution

The lesson is adapted from EDA Learning's
[Congestion for EDA · Lab 08 Cell Inflation](https://yongfu-li.github.io/eda-learning/courses/learn_congestion/labs/cell-inflator/index.html).

The source course is licensed under CC BY 4.0. This repository adds a new
bilingual narrative, subtitles, animation, website, interactive experiments,
exercises, and editable presentation.

## Licensing

- Site code and build implementation: MIT, see [LICENSE](LICENSE).
- Original narration, bilingual lesson text, graphics, video, and presentation:
  CC BY 4.0, see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
- The linked source course remains attributed to its original authors.
