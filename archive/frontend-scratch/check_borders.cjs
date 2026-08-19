const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const files = [
    'bg2_panel1_seed.webp',
    'bg2_panel2_explore.webp',
    'bg2_panel3_pharmacist.webp',
    'bg2_panel3_habits.webp',
    'bg2_panel4_wind.webp',
    'bg2_panel5_plant_select.webp',
    'bg2_panel5_reveal.webp'
  ];
  
  for (const file of files) {
    await page.goto(`http://localhost:5173/assets/${file}`);
    
    const colors = await page.evaluate(async (filename) => {
      const img = new Image();
      img.src = `/assets/${filename}`;
      await new Promise(resolve => img.onload = resolve);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Sample 4 corners and the center of top/bottom borders
      const getPixel = (x, y) => {
        const d = ctx.getImageData(x, y, 1, 1).data;
        return `rgba(${d[0]},${d[1]},${d[2]},${d[3]/255})`;
      };
      
      return {
        topLeft: getPixel(10, 10),
        topCenter: getPixel(img.width / 2, 10),
        topRight: getPixel(img.width - 10, 10),
        bottomLeft: getPixel(10, img.height - 10),
        bottomCenter: getPixel(img.width / 2, img.height - 10),
        bottomRight: getPixel(img.width - 10, img.height - 10)
      };
    }, file);
    
    console.log(`COLORS FOR ${file}:`, JSON.stringify(colors, null, 2));
  }
  
  await browser.close();
})();
