---
name: image-processing-removebg-webp
description: Batch removebg + webp lossless conversion for all app images — in progress, 24 images remaining
metadata:
  type: project
---

# Image Processing: RemoveBG + WebP Lossless

**Status:** IN PROGRESS (paused) — 2026-05-21

## Goal
Remove backgrounds from all images in `frontend/public/assets/`, QA for sharpness, then convert to WebP lossless. Zero images missed.

## Current State
- **24 images still need background removal** (all plants/roots)
- **233 images already transparent** (just need webp conversion)
- **16 images skipped** (9 mascots raw + 6 PWA identity icons + 1 other)
- **6 mascots** were partially processed in first run (in `mascots_nobg/`)
- **No webp files created yet**

## Images still needing bg removal (24 files)

### processed_plants/*_raw.png (15 files):
ginger_1-5_raw.png, lemongrass_1-5_raw.png, lotus_1-5_raw.png

### processed_root/ (9 files):
plant_bacha.png, plant_camthao.png, plant_diephachau.png, plant_dotrong.png, plant_hungque.png, plant_khoqua.png, plant_lohoi.png, plant_nhansam.png, plant_oaihuong.png

## Infrastructure Ready

- **venv:** `venv_rembg/` — has rembg 2.0.75, onnxruntime, pillow, numpy
- **Model:** `birefnet-general` downloaded and cached in `~/.u2net/`
- **Script:** `scripts/process_all_images.py` — fully working
  - Reuses `post_process_mask()` from `scripts/process_plants.py`
  - Skips mascots via `SKIP_BG_DIRS = {"mascots"}`
  - Skips PWA icons via `SKIP_BG_NAMES`
  - Output: mascots → `mascots_nobg/`, raw → `.png` (no _raw), others overwrite
  - WebP: PIL `lossless=True, quality=100, method=6`
  - Manifest: `scripts/manifest.json`
- **Test result:** 1 image (ginger_1_raw.png) = 195s inference + 13s model load = ~3.3 min/image

## To Resume — Run this command

```bash
cd "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care" && source venv_rembg/bin/activate && python3 -u scripts/process_all_images.py 2>&1 | tee scripts/process_log.txt
```

**Estimated time:** 24 images × ~3.3 min ≈ 80 minutes total

## After Completion

1. Check `scripts/manifest.json` — verify 0 failed
2. Run `find frontend/public/assets -name "*.webp" | wc -l` — should be ~257
3. Spot-check 20 random images for transparency and sharpness
4. Sync `dist/`: `rm -rf frontend/dist/assets && cp -r frontend/public/assets frontend/dist/assets`
5. Run `npm run dev` to verify app loads correctly

## Related Files
- `scripts/process_all_images.py` — main batch script
- `scripts/process_plants.py` — original (reused post_process_mask)
- `scripts/process_mascots.py` — original (same mask logic)
- `venv_rembg/` — Python venv with all deps
- `deepsek.env` — DeepSeek API config (not related to this task)

## Why
User requested: "chạy removebg cho tất cả các ảnh, đảm bảo ảnh output rõ nét, QA ảnh sau khi output nếu ko đạt thì làm lại, sau khi remove bg xong chuyển webp lossless"
