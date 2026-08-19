import os
from PIL import Image

src_path = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/c1790c8b-41ad-400c-8f80-73a64c5ca3ff/bg_comic_p3_empty_bottom_1779894524158.png"
dest_path = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/onboarding/bg_comic_p3.png"

if os.path.exists(src_path):
    with Image.open(src_path) as img:
        w, h = img.size
        print(f"Original size: {w}x{h}")
        
        # Calculate 9:16 crop width
        crop_width = int(h * 9 / 16)
        left = (w - crop_width) // 2
        right = left + crop_width
        
        box = (left, 0, right, h)
        cropped_img = img.crop(box)
        
        # Save to target location as PNG
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        cropped_img.save(dest_path, "PNG")
        print(f"Successfully cropped and saved to: {dest_path}")
else:
    print(f"Source file not found: {src_path}")
