---
name: session-infra-build-2026-05-13
description: Full session log: built LC Care Firebase demo infrastructure, migrated AI to DeepSeek, created docs, fixed all inconsistencies
metadata:
  type: project
---

# Session Work Log — 2026-05-13 to 2026-05-14

## Summary

Built the complete Long Chau Care demo backend infrastructure from scratch (12 files, 1522 LOC), migrated AI from Gemini Flash to DeepSeek API, created legal compliance documentation, updated all plans with new Care Team 70/30 model, and fixed 14 cross-file inconsistencies.

---

## 1. Plans Updated

### LC_CARE_FULL_PLAN.md
- Added Phase 0.5 (User Research Validation Roadmap): 100-user survey + 10 interviews + 500-user beta
- Added 2 new plants: Hoa Sen (Lotus) for pregnancy, Tía tô (Perilla) for pediatric (5→7 plants)
- Added 7-plant reference table with graduation logic
- Added Pharmacist Operations: 70/30 Care Team model (70% routine auto-send, 30% non-routine Care Team gate)
- Added SLA Escalation chain (5-min broadcast → 15-min auto-referral)
- Added AI Liability Chain with traceability
- Added Open Questions & Scope Decisions (10 deferred items)
- Updated "3 Wow Moments" → "5 Wow Moments"
- Updated Verification section with 5 answers

### solution-design.md
- Fixed Rule #0 violations in Section 3.1 (onboarding sequence diagram) and 3.3 (cross-member flow)
- Added Section 12 (Legal Compliance Alignment): architecture-to-law mapping, RACI matrix, pre-launch checklist
- Updated Section 6 (Tech Stack): added Demo vs Production comparison table
- Updated Data Model (Section 5): added `graduated` status, `maternity`/`pediatric` journey types, `lotus`/`perilla` plants, prescriptions table, family_calendars table
- Updated Component Breakdown (Section 4.2): Garden UI 5→7 cây, added Family Calendar Concierge, Prescription OCR upgraded to P0

### idea.md
- Fixed Rule #0 violation: "AI suy ra bệnh nền" → "AI trích xuất tên thuốc, Dược sĩ liên hệ"
- Updated plant table 5→7 cây with Hoa Sen + Tía tô

### agents.md
- Updated header: references to `everything-claude-code/` instead of deleted `lc-care-assistant/`
- Added ECC Development Harness section with agent mapping, workflow, core principles
- Added Architecture Alignment section mapping to giamkhao.md judging criteria
- Added Compliance Checklist (8 items)
- Added `graduated` to plant_status references

### report_sm.md
- All 8 risks + 15 open questions annotated with RESOLVED/DEFERRED status

### long-chau-care-decision-tree.html
- Updated from 5 to 7 plant journeys in decision tree outcome grid
- Updated Flow 2: "Nuôi con" → "Nhi khoa", plant Sả → Tía tô
- Added Flow 6 (Thai sản — Hoa Sen) with graduation flow
- Added Flow 7 (Vận động — Cây Sả) with post-pregnancy transition

---

## 2. Docs Created

| File | Content |
|---|---|
| `LC_Care/docs/legal-compliance.md` | Full legal framework: Luật KCB 2023, Luật Dược 2016, NĐ 13/2023/NĐ-CP, TT 48/2023/TT-BYT, NĐ 96/2023/NĐ-CP — 10 sections with LC Care mechanism mappings |
| `LC_Care/docs/presentation.md` | 16-slide competition pitch deck aligned with giamkhao.md criteria |
| `LC_Care/docs/legal-citations.md` | Quick-reference legal citations with official government URLs and article-level mapping |

---

## 3. Firebase Demo Infrastructure Built

### Architecture
- **Stack**: Firebase (Auth, Firestore, Functions, Hosting, Storage) + DeepSeek API
- **Backend**: 12 files, 1522 lines of JavaScript
- **Frontend**: PWA single-page app (index.html, 1500+ lines, 6→7 screens)
- **Pyramid**: 70% Rule, 30% AI

### Files Created (demo/functions/)

```
functions/
├── index.js              (16L)  Entry point, init firebase-admin + AI
├── ocr.js                (114L) Cloud Vision OCR trigger on prescriptions
├── adherence.js          (180L) Streak/points/refill, fraud guard (max 2/day)
├── pharmacy.js           (210L) AI Triage Router + Auto-send (70%) + Care Team gate (30%)
├── family-calendar.js    (142L) Weekly family concierge + CDC Vietnam vaccines
├── insights.js           (67L)  AI wording generator via DeepSeek
├── scheduler.js          (183L) 4 cron jobs (HTTP endpoints for demo)
├── package.json          Node 20, deps: firebase-admin, firebase-functions, @google-cloud/vision
├── utils/
│   ├── firestore.js      (168L) DB singleton, CRUD helpers, batch operations
│   ├── forbidden_words.js(92L)  Vietnamese forbidden words sensor + plant proposal patterns
│   ├── safety.js         (88L)  Auto-send router, severity classifier, source validator
│   ├── ai.js             (176L) DeepSeek API wrapper (OpenAI-compatible, native fetch)
│   └── compliance.js     (98L)  Audit log, pharmacist signature, plant transition validator
├── firestore.indexes.json 5 composite indexes
└── .gitignore            node_modules, .env, deepsek.env
```

### Key Design Decisions
- **AI**: DeepSeek v4 Flash (via OpenAI-compatible API, native `fetch()` in Node 20)
- **Care Team Model**: 70% routine → auto-send template (skip DS queue). 30% non-routine → Care Team gate
- **Demo mode**: Works without API keys (template fallback). PWA has local mock mode.
- **Plant status**: Never `dead` — only `growing | mature | paused | graduated`
- **Forbidden words**: Vietnamese medical terms blocked. Plant names allowed in context, only blocked when AI proposes them.

### PWA Integration
- Real `httpsCallable` connections to all functions with local mock fallback
- Prescription upload UI with OCR result display
- Dynamic pharmacist queue with severity dots + AI Brief cards
- Family Calendar card with weekly timeline + AI summary
- Mock notification polling (10s interval reads pendingNotification field)
- PWA icons generated (192x192 + 512x512, solid #0066CC)

---

## 4. AI Migration: Gemini Flash → DeepSeek

- Removed `@google/generative-ai` dependency
- Created `utils/ai.js` using DeepSeek API (OpenAI-compatible `POST /chat/completions`)
- Model: `deepseek-v4-flash` (with `thinking: disabled`) for all use cases
- Retry: 2 retries with 500ms/1500ms exponential backoff
- Fallback: Vietnamese templates when API unavailable
- All 3 AI functions tested and working: Brief (pharmacy), Wording (insights), CTA (calendar)
- Forbidden words sensor fixed: plant names no longer trigger false positives

### API Key
- Key from `deepsek.env`: `sk-003bc97e60ce468cbdd5ba39ef309879`
- Set via `DEEPSEEK_API_KEY` env var or `process.env.DEEPSEEK_API_KEY`
- Deployment: `firebase functions:config:set deepseek.key="sk-..."`

---

## 5. Files NOT to Change (Preserved)
- 5 original plants (ginger, turmeric, lemongrass, gotu_kola, tea) — only added lotus + perilla
- Brand colors (#0066CC, #003D7A, etc.)
- Pyramid 70/20/10 principle
- 6 Firebase Functions structure (ocr, adherence, pharmacy, family-calendar, insights, scheduler)
- Existing Firestore collections (only added fields)
- Cleanup decisions from Phase 0
- Decision tree HTML structure (extended, not restructured)

---

## 6. Known Limitations
- **Firebase Emulator**: Requires Java 21+ (machine has Java 20) — cannot run locally. Functions deployable to cloud.
- **Cloud Scheduler**: Requires Blaze plan (pay-as-you-go). Demo uses HTTP triggers (onRequest) for scheduler.
- **FCM Push**: Deferred to Phase 1. Demo uses mock notification polling (Polling field `pendingNotification`).
- **Cloud Vision OCR**: Requires Google Cloud credentials. Without it, prescriptions go to pharmacist manual entry.

---

## 7. Next Steps (Future Session)
- Install Java 21+ for Firebase Emulator testing
- Deploy to Firebase cloud: `firebase deploy`
- Set DeepSeek API key in Firebase config
- Test 11 E2E scenarios
- Generate real PWA icons (currently solid-color placeholders)
- Create Firebase emulator seed data for instant demo
