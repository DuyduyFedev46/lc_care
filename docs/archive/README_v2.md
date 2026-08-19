# Long Chau Care — Khu Vườn Sức Khỏe Việt

> **Cuộc thi**: Châu Thức — Topic #2 · *"Thức tỉnh sức khỏe — Dẫn lối đổi mới"*
> **Team**: FPT Long Châu · 2026
> **Phiên bản**: v2.0 · 2026-05-18

---

## Ý tưởng cốt lõi

Biến App KHLC từ **"nơi mua thuốc"** thành **"bạn đồng hành sức khỏe gia đình"** thông qua ẩn dụ **Khu Vườn Thảo Dược Việt**:

- Mỗi thói quen chăm sóc sức khỏe = **một cây thảo dược** lớn lên
- Cả gia đình cùng vun trồng trong **Khu Vườn chung**
- **Care Team Dược sĩ chuyên trách** đồng hành (DS tại quầy = zero impact)

### 14 Nhóm Cây Thảo Dược (G1-G14)

| Group | Cây           | Hành trình                  | DS duyệt? |
| ----- | ------------- | --------------------------- | --------- |
| G1    | Bạc Hà      | Default / Khỏe mạnh      | Không     |
| G2    | Gừng         | Theo dõi chỉ số          | **Có**    |
| G3    | Khổ Qua      | Mãn tính (Tiểu đường)    | **Có**    |
| G4    | Sen           | Thai sản / Sau sinh       | Không     |
| G5    | Húng Quế    | Trẻ em / Thanh thiếu niên | Không     |
| G6    | Lô Hội       | Người cao tuổi (60+)      | Không     |
| G7    | Nghệ         | Hồi phục / Viêm          | **Có**    |
| G8    | Oải Hương   | Sức khỏe tinh thần       | **Có**    |
| G9    | Nhân Sâm     | Vận động tích cực         | Không     |
| G10   | Rau Má       | Ít vận động               | Không     |
| G11   | Cam Thảo     | Chăm sóc gia đình         | Không     |
| G12   | Sả           | Thanh lọc / Vận động      | Không     |
| G13   | Đỗ Trọng    | Xương khớp                 | **Có**    |
| G14   | Diệp Hạ Châu | Tiêu hóa / Gan            | **Có**    |

Mỗi người được gán **đúng 1 cây** dựa trên rule-based assignment. Medical Groups (G2, G3, G7, G8, G13, G14) cần Dược sĩ duyệt.

---

## Kiến trúc 5 tầng

```
┌──────────────────────────────────────────────────┐
│ PRESENTATION — React/Vite PWA                     │
│ 13 màn hình, mobile-first                         │
├──────────────────────────────────────────────────┤
│ APPLICATION — FastAPI Python Backend              │
│ 10 service routers + AI layer + OCR               │
├──────────────────────────────────────────────────┤
│ AI/ML — 3-Layer Smart Gate                        │
│ 70% Routine Auto-send + 30% Care Team Gate        │
├──────────────────────────────────────────────────┤
│ DATA — Firebase Firestore                         │
│ users, carePlans, pharmacistQueue, families       │
├──────────────────────────────────────────────────┤
│ INFRASTRUCTURE — Firebase + Google Cloud          │
└──────────────────────────────────────────────────┘
```

---

## AI Governance — Rule #0

> **AI KHÔNG BAO GIỜ ĐƯỢC CHẨN ĐOÁN BỆNH**

| AI ĐƯỢC làm                       | AI KHÔNG được làm                     |
| --------------------------------- | ------------------------------------- |
| Đọc đơn thuốc đã có (OCR)       | Suy ra bệnh từ thuốc                 |
| Nhắc lịch refill, uống thuốc    | Tự chẩn đoán bệnh                    |
| Flag chỉ số ngoài ngưỡng BS set | Đề xuất đổi/thêm thuốc               |
| Tạo onboarding summary            | Đề xuất cây thảo dược                |
| Tổng hợp data hành chính         | Push message y tế không qua DS       |

### Mô hình vận hành

```
AI output ─┬─ 70% ROUTINE (template cố định) ──→ Auto-send → User
           │   nhắc refill, streak, lịch tiêm
           │
           └─ 30% NON-ROUTINE ──→ Care Team (5-10 DS) ──→ User
               onboarding Medical Groups, OCR verify, urgent
```

---

## Cấu trúc thư mục

```
LC_Care/
│
├── README_v2.md                        ← Bạn đang đọc file này
│
├── TÀI LIỆU CHIẾN LƯỢC
│   ├── idea.md                         ← Ý tưởng gốc & brainstorm
│   ├── solution-design_v2.md           ← Thiết kế kiến trúc (FastAPI, 14 cây)
│   ├── LC_CARE_FULL_PLAN_v2.md         ← Kế hoạch triển khai đầy đủ
│   ├── agents.md                       ← Quy tắc AI — Rule #0, 5 guardrails
│   ├── feedback.md                     ← Phản biện & Product decisions
│   ├── prompts_onboarding_screens_v2.md ← Bộ prompt Gemini — 7 màn hình onboarding
│   ├── giamkhao.md                     ← Tiêu chí giám khảo cuộc thi
│   └── report_sm.md                    ← Báo cáo rủi ro & câu hỏi mở
│
├── FRONTEND — React/Vite PWA
│   └── frontend/
│       ├── src/
│       │   ├── App.jsx                 ← Router (13 màn hình)
│       │   ├── main.jsx                ← React entry
│       │   ├── context/AppContext.jsx  ← Global state
│       │   ├── components/             ← DesignTokens, PlantComponents, SharedUI
│       │   ├── config/                 ← plantAssignment.js (14 groups), constants
│       │   ├── screens/
│       │   │   ├── onboarding/         ← 7 step components
│       │   │   ├── garden/             ← Garden, Water, Germination, LevelUp
│       │   │   ├── family/             ← Family, Calendar
│       │   │   ├── pharmacist/         ← Pharmacist dashboard
│       │   │   ├── voucher/            ← Voucher redemption
│       │   │   ├── careplan/           ← Care plan detail
│       │   │   └── profile/            ← User profile
│       │   └── services/               ← api, dataService, uploadService, firebase
│       ├── public/                     ← Static assets
│       ├── vite.config.js
│       └── package.json
│
├── BACKEND — FastAPI Python
│   └── backend/
│       ├── main.py                     ← FastAPI app, 10 routers
│       ├── config.py                   ← CORS, Firebase config
│       ├── services/                   ← 10 service modules
│       │   ├── auth/                   ← Firebase Auth verification
│       │   ├── onboarding/             ← Plant assignment + submit
│       │   ├── garden/                 ← Streak, points, plant status
│       │   ├── careplan/               ← Care plan CRUD
│       │   ├── pharmacist/             ← Queue management
│       │   ├── family/                 ← Family graph + calendar
│       │   ├── purchase/               ← Purchase history
│       │   ├── upload/                 ← OCR + document processing
│       │   ├── voucher/                ← Voucher redemption
│       │   └── notification/           ← FCM push
│       ├── ai/                         ← Gemini client, guardrails, prompts
│       ├── middleware/                 ← Auth middleware
│       └── scripts/                    ← Seed data
│
├── ASSETS
│   └── assets/                         ← Plant images, mascots
│
├── PRESENTATION & DEMO
│   ├── docs/                           ← presentation, legal-compliance
│   └── long-chau-care-decision-tree.html
│
└── BPMN DIAGRAMS
    ├── lc-care-e2e.bpmn
    └── lc-care-e2e.drawio
```

---

## Tài liệu quan trọng

| File | Mục đích | Đọc khi |
|---|---|---|
| [`solution-design_v2.md`](solution-design_v2.md) | Kiến trúc tổng thể, 14 cây, data model | Muốn hiểu **thiết kế hệ thống** |
| [`LC_CARE_FULL_PLAN_v2.md`](LC_CARE_FULL_PLAN_v2.md) | Kế hoạch triển khai chi tiết | Muốn hiểu **cách build** |
| [`agents.md`](agents.md) | Quy tắc AI, 5 guardrails, compliance | Muốn hiểu **AI governance** |
| [`feedback.md`](feedback.md) | Phản biện + Product decisions | Muốn hiểu **tư duy thiết kế** |
| [`prompts_onboarding_screens_v2.md`](prompts_onboarding_screens_v2.md) | Prompt Gemini cho 7 màn hình | Muốn **generate UI** |
| [`docs/presentation.md`](docs/presentation.md) | 16 slides trình bày cuộc thi | Muốn **present** cho giám khảo |

---

## Care Team — Mô hình Dược sĩ mới

```
┌─────────────────────────────────────────────────┐
│           CARE TEAM TRUNG TÂM (5-10 DS)         │
│                                                  │
│  Care Team Lead (1)                              │
│  Care Team DS — General (3-5)                    │
│  Care Team DS — Specialist (2-3)                 │
│                                                  │
│  KPI: Response ≤2h · Quality ≤1% error           │
│       Patient satisfaction ≥4.5/5                │
└─────────────────────────────────────────────────┘
```

> *"Long Châu tạo ra nghề Clinical Pharmacist đầu tiên trong chuỗi nhà thuốc VN"*

---

## Compliance

| Luật | Status |
|---|---|
| Luật Khám chữa bệnh 2023 | AI không chẩn đoán. DS primary liable. |
| Luật Dược 2016 | DS có CCHN. Voucher whitelist. |
| Nghị định 13/2023/NĐ-CP | AES-256 + TLS 1.3. Consent granular. |
| Thông tư 46/2018/TT-BYT | Medical audit log. Source tracking. |

---

## Tech Stack

| Mobile | API | AI/ML | Data | Security | DevOps |
|---|---|---|---|---|---|
| React/Vite PWA | FastAPI Python | Gemini Flash + Cloud Vision | Firestore | Firebase Auth + Firestore Rules | Docker + Firebase Hosting |

---

## Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| **P0 — MVP Demo** | T5-6/2026 | 14 cây + Onboarding 7 steps + Garden UI + AI summary + Pharmacist queue |
| **P1 — Full Feature** | T7/2026 | Family Calendar AI CTA + Insight cards + Voucher + Scheduler |
| **P2 — External** | T8/2026 | Prescription OCR full + VNeID + Sổ SK điện tử |
| **P3 — Ecosystem** | T9+/2026 | Trạm Công dân số + AI Cross-member Pattern |

---

*Long Châu Care — Mỗi gia đình Việt là một Khu Vườn Sức Khỏe.*
