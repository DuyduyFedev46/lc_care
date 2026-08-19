#!/usr/bin/env python3
"""
Batch: classify -> removebg -> QA -> webp lossless
Reuses post_process_mask from scripts/process_plants.py
Output manifest: scripts/manifest.json
"""
import json
import sys
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageFilter
import numpy as np
import rembg

ASSETS_DIR = Path("frontend/public/assets")
MANIFEST_PATH = Path("scripts/manifest.json")
MODEL = "birefnet-general"

# PWA identity icons — solid by design, do NOT remove background
SKIP_BG_NAMES = {
    "favicon-16.png", "favicon-32.png", "icon-192.png", "icon-512.png",
    "apple-touch-icon.png", "app_logo.png",
}
# Directories to skip for background removal (webp still converted for output)
SKIP_BG_DIRS = {"mascots"}

# ============================================================
# post_process_mask — identical to process_plants.py:19-44
# ============================================================
def post_process_mask(rgba: Image.Image) -> Image.Image:
    r, g, b, a = rgba.split()
    a_np = np.array(a, dtype=np.float32)
    a_np[a_np < 15] = 0
    a_np[a_np > 220] = 255
    edge_mask = (a_np > 10) & (a_np < 220)
    if edge_mask.any():
        a_smooth = Image.fromarray(a_np.astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(radius=0.6)
        )
        a_smooth_np = np.array(a_smooth, dtype=np.float32)
        a_np[edge_mask] = a_smooth_np[edge_mask]
    a_out = Image.fromarray(a_np.astype(np.uint8))
    return Image.merge("RGBA", (r, g, b, a_out))


# ============================================================
# Alpha detection
# ============================================================
def has_transparency(img_path: Path) -> bool:
    """True if any pixel has alpha < 250 — image already transparent."""
    img = Image.open(img_path).convert("RGBA")
    a_channel = np.array(img.split()[-1])
    return bool((a_channel < 250).any())


# ============================================================
# Output path logic
# ============================================================
def get_output_path(src_path: Path) -> Path:
    """
    mascots/*.png           -> mascots_nobg/*.png  (keep original intact)
    *_raw.png               -> *.png               (drop _raw suffix)
    otherwise               -> same path           (overwrite)
    """
    parent = src_path.parent
    name = src_path.name

    # Mascots source dir -> sibling nobg dir
    if parent.name == "mascots":
        nobg_dir = parent.parent / "mascots_nobg"
        nobg_dir.mkdir(parents=True, exist_ok=True)
        return nobg_dir / name

    # Raw suffix
    if name.endswith("_raw.png"):
        return parent / name.replace("_raw.png", ".png")

    return src_path


# ============================================================
# WebP lossless conversion
# ============================================================
def convert_to_webp(png_path: Path) -> Path:
    """Create lossless WebP alongside PNG. Returns webp path."""
    webp_path = png_path.with_suffix(".webp")
    img = Image.open(png_path)
    if img.mode not in ("RGBA", "RGB"):
        img = img.convert("RGBA")
    img.save(webp_path, "WEBP", lossless=True, quality=100, method=6)
    return webp_path


# ============================================================
# QA check
# ============================================================
def qa_check(src_path: Path, dst_path: Path, src_size: int, dst_size: int) -> list[str]:
    """Run QA on processed output. Returns list of warnings (empty = OK)."""
    warnings = []
    if dst_size < src_size * 0.03:
        warnings.append(f"output too small ({dst_size // 1024}KB vs {src_size // 1024}KB)")
    img = Image.open(dst_path).convert("RGBA")
    a_channel = np.array(img.split()[-1])
    transparent_pixels = (a_channel < 250).sum()
    total_pixels = a_channel.size
    ratio = transparent_pixels / total_pixels
    if ratio < 0.01:
        warnings.append(f"barely any transparency ({ratio:.2%})")
    return warnings


# ============================================================
# Main
# ============================================================
def main():
    sys.stdout.reconfigure(line_buffering=True)  # real-time progress
    if not ASSETS_DIR.is_dir():
        print(f"ERROR: {ASSETS_DIR} not found. Run from project root.")
        sys.exit(1)

    manifest = {"images": [], "summary": {}}
    output_set: set[Path] = set()

    # ---- Phase A: classify ----
    all_pngs = sorted(ASSETS_DIR.rglob("*.png"))
    print(f"Scanning {len(all_pngs)} PNG files in {ASSETS_DIR}...")

    needs_bg: list[Path] = []
    skip_bg: list[Path] = []
    for png_path in all_pngs:
        try:
            if png_path.parent.name in SKIP_BG_DIRS:
                skip_bg.append(png_path)  # raw source, no webp
            elif png_path.name in SKIP_BG_NAMES:
                skip_bg.append(png_path)
                output_set.add(png_path)  # identity icon, webp OK
            elif has_transparency(png_path):
                output_set.add(png_path)
            else:
                needs_bg.append(png_path)
        except Exception as e:
            print(f"  WARN: Cannot read {png_path}: {e}")
            manifest["images"].append({
                "source": str(png_path),
                "status": "skipped",
                "error": str(e),
            })

    print(f"  {len(needs_bg)} need bg removal  |  {len(output_set) - len(skip_bg)} transparent  |  {len(skip_bg)} skipped (identity)")

    # ---- Phase B: background removal ----
    session = rembg.new_session(MODEL)
    total = len(needs_bg)
    processed_ok = 0
    processed_warn = 0
    processed_fail = 0

    for i, src_path in enumerate(needs_bg):
        dst_path = get_output_path(src_path)
        short = str(src_path.relative_to(ASSETS_DIR))

        try:
            with open(src_path, "rb") as f:
                raw_bytes = f.read()
            src_size = len(raw_bytes)

            result_bytes = rembg.remove(raw_bytes, session=session)
            rgba = Image.open(BytesIO(result_bytes)).convert("RGBA")
            rgba = post_process_mask(rgba)
            dst_path.parent.mkdir(parents=True, exist_ok=True)
            rgba.save(dst_path, "PNG", optimize=False)
            dst_size = dst_path.stat().st_size

            warnings = qa_check(src_path, dst_path, src_size, dst_size)
            status = "processed" if not warnings else "processed_warn"
            if warnings:
                processed_warn += 1
            else:
                processed_ok += 1

            output_set.add(dst_path)

            flag = "WARN" if warnings else "OK"
            print(f"  [{i+1:3d}/{total}] {flag:4s}  {short}  "
                  f"({src_size//1024}KB -> {dst_size//1024}KB)"
                  + (f"  {'; '.join(warnings)}" if warnings else ""))

            manifest["images"].append({
                "source": str(src_path),
                "output": str(dst_path),
                "status": status,
                "src_kb": src_size // 1024,
                "dst_kb": dst_size // 1024,
                "warnings": warnings,
            })

        except Exception as e:
            processed_fail += 1
            print(f"  [{i+1:3d}/{total}] FAIL  {short}  ({e})")
            manifest["images"].append({
                "source": str(src_path),
                "status": "failed",
                "error": str(e),
            })

    # ---- Phase C: webp conversion for all output images ----
    webp_total = len(output_set)
    webp_ok = 0
    webp_fail = 0
    print(f"\nConverting {webp_total} images to WebP lossless (method=6)...")

    # Use sorted list with the Path objects; convert to string for manifest
    for i, png_path in enumerate(sorted(output_set, key=str)):
        try:
            png_kb = png_path.stat().st_size // 1024
            webp_path = convert_to_webp(png_path)
            webp_kb = webp_path.stat().st_size // 1024
            webp_ok += 1
            if (i + 1) % 100 == 0 or i == webp_total - 1:
                print(f"  [{i+1}/{webp_total}] converted")
        except Exception as e:
            webp_fail += 1
            print(f"  FAIL webp: {png_path} ({e})")

    # ---- Phase D: summary ----
    manifest["summary"] = {
        "total_scanned": len(all_pngs),
        "needs_bg_removal": total,
        "skipped_identity": len(skip_bg),
        "already_transparent": len(output_set) - processed_ok - processed_warn - len(skip_bg),
        "bg_removed_ok": processed_ok,
        "bg_removed_warn": processed_warn,
        "bg_removed_fail": processed_fail,
        "webp_converted": webp_ok,
        "webp_failed": webp_fail,
    }

    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False, default=str)

    s = manifest["summary"]
    print(f"\n{'='*60}")
    print(f"DONE")
    print(f"  Scanned:       {s['total_scanned']}")
    print(f"  BG removed:    {s['bg_removed_ok']} OK, {s['bg_removed_warn']} warn, {s['bg_removed_fail']} fail")
    print(f"  WebP:          {s['webp_converted']} OK, {s['webp_failed']} fail")
    print(f"  Manifest:      {MANIFEST_PATH.resolve()}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
