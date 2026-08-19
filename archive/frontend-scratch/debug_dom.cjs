const { chromium } = require('playwright');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000);

  // Login
  const loginForm = await page.$('input[placeholder="Nhập số điện thoại của bạn"]');
  if (loginForm) {
    console.log("Entering phone number...");
    await page.fill('input[placeholder="Nhập số điện thoại của bạn"]', '0912345678');
    await page.click('text=Bắt đầu trải nghiệm →');
    await page.waitForTimeout(4000);
  }

  // Inspect DOM content
  console.log("Current URL:", page.url());
  
  // Wait for loading screen to disappear
  await page.waitForTimeout(4000);

  const rootHTML = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? root.innerHTML : 'No root element found';
  });
  console.log("Root InnerHTML:");
  console.log(rootHTML);

  await browser.close();
})();
