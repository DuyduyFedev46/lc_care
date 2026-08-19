# Agents — Rules for AI Agents in Long Chau Care

> **Dành cho mọi AI agent hoạt động trong dự án này.**
> Vi phạm các rule dưới đây = rủi ro pháp lý + rủi ro y tế + rủi ro thương hiệu.
>
> **Dev Harness:** [`everything-claude-code/`](everything-claude-code/) — 38 agents, 156 skills, 72 commands, automated hooks.
> **Harness Docs:** [`everything-claude-code/AGENTS.md`](everything-claude-code/AGENTS.md) — ECC agent orchestration guide.
> **Harness Rules:** [`everything-claude-code/RULES.md`](everything-claude-code/RULES.md) — Agent format, skill format, commit style.
> **Medical Rules (this file):** Rule #0 + 5 Guardrails + Pharmacist-AI role matrix — bắt buộc đọc.

---

## RULE SỐ 0: AI KHÔNG BAO GIỜ ĐƯỢC CHẨN ĐOÁN BỆNH

**Đây là rule tuyệt đối, không có ngoại lệ.**

### Vấn đề

Nguy hiểm nhất của toàn bộ dự án nằm ở đoạn:

> *"AI quét lịch sử mua thuốc 6 tháng → suy ra bệnh nền có thể có"*

Nếu AI trực tiếp kết luận "bạn bị bệnh X" từ lịch sử mua thuốc, hậu quả:
- Sai chẩn đoán → user bỏ điều trị thật → **chết người**
- Vi phạm Luật Khám chữa bệnh Việt Nam (chỉ BS/CDHA được chẩn đoán)
- Mất niềm tin thương hiệu Long Châu không thể phục hồi

### AI CHỈ ĐƯỢC LÀM

| Được làm | Ví dụ đúng |
|---|---|
| Gom data, tạo bản tóm tắt hành chính | "6 tháng qua KH mua Amlodipine 5mg × 6 lần, đều đặn 30 ngày/lần" |
| Phát hiện **pattern hành vi** (không phải pattern bệnh) | "KH mua thuốc đều đặn → tuân thủ tốt" |
| Trích xuất thông tin từ đơn thuốc (OCR) | "Amlodipine 5mg · 1 viên/sáng · BS Nguyễn Văn A" |
| Nhắc lịch hành chính (refill, tiêm, khám) | "Đã 30 ngày từ lần mua cuối — đến hạn refill" |
| Flag chỉ số ngoài ngưỡng **BS đã set** | "HA 145/95 — ngoài ngưỡng BS đề ra" |
| Tạo **draft hành chính** để Dược sĩ duyệt | Draft nhắc lịch, refill, khám định kỳ — nằm trong Queue |
| Cảnh báo tương tác thuốc (dựa trên ATC code) | "Amlodipine + Ibuprofen → tương tác trung bình" |

### AI TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM

| Không được làm | Ví dụ sai |
|---|---|
| **Suy ra bệnh từ thuốc** | "KH mua Amlodipine → bị Tăng huyết áp" |
| **Chẩn đoán trực tiếp** | "Bạn có dấu hiệu tiểu đường type 2" |
| **Đề xuất cây thảo dược** | "Phù hợp Cây Gừng", "Nên trồng Cây Nghệ" |
| **Đề xuất đổi/thêm thuốc** | "Nên dùng thêm Metformin" |
| **Push trực tiếp tới user chưa qua Dược sĩ** | Bất kỳ message y tế nào |
| **Dùng từ ngữ y khoa khẳng định** | "bị", "mắc bệnh", "chẩn đoán", "điều trị" |

---

## CƠ CHẾ THỰC THI: 3 LỚP CHẶN

```
LỚP 1 — Từ ngữ             LỚP 2 — Output Gate        LỚP 3 — Audit
───────────────────    ───────────────────────    ──────────────────
AI bị cấm dùng từ:      ROUTINE: auto-send         Mọi output của AI
"bị bệnh", "mắc",       (template cố định)          được ghi vào
"chẩn đoán", "điều trị"  NON-ROUTINE: qua Care      medical_audit_log
                         Team DS approve                 ↓
Nếu AI output chứa      Nếu chưa approve →       Truy xuất được
từ cấm → REJECT tự động  KHÔNG được push            nguồn gốc từng message
```

---

## 5 GUARDRAILS Y TẾ (từ solution-design.md)

| # | Nguyên tắc | Cơ chế |
|---|---|---|
| 1 | AI không tự chẩn đoán hoặc đổi phác đồ | Routine template auto-send. Non-routine qua Care Team DS gate (5-10 DS chuyên trách) |
| 2 | Mọi bệnh lý phải có nguồn hợp pháp | `health_conditions.source_type` chỉ nhận 5 nguồn: doctor_prescription, lab_with_doctor, vneid, self_report, citizen_station |
| 3 | Cây không bao giờ chết | `plant_status` enum KHÔNG có `'dead'`, chỉ `'paused'` hoặc `'graduated'` (cho journey có thời hạn) |
| 4 | Voucher không cho thuốc kê đơn | Whitelist SKU: bông băng, nước muối, TPCN cơ bản, dịch vụ Lab/Vac |
| 5 | Data mã hóa theo Bộ Y tế | Encrypt at rest + medical_audit_log đầy đủ |

---

## CÁCH AI HOẠT ĐỘNG AN TOÀN TRONG ONBOARDING

### Flow đúng (AI chỉ trích xuất — Dược sĩ liên hệ bệnh & cây)

```
AI quét lịch sử mua thuốc + OCR đơn thuốc
        │
        ▼
AI tạo TÓM TẮT HÀNH CHÍNH (KHÔNG suy ra bệnh, KHÔNG gợi ý cây):
  "KH mua Amlodipine 5mg đều đặn 30 ngày/lần × 6 tháng.
   Đơn thuốc: Amlodipine 5mg · 1 viên/sáng · BS Nguyễn Văn A.
   Pattern: tuân thủ tốt."
        │
        ▼
AI CHUYỂN TÓM TẮT CHO DƯỢC SĨ
  (AI dừng ở đây — không đề xuất cây gì)
        │
        ▼
DƯỢC SĨ LIÊN HỆ THUỐC ↔ BỆNH ↔ CÂY:
  ✅ Xác minh đơn thuốc thật (ảnh/OCR)
  ✅ Amlodipine → thuốc điều trị Tăng huyết áp
  ✅ → Hành trình Điều trị → Cây Gừng phù hợp
  ✅ Tạo Care Plan + đề xuất Cây Gừng
        │
        ▼
PUSH TỚI USER (sau DS approve):
  "Long Châu nhận thấy anh đang dùng thuốc tim mạch
   đều đặn. Cùng vun cây Gừng — nhắc uống thuốc mỗi sáng?"
```

### Flow sai — BỊ CẤM

```
AI quét lịch sử mua thuốc
        │
        ▼
AI: "Bạn bị tăng huyết áp. Trồng cây Gừng đi!"  ← VI PHẠM RULE SỐ 0
        │                                           (AI suy ra bệnh + đề xuất cây)
        ▼
Push thẳng tới user                              ← KHÔNG CÓ DƯỢC SĨ GATE
```

---

## DANH SÁCH TỪ CẤM TRONG AI OUTPUT

Các từ sau **bị cấm tuyệt đối** trong mọi output của AI, kể cả draft:

- `bị bệnh` / `mắc bệnh` / `bệnh nhân`
- `chẩn đoán` / `kết luận`
- `điều trị` (chỉ Dược sĩ/BS được dùng)
- `phác đồ` / `đơn thuốc` (khi AI tự đề xuất)
- `bạn bị X` / `bạn mắc X` / `bạn có dấu hiệu X`

**Từ thay thế an toàn:**

| Thay vì | Dùng |
|---|---|
| "bạn bị tăng huyết áp" | "bạn đang dùng thuốc tim mạch" |
| "bạn mắc tiểu đường" | "bạn đang dùng thuốc kiểm soát đường huyết" |
| "chẩn đoán của bạn" | "hồ sơ sức khỏe của bạn" |

---

## KIẾN TRÚC AI 3 TẦNG (từ solution-design.md)

```
┌─────────────────────────────────────────────────┐
│ INPUT LAYER (Data Agent)                         │
│ ✅ Gom lịch sử mua, lab, tiêm chủng              │
│ ✅ Tạo bản tóm tắt                               │
│ ❌ KHÔNG suy luận bệnh                           │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│ PROCESSING LAYER (Analysis)                      │
│ ✅ Tạo draft cảnh báo, gợi ý hành chính           │
│ ✅ Phát hiện pattern hành vi                      │
│ ❌ KHÔNG push trực tiếp ra ngoài                  │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│ OUTPUT LAYER (Smart Gate)                        │
│ ✅ ROUTINE: auto-send (template cố định)          │
│ ✅ NON-ROUTINE: Care Team DS approve              │
│ ✅ Audit log từng quyết định                     │
│ ❌ AI KHÔNG tự output y tế                       │
│ ✅ DS tại quầy = zero impact                     │
└─────────────────────────────────────────────────┘
```

---

## PHÂN VAI: AI vs DƯỢC SĨ

| Vai trò | AI làm | Dược sĩ làm |
|---|---|---|
| Quét lịch sử mua | ✅ Tự động | — |
| OCR trích xuất đơn thuốc | ✅ Tự động | ✅ Xác minh |
| Phát hiện pattern hành vi | ✅ Tự động | — |
| Suy ra bệnh từ thuốc | ❌ **CẤM** | ✅ Dược sĩ kết luận |
| **Đề xuất cây thảo dược** | ❌ **CẤM** | ✅ Dược sĩ liên hệ thuốc ↔ bệnh ↔ cây |
| Tạo draft hành chính (nhắc lịch, refill) | ✅ Có điều kiện | ✅ Duyệt + sửa |
| Xác minh nguồn hợp pháp | ❌ **CẤM** | ✅ Dược sĩ verify |
| Push message y tế tới user | ❌ **CẤM** (trừ routine template auto-send) | ✅ Care Team DS approve (non-routine) |
| Cảnh báo tương tác thuốc | ✅ Dựa trên ATC code | ✅ Đối chiếu lâm sàng |
| Theo dõi tuân thủ | ✅ Streak, refill | ✅ Can thiệp khi cần |
| Flag chỉ số ngoài ngưỡng BS set | ✅ Tự động | ✅ Đánh giá + hành động |

---

## CHECKLIST TRƯỚC KHI PUSH BẤT KỲ AI OUTPUT NÀO

- [ ] Output có được phân loại đúng chưa? (ROUTINE → auto-send / NON-ROUTINE → Care Team approve)
- [ ] Nếu NON-ROUTINE: đã được Care Team DS approve chưa?
- [ ] Có chứa từ cấm nào không? (bị bệnh, chẩn đoán, điều trị...)
- [ ] AI có đề xuất cây thảo dược (Gừng, Nghệ, Sả...) không? → Nếu có: **REJECT**
- [ ] Có `source_type` hợp pháp cho mọi bệnh lý được nhắc đến?
- [ ] Có được ghi vào `medical_audit_log` không?
- [ ] Nếu là voucher — có nằm trong whitelist không? (KHÔNG thuốc kê đơn)

---

---

## ECC DEVELOPMENT HARNESS — Everything Claude Code

> **Mọi task phát triển trong dự án này phải sử dụng ECC agents theo đúng Agent-First principle.**

### ECC Agent Mapping cho LC Care

| Task trong LC Care | ECC Agent | Lý do |
|---|---|---|
| Thiết kế schema Firestore mới, tối ưu query | `database-reviewer` | PostgreSQL/Supabase specialist — áp dụng cho Firestore document design |
| Viết Firebase Functions mới (ocr, adherence...) | `tdd-guide` | Test-first: viết test case trước khi code function |
| Review code Firebase Functions | `typescript-reviewer` | JS/TS code quality review |
| Refactor code, dọn dead code | `refactor-cleaner` | Cleanup sau mỗi phase |
| Check bảo mật Firestore rules, API keys | `security-reviewer` | Phát hiện lỗ hổng trước khi deploy |
| Lập kế hoạch implement phase mới | `planner` | Phân tích dependencies + risk |
| Thiết kế kiến trúc system-wide | `architect` | Architectural decisions cho scale |
| Build Firebase Functions bị lỗi | `build-error-resolver` | Fix build/type errors |
| Viết E2E test cho PWA demo | `e2e-runner` | Playwright test cho 11 scenarios |
| Tự động chạy loop (polling, monitor) | `loop-operator` | Autonomous loop execution |
| Tối ưu harness config | `harness-optimizer` | Reliability, cost, throughput |

### Development Workflow Chuẩn với ECC

```
1. PLAN ──────── planner agent
   ├── Phân tích requirements từ solution-design.md
   ├── Xác định dependencies + risk
   └── Break thành phases cụ thể

2. TDD ───────── tdd-guide agent
   ├── Viết test case trước (RED)
   ├── Implement function (GREEN)
   └── Refactor + verify coverage 80%+

3. REVIEW ───── code-reviewer / typescript-reviewer
   ├── Review ngay sau khi code
   ├── Address CRITICAL/HIGH issues
   └── Verify compliance với agents.md (rule #0 + guardrails)

4. SECURITY ─── security-reviewer (trước mỗi commit)
   ├── Không hardcoded secrets
   ├── Firestore rules đúng
   ├── Input validation đủ
   └── Không leak data y tế

5. COMMIT ────── conventional commits
   └── feat: / fix: / refactor: / docs: / test: / chore:
```

### ECC Core Principles Áp Dụng cho LC Care

| ECC Principle | Áp dụng trong LC Care |
|---|---|
| **Agent-First** | Luôn delegate task phù hợp cho ECC agent chuyên biệt, không làm tất cả trong 1 agent |
| **Test-Driven** | Mọi Firebase Function đều có test case trước khi deploy. Demo E2E test cho 11 scenarios |
| **Security-First** | Medical data là cực kỳ nhạy cảm — security-reviewer bắt buộc trước mọi commit |
| **Immutability** | Medical audit log là immutable — mọi thay đổi đều là record mới, không mutate record cũ |
| **Plan Before Execute** | Mọi phase mới đều có plan rõ ràng trước khi code (xem LC_CARE_FULL_PLAN.md) |

### ECC Agent Orchestration Rules

1. **Proactive invocation** — Không đợi user nhắc. Khi code vừa viết xong → tự động gọi `code-reviewer`.
2. **Parallel execution** — Các task độc lập (review TS + review security) chạy song song.
3. **Medical override** — ECC agents khi hoạt động trong LC Care PHẢI tuân thủ Rule #0 (AI không chẩn đoán) và 5 Guardrails. Nếu conflict giữa ECC rule và medical rule → **medical rule thắng**.

---

## ARCHITECTURE ALIGNMENT — Tiêu Chí Giám Khảo (giamkhao.md)

> **Mọi output phải map được vào kiến trúc 5 tầng và 6 nguyên tắc thiết kế mà giám khảo yêu cầu.**

### 5-Tier Architecture Mapping

| Tầng (Giám khảo) | LC Care Implementation | Status |
|---|---|---|
| **Presentation** | PWA (`demo/public/index.html`) — React Native sau MVP | ✅ Demo có |
| **Application** | 6 Firebase Functions (ocr, adherence, pharmacy, family-calendar, insights, scheduler) | ✅ Design sẵn sàng |
| **AI/ML** | 3-layer AI (Input → Processing → Output) + Gemini Flash + Cloud Vision OCR | ✅ Design sẵn sàng |
| **Data** | Firestore (7 collections) + PostgreSQL (FP reuse) + medical_audit_log | ✅ Design sẵn sàng |
| **Infrastructure** | Firebase (Auth, Hosting, Functions, FCM) + Google Cloud (Vision, Scheduler) | ✅ Design sẵn sàng |

### 6 Design Principles Compliance

| # | Nguyên tắc (Giám khảo) | LC Care Compliance |
|---|---|---|
| 1 | **Health-First** | Rule #0 (AI không chẩn đoán) + Care Team DS gate cho non-routine message y tế |
| 2 | **Privacy by Design** | Consent granular, data encryption, user là data owner |
| 3 | **AI Augments, Never Replaces** | AI là secondary actor — DS là primary liable (xem AI Liability Chain) |
| 4 | **Auditability** | `medical_audit_log` immutable + traceability chain 5 bước + source tracking per data point |
| 5 | **Fail Safe** | SLA escalation (5-min broadcast → 15-min referral), plant never dies (paused/graduated), OCR fallback |
| 6 | **MECE Ownership** | RACI matrix: AI (Consulted), DS (Accountable), Dev (Responsible), User (Informed) |

### Data Governance Alignment

| Yêu cầu GK | LC Care Implementation |
|---|---|
| **Data Ownership** (user là chủ) | User consent trước mọi data collection. User có quyền export/delete data. |
| **Access Control** (zero-trust) | Firestore rules: user chỉ đọc data của mình. DS chỉ đọc queue được assign. Family access có consent. |
| **Retention** (10 năm y tế) | Demo: Firestore. Production: cold storage + policy riêng. Prescription lưu theo Luật KCB. |
| **Consent granular** | Phase 0.5 survey đo willingness to share. Trước public launch: per-data-type consent flow. |

### AI Governance Alignment

| # | Guardrail (Giám khảo) | LC Care Mechanism |
|---|---|---|
| 1 | AI không tự chẩn đoán | Routine template auto-send. Non-routine qua Care Team DS gate |
| 2 | Mọi bệnh lý có nguồn hợp pháp | `source_type` chỉ nhận 5 nguồn |
| 3 | Cây không chết | `plant_status` không có `dead`, chỉ `paused`/`graduated` |
| 4 | Voucher không cho thuốc kê đơn | Whitelist SKU strict |
| 5 | Data mã hóa | AES-256 at rest + TLS 1.3 in transit |

**Quy trình 4 bước khi AI sai** (Detect → Contain → Notify → Remediate):
1. **Detect** — Forbidden words sensor + pharmacist report + user report
2. **Contain** — Block output ngay lập tức, revert về template an toàn
3. **Notify** — Báo DS lead + product owner trong 1h
4. **Remediate** — Root cause analysis + fix sensor/model + audit log review

### Tech Stack Mapping (8 nhóm)

| # | Nhóm công nghệ (GK) | LC Care Stack |
|---|---|---|
| 1 | Mobile | PWA (demo) → React Native (production, reuse App KHLC) |
| 2 | API Gateway | Firebase Functions HTTP + Callable |
| 3 | Application | 6 Functions (Node.js 20) |
| 4 | AI/ML | Gemini Flash + Cloud Vision + 3-layer Human-in-the-Loop |
| 5 | Data | Firestore (doc) + PostgreSQL (relational, FP reuse) |
| 6 | Data Platform | Kafka (FP reuse) + BigQuery (analytics sau MVP) |
| 7 | Security | Firebase Auth + Firestore Rules + Keycloak (production) + VNeID (P2) |
| 8 | DevOps | Firebase CLI + GitHub Actions + Cloud Scheduler |

---

## COMPLIANCE CHECKLIST — Trước Mỗi Commit

Ngoài checklist y tế ở trên, mọi commit phải pass:

- [ ] **ECC Security Review** — Không secrets, không SQL injection, Firestore rules đúng
- [ ] **ECC Test Coverage** — Functions có test, E2E scenarios pass
- [ ] **Medical Rule #0** — Không AI tự chẩn đoán trong bất kỳ output nào
- [ ] **5 Guardrails** — Source tracking, plant_status, voucher whitelist, encryption, pharmacist gate
- [ ] **Audit Trail** — Mọi medical decision đều có `medical_audit_log`
- [ ] **Conventional Commit** — `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- [ ] **Architecture Alignment** — Code map được vào 5 tầng kiến trúc
- [ ] **6 Design Principles** — Health-First, Privacy, AI Augments, Auditability, Fail Safe, MECE

---

## REFERENCE: FAMILY PACKAGE CONTEXT (Cross-project)

> Các tài liệu dưới đây nằm trong `docs/` — dùng khi cần tích hợp Family Package với LC Care.

### Tài liệu đã có

| File | Nội dung |
|------|----------|
| `docs/fp-core-database-schema.md` | DB schema + ERD (Mermaid) + proposed invite table |
| `docs/fp-api-endpoints.md` | Quick reference URLs + architecture diagram |
| `docs/fp-full-api-catalog.md` | Full API catalog (44 Core + 93 Integration + Ecom + 27 Loyalty) |
| `docs/fp-core-swagger.json` | Raw Swagger — Family Core (.NET, 44 endpoints) |
| `docs/fp-integration-swagger.json` | Raw Swagger — Family Integration (NestJS, 93 endpoints) |
| `docs/fp-ecom-swagger.json` | Raw Swagger — Ecom Customer API (125 endpoints) |
| `docs/fp-loyalty-swagger.json` | Raw Swagger — Loyalty API (.NET, 27 endpoints) |
| `docs/brd-fp773-synced-review.md` | BRD: Ghi nhận chi tiêu SP nhi cho gia đình |

### Swagger URLs (Internal)

| Service | CI | UAT |
|---------|----|----|
| Family Core | `http://ci-family-core.lc.frt.local/swagger/index.html` | `http://uat-family-core.lc.frt.local/swagger/index.html` |
| Family Integration | `http://ci-be-family-api.lc.frt.local/docs#/` | `http://uat-be-family-api.lc.frt.local/docs#/` |
| Ecom Customer | `http://ci-ecom-customer-api.lc.frt.local/docs#` | `http://uat-ecom-customer-api.lc.frt.local/docs#` |
| Loyalty | `http://ci-fpt-loyalty-app-api-lc.frt.local/swagger/index.html` | `http://uat-fpt-loyalty-app-api-lc.frt.local/swagger/index.html` |

### Kiến trúc Family Package

```
App (FE) → Ecom Customer API → Family Integration (NestJS) → Family Core (.NET + PostgreSQL)
                                       ↓
                                 Loyalty / Notification / OTP
```

### Spec đang phát triển

| Spec | Trạng thái | Mô tả |
|------|-----------|-------|
| `fp-onboarding-invite-link` | Requirements ✅ | Bỏ OTP, chuyển sang invite link, ≥2 TV active → active GĐ |

---

## DEPLOY — Firebase Hosting Configuration

> **Bắt buộc đọc trước mỗi lần deploy. Tránh deploy nhầm project/hosting.**

### Firebase Project & Hosting

| Mục | Giá trị |
|------|--------|
| **Firebase Project ID** | `keolai-63ec1` |
| **Hosting Site ID** | `chauthuc` |
| **Hosting URL** | https://chauthuc.web.app |
| **Firebase Account** | `dtduy46@gmail.com` |

### Deploy — Step by Step

```bash
# 1. Đảm bảo đang ở đúng project
cd frontend
firebase use keolai-63ec1

# 2. Build (nếu chưa build)
npm run build

# 3. Deploy hosting — PHẢI chỉ định site chauthuc
firebase deploy --only hosting:chauthuc
```

### Cấu hình `frontend/firebase.json`

```json
{
  "hosting": {
    "site": "chauthuc",       // ← BẮT BUỘC: deploy vào chauthuc.web.app
    "public": "dist",
    ...
  }
}
```

### Lưu ý quan trọng

- **KHÔNG** chạy `firebase deploy --only hosting` mà không có `:chauthuc` — nó sẽ deploy vào site mặc định `keolai-63ec1.web.app`
- **KHÔNG** tạo project Firebase mới — project `keolai-63ec1` đã có sẵn 2 hosting sites: `chauthuc` và `keolai-63ec1`
- Nếu cần đổi Firebase account: `firebase login --reauth`

### ⛔ CRITICAL: KHÔNG DEPLOY FUNCTIONS TỪ THƯ MỤC LC_CARE

> **Incident 2026-05-17:** Chạy `firebase deploy --only functions` từ `LC_Care/frontend/` đã **XÓA TOÀN BỘ 17 functions của KeoLai** vì 2 dự án dùng chung project `keolai-63ec1`.

**Nguyên nhân:** Firebase CLI xóa mọi function không có trong `index.js` hiện tại khi deploy `--only functions`.

| Deploy | Thư mục đúng | Lệnh |
|--------|-------------|------|
| **LC Care functions** (ocrUpload, aiSummary) | `LC_Care/frontend/` | `firebase deploy --only functions --project keolai-63ec1` |
| **KeoLai functions** (17 functions CMS/AI) | `/Users/dangthiduyen/Downloads/Workspace/keolai/KeoLai/` | `firebase deploy --only functions --project keolai-63ec1` |

**Quy tắc bắt buộc:**
- Mỗi lần deploy functions LC Care → **PHẢI** deploy lại KeoLai functions ngay sau
- Hoặc tốt hơn: merge cả 2 `index.js` vào 1 file duy nhất
- KeoLai source: `/Users/dangthiduyen/Downloads/Workspace/keolai/KeoLai/functions/index.js`

---

*File này là bắt buộc đọc với mọi developer, AI engineer, và Dược sĩ tham gia dự án Long Châu Care.*
