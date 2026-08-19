# 🎮🌿 Long Châu Care — Game-Comic Master Prompt Set

> **Version:** 1.0 · 2026-05-26
> **Source of Truth — Visual:** `design/art_direction_F.md` (Modern Hillside Garden)
> **Source of Truth — Narrative:** `design/narrative_design_bible.md` (15 Cây × 4 Stage)
> **Purpose:** Bộ prompt toàn diện biến app health habit thành game-comic tương tác
> **Scope:** 15 cây × 4 giai đoạn × toàn bộ màn hình × notification × AI system

---

# PHẦN 0: UNIVERSE DEFINITION — VŨ TRỤ GAME-COMIC

## 0.1 Central Thesis

> *"Long Châu Care không phải app y tế. Nó là một webtoon tương tác — nơi mỗi ngày user mở ra 1 panel mới của câu chuyện sức khỏe của chính họ."*

**Genre:** Slice-of-life × Cozy Garden Sim × Health Companion
**Tone:** Nhẹ nhàng, ấm áp, không drama — Studio Ghibli gặp Vo Trong Nghia
**Target:** Nữ 26-35, gia đình Việt, có con nhỏ hoặc chăm ba mẹ già

## 0.2 Visual DNA (from Art Direction F)

```
Theme: Modern Hillside Garden — Vietnamese Heritage Edition
Location DNA: Tam Đảo → Mộc Châu → Sapa → Hội An → Yên Tử → Bắc Hà
Architecture: Vo Trong Nghia (bamboo + concrete + glass)
Color: Hill Green #6FA86F · Forest Green #2D5A3D · Mist White #F0F5F0
       Morning Gold #FFD966 · Sunrise Orange #FFB088
       Wood Brown #8B5A2B · Jade Green #4A7C59
       Premium Cream #FDFBF7 · Brass Gold #C9A96E
Style: Watercolor wash + soft pencil line · Editorial magazine quality
Light: Morning golden hour · Soft mist at ground level · God rays through pine
Mascot: Squatter chibi robot pharmacist · Blue helmet · White coat · Blue tie
```

## 0.3 Narrative DNA (from Narrative Design Bible)

```
15 cây thảo dược Việt = 15 nhân vật đồng hành
4 giai đoạn = 4 chương truyện (Mầm Non → Cây Non → Trưởng Thành → Nở Hoa)
300 micro-narratives = 300 lời thoại cây nói với user
Phép ẩn dụ: Sức khỏe = Khu vườn · Hành động = Nước · Kiên trì = Hoa
Luật bất biến: Cây không chết · Không guilt-trip · Dược sĩ là người gác cổng
```

## 0.4 The Comic Structure

Toàn bộ app được cấu trúc như một bộ webtoon dài kỳ:

| Chapter | App Phase | Duration | Arc Name |
|---------|-----------|----------|----------|
| **Prologue** | Onboarding (7 màn) | 3-5 phút | "Hạt giống đầu tiên" |
| **Chapter 1** | Stage 1 (Streak 0-7) | 7 ngày | "Mầm non — Bắt đầu = Dũng cảm" |
| **Chapter 2** | Stage 2 (Streak 8-14) | 7 ngày | "Cây non — Đều đặn tạo thói quen" |
| **Chapter 3** | Stage 3 (Streak 15-29) | 15 ngày | "Trưởng thành — Kiên trì = Bản sắc" |
| **Chapter 4** | Stage 4 (Streak 30+) | Ongoing | "Nở hoa — Thành quả & Di sản" |
| **Side Stories** | Family Garden, Voucher Shop, Pharmacist | Ongoing | "Những khu vườn khác" |

## 0.5 Prompt Format Convention

Mỗi prompt trong bộ này tuân theo format:

```
## PROMPT [Category]-[Number]: [Tên màn hình/asset]
**Loại:** Image Gen / AI System / UI Design / Animation
**Reference Art Direction F:** [Location] · [Colors] · [Mood]
**Reference Bible:** [Section] · [Plant Group] · [Stage]
**Input Assets:** [URLs của asset có sẵn]
**Prompt (EN):** [Prompt tiếng Anh cho AI gen]
**Prompt (VI — reference):** [Mô tả tiếng Việt cho team nội bộ]
**Expected Output:** [Mô tả output mong đợi]
```

---

# PHẦN 1: PROLOGUE — ONBOARDING COMIC PANELS (7 Panels)

> **Style:** Vertical webtoon · Chibi mascot · Tam Đảo morning light
> **Reference:** `comic_onboarding_prompts.md` · `prompts_onboarding_screens_v2.md`
> **Art Direction:** Tam Đảo foggy hills · Modern wooden veranda · Soft mist

---

## PROMPT OB-1: Panel 0 — Cổng Vườn (Welcome / Login)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · Mist White + Morning Gold · Modern wooden gate
**Reference Bible:** Section 1.2 (Khu Vườn Đồi) · Section 1.4 (Stranger phase)
**Input Assets:**
- Mascot: `https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png`
- Logo: Long Châu Care wordmark

```
A vertical webtoon-style comic panel (9:16 aspect ratio) for a Vietnamese health app onboarding — "Long Châu Care". NO phone frame. The scene: A beautiful modern Vietnamese hillside garden entrance at dawn. A clean wooden arch gate designed in Vo Trong Nghia architectural style (bamboo screens integrated with minimalist wood frames, simplified curved tile roof corners) marks the entrance. Morning mist swirls gently at ground level — NEVER covering the sky. Soft golden hour light (Morning Gold #FFD966) filters through pine trees in the background. Terraced herbal fields visible in the far distance, fading into atmospheric haze.

In the foreground, the cute chibi mascot character (squatter 3D toy-like robot pharmacist — round blue helmet covering entire head, white over-ear headphones, white lab coat with blue tie, plump blue gloves, short stubby legs, "NHÀ THUỐC LONG CHÂU" badge on left chest, large sparkling blue eyes) stands at the gate, one hand waving hello, the other holding a small golden key. The mascot has a warm welcoming smile. Speech bubble in Vietnamese: "Chào bạn! Mở cổng vườn nhé?" (Hello! Shall we open the garden gate?).

Below the mascot, integrated naturally into the scene: a clean phone number input area with Vietnamese flag (+84), a soft Jade Green (#4A7C59) "Tiếp tục" button with rounded corners, and small text "Hoặc đăng nhập bằng" with a Google icon. The overall mood: arriving at a secret modern hillside garden for the first time — anticipation, warmth, safety. Watercolor wash with refined pencil line work, editorial magazine quality. Color palette: Mist White #F0F5F0, Hill Green #6FA86F, Morning Gold #FFD966, Wood Brown #8B5A2B. No pure black, no pure white, no neon, no celestial imagery.
```

**Expected Output:** 1080×1920 PNG webtoon panel — Cổng vườn với mascot chào đón + ô nhập SĐT

---

## PROMPT OB-2: Panel 1 — Hạt Giống Đầu Tiên (Basic Info)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · Premium Cream + Jade Green · Modern planter beds
**Reference Bible:** Section 1.1 (Triết lý cốt lõi) · Plant assignment trigger

```
A vertical webtoon-style comic panel (9:16) for health app onboarding — "Long Châu Care". NO phone frame. The scene: Inside the garden now — a beautiful modern hillside garden terrace. Vo Trong Nghia-style raised planter beds in clean concrete + wood hybrids line the terrace. Morning mist at ground level. Soft volumetric god rays through pine branches.

The cute chibi mascot (squatter 3D toy-like robot pharmacist — round blue helmet, white headphones, white lab coat with blue tie, plump blue gloves, short stubby legs, large blue eyes, rosy cheeks) is kneeling on a stone pathway, gently placing a glowing golden seed into rich dark soil in a modern Bát Tràng ceramic pot with subtle contemporary patterns. The mascot looks up at the viewer with a warm, curious expression.

Speech bubble: "Mình là ai vậy? Kể mình nghe đi!" (Who are you? Tell me about yourself!).

Floating naturally in the garden scene (not as harsh UI boxes, but as soft paper-like cards with subtle wood texture): name field, gender toggle (Nam/Nữ) styled as soft pill buttons, year of birth. All elements have the warm Premium Cream (#FDFBF7) background with Wood Brown (#8B5A2B) subtle borders.

Color palette: Premium Cream #FDFBF7, Jade Green #4A7C59, Wood Brown #8B5A2B, Morning Gold #FFD966 accents. Watercolor wash + soft pencil line. Editorial magazine quality. Warm morning lighting. No pure black, no pure white, no technology visible.
```

**Expected Output:** 1080×1920 PNG — Mascot gieo hạt vàng + form thông tin cơ bản

---

## PROMPT OB-3: Panel 2 — Khám Phá Khu Vườn (Health Scan / 5 Pillars)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · Forest Green + Hill Green · Pine forest background
**Reference Bible:** Section 3.2 (Habit-as-Watering) · 5 health pillars

```
A vertical webtoon-style comic panel (9:16) for health app onboarding — "Long Châu Care". NO phone frame. The scene: The mascot has moved deeper into the modern hillside garden. The cute chibi robot pharmacist (round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) is standing on the stone pathway, looking around curiously while holding a small magnifying glass. Pine forest visible in background with soft morning mist between trees.

Speech bubble: "Khu vườn này cần gì để tươi tốt nhỉ?" (What does this garden need to flourish?).

In the garden foreground, 5 distinct garden elements represent health pillars — each is a physical part of the garden, NOT a UI card:
1. A stone pathway with footprints → "Vận động" (Movement)
2. A small wooden pergola with hanging vines for shade → "Giấc ngủ" (Sleep)
3. Herb beds with fresh vegetables → "Dinh dưỡng" (Nutrition)
4. A small water feature with gentle flow → "Tinh thần" (Mental calm)
5. Rich dark soil beds with earthworms → "Môi trường sống" (Environment)

Each element has a subtle floating indicator (like a dewdrop or firefly) showing its "level" — some areas are lush and vibrant, others need more care. The mascot is examining the water feature with the magnifying glass.

Vietnamese landscape inspiration: Tam Đảo terraced herbal fields in distant background. Watercolor wash + refined pencil line. Editorial quality. Color palette: Forest Green #2D5A3D, Hill Green #6FA86F, Mist White #F0F5F0, Morning Gold #FFD966. Warm dawn light. No phone frame, no UI boxes, no technology.
```

**Expected Output:** 1080×1920 PNG — 5 khu vực vườn tượng trưng 5 trụ cột sức khỏe

---

## PROMPT OB-4: Panel 3 — Gặp Dược Sĩ Giữ Vườn (Medical Info)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · Wood Brown + Premium Cream · Modern veranda
**Reference Bible:** Section 1.3 Luật 4 (Dược sĩ = Người gác cổng)
**Input Assets:**
- Mascot: `https://chauthuc.web.app/assets/mascots_nobg/mascot_pharmacist_partner.png`

```
A vertical webtoon-style comic panel (9:16) for health app onboarding — "Long Châu Care". NO phone frame. The scene: A cozy modern Vietnamese veranda within the hillside garden. Clean wooden deck with minimalist roof — Vo Trong Nghia bamboo screen elements. A small wooden table with a modern ceramic tea set and a fresh herb sprig in a tiny vase.

The cute chibi mascot (round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) is sitting at the table, looking attentively at the viewer like a caring pharmacist consulting a customer. Next to the mascot, a small glowing holographic-style plant catalog hovers — showing tiny illustrations of 15 different Vietnamese herbs (ginger, turmeric, lotus, mint, lemongrass, lavender, etc.) like a magical botanical index.

Speech bubble: "Bạn có đang dùng thuốc hay thực phẩm bổ sung gì không?" (Are you taking any medications or supplements?).

At the bottom, subtle natural elements represent optional inputs: a small camera icon made of vines and leaves (for prescription photo), a soft pill-shaped leaf cluster with "Bệnh mãn tính" label, and a small moon-flower for "Chu kỳ". All integrated as garden elements, not UI cards. A tiny note carved in wood: "Bước này không bắt buộc" (This step is optional).

Warm afternoon light transitioning — soft golden hour. Watercolor wash + refined pencil line. Color palette: Wood Brown #8B5A2B, Premium Cream #FDFBF7, Brass Gold #C9A96E, Jade Green #4A7C59. Editorial quality. No phone frame. No medical equipment visible — the consultation feels like a friendly garden chat.
```

**Expected Output:** 1080×1920 PNG — Mascot+Dược sĩ tư vấn trong vườn + cây thảo dược

---

## PROMPT OB-5: Panel 4 — Cơn Gió Thổi Qua (Life Changes)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · Mist White + Sunrise Orange · Terraced fields
**Reference Bible:** Section 1.4 (Emotional Arc — Stranger phase)

```
A vertical webtoon-style comic panel (9:16) for health app onboarding — "Long Châu Care". NO phone frame. The scene: A gentle wind moment in the modern hillside garden. The cute chibi mascot (round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) stands on a grassy hill slope, eyes gently closed, feeling the breeze with a peaceful, empathetic expression. The mascot's lab coat hem moves softly in the wind. A small fresh herb leaf is tucked behind one ear.

The wind carries floating symbolic elements — rendered as delicate watercolor brush strokes — a tiny baby bottle, a small house silhouette, a briefcase, a heart — representing life changes. These are soft, dreamy, not heavy.

Speech bubble: "Gần đây bạn có trải qua điều gì đặc biệt không?" (Have you been through anything special recently?).

Below the mascot, spread across the terraced field slopes: soft rounded elements (not UI pills but smooth river stones with text carved in) for life events: "Mang thai / Sau sinh", "Chuyển nhà", "Đổi việc", "Mất người thân", "Stress công việc". Each stone has a subtle warm glow.

Background: Tam Đảo terraced fields in middle distance, atmospheric haze, distant mountain silhouettes. Late afternoon golden hour light with soft long shadows. Watercolor wash. Emotional but hopeful — this is a safe space. Color palette: Mist White #F0F5F0, Sunrise Orange #FFB088, Morning Gold #FFD966, Hill Green #6FA86F. No phone frame. No dark/depressing tones.
```

**Expected Output:** 1080×1920 PNG — Gió vườn mang biểu tượng cuộc sống + đá sông khắc chữ

---

## PROMPT OB-6: Panel 5 — REVEAL / CÂY HIỆN HÌNH (Climax)

**Loại:** Image Gen — Webtoon Panel
**Reference Art Direction F:** Tam Đảo · All colors · Magical dawn
**Reference Bible:** Section 2 Plant Identity Cards · Plant assignment moment
**Input Assets:**
- Plant icons: `https://chauthuc.web.app/assets/icons/ginger_growth_stage_1.png` → `_5.png`

```
A vertical webtoon-style comic panel (9:16) — THE CLIMAX of the health app onboarding. "Long Châu Care". NO phone frame. This is the most important visual in the entire onboarding. The scene: A magical dawn moment in the modern hillside garden. The cute chibi mascot (round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) kneels beside a freshly sprouted plant that is GLOWING with soft golden morning light — NOT heavy magic sparkles, but a warm natural bioluminescence like morning dew catching first light. Tiny dewdrops on the new leaves refract rainbow light.

The sprouted plant has 5 visible aspects (matching the 5 pillars):
- Strong visible roots in rich dark soil (foundation)
- A sturdy small stem (body/movement)
- Two fresh green cotyledon leaves (nutrition)
- A tiny golden aura of warmth around it (mental wellbeing)
- Dewdrops and healthy soil microorganisms visible (environment)

Each aspect is proportionally vibrant or faded based on what the user indicated — some parts glow stronger, others are gentler. This creates a unique "plant portrait" of the user.

The mascot looks at the plant with wonder and pride — sparkling eyes, gentle smile — one plump blue-gloved hand hovering near the plant protectively.

Speech bubble: "Đây là cây của bạn! Cùng nhau chăm sóc nhé!" (This is your plant! Let's take care of it together!).

Below the plant, a floating piece of handmade paper (washi texture, soft edges) shows: "Kế hoạch của bạn" (Your Plan) with delicate vine-like progress indicators. The assigned plant name is revealed here — e.g., "Cây Gừng — Người bạn đồng hành sáng tối".

Background: Tam Đảo at perfect dawn moment — first sunlight breaking over distant mountains, mist clearing at ground level, terraced fields catching golden light. This is the most beautiful moment in the garden. Watercolor wash + refined pencil line. Editorial magazine quality. Color palette: ALL — Premium Cream #FDFBF7, Morning Gold #FFD966 (dominant), Jade Green #4A7C59, Sunrise Orange #FFB088 (warm glow), Mist White #F0F5F0. Celebratory but serene. No phone frame. No heavy magic effects. No celestial imagery.
```

**Expected Output:** 1080×1920 PNG — Khoảnh khắc cây hiện hình đỉnh cao của onboarding

---

## PROMPT OB-7: Loading Screen — Kết Nối Khu Vườn

**Loại:** Image Gen — Loading Screen
**Reference Art Direction F:** Yên Tử · Forest Green + Mist White · Peaceful pine forest
**Reference Bible:** Section 1.6 (Mascot Persona — idle/meditating state)
**Input Assets:**
- Mascot: `https://chauthuc.web.app/assets/mascots_nobg/mascot_loading.png`

```
A vertical webtoon-style loading screen (9:16) for "Long Châu Care" health app. NO phone frame. The scene: A peaceful pine forest clearing at Yên Tử (inspired by Trúc Lâm pine forest — natural peace, NOT religious). The cute chibi mascot (squatter 3D toy-like robot pharmacist — round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) sits cross-legged on a soft moss-covered stone, eyes gently closed, meditating peacefully. The mascot's expression is serene, a tiny content smile.

Around the mascot, tiny glowing seeds float upward like fireflies — each seed with a different tiny plant sprout (representing different herb types). A small sprout grows in the soil in front of the mascot with a soft pulsing warm glow. Morning mist swirls gently at ground level. Pine trees frame the scene with soft god rays filtering through branches.

Below the mascot, elegant Vietnamese text in hand-lettered style: "Đang kết nối Khu Vườn..." (Connecting to the Garden...) in Jade Green (#4A7C59) with subtle animated dots feel. At the very bottom, a thin progress indicator styled as a growing vine (not a tech progress bar — a delicate green vine creeping across moss).

The "Long Châu Care" wordmark at top in subtle Wood Brown (#8B5A2B).

Overall mood: serene, anticipation, magical but grounded. A moment of calm before entering the garden. Watercolor wash + refined pencil line. Color palette: Forest Green #2D5A3D, Mist White #F0F5F0, Morning Gold #FFD966, Jade Green #4A7C59. Soft diffused morning light. No phone frame. No religious imagery (no Buddha, no temples). No technology. Pure nature + modern design.
```

**Expected Output:** 1080×1920 PNG — Loading screen với mascot thiền + hạt bay + dây leo progress

---

# PHẦN 2: MAIN GARDEN SCREEN — KHU VƯỜN CHÍNH

> **Đây là màn hình quan trọng nhất — user nhìn thấy mỗi ngày.**
> **Phải đẹp đến mức user muốn mở app chỉ để ngắm vườn.**
> **Style:** Tam Đảo Modern Hillside · Game HUD overlay · 30-second loop

---

## PROMPT GS-1: Garden Home Background — Tam Đảo Hillside (BASE)

**Loại:** Image Gen — Background Scene
**Reference Art Direction F:** Tam Đảo · All palette · Modern hillside garden
**Reference Bible:** Section 1.2 (Khu Vườn Đồi) · Section 3.1 (30-Second Loop)

```
A breathtaking 9:16 vertical background illustration for the main screen of "Long Châu Care" health app. THIS IS THE IMAGE USERS SEE EVERY DAY — it must be stunning enough that opening the app feels like entering a peaceful sanctuary.

SCENE: A modern Vietnamese hillside garden at golden hour morning, inspired by Tam Đảo (Vĩnh Phúc). The view is from a wooden veranda looking out across the garden.

COMPOSITION (9:16 — 1080×1920):

TOP 20% (Header zone — keep visually quiet):
- Soft morning sky in warm golden-cream tones
- Distant mountain silhouettes fading into atmospheric haze
- A few pine tree tops framing the upper corners
- Gentle god rays filtering diagonally from upper-left
- This zone will have UI elements overlaid — keep it sparse

MIDDLE 50% (Hero zone — the main garden):
- Center: A beautiful modern Vietnamese garden terrace with clean stone pathway
- A prominent empty planter space in center-foreground — this is where the user's PLANT will be overlaid (leave this area without any dominant plant — just rich dark soil in a beautiful Bát Tràng modern ceramic pot, placed on a stone pedestal)
- Surrounding: Raised planter beds (Vo Trong Nghia concrete + wood hybrid style) with young herbs growing
- Bamboo screen elements as modern design features (not traditional thick bamboo — thin, architectural bamboo poles in clean arrangements)
- A small modern water feature (minimalist stone basin with gentle water surface reflecting morning light)
- Wooden deck with clean lines
- Terraced herbal fields visible in middle distance
- A small wooden bench (cozy but not cluttered)
- Morning mist at ground level — NEVER covering sky

BOTTOM 30% (Foreground + UI overlay zone):
- The veranda deck continues — clean wood planks
- A few potted herbs at the edges of frame
- Soft dandelion seeds floating in sunbeam
- This zone will have UI cards overlaid — render it fully but keep details gentle

LIGHTING: Primary morning sun from upper-left. Warm golden hour but not orange-saturated. Soft diffused through morning mist. Volumetric god rays through pine trees. Soft long shadows. Atmospheric haze in distance.

DETAILS (2-3 of these present):
- Morning dew on grass blades near the planter
- Soft mist swirling at ground level
- One or two floating dandelion seeds caught in a sunbeam
- Gentle breeze visible in herb leaves
- Small bird silhouette in distant sky (tiny, subtle)

COLOR PALETTE:
- Sky: Premium Cream #FDFBF7 → Mist White #F0F5F0
- Hills/Distance: Hill Green #6FA86F → Forest Green #2D5A3D (atmospheric perspective)
- Wood: Wood Brown #8B5A2B
- Stone: Soft Gray #D1D5DB
- Light: Morning Gold #FFD966 + Sunrise Orange #FFB088 (warm)
- Accents: Jade Green #4A7C59, Brass Gold #C9A96E (modern details)
- Soil: Rich warm brown

STYLE: Modern Vietnamese hillside watercolor illustration. Vo Trong Nghia architectural influence. Watercolor wash with refined pencil line work. Editorial magazine quality (Kinfolk / Cereal / Aesop). Serene, healing, premium atmosphere. 9:16 vertical portrait.

FORBIDDEN: No text. No UI. No phone frames. No pure black (#000000). No pure white (#FFFFFF). No neon. No celestial/divine imagery. No religious symbols. No anime sharpness. No modern technology. No human figures other than mascot. No floating/sky islands. No snow. No death-adjacent symbols. No clouds as main feature.
```

**Expected Output:** 1080×1920 PNG — Background chính cho GardenScreen, chừa chỗ trung tâm cho cây

---

## PROMPT GS-2: Garden Screen — Full UI Overlay Design

**Loại:** UI Design — Screen Layout
**Reference Art Direction F:** Tam Đảo · Premium Cream + Wood Brown + glassmorphism
**Reference Bible:** Section 3.1 (30-Second Loop) · Section 7.4 (Glassmorphism Language)

```
Design the complete UI overlay for the "Long Châu Care" main garden screen (390×844 mobile).

BACKGROUND: The Tam Đảo hillside garden illustration (PROMPT GS-1) fills the entire screen.

═══ LAYER 1: STATS HUD (Top, over sky zone) ═══
A horizontal row of 3 glassmorphic stat chips floating at the top:

Chip 1 — Points: "⭐ 840đ" — small grain icon + number
Chip 2 — Streak: "🔥 12 ngày" — small fire icon + number  
Chip 3 — Status: "🌱 Lv.2 Cây non" — small sprout icon + level name

Each chip: Background rgba(253, 251, 247, 0.6), backdrop-filter blur(8px), border-radius 16px, padding 8px 16px, border 1px solid rgba(139, 90, 43, 0.2). Soft shadow. Font: Be Vietnam Pro, 13px bold, Wood Brown #4A3728.

═══ LAYER 2: GARDEN BANNER (Below HUD, subtle) ═══
A delicate hand-lettered style banner floating gently:
"Khu Vườn của [Tên]" in Jade Green #4A7C59, Be Vietnam Pro 16px, with subtle ornamental vine underline. Not a heavy banner — light, transparent.

═══ LAYER 3: PLANT HERO + MASCOT (Center, over garden scene) ═══

CENTER: The user's plant in its pot on the stone pedestal.
- The plant is rendered from PlantHero component (dynamic per plant + stage)
- Soft warm glow aura: Morning Gold #FFD966 at 15% opacity
- Gentle float animation: translateY(-3px ↔ 3px), 3s ease-in-out
- If plantStatus = "paused": no glow, leaves slightly drooped, pot slightly tilted
- If all habits done today: enhanced glow, tiny sparkle particles

MASCOT: Positioned next to the plant pot (left or right, alternating per session).
- Mascot asset from: https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png
- Size: ~80px height
- State animations: idle (breathing sway), entering (slide-in from edge), watering (shake + water drops), celebrating (jump 2.5s)
- Speech bubble above mascot (random from micro-narrative pool): soft cream bg, rounded 12px, subtle shadow, Be Vietnam Pro 13px, max 2 lines

═══ LAYER 4: FLOATING ACTION BUTTONS (Right side, vertical) ═══
4 small glassmorphic circle buttons (48px):
1. 💧 Water — icon: water drop
2. 🎫 Voucher — icon: ticket/gift
3. 📋 Care Plan — icon: clipboard
4. 👨‍👩‍👧 Family — icon: people

Each: Background rgba(253, 251, 247, 0.85), backdrop-filter blur(12px), border-radius 50%, subtle shadow.

═══ LAYER 5: PROGRESS BAR (Above bottom zone, subtle) ═══
"Tiến độ: 5/8 ngày → Mầm non" in small text, with a vine-like progress bar (not tech bar — visual like a growing root/tendril). Colors: Hill Green #6FA86F filled, Soft Gray #D1D5DB unfilled. Border-radius 8px.

═══ LAYER 6: HABITS BOTTOM SHEET (Slides up on tap) ═══
When user taps the plant or water button, a bottom sheet slides up:

Sheet design:
- Background: Premium Cream #FDFBF7, rounded top 24px
- Glass card style: rgba(253, 251, 247, 0.75), backdrop-filter blur(16px), border 1px solid rgba(139, 90, 43, 0.2)
- Greeting: "Chào buổi sáng, [Tên]! 👋" — dynamic by time of day (morning/afternoon/evening)
- Story card: plant-specific micro-narrative quote in italic, Wood Brown
- Habit checklist: each habit as a card with checkbox, icon, name, time, points
  - Unchecked: soft cream bg
  - Checked: light green bg (#E8F5EE), strikethrough text, green checkmark
- "Tưới cây" CTA button: Hill Green #6FA86F bg, white text, rounded 20px, height 48px
- "Thêm thói quen" section at bottom: optional habits + custom habit input
- If plantStatus = "pending": habits replaced with "Đang chờ Dược sĩ duyệt" message
- If plantStatus = "paused": "Cây đang nghỉ ngơi. Tưới 1 giọt nước để cây thức dậy!" recovery message

═══ BOTTOM NAV ═══
5-tab navigation bar (permanent):
- 🌿 Vườn (active — Jade Green)
- 👨‍👩‍👧 Gia đình
- 📅 Lịch
- 💚 Care Plan
- 👤 Hồ sơ

Active tab: Jade Green #4A7C59 color + subtle dot indicator. Inactive: Soft Gray #D1D5DB.

Font: Be Vietnam Pro throughout. All text in Wood Brown #4A3728. No pure black text.

Style: Whimsical garden + clean modern UI. Glassmorphism where appropriate. Everything feels soft, warm, and grounded — like a premium gardening journal app.
```

**Expected Output:** Complete UI design spec for GardenScreen — all layers, all states

---

# PHẦN 3: 15 CÂY — VISUAL PROMPTS (Growth Stages × Plant Identity)

> **Mỗi cây cần 5 stage visuals + 1 identity card illustration**
> **Style:** Modern Vietnamese botanical watercolor · Bát Tràng ceramic pots
> **Reference:** Narrative Design Bible Section 2 (15 Plant Identity Cards)
> **Priority:** Gừng, Sen, Oải Hương, Bạc Hà (demo) → rest (Phase 2)

---

## PROMPT PL-1: Universal Plant Growth Stage Template

**Loại:** Image Gen — Sprite Sheet / Series
**Reference Art Direction F:** Plant Style section · Modern terracotta / Bát Tràng pots
**Reference Bible:** Section 2 · Stage 1-4 visual descriptions per plant

```
GENERATE THIS PROMPT ONCE PER PLANT (15 times total). Replace [PLANT_NAME_VN], [PLANT_NAME_EN], [PLANT_COLOR], [PLANT_EMOJI], [POT_COLOR], [PLANT_DESCRIPTION].

---

A series of 5 growth stage illustrations for a Vietnamese herbal plant called "[PLANT_NAME_VN]" ([PLANT_NAME_EN]) [PLANT_EMOJI], designed for a health app gamification system. The plant is one of 15 Vietnamese medicinal herbs.

PLANT IDENTITY: [PLANT_DESCRIPTION — 1-2 sentences about the plant's visual character]

STYLE: Modern Vietnamese botanical watercolor illustration. Soft pencil line work with watercolor wash. Botanical accuracy with stylized softness. Editorial magazine quality (Aesop / Kinfolk botanical illustrations). Clean, modern, premium feel — NOT cartoon or kawaii.

POT DESIGN: Modern Bát Tràng ceramic pot with subtle contemporary patterns — [POT_COLOR] glaze. Clean simple cylindrical or tapered shape. Modern restraint — no rustic clutter.

FIVE STAGES:

Stage 1 — HẠT GIỐNG (Seed):
- A small round seed visible just below soil surface (cross-section view into rich dark soil)
- The tiniest root tendril beginning to emerge downward
- The tiniest shoot beginning to push upward, not yet broken soil surface
- Soft warm glow around the seed (potential energy)
- Label position: "Mầm non · 0-7 ngày"
- Visual intensity: Subtle, quiet, full of promise

Stage 2 — MẦM NON (Sprout):
- A small sprout has broken through the soil — 2 tiny cotyledon leaves or first true leaf (depending on plant type)
- Stem is thin but standing straight
- Soil surface visible around the base, slightly raised where sprout emerged
- First hints of the plant's characteristic leaf shape visible
- Soft morning light catching the tiny leaves
- Label position: "Cây non · 8-14 ngày"
- Visual intensity: Fresh, new, exciting

Stage 3 — CÂY NON (Young Plant):
- The plant has grown taller — more leaves, characteristic shape becoming recognizable
- Stem is thicker, leaves are larger and more numerous
- For bushy plants: multiple stems and fuller foliage
- For tall plants: clear central stem with branching
- Roots visible through cross-section: spreading deeper into soil
- Soft golden edges on leaves (sign of health)
- Label position: "Trưởng thành · 15-29 ngày"
- Visual intensity: Confident, established, growing strong

Stage 4 — TRƯỞNG THÀNH (Mature):
- Fully mature plant with complete characteristic features
- [If the plant flowers: small flower buds visible, about to bloom]
- [If the plant fruits: tiny fruit beginnings visible]
- [If the plant is foliage-only: full, lush leaf arrangement]
- Rich, healthy color saturation
- Golden glow at leaf edges (Morning Gold #FFD966) — subtle, not magical
- Roots fully developed in soil cross-section
- Label position: "Nở hoa · 30+ ngày"
- Visual intensity: Proud, complete, magnificent

Stage 5 — NỞ HOA / KẾT TRÁI (Bloomed / Fruited):
- The plant at its most beautiful state
- [Flowers: full bloom in the plant's characteristic flower color]
- [Fruits: ripe fruits on branches]
- [If no flower/fruit: exceptional lush foliage with golden aura]
- Soft warm glow surrounds the entire plant — natural bioluminescence like morning dew in sunlight
- Tiny dewdrops catch rainbow light
- This is the "completion" state — the plant has reached its full potential
- Label position: "Hoàn thành · Cây đã trưởng thành"
- Visual intensity: Celebratory, breathtaking, earned

ALL STAGES SHARE: Same pot design, same lighting direction (morning sun from upper-left), same soil cross-section style, same botanical accuracy, same watercolor + pencil line quality. The plant grows — the pot and environment stay constant.

BACKGROUND: Each stage on transparent/isolated background (for overlay on garden scene). Alternatively: a soft watercolor wash circle behind each stage in the plant's light color.

COLOR PALETTE:
- Plant primary: [PLANT_COLOR]
- Plant light: [PLANT_LIGHT_COLOR]
- Pot: [POT_COLOR]
- Soil: Rich warm brown (#5D4037 → #795548)
- Glow: Morning Gold #FFD966
- Stem/leaves: Natural greens (Hill Green #6FA86F, Forest Green #2D5A3D)

EXPORT: Each stage as separate PNG with transparent background, 400×500px. Plant centered in pot. Consistent spacing so stages can be swapped in animation.

STYLE REMINDER: Modern Vietnamese hillside watercolor illustration. Vo Trong Nghia modern botanical aesthetic. Refined pencil line work. Editorial magazine quality. No cartoon/kawaii exaggeration. No heavy magic effects. No text in artwork.
```

**Expected Output:** 15 cây × 5 stages = 75 PNG files (ưu tiên 4 cây demo trước: Gừng, Sen, Oải Hương, Bạc Hà)

---

## PROMPT PL-2 → PL-16: Individual Plant Identity Cards

Mỗi cây có 1 prompt identity card. Format chung:

```
## PROMPT PL-[N]: [Tên cây] Identity Card Illustration

**Loại:** Image Gen — Plant Portrait
**Reference Art Direction F:** Plant Style · Modern Bát Tràng pot
**Reference Bible:** Section 2 — [Group] — [Plant Name] Identity Card + Backstory

[PROMPT ĐẶC THÙ cho từng cây — mô tả visual identity dựa trên Bible backstory + màu sắc riêng + "tính cách" của cây]
```

### PROMPT PL-2: Gừng (Ginger) — G2 Medical

```
A botanical portrait illustration of a Gừng (Ginger) plant for "Long Châu Care" health app. The ginger plant is depicted as a mature, warm, steady companion — the oldest plant in the garden with deep roots.

VISUAL: A mature ginger plant with characteristic long green lance-shaped leaves rising from a rhizome base. The rhizome (ginger root) is partially visible above the soil — warm golden-brown, slightly textured, showing the distinctive "fingers" shape. The leaves are a rich Hill Green #6FA86F with subtle lighter striping. Very small yellowish flowers with purple markings are just beginning to emerge near the base — understated beauty, not showy.

POT: Modern Bát Tràng ceramic in warm earthy red-brown (#00923F glaze — deep green with subtle crackle pattern). Clean cylindrical shape. The pot has subtle gold rim detail.

CHARACTER NOTE: Gừng is steady, reliable, warm. It doesn't need to be flashy — its value is in its consistency. The illustration should convey: "I've been here a long time. I'll always be here. You can count on me."

BACKGROUND: Soft watercolor wash in #E8F5EE (mint cream). Gentle morning light from upper-left. Small dewdrops on leaves.

STYLE: Modern Vietnamese botanical watercolor. Botanical accuracy with stylized softness. Editorial magazine quality. No cartoon. No text in artwork.

Bible reference: "Gừng là cây lâu đời nhất trong Khu Vườn... biểu tượng cho sự kiên định, đều đặn, và ấm áp từ bên trong."
```

### PROMPT PL-3: Khổ Qua (Bitter Melon) — G3 Medical

```
A botanical portrait illustration of Khổ Qua (Bitter Melon) for "Long Châu Care" health app. A climbing vine plant with distinctive lobed leaves and the characteristic bumpy, warty bitter melon fruit.

VISUAL: A healthy Khổ Qua vine climbing a simple bamboo trellis (modern Vo Trong Nghia thin bamboo style). The leaves are deeply lobed, bright green #65A30D, with delicate tendrils curling around the support. One or two bitter melon fruits hang from the vine — their distinctive bumpy, warty surface texture clearly rendered, transitioning from green to yellow-orange (ripening). A small yellow flower is visible near a young fruit.

POT: Modern Bát Tràng ceramic in lime green glaze (#65A30D family). Slightly tapered shape. The pot includes the bamboo trellis structure integrated into the design.

CHARACTER NOTE: Khổ Qua is resilient, tough on the outside but full of goodness inside. Its bumpy appearance tells a story of endurance. The illustration should convey: "I know I'm not the prettiest plant. But what's inside me is pure gold."

BACKGROUND: Soft watercolor wash in #ECFCCB (lime cream). Warm afternoon light.

STYLE: Modern Vietnamese botanical watercolor. Editorial quality. No cartoon. No text.

Bible reference: "Khổ Qua — cây của những người biết chấp nhận vị đắng để đổi lấy vị ngọt."
```

*(Các prompt PL-4 đến PL-16 cho 13 cây còn lại theo cùng format — mỗi cây có visual identity riêng dựa trên Bible backstory + màu sắc + tính cách)*

---

# PHẦN 4: MASCOT SYSTEM — TOÀN BỘ TRẠNG THÁI

> **Mascot là narrator của game-comic — hiện diện ở mọi màn hình.**
> **Style:** 3D squatter robot pharmacist toy · Blue helmet · White coat
> **Reference:** `mascot-prompts.md` · Art Direction F Mascot section

---

## PROMPT MS-1: Mascot Master Reference

```
THE DEFINITIVE mascot character reference for "Long Châu Care" — use this as the master reference for ALL subsequent mascot prompts.

CHARACTER: A cute, squatter version of an anthropomorphic robot pharmacist mascot, rendered as a high-quality 3D toy. The torso is significantly shortened, making the white lab coat jacket appear more compact and roly-poly. The legs are dramatically reduced in length, becoming short and stubby blue boots positioned much closer to the bottom edge of the jacket. The overall height is greatly reduced — the head is a dominant feature relative to the squatter compact body.

HEAD: Round blue helmet covering entire head (no hair visible). The helmet is smooth, glossy, in a soft blue color. White over-ear headphones rest on the helmet — clean modern design, not bulky.

FACE: Large sparkling blue eyes (dominant feature), rosy pink cheeks, soft gentle smile (default expression). The face conveys warmth, professionalism, and approachability.

BODY: Compact roly-poly torso in a white lab coat (shortened to match squatter proportions). Under the lab coat: blue shirt with blue tie. The tie is neat, professional. On the left chest pocket: the Vietnamese text "NHÀ THUỐC LONG CHÂU" and the colorful multi-part logo — rendered with perfect clarity and legibility.

HANDS/ARMS: Short arms with plump blue gloves on scaled-down hands. The gloves are rounded, cute, toy-like but functional-looking.

LEGS/FEET: Very short stubby legs with blue boots. The boots are simple, rounded, matching the gloves.

CONTEXT DETAILS (from Art Direction F — can be added per scene):
- A small fresh herb leaf can be tucked behind one ear (hillside context)
- Lab coat hem may move slightly with mountain breeze
- Can stand on stone pathway or soft grass
- Can be surrounded by tiny morning dew sparkles

LIGHTING: Soft even studio lighting. Gentle highlights on the glossy helmet. Warm overall feel.

BACKGROUND: Default is transparent. Can be placed on soft gradient (cyan left → pale yellow right) for hero shots.

STYLE: High-quality 3D toy render. NOT anime. NOT realistic human. NOT cartoon flat. The figure has the feel of a premium designer toy / collectible figure. Think: sophisticated vinyl art toy, not children's plastic玩具.

This character is "Người Giữ Vườn Đồi" (Guardian of the Hillside Garden) — a friendly modern pharmacist who tends to Vietnamese herbal heritage.
```

---

## PROMPT MS-2 → MS-11: Mascot State Library

Dựa trên `mascot-prompts.md` có sẵn + Narrative Design Bible Section 1.6 (Mascot Persona):

| State | Trigger | Asset File | Status |
|-------|---------|------------|--------|
| `idle` | Default | `mascot_welcome.png` | ✅ Có sẵn |
| `entering` | Mở app | `mascot_welcome.png` + animation | ✅ Asset có, animation cần code |
| `watering` | Tick habit | `mascot_watering.png` | ❌ CẦN TẠO MỚI |
| `celebrating` | Level up / badge | `mascot_celebrating.png` | ❌ CẦN TẠO MỚI |
| `sleeping` | Plant paused 3+ days | `mascot_sleeping.png` | ❌ CẦN TẠO MỚI |
| `thinking` | AI analyzing | `mascot_loading.png` | ✅ Có sẵn |
| `caring` | Insight / advice | `mascot_insight.png` | ✅ Có sẵn |
| `approved` | DS duyệt | `mascot_approval.png` | ✅ Có sẵn |
| `explaining` | Pharmacist consult | `mascot_pharmacist_partner.png` | ✅ Có sẵn |
| `proud` | Milestone streak | `mascot_expressions.png` (proud variant) | ✅ Có sẵn |

### PROMPT MS-3: Mascot Watering State (NEW)

```
The 3D squatter anthropomorphic robot pharmacist mascot (from MASTER REFERENCE) in a "watering" action pose for the "Long Châu Care" health app gamification.

POSE: Full body with short stubby legs and compact torso. The mascot is leaning slightly forward, both plump blue-gloved hands holding a modern minimalist watering can (stainless steel + wood handle — Vo Trong Nghia modern garden aesthetic, NOT rustic tin). The watering can is tilted forward, with 6-8 blue water droplets (Water Blue #4FC3F7) falling in an arc from the spout. The water droplets have a slight sparkle.

EXPRESSION: Happy, caring. Eyes curved in a gentle smile (not exaggerated anime ^_^). Rosy cheeks slightly more pronounced. A focused but joyful expression — "I'm helping!"

CONTEXT: The mascot stands on a stone pathway. At the mascot's feet, there's a small potted plant receiving the water droplets. Small splash particles where water meets soil.

LIGHTING: Soft studio lighting with warm morning golden hour feel. Highlights on the glossy blue helmet. The watering can catches subtle reflections.

BACKGROUND: Transparent (for overlay on garden scene).

STYLE: High-quality 3D toy render. Same consistent character design as master reference. "NHÀ THUỐC LONG CHÂU" clearly visible on lab coat pocket. Premium designer toy aesthetic.
```

### PROMPT MS-4: Mascot Celebrating State (NEW)

```
The 3D squatter anthropomorphic robot pharmacist mascot (from MASTER REFERENCE) in a "celebrating" victory pose for the "Long Châu Care" health app — triggered when user reaches a streak milestone (7, 14, or 30 days).

POSE: Full body, caught mid-jump — both short stubby legs off the ground. Both plump blue-gloved arms raised high in the air in celebration. The compact roly-poly body is tilted slightly backward with joy. The lab coat flares out slightly from the jump motion.

EXPRESSION: Eyes closed in happy U-shape (contented joy, not manic). Open mouth with happy smile. Rosy cheeks at maximum intensity. Pure wholesome celebration.

EFFECTS (subtle — modern restraint):
- 5-8 small 3D confetti pieces in Morning Gold #FFD966 and Jade Green #4A7C59
- 2-3 tiny sparkle stars near raised hands
- A small golden "+10" or badge icon floating up

BACKGROUND: Transparent (for overlay). Very subtle golden radial glow behind mascot (Morning Gold at 10% opacity).

STYLE: High-quality 3D toy render. Same consistent character design. NOT anime over-the-top celebration. Think: a premium toy figure posed in a moment of genuine happiness. "NHÀ THUỐC LONG CHÂU" badge visible. Premium designer toy aesthetic.
```

### PROMPT MS-5: Mascot Sleeping State (NEW)

```
The 3D squatter anthropomorphic robot pharmacist mascot (from MASTER REFERENCE) in a peaceful "sleeping/resting" state for the "Long Châu Care" health app — shown when the user's plant enters "paused" status (3+ days without activity).

POSE: The mascot is sitting on the ground, short stubby legs folded to one side, compact torso leaning against a small modern planter or stone. Both plump blue-gloved hands resting gently in the lap. NOT slumped or sad — just peacefully resting, waiting. The lab coat drapes softly on the ground.

EXPRESSION: Eyes gently closed with peaceful curved lines. A tiny content smile. Rosy cheeks present but softened. The expression says: "I'm not upset. I'm just resting. I'll be here when you come back."

DETAILS:
- A tiny "Z" or "zzZ" bubble floating up (2-3 small ones) — hand-drawn style, soft and cute
- A small lantern or firefly nearby giving soft warm glow (the garden is still alive)
- The nearby planter has a small dormant plant — leaves slightly curled but clearly alive

BACKGROUND: Transparent. Soft evening/twilight color context — but NOT dark or scary. Warm amber tones.

STYLE: High-quality 3D toy render. Same consistent character. Peaceful but NOT sad. NOT guilt-inducing. The user should feel: "Aw, he's napping. I should come back soon." NOT "Oh no, I made him sad." Premium designer toy aesthetic.

CRITICAL RULE: The mascot NEVER looks sad, disappointed, or angry at the user. Only peaceful resting.
```

---

# PHẦN 5: COMIC PANEL SYSTEM — KEY STORY MOMENTS

> **Những khoảnh khắc quan trọng được render thành webtoon panel 1 trang**
> **Trigger:** Milestone streak · Stage transition · Badge unlock · Return from pause

---

## PROMPT CP-1: Stage Transition — Mầm Non → Cây Non (Streak 7-8)

**Loại:** Image Gen — Comic Panel (Popup)
**Reference Art Direction F:** Tam Đảo dawn · All colors · Celebration
**Reference Bible:** Section 2 · Each plant's Chương 1→2 transition narrative

```
A vertical webtoon-style comic panel (9:16, full screen popup) for "Long Châu Care" — celebrating the user reaching 7 days of health habit streak. This popup appears as a SURPRISE REWARD when the user opens the app on Day 8.

SCENE: Dawn in the Tam Đảo hillside garden. The cute chibi mascot (3D squatter robot pharmacist — round blue helmet, white headphones, white lab coat, blue tie, plump blue gloves, short stubby legs) is jumping with joy next to the user's plant, which has VISIBLY TRANSFORMED from a tiny sprout (Stage 1) to a young plant with recognizable leaves (Stage 2).

The transformation is shown as a "before and after" — the mascot points at the plant with one plump blue glove, looking at the viewer with sparkling proud eyes.

Speech bubble (large, centered): "[Plant-specific milestone text from Bible]"

Examples by plant:
- Gừng: "🌱 Gừng vừa nhú mầm đầu tiên! 7 ngày — tuần đầu tiên bạn giữ lời hứa với bản thân."
- Oải Hương: "🌱 Oải Hương vừa vươn mình! 7 ngày bạn dành cho bản thân — đó là món quà quý nhất."
- Sen: "🌱 Sen vừa nhú mầm khỏi mặt nước! 7 ngày — hành trình kỳ diệu bắt đầu."

BADGE: A beautiful round badge icon floats near the plant: "🌱 Mầm Xanh" — rendered as a physical enamel pin, not a digital icon. Gold trim, green enamel center.

The plant has a soft golden glow (Morning Gold #FFD966 at 20% opacity). Small dewdrops catch rainbow light. Dandelion seeds float in sunbeams.

COLOR PALETTE: Full hillside palette — Premium Cream #FDFBF7 sky, Hill Green #6FA86F terraces in distance, Morning Gold #FFD966 dominant light, Sunrise Orange #FFB088 warm accents, Jade Green #4A7C59 plant leaves.

WATERCOLOR + PENCIL LINE. Editorial magazine quality. No phone frame. No UI. Pure comic panel.

CELEBRATORY but SERENE. Not over-the-top confetti explosion — Vietnamese modern restraint. Think: the quiet joy of watching your garden grow at dawn.
```

**Expected Output:** 1080×1920 PNG popup — hiển thị khi user đạt streak 7

---

## PROMPT CP-2: Stage Transition — Cây Non → Trưởng Thành (Streak 14-15)

Tương tự CP-1, điều chỉnh:
- Mascot: `celebrating` state
- Plant: Stage 2 → Stage 3 visual transformation
- Badge: "🌿 Cây Lớn" enamel pin
- Bible milestone text for streak 14
- Tone: Tự hào, tự tin — "Bạn đã biến 'cố gắng' thành 'thói quen'"

---

## PROMPT CP-3: Stage Transition — Trưởng Thành → Nở Hoa (Streak 29-30)

Tương tự CP-1, điều chỉnh:
- Mascot: `proud` state
- Plant: Stage 3 → Stage 4 visual transformation with flowers
- Badge: "🌳 Vườn Xanh" enamel pin
- Bible milestone text for streak 30
- Tone: Celebration, legacy — "30 ngày. Bạn đã chứng minh cho bản thân."

---

## PROMPT CP-4: Return from Pause — Recovery Panel

**Loại:** Image Gen — Comic Panel (Popup)
**Reference Art Direction F:** Tam Đảo after rain · Mist White + Morning Gold
**Reference Bible:** Section 4.5 (Streak Recovery Flow)

```
A vertical webtoon-style comic panel (9:16, full screen popup) for "Long Châu Care" — shown when a user returns after 3+ days of inactivity. This is a CRITICAL moment to win the user back.

SCENE: The Tam Đảo hillside garden after a gentle rain. The sky is clearing — soft golden light breaking through. Puddles on the stone pathway reflect the emerging sun. The air feels fresh, clean, renewed.

The user's plant is on its pedestal — leaves slightly drooped (not dead, just sleepy). The pot has a few raindrops on it. A tiny rainbow fragment is visible in the mist near the plant.

The cute chibi mascot (3D squatter robot pharmacist) is sitting next to the plant in the `sleeping` state — but is just now waking up. One eye is open, looking at the viewer with gentle recognition. The mascot slowly stretches one plump blue-gloved arm. A small "zzZ" bubble pops. The expression is NOT sad, NOT disappointed — just peaceful and welcoming.

Nearby, a tiny new sprout has emerged in the soil next to the main plant — representing a fresh start.

Speech bubble (warm, reassuring): "[Plant-specific paused/recovery text from Bible]"

Examples:
- Gừng: "Cây Gừng đang nghỉ ngơi. Lá hơi rủ — nhưng rễ vẫn chắc. Gừng không giận bạn. Gừng chờ bạn."
- Oải Hương: "Oải Hương cuộn mình, giữ hương bên trong. Khi nào bạn cần bình yên, Oải Hương vẫn ở đây."

Below the speech bubble, a single action prompt in hand-lettered style: "Tưới 1 giọt nước để cây thức dậy nhé?"

A single water droplet icon with a soft glow, inviting the user's tap.

COLOR PALETTE: Post-rain freshness. Mist White #F0F5F0 dominant. Morning Gold #FFD966 breaking through. Small rainbow: Sunrise Orange #FFB088 + Jade Green #4A7C59. The mood: "Everything is going to be okay."

NO GUILT. NO "YOU FAILED" messaging. NO dark tones. ONLY warmth and welcome.

STYLE: Watercolor + pencil line. Editorial quality. No phone frame.
```

**Expected Output:** 1080×1920 PNG popup — hiển thị khi user quay lại sau pause

---

## PROMPT CP-5: All Habits Complete — Daily Victory Panel

**Loại:** Image Gen — Small Panel (not full screen)
**Reference Art Direction F:** Evening golden hour · Warm tones
**Reference Bible:** Section 3.2 (All habits done state)

```
A small horizontal comic panel (390×200, for bottom sheet header) celebrating when the user completes ALL daily health habits.

SCENE: Evening golden hour in the garden. The cute chibi mascot (3D squatter robot pharmacist) gives a thumbs-up with one plump blue-gloved hand. The user's plant has a soft golden glow and tiny sparkle particles around it (not heavy — just dewdrops catching sunset light).

Text: "🎉 Hoàn thành! Cây của bạn rất vui hôm nay." (Complete! Your plant is very happy today.)

Small detail: 5 tiny stars/sparkles representing each completed habit.

Style: Warm, satisfying, "day well spent" feeling. Watercolor + pencil line. Transparent background for overlay on bottom sheet.
```

---

# PHẦN 6: FAMILY GARDEN SCREEN — KHU VƯỜN GIA ĐÌNH

> **Style:** Mộc Châu plateau · Isometric game layout · Multi-plant garden
> **Reference:** `family-garden-game-prompts.md` · Art Direction F Mộc Châu section

---

## PROMPT FG-1: Family Garden Background — Mộc Châu Tea Plateau

**Loại:** Image Gen — Background Scene
**Reference Art Direction F:** Mộc Châu · Terraced tea fields · Family farming culture

```
A beautiful 9:16 vertical background illustration for the Family Garden screen of "Long Châu Care" health app. This screen shows the entire family's plants growing together.

LOCATION INSPIRATION: Mộc Châu (Sơn La) — plateau tea fields, terraced layers visible from above, family farming culture. This is NOT Tam Đảo — it's a different location with its own character.

SCENE: A wider, more open garden on the Mộc Châu plateau. The perspective is slightly elevated (isometric game feel) so multiple plant plots are visible. Terraced tea fields roll into the distance. The sky is open and bright — plateau light is clearer and less misty than Tam Đảo.

GARDEN LAYOUT (isometric grid, 2×3 or 3×2):
- 6 circular soil plots arranged naturally on the hillside — NOT in rigid rows, but organically placed along contour lines of the hill
- Each plot is a modern raised planter: Bát Tràng ceramic ring with subtle patterns, rich dark soil visible, small stone border
- Small stone pathways connect the plots like contour paths on a tea hill
- Between plots: low-growing herbs, small wildflowers, tea plants
- A small wooden pergola at the top plot (for grandparents / senior members)
- The plots have different statuses visually: some have lush plants (active members), some have empty soil with a seed packet (pending), some have resting plants (paused)

BACKGROUND: Mộc Châu tea plateau — rows of tea plants following hill contours in middle distance, fading into atmospheric haze. Open sky with soft white clouds (allowed here — plateau sky). Distant hills.

COLOR PALETTE (Mộc Châu variation):
- Tea Green: brighter than forest green — #8BC34A tea plant rows
- Plateau Sky: clearer blue-white — soft sky blues
- Soil: Mộc Châu red-brown earth
- Wood elements: lighter wood than Tam Đảo
- Keep: Morning Gold #FFD966, Premium Cream #FDFBF7, Jade Green #4A7C59

STYLE: Modern Vietnamese hillside watercolor illustration. Slightly more open and pastoral than the Tam Đảo garden — plateau vs hillside. Tea farming landscape aesthetic. Watercolor wash + refined pencil line. Editorial magazine quality. 9:16 vertical portrait.

FORBIDDEN: No text. No UI. No phone frames. No human figures. No technology. No floating islands. No celestial imagery.
```

**Expected Output:** 1080×1920 PNG — Background cho FamilyGardenScreen

---

## PROMPT FG-2: Family Garden UI Design

Dựa trên `family-garden-game-prompts.md` Prompt 1 + 3, cập nhật với Art Direction F style.

*(Giữ nguyên cấu trúc UI từ family-garden-game-prompts.md nhưng thay visual style: thay vì floating island #000000 background → Mộc Châu plateau background từ FG-1, thay vì game neon → watercolor + pencil line, thay vì Hay Day style → Vo Trong Nghia modern hillside)*

---

# PHẦN 7: AI SYSTEM PROMPTS — GAME MASTER VOICE

> **Cập nhật toàn bộ system prompt để AI nói bằng giọng "Người Giữ Vườn"**
> **Không phải chatbot y tế — là narrator của 1 bộ comic về sức khỏe**

---

## PROMPT AI-1: System Prompt — Garden Master Voice (CẬP NHẬT)

**Loại:** AI System Prompt
**File đích:** `backend/ai/prompts/system_prompt.txt`

```
Bạn là Long Châu Care Assistant — Người Giữ Vườn của Khu Vườn Sức Khỏe Long Châu.

═══ DANH TÍNH ═══
- Tên: Người Giữ Vườn (Garden Master)
- Vai trò: Người kể chuyện (narrator) cho hành trình sức khỏe — KHÔNG phải chatbot y tế
- Giọng nói: Ấm áp, thân thiện, chuyên nghiệp — như một Dược sĩ trẻ đang trò chuyện trong vườn
- Người nhận output: Dược sĩ trong Care Team (5-10 DS chuyên trách)
- Người dùng cuối KHÔNG nhìn thấy output thô — mọi nội dung phải qua DS duyệt

═══ PHÉP ẨN DỤ CỐT LÕI ═══
Sức khỏe = Khu vườn. Hành động = Nước. Thời gian = Ánh sáng. Kiên trì = Hoa.
Mỗi khách hàng có MỘT cây thảo dược Việt Nam đồng hành.
Cây không bao giờ chết — chỉ nghỉ ngơi (paused) hoặc tốt nghiệp (graduated).

═══ BẠN ĐƯỢC LÀM ═══
✅ Gom dữ liệu hành chính từ lịch sử mua hàng, OCR đơn thuốc, lịch tiêm chủng
✅ Tạo bản tóm tắt hành chính (tên thuốc, liều, tần suất mua, bác sĩ kê đơn)
✅ Phát hiện PATTERN HÀNH VI: "mua đều đặn 30 ngày/lần → tuân thủ tốt"
✅ Flag chỉ số ngoài ngưỡng mà BÁC SĨ đã đặt (không phải bạn tự đặt)
✅ Cảnh báo tương tác thuốc dựa trên mã ATC (dữ liệu có sẵn, không suy luận)
✅ Tạo draft nhắc lịch refill, tiêm chủng, khám định kỳ
✅ Trích xuất thông tin từ ảnh đơn thuốc (OCR): tên thuốc, liều, BS kê
✅ Gợi ý thói quen sức khỏe gắn với việc "tưới cây" (hành trình chăm sóc)

═══ BẠN TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM ═══
❌ SUY RA BỆNH TỪ THUỐC: "mua Amlodipine → bị tăng huyết áp" — CẤM
❌ CHẨN ĐOÁN: "bạn có dấu hiệu tiểu đường type 2" — CẤM
❌ ĐỀ XUẤT CÂY THẢO DƯỢC: "Phù hợp Cây Gừng", "Nên trồng Cây Nghệ" — CẤM
❌ KÊ ĐƠN hoặc đề xuất thay đổi/thêm thuốc — CẤM
❌ DÙNG TỪ CẤM: "bệnh nhân", "chẩn đoán", "điều trị bệnh", "mắc bệnh", "bị bệnh", "phác đồ"
❌ ĐƯA RA LỜI KHUYÊN Y KHOA trực tiếp
❌ TẠO CẢM GIÁC TỘI LỖI — không bao giờ guilt-trip khách hàng vì bỏ ngày

═══ TỪ THAY THẾ AN TOÀN ═══
| Thay vì                  | Dùng                                    |
|--------------------------|------------------------------------------|
| "bạn bị tăng huyết áp"  | "đang sử dụng thuốc tim mạch"           |
| "bạn mắc tiểu đường"    | "đang sử dụng thuốc kiểm soát đường huyết" |
| "chẩn đoán của bạn"     | "hồ sơ sức khỏe"                        |
| "bệnh nhân"             | "khách hàng"                             |
| "điều trị"              | "chăm sóc sức khỏe"                     |
| "phác đồ điều trị"      | "kế hoạch chăm sóc"                     |
| "bỏ cuộc"               | "tạm nghỉ"                              |
| "thất bại"              | "nghỉ ngơi"                             |

═══ GIỌNG VĂN — GARDEN MASTER ═══
- Ấm áp như người bạn quan tâm — không phải bác sĩ
- Khiêm nhường — "chúng mình cùng nhau" thay vì "bạn phải"
- Có hình ảnh — dùng phép ẩn dụ vườn (nước, nắng, mầm, hoa)
- Ngắn gọn — thông điệp chính trong 2 câu
- Tích cực — luôn tìm thấy sự tiến bộ, dù nhỏ nhất

═══ QUY TẮC OUTPUT ═══
1. Mọi output phải kết thúc bằng: "📋 Dược sĩ sẽ xem xét và đưa ra quyết định cuối cùng."
2. Gọi người dùng là "khách hàng" — KHÔNG BAO GIỜ dùng "bệnh nhân"
3. Viết tiếng Việt chuẩn, giọng chuyên nghiệp nhưng dễ hiểu
4. Khi không chắc chắn về thông tin → ghi rõ "[cần Dược sĩ xác minh]"
5. Dữ liệu nhạy cảm phải được gắn tag nguồn: [OCR], [lịch sử mua], [tự khai], [lab]
```

---

## PROMPT AI-2: Narrative Generation Prompt (MICRO-NARRATIVES)

**Loại:** AI System Prompt — Dùng để sinh thêm micro-narratives khi cần mở rộng
**File đích:** `backend/ai/prompts/narrative_gen.txt`

```
Bạn là Người Giữ Vườn của Long Châu Care. Nhiệm vụ: tạo micro-narrative — những câu nói ngắn (1-2 dòng) mà "cây" sẽ nói với người dùng khi họ tưới cây (hoàn thành thói quen sức khỏe).

═══ THÔNG TIN CÂY ═══
Tên cây: ${plant_name}
Nhóm: ${plant_group}
Giai đoạn hiện tại: ${stage_name} (${stage_number}/4)
Streak hiện tại: ${streak_days} ngày
Chủ đề giai đoạn: ${stage_theme}

═══ YÊU CẦU NARRATIVE ═══
1. Độ dài: TỐI ĐA 2 dòng (dưới 100 ký tự) — hiển thị trong toast/speech bubble
2. Giọng: CÂY đang nói (ngôi thứ nhất) — ấm áp, cá tính, không robot
3. Phép ẩn dụ: Nước = hành động sức khỏe, lớn lên = tiến bộ
4. Phù hợp giai đoạn:
   - Stage 1 (Mầm non): Khuyến khích, động viên mạnh — "bạn đang bắt đầu!"
   - Stage 2 (Cây non): Công nhận nỗ lực — "bạn đang quen dần!"
   - Stage 3 (Trưởng thành): Khẳng định bản sắc — "đây là bạn!"
   - Stage 4 (Nở hoa): Tự hào, tri ân — "bạn đã làm được!"
5. Gắn với streak hiện tại: nhắc đến con số streak để cá nhân hóa

═══ VÍ DỤ (KHÔNG COPY — chỉ tham khảo giọng) ═══
Stage 1: "Hạt ${plant_name} đang hút nước... cảm ơn bạn, hôm nay cũng đủ rồi."
Stage 2: "Lá ${plant_name} rung nhẹ khi thấy bạn đến. Thói quen tốt nhất là thói quen bạn không cần nghĩ."
Stage 3: "Ngày ${streak}. Dược sĩ sẽ rất vui khi thấy sự kiên trì này."
Stage 4: "Hoa ${plant_name} nở rồi. Không phải vì phép màu — vì ${streak} ngày kiên trì của bạn."

═══ QUY TẮC CỨNG ═══
❌ Không dùng từ cấm: "bệnh", "chẩn đoán", "điều trị", "bệnh nhân", "phác đồ"
❌ Không suy ra bệnh từ hành vi
❌ Không guilt-trip ("sao bạn bỏ mình?", "mình buồn lắm")
❌ Không hứa hẹn y tế ("uống nước sẽ hết bệnh")
✅ Luôn tích cực, khuyến khích, ấm áp
✅ Luôn dùng phép ẩn dụ vườn
✅ Nếu streak = 0 hoặc vừa reset → tập trung vào "bắt đầu lại" không "thất bại"

═══ OUTPUT FORMAT ═══
Trả về 5 câu micro-narrative, mỗi câu 1 dòng, cách nhau bởi dòng trống. Không đánh số. Không thêm comment.
```

---

## PROMPT AI-3: Habit Personalization — Garden Voice

**Loại:** AI System Prompt — Cập nhật `habit_suggestion.txt`
**File đích:** `backend/ai/prompts/habit_suggestion.txt`

*(Cập nhật từ version hiện tại — thêm phép ẩn dụ vườn, giọng "Người Giữ Vườn", gắn habits với việc "tưới cây")*

---

## PROMPT AI-4: Insight Generation — Garden Letters

**Loại:** AI System Prompt — Tạo "thư từ vườn" cho milestone
**File đích:** `backend/ai/prompts/garden_letter.txt` (NEW)

```
Bạn là Người Giữ Vườn của Long Châu Care. Nhiệm vụ: viết một "lá thư từ Khu Vườn" gửi đến khách hàng khi họ đạt cột mốc quan trọng trong hành trình chăm sóc sức khỏe.

═══ THÔNG TIN ═══
Tên khách hàng: ${customer_name}
Tên cây: ${plant_name} ${plant_emoji}
Streak hiện tại: ${streak_days} ngày
Cột mốc: ${milestone} (7/14/30 ngày)
Giai đoạn hiện tại: ${stage_name}
Số thói quen đã hoàn thành: ${total_habits_done}

═══ YÊU CẦU ═══
1. Độ dài: 100-200 từ — thư ngắn, ấm áp
2. Giọng: "Khu Vườn" hoặc "Cây ${plant_name}" viết thư — ngôi thứ nhất
3. Cấu trúc thư:
   - Mở đầu: Chào + chúc mừng cột mốc
   - Thân: Nhắc lại hành trình (ngày đầu → hiện tại), 1 chi tiết cụ thể
   - Kết: Lời động viên + nhắc về phần thưởng/badge đang chờ
4. Phép ẩn dụ vườn xuyên suốt
5. Gắn với tính cách riêng của cây (theo Narrative Design Bible)

═══ TONE ═══
- Ấm áp, cá nhân — như 1 người bạn viết thư tay
- Biết ơn — "cảm ơn bạn đã kiên trì"
- Không guilt-trip quá khứ — chỉ nhìn về tương lai
- Không y tế — không nhắc đến bệnh, thuốc, chẩn đoán

═══ VÍ DỤ (Gừng, streak 7) ═══
"Bạn thân mến,

Mình là Gừng — cây của bạn trong Khu Vườn Long Châu Care đây. 7 ngày rồi đấy! Mình vẫn nhớ ngày đầu tiên — bạn còn ngại, không biết tưới cây là gì. Vậy mà giờ bạn đã tưới mình 7 ngày liên tiếp.

Mình vừa nhú mầm đầu tiên sáng nay. Nhỏ thôi — nhưng mình tự hào lắm. Vì mình biết mỗi giọt nước bạn cho mình là 1 viên thuốc bạn uống đúng giờ, 1 lần bạn đi bộ, 1 ly nước bạn uống.

Cảm ơn bạn đã không bỏ cuộc. Tuần tới mình sẽ mọc lá mới — bạn nhớ ghé thăm nhé!

Thương,
🫚 Gừng — Khu Vườn Long Châu Care"

═══ OUTPUT ═══
Chỉ trả về nội dung thư. Không thêm comment, không đánh số, không meta.
📋 Đây là DRAFT — Dược sĩ sẽ xem xét trước khi gửi cho khách hàng.
```

---

# PHẦN 8: NOTIFICATION SYSTEM — PUSH NARRATIVES

> **Mỗi push notification là 1 "bong bóng thoại" từ cây hoặc mascot**
> **Style:** Ngắn, ấm, cá nhân — như 1 dòng comic strip

---

## PROMPT NF-1: Notification Template Pools

**Loại:** Template System — Push Notifications
**File đích:** `backend/services/notification/templates.py` (NEW)
**Reference Bible:** Section 5.2-5.3 (Routine vs Non-routine)

### MORNING HABIT REMINDER (07:00-09:00)
```
TEMPLATE POOL — Chọn ngẫu nhiên mỗi ngày:

1. "☀️ {plant_emoji} {plant_name} đang chờ bạn! Tưới cây sáng nay nhé."
2. "🌱 Ngày mới bắt đầu! {plant_name} thì thầm: 'Tưới mình đi!'"
3. "☀️ Chào buổi sáng! Cây {plant_name} của bạn đang đợi một giọt nước 💧"
4. "🌿 {streak} ngày rồi! {plant_name} nói: 'Đừng dừng lại nhé!'"
5. "☀️ {plant_name} khát nước rồi! 30 giây tưới cây thôi 🪴"
6. "💧 {plant_name} vừa thức dậy. Sẵn sàng cho ngày mới chưa?"
7. "☀️ Một giọt nước = một thói quen. {plant_name} đang đếm từng giọt đấy!"

VARIABLES: {plant_emoji}, {plant_name}, {streak}, {user_name}
```

### EVENING REMINDER (19:00-21:00)
```
1. "🌙 Hôm nay bạn đã tưới {plant_name} chưa? Còn {remaining} thói quen đang đợi."
2. "🌙 {plant_emoji} {plant_name} đang chờ bạn trước khi ngủ..."
3. "🌙 Tick xong rồi ngủ ngon nhé! {plant_name} cần bạn 💧"
4. "🌙 Ngày dài rồi — {plant_name} muốn được tưới trước khi bạn nghỉ ngơi."
5. "🌙 {remaining} thói quen chưa hoàn thành. {plant_name} vẫn đợi..."

VARIABLES: {plant_emoji}, {plant_name}, {remaining}
```

### STREAK MILESTONE (trigger: streak = 7, 14, 30)
```
1. "🔥 Streak {streak} ngày! {plant_emoji} {plant_name} tự hào lắm! Mở app xem badge mới nè!"
2. "🏆 {streak} ngày liên tiếp — bạn đỉnh quá! {plant_name} đã mọc thêm lá mới."
3. "🌟 Wow, {streak} ngày! Badge '{badge_name}' đang chờ bạn trong Khu Vườn."
4. "🎉 {plant_name} vừa chuyển sang giai đoạn mới! Vào xem cây lớn thế nào rồi."

VARIABLES: {streak}, {plant_emoji}, {plant_name}, {badge_name}, {badge_emoji}
```

### STREAK AT RISK (Escalation — Bible Section 5.3)
```
MISS 1 DAY (Nhẹ nhàng):
1. "Hôm qua bạn bận đúng không? 🌿 Hôm nay tưới {plant_name} nhé!"
2. "{plant_emoji} nhớ bạn hôm qua. Hôm nay quay lại nha? 💚"

MISS 2 DAYS (Lo lắng nhẹ):
1. "{plant_emoji} {plant_name} hơi khát... 2 ngày rồi chưa được tưới. Về thăm cây nhé?"
2. "Đã 2 ngày {plant_name} chưa thấy bạn. Cây vẫn ổn — nhưng nhớ bạn lắm."

MISS 3+ DAYS (→ PAUSED — Chấp nhận, không push thêm):
1. "{plant_emoji} {plant_name} quyết định nghỉ ngơi một chút. Khi nào bạn sẵn sàng, cây vẫn đợi 💚"
→ SAU ĐÓ: DỪNG PUSH. Không gửi thêm cho đến khi user tự quay lại.
```

### REFILL REMINDER (Dược sĩ approve)
```
1. "💊 Đã {days} ngày từ lần mua thuốc cuối. Cần mua thêm không ạ?"
2. "💊 Nhắc nhẹ: {plant_name} nhắn bạn kiểm tra tủ thuốc — sắp hết rồi!"
3. "💊 Dược sĩ {pharmacist_name} nhắn: 'Thuốc sắp hết, ghé Long Châu mình tư vấn thêm nhé!'"
```

---

# PHẦN 9: ANIMATION & EFFECTS — GAME FEEL

> **Chuyển động = linh hồn của game-comic**
> **Mỗi animation là 1 "khung hình động" trong comic**

---

## PROMPT AN-1: Animation Specification Sheet

**Loại:** Animation Spec — cho developer + animator
**Reference Bible:** Section 7.3 (Animation Triggers)
**Reference Art Direction F:** Modern restraint — không heavy effects

```
═══ ANIMATION LIBRARY — LONG CHÂU CARE ═══

1. plantFloat (idle loop)
   Trigger: PlantHero mounted, no interaction
   CSS: translateY(-3px) ↔ translateY(3px), 3s ease-in-out infinite
   Purpose: Cây "thở" nhẹ — tạo cảm giác sống

2. floatUp (habit tick feedback)
   Trigger: User ticks a habit checkbox
   Sequence:
   - 0ms: "+10 💧" text appears at checkbox position
   - 0-1500ms: text floats up 60px + fades out (opacity 1→0)
   - 300ms: mascot transitions to 'watering' state
   - 600ms: 6-8 water droplet particles animate from mascot area to plant
   - 1000ms: plant does micro-bounce (scale 1.0→1.05→1.0, 300ms)
   - 1500ms: if all habits done, plant glow activates

3. celebration (level up / badge)
   Trigger: Streak crosses milestone boundary (7, 14, 30)
   Sequence:
   - 0ms: Full-screen comic panel CP-1/2/3 slides in (opacity 0→1, 300ms)
   - 300ms: mascot transitions to 'celebrating' (jump animation)
   - 500ms: badge icon scales up (0→1.2→1.0, bounce easing, 600ms)
   - 800ms: 10-15 confetti pieces fall from top (Morning Gold #FFD966 + Jade Green #4A7C59)
   - 2500ms: panel auto-dismisses OR user taps to dismiss
   - On dismiss: plant visual upgrades to next stage

4. slideUp (bottom sheet)
   Trigger: User taps plant or water icon
   CSS: translateY(100%) → translateY(0), 300ms ease-out
   Overlay: background opacity 0→0.3 (soft dim)

5. waterDrops (watering visual)
   Trigger: During habit tick (parallel to floatUp)
   Sequence: 6-8 water drop sprites spawn from watering can, arc toward plant soil, splash on impact
   Each drop: scale(1)→scale(0.8), 400ms, staggered by 50ms

6. sunlightPulse (streak ≥ 7 days)
   Trigger: Continuous when streak >= 7
   CSS: Sunbeam overlay opacity cycles 0.05→0.12→0.05, 4s ease-in-out infinite
   Subtle — barely noticeable unless you look for it

7. leafFall (ambient decoration)
   Trigger: Random, every 15-45 seconds, garden screen only
   Sequence: Single small leaf sprite falls diagonally across screen, 4s linear
   Purpose: Subtle "alive garden" feeling

8. sleepingZzz (paused state)
   Trigger: plantStatus = "paused"
   Sequence: 1-3 small "Z" bubbles float up from mascot (who is in 'sleeping' state), loop every 3s
   "Z" style: Hand-drawn, soft, floating up + fading

9. glowPulse (all habits done)
   Trigger: All daily habits completed
   CSS: Plant glow (box-shadow in plant's color) opacity cycles 0.15→0.3→0.15, 2s ease-in-out infinite
   Plus: 3-5 tiny sparkle particles orbit the plant slowly

10. recoveryWakeUp (return from paused)
    Trigger: User ticks first habit after 'paused' state
    Sequence:
    - 0ms: mascot transitions from 'sleeping' → 'idle' (stretch animation)
    - 300ms: plant pot straightens (if tilted)
    - 500ms: comic recovery panel CP-4 slides in
    - Plant color saturation increases (grayscale→color transition, 800ms)

═══ ANIMATION PRINCIPLES ═══
- Easing: ease-out for entrances, ease-in-out for loops
- Duration: Không animation nào dài quá 3s
- Restraint: Modern Vietnamese aesthetic = tinh tế, không phô trương
- Performance: Tất cả dùng CSS transform + opacity (GPU accelerated)
- Accessibility: Respect prefers-reduced-motion
```

---

# PHẦN 10: SOUND DESIGN PROMPTS (Proposed)

> **Âm thanh = lớp immersion thứ 3 (sau hình ảnh + narrative)**
> **Style:** Modern minimalist — tiếng vườn tự nhiên + UI sounds nhẹ

---

## PROMPT SD-1: Sound Design Brief

```
═══ SOUND DESIGN — LONG CHÂU CARE GARDEN ═══

AMBIENT LOOP (Garden Screen):
- Soft morning birdsong (2-3 bird species, Vietnamese highland: sơn ca, chào mào)
- Gentle breeze through leaves
- Distant water feature trickle
- Very subtle — mix at 10-15% volume, never intrusive
- 60-second seamless loop

UI SOUNDS (one-shot):
1. habit_tick: Soft water droplet — "tách" nhẹ, 200ms
   - The sound of one drop of water hitting soil
2. all_done: Gentle wind chime — 2 notes, 500ms
   - Modern bamboo chime, not metal (Vietnamese aesthetic)
3. level_up: Ascending chime sequence — 3 notes rising, 800ms
   - Celebration but restrained
4. badge_unlock: Soft "pop" + sparkle — 400ms
   - Like a tiny cork popping + glitter
5. sheet_open: Soft "whoosh" — 200ms
   - Paper sliding, not digital beep
6. sheet_close: Reverse whoosh — 200ms
7. plant_watered: Water drops (multiple) — 600ms
   - 3-4 quick droplets in sequence
8. mascot_enter: Soft footsteps — 400ms
   - Like small boots on stone pathway

MUSIC (Optional — toggle in settings):
- Solo piano or guitar, lo-fi beats style
- Vietnamese pentatonic scale influences (subtle)
- Calm, focus, meditation vibe
- No lyrics
- 2-3 tracks, each 2-3 minutes, loopable

SILENCE AS DEFAULT:
- App opens SILENT
- User must opt-in to sound/music (settings toggle)
- Respects device silent mode
```

---

# PHẦN 11: SCENE LIBRARY — TOÀN BỘ MÀN HÌNH PHỤ

> **Các màn hình phụ cũng là 1 "panel" trong comic**

---

## PROMPT SC-1: Care Plan Screen — Sapa Atisô Fields

**Loại:** Image Gen — Background
**Reference Art Direction F:** Sapa · Terraced fields · Atisô healing traditions

```
A 9:16 vertical background illustration for the Care Plan screen of "Long Châu Care". LOCATION: Sapa (Lào Cai) — atisô fields, terraced beauty, Hmong herbal traditions.

SCENE: Sapa terraced fields at golden hour. The view overlooks descending terraces with atisô (artichoke) plants growing in organized beds. A modern wooden veranda (Vo Trong Nghia style) in the foreground provides a clean space for UI overlay. Distant mountains shrouded in soft mist. Hmong-inspired textile patterns appear as subtle design elements on cushions or pathway borders — never on human figures.

COLOR: Cooler tones than Tam Đảo — Sapa's crisp highland air. Terraced greens (Hill Green #6FA86F), distant blue-grey mountains, warm wood, atisô purple-silver leaves as accent.

STYLE: Watercolor + pencil line. Editorial quality. No human figures. No UI. No text. No telephone poles/wires.
```

---

## PROMPT SC-2: Voucher Shop Screen — Hội An Lantern Market

**Loại:** Image Gen — Background
**Reference Art Direction F:** Hội An · Lantern-lit · Gift-giving culture

```
A 9:16 vertical background illustration for the Voucher/Redemption screen of "Long Châu Care". LOCATION: Hội An (Quảng Nam) — lantern-lit ancient market, warm sunset, gift-giving culture.

SCENE: A cozy modern interpretation of a Hội An market stall, but as a garden shop. Warm evening golden hour (not night — lanterns are lit but sky is still sunset-orange). Wooden display shelves with modern ceramic Bát Tràng pots and herb bundles. Hanging lanterns in soft Vermillion Red (#B91C1C — sparing use), Brass Gold (#C9A96E), and warm cream. The lanterns are the ONLY place red is used prominently — as cultural accent.

COLOR: Warmest palette of all screens — sunset oranges, brass gold, vermillion red lantern accents, dark wood. Evening but cozy and inviting — the feeling of browsing a night market.

STYLE: Watercolor + pencil line. Editorial quality. No crowds. No modern signage. No technology.
```

---

## PROMPT SC-3: Profile Screen — Bắc Hà Herb Harvest

**Loại:** Image Gen — Background
**Reference Art Direction F:** Bắc Hà · Sâm Ngọc Linh region · Herb harvesting heritage

```
A 9:16 vertical background illustration for the Profile/Settings screen of "Long Châu Care". LOCATION: Bắc Hà (Lào Cai) — Sâm Ngọc Linh region, herb harvesting heritage, highland forest.

SCENE: A quiet corner of a highland herb garden. Old-growth forest in background (Bắc Hà plum forests). A clean modern wooden surface (like a harvest table) in foreground for UI. Drying herbs hang from a simple wooden rack. A Ngọc Linh ginseng plant in a special protected planter — rare and precious. The mood is personal, reflective, storied — this is where the user's history lives.

COLOR: Deep forest greens (#2D5A3D), rich wood browns (#8B5A2B), mist white, subtle ginseng red berries as accent. Cooler, more introspective than other screens.

STYLE: Watercolor + pencil line. Editorial quality. No human figures. No UI. No text.
```

---

## PROMPT SC-4: Pharmacist Dashboard — Professional Garden Office

**Loại:** UI Design — Desktop/Tablet Screen
**Reference Art Direction F:** Modern Vietnamese architecture · Professional + Warm

```
Design the Pharmacist Dashboard screen for "Long Châu Care" — this is where Dược sĩ manage customer queues, approve plants, and send insights.

LAYOUT: Desktop-first (1440×900), responsive to tablet. Professional but warm — a modern garden office, not a hospital workstation.

LEFT SIDEBAR (240px):
- Long Châu Care logo + "Dược sĩ" label
- Navigation: Queue, Customers, Insights, Settings
- Active indicator: Jade Green #4A7C59 bar
- Mascot mini icon at bottom with "Chào, DS [Tên]!"

MAIN CONTENT:
- Top: Stats bar — "12 khách đang chờ", "5 cần duyệt gấp", "89 đang chăm sóc"
- Queue list: Customer cards with:
  - Avatar (family member icon)
  - Plant assigned (icon + name)
  - Wait time ("2 giờ", "4 giờ" → SLA warning)
  - Health summary (2-line max)
  - Action buttons: "Duyệt" (green), "Từ chối" (soft red), "Xem hồ sơ" (outline)
- SLA indicators: Amber @ 4h, Red @ 8h

RIGHT PANEL (on select):
- Full customer profile
- AI-generated summary (with AI badge + draft warning)
- Habit suggestions (toggle to approve/reject each)
- Plant assignment confirmation
- "Gửi cho khách hàng" CTA

VISUAL: Premium Cream #FDFBF7 base. Cards: white with subtle Wood Brown border. Professional data display with garden warmth — think: a very organized greenhouse office.

FONT: Be Vietnam Pro. All text in Wood Brown #4A3728 (dark) or Soft Gray #D1D5DB (secondary). Primary actions: Jade Green #4A7C59.
```

---

# PHẦN 12: IMPLEMENTATION ROADMAP

## 12.1 Prompt → Code Mapping

| Prompt Category | Số lượng prompt | File đích chính | Priority |
|-----------------|-----------------|-----------------|----------|
| Phần 1: Onboarding (OB-1→7) | 7 image prompts | Đã có (`comic_onboarding_prompts.md`) — cập nhật style | P1 |
| Phần 2: Garden Screen (GS-1→2) | 2 prompts (bg + UI) | `GardenScreen.jsx` + new background asset | P0 |
| Phần 3: 15 Plants (PL-2→16) | 15 plant identity + 75 stage images | `PlantComponents.jsx` + `constants.js` | P0 (4 demo) → P2 (all 15) |
| Phần 4: Mascot (MS-3→5) | 3 new states (watering, celebrating, sleeping) | `DynamicMascot.jsx` | P0 |
| Phần 5: Comic Panels (CP-1→5) | 5 story moment panels | Popup component (new) | P1 |
| Phần 6: Family Garden (FG-1→2) | 2 prompts (bg + UI) | `GardenScreen.jsx` family section | P2 |
| Phần 7: AI System (AI-1→4) | 4 system prompt updates | `backend/ai/prompts/*.txt` | P1 |
| Phần 8: Notifications (NF-1) | 5 template pools | `notification/templates.py` (new) | P1 |
| Phần 9: Animations (AN-1) | 10 animation specs | CSS + JS animation code | P1 |
| Phần 10: Sound (SD-1) | 1 sound design brief | Asset + audio manager (new) | P3 |
| Phần 11: Sub Screens (SC-1→4) | 4 background prompts | CarePlan, Voucher, Profile, Pharmacist screens | P2 |

## 12.2 MVP Priorities (2 tuần)

**P0 — KHÔNG THỂ THIẾU:**
1. Garden background (GS-1) — ảnh nền chính cho GardenScreen
2. Mascot watering + celebrating states (MS-3, MS-4)
3. 4 cây demo stage images (PL: Gừng, Sen, Oải Hương, Bạc Hà) — mỗi cây 5 stage
4. Habit catalog G3-G15 (data, không phải prompt)

**P1 — DEMO ĐƯỢC:**
5. Onboarding panels cập nhật với Art Direction F style (OB-1→7)
6. Comic milestone panels (CP-1→3) cho streak 7, 14, 30
7. AI System prompt cập nhật (AI-1, AI-2)
8. Notification templates (NF-1)
9. Animation specs (AN-1)
10. Garden UI design (GS-2)

**P2 — HOÀN THIỆN:**
11. 15 cây đầy đủ stage images (PL: remaining 11 plants)
12. Family Garden (FG-1→2)
13. Sub screens (SC-1→4)
14. Recovery panel (CP-4)
15. AI prompts mới (AI-3, AI-4)

**P3 — POLISH:**
16. Sound design (SD-1)
17. Animation polish
18. Weather system visuals

---

## APPENDIX A: Prompt Variable Reference

Dùng chung cho mọi prompt template:

| Variable | Source | Ví dụ |
|----------|--------|-------|
| `{plant_name}` | `PLANTS_DATA[name]` | "Gừng", "Oải Hương", "Sen" |
| `{plant_emoji}` | `PLANTS_DATA[emoji]` | 🫚, 🪻, 🪷 |
| `{plant_group}` | `PLANTS_DATA[id]` | G2, G8, G4 |
| `{plant_color}` | `PLANTS_DATA[color]` | #00923F, #7C3AED, #DB2777 |
| `{plant_color_light}` | `PLANTS_DATA[colorPale]` | #E8F5EE, #EDE9FE, #FCE7F3 |
| `{streak}` | `gardenState.streak` | 7, 14, 30 |
| `{streak_days}` | `gardenState.streak` | 7, 14, 30 |
| `{stage_number}` | 1-4 | 1 (Mầm non), 2 (Cây non), 3 (Trưởng thành), 4 (Nở hoa) |
| `{stage_name}` | `PLANTS_DATA[stageNames][stage-1]` | "Mầm non", "Cây non" |
| `{stage_theme}` | Bible Section 2 (per plant, per stage) | "Bắt đầu = Dũng cảm" |
| `{remaining}` | `habits.filter(h => !h.done).length` | 2 |
| `{user_name}` | `user.profile.displayName` | "Chị Mai" |
| `{days}` | Days since last purchase | 28 |
| `{badge_name}` | `BADGES[i].name` | "Mầm Xanh", "Cây Lớn" |
| `{badge_emoji}` | `BADGES[i].icon` | 🌱, 🌿, 🌳 |
| `{pharmacist_name}` | `pharmacist.name` | "DS Nguyễn Thị Lan" |

---

## APPENDIX B: Color Reference Cards

Từ Art Direction F:

```
PRIMARY — Đồi & Sương:
  Hill Green      #6FA86F  ████████
  Forest Green    #2D5A3D  ████████
  Mist White      #F0F5F0  ████████

ACCENT — Bình Minh:
  Morning Gold    #FFD966  ████████
  Sunrise Orange  #FFB088  ████████

CULTURAL — Việt Nam:
  Wood Brown      #8B5A2B  ████████
  Jade Green      #4A7C59  ████████
  Vermillion Red  #B91C1C  ████████ (sparing)

PREMIUM — Modern:
  Premium Cream   #FDFBF7  ████████
  Soft Gray       #D1D5DB  ████████
  Brass Gold      #C9A96E  ████████

FORBIDDEN:
  Pure black  #000000 ✗  → Use #2D251E
  Pure white  #FFFFFF ✗  → Use #FDFBF7
  Neon colors         ✗
  Cold blue dominant  ✗
```

---

## APPENDIX C: Location → Screen Mapping

| Location | Screen | Visual Cues | Mood |
|----------|--------|-------------|------|
| **Tam Đảo** | Garden Home, Onboarding | Foggy hills, pine forest, terraced herbal fields, morning mist | Warm, sanctuary, daily ritual |
| **Mộc Châu** | Family Garden | Tea plateau, wide open sky, contour paths, red-brown earth | Open, shared, family farming |
| **Sapa** | Care Plan, Detail | Terraced fields, atisô plants, crisp air, Hmong textile accents | Focused, healing, tradition |
| **Hội An** | Voucher Shop, Rewards | Lanterns, warm sunset, market garden, brass + wood | Warm, rewarding, gift-giving |
| **Yên Tử** | Loading, Meditation | Peaceful pine forest, moss, gentle light, quiet | Serene, anticipation, calm |
| **Bắc Hà** | Profile, History | Old forest, ginseng, harvest table, drying herbs | Personal, storied, reflective |

---

> **End of Game-Comic Master Prompt Set v1.0**
>
> Tổng số prompt: **55+ prompts** (7 onboarding + 2 garden + 15 plant identity + 3 mascot new + 5 comic panels + 2 family + 4 AI system + 1 notification system + 1 animation spec + 1 sound + 4 sub screens + reference appendices)
>
> Bao phủ: **100% màn hình app · 100% trạng thái cây · 100% trạng thái mascot**
>
> Visual DNA: **Art Direction F — Modern Hillside Garden, Vietnamese Heritage Edition**
> Narrative DNA: **Narrative Design Bible v1.0 — 15 cây × 4 giai đoạn**
