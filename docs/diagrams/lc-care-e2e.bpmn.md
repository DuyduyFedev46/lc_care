# BPMN: Long Châu Care — Luồng E2E

# Lanes
Lane: 👤 User
Lane: 📱 App KHLC
Lane: 🤖 AI Layer
Lane: 🧑‍⚕️ Dược sĩ
Lane: 🏗️ Family Package
Lane: 👨‍👩‍👧 Gia đình

# ═══════════════════════════════════════════
# PHASE 1: HIỂU — Onboarding & Trồng cây
# ═══════════════════════════════════════════

👤 User: Start(O) --> 👤 User: UserTask: Mở app & Đăng nhập
👤 User: UserTask: Mở app & Đăng nhập --> 📱 App KHLC: ServiceTask: Lấy family graph + lịch sử 6 tháng
📱 App KHLC: ServiceTask: Lấy family graph + lịch sử 6 tháng --> 🤖 AI Layer: ScriptTask: Quét purchase pattern
🤖 AI Layer: ScriptTask: Quét purchase pattern --> 🤖 AI Layer: Gateway: Phát hiện bệnh nền?

🤖 AI Layer: Gateway: Phát hiện bệnh nền? -- No --> 📱 App KHLC: End(X)
🤖 AI Layer: Gateway: Phát hiện bệnh nền? -- Yes --> 🤖 AI Layer: ScriptTask: Tạo draft gợi ý cây

🤖 AI Layer: ScriptTask: Tạo draft gợi ý cây --> 🧑‍⚕️ Dược sĩ: UserTask: Review draft
🧑‍⚕️ Dược sĩ: UserTask: Review draft --> 🧑‍⚕️ Dược sĩ: Gateway: Duyệt?

🧑‍⚕️ Dược sĩ: Gateway: Duyệt? -- Chỉnh sửa --> 🧑‍⚕️ Dược sĩ: UserTask: Chỉnh sửa + Duyệt lại
🧑‍⚕️ Dược sĩ: UserTask: Chỉnh sửa + Duyệt lại --> 📱 App KHLC: ServiceTask: Gửi gợi ý Trồng cây Gừng
🧑‍⚕️ Dược sĩ: Gateway: Duyệt? -- Approve --> 📱 App KHLC: ServiceTask: Gửi gợi ý Trồng cây Gừng

📱 App KHLC: ServiceTask: Gửi gợi ý Trồng cây Gừng --> 👤 User: UserTask: Xác nhận + Upload đơn thuốc
👤 User: UserTask: Xác nhận + Upload đơn thuốc --> 🏗️ Family Package: ServiceTask: Lưu Health ID + Tạo Care Plan
🏗️ Family Package: ServiceTask: Lưu Health ID + Tạo Care Plan --> 📱 App KHLC: ServiceTask: Cây Gừng được trồng

# ═══════════════════════════════════════════
# PHASE 2: ĐỒNG HÀNH — Tưới cây mỗi ngày
# ═══════════════════════════════════════════

📱 App KHLC: ServiceTask: Cây Gừng được trồng --> 👤 User: UserTask: Nhận push 7:00 sáng Tưới cây Gừng
👤 User: UserTask: Nhận push 7:00 sáng Tưới cây Gừng --> 👤 User: UserTask: Xác nhận Đã uống
👤 User: UserTask: Xác nhận Đã uống --> 🏗️ Family Package: ServiceTask: Log adherence + Update streak
🏗️ Family Package: ServiceTask: Log adherence + Update streak --> 🏗️ Family Package: ServiceTask: Cộng điểm vào Ví Gia Đình
🏗️ Family Package: ServiceTask: Cộng điểm vào Ví Gia Đình --> 👨‍👩‍👧 Gia đình: UserTask: Nhận thông báo Bố vừa uống thuốc

# ═══════════════════════════════════════════
# PHASE 3: AI Cảnh báo — User quên Refill
# ═══════════════════════════════════════════

👨‍👩‍👧 Gia đình: UserTask: Nhận thông báo Bố vừa uống thuốc --> 🏗️ Family Package: Gateway: Trễ refill trên 5 ngày?

🏗️ Family Package: Gateway: Trễ refill trên 5 ngày? -- Đúng hạn --> 🏗️ Family Package: ServiceTask: Giữ streak tiếp tục
🏗️ Family Package: Gateway: Trễ refill trên 5 ngày? -- Trễ hạn --> 🤖 AI Layer: ScriptTask: Tạo alert trễ refill

🤖 AI Layer: ScriptTask: Tạo alert trễ refill --> 🧑‍⚕️ Dược sĩ: UserTask: Duyệt alert refill
🧑‍⚕️ Dược sĩ: UserTask: Duyệt alert refill --> 📱 App KHLC: ServiceTask: Push nhắc refill
📱 App KHLC: ServiceTask: Push nhắc refill --> 👤 User: UserTask: Đặt refill
👤 User: UserTask: Đặt refill --> 🏗️ Family Package: ServiceTask: Tạo đơn refill + Cây hồi xanh

🏗️ Family Package: ServiceTask: Giữ streak tiếp tục --> 🏗️ Family Package: ServiceTask: Tổng kết tháng streak điểm

# ═══════════════════════════════════════════
# PHASE 4: THU HOẠCH — Cuối tháng
# ═══════════════════════════════════════════

🏗️ Family Package: ServiceTask: Tạo đơn refill + Cây hồi xanh --> 🏗️ Family Package: ServiceTask: Tổng kết tháng streak điểm

🏗️ Family Package: ServiceTask: Tổng kết tháng streak điểm --> 👤 User: UserTask: Xem Báo cáo Khu Vườn Gia Đình
👤 User: UserTask: Xem Báo cáo Khu Vườn Gia Đình --> 👨‍👩‍👧 Gia đình: UserTask: Nhận báo cáo tháng gia đình

👤 User: UserTask: Xem Báo cáo Khu Vườn Gia Đình --> 👤 User: Gateway: Đủ điểm đổi Voucher?

👤 User: Gateway: Đủ điểm đổi Voucher? -- Chưa đủ --> 👤 User: End(X)
👤 User: Gateway: Đủ điểm đổi Voucher? -- Đủ --> 👤 User: UserTask: Đổi Voucher 300 điểm

👤 User: UserTask: Đổi Voucher 300 điểm --> 🏗️ Family Package: ServiceTask: Deduct điểm + Tạo Voucher
🏗️ Family Package: ServiceTask: Deduct điểm + Tạo Voucher --> 👤 User: UserTask: Nhận Voucher 50k
👤 User: UserTask: Nhận Voucher 50k --> 👤 User: End(X) Hoàn tất

# ═══════════════════════════════════════════
# NOTE: Vòng lặp ngày mới & tháng mới
# ═══════════════════════════════════════════
# Sau End(X) Chưa đủ hoặc Hoàn tất:
#   → Sáng mai 7:00 lại Push "Tưới cây Gừng"
#   → Tiếp tục streak → Cuối tháng → Báo cáo → Đổi voucher
#   → Vòng lặp vô hạn: Tưới cây → Streak → Báo cáo → Harvest → Repeat
