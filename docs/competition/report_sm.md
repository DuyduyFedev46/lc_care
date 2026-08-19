> **STATUS UPDATE (2026-05-13)**: Nhiều rủi ro đã được xử lý trong bản cập nhật plan.
> Xem `LC_CARE_FULL_PLAN.md` và `solution-design.md` để biết chi tiết.
> File này giữ lại để reference — các risk đã RESOLVED được đánh dấu ✅.

Risks chính của kế hoạch
#	Risk	Mức độ	Giải thích	Status
1	Phụ thuộc hoàn toàn vào Firebase Free Tier	Cao	Plan ước tính mọi thứ đều free tier, nhưng nếu demo thành công và scale lên thì chi phí Cloud Vision, Gemini Flash, FCM sẽ tăng nhanh mà chưa có cost projection cho production	⚠️ Monitor
2	Single Point of Failure — Dược sĩ	Cao	Mọi flow đều phải qua pharmacist gate (OCR verify, triage approve, family calendar approve). Nếu DS quá tải hoặc vắng mặt → toàn bộ hệ thống bị block	✅ RESOLVED — Care Team trung tâm (5-10 DS chuyên trách) + 70% routine auto-send + SLA escalation. DS tại quầy = zero impact
3	Chưa có SLA cho pharmacist response time	Trung bình	User submit câu hỏi urgent nhưng DS không online → trải nghiệm tệ. Chưa có escalation path nếu DS không phản hồi trong X phút	✅ RESOLVED — SLA Escalation: 5-min broadcast → 15-min auto-referral
4	OCR cho đơn thuốc tiếng Việt viết tay	Cao	Google Cloud Vision chưa mạnh với chữ viết tay tiếng Việt. Plan thừa nhận "OCR fails" nhưng chưa có metric thực tế về tỷ lệ thành công	✅ RESOLVED — Pharmacist manual verification + 3 demo scenarios (typed/handwritten/hybrid)
5	Gemini Flash hallucination	Trung bình	Dù chỉ dùng cho wording, AI vẫn có thể sinh nội dung sai lệch y tế. Forbidden words list có thể không đủ	✅ RESOLVED — Forbidden words sensor + DS gate + Audit log (3 lớp chặn)
6	Chưa có offline strategy rõ ràng	Trung bình	PWA nhưng chưa nói rõ khi mất mạng thì user có thể làm gì (tưới cây? xem lịch?)	🟡 DEFERRED — Phase 2 (đã ghi nhận trong Open Questions)
7	Family model giả định gia đình hạt nhân	Trung bình	Chưa xử lý case: ly hôn (2 bố mẹ quản lý 1 con), người già sống một mình, người giúp việc chăm sóc	🟡 DEFERRED — Phase 2 (đã ghi nhận trong Open Questions)
8	Chưa có user research/validation	Cao	Plan rất chi tiết về technical nhưng chưa có evidence rằng user thực sự muốn "tưới cây" hay quan tâm gamification	✅ RESOLVED — Phase 0.5: 100-user survey + 10 interviews + beta KPIs
Danh sách câu hỏi mở (bao gồm 2 câu của bạn + bổ sung)

> **STATUS (2026-05-13)**: Hầu hết câu hỏi đã được trả lời trong plan update. Đánh dấu ✅ bên dưới.

Về Journey & Loại cây
🔴 (Câu của bạn) Chưa có loại cây cho mẹ bầu — Mẹ bầu chỉ trong 9 tháng 10 ngày, journey có thời hạn rõ ràng. Vậy:

Cây có "kết thúc" không? Hay chuyển sang journey mới (chăm con sơ sinh)?
  ✅ RESOLVED — Cây Hoa Sen (Lotus) tốt nghiệp (graduated) → auto tạo Sả cho mẹ + Tía tô cho bé
Nếu cây mature rồi mà journey kết thúc thì sao?
  ✅ RESOLVED — plantStatus = 'graduated' (KHÔNG dead). Animation + badge vĩnh viễn.
Có journey nào khác cũng có thời hạn (ví dụ: hậu phẫu 3 tháng, kháng sinh 7 ngày)?
  ✅ RESOLVED — Lotus graduation model có thể áp dụng cho post-surgery, short-term antibiotics
Hiện tại có 5 loại cây (ginger, turmeric, lemongrass, gotu_kola, tea) — logic gán cây dựa trên tiêu chí gì? Ai quyết định? DS hay rule?
  ✅ RESOLVED — 7 cây, DS liên hệ thuốc ↔ bệnh ↔ cây, KHÔNG AI

Nếu 1 user có nhiều bệnh lý (tiểu đường + huyết áp) → có nhiều Care Plan → nhiều cây cùng lúc? UX sẽ như thế nào?
  ✅ RESOLVED — Nhiều cây cùng lúc trong 1 Khu Vườn. User chọn 1 cây ưu tiên.

Về Dược sĩ & Phân luồng
🔴 (Câu của bạn) Chưa có nguyên tắc phân thông tin cho dược sĩ — Cụ thể:

DS nào nhận queue item nào? (theo khu vực? theo chuyên môn? random?)
  ✅ RESOLVED — Care Team trung tâm (5-10 DS chuyên trách online): General → Specialist. DS tại quầy không tham gia.
1 DS phụ trách bao nhiêu user?
  ✅ RESOLVED — 1 Care Team DS : 1,000-2,000 user (vì 70% auto-send, chỉ review 30% non-routine)
Có phân biệt DS online vs DS tại quầy không?
  ✅ RESOLVED — Care Team = 100% online chuyên trách. DS tại quầy = vẫn bán hàng như hiện tại, zero impact.
Nếu DS reject thì flow tiếp theo là gì? User có được thông báo không?
  ✅ RESOLVED — DS gửi yêu cầu sửa + note. Item quay lại queue với flag "cần sửa".
Workload balancing — Nếu 1 DS bị assign 200 items mà DS khác rảnh → có auto-redistribute không?
  ✅ RESOLVED — Có. Nếu chênh >15 items giữa 2 DS → tự động san sẻ.

DS training — DS cần training gì để dùng hệ thống? Có onboarding flow cho DS không?
  ✅ RESOLVED — 4 module training: AI triage (1h), Care Plan (2h), Compliance (1h), Escalation (30m)

Về Compliance & Pháp lý
Lưu trữ đơn thuốc (ảnh) — Bộ Y tế có quy định gì về thời gian lưu? GDPR/PDPA Việt Nam yêu cầu gì?
  ✅ RESOLVED — NĐ 13/2023/NĐ-CP + TT 46/2018/TT-BYT: 10 năm retention, AES-256, consent granular
Consent flow — User đồng ý gì khi upload đơn thuốc? Khi chia sẻ data trong family group?
  ✅ RESOLVED — Progressive consent: opt-in từng loại data. Family sharing có consent riêng.
Trách nhiệm pháp lý — Nếu DS approve sai (dựa trên AI brief) → ai chịu trách nhiệm?
  ✅ RESOLVED — DS primary liable (chữ ký điện tử). AI secondary actor. Full audit trail.

Về Family Model
Quyền truy cập trong gia đình — Ai được xem health data của ai? Con 16 tuổi có muốn bố mẹ xem adherence không?
  🟡 DEFERRED — Phase 2 (đã ghi nhận trong Open Questions #2)
Thêm/xóa thành viên — Flow nào? Cần consent của người được thêm không?
  ✅ RESOLVED — Consent required. Flow qua family leader + invite link.
Family Calendar conflict — Nếu 2 thành viên có lịch trùng nhưng ở 2 Long Châu khác nhau?
  🟡 DEFERRED — Phase 2 (đã ghi nhận trong Open Questions #8)

Về Technical
Firestore security rules — Chưa thấy chi tiết. User A có đọc được data của User B không?
  ✅ RESOLVED — Đã thắt chặt: role-based access, family-only read, pharmacist-only queue
Rate limiting — Nếu user spam "Tưới cây" 100 lần/ngày?
  ✅ RESOLVED — Max 2 lần/ngày (sáng + tối). Thêm = flag fraud.
Versioning — Khi update Care Plan logic, user cũ đang dùng plan cũ thì sao?
  🟡 DEFERRED — Tại MVP integration (đã ghi nhận trong Open Questions #9)
Testing strategy — Chưa có unit test, integration test plan. Chỉ có 11 E2E scenarios.
  ✅ RESOLVED — ECC TDD workflow. 11 E2E scenarios + unit test từng function.

Về Business & UX
Churn scenario — User bỏ app 2 tháng quay lại → cây đang "paused" → trải nghiệm quay lại như thế nào?

Điểm loyalty tích hợp FRT hiện tại — Có sync 2 chiều không? Hay hệ thống điểm riêng?

Multi-language — Chỉ phục vụ tiếng Việt? Nếu có user nước ngoài sống tại VN?

Accessibility — Người cao tuổi (mắt kém, không quen smartphone) dùng app này thế nào?

Tóm lại
Plan rất mạnh về mặt technical architecture và demo storytelling, nhưng còn thiếu:

Operational design (ai làm gì, khi nào, bao nhiêu)
  ✅ RESOLVED — Care Team trung tâm + 70% auto-send routine + SLA escalation
Edge cases cho journey có thời hạn (mẹ bầu, hậu phẫu, kháng sinh ngắn ngày)
  ✅ RESOLVED — Cây Hoa Sen (Lotus) + graduation model
Pharmacist assignment & workload rules
  ✅ RESOLVED — Care Team 5-10 DS chuyên trách + auto-redistribute + capacity 1:1,000-2,000
User consent & data governance
  ✅ RESOLVED — NĐ 13/2023/NĐ-CP compliance + consent granular + PIA