# LC_Care — Kế Hoạch Chi Tiết Chung Kết (2 Dev, 7 Sprint)

## Context

Chuẩn bị chung kết cuộc thi Châu Thức 2026. Trọng tâm: từ demo app → thuyết phục business model + retention + social engagement. 2 developers làm song song. Timeline: ~7 ngày.

---

# PHẦN 1: PHÂN TÍCH NGƯỜI DÙNG THEO ĐỘ TUỔI × GIỚI TÍNH × TÌNH TRẠNG SỨC KHỎE

## 1.1 Ma Trận Gán Cây (Plant Assignment Matrix)

| Nhóm | Độ tuổi | Giới tính | Tình trạng | Cây được gán | Journey Code |
|------|---------|-----------|------------|-------------|--------------|
| Nhi khoa | 0–12 | Bất kỳ | Khỏe / ốm | Tía Tô (perilla) | pediatric |
| Thanh thiếu niên | 13–17 | Bất kỳ | Dinh dưỡng/vận động | Húng Quế (basil) | nutrition |
| Người trẻ | 18–35 | Bất kỳ | Vận động, lười | Bạc Hà (mint) | foundation |
| Người trẻ vận động | 18–35 | Bất kỳ | Active, thể thao | Nhân Sâm (ginseng) | active |
| Người trẻ nữ | 18–40 | Nữ | Mang thai | Hoa Sen (lotus) | maternity |
| Trung niên | 35–55 | Bất kỳ | Phục hồi sau bệnh | Nghệ (turmeric) | recovery |
| Trung niên | 35–55 | Bất kỳ | Thần kinh / mất ngủ | Oải Hương (lavender) | neuro |
| Người lớn | 35–60 | Bất kỳ | Tiểu đường | Khổ Qua (bittermelon) | metabolism |
| Người lớn | 35–60 | Bất kỳ | Huyết áp cao | Gừng (ginger) | monitoring |
| Người lớn | 35–60 | Bất kỳ | Cholesterol | Lá Trà (tea) | long_term |
| Người lớn | 35–60 | Bất kỳ | Xương khớp | Đỗ Trọng (eucommia) | joint |
| Người lớn | 35–60 | Bất kỳ | Tiêu hóa/gan | Diệp Hạ Châu (phyllanthus) | digestive |
| Người cao tuổi | 60+ | Bất kỳ | Đa bệnh / yếu | Lô Hội (aloe) | elderly_care |
| Caregiver | Bất kỳ | Bất kỳ | Chăm người thân | Cam Thảo (licorice) | caregiver |
| Phòng ngừa | 35–55 | Bất kỳ | Chưa bệnh, khám định kỳ | Rau Má (pennywort) | screening |
| Phòng ngừa | 25–50 | Bất kỳ | Ít vận động | Sả (lemongrass) | prevention |

**Rule ưu tiên** (`assignPlant()` trong `frontend/src/config/plantAssignment.js`):
```
1. Mang thai → Lotus (overrides everything)
2. Bệnh mãn tính + sub-condition → DISEASE_TO_PLANT mapping
3. Bệnh mãn tính không rõ → Bittermelon (default chronic)
4. Mental health → Lavender
5. Đang phục hồi → Turmeric
6. Theo dõi chỉ số → Ginger
7. Tuổi < 18 → Basil
8. Tuổi ≥ 60 → Aloe
9. Active/thể thao → Ginseng
10. Chăm người thân → Licorice
11. Ít vận động → Pennywort
12. Default → Mint
```

---

## 1.2 Care Plan Per Plant — Thói Quen + Targeted Voucher

### 🫚 Gừng — Huyết Áp / Theo Dõi Chỉ Số
**Người dùng**: Nam/nữ 40+, tiền sử tăng huyết áp, tim mạch
**Habits mặc định**:
- Sáng 8:00 → Đo huyết áp + ghi số vào app
- Sáng 8:30 → Uống thuốc huyết áp
- Tối 20:00 → Uống thuốc (liều 2)
- Tuần → Nhắc tái khám (3 ngày trước)

**Targeted voucher**: Máy đo huyết áp, TPCN Tỏi đen
**Refill trigger**: Thuốc 30 viên/tháng → nhắc trước 7 ngày
**Edge case**: Nếu BP input > 180/110 hoặc < 90/60 → flag DS chuyên trách (KHÔNG tự chẩn đoán)

---

### 🟡 Nghệ — Phục Hồi / Chống Viêm
**Người dùng**: Nam/nữ 35+, sau phẫu thuật, viêm khớp
**Habits**:
- Sáng → Uống curcumin sau ăn
- 3 lần/ngày → Bài tập vật lý trị liệu nhẹ (5-10 phút)
- Tối → Ghi chép mức đau (thang 1-10)

**Targeted voucher**: Viên nghệ Curcumin, gel lạnh/nóng Salonpas

---

### 🥒 Khổ Qua — Tiểu Đường
**Người dùng**: Nam/nữ 40+, tiểu đường type 2
**Habits**:
- 6:30 → Đo đường huyết trước ăn sáng
- Sau ăn 2h (9:00, 13:00, 20:00) → Đo post-prandial
- Uống metformin/insulin theo lịch BS
- Tuần → Cân nặng, vòng bụng

**Targeted voucher**: Que thử đường huyết x50, sữa Glucerna tiểu đường
**Refill**: Que thử x50 ≈ 2 tuần → nhắc đặt lại
**Edge case**: Glucose > 250 hoặc < 70 → flag DS ngay

---

### 🪷 Hoa Sen — Thai Sản
**Người dùng**: Nữ 18–40, đang mang thai
**Habits**:
- Sáng → Uống acid folic/DHA/sắt theo thai kỳ
- Tuần → Ghi cân nặng
- Theo trimester → Nhắc lịch siêu âm, xét nghiệm máu
- 3 lần/tuần → Bài tập nhẹ bà bầu

**Onboarding special**: Hỏi tuần thai hiện tại → tính estimated due date
**Targeted voucher**: DHA bầu, Acid Folic, sắt hữu cơ
**Edge case**: KHÔNG nhắc bài tập nặng nếu thai < 12 tuần hoặc > 36 tuần

---

### 🍃 Tía Tô — Nhi Khoa (Parent-controlled)
**Người dùng**: Bố/mẹ 25–40, trẻ 0–12 tuổi
**Đặc biệt**: Profile con được quản lý bởi bố/mẹ trong Family Garden
**Habits**:
- Thuốc trẻ em theo đơn BS
- Lịch tiêm chủng quốc gia + dịch vụ
- Cân nặng/chiều cao hàng tháng
- Tái khám 3 tháng/lần

**Targeted voucher**: Vitamin D3 cho bé, men vi sinh Biogaia
**Edge case**: Dosage trẻ em theo cân nặng → app CHỈ nhắc, không tính liều

---

### 🌾 Rau Má — Khám Định Kỳ
**Habits**:
- Tháng/lần → Nhắc đặt lịch khám tổng quát
- 6 tháng → Xét nghiệm máu định kỳ
- Hàng năm → X-quang / siêu âm
- Mỗi ngày → Uống đủ 2L nước

**Targeted voucher**: Gói xét nghiệm cơ bản (Long Châu Lab)

---

### 🍵 Lá Trà — Tuân Thủ Dài Hạn
**Người dùng**: Nam/nữ 50+, nhiều bệnh nền, nhiều thuốc
**Habits**:
- MORNING / NOON / EVENING / BEDTIME medication schedule
- Tái khám chuyên khoa mỗi 3 tháng
- Ghi chép tác dụng phụ
- Tuần → Kiểm tra tủ thuốc

**Targeted voucher**: Hộp đựng thuốc 7 ngăn, TPCN hỗ trợ gan thận
**Phức tạp nhất**: Cần DS duyệt do tương tác thuốc

---

# PHẦN 2: FAMILY GARDEN + TƯỚI NƯỚC = PUSH NOTIFICATION (SOCIAL REMINDER)

## 2.1 Business Flow

```
User A (Con) ──invite──→ User B (Bố/mẹ) join Family Garden
                                    ↓
              Mỗi thành viên = 1 cây trong IsometricGarden
                                    ↓
    Nếu habit của B chưa làm → Cây của B = NEEDS_WATER (grayscale, rũ lá)
                                    ↓
    A thấy cây rũ → bấm "💧 Tưới hộ" → Confirmation popup
                                    ↓
    System gửi PUSH NOTIFICATION cho B:
    "[Tên A] đã tưới cây Gừng cho bạn 💧
    Nhớ đo huyết áp và uống thuốc hôm nay nhé!"
                                    ↓
    B click → mở app → làm habit → CÂY NỞ HOA
    A nhận 5 điểm "tưới hộ" + B nhận điểm bình thường
```

## 2.2 Happy Path

1. A vào FamilyScreen → "Mời thành viên" → copy invite link (TTL: 72h)
2. B nhận link → cài app + join family
3. Sáng hôm sau: A thấy IsometricGarden cây B đang grayscale
4. A bấm cây B → bottom sheet "Tưới hộ Bố — Đo huyết áp + Uống thuốc chưa làm"
5. A bấm "Tưới ngay" → push gửi cho B
6. B nhận push → click → làm habit → cả 2 nhận điểm
7. Nếu 7 ngày cả nhà đều làm đủ → Family Streak badge + thông báo

## 2.3 Edge Cases

| Tình huống | Xử lý |
|-----------|-------|
| B đã làm habit trước khi A tưới | "Bố/mẹ đã hoàn thành rồi! 🎉" — không gửi push |
| A tưới nhiều lần/ngày cho cùng 1 người | Giới hạn 1 lần/ngày/thành viên, lần 2 hiện "Đã tưới hôm nay rồi" |
| B tắt push notification | Lưu in-app notification, hiện badge đỏ khi B mở app |
| 2 người cùng tưới cho B cùng lúc | Race condition → chỉ 1 push gửi (first-write-wins theo Firestore transaction) |
| Trẻ em < 10 tuổi trong family | Plant của trẻ do bố/mẹ quản lý, không gửi push cho trẻ |
| Thành viên rời nhóm | Cây biến mất khỏi isometric, điểm giữ nguyên |
| Family > 6 người | Scroll horizontal trong isometric garden |
| User B offline | FCM buffer delivery — gửi khi B online trở lại |

## 2.4 Error Cases

| Lỗi | Handling |
|-----|----------|
| FCM token expired | Re-register khi user mở app (foreground listener) |
| FCM send failure | Retry 3 lần exponential backoff, fallback in-app bell |
| User chưa có FCM token | Lưu `pending_notifications` Firestore, gửi khi token đăng ký |
| Backend timeout | Frontend optimistic "Đã gửi ✓", retry backend async |
| Invite link hết hạn | "Link đã hết hạn, yêu cầu link mới" |
| Circular invite (A mời B, B mời A lại) | Mỗi user 1 family, join mới → tự động rời family cũ |
| FCM rate limit | Batch notifications, tối đa 3 push/ngày/user |

## 2.5 Push Notification Templates

```
WATER_REMINDER
  Title: "💧 [Tên A] đã tưới cây [Gừng] cho bạn"
  Body:  "Nhớ [habit chưa làm] hôm nay nhé!"
  Action: navigate → GardenScreen

HABIT_STREAK
  Title: "🔥 Bạn đang có chuỗi [X] ngày!"
  Body:  "Hoàn thành thói quen hôm nay để giữ streak!"
  Schedule: 30 phút trước deadline habit chưa làm

REFILL_ALERT
  Title: "💊 [Tên thuốc] sắp hết"
  Body:  "Còn ~5 ngày. Đặt trước để không bị gián đoạn nhé!"
  Action: navigate → VoucherScreen

PHARMACIST_APPROVED
  Title: "✅ Dược sĩ đã duyệt kế hoạch sức khỏe"
  Body:  "Cây [Nghệ] đã sẵn sàng. Bắt đầu hành trình từ hôm nay!"
  Action: navigate → GardenScreen

FAMILY_MILESTONE
  Title: "🎉 Gia đình đạt chuỗi 7 ngày cùng nhau!"
  Body:  "Nhận badge gia đình đặc biệt ngay!"
  Action: navigate → FamilyScreen
```

---

# PHẦN 3: VOUCHER CÁ NHÂN HÓA

## 3.1 Plant → Voucher Mapping

```js
// frontend/src/config/constants.js — thêm:
export const PLANT_VOUCHER_MAP = {
  ginger:      [{ id: "v_bp_monitor", label: "Máy đo huyết áp Omron",    discount: "15%", points: 200 },
                { id: "v_garlic",     label: "TPCN Tỏi đen",             discount: "20%", points: 150 }],
  turmeric:    [{ id: "v_curcumin",   label: "Viên nghệ Curcumin 500mg", discount: "15%", points: 150 },
                { id: "v_coldgel",    label: "Gel lạnh Salonpas",        discount: "10%", points: 100 }],
  bittermelon: [{ id: "v_glucometer", label: "Que thử đường huyết x50",  discount: "15%", points: 200 },
                { id: "v_diabmilk",   label: "Sữa Glucerna tiểu đường",  discount: "20%", points: 250 }],
  lotus:       [{ id: "v_dha",        label: "DHA + Omega3 bà bầu",      discount: "20%", points: 200 },
                { id: "v_folicacid",  label: "Acid Folic 400mcg",        discount: "15%", points: 100 }],
  perilla:     [{ id: "v_vitd3",      label: "Vitamin D3 K2 cho bé",     discount: "20%", points: 150 },
                { id: "v_probiotic",  label: "Men vi sinh Biogaia",       discount: "15%", points: 180 }],
  pennywort:   [{ id: "v_labtest",    label: "Gói xét nghiệm cơ bản",    discount: "10%", points: 300 },
                { id: "v_multivit",   label: "Vitamin tổng hợp Centrum",  discount: "15%", points: 150 }],
  tea:         [{ id: "v_pillbox",    label: "Hộp đựng thuốc 7 ngăn",    discount: "10%", points: 100 },
                { id: "v_livsupp",    label: "TPCN hỗ trợ gan Legalon",  discount: "20%", points: 200 }],
  lavender:    [{ id: "v_melatonin",  label: "Melatonin 3mg hỗ trợ ngủ", discount: "15%", points: 150 }],
  lemongrass:  [{ id: "v_vitc",       label: "Vitamin C + Zinc tăng đề kháng", discount: "15%", points: 120 }],
  aloe:        [{ id: "v_multivit",   label: "Vitamin tổng hợp Senior",  discount: "20%", points: 150 }],
};
```

## 3.2 UI Section "Dành Riêng Cho Bạn"

Vị trí: đầu VoucherScreen, trước filter tabs. Sử dụng `state.assignedPlant.plant` để lookup.

```
┌────────────────────────────────────────────────────┐
│ ✨ Dành riêng cho hành trình [Nghệ - Phục Hồi]   │ ← gold border
│  [icon nghệ]  Viên nghệ Curcumin 500mg            │
│               🏷 Giảm 15% • Đổi 150 điểm         │
│               [Đổi ngay]           [Chi tiết]     │
└────────────────────────────────────────────────────┘
```

**Edge cases**:
- Plant không có trong map → hiện generic voucher sức khỏe
- Đã đổi voucher này → dim + "Đã đổi" badge
- Thiếu điểm → "Cần thêm X điểm" + progress bar

---

# PHẦN 4: TECHNICAL FIXES

## 4.1 Bug Lơ Lửng (Plant/Mascot float on iPhone 14+)

**Root cause**: `bottom: "8%"` scale tuyến tính theo H, nhưng container height (160px) là cố định → trên màn taller, pot không track đúng vị trí ground trong background image.

**Math**: Pot position từ bottom = `(8% × H) + 168px`
- iPhone 13 (H=844): `67 + 168 = 235px = 27.8%` ← ground ở 28% ✓
- iPhone 14+ (H=926): `74 + 168 = 242px = 26.1%` ← lơ lửng 18px ✗

**Fix** (`GardenScreen.jsx`):
```js
// Plant outer container (line ~427):
bottom: "calc(28% - 168px)"   // thay bottom: "8%"

// Mascot container (line ~501):  
bottom: "calc(28% - 98px)"    // thay bottom: "8%"
```

## 4.2 Plant Visibility Fix (Cây Bị Chìm)

```js
// 1. Plant container: tăng zIndex
zIndex: 15     // thay zIndex: 2

// 2. Thêm bloom light (div mới trước plant container):
<div style={{
  position: "absolute", left: "50%",
  bottom: "calc(28% - 40px)", transform: "translateX(-50%)",
  width: 200, height: 80,
  background: "radial-gradient(ellipse at center, rgba(255,240,180,0.5) 0%, transparent 70%)",
  zIndex: 14, pointerEvents: "none",
}} />

// 3. Plant size: 135 → 155
<PlantHero ... size={155} />
```

## 4.3 SVG Plants (Dev2 — Lv1-Lv3 cho 7 cây chính)

**Files mới**: `src/components/plants/svg/{PlantName}SVG.jsx`

**API**:
```jsx
export function GingerLv2({ color = "#00923F", size = 160, glow = false }) {
  return (
    <svg viewBox="0 0 120 160" width={size} height={size*1.33}
      style={{ filter: glow ? `drop-shadow(0 0 16px ${color}88)` : "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>
      {/* botanical SVG paths */}
    </svg>
  );
}
```

**Đặc điểm botanical Lv3 của 7 cây**:
- Gừng: Củ gừng gồ ghề nhô khỏi đất, lá dài nhọn xanh đậm
- Nghệ: Lá to bản xanh đậm, củ nghệ màu vàng cam nhô lên
- Sả: Bụi lá dài mảnh thẳng đứng như cỏ, tươi xanh
- Rau Má: Lá tròn nhiều tai bò lan trên đất
- Hoa Sen: Lá tròn to cuống dài, gợi ý mặt nước xung quanh
- Lá Trà: Cành + lá oval bóng dày xanh đậm
- Tía Tô: Lá 2 mặt khác màu (trên xanh, dưới tím nhạt)

## 4.4 Lottie Mascot (Option A — Nhanh)

```bash
npm install lottie-react
```

Tìm trên lottiefiles.com: "plant spirit" / "forest fairy" / "nature guardian"  
Lưu: `frontend/public/assets/lottie/mascot.json`

```jsx
// DynamicMascot.jsx:
import Lottie from "lottie-react";
import mascotData from "../../assets/lottie/mascot.json"; // nếu có

// Render Lottie nếu file có, fallback về PNG animation
{mascotData ? (
  <Lottie animationData={mascotData} loop={state === "idle"} />
) : (
  <img src={ICONS[`mascot_${state}`]} className={animClass} />
)}
```

---

# PHẦN 5: HEALTH TRACKING (APPLE WATCH + GOOGLE FIT)

## 5.1 Data Flow

```
Apple Watch → iPhone Health App
                    ↓ (Google Fit iOS app → connect Health)
              Google Fit API ← đã có OAuth trong /api/fitness/*
                    ↓
            GoogleFitConnect.jsx (đã build)
            HealthMetrics.jsx (đã build, 4 cards: steps/HR/weight/sleep)
```

## 5.2 HealthTrackingScreen Rebuild

**Sections**:
```
[Header: "Sức Khỏe Của Tôi"]
[Connection Banner: ⌚→🍎→🏃→🌿 flow diagram]
  - Chưa kết nối: guide + "Kết nối Google Fit" CTA
  - Đã kết nối: "● Live" + last sync time
[GoogleFitConnect component]
[HealthMetrics 2×2 grid]
[Wellness Insight Card]
  "Hôm nay bạn đi 8,523 bước — cây Sả được tưới thêm! 🌿"
  → "Xem vườn cây"
[Guide: Kết nối Apple Watch] (accordion)
```

## 5.3 Edge Cases Health

| Tình huống | Xử lý |
|-----------|-------|
| Google Fit empty | Empty state + "Sync ngay" |
| Heart rate ngoài ngưỡng | Flag "Tham khảo bác sĩ" (KHÔNG chẩn đoán) |
| Backend fitness timeout | Dùng cached data, badge "Dữ liệu lưu sẵn" |
| Apple Watch không sync | Guide step-by-step trong app |

---

# PHẦN 6: SPRINT BREAKDOWN (2 DEVELOPERS)

## Dev1 = Backend + Logic | Dev2 = Frontend + Assets

---

### Sprint 1 — Ngày 1: Fix Critical Bugs

**Dev1** — Chuẩn bị FCM infrastructure:
- `backend/services/notification/service.py` → FCM send function
- `backend/services/family/router.py` → `POST /api/family/water/{member_id}`
- Firestore schema: `families/{familyId}/water_log/{date}/{sender}_{target}`

**Dev2** — Fix GardenScreen bugs:
- `bottom: "calc(28% - 168px)"` cho plant + mascot
- zIndex plant container: 2 → 15
- Thêm bloom light div
- PlantHero size: 135 → 155

---

### Sprint 2 — Ngày 1-2: SVG Plants + FCM Token

**Dev1** — FCM Token Registration:
- `frontend/src/services/firebase.js` → `requestNotificationPermission()`, `getFCMToken()`
- `backend/services/notification/router.py` → `POST /api/notification/register-token`
- Save token → `users/{uid}/fcm_token` Firestore

**Dev2** — SVG Plants lv1-lv3:
- Tạo 7 files: `GingerSVG.jsx`, `TurmericSVG.jsx`, `LotusSVG.jsx`, `PerillaSVG.jsx`, `LemongrassSVG.jsx`, `PennywortSVG.jsx`, `TeaSVG.jsx`
- Cập nhật `PlantComponents.jsx` → dùng SVG cho lv1-lv3

---

### Sprint 3 — Ngày 2-3: Family Tưới Hộ UI

**Dev1** — Backend Water + Push:
- Implement `water_for_member()` với duplicate prevention
- `send_water_reminder(sender_name, target_token, plant_name, habit_name)`
- Test FCM delivery

**Dev2** — Frontend Tưới Hộ:
- `FamilyScreen.jsx` → member card + habit status + "💧 Tưới hộ" button
- `IsometricGarden.jsx` → NEEDS_WATER cây hiện nút tưới
- Confirmation bottom sheet + water drop animation
- API call: `POST /api/family/water/{id}`

---

### Sprint 4 — Ngày 3-4: Voucher + Đặt Hộ

**Dev1** — Targeted Voucher API:
- `backend/services/voucher/router.py` → `GET /api/voucher/targeted`
- Logic: query assignedPlant → return 1-2 matching vouchers

**Dev2** — Frontend:
- `VoucherScreen.jsx` → thêm section "Dành riêng cho bạn" (từ `PLANT_VOUCHER_MAP`)
- `OrderForScreen.jsx` → **file mới**: đặt thuốc hộ thành viên
- `App.jsx` → register route `order-for`
- `constants.js` → thêm `PLANT_VOUCHER_MAP`

**OrderForScreen layout**:
```
[Header: "Đặt Thuốc Cho [Tên]"]
[Avatar + địa chỉ giao hàng]
[Danh sách thuốc refill cần đặt]
  ☑ Que thử đường huyết x50     128k
  ☑ Metformin 500mg x30          45k
[Tổng: 173k]
[CTA: "Đặt Ngay" → success modal với mã đơn]
```

---

### Sprint 5 — Ngày 4-5: Health Tracking + Design Tokens

**Dev1** — Fitness backend verify:
- Test `/api/fitness/data` với real credentials
- Đảm bảo Apple Watch data (qua Google Fit iOS) được trả về đúng format

**Dev2**:
- `DesignTokens.js` → thêm `herb800/600/500/400/100`
- `HealthTrackingScreen.jsx` → rebuild layout (xem Phần 5.2)
- Sửa màu sắc inconsistency dùng `G.herb*` thay hardcode

---

### Sprint 6 — Ngày 5-6: Notification Scheduler + Accessibility + Lottie

**Dev1** — Cron Jobs (`backend/scheduler/router.py`):
- 20:00 VN → `daily_habit_reminder`: scan users chưa hoàn thành habit → push
- Daily → `refill_alert`: tính ngày hết thuốc → push trước 7 ngày
- 23:30 → `family_streak_check`: cả nhà xong → FAMILY_MILESTONE push
- Rate limit: max 3 push/ngày/user

**Dev2**:
- `npm install lottie-react` → tìm/import Lottie mascot
- Accessibility: font < 14px → 14px; button < 44px → 44px; opacity text → 0.8+
- `CarePlanScreen.jsx` → audit, sửa contrast text

---

### Sprint 7 — Ngày 6-7: Demo Polish + Integration

**Cả 2 Dev** — Test golden path:
```
□ Login → GardenScreen (no flicker, no white screen)
□ Cây đứng đúng đất (test iPhone 13 + iPhone 14 Plus trên DevTools)
□ Tưới → WaterScreen → back → điểm tăng
□ ❤️ → HealthTrackingScreen → data hiển thị OR guide
□ Voucher tab → targeted voucher đúng plant
□ Family tab → isometric garden hiển thị
□ Bấm "Tưới hộ" → push sent ✓
□ Care Plan tab → habits list đúng
□ Onboarding → plant assignment đúng demographics
□ Pharmacist login → PharmacistScreen
□ OrderForScreen flow → success modal
```

---

# PHẦN 7: BUSINESS SLIDES

## LTV Model + 3 Điểm Phòng Thủ

```
LTV = 400,000 VND × 1 lần/tháng × 30% Margin × 12 tháng = 1,440,000 VND (trần)

Phòng thủ 1 (Churn): LTV thực < 1.44M. Behavioral data → churn prediction →
                      re-engagement trước khi mất user.

Phòng thủ 2 (Retained vs Net-new): 400k này mostly = RETAINED REVENUE.
                      Khóa dòng tiền bệnh nhân vào Long Châu, ngăn chảy sang đối thủ.

Phòng thủ 3 (CAC): LTV/CAC > 3 → CAC < 400k.
                   Family Garden viral loop giảm CAC: 1 user mời 2.3 thành viên gia đình.
```

## Switching Cost Formula

```
Switching Cost = Thói quen (mất streak) 
              + Lịch sử sức khỏe (health data)
              + Mối quan hệ gia đình (family garden)
              + Điểm tích lũy (voucher points)
```

## Retention Loop

```
Habit Done → Cây lớn → Level Up → Voucher → Mua thuốc → Refill Alert
     ↑                                                          ↓
Family Reminder ←←←← Push Notification ←←←←←←←←←←←←←←←←←←←
```

---

# PHẦN 8: FILES CẦN TẠO / SỬA

## Files Mới
```
frontend/src/components/plants/svg/GingerSVG.jsx
frontend/src/components/plants/svg/TurmericSVG.jsx
frontend/src/components/plants/svg/LotusSVG.jsx
frontend/src/components/plants/svg/PerillaSVG.jsx
frontend/src/components/plants/svg/LemongrassSVG.jsx
frontend/src/components/plants/svg/PennywortSVG.jsx
frontend/src/components/plants/svg/TeaSVG.jsx
frontend/src/assets/lottie/mascot.json           (tìm từ LottieFiles)
frontend/src/screens/family/OrderForScreen.jsx
```

## Files Sửa Đổi
```
frontend/src/components/DesignTokens.js          → thêm herb* tokens
frontend/src/components/PlantComponents.jsx       → dùng SVG cho lv1-lv3
frontend/src/components/garden/DynamicMascot.jsx  → Lottie support + fallback
frontend/src/screens/garden/GardenScreen.jsx      → float fix, z-index, bloom, size
frontend/src/screens/health/HealthTrackingScreen.jsx → rebuild layout
frontend/src/screens/voucher/VoucherScreen.jsx    → targeted voucher section
frontend/src/screens/family/FamilyScreen.jsx      → tưới hộ button + animation
frontend/src/components/SharedUI.jsx              → accessibility (font, button sizes)
frontend/src/config/constants.js                  → PLANT_VOUCHER_MAP
frontend/src/App.jsx                              → register "order-for" route
backend/services/family/router.py                 → water endpoint
backend/services/notification/service.py          → FCM functions
backend/services/notification/router.py           → register-token endpoint
backend/scheduler/router.py                       → cron jobs (habit/refill/family)
```

---

# PHẦN 9: WOW & ACHIEVEMENT MAP (GÓC NHÌN PO)

## 9.1 Audit Wow — App đang đỉnh ở đâu, phẳng ở đâu

Khảo sát code thực tế: app có **2 đỉnh wow rất mạnh** rồi **rơi thẳng** xuống 4 luồng chỉ mang tính chức năng → tạo *emotional drop-off* làm rớt retention.

| Luồng | Wow hiện có (file) | Verdict |
|------|--------------------|---------|
| Onboarding | Plant reveal + AI summary + confetti (`SeedPlantedStep.jsx`, `GerminationScreen.jsx`) | ⭐⭐⭐⭐⭐ Đỉnh |
| Daily Loop | "+10💧" floater, mascot animate, water physics (`WaterScreen.jsx`), confetti (`LevelUpScreen.jsx`), milestone popup 7/14/30 (`GardenScreen.jsx:1168`) | ⭐⭐⭐⭐⭐ Đỉnh |
| **Family (tưới hộ)** | Chỉ đổi badge trạng thái cây — KHÔNG floater/celebration | ⭐⭐ Fizzle |
| **Voucher redeem** | QR modal im lặng, trừ điểm không trophy | ⭐⭐ Fizzle |
| **Health Tracking** | Dashboard chart — KHÔNG ăn mừng cột mốc, không nối vào cây | ⭐⭐ Fizzle |
| **Care Plan** | Danh sách tĩnh — KHÔNG adherence/streak/badge | ⭐⭐ Fizzle |

**3 phát hiện PO chính:**
1. **Emotional drop-off**: leo Seed → Plant → LevelUp (cao) rồi chạm Voucher/Health/Care (phẳng) — không có đỉnh mới giữ chân.
2. **Mascot bị bỏ phí**: chỉ xuất hiện ở Garden + LevelUp; vắng mặt ở 4 luồng còn lại.
3. **Không có "trophy case"**: badge đã định nghĩa (`constants.js`) nhưng user không có nơi xem lại thành tựu → mất switching cost.

## 9.2 Tài sản celebration tái dùng (KHÔNG viết lại)

- **Confetti engine**: `LevelUpScreen.jsx:22,45-47` (keyframe `confettiFall` + 30-particle gen).
- **Full-screen celebration shell**: `LevelUpScreen.jsx` (phase 0→3 timing, glassmorphic badge card).
- **Milestone popup gate (show-once)**: `GardenScreen.jsx:73-87,1168-1240` (localStorage).
- **"+N" floater**: `WaterScreen.jsx` + `GardenScreen.jsx:475-496` (floatUp).
- **Badges + ICONS**: `constants.js` (`badge_sprout/tree/garden/family`, `ui_trophy_cup`, `ui_party_celebrate`, `ui_gift_box`).
- **State**: `AppContext.jsx` `update()` (functional patch), `showToast()`, `waterHabit()` (+10/streak mẫu).

## 9.3 Wow cần bổ sung cho 4 luồng yếu

| Luồng | Wow/Achievement thêm vào | Tái dùng |
|------|---------------------------|----------|
| Family | RewardToast "+5 tưới hộ" + mascot wave; **Family milestone modal** khi cả nhà đủ streak (badge_family) | floatUp, milestone gate |
| Voucher | Confetti + "🎉 Thu hoạch thành công" + điểm đếm xuống; badge **first_harvest** lần đầu đổi | ConfettiBurst |
| Health | **Wellness Insight card** ("8.523 bước → cây Sả được tưới thêm 🌿" + CTA Xem vườn); RewardToast + badge **active_day** khi ≥10k bước | RewardToast |
| Care Plan | **Adherence bar** ("Uống thuốc 23/30 ngày") + mascot khen; badge **adherence_30** | habit-done có sẵn |

## 9.4 Component & config dùng chung (file mới)

```
frontend/src/components/feedback/Celebration.jsx   → ConfettiBurst / RewardToast / CelebrationModal (tách từ LevelUpScreen)
frontend/src/config/achievements.js                → ACHIEVEMENTS[] + useUnlockedAchievements(state)
```

## 9.5 Achievement Center (Trophy Case)

`ProfileScreen.jsx` → section "Thành tựu": grid badge từ `achievements.js`
(đã mở khoá = sáng + màu; chưa = xám + điều kiện). Tập trung mọi achievement → tăng switching cost (đúng công thức §7: thói quen + lịch sử + gia đình + điểm).

## 9.6 Nguyên tắc giữ nguyên

- Health/Care chỉ **ăn mừng**, KHÔNG chẩn đoán (giữ edge-case §5.3, §1.2).
- Mọi celebration "nhỏ" dùng RewardToast (2.5s auto-dismiss); chỉ milestone lớn mới full-screen modal.
- Mọi milestone gate show-once qua localStorage để tránh spam.
