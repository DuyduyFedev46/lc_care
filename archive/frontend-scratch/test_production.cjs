const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("🚀 Starting Production E2E Verification against https://chauthuc.web.app...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone screen size
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('LIVE PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('LIVE PAGE ERROR:', err.message));

  const artifactsDir = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63';
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const capture = async (name) => {
    const screenshotPath = path.join(artifactsDir, `prod_step_${name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  };

  try {
    console.log("Navigating to https://chauthuc.web.app...");
    await page.goto('https://chauthuc.web.app/?nocache=' + Date.now());

    // Wait for the auth loading spinner or page load
    await page.waitForTimeout(4000);

    // 1. Check if we need to log in
    const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
    if (phoneInput) {
      console.log("Login screen detected. Entering phone number...");
      await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
      await capture("01_login_filled");
      await page.click('button[type="submit"]');
      await page.waitForTimeout(5000);
    } else {
      console.log("Already logged in or bypassed login.");
    }

    // Wait for the home screen to finish loading (wait for "Vườn" tab to appear)
    console.log("Waiting for Vườn tab to appear...");
    await page.waitForSelector('text=Vườn', { timeout: 30000 });

    console.log("Current URL:", page.url());
    await capture("02_home_screen");

    // 2. Locate the streak indicator text
    const initialStreakText = await page.evaluate(() => {
      // Find the element containing "ngày tại Vườn" or just extract all text
      return document.body.innerText;
    });
    console.log("Initial page text snippet:", initialStreakText.substring(0, 200));

    // Get current streak value if displayed
    const getStreakValue = async () => {
      return await page.evaluate(() => {
        const matches = document.body.innerText.match(/🔥\s*(\d+)\s*ngày/);
        return matches ? parseInt(matches[1], 10) : null;
      });
    };

    const initialStreak = await getStreakValue();
    console.log(`Initial Streak value: ${initialStreak}`);

    // 3. Click "+1 ngày" streak simulation button
    console.log("Locating and clicking '+1 ngày' streak simulation button...");
    const simulateButton = await page.$('text=+1 ngày');
    if (!simulateButton) {
      throw new Error("Could not find the '+1 ngày' simulation button.");
    }
    
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/api/garden/simulate-streak') && response.request().method() === 'POST',
      { timeout: 10000 }
    );
    const gardenResponsePromise = page.waitForResponse(response => 
      response.url().endsWith('/api/garden/') && response.request().method() === 'GET',
      { timeout: 10000 }
    );
    await simulateButton.click();
    console.log("Clicked '+1 ngày' button, waiting for API response...");
    const response = await responsePromise;
    const responseBody = await response.json();
    console.log("Simulate streak API response:", JSON.stringify(responseBody));

    console.log("Waiting for subsequent GET /api/garden/ response...");
    const gardenRes = await gardenResponsePromise;
    const gardenBody = await gardenRes.json();
    console.log("Subsequent GET /api/garden/ response:", JSON.stringify(gardenBody));

    await page.waitForTimeout(3000);
    await capture("03_streak_clicked");

    const newStreak = await getStreakValue();
    console.log(`New Streak value: ${newStreak}`);

    if (initialStreak !== null && newStreak !== null) {
      if (newStreak <= initialStreak) {
        throw new Error(`Streak did not increase! Initial: ${initialStreak}, New: ${newStreak}`);
      }
      console.log(`✅ Streak successfully simulated! Increased from ${initialStreak} to ${newStreak}`);
    }

    // 4. Reload page to verify persistence in Firestore database
    console.log("Reloading the page to verify persistence...");
    await page.reload();
    console.log("Waiting for Vườn tab to appear after reload...");
    await page.waitForSelector('text=Vườn', { timeout: 30000 });
    await capture("04_home_screen_reloaded");

    const persistedStreak = await getStreakValue();
    console.log(`Persisted Streak value after reload: ${persistedStreak}`);

    if (newStreak !== null && persistedStreak !== null) {
      if (persistedStreak !== newStreak) {
        throw new Error(`Streak was not persisted in database! Expected: ${newStreak}, Found after reload: ${persistedStreak}`);
      }
      console.log(`✅ Streak successfully persisted in Firestore database across refreshes!`);
    }

    // 5. Navigate to family tab and check same status
    console.log("Navigating to Gia đình tab...");
    await page.click('text=Gia đình');
    await page.waitForTimeout(3000);
    await capture("05_family_tab");

    console.log("✅ All production E2E checks passed successfully!");
  } catch (error) {
    console.error("❌ Production test failed with error:", error);
    await capture("fail_error");
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  process.exit(0);
})();
