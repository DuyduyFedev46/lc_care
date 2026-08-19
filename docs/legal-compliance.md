# Long Châu Care — Legal & Regulatory Compliance Framework

> **Mục đích**: Tài liệu tham chiếu pháp lý cho dự án Long Châu Care.
> Mọi quyết định thiết kế và vận hành phải tuân thủ các quy định dưới đây.
> **Cập nhật**: 2026-05-13 · Dành cho vòng 1 cuộc thi.

---

## 1. TỔNG QUAN KHUNG PHÁP LÝ

LC Care hoạt động trong lĩnh vực y tế — ngành được quản lý chặt chẽ nhất tại Việt Nam.
5 văn bản pháp luật chính chi phối toàn bộ thiết kế:

| # | Văn bản | Hiệu lực | Phạm vi ảnh hưởng đến LC Care |
|---|---|---|---|
| 1 | **Luật Khám bệnh, chữa bệnh số 15/2023/QH15** | 01/01/2024 | Ai được chẩn đoán, quyền của người bệnh, telehealth |
| 2 | **Luật Dược số 105/2016/QH13** | 01/01/2017 | Hành nghề Dược sĩ, bán lẻ thuốc, tư vấn sử dụng thuốc |
| 3 | **Nghị định 13/2023/NĐ-CP** | 01/07/2023 | Bảo vệ dữ liệu cá nhân (PDPA Việt Nam) |
| 4 | **Thông tư 46/2018/TT-BYT** | 2018 | Hồ sơ bệnh án điện tử |
| 5 | **Nghị định 96/2023/NĐ-CP** | 01/01/2024 | Hướng dẫn Luật Khám chữa bệnh 2023 |

---

## 2. LUẬT KHÁM BỆNH, CHỮA BỆNH 2023 (Số 15/2023/QH15)

### 2.1. Nguyên tắc cốt lõi ảnh hưởng đến AI trong LC Care

| Điều | Nội dung | LC Care Compliance |
|---|---|---|
| **Điều 3** | Nguyên tắc KCB: "Tôn trọng, bảo vệ, đối xử bình đẳng và không kỳ thị đối với người bệnh" | AI KHÔNG có giấy phép → AI không được chẩn đoán. Rule #0. |
| **Điều 19** | Quyền của người bệnh: được giải thích tình trạng, được tôn trọng, được giữ bí mật | Consent granular, data encryption, user là data owner |
| **Điều 21** | Nghĩa vụ tôn trọng quyền của người bệnh | Dược sĩ approve 100% message trước khi gửi |
| **Điều 100** | Người chịu trách nhiệm chuyên môn kỹ thuật | Dược sĩ là primary liable — AI là secondary actor |
| **Điều 106-108** | Điều kiện hành nghề Dược sĩ | Chỉ DS có chứng chỉ mới được tư vấn thuốc, gán cây, tạo Care Plan |

### 2.2. Telehealth & CNTT trong khám chữa bệnh

| Quy định | LC Care Compliance |
|---|---|
| Khám bệnh từ xa phải do BS/CDHA thực hiện | LC Care KHÔNG khám bệnh từ xa — chỉ nhắc thuốc + theo dõi tuân thủ |
| Phần mềm quản lý khám chữa bệnh phải đạt chuẩn BYT | Medical audit log + source tracking đáp ứng audit trail |
| Hồ sơ bệnh án điện tử phải có chữ ký số | pharmacistLiabilitySignature field cho mỗi DS approve |
| Phiếu kết quả xét nghiệm phải có chữ ký BS | Lab results từ Long Châu Lab có BS đọc — source_type = `lab_with_doctor` |

### 2.3. Phân biệt rõ: AI làm gì vs Người làm gì

```
NGƯỜI CÓ CHỨNG CHỈ HÀNH NGHỀ (BS, Dược sĩ):
  ✅ Chẩn đoán bệnh
  ✅ Kê đơn thuốc
  ✅ Tư vấn điều trị
  ✅ Liên hệ thuốc ↔ bệnh ↔ cây thảo dược

AI (công cụ hỗ trợ):
  ✅ Gom dữ liệu hành chính
  ✅ Trích xuất thông tin từ đơn thuốc
  ✅ Phát hiện pattern hành vi (tuân thủ, refill)
  ✅ Cảnh báo tương tác thuốc (dựa ATC code)
  ✅ Tạo DRAFT hành chính (chưa gửi user)
  ❌ KHÔNG chẩn đoán, kê đơn, tư vấn, đề xuất cây
```

---

## 3. LUẬT DƯỢC 2016 (Số 105/2016/QH13) & NGHỊ ĐỊNH 54/2017/NĐ-CP

### 3.1. Phạm vi hành nghề Dược sĩ

| Điều | Nội dung | LC Care Compliance |
|---|---|---|
| **Điều 11** | Chứng chỉ hành nghề Dược sĩ | Mọi DS trong hệ thống phải có CCHN còn hiệu lực |
| **Điều 13** | Vị trí công tác của Dược sĩ | DS tại quầy (70%) + DS online (30%) — cả 2 đều trong hệ thống |
| **Điều 18** | Điều kiện đối với người chịu trách nhiệm chuyên môn cơ sở bán lẻ thuốc | DS tại quầy phải đạt tiêu chuẩn chuyên môn |
| **Điều 29** | Quyền và nghĩa vụ của người hành nghề Dược | DS được từ chối duyệt nếu AI draft không đạt, phải kiểm tra trước khi approve |
| **Điều 79** | Quảng cáo thuốc: chỉ thuốc không kê đơn được quảng cáo | **Voucher KHÔNG giảm giá thuốc kê đơn** — whitelist strict |
| **Điều 80** | Dược lâm sàng: tư vấn, giám sát kê đơn và sử dụng thuốc | DS tư vấn tuân thủ quy định dược lâm sàng |

### 3.2. Bán lẻ thuốc & Tư vấn sử dụng thuốc

| Quy định | LC Care Compliance |
|---|---|
| Thuốc kê đơn phải có đơn thuốc hợp lệ | OCR đơn thuốc → DS verify → mới tạo Care Plan |
| Không bán thuốc kê đơn không có đơn | Voucher HARVEST whitelist: tuyệt đối KHÔNG cho thuốc kê đơn |
| Tư vấn sử dụng thuốc là trách nhiệm của DS | AI chỉ nhắc giờ uống, không tư vấn cách dùng |
| Niêm yết giá thuốc công khai | Không liên quan trực tiếp đến LC Care |

### 3.3. Dược lâm sàng & Cảnh báo tương tác thuốc

| Quy định | LC Care Compliance |
|---|---|
| DS có trách nhiệm cảnh báo tương tác thuốc | AI detect tương tác dựa trên ATC code → DS đối chiếu lâm sàng |
| Quản lý danh mục thuốc kê đơn | Refill alert dựa trên lịch sử mua + đơn thuốc đã verify |

---

## 4. NGHỊ ĐỊNH 13/2023/NĐ-CP — BẢO VỆ DỮ LIỆU CÁ NHÂN (PDPA VIỆT NAM)

### 4.1. Phân loại dữ liệu trong LC Care

| Loại dữ liệu | Phân loại theo NĐ 13 | Ví dụ trong LC Care |
|---|---|---|
| Dữ liệu cá nhân cơ bản | Được xử lý khi có consent | Tên, email, SĐT, tuổi |
| Dữ liệu cá nhân nhạy cảm | **YÊU CẦU BẢO VỆ CAO** | Tình trạng sức khỏe, bệnh nền, đơn thuốc, chỉ số HA, đường huyết, thai sản |

### 4.2. Nghĩa vụ của Bên Kiểm soát Dữ liệu (Data Controller = Long Châu)

| Điều | Nghĩa vụ | LC Care Compliance |
|---|---|---|
| **Điều 11** | Sự đồng ý: chỉ hợp lệ khi chủ thể tự nguyện và biết rõ nội dung | Consent granular, opt-in từng loại data, có thể rút lại |
| **Điều 12** | Bảo vệ dữ liệu cá nhân | AES-256 at rest + TLS 1.3 in transit |
| **Điều 13** | Thông báo vi phạm dữ liệu | Incident response: Detect → Notify trong 72h |
| **Điều 14** | Xóa dữ liệu khi hết mục đích | User rời LC Care → data retention policy |
| **Điều 15** | Đánh giá tác động xử lý dữ liệu | Privacy Impact Assessment (PIA) trước public launch |

### 4.3. Consent & Quyền của Chủ thể Dữ liệu (Data Subject = User)

| Quyền | Cơ chế trong LC Care |
|---|---|
| **Quyền được biết** | Màn hình onboarding giải thích rõ LC Care dùng data gì, vào mục đích gì |
| **Quyền đồng ý/không đồng ý** | Opt-in từng loại data: đơn thuốc, chỉ số, family sharing |
| **Quyền rút lại đồng ý** | Settings → "Ngừng chia sẻ dữ liệu" → cây pause, data ngừng collect |
| **Quyền xóa dữ liệu** | Settings → "Xóa tài khoản" → xóa data trong 30 ngày |
| **Quyền khiếu nại** | In-app support + email DPO (Data Protection Officer) |

### 4.4. Xử lý dữ liệu trẻ em & Người mất năng lực hành vi

| Trường hợp | LC Care Approach |
|---|---|
| Trẻ em <16 tuổi | Consent từ bố mẹ/người giám hộ qua Family Account |
| Người cao tuổi không dùng smartphone | Người giám hộ (con/cháu) quản lý cây — consent family |
| Người mất năng lực hành vi | Người giám hộ hợp pháp quản lý |

---

## 5. THÔNG TƯ 46/2018/TT-BYT — HỒ SƠ BỆNH ÁN ĐIỆN TỬ

### 5.1. Hồ sơ sức khỏe điện tử

| Yêu cầu | LC Care Compliance |
|---|---|
| Chuẩn định dạng HL7/FHIR | Health ID lưu trữ structured data — sẵn sàng mapping sang FHIR khi scale |
| Kết nối liên thông dữ liệu y tế | VNeID + Sổ SK điện tử integration (P2) |
| Bảo mật và xác thực | Firebase Auth + TLS + Audit log + Pharmacist e-signature |
| Lưu trữ tối thiểu 10 năm | Medical audit log retention policy |

### 5.2. Phần mềm quản lý nhà thuốc

| Yêu cầu | LC Care Compliance |
|---|---|
| Kết nối với hệ thống Dược Quốc gia | FP integration sẵn sàng — drug master data từ hệ thống Long Châu |
| Quản lý xuất nhập tồn thuốc | FP Core quản lý — LC Care chỉ consume data |
| Cảnh báo thuốc hết hạn, thu hồi | Adherence tracker + refill alert |

---

## 6. NGHỊ ĐỊNH 96/2023/NĐ-CP — HƯỚNG DẪN LUẬT KCB 2023

### 6.1. Quy định về người hành nghề và cơ sở khám chữa bệnh

| Quy định | LC Care Compliance |
|---|---|
| Người hành nghề phải đăng ký hành nghề | DS trong hệ thống đều có CCHN + đăng ký tại Sở Y tế |
| Cơ sở bán lẻ thuốc phải có giấy phép | Long Châu là chuỗi nhà thuốc đạt chuẩn GPP |
| Phạm vi hoạt động chuyên môn | DS tư vấn trong phạm vi thuốc — không vượt quá sang chẩn đoán BS |

### 6.2. Trách nhiệm pháp lý

| Bên | Trách nhiệm | Căn cứ pháp lý |
|---|---|---|
| **Dược sĩ** | Chịu trách nhiệm về tư vấn sử dụng thuốc | Điều 100 Luật KCB 2023 |
| **Long Châu (Pháp nhân)** | Chịu trách nhiệm về hệ thống, bảo mật, vận hành | Điều 108-110 Luật KCB 2023 |
| **AI System (Công cụ)** | Không phải pháp nhân — không chịu trách nhiệm pháp lý | AI là secondary actor |
| **Dev Team** | Chịu trách nhiệm kỹ thuật: sensor hoạt động, data encrypt, audit log | Hợp đồng lao động + trách nhiệm sản phẩm |

---

## 7. MAPPING: QUY ĐỊNH PHÁP LUẬT → LC CARE COMPLIANCE MECHANISM

| # | Yêu cầu pháp lý | Cơ chế tuân thủ trong LC Care | File liên quan |
|---|---|---|---|
| 1 | Chỉ BS được chẩn đoán | Rule #0 + AI Forbidden Words Sensor | `agents.md`, `demo/functions/utils/forbidden_words.js` |
| 2 | Chỉ DS được tư vấn thuốc | DS gate 100% message y tế + pharmacistLiabilitySignature | `demo/functions/pharmacy.js` |
| 3 | Bảo vệ dữ liệu cá nhân | AES-256 + TLS 1.3 + Consent granular + User data rights | Firestore rules, `demo/functions/utils/compliance.js` |
| 4 | Lưu trữ hồ sơ y tế 10 năm | medical_audit_log immutable + exportable | `demo/functions/utils/audit.js` |
| 5 | Nguồn gốc dữ liệu hợp pháp | 5 source_type + Pharmacist source verification | `health_conditions.source_type` |
| 6 | Không bán thuốc kê đơn qua voucher | Voucher whitelist: bông băng, nước muối, TPCN cơ bản, dịch vụ Lab/Vac | `demo/functions/utils/safety.js` |
| 7 | Chữ ký điện tử trên hồ sơ y tế | pharmacistLiabilitySignature trong pharmacistQueue | Firestore data model |
| 8 | Consent trước khi xử lý data | Progressive consent flow + family sharing consent | Onboarding UI |
| 9 | Thông báo vi phạm dữ liệu trong 72h | Incident response protocol | `RUNBOOK.md` |
| 10 | Quyền xóa dữ liệu của user | Delete account → wipe data trong 30 ngày | Settings UI |

---

## 8. RỦI RO PHÁP LÝ & GIẢM THIỂU

| # | Rủi ro | Mức độ | Cơ chế giảm thiểu | Căn cứ pháp lý |
|---|---|---|---|---|
| 1 | AI hallucinate → thông tin sai y tế đến user | 🔴 CRITICAL | DS gate bắt buộc, Forbidden words sensor, Audit log | Điều 100 Luật KCB 2023 |
| 2 | Lộ dữ liệu sức khỏe user | 🔴 CRITICAL | AES-256, Firestore rules, Zero-trust access | Điều 12 NĐ 13/2023 |
| 3 | DS tư vấn sai dựa trên AI brief | 🟡 HIGH | Audit trail lưu cả AI draft + DS edit. DS primary liable. | Điều 100 Luật KCB 2023 |
| 4 | Vi phạm quy định về quảng cáo thuốc | 🟡 MEDIUM | Voucher whitelist strict — không giảm giá thuốc kê đơn | Điều 79 Luật Dược 2016 |
| 5 | Consent không hợp lệ (trẻ em, người già) | 🟡 MEDIUM | Family consent flow + guardian verification | Điều 14 NĐ 13/2023 |
| 6 | Không đáp ứng thời gian lưu trữ hồ sơ | 🟡 MEDIUM | Medical audit log immutable + cold storage policy | TT 46/2018/TT-BYT |
| 7 | Thay đổi quy định pháp luật | 🟢 LOW | Kiến trúc module hóa — dễ update từng phần | — |

---

## 9. COMPLIANCE CHECKLIST — TRƯỚC PUBLIC LAUNCH

- [ ] **Privacy Impact Assessment (PIA)** — hoàn thành và nộp Bộ Công an (nếu cần)
- [ ] **Data Processing Agreement (DPA)** — ký với mọi bên thứ 3 (Google Cloud, Firebase)
- [ ] **Consent Flow Audit** — luật sư review toàn bộ màn hình consent
- [ ] **Pharmacist Training** — 100% DS hoàn thành 4 module training
- [ ] **Penetration Testing** — security audit độc lập trước khi public
- [ ] **Data Retention Policy** — documented + implemented
- [ ] **Incident Response Plan** — 4 bước: Detect → Contain → Notify → Remediate
- [ ] **DPO Appointment** — chỉ định Data Protection Officer
- [ ] **VNeID Integration** — nếu dùng Sổ SK điện tử, phải tuân thủ chuẩn kết nối BYT
- [ ] **Báo cáo BYT** — nếu được phân loại là phần mềm quản lý khám chữa bệnh

---

## 10. TÀI LIỆU THAM KHẢO

| # | Văn bản | Link chính thức |
|---|---|---|
| 1 | Luật Khám bệnh, chữa bệnh 2023 | [vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=580974](https://vbpl.vn) |
| 2 | Luật Dược 2016 | [vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=282300](https://vbpl.vn) |
| 3 | Nghị định 13/2023/NĐ-CP | [vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=579491](https://vbpl.vn) |
| 4 | Thông tư 46/2018/TT-BYT | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-46-2018-TT-BYT-su-dung-va-quan-ly-ho-so-benh-an-dien-tu-391438.aspx) |
| 5 | Nghị định 96/2023/NĐ-CP | [vbpl.vn](https://vbpl.vn) |
| 6 | Nghị định 54/2017/NĐ-CP (hướng dẫn Luật Dược) | [vbpl.vn](https://vbpl.vn) |

---

*Tài liệu này là cơ sở pháp lý cho mọi quyết định thiết kế của Long Châu Care. Mọi thay đổi kiến trúc phải được đối chiếu với tài liệu này.*
