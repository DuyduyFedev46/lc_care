# Prompt Gemini — Khu Vườn Sức Khỏe Việt (Isometric Garden Island)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Xanh lá cây tươi mát, nâu gỗ ấm áp, nền đen tương phản.
> Phong cách: Whimsical isometric illustration, casual simulation game, children's book.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT — Khu Vườn Sức Khỏe Việt (Floating Isometric Garden)

```
Generate a whimsical, floating isometric garden island illustration in the style of a casual simulation video game or children's book.

COMPOSITION: Perfect isometric perspective (top-down 45° angle). Solid black background (#000000) for dramatic contrast. The scene should feel magical, cozy, and alive.

THE ISLAND:
- A lush green floating landmass hovering in dark space, with rich soil cross-section visible on the sides showing earth tones and roots.
- Surrounded by puffy white clouds drifting at the edges.
- The island is enclosed by a small wooden picket fence (warm brown wood) with glowing warm-yellow string lights draped along it, casting a soft magical glow.

SCROLL BANNER (Top Center):
- A decorative horizontal scroll/parchment banner floating above the garden.
- Vietnamese text in elegant handwritten style: "KHU VƯỜN SỨC KHỎE VIỆT"
- Banner color: warm cream/parchment with subtle gold trim.

CENTRAL PATHWAY:
- A winding stone pathway leading through the middle of the garden, guiding the eye from foreground to background.

SIX POTTED PLANTS (arranged across the island, each in distinct pots with handwritten Vietnamese labels):

1. GỪNG (Ginger) — Front-left:
   - A terracotta pot with visible ginger root clumps emerging from the soil.
   - Tall green stalks with small yellow flowers at the tips.
   - Handwritten label: "Gừng" on a small wooden stake.

2. NGHỆ (Turmeric) — Front-right:
   - A blue ceramic pot.
   - Broad green leaves with distinctive orange-tipped turmeric roots visible at the base.
   - Label: "Nghệ" on wooden stake.

3. RAU MÁ (Pennywort/Centella) — Mid-left:
   - A wide, shallow green pot.
   - Distinct round, shield-shaped green leaves (pennywort) spreading outward.
   - Label: "Rau Má" on wooden stake.

4. TÍA TÔ (Perilla) — Mid-right:
   - A dark ceramic pot.
   - Striking purple leaves (perilla/shiso) — vibrant purple on top, green underneath.
   - Label: "Tía Tô" on wooden stake.

5. SẢ (Lemongrass) — Back-left:
   - A tall rectangular stone planter.
   - Dense cluster of tall, slender green stalks with graceful arching tips.
   - Label: "Sả" on wooden stake.

6. TRÀ (Tea) — Back-center:
   - A round teal/blue-green glazed pot.
   - A young tea sapling with small, glossy dark green leaves.
   - Label: "Trà" on wooden stake.

WATER FEATURE (Back-right corner):
- A circular blue container/pot acting as a mini pond.
- Pink lotus flower (SEN) blooming from the center, with flat green lotus leaves floating on the water surface.
- Small orange and white koi fish swimming beneath the surface.
- Label: "Sen" on wooden stake.

ENVIRONMENTAL DETAILS:
- Scattered small colorful flowers (yellow, pink, white) dotting the grass.
- Tiny red-and-white spotted mushrooms near the fence posts.
- Glowing warm-yellow fairy lights on the fence casting soft halos.
- 2-3 delicate butterflies with patterned wings fluttering around the plants.
- Small gardening tools (a tiny wooden trowel, a watering can) resting by the fence.

LIGHTING:
- Warm, magical ambient lighting from above (like golden hour sunlight).
- Soft glow from the string lights on the fence.
- Subtle shadows on the grass beneath each pot.
- The black background makes the vibrant greens, purples, pinks, and warm browns POP dramatically.

MOOD: Peaceful, enchanting, nurturing — a safe magical space where medicinal plants thrive.

STYLE: Clean vector illustration aesthetic with soft gradients, gentle highlights, and storybook charm. No photorealism — keep it illustrative and warm.

RESOLUTION: 1024x1024 or 2048x2048, suitable for mobile app hero/splash screen.
```

---

## VARIANT — Simplified Mobile Screen Layout

For a mobile app screen (390x844) featuring this garden as a hero:

```
Design a modern mobile screen (390x844) for "Long Châu Care" health app.

TOP: The isometric garden island illustration (described above) as the hero, cropped/framed to fit the top 55% of the screen, fading softly to the UI section below.

BOTTOM SECTION (bg #F5F8FF, rounded top corners 24px):
- Title: "Khu Vườn Của Bạn" bold 22px, #1250DC.
- Subtitle: "Mỗi cây là một hành trình sức khỏe — hãy chăm sóc chúng mỗi ngày!" 14px, #6B7280.
- Stats row (3 columns):
  1. "🌱 6 cây" — "Đang trồng"
  2. "🔥 28 ngày" — "Streak"
  3. "⭐ 840 điểm" — "Tích lũy"
- Primary button: "Tưới cây hôm nay 💧" bg #1250DC, white text, height 52px, rounded 16px.

BOTTOM NAV: Standard 5-tab navigation.
```

---

## PLANT ASSETS REFERENCE

| Cây | Tên tiếng Anh | Màu sắc đặc trưng | Loại chậu |
|---|---|---|---|
| Gừng | Ginger | Xanh lá + vàng (hoa) | Đất nung (terracotta) |
| Nghệ | Turmeric | Xanh lá + cam (rễ) | Gốm xanh dương |
| Rau Má | Pennywort | Xanh lá tròn | Chậu cạn xanh lá |
| Tía Tô | Perilla | Tím đậm (lá) | Gốm tối |
| Sả | Lemongrass | Xanh lá cao, mảnh | Chậu đá chữ nhật |
| Trà | Tea | Xanh lá đậm, bóng | Gốm men xanh ngọc |
| Sen | Lotus | Hồng (hoa) + xanh (lá) | Chậu nước tròn xanh dương |

---

## DESIGN TOKENS

| Token | Value | Usage |
|---|---|---|
| Black BG | #000000 | Background contrast |
| Fence Wood | #8B6914 → #C49A3C | Picket fence |
| Fairy Lights | #FFD700 glow | String lights |
| Grass Green | #4CAF50 → #66BB6A | Island surface |
| Soil Brown | #5D4037 → #795548 | Island cross-section |
| Cloud White | #FFFFFF, soft opacity | Surrounding clouds |
| Lotus Pink | #F8BBD0 → #E91E63 | Lotus flower |
| Perilla Purple | #7B1FA2 → #9C27B0 | Tía Tô leaves |
| Turmeric Orange | #FF9800 | Nghệ roots |
| Banner Cream | #FFF8E1 | Scroll banner |
| UI Blue | #1250DC | App buttons, titles |
| Page BG | #F5F8FF | App background |
