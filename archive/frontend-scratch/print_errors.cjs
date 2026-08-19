const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('PAGE UNCAUGHT ERROR:', err.message);
  });
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000);
  
  await browser.close();
})();
