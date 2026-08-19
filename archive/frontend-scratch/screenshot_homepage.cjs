const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // mobile screen size
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('request', req => {
    if (req.url().includes('/api/')) {
      console.log('API REQUEST:', req.method(), req.url());
    }
  });
  page.on('response', res => {
    if (res.url().includes('/api/') || res.status() >= 400) {
      console.log('API RESPONSE:', res.status(), res.url());
    }
  });
  
  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173/?nocache=' + Date.now());
  
  // Wait for loading screen to finish or redirect to login
  await page.waitForTimeout(2000);

  // If we are at the Login screen
  const loginForm = await page.$('input[placeholder="Số điện thoại"]');
  if (loginForm) {
    console.log("On Login screen. Entering phone number...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
  }

  console.log("Current URL:", page.url());
  
  // Wait for GardenScreen to load fully (sky scene, etc.)
  await page.waitForTimeout(8000);
  
  // Take screenshot
  const screenshotPath = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63/screenshot_homepage.png';
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot saved to:", screenshotPath);
  
  await browser.close();
  process.exit(0);
})();
