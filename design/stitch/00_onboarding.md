# Bộ Prompt Gemini — 7 Màn Hình Onboarding LC Care v2 (14 Cây, Real Assets, Big Mascots)

> **Design System - "Mềm mại & Chu đáo":**
> Tông màu chính: Nền Trắng tinh khiết (#FFFFFF), Xanh Long Châu (#1250DC).
> Hình ảnh: Sử dụng trực tiếp ảnh Mascot và Plants từ dự án.
> LAYOUT: Mascot phải RẤT TO (Hero character), đóng vai trò như một người bạn/dược sĩ đang lắng nghe, thấu hiểu và cố gắng giúp đỡ người dùng. Không dùng mascot như icon nhỏ nữa.
> **Plant System**: 14 nhóm cây (G1-G14), mỗi người 1 cây, rule-based assignment.

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

SECTION 2 — Chronic sub-conditions (shown when "Đang dùng thuốc mãn tính" selected):
- 5 multi-select chips: [🩸 Tiểu đường] [❤️ Huyết áp] [🫀 Mỡ máu] [🦴 Xương khớp] [🫄 Tiêu hóa / Gan]

SECTION 3 — "Tải lên hồ sơ y tế":
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

## PROMPT 6 — Plant Select (Chọn cây — 14 Nhóm Cây)

```
Design a modern mobile plant selection screen (390x844) for "Long Châu Care".
AESTHETIC: Pure white #FFFFFF background.

HEADER:
- "Khu Vườn Thảo Dược của bạn" bold 22px, #1250DC
- "Mỗi người một cây — hệ thống gợi ý dựa trên hồ sơ sức khỏe." in #6B7280

SUGGESTED PLANT (highlighted card at top, bg #F0F5FF, border 2px #1250DC, rounded 20px):
- "🌱 Gợi ý cho bạn" badge at top-left
- Plant image LARGE (100px) on the left
- Plant name bold 20px
- Journey description + câu chuyện
- "Dược sĩ sẽ duyệt" badge nếu là Medical Group

ALL PLANTS SECTION — "Hoặc chọn cây khác phù hợp với bạn:":
4-column grid, 14 plant cards:

Row 1:
- G1:  ![Bạc Hà](...) label "Bạc Hà" — "Khỏe mạnh"
- G2:  ![Gừng](https://chauthuc.web.app/assets/plants/ginger_5.png) label "Gừng" — "Huyết áp" + badge "DS duyệt"
- G3:  ![Khổ Qua](https://chauthuc.web.app/assets/processed_root/plant_tra.png) label "Khổ Qua" — "Tiểu đường" + badge "DS duyệt"
- G4:  ![Sen](https://chauthuc.web.app/assets/plants/lotus_5.png) label "Sen" — "Thai sản"

Row 2:
- G5:  ![Húng Quế](...) label "Húng Quế" — "Trẻ em"
- G6:  ![Lô Hội](...) label "Lô Hội" — "Cao tuổi"
- G7:  ![Nghệ](https://chauthuc.web.app/assets/plants/turmeric_5.png) label "Nghệ" — "Hồi phục" + badge "DS duyệt"
- G8:  ![Oải Hương](...) label "Oải Hương" — "Tinh thần" + badge "DS duyệt"

Row 3:
- G9:  ![Nhân Sâm](...) label "Nhân Sâm" — "Vận động"
- G10: ![Rau Má](...) label "Rau Má" — "Ít vận động"
- G11: ![Cam Thảo](...) label "Cam Thảo" — "Gia đình"
- G12: ![Sả](https://chauthuc.web.app/assets/plants/lemongrass_5.png) label "Sả" — "Thanh lọc"

Row 4:
- G13: ![Đỗ Trọng](...) label "Đỗ Trọng" — "Xương khớp" + badge "DS duyệt"
- G14: ![Diệp Hạ Châu](...) label "Diệp Hạ Châu" — "Tiêu hóa" + badge "DS duyệt"

INFO BOX (bg #F9FAFB, rounded 16px, below grid):
"🛡 6 nhóm cây (Gừng, Khổ Qua, Nghệ, Oải Hương, Đỗ Trọng, Diệp Hạ Châu) cần Dược sĩ duyệt trước khi kích hoạt.
Các cây còn lại được kích hoạt ngay sau khi bạn hoàn tất."

BOTTOM (sticky):
- "Bắt đầu gieo mầm →" primary button, bg #1250DC.
```

---

## PROMPT 7 — Seed Planted (Kết quả + AI Summary)

```
Design a modern mobile celebration screen (390x844) for "Long Châu Care".
AESTHETIC: Soft dark navy gradient (#0A1930 to #122B52).

CENTER CONTENT:
- Embed Hero Mascot: ![Pharmacist](https://chauthuc.web.app/assets/mascots_nobg/mascot_pharmacist_partner.png)
- Size: MASSIVE (240px) floating with glowing confetti, looking extremely thoughtful and caring, holding a small glowing seed.
- Title: "Hạt giống đã được gieo!" bold 24px, white.

MEDICAL TRIAGE CARD (Glassmorphism):
- bg rgba(255,255,255,0.05), rounded 24px.
- NON-MEDICAL GROUPS: "Cây của bạn đã được kích hoạt! Hãy ghé thăm Khu Vườn."
- MEDICAL GROUPS (G2, G3, G7, G8, G13, G14): "Dược sĩ riêng của bạn đang thiết kế Care Plan chuyên biệt." 15px, #D1D5DB

AI SUMMARY SECTION:
- "📋 Tóm tắt hồ sơ sức khỏe" bold 15px, #82A9FF
- AI-generated summary text (from Gemini, passed guardrails)
- Source tracking: "Thông tin từ: self-report + OCR"

CARE TEAM CHECKLIST (for Medical Groups):
- "📤 Đã gửi đến Care Team" bold 15px, #82A9FF
- 1. Phân tích chỉ số sức khỏe
- 2. Dược sĩ xem xét và duyệt cây
- 3. Kích hoạt Care Plan
- "⏱ Dược sĩ sẽ phản hồi trong vòng 2 giờ"

BOTTOM:
- Non-Medical: "Ghé thăm Khu Vườn" primary button, white bg, #1250DC text
- Medical: "Về trang chủ" secondary button
```

---

## DESIGN TOKENS REFERENCE

| Token | Value | Usage |
|---|---|---|
| Primary Blue | #1250DC | Buttons, titles, active states |
| Pure White | #FFFFFF | Main background |
| Soft Gray BG | #F9FAFB | Input fields, info boxes |
| Mid Gray Text | #6B7280 | Subtitles, descriptions |
| Dark Text | #1A1A1A | Bold titles |
| Light Gray Text | #D1D5DB | Dark mode text |
| Highlight Blue BG | #F0F5FF | Selected/highlighted cards |
| TPCN Pink | #FFF5F8 | Cycle tracking tint |
| Accent Blue | #82A9FF | Dark mode highlights |
| Dark Navy | #0A1930 to #122B52 | Seed Planted gradient |
| Corner Radius | 20-24px | Cards, buttons |
| Button Height | 56px | Primary CTA |

---

## PLANT ASSETS REFERENCE (14 Cây)

| Group | Cây           | Asset Path |
| ----- | ------------- | -------------------------------------------------- |
| G1    | Bạc Hà      | (pending)                                          |
| G2    | Gừng         | `assets/plants/ginger_5.png`                      |
| G3    | Khổ Qua      | `assets/processed_root/plant_tra.png`             |
| G4    | Sen           | `assets/plants/lotus_5.png`                       |
| G5    | Húng Quế    | (pending)                                          |
| G6    | Lô Hội       | (pending)                                          |
| G7    | Nghệ         | `assets/plants/turmeric_5.png`                    |
| G8    | Oải Hương   | (pending)                                          |
| G9    | Nhân Sâm     | (pending)                                          |
| G10   | Rau Má       | (pending)                                          |
| G11   | Cam Thảo     | (pending)                                          |
| G12   | Sả           | `assets/plants/lemongrass_5.png`                  |
| G13   | Đỗ Trọng    | (pending)                                          |
| G14   | Diệp Hạ Châu | (pending)                                          |

## MASCOT ASSETS REFERENCE

| Screen     | Mascot                                           |
| ---------- | ------------------------------------------------ |
| Welcome    | `assets/mascots_nobg/mascot_welcome.png`        |
| Health Scan| `assets/mascots_nobg/mascot_insight.png`        |
| Life Changes| `assets/mascots_nobg/mascot_family.png`         |
| Habits     | `assets/mascots_nobg/mascot_approval.png`       |
| Seed Planted| `assets/mascots_nobg/mascot_pharmacist_partner.png` |

Base URL: `https://chauthuc.web.app/`
