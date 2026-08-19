const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Go to the dev server assets
  await page.goto('http://localhost:5173/assets/bg2_panel1_seed.webp');
  
  const result = await page.evaluate(async () => {
    // Let's load the image on a canvas to read its dimensions and pixel data
    const img = new Image();
    img.src = '/assets/bg2_panel1_seed.webp';
    await new Promise(resolve => img.onload = resolve);
    
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Read pixel at (0, 0) and (width - 1, height - 1)
    const p1 = ctx.getImageData(0, 0, 1, 1).data;
    const p2 = ctx.getImageData(img.width - 1, img.height - 1, 1, 1).data;
    
    return {
      width: img.width,
      height: img.height,
      pixelTopLeft: { r: p1[0], g: p1[1], b: p1[2], a: p1[3] },
      pixelBottomRight: { r: p2[0], g: p2[1], b: p2[2], a: p2[3] }
    };
  });
  
  console.log("RESULT FOR bg2_panel1_seed.webp:", JSON.stringify(result, null, 2));
  
  await browser.close();
})();
