import sys
import os
import time
from playwright.sync_api import sync_playwright

def main():
    print("Capturing production login screen...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Navigate to production url
        print("Navigating to https://chauthuc.web.app...")
        page.goto("https://chauthuc.web.app")
        page.wait_for_load_state("networkidle")
        time.sleep(2)
        
        # Capture screenshot
        artifacts_dir = "/Users/dangthiduyen/.gemini/antigravity/brain/e452ad37-ff7c-4c86-8129-afe64ca66332"
        screenshot_path = os.path.join(artifacts_dir, "prod_login_desktop.png")
        page.set_viewport_size({"width": 1200, "height": 800})
        page.screenshot(path=screenshot_path)
        print(f"Saved production login screenshot to {screenshot_path}")
        
        browser.close()

if __name__ == "__main__":
    main()
