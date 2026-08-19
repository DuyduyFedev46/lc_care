# Bộ Prompt Gemini — Module Family (2 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Mascot phải RẤT TO (Hero character). Không dùng mascot như icon nhỏ.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Family Garden (Vườn Gia Đình)

```
Design a modern mobile family garden screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

HEADER:
- "👨‍👩‍👧 Vườn Gia Đình" title 20px bold, #1A1A1A, with family badge icon (28px).
- "CN, 18/05/2026" subtitle 13px, #6B7280.

FAMILY INSIGHT CARD (bg #FFFFFF, rounded 18px, border 1.5px #B3CDFA, soft shadow):
- Top row: "🤖 GỢI Ý TỪ CARE TEAM" label 13px bold, #1A1A1A, with mascot insight icon (32px).
- Right: "✅ ĐÃ DUYỆT" badge bg #E8F5EE, #1250DC, 11px bold, rounded 20px.
- Body text: "Cả nhà cùng đi khám định kỳ 6 tháng/lần để phòng ngừa bệnh tật. GOM refill thuốc chung các thành viên để tiết kiệm thời gian." 13px, #3A5A45, line-height 1.6.
- Bottom row: "Mời thêm thành viên" button bg #1250DC (or gray if max 6), rounded 20px, height 38px + arrow button.
- Footer: "DS Nguyễn Thị Lan" 12px left + "3/6 thành viên" 12px right, #9CA3AF.

MEMBER GRID (2 columns, gap 12px):
Each member card (bg #FFFFFF, rounded 18px, border #D1D5DB, soft shadow):

Card 1 (Self - "BẠN" badge):
- Top-right: "BẠN" badge bg #1250DC, white text, 9px bold, rounded 10px.
- Plant icon (32px) at top.
- "Mẹ" name 14px bold, #1A1A1A.
- "Bản thân" relation 11px, #6B7280.
- "Cây Gừng" plant name 12px, #3A7A4A, bold.
- "🔥 28" streak + "ngày · Lv.3" level display.

Card 2 (Pending member):
- Sprout icon (32px) at top (no plant yet).
- "Bố" name 14px bold.
- "Chồng" relation 11px.
- "Chưa có cây" 12px, #3A7A4A.
- "⏳ Chờ duyệt" status 12px, #D97706, bold, with pending clock icon.

Card 3 (Child - growing):
- Plant icon for child's plant.
- "Bé Su" name 14px bold.
- "Con" relation 11px.
- "Cây Tía Tô" plant name 12px.
- "🔥 12" streak + "ngày · Lv.2".

EMPTY STATE (when no members):
- Centered text: "Chưa có thành viên gia đình. Thêm thành viên để cùng chăm sóc sức khỏe." 14px, #6B7280, padding 40px.

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## PROMPT 2 — Family Calendar (Lịch Gia Đình)

```
Design a modern mobile family calendar screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

HEADER:
- "📅 Lịch Gia Đình" title 20px bold, #1A1A1A, with calendar icon.
- "Tuần 19–25/05/2026" subtitle 13px, #6B7280.

SMART BATCH SUGGESTION (bg #FFF9E8, rounded 16px, border 1.5px #FDE68A):
- "💡 Gợi ý thông minh" header 13px bold, #92400E, with lightbulb icon.
- Body: "Mẹ refill thuốc huyết áp 20/5 — GOM chung với refill vitamin của Bố 23/5 để tiết kiệm 1 lượt đi." 13px, #78350F, line-height 1.6.
- Two buttons row:
  1. "Dời sang T4" primary, bg #1250DC, white, rounded 20px, height 38px.
  2. "Bỏ qua" ghost, transparent, border #D1D5DB, rounded 20px, height 38px.

ACCEPTED STATE (bg #E8F5EE, rounded 16px, border 1.5px #B3CDFA):
- "✅ Đã dời refill sang T4, 21/5 — LC Cầu Giấy" 13px, #1250DC, bold.

WEEKLY CALENDAR CARD (bg #FFFFFF, rounded 18px, border #D1D5DB):

DAY HEADERS (7-column grid):
- T2 through CN labels 11px, #6B7280.
- Date numbers in circles (32px): Today (T5) highlighted bg #1250DC, white text, bold.

EVENT LIST below calendar:
T3 20/05:
- Event card (bg #00923F18, rounded 10px, border-left 3px #00923F):
  "Mẹ · Refill thuốc huyết áp" 13px bold, #1A1A1A.
  "LC Cầu Giấy · GOM" 11px, #6B7280.

T4 21/05:
- Event card (bg #3B82F618, border-left #3B82F6):
  "Bé Su · Tái khám sau viêm họng" 13px bold.
  "BV Nhi TW" 11px.

T6 23/05:
- Event card (bg #D9770618, border-left #D97706):
  "Bố · Xét nghiệm máu" 13px bold.
  "LC Lab" 11px.

T7 24/05:
- Event card (bg #7C3AED18, border-left #7C3AED):
  "Ông · Đo loãng xương" 13px bold.
  "BV Lão khoa" 11px.

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Buttons, today highlight, accepted state |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Text | #1A1A1A | Titles, names |
| Mid Gray | #6B7280 | Subtitles, secondary |
| Light Gray | #9CA3AF | Footer text |
| Gold 100 | #FFF9E8 | Suggestion card bg |
| Gold 200 | #FDE68A | Suggestion card border |
| Gold 600 | #D97706 | Pending status |
| Green 100 | #E8F5EE | Accepted state bg, value badges |
| Green 200 | #B3CDFA | Insight card border |
| Corner Radius | 16-20px | Cards, buttons |
