#!/usr/bin/env python3
"""
Plant asset consistency audit / QA tool for LC_Care.

Checks the 16 plants x 5 levels growth illustrations for cross-tree and
cross-level consistency: dimensions, transparency, content scale and baseline
alignment. Also builds checkerboard contact sheets so transparency, pot style
(faced vs faceless) and cropping can be eyeballed.

Usage:
    python3 scripts/plant_asset_audit.py            # report + montage (default)
    python3 scripts/plant_asset_audit.py report     # print bbox table + outliers
    python3 scripts/plant_asset_audit.py montage    # write contact sheets
    python3 scripts/plant_asset_audit.py verify     # PASS/FAIL gate vs spec

Options:
    --src   DIR   source folder of plant_<id>_lv<n>.webp (default: frontend/public/assets/plants)
    --out   DIR   output folder for contact sheets (default: docs/assets/plant-audit)

Requires Pillow (with WebP support).
"""
import os
import sys
import argparse
import statistics
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SRC = os.path.join(ROOT, "frontend", "public", "assets", "plants")
DEFAULT_OUT = os.path.join(ROOT, "docs", "assets", "plant-audit")

TREES = ["aloe", "basil", "bittermelon", "eucommia", "ginger", "ginseng",
         "lavender", "lemongrass", "licorice", "lotus", "mint", "pennywort",
         "perilla", "phyllanthus", "tea", "turmeric"]
LEVELS = [1, 2, 3, 4, 5]

# Canonical spec. Content height as % of the 1024 canvas. Bands are wide enough
# to pass the whole healthy set (natural foliage variation) yet flag genuine
# outliers such as licorice lv1 (mature where a sprout is expected).
SPEC_HEIGHT = {1: (36, 82), 2: (38, 90), 3: (72, 95), 4: (76, 97), 5: (60, 94)}
SPEC_BOTTOM_MARGIN = (1.5, 16.0)   # % from bottom of canvas to content bottom
SPEC_CENTER_OFFSET = 4.0           # max |horizontal center offset| in %
SPEC_SIZE = (1024, 1024)
# lotus is intentionally low/floating until it is redrawn as a potted plant.
SCALE_EXCEPTIONS = set()           # e.g. {("lotus", 1)} -- empty == hold everything to spec


def img_path(src, tree, lv):
    return os.path.join(src, f"plant_{tree}_lv{lv}.webp")


def measure(src):
    """Return list of dicts with per-image geometry metrics."""
    rows = []
    for t in TREES:
        for lv in LEVELS:
            p = img_path(src, t, lv)
            d = {"tree": t, "lv": lv, "path": p, "exists": os.path.exists(p)}
            if not d["exists"]:
                rows.append(d)
                continue
            im = Image.open(p).convert("RGBA")
            W, H = im.size
            alpha = im.split()[3]
            mn, _ = alpha.getextrema()
            bbox = alpha.getbbox() or (0, 0, W, H)
            l, tp, r, b = bbox
            d.update(
                size=(W, H),
                has_alpha=(mn == 0),
                w_pct=(r - l) / W * 100,
                h_pct=(b - tp) / H * 100,
                top_pct=tp / H * 100,
                bottom_margin_pct=(H - b) / H * 100,
                center_off_pct=((l + r) / 2 - W / 2) / W * 100,
            )
            rows.append(d)
    return rows


def cmd_report(src):
    rows = measure(src)
    print(f"Source: {src}\n")
    print(f"{'tree':12}{'lv':>3} {'size':>10} {'W%':>5}{'H%':>5} {'top%':>6}{'bot%':>6} {'cx%':>6}  alpha")
    for d in rows:
        if not d["exists"]:
            print(f"{d['tree']:12}{d['lv']:>3}  MISSING")
            continue
        print(f"{d['tree']:12}{d['lv']:>3} {d['size'][0]}x{d['size'][1]:>4} "
              f"{d['w_pct']:5.0f}{d['h_pct']:5.0f} {d['top_pct']:6.1f}{d['bottom_margin_pct']:6.1f} "
              f"{d['center_off_pct']:6.1f}   {'Y' if d['has_alpha'] else 'N!'}")
    print("\n=== per-level content HEIGHT% (scale outliers, > |18| from median) ===")
    for lv in LEVELS:
        vals = [(d["tree"], d["h_pct"]) for d in rows if d["exists"] and d["lv"] == lv]
        med = statistics.median([v for _, v in vals])
        outl = [f"{t}:{h:.0f}" for t, h in vals if abs(h - med) > 18]
        print(f"lv{lv}: median H%={med:.0f}  outliers: {outl or 'none'}")
    print("\n=== bottom margin% (baseline alignment, > |8| from median) ===")
    for lv in LEVELS:
        vals = [(d["tree"], d["bottom_margin_pct"]) for d in rows if d["exists"] and d["lv"] == lv]
        med = statistics.median([v for _, v in vals])
        outl = [f"{t}:{m:.0f}" for t, m in vals if abs(m - med) > 8]
        print(f"lv{lv}: median bot%={med:.1f}  outliers: {outl or 'none'}")
    return rows


def cmd_verify(src):
    rows = measure(src)
    fails = []
    for d in rows:
        t, lv = d["tree"], d["lv"]
        if not d["exists"]:
            fails.append((t, lv, "MISSING file"))
            continue
        if d["size"] != SPEC_SIZE:
            fails.append((t, lv, f"size {d['size']} != {SPEC_SIZE}"))
        if not d["has_alpha"]:
            fails.append((t, lv, "no transparency (baked background?)"))
        if (t, lv) not in SCALE_EXCEPTIONS:
            lo, hi = SPEC_HEIGHT[lv]
            if not (lo <= d["h_pct"] <= hi):
                fails.append((t, lv, f"height {d['h_pct']:.0f}% outside {lo}-{hi}%"))
            blo, bhi = SPEC_BOTTOM_MARGIN
            if not (blo <= d["bottom_margin_pct"] <= bhi):
                fails.append((t, lv, f"baseline margin {d['bottom_margin_pct']:.0f}% outside {blo}-{bhi}%"))
            if abs(d["center_off_pct"]) > SPEC_CENTER_OFFSET:
                fails.append((t, lv, f"off-center {d['center_off_pct']:.1f}%"))
    if fails:
        print(f"VERIFY: FAIL ({len(fails)} issue(s))")
        for t, lv, msg in fails:
            print(f"  - {t} lv{lv}: {msg}")
        return 1
    print(f"VERIFY: PASS ({len(rows)} images meet spec)")
    return 0


def _checker(size, a=205, b=240, sq=16):
    img = Image.new("RGB", (size, size), (a, a, a))
    d = ImageDraw.Draw(img)
    for y in range(0, size, sq):
        for x in range(0, size, sq):
            if ((x // sq) + (y // sq)) % 2 == 0:
                d.rectangle([x, y, x + sq, y + sq], fill=(b, b, b))
    return img


def _font(sz):
    for fp in ("/System/Library/Fonts/Supplemental/Arial.ttf",
               "/Library/Fonts/Arial.ttf",
               "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        if os.path.exists(fp):
            return ImageFont.truetype(fp, sz)
    return ImageFont.load_default()


def _build_sheet(src, subset, outpath, cell=230, pad=4, label_w=130, header_h=36):
    font, font_l = _font(18), _font(16)
    rows = len(subset)
    W = label_w + 5 * (cell + pad) + pad
    H = header_h + rows * (cell + pad) + pad
    canvas = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(canvas)
    for ci, lv in enumerate(LEVELS):
        d.text((label_w + ci * (cell + pad) + cell // 2, 8), f"lv{lv}",
               fill=(0, 0, 0), font=font, anchor="ma")
    for ri, tree in enumerate(subset):
        y0 = header_h + ri * (cell + pad)
        d.text((6, y0 + cell // 2), tree, fill=(0, 0, 0), font=font_l, anchor="lm")
        for ci, lv in enumerate(LEVELS):
            x0 = label_w + ci * (cell + pad)
            cellimg = _checker(cell)
            p = img_path(src, tree, lv)
            if os.path.exists(p):
                im = Image.open(p).convert("RGBA")
                im.thumbnail((cell, cell))
                cellimg.paste(im, ((cell - im.width) // 2, (cell - im.height) // 2), im)
            else:
                ImageDraw.Draw(cellimg).text((cell // 2, cell // 2), "MISSING",
                                             fill=(200, 0, 0), font=font, anchor="mm")
            canvas.paste(cellimg, (x0, y0))
    canvas.save(outpath)
    print("wrote", outpath, canvas.size)


def cmd_montage(src, out):
    os.makedirs(out, exist_ok=True)
    _build_sheet(src, TREES[:8], os.path.join(out, "montage_part1.png"))
    _build_sheet(src, TREES[8:], os.path.join(out, "montage_part2.png"))


def main():
    ap = argparse.ArgumentParser(description="Plant asset consistency audit for LC_Care")
    ap.add_argument("mode", nargs="?", default="all",
                    choices=["all", "report", "montage", "verify"])
    ap.add_argument("--src", default=DEFAULT_SRC)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    if args.mode in ("all", "report"):
        cmd_report(args.src)
    if args.mode in ("all", "montage"):
        cmd_montage(args.src, args.out)
    if args.mode == "verify":
        sys.exit(cmd_verify(args.src))


if __name__ == "__main__":
    main()
