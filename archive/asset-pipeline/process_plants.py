"""
Remove background từ plant images.
Model: birefnet-general (tốt nhất cho illustrations)
Post-processing: morphological cleanup + edge smoothing
Output: frontend/public/assets/processed_plants/[plant]_[stage].png
Raw: frontend/public/assets/processed_plants/[plant]_[stage]_raw.png
"""
import os
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
import rembg

DIR = Path("frontend/public/assets/processed_plants")

# Model birefnet-general
session = rembg.new_session("birefnet-general")

def post_process_mask(rgba: Image.Image) -> Image.Image:
    """
    Làm sắc nét và clean mask alpha sau khi rembg xử lý:
    1. Threshold nhẹ để loại semi-transparent rác
    2. Smooth edge để tránh jagged
    """
    r, g, b, a = rgba.split()
    a_np = np.array(a, dtype=np.float32)

    # Slight threshold: pixel alpha < 15 → 0 (xóa hẳn rác mờ)
    a_np[a_np < 15] = 0

    # Pixel alpha > 220 → 255 (làm cứng vùng chính)
    a_np[a_np > 220] = 255

    # Gaussian smooth trên vùng edge (10–220) để mượt biên
    edge_mask = (a_np > 10) & (a_np < 220)
    if edge_mask.any():
        a_smooth = Image.fromarray(a_np.astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(radius=0.6)
        )
        a_smooth_np = np.array(a_smooth, dtype=np.float32)
        a_np[edge_mask] = a_smooth_np[edge_mask]

    a_out = Image.fromarray(a_np.astype(np.uint8))
    return Image.merge("RGBA", (r, g, b, a_out))

# Process all raw files: ginger_X_raw.png, lemongrass_X_raw.png, lotus_X_raw.png
raw_files = sorted(DIR.glob("*_raw.png"))
print(f"Found {len(raw_files)} raw plant files to process.\n")

for src_path in raw_files:
    # Target name: e.g. ginger_1_raw.png -> ginger_1.png
    target_name = src_path.name.replace("_raw.png", ".png")
    dst_path = DIR / target_name
    print(f"[{src_path.name}] processing -> [{target_name}]...", end=" ", flush=True)

    with open(src_path, "rb") as f:
        raw_bytes = f.read()

    # Run rembg
    result_bytes = rembg.remove(raw_bytes, session=session)

    # Convert to PIL RGBA
    from io import BytesIO
    rgba = Image.open(BytesIO(result_bytes)).convert("RGBA")

    # Post process
    rgba = post_process_mask(rgba)

    # Save
    rgba.save(dst_path, "PNG", optimize=False)

    src_kb = src_path.stat().st_size // 1024
    dst_kb = dst_path.stat().st_size // 1024
    print(f"✅  {src_kb}KB raw → {dst_kb}KB nobg")

print("\nDone processing plants!")
