# Trích dẫn pháp lý — Long Châu Care

> **Mục đích**: Tham chiếu nhanh các điều luật cụ thể áp dụng vào LC Care.
> **Dùng cho**: Slide compliance, Q&A giám khảo, checklist review.
> **Nguồn đầy đủ**: [`docs/legal-compliance.md`](docs/legal-compliance.md)

---

## Luật Khám bệnh, chữa bệnh 2023 (Số 15/2023/QH15)

| Điều | Nội dung | Áp dụng vào LC Care |
|---|---|---|
| **Điều 3** | Nguyên tắc KCB: tôn trọng, bảo vệ, đối xử bình đẳng, không kỳ thị | AI không có GPHN → **AI không được chẩn đoán** (Rule #0) |
| **Điều 19** | Quyền của người bệnh: được giải thích tình trạng, được tôn trọng, được giữ bí mật | Consent granular, user là data owner, encryption |
| **Điều 100** | Người hành nghề chịu trách nhiệm chuyên môn kỹ thuật | **Dược sĩ là primary liable** — AI là secondary actor |
| **Điều 106-108** | Điều kiện hành nghề: phải có chứng chỉ hành nghề, phạm vi chuyên môn rõ ràng | Chỉ DS có CCHN mới được tư vấn thuốc, gán cây, tạo Care Plan |

> **Trích nguyên văn**:
> - Điều 3, khoản 1 — *"Tôn trọng, bảo vệ, đối xử bình đẳng và không kỳ thị, phân biệt đối xử đối với người bệnh."*
> - Điều 100 — *"Người hành nghề chịu trách nhiệm chuyên môn kỹ thuật đối với việc khám bệnh, chữa bệnh do mình thực hiện."*

---

## Luật Dược 2016 (Số 105/2016/QH13)

| Điều | Nội dung | Áp dụng |
|---|---|---|
| **Điều 11** | Chứng chỉ hành nghề Dược — điều kiện bắt buộc | Mọi DS trong hệ thống phải có CCHN còn hiệu lực |
| **Điều 18** | Điều kiện đối với người chịu trách nhiệm chuyên môn cơ sở bán lẻ thuốc | DS tại quầy phải đạt tiêu chuẩn |
| **Điều 29** | Quyền và nghĩa vụ của người hành nghề Dược | DS được từ chối duyệt nếu AI draft không đạt |
| **Điều 79** | Quảng cáo thuốc: chỉ thuốc không kê đơn được quảng cáo | **Voucher KHÔNG giảm giá thuốc kê đơn** — whitelist strict |
| **Điều 80** | Dược lâm sàng: tư vấn, giám sát kê đơn, sử dụng thuốc | DS tư vấn tuân thủ theo đúng quy định dược lâm sàng |

> **Trích nguyên văn**:
> - Điều 29, khoản 1 — *"Được đào tạo, cập nhật kiến thức, trao đổi thông tin chuyên môn, pháp luật về dược."*
> - Điều 79 — Thuốc được quảng cáo phải thuộc danh mục thuốc **không kê đơn**. Thuốc kê đơn không được phép quảng cáo ra công chúng.

---

## Nghị định 13/2023/NĐ-CP — Bảo vệ dữ liệu cá nhân

| Điều | Nội dung | Áp dụng |
|---|---|---|
| **Điều 2, khoản 4** | Dữ liệu sức khỏe là **dữ liệu cá nhân nhạy cảm** — yêu cầu bảo vệ cao nhất | AES-256 + TLS 1.3 |
| **Điều 2, khoản 11** | Sự đồng ý phải rõ ràng, tự nguyện, khẳng định cho phép xử lý | Opt-in từng loại data |
| **Điều 11** | Sự đồng ý chỉ có hiệu lực khi chủ thể tự nguyện và biết rõ nội dung | Consent granular, có thể rút lại bất kỳ lúc nào |
| **Điều 13** | Thông báo vi phạm dữ liệu trong **72 giờ** cho A05 | Incident response: Detect → Notify ≤72h |
| **Điều 14** | Xóa dữ liệu khi hết mục đích xử lý | User rời LC Care → data retention policy |
| **Điều 15** | Đánh giá tác động xử lý dữ liệu (PIA) | PIA bắt buộc trước public launch |
| **Điều 17** | Xử lý dữ liệu KHÔNG cần đồng ý: khẩn cấp bảo vệ tính mạng | Áp dụng cho cảnh báo tương tác thuốc khẩn cấp |

> **Trích nguyên văn**:
> - Điều 2, khoản 4, điểm b — *"Tình trạng sức khỏe và đời tư được ghi trong hồ sơ bệnh án, không bao gồm thông tin về nhóm máu."*
> - Điều 2, khoản 11 — *"Sự đồng ý của chủ thể dữ liệu là việc thể hiện rõ ràng, tự nguyện, khẳng định việc cho phép xử lý dữ liệu cá nhân của chủ thể dữ liệu."*
> - Điều 11, khoản 2 — *"Sự đồng ý của chủ thể dữ liệu chỉ có hiệu lực khi chủ thể dữ liệu tự nguyện và biết rõ các nội dung sau..."*

---

## Thông tư 46/2018/TT-BYT — Hồ sơ bệnh án điện tử

> **Lưu ý**: Phiên bản trước nhầm ghi "Thông tư 48/2023/TT-BYT" — **không tồn tại**. Thông tư đúng về hồ sơ bệnh án điện tử là **46/2018/TT-BYT** (28/12/2018, hiệu lực 01/03/2019).

| Điều | Nội dung | Áp dụng |
|---|---|---|
| **Điều 2** | Hồ sơ bệnh án điện tử có **giá trị pháp lý như bệnh án giấy** | Digital-first approach hợp pháp |
| **Điều 4** | Nguyên tắc: mỗi người bệnh 1 mã số, phải có chữ ký số | Health ID unique per user + chữ ký DS |
| **Điều 5** | Cập nhật hồ sơ bệnh án điện tử tối đa 12h từ khi có y lệnh | Real-time adherence logging |
| **Điều 7** | Yêu cầu hạ tầng CNTT (server, backup, bảo mật) | Firebase/Google Cloud đáp ứng |
| **Điều 8** | Lưu trữ hồ sơ y tế — thời gian lưu theo Luật KCB | medical_audit_log immutable + cold storage policy |

> **Trích nguyên văn**:
> - Điều 2 — *"Hồ sơ bệnh án điện tử được lập, cập nhật, hiển thị, ký số, lưu trữ bằng phương tiện điện tử đáp ứng các quy định của Thông tư này thì có giá trị pháp lý như hồ sơ bệnh án giấy quy định tại Điều 59 Luật Khám bệnh, chữa bệnh."*
> - Điều 8 — *"Thời gian lưu trữ hồ sơ bệnh án điện tử thực hiện theo quy định của Luật Khám bệnh, chữa bệnh."*

---

## Nghị định 96/2023/NĐ-CP — Hướng dẫn Luật KCB 2023

| Điều | Nội dung | Áp dụng |
|---|---|---|
| **Điều 22** | Người hành nghề phải đăng ký hành nghề tại Sở Y tế | DS trong hệ thống có CCHN + đăng ký |
| **Điều 35** | Cơ sở bán lẻ thuốc phải đạt GPP | Long Châu là chuỗi nhà thuốc GPP certified |
| **Điều 42** | Phạm vi hoạt động chuyên môn | DS tư vấn trong phạm vi thuốc — không vượt sang chẩn đoán |

---

## Tổng hợp nhanh

```
AI KHÔNG chẩn đoán     ← Điều 3 + 100 Luật KCB 2023
DS chịu trách nhiệm    ← Điều 100 Luật KCB 2023 + Điều 29 Luật Dược 2016
Không quảng cáo Rx     ← Điều 79 Luật Dược 2016
Data sức khỏe = nhạy cảm ← Điều 2, khoản 4 NĐ 13/2023/NĐ-CP
Consent bắt buộc       ← Điều 11 NĐ 13/2023/NĐ-CP
Lưu trữ hồ sơ y tế    ← Điều 8 TT 46/2018/TT-BYT + Luật KCB 2023
GPP certified          ← Điều 35 NĐ 96/2023/NĐ-CP
```

---

## Mapping: Điều luật → LC Care Mechanism

| # | Yêu cầu pháp lý | Cơ chế LC Care | File |
|---|---|---|---|
| 1 | Chỉ BS được chẩn đoán | Rule #0 + Forbidden Words Sensor | `agents.md` |
| 2 | Chỉ DS được tư vấn thuốc | DS gate 100% message y tế | `demo/functions/pharmacy.js` |
| 3 | Bảo vệ dữ liệu cá nhân | AES-256 + TLS 1.3 + Consent granular | `demo/firestore.rules` |
| 4 | Lưu trữ hồ sơ y tế theo Luật KCB | medical_audit_log immutable | `demo/functions/utils/audit.js` |
| 5 | Nguồn dữ liệu hợp pháp | 5 source_type + DS xác minh | `solution-design.md` |
| 6 | Không khuyến mại thuốc kê đơn | Voucher whitelist | `demo/functions/utils/safety.js` |
| 7 | Chữ ký điện tử | pharmacistLiabilitySignature | Firestore data model |
| 8 | Consent trước xử lý data | Progressive consent flow | Onboarding UI |
| 9 | Thông báo vi phạm ≤72h | Incident response protocol | `RUNBOOK.md` |
| 10 | Quyền xóa dữ liệu | Delete account → wipe 30 ngày | Settings UI |

---

## Link gốc văn bản pháp luật

> **Đã xác minh**: 2026-05-13. Tất cả link đã được kiểm tra trỏ đúng tới văn bản tương ứng.

### Luật

| Văn bản | Thư viện Pháp luật |
|---|---|
| Luật Khám bệnh, chữa bệnh 2023 (15/2023/QH15) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Y-te/Luat-Kham-benh-chua-benh-2023-543781.aspx) |
| Luật Dược 2016 (105/2016/QH13) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Luat-Duoc-2016-309815.aspx) |

### Nghị định

| Văn bản | Thư viện Pháp luật |
|---|---|
| Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-543884.aspx) |
| Nghị định 96/2023/NĐ-CP (Hướng dẫn Luật KCB) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Nghi-dinh-96-2023-ND-CP-huong-dan-Luat-Kham-benh-chua-benh-583328.aspx) |
| Nghị định 54/2017/NĐ-CP (Hướng dẫn Luật Dược) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Nghi-dinh-54-2017-ND-CP-huong-dan-Luat-duoc-321256.aspx) |

### Thông tư

| Văn bản | Thư viện Pháp luật |
|---|---|
| Thông tư 46/2018/TT-BYT (Hồ sơ bệnh án điện tử) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-46-2018-TT-BYT-su-dung-va-quan-ly-ho-so-benh-an-dien-tu-391438.aspx) |

> **Lưu ý**: Các link vanban.chinhphu.vn đã bị loại do cổng này sử dụng docid động — không đảm bảo trỏ đúng văn bản theo thời gian. Thuvienphapluat.vn sử dụng URL tĩnh (permalink) ổn định hơn.

### Cách dùng trong slide/presentation

```
Dẫn nguồn (dùng thuvienphapluat.vn — permalink ổn định):
Luật KCB 2023       → thuvienphapluat.vn/van-ban/Y-te/Luat-Kham-benh-chua-benh-2023-543781.aspx
Luật Dược 2016      → thuvienphapluat.vn/van-ban/The-thao-Y-te/Luat-Duoc-2016-309815.aspx
NĐ 13/2023/NĐ-CP   → thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-543884.aspx
TT 46/2018/TT-BYT   → thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Thong-tu-46-2018-TT-BYT-su-dung-va-quan-ly-ho-so-benh-an-dien-tu-391438.aspx
```
