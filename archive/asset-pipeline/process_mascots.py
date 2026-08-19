"""
Remove background từ mascot images.
Model: birefnet-general (tốt nhất hiện tại cho 3D character)
Post-processing: morphological cleanup + edge smoothing
Output: frontend/public/assets/mascots_nobg/ (ghi đè kết quả trước)
Raw: frontend/public/assets/mascots/ (KHÔNG đụng vào)
"""
import os
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
import rembg

SRC = Path("frontend/public/assets/mascots")
DST = Path("frontend/public/assets/mascots_nobg")
DST.mkdir(parents=True, exist_ok=True)

# Model birefnet-general — tốt nhất cho 3D illustration/character
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
        # Chỉ áp dụng smooth trên vùng edge
        a_np[edge_mask] = a_smooth_np[edge_mask]

    a_out = Image.fromarray(a_np.astype(np.uint8))
    return Image.merge("RGBA", (r, g, b, a_out))


files = sorted(SRC.glob("mascot_*.png"))
print(f"Found {len(files)} mascot files\n")

for src_path in files:
    dst_path = DST / src_path.name
    print(f"[{src_path.name}] processing...", end=" ", flush=True)

    with open(src_path, "rb") as f:
        raw_bytes = f.read()

    # rembg với birefnet-general
    result_bytes = rembg.remove(raw_bytes, session=session)

    # Load PIL để post-process
    from io import BytesIO
    rgba = Image.open(BytesIO(result_bytes)).convert("RGBA")

    # Post-process mask
    rgba = post_process_mask(rgba)

    # Save PNG (lossless, giữ alpha)
    rgba.save(dst_path, "PNG", optimize=False)

    # So sánh file size
    src_kb = src_path.stat().st_size // 1024
    dst_kb = dst_path.stat().st_size // 1024
    print(f"✅  {src_kb}KB raw → {dst_kb}KB nobg")

print(f"\nDone! Output: {DST.resolve()}")
print("Raw ảnh KHÔNG bị chạm: OK")
