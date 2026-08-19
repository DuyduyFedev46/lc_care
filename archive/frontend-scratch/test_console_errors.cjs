const { chromium } = require('playwright');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]: ${msg.text()}`);
  });
  page.on('pageerror', err => {
    console.error(`[BROWSER RUNTIME ERROR]: ${err.message}`);
  });

  console.log("Navigating to App...");
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);
  
  // Fill login
  const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
  if (phoneInput) {
    console.log("Logging in...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
  }
  
  console.log("Current Screen:", await page.evaluate(() => window.location.href));
  
  await browser.close();
  console.log("Done.");
})();
