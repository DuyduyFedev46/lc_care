CHÂU THỨC - Long Châu Care - topic số 2

Bối cảnh và Nỗi đau (Problem Statement & Pain Points)

Khách hàng chỉ nhớ đến ứng dụng khi có bệnh

Chỉ số gắn kết thấp

Các tính năng E-commerce không đủ sức giữ chân người dùng tương tác hàng ngày

3 chuỗi (Pharmacy, Lab, Tiêm chủng) thiếu liên thông dữ liệu

Trải nghiệm chung chung thiếu cá nhân hóa

Định hướng Kiến trúc & Quản trị (Architecture & Governance Alignment)

01 — Kiến trúc 5 tầng

Presentation → Application → AI/ML → Data → Infrastructure, mỗi tầng có component cụ thể và trách nhiệm tách biệt rõ ràng.

02 — Quản trị dữ liệu

Data Ownership (user là chủ), Access Control (zero-trust), Retention (10 năm y tế), Consent granular từng loại dữ liệu.

03 — Quản trị AI

5 Guardrails không có ngoại lệ + quy trình 4 bước xử lý khi AI sai (Detect → Contain → Notify → Remediate).

04 — Bảo mật & Tuân thủ

AES-256, TLS 1.3, Zero-trust + Luật Dược 2016, Nghị định 13/2023, Thông tư 48/2023 Bộ Y tế.

05 — RACI matrix


Phân quyền rõ 7 quyết định quan trọng: ai Responsible, ai Accountable cho từng loại action.

06 — Tech Stack

8 nhóm công nghệ từ Mobile (React Native) đến Data Platform (Kafka + BigQuery) đến Security (Keycloak + VNeID).

07 — 6 Nguyên tắc thiết kế

Health-First, Privacy by Design, AI Augments Never Replaces, Auditability, Fail Safe, MECE Ownership.

Kết quả cam kết tại Hackathon (Expected Prototype)

Giúp ban giám khảo hiểu được ý tưởng để có thể chuyển từ ý tưởng thành sản phẩm thực tế
