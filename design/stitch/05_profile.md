# Bộ Prompt Gemini — Module Profile (1 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Profile (Hồ sơ cá nhân + Thành tích)

```
Design a modern mobile profile screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

AVATAR CARD (bg #FFFFFF, rounded 20px, border #D1D5DB, flex row, gap 16px):
- Left: avatar circle (60x60, rounded 30px), gradient bg #1250DC to #0B3299, with avatar image inside (48px).
- Right content:
  - "Nguyễn Thị Mai" name 18px bold, #1A1A1A.
  - "KHTC từ 01/2024 · Nữ, 55t" subtitle 13px, #6B7280.
  - Two stat pills in a row:
    1. "🔥 28 ngày" bg #E8F5EE, #1250DC, 12px bold, rounded 16px.
    2. "⭐ 840 điểm" bg #FFF9E8, #D97706, 12px bold, rounded 16px.

STATS GRID (3 columns, gap 10px):
Each stat card (bg #FFFFFF, rounded 16px, border #D1D5DB, centered):

Card 1:
- Grain icon (24px).
- "840" large number 18px bold, #1A1A1A.
- "Tổng điểm" label 11px, #6B7280.

Card 2:
- Water drop icon (24px).
- "28" large number 18px bold.
- "Lần tưới" label 11px.

Card 3:
- Tree badge icon (24px).
- "2" large number 18px bold.
- "Cây đã trồng" label 11px.

BADGES SECTION:
- "🏅 Huy Hiệu" header 13px bold, #1A1A1A, with medal icon.

Badge grid (2 columns, gap 10px):

Badge 1 (EARNED — opacity 1):
- Badge icon (32px) left.
- "Mầm Xanh" name 13px bold, #1A1A1A.
- "7 ngày streak" desc 11px, #6B7280.

Badge 2 (EARNED):
- "Cây Lớn" — "14 ngày streak"

Badge 3 (LOCKED — opacity 0.5, border #E8E8E8):
- "Vườn Xanh" — "30 ngày streak"

Badge 4 (LOCKED):
- "Gia đình khỏe" — "Cả nhà streak > 7"

STREAK HEATMAP (12 weeks):
- "🔥 Streak 12 tuần" header 13px bold, #1A1A1A.
- Card (bg #FFFFFF, rounded 18px, border #D1D5DB):
  84 small squares (10x10, rounded 3px) in flex wrap, gap 3px.
  - Green #1250DC = watered day
  - Gray #E5E7EB = missed day
- Caption: "Mỗi ô = 1 ngày tưới cây 🌿" 11px, #6B7280.

MEMORIAL GARDEN (Vườn Lưu Niệm):
- "🎓 Vườn Lưu Niệm" header 13px bold, #1A1A1A, with graduate cap icon.

Graduated plant card (bg #FFFFFF, rounded 16px, border #D1D5DB, flex row, gap 14px):
- Left: plant icon (32px).
- Right:
  - "Cây Sả 🎓" name 14px bold, #1A1A1A (with graduate cap).
  - "Hành trình Phòng ngừa · 30 ngày" 12px, #6B7280.
  - "Tháng 3/2026" date 11px, #9CA3AF.

Empty state (when no graduated plants):
- No memorial garden section shown.

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Avatar gradient, stat pills, heatmap active |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Text | #1A1A1A | Names, titles, large numbers |
| Mid Gray | #6B7280 | Subtitles, labels, descriptions |
| Light Gray | #9CA3AF | Dates, muted text |
| Gold 100 | #FFF9E8 | Points pill bg |
| Gold 600 | #D97706 | Points pill text |
| Green 100 | #E8F5EE | Streak pill bg |
| Border | #D1D5DB | Card borders |
| Hairline | #E5E7EB | Heatmap missed days |
| Corner Radius | 16-20px | Cards, pills |
