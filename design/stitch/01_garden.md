# Bộ Prompt Gemini — Module Garden (4 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Mascot phải RẤT TO (Hero character). Không dùng mascot như icon nhỏ.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Garden Home (Trang chủ Khu Vườn)

```
Design a modern, soft mobile home screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

TOP BAR:
- Left: "Chào buổi sáng, Chị Mai 👋" bold 19px, #1A1A1A
- Below: "CN, 18/05/2026" 13px, #6B7280
- Right: Streak badge (fire icon + streak count) in a soft pill, bg #FFF9E8, border #FDE68A.

PLANT HERO CARD (bg #FFFFFF, rounded 24px, soft shadow):
- Full-width card with large plant illustration on the left (90px).
- Right side: Plant name bold 18px + emoji icon.
- "Level 1 — Mầm non" in #1250DC, bold 13px.
- Journey label (e.g. "CHĂM SÓC SỨC KHỎE") in uppercase 11px, #6B7280.
- Bottom: italic story quote in 12px, #9CA3AF.

TODAY SECTION:
- "HÔM NAY" header 13px bold, #1A1A1A, with points display on the right (#F59E0B).
- Task list card (bg #FFFFFF, rounded 18px, border #D1D5DB):
  Each row: checkbox (24px, rounded 8px) + task name (14px bold) + time (12px, #6B7280) + "Đánh dấu" button (#1250DC bg, white text).
  Completed tasks: opacity 0.65, strikethrough text, green check + "+10".

WATER CTA:
- Full-width "Tưới cây hôm nay" button, bg #1250DC, white text, height 52px, rounded 16px.
- Water drop icon on the left.

FAMILY GARDEN MINI (bg #FFFFFF, rounded 18px, border #D1D5DB):
- "Vườn gia đình" header with family badge icon.
- Member rows: avatar icon + name + plant name + streak or "Chờ duyệt" status.
- Empty state: "Thêm thành viên để xem vườn gia đình" in #9CA3AF.
```

---

## PROMPT 2 — Water Action (Tưới cây)

```
Design a modern mobile water action screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Dark green gradient background (linear-gradient 160deg, #083D1A to #0D2A16). White text.

TOP BAR:
- Left: back arrow button, bg rgba(255,255,255,0.1), rounded 12px, 40x40.
- Center: "💧 Tưới Cây Gừng" bold 17px, white.
- Right: empty spacer 40px.

PLANT HERO (center, animated):
- Large plant illustration (140px) with plantSway animation.
- Glowing effect when watering animation starts.

CHOOSE PHASE:
- "Hoàn thành habit nào hôm nay?" 15px, #D1D5DB, centered.
- Habit buttons: full width, bg rgba(255,255,255,0.09), border 1.5px rgba(0,200,80,0.35), rounded 16px.
  Each: medicine icon 28px + habit name 15px bold + time 13px.
- "Quay lại" text link, #6B9A78.

ANIMATING PHASE:
- Water drops falling from top (8 drops, staggered delay).
- "Đang tưới cây..." 18px bold, #6D9DF8.
- "💧💧💧 Nước đang thấm vào đất..." 14px, #D1D5DB.

DONE PHASE (animation: fadeSlideUp):
- "✅ Cây đã được tưới!" 24px bold, #6D9DF8.
- "Streak của bạn tiếp tục 🔥" 15px.
- "+10 điểm" floating up animation, #F59E0B, 22px bold.
- "Đang trở về trang chủ..." 13px, #6B9A78.

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## PROMPT 3 — Germination (Hạt nảy mầm — sau khi Dược sĩ duyệt)

```
Design a modern mobile celebration animation screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Dark forest gradient background (linear-gradient 160deg, #0D2A18 to #0A1F10).

ANIMATION SEQUENCE (staggered phases):

PHASE 1 (0-0.5s): Seed shaking animation.
- Seed SVG illustration (100px) centered, shaking left-right.

PHASE 2 (0.5-1.2s): Sprout emerging.
- Plant illustration transitions from seed to sprout.
- "🌱 Hạt giống đang nảy mầm..." 22px bold, white, centered.

PHASE 3 (1.2-2.4s): Plant growing.
- Plant grows to level 2 (130px).
- "🌿 Mầm xanh đang lớn lên!" 22px bold, white.

PHASE 4 (2.4-3.2s): Full bloom + confetti.
- Plant at level 3 with glow effect.
- 24 confetti pieces falling (green, blue, gold, white, mixed shapes).
- "🎉 Cây Gừng đã thức dậy!" 22px bold, white.
- "🫚 Cây Gừng · Hành trình CHĂM SÓC SỨC KHỎE" 15px, #6D9DF8, bold.

PHASE 5 (3.2s+): Care Plan reveal card (bg rgba(255,255,255,0.09), rounded 20px, border rgba(255,255,255,0.15), glassmorphism):
- "👩‍⚕️ DS Nguyễn Thị Lan đã kích hoạt Care Plan" 14px bold, white.
- "📋 Kế hoạch chăm sóc:" 13px, #A0DEB8.
- Medication list with bullet points, 13px, #C8E8D0.
- Pharmacist note box (bg rgba(0,146,63,0.25), rounded 10px): italic note text, #8FD4A8.
- "🔥 Streak giữ nguyên — không reset!" 13px, #F59E0B, bold.

BOTTOM:
- "Vào Vườn — Xem Care Plan 🌿" primary button, bg #1250DC, white text, height 52px, rounded 16px.
- Glow shadow: 0 4px 16px rgba(0,146,63,0.4).
```

---

## PROMPT 4 — Level Up (Lên cấp + Nhận Huy hiệu)

```
Design a modern mobile level-up celebration screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Dark green background #0D2A18.

CONFETTI (continuous, 30 pieces):
- Falling confetti: green, blue, gold, white circles and rectangles.
- Random positions, staggered delays.

PHASE 1 (0.3s): Plant reveal.
- Plant illustration at new level (140px), glow effect, plantGrow animation.
- Background radial gradient in plant's color.

PHASE 2 (1.2s): Level up text.
- "🎉 Level Up!" 28px bold, white, centered, fadeSlideUp animation.
- "14 ngày streak!" 18px bold, #6D9DF8, below.

PHASE 3 (2.0s): Badge card reveal (bg rgba(255,255,255,0.08), rounded 20px, border rgba(255,255,255,0.12), glassmorphism):
- Badge icon centered (56px).
- "Badge: Cây Lớn" 18px bold, white.
- 3 stat pills in a row (bg rgba(0,146,63,0.25), rounded 12px):
  1. "🔥 14 ngày liên tục"
  2. "🏆 Badge mới"
  3. "🎁 +50 điểm"
- Each pill: 13px, #C0E8C8, bold.

BOTTOM:
- "Tiếp tục vun trồng 🌿" primary button, bg #1250DC, height 52px, rounded 16px.
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Buttons, active states, plant level text |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Green BG | #083D1A to #0D2A16 | Water screen gradient |
| Dark Forest BG | #0D2A18 to #0A1F10 | Germination/LevelUp gradient |
| Dark Text | #1A1A1A | Bold titles |
| Mid Gray | #6B7280 | Subtitles, secondary text |
| Light Gray | #9CA3AF | Muted text, placeholders |
| Light Gray Text | #D1D5DB | Dark mode text |
| Gold | #F59E0B | Streak, points, highlights |
| Accent Blue | #6D9DF8 | Dark mode accent text |
| Border | #D1D5DB | Card borders |
| Hairline | #E5E7EB | Subtle dividers |
| Success Green | #00923F | Checkmarks, health indicators |
| Corner Radius | 16-24px | Cards, buttons |
| Button Height | 52px | Primary CTAs |
