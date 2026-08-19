const { chromium } = require('playwright');

(async () => {
  console.log("Starting browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating...");
  await page.goto('http://localhost:5173');
  
  // Wait and login
  await page.waitForTimeout(2000);
  const loginForm = await page.$('input[placeholder="Số điện thoại"]');
  if (loginForm) {
    console.log("Filling login...");
    await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
    await page.click('button[type="submit"]');
  }

  console.log("Waiting for selector...");
  try {
    await page.waitForSelector('.plant-pedestal-container', { timeout: 15000 });
    const html = await page.evaluate(() => {
      const el = document.querySelector('.plant-pedestal-container');
      return el ? el.outerHTML : 'NOT FOUND';
    });
    console.log("DOM HTML FOR PLANT CONTAINER:");
    console.log(html);
  } catch (err) {
    console.log("Timeout waiting for container. Current URL:", page.url());
    const bodyHtml = await page.evaluate(() => document.body.innerHTML);
    console.log("Body HTML snippet:", bodyHtml.substring(0, 1000));
  }

  await browser.close();
})();
