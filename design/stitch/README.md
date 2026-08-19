# Bộ Prompt Gemini — LC Care (Toàn bộ màn hình)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền trắng pha xanh nhạt (#F5F8FF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Mascot phải RẤT TO (Hero character). Không dùng mascot như icon nhỏ.
> Base URL: `https://chauthuc.web.app/`

---

## Cấu trúc thư mục

```
prompts/
├── README.md                    ← File này (index)
├── 00_onboarding.md             ← 7 màn hình Onboarding (đã có sẵn)
├── 01_garden.md                 ← 4 màn hình Garden (Home, Water, Germination, Level Up)
├── 02_voucher.md                ← 1 màn hình Voucher
├── 03_family.md                 ← 2 màn hình Family (Family Grid, Calendar)
├── 04_careplan.md               ← 1 màn hình Care Plan (cá nhân hóa theo 7 nhóm Medical)
├── 05_profile.md                ← 1 màn hình Profile (Stats, Badges, Heatmap, Memorial)
└── 06_pharmacist.md             ← 1 màn hình Pharmacist Dashboard (Queue + Detail + Duyệt)
```

---

## Tổng quan các Module

### 00 — Onboarding (7 màn hình)
File gốc: `../prompts_onboarding_screens_v2.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Welcome | Giới tính, năm sinh, chăm sóc cho ai |
| 2 | Health Scan | Tình trạng sức khỏe + bệnh mãn tính + OCR upload |
| 3 | Cycle Tracking | Theo dõi chu kỳ (chỉ nữ) |
| 4 | Life Changes | Thay đổi cuộc sống gần đây |
| 5 | Habits | Mức độ vận động + thói quen muốn cải thiện |
| 6 | Plant Select | Chọn cây từ 14 nhóm (G1-G14) |
| 7 | Seed Planted | Kết quả + AI Summary + Care Team checklist |

### 01 — Garden (4 màn hình)
File: `01_garden.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Garden Home | Plant hero, today tasks, water CTA, family mini |
| 2 | Water Action | Tưới cây animation + habit completion |
| 3 | Germination | Hạt nảy mầm animation sau khi DS duyệt |
| 4 | Level Up | Lên cấp + nhận huy hiệu celebration |

### 02 — Voucher (1 màn hình)
File: `02_voucher.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Voucher | Điểm hiện có, danh sách voucher, thu hoạch |

### 03 — Family (2 màn hình)
File: `03_family.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Family Garden | Grid thành viên, insight card, mời thêm |
| 2 | Calendar | Lịch tuần, batch suggestion, GOM refill |

### 04 — Care Plan (1 màn hình)
File: `04_careplan.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Care Plan | Progress ring, med list, adherence grid, DS note (7 nhóm Medical + Default) |

### 05 — Profile (1 màn hình)
File: `05_profile.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Profile | Avatar, stats, badges, streak heatmap, memorial garden |

### 06 — Pharmacist (1 màn hình)
File: `06_pharmacist.md`

| # | Màn hình | Mô tả |
|---|---|---|
| 1 | Pharmacist Dashboard | Queue panel, detail tabs, approval form |

---

## Tổng số màn hình: 17

- Onboarding: 7
- Garden: 4
- Voucher: 1
- Family: 2
- Care Plan: 1
- Profile: 1
- Pharmacist: 1

---

## DESIGN TOKENS REFERENCE (dùng chung tất cả module)

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Buttons, titles, active states |
| Page BG | #F5F8FF | Main background |
| Card White | #FFFFFF | Cards, surfaces |
| Dark Text | #1A1A1A | Bold titles, names |
| Mid Gray | #6B7280 | Subtitles, descriptions |
| Light Gray | #9CA3AF | Muted text, placeholders |
| Dark Mode Text | #D1D5DB | Dark screen text |
| Gold | #F59E0B | Streak, points, highlights |
| Accent Blue | #6D9DF8 | Dark mode accent |
| Border | #D1D5DB | Card borders |
| Hairline | #E5E7EB | Subtle dividers |
| Green 100 | #E8F5EE | Success/approved backgrounds |
| Green 200 | #B3CDFA | Insight card borders |
| Gold 100 | #FFF9E8 | Warning/info backgrounds |
| Gold 200 | #FDE68A | Warning/info borders |
| Corner Radius | 14-24px | Cards, buttons, modals |
| Button Height | 44-56px | CTAs |

---

## MASCOT ASSETS REFERENCE

| Screen | Mascot | URL |
|---|---|---|
| Welcome | mascot_welcome | `assets/mascots_nobg/mascot_welcome.png` |
| Health Scan | mascot_insight | `assets/mascots_nobg/mascot_insight.png` |
| Life Changes | mascot_family | `assets/mascots_nobg/mascot_family.png` |
| Habits | mascot_approval | `assets/mascots_nobg/mascot_approval.png` |
| Seed Planted | mascot_pharmacist_partner | `assets/mascots_nobg/mascot_pharmacist_partner.png` |
| Pharmacist | mascot_pharmacist_partner | `assets/mascots_nobg/mascot_pharmacist_partner.png` |
| Loading | mascot_loading | `assets/mascots_nobg/mascot_loading.png` |
| Family Insight | mascot_insight | `assets/mascots_nobg/mascot_insight.png` |

---

## PLANT ASSETS REFERENCE (14 Cây)

| Group | Cây | Asset Path |
|---|---|---|
| G1 | Bạc Hà | (pending) |
| G2 | Gừng | `assets/plants/ginger_5.png` |
| G3 | Khổ Qua | `assets/processed_root/plant_tra.png` |
| G4 | Sen | `assets/plants/lotus_5.png` |
| G5 | Húng Quế | (pending) |
| G6 | Lô Hội | (pending) |
| G7 | Nghệ | `assets/plants/turmeric_5.png` |
| G8 | Oải Hương | (pending) |
| G9 | Nhân Sâm | (pending) |
| G10 | Rau Má | (pending) |
| G11 | Cam Thảo | (pending) |
| G12 | Sả | `assets/plants/lemongrass_5.png` |
| G13 | Đỗ Trọng | (pending) |
| G14 | Diệp Hạ Châu | (pending) |
