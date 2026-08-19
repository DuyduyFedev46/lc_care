import os
from PIL import Image

mascot_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/mascot"

for name in ["mascot_idle.png", "mascot_watering.png"]:
    path = os.path.join(mascot_dir, name)
    if not os.path.exists(path):
        print(f"{name} does not exist!")
        continue
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    
    # Check the corners
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((width - 1, 0)),
        img.getpixel((0, height - 1)),
        img.getpixel((width - 1, height - 1))
    ]
    print(f"--- Transparency check for {name} ---")
    print(f"Dimensions: {width}x{height}")
    print(f"Corner pixels (RGBA): {corners}")
    
    # Check percentage of pixels with alpha < 5 (fully/almost transparent)
    alpha_data = [pixel[3] for pixel in img.getdata()]
    transparent_count = sum(1 for a in alpha_data if a < 5)
    opaque_count = sum(1 for a in alpha_data if a > 250)
    semi_count = len(alpha_data) - transparent_count - opaque_count
    
    print(f"Transparent pixels (alpha < 5): {transparent_count} ({transparent_count/len(alpha_data)*100:.1f}%)")
    print(f"Opaque pixels (alpha > 250): {opaque_count} ({opaque_count/len(alpha_data)*100:.1f}%)")
    print(f"Semi-transparent pixels: {semi_count} ({semi_count/len(alpha_data)*100:.1f}%)")
