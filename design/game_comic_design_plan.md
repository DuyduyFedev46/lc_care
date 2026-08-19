# Long Châu Care — Game Comic & Gameloop System Design Document
## (Phần 1 - 4: Full Codebase Feature Mapping & Interaction Blueprint)

Tài liệu này là bản đặc tả thiết kế hệ thống (Game Design Document - GDD) và cẩm nang kỹ thuật (Art Bible) đồng bộ 100% với cấu trúc codebase thực tế của Long Châu Care.

---

# 📚 Phần 1 — Onboarding & Core Garden Screens

Phần này mô tả các màn hình nằm trong luồng gia nhập (onboarding) và tương tác chăm sóc cây cá nhân cơ bản, tương ứng với các file:
* `frontend/src/screens/auth/LoginScreen.jsx`
* `frontend/src/screens/onboarding/OnboardingScreen.jsx` (và các bước con)
* `frontend/src/screens/garden/GardenScreen.jsx`
* `frontend/src/screens/garden/WaterScreen.jsx`
* `frontend/src/screens/garden/GerminationScreen.jsx`
* `frontend/src/screens/garden/LevelUpScreen.jsx`

---

## Màn 0: Cổng Vườn (Login/SĐT)
* **Visual Concept (`bg_panel0_login`)**: Cổng gỗ dẫn vào khu vườn thảo dược có mái vòm phủ đầy hoa leo và lá xanh. Mascot đứng bên trái cổng, một tay vẫy chào, một tay giơ chiếc chìa khóa vàng nhỏ. Có ánh sáng lấp lánh hắt ra từ sau cánh cổng hé mở.
* **Lớp phủ UI (React)**: 
  * Bong bóng thoại phía trên mascot: *"Chào bạn! Nhập số điện thoại để mở cổng vườn nhé!"*
  * Form nhập số điện thoại tone kem-nâu bán trong suốt (semi-transparent warm brown).
  * Nút "Tiếp tục" bo tròn màu xanh dương dịu.
* **Logic Codebase**: `LoginScreen.jsx` thực hiện Firebase Auth hoặc Mock credentials để xác định vai trò (`user` hoặc `pharmacist`).

## Màn 1: Gieo Hạt Mầm (Welcome & Basic Info)
* **Visual Concept (`bg2_panel1_seed`)**: Bên trong vườn, nắng sớm chiếu xiên qua các tán lá. Mascot đang quỳ gối trên nền đất tơi xốp, nâng niu một hạt mầm vàng phát sáng nhẹ chuẩn bị gieo xuống.
* **Lớp phủ UI (React)**:
  * Bong bóng thoại: *"Chào bạn, mình cùng gieo hạt mầm sức khỏe nhé! Tên bạn là gì nhỉ?"*
  * Form điền thông tin: Tên, giới tính (Nam/Nữ), Năm sinh. Các trường nhập liệu có viền nâu ấm nhạt, góc bo tròn mềm mại.
* **Logic Codebase**: `WelcomeStep.jsx` thu thập tên, giới tính và năm sinh lưu vào `state.userProfile`.

## Màn 2: Quét 5 Trụ Cột Lối Sống (Health Scan Sliders)
* **Visual Concept (`bg2_panel2_explore`)**: Mascot đứng giữa nhà kính gỗ đựng các chậu cây thảo dược xinh xắn, tay cầm một chiếc kính lúp khổng lồ nhìn xung quanh tò mò.
* **Lớp phủ UI (React)**:
  * Bong bóng thoại: *"Vườn này cần gì để tươi tốt nhỉ? Hãy chia sẻ thói quen của bạn nhé."*
  * Danh sách 5 thanh trượt (Sliders) tương ứng 5 trụ cột lối sống:
    1. 🏃 **Vận động** (Thân cây - vững chãi)
    2. 😴 **Giấc ngủ** (Lá cây - hô hấp)
    3. 🥗 **Dinh dưỡng** (Hoa quả - dưỡng chất)
    4. 🧠 **Tinh thần** (Hào quang lấp lánh - năng lượng)
    5. 🪑 **Môi trường** (Đất trồng - nền tảng)
* **Logic Codebase**: `HealthScanStep.jsx` ghi nhận điểm số lối sống từ 1 đến 5 sao của người dùng để làm cơ sở tính toán mức độ cân bằng sức khỏe.

## Màn 3: Dược Sĩ & Đơn Thuốc (Pharmacist Check & Chronic)
* **Visual Concept (`bg2_panel3_pharmacist`)**: Góc vườn ấm cúng với quầy thuốc nhỏ làm bằng gỗ mộc. Mascot đứng cạnh một nữ Dược sĩ Long Châu đeo tạp dề xanh lá, cô ấy đang tươi cười chỉ tay vào chiếc bảng hồ sơ kẹp giấy.
* **Lớp phủ UI (React)**:
  * Bong bóng thoại của Dược sĩ: *"Bạn có đang dùng thuốc điều trị hoặc vitamin nào không? Hãy chụp ảnh đơn thuốc để tôi hỗ trợ nhé."*
  * Nút "Chụp đơn thuốc" lớn có biểu tượng Camera.
  * Các nút chọn nhanh bệnh mãn tính và chu kỳ kinh nguyệt (nếu là nữ).
* **Logic Codebase**: `CycleTrackingStep.jsx` và `HabitsStep.jsx` cho phép upload đơn thuốc qua Vision OCR và chuyển tiếp thông tin tới hàng chờ duyệt của Dược sĩ.

## Màn 4: Biến Động Cuộc Sống (Life Changes Tags)
* **Visual Concept (`bg2_panel4_wind`)**: Khung cảnh vườn lúc hoàng hôn vàng ấm áp. Có một cơn gió nhẹ cuốn theo những chiếc lá bay lượn nghệ thuật quanh mascot. Mascot đang nhắm mắt thư thái cảm nhận cơn gió.
* **Lớp phủ UI (React)**:
  * Bong bóng thoại: *"Cuộc sống luôn chuyển động. Gần đây bạn có trải qua thay đổi nào lớn không?"*
  * Các nút dạng Tag (Pill tags) màu nâu kem nhạt để chọn: "Mang thai/Sau sinh", "Đổi công việc", "Chuyển nhà", "Stress áp lực", "Không có thay đổi lớn".
* **Logic Codebase**: `LifeChangesStep.jsx` lưu trữ các tag thay đổi này để cá nhân hóa các lời nhắc và nhóm cây tương lai.

## Màn 5: Thức Tỉnh Mầm Xanh (Sprout Reveal)
* **Visual Concept (`bg2_panel5_reveal`)**: Khoảnh khắc kỳ diệu vào bình minh. Mầm cây thảo dược đầu tiên đã nảy lên khỏi mặt đất, tỏa ra vầng hào quang lấp lánh. Mascot mở to mắt ngạc nhiên, hai má hồng rực lên vì vui sướng.
* **Lớp phủ UI (React)**:
  * Bong bóng thoại: *"Ôi! Hạt mầm đã nảy rồi! Đây chính là biểu tượng sức khỏe của bạn. Cùng chăm nhé!"*
  * Thẻ hiển thị **Loại cây được gán** (Ví dụ: Cây Gừng cho hành trình điều trị).
  * Nút lớn: *"Bắt đầu hành trình chăm sóc"* để chuyển tiếp.
* **Logic Codebase**: `SeedPlantedStep.jsx` hiển thị mầm cây được gán dựa trên thuật toán phân nhóm sức khỏe (Plant Assignment).

## Màn 6: Tải Dữ Liệu (Mascot Meditating Loading Screen)
* **Visual Concept (`bg_loading`)**: Mascot ngồi khoanh chân thiền yên bình trên thảm cỏ xanh. Xung quanh là các hạt sáng lơ lửng bay lên đại diện cho các trụ cột sức khỏe.
* **Lớp phủ UI (React)**:
  * Chữ động: *"Khu vườn đang kết nối với hồ sơ sức khỏe của bạn..."* kèm hiệu ứng ba chấm nhấp nháy.
  * Thanh tiến trình (Progress Bar) chạy mịn ở dưới cùng.
* **Logic Codebase**: Tự động hiển thị khi `state.initialized === false` và đang tải dữ liệu từ máy chủ.

## Màn 7: Trang Chủ Khu Vườn (GardenScreen & Pedestal Hub)
* **Visual Concept (`bg2_garden_home`)**: Bối cảnh khu vườn rộng rãi, tràn ngập ánh nắng. Ở góc trái là hiên nhà gỗ mộc mạc, nơi đặt tủ thuốc nhỏ. Ở giữa là chậu cây thảo dược active hiện tại của người dùng đặt trên một đảo cỏ nhô cao (`/assets/grassy_pedestal_2d.png`).
* **Lớp phủ UI (React)**:
  * **Wooden Header & HUD**: Hiện số ngày Streak liên tục (`state.streak`) và điểm tích lũy của gia đình (`state.points`).
  * **Bình tưới nước (Góc dưới phải)**: Hiển thị biểu tượng giọt nước và số lượng lượt tưới khả dụng. Nhấp vào để thực hiện động tác "Tưới cây".
  * **Quest Signpost (Góc dưới trái)**: Biển chỉ dẫn gỗ nhỏ mở bảng Nhiệm vụ.
  * **Mascot Speech Bubble**: Lời khích lệ ngẫu nhiên.
* **Logic Codebase**: `GardenScreen.jsx` xử lý trạng thái chờ duyệt (greyed-out plant) hoặc trạng thái đang trồng (`PlantHero`), đồng thời hiển thị bottom sheet chứa danh sách checklist nhiệm vụ hàng ngày.

## Màn 8: Hoạt Ảnh Tưới Nước Cá Nhân (WaterAction Screen)
* **Visual Concept (Màn hình xanh lá thẫm đêm)**: Màn hình chuyển sang tone màu xanh thẫm huyền bí của thảo mộc vào ban đêm (`linear-gradient(160deg, #083D1A 0%, #0D2A16 100%)`).
* **Lớp phủ UI & Animation (React)**:
  * Mascot (`ICONS.mascot_watering`) xuất hiện từ góc phải phía trên, xoay nhẹ để nghiêng bình tưới nước.
  * Hiệu ứng các giọt nước rơi (`@keyframes dripFall`) từ vòi bình tưới hướng trực tiếp xuống chậu cây.
  * Chậu cây ở giữa rung nhẹ và nở ánh sáng xanh lung linh (`@keyframes plantWatered`) thể hiện sự hồi sinh/hút nước.
  * Dòng chữ "+10 điểm" bay lên cao mượt mà.
* **Logic Codebase**: `WaterScreen.jsx` kích hoạt hàm `waterHabit(habitId)` khi người dùng chọn một nhiệm vụ uống thuốc/vận động và chạy hoạt ảnh tưới nước trong 1.8s trước khi quay về trang chủ.

## Màn 9: Thức Tỉnh Cây Con & Level Up (Germination & Level Up)
* **Visual Concept**: Bầu trời đêm ma thuật ngập tràn pháo hoa giấy rơi tự do (`confettiFall`).
* **Lớp phủ UI (React)**:
  * **Nảy mầm (Germination)**: Hoạt ảnh hạt giống rung lắc (`seedShake`), mầm xanh level 1 mọc lên, Dược sĩ gửi lời chào mừng kích hoạt kế hoạch.
  * **Lên cấp (Level Up)**: Cây nở to nhanh chóng (`plantGrow`), hiển thị hộp thông báo đạt các cột mốc streak vàng (7, 14, 30 ngày) và nhận các huy hiệu tương ứng (Mầm Xanh, Cây Lớn, Vườn Xanh) cùng 50 điểm thưởng.
* **Logic Codebase**: `GerminationScreen.jsx` và `LevelUpScreen.jsx` quản lý tuần tự các hoạt ảnh nảy mầm và trao tặng danh hiệu lưu trữ trong `localStorage`.

---

# 👥 Phần 2 — Family Collaboration & Calendar

Phần này mô tả các màn hình quản lý thành viên gia đình và lịch trình phối hợp chăm sóc sức khỏe batched-care, tương ứng với các file:
* `frontend/src/screens/family/FamilyScreen.jsx`
* `frontend/src/components/garden/IsometricGarden.jsx`
* `frontend/src/screens/family/CalendarScreen.jsx`

---

## Màn 10: Isometric Vườn Gia Đình (IsometricGarden & Grid Plots)
* **Visual Concept (`bg2_family_garden` / `family_garden_scene.webp`)**: Cảnh vườn đảo nổi isometric góc nghiêng nghệ thuật. Trên bãi cỏ có 6 ụ đất được đánh số tọa độ chính xác:
  ```
  Ụ 0 (Mẹ - Trái phía sau)    Ụ 3 (Bà - Phải phía sau)
  Ụ 1 (Bố - Trái ở giữa)      Ụ 4 (Trống - Phải ở giữa)
  Ụ 2 (Su - Trái phía trước)  Ụ 5 (Trống - Phải phía trước)
  ```
  Mascot đứng ở giữa lối đi lát đá trung tâm (`x: 50%`, `y: 52%`).
* **Hoạt ảnh Di chuyển & Tưới hộ (Mascot Pathfinding)**:
  * Khi người dùng click vào một chậu cây đang khát nước (đất nứt nẻ, có sương mù nhẹ):
    1. Mascot chuyển trạng thái sang `MOVING` và trượt mượt mà từ lối đi trung tâm đến đúng tọa độ của chậu cây đó trong 600ms.
    2. Mascot chuyển sang trạng thái `WATERING` và thực hiện tưới nước (giọt nước rơi, chậu cây lấp lánh).
    3. Trao tặng "+10 ⭐" và Mascot làm điệu bộ chúc mừng (`celebrate.webp`) trước khi di chuyển về vị trí ban đầu.
* **Logic Codebase**: `IsometricGarden.jsx` thực hiện cơ chế scale 1.45x để đảm bảo toàn bộ vị trí cây và mascot khớp tuyệt đối với tọa độ điểm ảnh nền trên mọi thiết bị.

## Màn 11: Thành Viên & Gửi Lời Nhắc (Mini Cards & Invite Links)
* **Lớp phủ UI (React)**:
  * Hàng thẻ gỗ mini ở cạnh dưới: Hiển thị avatar thành viên (bố, mẹ, con), loài cây đang trồng, và trạng thái sinh trưởng (Active, Needs Water, Pending, Graduated).
  * Nút Mời thành viên: Mở hộp thoại `InviteModal` tự động gọi API `dataService.createFamilyInvite()` sinh link liên kết gia đình động.
* **Logic Codebase**: `FamilyScreen.jsx` sắp xếp danh sách thành viên với người dùng hiện tại đứng đầu, xử lý logic "tưới hộ" khi gửi lời nhắc nhở in-app sang thiết bị của người thân.

## Màn 12: Lịch Tuần Gia Đình (Family Calendar & Batching Suggestions)
* **Visual Concept (`bg2_quest_board`)**: Hiển thị bảng gỗ lịch tuần chứa các ô biểu thị thứ trong tuần (T2 - CN).
* **Lớp phủ UI (React)**:
  * **Gợi ý gom đơn thông minh (Smart Batching Alert)**: Thẻ thông báo viền vàng nổi bật phía trên cùng: *"Mẹ refill thuốc huyết áp 20/5 — GOM chung với refill vitamin của Bố 23/5 để tiết kiệm 1 lượt đi."*
  * Nút "Dời sang T4" cho phép người dùng gom lịch lấy thuốc cùng ngày.
  * Danh sách sự kiện y tế của các thành viên được chia theo ngày và phân màu viền bên trái (xanh lá cho huyết áp, vàng cho xét nghiệm máu, tím cho xương khớp).
* **Logic Codebase**: `CalendarScreen.jsx` quản lý việc cập nhật lịch biểu của cả gia đình, đồng thời xử lý hành động thay đổi lịch hẹn gom chung địa điểm nhận thuốc thông qua `dataService.getFamilyCalendar()`.

---

# 🩺 Phần 3 — Clinical Care Plan & Pharmacist Review Panel

Phần này mô tả giao diện kế hoạch chăm sóc y tế chuẩn hóa và bảng điều khiển trung tâm dành cho Dược sĩ để kiểm soát an toàn y khoa, tương ứng với các file:
* `frontend/src/screens/careplan/CarePlanScreen.jsx`
* `frontend/src/screens/pharmacist/PharmacistScreen.jsx`
* `frontend/src/utils/validation.js`

---

## Màn 13: Tiến Độ & Nhật Ký Tuân Thủ (Care Plan Progress & Heatmap)
* **Lớp phủ UI (React)**:
  * **Vòng tròn tiến độ (Progress Ring)**: SVG tròn thể hiện tỉ lệ tích lũy streak/mục tiêu hành trình (30 ngày hoặc 7 ngày đối với nhóm tâm lý nhẹ nhàng).
  * **Lưới tuân thủ 30 ngày (Adherence Grid)**: Heatmap 30 ô vuông:
    * Ô màu xám: Ngày chưa đến hoặc quên.
    * Ô xanh lục: Ngày đã tưới cây (đã uống thuốc).
    * Ô viền cam đậm nhấp nháy: Ô đại diện cho **ngày hôm nay** chưa uống thuốc.
* **Logic Codebase**: `CarePlanScreen.jsx` đồng bộ hóa các ô vuông với streak thực tế của người dùng, tự động ẩn lưới heatmap nếu người dùng thuộc nhóm cải thiện sức khỏe tinh thần (`G8`).

## Màn 14: Bệnh Lý Nhóm Lối Sống (Clinical Groups G2 - G14)
Hệ thống tự động phân loại phác đồ chăm sóc dựa trên mã nhóm thảo mộc:
* **G2 — Tầm soát sức khỏe (Rau má)**: Đo HA tuần, xét nghiệm HbA1c tại Lab 3 tháng/lần, tái khám 6 tháng/lần.
* **G3 — Quản lý bệnh mãn tính (Gừng/Nghệ)**: Uống thuốc tim mạch/tiểu đường hàng ngày (Sáng/Tối), đo HA sáng sớm, xét nghiệm chức năng gan thận định kỳ.
* **G4 — Thai kỳ khỏe mạnh (Hoa Sen)**: Vitamin thai kỳ mỗi sáng, khám thai định kỳ mỗi 4 tuần, theo dõi cân nặng tuần.
* **G7 — Nhi khoa & Miễn dịch (Tía tô)**: Theo dõi lịch tiêm chủng CDC, cân nặng định kỳ theo biểu đồ WHO.
* **G8 — Sức khỏe tinh thần (Lá trà)**: Thiền hít thở 5-10 phút, viết 1 dòng nhật ký biết ơn, ngủ đủ giấc không dùng điện thoại.
* **G13 — Chăm sóc xương khớp**: Thuốc bổ sung Canxi/D3 sau ăn, vận động nhẹ 15-20 phút hàng ngày.
* **G14 — Tiêu hóa & Gan**: Thuốc bảo vệ gan sau ăn sáng, tránh chiên rán, uống đủ 2 lít nước ấm.

## Màn 15: Bàn Làm Việc Dược Sĩ (Pharmacist Dashboard & AI Triage)
Giao diện quản lý dành cho Dược sĩ kiểm định hồ sơ trước khi kích hoạt mầm cây.
* **Visual Concept (`bg2_health_archive`)**: Bàn làm việc Dược sĩ có ngăn hàng đợi bên trái và bảng hồ sơ bệnh án chi tiết bên phải.
* **Hàng đợi bên trái (Queue Panel)**:
  * Danh sách hồ sơ chờ duyệt.
  * Các ca khẩn cấp hoặc trễ thuốc kéo dài có viền đỏ nhấp nháy (`pulseBorder`) và huy hiệu cảnh báo đỏ "CAO".
* **Bảng chi tiết bên phải (Detail Panel)**:
  * **Cảnh báo Consent**: Biển đỏ cảnh báo nếu khách chưa cấp quyền xem toàn bộ hồ sơ (chỉ hiển thị thông tin hành chính).
  * **Tab Tổng quan**: Thể hiện chỉ số sức khỏe, nguồn bệnh lý đã được verify (`doctor_prescription`, `lab_with_doctor`), lịch sử mua hàng 6 tháng kèm nhãn tuân thủ (Đều/Chưa đều).
  * **Tab AI Brief**: Hiển thị bảng tóm tắt 30 giây do AI soạn sẵn để Dược sĩ đọc nhanh. Gắn nhãn khuyến cáo pháp lý.
  * **Tab Giấy tờ gốc**: Hiển thị trực tiếp ảnh chụp đơn thuốc của bác sĩ.
* **Form Phê Duyệt**:
  * Dropdown chọn cây tương tác trực quan (chọn cây hiển thị card mô tả cây đó).
  * Textarea nhập dặn dò y tế (có bộ kiểm tra từ cấm forbidden words cảm biến thời gian thực).
  * Nút phê duyệt (gửi plan) hoặc nút Từ chối (mở modal điền lý do mờ ảnh, mờ đơn gửi ngược lại cho khách hàng).
* **Logic Codebase**: `PharmacistScreen.jsx` kết nối trực tiếp với API duyệt và từ chối của `dataService`, chuyển đổi ca tiếp theo trong hàng đợi mượt mà sau 1.5s.

---

# 🎁 Phần 4 — Voucher Shop & User Profiles

Phần này mô tả ví đổi điểm thu hoạch voucher an toàn y khoa và trang hồ sơ lưu niệm cá nhân, tương ứng với các file:
* `frontend/src/screens/voucher/VoucherScreen.jsx`
* `frontend/src/screens/profile/ProfileScreen.jsx`

---

## Màn 16: Cửa Hàng Thu Hoạch Voucher (VoucherScreen & Whitelist)
* **Visual Concept (`bg2_voucher_shop`)**: Quầy đổi quà gỗ mộc mạc bên bờ suối trong vườn.
* **Lớp phủ UI (React)**:
  * Thẻ điểm gia đình màu xanh lục bảo nổi bật phía trên cùng hiển thị số điểm khả dụng.
  * Danh sách voucher thiết kế dạng thẻ cắt góc cổ điển, hiển thị số điểm cần đổi (cost) và giá trị quy đổi.
  * Nút "Thu hoạch ngay" tự động vô hiệu hóa (disabled) nếu người dùng không đủ điểm.
* **Logic Codebase**: `VoucherScreen.jsx` kiểm tra nghiêm ngặt whitelist sản phẩm (chỉ cho phép đổi bông băng, nước muối, TPCN cơ bản, gói xét nghiệm Lab/Vaccine - Tuyệt đối không cho đổi thuốc kê đơn).

## Màn 17: QR Code & Barcode Thần Kỳ (Custom Seeded QR Canvas)
* **Visual Concept (Hộp quà thành công)**: Khi đổi điểm thành công, một popup hộp quà lớn mở ra.
* **Lớp phủ UI (React)**:
  * **QR Code động**: Vẽ trực tiếp lên thẻ canvas bằng thuật toán `drawMockQRCode`. Thuật toán này sinh các pixel QR ngẫu nhiên nhưng đồng nhất dựa trên mã hash của voucher (`LC-VOUCHER-ID-RANDOM`), vẽ sẵn 3 khối vuông định vị (finder patterns) ở 3 góc chuẩn xác.
  * **Mã vạch 1D**: Vẽ bằng mảng thẻ `div` đen trắng đan xen có chiều rộng ngẫu nhiên, mô phỏng chân thực mã vạch tại quầy thu ngân Long Châu.
* **Logic Codebase**: Canvas ref tự động vẽ lại QR Code mỗi khi modal thành công được mở ra mà không cần tải thư viện ngoài, tối ưu hóa dung lượng PWA.

## Màn 18: Hồ Sơ Cá Nhân & Vườn Lưu Niệm (Profile & memorial Garden)
* **Visual Concept (`bg2_health_archive`)**: Trang thông tin tổng hợp của người dùng.
* **Lớp phủ UI (React)**:
  * Thẻ cá nhân hiển thị tuổi, giới tính và nút mở Sheet sửa thông tin nhanh.
  * Lưới Heatmap 12 tuần (84 ô vuông nhỏ) ghi nhận mật độ tưới cây liên tục.
  * **Vườn Lưu Niệm (Memorial Garden)**: Danh sách các cây thảo dược đã "Tốt nghiệp" (đã hoàn thành chu kỳ hành trình 30 ngày chăm sóc). Mỗi cây tốt nghiệp được hiển thị trang trọng kèm emoji đại diện và biểu tượng mũ cử nhân (`ICONS.ui_graduate_cap`), được lưu trữ vĩnh viễn như một huân chương sức khỏe.
* **Logic Codebase**: `ProfileScreen.jsx` lọc các care plan có trạng thái `plantStatus === "graduated"`, đồng thời quản lý sheet chỉnh sửa profile cập nhật tức thì qua `dataService.updateProfile()`.
