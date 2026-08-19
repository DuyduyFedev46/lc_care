# Đồng bộ ảnh 16 cây theo level — Audit, Spec & Shot-list

> Tài liệu chuẩn hoá bộ ảnh "cây trưởng thành theo level" của LC_Care. Dùng để
> render lại các ảnh bất đồng bộ và kiểm tra (QA) trước/sau bằng
> `scripts/plant_asset_audit.py`.

- **Vị trí ảnh:** `frontend/public/assets/plants/plant_{id}_lv{1..5}.webp`
  (mirror `frontend/dist/...` là build output, đã gitignore — rebuild để cập nhật).
- **Render:** `PlantHero` trong `frontend/src/components/PlantComponents.jsx`
  (dynamic path, có prop `hidePot`); `GardenPlant.jsx` dùng lv5; `FamilyScreen.jsx` dùng theo level.
- **Quy mô:** 16 cây × 5 level = **80 ảnh**.
- **Contact sheet bằng chứng:** [`assets/plant-audit/montage_part1.png`](assets/plant-audit/montage_part1.png),
  [`assets/plant-audit/montage_part2.png`](assets/plant-audit/montage_part2.png) (nền caro để thấy độ trong suốt).

---

## 1. Kết quả audit

### Đồng bộ ✓ (không cần sửa)
- Đủ **80/80** file, không thiếu/không dư. Tất cả `.webp`, tất cả **1024×1024**.
- **Nền trong suốt** (alpha) ở cả 80 ảnh — không ảnh nào có nền đặc baked-in.
- **Baseline** (lề đáy) ~6–8% ở hầu hết ảnh; căn giữa ngang tốt (lệch tâm ~0%).
- **Đường cong scale** lv1→lv5 ≈ 64% → 78% → 84% → 85% → 86% chiều cao, đồng đều giữa các cây (growth có chủ ý).
- **Không ảnh nào bị cắt đầu** — cây bụi cao (basil/mint/pennywort/lemongrass lv4) vẫn còn headroom.

### Bất đồng bộ ✗ (cần sửa)
| Cây | Vấn đề | Bằng chứng |
|-----|--------|-----------|
| **ginger** | Chậu **không có mặt cười** (lv1–4); lv1–2 chậu to/rộng & trôi cao; lv1 là chậu trơn cỡ lớn thay vì mầm | W lv1≈59% (vs ~45%), baseline lv2≈14% (vs ~7%) |
| **lemongrass** | Chậu **không có mặt cười** (lv3–5) | contact sheet |
| **licorice** | **lv1 quá to** (đã là cây trưởng thành, đáng lẽ là mầm) + dùng **chậu hoạ tiết cầu kỳ** khác chuẩn | H lv1=86% (vs ~64%), file 459KB outlier |
| **lotus** | Là **bồn nước thuỷ sinh** (không chậu, không mặt cười, scale thấp/trôi) — sẽ vẽ lại thành chậu | H lv1=45%, baseline lv1=23% |

### Ghi nhận — NGOÀI phạm vi đợt này
- Một số chậu lv5 **in chữ chết vào ảnh** (vd `aloe lv5`, `licorice lv5` = "Cam Thảo") → không dịch được, bất lợi cho bản tiếng Nhật/i18n. *(Khi vẽ lại licorice lv5 cho mục 3, khuyến nghị không in chữ.)*
- `eucommia` lv3–4 chậu bonsai thấp nhưng **vẫn có mặt cười** → chấp nhận.

---

## 2. Canonical spec (chuẩn cho 1 ảnh cây)

| Thuộc tính | Chuẩn |
|-----------|-------|
| Định dạng | WebP, **1024×1024**, nền **trong suốt** (alpha) |
| Cấm | **Không** chữ/watermark; không shadow chạm mép khung; không nền đặc |
| Chậu lv1–lv4 | **Terracotta + mặt cười kawaii** (2 mắt chấm + miệng cười) |
| Chậu lv5 | **Chậu trang trí nhiều màu** ("tốt nghiệp") **vẫn có cùng mặt cười** |
| Bố cục | Căn giữa; đáy chậu sát đáy khung; **lề đáy 6–8%**; lệch tâm ngang ~0%; còn headroom trên |
| lv1 | **Luôn là mầm nhỏ**, không phải cây trưởng thành |

**Đường cong scale** (chiều cao nội dung / canvas 1024):

| Level | Giai đoạn | Chiều cao mục tiêu |
|-------|-----------|--------------------|
| lv1 | Mầm non | ~60–66% |
| lv2 | Cây non | ~76–80% |
| lv3 | Trưởng thành | ~83–86% |
| lv4 | Sum suê / ra nụ | ~84–88% |
| lv5 | Nở hoa (chậu trang trí) | ~84–88% |

---

## 3. Prompt tái tạo (base template)

Thay `[...]` cho từng ảnh. Giữ nguyên phong cách để đồng bộ với 12 cây đã đạt chuẩn.

```
Kawaii flat children's-app illustration of a potted [CÂY] at [STAGE] stage.
Pot = [POT]. Plant centered, sitting at the bottom of the frame with small even
margins, plenty of headroom; content fills about [HEIGHT]% of the frame height.
Soft cel-shaded style with clean vector-like shapes, matching a cohesive set of
cute potted-plant illustrations.
Fully transparent background, 1024x1024, no text, no watermark, no shadow touching the edges.
```

- `[POT]` lv1–4 = `a terracotta pot with a cute smiling kawaii face (two small dot eyes and a gentle smile)`
- `[POT]` lv5 = `a colorful decorative ceramic pot with the same cute smiling kawaii face`
- `[STAGE]` / `[HEIGHT]`: lv1 = `tiny sprout` / `62`, lv2 = `young seedling` / `78`, lv3 = `established plant` / `84`, lv4 = `lush mature plant` / `86`, lv5 = `peak/flowering plant` / `86`.

---

## 4. Shot-list — ảnh cần render lại (≈18 ảnh)

Tên file giữ nguyên, đè vào `frontend/public/assets/plants/`.

### ginger — thêm mặt cười + sửa scale lv1–2
| File | Việc | Mục tiêu |
|------|------|----------|
| `plant_ginger_lv1.webp` | Vẽ lại: **mầm gừng nhỏ** trong chậu terracotta **có mặt cười** | H~62%, baseline ~7% |
| `plant_ginger_lv2.webp` | Chậu terracotta **có mặt cười**; hạ baseline | H~78%, baseline ~7% |
| `plant_ginger_lv3.webp` | Chậu terracotta **có mặt cười** | H~84% |
| `plant_ginger_lv4.webp` | Chậu terracotta **có mặt cười** | H~86% |
| `plant_ginger_lv5.webp` | **Kiểm tra**: nếu chậu trang trí thiếu mặt cười thì thêm | H~86% |

### lemongrass — thêm mặt cười lv3–5
| File | Việc | Mục tiêu |
|------|------|----------|
| `plant_lemongrass_lv3.webp` | Chậu terracotta **có mặt cười** | H~84% |
| `plant_lemongrass_lv4.webp` | Chậu terracotta **có mặt cười** | H~86% |
| `plant_lemongrass_lv5.webp` | Chậu trang trí **có mặt cười** | H~86% |

### licorice — lv1 thành mầm + đồng bộ kiểu chậu
| File | Việc | Mục tiêu |
|------|------|----------|
| `plant_licorice_lv1.webp` | Vẽ lại **mầm cam thảo nhỏ**, chậu terracotta chuẩn có mặt cười (bỏ chậu hoạ tiết) | H~62% (đang 86%) |
| `plant_licorice_lv2.webp` | Chuẩn terracotta có mặt cười | H~78% |
| `plant_licorice_lv3.webp` | Chuẩn terracotta có mặt cười | H~84% |
| `plant_licorice_lv4.webp` | Chuẩn terracotta có mặt cười | H~86% |
| `plant_licorice_lv5.webp` | Chậu trang trí có mặt cười, **khuyến nghị không in chữ** | H~86% |

### lotus — chuyển từ bồn nước → cây trong chậu
| File | Việc | Mục tiêu |
|------|------|----------|
| `plant_lotus_lv1.webp` | Vẽ lại **mầm sen nhỏ** trong chậu terracotta có mặt cười | H~62%, baseline ~7% (đang 45%/23%) |
| `plant_lotus_lv2.webp` | Cây sen non, chậu terracotta có mặt cười | H~78% |
| `plant_lotus_lv3.webp` | Chậu terracotta có mặt cười | H~84% |
| `plant_lotus_lv4.webp` | Chậu terracotta có mặt cười | H~86% |
| `plant_lotus_lv5.webp` | Sen **nở hoa**, chậu trang trí có mặt cười | H~86% |

---

## 5. Quy trình QA bằng `scripts/plant_asset_audit.py`

```bash
# Báo cáo geometry (bbox table + outliers) + dựng lại contact sheet:
python3 scripts/plant_asset_audit.py            # = report + montage
python3 scripts/plant_asset_audit.py report
python3 scripts/plant_asset_audit.py montage    # -> docs/assets/plant-audit/

# Cổng kiểm (PASS/FAIL) so với spec — chạy SAU khi render lại:
python3 scripts/plant_asset_audit.py verify
```

`verify` hiện báo **FAIL** đúng 3 outlier hình học cần sửa: `licorice lv1`,
`lotus lv1`, `lotus lv2`. Sau khi render lại đúng spec, mục tiêu là **PASS**.
(Lưu ý: `verify` chỉ bắt được lỗi *hình học* — phần mặt cười/chữ phải soi mắt
trên contact sheet.)

### Sau khi có ảnh mới
1. Đè ảnh vào `frontend/public/assets/plants/` (đúng tên cũ).
2. `python3 scripts/plant_asset_audit.py verify` → PASS.
3. Soi lại contact sheet: 16/16 cây có mặt cười (lv1–4), lv1 đều là mầm, lotus đã thành chậu.
4. **Rebuild frontend** để cập nhật `dist/`.
5. Chạy app, kiểm `PlantHero` / Garden / Family ở nhiều cây × nhiều level.

---

## Phụ lục — Ảnh KHÔNG còn dùng (chỉ liệt kê, KHÔNG xoá)

Quét `frontend/public/assets` (316 ảnh) đối chiếu 74 file source. ~90 ảnh không
còn tham chiếu, ~20.5 MB. **Không có tham chiếu gãy** (mọi ảnh code gọi đều tồn tại).

| Nhóm | Đường dẫn | Số file | Dung lượng | Ghi chú |
|------|-----------|--------:|-----------:|---------|
| Sprite số cũ | `frontend/public/assets/icons/sliced/` (avatar_/badge_/nav_/plant_0-6/ui_/voucher_) | 60 | 7.9 MB | Code dùng icon đặt tên (avatar_mom, nav_home...) |
| Mascot PNG thừa | `frontend/public/assets/mascots/`, `mascots_nobg/` (bản `.png`) | 10 | 9.1 MB | Code chỉ dùng `.webp` |
| Background cũ | `bg3_garden_home.png`; `backgrounds/bg_family_garden.png`; `backgrounds/bg_voucher_shop.png` | 3 | 2.9 MB | v3 cũ / bản PNG / không tham chiếu |
| Trùng định dạng (optional) | `favicon-*.webp`, `apple-touch-icon.webp`, `app_logo.png`, `bg_panel0_login.webp` | ~7 | ~0.8 MB | Bản còn dùng là định dạng khác |
| Dữ liệu mẫu | `example_data/image.png`, `ke-don-9w.jpg` | 2 | ~0.58 MB | Test/sample |

**Đã xác nhận CÒN dùng (không đụng):** 80 ảnh level cây, 16 icon cây
`plant_*.webp`, các `ui_*.webp`, mascot `.webp`, avatar/badge/nav/voucher đặt tên,
`bg2_garden_home_v2.png`, `bg_family_garden.webp`, background onboarding, favicon/app_logo bản đang dùng.
