import os
from PIL import Image
import numpy as np

plants_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/plants"
opaque_files = []
transparent_files = []

for name in sorted(os.listdir(plants_dir)):
    if not name.endswith(".webp") and not name.endswith(".png"):
        continue
    path = os.path.join(plants_dir, name)
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        
        # Check percentage of pixels with alpha < 5 (fully/almost transparent)
        alpha_data = [pixel[3] for pixel in img.getdata()]
        transparent_count = sum(1 for a in alpha_data if a < 5)
        opaque_count = sum(1 for a in alpha_data if a > 250)
        total = len(alpha_data)
        
        trans_ratio = transparent_count / total
        if trans_ratio < 0.05:  # less than 5% transparent
            opaque_files.append((name, trans_ratio))
        else:
            transparent_files.append((name, trans_ratio))
    except Exception as e:
        print(f"Error reading {name}: {e}")

print(f"Total files checked: {len(os.listdir(plants_dir))}")
print(f"Transparent files count: {len(transparent_files)}")
print(f"Opaque files count: {len(opaque_files)}")
if opaque_files:
    print("\n--- Opaque Files (Background not removed) ---")
    for name, ratio in opaque_files:
        print(f"  {name}: {ratio:.2%} transparent")
