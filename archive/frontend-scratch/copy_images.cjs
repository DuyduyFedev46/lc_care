const fs = require('fs');
const path = require('path');

const srcDir = '/Users/dangthiduyen/.gemini/antigravity/brain/a96f7409-a60a-4cf0-a67f-267a1c317379';
const destDir = '/Users/dangthiduyen/Downloads/FPT DLC/LC_Care/frontend/public/assets';

const filesToCopy = [
  { src: 'bg2_panel1_seed_clean_1779811632876.png', dest: 'bg2_panel1_seed_clean.png' },
  { src: 'bg2_panel2_explore_clean_1779811651754.png', dest: 'bg2_panel2_explore_clean.png' },
  { src: 'bg2_panel3_pharmacist_clean_1779811675577.png', dest: 'bg2_panel3_pharmacist_clean.png' },
  { src: 'bg2_panel4_wind_clean_1779811696489.png', dest: 'bg2_panel4_wind_clean.png' },
  { src: 'bg2_panel5_reveal_clean_1779811716980.png', dest: 'bg2_panel5_reveal_clean.png' }
];

console.log("Starting to copy images...");

filesToCopy.forEach(item => {
  const srcPath = path.join(srcDir, item.src);
  const destPath = path.join(destDir, item.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} to ${item.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});

console.log("Image copy completed!");
