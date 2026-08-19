const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("🚀 Starting Playwright E2E Verification...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // standard iPhone screen size
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  // Define screenshoots path in the artifacts folder
  const artifactsDir = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63';
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const capture = async (name) => {
    const screenshotPath = path.join(artifactsDir, `test_step_${name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  };

  try {
    console.log("Navigating to http://localhost:5173...");
    await page.goto('http://localhost:5173/?nocache=' + Date.now());

    // Wait for the auth loading spinner or page load
    await page.waitForTimeout(2000);

    // 1. Check if we need to log in
    const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
    if (phoneInput) {
      console.log("Login screen detected. Entering phone number...");
      await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
      await capture("01_login_filled");
      await page.click('button[type="submit"]');
      await page.waitForTimeout(4000);
    } else {
      console.log("Already logged in or bypassed login.");
    }

    console.log("Current URL:", page.url());
    await capture("02_home_screen");

    // 2. Verify Bottom Navigation contains exactly 4 tabs
    console.log("Verifying bottom navigation tabs...");
    const bottomNavExists = await page.waitForSelector('text=Vườn', { timeout: 10000 });
    if (!bottomNavExists) {
      throw new Error("Bottom Nav or Vườn tab not found.");
    }

    // Check count of nav buttons
    const navButtons = await page.evaluate(() => {
      // Find the container at the bottom
      const buttons = Array.from(document.querySelectorAll('button'));
      // Filter for button elements that contain our labels
      const labels = ["Vườn", "Gia đình", "Chăm sóc", "Quà"];
      const navBtnCount = buttons.filter(btn => {
        const text = btn.innerText || "";
        return labels.some(l => text.includes(l));
      }).length;
      return navBtnCount;
    });

    console.log(`Found bottom navigation tab count: ${navButtons}`);
    if (navButtons !== 4) {
      throw new Error(`Expected exactly 4 bottom navigation tabs, but found ${navButtons}`);
    }

    // 3. Test Navigation: click "Gia đình" tab
    console.log("Navigating to Gia đình tab...");
    await page.click('text=Gia đình');
    await page.waitForTimeout(1500);
    await capture("03_family_tab_garden_view");

    // Verify SegmentedControl is present with "Vườn nhà" and "Lịch tuần"
    const segmentedControl = await page.evaluate(() => {
      const texts = Array.from(document.querySelectorAll('button')).map(b => b.innerText || "");
      const hasGardenView = texts.some(t => t.includes("Vườn nhà"));
      const hasCalendarView = texts.some(t => t.includes("Lịch tuần"));
      return { hasGardenView, hasCalendarView };
    });

    console.log("Segmented control status:", segmentedControl);
    if (!segmentedControl.hasGardenView || !segmentedControl.hasCalendarView) {
      throw new Error("Segmented control options not found in Gia đình tab.");
    }

    // 4. Test SegmentedControl toggling: click "Lịch tuần"
    console.log("Toggling view to Lịch tuần (Calendar)...");
    await page.click('text=Lịch tuần');
    await page.waitForTimeout(1500);
    await capture("04_family_tab_calendar_view");

    // Check if the calendar screen displays its inner content like "Gợi ý thông minh" or events
    const hasSmartSuggestion = await page.evaluate(() => {
      return document.body.innerText.includes("Gợi ý thông minh") || document.body.innerText.includes("Lịch Gia Đình");
    });
    console.log("Smart suggestion display status:", hasSmartSuggestion);
    if (!hasSmartSuggestion) {
      throw new Error("Calendar inner view did not load properly.");
    }

    // 5. Test Profile Avatar redirect
    console.log("Clicking Profile Avatar in header...");
    // Find the avatar image button in the header
    const profileButton = await page.$('img[alt="Profile"]');
    if (!profileButton) {
      throw new Error("Header profile avatar button not found.");
    }
    await profileButton.click();
    await page.waitForTimeout(1500);
    await capture("05_profile_screen");

    const onProfileScreen = await page.evaluate(() => {
      return document.body.innerText.includes("Hồ Sơ Cá Nhân");
    });
    console.log("Profile screen state:", onProfileScreen);
    if (!onProfileScreen) {
      throw new Error("Did not navigate to Profile screen.");
    }

    // 6. Test Back button in Profile Screen
    console.log("Clicking back button in Profile screen...");
    const backButton = await page.$('img[alt="back"]');
    if (!backButton) {
      throw new Error("Back button in Profile screen not found.");
    }
    await backButton.click();
    await page.waitForTimeout(1500);
    await capture("06_back_to_family_tab");

    // 7. Verify redirects (legacy routes)
    console.log("Testing legacy redirect: direct navigation to /tab-calendar...");
    await page.evaluate(() => window.__navigate("tab-calendar"));
    await page.waitForTimeout(1500);
    await capture("07_redirect_tab_calendar");
    
    // Check if redirect brought us back to family screen with Lịch tuần enabled
    const redirectedToCalendar = await page.evaluate(() => {
      const activeTab = localStorage.getItem("family_active_tab");
      return activeTab === "calendar";
    });
    console.log("Redirected to calendar view mode successfully:", redirectedToCalendar);
    if (!redirectedToCalendar) {
      throw new Error("Legacy redirect /tab-calendar failed.");
    }

    console.log("Testing legacy redirect: direct navigation to /tab-profile...");
    await page.evaluate(() => window.__navigate("tab-profile"));
    await page.waitForTimeout(1500);
    await capture("08_redirect_tab_profile");

    const redirectedToProfile = await page.evaluate(() => {
      return document.body.innerText.includes("Hồ Sơ Cá Nhân");
    });
    console.log("Redirected to profile screen successfully:", redirectedToProfile);
    if (!redirectedToProfile) {
      throw new Error("Legacy redirect /tab-profile failed.");
    }

    // Go back to Home
    console.log("Going back to home...");
    await page.evaluate(() => window.__navigate("home"));
    await page.waitForTimeout(1000);

    // 8. Test Navigation: click "Chăm sóc" tab
    console.log("Navigating to Chăm sóc tab...");
    await page.click('text=Chăm sóc');
    await page.waitForTimeout(1500);
    await capture("09_care_tab");

    // 9. Test Navigation: click "Quà" tab
    console.log("Navigating to Quà (Voucher) tab...");
    await page.click('text=Quà');
    await page.waitForTimeout(1500);
    await capture("10_voucher_tab");

    const hasPointsWallet = await page.evaluate(() => {
      return document.body.innerText.includes("Điểm Của Bạn") || document.body.innerText.includes("Quỹ Gia Đình") || document.body.innerText.includes("Thu Hoạch Quà");
    });
    console.log("Points wallet status in VoucherScreen:", hasPointsWallet);
    if (!hasPointsWallet) {
      throw new Error("Points wallet or points card not found on VoucherScreen.");
    }

    console.log("✅ All navigation and layout test assertions passed successfully!");
  } catch (error) {
    console.error("❌ E2E test failed with error:", error);
    await capture("fail_error");
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  process.exit(0);
})();
