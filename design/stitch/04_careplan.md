# Bộ Prompt Gemini — Module Care Plan (1 Màn Hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> Base URL: `https://chauthuc.web.app/`

---

## PROMPT 1 — Care Plan (Kế hoạch chăm sóc cá nhân hóa theo nhóm cây)

```
Design a modern mobile care plan screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Soft blue-tinted white background #F5F8FF.

HEADER:
- "💊 Care Plan" title 20px bold, #1A1A1A, with pill medicine icon (24px).
- "🫚 Cây Gừng · Hành trình Quản lý bệnh mãn tính" subtitle 13px, #6B7280, with plant emoji.

PROGRESS RING CARD (bg #FFFFFF, rounded 18px, border #D1D5DB, flex row with gap):

LEFT — SVG Progress Ring (80x80):
- Background circle: stroke #E8F5EE, width 8.
- Progress arc: stroke #1250DC, width 8, dasharray proportional to streak/30.
- Center text: streak number 16px bold #1A1A1A + "/ 30" 10px #6B7280 below.

RIGHT — Stats:
- "28 ngày streak" 18px bold, #1250DC (or #6D9DF8 for gentle mode).
- "2 ngày nữa đến tốt nghiệp 🎓" 13px, #6B7280.
- Badge pills row (bg #E8F5EE, #1250DC, 11px bold, rounded 16px):
  "🌱 Mầm Xanh"  "🌿 Cây Lớn"

CARE PLAN LIST (bg #FFFFFF, rounded 18px, border #D1D5DB):

Header: "📋 Kế hoạch chăm sóc" 13px bold, #1A1A1A.

Item 1 (expandable):
- Row: chart icon (22px) + "Đo huyết áp" 14px bold + "Hàng ngày · Sáng sớm" 12px #6B7280 + expand chevron.
- Expanded (bg #F8FDF9): "💡 Ghi lại chỉ số, báo DS nếu > 140/90" 13px, #3A7A4A, line-height 1.6.

Item 2:
- Row: pill icon + "Thuốc điều trị hàng ngày" + "Theo đơn · Sáng & Tối" + chevron.
- Expanded: "💡 Không bỏ liều dù cảm thấy tốt"

Item 3:
- Row: clipboard icon + "Xét nghiệm định kỳ" + "Theo lịch hẹn · LC Lab" + chevron.
- Expanded: "💡 HbA1c, Lipid máu, chức năng gan thận"

Divider lines between items: 1px #E5E7EB.

ADHERENCE HEATMAP (30-day grid):
- Header: "📈 Tuân thủ 30 ngày" 13px bold, #1A1A1A.
- Grid: 30 small squares (18x18, rounded 5px) in flex wrap.
  - Green #1250DC = watered day
  - Light green #A8D8B8 = partial
  - Gold #F59E0B with border = today
  - Gray #E5E7EB = missed
- Legend below: green dot "Đã tưới" · gold dot "Hôm nay" · gray dot "Bỏ qua" 11px, #6B7280.

PHARMACIST NOTE (bg #E8F5EE, rounded 16px, border #B3CDFA):
- "👩‍⚕️ Ghi chú từ Dược sĩ" header 13px bold, #1A1A1A, with pharmacist icon (20px).
- Note text: "Tuân thủ thuốc đều đặn là quan trọng nhất. Không tự ý ngưng thuốc." 13px, #3A7A4A, line-height 1.7.
- Two info pills below (bg #FFFFFF, border #D1D5DB, rounded 12px):
  1. "📅 Tái khám: Theo lịch hẹn" 12px, #1A1A1A, bold, flex 1.
  2. "🔔 Theo dõi — LC Care" 12px, #D97706, bold, flex 1, border #FDE68A.

GENTLE MODE (G8 — Oải Hương / Sức khỏe tinh thần):
- Progress ring color: #6D9DF8 (softer blue).
- "7 ngày liên tục" instead of "28 ngày streak".
- "Mỗi ngày là một bước nhỏ" subtitle.
- No adherence heatmap (hidden).
- Items: "Thiền hoặc hít thở sâu" / "Nhật ký cảm xúc" / "Giấc ngủ chất lượng".
- No pharmacist note (self-guided).

BOTTOM NAV: Standard 5-tab bottom navigation.
```

---

## GROUP-SPECIFIC CARE PLAN TEMPLATES

### G2 (Gừng — Huyết áp/Tầm soát)
| Item | Detail | Note |
|---|---|---|
| Đo huyết áp | Hàng tuần · Chủ nhật sáng | Ghi lại chỉ số, báo DS nếu > 140/90 |
| Xét nghiệm HbA1c | 3 tháng/lần · LC Lab | Kiểm tra đường huyết dài hạn |
| Tái khám định kỳ | 6 tháng/lần · BS gia đình | Mang theo sổ theo dõi huyết áp |

### G3 (Khổ Qua — Tiểu đường/Mãn tính)
| Item | Detail | Note |
|---|---|---|
| Thuốc điều trị hàng ngày | Theo đơn · Sáng & Tối | Không bỏ liều dù cảm thấy tốt |
| Đo huyết áp | Hàng ngày · Sáng sớm | Ghi lại chỉ số, báo DS nếu > 140/90 |
| Xét nghiệm định kỳ | Theo lịch hẹn · LC Lab | HbA1c, Lipid máu, chức năng gan thận |

### G4 (Sen — Thai sản)
| Item | Detail | Note |
|---|---|---|
| Vitamin thai kỳ | 1 viên · Sáng · Sau ăn | Acid folic + Sắt + DHA — uống đủ 9 tháng |
| Khám thai định kỳ | Theo lịch BS · Mỗi 4 tuần | Siêu âm, xét nghiệm máu, nước tiểu |
| Theo dõi cân nặng | Hàng tuần · Ghi vào sổ | Tăng 10-14kg cả thai kỳ là lý tưởng |

### G7 (Nghệ — Hồi phục)
| Item | Detail | Note |
|---|---|---|
| Thuốc theo đơn | Theo chỉ định · Sau phẫu thuật | Hoàn thành đủ liệu trình kháng sinh |
| Tái khám hậu phẫu | Theo lịch hẹn BS | Kiểm tra vết thương, cắt chỉ nếu cần |
| Theo dõi triệu chứng | Hàng ngày · Ghi nhật ký | Đau, sưng, sốt — báo DS ngay nếu bất thường |

### G8 (Oải Hương — Tinh thần) [GENTLE MODE]
| Item | Detail | Note |
|---|---|---|
| Thiền hoặc hít thở sâu | 5-10 phút · Sáng & Tối | Không áp lực — chỉ cần ngồi yên và thở |
| Nhật ký cảm xúc | 1 dòng mỗi ngày | Viết ra 1 điều bạn biết ơn hôm nay |
| Giấc ngủ chất lượng | 7-8 tiếng · Không màn hình trước ngủ | Thư giãn trước khi ngủ 30 phút |

### G13 (Đỗ Trọng — Xương khớp)
| Item | Detail | Note |
|---|---|---|
| Thuốc & thực phẩm bổ sung | Theo đơn · Canxi + Vitamin D | Uống sau ăn để hấp thu tốt nhất |
| Vận động nhẹ nhàng | 15-20 phút · Mỗi ngày | Đi bộ, yoga, bơi — tránh chạy nhảy mạnh |
| Theo dõi mức độ đau | Hàng ngày · Thang điểm 1-10 | Báo DS nếu đau tăng đột ngột |

### G14 (Diệp Hạ Châu — Tiêu hóa/Gan)
| Item | Detail | Note |
|---|---|---|
| Thuốc bảo vệ gan | Theo chỉ định · Sáng | Uống sau ăn, tránh rượu bia |
| Nhật ký ăn uống | Ghi lại bữa ăn chính | Tránh đồ chiên xào, cay nóng, nhiều dầu mỡ |
| Uống đủ nước | 1.5-2 lít/ngày | Nước ấm tốt hơn nước lạnh cho tiêu hóa |

### Default (Non-medical groups: G1, G5, G6, G9, G10, G11, G12)
| Item | Detail | Note |
|---|---|---|
| Duy trì thói quen tốt | Mỗi ngày | Vận động, ăn uống lành mạnh, ngủ đủ giấc |
| Uống đủ nước | 1.5-2 lít/ngày | Nước lọc là lựa chọn tốt nhất |
| Khám sức khỏe định kỳ | Hàng năm | Phòng bệnh hơn chữa bệnh |

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Progress ring, buttons, active states |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Text | #1A1A1A | Titles, item names |
| Mid Gray | #6B7280 | Subtitles, details |
| Light Gray | #9CA3AF | Placeholder text |
| Gentle Blue | #6D9DF8 | G8 progress ring, soft mode accent |
| Gold | #F59E0B | Today highlight, pending |
| Border | #D1D5DB | Card borders |
| Hairline | #E5E7EB | Dividers |
| Green 100 | #E8F5EE | Pharmacist note bg |
| Green 200 | #B3CDFA | Pharmacist note border |
| Note Green | #3A7A4A | Pharmacist note text |
| Corner Radius | 16-18px | Cards, buttons |
