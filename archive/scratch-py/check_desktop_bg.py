import sys
import os
import time
from playwright.sync_api import sync_playwright

def main():
    print("Starting visual verification using Playwright for desktop view...")
    with sync_playwright() as p:
        # Launch Chromium headless
        browser = p.chromium.launch(headless=True)
        # Set desktop viewport size
        page = browser.new_page(viewport={"width": 1200, "height": 800})
        
        # Navigate to dev server
        print("Navigating to http://localhost:5173...")
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")
        
        # Check if login is needed
        if page.locator("input[placeholder*='điện thoại']").count() > 0:
            print("Login screen detected. Entering phone number...")
            page.fill("input[placeholder*='điện thoại']", "0912345678")
            time.sleep(0.5)
            print("Clicking login button...")
            page.click("button[type='submit']")
            page.wait_for_load_state("networkidle")
            time.sleep(2)  # Wait for data load and transition
        
        print("Checking if we are on the Home screen...")
        page.wait_for_selector("text=Vườn", timeout=10000)
        time.sleep(2)  # Allow rendering to settle
        
        artifacts_dir = "/Users/dangthiduyen/.gemini/antigravity/brain/e452ad37-ff7c-4c86-8129-afe64ca66332"
        
        # Take a screenshot of the home screen on desktop layout
        screenshot_path = os.path.join(artifacts_dir, "desktop_home_after.png")
        print(f"Saving screenshot to {screenshot_path}...")
        page.screenshot(path=screenshot_path, full_page=False)

        # Navigate to Family screen
        print("Clicking on tab 'Gia đình'...")
        page.click("text=Gia đình")
        time.sleep(1.5)

        # Take a screenshot of the family screen on desktop layout
        screenshot_path_family = os.path.join(artifacts_dir, "desktop_family_after.png")
        print(f"Saving screenshot to {screenshot_path_family}...")
        page.screenshot(path=screenshot_path_family, full_page=False)
        
        browser.close()
        print("Done!")

if __name__ == "__main__":
    main()
