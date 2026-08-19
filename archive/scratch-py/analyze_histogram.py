import os
from collections import Counter
from PIL import Image

brain_dir = "/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63"

for img_file in ["mascot_hold_can_1779982679265.png", "mascot_watering_can_1779982708984.png"]:
    img_path = os.path.join(brain_dir, img_file)
    if not os.path.exists(img_path):
        print(f"Skipping {img_file}")
        continue
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    border_pixels = []
    for x in range(width):
        for y in range(20):
            border_pixels.append(img.getpixel((x, y)))
        for y in range(height - 20, height):
            border_pixels.append(img.getpixel((x, y)))
    for y in range(height):
        for x in range(20):
            border_pixels.append(img.getpixel((x, y)))
        for x in range(width - 20, width):
            border_pixels.append(img.getpixel((x, y)))
            
    counter = Counter(border_pixels)
    print(f"\nMost common border pixels for {img_file}:")
    for pixel, count in counter.most_common(15):
        print(f"  Pixel {pixel}: {count} times")
