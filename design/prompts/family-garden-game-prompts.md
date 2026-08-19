# 🎮 Family Garden — Game-Style Redesign Prompts

> **Concept:** Biến màn hình Vườn Gia Đình thành game nông trại (Khu Vườn Trên Mây / Nông Trại Vui Vẻ).
> **Key principles:**
> 1. ĐẤT tách riêng khỏi CÂY (terrain layer vs plant layer)
> 2. Mỗi TV có 1 cây khác nhau, cây thay đổi theo trạng thái (seed → sprout → growing → bloom)
> 3. Mascot đi tưới cây khi có hoạt động
> 4. Transition effects giống game casual simulation
> 5. Phong cách: whimsical, cozy, isometric, storybook charm

---

## EXISTING ASSET MAP (Public URLs from chauthuc.web.app)

### Garden Background
| Asset | Public URL |
|---|---|
| Family Garden Island (main bg) | `https://chauthuc.web.app/assets/processed_root/family_garden_scene.png` |
| Cloud Garden BG | `https://chauthuc.web.app/assets/processed_plants/cloud_garden_bg_1778916379711.png` |

### Mascots (No Background)
| Asset | Public URL |
|---|---|
| Mascot Welcome | `https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png` |
| Mascot Family | `https://chauthuc.web.app/assets/mascots_nobg/mascot_family.png` |
| Mascot Loading | `https://chauthuc.web.app/assets/mascots_nobg/mascot_loading.png` |
| Mascot Insight | `https://chauthuc.web.app/assets/mascots_nobg/mascot_insight.png` |
| Mascot Approval | `https://chauthuc.web.app/assets/mascots_nobg/mascot_approval.png` |
| Mascot Avatar | `https://chauthuc.web.app/assets/mascots_nobg/mascot_avatar.png` |
| Mascot Expressions | `https://chauthuc.web.app/assets/mascots_nobg/mascot_expressions.png` |
| Mascot Pharmacist | `https://chauthuc.web.app/assets/mascots_nobg/mascot_pharmacist_partner.png` |
| Mascot UI Kit | `https://chauthuc.web.app/assets/mascots_nobg/mascot_ui_kit.png` |
| Mascot Icon (small) | `https://chauthuc.web.app/assets/icons/mascot.png` |

### Plants — Individual (processed_root, for overlay on garden)
| Plant | Public URL |
|---|---|
| Gừng (Ginger) | `https://chauthuc.web.app/assets/processed_root/plant_gung.png` |
| Nghệ (Turmeric) | `https://chauthuc.web.app/assets/processed_root/plant_nghe.png` |
| Rau Má (Pennywort) | `https://chauthuc.web.app/assets/processed_root/plant_rauma.png` |
| Sả (Lemongrass) | `https://chauthuc.web.app/assets/processed_root/plant_sa.png` |
| Tía Tô (Perilla) | `https://chauthuc.web.app/assets/processed_root/plant_tiato.png` |
| Sen (Lotus) | `https://chauthuc.web.app/assets/processed_root/plant_sen.png` |
| Trà (Tea) | `https://chauthuc.web.app/assets/processed_root/plant_tra.png` |

### Plants — Growth Stages (icons)
| Plant | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 |
|---|---|---|---|---|---|
| Ginger | `.../icons/ginger_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | `..._5.png` |
| Lemongrass | `.../icons/lemongrass_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | `..._5.png` |
| Lotus | `.../icons/lotus_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | `..._5.png` |
| Perilla | `.../icons/perilla_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | — |
| Turmeric | `.../icons/turmeric_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | `..._5.png` |
| Pennywort | `.../icons/pennywort_growth_stage_1.png` | `..._2.png` | `..._3.png` | `..._4.png` | `..._5.png` |
| Tea | `.../icons/tea_growth_stage_1.png` | `..._2.png` | `..._3.png` | — | — |

### Family Avatars
| Avatar | Public URL |
|---|---|
| Mẹ (Mom) | `https://chauthuc.web.app/assets/icons/avatar_mom.png` |
| Bố (Dad) | `https://chauthuc.web.app/assets/icons/avatar_dad.png` |
| Bé (Child) | `https://chauthuc.web.app/assets/icons/avatar_child.png` |
| Bà (Grandma) | `https://chauthuc.web.app/assets/icons/avatar_grandma.png` |

### UI Icons
| Icon | Public URL |
|---|---|
| Fire Streak | `https://chauthuc.web.app/assets/icons/ui_fire_streak.png` |
| Water Drop | `https://chauthuc.web.app/assets/icons/ui_water_drop.png` |
| Pending Clock | `https://chauthuc.web.app/assets/icons/ui_pending_clock.png` |
| Graduate Cap | `https://chauthuc.web.app/assets/icons/ui_graduate_cap.png` |
| Trophy Cup | `https://chauthuc.web.app/assets/icons/ui_trophy_cup.png` |
| Points Grain | `https://chauthuc.web.app/assets/icons/ui_points_grain.png` |

---

## PROMPT 1 — Family Garden Main Screen (Dùng Asset Có Sẵn)

```
Design a mobile screen (390x844) for "Long Châu Care" — Family Garden tab.
Game-style casual simulation (Hay Day / Khu Vườn Trên Mây).

=== SECTION 1: GARDEN (Top 55%, bg #000000) ===

BACKGROUND: Use the existing floating island illustration as the hero image, centered on black background. The island is a lush green floating landmass with soil cross-section, wooden picket fence with fairy string lights, stone pathway, and 6 circular soil plots.

EXISTING ASSET for island: https://chauthuc.web.app/assets/processed_root/family_garden_scene.png

SCROLL BANNER (Top Center):
- Parchment banner floating above: "VƯỜN GIA ĐÌNH"
- Warm cream with gold trim.

OVERLAY ELEMENTS on top of the island (absolute positioned):

Plot 1 (Front-left): "Mẹ" nameplate
- Plant: Use existing Gừng asset → https://chauthuc.web.app/assets/processed_root/plant_gung.png
- Green glow aura effect around plant.
- Badge: "🔥 28" (fire streak)
- Avatar below: https://chauthuc.web.app/assets/icons/avatar_mom.png (32px circle)

Plot 2 (Front-right): "Bố" nameplate
- EMPTY plot — just dashed circle outline with seed icon.
- Floating amber clock icon: https://chauthuc.web.app/assets/icons/ui_pending_clock.png
- Label: "Chờ duyệt"
- Avatar: https://chauthuc.web.app/assets/icons/avatar_dad.png (dimmed)

Plot 3 (Mid-left): "Bé Su" nameplate
- Plant: Use Tía Tô → https://chauthuc.web.app/assets/processed_root/plant_tiato.png
- Badge: "🔥 12"
- Avatar: https://chauthuc.web.app/assets/icons/avatar_child.png

Plot 4-6: Empty with "+" icon, dashed circle, "Thêm TV" label.

MASCOT (on pathway near Plot 1):
- Use existing mascot: https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png (~80px)
- Add speech bubble overlay: "Tưới nước nào! 💧"
- Sparkle particles around watered plant.

=== SECTION 2: UI PANEL (Bottom 45%) ===

White panel (#FFFFFF), rounded top 24px, soft shadow, overlapping garden slightly.

FAMILY STATS ROW (3 cols):
1. "🌱 3 cây" bold / "Đang trồng" 12px gray
2. "🔥 28 ngày" bold / "Streak cao nhất" 12px gray
3. "⭐ 840 điểm" bold / "Tổng điểm" 12px gray

CARE TEAM INSIGHT CARD (bg #E8F5EE, rounded 16px, border #B3CDFA):
- Left: mascot icon (32px) from https://chauthuc.web.app/assets/icons/mascot.png
- "GỢI Ý TỪ CARE TEAM" + "✅ ĐÃ DUYỆT" green badge.
- "Cả nhà cùng đi khám định kỳ 6 tháng/lần để phòng ngừa."
- Footer: "DS Nguyễn Thị Lan" left, "3/6 TV" right.

CTA: "Mời thêm thành viên" button (#1250DC, white text, rounded 20px).

BOTTOM NAV: 5 tabs — Vườn, Gia đình [active], Lịch, Care Plan, Hồ sơ.

Font: Be Vietnam Pro. Style: whimsical garden + clean modern UI.
```

---

## PROMPT 2 — Mascot Watering Animation Storyboard

```
Design 4 animation frames (each 390x300, horizontal strip) showing the mascot watering a plant:

Frame 1 — IDLE:
- Mascot (https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png) standing next to soil plot.
- Plant (https://chauthuc.web.app/assets/processed_root/plant_gung.png) at current size.
- Tooltip: "Tap để tưới cây Mẹ 💧"

Frame 2 — WATERING:
- Mascot tilting watering can forward.
- 6-8 blue water drop particles (use ui_water_drop icon style).
- Soil darkens slightly.

Frame 3 — GROWTH BURST:
- Plant scales up 1.0 → 1.15.
- Green sparkle particles burst outward.
- "+10 điểm" floating gold text (#F59E0B) rising up.
- Mascot does happy jump.

Frame 4 — CELEBRATION:
- Streak counter: "🔥 29 ngày"
- Progress bar fills.
- Confetti particles.
- Toast: "✅ Đã tưới cây Gừng của Mẹ!"
```

---

## PROMPT 3 — Family Member State Cards

```
Design 4 cards (170x200px each, game-style, arranged 2x2):

Card 1 — ACTIVE (Đang chăm):
- Green glowing border.
- Plant image: https://chauthuc.web.app/assets/icons/ginger_growth_stage_5.png
- Avatar: https://chauthuc.web.app/assets/icons/avatar_mom.png with green dot.
- "🔥 28 ngày streak" / "Lv.3 · Cây Gừng"

Card 2 — PENDING (Chờ duyệt):
- Amber dashed border.
- Empty soil + seed icon.
- Avatar: https://chauthuc.web.app/assets/icons/avatar_dad.png with clock.
- "⏳ Chờ DS duyệt" / "Chưa có cây"

Card 3 — NEEDS WATER (Cần tưới):
- Red pulsing border.
- Plant: https://chauthuc.web.app/assets/icons/perilla_growth_stage_3.png (wilting)
- Avatar: https://chauthuc.web.app/assets/icons/avatar_child.png with badge "1".
- "⚠️ Chưa tưới hôm nay" / "Lv.2 · Cây Tía Tô"

Card 4 — GRADUATED (Tốt nghiệp):
- Purple/gold border + confetti.
- Plant: https://chauthuc.web.app/assets/icons/lotus_growth_stage_5.png
- Avatar: https://chauthuc.web.app/assets/icons/avatar_grandma.png with crown.
- "🎓 Tốt nghiệp!" / "30 ngày · Cây Sen"

Style: Soft rounded cards (18px radius), white bg, subtle shadow, game-UI.
```

---

## COMPONENT ARCHITECTURE (for code refactor)

```
components/
├── garden/
│   ├── GardenTerrain.jsx       ← Layer 1: Island background (family_garden_scene.png)
│   ├── GardenPlotSlot.jsx      ← Layer 2: Ô đất (6 slots, positioned on terrain)
│   ├── GardenPlantSprite.jsx   ← Layer 3: Cây riêng lẻ (dynamic per member + stage)
│   ├── GardenMascot.jsx        ← Layer 4: Mascot overlay (walking, watering)
│   ├── GardenEffects.jsx       ← Layer 5: Sparkles, confetti, water drops
│   ├── GardenBanner.jsx        ← Scroll parchment "VƯỜN GIA ĐÌNH"
│   ├── IsometricGarden.jsx     ← Container: compose all layers
│   └── GardenPlant.jsx         ← (existing, becomes alias → PlantSprite)
```

### Layer Rendering Order
```
z-index: 0  → Sky background (#000000)
z-index: 1  → Cloud particles (floating, parallax)
z-index: 2  → Island terrain (family_garden_scene.png)
z-index: 3  → Soil plot slots (6x GardenPlotSlot)
z-index: 4  → Plants on plots (dynamic per member)
z-index: 5  → Mascot character (walking animation)
z-index: 6  → Effects (sparkles, water drops, confetti)
z-index: 7  → UI badges (streak, names, pending icons)
z-index: 8  → Scroll banner "VƯỜN GIA ĐÌNH"
z-index: 9  → Bottom UI panel (slides up)
```

---

## DESIGN TOKENS

| Token | Value | Usage |
|---|---|---|
| Sky / BG | #000000 | Garden section background |
| Grass Green | #4CAF50 → #66BB6A | Island surface |
| Soil Brown | #5D4037 → #795548 | Plot soil |
| Fairy Lights | #FFD700 glow | String lights on fence |
| Water Blue | #4FC3F7 | Water drops |
| Sparkle Gold | #FFD700 | Achievement sparkles |
| Growth Green | #00E676 | Growth burst particles |
| Active Glow | #00923F @ 20% | Active plant aura |
| Pending Amber | #F59E0B @ 15% | Pending plant glow |
| UI Blue | #1250DC | Buttons, primary actions |
| Panel BG | #FFFFFF | Bottom UI panel |
| Card Insight BG | #E8F5EE | Care team insight card |
