# 🎥 AI Video Generation Prompts — "Khi Bạn Đang Khỏe" (95s)

> Dùng cho **Veo 3 / Sora / Kling / Runway Gen-4**. Mỗi shot 6–8 giây, ghép lại theo timeline kịch bản.
> **Quy tắc vàng**: dán nguyên khối `[STYLE]` + mô tả nhân vật liên quan vào **đầu mọi prompt** — đây là cách duy nhất giữ nhân vật nhất quán giữa các shot. Nếu tool hỗ trợ reference image (Kling/Runway), gen 1 ảnh chân dung mỗi nhân vật trước (prompt ở mục 2) rồi dùng làm reference cho mọi shot.

---

## 1. [STYLE] — Khối style dán vào đầu MỌI prompt

```
Cinematic live-action footage, warm Vietnamese family drama style. Soft golden
natural lighting, shallow depth of field, 35mm lens look, gentle film grain,
muted warm color grade (amber highlights, soft teal shadows). Realistic modern
middle-class Vietnamese home in Ho Chi Minh City. Quiet, intimate, restrained
mood — no dramatic acting, emotions shown through small gestures. 16:9, 24fps.
No text, no captions, no logos, no watermark.
```

## 2. [CHARACTERS] — Character sheet (dán nhân vật xuất hiện trong shot)

```
MRS LAN: Vietnamese woman, 55 years old, kind round face, short permed
black-grey hair, wearing a simple floral blouse and dark loose trousers,
healthy and serene, gentle smile lines around her eyes.

MR MINH: Vietnamese man, 58 years old, salt-and-pepper short hair, reading
glasses, slightly weathered calm face, wearing a plain polo shirt, quiet
dignified posture.

NAM: Vietnamese man, 26 years old, short modern haircut, athletic slim build,
friendly face, wearing a grey running t-shirt (running scenes) or casual
office shirt (home scenes).
```

> **Prompt gen ảnh reference chân dung** (chạy trước, mỗi nhân vật 1 ảnh):
> `Photorealistic portrait of [dán mô tả nhân vật], neutral expression, soft window light, 85mm lens, plain warm background` — giữ ảnh này làm consistency reference cho mọi shot có nhân vật đó.

---

## 3. SHOT LIST — 14 shots

### ACT 1 — BÌNH THƯỜNG

**SHOT 1 · 0:00–0:06 · Ban công sáng sớm**
```
[STYLE] [MRS LAN]
Early morning golden sunlight. MRS LAN waters small potted herb plants on a
cozy apartment balcony, backlit by warm sunrise, dust particles floating in
the light. She gently touches a young green leaf with her fingertips, smiling
softly to herself. Camera: slow push-in from medium shot to close-up on her
hand touching the leaf. Peaceful, serene atmosphere.
```

**SHOT 2 · 0:06–0:12 · Bữa sáng gia đình**
```
[STYLE] [MR MINH] [NAM]
Morning family breakfast at a wooden dining table. MR MINH sips coffee while
reading a newspaper, relaxed. NAM eats quickly, glances at his watch, grabs
his motorbike keys, smiling at his father before leaving. Warm window light,
steam rising from bowls of pho. Camera: static medium-wide shot at table
height, like a family photograph in motion.
```

**SHOT 3 · 0:12–0:18 · Tối cả nhà xem TV**
```
[STYLE] [MRS LAN] [MR MINH] [NAM]
Evening living room lit by warm lamps and soft TV glow. The family of three
sits together on a sofa watching television. MRS LAN peels fruit on a small
plate, MR MINH laughs quietly at the TV, NAM scrolls his phone half-watching.
Camera: slow lateral dolly from behind the sofa, intimate observational angle.
Cozy, ordinary, deeply peaceful Vietnamese family evening.
```

### ACT 2 — NHỮNG CÂU HỎI NHỎ

**SHOT 4 · 0:18–0:24 · Nhịp tim 142**
```
[STYLE] [NAM]
Early morning in a green urban park. NAM in grey running t-shirt stops
running, breathing hard, hands on hips. He raises his wrist and looks at his
smartwatch showing a heart rate of 142 BPM. A brief flicker of confusion
crosses his face — he doesn't know if that number is normal. He shrugs
slightly and keeps running. Camera: handheld medium shot, then rack focus
close-up on the smartwatch screen, then back to his uncertain face.
```

**SHOT 5 · 0:24–0:30 · Thoáng mỏi của mẹ**
```
[STYLE] [MRS LAN]
Bright home kitchen, midday. MRS LAN is cooking, steam rising from a pot. She
pauses, sits down on a small stool, gently rubs her wrist, and looks at her
own hand for one quiet second — a fleeting tiredness, not pain. Then she
stands up and continues cooking as if nothing happened. Camera: static medium
shot through the kitchen doorway, voyeuristic respectful distance, then
close-up insert of her hand.
```

**SHOT 6 · 0:30–0:38 · Tờ xét nghiệm trong ngăn kéo**
```
[STYLE] [MR MINH]
Night. Dim warm desk lamp in a quiet bedroom. MR MINH opens a wooden drawer,
takes out a folded medical lab test result paper, puts on his reading glasses
and studies it for a long moment — rows of blood test numbers he doesn't
fully understand. His face shows quiet, contained worry. He folds the paper,
places it back in the drawer, and slowly pushes the drawer shut. Camera:
over-the-shoulder shot of the paper, then slow close-up of the drawer
closing — the drawer click is the emotional beat. Moody low-key lighting.
```

### ACT 3 — CÚ XOAY

**SHOT 7 · 0:38–0:46 · Pull-back nhà thuốc**
```
[STYLE] [MRS LAN]
Seen from outside through the glass storefront of a modern Vietnamese
pharmacy (blue and white interior, shelves of medicine): busy daytime,
customers coming and going holding prescriptions, looking tired and worried.
Camera slowly pulls back across the street. Cross-dissolve to the same street
at golden-hour late afternoon, now calm: MRS LAN walks past the pharmacy at a
relaxed pace. She is healthy. She does not stop, does not even glance at it.
The pharmacy recedes behind her as she walks on. Camera: continuous slow
pull-back then tracking alongside her walk. Bittersweet, contemplative tone.
```

**SHOT 8 · 0:46–0:50 · Màn đen (làm trong editing, không cần gen)**
> Đen 100%, chữ trắng fade-in từng dòng: *"Còn khi bạn khỏe — ai đồng hành cùng bạn?"* — làm bằng editor (CapCut/Premiere), không gen AI.

### ACT 4 — HẠT MẦM

**SHOT 9 · 0:50–0:58 · Con trai quét tờ xét nghiệm cho cha**
```
[STYLE] [MR MINH] [NAM]
Warm evening light at the family desk. NAM sits beside MR MINH, holding a
smartphone above the same folded lab test paper from the drawer, taking a
photo of it with the phone camera. The phone screen shows the document being
scanned. MR MINH puts on his glasses, leans in to look at the phone, and for
the first time slowly nods in understanding. Father and son exchange a warm
smile. Camera: two-shot at desk level, then insert close-up of the phone
camera framing the paper. Tender father-son moment, brighter color grade
than Act 2.
```

**SHOT 10 · 0:58–1:06 · Tin nhắn dược sĩ**
```
[STYLE] [MRS LAN]
Morning balcony, soft sunlight. MRS LAN sits in a chair with a cup of tea,
holding her smartphone at arm's length the way older people do. A gentle
notification appears; she reads a friendly chat message on the screen and
smiles warmly, then types a slow reply with one index finger, unhurried and
content. Camera: medium close-up from a slight side angle, soft bokeh of
balcony plants behind her. Feeling of being cared for by someone she trusts.
```

**SHOT 11 · 1:06–1:10 · Cây Sả nhú lá sau buổi chạy**
```
[STYLE] [NAM]
Morning park, just after a run. NAM, sweaty and happy, catches his breath and
opens an app on his phone. Subtle satisfaction spreads across his face — a
small proud smile, a tiny fist pump. Camera: close-up on his face lit by
morning sun, phone held below frame edge (screen replaced in post with real
app recording). Energetic but warm.
```

**SHOT 12 · 1:10–1:14 · Ông Minh đi bộ buổi tối**
```
[STYLE] [MR MINH]
Golden-hour evening in a quiet residential Vietnamese street with trees. MR
MINH walks at an easy comfortable pace, hands relaxed, unhurried — exercising
because he wants to, not because he was told to. He nods hello to a neighbor.
Camera: slow tracking shot from across the street, wide enough to show the
peaceful neighborhood. Liberated, light-hearted tone.
```

**SHOT 13 · 1:14–1:20 · Khu Vườn Gia Đình giữa bàn ăn**
```
[STYLE] [MRS LAN] [MR MINH] [NAM]
Evening dining table after dinner, warm lamp light. A smartphone lies flat in
the center of the table; the family of three lean in around it, looking at
the screen together, pointing and chatting happily. MRS LAN reaches out and
gently touches the phone screen with one fingertip — the same gesture as
touching the leaf in the opening shot. Camera: slow top-down crane move from
overhead angle down to table level, ending close on her fingertip touching
the screen. Screen content replaced in post with the real Family Garden app
recording. Emotional peak of the film — togetherness.
```

### ACT 5 — KẾT

**SHOT 14 · 1:20–1:28 · Ban công, lần này có hai người**
```
[STYLE] [MRS LAN] [MR MINH]
Early morning golden sunlight, the same balcony as the opening shot, same
framing. MRS LAN waters her herb plants. MR MINH steps out onto the balcony
and hands her a cup of warm water; they stand together among the plants in
the sunrise, comfortable silence. Camera: identical slow push-in as Shot 1,
then gentle pan to include both of them. Full-circle visual rhyme with the
opening. Hopeful, golden, serene.
```

**SHOT 15 · 1:28–1:35 · Logo (motion graphic, không gen AI)**
> Logo Long Châu Care nở ra từ hạt mầm + tagline — làm bằng After Effects/Canva, hoặc prompt riêng cho tool motion graphic:
> ```
> Minimal elegant motion graphic on soft cream background: a tiny green seed
> sprouts, grows into a small herb plant, leaves unfold and morph into a
> clean modern logo shape. Warm green and amber palette, smooth organic
> animation, 6 seconds, no text.
> ```
> (Chữ "Long Châu Care" + tagline overlay trong editor để font chuẩn brand.)

---

## 4. Ghi chú kỹ thuật

- **Nhất quán nhân vật**: ưu tiên tool có *character/image reference* (Kling, Runway Gen-4, Veo 3 ingredients). Gen 3 ảnh chân dung trước (mục 2), khóa làm reference. Nếu chỉ có text-to-video: giữ nguyên từng chữ mô tả nhân vật, đừng paraphrase.
- **Màn hình điện thoại**: ĐỪNG để AI gen UI (sẽ ra chữ giả, lỗi). Gen cảnh với màn hình mờ/ngoài khung hình, rồi **comp screen recording thật từ chauthuc.web.app** vào trong editor — vừa thật vừa chứng minh sản phẩm chạy được với giám khảo.
- **Số 142 trên đồng hồ (Shot 4)**: AI thường gen số sai — gen đồng hồ mờ rồi overlay số trong editor.
- **Negative prompt** (nếu tool hỗ trợ): `text, captions, watermark, distorted faces, extra fingers, oversaturated colors, stock-footage look, dramatic acting`.
- **Ghép dựng**: mỗi shot gen dư 1–2 giây để có handle cắt. Nhạc + VO + chữ làm toàn bộ trong editor theo timeline ở `KICH_BAN_VIDEO_CHUNGKET.md`.
- **Thứ tự gen ưu tiên** (nếu giới hạn credits): Shot 7 (cú xoay) → 13 (đỉnh cảm xúc) → 6 (ngăn kéo) → 1/14 (cặp rhyme) → còn lại.
```
