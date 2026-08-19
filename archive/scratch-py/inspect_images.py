import os
from PIL import Image

assets_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets"
for f in os.listdir(assets_dir):
    if f.endswith(".png") or f.endswith(".webp"):
        path = os.path.join(assets_dir, f)
        try:
            with Image.open(path) as img:
                print(f"{f}: {img.size} {img.format}")
        except Exception:
            pass
