# 🌿 Long Châu Care — Khu Vườn Sức Khỏe Việt

> **Cuộc thi**: Châu Thức — Topic #2 · *"Thức tỉnh sức khỏe — Dẫn lối đổi mới"*
> **Team**: FPT Long Châu · 2026
> **Live Demo**: [chauthuc.web.app](https://chauthuc.web.app)

---

## 💡 Ý tưởng cốt lõi

Biến App KHLC từ **"nơi mua thuốc"** thành **"bạn đồng hành sức khỏe gia đình"** thông qua ẩn dụ **Khu Vườn Thảo Dược Việt**:

- Mỗi thói quen chăm sóc sức khỏe = **một cây thảo dược** lớn lên
- Cả gia đình cùng vun trồng trong **Khu Vườn chung**
- **Care Team Dược sĩ chuyên trách** đồng hành (DS tại quầy = zero impact)

### 7 Cây Thảo Dược = 7 Hành Trình

| 🫚 Gừng | 🟡 Nghệ | 🌿 Sả | 🌾 Rau Má | 🍵 Lá Trà | 🪷 Hoa Sen | 🍃 Tía Tô |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Uống thuốc | Theo dõi chỉ số | Vận động | Khám định kỳ | Tuân thủ dài hạn | Thai sản | Nhi khoa |

---

## 🏗 Kiến trúc hệ thống

```
┌──────────────────────────────────────────────────┐
│ FRONTEND — Vite + React 18 (PWA)                  │
│ 8-step Onboarding · Garden · Care Plan · Voucher  │
├──────────────────────────────────────────────────┤
│ BACKEND — FastAPI (Python)                        │
│ 9 services: onboarding · garden · careplan        │
│ family · pharmacist · purchase · voucher           │
│ notification · upload (OCR)                       │
├──────────────────────────────────────────────────┤
│ AI/ML — 3-Layer Smart Gate                        │
│ Gemini Flash + Cloud Vision OCR                   │
│ 70% Routine Auto-send + 30% Care Team Gate        │
├──────────────────────────────────────────────────┤
│ DATA — Firestore (NoSQL)                          │
├──────────────────────────────────────────────────┤
│ INFRASTRUCTURE — Firebase Hosting + Cloud Run     │
└──────────────────────────────────────────────────┘
```

---

## 📁 Cấu trúc thư mục

```
LC_Care/
├── frontend/                    ← Vite + React 18 PWA
│   ├── src/
│   │   ├── screens/
│   │   │   ├── onboarding/      ← 8-step onboarding flow
│   │   │   │   ├── WelcomeStep.jsx
│   │   │   │   ├── HealthScanStep.jsx
│   │   │   │   ├── CycleTrackingStep.jsx
│   │   │   │   ├── LifeChangesStep.jsx
│   │   │   │   ├── HabitsStep.jsx
│   │   │   │   ├── PlantSelectStep.jsx
│   │   │   │   └── SeedPlantedStep.jsx
│   │   │   ├── garden/          ← Khu vườn thảo dược
│   │   │   ├── careplan/        ← Care Plan
│   │   │   ├── family/          ← Family Garden + Calendar
│   │   │   ├── pharmacist/      ← Dược sĩ chuyên trách
│   │   │   ├── voucher/         ← Voucher & rewards
│   │   │   └── profile/         ← Hồ sơ sức khỏe
│   │   ├── components/          ← Shared components
│   │   ├── context/             ← AppContext (state management)
│   │   ├── config/              ← Constants, plant assignment
│   │   ├── services/            ← API client, data services
│   │   └── App.jsx              ← Root app + routing
│   ├── .env.example             ← Template env cho frontend
│   └── package.json
│
├── backend/                     ← FastAPI (Python 3.11+)
│   ├── main.py                  ← App entry point
│   ├── config.py                ← Environment config
│   ├── ai/                      ← AI module
│   │   ├── client.py            ← Gemini / DeepSeek client
│   │   ├── guardrails.py        ← Từ cấm + safety filters
│   │   ├── router.py            ← AI API routes
│   │   ├── prompt_manager.py    ← Prompt template engine
│   │   └── prompts/             ← Prompt templates (.txt)
│   ├── services/                ← Domain services
│   │   ├── onboarding/          ← Onboarding flow
│   │   ├── garden/              ← Garden logic
│   │   ├── careplan/            ← Care Plan
│   │   ├── family/              ← Family management
│   │   ├── pharmacist/          ← Pharmacist queue
│   │   ├── purchase/            ← Purchase history
│   │   ├── voucher/             ← Voucher system
│   │   ├── notification/        ← Push notifications
│   │   └── upload/              ← OCR document upload
│   ├── middleware/               ← Auth middleware
│   ├── requirements.txt
│   └── Dockerfile
│
├── docs/                        ← Tài liệu dự án
│   ├── presentation.md          ← 16 slides trình bày
│   ├── legal-compliance.md      ← Khung pháp lý
│   ├── legal-citations.md       ← Trích dẫn pháp luật
│   ├── planning/                ← Solution design, full plan
│   ├── competition/             ← Giám khảo, feedback, reports
│   └── diagrams/                ← BPMN, DrawIO, Decision Tree
│
├── design/                      ← Design assets
│   ├── prompts/                 ← Image generation prompts
│   └── stitch/                  ← Stitch MCP screen specs
│
├── config/                      ← Shared config files
├── assets/                      ← Static assets (icons, mascots)
├── scripts/                     ← Utility scripts
├── AGENTS.md                    ← AI governance rules
├── firebase.env.example         ← Template Firebase config
├── deepsek.env.example          ← Template DeepSeek config
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **Firebase CLI** (`npm i -g firebase-tools`)

### 1. Clone & Setup Environment

```bash
git clone https://github.com/DuyduyFedev46/lc_care.git
cd lc_care

# Copy env templates và điền giá trị thật
cp firebase.env.example firebase.env
cp deepsek.env.example deepsek.env
cp frontend/.env.example frontend/.env
cp frontend/.env.example frontend/.env.development
cp frontend/.env.example frontend/.env.production
```

### 2. Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

### 3. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Cần file firebase-service-account.json (lấy từ Firebase Console)
python -m uvicorn main:app --reload --port 8000
```

### 4. Deploy to Firebase Hosting

```bash
cd frontend
npm run build
firebase use keolai-63ec1
firebase deploy --only hosting:chauthuc   # → https://chauthuc.web.app
```

> ⚠️ **PHẢI chỉ định `--only hosting:chauthuc`**, không dùng `--only hosting` đơn lẻ.

---

## 🛡 AI Governance — Rule #0

> **AI KHÔNG BAO GIỜ ĐƯỢC CHẨN ĐOÁN BỆNH**

| AI ĐƯỢC làm | AI KHÔNG được làm |
|---|---|
| Đọc đơn thuốc đã có (OCR) | Suy ra bệnh từ thuốc |
| Nhắc lịch refill, uống thuốc | Tự chẩn đoán bệnh |
| Flag chỉ số ngoài ngưỡng BS set | Đề xuất đổi/thêm thuốc |
| Tổng hợp data hành chính | Push message y tế không qua DS |

```
AI output ─┬─ 70% ROUTINE (template cố định) ──→ Auto-send → User
           │   nhắc refill, streak, lịch tiêm
           │
           └─ 30% NON-ROUTINE ──→ Care Team (5-10 DS) ──→ User
               onboarding, OCR verify, urgent
```

Chi tiết đầy đủ: xem [`AGENTS.md`](AGENTS.md)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vite 5 · React 18 · Firebase SDK 12 · PWA |
| **Backend** | FastAPI · Python 3.11 · Uvicorn |
| **AI/ML** | Gemini Flash · Google Cloud Vision (OCR) |
| **Database** | Cloud Firestore |
| **Auth** | Firebase Authentication |
| **Hosting** | Firebase Hosting (frontend) · Cloud Run (backend) |
| **DevOps** | GitHub · Firebase CLI |

---

## 📋 Compliance

| Luật | Status |
|---|---|
| Luật Khám chữa bệnh 2023 | ✅ AI không chẩn đoán. DS primary liable. |
| Luật Dược 2016 | ✅ DS có CCHN. Voucher whitelist. |
| Nghị định 13/2023/NĐ-CP | ✅ AES-256 + TLS 1.3. Consent granular. |
| Thông tư 46/2018/TT-BYT | ✅ Medical audit log. Source tracking. |

---

## 🚀 Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| **P0 — MVP Demo** | T5-6/2026 | 1 hành trình (Gừng) + Onboarding AI + Garden UI |
| **P1 — Full Feature** | T7/2026 | 7 cây + Family Garden + Care Team Dashboard |
| **P2 — External** | T8/2026 | Prescription OCR + VNeID + Sổ SK điện tử |
| **P3 — Ecosystem** | T9+/2026 | Trạm Công dân số + AI Cross-member Pattern |

---

## 📖 Tài liệu tham khảo

| File | Mục đích |
|---|---|
| [`docs/planning/solution-design.md`](docs/planning/solution-design.md) | Kiến trúc tổng thể, data model |
| [`docs/planning/LC_CARE_FULL_PLAN.md`](docs/planning/LC_CARE_FULL_PLAN.md) | Kế hoạch triển khai chi tiết |
| [`AGENTS.md`](AGENTS.md) | AI governance — Rule #0, 5 guardrails |
| [`docs/presentation.md`](docs/presentation.md) | 16 slides trình bày cuộc thi |
| [`docs/legal-compliance.md`](docs/legal-compliance.md) | Khung pháp lý Việt Nam |

---

*Long Châu Care — Mỗi gia đình Việt là một Khu Vườn Sức Khỏe. 🌿*
