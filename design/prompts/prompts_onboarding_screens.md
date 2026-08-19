# Bộ Prompt Gemini — 7 Màn Hình Onboarding LC Care (Giao diện Mềm mại, Hiện đại + Real Assets + Big Mascots)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền Trắng tinh khiết (#FFFFFF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Mascot phải RẤT TO (Hero character), đóng vai trò như một người bạn/dược sĩ đang lắng nghe, thấu hiểu và cố gắng giúp đỡ người dùng. Không dùng mascot như icon nhỏ nữa.

---

## PROMPT 1 — Welcome (Thông tin cơ bản)

```
Design a modern, soft mobile onboarding screen (390x844) for "Long Châu Care" health app.

AESTHETIC: Pure White #FFFFFF background. Soft rounded corners (20px).

HERO MASCOT SECTION (Top Third of Screen):
- Embed this EXACT mascot image: ![Mascot Welcome](https://chauthuc.web.app/assets/mascots_nobg/mascot_welcome.png)
- Size: VERY LARGE (approx 200px-240px). The mascot should look like it is leaning in, actively welcoming and trying to understand the user.
- Below it: "LONG CHÂU CARE" in #1250DC, font-weight 900, 24px
- "Rất vui được chăm sóc sức khỏe của bạn và gia đình" in #6B7280, 15px, centered.

BASIC INFO SECTION (Floating soft card):
- "Thông tin của bạn" title in bold 16px #1A1A1A
- "Giới tính": 2 toggle pills [Nữ | Nam], active state: #F0F5FF bg, #1250DC text.
- "Năm sinh": number input, #F9FAFB bg.

CARE FOR SECTION:
- "Ai sẽ cùng bạn trên hành trình này?" bold 16px
- 4 soft pill buttons in a 2x2 grid: [Bản thân] [Con] [Ba mẹ] [Cả gia đình]

BOTTOM (sticky):
- "Bắt đầu hành trình →" primary button, #1250DC bg, white text, height 56px, rounded 24px.
```

---

## PROMPT 2 — Health Scan (Sức khỏe + OCR)

```
Design a modern, soft mobile health assessment screen (390x844) for "Long Châu Care".
AESTHETIC: Pure white background #FFFFFF, no harsh lines.

HERO MASCOT SECTION (Top):
- Left: blue back arrow.
- Center top: Embed this EXACT image: ![Insight Mascot](https://chauthuc.web.app/assets/mascots_nobg/mascot_insight.png)
- Size: LARGE (160px). The mascot looks attentive, thoughtful, as if it is carefully reading the user's health profile and trying to understand them.
- Large Text below mascot: "Hiểu về sức khỏe của bạn" bold 20px, centered.

SECTION 1 — "Hiện tại, bạn đang cảm thấy thế nào?":
- 6 selection cards (2-column grid). Background #F9FAFB, rounded 20px.
- 🟢 "Khỏe mạnh" (Default selected, faint blue bg)
- 🟡 "Cần theo dõi sức khỏe"
- 🟠 "Đang dùng thuốc mãn tính"
- 💜 "Sức khỏe tinh thần"
- 🤰 "Mang thai / Sau sinh"
- 🏥 "Đang hồi phục"

SECTION 2 — "Tải lên hồ sơ y tế":
- 5 upload icons (circles): [Đơn thuốc] [Xét nghiệm] [Sổ khám] [Siêu âm] [Tiêm chủng]

BOTTOM (sticky):
- "Phân tích sức khỏe →" primary button, bg #1250DC, rounded 24px.
```

---

## PROMPT 3 — Cycle Tracking (Chỉ nữ)

```
Design a modern mobile cycle tracking screen (390x844) for "Long Châu Care".
AESTHETIC: Very soft white-pink theme (#FFFFFF to faint #FFF9FA).

TOP BAR:
- Back arrow + "Chu kỳ của bạn" bold 16px.

HERO ILLUSTRATION (Center):
- Embed this EXACT image: ![Lotus](https://chauthuc.web.app/assets/plants/lotus_5.png)
- Size: LARGE 200px, floating elegantly over a soft pink glowing circle background.

MAIN CARD (rounded 24px, subtle shadow):
- Title: "Hiểu rõ cơ thể bạn hơn" (bold 18px)
- "Ngày bắt đầu kỳ gần nhất" (Date picker input)
- "Độ dài chu kỳ trung bình" (Number input +/-)

PREDICTION CARD (bg #FFF5F8, rounded 20px):
- "Dự kiến kỳ tiếp theo: [calculated date]"

BOTTOM (sticky):
- "Lưu thông tin →" primary button bg #1250DC.
```

---

## PROMPT 4 — Life Changes (Thay đổi gần đây)

```
Design a modern mobile life changes screen (390x844) for "Long Châu Care".
AESTHETIC: Pure white background #FFFFFF.

HERO CONVERSATIONAL SECTION:
- Top Center: Embed this EXACT mascot: ![Mascot Family](https://chauthuc.web.app/assets/mascots_nobg/mascot_family.png)
- Size: VERY LARGE (200px). The mascot is looking down empathetically, trying to understand the user's current life situation.
- Large soft chat bubble below mascot: "Gần đây bạn có thay đổi lớn nào trong cuộc sống không?" bold 18px.
- Subtitle: "Sự thay đổi về công việc, chỗ ở có thể ảnh hưởng nhiều đến sức khỏe đấy!" in #6B7280.

SELECTION CARDS (vertical stack):
Each card: white bg, rounded 20px, soft shadow.
1. 💼 "Bắt đầu công việc mới"
2. 🏠 "Chuyển nơi ở"
3. 🤰 "Mang thai"
4. 👶 "Vừa chào đón em bé"
5. 🎓 "Bắt đầu nghỉ hưu"
6. ✈️ "Đi công tác/nước ngoài thường xuyên"

BOTTOM (sticky):
- "Tiếp tục →" primary button bg #1250DC.
```

---

## PROMPT 5 — Habits (Thói quen + Vận động)

```
Design a modern mobile habits assessment screen (390x844) for "Long Châu Care".
AESTHETIC: Pure white #FFFFFF.

HERO MOTIVATION SECTION:
- Embed EXACT mascot: ![Mascot Approval](https://chauthuc.web.app/assets/mascots_nobg/mascot_approval.png)
- Size: LARGE (180px), centered at the top. The mascot is cheering and listening attentively to the user's habits.
- Title below: "Thói quen hàng ngày" bold 20px.

SECTION 1 — "Mức độ vận động của bạn?":
- 4 large pill-shaped buttons: [Rất đều đặn] [Thỉnh thoảng] [Khá ít vận động] [Đang muốn bắt đầu]

SECTION 2 — "Bạn muốn cải thiện thói quen nào?":
- Multi-select chips: [Hay thức khuya] [Rượu bia] [Ăn vội vàng] [Hay căng thẳng] [Hút thuốc] [Mình đang sống rất lành mạnh!]

BOTTOM (sticky):
- "Khám phá Khu Vườn →" primary button bg #1250DC, rounded 24px.
- Step indicator: 5 soft blue dots.
```

---

## PROMPT 6 — Plant Select (Chọn cây)

```
Design a modern mobile plant selection screen (390x844) for "Long Châu Care".
AESTHETIC: Pure white #FFFFFF background.

HEADER:
- "Bạn có một khu vườn đa dạng!" bold 22px, #1250DC
- "Chọn cây ưu tiên nhất lúc này." in #6B7280

PLANT CARDS (vertical stack, gap 16px):
Card 1 (Khổ Qua - Tiểu đường):
- Left image: ![Khổ Qua](https://chauthuc.web.app/assets/processed_root/plant_tra.png) (Size: 80px, larger for clarity)
- Right: "Cây Khổ Qua" (bold 18px) + "Đường huyết" + "Đắng trước ngọt sau"

Card 2 (Gừng - Huyết áp):
- Left image: ![Gừng](https://chauthuc.web.app/assets/plants/ginger_5.png) (Size: 80px)
- Right: "Cây Gừng" + "Huyết áp" + "Vị ấm đồng hành sáng tối"

Card 3 (Sả - Tiêu hóa):
- Left image: ![Sả](https://chauthuc.web.app/assets/plants/lemongrass_5.png) (Size: 80px)
- Right: "Cây Sả" + "Tiêu hóa" + "Thanh lọc nhẹ nhàng"

BOTTOM (sticky):
- "Bắt đầu gieo mầm →" primary button, bg #1250DC.
```

---

## PROMPT 7 — Seed Planted (Kết quả)

```
Design a modern mobile celebration screen (390x844) for "Long Châu Care".
AESTHETIC: Soft dark navy gradient (#0A1930 to #122B52).

CENTER CONTENT:
- Embed Hero Mascot: ![Pharmacist](https://chauthuc.web.app/assets/mascots_nobg/mascot_pharmacist_partner.png)
- Size: MASSIVE (240px) floating with glowing confetti, looking extremely thoughtful and caring, holding a small glowing seed.
- Title: "Hạt giống đã được gieo!" bold 24px, white.

MEDICAL TRIAGE CARD (Glassmorphism):
- bg rgba(255,255,255,0.05), rounded 24px.
- Text: "Dược sĩ riêng của bạn đang thiết kế Care Plan chuyên biệt." 15px, #D1D5DB

CARE TEAM CHECKLIST:
- "📤 Đã gửi đến Care Team" bold 15px, #82A9FF
- 1. Phân tích chỉ số sức khỏe
- 2. Lựa chọn cây thảo dược phù hợp

BOTTOM:
- "Ghé thăm Khu Vườn" primary button, white background, #1250DC text.
```
