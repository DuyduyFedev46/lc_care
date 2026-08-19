from PIL import Image

def analyze_image():
    img_path = "/Users/dangthiduyen/.gemini/antigravity/brain/e452ad37-ff7c-4c86-8129-afe64ca66332/prod_login_desktop.png"
    try:
        img = Image.open(img_path)
        w, h = img.size
        print(f"Image dimensions: {w}x{h}")
        
        # Check pixel colors at y = h // 2
        y = h // 2
        left_pixel = img.getpixel((10, y))
        right_pixel = img.getpixel((w - 10, y))
        center_pixel = img.getpixel((w // 2, y))
        
        print(f"Left edge pixel color (10, {y}): {left_pixel}")
        print(f"Right edge pixel color ({w - 10}, {y}): {right_pixel}")
        print(f"Center pixel color ({w // 2}, {y}): {center_pixel}")
        
        # Sample colors along the horizontal line at y = h // 2
        print("\nHorizontal line samples at y =", y)
        for x in range(0, w, w // 10):
            print(f"x={x}: {img.getpixel((x, y))}")
            
    except Exception as e:
        print("Error opening or analyzing image:", e)

if __name__ == "__main__":
    analyze_image()
