import os
from PIL import Image, ImageFilter
import numpy as np
import rembg
from io import BytesIO

plants_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/plants"
MODEL = "birefnet-general"

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

def main():
    print("Initializing rembg session...")
    session = rembg.new_session(MODEL)
    
    opaque_files = []
    print("Scanning plants folder for opaque assets...")
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
            total = len(alpha_data)
            
            trans_ratio = transparent_count / total
            if trans_ratio < 0.05:  # less than 5% transparent -> needs background removed
                opaque_files.append((name, path))
        except Exception as e:
            print(f"Error scanning {name}: {e}")
            
    print(f"Found {len(opaque_files)} opaque files that need background removal.")
    
    for i, (name, path) in enumerate(opaque_files):
        print(f"[{i+1}/{len(opaque_files)}] Processing {name}...")
        try:
            # 1. Read original webp as bytes
            with open(path, "rb") as f:
                raw_bytes = f.read()
                
            # 2. Convert raw_bytes to PNG with background removed
            result_bytes = rembg.remove(raw_bytes, session=session)
            
            # 3. Post-process the alpha channel
            rgba = Image.open(BytesIO(result_bytes)).convert("RGBA")
            rgba = post_process_mask(rgba)
            
            # 4. Save back as WebP lossless over the original file
            rgba.save(path, "WEBP", lossless=True, quality=100, method=6)
            print(f"  Saved transparent WebP to {path}")
            
        except Exception as e:
            print(f"  FAIL to process {name}: {e}")
            
    print("Background removal finished!")

if __name__ == "__main__":
    main()
