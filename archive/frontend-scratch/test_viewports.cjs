const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  { name: 'iPhone_12_13_mini', width: 360, height: 780 },
  { name: 'iPhone_11_Pro', width: 375, height: 812 },
  { name: 'iPhone_12_13_14_Pro', width: 390, height: 844 },
  { name: 'iPhone_14_Pro_15_16_Pro', width: 393, height: 852 },
  { name: 'iPhone_16_Pro_17_17_Pro', width: 402, height: 874 },
  { name: 'iPhone_11_11_Pro_Max', width: 414, height: 896 },
  { name: 'iPhone_17_Air_Slim', width: 420, height: 912 },
  { name: 'iPhone_12_13_Pro_Max_14_Plus', width: 428, height: 926 },
  { name: 'iPhone_14_Pro_Max_15_16_Plus_15_Pro_Max', width: 430, height: 932 },
  { name: 'iPhone_16_17_Pro_Max', width: 440, height: 956 }
];

const ONBOARDING_SCREENS = [
  { id: 'welcome', label: '1. Welcome' },
  { id: 'health-scan', label: '2. Health Scan' },
  { id: 'cycle-tracking', label: '3. Cycle Tracking' },
  { id: 'life-changes', label: '4. Life Changes' },
  { id: 'habits', label: '5. Habits' },
  { id: 'plant-select', label: '6. Plant Select' },
  { id: 'seed-planted', label: '7. Seed Planted' }
];

const artifactsDir = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63/viewport_test';
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

(async () => {
  console.log("🚀 Starting Playwright Viewport Verification...");
  const browser = await chromium.launch({ headless: true });
  
  const reportData = [];
  
  for (const vp of VIEWPORTS) {
    console.log(`\n📱 Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 3,
    });
    const page = await context.newPage();
    
    const consoleLogs = [];
    const consoleErrors = [];
    
    page.on('console', msg => {
      const txt = msg.text();
      consoleLogs.push(txt);
      if (msg.type() === 'error') {
        const isExpected = txt.includes('ERR_CONNECTION_REFUSED') || 
                           txt.includes('identitytoolkit') || 
                           txt.includes('400');
        if (!isExpected) consoleErrors.push(txt);
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });
    
    try {
      await page.goto('http://localhost:5173/?nocache=' + Date.now());
      await page.waitForTimeout(2000);
      
      // Perform login if needed
      const phoneInput = await page.$('input[placeholder="Số điện thoại"]');
      if (phoneInput) {
        await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(4000);
      }
      
      // Clear plant/seedPlanted state to bypass App.jsx redirect during testing
      await page.evaluate(() => {
        window.__disableOnboardingRedirect = true;
        if (window.__updateState) {
          window.__updateState({ plant: null, seedPlanted: null, assignedPlant: null });
        }
      });
      await page.waitForTimeout(1000);
      
      for (const scr of ONBOARDING_SCREENS) {
        console.log(`   Navigating to ${scr.label}...`);
        await page.evaluate((screenId) => {
          if (window.__navigate) {
            window.__navigate(screenId);
          } else {
            console.error("window.__navigate is not available!");
          }
        }, scr.id);
        
        await page.waitForTimeout(1500);
        
        // Take screenshot
        const screenshotFileName = `${vp.name}_${scr.id}.png`;
        const screenshotPath = path.join(artifactsDir, screenshotFileName);
        await page.screenshot({ path: screenshotPath });
        
        // Check for scroll overflow
        const overflowStatus = await page.evaluate(() => {
          const bodyOverflow = document.body.scrollWidth > window.innerWidth;
          const docOverflow = document.documentElement.scrollWidth > window.innerWidth;
          // Find any element with scrollWidth > clientWidth and visible overflow
          const overflowingElements = [];
          document.querySelectorAll('*').forEach(el => {
            if (el.scrollWidth > el.clientWidth && getComputedStyle(el).overflowX !== 'hidden' && el.clientWidth > 0) {
              overflowingElements.push(el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''));
            }
          });
          return {
            overflowDetected: bodyOverflow || docOverflow || overflowingElements.length > 0,
            bodyWidth: document.body.scrollWidth,
            windowWidth: window.innerWidth,
            elements: overflowingElements.slice(0, 3)
          };
        });
        
        reportData.push({
          viewport: vp.name,
          width: vp.width,
          height: vp.height,
          screenId: scr.id,
          screenLabel: scr.label,
          screenshot: `/viewport_test/${screenshotFileName}`,
          overflow: overflowStatus.overflowDetected,
          overflowDetails: overflowStatus,
          errors: [...consoleErrors]
        });
      }
      
    } catch (e) {
      console.error(`Error testing viewport ${vp.name}:`, e);
    } finally {
      await page.close();
      await context.close();
    }
  }
  
  await browser.close();
  
  // Write the markdown report
  const reportPath = '/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63/viewport_test_report.md';
  let mdContent = `# Onboarding Viewports Verification Report\n\n`;
  mdContent += `*Completed at: ${new Date().toISOString()}*\n\n`;
  mdContent += `## Summary of Results\n\n`;
  mdContent += `| Viewport | Dimensions | Screen | Layout Overflow | Console Errors | Status |\n`;
  mdContent += `| --- | --- | --- | --- | --- | --- |\n`;
  
  for (const item of reportData) {
    const overflowStatusText = item.overflow ? `⚠️ Yes (${item.overflowDetails.elements.join(', ') || 'body'})` : '✅ No';
    const errorStatusText = item.errors.length > 0 ? `❌ Yes (${item.errors.length} errors)` : '✅ No';
    const status = (!item.overflow && item.errors.length === 0) ? '🟢 PASS' : '🔴 FAIL';
    mdContent += `| ${item.viewport} | ${item.width}x${item.height} | ${item.screenLabel} | ${overflowStatusText} | ${errorStatusText} | ${status} |\n`;
  }
  
  mdContent += `\n## Viewport Carousel Details\n\n`;
  
  // Write separate sections for each viewport with carousels of screenshots
  for (const vp of VIEWPORTS) {
    mdContent += `### ${vp.name} (${vp.width}x${vp.height})\n\n`;
    mdContent += `\`\`\`\`carousel\n`;
    const vpItems = reportData.filter(item => item.viewport === vp.name);
    for (let i = 0; i < vpItems.length; i++) {
      const item = vpItems[i];
      mdContent += `![${item.screenLabel}](/Users/dangthiduyen/.gemini/antigravity-ide/brain/fb131f5c-906d-4ec6-8ab1-f6a62ed2cf63${item.screenshot})\n`;
      if (i < vpItems.length - 1) {
        mdContent += `<!-- slide -->\n`;
      }
    }
    mdContent += `\`\`\`\`\n\n`;
  }
  
  fs.writeFileSync(reportPath, mdContent);
  console.log(`\n🎉 Report generated successfully at: ${reportPath}`);
  
  process.exit(0);
})();
