# Long Chau Care — Full Project Plan (Firebase + Google Stack)

> **Tagline**: *"Thức tỉnh sức khỏe — Dẫn lối đổi mới"*
> **Version**: v2.0 · 2026-05-13
> **Stack**: Firebase + Google Cloud (PWA + Functions + Firestore)
> **Principle**: Pyramid 70/20/10 — 70% rule-based, 20% hybrid, 10% AI generation

---

## Context

Dự án cấu trúc lại quanh Firebase/Google Cloud làm backbone. Bỏ harness agent (overkill — không cần LLM orchestration). Áp dụng pyramid 70/20/10. Demo cho cuộc thi.

---

## Phase 0 — Cleanup

Xóa những thứ không dùng:

```bash
rm -rf lc-care-assistant/       # bộ harness quá nặng, không cần
rm -rf pwt-assistant/           # project mẫu không liên quan
```

Giữ lại toàn bộ doc + demo:

| File/Folder                           | Purpose                                     |
| ------------------------------------- | ------------------------------------------- |
| `agents.md`                         | Rule cho người đọc                      |
| `idea.md`                           | Big idea                                    |
| `solution-design.md`                | Kiến trúc                                 |
| `long-chau-care-decision-tree.html` | Decision tree + 5 user flows (giữ nguyên) |
| `lc-care-e2e.*`                     | Diagram E2E                                 |
| `ba-bpmn-specialist/`               | Tool vẽ BPMN                               |
| `demo/`                             | PWA + Firebase (sẽ mở rộng)              |

---

## Phase 0.5 — User Research Validation Roadmap

> **Nguyên tắc**: Long Châu Care là hypothesis-driven concept. Chúng ta KHÔNG giả vờ đã có research. Chúng ta trình bày lộ trình validation rõ ràng với KPIs có thể kill the concept nếu không đạt.

### Week 1: Survey 100 KHLC Users

- **Kênh**: In-app popup + email tới KHLC loyalty members
- **Tool**: Google Forms (free)
- **Target**: 30%+ response rate (30+ valid responses)
- **Câu hỏi chính**:
  1. "Bạn có muốn app nhắc uống thuốc hàng ngày không?" (5-point Likert)
  2. "Bạn thấy ý tưởng 'chăm cây ảo' khi uống thuốc đúng giờ thế nào?" (appeal + open-ended)
  3. "Bạn có muốn xem tình trạng sức khỏe của người thân trong gia đình trên app không?" (yes/no + concerns)
  4. "Bạn sẵn sàng chia sẻ dữ liệu sức khỏe với Dược sĩ Long Châu ở mức độ nào?" (4 mức: không chia sẻ / chỉ đơn thuốc / thêm chỉ số / đầy đủ)
  5. "Điều gì khiến bạn mở app sức khỏe hàng ngày?" (multiple choice + open-ended)

### Week 2: Deep Interview 10 Users

- **Đối tượng**: 30-55 tuổi, primary caregiver của hộ gia đình
- **Thời lượng**: 30 phút/người, semi-structured
- **Tuyển từ**: KHLC loyalty top 10% + volunteer từ survey
- **Focus areas**:
  - Pain points khi quản lý sức khỏe gia đình (lịch thuốc, lịch tiêm, lịch khám)
  - Thái độ với gamification trong chăm sóc sức khỏe (có bị "trẻ con" quá không?)
  - Trust level với Dược sĩ vs Bác sĩ (khi nào cần BS, khi nào DS đủ?)
  - Trải nghiệm hiện tại với app KHLC (mở app để làm gì, bao lâu một lần?)

### Post-Contest Pilot (Sau vòng 1)

| Giai đoạn                        | Users                                                | Hoạt động                                                                                                                |
| ---------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Month 1-2: Closed Beta**   | 500 users (từ interview pool + KHLC loyalty top 1%) | A/B test: garden version vs control (no garden). Đo: D7 retention, D30 retention, daily active touches, voucher redemption |
| **Month 3-6: Expanded Beta** | 5,000 users                                          | Iterate dựa trên feedback. Pre-register Care Team DS cho full launch                                                      |

### KPIs Quyết Định Sống Chết Của Concept

| # | KPI                        | Target                                                                          | Nếu KHÔNG đạt                                                         |
| - | -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1 | Garden feature adoption    | ≥40% beta users tưới cây ≥3 ngày/tuần                                    | **Kill hoặc redesign triệt để** garden gamification             |
| 2 | Family link rate           | ≥30% beta users link ≥1 thành viên gia đình                               | **Cắt family feature** khỏi MVP, giữ cá nhân                   |
| 3 | Care Team value perception | ≥60% beta users đánh giá Care Team interaction "useful" hoặc "very useful" | **Giảm scope Care Team**, giữ ở mức OCR verify + onboarding     |
| 4 | Survey baseline match      | ≥50% survey respondents bày tỏ interest với garden concept                  | Nếu <50%: pivot sang approach khác (ví dụ: health score đơn thuần) |

### Slide Pitch — "Validation Roadmap"

> *"Long Châu Care is a hypothesis-driven concept inspired by 5 case studies (CVS Health, Ping An Good Doctor, Halodoc, Singapore HealthHub, Kakao Healthcare). We will validate with 100 users via survey and 10 deep interviews within the next 2 weeks, then closed beta with 500 users in months 1-2 post-launch. We commit to kill or pivot if KPIs above are not met."*

**5 Case Studies tham khảo**:

| Case Study                                  | Takeaway cho LC Care                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **CVS Health (Mỹ)**                  | Pharmacy chain转型 health hub — prescription refill + MinuteClinic = tăng foot traffic 40% |
| **Ping An Good Doctor (Trung Quốc)** | AI triage + human doctor gate — 30s AI brief giúp BS xử lý nhanh gấp 3x                 |
| **Halodoc (Indonesia)**               | Family health wallet — 1 app quản lý cả nhà, cross-member recommendation                |
| **Singapore HealthHub**               | Government health app — tích hợp VNeID/Sổ SK điện tử, consent-first approach          |
| **Kakao Healthcare (Hàn Quốc)**     | Gamified health management — streak-based adherence, family social loop                     |

**Câu trả lời cho giám khảo**: *"Chúng tôi không giả định user muốn khu vườn thảo dược. Chúng tôi có hypothesis dựa trên 5 case study quốc tế + validation roadmap 2 tuần với 100 users. Nếu data nói 'không', chúng tôi pivot."*

---

## Phase 1 — Kiến trúc tổng thể (Google Stack)

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND — PWA                      │
│           demo/public/index.html                     │
│           Single-page app, mobile-first              │
│           Firebase SDK trực tiếp từ client            │
└──────────────┬──────────────────────────────────────┘
               │
   ┌───────────┼───────────┐
   ▼           ▼           ▼
Firebase    Firebase    Firebase
Auth        Firestore   Hosting
   │           │           │
   │           ▼           │
   │     Firebase Functions │
   │     (backend logic)    │
   │     ┌──────────────┐   │
   │     │ functions/    │   │
   │     │ ├── index.js  │   │
   │     │ ├── ocr.js    │   │
   │     │ ├── adherence │   │
   │     │ │   .js       │   │
   │     │ ├── pharmacy  │   │
   │     │ │   .js       │   │
   │     │ ├── family-   │   │
   │     │ │   calendar  │   │
   │     │ │   .js       │   │
   │     │ ├── insights  │   │
   │     │ │   .js       │   │
   │     │ └── scheduler │   │
   │     │     .js       │   │
   │     └──────────────┘   │
   │           │             │
   ▼           ▼             ▼
Google      Google       Firebase
Identity    Cloud        Cloud
Platform    Vision       Messaging
(OAuth)     (OCR)        (Push)
```

### Services Mapping

| Google Service           | Dùng cho                                                                        | Cost (est)                |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------- |
| Firebase Auth            | Đăng nhập user (email, Google, anonymous demo)                                | Free tier                 |
| Firestore                | Toàn bộ database                                                               | Free tier (đủ cho demo) |
| Firebase Functions       | Backend logic: OCR trigger, insights, adherence, pharmacy queue, family calendar | Free tier                 |
| Firebase Hosting         | Deploy PWA + custom domain                                                       | Free tier                 |
| Firebase Cloud Messaging | Push notification "Tưới cây" 7h sáng                                         | Free                      |
| Google Cloud Vision      | OCR đơn thuốc                                                                 | Free tier 1000 req/tháng |
| Google Cloud Scheduler   | Cron job: nhắc hàng ngày, check refill                                        | Free                      |
| Gemini Flash API         | AI wording (10% use case)                                                        | $0.001/call               |

---

## Phase 2 — Firestore Data Model

### Collections

```
users/{userId}
├── profile: { name, email, phone, frtId, familyId, role, createdAt }
├── healthConditions/{condId}
│     { conditionName, sourceType, sourceReference,
│       verifiedBy, status: pending|verified|expired, createdAt }
├── carePlans/{planId}
│     { journeyType: prevention|early_detection|treatment,
│       plantType: ginger|turmeric|lemongrass|gotu_kola|tea|lotus|perilla,
│       plantLevel: 1-5, plantStatus: growing|mature|paused|graduated,
│       pharmacistNote, pharmacistApproved, createdAt }
├── prescriptions/{prescId}
│     { imageUrl, ocrRawText, ocrConfidence,
│       extractedFields: { drugName: {value, source}, dose: {value, source},
│                          frequency: {value, source}, duration: {value, source} },
│       verificationStatus: pending|verified|rejected,
│       verifiedBy, verifiedAt,
│       doctorInfo: { name, hospital, licenseNumber } }
├── adherenceEvents/{eventId}
│     { carePlanId, eventType: med_taken|vital_logged|checkup_done|vaccine_done|refill_done,
│       evidence, pointsEarned, timestamp }
└── loyaltySummary
      { totalPoints, familyPoints, tier, voucherHistory[] }

pharmacistQueue/{draftId}
    { draftType: onboarding_suggestion|adherence_alert|cross_member_pattern|prescription_verification,
      userId, aiDraft, status: pending|approved|rejected,
      reviewedBy, reviewedAt, pharmacistNote, plantSuggested,
      // AI Triage fields
      triageSeverity: routine|standard|urgent,
      aiBrief: string,
      suggestedResponse: string,
      contextSnapshot: { carePlanId, lastAdherence, lastVital },
      aiGeneratedAt: timestamp,
      pharmacistEditedResponse: string,
      pharmacistApprovedAt: timestamp,
      // Pharmacist Routing (4-tier) + SLA Escalation
      routingTier: 1|2|3|4,
      assignedPharmacistId: string,
      escalationLevel: 0|1|2|3,         // 0=normal, 1=broadcast, 2=auto-referral, 3=regional-lead
      escalationDeadline: timestamp,
      broadcastedPharmacistIds: [string],
      autoReferralSent: boolean,
      pharmacistLiabilitySignature: string }  // chữ ký điện tử của DS approve

families/{familyId}
    { name, members[], totalPoints, monthlyStats }

familyCalendars/{calendarId}        // NEW collection
    { familyId, weekStart, weekEnd,
      items: [{ date, member, journey, activity, location, batchableWith }],
      aiSummary, aiCTA,
      pharmacistApproved, pushedAt }

insights/{insightId}
    { userId, insightType: streak_milestone|weekly_summary|encouragement,
      content, generatedAt, model: rule|gemini-flash, reviewed: bool }
```

### 7 Loại Cây Thảo Dược (Reference)

| # | Cây        | Tiếng Anh | Hành trình                | Hành vi được thưởng                            | Câu chuyện                                                 |
| - | ----------- | ---------- | --------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 1 | 🫚 Gừng    | Ginger     | Điều trị (Mãn tính)    | Uống thuốc đúng giờ                             | "Vị ấm, giải cảm, đồng hành sáng tối"               |
| 2 | 🟡 Nghệ    | Turmeric   | Điều trị (Theo dõi)     | Khai báo chỉ số (HA, đường huyết)             | "Chống viêm, kiên trì hồi phục"                        |
| 3 | 🌿 Sả      | Lemongrass | Phòng ngừa (Vận động)  | Vận động hàng ngày                              | "Thanh lọc, thải độc, vận động cùng cây"            |
| 4 | 🌾 Rau má  | Gotu Kola  | Phát hiện sớm (Nguy cơ) | Khám sức khỏe định kỳ                          | "Mát gan, đều đặn chăm sóc"                           |
| 5 | 🍵 Lá trà | Tea        | Điều trị (Dài hạn)     | Tuân thủ trọn 30 ngày                            | "Chậm rãi, kiên định, nuôi dưỡng"                    |
| 6 | 🪷 Hoa Sen  | Lotus      | Thai sản (Có thời hạn)  | Tuân thủ lịch khám thai + uống vitamin          | **NEW** — "Vươn lên từ bùn, nở hoa kiêu hãnh" |
| 7 | 🍃 Tía tô | Perilla    | Nhi khoa / Miễn dịch      | Tiêm chủng đúng lịch + theo dõi tăng trưởng | **NEW** — "Lá lành chữa lành, bảo vệ mầm non"  |

### Hành trình Thai sản — Cây Hoa Sen (Lotus)

Đây là hành trình có **thời hạn cố định** (~9 tháng), khác với các cây còn lại không có end date.

| Giai đoạn               | Tuần thai  | Trạng thái cây | Hành vi                                          |
| ------------------------- | ----------- | ----------------- | ------------------------------------------------- |
| **Sen nảy mầm**   | Tuần 1-12  | 🌱 Lotus Lv.1     | Xác nhận thai + upload phiếu khám đầu       |
| **Sen vươn lên** | Tuần 13-27 | 🌿 Lotus Lv.2-3   | Khám thai định kỳ + uống vitamin đúng giờ |
| **Sen nở hoa**     | Tuần 28-40 | 🪷 Lotus Lv.4-5   | Theo dõi tuần cuối + chuẩn bị sinh           |

**Khi sinh xong — Cây Sen "tốt nghiệp" (graduation)**:

1. Cây Sen đạt trạng thái đặc biệt: `graduated` (KHÔNG dùng `dead`)
2. Animation "sen nở hoa" + badge "Mẹ Sen Vàng" trong profile
3. **Auto-chuyển sang Cây Sả (Lemongrass)** — hành trình Phòng ngừa cho mẹ sau sinh (vận động nhẹ, phục hồi)
4. **Tự động tạo Cây Tía tô (Perilla)** cho em bé — hành trình Nhi khoa (lịch tiêm chủng, theo dõi tăng trưởng)
5. Badge vĩnh viễn: "Vườn Sen" — hiển thị trong family garden

**Logic code**:

```
IF plantType = 'lotus' AND plantStatus = 'mature' AND pregnancyWeek >= 40:
    plantStatus → 'graduated'
    CREATE new carePlan: journeyType='prevention', plantType='lemongrass' (mẹ)
    CREATE new carePlan: journeyType='prevention', plantType='perilla' (bé)
    ADD badge 'lotus_garden' to family profile
    TRIGGER harvest animation + family notification
```

### Hành trình Nhi khoa — Cây Tía tô (Perilla)

| Giai đoạn                        | Độ tuổi  | Trạng thái cây | Hành vi                                        |
| ---------------------------------- | ----------- | ----------------- | ----------------------------------------------- |
| **Tía tô non**             | 0-12 tháng | 🌱 Perilla Lv.1-2 | Tiêm chủng CDC + theo dõi cân nặng         |
| **Tía tô lớn**            | 1-5 tuổi   | 🌿 Perilla Lv.3-4 | Tiêm nhắc + khám định kỳ                  |
| **Tía tô trưởng thành** | 6+ tuổi    | 🍃 Perilla Lv.5   | Chuyển sang hành trình Phòng ngừa cho trẻ |

Parent Dashboard cho Perilla:

- Lịch tiêm chủng CDC Việt Nam lookup (rule-based)
- Biểu đồ tăng trưởng (cân nặng, chiều cao) — percentile so với WHO
- Cảnh báo: trễ lịch tiêm >7 ngày → flag pharmacist review

---

## Phase 3 — Firebase Functions (6 functions)

### 3.1 ocr.js — OCR đơn thuốc (UPDATED with compliance flow)

- **Trigger**: Firestore onCreate trên `users/{id}/prescriptions/{doc}`
- **Logic**:
  - Rule: Gọi Google Cloud Vision → extract text → lưu `ocrRawText` + `ocrConfidence`
  - Rule: Save as prescription draft (status: `ocr_pending_verification`)
  - Rule: Push to pharmacistQueue (draftType: `prescription_verification`)
  - Rule: Nếu `ocrConfidence < 0.7` → show message "OCR chưa rõ — Dược sĩ Long Châu sẽ xem ảnh đơn trực tiếp"
  - Pharmacist sees: original image + OCR text side-by-side
  - Pharmacist verifies/corrects each field (drug name, dose, frequency, duration)
  - Pharmacist clicks "Verify & Create Care Plan"
  - Care plan created from PHARMACIST-VERIFIED data, NOT raw OCR
- **Pyramid**: 90% Rule, 10% Hybrid (Cloud Vision API call)

**Compliance benefit**: Long Châu can legally argue "We never auto-prescribe. Every care plan is verified by a licensed pharmacist before activation."

**Demo prep**: Prepare 3 sample prescriptions:

1. Typed prescription (OCR works perfectly — happy path)
2. Handwritten prescription (OCR fails — pharmacist manual flow)
3. Partially clear prescription (OCR low confidence — hybrid flow)

### 3.2 adherence.js — Xử lý tuân thủ

- **Trigger**: onCall — PWA gọi khi user xác nhận uống thuốc ("Tưới cây")
- **Logic**:
  - Rule: Update streak, calculate points (+10 base, +bonus milestones), detect missed days
  - Rule: Nếu streak chạm mốc 7/14/30 → trigger insight
  - Rule: Nếu quên ≥3 ngày → plantStatus = 'paused'
  - Rule: Fraud guard: max 2 events/ngày (sáng + tối)
- **Pyramid**: 100% Rule

**⚠️ DATA SEPARATION (Critical Architecture Decision):**

```
"Tưới cây" (adherenceEvents)  = ENGAGEMENT metric
  → Chỉ dùng cho: streak, points, garden UI, DAU, retention
  → User farm điểm = OK (CAC 1,667đ/ngày cho 30x brand recall)
  → KHÔNG dùng cho quyết định y tế

Lịch sử mua hàng (purchaseHistory/FP)  = CLINICAL metric
  → Dùng cho: Refill alert 28d/35d, Care Team triage
  → Tính từ ngày xuất kho gần nhất, KHÔNG từ số lần tưới cây
  → Data sạch 100%, không bị nhiễu bởi gamification
```

- Refill alert logic: Nếu `daysSinceLastPurchase > 28` → alert. `> 35` → urgent → pharmacistQueue
- Adherence rate cho Care Team: tính từ `purchaseHistory`, KHÔNG từ `adherenceEvents`

### 3.3 pharmacy.js — Pharmacist Review Queue (UPDATED with AI Triage)

- **Trigger**: onCall — Dược sĩ duyệt/reject draft
- **Logic**:

**A. AI Pharmacist Triage Router (NEW)** — runs BEFORE pharmacist sees queue item:

1. User submits question/health concern via chat (or system generates adherence alert)
2. Item enters pharmacistQueue with status: pending
3. AI step (Gemini Flash):
   - Severity classification: routine / standard / urgent
   - 30-second brief summary (1 sentence)
   - Suggested response template (NOT auto-sent)
   - Relevant patient context: care plan, last adherence event, recent vitals
4. Pharmacist sees brief, edits if needed, approves with 1 tap
5. Audit log records both AI draft AND pharmacist final decision

**B. Queue Management (existing)**:

- Rule: Cập nhật status queue
- Rule: Nếu approve + gán cây → tạo Care Plan
- Rule: Audit log từng action
- Rule: If severity = urgent, escalation rule forces immediate notification (rule overrides AI)

**Compliance guardrails**:

- AI never auto-replies — pharmacist always in the loop
- AI cannot diagnose — only summarize what the user said
- All AI output stored with `model: 'gemini-flash'` and `reviewed: false` until pharmacist approves
- If severity = urgent, escalation rule forces immediate pharmacist notification

**Demo value**:

- Before: DS tại quầy kiêm nhiệm reads 99+ items manually, ~2 min each = 3+ hours
- After: 70% auto-send (routine template) + Care Team DS 15 seconds review for 30% non-routine = **10x faster**
- **Pyramid**: 60% Rule (queue, audit, context aggregation), 40% AI (brief, severity, response draft)

### 3.4 family-calendar.js — AI Family Concierge (NEW)

- **Trigger**: onCall from PWA (Family tab) OR scheduled weekly on Sunday evening
- **Logic**:

1. **Rule (data aggregation)**:

   - Pull all members in `families/{familyId}`
   - For each member, fetch:
     - Upcoming refill dates (from carePlans + adherenceEvents)
     - Upcoming vaccine schedule (rule-based CDC lookup for kids)
     - Upcoming lab/screening (from BS-set schedule in carePlans)
     - Upcoming check-ups
   - Build structured weekly timeline (Mon-Sun) with member name + activity
2. **Rule (optimization)**:

   - Detect activities that can be batched (same day, same location)
   - Calculate distance to nearest Long Châu store
   - Flag: "Mẹ refill + Bin tiêm cùng T4 → đặt chung tại Long Châu cách 500m"
3. **AI (Gemini Flash — 10%)**:

   - Input: structured timeline JSON
   - Output: 2-3 sentence summary in warm Vietnamese tone
   - Example: "Tuần này gia đình anh có 3 việc tại Long Châu. Mẹ refill thuốc HA T2, Bin tiêm phế cầu mũi 2 T4 — em đề xuất đặt chung để tiết kiệm 1 chuyến đi."
4. **Pharmacist gate**: DS approves (1 click for routine, edit for special cases) → push via FCM

- **Pyramid**: 70% Rule, 20% Hybrid (batching logic), 10% AI (natural language CTA)
- **Demo value**: THE feature that proves "one family, many journeys." 1 card replaces 5 separate notifications. Removes mental load from primary caregiver.

### 3.5 insights.js — AI Sinh wording

- **Trigger**: Firestore onCreate trên `insights/{id}`
- **Logic**:
  - Rule: Xác định loại insight (streak_milestone, weekly_summary, encouragement)
  - Rule: Gom data cần thiết (streak, tên, cây, chỉ số)
  - AI (Gemini Flash): Sinh câu wording cá nhân hóa
  - Rule: Fallback template nếu AI lỗi
  - Rule: Lưu kết quả vào insight document
- **Pyramid**: 50% Rule, 50% AI (wording)

### 3.6 scheduler.js — Cron jobs

- **Trigger**: Google Cloud Scheduler → PubSub → Function
- **Jobs**:
  - 7:00 daily: Push FCM "Tưới cây" cho tất cả user có Care Plan active
  - 9:00 daily: Check refill overdue → tạo alert
  - Sunday 20:00 weekly: Trigger family-calendar.js for all families
  - End of month: Generate monthly report → insights
- **Pyramid**: 100% Rule

---

## Phase 4 — PWA Screens (index.html mở rộng)

### Screen Map

| Screen                          | Nội dung                                                                     | Pyramid           |
| ------------------------------- | ----------------------------------------------------------------------------- | ----------------- |
| Login                           | Firebase Auth (email + anonymous demo)                                        | —                |
| Onboarding                      | Upload đơn thuốc → OCR → hiện kết quả → queue DS                     | Rule              |
| Pharmacist Dashboard            | Queue duyệt draft +**AI Brief view** (NEW) + gán cây, approve/reject | Rule + AI         |
| Garden                          | Cây + streak + nút tưới + insight card + gia đình                       | Rule + AI wording |
| Insight Card                    | "Mẹ đã giữ HA ổn định 28 ngày" — wording từ Gemini                  | AI                |
| **Family Calendar** (NEW) | Weekly timeline + AI summary + batching CTA                                   | Rule + AI         |
| Weekly Summary                  | Tổng kết tuần gia đình — wording từ Gemini                             | AI                |
| Voucher                         | Đổi điểm, whitelist SKU check                                             | Rule              |
| Family View                     | Garden gia đình, báo cáo tháng                                           | Rule              |

---

## Phase 5 — Pyramid 70/20/10 Mapping

```
                     ▲
                    ╱ ╲
                   ╱10%╲          insights.js (Gemini Flash wording)
                  ╱─────╲         pharmacy.js (AI brief + severity)
                 ╱       ╲        family-calendar.js (AI CTA summary)
                ╱  20%    ╲       ─────────────────────────────
               ╱  HYBRID   ╲      OCR structured data extraction
              ╱─────────────╲     Pharmacist triage classification
             ╱               ╲    Family calendar optimization (batching)
            ╱     70%         ╲   Context aggregation for AI prompts
           ╱     RULE-BASED    ╲  ─────────────────────────────
          ╱                     ╲ Streak counting, point calculation
         ╱───────────────────────╲ Refill date check, plant status
        ╱_________________________╲ Family graph traversal, voucher whitelist
                                    OCR queue management, prescription verification
                                    Family calendar aggregation, audit log
```

| Layer  | %   | Features                                                                                                                                                             | Technology                               |
| ------ | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Rule   | 70% | Streak, points, refill check, plant status, family graph, voucher whitelist, OCR queue management, prescription verification, family calendar aggregation, audit log | Firestore + Functions (JS logic)         |
| Hybrid | 20% | OCR text extraction, pharmacist triage classification, family calendar optimization (batching), context aggregation for AI prompts                                   | Cloud Vision + Gemini Flash + rule logic |
| AI     | 10% | Insight wording, pharmacist brief (30-sec summary), family CTA summary, weekly summary, encouragement message                                                        | Gemini Flash API                         |

---

## Phase 6 — File Structure

```
demo/
├── .firebaserc
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
│
├── public/                         ← PWA Frontend
│   ├── index.html                  ← All screens including Family Calendar + Pharmacist Brief
│   ├── manifest.json               ← Done
│   ├── sw.js                       ← Done
│   └── assets/
│       └── icon-*.png              ← App icons
│
└── functions/                      ← Backend (6 functions)
    ├── package.json
    ├── index.js                    ← Entry point, exports 6 functions
    ├── ocr.js                      ← OCR trigger with pharmacist verification gate
    ├── adherence.js                ← Streak, điểm, refill alert
    ├── pharmacy.js                 ← Pharmacist queue + AI Triage Router
    ├── family-calendar.js          ← NEW: AI family concierge
    ├── insights.js                 ← AI wording (Gemini Flash)
    ├── scheduler.js                ← Cron jobs
    └── utils/
        ├── firestore.js            ← Firestore helpers
        ├── forbidden_words.js      ← Sensor: kiểm tra từ cấm trong AI output
        ├── safety.js               ← Safety helpers (pharmacist gate check, source validation)
        ├── gemini.js               ← NEW: Gemini Flash wrapper with retry + fallback
        └── compliance.js           ← NEW: Pharmacist gate helpers, source validation
```

---

## Phase 7 — Implementation Order (4 Steps)

### Step 1: Cleanup + Setup Firebase CLI

```bash
rm -rf lc-care-assistant/ pwt-assistant/
cd demo && firebase init functions   # nếu chưa có
npm init in demo/functions/
```

### Step 2: Write 6 Firebase Functions

Priority order:

1. **utils/** first (firestore helpers, safety, forbidden_words, gemini, compliance)
2. **ocr.js** — with explicit pharmacist verification step (Priority 3)
3. **adherence.js** — streak, points, refill alert
4. **pharmacy.js** — WITH AI Triage Router (Priority 1)
5. **family-calendar.js** — NEW (Priority 2)
6. **insights.js** — AI wording
7. **scheduler.js** — cron jobs

- Deploy each to Firebase as completed

### Step 3: Extend PWA

- Add: **Family Calendar** card in Family tab (consume family-calendar.js output)
- Add: **Pharmacist Brief** view in DS Dashboard (consume pharmacy.js AI triage output)
- Connect FCM for push notifications
- Add prescription upload with OCR + verification flow
- Connect PWA to Firebase Functions (httpsCallable)

### Step 4: Deploy + E2E Test

```bash
firebase deploy   # toàn bộ
```

**Verification checklist** (11 scenarios):

1. Upload ảnh đơn thuốc mẫu → OCR function trả text
2. Dược sĩ verify + approve → Care Plan được tạo trong Firestore
3. User nhấn "Tưới cây" → streak +1, điểm +10
4. Streak chạm 7 → insight card xuất hiện với wording từ Gemini
5. Trễ refill 35 ngày → alert vào pharmacist queue
6. Đổi voucher 300 điểm → whitelist check pass
7. `firebase deploy` → mở PWA trên điện thoại → Add to Home Screen
8. **NEW — Pharmacist Triage**: submit user chat message → AI generates brief → pharmacist approves in 15 sec
9. **NEW — Family Calendar**: 4 family members → AI generates weekly summary with batching CTA
10. **NEW — OCR fallback**: upload handwritten prescription → low confidence → pharmacist manual entry
11. **NEW — Urgent escalation**: severity = urgent → immediate pharmacist notification (rule overrides AI)

---

## Phase 8 — What Stays, What Goes

| Removed                                                   | Reason                                            |
| --------------------------------------------------------- | ------------------------------------------------- |
| `lc-care-assistant/`                                    | Overkill — FastAPI + Claude + Qdrant không cần |
| `pwt-assistant/`                                        | Project mẫu không liên quan                    |
| `app/harness/`, `app/agents/`, `docker-compose.yml` | Quá nặng, Firebase Functions thay thế          |

| Kept                                  | Reason                                                                      |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `agents.md`                         | Rule cho người đọc (quan trọng)                                        |
| `utils/forbidden_words.js`          | Sensor từ cấm — chuyển thành file nhỏ trong `demo/functions/utils/` |
| `idea.md`, `solution-design.md`   | Tài liệu cuộc thi                                                        |
| `long-chau-care-decision-tree.html` | Decision tree đẹp, giữ nguyên                                           |
| `ba-bpmn-specialist/`               | Tool vẽ diagram                                                            |

---

## Care Team Operations — Auto-approve Routine + Central Care Team

> **Nguyên tắc cốt lõi**: DS tại 3,000 nhà thuốc = KHÔNG thay đổi gì. Vẫn bán hàng như hiện tại.
> 70% output là template cố định → auto-send. 30% non-routine → Care Team trung tâm (5-10 DS chuyên trách online).

### Phân loại Output: Routine vs Non-Routine

| Output Type                             | Category       | Lý do                                     | Action                         |
| --------------------------------------- | -------------- | ------------------------------------------ | ------------------------------ |
| Nhắc uống thuốc 7h sáng             | ✅ ROUTINE     | Template cố định, rule-based            | Auto-send                      |
| Nhắc refill đúng lịch (30 ngày)    | ✅ ROUTINE     | Template cố định, rule-based            | Auto-send                      |
| Streak milestone (7/14/30 ngày)        | ✅ ROUTINE     | Template cố định, rule-based            | Auto-send                      |
| Lịch tiêm chủng CDC theo tuổi       | ✅ ROUTINE     | Lookup table cố định                    | Auto-send                      |
| Weekly garden summary                   | ✅ ROUTINE     | Template + data merge                      | Auto-send                      |
| **Onboarding gán cây**          | ❌ NON-ROUTINE | DS phải liên hệ thuốc ↔ bệnh ↔ cây | Care Team review               |
| **OCR verify đơn thuốc**       | ❌ NON-ROUTINE | DS phải verify chính xác                | Care Team review               |
| **Cross-member pattern**          | ❌ NON-ROUTINE | Liên quan y tế gia đình                | Care Team review               |
| **AI-generated insight wording**  | ❌ NON-ROUTINE | AI generate = cần kiểm tra               | Care Team review               |
| **Urgent case**                   | ❌ NON-ROUTINE | Nghiêm trọng                             | Care Team review (SLA 5 phút) |
| **Family calendar CTA (AI text)** | ❌ NON-ROUTINE | AI generate wording                        | Care Team review               |
| Trễ refill >35 ngày (alert)           | ❌ NON-ROUTINE | Cần đánh giá lâm sàng                | Care Team review               |

**Nguyên tắc**: Template cố định + rule-based = ROUTINE (auto-send). Có AI generate hoặc cần phán đoán y tế = NON-ROUTINE (Care Team).

### Care Team Trung Tâm — Mô hình tổ chức

```
┌─────────────────────────────────────────────────┐
│           CARE TEAM TRUNG TÂM (5-10 DS)         │
│                                                  │
│  👨‍⚕️ Care Team Lead (1)                          │
│  ├── Quản lý team, escalation, quality review    │
│                                                  │
│  👩‍⚕️ Care Team DS — General (3-5)                │
│  ├── Duyệt onboarding, OCR verify, routine care │
│                                                  │
│  👨‍⚕️ Care Team DS — Specialist (2-3)             │
│  ├── Tim mạch, tiểu đường, nhi, thai sản        │
└─────────────────────────────────────────────────┘

DS tại 3,000 nhà thuốc = KHÔNG thay đổi gì = Vẫn bán hàng
```

**Pitch**: *"Long Châu tạo ra nghề Clinical Pharmacist đầu tiên trong chuỗi nhà thuốc VN — đội ngũ 5-10 DS chuyên trách chăm sóc sức khỏe online, vai trò mới, KPI mới, career path mới."*

### Care Team Capacity Model

| Thông số                    | Giá trị               | Ghi chú                                                        |
| ----------------------------- | ----------------------- | --------------------------------------------------------------- |
| Care Team DS phụ trách user | 1 DS : 1,000-2,000 user | Vì 70% auto-send, chỉ review 30% non-routine                  |
| Non-routine items/DS/ngày    | ~30-60 items            | Với AI brief: 45s/item → ~45 phút/ngày                      |
| Care Team hours               | 8:00-22:00 (2 ca)       | Ngoài giờ: chỉ urgent escalation                             |
| Auto-redistribute             | Có                     | Nếu 1 DS có >20 pending và DS khác <5 → tự động san sẻ |

### Care Team Training & Onboarding

- **Module 1** (1h): AI triage overview — cách đọc AI brief, severity color code
- **Module 2** (2h): Care Plan creation — liên hệ thuốc ↔ bệnh ↔ cây, enum chuẩn
- **Module 3** (1h): Compliance & audit — ghi log, source verification, từ cấm
- **Module 4** (30m): Escalation protocol — khi nào escalate, ai nhận

### Care Team KPIs

| KPI                             | Target           | Đo bằng                          |
| ------------------------------- | ---------------- | ---------------------------------- |
| Avg response time (non-routine) | ≤ 2h            | Queue timestamp                    |
| Avg response time (urgent)      | ≤ 5 phút       | Queue timestamp                    |
| Approval quality                | ≤ 1% error rate | Monthly audit sampling             |
| Patient satisfaction            | ≥ 4.5/5         | In-app rating sau mỗi interaction |

---

## SLA Escalation — Khi Không Có Care Team DS Online

### Escalation Chain cho Item Urgent

```
severity = urgent
     │
     ▼
Care Team notified (push + in-app)
     │
     ├── 5 phút không phản hồi ──► BROADCAST tới tất cả Care Team DS
     │                                    (push + SMS nếu offline)
     │
     ├── 15 phút không phản hồi ──► AUTO-REFERRAL:
     │    Hệ thống gửi message tới user:
     │    "DS Long Châu hiện chưa phản hồi kịp.
     │     Nếu đây là vấn đề khẩn cấp, vui lòng
     │     đến Long Châu gần nhất hoặc gọi
     │     [hotline cấp cứu]. Chúng tôi sẽ liên
     │     hệ lại trong 30 phút."
     │
     └── 30 phút ──► Care Team Lead nhận SMS
                      + email escalation report
```

### Severity Classification (AI Triage)

| Severity     | Ví dụ                                                     | Color Code | SLA                               |
| ------------ | ----------------------------------------------------------- | ---------- | --------------------------------- |
| `routine`  | Nhắc refill định kỳ, nhắc uống thuốc                 | 🟢 Xanh    | Auto-send (không cần Care Team) |
| `standard` | Câu hỏi về tác dụng phụ nhẹ, hỏi lịch tiêm        | 🟡 Vàng   | Care Team ≤ 2h                   |
| `urgent`   | Phản ứng dị ứng sau uống thuốc, đau ngực, khó thở | 🔴 Đỏ    | Care Team ≤ 5 phút → escalate  |

**Rule override**: Nếu AI phân loại `urgent`, rule-based system LẬP TỨC gửi notification tới tất cả Care Team DS trong ca — KHÔNG đợi AI brief. Brief chạy song song.

---

## AI Liability Chain — Trách Nhiệm Pháp Lý

### Nguyên Tắc

> **Dược sĩ là người chịu trách nhiệm chính (primary liable) cho mọi output y tế gửi tới user. AI là secondary system actor — hỗ trợ, không quyết định.**

### Traceability Chain

Mỗi message gửi tới user đều có full audit trail:

```
User nhận message
     ↑
     │ 5. Final output (đã được DS sửa + approve)
     │    Lưu trong pharmacistQueue.finalOutput
     │
Dược sĩ approve (có chữ ký điện tử)
     ↑
     │ 4. pharmacistQueue.pharmacistEditedResponse
     │    pharmacistQueue.pharmacistApprovedAt
     │    pharmacistQueue.reviewedBy
     │
AI tạo draft
     ↑
     │ 3. pharmacistQueue.aiDraft
     │    pharmacistQueue.aiBrief
     │    pharmacistQueue.contextSnapshot
     │
Input data từ hệ thống
     ↑
     │ 2. medical_audit_log: ghi source data
     │    health_conditions.source_type
     │    prescriptions.verificationStatus
     │
```

### Trách Nhiệm Cụ Thể

| Actor                                 | Trách nhiệm                                                                   | Hậu quả nếu sai                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Dược sĩ** (Primary Liable) | Xác minh AI draft, liên hệ thuốc ↔ bệnh, approve/reject/edit              | Chịu trách nhiệm chính trước pháp luật + Hội đồng Dược sĩ                                   |
| **AI System** (Secondary Actor) | Gom data, tạo draft hành chính, phân loại severity                         | Audit log đầy đủ để truy vết. Nếu AI sai hệ thống → dev team fix. AI không phải pháp nhân. |
| **Dev Team**                    | Đảm bảo AI không tự output, forbidden words sensor hoạt động            | Nếu sensor lỗi → dev chịu trách nhiệm kỹ thuật                                                    |
| **User**                        | Cung cấp thông tin chính xác (self-report), tuân thủ hướng dẫn của DS | Tự chịu trách nhiệm về thông tin mình khai                                                         |

### Cơ Chế Bảo Vệ Dược Sĩ

1. **AI brief luôn có context snapshot** — DS biết chính xác AI dựa trên data gì
2. **Source tracking** — mọi data point đều có `source_type` + `source_reference`
3. **Edit history** — nếu DS sửa AI draft, cả 2 versions đều được lưu
4. **Pharmacy Council compliance** — quy trình duyệt tuân thủ quy định Hội Dược sĩ Việt Nam

---

## Compliance & Guardrails

### 5 Nguyên Tắc Tuyệt Đối

| # | Nguyên tắc                               | Cơ chế                                                                                                                    |
| - | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 1 | AI không tự chẩn đoán                 | Routine template auto-send. Non-routine qua Care Team DS gate (5-10 DS chuyên trách)                                                        |
| 2 | Mọi bệnh lý phải có nguồn hợp pháp | `health_conditions.source_type` enforce 5 nguồn                                                                          |
| 3 | Cây không bao giờ chết                 | `plant_status` không có `'dead'`, chỉ `'paused'` hoặc `'graduated'` (cho journey có thời hạn như thai sản) |
| 4 | Voucher không cho thuốc kê đơn        | Whitelist SKU: TPCN, bông băng, nước muối, dịch vụ Lab/Vac. Min order 150k. Margin TPCN 40-60% bù chi phí voucher |
| 5 | Data mã hóa theo Bộ Y tế               | Encrypt at rest + audit log đầy đủ                                                                                      |
| 6 | Data Separation: Engagement ≠ Clinical | "Tưới cây" = DAU/retention metric. Refill alert = từ lịch sử mua hàng (FP transaction). Hai hệ thống độc lập      |

### AI Pharmacist Triage Guardrails (NEW)

- AI never auto-replies — pharmacist always in the loop
- AI cannot diagnose — only summarize what the user said
- All AI output stored with `model: 'gemini-flash'` and `reviewed: false` until pharmacist approves
- If severity = urgent, escalation rule forces immediate pharmacist notification (rule overrides AI)

### OCR Compliance Guardrails (NEW)

- OCR result NEVER auto-creates care plan
- Pharmacist sees original image + OCR text side-by-side
- Every field tracked with `source: 'ocr' | 'pharmacist_corrected'`
- If `ocrConfidence < 0.7`: show fallback message, pharmacist enters manually
- Compliance log records "manual_entry_by_pharmacist" for audit

### Retail-First Decisions (NEW — từ Product Architecture Review)

**1. Farm-Friendly Policy — Cứ để user farm điểm:**
- Voucher 50k / 30 ngày farm = CAC 1,667đ/ngày → rẻ nhất thị trường cho 30x brand recall
- KHÔNG khóa voucher, KHÔNG escrow điểm, KHÔNG phạt user
- Voucher chỉ áp cho Whitelist (TPCN, Lab, Vac), min order 150k → margin TPCN 40-60% bù đủ

**2. Data Separation — Engagement vs Clinical:**
- `adherenceEvents` (tưới cây) → chỉ cho streak, points, garden UI, DAU tracking
- `purchaseHistory` (FP transaction) → chỉ cho refill alert, Care Team triage, clinical decisions
- Hai hệ thống KHÔNG mix → data clinical sạch 100%

**3. CTA Priority Stack — Health-First + Cross-sell:**
- Khi user vừa cần refill Rx VÀ có voucher TPCN:
  - **Primary CTA**: Refill thuốc kê đơn (đạo đức y khoa ưu tiên)
  - **Secondary CTA**: Gợi ý TPCN dùng voucher (cross-sell trong cùng checkout)
- Upsell Agent: Khi user đổi voucher → gợi ý 2-3 combo TPCN phù hợp Care Plan

**4. Onboarding Fallback — Progressive:**
- Không có đơn thuốc → Self-report → auto-assign Lifestyle cây (Trà, Sả) — KHÔNG qua DS
- Có đơn thuốc → OCR → DS verify → Clinical cây (Gừng, Nghệ)
- Kiosk Trạm Công Dân → sensor data → objective Health ID
- Max 3 cây active/user. Notification 7:00 sáng gộp 1 message.

---

## Differentiator — Why LC Care Wins

| Đối thủ                         | Thiếu gì so với LC Care                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------- |
| Apple Health / Google Fit          | Không có family wallet, không có transaction y tế thực, không có pharmacist HITL |
| App online thuần (Jio, Medigo...) | Không có sensor vật lý (Trạm), không có 3 chuỗi thật (Pharma+Lab+Vaccine)       |
| App bệnh viện                    | Không gamify, không family-centric, chỉ chăm 1 khía cạnh                           |
| FP hiện tại                      | Chưa có health identity, chỉ là loyalty đơn thuần                                 |

---

## The 5 "Wow" Moments (for Contest Demo)

1. **AI Triage + Auto-approve** — "99+ đơn chờ tư vấn" → 70% auto-send (routine template) + Care Team DS 15s review for 30% non-routine = **10x faster**. Zero impact cho DS tại quầy — nghề Clinical Pharmacist đầu tiên của chuỗi nhà thuốc VN.
2. **Family Calendar with AI CTA** — "Tuần này gia đình anh có 3 việc tại Long Châu. Mẹ refill T2, Bin tiêm T4 — đặt chung tiết kiệm 1 chuyến." Proves "one family, many journeys."
3. **OCR with Pharmacist Verification** — Demonstrates compliance maturity. Handles 3 real-world scenarios (typed, handwritten, partial). Passes Bộ Y tế audit.
4. **Lotus Graduation — Journey có Thời Hạn** — "Sen nở hoa sau 9 tháng → tốt nghiệp → auto tạo Sả cho mẹ + Tía tô cho bé." Proves hệ thống xử lý được journey có end date (thai sản, hậu phẫu, kháng sinh). Badge vĩnh viễn trong family garden.
5. **Urgent SLA Escalation in Real-Time** — Demo: submit urgent case → 5 giây broadcast tới DS → màn hình hiển thị escalation timer → nếu 15 phút không phản hồi → auto-referral message. Proves operational maturity.

---

## Open Questions & Scope Decisions

> **Nguyên tắc**: Những item dưới đây KHÔNG phải là "things we missed." Đây là deliberate scope decisions cho vòng 1 submission. Mỗi item đều có lý do defer + phase xử lý rõ ràng.

| #  | Item                                                                                          | Lý do defer                                                                                                           | Phase xử lý         |
| -- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1  | **Complex family models** (ly hôn, người già sống một mình, người giúp việc) | MVP cần family model đơn giản (hạt nhân). Edge cases cần legal + UX research riêng.                            | Phase 2               |
| 2  | **Granular family access permissions** (teen privacy, ẩn data nhạy cảm)              | Cần consent framework + thiết kế UX riêng. Hiện tại dùng role-based access đơn giản.                         | Phase 2               |
| 3  | **Detailed consent flow per data type**                                                 | Consent hiện tại là broad (đồng ý tham gia LC Care). Per-data-type consent cần legal review.                    | Trước public launch |
| 4  | **Prescription storage compliance** (5-year retention per Luật KCB)                    | MVP demo dùng Firestore. Production cần cold storage + retention policy riêng.                                      | Tại MVP              |
| 5  | **Multi-language support**                                                              | Vòng 1 chỉ phục vụ tiếng Việt. Tiếng Anh/khác nếu có user nước ngoài.                                     | Phase 3               |
| 6  | **Accessibility for elderly** (large fonts, voice input, audio feedback)                | Quan trọng nhưng cần design system riêng. Hiện tại dùng mobile-first responsive.                                | Phase 2               |
| 7  | **Offline strategy beyond PWA basics**                                                  | PWA caching đã có (sw.js). Offline "tưới cây" + sync khi online cần thêm logic conflict resolution.            | Phase 2               |
| 8  | **Family calendar conflict resolution** (cross-city, cross-store)                       | Batch suggestion hiện tại giả định 1 Long Châu gần nhất. Multi-store optimization cần location-based routing. | Phase 2               |
| 9  | **Care Plan versioning khi business rules thay đổi**                                  | MVP demo chưa cần. Production cần versioned care plan + migration path cho user cũ.                                | Tại MVP              |
| 10 | **Two-way sync với FRT loyalty system hiện tại**                                     | MVP dùng điểm riêng cho LC Care. Sync 2 chiều cần API integration + business alignment.                          | Tại MVP integration  |

**Cách trả lời giám khảo khi hỏi**: *"Chúng tôi đã xác định 10 edge cases/requirements quan trọng và deliberately defer chúng tới Phase 2-3 hoặc pre-launch. Đây là scope discipline — không phải oversight. Mỗi item đều có rationale rõ ràng."*

---

## Verification After Update

The updated plan answers 5 critical questions:

1. **"What happens to a pregnant user's plant after birth?"** → Lotus graduates to `graduated` status (never dead), harvest animation + badge "Mẹ Sen Vàng", auto-create Lemongrass for mẹ + Perilla for bé, badge stored permanently in family garden.
2. **"Which pharmacist approves a queue item?"** → Care Team trung tâm (5-10 DS chuyên trách online): General (routine non-auto, ≤2h) → Specialist (chuyên khoa, ≤2h) → Care Team Lead (urgent escalation, ≤5m). Auto-redistribute khi chênh lệch >15 items. DS tại quầy = zero impact.
3. **"If urgent and no DS online?"** → SLA escalation: 5-min broadcast to all online DS + SMS → 15-min auto-clinic referral message to user with hotline → 30-min SMS + email escalation report to Regional Lead.
4. **"If AI brief misleads pharmacist?"** → Pharmacist is primary liable (chữ ký điện tử). AI is secondary system actor. Full audit trail: input data → AI draft → pharmacist edit → approved final — all versions stored. Source tracking per data point. Pharmacy Council compliant.
5. **"How do you know users want this?"** → Validation roadmap (Phase 0.5): 100-user survey + 10 deep interviews in 2 weeks. Post-contest: 500-user closed beta with A/B test. KPIs that can kill the concept: ≥40% water ≥3x/week, ≥30% link family, ≥60% pharmacist value. If data says no → pivot.

---

*Tài liệu này chỉ dùng nội bộ và cho cuộc thi. KHÔNG publish lên Confluence/Jira.*
