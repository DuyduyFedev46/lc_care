# 🧑‍⚕️ Long Châu Care Mascot — Bộ Prompt Generate

> **Vai trò:** Mascot là gương mặt đại diện, tiếng nói của Long Châu Care với người dùng.
> **Thay thế:** Tất cả vị trí đang dùng 🤖 (robot) hoặc "trợ lý AI" → chuyển sang Mascot.
> **Tính cách:** Dược sĩ trẻ, thân thiện, ấm áp, chuyên nghiệp, gần gũi với gia đình Việt.

---

## DANH SÁCH VỊ TRÍ MASCOT SẼ XUẤT HIỆN (để người thiết kế nắm)

| # | Màn hình / Vị trí | File nguồn | Emoji cũ | Vai trò của Mascot |
|---|-------------------|------------|----------|---------------------|
| 1 | AI Scan — Loading | `AIScanStep.jsx:32` | 🤖 spinning | Đang phân tích dữ liệu của bạn... |
| 2 | AI Scan — Kết quả Insight | `AIScanResultsStep.jsx:95` | 🤖 | Đưa ra nhận xét về thói quen mua hàng |
| 3 | AI Scan — AI Summary card | `AIScanResultsStep.jsx:194` | 🤖 | Tóm tắt kết quả OCR cho khách hàng |
| 4 | Family — Gợi ý từ Care Team | `FamilyScreen.jsx:20` | 🤖 | Gợi ý chăm sóc sức khỏe gia đình |
| 5 | Pharmacist — AI tóm tắt | `PharmacistScreen.jsx:112` | 🤖 | Tóm tắt hồ sơ cho Dược sĩ |
| 6 | Backend — System Prompt | `system_prompt.txt` | "trợ lý AI" | Giọng nói / nhân cách của toàn bộ AI system |
| 7 | Backend — OCR Summary | `ocr_summary.txt` | "trợ lý AI" | Tóm tắt giấy tờ y tế |
| 8 | Backend — Purchase Summary | `purchase_summary.txt` | "trợ lý AI" | Tổng hợp lịch sử mua hàng |
| 9 | Backend — Insight Cross Member | `insight_cross_member.txt` | "trợ lý AI" | Phân tích pattern gia đình |
| 10 | Backend — Habit Suggestion | `habit_suggestion.txt` | "trợ lý AI" | Gợi ý thói quen sức khỏe |
| 11 | Backend — Admin Summary | `admin_summary.txt` | "trợ lý AI" | Tóm tắt onboarding khách mới |

---

## Prompt 1: Mascot Chuẩn — Standing Pose (`mascot_main.png`) ⭐ QUAN TRỌNG NHẤT

```
A cute, squatter version of the anthropomorphic robot pharmacist mascot, rendered as a high-resolution 3D model. The torso is significantly shortened, making the white lab coat jacket appear more compact and roly-poly. The legs are dramatically reduced in length, becoming short and stubby, with the boots now positioned much closer to the bottom edge of the jacket. The overall height is greatly reduced. All face and head details, including the distinctive blue head with white headphones, large blue eyes, and rosy cheeks, are kept full-size, making the head a dominant feature relative to the squatter body. The white lab coat, blue shirt, and tie are scaled and re-tailored. On the left chest pocket area of the shortened lab coat, the Vietnamese text "NHÀ THUỐC LONG CHÂU" and the colourful multi-part logo are rendered with perfect clarity and legibility. The mascot wears shorter, plumper blue gloves on scaled-down hands. Standing straight, facing directly forward. The background is a soft gradient transitioning from cyan (left) to pale yellow (right). The lighting is soft and even studio lighting. The figure has the feel of a cute, high-quality toy.
```

---

## Prompt 2: Expression Set — 8 Biểu Cảm (`mascot_expressions.png`)

```
The SAME 3D squatter anthropomorphic robot pharmacist mascot character showing 8 different facial expressions as headshots (shoulders up). Arranged in a 2x4 grid, each 300x300px with transparent gaps. CONSISTENT 3D toy-like design across all — same blue head, white headphones, lab coat, same lighting direction. Only the face/eyes/mouth/eyebrows change.

Row 1:
1) DEFAULT — Warm gentle smile, sparkle large blue eyes. Label: "Mặc định"
2) HAPPY / CELEBRATING — Eyes closed in happy U-shape (^_^), open mouth smile, rosy cheeks intensified. Label: "Vui mừng"
3) THINKING / ANALYZING — One eye slightly squinted, index finger of plump blue glove touching chin. Label: "Đang phân tích"
4) CARING / EMPATHETIC — Soft downturned inner eyebrows, small understanding smile. Label: "Quan tâm"

Row 2:
5) SURPRISED — Wide open eyes, round open mouth. Label: "Ngạc nhiên"
6) PROUD / APPROVED — Confident half-closed eyes, satisfied smirk, arms slightly crossed. Label: "Đã duyệt"
7) EXPLAINING / TALKING — Open mouth (mid-talking shape), friendly eyes, one hand gesturing. Label: "Đang tư vấn"
8) SLEEPING / RESTING — Eyes closed with gentle curves, peaceful relaxed smile. Label: "Nghỉ ngơi"

All expressions on white/transparent background. Consistent soft studio lighting. High-resolution 3D toy style.
```

---

## Prompt 3: Mascot Avatar Circle — Ảnh đại diện nhỏ (`mascot_avatar.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot as a circular avatar crop, suitable for notification icons.

- Same high-quality 3D toy-like mascot character with default warm expression
- Circular frame (200x200px), face centered, showing distinctive blue head, white headphones, and top of shortened lab coat
- Soft gradient background inside circle: cyan to pale yellow
- Clean, rendered with perfect clarity at small sizes

Export as: 200x200px PNG with transparent outer area.
```

---

## Prompt 4: Mascot Loading Animation — Đang phân tích (`mascot_loading.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot in a "working/analyzing" pose for loading screens.

- Same 3D toy-like mascot character, standing on short stubby legs
- Both scaled-down hands with plump blue gloves hovering near a floating holographic document/paper with a soft blue glow
- Eyes focused, concentrated expression
- Several small floating elements around suggesting medical data being processed
- Soft magical particles floating upward
- Background: transparent or very light gradient

High-resolution 3D model, soft studio lighting.
```

---

## Prompt 5: Mascot Insight Card — Gợi ý sức khỏe (`mascot_insight.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot presenting a health insight/recommendation.

- Same 3D toy-like mascot character, half-body (waist up) showing the compact roly-poly torso
- Leaning slightly forward
- One plump blue-gloved hand gesturing toward the viewer (friendly)
- Warm empathetic expression
- Next to mascot: a soft glowing 3D speech bubble or card shape with placeholder text area
- Small decorative elements: a tiny 3D potted plant 🌱
- Background: transparent
- Style: High-resolution 3D render, soft lighting, cute high-quality toy feel.
```

---

## Prompt 6: Mascot Approval — Dược sĩ đã duyệt (`mascot_approval.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot in a celebratory "APPROVED" moment.

- Same 3D toy-like mascot character, half-body
- Holding up a large 3D green stamp/seal that reads "ĐÃ DUYỆT"
- Proud confident expression
- Background: soft golden/white radial burst, subtle 3D confetti particles
- High-resolution 3D model, soft studio lighting, cute toy-like aesthetic.
```

---

## Prompt 7: Mascot Onboarding Welcome (`mascot_welcome.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot welcoming a new user.

- Same 3D toy-like mascot character, full body with short stubby legs and compact torso
- Both arms with plump blue gloves open in a welcoming gesture
- Warm default smile
- Standing next to a 3D rendering of the Long Châu logo
- Background: soft gradient cyan to pale yellow
- High-resolution 3D render, perfectly clear "NHÀ THUỐC LONG CHÂU" on the pocket.
```

---

## Prompt 8: Mascot System — Bộ Mascot UI Elements (`mascot_ui_kit.png`)

```
A UI kit sprite sheet of small mascot elements. All variations of the 3D squatter anthropomorphic robot pharmacist mascot in compact sizes. Arranged in a grid on transparent background:

1) Notification icon — circular mascot head with a small red badge dot
2) Chat bubble mascot — mini mascot head inside a 3D speech bubble
3) Empty state — mascot looking at an empty 3D pot, gentle encouraging expression
4) Error state — mascot with small sweat drop, apologetic expression
5) Success state — mascot with sparkle eyes, small 3D green checkmark
6) Tip/Info — mascot peeking from behind a small 3D info card
7) Reminder — mascot holding a small 3D bell 🔔
8) Points/Earned — mascot with a "+10" text

High-quality 3D render, cute toy feel.
```

---

## Prompt 9: Mascot & Family — Cảnh gia đình (`mascot_family.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot standing together with 4 Vietnamese family members, all rendered in the same cute, high-quality 3D toy style.

- Mascot on the left, full 3D squatter body, warm professional smile
- 4 family members on the right, also rendered as cute 3D chibi-like toy figures:
  * Chị Mai (nữ ~35)
  * Anh Hùng (nam ~40)
  * Chị Lan (nữ ~60)
  * Chị Hà (nữ ~28)
- Background: soft gradient transitioning from cyan (left) to pale yellow (right)
- Soft studio lighting.
```

---

## Prompt 10: Mascot Pharmacist Partner (`mascot_pharmacist_partner.png`)

```
The 3D squatter anthropomorphic robot pharmacist mascot as a partner/assistant to real pharmacists.

- Same 3D toy-like mascot character
- Standing beside a 3D digital dashboard/hologram screen
- Holding a cute, thick 3D clipboard or tablet
- Expression: focused, capable
- Background: soft, blurred modern pharmacy setting
- High-resolution 3D model, cute toy feel.
```

---

## OUTPUT FILES SUMMARY

| File | Kích thước | Dùng cho vị trí # |
|------|-----------|-------------------|
| `mascot_main.png` | ~1.5MB | Character master — tất cả vị trí đều derive từ đây |
| `mascot_expressions.png` | ~1MB | Biểu cảm cho mọi context (1-11) |
| `mascot_avatar.png` | ~100KB | Avatar nhỏ: notification, chat bubble, profile |
| `mascot_loading.png` | ~500KB | Vị trí #1 — AI Scan loading |
| `mascot_insight.png` | ~400KB | Vị trí #2, #3, #4 — Insight & summary cards |
| `mascot_approval.png` | ~400KB | Vị trí #5 — DS duyệt |
| `mascot_welcome.png` | ~600KB | Onboarding welcome |
| `mascot_ui_kit.png` | ~500KB | UI elements rải rác (empty state, error, toast, tip...) |
| `mascot_family.png` | ~600KB | Family tab hero |
| `mascot_pharmacist_partner.png` | ~500KB | Pharmacist dashboard |

**Tổng: 10 file mascot asset**

---

## TIPS KHI GENERATE

- **Generate `mascot_main.png` TRƯỚC TIÊN** — tất cả prompt khác tham chiếu đến character design 3D này.
- Mascot này là dạng robot hình người lùn (squatter), 3D rendered, có tỉ lệ thân ngắn, chân ngắn mập, tay đeo găng xanh béo mập.
- Phong cách 3D high-resolution, ánh sáng studio mềm mại, cảm giác như một món đồ chơi cao cấp (high-quality toy).
- Chữ "NHÀ THUỐC LONG CHÂU" trên áo phải được render rõ nét và sắc sảo.
- Export PNG với transparent background cho hầu hết asset (trừ scene có background).
- Tên file nên có prefix `mascot_` để dễ quản lý trong thư mục assets.
