# Tinh Túy Dự Án: Long Châu Care

*Một tài liệu cho người hoàn toàn chưa biết gì về dự án — giải thích toàn bộ ý tưởng, cách kiếm tiền, cách vận hành, và tại sao nó khác biệt.*

---

## 🎯 Mở Đầu

**Long Châu Care** là một app chăm sóc sức khỏe gia đình do **FPT Long Châu** (chuỗi nhà thuốc lớn nhất Việt Nam) phát triển cho cuộc thi nội bộ "Châu Thức — Thức tỉnh sức khỏe, Dẫn lối đổi mới" (2026).

Nhưng nó không phải "một app thêm tính năng vào app cũ." Đó là **một cách hoàn toàn khác để định vị Long Châu** — từ "nơi mua thuốc" thành "bạn đồng hành sức khỏe gia đình."

Tài liệu này kể toàn bộ:
1. **Ý tưởng cốt lõi** (Concept)
2. **Cách kiếm tiền** (Business Model)
3. **Người dùng thấy gì** (Tính Năng)
4. **Cách vận hành** (Mô Hình Con Người + AI)
5. **Tại sao khó copy** (Moat)

---

## 🚨 Nỗi Đau Khởi Điểm

### Vấn Đề #1: App Là Kênh Giao Dịch, Không Phải Bạn Đồng Hành

App Long Châu Khách Hàng (KHLC) hiện tại giống **Shopee chuyên bán thuốc**:
- User mở app khi **cần mua thuốc**
- Tìm → thanh toán → tắt đi
- Lý do duy nhất để quay lại: **cần mua hàng**

**Kết quả**: DAU (Daily Active Users) cực thấp. User không cảm thấy "thuộc về" Long Châu. Không có lý do để mở app vào một ngày thường khi khỏe.

### Vấn Đề #2: 3 Chuỗi Kinh Doanh Rời Rạc

Long Châu thực tế có **3 dòng sản phẩm lớn**:
- 🏪 **Pharmacy** (Nhà thuốc): bán thuốc, supplement
- 🧪 **Lab** (Phòng xét nghiệm): xét nghiệm máu, nước tiểu
- 💉 **Vaccination** (Tiêm chủng): vaccine cho trẻ, phòng ngừa người lớn

Nhưng **user không biết**. App không bao giờ gợi ý Lab hoặc Vaccine. Từ góc nhìn khách hàng: "Long Châu = nơi mua thuốc tý xíu, không phải nơi chăm sóc sức khỏe toàn diện."

### Vấn Đề #3: Không Có Cá Nhân Hóa

App không biết user của mình bị bệnh gì, đang uống thuốc gì, cần theo dõi chỉ số nào. Tất cả là giao dịch vô danh. Kết quả:
- Không thể nhắc refill ("Bạn sắp hết thuốc")
- Không thể gợi ý ("Bạn cần khám định kỳ")
- Không thể hỗ trợ ("Nhịp tim bạn cao bất thường")

---

## 💡 CONCEPT: Tại Sao Chọn Khu Vườn Thảo Dược Việt?

### Câu Hỏi Cốt Lõi

> **"Làm sao để user mở app Long Châu mỗi ngày, kể cả khi không có bệnh?"**

Đây **không phải câu hỏi công nghệ** (thêm chatbot, thêm điểm). Đây là câu hỏi **tâm lý + văn hóa**.

### Lý Do Chọn Ẩn Dụ Khu Vườn Thảo Dược Việt

**Vì sao không phải gamification kiểu phương Tây** (điểm, badge, streak)?
- App fitness phương Tây: "Bạn bỏ cuộc tập hôm nay → streak reset → bạn thất bại"
- Cơ chế này **tạo cảm giác tội lỗi & thất bại** → không phù hợp với sức khỏe mãn tính

**Vì sao Khu Vườn Thảo Dược Việt lại khác?**
- Hầu hết gia đình Việt Nam, nhất là thế hệ cũ, từng trồng khu vườn với các cây thảo dược
- Mẹ tưới nước, bố bón phân, con nhỏ chiêm ngưỡng cây lớn — **đó là tình cảm gia đình, không phải "chữa bệnh"**
- Khi ai đó ốm, mẹ đi hái cây để chế biến — **đó là "nấu ăn dân dã," không phải "quản lý bệnh nhân"**

**Bước nhảy insight**: Chuyển cách nhìn từ "**quản lý sức khỏe**" (lạnh) thành "**chăm một khu vườn gia đình**" (ấm)

### Bảy Cây = Bảy Hành Trình

Hệ thống gán mỗi user một trong **15 nhóm cây** (G1–G15) dựa trên hồ sơ sức khỏe:

| Cây | Hành Trình | Cho Ai? | Ý Nghĩa |
|-----|-----------|--------|---------|
| 🫚 **Gừng** | Uống thuốc đúng giờ | Bệnh nhân cao huyết áp | "Mỗi sáng uống thuốc = tưới cây" |
| 🟡 **Nghệ** | Theo dõi chỉ số | Bệnh nhân tiểu đường | "Mỗi lần kiểm tra glucose = tưới cây" |
| 🌿 **Sả** | Vận động hàng ngày | Người muốn phòng ngừa | "Mỗi lần tập thể dục = tưới cây" |
| 🌾 **Rau Má** | Khám định kỳ | Người già | "Mỗi lần khám = cây được chăm" |
| 🍵 **Lá Trà** | Tuân thủ dài hạn | Bệnh nhân tim mạch | "Uống thuốc suốt đời = cây tươi mãi" |
| 🪷 **Hoa Sen** | Thai sản & sau sinh | Phụ nữ mang thai | "9 tháng thai sản = Hoa Sen nở hoa" |
| 🍃 **Tía Tô** | Tiêm chủng | Trẻ em | "Mỗi lần tiêm = cây mạnh lên" |

**Cây không chết**: Nếu user quên tưới 3 ngày, cây chỉ "ngủ đông" (paused). Không bị phạt, không trừ điểm. **Không ai bị thất bại.**

### Gia Đình = Một Khu Vườn

**Cái tuyệt vời nhất**: Không cô độc.

Mẹ bị cao huyết áp (Gừng), con gái muốn vận động (Sả), cháu nhỏ cần tiêm chủng (Tía Tô) — tất cả trong **một Khu Vườn Gia Đình chung**:

```
┌─────────────────────────────────┐
│  🏡 Khu Vườn Gia Đình Anh Bình  │
├─────────────────────────────────┤
│ 👩 Mẹ: 🫚 Gừng (HA)            │
│ 👨 Bố: 🌾 Rau Má (định kỳ)     │
│ 👧 Con gái: 🌿 Sả (vận động)    │
│ 👶 Cháu: 🍃 Tía Tô (vaccine)   │
└─────────────────────────────────┘
```

Mỗi sáng khi mở app, mẹ thấy:
- Cây Gừng của mẹ có tươi không?
- Con gái vừa tưới Sả chưa?
- Cháu chưa tưới Tía Tô — ai sẽ tưới hộ cháu?

**→ Đó là "thuộc về"** — lý do mở app hàng ngày.

---

## 📱 TÍNH NĂNG: Người Dùng Thấy Gì?

### Onboarding (Lần Đầu — 5 Bước)

**Bước 1: Welcome**

![Onboarding welcome screen](./assets/screenshots/onboarding-welcome.png)

*Chào mừng, người dùng mới — app giới thiệu ẩn dụ Khu Vườn*

**Bước 2–4: Khảo Sát**

User trả lời:
- "Bạn là ai? Bạn chăm sóc ai?"
- "Sức khỏe hiện tại: bị bệnh gì không?"
- "Bạn uống thuốc nào? (hệ thống quét lịch sử mua hàng)"
- "Bạn có thói quen xấu gì không?"

Mỗi câu hỏi kết hợp **AI phân tích lịch sử mua thuốc** (6 năm dữ liệu Long Châu) + **câu trả lời user**

**Bước 5: OCR & Dược Sĩ Xác Minh**

- User chụp ảnh đơn thuốc / kết quả xét nghiệm
- AI đọc (OCR): "Amlodipine 5mg 1 viên/ngày cho cao huyết áp"
- **Dược sĩ Care Team xác minh**: "Đúng, bạn sẽ trồng Cây Gừng"
- App tự động tạo Cây Gừng + gửi lời chào từ dược sĩ

---

### Home / Garden (Khu Vườn Chính)

![Garden home - Full data](./assets/screenshots/garden-home-full.png)

*Màn hình Home — Cây của bạn và một số thông tin hôm nay*

User thấy:
- **Cây của mình** (ví dụ Gừng) ở trạng thái hiện tại (hạt, mầm, cây con, cây lớn, nở hoa)
- **Nút "Tưới Nước"** (lớn, ở giữa) — khi click:
  - Cây được tưới (animation)
  - Streak +1 (ngày liên tiếp)
  - Points +10 (điểm tích lũy)
  - Thông báo: "Hôm nay bạn tưới Gừng! Tiếp tục nào 🌿"
- **Mascot thân thiện** (nhân vật hỗ trợ) — nói tips hàng ngày
- **Thông báo**:
  - Refill alert: "Bạn sắp hết thuốc"
  - Khám định kỳ: "Tuần này khám tim mạch, nhớ book"
  - Streak milestone: "Bạn đã tưới 7 ngày liên tiếp!"

---

### Khu Vườn Gia Đình (Family Garden)

User xem toàn bộ cây của gia đình:
- Mẹ: Gừng (trạng thái: nở hoa, 45 ngày liên tiếp)
- Bố: Rau Má (trạng thái: cây lớn, 23 ngày liên tiếp)
- Con gái: Sả (trạng thái: cây con, 12 ngày, chưa tưới hôm nay)
- Cháu: Tía Tô (trạng thái: mầm, 2 ngày)

**Tính năng: "Tưới Hộ"**
- Mẹ thấy con gái quên tưới → click "Tưới Sả cho con gái"
- Cây con gái được tưới, streak +1
- **Cả mẹ lẫn con gái đều được points** (giúp nhau = động lực)
- Mẹ thấy: "Con đã tưới được cây hôm nay nhờ mẹ chăm sóc" → tình cảm gia đình

---

### Lịch Khám & Care Plan

User xem toàn bộ lịch khám/tiêm chủng của gia đình:

```
📅 Lịch Tuần Này
├─ Thứ 2: Mẹ khám tim mạch (14:00 - BV Trung Ương)
├─ Thứ 3: Cháu tiêm vaccine (09:00 - Trạm tiêm)
└─ Thứ 5: Bố xét nghiệm cholesterol (10:00 - Long Châu Lab)

💡 Gợi ý từ Dược sĩ:
"Mẹ khám tim → cần check lipid profile? 
 Long Châu có Lab, đặt chung tiết kiệm 1 chuyến."
```

---

### Voucher & Rewards

User tích điểm từ tưới cây → đổi voucher **thật**:
- Lab test (xét nghiệm)
- Vaccine
- Supplement (vitamin, khoáng chất)
- Dụng cụ y tế (máy đo huyết áp, etc.)

Mỗi voucher có **QR code** để dùng tại shop Long Châu

---

### Profile & Achievements

User xem:
- **Stats**: Điểm tích lũy, số cây đã trồng, số ngày tưới, badges
- **Khu Vườn Huy Hiệu** (Memorial Garden): Cây đã "tốt nghiệp" (ví dụ Hoa Sen sau 9 tháng thai sản)
- **Badges**: "Mẹ Sen Vàng" (hoàn thành thai sản), "Lão Thành Gừng" (tưới 100 ngày), etc.
- **Health Tracking**: Đồng bộ với Google Fit (bước, nhịp tim, cân nặng, giấc ngủ)
- **Menstrual Cycle Tracking** (nếu là nữ): Theo dõi chu kỳ

---

### Pharmacist Dashboard (Staff Only)

**Dược sĩ Care Team thấy**:
- **Queue** (hàng chờ duyệt):
  - Onboarding mới cần xác minh
  - OCR kết quả xét nghiệm cần review
  - AI alert (nhịp tim cao, không refill 30 ngày)
  - Urgent case (cảnh báo tương tác thuốc)
- **Per-user details**:
  - Health profile
  - Purchase history
  - AI summary
  - Hành động: Approve / Edit / Reject

**Quy trình**:
- Routine (70%): Auto-send (nhắc refill, streak, lịch tiêm)
- Non-routine (30%): DS duyệt trước khi gửi

---

## 📋 DANH SÁCH CHI TIẾT: 19 SCREENS + TẤT CẢ TÍNH NĂNG

### **Nhóm 1: Onboarding & Auth (3 screens)**

**1. Login Screen**
- Nhập số điện thoại (10 số)
- Firebase custom token auth
- Giới thiệu ẩn dụ Khu Vườn

**2. Welcome Screen (Onboarding Step 1)**
- 👋 Chào mừng
- Giải thích ý tưởng Khu Vườn Thảo Dược
- **Dạng kể chuyện** (storytelling), không phải form survey khô

**3. Onboarding Story-Driven (Steps 2–5)**
- **Step 2: "Bạn Là Ai?"** — Interactive story: chọn vai trò (mẹ, bố, trẻ, người già)
- **Step 3: "Sức Khỏe Hiện Tại?"** — Story flow: "Hôm nay bạn thấy như thế nào?" (cảm thấy khỏe / đang theo dõi / bị bệnh) → health status picker
- **Step 4: "Chứng Thư Sức Khỏe"** — OCR document upload: chụp đơn thuốc, lab result, vaccine record, ultrasound, etc.
  - AI đọc OCR: trích xuất tên thuốc, chỉ số
  - Dược sĩ verify (đúng sai, cây phù hợp không)
- **Step 5: "Cây Bạn Chọn"** — AI recommend cây + user confirm → "Seed Planted" animation

---

### **Nhóm 2: Core Garden & Daily Engagement (5 screens)**

**4. Home / Garden Screen** ⭐ (Most Visited)
- 🌱 **Cây của bạn** — hiển thị trạng thái hiện tại (hạt/mầm/cây con/cây lớn/nở hoa)
- 🚰 **Big Watering Button** — "Tưới Nước [Tên Cây]" (center, large)
  - Watering animation: nước rơi, cây bạc hơn, âm thanh nhỏ
  - Instant feedback: Streak +1, Points +10
- 📊 **Today's Stats**:
  - Streak: X ngày liên tiếp
  - Points: Y tổng cộng
  - Last watered: "Vừa tưới"
- 🔔 **Notifications Panel**:
  - Refill alert: "Thuốc sắp hết"
  - Checkup reminder: "Cần khám định kỳ"
  - Family update: "Con vừa tưới Sả" / "Cháu chưa tưới hôm nay"
- 💬 **Mascot Messages** (contextual)
  - Tips hàng ngày ("Uống thuốc lúc 7am sẽ tốt hơn")
  - Encouragement ("Bạn đang làm tốt lắm!")
  - Challenge ("3 ngày nữa là 30 ngày liên tiếp!")

**5. Water Action / Watering Screen**
- Cây được tưới (animation)
- Streak counter (animation)
- Celebration modal nếu milestone (7/14/30 ngày liên tiếp)
- "Chia sẻ" (share streak lên family / social)

**6. Germination Screen**
- Lần đầu tiên cây "mọc" từ hạt thành mầm
- Celebratory animation + sound
- Dược sĩ message: "Chúc mừng, cây của bạn đã bắt đầu!"

**7. Level-Up / Milestone Screen**
- Khi streak đạt 7/14/30/60/100 ngày
- Badge animation (ví dụ: "Gừng Vàng — 30 ngày liên tiếp")
- Unlock reward voucher

**8. Plant Status / Care Plan Detail**
- Cây của bạn đang ở giai đoạn nào
- Plant history: "Đã tưới 45 ngày, nở hoa vào tuần 8"
- Care tips: "Để cây nở hoa, cần tưới liên tục 60 ngày"
- Journal: "Lịch sử tưới" (ngày-ngày nào tưới, ngày-ngày nào skip)

---

### **Nhóm 3: Family & Household Management (4 screens)**

**9. Family Garden View** ⭐
- 👨‍👩‍👧‍👦 **Toàn bộ cây gia đình**:
  - Mẹ: 🫚 Gừng (45 ngày, nở hoa)
  - Bố: 🌾 Rau Má (23 ngày, cây lớn)
  - Con gái: 🌿 Sả (12 ngày, cây con, **chưa tưới hôm nay** — chữ đỏ)
  - Cháu: 🍃 Tía Tô (2 ngày, mầm)
- 🌱 **Tưới Hộ (Caregiver Watering)**:
  - Mẹ click "Tưới Sả cho con" → cây con gái được tưới, streak +1, cả hai đều được points
  - Highlight: Mẹ thấy "Mẹ đã giúp con tưới cây hôm nay"
- 📞 **Invite Family**:
  - Mẹ share QR code hoặc link invite
  - Brother/sister download + join → thêm vào Family Garden
- 🎯 **Family Challenges** (optional):
  - "Cả nhà tưới 100 ngày liên tiếp?" → unlock family badge

**10. Weekly Household Calendar** ⭐ (New!)
- 📅 **Lịch Tuần Của Nhà**:
  - Thứ 2: Mẹ khám tim mạch 14:00 (BV Trung Ương)
  - Thứ 3: Cháu tiêm vaccine 09:00 (Trạm tiêm LC)
  - Thứ 5: Bố xét nghiệm cholesterol 10:00 (Lab LC)
  - Thứ 6: Con gái tập yoga 18:00
- 💡 **AI Smart Suggestion**:
  - "Mẹ khám tim → cần check lipid? Book chung tiết kiệm 1 chuyến?"
  - "Cháu sắp tiêm → mua vitamin tăng sức đề kháng?"
- 🏥 **Batch Booking**:
  - Chọn 2-3 sự kiện → book chung appointment (giảm số chuyến, tiết kiệm thời gian)

**11. Family Celebrations / Milestones**
- Khi bất kỳ member đạt milestone → toàn gia đình được notification
  - "🎉 Con đạt 30 ngày liên tiếp! Cả nhà chúc mừng!"
- Family badge: "Gia Đình Vàng — Tất cả đạt ≥30 ngày"

**12. Graduated / Memorial Garden**
- Cây đã "tốt nghiệp" (ví dụ: Hoa Sen sau 9 tháng thai sản)
- Hiển thị với dòng chữ: "Con đã hoàn thành thai sản — người bé chào đời — Gia đình vàng"
- Tự động tạo cây mới cho giai đoạn tiếp theo (ví dụ: Sả cho phục hồi sau sinh)

---

### **Nhóm 4: Active Quests & Health Guidance (2 screens)**

**13. Active Quests / Missions** ⭐ (New!)
- 🎯 **AI-Personalized Quests**:
  - "Chạy 10,000 bước hôm nay?" (vì Cây Sả = vận động)
  - "Ngủ ≥7 giờ?" (vì health tracking)
  - "Uống 8 cốc nước?" (generic wellness)
  - "Kiểm tra huyết áp lần này?" (vì user có HA)
- 📊 **Progress Tracking**:
  - Visual: 6/10 bước đã đi (progress bar)
  - Notification: "Còn 4,000 bước nữa để hoàn thành quest!"
- 🏆 **Reward**:
  - Complete quest → +25 points (thay vì +10 tưới cây)
  - Combo: 3 quests/tuần → unlock special badge

**14. Passive Health Tracking & Wearable Integration**
- 📱 **Google Fit Sync**:
  - Steps: "Hôm nay 8,942 bước (target 10,000)"
  - Heart rate: "Bình thường 68-72, hôm nay 78" (sắc vàng = xem)
  - Sleep: "7h 23 phút (tốt)"
  - Weight: "Cân nặng 65kg (từ weighing scale sync)"
- 📈 **Insight Tied to Plant**:
  - "Bạn chạy 8,000 bước → cây Sả được bơm năng lượng +5% phát triển"
  - (Gamification nhưng vẫn grounded vào dữ liệu thật)
- ⚠️ **Health Alert**:
  - Nhịp tim liên tục > 100 → orange warning
  - "Nhịp tim cao bất thường — Dược sĩ đang kiểm tra"
  - Nếu heart rate vẫn cao sau 1h → urgent escalation

---

### **Nhóm 5: Care & Health Management (3 screens)**

**15. Care Plan & Habit Management**
- 📋 **Your Care Plan**:
  - Gừng journey: "Uống thuốc cao huyết áp đúng giờ"
  - AI-suggested habits:
    - ✓ Uống Amlodipine 7:00 sáng (từ đơn thuốc)
    - ✓ Ăn cơm không quá mặn (từ khảo sáo "thói quen xấu")
    - ✓ Bơi 30 phút 3x/tuần (từ health status)
  - Custom habit: Mẹ thêm "Kiểm tra huyết áp chiều 19:00" (nút "Add Habit")
- 📅 **Habit Reminders**:
  - Push: "7:00 sáng — Uống Amlodipine!"
  - Snooze option (5/15/30 min)
- 📊 **Habit Stats**:
  - Compliance: Amlodipine 94% (done 43/45 days)
  - Trend: "Tháng này tốt hơn tháng trước"

**16. Health Metrics Dashboard**
- 📊 4 metrics trong 2x2 grid:
  - Steps (mục tiêu 10k, hôm nay 8,900)
  - Heart rate (bình thường 60–100, hôm nay 72) + trend
  - Sleep (mục tiêu 7h, hôm nay 6.5h) + quality meter
  - Weight (target 65kg, hôm nay 65.3kg)
- 💡 **Personalized Insight**:
  - "Bạn chạy 8,900 bước — dồi dào năng lượng cho Cây Sả!"
  - "Heart rate bình thường — tiếp tục uống thuốc đều đặn"
- 🔗 **Google Fit Connect**:
  - "Connected to Google Fit • Last sync: 2 mins ago"
  - Manual override option (nếu wearable không đồng bộ)

**17. Appointments & Lab Orders**
- 📅 **Scheduled Appointments**:
  - Thứ 5 14:00 - Khám tim mạch (Dr. Trần, BV Trung Ương)
  - Thứ 7 10:00 - Xét nghiệm cholesterol (Long Châu Lab, kết quả 3-5 ngày)
- 💊 **Lab Result Integration**:
  - Khi kết quả xét nghiệm có → push notification
  - Result: Cholesterol 189 (cao), Glucose 95 (bình thường)
  - AI tóm tắt: "Cholesterol cao → kiểm soát chế độ ăn"
  - Dược sĩ review trước khi push message (Rule #0)
- 📍 **Batch Appointment UI**:
  - "Mẹ khám lúc 14:00, Bố xét nghiệm lúc 10:00 → book chung? Tiết kiệm 1 chuyến"

---

### **Nhóm 6: Rewards & Incentives (2 screens)**

**18. Voucher Catalog & Redemption** ⭐ (Personalized!)
- 🎁 **Personalized Vouchers** (NOT generic!):
  - For HA patients: "Vitamin K2 giảm 20%" (support heart health)
  - For diabetics: "Glucose meter giảm 30%" (direct need)
  - For pregnant women: "Prenatal vitamin pack 50%" (relevant)
  - For kids: "Vaccine package 40% off + free health booklet" (stage-specific)
- 💰 **Points System**:
  - 1 day watering: 10 points
  - 1 completed quest: 25 points
  - 7-day streak: 50 point bonus
  - Family milestone: 100 point bonus
- 🛒 **Voucher Tiers**:
  - 100 points: Lab test (lipid, glucose)
  - 250 points: Vaccine package
  - 500 points: Supplement bundle (3 months)
  - 1000 points: Home health kit (BP monitor + digital scale)
- 📲 **Redemption Flow**:
  - Redeem → QR code generated → show at Long Châu shop → auto-discount applied

**19. Achievements & Badges**
- 🏆 **Milestone Badges**:
  - "Gừng Bạc" — 10 ngày liên tiếp
  - "Gừng Vàng" — 30 ngày liên tiếp
  - "Gừng Lão Thành" — 100 ngày
  - "Mẹ Sen Vàng" — Hoàn thành thai sản (9 tháng)
  - "Gia Đình Vàng" — Tất cả member ≥30 ngày
  - "Y Tế Thông Minh" — Complete 50 quests
  - "Chăm Sóc Toàn Diện" — Linked ≥1 family member
- 📱 **Social Sharing**:
  - "Share Badge" → generate image + caption
  - Facebook / WhatsApp share
  - Caption: "Mình vừa đạt 30 ngày tưới Gừng! 🫚 Bạn có dám thử Khu Vườn Sức Khỏe?"

---

### **Nhóm 7: Profile & Settings (2 screens)**

**20. Profile Screen**
- 👤 **User Info**: Tên, SĐT, DOB, Gender
- 📊 **Stats Dashboard**:
  - Total points: 2,450
  - Plants grown: 3 (Gừng đang trồng, Sả tốt nghiệp, Hoa Sen tốt nghiệp)
  - Longest streak: 45 ngày (Gừng)
  - Badges unlocked: 8/20
- 🏥 **Health Profile**:
  - Status: Cao huyết áp (điều trị)
  - Current plant: Gừng
  - Linked doctor: Có (BS Trần Văn B)
- 🎚️ **Preferences**:
  - Language: Tiếng Việt / 日本語
  - Reminder time: 07:00 (notification chuông)
  - Watering animation: On/Off
- 👩 **Menstrual Cycle Tracking** (Nếu female):
  - Last period: Aug 1
  - Cycle length: 28 days
  - Next ovulation: Aug 15 (predicted)
  - Note: Các suggest habit tự thích ứng theo cycle phase
- 🔗 **Integrations**: Google Fit (connected), Medical Record (optional)
- 🚪 **Logout**

**21. Pharmacist Dashboard** (Staff Only)
- 👨‍⚕️ **User Role**: Dược sĩ Care Team
- 📋 **Queue**:
  - Pending: 23 items (sorted by priority: URGENT → NORMAL → ROUTINE)
  - Resolved today: 67
  - SLA: Urgent ≤5min, Normal ≤2h, Routine auto-send
- 👤 **Per-User Item** (expandable):
  - Name: Nguyễn Thị Mai
  - Age: 45
  - Condition: Cao huyết áp, 6 months on Amlodipine
  - Tabs:
    - **Overview**: Brief health history
    - **AI Summary**: "Lịch sử mua Amlodipine liên tục, tuân thủ tốt, mới mua Aspirin (tương tác minor)"
    - **Uploaded Docs**: Prescription (OCR'd), Lab result
    - **Assigned Plant**: Gừng (Recommended by AI, verified by pharmacist)
  - Action buttons:
    - ✅ **Approve** (auto-send message to user)
    - ✏️ **Edit** (revise AI draft → custom message)
    - ❌ **Reject** (flag as unsafe, add reason)
    - 💬 **Chat** (direct message with user if needed)
- ⏱️ **SLA Timer**: "2:34 elapsed" (visual indicator if approaching timeout)
- 📊 **Dashboard Stats**: 142 items today, 99 auto-sent, 43 pending review

---

## ⚙️ VẬN HÀNH: Con Người + AI Làm Việc Thế Nào?

### 3 Nhân Vật Chính

**1. User (Bệnh Nhân / Gia Đình)**
- Tưới cây hàng ngày
- Nhập thông tin sức khỏe (OCR, khảo sát)
- Nhận nhắc nhở từ app
- Đặt khám, order refill, đổi voucher

**2. AI (Trợ Thủ Thông Minh)**
- Quét lịch sử mua thuốc → gợi ý cây
- OCR đơn thuốc / kết quả xét nghiệm
- Tóm tắt hồ sơ cho dược sĩ
- Gợi ý khám định kỳ dựa trên dữ liệu
- **KHÔNG ĐƯỢC** chẩn đoán, kê đơn, hay gửi tin nhắn y tế trực tiếp (Rule #0)

**3. Dược Sĩ Care Team (5–10 người)**
- **Verify** onboarding: "Cây này phù hợp không?"
- **Duyệt** tin nhắn y tế (70% routine, 30% xem xét)
- **Liên hệ** nếu cần khám định kỳ
- **Xử lý urgent** (alert bất thường)
- **Hỗ trợ** khi user có câu hỏi y tế

**4. Dược Sĩ Tại Quầy (3,000 shop)**
- Vẫn bán hàng, tư vấn bán tay **như bình thường**
- **Zero impact** — không bị áp lực từ automation online
- Nếu user đến shop, DS tại quầy chỉ tư vấn, không cần biết về Care Team

---

### Mô Hình 70% / 30%

```
AI tạo output
    ↓
├─ 70% ROUTINE (auto-send, không cần duyệt)
│  ├─ Nhắc refill: "Bạn sắp hết Amlodipine"
│  ├─ Nhắc streak: "Bạn tưới được 7 ngày liên tiếp!"
│  ├─ Lịch tiêm: "Cháu sắp tiêm vaccine"
│  └─ Khám định kỳ: "Cứ 3 tháng nên khám"
│
└─ 30% NON-ROUTINE (Care Team xem xét)
   ├─ Onboarding summary (xác minh cây)
   ├─ OCR verify (kiểm tra trích xuất)
   ├─ Urgent alert (nhịp tim 120, blood sugar 300)
   ├─ Drug interaction (Amlodipine + Ibuprofen)
   └─ Cross-member insight ("Mẹ HA → con nên tầm soát tiểu đường")
```

**Lợi ích**:
- 70% routine tự động → giảm tải cho Care Team
- 30% non-routine → DS tập trung vào quyết định quan trọng
- **10x faster** triage (thay vì 1 DS phải xem 100 items, 1 DS xem 30 items quan trọng)

---

### Rule #0: AI Không Bao Giờ Chẩn Đoán Bệnh

**AI ĐƯỢC làm:**
- ✅ Đọc đơn thuốc đã có (OCR)
- ✅ Tóm tắt lịch sử mua thuốc
- ✅ Flag chỉ số ngoài ngưỡng ("Nhịp tim 120 → DS kiểm tra")
- ✅ Gợi ý khám định kỳ

**AI KHÔNG được làm:**
- ❌ Suy ra bệnh từ thuốc ("Vì bạn mua Metformin → bạn bị tiểu đường")
- ❌ Tự chẩn đoán ("Bạn sốt cao → bạn bị COVID")
- ❌ Đề xuất thay đổi thuốc ("Dừng Ibuprofen, uống Paracetamol")
- ❌ Gửi tin y tế mà chưa DS xác minh

**Tại sao Rule #0 quan trọng:**
- Luật pháp: Luật Khám chữa bệnh 2023 (Điều 100) — chỉ có **dược sĩ hành nghề** là primary liable
- Brand trust: User tin Long Châu vì "dược sĩ đứng sau, AI chỉ là trợ thủ"
- Safety: Ngăn AI phạm sai lầm y tế

---

### AI Liability Chain (5 Bước Truy Xuất)

Mỗi tin nhắn y tế đến user đều trace được nguồn gốc:

```
Bước 1: Data source
   ↓ Ví dụ: Purchase history (Amlodipine 30 viên, ngày 1/8)

Bước 2: Source reference
   ↓ Ví dụ: Transaction ID, ảnh hoá đơn

Bước 3: AI draft
   ↓ Ví dụ: "Bạn sắp hết thuốc → đặt refill"

Bước 4: Pharmacist review
   ↓ Dược sĩ kiểm tra, chỉnh sửa nếu cần

Bước 5: Final output & signature
   ↓ Tin nhắn được push kèm digital signature
```

**Kết quả**: Nếu có sai sót y tế → trace được ngay "sai lầm ở bước nào" + "ai phụ trách"

---

## 💰 BUSINESS MODEL: Kiếm Tiền Thế Nào?

### Vấn Đề Của KHLC Hiện Tại

- DAU thấp
- Mua hàng hiếm (1.8x/tháng)
- User không liên thông Pharmacy/Lab/Vaccine

**→ Doanh thu thấp, profit thấp, user churn cao**

---

### 5 Revenue Streams Của Long Châu Care

#### **1. Tăng DAU (Daily Active Users)**

**Cơ chế:**
- Hiện tại: User mở khi ốm → DAU thấp
- Sau: User mở hàng ngày tưới cây → DAU cao

**Doanh thu:**
- DAU cao → dữ liệu user → tối ưu marketing
- Có thể chạy quảng cáo supplement, spa, wellness products → CPM cao

**Ước tính:**
- Hiện tại: 500k DAU (ước tính)
- Target: 700k DAU (+40%)
- CPM VN: $0.5–1 (ecosystem health)
- Doanh thu quảng cáo: 700k × 365 × $0.7 / 1000 = ~**180M/năm**

#### **2. Tăng Purchase Frequency (Mua Hàng Lần/Tháng)**

**Cơ chế:**
- Nhắc refill tự động
- Gợi ý khám định kỳ
- Lịch tiêm chủng
- → Mua hàng tăng

**Doanh thu:**
- Hiện tại: 1.8x mua/tháng
- Target: 3.2x mua/tháng (+78%)
- Mỗi order trung bình: 200k (thuốc + supplement)
- Thêm doanh thu: 1.4 × (user base) × 12 × 200k = **~840M/năm (chỉ từ increased frequency)**

#### **3. Cross-Selling 3 Chuỗi (Pharmacy + Lab + Vaccine)**

**Cơ chế:**
- "Mẹ khám tim → gợi ý xét nghiệm lipid" → Lab order
- "Con gái chưa tầm soát tiểu đường → mua test kit" → Pharmacy order
- "Cháu sắp tiêm → mua supplement tăng sức đề kháng" → Pharmacy order

**Doanh thu:**
- Hiện tại: 3 chuỗi rời rạc → mất ~30% cross-sell opportunity
- Sau: 3 chuỗi liên thông → +20–30% cross-sell
- Giả sử: 100M doanh thu/tháng × 30% cross-sell × 12 = **~360M/năm**

#### **4. Voucher & Loyalty (Retention + Upsell)**

**Cơ chế:**
- User tích điểm từ tưới cây → đổi voucher (lab test, vaccine, supplement)
- Voucher = incentive để user mua hàng thêm

**Doanh thu:**
- Voucher value: 100k (lab test) → user mua supplement thêm (50k) → profit: 30k/voucher
- 100k user × 2 voucher/tháng × 30k margin = **~72M/tháng = 860M/năm**

#### **5. Dữ Liệu & Insight (Long-term)**

**Cơ chế:**
- Hàng triệu hồ sơ sức khỏe gia đình Việt
- "Phân tích: người HA cần supplement nào?" → bán targeted
- "Người mang thai cần kiểm tra gì?" → bundle package

**Doanh thu:**
- Không bán dữ liệu, nhưng dùng để **smart marketing** → ROI marketing tăng 20–30%
- Hiệu ứng: Doanh thu marketing → **+200–300M/năm**

---

### Tổng Doanh Thu Dự Báo (Năm 1)

| Stream | Estimate |
|--------|----------|
| 1. Quảng cáo (tăng DAU) | 180M |
| 2. Tăng frequency | 840M |
| 3. Cross-selling | 360M |
| 4. Voucher & loyalty | 860M |
| 5. Smart marketing (data) | 300M |
| **TỔNG** | **~2,540M (2.5 tỷ)** |

---

### Chi Phí Thêm (vs KHLC cũ)

| Chi Phí | Năm 1 |
|---------|-------|
| Care Team (5-10 DS lương) | ~1,000M |
| AI/Cloud (LLM, OCR, Firestore) | ~150M |
| Ngân sách Marketing | ~300M |
| **TỔNG** | **~1,450M** |

---

### ROI

```
Doanh Thu:    2,540M
Chi Phí:      1,450M
Lợi Nhuận:    1,090M (43% margin)
```

**Kết luận: Profitable trong năm 1 — không phải long-term play**

---

## 🎯 Design Principles & Rule #0

### 6 Nguyên Lý Thiết Kế

**1. Health-First** — AI không chẩn đoán, DS primary liable

**2. Privacy by Design** — Consent granular, AES-256, user data rights

**3. AI Augments, Never Replaces** — AI = secondary actor, con người quyết định

**4. Auditability** — Mọi action ghi lại, trace được

**5. Fail Safe** — Cây không chết, chỉ "ngủ đông"; SLA escalation; OCR fallback

**6. MECE Ownership** — Rõ ràng ai chịu trách nhiệm gì

### Tách Biệt Engagement vs Clinical Truth

**Hệ 1: Engagement (Tưới Cây)**
- Streak, điểm, cây lớn
- **Không ảnh hưởng sức khỏe** — chỉ là tâm lý
- Nếu quên → cây ngủ đông, không bị phạt

**Hệ 2: Clinical (Thật)**
- Lịch sử mua thuốc
- Refill alert
- Nhắc khám định kỳ
- **Độc lập với engagement** — gửi đi dù user không tưới cây

**Tại sao điều này lại tốt:**
- Không ai cảm thấy tội lỗi vì quên tưới cây
- Sức khỏe monitored 24/7 (không phụ thuộc vào engagement)
- Khác biệt vs Duolingo (app học ngoại ngữ gây cảm giác thất bại)

---

## 🛡️ Tại Sao Khó Sao Chép (Moat)

### 1. Lịch Sử Giao Dịch Y Tế Thật (6 Năm Dữ Liệu)

- **Apple Health / Google Fit**: Không biết user mua gì → không thể refill alert
- **Long Châu**: "Anh Bình mua Amlodipine hàng tháng 6 năm nay" → evidence thực tế

### 2. Family Wallet & Family Graph (Có Sẵn)

- **Competitor mới**: Phải xây family graph từ con số 0 (legal + engineering phức tạp)
- **Long Châu**: Family Package FP đã có → tận dụng 100%

### 3. Physical Sensors (Trạm Công dân số)

- **App online**: Chỉ có wearable (smartwatch)
- **Long Châu**: 3,000 kiosk ở shop → đo huyết áp, BMI, nhịp tim thật → dữ liệu clinical grade

### 4. Care Team Dược Sĩ Con Người

- **App khác**: Toàn automation hoặc chỉ chatbot
- **Long Châu**: 5-10 DS xem xét 30% non-routine → trust + quality

### 5. 3 Chuỗi Kinh Doanh Liên Thông

- **Pharmacy chỉ**: Không thể gợi ý lab hay vaccine
- **Long Châu**: 3 chuỗi trong 1 app → "one-stop health"

---

## 🏆 Sự Trưởng Thành Trong Tư Duy

### Deliberately Out of Scope (Cố Tình Bỏ Qua)

| Item | Tại Sao Defer | Khi Nào Làm |
|------|-------------|-----------|
| Complex family (ly hôn, sống 1 mình) | MVP cần family đơn giản | Phase 2 |
| Granular permissions (teen privacy) | Cần legal framework riêng | Phase 2 |
| Multi-language (ngoài VI) | Focus vòng 1 | Phase 3 |
| Accessibility (large fonts, voice) | Cần design system a11y | Phase 2 |

**→ Bằng chứng**: Không phải "quên," mà **"chọn cố tình"**

### Validation Roadmap: "Chúng Tôi Không Giả Định, Chúng Tôi Validate"

Dự án viết rõ **KPI có thể "giết" concept**:

| KPI | Target | Nếu Không Đạt |
|-----|--------|--------------|
| Garden adoption | ≥40% user tưới ≥3x/tuần | Kill feature |
| Family link | ≥30% user link ≥1 member | Cắt family |
| Care Team value | ≥60% đánh giá "useful" | Simplify scope |
| Market interest | ≥50% interest survey | Pivot approach |

**→ Bằng chứng**: Sẵn sàng thất bại, không "hy vọng xuyên suốt"

---

## 📈 Timeline: Từ Ý Tưởng Đến Sản Phẩm Thật

**Commit 1 (13/5/2026)**: *"feat: init Long Châu Care"*
- Concept đã hình thành đầy đủ
- README, presentation (16 slides), AGENTS.md có sẵn
- Không phải "từ từ develop từ ý tưởng"

**Tháng 5–6**: Prototype PWA (Vite + React) + Firebase

**Tháng 6–7**: **Real OCR** (Google Cloud Vision) + **Real AI** (Gemini Flash + DeepSeek)

**Tháng 7–8**: UI restyle (design tokens, accessibility, 19 screens)

**Tháng 8–9**: **Internationalization** (VI + Japanese) — chứng minh scaling mindset

**Giờ**: 61 commits, app chạy live, được người dùng thử

**→ Không phải PPT, mà sản phẩm thật**

---

## 🎬 Kết: Vì Sao Long Châu Care Khác Biệt?

### Câu Chốt Gốc

> **"Long Châu không bán thuốc. Long Châu vun một khu vườn sức khỏe cho từng gia đình Việt — nơi mỗi thói quen tốt là một cây thảo dược, cả nhà cùng chăm, Care Team Dược sĩ chuyên trách đồng hành — Dược sĩ tại quầy không thay đổi gì."**

### Toàn Bộ Quyết Định Xuất Phát Từ Một Câu Hỏi

"Làm sao để user mở app mỗi ngày kể cả khi không có bệnh?"

Và từ câu hỏi đó, mỗi quyết định được hình thành:

- **Ẩn dụ Khu Vườn** — vì tâm lý "chăm sóc" tốt hơn "quản lý"
- **Care Team** — vì con người tạo trust, không phải AI
- **Rule #0** — vì brand trust quan trọng hơn automation
- **70/30 model** — vì cân bằng efficiency + quality
- **Family garden** — vì gia đình là đơn vị, không phải cá nhân
- **Physical moat** (transaction data, sensors)** — vì dữ liệu thật bất khả xâm phạm

### Đó Là Tinh Túy Của Dự Án

Không phải một app "thêm tính năng." Là một **cách hoàn toàn khác** để nhìn khách hàng.

---

*Tài liệu này viết tháng 8/2026. Long Châu Care là sản phẩm thực, chạy live. Bạn có thể truy cập https://chauthuc.web.app để trải nghiệm.*
