# Bộ Prompt Gemini — Module Voucher (1 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Voucher Redemption (Thu hoạch Voucher)

```
Design a modern mobile voucher redemption screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

HEADER (bg #FFFFFF, border-bottom 1px #E5E7EB):
- Left: back arrow button.
- Center: "Thu Hoạch Voucher" bold 18px, #1A1A1A.

POINTS BALANCE CARD (gradient 135deg, #1250DC to #0B3299, rounded 20px):
- Left: "ĐIỂM HIỆN CÓ" label 13px, rgba(255,255,255,0.7), bold.
- "⭐ 840" large number 32px, bold, white, with grain icon.
- Right: "🔥 28 ngày streak" + "Level 3" 13px, rgba(255,255,255,0.75).

VOUCHER LIST SECTION:
- "🎁 Voucher có thể đổi" header 13px bold, #1A1A1A, with gift icon.

VOUCHER CARD 1 (bg #FFFFFF, rounded 18px, border #D1D5DB):
- Left: voucher icon (36px).
- Right content:
  - "Long Châu Lab" title 15px bold, #1A1A1A.
  - "Xét nghiệm HbA1c + Lipid máu miễn phí" description 13px, #6B7280, line-height 1.5.
  - Bottom row: "500 điểm" cost 14px, #E67822 bold + "Miễn phí" value badge bg #E8F5EE, #1250DC, rounded 20px.
- "⭐ Thu hoạch ngay" button, full width, bg #1250DC, white text, height 44px, rounded 14px.

VOUCHER CARD 2:
- "Tiêm chủng" — "Giảm 50.000đ gói cúm + phế cầu" — 500 điểm — "-50k" badge.
- Same layout.

VOUCHER CARD 3:
- "TPCN" — "Giảm 30.000đ Omega-3 Fish Oil" — 300 điểm — "-30k" badge.
- Same layout.

DISABLED STATE (insufficient points):
- Button bg #E0EDE5, text #9CA3AF, cursor not-allowed.
- Text: "Cần thêm X điểm".

REDEEMED STATE:
- Card opacity 0.6.
- Button bg #B5C9BC, text "Đã thu hoạch", cursor not-allowed.

CONFIRMATION MODAL (bottom sheet, bg #FFFFFF, rounded 24px top):
- "Xác nhận thu hoạch" title 18px bold, #1A1A1A.
- Voucher detail with icon, description, cost.
- Two buttons: "Huỷ" (outline, flex 1) + "🎁 Thu hoạch" (primary, flex 2).

INFO BOX (bg #FFF9E8, rounded 14px, border #FDE68A):
- "⚠️ Voucher chỉ áp dụng tại cửa hàng Long Châu. Không áp dụng cho thuốc kê đơn." 13px, #856A20, line-height 1.6.

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Buttons, gradient card |
| Dark Blue | #0B3299 | Gradient card end |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Text | #1A1A1A | Titles, names |
| Mid Gray | #6B7280 | Descriptions |
| Orange | #E67822 | Point costs |
| Green 100 | #E8F5EE | Value badges |
| Gold 100 | #FFF9E8 | Info box |
| Gold 200 | #FDE68A | Info box border |
| Gold Text | #856A20 | Info box text |
| Corner Radius | 14-24px | Cards, buttons, modal |
