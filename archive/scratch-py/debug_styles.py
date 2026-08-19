import sys
import os
import time
from playwright.sync_api import sync_playwright

def capture_viewport(page, width, height, suffix, artifacts_dir):
    page.set_viewport_size({"width": width, "height": height})
    time.sleep(1)
    screenshot_path = os.path.join(artifacts_dir, f"desktop_home_debug_{suffix}.png")
    page.screenshot(path=screenshot_path)
    print(f"Saved screenshot for {width}x{height} to {screenshot_path}")

def main():
    print("Debugging styles using Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context to allow setting localStorage
        context = browser.new_context()
        page = context.new_page()
        
        # Navigate to a blank page on the same origin first to be able to set localStorage
        print("Navigating to http://localhost:5173 to establish origin...")
        page.goto("http://localhost:5173")
        page.wait_for_load_state("networkidle")
        
        print("Setting mock auth credentials in localStorage...")
        page.evaluate("""() => {
            localStorage.setItem("lc_care_mock_token", "test-user-uid");
            localStorage.setItem("lc_care_mock_user", JSON.stringify({
                fullName: "Dang Thi Duyen",
                phone: "0912345678",
                role: "user"
            }));
        }""")
        
        # Reload to apply localStorage credentials
        print("Reloading page with mock credentials...")
        page.reload()
        page.wait_for_load_state("networkidle")
        time.sleep(1.5)
        
        print("Forcing state initialization and navigating to 'home'...")
        # Force state to bypass onboarding and go straight to home with a plant
        page.evaluate("""() => {
            if (window.__updateState && window.__navigate) {
                window.__updateState({
                    initialized: true,
                    error: null,
                    loading: false,
                    plant: { stage: 1, plantId: 'ginger', plantLevel: 1 },
                    assignedPlant: { plant: 'ginger', name: 'Gừng' },
                    plantApproval: 'auto_approved',
                    habits: [
                        { id: '1', name: 'Uống thuốc huyết áp', time: '08:00', done: false, active: true },
                        { id: '2', name: 'Đo huyết áp', time: '09:00', done: false, active: true }
                    ]
                });
                window.__navigate("home");
            } else {
                console.error("Window helpers not found!");
            }
        }""")
        
        time.sleep(2)  # Wait for transition to settle
        
        html_style = page.evaluate("() => window.getComputedStyle(document.documentElement).background")
        body_style = page.evaluate("() => window.getComputedStyle(document.body).background")
        root_style = page.evaluate("() => window.getComputedStyle(document.getElementById('root')).background")
        
        print(f"HTML background style: {html_style}")
        print(f"BODY background style: {body_style}")
        print(f"ROOT background style: {root_style}")
        
        artifacts_dir = "/Users/dangthiduyen/.gemini/antigravity/brain/e452ad37-ff7c-4c86-8129-afe64ca66332"
        
        # Capture viewports
        capture_viewport(page, 1200, 800, "desktop_1200", artifacts_dir)
        capture_viewport(page, 1024, 768, "tablet_landscape", artifacts_dir)
        capture_viewport(page, 768, 1024, "tablet_portrait", artifacts_dir)
        capture_viewport(page, 414, 896, "mobile_tall", artifacts_dir)
        
        browser.close()

if __name__ == "__main__":
    main()
