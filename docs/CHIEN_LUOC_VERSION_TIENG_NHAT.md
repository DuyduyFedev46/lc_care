púh 

# Chiến lược: Bản tiếng Nhật cho Demo nước ngoài — Long Châu Care

> Tài liệu chiến lược triển khai bản tiếng Nhật phục vụ buổi demo nước ngoài. Lập 2026-06-21.
> **Nguyên tắc tối thượng: PHỦ 100% — ZERO rò rỉ tiếng Việt.** Giám khảo/khán giả có thể bấm bất kỳ
> đâu ngoài kịch bản (chọn cây khác, mở màn khác, trạng thái khác). Bất kỳ chữ Việt nào lòi ra = lộ = "lỏ".

## Context — Vì sao làm

Sếp cần đem **Long Châu Care** đi demo ở nước ngoài (khán giả Nhật). App hiện 100% tiếng Việt,
**chưa có lớp i18n nào**. Nội dung nằm ở **3 nơi**, không chỉ trong code:

1. **Code Frontend** — ~1.500–1.900 chuỗi hardcode trong ~42 file JSX + `config/constants.js` (**16 cây**),
   `config/achievements.js`.
2. **Code Backend** — `PLANT_GROUPS` G1–G15, label sức khỏe/bệnh/thói quen, achievements, push templates,
   thông báo lỗi, prompt AI, prompt OCR.
3. **Firestore** — `habitCatalog` (thói quen của các nhóm, chỉ G1–G2 hardcode còn lại nạp từ DB),
   `plantGroups`, `diseaseToPlant`, **cộng toàn bộ dữ liệu demo seed** (persona, gia đình, đơn thuốc, lịch...).

→ Nếu chỉ dịch "luồng demo" thì 15 cây còn lại, thói quen trong Firestore, và các trạng thái khác **sẽ lòi
tiếng Việt** khi bị bấm tới. Vì vậy chiến lược này commit **phủ toàn bộ**, có **cơ chế dò sót tự động**.

### Quyết định đã chốt (từ trao đổi với sếp)

- **Phạm vi**: FE-centric. Site JP riêng (`/jp`), **backend giữ nguyên** (chỉ thêm additive), trọng tâm đổi
  từ ngữ FE — **NHƯNG phủ 100%, không sót cây/màn/chi tiết nào**.
- **Chủ đề cây**: Giữ thảo dược, đặt tên tiếng Nhật + lồng tinh thần **Kampo (漢方)**. Không đổi asset/mascot.
- **Thời gian**: **1 tháng+** → đủ làm full coverage + dịch prompt AI + QA dò sót.
- **AI khi demo**: Chạy live tiếng Nhật (kèm snapshot dự phòng chống rủi ro sân khấu).

> **Điều hòa "backend giữ nguyên" + "AI live tiếng Nhật":** backend chỉ **thêm (additive)** prompt `ja` +
> tham số `lang` (mặc định `vi`) → luồng tiếng Việt production **không đổi byte nào**.

---

## Kiến trúc giải pháp

- **1 codebase**, lớp i18n, dictionary `vi.json` / `ja.json`.
- Site JP build `VITE_DEFAULT_LANG=ja` → Firebase Hosting site mới `chauthuc-jp` (`chauthuc-jp.web.app`).
  Site VN `chauthuc.web.app` giữ nguyên, zero-risk. Toggle ngôn ngữ nhỏ ở Profile.
- Backend thêm prompt `ja` + thread `lang` từ API. Mặc định `vi`.
- **Firestore JP**: dùng project/namespace seed riêng cho bản JP (collection nội dung + dữ liệu demo bằng
  tiếng Nhật), KHÔNG đụng dữ liệu VN.

```
chauthuc.web.app   (VN, giữ nguyên)  ─┐
                                       ├─ cùng codebase, khác VITE_DEFAULT_LANG + Firestore seed
chauthuc-jp.web.app (JA, mới)        ─┘
        └─ API ?lang=ja ─→ backend (prompt ja, additive) ─→ Firestore (nội dung JP)
```

---

## 📋 BẢNG KIỂM KÊ TOÀN BỘ (Definition of Done = mọi ô đều ✅ tiếng Nhật)

### 1. Frontend — 16 CÂY trong `config/constants.js` `PLANTS_DATA`

Mỗi cây có **5 trường chữ** phải dịch: `name`, `journeyLabel`, `story`, `whyThisPlant`, `conditionVerifiedBy`
(tên dược sĩ). Đề xuất tên + góc Kampo:

| #  | id          | Việt                | Nhật (đề xuất) | journeyLabel                           | Ghi chú                          |
| -- | ----------- | -------------------- | ------------------ | -------------------------------------- | --------------------------------- |
| 1  | ginger      | Cây Gừng           | ショウガ (生姜)    | Chăm sóc sức khỏe → 健康ケア      | Kampo core                        |
| 2  | turmeric    | Cây Nghệ           | ウコン             | Theo dõi chỉ số → 数値モニタリング |                                   |
| 3  | lemongrass  | Cây Sả             | レモングラス       | Phòng ngừa → 予防                   |                                   |
| 4  | pennywort   | Cây Rau Má         | ツボクサ           | Khám định kỳ → 定期健診           |                                   |
| 5  | lotus       | Cây Hoa Sen         | 蓮 (はす)          | Thai sản → 妊娠・出産                |                                   |
| 6  | perilla     | Cây Tía Tô        | シソ (紫蘇)        | Nhi khoa → 小児ケア                   | **bản địa Nhật — wow** |
| 7  | tea         | Cây Lá Trà        | 緑茶 / お茶        | Tuân thủ dài hạn → 長期服薬       | cộng hưởng VH Nhật            |
| 8  | mint        | Cây Bạc Hà        | ハッカ / ミント    | Sức khỏe nền tảng → 基礎健康      |                                   |
| 9  | basil       | Cây Húng Quế      | バジル             | Dinh dưỡng → 栄養                   |                                   |
| 10 | aloe        | Cây Lô Hội        | アロエ             | Da liễu, Dị ứng → 皮膚・アレルギー |                                   |
| 11 | licorice    | Cây Cam Thảo       | カンゾウ (甘草)    | Điều trị đa khoa → 総合ケア       | Kampo core                        |
| 12 | bittermelon | Cây Khổ Qua        | ゴーヤ             | Chuyển hóa → 代謝                   | quen ở Okinawa                   |
| 13 | lavender    | Cây Oải Hương    | ラベンダー         | Thần kinh → 神経・メンタル           |                                   |
| 14 | ginseng     | Cây Nhân Sâm      | 高麗人参           | Phục hồi → 回復                     | Kampo core                        |
| 15 | eucommia    | Cây Đỗ Trọng     | トチュウ (杜仲)    | Xương khớp → 骨・関節              | 杜仲茶 quen ở Nhật              |
| 16 | phyllanthus | Cây Diệp Hạ Châu | コミカンソウ       | Tiêu hóa / Gan → 消化・肝臓         |                                   |

- **`story` + `whyThisPlant`** của cả 16 cây (mỗi cây 2 câu) → phải dịch hết (hiện trên màn chọn cây & chi tiết cây).
- **`stageNames`** (6 giai đoạn, dùng chung): 承認待ち / 芽 / 若木 / 成長 / つぼみ / 開花.
- **`conditionVerifiedBy`** tên DS Việt ("DS Nguyễn Thị Lan", "DS Trần Thị Hoa", "DS Lê Văn Minh") → tên dược sĩ Nhật.

### 2. Frontend — các bảng dữ liệu khác trong `constants.js` / `achievements.js`

- `BADGES` (4): tên + desc ("Mầm Xanh — 7 ngày streak"...).
- `VOUCHERS` (3): desc + **giá VND → ¥** ("Giảm 50.000đ", value "-50k").
- `CONDITION_SOURCE_TYPES` (5): chứa "VNeID (liên thông Bộ Y tế)", "Trạm y tế phường" — **NGOÀI phạm vi
  demo → để nguyên tiếng Việt** (xem mục "Ngoài phạm vi" bên dưới). Cho vào allowlist của trình quét rò rỉ.
- `PLANT_STATUS` (4): Chờ duyệt/Đang lớn/Tạm dừng/Tốt nghiệp → 承認待ち/成長中/休止/卒業.
- `achievements.js`: toàn bộ title + desc của achievement/quest.

### 3. Frontend — TẤT CẢ màn & component (không sót màn nào)

Mẫu lặp: thay literal Việt → `t('key')`. Phủ hết:
`screens/onboarding/*`, `garden/*` (Garden, Water, Germination, LevelUp), `family/*` (Family, Calendar,
OrderFor), `health/*`, `pharmacist/*`, `voucher/*`, `careplan/*`, `profile/*`, `achievements/*`, `auth/*`;
`components/*` (SharedUI bottom-nav, ui/*, garden/*, onboarding/*, HealthMetrics, HealthSummaryBoard...);
`App.jsx` (loading/error). + Format locale: ngày (`ja-JP`, thứ 日/月/火...), tiền (`¥`), lời chào theo giờ
(おはよう/こんにちは/こんばんは).

### 4. Backend (additive — `lang` default `vi`)

- `PLANT_GROUPS` G1–G15 labels (onboarding/service.py).
- Label sức khỏe/bệnh/thói quen/loại giấy tờ (onboarding/service.py): healthy/monitoring/chronic...;
  Tiểu đường/Huyết áp/Mỡ máu...; Hay thức khuya/Rượu bia...; Đơn thuốc/Xét nghiệm/Sổ khám...
- `achievements_catalog.py` (title/desc achievement + quest).
- `notification/service.py` `TEMPLATES` (5 push) → bản `ja`.
- Thông báo lỗi API: family/service.py, upload/router.py...
- Pharmacist labels (Vừa xong/X phút trước/Hôm qua/Chờ duyệt...).
- `prompts/ja/*.txt` (10 prompt) + `prompt_manager.py` nhận `lang`.
- `upload/service.py` prompt OCR `ja`.

### 5. Firestore — NỘI DUNG + DỮ LIỆU DEMO (seed JP riêng)

- **Catalog dùng chung**: `habitCatalog` (**thói quen của CẢ 15 nhóm** — phần lớn chỉ có trong Firestore, không
  có trong code!), `plantGroups`, `diseaseToPlant`.
- **Dữ liệu demo seed** (`seed_firestore_ja.py`): `users/.../profile` (Nguyễn Thị Mai → 田中花子),
  `healthConditions`, `carePlans` (tên thuốc/giờ uống), `loyaltySummary`, `purchases` (tên thuốc, "2 tháng/lần"),
  `families` ("Gia đình Mai"), `familyMembers` (tên + quan hệ Chồng/Con gái → 夫/娘), `pharmacistQueue`,
  `familyCalendars` (thứ T2–CN + nhãn sự kiện), `insights`.

### 6. AI prompt (10 file) — bản `ja`, đổi chỉ thị "trả lời tiếng Nhật" + danh sách từ y khoa cấm sang JP.

---

## 🚫 NGOÀI phạm vi demo — để nguyên tiếng Việt (đã chốt)

Những thứ này **không xuất hiện trong luồng demo**, nên **giữ nguyên tiếng Việt, KHÔNG dịch, KHÔNG đụng**.
Đưa vào **allowlist** của trình quét rò rỉ để không báo lỗi nhầm:

- **VNeID / "Bộ Y tế" / "Trạm y tế phường"** (token định danh & y tế VN) — để yên.
- **Tham chiếu pháp lý VN** (Luật Khám chữa bệnh 2023, Nghị định 13..., các file `docs/legal-*`) — để yên.

> Vẫn ĐỔI sang Nhật vì nằm trong luồng demo: **tên dược sĩ/khách hàng/gia đình** → tên Nhật
> (田中花子, 夫=chồng, 娘=con gái...), và **đơn vị tiền VND (đ/k) → ¥** ở voucher + đơn thuốc.

---

## 🛡️ CƠ CHẾ "ZERO RÒ RỈ" (chống bug khi bị test ngoài kịch bản) — phần quan trọng nhất

1. **i18next bắt missing-key cứng.** Bật `saveMissing` + `missingKeyHandler` để **mọi key chưa dịch ném
   cảnh báo/đỏ ngay khi render** (chế độ dev/staging). Đặt `returnEmptyString:false`, fallback hiển thị
   `⚠️MISSING:key` để QA thấy ngay thay vì âm thầm rỗng.
2. **Trình quét rò rỉ tự động (CI gate).** Script regex tìm ký tự **chỉ có ở tiếng Việt**
   (`[ăâđêôơưĂÂĐÊÔƠƯ àáảãạ èéẻẽẹ ìíỉĩị òóỏõọ ùúủũụ ỳýỷỹỵ]` + dấu thanh) trong:
   (a) bundle build của site JP, (b) DOM đã render khi crawl tự động mọi route, (c) response API khi `lang=ja`,
   (d) seed Firestore JP. Có hit → **fail build**. Đây là lưới an toàn chính.
   **Allowlist**: bỏ qua các chuỗi cố tình giữ tiếng Việt ngoài phạm vi demo (VNeID/Bộ Y tế/Trạm y tế phường,
   tham chiếu pháp lý) — khai báo danh sách key/route được miễn để scanner không báo nhầm.
3. **Crawl tự động mọi màn × mọi trạng thái** (Playwright): đi qua **cả 16 cây** (chọn từng cây → xem
   garden/chi tiết/story/whyThisPlant/thói quen/giai đoạn), **mọi tab**, **mọi plantStatus**
   (pending/growing/paused/graduated), state loading/empty/error, voucher redeem, pharmacist queue, tưới hộ,
   calendar. Chụp screenshot từng màn để soát mắt.
4. **Checklist QA thủ công** cuối cùng (in ra, tick tay): 16 cây × 5 trường, 4 badge, 3 voucher, 5 nguồn điều kiện,
   toàn bộ achievement/quest, 5 push, tất cả thông báo lỗi, format ngày/tiền/giờ.
5. **Native review.** `ja.json` + seed JP nên có người bản ngữ/biên dịch rà trước demo (chất lượng, không chỉ
   đủ).

---

## Lộ trình 4 tuần (1 tháng+)

- **Tuần 1 — Hạ tầng + lưới an toàn:** lớp i18n (react-i18next) + `AppContext.language` + Noto Sans JP; site
  Firebase `chauthuc-jp`; **dựng trình quét rò rỉ + missing-key handler ngay từ đầu**; formatter locale.
- **Tuần 2 — Phủ toàn bộ chữ:** tách & dịch **16 cây** + badges/vouchers(¥)/status/achievements + tất cả màn
  & component; backend prompt `ja` + `lang` param + labels G1–G15 + push JP; trung tính hóa token VN.
- **Tuần 3 — Firestore + AI + dữ liệu demo:** `seed_firestore_ja.py` (catalog 15 nhóm + dữ liệu demo JP);
  thông luồng AI live JP (Onboarding + OCR) + đơn thuốc mẫu JP; chạy crawl tự động lần 1, sửa sót.
- **Tuần 4 — Hardening:** snapshot dự phòng AI; crawl + checklist QA toàn bộ 16 cây/mọi trạng thái; native
  review; tổng duyệt trên mạng giống venue; buffer.

---

## File chính sẽ đụng

**FE:** `index.html` (+Noto Sans JP), `src/main.jsx` (i18next), `context/AppContext.jsx` (`language`),
`locales/{vi,ja}.json` (mới), `theme/tokens.css`, `config/constants.js` (**16 cây**) + `config/achievements.js`,
toàn bộ `screens/*` + `components/*`, `firebase.json` + `.firebaserc` (target `chauthuc-jp`).
**BE (additive):** `ai/prompt_manager.py`, `ai/prompts/ja/*.txt` (mới), `services/onboarding/service.py` (labels),
`services/garden/achievements_catalog.py`, `services/notification/service.py`, `services/upload/service.py`,
`services/family/service.py`, `services/pharmacist/service.py`, `scripts/seed_firestore_ja.py` (mới),
`example_data/` (+đơn thuốc mẫu JP).
**Tooling mới:** script quét rò rỉ tiếng Việt + crawl Playwright (đặt ở `frontend/scripts/` hoặc `scripts/`).

---

## Cách kiểm thử (verification)

1. `cd frontend && VITE_DEFAULT_LANG=ja npm run dev` → đi hết **16 cây** + mọi tab + mọi trạng thái, không thấy
   chữ Việt, không thấy `⚠️MISSING`, glyph Noto Sans JP đúng, layout không vỡ.
2. Chạy **trình quét rò rỉ** trên bundle + DOM crawl + API + seed → 0 hit tiếng Việt (CI xanh).
3. Đi 5 bước kịch bản (`docs/demo_presentation_playbook.md`) bằng tiếng Nhật.
4. AI live JP: backend + `seed_firestore_ja.py` → quét đơn thuốc mẫu JP → tóm tắt onboarding + OCR ra tiếng
   Nhật; tắt mạng thử → snapshot dự phòng vẫn hiện.
5. Tưới hộ (Bước 3) → push tiếng Nhật trên máy 2.
6. Format: ngày 2026年6月21日, tiền ¥, lời chào theo giờ.
7. Không hồi quy VN: `chauthuc.web.app` (vi) không đổi gì.

---

## Rủi ro & giảm thiểu

| Rủi ro                                                  | Giảm thiểu                                                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Sót chữ Việt ở cây/màn ngoài kịch bản** | i18next missing-key + trình quét rò rỉ CI + crawl 16 cây/mọi trạng thái (mục 🛡️)     |
| Nội dung ẩn trong Firestore không được dịch       | Seed JP phủ`habitCatalog` 15 nhóm + plantGroups + diseaseToPlant + toàn bộ dữ liệu demo |
| AI live lỗi/chậm trên sân khấu                      | Snapshot seed sẵn + pre-warm + 4G backup                                                       |
| Font JP rơi về hệ thống, xấu                        | Noto Sans JP bắt buộc (Be Vietnam Pro KHÔNG có glyph Nhật)                                 |
| Text JP dài/ngắn vỡ layout                            | Review wrap/truncate tuần 4                                                                    |
| VNeID/Bộ Y tế/pháp lý VN lọt vào demo              | Ngoài phạm vi → để nguyên + allowlist; tên & tiền vẫn đổi sang JP                    |
| Đụng nhầm luồng VN production                        | Backend additive (`lang` vi) + site & Firestore JP tách riêng                               |
| Dịch máy kém tự nhiên                               | Native review`ja.json` + seed trước demo                                                    |

```

---

## Fix Log — 2026-06-24

### Root cause (đã xác minh)

| # | Vấn đề | Root cause |
|---|---|---|
| 1 | `chauthuc-jp.web.app` hiển thị tiếng Việt | Cả 2 site dùng chung `dist/` (firebase.json). `VITE_DEFAULT_LANG` không set ở `.env` nào; `package.json` không có script `build:jp` → build luôn ra default `vi`. |
| 2 | AI habits/summary trả tiếng Việt dù user chọn Nhật | `OnboardingSubmitRequest` (Pydantic) không khai báo field `lang` → bị strip khỏi `request.dict()` → `data.get("lang","vi")` luôn ra `"vi"`. |
| 3 | AI habits sau pharmacist duyệt luôn tiếng Việt | `pharmacist/service.py:140` gọi `CarePlanService.generate_habits(...)` không truyền `lang` → không đọc profile đã lưu. |

### Cơ chế fix

**Frontend — hostname detection (1 build, 2 site)**

Thay vì cần 2 build riêng, sử dụng hostname detection runtime:

```js
// frontend/src/i18n.js
export function resolveInitialLang() {
  const stored = localStorage.getItem('lc_lang') || null;          // user choice
  const byHost = window.location.hostname.includes('chauthuc-jp')  // site JP
    ? 'ja' : null;
  return stored || byHost || import.meta.env.VITE_DEFAULT_LANG || 'vi';
}
```

- Ưu tiên: `localStorage.lc_lang` → hostname → env → `'vi'`
- `localStorage` là per-origin → 2 site không lẫn lựa chọn nhau
- Khách lạ (localStorage rỗng) → hostname quyết định → site JP luôn ra `ja`
- 1 `dist/` dùng cho cả 2 → không thể deploy nhầm build

**Backend — lang pass-through (additive, an toàn)**

```python
# router.py — mở khoá field lang
class OnboardingSubmitRequest(BaseModel):
    ...
    lang: str = Field(default="vi", max_length=5)  # ← thêm

# service.py — persist để pharmacist path đọc lại
user_ref.collection("profile").document("info").set({
    **profile,
    "lang": lang,           # ← thêm
    "createdAt": ...,
}, merge=True)

# pharmacist/service.py:140 — đọc từ profile đã fetch sẵn
habits = CarePlanService.generate_habits(
    user_id, plant_group, profile,
    lang=profile.get("lang", "vi")   # ← thêm
)
```

Mặc định `"vi"` → luồng VN production không bị ảnh hưởng.

### Files đã sửa

| File                                       | Thay đổi                                                                                   |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `frontend/src/i18n.js`                   | +`export function resolveInitialLang()` (hostname detection), dùng cho `lng`            |
| `frontend/src/context/AppContext.jsx`    | import + dùng`resolveInitialLang()` ở `INITIAL_STATE.language` và mount `useEffect` |
| `backend/services/onboarding/router.py`  | + field`lang: str = Field(default="vi")` vào `OnboardingSubmitRequest`                  |
| `backend/services/onboarding/service.py` | +`"lang": lang` persist vào `profile/info` doc                                          |
| `backend/services/pharmacist/service.py` | +`lang=profile.get("lang","vi")` truyền vào `generate_habits`                          |

### Deploy 2026-06-24

- `npm run build` → `dist/` mới (1 build)
- `firebase deploy --only hosting:jp,hosting:vi --project chauthuc` → ✅ cả 2 site live
- Backend: cần deploy lên Cloud Run `lc-care-api` (3 file backend đã sửa)

### Ngoài phạm vi đợt này

- Localize Firestore content (`habitCatalog/plantGroups` field `_ja`)
- `seed_firestore_ja.py`: persona/đơn thuốc/lịch demo tiếng Nhật
- Quy đổi ¥, polish 敬語 mascot
