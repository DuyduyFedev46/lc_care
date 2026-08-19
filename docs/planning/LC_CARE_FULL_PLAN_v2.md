# Long Chau Care — Full Project Plan v2 (FastAPI + Firebase + Google Stack)

> **Tagline**: *"Thức tỉnh sức khỏe — Dẫn lối đổi mới"*
> **Version**: v3.1 · 2026-05-20
> **Stack**: FastAPI Python + React/Vite PWA + Firebase Firestore + Google Cloud
> **Principle**: Pyramid 70/20/10 — 70% rule-based, 20% hybrid, 10% AI generation

---

## Context

Dự án đã migrate từ Firebase Functions (JS) sang FastAPI Python backend. Frontend từ single-page HTML sang React/Vite PWA đa component. Hệ thống cây mở rộng lên 15 nhóm (G1-G15). Demo cho cuộc thi.

---

## Phase 0 — Cleanup

Đã hoàn thành:

```bash
rm -rf lc-care-assistant/       # bộ harness quá nặng, không cần
rm -rf pwt-assistant/           # project mẫu không liên quan
```

Giữ lại toàn bộ doc + demo:

| File/Folder                           | Purpose                                     |
| ------------------------------------- | ------------------------------------------- |
| `agents.md`                         | Rule cho người đọc                      |
| `idea.md`                           | Big idea                                    |
| `solution-design_v2.md`             | Kiến trúc (updated)                       |
| `long-chau-care-decision-tree.html` | Decision tree + 5 user flows (giữ nguyên) |
| `lc-care-e2e.*`                     | Diagram E2E                                 |
| `frontend/`                         | React/Vite PWA                              |
| `backend/`                          | FastAPI Python API                          |

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

---

## Phase 1 — Kiến trúc tổng thể (Actual Stack)

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND — React/Vite PWA               │
│           frontend/src/                              │
│           Multi-component, mobile-first              │
│           REST API calls to backend                  │
└──────────────┬──────────────────────────────────────┘
               │
               │  HTTP/REST (port 8000)
               │
┌──────────────▼──────────────────────────────────────┐
│           BACKEND — FastAPI Python                   │
│           backend/main.py                            │
│           ┌──────────────────────────────────┐       │
│           │ 10 Service Routers:               │       │
│           │ ├── auth                          │       │
│           │ ├── onboarding (submit, status)    │       │
│           │ ├── garden (summary, water, badges)│       │
│           │ ├── careplan                       │       │
│           │ ├── pharmacist (queue, review)     │       │
│           │ ├── family (info, calendar)        │       │
│           │ ├── purchase                       │       │
│           │ ├── upload (OCR, documents)        │       │
│           │ ├── voucher (list, redeem)         │       │
│           │ ├── notification                   │       │
│           │ └── ai (summary, insights)         │       │
│           └──────────────────────────────────┘       │
│                                                      │
│           AI Layer:                                  │
│           ├── ai/client.py (Gemini Flash)            │
│           ├── ai/guardrails.py (Rule #0 compliance)  │
│           ├── ai/prompt_manager.py                   │
│           └── ai/prompts/ (7 templates)              │
└──────────┬──────────────────────────────────────────┘
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
 Firebase  Google  Google
 Auth     Cloud   Cloud
 +Fire-   Vision  Scheduler
 store    (OCR)   (planned)
```

### Services Mapping

| Google Service           | Dùng cho                                                                        | Cost (est)                |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------- |
| Firebase Auth            | Đăng nhập user (email, Google, anonymous demo)                                | Free tier                 |
| Firestore                | Toàn bộ database                                                               | Free tier (đủ cho demo) |
| Firebase Hosting         | Deploy PWA + custom domain                                                       | Free tier                 |
| Firebase Cloud Messaging | Push notification "Tưới cây" 7h sáng                                         | Free                      |
| Google Cloud Vision      | OCR đơn thuốc                                                                 | Free tier 1000 req/tháng |
| Google Cloud Scheduler   | Cron job: nhắc hàng ngày, check refill (planned)                               | Free                      |
| Gemini Flash API         | AI wording (10% use case)                                                        | $0.001/call               |

---

## Phase 2 — Firestore Data Model

### Collections

```
users/{userId}
├── profile/info: { name, email, phone, gender, yearOfBirth, careFor,
│     healthStatus, exercise, chronicSubConditions, lifeChanges, badHabits }
├── healthConditions/{condId}
│     { condition, subCondition, source, sourceReference, createdAt }
├── carePlans/{planId}
│     { journeyType, journeyLabel, plantType, plantLevel, plantStatus: growing|pending|mature|paused|graduated,
│       plantGroup: G1-G14, plantLabel, plantEmoji, conditionSource,
│       pharmacistApproved, needsPharmacist, habits[], stageNames[],
│       conditionVerifiedBy, createdAt }
├── prescriptions/{prescId}
│     { imageUrl, ocrRawText, ocrConfidence,
│       verificationStatus: pending|verified|rejected,
│       verifiedBy, verifiedAt }
├── adherenceEvents/{eventId}
│     { carePlanId, eventType: med_taken|vital_logged|checkup_done,
│       pointsEarned, timestamp }
├── familyMembers/{memberId}
│     { id, name, relationship, yearOfBirth, gender, healthStatus }
└── loyaltySummary/info
      { totalPoints, familyPoints, tier, voucherHistory[] }

pharmacistQueue/{draftId}
    { userId, status: pending|approved|rejected,
      priority: low|medium|high|urgent,
      plantGroup, plantType, plantLabel,
      healthStatus, chronicSubConditions,
      aiSummary, submittedAt,
      reviewedBy, reviewedAt, pharmacistNote }

families/{familyId}
    { name, members[], totalPoints, monthlyStats }

insights/{insightId}
    { userId, insightType: streak_milestone|weekly_summary|encouragement,
      content, generatedAt, model: rule|gemini-flash, reviewed: bool }
```

### 15 Nhóm Cây Thảo Dược — G1 đến G15

Mỗi người dùng được gán **đúng 1 cây** dựa trên rule-based assignment. 7 nhóm cần Dược sĩ duyệt (Medical Groups), 8 nhóm auto-approve.

| Group | Cây           | Tiếng Anh    | Emoji | Màu     | DS duyệt? | Hành trình                      |
| ----- | ------------- | ------------ | ----- | ------- | --------- | ------------------------------- |
| G1    | Bạc Hà      | Mint         | 🌿    | #10B981 | Không     | Default / Khỏe mạnh          |
| G2    | Gừng         | Ginger       | 🫚    | #00923F | **Có**    | Theo dõi chỉ số (HA)         |
| G3    | Khổ Qua      | Bitter Melon | 🥒    | #65A30D | **Có**    | Mãn tính (Tiểu đường)       |
| G4    | Sen           | Lotus        | 🪷    | #DB2777 | Không     | Thai sản / Sau sinh           |
| G5    | Húng Quế    | Basil        | 🌿    | #F59E0B | Không     | Trẻ em / Thanh thiếu niên     |
| G6    | Lô Hội       | Aloe         | 🪴    | #059669 | Không     | Người cao tuổi (60+)          |
| G7    | Nghệ         | Turmeric     | 🟡    | #D97706 | **Có**    | Hồi phục / Viêm              |
| G8    | Oải Hương   | Lavender     | 🪻    | #7C3AED | **Có**    | Sức khỏe tinh thần           |
| G9    | Nhân Sâm     | Ginseng      | 🥔    | #9CA3AF | Không     | Vận động tích cực             |
| G10   | Rau Má       | Pennywort    | 🌾    | #0284C7 | Không     | Ít vận động / Ngồi nhiều   |
| G11   | Cam Thảo     | Licorice     | 🌿    | #B45309 | Không     | Chăm sóc gia đình             |
| G12   | Sả           | Lemongrass   | 🌿    | #4A8A40 | Không     | Thanh lọc / Vận động          |
| G13   | Đỗ Trọng    | Eucommia     | 🌳    | #8B5CF6 | **Có**    | Xương khớp                     |
| G14   | Diệp Hạ Châu | Phyllanthus  | 🌿    | #059669 | **Có**    | Tiêu hóa / Gan                |
| G15   | Lá Trà       | Tea          | 🍵    | #3B82F6 | **Có**    | Mỡ máu / Cholesterol            |

**Medical Groups (cần DS duyệt)**: G2, G3, G7, G8, G13, G14, G15

### Condition → Plant Mapping (cho G3 — Mãn tính)

| Tình trạng          | Cây           |
| ------------------- | ------------- |
| Tiểu đường        | Khổ Qua (G3) |
| Huyết áp           | Gừng (G2)    |
| Mỡ máu             | Lá Trà       |
| Xương khớp         | Đỗ Trọng (G13) |
| Tiêu hóa / Gan     | Diệp Hạ Châu (G14) |

### Cây không bao giờ chết

`plantStatus` enum: `growing` → `mature` → `paused` (tạm ngưng) hoặc `graduated` (hành trình có thời hạn). **Không có trạng thái `dead`.**

---

## Phase 3 — Backend Services (FastAPI Python)

### Cấu trúc backend

```
backend/
├── main.py                     ← FastAPI app, 10 routers mounted
├── config.py                   ← CORS, Firebase config
├── services/
│   ├── firebase_init.py        ← Firestore DB singleton
│   ├── auth/router.py          ← POST /api/auth/*
│   ├── onboarding/
│   │   ├── router.py           ← POST /api/onboarding/submit, GET /api/onboarding/status/{id}
│   │   └── service.py          ← Rule-based plant assignment + Firestore write + AI summary + pharmacist queue
│   │                              + generate_habits() call cho auto-approve groups [Session 6]
│   ├── garden/
│   │   ├── router.py           ← GET /api/garden, POST /api/garden/water, GET /api/garden/badges
│   │   └── service.py          ← Streak, points, plant status
│   ├── careplan/
│   │   ├── router.py           ← GET /api/careplan
│   │   │                          PATCH /api/careplan/{plan_id}/habits/{habit_id} [Session 6]
│   │   │                          POST  /api/careplan/{plan_id}/habits [Session 6 — custom habit]
│   │   ├── service.py          ← Care plan CRUD + generate_habits() + update_habit() + add_custom_habit() [Session 6]
│   │   └── habit_catalog.py    ← 15 nhóm × (3 default + 2 optional) = 75 habit templates [Session 6]
│   ├── pharmacist/
│   │   ├── router.py           ← GET /api/pharmacist/queue
│   │   └── service.py          ← Queue management, approve/reject
│   ├── family/
│   │   ├── router.py           ← GET /api/family, GET /api/family/calendar
│   │   └── service.py          ← Family graph, member management
│   ├── purchase/router.py      ← GET /api/purchase
│   ├── upload/
│   │   ├── router.py           ← POST /api/upload/*
│   │   ├── service.py          ← Cloud Vision OCR, document processing
│   │   └── models.py           ← Upload data models
│   ├── voucher/
│   │   ├── router.py           ← GET /api/voucher, POST /api/voucher/redeem/{id}
│   │   └── service.py          ← Voucher whitelist, point redemption
│   └── notification/
│       ├── router.py           ← POST /api/notification/*
│       └── service.py          ← FCM push
├── ai/
│   ├── client.py               ← Gemini Flash wrapper
│   ├── guardrails.py           ← Rule #0 compliance: banned patterns, exact phrases, disclaimer check
│   ├── prompt_manager.py       ← Template rendering
│   ├── router.py               ← POST /api/ai/*
│   └── prompts/
│       ├── system_prompt.txt
│       ├── onboarding_summary.txt
│       ├── ocr_summary.txt
│       ├── purchase_summary.txt
│       ├── insight_cross_member.txt
│       ├── habit_suggestion.txt
│       ├── careplan_habits.txt  ← AI cá nhân hóa habits từ catalog [Session 6]
│       └── admin_summary.txt
├── middleware/auth.py           ← Firebase Auth verification
└── scripts/seed_firestore.py   ← Seed data for demo
```

### 3.1 Onboarding Service — Quy trình gán cây (Rule-based)

**Trigger**: `POST /api/onboarding/submit`

**Logic**:
1. Save user profile vào Firestore
2. Save health conditions (self-report, có source tracking)
3. Rule-based plant assignment theo priority:
   - Priority 1 — Medical: chronic → disease-to-plant mapping. mental → Oải Hương (G8). recovery → Nghệ (G7). monitoring → Gừng (G2)
   - Priority 2 — Life stage: age < 18 → Húng Quế (G5). age ≥ 60 → Lô Hội (G6). pregnant → Sen (G4)
   - Priority 3 — Lifestyle: active → Nhân Sâm (G9). family → Cam Thảo (G11). sedentary → Rau Má (G10)
   - Default → Bạc Hà (G1)
4. Create care plan với `plantStatus: "growing"` (auto) hoặc `"pending"` (needs pharmacist)
   - Auto-approve groups (G1, G4, G5, G6, G9, G10, G11, G12): generate_habits() → lưu vào carePlans/{}/habits [Session 6]
   - Medical groups: habits = [], habitSource = "pending_pharmacist"
5. Nếu Medical Group (G2, G3, G7, G8, G13, G14, G15) → push vào pharmacistQueue
6. Generate AI onboarding summary (Gemini Flash) — có guardrails check
7. Init loyalty summary
8. Return: plant info, approval status, AI summary, **habits[], planId** [Session 6]

**Pyramid**: 80% Rule, 20% AI (onboarding summary wording)

### 3.2 Garden Service — Tưới cây + Streak

**Endpoint**: `GET /api/garden`, `POST /api/garden/water`

**Logic**:
- Rule: Update streak, calculate points (+10 base)
- Rule: Nếu quên ≥3 ngày → plantStatus = 'paused'
- Rule: Fraud guard: max 2 events/ngày

**Data Separation**:
- `adherenceEvents` (tưới cây) = ENGAGEMENT metric (streak, points, garden UI, DAU)
- `purchaseHistory` (FP transaction) = CLINICAL metric (refill alert, Care Team triage)
- Hai hệ thống KHÔNG mix

**Pyramid**: 100% Rule

### 3.3 Pharmacist Service — Duyệt Queue

**Endpoint**: `GET /api/pharmacist/queue`

**Logic**:
- Hiển thị queue items đang chờ duyệt
- Mỗi item có: userId, plantGroup, plantType, healthStatus, AI summary, submitted time
- Pharmacist approve/reject → cập nhật care plan status
- Audit log từng action

**Pyramid**: 100% Rule

### 3.4 AI Service — Insight + Summary

**Endpoint**: `POST /api/ai/*`

**Logic**:
- Gemini Flash wrapper với retry + fallback
- Guardrails: banned patterns check trước khi return
- Prompt templates: onboarding_summary, ocr_summary, purchase_summary, habit_suggestion, insight_cross_member, admin_summary
- Disclaimer bắt buộc trong mọi output

**Pyramid**: 50% Rule (template, fallback), 50% AI (wording)

### 3.5 Upload Service — OCR Đơn thuốc

**Endpoint**: `POST /api/upload/*`

**Logic**:
- Google Cloud Vision OCR → extract text
- Lưu kết quả OCR (raw text + confidence)
- Nếu confidence < 0.7 → flag cho pharmacist manual review
- Pharmacist sees: original image + OCR text side-by-side

**Pyramid**: 90% Rule, 10% Hybrid (Cloud Vision API call)

### 3.6 Family Service — Family Graph + Calendar

**Endpoint**: `GET /api/family`, `GET /api/family/calendar`

**Logic**:
- Lấy family members từ Firestore
- Calendar: aggregate lịch của tất cả members
- Hiển thị weekly timeline

**Status**: Basic implementation. AI calendar summary + batching optimization planned.

**Pyramid**: 100% Rule (hiện tại)

---

## Phase 4 — Frontend Screens (React/Vite PWA)

### Cấu trúc frontend

```
frontend/
├── src/
│   ├── main.jsx                     ← React entry
│   ├── App.jsx                      ← Router: 13 màn hình
│   ├── context/AppContext.jsx       ← Global state (screen, userProfile, plant, streak, points)
│   ├── components/
│   │   ├── DesignTokens.js          ← Colors, typography, spacing
│   │   ├── PlantComponents.jsx      ← Reusable plant UI
│   │   └── SharedUI.jsx             ← BottomNav, Toast, common elements
│   ├── config/
│   │   ├── constants.js             ← ICONS, PLANTS_DATA, app constants
│   │   ├── plantAssignment.js       ← 14 groups, assignPlant(), disease mapping
│   │   └── ai-prompts.js            ← Frontend prompt configs
│   ├── screens/
│   │   ├── onboarding/
│   │   │   ├── OnboardingScreen.jsx  ← Container, routes 7 steps
│   │   │   ├── WelcomeStep.jsx       ← Step 1: Gender, year, careFor
│   │   │   ├── HealthScanStep.jsx    ← Step 2: Health status + OCR upload
│   │   │   ├── CycleTrackingStep.jsx ← Step 3: Cycle tracking (nữ only)
│   │   │   ├── LifeChangesStep.jsx   ← Step 4: Recent life changes
│   │   │   ├── HabitsStep.jsx        ← Step 5: Exercise + habits
│   │   │   ├── PlantSelectStep.jsx   ← Step 6: Plant selection (14 cây)
│   │   │   └── SeedPlantedStep.jsx   ← Step 7: Submit + celebration
│   │   ├── garden/
│   │   │   ├── GardenScreen.jsx      ← Main garden view
│   │   │   ├── WaterScreen.jsx       ← Tưới cây action
│   │   │   ├── GerminationScreen.jsx ← Cây nảy mầm
│   │   │   └── LevelUpScreen.jsx     ← Cây lên level
│   │   ├── family/
│   │   │   ├── FamilyScreen.jsx      ← Family members view
│   │   │   └── CalendarScreen.jsx    ← Family calendar
│   │   ├── pharmacist/
│   │   │   └── PharmacistScreen.jsx  ← DS dashboard + queue
│   │   ├── voucher/
│   │   │   └── VoucherScreen.jsx     ← Voucher redemption
│   │   ├── careplan/
│   │   │   └── CarePlanScreen.jsx    ← Care plan detail
│   │   └── profile/
│   │       └── ProfileScreen.jsx     ← User profile
│   └── services/
│       ├── api.js                   ← Axios instance
│       ├── dataService.js           ← API methods (garden, family, onboarding, voucher...)
│       ├── uploadService.js         ← OCR upload + AI summary
│       └── firebase.js              ← Firebase SDK init
├── public/
│   └── assets/                      ← Icons, images
├── vite.config.js
└── package.json
```

### Screen Map

| #  | Screen             | Key                    | Nội dung                                                  | Pyramid      |
| -- | ------------------ | ---------------------- | --------------------------------------------------------- | ------------ |
| 1  | Welcome            | welcome                | Giới tính, năm sinh, careFor                           | Rule         |
| 2  | Health Scan        | health-scan            | Health status + OCR upload + chronic sub-conditions       | Rule + AI    |
| 3  | Cycle Tracking     | cycle-tracking         | Chu kỳ (nữ only) — ngày bắt đầu, độ dài             | Rule         |
| 4  | Life Changes       | life-changes           | Thay đổi cuộc sống gần đây                            | Rule         |
| 5  | Habits             | habits                 | Vận động + thói quen cần cải thiện                     | Rule         |
| 6  | Plant Select       | plant-select           | Chọn cây ưu tiên (14 cây) — rule-based suggestion       | Rule         |
| 7  | Seed Planted       | seed-planted           | Gửi hồ sơ → loading → kết quả + AI summary           | Rule + AI    |
| 8  | Garden             | home                   | Main garden: cây + streak + nút tưới                    | Rule         |
| 9  | Water Action       | water-action           | Tưới cây animation                                        | Rule         |
| 10 | Germination        | germination            | Cây nảy mầm                                              | Rule         |
| 11 | Level Up           | level-up               | Cây lên level                                            | Rule         |
| 12 | Voucher            | voucher                | Đổi điểm, whitelist check                               | Rule         |
| 13 | Family             | tab-family             | Garden gia đình                                          | Rule         |
| 14 | Calendar           | tab-calendar           | Family calendar weekly view                               | Rule         |
| 15 | Care Plan          | tab-care               | Care plan detail + AI insight                             | Rule + AI    |
| 16 | Profile            | tab-profile            | User profile + settings                                   | Rule         |
| 17 | Pharmacist         | pharmacist             | DS dashboard + queue duyệt                                | Rule + AI    |

*Ghi chú: PWA sử dụng 17 routes logic (bao gồm 7 bước onboarding), tương ứng với 11 unique screen component files.*

---

## Phase 5 — Pyramid 70/20/10 Mapping

```
                     ▲
                    ╱ ╲
                   ╱10%╲          AI onboarding summary (Gemini Flash wording)
                  ╱─────╲         AI insight wording, encouragement messages
                 ╱       ╲        ─────────────────────────────
                ╱  20%    ╲       OCR text extraction (Cloud Vision)
               ╱  HYBRID   ╲      AI guardrails + prompt management
              ╱─────────────╲     Context aggregation for AI prompts
             ╱               ╲    ─────────────────────────────
            ╱     70%         ╲   Plant assignment (rule-based, 14 groups)
           ╱     RULE-BASED    ╲  Streak counting, point calculation
          ╱                     ╲ Refill date check, plant status
         ╱───────────────────────╲ Family graph traversal, voucher whitelist
        ╱_________________________╲ Pharmacist queue, audit log, OCR queue
```

| Layer  | %   | Features                                                                           | Technology                        |
| ------ | --- | ---------------------------------------------------------------------------------- | --------------------------------- |
| Rule   | 70% | Streak, points, plant assignment (15 groups), plant status, family graph, voucher whitelist, pharmacist queue, OCR queue, audit log | FastAPI Python + Firestore        |
| Hybrid | 20% | OCR text extraction (Cloud Vision), AI guardrails, prompt template system, context aggregation | Cloud Vision + Gemini Flash + rule |
| AI     | 10% | Onboarding summary wording, insight wording, habit suggestions, encouragement message | Gemini Flash (fallback) / DeepSeek (primary) API via ai/client.py |

---

## Phase 6 — 15 Nhóm Cây Chi Tiết

### Rule-based Assignment Logic (frontend + backend đồng bộ)

File: `frontend/src/config/plantAssignment.js` và `backend/services/onboarding/service.py`

**Priority 1 — Medical:**
```
healthStatus = "chronic" + subs → disease-to-plant mapping → Medical Group
healthStatus = "mental"       → G8 (Oải Hương) — Medical
healthStatus = "recovery"     → G7 (Nghệ) — Medical
healthStatus = "monitoring"   → G2 (Gừng) — Medical
```

**Priority 2 — Life Stage:**
```
age < 18          → G5 (Húng Quế)
age ≥ 60         → G6 (Lô Hội)
healthStatus = "pregnant" → G4 (Sen)
```

**Priority 3 — Lifestyle:**
```
exercise = "active"   → G9 (Nhân Sâm)
careFor = "family"    → G11 (Cam Thảo)
exercise = "sedentary" → G10 (Rau Má)
```

**Default:**
```
→ G1 (Bạc Hà)
```

### Medical Groups (cần Pharmacist duyệt)

| Group | Cây           | Lý do cần DS                                     |
| ----- | ------------- | ------------------------------------------------ |
| G2    | Gừng         | Liên quan tim mạch — cần DS verify huyết áp    |
| G3    | Khổ Qua      | Liên quan tiểu đường — cần DS verify đường huyết |
| G7    | Nghệ         | Liên quan viêm/khớp — cần DS đánh giá lâm sàng |
| G8    | Oải Hương   | Liên quan tâm lý — cần DS đánh giá             |
| G13   | Đỗ Trọng    | Liên quan xương khớp — cần DS verify            |
| G14   | Diệp Hạ Châu | Liên quan tiêu hóa/gan — cần DS verify           |
| G15   | Lá Trà       | Liên quan mỡ máu — cần DS verify                |

---

## Phase 7 — Deployment

### Frontend (Firebase Hosting)

```bash
cd frontend
npm run build        # Build ra dist/
firebase deploy --only hosting
```

### Backend (Docker / Cloud Run)

```bash
cd backend
./run.sh             # Uvicorn on port 8000
# hoặc
docker build -t lc-care-backend .
docker run -p 8000:8000 lc-care-backend
```

---

## Phase 8 — Implementation Status (20/5/2026)

### Done ✅

- Frontend: 17 screens (7 onboarding + 10 main routing states via 11 distinct component files)
- Backend: 10 service routers, FastAPI app
- AI: guardrails.py (3 layers), prompt_manager, 8 prompt templates, Dual AI provider (DeepSeek + Gemini)
- Plant system: 15 groups (G1-G15), rule-based assignment
- OCR: Google Cloud Vision integration
- Onboarding flow: 7 steps, end-to-end
- Pharmacist queue: basic implementation
- Garden: plant view, streak, water action, plant-themed colors
- Firestore: collections for onboarding, care plans, pharmacist queue
- Plant-themed homepage: 15 cây × unique color palette, AI summary card, journey badge [Session 5]
- **AI Care Plan & Daily Habits [Session 6A-6C]:**
  - `habit_catalog.py`: 15 cây × 3 default + 2 optional = 75 habit templates
  - `careplan_habits.txt`: AI prompt cá nhân hóa dựa trên badHabits, exercise, careFor
  - `careplan/service.py`: generate_habits(), update_habit(), add_custom_habit()
  - `onboarding/service.py`: auto-approve → generate habits ngay sau gán cây, trả habits + planId
  - `careplan/router.py`: PATCH /{plan_id}/habits/{habit_id}, POST /{plan_id}/habits
  - `AppContext.jsx`: load habits từ care plan khi init, toggleHabitActive(), addCustomHabit()
  - `GardenScreen.jsx`: active habits (HÔM NAY x/3), optional unlock section, custom habit modal
  - Tưới cây = đánh dấu habit done ✅

### In Progress / Planned

- [ ] **Session 7 — Pharmacist Habit Flow** (xem Phase 9 bên dưới)
- [ ] Scheduler: cron jobs (daily reminder, refill check, weekly calendar)
- [ ] Family Calendar AI CTA: weekly summary + batching optimization
- [ ] Insight cards: AI-generated weekly summary
- [ ] Urgent SLA escalation chain
- [ ] Cross-validation agent (adherence vs purchase)
- [ ] FCM push notifications
- [ ] Voucher whitelist enforcement
- [ ] Full medical_audit_log
- [ ] Family calendar conflict resolution
- [ ] E2E tests for 11 scenarios

---

## Phase 9 — Session 7: Pharmacist Habit Flow (Planned)

> **Scope**: 7 Medical Groups (G2, G3, G7, G8, G13, G14, G15) — DS duyệt + chọn habits trước khi push tới KH.

### Flow

```
Onboarding (Medical Group)
        │
        ▼
AI tạo draft habits từ catalog
(không push tới KH, lưu vào pharmacistQueue.suggestedHabits)
        │
        ▼
Pharmacist xem:
  ✅ Summary sức khỏe (AI tóm tắt hành vi mua thuốc)
  ✅ Danh sách habits AI gợi ý (checkbox)
  ✅ Tick/untick, thêm note, sửa tên
  ✅ Nút "Duyệt & Gửi Care Plan"
        │
        ▼
KH nhận thông báo: "Care Plan đã sẵn sàng"
Homepage hiện habits từ DS
```

### Files cần làm

| File | Thay đổi |
|------|----------|
| `backend/services/onboarding/service.py` | Medical group: generate draft habits, lưu vào queue.suggestedHabits |
| `backend/services/pharmacist/service.py` | `approve_with_habits(queue_id, selected_habits)` → write vào user carePlans |
| `backend/services/pharmacist/router.py` | `POST /pharmacist/queue/{id}/approve-habits` |
| `frontend/src/screens/pharmacist/PharmacistScreen.jsx` | Hiện checkbox habits AI gợi ý, nút Duyệt |

### Estimated effort: 1 session (2-3h)

## Care Team Operations

> **Nguyên tắc cốt lõi**: DS tại 3,000 nhà thuốc = KHÔNG thay đổi gì. Vẫn bán hàng như hiện tại.
> 70% output là template cố định → auto-send. 30% non-routine → Care Team trung tâm (5-10 DS chuyên trách online).

### Phân loại Output: Routine vs Non-Routine (giữ nguyên từ plan gốc)

| Output Type                             | Category       | Action                         |
| --------------------------------------- | -------------- | ------------------------------ |
| Nhắc uống thuốc 7h sáng             | ROUTINE     | Auto-send                      |
| Nhắc refill đúng lịch              | ROUTINE     | Auto-send                      |
| Streak milestone (7/14/30 ngày)        | ROUTINE     | Auto-send                      |
| Lịch tiêm chủng CDC theo tuổi      | ROUTINE     | Auto-send                      |
| Weekly garden summary                   | ROUTINE     | Auto-send                      |
| **Onboarding gán cây (Medical Groups)** | NON-ROUTINE | Care Team review               |
| **OCR verify đơn thuốc**       | NON-ROUTINE | Care Team review               |
| **AI-generated insight wording**  | NON-ROUTINE | Care Team review               |
| **Urgent case**                   | NON-ROUTINE | Care Team review (SLA 5 phút) |
| Trễ refill >35 ngày                   | NON-ROUTINE | Care Team review               |

---

## SLA Escalation (Planned)

```
severity = urgent
     │
     ▼
Care Team notified (push + in-app)
     │
     ├── 5 phút không phản hồi → BROADCAST tới tất cả Care Team DS
     ├── 15 phút không phản hồi → AUTO-REFERRAL message tới user
     └── 30 phút → Care Team Lead nhận SMS + email escalation
```

---

## Compliance & Guardrails

### 5 Nguyên Tắc Tuyệt Đối (giữ nguyên)

| # | Nguyên tắc                            | Cơ chế                                                                  |
| - | --------------------------------------- | ------------------------------------------------------------------------- |
| 1 | AI không tự chẩn đoán              | Routine auto-send. Non-routine qua Care Team DS gate                      |
| 2 | Mọi bệnh lý phải có nguồn hợp pháp | `health_conditions.source_type` enforce 5 nguồn                        |
| 3 | Cây không bao giờ chết              | `plant_status` không có `'dead'`, chỉ `'paused'` hoặc `'graduated'` |
| 4 | Voucher không cho thuốc kê đơn     | Whitelist SKU: TPCN, bông băng, nước muối, dịch vụ Lab/Vac         |
| 5 | Data mã hóa theo Bộ Y tế            | Encrypt at rest + audit log đầy đủ                                    |

### AI Guardrails Implementation (backend/ai/guardrails.py)

**Lớp 1 — Từ cấm (Banned Patterns)**:
- Regex patterns chặn suy ra bệnh từ thuốc, chẩn đoán, kê đơn, đề xuất cây
- 10 banned regex patterns + 4 exact phrases

**Lớp 2 — Disclaimer bắt buộc**:
- AI output phải nhắc Dược sĩ/BS xem xét

**Lớp 3 — Audit**:
- Mọi AI output ghi model + reviewed status

---

## Differentiator — Why LC Care Wins

| Đối thủ                         | Thiếu gì so với LC Care                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| Apple Health / Google Fit          | Không có family wallet, không có transaction y tế thực, không có pharmacist  |
| App online thuần (Jio, Medigo...) | Không có sensor vật lý (Trạm), không có 3 chuỗi thật (Pharma+Lab+Vaccine) |
| App bệnh viện                    | Không gamify, không family-centric                                            |
| FP hiện tại                      | Chưa có health identity, chỉ là loyalty đơn thuần                         |

---

## Open Questions & Scope Decisions

Giữ nguyên 10 scope decisions từ plan gốc. Đây là deliberate deferrals, không phải oversights.

---

## Verification Checklist (11 scenarios)

1. Upload ảnh đơn thuốc → OCR function trả text
2. Dược sĩ verify + approve → Care Plan được tạo trong Firestore
3. User nhấn "Tưới cây" → streak +1, điểm +10
4. Streak chạm 7 → insight card xuất hiện
5. Trễ refill 35 ngày → alert vào pharmacist queue
6. Đổi voucher 300 điểm → whitelist check pass
7. Deploy → mở PWA trên điện thoại → Add to Home Screen
8. Onboarding flow end-to-end: 7 steps → plant assigned → AI summary → pharmacist queue (nếu Medical Group)
9. Medical Group onboarding → auto đẩy vào pharmacist queue với AI summary
10. Non-medical onboarding → auto-approve, cây kích hoạt ngay
11. OCR fallback: handwritten prescription → low confidence → pharmacist manual entry

---

*Tài liệu này chỉ dùng nội bộ và cho cuộc thi. KHÔNG publish lên Confluence/Jira.*
