import os
import sys
from PIL import Image
from rembg import remove

brain_dir = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63"
mascot_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/mascot"

os.makedirs(mascot_dir, exist_ok=True)

# 1. mascot_idle
img1_path = os.path.join(brain_dir, "mascot_hold_can_1779982679265.png")
if os.path.exists(img1_path):
    print(f"Removing background from {img1_path}...")
    input_img = Image.open(img1_path)
    output_img = remove(input_img)
    
    # Save as PNG
    out_png_path = os.path.join(mascot_dir, "mascot_idle.png")
    output_img.save(out_png_path, "PNG")
    print(f"Saved {out_png_path}")
    
    # Save as WebP
    out_webp_path = os.path.join(mascot_dir, "mascot_idle.webp")
    output_img.save(out_webp_path, "WEBP", quality=95)
    print(f"Saved {out_webp_path}")
else:
    print(f"Error: {img1_path} not found.")

# 2. mascot_watering
img2_path = os.path.join(brain_dir, "mascot_watering_can_1779982708984.png")
if os.path.exists(img2_path):
    print(f"Removing background from {img2_path}...")
    input_img = Image.open(img2_path)
    output_img = remove(input_img)
    
    # Save as PNG
    out_png_path = os.path.join(mascot_dir, "mascot_watering.png")
    output_img.save(out_png_path, "PNG")
    print(f"Saved {out_png_path}")
    
    # Save as WebP
    out_webp_path = os.path.join(mascot_dir, "mascot_watering.webp")
    output_img.save(out_webp_path, "WEBP", quality=95)
    print(f"Saved {out_webp_path}")
else:
    print(f"Error: {img2_path} not found.")

print("Background removal with rembg finished!")
