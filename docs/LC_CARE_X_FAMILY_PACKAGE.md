
# LC Care × Family Package — Đề xuất tích hợp (BOD Pitch)

> 🖼 **UI mockup 4 điểm ghép**: mở `design/mockups/lc-care-x-family-package.html` bằng trình duyệt.

> **Một câu**: Family Package đang trả lời câu hỏi *"gia đình đã chi bao nhiêu"* — LC Care bổ sung trục thứ hai *"gia đình khỏe thế nào"*, biến quãng nghỉ giữa 2 lần mua thành hành trình chăm sóc hằng ngày, và biến dữ liệu chăm sóc thành gợi ý mua **đúng lúc, đúng người**.

---

## 1. Family Package hôm nay — đọc từ chính 4 màn hình

| Màn hình                                   | Đang có                                                        | Điểm nghẽn                                                                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hành trình** (Biển Khởi Nguyên) | 5 đảo = 5 mốc chi tiêu (15tr → 60tr)                        | Funnel rơi rất gắt:**1520 → 520 → 450 → 350 → 50** gia đình. Gia đình xa mốc (còn 10tr mới tới Đảo 2) mất động lực → bỏ app |
| **Trang chủ**                         | Nhiệm vụ chi tiêu + Trắc nghiệm mỗi ngày (streak 7 ngày) | Quiz hỏi*"nhà mình có ai ho, sổ mũi không?"* nhưng **câu trả lời không đi về đâu** — hỏi xong cho 10 điểm rồi thôi         |
| **Ví Voucher**                        | 51 voucher, có cả tiêm chủng, xét nghiệm                   | Voucher phát theo mốc tiền,**không theo nhu cầu sức khỏe** → redeem thấp, cảm giác spam                                                 |
| **Gia đình**                         | Hồ sơ 3 thế hệ (thành viên sinh 1952, 1960, 1972)          | Có ngày sinh, giới tính của người cao tuổi nhưng**không dùng để chăm sóc gì cả**                                                  |

**Chốt vấn đề**: chỉ có 1 nhiên liệu duy nhất là *chi tiêu*. Giữa 2 lần mua thuốc, lý do mở app mỗi ngày chỉ là 1 câu quiz 10 giây. Engagement chết dần khi ví chưa cần mua gì.

---

## 2. Ý tưởng: Thuyền cần cả thân lẫn gió

**Family Package = thân thuyền (spend engine). LC Care = gió (care engine).** Giữ nguyên toàn bộ khung đảo – thuyền – voucher đang có, cắm engine chăm sóc của LC Care vào 4 điểm:

### 2.1. Trắc nghiệm mỗi ngày → **Care Check-in** *(quick win — không đổi UI)*

- Giữ nguyên format 1 câu/ngày + streak + điểm thưởng.
- Câu hỏi do LC Care engine **sinh theo hồ sơ gia đình**: ông Hùng (74 tuổi) → *"Sáng nay ông đo huyết áp chưa?"*; nhà có trẻ nhỏ → câu hỏi nhi khoa theo mùa.
- Câu trả lời trở thành **care signal** chạy qua 3-Layer Smart Gate:
  - *"Có 1 người ho"* → auto-đẩy voucher **tiêm cúm 200K** (voucher này ĐÃ có sẵn trong quà Đảo 2) + gợi ý sản phẩm ho đúng độ tuổi.
  - Tín hiệu nặng/lặp lại (ho 3 ngày liên tiếp ở người cao tuổi) → đẩy vào hàng đợi Dược sĩ Care Team gọi ra.
- **Cùng một ô UI, thêm não phía sau** — đây là thứ demo được cho BOD nhanh nhất.

### 2.2. Một **Khu Vườn Gia Đình** duy nhất — đất & decor nâng theo đảo

- Cây gắn với *người* (thói quen, lớn liên tục mỗi ngày), đảo gắn với *mốc tiền* (rời rạc, đi qua là bỏ lại) — hai vòng đời khác nhau, nên **không trồng vườn mới mỗi đảo**. Gia đình chỉ có 1 vườn; mỗi thành viên 1 cây thảo dược theo hành trình sức khỏe (Gừng = uống thuốc đúng giờ, Nghệ = đo chỉ số, Tía Tô = nhi khoa…).
- **Cập đảo mới = chuyển nhà, không trồng lại**: cây bê nguyên sang (giữ level, giữ streak), đảo mới chỉ nâng "đất" — thêm slot cây, biome/decor mới, mở loài mới trong bộ 7 cây. Animation thuyền chở chậu cây sang đảo mới là khoảnh khắc celebration khi cập bến. Về data, đảo chỉ quyết định `garden_tier` (số slot, decor) — không phải migrate gì.
- **Đảo đã qua** giữ "chậu vàng kỷ niệm" (snapshot vườn + số ngày chăm); **đảo chưa tới** hiện preview đất (*"+2 slot, mở cây Hoa Sen"*) — thành mồi leo đảo bên cạnh quà voucher.
- Hành động chăm sóc (tưới cây = check-in uống thuốc, đo chỉ số, vận động) tích **"Hải lý chăm sóc"** — trục tiến độ thứ 2 chạy song song mốc chi tiêu:
  - Thêm **Nhiệm vụ 3** cạnh 2 nhiệm vụ chi tiêu hiện tại: *"Cả nhà tưới cây đủ 5/7 ngày trong tuần"*.
  - Vì vườn không phụ thuộc đảo, gia đình kẹt giữa 2 mốc tiền hàng tháng trời vẫn có một trục tiến bộ chạy mỗi ngày → giữ chân đúng nhóm 1.000 gia đình đang kẹt giữa Đảo 1 và Đảo 2.

### 2.3. "Gợi ý tăng tốc chi tiêu" → **"Gợi ý chăm sóc đúng lúc"**

- Thay recommendation generic (Ensure, vitamin…) bằng recommendation sinh từ **care plan + tín hiệu check-in**: bé ho 2 ngày → siro + voucher khám; ông sắp hết thuốc huyết áp (suy ra từ chu kỳ mua) → nhắc refill kèm voucher.
- Vẫn là push-to-spend, nhưng có lý do sức khỏe đi kèm → **conversion cao hơn, cảm giác spam thấp hơn**.

### 2.4. Đảo cao (Đảo 3+) → mở khóa **Dược sĩ Care Team chuyên trách**

- Phần thưởng tier cao không chỉ là voucher to hơn, mà là **một dược sĩ online chuyên trách cho cả nhà** — giá trị cảm nhận cao, chi phí biên thấp (dược sĩ tại quầy zero impact, mô hình Care Team đã thiết kế trong LC Care).
- Đây là mồi để gia đình leo đảo: voucher thì chuỗi nào cũng phát được, **dược sĩ riêng cho gia đình thì chỉ Long Châu làm được**.

---

## 3. Vòng dữ liệu tự nuôi (điểm khác biệt kỹ thuật)

```
Check-in / tưới cây / OCR đơn thuốc
        │  (care signals)
        ▼
3-Layer Smart Gate ──► 70% auto: voucher + gợi ý đúng lúc
        │               30% gate: Dược sĩ Care Team
        ▼
Hồ sơ sức khỏe gia đình (first-party data)
        │
        ▼
Gợi ý chi tiêu cá nhân hóa ──► Giao dịch FP
        │                          │
        └──── Cross-Validation ◄───┘
              (đối chiếu "đã báo uống thuốc" vs "đã mua thuốc"
               → chống farm điểm, dữ liệu adherence tin được)
```

- **Cross-Validation Agent**: đối chiếu số lần "tưới cây uống thuốc" với lịch sử xuất kho FP — dữ liệu giao dịch FP **đã có sẵn**, LC Care chỉ đọc. Chống gian lận điểm mà không làm phiền người dùng.
- Càng chăm sóc → data càng dày → gợi ý càng trúng → mua càng đều → lại có data mua để đối chiếu. Loyalty thuần chi tiêu không tự nuôi được vòng này.

---

## 4. Lộ trình 3 phase

| Phase                           | Thời gian | Nội dung                                                                                        | Vì sao trước                                                               |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| **1 — Quick win**        | 4–6 tuần | Care Check-in thay quiz tĩnh + care signal → voucher targeting (tiêm cúm, xét nghiệm)      | Không đổi UI, đo được uplift redeem voucher ngay, rủi ro gần bằng 0 |
| **2 — Care progression** | 1 quý     | Vườn gia đình trên đảo + Nhiệm vụ 3 (hải lý chăm sóc) + Cross-Validation Agent      | Cần Phase 1 chạy để có dòng care signal ổn định                      |
| **3 — Care Team**        | quý tiếp | Dược sĩ chuyên trách cho Đảo 3+ / tier trả phí + care plan cá nhân + OCR đơn thuốc | Cần data 2 phase đầu để route đúng 30% ca cần người thật           |

**Độ khả thi**: kiến trúc LC Care tái sử dụng **~65% hạ tầng FP hiện có** (Family graph, Loyalty core, Gamification, Event streaming — đã phân tích trong `docs/presentation.md`), và đã có **demo chạy thật** tại chauthuc.web.app (frontend React PWA + backend FastAPI 9 services + AI gate Gemini/OCR).

---

## 5. Business case — con số BOD quan tâm

| Vấn đề hiện tại                               | LC Care giải quyết                                                 | KPI đo                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Funnel đảo rơi 1520 → 50 gia đình            | Trục tiến độ chăm sóc giữ chân nhóm kẹt giữa 2 mốc tiền | D30 retention của gia đình chưa đạt mốc kế tiếp  |
| App chỉ mở khi mua                               | Lý do mở app mỗi ngày ~2 phút (check-in + tưới cây)          | DAU/MAU của gói gia đình                              |
| Voucher tiêm chủng/xét nghiệm phát đại trà | Phát theo tín hiệu sức khỏe thật                               | Tỉ lệ redeem voucher tiêm chủng, xét nghiệm         |
| Gợi ý mua hàng generic                          | Gợi ý từ care plan + check-in                                     | Conversion của khối "gợi ý", tần suất mua lặp lại |
| Không có data sức khỏe first-party             | Check-in + OCR + cross-validation → hồ sơ tin được             | Số hồ sơ gia đình có ≥1 care signal/tuần          |

---

## 6. Đề nghị BOD quyết

1. **Approve Phase 1** (Care Check-in engine cắm vào ô Trắc nghiệm hiện có) làm pilot 4–6 tuần trên một tập gia đình — đo uplift redeem voucher tiêm chủng làm gate cho Phase 2.
2. Cho LC Care team **quyền đọc 2 nguồn dữ liệu FP**: family graph (hồ sơ thành viên) và lịch sử giao dịch (phục vụ targeting + cross-validation).
3. Chốt chủ quản mô hình **Dược sĩ Care Team** (khối Dược) để chuẩn bị nhân sự cho Phase 3.
