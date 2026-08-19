import sys
import os
import time
from playwright.sync_api import sync_playwright

def main():
    print("Debugging production styles using Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Navigate to establish origin
        print("Navigating to https://chauthuc.web.app...")
        page.goto("https://chauthuc.web.app")
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
        
        # Reload to apply credentials
        print("Reloading page with mock credentials...")
        page.reload()
        page.wait_for_load_state("networkidle")
        time.sleep(1.5)
        
        print("Forcing state initialization and navigating to 'home'...")
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
                        { id: '1', name: 'Uống thuốc huyết áp', time: '08:00', done: false, active: true }
                    ]
                });
                window.__navigate("home");
            } else {
                console.error("Window helpers not found!");
            }
        }""")
        
        time.sleep(2)
        
        html_style = page.evaluate("() => window.getComputedStyle(document.documentElement).background")
        body_style = page.evaluate("() => window.getComputedStyle(document.body).background")
        root_style = page.evaluate("() => window.getComputedStyle(document.getElementById('root')).background")
        
        print(f"HTML background style: {html_style}")
        print(f"BODY background style: {body_style}")
        print(f"ROOT background style: {root_style}")
        
        artifacts_dir = "/Users/dangthiduyen/.gemini/antigravity/brain/e452ad37-ff7c-4c86-8129-afe64ca66332"
        screenshot_path = os.path.join(artifacts_dir, "prod_home_desktop.png")
        page.set_viewport_size({"width": 1200, "height": 800})
        page.screenshot(path=screenshot_path)
        print(f"Saved production screenshot to {screenshot_path}")
        
        browser.close()

if __name__ == "__main__":
    main()
