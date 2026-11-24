# Cell Inflation 双语课程包 · 交接说明

更新日期：2026-11-24

## Final deliverables

- English video: [cell_inflator_full_en_v2.mp4](docs/videos/cell_inflator_full_en_v2.mp4)
- Chinese video: [cell_inflator_full_zh_v2.mp4](docs/videos/cell_inflator_full_zh_v2.mp4)
- Bilingual subtitles: [cell_inflator_full_bilingual_v2.srt](docs/downloads/cell_inflator_full_bilingual_v2.srt)
- Web entry: [docs/index.html](docs/index.html)
- PowerPoint: [cell_inflator_lesson_deck_v2.pptx](docs/downloads/cell_inflator_lesson_deck_v2.pptx)
- Public repository: <https://github.com/muranfei/cell-inflation-lesson>
- Live lesson: <https://muranfei.github.io/cell-inflation-lesson/>

网站目录只保留 v2 媒体和下载文件。旧 v1 数值错误，已移出网站目录并保留在
`work/analysis/web-v1-archive/`，不得作为公开交付使用。

## Public delivery

- Repository: `muranfei/cell-inflation-lesson`
- GitHub Pages: <https://muranfei.github.io/cell-inflation-lesson/>
- Pages source: `main` branch, `/docs`
- Pages build status: `built`
- Validated content commit: `1fffd07de9e787a26f824fa405d1009922afaa6b`
- Live validation: 24/24 checks passed on 2026-11-24 at 17:51
  Asia/Shanghai.
- Both videos loaded with duration 216.633 seconds. The MP4, SRT, and PPTX
  downloads returned HTTP 200 with the expected byte sizes.
- EN/ZH switching, both video switches, speed control, ten chapters, online
  seeking, five scored exercises and reset, all interactive-lab controls, and
  the interactive-lab reset passed.
- The 390-pixel mobile layout had no horizontal overflow and retained the
  two-column lab.
- No console errors, page errors, failed requests, HTTP 4xx/5xx responses, or
  v1 media requests were recorded.

## Source and scope

- Source:
  <https://yongfu-li.github.io/eda-learning/courses/learn_congestion/labs/cell-inflator/index.html>
- Module: `module03-01-cell-inflator`
- License: source course is CC BY 4.0; this package attributes the source and
  describes the modifications.
- Lesson goal: explain how local congestion becomes a modeled-width signal for
  the next placement pass.
- Audience: learners who know basic placement but are new to congestion-aware
  cell inflation.
- Core example: 12×8 chip, 4×2 GCell grid, one clustered seed, demand 7,
  capacity 2, congestion 3.5, capacity deficit/overflow 5.
- Width rule: `w' = w × (1 + α(c − 1))` when `c > 1`; `α = 0.5`.
- Correct multiplier: `1 + 0.5 × (3.5 − 1) = 2.25`.
- Correct widths: A–D `2 → 4.5`; E–F `1 → 2.25`; coordinates remain fixed.
- Requested changes: English-led narration, bilingual subtitles, bilingual web
  lesson, scored exercises, interactive lab, downloadable presentation, local
  and online testing, public GitHub repository and Pages.

## Production settings

- Video: H.264 High, 1920×1080, 30 fps, 6499 frames, 216.63 s.
- Audio: AAC LC, 48 kHz, stereo, 192 kb/s.
- Voices: English `en-US-AvaMultilingualNeural`; Chinese
  `zh-CN-XiaoxiaoNeural`; both at `+3%` rate.
- Music: original generated light instrumental bed, sidechain-ducked under
  narration.
- Subtitles: burned into each video, with matching English/Chinese cues in the
  bilingual SRT.
- English loudness: −14.6 LUFS integrated; true peak −1.9 dBFS.
- Chinese loudness: −14.5 LUFS integrated; true peak −2.0 dBFS.
- A/V end drift: 63 ms; all ten scene starts have an audio soundtrack onset
  immediately after the cut. This is a stream-length difference only and is
  below one tenth of a second.

## Validation

- Video decode: full decode passed for both final MP4 files.
- Video streams: the English and Chinese final videos and the silent source
  share video-stream MD5 `c227ffda3cf16569ac7e0bdc7c53a1f0`.
- Spectral peaks: `sustainedPeakCountAbove6kHz = 0` for both final videos.
- Scene onsets: 10/10 present; no missing onsets.
- Website: 42 automated checks passed across direct file opening, local HTTP,
  desktop and mobile. Covered EN/ZH switching, video switching, speed control,
  chapter seeking over HTTP, five scored exercises and reset, the interactive
  4×2 GCell lab, downloads, console errors and failed requests.
- GitHub Pages: 24 additional online checks passed against the public URL.
- Mobile: no horizontal overflow; interactive grid collapses to two columns.
- Presentation: 8 slides, native editable objects, eight speaker notes, one
  cover video frame, package integrity pass, layout pass, font-policy pass, and
  successful first-party import.
- Presentation arithmetic: slides 5 and 6 show the corrected `2.25×`; no `1.25`
  appears in the final v2 deck.
- SRT: 30 bilingual cues; correct `2.25`; no `1.25`.
- Public website scan: no v1 media references and no incorrect `w' = 1.25w`.

Useful commands:

```powershell
$ffmpeg = 'C:\Users\17946\Documents\Codex\2026-11-10\4-17-502-1-10-https\work\video-tools\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v9.0.2.exe'
& $ffmpeg -v error -i outputs\cell_inflator_full_en_v2.mp4 -f null NUL
& $ffmpeg -v error -i outputs\cell_inflator_full_zh_v2.mp4 -f null NUL

$node = 'C:\Users\17946\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.EXE'
$env:FFMPEG = $ffmpeg
& $node work\verify_cell_av_sync.mjs outputs\cell_inflator_full_en_v2.mp4 work\full_timeline.json
& $node work\verify_cell_av_sync.mjs outputs\cell_inflator_full_zh_v2.mp4 work\full_timeline.json

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
& $node work\site_test.mjs outputs\cell_inflator_web_v1 $edge work\analysis\site-tests-final-clean
```

## Paths and hashes

| File | Bytes | SHA-256 |
|---|---:|---|
| `docs/videos/cell_inflator_full_en_v2.mp4` | 15,469,407 | `96a5af787f4e99af60d6a459e78dec2f415b8e1ddb0f4c127e43f617ffe7d274` |
| `docs/videos/cell_inflator_full_zh_v2.mp4` | 15,440,101 | `4b3b1529ec80e6f3ae38d2971b34ecb419caa4e3ddb878f106ae3350663a3dcb` |
| `docs/downloads/cell_inflator_full_bilingual_v2.srt` | 3,935 | `d6b698ec445bab08b317562cbedb2cfc2a4feac513b086de5de45219101b1d96` |
| `docs/downloads/cell_inflator_lesson_deck_v2.pptx` | 161,356 | `c4050006d199e740e2fbc6b2ff986bc32d7d5161155f93c6954f4e7be9d9be46` |
| `docs/index.html` | 24,957 | `cd5089ecffb1a4f0d1853682bceb778884e0af3d85fc44ae788018446d57991b` |
| `docs/styles.css` | 33,917 | `8d00397b67a960e2e2c4465d67975c21195f53dc57f9e85c5b27c07df1fb93dc` |
| `docs/app.js` | 17,060 | `595a9e872722967bb2e228df111be440f5ba2b01a69371b070de5c0dd6adf58f` |

## Assumptions and limitations

- The source is a teaching toy, not a production router or placement engine.
  The lesson explicitly limits claims to local feedback behavior.
- Width inflation is not final physical cell resizing. Coordinates stay fixed
  and the inflated state is reset before another pass.
- Chromium may refuse random seeking for an MP4 opened through `file://`; all
  page interactions work directly from `index.html`, while chapter seeking is
  verified over HTTP and GitHub Pages.
- The final media deliberately keeps versioned filenames. Do not replace v2
  with the historical v1 files.
- The v1 deck is retained locally only for audit history; it is not linked or
  copied to the public repository.

## Attribution

Original lesson source: EDA Learning, *Congestion for EDA · Lab 08 Cell
Inflation*,
<https://yongfu-li.github.io/eda-learning/courses/learn_congestion/labs/cell-inflator/index.html>.

This adaptation adds new bilingual narration, subtitles, animation, website,
interactive experiments, exercises, and presentation. The source course is
licensed under CC BY 4.0.
