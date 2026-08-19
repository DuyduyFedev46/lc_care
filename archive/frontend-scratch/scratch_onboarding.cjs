const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173/?nocache=' + Date.now());
  await page.waitForTimeout(2000);

  // Login
  const loginForm = await page.$('input[placeholder="Số điện thoại"]');
  if (loginForm) {
    console.log("Logging in...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(6000); // give it more time to load fully
  }

  // Bypass onboarding redirect
  await page.evaluate(() => {
    window.__disableOnboardingRedirect = true;
    if (window.__updateState) {
      window.__updateState({ plant: null, seedPlanted: null, assignedPlant: null, initialized: true });
    }
  });
  await page.waitForTimeout(1000);

  const screens = ['health-scan', 'cycle-tracking'];
  const outputDir = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63';

  for (const scr of screens) {
    console.log(`Navigating to ${scr}...`);
    await page.evaluate((screenId) => {
      if (window.__navigate) {
        window.__navigate(screenId);
      }
    }, scr);
    
    // Wait for a visible element of onboarding step
    await page.waitForSelector('button:has-text("Tiếp tục")', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1000);

    const screenshotPath = path.join(outputDir, `scratch_${scr}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to: ${screenshotPath}`);
  }

  await browser.close();
  process.exit(0);
})();
