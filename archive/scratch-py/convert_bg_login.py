import os
from PIL import Image

src_path = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/c1790c8b-41ad-400c-8f80-73a64c5ca3ff/login_bg_matching_1779893555797.png"
dest_path = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/bg_panel0_login.webp"

if os.path.exists(src_path):
    with Image.open(src_path) as img:
        # Convert and save as WebP directly
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        img.save(dest_path, "WEBP", quality=90)
        print(f"Successfully converted and saved to: {dest_path}")
else:
    print(f"Source file not found: {src_path}")
