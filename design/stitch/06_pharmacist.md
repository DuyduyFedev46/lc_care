# Bộ Prompt Gemini — Module Pharmacist (1 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Pharmacist dashboard — giao diện chuyên nghiệp, rõ ràng, tập trung vào dữ liệu.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Pharmacist Dashboard (Bảng điều khiển Dược sĩ)

```
Design a modern mobile pharmacist dashboard screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Clean white background #F5F8FF. Professional but soft. Data-dense but readable.

HEADER (bg #FFFFFF, border-bottom 1px #D1D5DB):
- "👨‍⚕️ Pharmacist Dashboard" title 18px bold, #1A1A1A, with pharmacist mascot icon (32px).
- "Hàng đợi khách hàng · 3 yêu cầu" subtitle 12px, #6B7280.

─── TWO-PANEL LAYOUT (flex row, overflow hidden) ───

LEFT — QUEUE PANEL (width 130px, bg #FFFFFF, border-right 1px #D1D5DB):

Queue item 1 (SELECTED — bg #E8F5EE, border-left 3px #1250DC):
- "Nguyễn Thị Mai" name 12px bold, #1A1A1A.
- "55t · 10:45" info 10px, #6B7280.
- Priority indicator: "🔴 CAO" 10px, #EF4444, bold (red dot + text).

Queue item 2 (UNREAD):
- "Trần Văn Bình" name 12px bold.
- "62t · 09:30" info 10px.
- Priority: "🟡 VỪA" 10px, #D97706, bold.

Queue item 3 (PENDING-MORE):
- "Lê Thị Hoa" name 12px bold.
- "42t · Hôm qua" info 10px.
- Priority: "🟢 THẤP" 10px, #1250DC, bold.

RIGHT — DETAIL PANEL (flex 1, overflow scroll):

TABS (3 tabs, bg #FFFFFF, border-bottom 1px #D1D5DB):
- "Tổng quan" | "AI tóm tắt" | "Giấy tờ gốc"
- Active tab: #1250DC text, 2px #1250DC bottom border, bold 11px.
- Inactive: #6B7280 text, no border, 11px.

─── TAB 0: TỔNG QUAN ───
Customer info:
- "👩‍🦰 Nguyễn Thị Mai — 55t, Nữ" 13px bold, #1A1A1A, with avatar icon.
- "SĐT: 0912 345 678 · KHTC từ 01/2024" 12px, #6B7280.
- "Gia đình: Chồng (Trần Văn Bình), Con (Bé Su)" 12px, #6B7280.

Pharmacy history:
- "🏪 Lịch sử Long Châu:" header 12px bold, #1A1A1A.
- Bullet list 11px, #6B7280:
  • "Amlodipine 5mg — 6 lần/6T — Đều ✅"
  • "Metformin 500mg — 3 lần/6T — Không đều ⚠️"

─── TAB 1: AI TÓM TẮT ───
Warning banner (bg #FFF9E8, rounded 12px, border #FDE68A):
- "⚠️ AI không suy ra bệnh. Tóm tắt dưới đây là dữ liệu hành chính. DS tự quyết định dựa trên chuyên môn." 11px, #92400E, line-height 1.5.

AI Summary (with mascot insight icon 28px):
- "🤖 AI tóm tắt:" header 12px bold.
- Bullet points 11px, #6B7280, line-height 1.5:
  • "Amlodipine 5mg — 6 lần/6T, đều ~30 ngày/lần, luôn mua tại LC Cầu Giấy"
  • "Metformin 500mg — 3 lần/6T, không đều, khoảng cách 2-3 tháng"
  • "OCR đơn thuốc: Amlodipine 5mg — 1 viên/sáng sau ăn; Metformin 500mg — 1 viên/sáng & tối trong ăn"
  • "OCR xét nghiệm: HbA1c = 6.1% (15/04/2026)"

─── TAB 2: GIẤY TỜ GỐC ───
- "📋 Giấy tờ đã upload (2/5):" header 12px bold.
- Document card 1 (bg #E8F5EE, rounded 10px, padding 10px):
  "✅ Đơn thuốc — Amlodipine 5mg + Metformin 500mg (OCR thành công)"
- Document card 2 (bg #E8F5EE, rounded 10px):
  "✅ Xét nghiệm — HbA1c = 6.1% (15/04/2026)"

─── APPROVAL FORM (bottom, bg #FFFFFF, border-top 1px #D1D5DB) ───

"✏️ QUYẾT ĐỊNH CỦA DƯỢC SĨ" header 12px bold, #1A1A1A.

Plant selector:
- "Chọn cây (1 cây/khách hàng):" label 10px, #6B7280.
- Dropdown select: full width, height 36px, rounded 10px, border #D1D5DB.

Pharmacist note:
- "Ghi chú cho khách hàng:" label 10px, #6B7280.
- Textarea: full width, height 48px, rounded 10px, border #D1D5DB, 12px text, resize none.
- Pre-filled: "Uống đều đặn, không bỏ liều. Đo HA mỗi tuần. Tái khám tháng 6/2026."

Action buttons (flex row, gap 8px):
1. "✅ Duyệt" primary button, bg #1250DC, white text, height 40px, rounded 14px, flex 2.
2. "❌ Từ chối" outline button, transparent, #EF4444 border & text, height 40px, rounded 14px, flex 1.

─── APPROVED STATE (full screen centered) ───

After pharmacist clicks "Duyệt":

- Large approval mascot image (120px) centered, from:
  ![Mascot Approval](https://chauthuc.web.app/assets/mascots_nobg/mascot_approval.png)
- "Đã duyệt cho Nguyễn Thị Mai" 20px bold, #1A1A1A.
- "🫚 Cây Gừng · Hành trình Chăm sóc sức khỏe" 14px, #1250DC, bold.
- "📋 Nguồn: Đơn thuốc bác sĩ · ✅ DS xác minh" 11px, #6B7280.
- "Khách hàng sẽ nhận được thông báo hạt nảy mầm" 13px, #6B7280.

Auto-transitions to Germination screen after 1 second.
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Active tab, selected queue, approve button |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Header, panels, form |
| Dark Text | #1A1A1A | Titles, names, headers |
| Mid Gray | #6B7280 | Secondary info, labels |
| Red | #EF4444 | High priority, reject button |
| Gold 600 | #D97706 | Medium priority |
| Gold 100 | #FFF9E8 | AI warning banner bg |
| Gold 200 | #FDE68A | AI warning banner border |
| Green 100 | #E8F5EE | Selected queue, document cards |
| Corner Radius | 10-14px | Buttons, inputs, cards |
| Queue Width | 130px | Left panel |
