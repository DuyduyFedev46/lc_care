# 🌿 Long Châu Care — Narrative Design Bible

> **Version:** 1.0 · 2026-05-26
> **Purpose:** Source of truth cho narrative, mechanics, daily ritual design
> **Scope:** 15 cây thảo dược × 4 giai đoạn × micro-narratives + engagement systems
> **Compliance:** Tuân thủ Rule #0 (AI không chẩn đoán) + 5 Guardrails y tế

---

# PHẦN 1: WORLD BUILDING

## 1.1 Triết lý cốt lõi

> *"Mỗi ngày bạn chăm sóc sức khỏe, là mỗi ngày bạn tưới nước cho khu vườn của mình."*

Long Châu Care xây dựng trên một phép ẩn dụ trung tâm:

**Sức khỏe = Khu vườn. Hành động = Nước. Thời gian = Ánh sáng. Kiên trì = Hoa.**

Đây không phải gamification rẻ tiền. Đây là **narrative therapy** — biến hành trình xây dựng thói quen sức khỏe (vốn khô khan, đáng sợ, cô đơn) thành một câu chuyện có mục đích, có nhân vật, có kết thúc đẹp.

Tại sao cây thảo dược Việt Nam?

- **Quen thuộc**: Gừng, nghệ, sả... nằm trong ký ức tuổi thơ mọi người Việt
- **Không y khoa hóa**: Cây ≠ thuốc. Cây = bạn đồng hành (tránh vi phạm Rule #0)
- **Có thể kể chuyện**: Mỗi cây có "tính cách", "lịch sử", "ý nghĩa văn hóa"
- **Long Châu DNA**: Nhà thuốc → dược liệu → thảo dược — brand fit tự nhiên

## 1.2 Thế giới quan — Khu Vườn Đồi

Khu Vườn của Long Châu Care tồn tại trên một **ngọn đồi** (Modern Hillside — từ art direction). Đồi này có ý nghĩa:

| Yếu tố                                    | Symbolism                                                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Đồi** (không phải đồng bằng) | Sức khỏe là hành trình đi lên — có dốc, có nghỉ, nhưng luôn hướng lên |
| **Ánh sáng vàng ấm**              | Năng lượng tích cực, an toàn (palette #FAF4E8)                                   |
| **Không có đêm**                  | Trong vườn luôn là ban ngày — user đến đây để cảm thấy tốt hơn         |
| **Chậu đất nung**                  | Mộc mạc, Việt Nam, organic — không phải chậu hi-tech                            |
| **Con đường nhỏ**                 | User đang đi trên con đường sức khỏe, từng bước một                        |

**Tone thị giác:**

- Background: `#FAF4E8` (giấy kraft ấm)
- Glassmorphism overlays: `rgba(253, 251, 247, 0.75)` + blur
- Border earth: `rgba(139, 90, 43, 0.2)`
- Text: `#4A3728` (nâu đậm ấm)

## 1.3 Quy luật thế giới — 4 Luật Bất Biến

### Luật 1: CÂY KHÔNG BAO GIỜ CHẾT

```
plantStatus ∈ {pending, growing, paused, graduated}
// KHÔNG CÓ "dead", "wilted", "withered"
```

Khi user bỏ app 3+ ngày → cây "ngủ đông" (`paused`), không chết. Narrative: "Cây của bạn đang nghỉ ngơi, chờ bạn quay lại."

**Lý do thiết kế:** Guilt = toxic cho health app. User bỏ app vì bận/ốm/quên — phạt họ = đẩy họ đi xa hơn. Luật này biến "thất bại" thành "tạm nghỉ".

### Luật 2: THỜI GIAN = STREAK

```
streak = số ngày liên tiếp có adherenceEvent
stage = f(streak): 0-7 → 1, 8-14 → 2, 15-29 → 3, 30+ → 4
```

Cây lớn lên bằng **sự kiên trì**, không bằng tiền. Không có cách mua streak, không có shortcut.

### Luật 3: NƯỚC = HÀNH ĐỘNG SỨC KHỎE

```
waterHabit(habitId) → adherenceEvent → +10đ → streak update
```

"Tưới cây" = hoàn thành 1 habit sức khỏe. Không phải nhấn nút vô nghĩa — mỗi lần tưới là một hành động thật (uống thuốc, đo huyết áp, đi bộ...).

### Luật 4: DƯỢC SĨ = NGƯỜI GÁC CỔNG

```
Medical Groups (G2,G3,G7,G8,G13,G14,G15): plantStatus = "pending" → DS duyệt → "growing"
```

7/15 cây cần Dược sĩ approve trước khi kích hoạt. AI không bao giờ tự gán cây y tế — luôn có human gate.

## 1.4 Bản đồ cảm xúc — Emotional Arc

User trải qua 4 giai đoạn tâm lý khi dùng app:

```
STRANGER (Ngày 0)          → "App gì đây? Trồng cây? Kỳ vậy?"
    ↓ [Onboarding + hạt giống]
CARETAKER (Tuần 1-2)       → "Ờ, tưới cây xong thấy vui phết. Mai tưới tiếp."
    ↓ [Streak 7-14, badge đầu tiên]
GUARDIAN (Tháng 1-2)        → "Cây này là CỦA MÌNH. Mình chịu trách nhiệm."
    ↓ [Streak 15-29, habits thành routine]
HEALER (Tháng 3+)          → "Mình khỏe hơn thật. Cây nở hoa rồi."
    ↓ [Streak 30+, mature stage]
```

**Key insight:** Giai đoạn nguy hiểm nhất là **Stranger → Caretaker** (D1-D7). Nếu user không quay lại trong 7 ngày đầu, mất luôn. Vì vậy tuần 1 cần narrative mạnh nhất.

## 1.5 Ngôn ngữ thiết kế — Guardrails-Compliant

### Từ cấm tuyệt đối (từ guardrails.py)

| ❌ KHÔNG DÙNG       | ✅ THAY THẾ                        |
| --------------------- | ----------------------------------- |
| "bạn bị [bệnh]"    | "bạn đang dùng thuốc [nhóm]"   |
| "bạn mắc [bệnh]"   | "bạn đang theo dõi [chỉ số]"   |
| "chẩn đoán"        | "hồ sơ sức khỏe"                |
| "điều trị bệnh"   | "chăm sóc sức khỏe"             |
| "bệnh nhân"         | "người dùng / bạn"              |
| "phác đồ"          | "kế hoạch chăm sóc"             |
| "nên dùng thuốc X" | "Dược sĩ sẽ tư vấn"           |
| "nên trồng cây X"  | (AI không được đề xuất cây) |

### Tone of voice

- **Ấm áp** — như người bạn quan tâm, không phải bác sĩ
- **Khiêm nhường** — "chúng mình cùng nhau" thay vì "bạn phải"
- **Có hình ảnh** — dùng metaphor vườn tự nhiên
- **Ngắn** — micro-narrative tối đa 2 dòng (hiện trong notification/toast)

## 1.6 Mascot Persona

Mascot của Long Châu Care (con thú cưng trong vườn) có **5 trạng thái** chính:

| State           | Trigger                      | Biểu hiện                           | Ý nghĩa narrative                  |
| --------------- | ---------------------------- | ------------------------------------- | ------------------------------------ |
| `idle`        | Default                      | Ngồi cạnh chậu, nhìn quanh        | "Mình ở đây, chờ bạn"          |
| `entering`    | Mở app                      | Chạy vào từ góc                   | "Ơ, bạn đến rồi!"               |
| `watering`    | Tick habit                   | Tưới nước cùng                   | "Mình giúp bạn nè!"              |
| `celebrating` | Level up                     | Nhảy múa                            | "YEAHHH! Bạn giỏi quá!"           |
| `sleeping`    | Plant paused (3+ ngày miss) | Ngủ gật cạnh chậu, bong bóng zzZ | "Mình cũng nghỉ ngơi cùng cây" |

Mascot **không bao giờ buồn hay giận** khi user bỏ app. Khi `plantStatus = "paused"`, mascot chuyển sang `sleeping` — ngủ gật nhẹ nhàng cạnh chậu cây, tạo narrative đáng yêu thay vì guilt. Khi user quay lại → mascot "thức dậy" (entering), vui mừng.

**Nguyên tắc cảm xúc mascot:** Phù hợp Luật 1 (cây không chết → mascot không khóc). Sleeping ≠ buồn, sleeping = đồng hành nghỉ ngơi.

---

# PHẦN 2: 15 CÂY TRUYỆN

> Mỗi cây được viết theo template:
>
> 1. **Identity Card** — Thông số kỹ thuật
> 2. **Backstory** — Tại sao cây này ở đây?
> 3. **4 Chương** — Mỗi chương = 1 stage (Mầm non → Cây non → Trưởng thành → Nở hoa)
> 4. **Habits mẫu** — 3 default + 2 optional
> 5. **Micro-narratives** — 5 câu/chương = 20 câu/cây
> 6. **Special scenarios** — Pending, Paused, Graduated

---

## NHÓM A: MEDICAL PLANTS (7 cây — cần Dược sĩ duyệt)

Nhóm này có narrative phức tạp nhất vì:

- Có trạng thái `pending` (chờ DS)
- Habits liên quan y tế trực tiếp
- Cần guardrails chặt hơn trong ngôn ngữ
- User trong nhóm này thường lo lắng hơn → cần reassurance

---

### 🫚 G2 — CÂY GỪNG (Ginger)

#### Identity Card

| Field           | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Code            | `ginger`                                                           |
| Group           | G2                                                                   |
| Emoji           | 🫚                                                                   |
| Màu chủ đạo | `#00923F`                                                          |
| Màu nhạt      | `#E8F5EE`                                                          |
| Journey         | Chăm sóc sức khỏe                                                |
| Story           | "Vị ấm, giải cảm, đồng hành sáng tối"                       |
| Trigger         | `healthStatus = "monitoring"` HOẶC `hypertension` sub-condition |
| DS duyệt       | ✅ Có                                                               |
| Đối tượng   | Người theo dõi huyết áp, dùng thuốc tim mạch đều đặn     |

#### Backstory

Gừng là cây lâu đời nhất trong Khu Vườn. Rễ của nó ăn sâu vào đất — biểu tượng cho sự kiên định, đều đặn, và ấm áp từ bên trong. Người ta nói "ăn gừng để giữ ấm" — ở đây, Gừng giữ ấm trái tim, giữ nhịp đều đặn mỗi ngày.

Gừng không hào nhoáng. Gừng không nở hoa rực rỡ. Nhưng Gừng **luôn ở đó** — mỗi sáng, mỗi tối — như thói quen uống thuốc đều đặn.

#### Chương 1: Mầm Non (Streak 0-7)

**Theme:** *Bắt đầu = Dũng cảm*

**Opening narrative (hiển thị ngày đầu):**

> "Một hạt gừng nhỏ vừa được gieo xuống đất ấm. Nó chưa biết mình sẽ lớn thế nào — nhưng nó biết, chỉ cần được tưới nước mỗi ngày, mọi thứ sẽ ổn."

**Micro-narratives (random hiện khi tưới/mở app):**

1. "Hạt gừng đang hút nước... cảm ơn bạn, hôm nay cũng đủ rồi."
2. "Dưới lớp đất, rễ nhỏ đang bắt đầu vươn ra. Bạn không thấy — nhưng nó đang xảy ra."
3. "Ngày thứ {streak}. Gừng nhớ bạn đến mỗi ngày đấy."
4. "Đất hôm nay ẩm vừa đủ. Giống như huyết áp vừa đủ — đều đặn là tốt nhất."
5. "Mỗi giọt nước hôm nay là một lời hứa với ngày mai."

**Milestone event (streak = 7):**

> 🌱 Badge "Mầm Xanh" unlocked!
> "Gừng vừa nhú mầm đầu tiên! 7 ngày — tuần đầu tiên bạn giữ lời hứa với bản thân."

#### Chương 2: Cây Non (Streak 8-14)

**Theme:** *Đều đặn tạo thói quen*

**Opening narrative (khi chuyển stage):**

> "Mầm gừng đã thành cây non! Lá đầu tiên vươn ra đón ánh sáng. Cây biết — bạn sẽ đến tưới nước mỗi ngày. Đó không phải hy vọng. Đó là niềm tin."

**Micro-narratives:**

1. "Lá gừng rung nhẹ khi thấy bạn đến. Thói quen tốt nhất là thói quen bạn không cần nghĩ."
2. "Rễ đã chắc hơn rồi. Như bạn — mỗi ngày đều đặn, nền tảng càng vững."
3. "Gừng thích buổi sáng. Giống bạn uống thuốc buổi sáng — đúng giờ, đều đặn."
4. "Tuần thứ 2 rồi. Bạn biết không? Phần lớn người ta bỏ cuộc ở tuần 2. Bạn vẫn đây."
5. "Cây đang học cách đứng vững. Không cần nhanh — chỉ cần đều."

**Milestone event (streak = 14):**

> 🌿 Badge "Cây Lớn" unlocked!
> "Gừng đã đứng vững! 14 ngày — bạn đã biến 'cố gắng' thành 'thói quen'."

#### Chương 3: Trưởng Thành (Streak 15-29)

**Theme:** *Kiên trì = Bản sắc*

**Opening narrative:**

> "Cây Gừng đã trưởng thành. Thân cây cứng cáp, rễ ăn sâu. Bạn không còn 'cố gắng tưới cây' nữa — bạn tưới vì đó là bạn. Sức khỏe đã trở thành bản sắc."

**Micro-narratives:**

1. "Gừng tỏa hương ấm mỗi sáng. Giống bạn — mỗi sáng đều bắt đầu đúng cách."
2. "Bạn đã đi được nửa chặng đường tới 'Nở hoa'. Nhìn lại xem — xa lắm rồi đó."
3. "Rễ gừng bây giờ chắc lắm. Như nền tảng sức khỏe của bạn — vững rồi, không lung lay."
4. "Ngày {streak}. Dược sĩ sẽ rất vui khi thấy sự kiên trì này."
5. "Gừng nói: 'Cảm ơn bạn đã không bỏ cuộc. Mình cũng vậy.'"

#### Chương 4: Nở Hoa (Streak 30+)

**Theme:** *Hoa nở = Thành quả*

**Opening narrative:**

> "Cây Gừng đã nở hoa. Bông hoa nhỏ xinh, vàng nhạt — giản dị nhưng đẹp. 30 ngày. Một tháng. Bạn đã chứng minh cho bản thân: 'Mình làm được.'"

**Micro-narratives:**

1. "Hoa gừng nở rồi. Không phải vì phép màu — vì 30 ngày kiên trì của bạn."
2. "Khu vườn tự hào có bạn. Gừng tự hào có bạn."
3. "Streak {streak} ngày. Bạn đã làm điều mà 90% người ta không làm được."
4. "Gừng thì thầm: 'Mình lớn lên được vì có bạn. Bạn khỏe hơn vì có mình.'"
5. "Hoa nở không phải điểm kết thúc — là điểm bắt đầu của thói quen suốt đời."

**Milestone event (streak = 30):**

> 🌳 Badge "Vườn Xanh" unlocked!
> "Cây Gừng đã nở hoa tuyệt đẹp! 30 ngày — bạn đã xây dựng một thói quen mà không ai lấy đi được."

#### Habits mẫu — G2 Gừng

| ID           | Tên                     | Thời gian | Icon             | Điểm | Loại    |
| ------------ | ------------------------ | ---------- | ---------------- | ------ | -------- |
| `bp_log`   | Ghi chỉ số huyết áp  | 08:00      | ui_chart_bar     | 15     | Default  |
| `meds_am`  | Uống thuốc buổi sáng | 07:30      | ui_pill_medicine | 20     | Default  |
| `water_2l` | Uống đủ 2L nước     | Cả ngày  | ui_water_drop    | 10     | Default  |
| `low_salt` | Ăn nhạt hôm nay       | Bữa ăn   | ui_note_pencil   | 10     | Optional |
| `walk_20`  | Đi bộ nhẹ 20 phút    | 17:00      | ui_heart_health  | 10     | Optional |

#### Pending state narrative

> "Hạt Gừng đã được gieo — nhưng cần Dược sĩ kiểm tra đất trước khi tưới. Hồ sơ sức khỏe của bạn đang được xem xét. Dự kiến trong vòng 2 giờ."

#### Paused state narrative

> "Cây Gừng đang nghỉ ngơi. Lá hơi rủ — nhưng rễ vẫn chắc. Gừng không giận bạn. Gừng chờ bạn. Quay lại bất cứ lúc nào, mình bắt đầu lại nhé?"

---

### 🥒 G3 — CÂY KHỔ QUA (Bitter Melon)

#### Identity Card

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Code          | `bittermelon`                                                  |
| Group         | G3                                                               |
| Emoji         | 🥒                                                               |
| Màu          | `#65A30D`                                                      |
| Màu nhạt    | `#ECFCCB`                                                      |
| Journey       | Chuyển hóa                                                     |
| Story         | "Đắng trước ngọt sau, cân bằng cuộc sống"               |
| Trigger       | `chronic` + `diabetes` sub-condition                         |
| DS duyệt     | ✅ Có                                                           |
| Đối tượng | Người kiểm soát đường huyết, dùng thuốc tiểu đường |

#### Backstory

Khổ Qua — cây của những người biết chấp nhận vị đắng để đổi lấy vị ngọt. Trong văn hóa Việt, ăn khổ qua là "chịu đắng" — và người Việt tin rằng đắng = tốt cho sức khỏe. Cây này dành cho những người mỗi ngày "chịu đắng" (uống thuốc, kiêng đồ ngọt, đo đường huyết) — nhưng biết rằng cuối con đường có "vị ngọt" của sức khỏe ổn định.

#### Chương 1: Mầm Non (Streak 0-7)

**Opening:**

> "Một hạt Khổ Qua được gieo — nhỏ xíu, xù xì, chẳng đẹp đẽ gì. Nhưng bên trong nó là sức mạnh: đắng bên ngoài, ngọt bên trong. Giống bạn — mỗi ngày kiên trì, dù không dễ dàng."

**Micro-narratives:**

1. "Hạt Khổ Qua đang nứt vỏ. Bước đầu luôn khó nhất — nhưng bạn đã bước rồi."
2. "Vị đắng của Khổ Qua là vị của kiên trì. Uống thuốc mỗi ngày — đắng nhưng cần."
3. "Ngày {streak}. Mỗi ngày bạn kiểm soát, là mỗi ngày bạn thắng."
4. "Khổ Qua không cần ngọt để đẹp. Bạn không cần dễ dàng để mạnh."
5. "Dưới đất, rễ Khổ Qua đang bám chặt. Như thói quen mới của bạn — từ từ nhưng chắc."

#### Chương 2: Cây Non (Streak 8-14)

**Opening:**

> "Cây Khổ Qua mọc nhanh lắm — dây leo vươn ra, tìm chỗ bám. Bạn cũng vậy: thói quen mới đang tìm chỗ đứng trong ngày. 2 tuần rồi — bạn đang quen dần."

**Micro-narratives:**

1. "Dây Khổ Qua vươn xa thêm 1 tấc hôm nay. Nhỏ thôi, nhưng mỗi ngày 1 tấc."
2. "Lá Khổ Qua xanh mướt. Giống chỉ số đường huyết ổn định — xanh = tốt."
3. "Bạn biết không? Khổ Qua cần giàn để leo. Bạn cần thói quen để tiến."
4. "Tuần 2 — cây đã có dây leo. Thói quen của bạn đã có 'dây neo'."
5. "Khổ Qua nói: 'Cảm ơn vì không bỏ cuộc vì vị đắng.'"

#### Chương 3: Trưởng Thành (Streak 15-29)

**Opening:**

> "Khổ Qua bắt đầu ra trái! Trái nhỏ, xù xì — chưa đẹp — nhưng đầy dinh dưỡng. Như thói quen của bạn: chưa hoàn hảo, nhưng đã thay đổi cuộc sống."

**Micro-narratives:**

1. "Trái Khổ Qua đầu tiên! Nhỏ thôi — nhưng là bằng chứng bạn đã cố gắng."
2. "Đắng ngày đầu, đắng ngày 15 — nhưng bạn vẫn đây. Đó là sức mạnh."
3. "Khổ Qua nói: 'Trái của mình xù xì, nhưng bên trong là vitamin.'"
4. "Ngày {streak}. Nửa chặng đường tới Nở hoa. Bạn thấy mình khác chưa?"
5. "Mỗi trái Khổ Qua là tổng của 1000 giọt nước. Mỗi thói quen tốt là tổng của 1000 lần lặp lại."

#### Chương 4: Nở Hoa (Streak 30+)

**Opening:**

> "Hoa Khổ Qua nở — nhỏ, vàng, giản dị. Nhưng ai đã đi qua 30 ngày 'chịu đắng' mới biết bông hoa này quý thế nào. Bạn đã chứng minh: đắng trước, ngọt sau."

**Micro-narratives:**

1. "Hoa Khổ Qua vàng rực dưới nắng. 30 ngày — vị đắng đã thành vị quen."
2. "Nhìn lại ngày đầu — bạn có tin mình sẽ đến đây không? Khổ Qua tin."
3. "Trái Khổ Qua giờ đã chín. Kiến thức y tế giờ đã thành phản xạ."
4. "Khổ Qua nói: 'Cảm ơn vì đã chấp nhận vị đắng. Bông hoa này là của bạn.'"
5. "Vườn đẹp nhất không phải vườn dễ trồng — mà vườn được kiên trì chăm sóc."

#### Habits mẫu — G3 Khổ Qua

| ID              | Tên                          | Thời gian | Icon             | Điểm | Loại    |
| --------------- | ----------------------------- | ---------- | ---------------- | ------ | -------- |
| `glucose_log` | Ghi chỉ số đường huyết  | 07:00      | ui_chart_bar     | 15     | Default  |
| `meds_am`     | Uống thuốc buổi sáng      | 07:30      | ui_pill_medicine | 20     | Default  |
| `water_2l`    | Uống đủ 2L nước          | Cả ngày  | ui_water_drop    | 10     | Default  |
| `low_sugar`   | Hạn chế đồ ngọt hôm nay | Bữa ăn   | ui_note_pencil   | 10     | Optional |
| `walk_30`     | Đi bộ sau ăn 30 phút      | 19:00      | ui_heart_health  | 15     | Optional |

#### Pending / Paused

**Pending:** "Hạt Khổ Qua cần đất đặc biệt — Dược sĩ đang chuẩn bị đất phù hợp nhất cho bạn."

**Paused:** "Dây Khổ Qua cuộn lại, nghỉ ngơi. Không sao — ngay cả cây cũng cần nghỉ. Quay lại khi bạn sẵn sàng."

---

### 🟡 G7 — CÂY NGHỆ (Turmeric)

#### Identity Card

| Field         | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| Code          | `turmeric`                                                             |
| Group         | G7                                                                       |
| Emoji         | 🟡                                                                       |
| Màu          | `#D97706`                                                              |
| Màu nhạt    | `#FEF3C7`                                                              |
| Journey       | Theo dõi chỉ số                                                       |
| Story         | "Chống viêm, kiên trì hồi phục"                                    |
| Trigger       | `healthStatus = "recovery"`                                            |
| DS duyệt     | ✅ Có                                                                   |
| Đối tượng | Người đang hồi phục sau phẫu thuật/bệnh, cần theo dõi chỉ số |

#### Backstory

Nghệ — loại dược liệu vàng óng, ấm áp — biểu tượng của **sự chữa lành**. Trong bếp Việt, nghệ là "thuốc của bà ngoại" — bôi vết thương, pha nước uống, trộn mặt nạ. Cây Nghệ dành cho những người đang hồi phục — chậm rãi, kiên nhẫn, mỗi ngày tốt hơn một chút.

#### Chương 1: Mầm Non (Streak 0-7)

**Opening:**

> "Một củ Nghệ được vùi vào đất ấm. Bên ngoài nó xù xì — nhưng bên trong là màu vàng rực rỡ. Hồi phục luôn bắt đầu từ bên trong."

**Micro-narratives:**

1. "Nghệ đang thức dậy dưới đất. Hồi phục cũng vậy — chậm, nhưng đang xảy ra."
2. "Mầm Nghệ hôm nay cao hơn hôm qua 1mm. Bạn khỏe hơn hôm qua 1 bước."
3. "Nghệ nói: 'Không cần nhanh. Chỉ cần đều. Mỗi ngày một chút.'"
4. "Ngày {streak}. Cơ thể bạn đang tự chữa lành — hãy cho nó thời gian."
5. "Giọt nước hôm nay = 1 bước hồi phục. Nhỏ thôi, nhưng thật."

#### Chương 2: Cây Non (Streak 8-14)

**Opening:**

> "Lá Nghệ mọc lên — to, xanh, mạnh mẽ. Bên dưới, củ đang lớn dần, tích trữ năng lượng vàng. Bạn đang tích trữ sức khỏe — từ từ, bền bỉ."

**Micro-narratives:**

1. "Lá Nghệ to hơn hôm qua. Giống bạn — mỗi ngày khỏe hơn, dù chỉ một chút."
2. "Nghệ không vội nở hoa. Nghệ tập trung vào rễ trước. Nền tảng quan trọng hơn vẻ ngoài."
3. "Tuần 2 rồi. Bạn có nhớ ngày đầu khó thế nào không? Giờ dễ hơn rồi đúng không?"
4. "Nghệ nói: 'Màu vàng của mình là màu kiên nhẫn. Bạn cũng đang rất kiên nhẫn.'"
5. "Mỗi ngày đều đặn = 1 lớp vàng mới trong củ Nghệ."

#### Chương 3: Trưởng Thành (Streak 15-29)

**Opening:**

> "Cây Nghệ giờ đã cao vượt chậu. Củ bên dưới nặng trĩu — đầy tinh chất. Bạn đã qua giai đoạn khó nhất. Phần còn lại — là thưởng thức thành quả."

**Micro-narratives:**

1. "Củ Nghệ giờ đã đủ lớn để thu hoạch. Sức khỏe của bạn giờ đã đủ vững."
2. "Nghệ nói: 'Mình vàng vì kiên trì. Bạn khỏe vì kiên trì.'"
3. "Ngày {streak}. Gần 1 tháng rồi. Hồi phục không phải 1 ngày — mà 1 hành trình."
4. "Cây Nghệ tỏa hương nhẹ. Giống bạn — sự khỏe mạnh bắt đầu lan tỏa."
5. "Nửa chặng đường tới Nở hoa. Bạn đã chứng minh cho chính mình."

#### Chương 4: Nở Hoa (Streak 30+)

**Opening:**

> "Hoa Nghệ nở — hồng nhạt, thanh tao, ẩn giữa lá xanh. Không ai biết Nghệ có hoa — nhưng bạn biết. Vì bạn đã chăm nó đủ lâu."

**Micro-narratives:**

1. "Hoa Nghệ rất hiếm — chỉ nở khi được chăm đủ lâu. Giống thói quen tốt."
2. "30 ngày. Bạn đã biến 'hồi phục' thành 'lối sống'."
3. "Nghệ nói: 'Cảm ơn vì đã cho mình thời gian. Hoa này là cảm ơn.'"
4. "Nhìn lại: từ củ xù xì → đến bông hoa. Từ hồi phục → đến khỏe mạnh."
5. "Vườn luôn nhớ: bạn là người kiên trì nhất."

#### Habits mẫu — G7 Nghệ

| ID                | Tên                                    | Thời gian | Icon                 | Điểm | Loại    |
| ----------------- | --------------------------------------- | ---------- | -------------------- | ------ | -------- |
| `vitals_log`    | Ghi chỉ số theo dõi (nhiệt độ/HA) | 08:00      | ui_chart_bar         | 15     | Default  |
| `meds_am`       | Uống thuốc/vitamin buổi sáng        | 07:30      | ui_pill_medicine     | 20     | Default  |
| `rest_30`       | Nghỉ ngơi đủ 30 phút buổi trưa   | 12:30      | ui_lightbulb_insight | 10     | Default  |
| `gentle_walk`   | Đi bộ nhẹ 15 phút                   | 16:00      | ui_heart_health      | 10     | Optional |
| `nutrition_log` | Ghi nhận bữa ăn dinh dưỡng         | Bữa ăn   | ui_note_pencil       | 10     | Optional |

#### Pending / Paused

**Pending:** "Củ Nghệ cần Dược sĩ kiểm tra trước khi gieo — để chọn loại đất hồi phục phù hợp nhất."

**Paused:** "Cây Nghệ cuộn lá lại, giữ ấm. Hồi phục cũng cần nghỉ. Khi nào bạn sẵn sàng, Nghệ vẫn đây."

---

### 🪻 G8 — CÂY OẢI HƯƠNG (Lavender)

#### Identity Card

| Field         | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| Code          | `lavender`                                               |
| Group         | G8                                                         |
| Emoji         | 🪻                                                         |
| Màu          | `#7C3AED`                                                |
| Màu nhạt    | `#EDE9FE`                                                |
| Journey       | Thần kinh                                                 |
| Story         | "Hương thơm thư giãn, giấc ngủ sâu"                |
| Trigger       | `healthStatus = "mental"`                                |
| DS duyệt     | ✅ Có                                                     |
| Đối tượng | Người stress, mất ngủ, lo âu — sức khỏe tinh thần |

#### Backstory

Oải Hương — loài hoa tím mềm mại, tỏa hương thư giãn. Trong aromatherapy, lavender = bình yên. Cây này dành cho những người cần một nơi **yên tĩnh** giữa cuộc sống ồn ào. Khu Vườn của Oải Hương luôn nhẹ nhàng — không push, không urgent — chỉ hít thở.

#### Chương 1: Mầm Non (Streak 0-7)

**Opening:**

> "Một hạt Oải Hương nhỏ xíu rơi xuống đất mềm. Nó không vội mọc — nó thở trước. Hít vào. Thở ra. Rồi mới bắt đầu."

**Micro-narratives:**

1. "Hạt Oải Hương đang nghỉ ngơi. Nghỉ ngơi cũng là một cách lớn lên."
2. "Hít sâu... thở ra... Oải Hương cảm ơn bạn đã dành thời gian cho bản thân."
3. "Ngày {streak}. Mỗi ngày bạn chăm sóc tâm trí, là mỗi ngày bạn mạnh hơn."
4. "Không cần làm nhiều. Chỉ cần dừng lại 1 phút — và thở."
5. "Oải Hương nói: 'Bạn xứng đáng được bình yên.'"

#### Chương 2: Cây Non (Streak 8-14)

**Opening:**

> "Mầm Oải Hương mọc lên — mảnh khảnh, nhưng kiên cường. Lá bạc ánh tím nhẹ dưới nắng. Bạn cũng vậy — nhẹ nhàng nhưng không yếu đuối."

**Micro-narratives:**

1. "Lá Oải Hương tỏa hương nhẹ khi chạm vào. Giống bạn — dịu dàng với chính mình."
2. "Tuần 2 rồi. Bạn đã dành 14 ngày cho bản thân. Đó không ích kỷ — đó là cần thiết."
3. "Oải Hương không cần nắng gắt. Chỉ cần ánh sáng đủ dịu."
4. "Tối nay, thử để điện thoại xuống sớm hơn 15 phút. Oải Hương sẽ chờ bạn vào giấc ngủ."
5. "Mỗi ngày dành cho tinh thần = 1 lá Oải Hương thêm."

#### Chương 3: Trưởng Thành (Streak 15-29)

**Opening:**

> "Cây Oải Hương giờ đã thành bụi cây xinh đẹp — bạc tím hài hòa. Bạn đã quen với việc dành thời gian cho bản thân. Đó không còn là 'nỗ lực' — đó là 'nhu cầu'."

**Micro-narratives:**

1. "Bụi Oải Hương tỏa hương khắp vườn. Sự bình yên của bạn cũng lan tỏa."
2. "Ngày {streak}. Bạn đã thay đổi — không phải vì ép buộc, mà vì chọn lựa."
3. "Oải Hương nói: 'Bình yên không phải đích đến. Bình yên là con đường.'"
4. "3 tuần rồi. Giấc ngủ có dễ hơn không? Tâm trí có nhẹ hơn không?"
5. "Mỗi lần thở sâu = mỗi lần tưới nước cho Oải Hương."

#### Chương 4: Nở Hoa (Streak 30+)

**Opening:**

> "Oải Hương nở hoa — cánh tím nhỏ li ti, nhưng hương thơm lan khắp Khu Vườn. Bạn đã tìm được bình yên. Và bình yên đó nở hoa."

**Micro-narratives:**

1. "Hoa Oải Hương nở rồi. Tím nhẹ, thơm dịu — giống bạn, bình yên từ bên trong."
2. "30 ngày. Bạn đã chứng minh: chăm sóc tinh thần = chăm sóc sức khỏe."
3. "Oải Hương nói: 'Mình nở hoa vì bạn đã cho mình bình yên. Cảm ơn bạn.'"
4. "Vườn đẹp nhất là vườn có Oải Hương — vì vườn đó có sự bình yên."
5. "Streak {streak} ngày. Bình yên không phải may mắn — là lựa chọn mỗi ngày."

#### Habits mẫu — G8 Oải Hương

| ID               | Tên                             | Thời gian | Icon                 | Điểm | Loại    |
| ---------------- | -------------------------------- | ---------- | -------------------- | ------ | -------- |
| `breathe_5`    | Hít thở sâu 5 phút           | 08:00      | ui_heart_health      | 15     | Default  |
| `sleep_log`    | Ghi nhận giấc ngủ tối qua    | 07:00      | ui_lightbulb_insight | 10     | Default  |
| `no_phone_bed` | Không ĐT trước ngủ 30 phút | 22:00      | ui_lightbulb_insight | 15     | Default  |
| `journal`      | Viết 3 điều biết ơn         | 21:30      | ui_note_pencil       | 10     | Optional |
| `walk_nature`  | Đi bộ ngoài trời 20 phút    | 17:00      | ui_heart_health      | 10     | Optional |

#### Pending / Paused

**Pending:** "Hạt Oải Hương đang chờ Dược sĩ chuẩn bị nơi yên tĩnh nhất trong vườn."

**Paused:** "Oải Hương cuộn mình, giữ hương bên trong. Khi nào bạn cần bình yên, Oải Hương vẫn ở đây."

---

### 🌳 G13 — CÂY ĐỖ TRỌNG (Eucommia)

#### Identity Card

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Code          | `eucommia`                                                     |
| Group         | G13                                                              |
| Emoji         | 🌳                                                               |
| Màu          | `#8B5CF6`                                                      |
| Màu nhạt    | `#EDE9FE`                                                      |
| Journey       | Xương khớp                                                    |
| Story         | "Vững vàng như cây cổ thụ, xương chắc khỏe mỗi ngày" |
| Trigger       | `chronic` + `bone_joint`                                     |
| DS duyệt     | ✅ Có                                                           |
| Đối tượng | Người đau xương khớp, thoái hóa, cần vận động nhẹ   |

#### Backstory

Đỗ Trọng — cây thuốc quý trong Đông y, vỏ cây dẻo dai không gãy. Biểu tượng cho xương cốt vững chắc. Đỗ Trọng là cây **lâu năm** — mất thời gian để lớn, nhưng khi đã lớn thì vững vàng không gì lay chuyển.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Cây con Đỗ Trọng mọc chậm — nhưng mỗi milimet đều chắc. Xương khớp cũng vậy: cần thời gian, cần kiên nhẫn."

Micro-narratives:

1. "Đỗ Trọng không vội. Gốc chắc hơn hoa đẹp. Mỗi ngày bạn giãn cơ = mỗi ngày xương thêm vững."
2. "Rễ Đỗ Trọng ăn sâu dưới đất. Nền tảng — luôn quan trọng hơn vẻ ngoài."
3. "Ngày {streak}. Mỗi buổi sáng bạn giãn cơ, Đỗ Trọng lại cao thêm 1mm."
4. "Đỗ Trọng nói: 'Mình chậm, nhưng mình chắc. Bạn cũng vậy.'"
5. "Vỏ Đỗ Trọng dẻo dai — kéo không đứt. Như sự kiên trì của bạn."

**Ch.2 Cây Non (8-14):**

> "Thân Đỗ Trọng bắt đầu cứng cáp. Bạn cũng vậy — mỗi ngày vận động nhẹ, xương càng chắc."

Micro-narratives:

1. "Thân cây đã cứng hơn tuần trước. Bạn có thấy mình linh hoạt hơn không?"
2. "Đỗ Trọng cần 10 năm để trưởng thành. Bạn mới 2 tuần — nhưng đã khác rồi."
3. "Tuần 2 rồi. Giãn cơ buổi sáng đã thành thói quen chưa? Đỗ Trọng nghĩ là rồi."
4. "Mỗi ngày bạn kiểm tra tư thế ngồi = mỗi ngày bảo vệ cột sống."
5. "Đỗ Trọng nói: 'Xương chắc không phải vì mạnh — mà vì đều đặn.'"

**Ch.3 Trưởng Thành (15-29):**

> "Đỗ Trọng giờ đã thành cây nhỏ vững vàng. Gió thổi không lay. Bạn đã quen với việc chăm sóc xương khớp mỗi ngày."

Micro-narratives:

1. "Gió thổi mạnh — Đỗ Trọng đứng vững. Thói quen vận động đã thành nền tảng."
2. "Ngày {streak}. Cột sống cảm ơn bạn vì mỗi lần kiểm tra tư thế."
3. "Đỗ Trọng nói: 'Mình vững vì rễ sâu. Bạn vững vì kiên trì.'"
4. "3 tuần rồi. Từ 'phải cố' → 'đương nhiên'. Đó là sức mạnh của thói quen."
5. "Vỏ Đỗ Trọng giờ rất dày — bảo vệ cây khỏi mọi thời tiết. Như bạn bảo vệ xương khớp."

**Ch.4 Nở Hoa (30+):**

> "Đỗ Trọng không nở hoa rực rỡ — nhưng vỏ cây dẻo dai đến kỳ lạ. Kéo không đứt. Như bạn — bền bỉ, không bỏ cuộc."

Micro-narratives:

1. "30 ngày. Đỗ Trọng đứng vững nhất vườn. Như bạn — vững vàng, không gì lay."
2. "Vỏ Đỗ Trọng dẻo dai kỳ lạ — kéo mạnh không đứt. Sự kiên trì của bạn cũng vậy."
3. "Đỗ Trọng nói: 'Mình không hoa đẹp, nhưng mình bền. Cảm ơn bạn.'"
4. "Streak {streak} ngày. Xương khớp bạn đang được chăm sóc tốt nhất có thể."
5. "Cây cổ thụ không lớn trong 1 đêm. Thói quen tốt cũng vậy — nhưng bạn đã làm được."

#### Habits mẫu — G13 Đỗ Trọng

| ID                | Tên                        | Thời gian | Icon                 | Điểm | Loại    |
| ----------------- | --------------------------- | ---------- | -------------------- | ------ | -------- |
| `joint_stretch` | Giãn cơ khớp 10 phút    | 07:30      | ui_heart_health      | 15     | Default  |
| `meds_am`       | Uống thuốc/bổ sung canxi | 08:00      | ui_pill_medicine     | 20     | Default  |
| `posture_check` | Kiểm tra tư thế ngồi    | 14:00      | ui_lightbulb_insight | 10     | Default  |
| `calcium_food`  | Ăn thực phẩm giàu canxi | Bữa ăn   | ui_note_pencil       | 10     | Optional |
| `gentle_yoga`   | Yoga nhẹ 15 phút          | 17:00      | ui_heart_health      | 15     | Optional |

#### Pending / Paused

**Pending:** "Đỗ Trọng là cây quý — cần Dược sĩ chọn đúng loại đất để rễ ăn sâu nhất. Hồ sơ của bạn đang được xem xét."

**Paused:** "Đỗ Trọng thu mình lại, giữ sức trong vỏ dày. Khi nào bạn quay lại, cây sẽ vươn ra đón bạn — vẫn vững, vẫn chắc."

---

### 🌿 G14 — CÂY DIỆP HẠ CHÂU (Phyllanthus)

#### Identity Card

| Field         | Value                                                  |
| ------------- | ------------------------------------------------------ |
| Code          | `phyllanthus`                                        |
| Group         | G14                                                    |
| Emoji         | 🌿                                                     |
| Màu          | `#059669`                                            |
| Màu nhạt    | `#D1FAE5`                                            |
| Journey       | Tiêu hóa / Gan                                       |
| Story         | "Mát gan, thanh nhiệt, nhẹ nhàng thải độc"      |
| Trigger       | `chronic` + `digestive`                            |
| DS duyệt     | ✅ Có                                                 |
| Đối tượng | Người có vấn đề tiêu hóa, gan, cần thanh lọc |

#### Backstory

Diệp Hạ Châu — "cây chó đẻ" trong dân gian, nhỏ bé nhưng có sức mạnh thanh lọc mạnh mẽ. Lá xếp đều hai bên thân — gọn gàng, ngăn nắp — giống hệ tiêu hóa khi hoạt động trơn tru. Cây dành cho những người muốn "dọn dẹp" cơ thể từ bên trong.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Mầm Diệp Hạ Châu nhỏ xinh — lá đầu tiên xếp đều đặn hai bên. Như hệ tiêu hóa khi bắt đầu được chăm sóc đúng cách."

Micro-narratives:

1. "Lá Diệp Hạ Châu xếp đều hai bên — gọn gàng, ngăn nắp. Cơ thể bạn cũng đang được dọn dẹp."
2. "Ngày {streak}. Mỗi ly nước ấm buổi sáng = 1 bước thanh lọc."
3. "Diệp Hạ Châu nhỏ nhưng mạnh. Thói quen nhỏ nhưng thay đổi lớn."
4. "Ăn chậm, nhai kỹ — đơn giản mà nhiều người quên. Bạn không quên."
5. "Diệp Hạ Châu nói: 'Mình nhỏ xíu, nhưng mình dọn sạch mọi thứ.'"

**Ch.2 Cây Non (8-14):**

> "Cây mọc thêm nhiều lá — mỗi lá đều đặn, gọn gàng. Bạn đang xây dựng thói quen ăn uống lành mạnh."

Micro-narratives:

1. "Thêm lá mới — mỗi lá đều đặn như thói quen mới của bạn."
2. "Tuần 2 rồi. Bụng có nhẹ hơn không? Diệp Hạ Châu nghĩ là có."
3. "Ăn chậm, uống ấm, ăn xanh — 3 thói quen đơn giản, hiệu quả to lớn."
4. "Diệp Hạ Châu nói: 'Mỗi lá mình xếp đều = mỗi bữa ăn bạn chăm chút.'"
5. "14 ngày — cơ thể bạn đang quen với 'gọn gàng từ bên trong'."

**Ch.3 Trưởng Thành (15-29):**

> "Diệp Hạ Châu giờ là bụi cây xanh mướt — mỗi lá là bằng chứng cho 1 ngày chăm sóc."

Micro-narratives:

1. "Bụi cây xanh mướt — mỗi lá = 1 ngày bạn ăn uống lành mạnh."
2. "Ngày {streak}. Diệp Hạ Châu thanh lọc vườn. Thói quen của bạn thanh lọc cơ thể."
3. "Diệp Hạ Châu nói: 'Sạch từ bên trong — đẹp từ bên ngoài.'"
4. "3 tuần rồi. Hệ tiêu hóa của bạn đang được chăm sóc đều đặn nhất."
5. "Mỗi lá xếp đều = mỗi bữa ăn có rau xanh. Đơn giản mà hiệu quả."

**Ch.4 Nở Hoa (30+):**

> "Hoa nhỏ li ti nở dưới lá — khiêm nhường nhưng quan trọng. Sức khỏe bên trong không cần phô trương."

Micro-narratives:

1. "Hoa Diệp Hạ Châu nở — nhỏ li ti, ẩn dưới lá. Giống sức khỏe: không phô trương, nhưng vững."
2. "30 ngày. Cơ thể bạn đã 'gọn gàng' từ bên trong."
3. "Diệp Hạ Châu nói: 'Mình nở hoa rồi. Nhỏ thôi — nhưng là cảm ơn bạn.'"
4. "Streak {streak} ngày. Thói quen ăn uống lành mạnh đã thành lối sống."
5. "Khiêm nhường như Diệp Hạ Châu — nhỏ bé, nhưng không thể thiếu."

#### Habits mẫu — G14 Diệp Hạ Châu

| ID              | Tên                                    | Thời gian | Icon                 | Điểm | Loại    |
| --------------- | --------------------------------------- | ---------- | -------------------- | ------ | -------- |
| `warm_water`  | Uống 1 ly nước ấm khi thức dậy    | 06:30      | ui_water_drop        | 10     | Default  |
| `meds_am`     | Uống thuốc tiêu hóa                 | 07:30      | ui_pill_medicine     | 20     | Default  |
| `eat_slow`    | Ăn chậm, nhai kỹ                     | Bữa ăn   | ui_note_pencil       | 10     | Default  |
| `fiber_food`  | Ăn rau xanh/trái cây giàu chất xơ | Bữa trưa | ui_heart_health      | 10     | Optional |
| `no_late_eat` | Không ăn sau 20h                      | 20:00      | ui_lightbulb_insight | 10     | Optional |

#### Pending / Paused

**Pending:** "Diệp Hạ Châu cần đất sạch — Dược sĩ đang chuẩn bị môi trường thanh lọc tốt nhất cho bạn."

**Paused:** "Diệp Hạ Châu xếp lá lại, cuộn mình nghỉ ngơi. Khi nào bạn quay lại, lá sẽ bung ra — gọn gàng, đều đặn như mọi khi."

---

### 🍵 G15 — CÂY LÁ TRÀ (Tea)

#### Identity Card

| Field         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Code          | `tea`                                                          |
| Group         | G15                                                              |
| Emoji         | 🍵                                                               |
| Màu          | `#3B82F6`                                                      |
| Màu nhạt    | `#EFF6FF`                                                      |
| Journey       | Tuân thủ dài hạn                                             |
| Story         | "Chậm rãi, kiên định, nuôi dưỡng"                        |
| Trigger       | `chronic` + `cholesterol`                                    |
| DS duyệt     | ✅ Có                                                           |
| Đối tượng | Người kiểm soát mỡ máu/cholesterol, dùng thuốc dài hạn |

#### Backstory

Trà — thức uống ngàn năm. Pha trà là nghệ thuật **chậm** — đun nước, chờ nguội, hãm đúng thời gian. Không vội được. Cây Lá Trà dành cho những người cần kiên định dài hạn — uống thuốc mỡ máu không phải vài ngày, mà vài năm. Và cây nhắc: **chậm mà chắc**.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Hạt trà gieo xuống đất — chậm rãi nứt vỏ. Trà không vội. Bạn cũng đừng vội."

Micro-narratives:

1. "Hạt trà đang thức dậy — chậm, từ tốn. Kiên định không cần nhanh."
2. "Pha trà cần đúng nhiệt độ, đúng thời gian. Chăm sóc sức khỏe cũng vậy."
3. "Ngày {streak}. Mỗi ngày uống thuốc đều đặn = 1 lần pha trà đúng cách."
4. "Trà nói: 'Đừng vội. Mình cần thời gian để thơm. Bạn cũng vậy.'"
5. "Giọt nước hôm nay nóng vừa đủ — như sự kiên nhẫn vừa đủ."

**Ch.2 Cây Non (8-14):**

> "Lá trà non xanh mướt — mỗi lá một hương vị. Mỗi ngày kiên định một hương vị mới."

Micro-narratives:

1. "Lá trà non mềm và thơm. Giống tuần 2 — thói quen bắt đầu có 'hương vị'."
2. "Trà ngon nhất khi hãm đúng. Sức khỏe tốt nhất khi kiên định."
3. "Tuần 2 rồi. Uống thuốc buổi sáng có còn phải nhớ không? Hay đã tự động?"
4. "Trà nói: 'Mỗi lá mình khác nhau — nhưng đều cần nước. Mỗi ngày khác — nhưng đều cần bạn.'"
5. "14 ngày. Bạn đang uống trà kiên định — từng ngụm, từng ngày."

**Ch.3 Trưởng Thành (15-29):**

> "Cây trà đã đủ lớn để hái lá pha trà. Thói quen sức khỏe đã đủ lớn để thành lối sống."

Micro-narratives:

1. "Lá trà đã đủ dày để pha. Thói quen đã đủ chắc để không cần nhắc."
2. "Ngày {streak}. Trà đang chín dần. Sức khỏe bạn cũng vậy."
3. "Trà nói: 'Mình chậm, nhưng mình bền. 3 tuần rồi — bạn cũng bền lắm.'"
4. "Chậm rãi, kiên định — 2 từ định nghĩa cả cây Trà lẫn bạn."
5. "Nửa chặng đường tới Nở hoa. Pha trà, ngồi lại, nhìn lại — xa lắm rồi."

**Ch.4 Nở Hoa (30+):**

> "Hoa trà nở — trắng tinh, 5 cánh đơn giản. Đẹp vì giản dị. Khỏe vì kiên định."

Micro-narratives:

1. "Hoa trà trắng tinh — 5 cánh, đơn giản, hoàn hảo. Giống bạn — giản dị nhưng mạnh."
2. "30 ngày. Bạn đã biến 'uống thuốc' thành 'pha trà buổi sáng' — tự nhiên, đều đặn."
3. "Trà nói: 'Mình nở hoa rồi. Trắng tinh. Cảm ơn vì đã kiên nhẫn với mình.'"
4. "Streak {streak} ngày. Kiên định dài hạn — không phải ai cũng làm được."
5. "Trà ngàn năm vẫn thơm. Thói quen tốt cũng vậy — vượt thời gian."

#### Habits mẫu — G15 Lá Trà

| ID                  | Tên                           | Thời gian | Icon             | Điểm | Loại    |
| ------------------- | ------------------------------ | ---------- | ---------------- | ------ | -------- |
| `cholesterol_med` | Uống thuốc mỡ máu          | 07:30      | ui_pill_medicine | 20     | Default  |
| `green_tea`       | Uống 1 tách trà xanh        | 09:00      | ui_water_drop    | 10     | Default  |
| `food_log`        | Ghi nhận thực phẩm hôm nay | Bữa ăn   | ui_note_pencil   | 10     | Default  |
| `no_fried`        | Hạn chế đồ chiên/rán     | Bữa ăn   | ui_note_pencil   | 10     | Optional |
| `walk_30`         | Đi bộ 30 phút               | 17:00      | ui_heart_health  | 15     | Optional |

#### Pending / Paused

**Pending:** "Cây Trà cần thời gian để chọn đúng giống — Dược sĩ đang xem xét hồ sơ sức khỏe để chọn loại phù hợp nhất."

**Paused:** "Cây Trà đang hãm lá — chờ đúng nhiệt độ, đúng thời gian. Khi nào bạn sẵn sàng, tách trà vẫn ấm."

---

## NHÓM B: LIFE-STAGE PLANTS (3 cây — journeys đặc biệt)

Nhóm này có narrative đặc thù vì gắn với **giai đoạn cuộc đời** cụ thể — có thể có `graduated` status.

---

### 🪷 G4 — CÂY HOA SEN (Lotus)

#### Identity Card

| Field                 | Value                                                   |
| --------------------- | ------------------------------------------------------- |
| Code                  | `lotus`                                               |
| Group                 | G4                                                      |
| Emoji                 | 🪷                                                      |
| Màu                  | `#DB2777`                                             |
| Màu nhạt            | `#FCE7F3`                                             |
| Journey               | Thai sản                                               |
| Story                 | "Vươn lên từ bùn, nở hoa kiêu hãnh"             |
| Trigger               | `healthStatus = "pregnant"`                           |
| DS duyệt             | ❌ Không                                               |
| Đối tượng         | Mẹ bầu, người sau sinh                              |
| **Đặc biệt** | Journey có thời hạn →`graduated` khi hoàn thành |

#### Backstory

Sen — quốc hoa Việt Nam — mọc từ bùn mà không hôi tanh mùi bùn. Biểu tượng hoàn hảo cho hành trình thai sản: **khó khăn, vất vả, nhưng kết quả đẹp đẽ**. Sen nở hoa = em bé ra đời. Sau đó, Sen "tốt nghiệp" — không chết, chỉ hoàn thành sứ mệnh.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Một hạt Sen rơi xuống đầm — nước đục, bùn lầy. Nhưng Sen không sợ. Sen biết: từ bùn sẽ mọc lên điều kỳ diệu."

Micro-narratives:

1. "Hạt Sen đang nứt vỏ dưới nước. Bên trong bạn, phép màu cũng đang xảy ra."
2. "Ngày {streak}. Mỗi ngày bạn chăm sóc bản thân, là mỗi ngày bạn chăm sóc con."
3. "Sen nói: 'Mình mọc từ bùn — nhưng hoa mình sẽ rất đẹp. Như bạn.'"
4. "Nước đầm mát dịu. Bạn hôm nay thế nào? Nhớ uống đủ nước nhé."
5. "Bước đầu luôn khó. Nhưng bạn không đi một mình — Sen đi cùng."

**Ch.2 Cây Non (8-14):**

> "Cuống Sen vươn lên mặt nước — chậm, chắc, hướng về phía ánh sáng. Bạn cũng vậy — từng ngày, từng bước, hướng về phía con."

**Ch.3 Trưởng Thành (15-29):**

> "Lá Sen tròn xoe nổi trên mặt nước — đẹp, thanh tao, vững vàng. Bạn đã quen với thói quen mới. Em bé bên trong cũng đang lớn mỗi ngày."

**Ch.4 Nở Hoa (30+):**

> "Sen nở hoa. Hồng. Trắng. Tinh khiết. Từ bùn mà lên, đẹp đến nghẹt thở. Bạn đã đi được 30 ngày — chặng đường đẹp nhất cuộc đời."

#### Graduation Narrative (Đặc biệt — chỉ Sen)

Khi journey hoàn thành (ví dụ: sau sinh):

> "Hoa Sen đã nở trọn vẹn. Hành trình thai sản hoàn thành — em bé đã chào đời. Sen không tàn — Sen **tốt nghiệp**. Cánh hoa Sen sẽ mãi ở trong Khu Vườn, như kỷ niệm đẹp nhất của bạn."
>
> `plantStatus: "graduated"` — Cây vẫn hiện trong vườn (greyed/golden), không bị xóa.

#### Habits mẫu — G4 Sen

| ID               | Tên                                | Thời gian | Icon                 | Điểm | Loại    |
| ---------------- | ----------------------------------- | ---------- | -------------------- | ------ | -------- |
| `prenatal_vit` | Uống vitamin bầu                  | 08:00      | ui_pill_medicine     | 15     | Default  |
| `water_2l`     | Uống đủ 2L nước                | Cả ngày  | ui_water_drop        | 10     | Default  |
| `gentle_walk`  | Đi bộ nhẹ 20 phút               | 17:00      | ui_heart_health      | 15     | Default  |
| `rest_nap`     | Nghỉ trưa 20 phút                | 13:00      | ui_lightbulb_insight | 10     | Optional |
| `kick_count`   | Đếm cử động thai (trimester 3) | 20:00      | ui_chart_bar         | 15     | Optional |

---

### 🌿 G5 — CÂY HÚNG QUẾ (Basil)

#### Identity Card

| Field         | Value                                           |
| ------------- | ----------------------------------------------- |
| Code          | `basil`                                       |
| Group         | G5                                              |
| Emoji         | 🌿                                              |
| Màu          | `#F59E0B`                                     |
| Màu nhạt    | `#FEF3C7`                                     |
| Journey       | Dinh dưỡng                                    |
| Story         | "Tăng cường đề kháng, sinh lực"          |
| Trigger       | `age < 18`                                    |
| DS duyệt     | ❌ Không                                       |
| Đối tượng | Trẻ em, thanh thiếu niên — do bố mẹ chăm |

#### Backstory

Húng Quế — rau thơm quen thuộc, dễ trồng, mọc nhanh — giống trẻ con! Năng lượng, tươi mới, lớn nhanh mỗi ngày. Cây này dành cho bố mẹ chăm sóc sức khỏe con nhỏ — và qua đó, cũng chăm sóc chính mình.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Húng Quế mọc nhanh lắm — mới gieo hôm qua, hôm nay đã thấy mầm. Như con bạn — mỗi ngày lớn thêm 1 tí."

Micro-narratives:

1. "Húng Quế mọc nhanh — như bé yêu của bạn. Mỗi ngày đều có gì đó mới!"
2. "Ngày {streak}. Cho bé uống vitamin → Húng Quế thêm 1 lá."
3. "Húng Quế thơm khi chạm nhẹ. Tình yêu cũng vậy — chạm nhẹ mỗi ngày."
4. "Trẻ con cần vitamin như cây cần nước. Bạn đang làm tốt."
5. "Húng Quế nói: 'Mình mọc nhanh lắm! Con bạn cũng vậy!'"

**Ch.2 Cây Non (8-14):**

> "Lá Húng Quế thơm nức khi chạm nhẹ. Mỗi lần bạn chăm sóc con, là mỗi lần 'chạm' vào cây."

Micro-narratives:

1. "Tuần 2 — Húng Quế đã có nhiều lá. Bé cũng đang lớn từng ngày."
2. "Mỗi lá Húng Quế đều thơm. Mỗi ngày chăm sóc bé đều ý nghĩa."
3. "Cho bé ăn trái cây, chơi ngoài trời — những điều nhỏ tạo nên tuổi thơ đẹp."
4. "Húng Quế nói: 'Bố/mẹ chăm mình giỏi lắm! Tiếp tục nhé!'"
5. "14 ngày. Bạn không chỉ trồng cây — bạn đang trồng tương lai."

**Ch.3 Trưởng Thành (15-29):**

> "Húng Quế giờ đã thành bụi xanh mướt — sẵn sàng thu hoạch. Con bạn khỏe, bạn vui."

Micro-narratives:

1. "Bụi Húng Quế tươi tốt — sẵn sàng thu hoạch. Bé khỏe, bạn hạnh phúc."
2. "Ngày {streak}. 3 tuần chăm sóc liên tục — bé có thói quen tốt rồi."
3. "Húng Quế nói: 'Mình lớn nhờ bố/mẹ. Bé cũng vậy.'"
4. "Đọc sách trước ngủ, ăn trái cây, chơi ngoài trời — tuổi thơ tuyệt vời nhất."
5. "Bạn không chỉ là phụ huynh — bạn là người làm vườn giỏi nhất."

**Ch.4 Nở Hoa (30+):**

> "Hoa Húng Quế nở — trắng nhỏ, thơm ngọt. 30 ngày chăm sóc = 30 ngày yêu thương."

Micro-narratives:

1. "Hoa Húng Quế nở trắng — nhỏ xinh, ngọt ngào. Giống tình yêu bạn dành cho bé."
2. "30 ngày. Bé đã quen với vitamin, trái cây, và chơi ngoài trời. Bạn tạo được thói quen đẹp."
3. "Húng Quế nói: 'Mình nở hoa rồi! Cảm ơn vì đã yêu thương.'"
4. "Streak {streak} ngày chăm sóc bé — không phải ai cũng làm được."
5. "Húng Quế vẫn mọc nhanh — như bé vẫn lớn nhanh. Cứ tiếp tục nhé."

#### Habits mẫu — G5 Húng Quế

| ID                | Tên                                | Thời gian | Icon                 | Điểm | Loại    |
| ----------------- | ----------------------------------- | ---------- | -------------------- | ------ | -------- |
| `kids_vitamin`  | Cho bé uống vitamin               | 08:00      | ui_pill_medicine     | 15     | Default  |
| `fruit_snack`   | Cho bé ăn trái cây              | 10:00      | ui_heart_health      | 10     | Default  |
| `outdoor_play`  | Cho bé chơi ngoài trời 30 phút | 16:00      | ui_heart_health      | 15     | Default  |
| `bedtime_story` | Đọc sách trước ngủ            | 20:30      | ui_lightbulb_insight | 10     | Optional |
| `water_kids`    | Nhắc bé uống nước              | Cả ngày  | ui_water_drop        | 10     | Optional |

---

### 🪴 G6 — CÂY LÔ HỘI (Aloe)

#### Identity Card

| Field                           | Value                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Code                            | `aloe`                                                                                                                                                                        |
| Group                           | G6                                                                                                                                                                              |
| Emoji                           | 🪴                                                                                                                                                                              |
| Màu                            | `#0D9488`                                                                                                                                                                     |
| Màu nhạt                      | `#CCFBF1`                                                                                                                                                                     |
| Journey                         | Da liễu, Dị ứng                                                                                                                                                              |
| Story                           | "Dịu mát, chữa lành"                                                                                                                                                        |
| Trigger                         | `age ≥ 60`                                                                                                                                                                   |
| DS duyệt                       | ❌ Không                                                                                                                                                                       |
| Đối tượng                   | Người cao tuổi (60+)                                                                                                                                                         |
| **Lý do không cần DS** | Habits là wellness chung (đi bộ, uống nước), không liên quan thuốc kê đơn cụ thể.`meds_am` và `bp_check` là self-tracking — không phải chỉ định y tế |

#### Backstory

Lô Hội — cây mọng nước, chịu hạn, sống bền bỉ qua mọi mùa. Giống người cao tuổi — đã qua bao mùa đời, vẫn xanh, vẫn sống. Lô Hội không cần nhiều nước — chỉ cần đều đặn. Như người lớn tuổi: không cần tập nặng — chỉ cần mỗi ngày vận động nhẹ, uống thuốc đúng giờ.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Lô Hội không cần nhiều — chỉ cần đều. Giống bạn: mỗi ngày một chút, đủ rồi."

Micro-narratives:

1. "Lô Hội chịu hạn giỏi nhất vườn. Không cần nhiều — chỉ cần đều."
2. "Ngày {streak}. Mỗi bước đi bộ nhẹ, Lô Hội thêm 1 giọt sữa."
3. "Bạn đã uống nước ấm sáng nay chưa? Lô Hội đang chờ."
4. "Lô Hội nói: 'Mình không cần nhiều. Chỉ cần bạn đều đặn.'"
5. "Tuổi không phải rào cản — Lô Hội sống 30 năm. Bạn cũng vậy."

**Ch.2 Cây Non (8-14):**

> "Lá Lô Hội dày hơn — tích nước bên trong. Sức khỏe bạn cũng đang tích lũy."

Micro-narratives:

1. "Lá dày hơn = tích trữ nhiều hơn. Mỗi ngày đi bộ = tích trữ sức khỏe."
2. "Tuần 2 rồi. Đi bộ buổi sáng đã quen chưa? Lô Hội nghĩ là rồi."
3. "Lô Hội nói: 'Chầm mà chắc. Mình không vội, bạn cũng đừng vội.'"
4. "Nước ấm, đi bộ nhẹ, thuốc đúng giờ — 3 điều đơn giản, hiệu quả lớn."
5. "14 ngày. Nhịp đã ổn định — như nhịp sống của người từng trải."

**Ch.3 Trưởng Thành (15-29):**

> "Lô Hội giờ đã rất vững — sống qua nắng, qua mưa. Bạn cũng vậy."

Micro-narratives:

1. "Lô Hội đứng vững qua mưa nắng. Bạn cũng vậy — 3 tuần kiên trì."
2. "Ngày {streak}. Lá dày, rễ sâu — không gì lay được."
3. "Lô Hội nói: 'Mình sống 30 năm rồi. Bạn cũng sẽ sống khỏe lâu như vậy.'"
4. "Thói quen đã thành tự nhiên. Không cần nhắc — tự làm."
5. "Lô Hội không cần nhiều nước. Bạn không cần nhiều — chỉ cần đều."

**Ch.4 Nở Hoa (30+):**

> "Lô Hội nở hoa — hiếm lắm, chỉ khi được chăm đủ lâu. Bạn xứng đáng."

Micro-narratives:

1. "Lô Hội nở hoa — đỏ cam, hiếm lắm. Chỉ cây được chăm kiên nhẫn mới nở."
2. "30 ngày. Bạn là người hiếm hoi khiến Lô Hội nở hoa."
3. "Lô Hội nói: 'Mình nở hoa cho bạn — vì bạn xứng đáng.'"
4. "Streak {streak} ngày. Đều đặn, kiên trì — bí quyết của người từng trải."
5. "Lô Hội sống bền bỉ nhất vườn. Như bạn — vẫn xanh, vẫn sống, vẫn khỏe."

#### Habits mẫu — G6 Lô Hội

| ID              | Tên                                 | Thời gian | Icon             | Điểm | Loại    |
| --------------- | ------------------------------------ | ---------- | ---------------- | ------ | -------- |
| `meds_am`     | Uống thuốc buổi sáng             | 07:30      | ui_pill_medicine | 20     | Default  |
| `gentle_walk` | Đi bộ nhẹ 15 phút                | 06:30      | ui_heart_health  | 15     | Default  |
| `water_warm`  | Uống 1 ly nước ấm                | 06:00      | ui_water_drop    | 10     | Default  |
| `stretch_am`  | Tập thể dục nhẹ 10 phút         | 07:00      | ui_heart_health  | 10     | Optional |
| `bp_check`    | Kiểm tra huyết áp (nếu có máy) | 08:00      | ui_chart_bar     | 10     | Optional |

---

## NHÓM C: LIFESTYLE PLANTS (5 cây — auto-approve)

Nhóm này có narrative nhẹ nhàng nhất — không liên quan y tế trực tiếp, tập trung vào **xây dựng thói quen lành mạnh**.

---

### 🌿 G1 — CÂY BẠC HÀ (Mint) — DEFAULT

#### Identity Card

| Field         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| Code          | `mint`                                                  |
| Group         | G1                                                        |
| Emoji         | 🌿                                                        |
| Màu          | `#10B981`                                               |
| Màu nhạt    | `#D1FAE5`                                               |
| Journey       | Sức khỏe nền tảng                                     |
| Story         | "Thơm mát, tỉnh táo mỗi ngày"                       |
| Trigger       | Default (khi không match bất kỳ priority nào)         |
| DS duyệt     | ❌ Không                                                 |
| Đối tượng | Người khỏe mạnh, muốn duy trì sức khỏe nền tảng |

#### Backstory

Bạc Hà — cây mặc định của Khu Vườn. Dễ trồng, dễ chăm, thơm mát — **cây cho tất cả mọi người**. Bạc Hà không cần bạn có bệnh — Bạc Hà chỉ cần bạn muốn sống khỏe hơn mỗi ngày. Là cây "gateway" — cổng vào Khu Vườn cho những người chưa biết bắt đầu từ đâu.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Bạc Hà dễ trồng nhất vườn — chỉ cần nước và nắng. Bạn cũng vậy: chỉ cần bắt đầu."

Micro-narratives:

1. "Bạc Hà không kén. Nắng? Bóng? Đều sống. Bạn không cần điều kiện hoàn hảo — chỉ cần bắt đầu."
2. "Ngày {streak}. Mỗi ly nước bạn uống, Bạc Hà thêm 1 lá mới."
3. "Bạc Hà thơm mát — như buổi sáng đầu tiên bạn quyết định sống khỏe."
4. "Cây nhỏ thôi, nhưng đã bắt đầu rồi. Mỗi bước nhỏ đều có nghĩa."
5. "Bạc Hà nói: 'Mình dễ tính lắm. Chỉ cần bạn ghé thăm mỗi ngày.'"

**Ch.2 Cây Non (8-14):**

> "Bạc Hà lan nhanh — mỗi ngày thêm lá mới. Thói quen tốt cũng lan nhanh vậy."

Micro-narratives:

1. "Bạc Hà lan rộng rồi! Giống thói quen của bạn — từ 1 → nhiều."
2. "Tuần 2. Uống nước, vận động nhẹ — đơn giản nhưng bạn đã giữ được."
3. "Bạc Hà nói: 'Mình mọc nhanh lắm! Thói quen tốt cũng nhanh vậy.'"
4. "Mỗi lá Bạc Hà đều thơm. Mỗi ngày bạn đều có giá trị."
5. "14 ngày rồi. Bạn đã trở thành 'người trồng Bạc Hà' — có tên trong vườn."

**Ch.3 Trưởng Thành (15-29):**

> "Bạc Hà tỏa hương khắp vườn. Sự khỏe mạnh của bạn cũng bắt đầu lan tỏa."

Micro-narratives:

1. "Bạc Hà tỏa hương — cả vườn thơm. Thói quen tốt của bạn cũng đang ảnh hưởng người xung quanh."
2. "Ngày {streak}. Bạc Hà không cần ai nhắc — tự mọc, tự lan. Bạn cũng vậy."
3. "3 tuần. Từ 'phải nhớ' → 'đương nhiên'. Bạc Hà gọi đó là 'bản năng xanh'."
4. "Bạc Hà nói: 'Mình không cần chăm cầu kỳ. Bạn cũng vậy — chỉ cần đều.'"
5. "Vườn đã xanh hơn nhiều so với ngày đầu. Bạn cũng vậy."

**Ch.4 Nở Hoa (30+):**

> "Hoa Bạc Hà nở — nhỏ xinh, tím nhạt. Giản dị nhưng đẹp. Khỏe mạnh nhưng tự nhiên."

Micro-narratives:

1. "Hoa Bạc Hà tím nhạt — giản dị, đẹp tự nhiên. Như bạn — khỏe mà không cần gồng."
2. "30 ngày. Bạc Hà nở hoa rồi. Cây dễ trồng nhất, nhưng bạn đã chăm chỉ nhất."
3. "Bạc Hà nói: 'Mình là cây đầu tiên — nhưng mình tự hào nhất. Cảm ơn bạn.'"
4. "Streak {streak} ngày. Nền tảng sức khỏe đã vững — muốn trồng thêm cây mới không?"
5. "Bạc Hà vẫn lan — vẫn thơm — vẫn xanh. Như thói quen tốt: không bao giờ cũ."

#### Habits mẫu — G1 Bạc Hà (đã có trong code)

| ID             | Tên                          | Thời gian | Icon                 | Điểm | Loại    |
| -------------- | ----------------------------- | ---------- | -------------------- | ------ | -------- |
| `water_2l`   | Uống đủ 2L nước          | Cả ngày  | ui_water_drop        | 10     | Default  |
| `walk_30`    | Đi bộ 30 phút              | 17:00      | ui_heart_health      | 15     | Default  |
| `sleep_7h`   | Ngủ đủ 7-8 tiếng          | 22:30      | ui_lightbulb_insight | 10     | Default  |
| `stretch_am` | Giãn cơ buổi sáng 5 phút | 07:30      | ui_heart_health      | 5      | Optional |
| `no_phone`   | Không dùng ĐT trước ngủ | 21:30      | ui_lightbulb_insight | 10     | Optional |

---

### 🥔 G9 — CÂY NHÂN SÂM (Ginseng)

#### Identity Card

| Field         | Value                                          |
| ------------- | ---------------------------------------------- |
| Code          | `ginseng`                                    |
| Group         | G9                                             |
| Emoji         | 🥔                                             |
| Màu          | `#9CA3AF`                                    |
| Màu nhạt    | `#F3F4F6`                                    |
| Journey       | Phục hồi                                     |
| Story         | "Tinh hoa đất trời, trường thọ an khang" |
| Trigger       | `exercise = "active"`                        |
| DS duyệt     | ❌ Không                                      |
| Đối tượng | Người vận động tích cực, tập thể thao |

#### Backstory

Nhân Sâm — "vua của các loại thảo dược" — cần nhiều năm để trưởng thành. Dành cho người yêu vận động: chạy bộ, gym, yoga... Cây nhắc rằng **phục hồi cũng quan trọng như tập luyện**.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Rễ Nhân Sâm ăn sâu xuống đất — chậm, chắc. Như nền tảng thể lực."

Micro-narratives:

1. "Rễ Nhân Sâm ăn sâu — không vội. Nền tảng thể lực cũng cần thời gian."
2. "Ngày {streak}. Mỗi buổi tập = mỗi ngày Nhân Sâm thêm rễ."
3. "Nhân Sâm nói: 'Mình cần 6 năm mới thu hoạch. Bạn mới 1 tuần — cứ tiếp tục!'"
4. "Tập luyện + phục hồi = tăng trưởng. Chỉ tập không nghỉ = một mỏi."
5. "Protein, nước, ngủ đủ — 3 yếu tố Nhân Sâm cần. Bạn cũng vậy."

**Ch.2 Cây Non (8-14):**

> "Nhân Sâm bắt đầu mọc lá — năng lượng tích tụ. Mỗi buổi tập = 1 lá mới."

Micro-narratives:

1. "Lá Nhân Sâm mọc rồi! Năng lượng đang tích tụ."
2. "Tuần 2. Giãn cơ sau tập đã thành phản xạ chưa?"
3. "Nhân Sâm nói: 'Mình mọc chậm nhưng mạnh. Bạn cũng vậy — chất lượng hơn số lượng.'"
4. "Ngủ đủ 8 tiếng = phục hồi tối đa. Đừng bỏ qua giấc ngủ."
5. "14 ngày tập luyện đều đặn. Cơ thể đã nhận ra sự khác biệt."

**Ch.3 Trưởng Thành (15-29):**

> "Nhân Sâm giờ đã khỏe — rễ chắc, lá xanh. Như bạn sau 3 tuần kiên trì."

Micro-narratives:

1. "Nhân Sâm đã khỏe. Rễ chắc, lá xanh. Như cơ thể bạn sau 3 tuần."
2. "Ngày {streak}. Workout không còn là 'phải làm' — mà là 'muốn làm'."
3. "Nhân Sâm nói: 'Vua thảo dược không dễ dãi. Bạn cũng không.'"
4. "Tập + ăn + ngủ — 3 trụ cột. Bạn đã giữ được cả 3."
5. "3 tuần kiên trì = cơ thể khác biệt. Bạn cảm nhận được không?"

**Ch.4 Nở Hoa (30+):**

> "Nhân Sâm ra quả — đỏ rực. Thành quả của kỷ luật. Bạn xứng đáng."

Micro-narratives:

1. "Quả Nhân Sâm đỏ rực — thành quả của nhiều năm. Streak {streak} ngày là thành quả của bạn."
2. "30 ngày. Bạn đã là 'vua' của thói quen tập luyện."
3. "Nhân Sâm nói: 'Mình cần 6 năm để ra quả. Bạn chỉ cần 30 ngày — bạn giỏi hơn mình!'"
4. "Kỷ luật = tự do. Tự do vận động mà không cần ai nhắc."
5. "Cơ thể mạnh, tinh thần mạnh. Nhân Sâm tự hào lắm."

#### Habits mẫu — G9 Nhân Sâm

| ID               | Tên                            | Thời gian | Icon                 | Điểm | Loại    |
| ---------------- | ------------------------------- | ---------- | -------------------- | ------ | -------- |
| `workout_30`   | Tập luyện 30 phút            | 06:30      | ui_heart_health      | 20     | Default  |
| `protein_meal` | Ăn đủ protein                | Bữa ăn   | ui_note_pencil       | 10     | Default  |
| `water_2l`     | Uống đủ 2L nước            | Cả ngày  | ui_water_drop        | 10     | Default  |
| `stretch_post` | Giãn cơ sau tập              | Sau tập   | ui_heart_health      | 10     | Optional |
| `sleep_8h`     | Ngủ đủ 8 tiếng (phục hồi) | 22:00      | ui_lightbulb_insight | 10     | Optional |

---

### 🌾 G10 — CÂY RAU MÁ (Pennywort)

#### Identity Card

| Field         | Value                                                   |
| ------------- | ------------------------------------------------------- |
| Code          | `pennywort`                                           |
| Group         | G10                                                     |
| Emoji         | 🌾                                                      |
| Màu          | `#0284C7`                                             |
| Màu nhạt    | `#F0F9FF`                                             |
| Journey       | Khám định kỳ                                        |
| Story         | "Mát gan, đều đặn chăm sóc"                      |
| Trigger       | `exercise = "sedentary"`                              |
| DS duyệt     | ❌ Không                                               |
| Đối tượng | Người ít vận động, ngồi nhiều, dân văn phòng |

#### Backstory

Rau Má — cây mát, dễ sống, mọc ở mọi nơi. Dành cho dân văn phòng ngồi 8 tiếng/ngày. Rau Má nhắc: **đứng dậy, đi bộ, uống nước** — những điều nhỏ nhưng thay đổi lớn.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Rau Má mọc bên vệ đường — khiêm tốn nhưng mát lành. Sức khỏe bắt đầu từ những điều nhỏ nhất."

Micro-narratives:

1. "Rau Má khiêm tốn — mọc bên vệ đường. Nhưng mát lành vô cùng."
2. "Ngày {streak}. Đứng dậy mỗi giờ = Rau Má thêm 1 lá tròn."
3. "Đang ngồi đúng không? Đứng dậy đi bộ 5 phút nhé. Rau Má đang chờ."
4. "Rau Má nói: 'Mình nhỏ thôi, nhưng mình mọc ở khắp nơi. Như thói quen tốt của bạn.'"
5. "Dân văn phòng ngồi nhiều. Rau Má nhắc: đứng dậy, đổi tư thế, uống nước."

**Ch.2 Cây Non (8-14):**

> "Rau Má lan ra — mỗi ngày thêm 1 lá tròn xinh. Mỗi ngày bạn đi bộ thêm = 1 lá Rau Má."

Micro-narratives:

1. "Rau Má lan rộng — phủ xanh một góc. Như 20 phút đi bộ phủ xanh buổi trưa."
2. "Tuần 2. Mắt có bớt mỏi không? Nghỉ mắt 20-20-20 hiệu quả lắm."
3. "Rau Má nói: 'Mình mọc không cần ai trồng. Thói quen của bạn cũng tự mọc vậy.'"
4. "2L nước/ngày — cơ thể cảm ơn bạn từng ngụm."
5. "14 ngày. Từ 'sedentary' → 'đang thay đổi'. Rau Má tự hào."

**Ch.3 Trưởng Thành (15-29):**

> "Rau Má phủ xanh một góc vườn. Thói quen vận động đã phủ xanh ngày của bạn."

Micro-narratives:

1. "Góc vườn xanh mướt Rau Má. Ngày của bạn cũng xanh hơn nhiều."
2. "Ngày {streak}. Đứng dậy mỗi giờ đã thành phản xạ. Bạn không còn ngồi 8 tiếng liên nữa."
3. "Rau Má nói: 'Mình phủ xanh vệ đường. Bạn phủ xanh ngày làm việc.'"
4. "3 tuần đi bộ mỗi trưa = ~300 phút vận động. Không tồi chút nào!"
5. "Giãn cơ tại bàn, nghỉ mắt, uống nước — 3 thói quen cứu lưng + mắt + thận."

**Ch.4 Nở Hoa (30+):**

> "Rau Má nở hoa tím nhỏ — khiêm nhường nhưng kiên cường. Từ sedentary → active."

Micro-narratives:

1. "Hoa Rau Má nhỏ tím — khiêm nhường, kiên cường. Giống bạn: thay đổi nhỏ, kết quả lớn."
2. "30 ngày. Bạn đã biến 'đứng dậy mỗi giờ' thành bản năng."
3. "Rau Má nói: 'Mình mọc bên vệ đường — ai cũng bước qua. Nhưng bạn dừng lại, chăm mình. Cảm ơn.'"
4. "Streak {streak} ngày. Dân văn phòng khỏe nhất công ty — là bạn."
5. "Rau Má vẫn mọc — bên vệ đường, bên bạn. Vẫn mát, vẫn lành."

#### Habits mẫu — G10 Rau Má

| ID               | Tên                           | Thời gian | Icon                 | Điểm | Loại    |
| ---------------- | ------------------------------ | ---------- | -------------------- | ------ | -------- |
| `stand_hourly` | Đứng dậy mỗi giờ 5 phút  | Mỗi giờ  | ui_heart_health      | 10     | Default  |
| `walk_20`      | Đi bộ 20 phút               | 12:30      | ui_heart_health      | 15     | Default  |
| `water_2l`     | Uống đủ 2L nước           | Cả ngày  | ui_water_drop        | 10     | Default  |
| `eye_rest`     | Nghỉ mắt 20-20-20            | Mỗi 2h    | ui_lightbulb_insight | 5      | Optional |
| `stretch_desk` | Giãn cơ tại bàn làm việc | 15:00      | ui_heart_health      | 10     | Optional |

---

### 🌿 G11 — CÂY CAM THẢO (Licorice)

#### Identity Card

| Field         | Value                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| Code          | `licorice`                                                           |
| Group         | G11                                                                    |
| Emoji         | 🌿                                                                     |
| Màu          | `#B45309`                                                            |
| Màu nhạt    | `#FEF3C7`                                                            |
| Journey       | Điều trị đa khoa                                                   |
| Story         | "Điều hòa, ngọt ngào vững chắc"                                 |
| Trigger       | `careFor = "family"`                                                 |
| DS duyệt     | ❌ Không                                                              |
| Đối tượng | Người chăm sóc gia đình — bố/mẹ quản lý sức khỏe cả nhà |

#### Backstory

Cam Thảo — "vị thuốc dẫn đường" trong Đông y, xuất hiện trong hầu hết mọi bài thuốc. Cam Thảo **kết nối** — giống người chăm sóc gia đình, kết nối mọi người, lo cho tất cả. Vị ngọt nhẹ của Cam Thảo = sự ngọt ngào trong chăm sóc gia đình.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Cam Thảo gieo xuống đất — rễ nó sẽ tỏa ra xa, kết nối mọi cây xung quanh."

Micro-narratives:

1. "Rễ Cam Thảo tỏa ra — kết nối. Như bạn kết nối cả nhà."
2. "Ngày {streak}. Mỗi lần bạn nhắc người thân uống thuốc = một rễ Cam Thảo mới."
3. "Cam Thảo nói: 'Mình làm bài thuốc thêm hiệu quả. Bạn làm gia đình thêm khỏe.'"
4. "Ăn cơm cùng cả nhà — đơn giản nhưng quý giá. Cam Thảo hiểu."
5. "Người chăm sóc gia đình = người quan trọng nhất. Cảm ơn bạn."

**Ch.2 Cây Non (8-14):**

> "Rễ Cam Thảo chạm đến cây bên cạnh — chia sẻ dinh dưỡng. Như bạn chia sẻ yêu thương."

Micro-narratives:

1. "Rễ chạm cây bên cạnh — chia sẻ dinh dưỡng. Như bạn chia sẻ sự quan tâm."
2. "Tuần 2. Cả nhà đã quen với thói quen mới chưa? Cam Thảo đang kết nối."
3. "Cam Thảo nói: 'Mình ngọt nhẹ — như tình yêu gia đình. Không cần nói nhiều.'"
4. "Nhắc người thân uống thuốc, hỏi hôm nay khỏe không — nhỏ thôi, nhưng quan trọng."
5. "14 ngày. Bạn đã 'kết nối' cả nhà qua sức khỏe."

**Ch.3 Trưởng Thành (15-29):**

> "Cam Thảo là cây kết nối — mọi cây trong vườn đều cần nó. Gia đình cần bạn."

Micro-narratives:

1. "Mọi cây cần Cam Thảo. Gia đình cần bạn — người giữ nhịp."
2. "Ngày {streak}. 3 tuần chăm sóc cả nhà — bạn là trụ cột."
3. "Cam Thảo nói: 'Không có mình, bài thuốc không hoàn chỉnh. Không có bạn, gia đình cũng vậy.'"
4. "Ăn cơm cùng gia đình mỗi tối — thói quen đẹp nhất."
5. "Bạn không chỉ chăm cây — bạn chăm cả vườn (gia đình)."

**Ch.4 Nở Hoa (30+):**

> "Cam Thảo nở hoa tím nhạt — nhỏ, nhưng hương lan xa. Tình yêu gia đình cũng vậy."

Micro-narratives:

1. "Hoa Cam Thảo nhỏ — hương lan xa. Tình yêu bạn dành cho gia đình cũng lan xa."
2. "30 ngày chăm sóc cả nhà. Streak {streak} — không phải của riêng bạn, mà của cả nhà."
3. "Cam Thảo nói: 'Mình nở hoa rồi — ngọt, nhẹ, và chia sẻ với mọi cây.'"
4. "Gia đình khỏe — vì có bạn kết nối, chăm sóc, nhắc nhở."
5. "Cam Thảo là cây 'không thể thiếu'. Bạn cũng vậy — gia đình cần bạn."

#### Habits mẫu — G11 Cam Thảo

| ID                | Tên                                  | Thời gian | Icon             | Điểm | Loại    |
| ----------------- | ------------------------------------- | ---------- | ---------------- | ------ | -------- |
| `family_check`  | Hỏi thăm sức khỏe 1 người thân | 19:00      | ui_heart_health  | 15     | Default  |
| `water_2l`      | Uống đủ 2L nước                  | Cả ngày  | ui_water_drop    | 10     | Default  |
| `family_walk`   | Đi bộ cùng gia đình 20 phút     | 18:00      | ui_heart_health  | 15     | Default  |
| `meal_together` | Ăn cơm cùng gia đình             | 19:00      | ui_note_pencil   | 10     | Optional |
| `med_remind`    | Nhắc người thân uống thuốc      | 07:30      | ui_pill_medicine | 10     | Optional |

---

### 🌿 G12 — CÂY SẢ (Lemongrass)

#### Identity Card

| Field         | Value                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Code          | `lemongrass`                                                                                      |
| Group         | G12                                                                                                 |
| Emoji         | 🌿                                                                                                  |
| Màu          | `#4A8A40`                                                                                         |
| Màu nhạt    | `#E4F2DC`                                                                                         |
| Journey       | Phòng ngừa                                                                                        |
| Story         | "Thanh lọc, thải độc, vận động cùng cây"                                                   |
| Trigger       | **DS-only assignment** hoặc user tự chọn trong "Khám phá cây mới" (không auto-assign) |
| DS duyệt     | ❌ Không                                                                                           |
| Đối tượng | Người muốn thanh lọc, detox, phòng bệnh chủ động                                           |

#### Backstory

Sả — mùi hương quen thuộc xua đuổi muỗi, thanh lọc không khí. Sả = **phòng ngừa** — không đợi bệnh rồi mới chữa, mà chủ động bảo vệ. Sả mọc thành bụi dày — vừa đẹp vừa bảo vệ.

#### 4 Chương

**Ch.1 Mầm Non (0-7):**

> "Sả gieo xuống — ngay lập tức tỏa hương. Phòng ngừa = hành động ngay, không chờ."

Micro-narratives:

1. "Sả vừa gieo đã thơm. Phòng ngừa = bắt đầu ngay, không chờ bệnh."
2. "Ngày {streak}. Mỗi buổi vận động sáng = 1 nhánh Sả mới."
3. "Sả nói: 'Mình xua đuổi muỗi. Thói quen tốt xua đuổi bệnh.'"
4. "Thanh lọc cơ thể bắt đầu từ ly nước chanh sả buổi sáng."
5. "Chủ động phòng ngừa > bị động chữa bệnh. Sả hiểu điều này."

**Ch.2 Cây Non (8-14):**

> "Bụi Sả mọc thêm — mỗi nhánh mới = 1 tuyến phòng thủ mới. Mỗi thói quen = 1 lá chắn."

Micro-narratives:

1. "Thêm nhánh Sả mới — hàng rào bảo vệ dày hơn."
2. "Tuần 2. Vận động + nước chanh + ăn đủ rau = 3 lới bảo vệ."
3. "Sả nói: 'Mỗi nhánh mình = 1 thói quen của bạn. Càng nhiều càng chắc.'"
4. "Khám định kỳ không phải vì bệnh — mà vì muốn biết mình khỏe."
5. "14 ngày phòng ngừa chủ động. Bạn đang dẫn trước."

**Ch.3 Trưởng Thành (15-29):**

> "Sả giờ đã thành hàng rào xanh — bảo vệ vườn khỏi côn trùng. Thói quen đã bảo vệ bạn."

Micro-narratives:

1. "Hàng rào Sả xanh dày — không côn trùng nào vào được. Như thói quen bảo vệ bạn."
2. "Ngày {streak}. 3 tuần phòng ngừa = 1 năm bớt lo."
3. "Sả nói: 'Mình là hàng rào. Bạn là người xây hàng rào. Cùng bảo vệ nhé.'"
4. "Vận động, ăn sạch, khám định kỳ — 3 lới phòng thủ vững chắc."
5. "Phòng ngừa tốt hơn chữa bệnh — và rẻ hơn nhiều."

**Ch.4 Nở Hoa (30+):**

> "Sả nở hoa — bông lúa nhỏ phất phơ. 30 ngày phòng ngừa = 1 năm bớt lo."

Micro-narratives:

1. "Bông Sả phất phơ trong gió — nhẹ nhàng như sự an tâm."
2. "30 ngày. Bạn đã xây hàng rào phòng ngừa vững chắc."
3. "Sả nói: 'Mình bảo vệ vườn. Bạn bảo vệ cơ thể. Cảm ơn.'"
4. "Streak {streak} ngày. Phòng ngừa chủ động = đầu tư thông minh nhất."
5. "Sả vẫn thơm, vẫn xanh, vẫn xua muỗi. Thói quen của bạn cũng vậy — vẫn chắc."

#### Habits mẫu — G12 Sả

| ID                  | Tên                             | Thời gian | Icon                 | Điểm | Loại    |
| ------------------- | -------------------------------- | ---------- | -------------------- | ------ | -------- |
| `morning_stretch` | Vận động buổi sáng 10 phút | 07:00      | ui_heart_health      | 15     | Default  |
| `water_lemon`     | Uống nước chanh/sả ấm       | 07:30      | ui_water_drop        | 10     | Default  |
| `veggie_meal`     | Ăn ít nhất 3 phần rau/ngày  | Bữa ăn   | ui_note_pencil       | 10     | Default  |
| `hand_wash`       | Rửa tay trước ăn             | Bữa ăn   | ui_heart_health      | 5      | Optional |
| `deep_clean`      | Dọn dẹp/vệ sinh 1 góc nhà   | 20:00      | ui_lightbulb_insight | 10     | Optional |

#### Paused (áp dụng chung cho Nhóm B & C)

> "Cây đang nghỉ mát — lá xếp lại, tiết kiệm năng lượng. Khi nào bạn quay lại, cây sẽ bung lá đón bạn ngay."

---

# PHẦN 3: DAILY RITUAL SYSTEM

## 3.1 The 30-Second Loop

Nguyên tắc vàng: **Mở app → Thấy cây → Tick habit → Đóng app. Tối đa 30 giây.**

```
┌─────────────────────────────────────────────────────────┐
│  USER MỞ APP                                             │
│  ↓                                                       │
│  GardenScreen.jsx hiện ra:                               │
│  - Background vườn đồi (#FAF4E8)                         │
│  - Cây của user (PlantHero) đang float nhẹ              │
│  - Mascot ngồi cạnh (DynamicMascot state="entering")     │
│  - Stats HUD: ⭐ points | 🔥 streak | 💧 tưới | 🌱 Lv.X │
│  ↓                                                       │
│  TAP CÂY → Habits Sheet slide lên:                      │
│  - Greeting: "Chào buổi sáng, [tên]! 👋"                │
│  - Habits checklist: ☐ Uống thuốc | ☐ Đi bộ | ☐ Uống nước│
│  ↓                                                       │
│  TICK HABIT:                                             │
│  - waterHabit(habitId) → POST /api/garden/water          │
│  - Floater "+10 💧" bay lên                              │
│  - Mascot chuyển state="watering"                         │
│  - adherenceEvent created → streak updated               │
│  ↓                                                       │
│  ĐÓNG APP (hoặc tick thêm habits)                        │
│  Total time: ~15-30 giây                                 │
└─────────────────────────────────────────────────────────┘
```

## 3.2 Habit-as-Watering — Tưới cây = Hoàn thành thói quen

Mỗi habit được tick = 1 lần "tưới cây":

| Action                      | Backend                                                          | Frontend                                                 |
| --------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| User tick "Uống thuốc ✅" | `POST /garden/water` body: `{habitId: "meds_am"}`            | Floater "+10 💧", mascot `watering`                    |
| Backend xử lý             | `adherenceEvent` created, `loyaltySummary.totalPoints += 10` | —                                                       |
| Habit marked done           | `carePlans.habits[i].done = true, doneAt = now`                | Checkbox ✅, strikethrough text                          |
| All habits done             | —                                                               | PlantHero `glow={true}`, card hiện "🎉 Hoàn thành!" |

**Daily reset:** Mỗi ngày mới, `garden/service.py` reset `done: false` cho tất cả habits (check `doneAt` date ≠ today).

**Edge case — User mở app lần 2 (đã tick hết habits):** GardenScreen hiện trạng thái "hoàn thành":

- PlantHero `glow={true}` (hào quang nhẹ)
- Habits sheet: tất cả ✅, text mờ hơn
- Greeting thay đổi: "Bạn đã tưới cây xong hôm nay rồi! 🌿 Nghỉ ngơi đi nhé."
- Mascot: `idle` (ngồi cạnh chậu, mỉm cười)
- Không hiện nút tưới nữa — tránh nhầm lẫn

## 3.3 Level Progress — Cây lớn lên

| Level | Streak cần | Khoảng cách | Progress bar               | Stage name      |
| ----- | ----------- | ------------- | -------------------------- | --------------- |
| 1     | 0-7 ngày   | 8 ngày       | `{streak}/8 ngày`       | Mầm non        |
| 2     | 8-14 ngày  | 7 ngày       | `{streak-8}/7 ngày`     | Cây non        |
| 3     | 15-29 ngày | 15 ngày      | `{streak-15}/15 ngày`   | Trưởng thành |
| 4     | 30+ ngày   | ∞            | "Đã đạt cấp tối đa" | Nở hoa         |

**Lý do khoảng cách tăng dần:** Thiết kế có chủ đích (progressive difficulty):

- Level 1→2: Ngắn (7 ngày) — tạo "quick win" đầu tiên, hook user sớm
- Level 2→3: Ngắn hơn (7 ngày) — duy trì momentum
- Level 3→4: Dài (15 ngày) — lúc này thói quen đã hình thành, cần thử thách để không nhàm chán
- Level 4: Vô hạn — "mastery stage", không cần reward nữa, thói quen là bản sắc

**Khi chuyển level:** Mascot `celebrating` state (nhảy múa 2.5s). PlantHero visual upgrade. `waterDrops` animation chạy 1s trước, rồi `celebration` 2.5s.

## 3.4 Milestone Popups

| Streak | Badge          | Popup text                                       | localStorage key              |
| ------ | -------------- | ------------------------------------------------ | ----------------------------- |
| 7      | 🌱 Mầm Xanh   | "[Cây] vừa nhú mầm! 7 ngày kiên trì!"     | `lc_care_milestone_seen_7`  |
| 14     | 🌿 Cây Lớn   | "[Cây] đã đứng vững! 14 ngày thói quen!" | `lc_care_milestone_seen_14` |
| 30     | 🌳 Vườn Xanh | "[Cây] nở hoa! 30 ngày — bạn tuyệt vời!"  | `lc_care_milestone_seen_30` |

## 3.5 Morning vs Evening Narrative

| Thời điểm | getGreeting()        | Narrative tone                                               |
| ------------ | -------------------- | ------------------------------------------------------------ |
| 00:00-11:59  | "Chào buổi sáng"  | Năng lượng: "Ngày mới bắt đầu! Tưới cây nào!"    |
| 12:00-17:59  | "Chào buổi chiều" | Nhẹ nhàng: "Nửa ngày rồi — bạn đã tick mấy habit?" |
| 18:00-23:59  | "Chào buổi tối"   | Ấm áp: "Ngày dài rồi — nghỉ ngơi cùng cây nhé."   |

## 3.6 Weather System (Proposed — chưa implement)

Concept: Thời tiết trong vườn phản ánh streak status:

| Streak status                            | Thời tiết          | Visual                               |
| ---------------------------------------- | -------------------- | ------------------------------------ |
| Streak tốt (≥3 ngày liên tiếp)      | ☀️ Nắng đẹp     | Background sáng, sunbeams animation |
| Streak mới bắt đầu (1-2 ngày)       | 🌤️ Nắng nhẹ      | Mây nhẹ trôi qua                  |
| Streak vừa đứt (quay lại sau paused) | 🌦️ Mưa rồi tạnh | Giọt mưa → cầu vồng             |
| Streak dài (≥14 ngày)                 | 🌈 Cầu vồng        | Rainbow overlay                      |

---

# PHẦN 4: ENGAGEMENT MECHANICS

## 4.1 Letters from the Garden (Proposed)

Hệ thống "thư" — narrative dài hơn, unlock tại các milestone. User nhận "thư" từ cây khi đạt mốc quan trọng.

| Milestone              | Thư từ             | Nội dung mẫu                                                                                     |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| Streak 7               | Cây gửi thư       | "Bạn thân mến, mình là [tên cây]. 7 ngày rồi — mình muốn cảm ơn bạn..."             |
| Streak 14              | Mascot gửi thư     | "Haha! 14 ngày rồi! Mình nhớ ngày đầu bạn đến — bạn có vẻ ngại lắm..."             |
| Streak 30              | Khu Vườn gửi thư | "Gửi [tên user], từ Khu Vườn Sức Khỏe Long Châu Care. Bạn là 1 trong số ít người..." |
| First paused → return | Cây gửi thư       | "[Tên cây] rất vui được gặp lại bạn. Mình không giận — mình chờ bạn."              |

**Implementation note:** Lưu trong collection `insights` với `insightType: "letter"`.

## 4.2 Lore Fragments (Proposed)

Mảnh kiến thức y tế được narrative hóa — unlock ngẫu nhiên khi tưới cây.

| Fragment type          | Ví dụ                                                                                       | Frequency  |
| ---------------------- | --------------------------------------------------------------------------------------------- | ---------- |
| Kiến thức cây       | "Bạn biết không? Gừng thực ra thuộc họ Gừng (Zingiberaceae) — cùng họ với Nghệ!" | 1/7 ngày  |
| Kiến thức sức khỏe | "Uống 2L nước/ngày = thận thanh lọc tốt hơn 40%."                                     | 1/7 ngày  |
| Kiến thức văn hóa  | "Trong y học cổ truyền Việt Nam, Nghệ được dùng từ thế kỷ 10."                    | 1/14 ngày |

**Dedup mechanism:** Firestore lưu `seenLoreIds: string[]` trong `gardenStates` document. Khi random lore → filter out đã seen. Khi hết pool → reset `seenLoreIds = []` và bắt đầu cycle mới.

> [!WARNING]
> Lore fragments phải qua guardrails check — không được chẩn đoán hoặc kê đơn.

## 4.3 Badge Progression — Hệ thống huy hiệu

### Badges hiện tại (đã implement)

| Badge                       | Streak | Icon         | Tiêu chí           |
| --------------------------- | ------ | ------------ | -------------------- |
| 🌱 Mầm Xanh                | 7      | badge_sprout | 7 ngày liên tiếp  |
| 🌿 Cây Lớn                | 14     | badge_tree   | 14 ngày liên tiếp |
| 🌳 Vườn Xanh              | 30     | badge_garden | 30 ngày liên tiếp |
| 👨‍👩‍👧 Gia đình khỏe | 7+     | badge_family | Cả nhà streak > 7  |

### Badges proposed (chưa implement)

| Badge                   | Tiêu chí                       | Narrative                       |
| ----------------------- | -------------------------------- | ------------------------------- |
| 🌄 Người Sáng Sớm   | 7 ngày tick habit trước 8h    | "Bạn thuộc về buổi sáng."  |
| 🧘 Bình Yên           | 14 ngày tick habit mindfulness  | "Tâm tĩnh, trí sáng."       |
| 💊 Tuân Thủ Vàng     | 30 ngày tick "uống thuốc"     | "Không bỏ sót 1 ngày nào." |
| 🏃 Vận Động Viên    | 21 ngày tick habit đi bộ/tập | "Cơ thể bạn cảm ơn bạn."  |
| 📝 Nhật Ký Sức Khỏe | 14 ngày tick habit ghi chỉ số | "Dữ liệu = quyền lực."      |

## 4.4 Point Economy — Kinh tế điểm

| Action                                   | Points     | Narrative                         |
| ---------------------------------------- | ---------- | --------------------------------- |
| Tick 1 habit                             | +10đ      | "Giọt nước cho cây"           |
| Hoàn thành tất cả habits trong ngày | +bonus 5đ | "Cây được tưới đầy đủ!" |
| Streak milestone (7/14/30)               | +50đ      | "Badge mới + bonus!"             |

| Redemption         | Cost  | Item                                  |
| ------------------ | ----- | ------------------------------------- |
| Lab voucher        | 500đ | Xét nghiệm HbA1c + Lipid miễn phí |
| Vaccine voucher    | 500đ | Giảm 50k gói cúm + phế cầu       |
| Supplement voucher | 300đ | Giảm 30k Omega-3 Fish Oil            |

**Economic balance:**

| Scenario                              | Points/ngày     | Ngày → 300đ | Ngày → 500đ |
| ------------------------------------- | ---------------- | -------------- | -------------- |
| **Min** (tick 1 habit/ngày)    | 10đ             | 30 ngày       | 50 ngày       |
| **Avg** (tick 2 habits/ngày)   | 20đ             | 15 ngày       | 25 ngày       |
| **Max** (tick 3 habits + bonus) | 35đ             | 9 ngày        | 15 ngày       |
| **Max + milestone**             | 35đ + 50đ/mốc | ~8 ngày       | ~13 ngày      |

Đủ nhanh để motivate (avg user ~2 tuần cho voucher đầu), đủ chậm để không lạm phát.

## 4.5 Streak Recovery — Phục hồi streak

### Grace Period (1 ngày)

Khi user miss **1 ngày**, streak KHÔNG đứt ngay. Thay vào đó:

```
Miss 1 ngày → Grace period (streak giữ nguyên, nhưng đếm cảnh báo)
  ↓
Ngày hôm sau user tick habit → streak tiếp tục (như chưa miss)
  ↓
Nếu miss tiếp ngày 2 → streak reset về 0
Nếu miss 3 ngày liên tiếp → plantStatus: "paused"
```

**Lý do:** Ai cũng có 1 ngày quên/bận. Phạt ngay lập tức = demotivate. Grace period 1 ngày cho phép "sai lầm nhỏ" mà không mất progress.

**Narrative khi grace period:**

> "Hôm qua cây không được tưới — nhưng rễ vẫn đủ ẩm. Tưới hôm nay là kịp!"

### Paused Recovery (miss ≥3 ngày)

Khi `plantStatus: "paused"`:

```
User quay lại sau X ngày
    ↓
GardenScreen: Cây hiện nhưng lá rủ, màu nhạt hơn
Mascot: state="sleeping" (ngủ gật cạnh chậu, bong bóng zzZ)
    ↓
User tap cây → Sheet hiện:
  "Chào bạn! Cây đã nghỉ ngơi {X} ngày. 
   Không sao — cây vẫn ở đây, vẫn chờ bạn.
   Tưới 1 giọt nước để cây thức dậy nhé?"
    ↓
User tick 1 habit:
  - plantStatus: "paused" → "growing"
  - streak reset về 1
  - Mascot: state="entering" → "celebrating" (thức dậy → vui mừng!)
  - Narrative: "Cây thức dậy rồi! Mình bắt đầu lại nhé — lần này cùng nhau!"
```

**Nguyên tắc:** KHÔNG BAO GIỜ phạt user. Không mất cây, không mất level (chỉ reset streak). Narrative luôn khuyến khích, không guilt-trip.

## 4.6 Optional Habit Unlock

Mỗi cây có 3 default + 2 optional habits. Optional habits bắt đầu ở `active: false`.

| Action                         | Narrative                                                                  |
| ------------------------------ | -------------------------------------------------------------------------- |
| User toggle optional → active | "Thêm 1 thói quen mới! Cây của bạn sẽ được chăm sóc kỹ hơn." |
| User thêm custom habit        | "Bạn tự tạo thói quen riêng! Cây ngạc nhiên lắm đấy."           |

Frontend: GardenScreen bottom sheet có section "Thêm thói quen" với optional habits list + nút "Tạo thói quen mới".

---

# PHẦN 5: NOTIFICATION NARRATIVE

## 5.1 Notification Voice — Ai nói?

Mỗi push notification có "người nói" khác nhau — tạo cảm giác sống động:

| Voice            | Khi nào               | Ví dụ                                                         | Icon          |
| ---------------- | ---------------------- | --------------------------------------------------------------- | ------------- |
| 🌿 Cây nói     | Morning habit reminder | "[Gừng] đang khát nước... tưới mình đi!"               | Emoji cây    |
| 🐿️ Mascot nói | Streak sắp đứt      | "Ơ, hôm qua bạn quên tưới cây rồi! Hôm nay nhé?"      | mascot_avatar |
| 🏥 Long Châu    | Refill reminder        | "Thuốc của bạn sắp hết — cần mua thêm tại Long Châu?" | app_icon      |
| 📋 Hệ thống    | Appointment/Lab        | "Nhắc lịch: Khám định kỳ ngày 25/06 tại Long Châu..."  | calendar      |

## 5.2 Routine vs Non-routine

| Loại                 | Tỷ lệ | Gate                            | Ví dụ                                                   |
| --------------------- | ------- | ------------------------------- | --------------------------------------------------------- |
| **ROUTINE**     | ~70%    | Auto-send (template cố định) | Morning habit, refill, streak milestone, greeting         |
| **NON-ROUTINE** | ~30%    | Care Team DS approve            | Lab result alert, medication change, cross-member insight |

### Routine templates — Auto-send (AI/System tự gửi)

```
// Template pool — random mỗi ngày

MORNING_HABIT = [
  "☀️ {plantEmoji} {plantName} đang chờ bạn! Tưới cây sáng nay nhé.",
  "🌱 Ngày mới bắt đầu! {plantName} nói: 'Tưới mình đi!'",
  "☀️ Chào buổi sáng! Cây của bạn đang đợi 💧",
  "🌿 {streak} ngày rồi! Đừng dừng lại — tưới cây nào!",
  "☀️ {plantName} khát nước rồi! Mở app tưới cây nhé 🪴",
]

EVENING_REMIND = [
  "🌙 Hôm nay bạn đã tưới cây chưa? Còn {remaining} habit chưa tick.",
  "🌙 {plantName} đang chờ bạn trước khi ngủ...",
  "🌙 Tick xong rồi nghỉ nhé! Cây cần bạn 💧",
]

STREAK_MILESTONE = [
  "🔥 Streak {streak} ngày! {plantName} tự hào lắm!",
  "🏆 {streak} ngày liên tiếp — bạn đỉnh quá!",
  "🌟 Wow, {streak} ngày! Badge mới đang chờ bạn!",
]

REFILL_REMINDER = [
  "💊 Đã {days} ngày từ lần mua thuốc cuối. Cần mua thêm không?",
  "💊 Nhắc nhẹ: Thuốc sắp hết (dựa trên chu kỳ mua trước).",
]
```

### Non-routine — Cần DS approve

```
// Nằm trong pharmacist care_queue — DS xem và approve/edit

LAB_ALERT = "[Draft] Kết quả xét nghiệm vừa có — Dược sĩ đang xem xét cho bạn."
CROSS_MEMBER = "[Draft] Cả nhà đều giữ streak >7 ngày — tuyệt vời!"
CARE_PLAN_UPDATE = "[Draft] Kế hoạch chăm sóc đã được cập nhật — xem ngay."
```

**⏰ Draft timeout rule:** Non-routine notifications tự động hết hạn (auto-expire) sau **48h** nếu DS không approve. Điều này đảm bảo:

- Thông tin không bị cũ (lab result từ 3 ngày trước không còn relevant)
- Queue không bị ù tắc
- DS biết cần xử lý nhanh

Firestore: `draftNotifications.expiresAt = createdAt + 48h`. Scheduler job check mỗi 1h và xóa expired drafts.

## 5.3 Escalation Narrative — Khi streak sắp đứt

| Ngày miss               | Level                      | Push content                                                                                    |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------- |
| Miss 1 ngày             | Nhẹ nhàng (grace period) | "Hôm qua cây không được tưới — nhưng rễ vẫn đủ ẩm. Tưới hôm nay là kịp! 🌿" |
| Miss 2 ngày             | Lo lắng nhẹ              | "{plantName} hơi khát... 2 ngày rồi chưa được tưới. Quay lại nhé!"                  |
| Miss 3 ngày (→ paused) | Chấp nhận                | "{plantName} quyết định nghỉ ngơi. Khi nào bạn sẵn sàng, cây vẫn đợi 💚"           |
| Miss 7+ ngày            | Không push nữa           | Dừng notification — tránh spam. Chờ user tự quay lại.                                     |

**Nguyên tắc:** Sau 3 ngày miss → dừng push. KHÔNG SPAM. Khi user quay lại → trigger recovery flow (xem 4.5).

## 5.4 Template Variables

| Variable         | Source                                     | Ví dụ                 |
| ---------------- | ------------------------------------------ | ----------------------- |
| `{plantName}`  | constants.js `PLANT_GROUPS[group].name`  | "Gừng", "Oải Hương" |
| `{plantEmoji}` | constants.js `PLANT_GROUPS[group].emoji` | 🫚, 🪻                  |
| `{streak}`     | gardenState.streak                         | 7, 14, 30               |
| `{remaining}`  | habits.filter(h => !h.done).length         | 2                       |
| `{userName}`   | user.profile.displayName                   | "Anh Minh"              |
| `{days}`       | Ngày kể từ lastPurchaseDate             | 28                      |

---

# PHẦN 6: FAMILY GARDEN

## 6.1 Concept — Khu Vườn Gia Đình

Khi user thuộc Family Package, GardenScreen mở rộng:

```
┌──────────────────────────────────────────┐
│           KHU VƯỜN CỦA [TÊN]           │
│                                          │
│    [Cây chính]    [Cây vợ/chồng]        │
│    🫚 Gừng Lv.3   🪷 Sen Lv.2          │
│                                          │
│           [Cây con]                      │
│           🌿 Húng Quế Lv.1              │
│                                          │
│   ──── Family Stats ────                 │
│   👨‍👩‍👧 3 thành viên | 🔥 Avg streak: 12  │
│   Badge: Gia đình khỏe (nếu tất cả >7) │
└──────────────────────────────────────────┘
```

## 6.2 Family Badge — "Gia đình khỏe"

| Tiêu chí                       | Badge                       | Narrative                                             |
| -------------------------------- | --------------------------- | ----------------------------------------------------- |
| Tất cả thành viên streak > 7 | 👨‍👩‍👧 Gia đình khỏe | "Cả nhà cùng tưới cây — cả nhà cùng khỏe!" |
| 1 thành viên streak > 30       | 🌟 Ngôi sao gia đình     | "[Tên] là ngôi sao của gia đình — streak 30+!" |

## 6.3 Cross-member Narrative

Khi 1 thành viên miss streak → nhắc nhẹ (qua DS gate):

> "[Draft — DS approve] Cả nhà đang giữ streak đẹp lắm — chỉ cần [tên member] tưới cây hôm nay là hoàn hảo!"

Khi cả nhà đều streak > 7:

> "[Draft — DS approve] WOW! Cả gia đình [tên] đều giữ streak 7+ ngày! Đây là gia đình hiếm lắm đấy 🎉"

## 6.4 Family Calendar Narrative

Weekly timeline hiện các sự kiện sức khỏe của cả nhà:

```
Thứ 2: 💊 Bố uống thuốc HA ✅ | 🌿 Mẹ tưới cây ✅ | 🍎 Con uống vitamin ✅
Thứ 3: 💊 Bố uống thuốc HA ✅ | 🏥 Mẹ khám thai 14:00 | 🍎 Con uống vitamin ✅  
Thứ 4: 💊 Bố uống thuốc HA ☐ | 🌿 Mẹ tưới cây ☐ | 🍎 Con uống vitamin ☐
...
```

## 6.5 Sen Graduation → Transition

Khi mẹ bầu (Sen) hoàn thành journey thai sản:

```
Sen graduated → System đề xuất cây mới (3 lựa chọn):
  1. Chăm con: G5 Húng Quế (dinh dưỡng trẻ em)
  2. Chăm sức khỏe bản thân: G1 Bạc Hà (nền tảng)
  3. Để Dược sĩ gợi ý: DS xem hồ sơ → gán cây phù hợp

Narrative: "Sen đã nở hoa trọn vẹn. Chúc mừng! 
Bây giờ, bạn muốn chăm sóc ai tiếp? 
🌿 Húng Quế — cho bé yêu 
🌿 Bạc Hà — cho chính mình
💊 Để Dược sĩ gợi ý — tư vấn riêng"
```

## 6.6 Privacy trong Family Garden

| Dữ liệu         | Ai thấy                     | Mô tả                                               |
| ----------------- | ---------------------------- | ----------------------------------------------------- |
| Tên cây + level | Cả nhà                     | Cây và stage hiện trong Family view                |
| Streak            | Cả nhà                     | Số ngày liên tiếp                                 |
| Habits cụ thể   | **Chỉ chủ sở hữu** | KHÔNG hiện habit "Uống thuốc X" cho người khác |
| Điểm            | Cả nhà                     | Aggregate family points                               |
| Badge             | Cả nhà                     | Family badge shared                                   |

**Nguyên tắc:** Habits = private (chứa thông tin y tế). Cây + streak = shared (gamification, không nhạy cảm).

## 6.7 Thêm/Xóa thành viên Family Garden

| Hành động                  | Flow                                                                 | Narrative                                                                     |
| ----------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Thêm thành viên**  | Invite link (từ FP) → accept → cây mới xuất hiện trong vườn | "Chào mừng [tên] vào Khu Vườn! Cây mới vừa được trồng 🌱"        |
| **Rời family**         | User chọn rời → cây biến mất khỏi family view                 | "[Tên] đã tạm rời vườn. Cây của họ vẫn sống trong vườn riêng." |
| **Bị xóa bởi admin** | Head-of-family xóa → cây biến mất                               | (Không có narrative — silent removal)                                      |

**Lưu ý:** Khi rời family, cây của user vẫn tồn tại trong vườn cá nhân. Chỉ biến mất khỏi Family Garden view.

---

# PHẦN 7: EMOTIONAL DESIGN PATTERNS

## 7.1 Emotion-State Matrix

| Stage × Streak Status | Cảm xúc user              | UI Response                      | Narrative tone                   |
| ---------------------- | --------------------------- | -------------------------------- | -------------------------------- |
| Stage 1 + Active       | Hào hứng + không chắc   | Bright colors, mascot active     | Khuyến khích mạnh             |
| Stage 1 + Paused       | Thất vọng + guilt         | Soft colors, mascot waiting      | Reassurance, không phạt        |
| Stage 2 + Active       | Tự tin growing             | Warmer colors, progress visible  | Tự hào, positive reinforcement |
| Stage 3 + Active       | Identity forming            | Deep colors, plant mature        | "Đây là bạn" — bản sắc    |
| Stage 4 + Active       | Pride + mastery             | Rich colors, glow effect, flower | Celebration, legacy              |
| Stage 4 + Paused       | "Mình đã làm tốt rồi" | Golden/muted, plant resting      | Graceful acceptance              |

## 7.2 Color-Emotion Mapping

Mỗi cây có color scheme riêng — khi user vào GardenScreen, background tint nhẹ theo màu cây:

| Plant               | Emotion          | Primary | Light   | CSS variable        |
| ------------------- | ---------------- | ------- | ------- | ------------------- |
| G1 Bạc Hà         | Fresh/Clean      | #10B981 | #D1FAE5 | `--plant-primary` |
| G2 Gừng            | Warm/Steady      | #00923F | #E8F5EE | `--plant-primary` |
| G3 Khổ Qua         | Resilient/Tough  | #65A30D | #ECFCCB | `--plant-primary` |
| G4 Sen              | Sacred/Pure      | #DB2777 | #FCE7F3 | `--plant-primary` |
| G5 Húng Quế       | Joyful/Growing   | #F59E0B | #FEF3C7 | `--plant-primary` |
| G6 Lô Hội         | Calm/Enduring    | #0D9488 | #CCFBF1 | `--plant-primary` |
| G7 Nghệ            | Healing/Golden   | #D97706 | #FEF3C7 | `--plant-primary` |
| G8 Oải Hương     | Peaceful/Dreamy  | #7C3AED | #EDE9FE | `--plant-primary` |
| G9 Nhân Sâm       | Strong/Grounded  | #9CA3AF | #F3F4F6 | `--plant-primary` |
| G10 Rau Má         | Humble/Cool      | #0284C7 | #F0F9FF | `--plant-primary` |
| G11 Cam Thảo       | Warm/Connected   | #B45309 | #FEF3C7 | `--plant-primary` |
| G12 Sả             | Clean/Protective | #4A8A40 | #E4F2DC | `--plant-primary` |
| G13 Đỗ Trọng     | Solid/Reliable   | #8B5CF6 | #EDE9FE | `--plant-primary` |
| G14 Diệp Hạ Châu | Neat/Detox       | #059669 | #D1FAE5 | `--plant-primary` |
| G15 Lá Trà        | Calm/Patient     | #3B82F6 | #EFF6FF | `--plant-primary` |

## 7.3 Animation Triggers

Từ `art_direction_F.md` + `GardenScreen.jsx`:

| Animation         | Trigger                  | CSS                                           | Duration       |
| ----------------- | ------------------------ | --------------------------------------------- | -------------- |
| `plantFloat`    | Default idle             | `translateY(-3px) ↔ 3px`                   | 3s ease-in-out |
| `floatUp`       | Tick habit (+10 floater) | `translateY(0) → translateY(-40px)` + fade | 1.5s           |
| `leafFall`      | Season/decoration        | Lá rơi nhẹ background                      | 4s linear      |
| `sunlightPulse` | Streak ≥ 7              | Sunbeam opacity pulse                         | 4s             |
| `slideUp`       | Bottom sheet open        | `translateY(100%) → 0`                     | 0.3s ease-out  |
| `celebration`   | Level up / badge         | Mascot jump + confetti                        | 2.5s           |
| `waterDrops`    | Water animation          | Droplet fall on plant                         | 1s             |

## 7.4 Glassmorphism Language

Từ `art_direction_F.md`:

```css
/* Standard glass card */
.glass-card {
  background: rgba(253, 251, 247, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 90, 43, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(74, 55, 40, 0.08);
}

/* Stat chip (streak, points, level) */
.stat-chip {
  background: rgba(253, 251, 247, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 8px 16px;
}

/* Floating icon */
.floating-icon {
  background: rgba(253, 251, 247, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
```

---

# PHẦN 8: IMPLEMENTATION MAPPING

## 8.1 Habit Catalog Gap — Content Source

Bible này cung cấp **habit content cho 13 cây chưa có fallback** (G3-G15, trừ G1-G2 đã có).

### Mapping Bible → Code

| Bible section          | Target file                                    | Action                                    |
| ---------------------- | ---------------------------------------------- | ----------------------------------------- |
| Habits mẫu (G3-G15)   | `backend/services/careplan/habit_catalog.py` | Thêm vào `FALLBACK_CATALOG`           |
| Habits mẫu (G3-G15)   | `backend/scripts/seed_habit_catalog.py`      | Thêm vào seed script                    |
| Micro-narratives       | `frontend/src/config/constants.js`           | Thêm `microNarratives` array per plant |
| Stage openings         | `frontend/src/config/constants.js`           | Thêm `stageNarratives` per plant       |
| Notification templates | `backend/services/notification/service.py`   | Thêm vào template pool                  |

### Format mapping

Bible habit format:

```
| ID | Tên | Thời gian | Icon | Điểm | Loại |
```

→ Code format (`habit_catalog.py`):

```python
{
    "id": "bp_log",
    "name": "Ghi chỉ số huyết áp",
    "time": "08:00",
    "icon": "ui_chart_bar",
    "points": 15,
    "type": "default",
    "active": True
}
```

## 8.2 Service Touchpoints

| Service       | File                        | Bible sections used                       |
| ------------- | --------------------------- | ----------------------------------------- |
| Garden        | `garden/service.py`       | Phần 3 (ritual), Phần 7 (animations)    |
| Notification  | `notification/service.py` | Phần 5 (templates, escalation)           |
| CarePlan      | `careplan/service.py`     | Phần 2 (habits per plant)                |
| Onboarding    | `onboarding/service.py`   | Phần 2 (backstories, assignment context) |
| Pharmacist    | `pharmacist/router.py`    | Phần 2A (pending narratives)             |
| AI Guardrails | `ai/guardrails.py`        | Phần 1.5 (banned words compliance)       |

## 8.3 Frontend Touchpoints

| Component       | File                           | Bible sections used                          |
| --------------- | ------------------------------ | -------------------------------------------- |
| GardenScreen    | `GardenScreen.jsx`           | Phần 3 (loop), Phần 7 (colors, animations) |
| DynamicMascot   | `DynamicMascot.jsx`          | Phần 1.6 (mascot states)                    |
| PlantComponents | `PlantComponents.jsx`        | Phần 2 (visual stages)                      |
| Habits Sheet    | (Bottom sheet in GardenScreen) | Phần 3.1 (tick flow)                        |
| Milestone Popup | (localStorage-based)           | Phần 3.4 (popup text)                       |

## 8.4 New Firestore Fields (Proposed)

| Collection       | New field                 | Type              | Source                |
| ---------------- | ------------------------- | ----------------- | --------------------- |
| `carePlans`    | `stageNarrative`        | string            | Stage opening text    |
| `carePlans`    | `microNarratives`       | array`<string>` | Random narrative pool |
| `insights`     | `insightType: "letter"` | string            | Letters from Garden   |
| `insights`     | `insightType: "lore"`   | string            | Lore fragments        |
| `gardenStates` | `weatherType`           | string            | Weather system        |
| `badges`       | (new collection)          | doc               | Badge tracking        |

## 8.5 Priority Matrix — Implement Order

### MVP (Phase 1 — trước demo)

| Item                                                                | Effort           | Impact      | Priority                                       |
| ------------------------------------------------------------------- | ---------------- | ----------- | ---------------------------------------------- |
| Habit catalog G3-G15                                                | Medium           | 🔴 Critical | P0 — Không có = 13 cây không hoạt động |
| Micro-narratives G2, G3 (content + parsing + random selection + UI) | **Medium** | 🟡 High     | P1 — Demo 2 cây chính                       |
| Stage opening texts                                                 | Low              | 🟡 High     | P1 — Hiện khi chuyển stage                  |
| Notification templates (morning/evening)                            | Low              | 🟡 High     | P1 — Push đang generic                       |
| Firestore indexes cho fields mới                                   | Low              | 🔴 Critical | P0 — Cần trước khi deploy                  |
| Milestone popup text                                                | Low              | 🟢 Medium   | P2 — Đang dùng generic text                 |

### Post-MVP (Phase 2)

| Item                                                     | Effort | Impact    | Priority |
| -------------------------------------------------------- | ------ | --------- | -------- |
| Full micro-narratives (15 cây × 4 stage × 5 câu)     | High   | 🟡 High   | P2       |
| Letters from Garden (hàng tuần ngắn + milestone dài) | Medium | 🟡 High   | P2       |
| Weather System                                           | Medium | 🟢 Medium | P3       |
| Lore Fragments + seenLoreIds dedup                       | Medium | 🟢 Medium | P3       |
| Proposed badges (5 new)                                  | Low    | 🟢 Medium | P3       |
| Family Garden narrative + privacy rules                  | Medium | 🟢 Medium | P3       |

### Firestore Indexes Required

| Collection             | Field(s)                        | Type      | Tại sao                     |
| ---------------------- | ------------------------------- | --------- | ---------------------------- |
| `insights`           | `userId` + `insightType`    | Composite | Query letters/lore by user   |
| `insights`           | `insightType` + `createdAt` | Composite | Sort by date                 |
| `gardenStates`       | `userId` + `plantStatus`    | Composite | Filter paused/growing plants |
| `draftNotifications` | `expiresAt`                   | Single    | Scheduler cleanup query      |
| `badges`             | `userId` + `badgeId`        | Composite | Check badge ownership        |

---

# APPENDIX: GUARDRAILS COMPLIANCE CHECK

## Checklist — Toàn bộ Bible content

- [X] **Rule #0:** Không có câu nào suy ra bệnh từ thuốc
- [X] **Banned words:** Không dùng "bị bệnh", "mắc bệnh", "chẩn đoán", "điều trị", "bệnh nhân"
- [X] **Banned patterns:** Không đề xuất cây (AI không bao giờ nói "nên trồng cây X")
- [X] **Plant never dies:** Chỉ dùng `paused` / `graduated`, không dùng `dead` / `wilted`
- [X] **Pharmacist gate:** Medical plants (G2,G3,G7,G8,G13,G14,G15) đều có pending state
- [X] **Source tracking:** Không claim nguồn bệnh lý — chỉ reference "dùng thuốc [nhóm]"
- [X] **Tone:** Ấm áp, khuyến khích, không guilt-trip, không ép buộc
- [X] **Non-routine gate:** Lab alert, cross-member insight = Draft → DS approve + 48h timeout
- [X] **Voucher whitelist:** Chỉ 3 loại (lab, vacc, supp) — không thuốc kê đơn

---

> **End of Narrative Design Bible v1.1**
> Total: 300 micro-narrative snippets (15 cây × 4 stages × 5 câu — đầy đủ)
>
> + 75 habit templates (15 cây × 5 habits)
> + 30+ notification templates
> + 8 system design sections
>
> **Next steps:** Dev seed habits vào Firestore → Frontend load narratives → DS approve medical plants
