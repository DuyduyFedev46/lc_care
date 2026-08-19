# Tóm Tắt Toàn Bộ Cuộc Hội Thoại — Long Châu Care

> **Team:** Châu Thức | **Cuộc thi nội bộ Long Châu** | Topic 2: Tăng Trải Nghiệm Khách Hàng
> **Slogan:** "Thức tỉnh sức khỏe – Dẫn lối đổi mới"
> **Thời gian:** Từ 20/04/2026 đến 18/05/2026

---

## 1. BỐI CẢNH VÀ VẤN ĐỀ

Long Châu đang vận hành theo **mô hình giao dịch thuần túy** — khách hàng chỉ mở app khi ốm, mua xong là rời đi. Kết quả:

- **A7 Retention:** ~15% (benchmark ngành 25–35%)
- **A30 Retention:** ~12% (benchmark ngành 10–20%)
- **Tần suất mua (Frequency):** 1.8 lần/tháng (tiềm năng 3.2)
- **CLTV thấp** do thiếu cross-sell giữa 3 chuỗi Nhà thuốc, Lab, Tiêm Chủng
- 3 chuỗi hoạt động như **ốc đảo rời rạc**, không liên thông dữ liệu

**Chiến lược đề xuất:** Chuyển từ "bán thuốc khi ốm" sang "đồng hành sức khỏe toàn diện" qua App Long Châu làm trung tâm kết nối.

---

## 2. CHIẾN LƯỢC 4 PHASE

| Phase | Tên | Thời gian | Nội dung | KPI mục tiêu |
|-------|-----|-----------|----------|---------------|
| 1 | **HIỂU** | Q3/2025 | Xây dựng Health ID, thu thập dữ liệu sơ cấp | A30: 12%→25%, Profile: 60% |
| 2 | **ĐỒNG HÀNH** | Q4/2025 | Care Plan phân lớp, cá nhân hóa | DAU +20%, Frequency: 2.5× |
| 3 | **HÀNH ĐỘNG** | Q1/2026 | Gamification Vườn Thảo Dược, Cross-chain Voucher | AOV +30%, Cross-sell: 15% |
| 4 | **HỌC** | Q2/2026 | AI Feedback Loop, tối ưu CLTV | CLTV +40%, Churn -20%, A30: 55% |

**North Star Metric:** Medical Adherence Days (≥20 ngày/tháng/user)

**CLTV Formula:** AOV × Frequency × Lifetime → mục tiêu tăng 40–50% sau 12 tháng

---

## 3. TAXONOMY 12 NHÓM NGƯỜI DÙNG

Quyết định quan trọng: Mở rộng từ 3 nhóm ban đầu (Khỏe / Nguy cơ / Mãn tính) thành **12 nhóm trên 3 trục**, cho phép **Dual-Segment** (1 Primary + 1 Secondary).

### Trục Bệnh Lý (5 nhóm)

| # | Nhóm | Cây Thảo Dược | CLTV | Ghi chú |
|---|------|---------------|------|---------|
| G1 | Khỏe Mạnh | 🌿 Bạc Hà | Thấp | Nhóm đông nhất, tập trung số lượng |
| G2 | Nguy Cơ | 🫚 Gừng | Trung bình | Ngưỡng chuyển sang G3 |
| G3 | Mãn Tính | 🌱 Khổ Qua / Đinh Lăng / Trà Xanh | **Rất cao** | Priority #1, chọn cây theo bệnh |
| G7 | Phục Hồi | 🌾 Nghệ | Cao ngắn hạn | Không dùng chế độ Ngủ Đông đột ngột |
| G8 | Sức Khỏe Tâm Thần | 💜 Oải Hương | Trung bình | Không dùng gamification áp lực |

Bổ sung thêm 2 nhóm bệnh lý mới (xương khớp/cột sống → Cây Đỗ Trọng; tiêu hóa/gan → Cây Diệp Hạ Châu) cho bước chọn cây. Nếu user chọn nhiều bệnh → hiển thị "Khu vườn" nhiều cây thay vì 1 cây.

### Trục Hành Trình Cuộc Sống (3 nhóm)

| # | Nhóm | Cây | Ghi chú |
|---|------|-----|---------|
| G4 | Mẹ Bầu & Sau Sinh | 🪷 Sen | Life stage, không phải bệnh lý. 5 giai đoạn cây theo tam cá nguyệt |
| G5 | Trẻ Em 0–17 | 🌿 Húng Quế | Cha mẹ quản lý, bảo vệ dữ liệu trẻ em tuyệt đối |
| G6 | Người Cao Tuổi 60+ | 🪴 Lô Hội | CLTV tối đa, Senior Mode UX riêng |

**Quyết định:** Mẹ bầu là "Life Stage" chứ không phải "Health Status" → không ép vào Nguy Cơ hay Mãn Tính. Đây là trục phân loại riêng biệt.

### Trục Lối Sống (4 nhóm)

| # | Nhóm | Cây | Ghi chú |
|---|------|-----|---------|
| G9 | Vận Động Viên | 🌿 Nhân Sâm | AOV cao, cảnh báo doping |
| G10 | Văn Phòng | 🌿 Rau Má | Nhóm đông nhất, nguy cơ tiền bệnh |
| G11 | Caregiver | 🌿 Cam Thảo | Basket size lớn nhất, Acquisition Loop mạnh nhất |
| G12 | Di Chuyển Nhiều | 🌿 Sả | Vaccine du lịch, Ngủ Đông khi ra nước ngoài |

---

## 4. GAMIFICATION — VƯỜN THẢO DƯỢC

### 3 Nguyên tắc cốt lõi

1. **Hành vi hơn chỉ số:** Cây lớn khi khai báo trung thực, dù chỉ số sức khỏe xấu
2. **Guilt-Free:** Cây không bao giờ chết, chỉ "Ngủ Đông" sau 3 ngày không mở app
3. **Phần thưởng an toàn:** Voucher không áp dụng cho thuốc kê đơn

### 5 Giai đoạn phát triển cây

| Giai đoạn | Streak | Phần thưởng |
|-----------|--------|-------------|
| 🌰 Hạt Giống | 0 ngày (hoàn thành onboarding) | Chưa có |
| 🌱 Cây Non | 7 ngày (A7) | Bông băng, nước muối |
| 🌿 Trưởng Thành | 21 ngày | C sủi, 10% giảm Lab |
| 🌸 Ra Hoa | 45 ngày | 20% giảm vaccine, que thử |
| 🍎 Thu Hoạch | 60 ngày (≥20 ngày/tháng) | 30% gói Lab tổng quát |

### Cross-chain Voucher Flow (5 bước vòng lặp)

Tuân thủ Care Plan → Cộng điểm tự động → Đổi Voucher sức khỏe → Dùng tại Lab/Tiêm Chủng → Doanh thu cross-sell tăng → Vòng lặp tái diễn.

### 7 Edge Cases đã xử lý

Chuyển nhóm, Family Hub nhiều cây, Nhập viện (Ngủ Đông Sâu), Đổi phác đồ thuốc, Chỉ số bất thường, Lạm dụng gamification, Harvest & Replant.

---

## 5. ONBOARDING FLOW — CÁC QUYẾT ĐỊNH UX QUAN TRỌNG

### Phiên bản cuối cùng (v5): 8 màn hình, 6 câu hỏi

| Màn hình | Câu hỏi conversational | Ghi chú UX |
|----------|------------------------|-------------|
| 0 | Chào mừng | Bỏ "Đã có tài khoản", chỉ 1 CTA duy nhất |
| 1 | "Cho tôi biết một chút về bạn nhé?" | Năm sinh → input số 4 chữ số (không dropdown). Chiều cao/cân nặng tùy chọn, không hiện BMI |
| 2 | "Bạn thường cảm thấy thế nào về sức khỏe?" | **Nữ:** khối chu kỳ kinh nguyệt ở trên cùng, tách biệt bệnh lý. **Khỏe mạnh** nổi bật xanh lá đầu tiên (Healthy-First Pattern) |
| 2b | "Cho tôi biết thêm về chu kỳ" (chỉ nữ, chỉ khi bật chu kỳ) | Chỉ 2 trường: ngày bắt đầu gần nhất + độ dài chu kỳ. Micro-copy nhấn mạnh giá trị dự đoán |
| 3 | "Gần đây bạn có thay đổi lớn nào không?" | Gender-aware. **Nếu đã bật chu kỳ → ẩn "Mang thai" và "Vừa sinh con"** (logic sinh học) |
| 4 | "Thói quen vận động của bạn?" | 4 mức: đều đặn / thỉnh thoảng / ít vận động / muốn bắt đầu |
| 5 | "Có thói quen nào muốn cải thiện?" | Multi-select: thức khuya, rượu bia, ăn uống, stress, hút thuốc, "mình ổn" |
| 6 | "Ai là người bạn muốn chăm sóc nhất?" | Bản thân / Con cái / Ba mẹ ông bà / Cả gia đình → trigger Family Hub |
| 7 | Chọn cây (chỉ G3) hoặc hiện Khu vườn (nhiều bệnh) | 1 bệnh → chọn cây. ≥2 bệnh → hiện khu vườn tự động |
| 8 | Kết quả | Chỉ hiện: Cây + Tên nhóm + 1 câu mô tả. Không hiện Care Plan/CLTV/Cross-sell |

### Các quyết định UX then chốt

- **Nút CTA cố định (sticky)** ở cuối mọi màn hình — người dùng không cần cuộn để nhấn
- **"Không muốn chia sẻ"** ở mọi câu hỏi → không tạo friction tâm lý, không bỏ cuộc giữa chừng
- **Micro-copy** mỗi màn hình giải thích tại sao hỏi và giá trị nhận được
- **Healthy-First Pattern:** "Khỏe mạnh" nổi bật đầu tiên → người khỏe hoàn thành nhanh, không bị lo lắng
- **Thứ tự theo tần suất:** Lựa chọn phổ biến nhất ở trên, hiếm gặp nhất ở dưới (mang thai → cuối cùng)
- **Icon 3D:** Tất cả icon dùng gradient + inset shadow + perspective transform tạo chiều sâu
- **Tính năng chu kỳ kinh nguyệt:** Card hồng nổi bật riêng cho nữ, micro-copy nhấn "dự đoán chính xác kỳ kinh tiếp theo"

### Logic phân loại (Decision Tree)

```
Tuổi < 18 → G5 (Hồ sơ gia đình)
Tuổi ≥ 60 → flag G6

Bước 2: Bệnh lý (priority cao → thấp)
  Mãn tính (tiểu đường/huyết áp/mỡ máu/xương khớp/tiêu hóa) → G3
  Hồi phục → G7
  Tâm thần → G8
  Nguy cơ → G2
  Khỏe mạnh → tiếp tục

Bước 3: Hành trình cuộc sống
  Mang thai / Sau sinh → G4
  Chăm người thân → G11 (Secondary)

Bước 4: Lối sống (nếu chưa có Primary)
  Thể thao → G9
  Văn phòng/ít vận động → G10
  Di chuyển nhiều → G12
  Bình thường → G1

Dual-segment: Primary (bệnh lý/hành trình) + Secondary (lối sống)
```

---

## 6. ARCHITECTURE & GOVERNANCE

### Kiến trúc 5 tầng

1. **Presentation:** App mobile (React Native), Pharmacist Dashboard, Family Hub Interface
2. **Application:** Care Plan Engine, Gamification Service, Notification Orchestrator, Refill Subscription, Voucher Service
3. **AI/ML:** Data Agent → AI Analysis Engine → Pharmacist Approval Gate (Human-in-the-Loop)
4. **Data:** Health ID Store (AES-256), Transactional Data Lake, Behavioral Event Stream, Medical Adherence Ledger (immutable)
5. **Infrastructure:** Multi-region (data residency VN), Zero-trust, Audit & Compliance Engine

### AI Governance — 5 Guardrails

1. **Không tự ý chẩn đoán:** AI chỉ output Drafts, không output quyết định
2. **100% Human Approval:** Dược sĩ bấm Approve trước mọi push notification
3. **Output Blocking:** AI bị chặn quyền truy cập trực tiếp vào Notification Service
4. **CDSS Cross-check:** Hệ thống kiểm tra logic chéo trước khi tạo Draft
5. **Data Minimization:** AI chỉ nhận anonymized data, không truy cập raw PII

### AI Incident Response (4 bước)

Detect (0–15 phút) → Contain / Kill switch (15–60 phút) → Notify user & leadership (1–4 giờ) → Remediate & Post-mortem (7 ngày)

### Tuân thủ pháp lý

- Luật Dược 2016, Nghị định 13/2023 (BVDLCN), Thông tư 48/2023 Bộ Y tế
- Tích hợp VNeID cho xác thực
- Lộ trình ISO 27001 trong 18 tháng đầu

### RACI Matrix

Dược sĩ là **Accountable** cho mọi quyết định liên quan đến sức khỏe người dùng. Product team là **Responsible** cho thiết kế tính năng. AI Engine chỉ là **Consulted**.

---

## 7. METRICS FRAMEWORK

### MECE Revenue Tree

```
Revenue Long Châu Care
├── Nhà Thuốc = Users × AOV × Frequency
│   ├── Frequency tăng nhờ Refill Subscription
│   └── AOV tăng nhờ Drug Interaction Alert gợi ý bổ trợ
├── Lab = Users × AOV × Frequency
│   └── Users từ Cross-sell qua Care Plan và Voucher
└── Tiêm Chủng = Users × AOV × Frequency
    └── Users từ Care Plan nhóm Khỏe Mạnh nhắc lịch CDC
```

### 3 Growth Levers

| Lever | Hiện tại | Mục tiêu | Tăng |
|-------|----------|----------|------|
| AOV | 250k | 400k | +60% |
| Frequency | 1.8×/tháng | 3.2×/tháng | +77% |
| Lifetime | 18 tháng | 36 tháng | +100% |

### Acquisition Loop (2 vòng lặp)

1. **Family Hub Referral Loop:** User → mời gia đình → K-factor 0.4 → giảm 40% CAC
2. **Health Milestone Content Loop:** Đạt cột mốc → chia sẻ MXH → 10–20% organic growth

### Hệ thống đo lường 3 tầng

- **North Star:** Medical Adherence Days ≥ 20 ngày/tháng
- **Input Metrics (Leading):** % hoàn thành Profile, % đặt Reminder, # Voucher đổi tại Lab
- **Output Metrics (Lagging):** DAU +40%, A30: 55%, Frequency: 3.2×, AOV: 400k, K-factor: 0.4

---

## 8. SLIDE DECK — TÍCH HỢP CHỈ SỐ

### Bản gốc: 19 slides Canva (Healthcare_Ecosystem_Strategic_Blueprint.pptx)

### Bản NotebookLM: 14 slides mới (Long_Châu_Care_Ecosystem.pdf)

Đã tạo mapping chi tiết: slide mới nào thay slide gốc nào, giữ lại slide nào, bỏ slide nào. Kết quả: **16 slides** gọn hơn, data-driven hơn.

### Các chỉ số đã lồng ghép vào slide

- Slide vấn đề: A7=15%, A30=12%, Frequency=1.8×
- Slide hệ sinh thái: 2 Acquisition Loops + K-factor
- Slide 4 Phase: KPI cụ thể cho từng phase
- Slide 3 nhóm: CLTV/AOV/Frequency từng nhóm
- Slide business model: MECE Revenue Tree + CLTV formula
- Slide mới: 3 tầng Metrics (North Star → Input → Output)
- Slide closing: AOV +60%, Frequency +77%, Lifetime +100%

---

## 9. DANH SÁCH FILE ĐÃ TẠO

| File | Loại | Mô tả |
|------|------|-------|
| `LongChauCare_PitchDeck_ChauThuc.pptx` | PPTX | Pitch deck 9 slides (bản đầu) |
| `longchau_product_roadmap.html` | HTML | Product Roadmap tương tác |
| `LongChau_Metrics_Guide.html` | HTML | Hướng dẫn tích hợp chỉ số vào slide |
| `LongChau_Metrics_NotebookLM.txt` | TXT | Giải thích chỉ số cho NotebookLM |
| `LongChau_Slides_Final.txt` | TXT | Nội dung slide có lồng ghép chỉ số cho NotebookLM |
| `VuonThaoDuoc_Slide.txt` | TXT | Nội dung 1 slide Vườn Thảo Dược cho NotebookLM |
| `LongChauCare_NotebookLM_v2.docx` | DOCX | Bản Word cho NotebookLM |
| `LongChau_Architecture_Governance.html` | HTML | Kiến trúc 5 tầng + Quản trị AI + RACI |
| `LongChau_SegmentTaxonomy.html` | HTML | Taxonomy 12 nhóm người dùng đầy đủ |
| `VuonThaoDuoc_CayVaFlow.html` | HTML | 5 loại cây + 5 giai đoạn + 7 edge cases + Onboarding flow |
| `LongChau_OnboardingFlow.html` | HTML | Prototype onboarding v1 (dark theme) |
| `LongChau_Onboarding_v2.html` | HTML | v2: light theme, gender-aware |
| `LongChau_Onboarding_v3.html` | HTML | v3: trắng+xanh dương Long Châu, chọn cây G3 |
| `LongChau_Onboarding_v4.html` | HTML | v4: conversational UX, 8 màn hình |
| `LongChau_Onboarding_v4_artifact.html` | HTML | v4 artifact cho iPad |
| `LongChau_Onboarding_v5.html` | HTML | **v5 (bản mới nhất):** chu kỳ tách riêng, icon 3D, logic sinh học |

---

## 10. CÁC QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG NHẤT

1. **Mẹ bầu là Life Stage, không phải Disease** → tạo trục phân loại riêng, không ép vào Nguy Cơ hay Mãn Tính

2. **Cây không bao giờ chết** → Guilt-Free Design, chỉ Ngủ Đông. Đây là ranh giới đạo đức y khoa mà gamification không được vượt qua

3. **AI không bao giờ output trực tiếp** → 100% qua Dược sĩ Approve. Không có ngoại lệ, kể cả cảnh báo khẩn cấp

4. **Healthy-First Pattern** → đặt "Khỏe mạnh" lên đầu, nổi bật xanh lá. Giảm anxiety cho 70% user không có bệnh

5. **Dual-Segment** → 1 user có thể thuộc 2 nhóm đồng thời (Primary bệnh lý + Secondary lối sống). Care Plan tự động kết hợp

6. **Khu vườn nhiều cây** → nếu user có ≥2 bệnh mãn tính, hiển thị garden thay vì bắt chọn 1 cây. Mỗi cây grow độc lập

7. **Chu kỳ kinh nguyệt tách riêng khỏi bệnh lý** → đưa lên trên cùng khi chọn Nữ, không xếp chung với tiểu đường/huyết áp

8. **Nếu bật chu kỳ → ẩn mang thai/sau sinh** → logic sinh học: đang theo dõi chu kỳ = không mang thai

9. **Voucher không áp dụng thuốc kê đơn** → ranh giới pháp lý và đạo đức tuyệt đối

10. **"Không muốn chia sẻ" ở mọi màn hình** → người dùng luôn có quyền bỏ qua mà không bị friction

---

## 11. CÂU HỎI DỰ KIẾN TỪ BAN GIÁM KHẢO

| Câu hỏi | Gợi ý trả lời |
|---------|---------------|
| North Star Metric là gì? | Medical Adherence Days — số ngày tuân thủ Care Plan/tháng. Tuân thủ cao → khỏe hơn → tin tưởng → mua nhiều → giới thiệu nhiều |
| CLTV cải thiện thế nào? | 3 lever: AOV +60% (cross-sell), Frequency +77% (Refill), Lifetime +100% (switching cost) |
| Acquisition Loop không có paid? | Family Hub Referral (K=0.4, giảm 40% CAC) + Health Milestone Content Loop (10–20% organic) |
| Tại sao Mãn Tính là priority #1? | Frequency cao nhất (4–6×/tháng), Lifetime dài nhất, Switching Cost cao nhất → CLTV tối đa |
| AI Hallucination thì sao? | 5 Guardrails + Kill switch + 100% Dược sĩ Approve. AI làm thợ, Dược sĩ quyết định |

---

*Tài liệu này tóm tắt toàn bộ ~30 lượt trao đổi trong cuộc hội thoại, từ chiến lược sản phẩm đến thiết kế UX chi tiết, kiến trúc hệ thống, và metrics framework cho Long Châu Care.*
