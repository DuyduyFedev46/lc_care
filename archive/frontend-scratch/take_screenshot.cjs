const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log("Navigating to local site...");
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);

  // Auto-login if we see the phone input
  const loginInput = await page.$('input[placeholder="Nhập số điện thoại của bạn"]');
  if (loginInput) {
    console.log("Logging in...");
    await page.fill('input[placeholder="Nhập số điện thoại của bạn"]', '0912345678');
    await page.click('text=Bắt đầu trải nghiệm →');
    await page.waitForTimeout(3000);
  }

  console.log("Waiting for GardenScreen (10 seconds total)...");
  await page.waitForTimeout(8000);

  const screenshotPath = '/Users/dangthiduyen/.gemini/antigravity/brain/a96f7409-a60a-4cf0-a67f-267a1c317379/screenshot_before.png';
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot successfully saved to:", screenshotPath);

  await browser.close();
})().catch(console.error);
