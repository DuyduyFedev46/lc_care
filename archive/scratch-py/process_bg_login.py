import os
from PIL import Image, ImageEnhance

src_path = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/c1790c8b-41ad-400c-8f80-73a64c5ca3ff/login_bg_matching_1779893555797.png"
dest_path = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/c1790c8b-41ad-400c-8f80-73a64c5ca3ff/login_bg_processed.png"

if os.path.exists(src_path):
    with Image.open(src_path) as img:
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        # 1. Reduce saturation significantly to get that soft pastel look
        color_enhancer = ImageEnhance.Color(img)
        img_soft = color_enhancer.enhance(0.68)
        
        # 2. Soften the contrast (reduce by 12%)
        contrast_enhancer = ImageEnhance.Contrast(img_soft)
        img_soft = contrast_enhancer.enhance(0.88)
        
        # 3. Slightly increase brightness to match the bright, sun-kissed feel of onboarding (increase by 5%)
        brightness_enhancer = ImageEnhance.Brightness(img_soft)
        img_soft = brightness_enhancer.enhance(1.04)
        
        # 4. Apply a very subtle warm filter overlay
        # We can blend it with a solid warm-tint color to shift the blue and green hues slightly warmer
        warm_tint = Image.new("RGB", img_soft.size, (255, 245, 230)) # Warm soft cream
        img_final = Image.blend(img_soft, warm_tint, 0.06) # Blend 6% of warm tint
        
        img_final.save(dest_path, "PNG")
        print(f"Processed soft image saved to: {dest_path}")
else:
    print(f"Source file not found: {src_path}")
