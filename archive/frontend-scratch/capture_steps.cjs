const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  // Do NOT clear localStorage, reuse the existing session
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173/?nocache=' + Date.now());
  await page.waitForTimeout(2000);

  // Login if needed
  const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
  if (phoneInput) {
    console.log("Entering phone number...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
  }
  
  console.log("Waiting for app to initialize fully...");
  await page.waitForTimeout(8000);

  // Disable redirect and clear plant state
  await page.evaluate(() => {
    window.__disableOnboardingRedirect = true;
    if (window.__updateState) {
      window.__updateState({ plant: null, seedPlanted: null, assignedPlant: null });
    }
  });
  await page.waitForTimeout(2000);

  // Navigate to health-scan
  console.log("Navigating to health-scan...");
  await page.evaluate(() => {
    if (window.__navigate) {
      window.__navigate("health-scan");
    }
  });
  await page.waitForTimeout(2000);
  
  const artifactsDir = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63';
  await page.screenshot({ path: path.join(artifactsDir, 'scratch_health_scan.png') });
  console.log("Saved scratch_health_scan.png");

  // Navigate to habits
  console.log("Navigating to habits...");
  await page.evaluate(() => {
    if (window.__navigate) {
      window.__navigate("habits");
    }
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(artifactsDir, 'scratch_habits.png') });
  console.log("Saved scratch_habits.png");

  await browser.close();
  console.log("Done!");
})();
