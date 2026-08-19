import os
from PIL import Image

def generate_icons():
    logo_path = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets/app_logo.png"
    assets_dir = "/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets"
    
    if not os.path.exists(logo_path):
        print(f"Error: Logo file not found at {logo_path}")
        return
        
    print("Opening source logo image...")
    img = Image.open(logo_path)
    
    sizes = {
        "favicon-16": 16,
        "favicon-32": 32,
        "icon-192": 192,
        "icon-512": 512,
        "apple-touch-icon": 180
    }
    
    for name, size in sizes.items():
        print(f"Generating {name} ({size}x{size})...")
        # Resize using Lanczos filter for maximum sharpness
        resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save PNG
        png_path = os.path.join(assets_dir, f"{name}.png")
        resized_img.save(png_path, "PNG", optimize=True)
        print(f"  Saved PNG to {png_path} (size: {os.path.getsize(png_path)} bytes)")
        
        # Save WebP
        webp_path = os.path.join(assets_dir, f"{name}.webp")
        resized_img.save(webp_path, "WEBP", quality=90)
        print(f"  Saved WebP to {webp_path} (size: {os.path.getsize(webp_path)} bytes)")
        
    print("✨ Icon generation complete!")

if __name__ == "__main__":
    generate_icons()
