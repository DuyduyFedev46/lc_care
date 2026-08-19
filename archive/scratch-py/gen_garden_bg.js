// Script gen bg3_garden_home.png mới — bright morning tone
// Dựa trên PROMPT GS-1 từ design/prompts/game_comic_master_prompts.md
// Chạy: node scratch/gen_garden_bg.js YOUR_GEMINI_API_KEY

const fs = require("fs");
const https = require("https");
const path = require("path");

const API_KEY = process.argv[2];
if (!API_KEY) {
  console.error("Usage: node gen_garden_bg.js YOUR_GEMINI_API_KEY");
  process.exit(1);
}

const PROMPT = `
A breathtaking 9:16 vertical background illustration for the main garden screen of "Long Châu Care" Vietnamese health app. THIS IS THE IMAGE USERS SEE EVERY DAY.

SCENE: A modern Vietnamese hillside garden at BRIGHT CLEAR MORNING (9-10am), inspired by Tam Đảo (Vĩnh Phúc). View from a wooden veranda looking out across the garden.

LIGHTING (CRITICAL): Bright crisp daylight — sun is high and clear, NOT golden hour, NOT sunset, NOT warm orange tones. Sky is bright blue (#87CEEB to #D6F0FF). Soft white clouds. Clean neutral sunlight with short soft shadows. Fresh, vibrant, energetic morning feel. NO orange. NO amber glow. NO warm golden rays.

COMPOSITION (9:16 — 576×1024):

TOP 20% (Header zone — keep visually quiet):
- Bright clear blue sky with 2-3 soft white fluffy clouds
- Distant Tam Đảo mountain silhouettes in clear atmospheric blue
- Pine tree tops framing upper corners, fresh vivid green
- A few small swallows in the distant sky
- Clean and airy — UI elements will overlay here

MIDDLE 50% (Hero zone — main garden):
- Center: Beautiful modern Vietnamese garden terrace with clean stone pathway
- IMPORTANT: A single prominent Bát Tràng ceramic pot on a stone pedestal at CENTER (50% horizontal, 68-73% vertical) — this is where the user's plant will overlay via CSS. Keep the pot and pedestal area CLEAN and uncluttered. The pot is terracotta/cream colored.
- Surrounding: Raised planter beds (Vo Trong Nghia concrete + wood style) with young lush green herbs
- Thin architectural bamboo screen elements
- Small modern stone water basin reflecting bright sky
- Clean wooden deck elements
- Fresh green terraced herb fields in middle distance
- A small wooden bench on the left

BOTTOM 30% (Foreground):
- Clean wooden veranda deck
- Soft green grass foreground with small white and purple wildflowers
- A few potted herbs at frame edges (NOT in center)
- Light morning dew sparkles on grass
- Gentle depth of field blur at very bottom

COLOR PALETTE (bright, fresh):
- Sky: Bright blue #87CEEB → pale #D6F0FF → white clouds
- Foliage: Vivid fresh green #4ADE80, #22C55E, #16A34A
- Hills/distance: Hill Green #6FA86F → Forest Green #2D5A3D
- Wood: Clean Wood Brown #8B5A2B (lighter, fresher)
- Stone: Soft gray #D1D5DB
- Pot: Natural terracotta / cream #E8D5A3
- Grass: Bright #4ADE80
- Accents: Jade Green #4A7C59, small wildflowers white and light purple
- NO orange #FFB088, NO amber #FFD966 dominant, NO warm golden rays

STYLE: Modern Vietnamese hillside watercolor illustration. Vo Trong Nghia architectural influence. Watercolor wash with refined pencil line work. Editorial magazine quality (Kinfolk / Cereal). Bright, fresh, healing, premium. 9:16 vertical portrait.

CRITICAL COMPOSITION NOTE: The area at approximately 50% horizontal and 65-75% vertical MUST have the stone pedestal with ceramic pot clearly visible and unobstructed. Plant and mascot will be CSS overlaid on top.

FORBIDDEN: No text. No UI. No phone frames. No pure black. No pure white. No neon. No celestial imagery. No religious symbols. No human figures. No floating sky islands. No evening/sunset tones. No orange sky. No warm amber lighting.
`.trim();

const requestBody = JSON.stringify({
  instances: [{ prompt: PROMPT }],
  parameters: {
    sampleCount: 1,
    aspectRatio: "9:16",
  },
});

const options = {
  hostname: "generativelanguage.googleapis.com",
  path: `/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(requestBody),
  },
};

console.log("Calling Imagen 3 API...");

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => { data += chunk; });
  res.on("end", () => {
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error("API Error:", JSON.stringify(json.error, null, 2));
        process.exit(1);
      }
      const b64 = json.predictions?.[0]?.bytesBase64Encoded;
      if (!b64) {
        console.error("No image in response:", JSON.stringify(json, null, 2));
        process.exit(1);
      }
      const outPath = path.join(__dirname, "..", "frontend", "public", "assets", "bg3_garden_home.png");
      const backupPath = path.join(__dirname, "bg3_garden_home_backup.png");

      // Backup ảnh cũ
      if (fs.existsSync(outPath)) {
        fs.copyFileSync(outPath, backupPath);
        console.log("Backed up old image to", backupPath);
      }

      fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
      console.log("✅ New image saved to", outPath);
      console.log("Reload http://localhost:5173 to see the result.");
    } catch (e) {
      console.error("Parse error:", e.message);
      console.error("Raw response:", data.slice(0, 500));
    }
  });
});

req.on("error", (e) => {
  console.error("Request error:", e.message);
});

req.write(requestBody);
req.end();
