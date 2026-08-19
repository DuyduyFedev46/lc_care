Phản biện của Claude rất sắc sảo, bảo vệ được linh hồn của dự án là "Khu Vườn Thảo Dược" cho mục tiêu đi thi, đồng thời chỉ ra chính xác những điểm tôi đã đánh giá cứng nhắc khi bỏ qua tỷ lệ 70% Routine (Auto-send) và 30% Care Team đã được thiết kế.

Với tư duy của một Product Architect tập trung vào Agentic Ecommerce, chúng ta không cần tranh luận thêm về các điểm Claude đã phản biện thành công, mà hãy bắt tay vào **thiết kế giải pháp (Solution Design)** cho 2 lỗ hổng (Risk) thực sự mà Claude đã xác nhận: **Fake Engagement** và  **Onboarding Friction** .

Dưới đây là thiết kế bổ sung cho kiến trúc LC Care:

### 🚩 Logic Gap + Risk + Đề xuất (Giải quyết Fake Engagement & Onboarding)

* **Risk 1: Fake Engagement (Bấm tưới cây để cày điểm)**
  * **Logic Gap:** Hiện tại hệ thống chỉ giới hạn "Tưới cây" tối đa 2 lần/ngày (sáng + tối) để chống spam. Tuy nhiên, user hoàn toàn có thể vào bấm mỗi ngày để lấy 10 điểm `pointsEarned` mà không thực sự uống hoặc mua thuốc. Điều này phá hỏng ý nghĩa của dữ liệu `adherenceEvents`.
  * **Đề xuất:** Xây dựng cơ chế  **Cross-Validation (Đối chiếu chéo)** . Chuyển đổi tư duy từ "người dùng tự báo cáo" sang "hệ thống tự kiểm chứng" – một đặc tính cốt lõi của Agentic Ecommerce, giúp tự động hóa quá trình xác thực mà không làm phiền người dùng.
* **Risk 2: Onboarding Friction (Rào cản upload đơn thuốc)**
  * **Logic Gap:** Yêu cầu upload ảnh đơn thuốc có chữ ký bác sĩ để khởi tạo Health ID và Care Plan tạo rào cản lớn (High Friction). Nếu user không có sẵn đơn thuốc hoặc ngại chụp ảnh, họ sẽ drop-off ngay lập tức.
  * **Đề xuất:** Áp dụng luồng "Progressive Onboarding" (Định danh lũy tiến) với các Fallback options.

---

### 🤖 Agent Workflow + Assignment Table (Cơ chế Cross-Validation)

Để giải quyết Fake Engagement, chúng ta thêm một Agent chạy ngầm để kiểm toán chéo dữ liệu hành vi (Tưới cây) và dữ liệu giao dịch (Mua thuốc).

**Tên Workflow:** Adherence Cross-Validation Agent

**Mục đích:** Tự động đối chiếu số lần báo cáo uống thuốc với số lượng thuốc thực tế đã mua để ngăn chặn farm điểm Loyalty.

| **Actor / Component**         | **Nhiệm vụ**                                                                                                                                                                                                                                                | **Trigger / Điều kiện**  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **Cloud Scheduler**           | Kích hoạt kiểm tra định kỳ trước chu kỳ đổi voucher.                                                                                                                                                                                                     | Chạy vào ngày 28 hàng tháng. |
| **Data Aggregator**           | Lấy tổng số lần `med_taken`trong `adherenceEvents`và tra cứu số lượng thuốc xuất kho từ lịch sử giao dịch FP.                                                                                                                                    | Nhận trigger từ Scheduler.      |
| **🤖 Cross-Validation Agent** | Tính toán độ lệch:`Tổng số liều đã báo cáo uống`vs `Tổng số liều đã mua`. Nếu user bấm "Tưới cây" 30 lần (30 liều) nhưng lịch sử mua chỉ có 1 vỉ 10 viên ➔ Flag trạng thái `Fake_Engagement_Suspected`.                    | Xử lý tập data từ Aggregator. |
| **Loyalty Core**              | Tạm ngưng tính năng quy đổi điểm (Voucher Harvest) đối với các tài khoản bị Flag. Tự động gửi thông báo:*"Long Châu nhận thấy lượng thuốc của bạn có thể đã hết. Vui lòng refill để tiếp tục chăm sóc cây Gừng nhé!"* | Nhận Flag từ Agent.             |

---

### 📊 Option Matrix (Giải quyết Onboarding Fallback)

Khi user từ chối upload đơn thuốc (Nguồn 1: Đơn thuốc BS), chúng ta cần kịch bản Fallback an toàn, tuân thủ Rule #0.

| **Option (Nguồn thay thế)**      | **Quy trình thực thi**                                                      | **Ưu điểm**                                               | **Nhược điểm**                                                    | **Đề xuất**                                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **1. Self-report (Tự khai báo)** | User tự tick chọn bệnh nền (có Disclaimer). Hệ thống gán cây ở Level 1.   | Rất mượt, Zero-friction. User có cây ngay lập tức.          | Dữ liệu không đáng tin cậy 100% để Care Team tư vấn y tế sâu.   | ✅**Chọn làm Fallback 1.**(Cho phép trồng cây ngay, nhưng khóa tính năng Voucher/Nhiệm vụ khó cho đến khi xác thực). |
| **2. Kiosk Trạm Công Dân Số**  | Mời user ghé cửa hàng gần nhất đo HA/BMI. Dữ liệu sync tự động về app. | Data khách quan (Sensor). Tạo cớ để user ra cửa hàng (O2O). | Đòi hỏi user phải di chuyển vật lý.                                  | ✅**Chọn làm Fallback 2.**(Kết hợp tặng mã giảm giá nhỏ để kích thích ra cửa hàng).                                   |
| **3. VNeID / Sổ SK Điện Tử**   | Pull data từ hệ thống y tế quốc gia (API).                                     | Data hợp pháp, mức độ tin cậy tuyệt đối (⭐⭐⭐⭐).       | Rào cản tích hợp API nhà nước và user ngần ngại share data VNeID. | ⚠️**Chờ Phase 2**theo đúng lộ trình.                                                                                          |

---

### ❓ Clarification Questions

Để hoàn thiện bản spec cuối cùng cho team Dev, chúng ta cần chốt 3 câu hỏi sau:

1. **Policy xử lý Fake Engagement:** Khi Cross-Validation Agent phát hiện gian lận, chúng ta sẽ "đóng băng" cây thảo dược (chuyển sang `paused`) hay chỉ đơn giản là khóa nút "Đổi Voucher"? Việc thu hồi điểm (clawback) có vi phạm policy của hệ thống FP Loyalty hiện tại không?
2. **Onboarding Fallback Flow:** Nếu user chọn Option 1 (Tự khai báo - Self-report), các thông tin này có cần đưa vào `pharmacistQueue` để Care Team Dược sĩ duyệt lại (tốn effort) hay hệ thống sẽ tự động gán luôn các cây Lifestyle (như Cây Trà, Cây Sả) để tiết kiệm nguồn lực?
3. **Giới hạn số lượng cây:** Dù là Vườn Gia Đình hay Vườn Cá Nhân, hệ thống có giới hạn tối đa bao nhiêu cây được trồng/chăm sóc cùng lúc (active) không? Nếu cô Mai có cả Huyết áp (Gừng), Tiểu đường (Nghệ) và Đau xương khớp, UI hiển thị và push notification 7:00 sáng sẽ gộp lại chung hay tách lẻ từng cây?
