const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173/?nocache=' + Date.now());
  await page.waitForTimeout(2000);

  // Fill login
  const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
  if (phoneInput) {
    console.log("Logging in...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(15000);
  } else {
    console.log("No login input found, maybe already logged in.");
  }

  console.log("Current URL:", page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log("BODY TEXT:\n", bodyText.substring(0, 1000));

  const screenshotPath = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63/debug_after_login.png';
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot saved to:", screenshotPath);

  await browser.close();
  process.exit(0);
})();
