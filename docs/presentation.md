# Long Châu Care — Competition Presentation

> **Cuộc thi**: Châu Thức — Topic số 2
> **Tagline**: *"Thức tỉnh sức khỏe — Dẫn lối đổi mới"*
> **Version**: v1.0 · 2026-05-13
> **Format**: Slide-by-slide content for presentation deck

---

## SLIDE 1 — COVER

**Long Châu Care — Khu Vườn Sức Khỏe Việt**

> "Thức tỉnh sức khỏe — Dẫn lối đổi mới"

_Mỗi gia đình Việt là một Khu Vườn Sức Khỏe._
_Mỗi thói quen tốt là một cây thảo dược._
_Cả nhà cùng vun trồng. Dược sĩ Long Châu đồng hành._

**Topic #2 — Châu Thức**
**FPT Long Châu — 2026**

---

## SLIDE 2 — PROBLEM STATEMENT

### 3 Nỗi Đau Của App KHLC Hiện Tại

| # | Vấn đề | Hệ quả |
|---|---|---|
| 1 | **App là kênh giao dịch, không phải bạn đồng hành** | DAU thấp — user mở app chỉ khi có bệnh, không có lý do "thuộc về" hàng ngày |
| 2 | **3 chuỗi rời rạc** (Pharmacy, Lab, Tiêm chủng) | User không biết Long Châu có Lab và Tiêm chủng — data không liên thông |
| 3 | **Trải nghiệm chung chung, thiếu cá nhân hóa** | Identity sai → user không muốn Long Châu hiểu mình → không share data |

### Chỉ số gắn kết thấp

- DAU thấp không vì thiếu feature, mà vì user không có lý do "thuộc về" Long Châu hàng ngày
- App KHLC hiện tại = "Shopee cho thuốc" — không phải health companion

> **Câu hỏi cốt lõi**: Làm sao để user mở app mỗi ngày KỂ CẢ KHI KHÔNG CÓ BỆNH?

---

## SLIDE 3 — BIG IDEA

### Từ "Nơi mua thuốc" → "Người bạn đồng hành sức khỏe gia đình"

```
TRƯỚC:                         SAU:
User mở app khi ốm           User mở app mỗi sáng để "tưới cây"
App = kênh giao dịch          App = Khu Vườn Sức Khỏe
Mua thuốc → Thoát            Tưới cây → Xem gia đình → Đổi voucher
1 người dùng                  Cả gia đình cùng tham gia
```

### Ẩn dụ Khu Vườn Thảo Dược Việt

7 cây thảo dược = 7 hành trình sức khỏe:

| 🫚 Gừng | 🟡 Nghệ | 🌿 Sả | 🌾 Rau má | 🍵 Lá trà | 🪷 Hoa Sen | 🍃 Tía tô |
|---|---|---|---|---|---|---|
| Uống thuốc đúng giờ | Theo dõi chỉ số | Vận động | Khám định kỳ | Tuân thủ dài hạn | Thai sản | Nhi khoa |

---

## SLIDE 4 — SOLUTION OVERVIEW

### Long Châu Care — 4 Phase Đồng Hành

```
HIỂU ──────── ĐỒNG HÀNH ──────── HÀNH ĐỘNG ──────── HỌC
(Health ID)   (Care Plan)       (Khu Vườn)       (AI + DS)
```

| Phase | Mô tả | "Wow" Factor |
|---|---|---|
| **HIỂU** | AI quét lịch sử mua thuốc → Dược sĩ xác minh → Health ID | AI không chẩn đoán — DS liên hệ thuốc ↔ bệnh ↔ cây |
| **ĐỒNG HÀNH** | 3 hành trình (Phòng ngừa/Phát hiện sớm/Điều trị) → mỗi hành trình có cây riêng | Care Plan số hóa cho từng nhóm |
| **HÀNH ĐỘNG** | Khu Vườn Thảo Dược — tưới cây = uống thuốc, streak = cây lớn | Gamification nhưng không "game hóa" sức khỏe |
| **HỌC** | AI phân tích cross-member pattern → DS đồng hành | "Mẹ điều trị tiểu đường → con 35t nên tầm soát" |

---

## SLIDE 5 — 5-TIER ARCHITECTURE

### Kiến trúc 5 tầng (đáp ứng tiêu chí giám khảo)

```
┌──────────────────────────────────────────────────┐
│ PRESENTATION — PWA (demo) → React Native (prod)  │
│ demo/public/index.html · 6 màn hình · mobile-first│
├──────────────────────────────────────────────────┤
│ APPLICATION — 6 Firebase Functions                │
│ ocr · adherence · pharmacy · family-calendar      │
│ insights · scheduler                              │
├──────────────────────────────────────────────────┤
│ AI/ML — 3-Layer Smart Gate                       │
│ Input (Data Agent) → Processing (Analysis)        │
│ → Output (70% Auto-send + 30% Care Team Gate)     │
├──────────────────────────────────────────────────┤
│ DATA — Firestore (7 collections) + PostgreSQL     │
│ Health ID · Care Plan · Adherence · Audit Log     │
├──────────────────────────────────────────────────┤
│ INFRASTRUCTURE — Firebase + Google Cloud          │
│ Auth · Hosting · Functions · FCM · Vision · Scheduler│
└──────────────────────────────────────────────────┘
```

| Tầng | Công nghệ (Demo) | Production |
|---|---|---|
| Presentation | PWA (HTML+JS) | React Native (App KHLC) |
| Application | Firebase Functions (Node.js 20) | NestJS microservices |
| AI/ML | Gemini Flash + Cloud Vision | Azure OpenAI + Internal LLM |
| Data | Firestore | PostgreSQL (reuse FP) + BigQuery |
| Infrastructure | Firebase + Google Cloud | FP Cloud (on-premise option) |

**Reuse strategy**: ~65% hạ tầng Family Package (FP) hiện có — Family graph, Loyalty, Gamification, Event streaming.

---

## SLIDE 6 — 6 DESIGN PRINCIPLES

### 6 Nguyên tắc thiết kế (đáp ứng tiêu chí giám khảo)

| # | Nguyên tắc | LC Care Implementation | Evidence |
|---|---|---|---|
| 1 | **Health-First** | AI không chẩn đoán. Non-routine qua Care Team DS gate | Rule #0 (agents.md) |
| 2 | **Privacy by Design** | Consent granular + AES-256 + User data rights | NĐ 13/2023/NĐ-CP compliance |
| 3 | **AI Augments, Never Replaces** | AI = secondary actor, DS = primary liable | AI Liability Chain |
| 4 | **Auditability** | medical_audit_log immutable + 5-bước traceability | Luật KCB 2023 |
| 5 | **Fail Safe** | SLA escalation + plant never dies + OCR fallback | TT 46/2018/TT-BYT |
| 6 | **MECE Ownership** | RACI: AI (Consulted), DS (Accountable), Dev (Responsible) | RACI matrix |

---

## SLIDE 7 — AI GOVERNANCE (5 GUARDRAILS)

### 5 Guardrails — Không có ngoại lệ

```
LỚP 1 — Từ cấm              LỚP 2 — Smart Gate          LỚP 3 — Audit
───────────────────    ───────────────────────    ──────────────────
AI bị cấm dùng:          ROUTINE: auto-send        Mọi output ghi vào
"bị bệnh", "mắc",        (template cố định)         medical_audit_log
"chẩn đoán", "điều trị"   NON-ROUTINE: Care Team    → truy xuất được
                          DS approve
```

| # | Guardrail | Cơ chế |
|---|---|---|
| 1 | AI không tự chẩn đoán | Routine template auto-send. Non-routine qua Care Team DS gate (5-10 DS chuyên trách) |
| 2 | Mọi bệnh lý có nguồn hợp pháp | 5 source_type: doctor_prescription, lab_with_doctor, vneid, self_report, citizen_station |
| 3 | Cây không bao giờ chết | plant_status không có 'dead', chỉ 'paused'/'graduated' |
| 4 | Voucher không cho thuốc kê đơn | Whitelist: bông băng, nước muối, TPCN cơ bản, Lab/Vac |
| 5 | Data mã hóa theo Bộ Y tế | AES-256 at rest + TLS 1.3 in transit |
| 6 | **Data Separation: Engagement ≠ Clinical** | "Tưới cây" = DAU metric (engagement). Refill alert = từ purchaseHistory (clinical truth). Hai hệ độc lập — không ai bị phạt vì quên tưới cây |

### Quy trình 4 bước khi AI sai

```
Detect ──→ Contain ──→ Notify ──→ Remediate
(Từ cấm)   (Block)    (1h)       (Root cause)
```

---

## SLIDE 7b — AI LIABILITY CHAIN (Điều 100 Luật KCB 2023)

### Truy Xuất Nguồn Gốc Từng Message Y Tế

```
User nhận message
     ↑
     │ 5. Final output — pharmacistLiabilitySignature
     │
Dược sĩ approve (PRIMARY LIABLE)
     ↑
     │ 4. pharmacistEditedResponse + pharmacistApprovedAt
     │
AI tạo draft (SECONDARY ACTOR — không phải pháp nhân)
     ↑
     │ 3. aiDraft + aiBrief + contextSnapshot
     │
Input data từ nguồn hợp pháp
     ↑
     │ 2. health_conditions.source_type (5 nguồn)
     │    + source_reference (link ảnh đơn/phiếu xét nghiệm)
     │
Giao dịch Long Châu (FP transaction)
     │ 1. purchaseHistory — raw data
```

**Nguyên tắc**: Mọi message y tế đến user đều trace ngược được 5 bước → về nguồn dữ liệu hợp pháp.

| Vai trò | Trách nhiệm pháp lý |
|---------|--------------------|
| **Dược sĩ** | PRIMARY LIABLE — chữ ký điện tử trên mọi non-routine output |
| **AI System** | SECONDARY ACTOR — tạo draft, không phải pháp nhân |
| **Dev Team** | RESPONSIBLE — xây hệ thống đúng quy trình |
| **User** | INFORMED — nhận output đã qua DS gate |

---

## SLIDE 8 — DATA GOVERNANCE

### Data Ownership & Control (NĐ 13/2023/NĐ-CP)

| Nguyên tắc | LC Care Implementation |
|---|---|
| **User là chủ dữ liệu** | Consent trước mọi data collection. Export/delete data bất kỳ lúc nào. |
| **Access Control (Zero-trust)** | Firestore rules: user chỉ đọc data của mình. DS chỉ đọc queue được assign. |
| **Retention (10 năm y tế)** | Demo: Firestore. Production: cold storage + policy riêng. |
| **Consent Granular** | Opt-in từng loại: đơn thuốc, chỉ số, family sharing. Có thể rút lại bất kỳ lúc nào. |

### 5 Nguồn dữ liệu hợp pháp

```
📄 Đơn thuốc BS ────┐
🧪 Lab có BS đọc ───┤
🆔 VNeID + Sổ SK ───┼──→ AI Tổng hợp ──→ Dược sĩ duyệt ──→ User
✍️ Self-report ─────┤
🏥 Trạm Công dân ───┘
```

---

## SLIDE 9 — USER FLOW (E2E Demo)

### 4 Bước Trải Nghiệm Chính

```
1. ONBOARDING                2. DAILY CARE
   "AI quét lịch sử             "7:00 sáng — Tưới cây
    mua thuốc 6 tháng"           Gừng — uống Amlodipine"
        │                              │
        ▼                              ▼
   AI tạo TÓM TẮT HÀNH CHÍNH     Streak +1, Điểm +10
   (KHÔNG suy ra bệnh)           Cả nhà thấy cây tươi
        │                              │
        ▼                              ▼
   DS liên hệ:                   Nếu quên 3 ngày →
   Amlodipine → HA → Gừng        Cây "ngủ đông"
         │                         (paused, KHÔNG chết)
         ▼
   "Cùng vun cây Gừng —          3. ALERT
    nhắc uống thuốc sáng?"          "Đã 35 ngày chưa refill"
                                          │
4. HARVEST                               ▼
   "28 ngày uống thuốc               Care Team DS duyệt
    đúng → Voucher 50k"              alert → Push nhắc refill
   Whitelist: Nước muối,
   C sủi, Lab, Tiêm chủng
```

---

## SLIDE 10 — FAMILY MOAT

### Khu Vườn Gia Đình — Moat Không Ai Copy Được

```
👵 Mẹ (Gừng — Điều trị HA)
👨 Bố (Rau má — Khám định kỳ)
👩‍🦰 Con gái (Sả — Vận động)
👶 Cháu (Tía tô — Tiêm chủng)
──────────────────────────────
Tất cả trong 1 Khu Vườn Gia Đình
```

**Tại sao đối thủ không copy được?**

| Đối thủ | Thiếu gì? |
|---|---|
| Apple Health / Google Fit | Không có family wallet, không có transaction y tế thực, không có pharmacist HITL |
| App online thuần | Không có sensor vật lý (Trạm), không có Pharma+Lab+Vaccine |
| App bệnh viện | Không gamify, không family-centric |
| FP hiện tại | Chưa có health identity — chỉ là loyalty |

### Cross-member Pattern (AI)

> "Mẹ điều trị tiểu đường → con 35 tuổi chưa tầm soát."
> AI phát hiện → DS duyệt → gợi ý: "Trồng Rau má cho con — gói HbA1c tại Lab?"

---

## SLIDE 11 — 5 "WOW" MOMENTS (DEMO)

### Những Khoảnh Khắc Đáng Nhớ Cho Giám Khảo

**1. AI Triage + Auto-approve (10x Faster)**
> Demo: 99+ đơn chờ tư vấn → 70% auto-send (routine template) + Care Team DS 15s review for 30% non-routine = **10x faster**
> Zero impact cho DS tại quầy. Nghề Clinical Pharmacist đầu tiên của chuỗi nhà thuốc VN.

**2. Family Calendar with AI CTA**
> "Tuần này gia đình anh có 3 việc tại Long Châu.
> Mẹ refill T2, Bin tiêm T4 — đặt chung tiết kiệm 1 chuyến."
> Proves "one family, many journeys."

**3. OCR with Pharmacist Verification**
> Demo 3 scenarios: typed prescription (OCR works), handwritten (DS manual), partial (hybrid).
> Passes Bộ Y tế audit.

**4. Lotus Graduation — Journey Có Thời Hạn**
> "Sen nở hoa sau 9 tháng thai sản → tốt nghiệp → auto tạo Sả cho mẹ + Tía tô cho bé."
> Proves hệ thống xử lý được journey có end date (thai sản, hậu phẫu, kháng sinh).
> Badge "Mẹ Sen Vàng" vĩnh viễn trong family garden.

**5. Urgent SLA Escalation in Real-Time**
> Demo: submit urgent case → 5 giây broadcast tới tất cả DS online → màn hình hiển thị escalation timer.
> Nếu 15 phút không phản hồi → auto-referral message + hotline.
> Nếu 30 phút → SMS + email escalation tới Regional Lead.
> Proves operational maturity — không phải chỉ "ý tưởng".

---

## SLIDE 11b — CARE TEAM DASHBOARD (HITL Proof)

### Pharmacist Review Queue — Human-in-the-Loop Trực Quan

```
┌─────────────────────────────────────────────────────────────┐
│  CARE TEAM DASHBOARD          DS: Nguyễn Thị A · Online 🟢 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 Hôm nay: 142 items │ Auto-sent: 99 │ Chờ duyệt: 43    │
│                                                             │
│  ┌─ QUEUE ──────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │  🔴 URGENT  Trần Văn B · Tương tác thuốc            │   │
│  │     Amlodipine + Ibuprofen · Severity: HIGH          │   │
│  │     AI Brief: "KH mua Ibuprofen hôm nay, đang dùng  │   │
│  │     Amlodipine 6 tháng. Tương tác trung bình."       │   │
│  │     [✅ Approve] [✏️ Edit] [❌ Reject]    ⏱ 2:34     │   │
│  │                                                      │   │
│  │  🟡 NORMAL  Lê Thị C · Onboarding suggestion        │   │
│  │     Metformin pattern → Draft: "Cùng trồng Nghệ?"   │   │
│  │     [✅ Approve] [✏️ Edit] [❌ Reject]    ⏱ 1:12:00  │   │
│  │                                                      │   │
│  │  🟢 ROUTINE (auto-sent, audit only)                  │   │
│  │     99 items · Streak nhắc · Refill nhắc · Lịch tiêm │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  SLA: Urgent ≤5min │ Normal ≤2h │ Auto-redistribute >15    │
└─────────────────────────────────────────────────────────────┘
```

| Loại | Xử lý | SLA |
|------|-------|-----|
| **Routine** (70%) | Auto-send bằng template cố định | Instant |
| **Normal non-routine** (25%) | DS review + approve/edit/reject | ≤ 2 giờ |
| **Urgent** (5%) | Broadcast tới tất cả DS online | ≤ 5 phút |

**Key insight**: DS tại 3,000 nhà thuốc = **zero impact**. Care Team trung tâm 5-10 DS chuyên trách xử lý toàn bộ non-routine.

---

## SLIDE 12 — VALIDATION ROADMAP

### Chúng tôi không giả định — Chúng tôi validate

> *"Long Châu Care is a hypothesis-driven concept inspired by 5 case studies (CVS Health, Ping An Good Doctor, Halodoc, Singapore HealthHub, Kakao Healthcare). We will validate with 100 users via survey and 10 deep interviews within the next 2 weeks, then closed beta with 500 users in months 1-2 post-launch. We commit to kill or pivot if KPIs below are not met."*

### KPIs Có Thể "Giết" Concept

| # | KPI | Target | Nếu không đạt |
|---|---|---|---|
| 1 | Garden adoption | ≥40% user tưới cây ≥3x/tuần | Kill hoặc redesign garden |
| 2 | Family link | ≥30% user link ≥1 thành viên | Cắt family feature |
| 3 | Care Team value | ≥60% đánh giá "useful" | Đơn giản hóa scope Care Team |
| 4 | Survey baseline | ≥50% interest với garden | Pivot approach khác |

---

## SLIDE 13 — IMPLEMENTATION ROADMAP

```
P0 — MVP Demo (4-6 tuần) ──→ P1 — Full Feature ──→ P2-3 — Scale
```

| Phase | Timeline | Deliverables |
|---|---|---|
| **P0 — MVP** | Tháng 5-6/2026 | 1 hành trình (Gừng) + Onboarding AI + Garden UI + Adherence tracker |
| **P1 — Full** | Tháng 7/2026 | 7 cây + Family Garden View + Pharmacist Dashboard + Voucher flow |
| **P2 — External** | Tháng 8/2026 | Prescription OCR + VNeID + Sổ SK điện tử |
| **P3 — Ecosystem** | Tháng 9+/2026 | Trạm Công dân số + AI Cross-member Pattern |

### Tech Stack (8 nhóm — đáp ứng tiêu chí giám khảo)

| Mobile | API | App | AI/ML | Data | Platform | Security | DevOps |
|---|---|---|---|---|---|---|---|
| PWA/RN | Functions | Node 20 | Gemini | Firestore | Kafka | Auth | GH Actions |

---

## SLIDE 14 — COMPLIANCE READINESS

### Khung pháp lý đã được đối chiếu

| Luật | Compliance Status |
|---|---|
| **Luật Khám chữa bệnh 2023** | ✅ AI không chẩn đoán. DS là primary liable. Audit trail đủ. |
| **Luật Dược 2016** | ✅ DS có CCHN. Voucher whitelist (không thuốc kê đơn). Tư vấn thuốc đúng phạm vi. |
| **Nghị định 13/2023/NĐ-CP** | ✅ AES-256 + TLS 1.3. Consent granular. User data rights. PIA trước launch. |
| **Thông tư 46/2018/TT-BYT** | ✅ Medical audit log. Source tracking. Sẵn sàng FHIR mapping. |
| **Nghị định 96/2023/NĐ-CP** | ✅ DS đăng ký hành nghề. GPP certified. Phạm vi chuyên môn rõ ràng. |

### RACI Matrix (7 Quyết Định Quan Trọng)

| Decision | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| AI output wording | AI System | **Care Team DS** | Product Owner | User |
| Cây gán cho user | AI (draft) | **Care Team DS** | — | User |
| Tạo Care Plan | Care Team DS | **Care Team Lead** | BS (nếu cần) | User |
| Cảnh báo tương tác thuốc | AI System | **Care Team DS** | — | User |
| Voucher whitelist | Dev Team | **Product Owner** | Legal | User |
| Data sharing với bên thứ 3 | — | **DPO** | Legal | User |
| Thay đổi Care Plan logic | Dev Team | **Product Owner** | DS trưởng | User |

---

## SLIDE 15 — OPEN QUESTIONS & SCOPE DECISIONS

### Deliberate Scope Decisions (Không phải "things we missed")

| # | Item | Defer đến | Rationale |
|---|---|---|---|
| 1 | Complex family models (ly hôn, già một mình) | Phase 2 | MVP cần family đơn giản |
| 2 | Granular family permissions (teen privacy) | Phase 2 | Cần consent framework riêng |
| 3 | Per-data-type consent flow | Pre-launch | Legal review required |
| 4 | Prescription 5-year retention (Luật KCB) | At MVP | Cần cold storage policy |
| 5 | Multi-language | Phase 3 | Vòng 1 chỉ tiếng Việt |
| 6 | Accessibility (large fonts, voice) | Phase 2 | Cần design system riêng |
| 7 | Offline strategy beyond PWA | Phase 2 | Conflict resolution logic |
| 8 | Family calendar cross-store conflict | Phase 2 | Location-based routing |
| 9 | Care Plan versioning | At MVP | Migration path cho user cũ |
| 10 | 2-way FRT loyalty sync | At MVP | API integration + BA alignment |

---

## SLIDE 16 — WHY LONG CHÂU CARE WINS

### Moat Độc Quyền — Không Ai Copy Được

| Moat | Tại sao chỉ Long Châu có? |
|---|---|
| **Lịch sử giao dịch y tế thực** | Mua thuốc, Lab, Tiêm chủng — chỉ Long Châu có data này |
| **Family Wallet** | FP family graph đã có — tận dụng 100% |
| **Trạm Công dân số** | Sensor vật lý (HA, BMI) — đối thủ online không có |
| **Dược sĩ Care Team** | 5-10 DS chuyên trách online, 70% auto-send routine — không app nào có |

### Câu Chốt

> *"Long Châu không bán thuốc. Long Châu vun một khu vườn sức khỏe cho từng gia đình Việt — nơi mỗi thói quen tốt là một cây thảo dược, cả nhà cùng chăm, Care Team Dược sĩ chuyên trách đồng hành — DS tại quầy không đổi gì."*

---

## APPENDIX A — KEY METRICS (OKR)

| KPI | Baseline | Target |
|---|---|---|
| DAU | Hiện tại | +40% YoY |
| D30 retention | 35% | 55% |
| Tần suất mua/tháng | 1.8x | 3.2x |
| NPS | Hiện tại | +20 điểm |
| Family-link rate | 0 | ≥40% |
| Garden DAU | 0 | ≥30% |
| Adherence streak ≥7d | 0 | ≥25% |

---

## APPENDIX B — FILES REFERENCED

| File | Purpose |
|---|---|
| `legal-compliance.md` | Full legal framework — Luật KCB, Luật Dược, NĐ 13/2023, TT 48/2023 |
| `LC_CARE_FULL_PLAN.md` | Implementation plan — Firebase/Google stack, 6 functions, 7 plants |
| `solution-design.md` | Architecture design — 5-tier, data model, roadmap |
| `agents.md` | Agent rules — Rule #0, 5 guardrails, ECC harness, architecture alignment |
| `giamkhao.md` | Judging criteria — 5-tier, 6 principles, 8 tech groups, RACI |

---

*Presentation này được thiết kế để trình bày trong 15 phút + 10 phút Q&A — phù hợp format cuộc thi.*
