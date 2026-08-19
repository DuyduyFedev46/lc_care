# Plan: Nâng cấp Animation & Nhân vật (Mascot) — LC Care Frontend

> File này dành cho agent khác (hoặc phiên làm việc sau) đọc và thực thi code. Không cần hỏi lại phạm vi — các quyết định dưới đây đã chốt với user.

## Context

Toàn bộ animation trong LC Care hiện là CSS `@keyframes` viết tay + `setTimeout`/state-machine string (`phase`/`mState`), không dùng thư viện animation nào (`frontend/package.json` chỉ có react/firebase/axios/i18next/lucide — không framer-motion/GSAP/rive/lottie). Nhân vật mascot là 5 ảnh WebP raster tĩnh (`/assets/mascot/mascot_*.webp`) đổi qua lại theo state, animate bằng CSS transform.

Vấn đề kỹ thuật cụ thể cần giải quyết:
1. **3 bản mascot trùng lặp, lệch nhau**: `DynamicMascot.jsx` (canonical) và `IsometricGarden.jsx` (dòng 12-14, 215-220) tự khai báo lại y hệt các keyframe `mascotBreath/Sway/Shake/Jump` + bộ keyframe riêng (`sway/pp/wf/fu/mb/sb`) qua `<style>` inline thay vì tái dùng component/keyframe chung.
2. **2-3 đường render cây trùng lặp**: `PlantHero` (`PlantComponents.jsx`), `GardenPlant.jsx`, và logic vẽ cây riêng trong `IsometricGarden.jsx` — chưa hợp nhất.
3. **Không có thư viện animation** → khó làm transition mượt (spring, exit animation, gesture) mà không viết tay hàng trăm dòng keyframe; `taste-skill` (bắt buộc đọc theo `agents.md`) khuyến nghị Motion (Framer Motion) làm mặc định.
4. **`prefers-reduced-motion` chỉ xử lý kiểu tất-cả-hoặc-không** (blanket override trong `global.css`), không graded per-component.
5. Repo `freshtechbro/claudedesignskills` (marketplace plugin Claude Code, xem https://github.com/freshtechbro/claudedesignskills/tree/main/plugins) có các skill hướng dẫn dùng đúng các thư viện animation này (`motion-framer`, `rive-interactive`, `lottie-animations`...). User muốn đưa skill liên quan vào dự án theo đúng cách `.agents/skills/taste-skill` đã làm — copy vào `.agents/skills/`, đăng ký `.agents/skills.json` — **không** chạy `/plugin marketplace add` (lệnh CLI tương tác, user phải tự chạy nếu muốn cách đó).

**Quyết định phạm vi đã chốt với user (không cần hỏi lại):**
- Nhân vật (mascot) sẽ được **vẽ lại thành SVG vector** (giữ đúng phong cách/màu hiện tại làm reference), animate bằng **Framer Motion** variants (idle/entering/watering/celebrating/meditating). **Không dùng Rive** (cần Rive Editor — GUI riêng, ngoài khả năng code) và **không dùng Lottie nguồn ngoài** (lệch thiết kế gốc, vướng license).
- Toàn bộ animation UI khác (screen transitions, garden, onboarding, bottom-sheet, toast...) chuyển dần từ keyframe/setTimeout viết tay sang Framer Motion, tái dùng token đã có (`--dur-*`, `--ease-*` trong `frontend/src/theme/tokens.css`) — không tạo giá trị timing mới tùy tiện.
- Đây là redesign trên codebase có sẵn — phải tuân `agents.md` / `.agents/skills/taste-skill/skills/taste-skill/SKILL.md` (contrast, một accent/radius/theme, `prefers-reduced-motion`), không refactor kiến trúc ngoài phạm vi animation.

---

## Phase 0 — Đưa skill animation vào project

- Copy skill liên quan từ `freshtechbro/claudedesignskills` vào `.agents/skills/` theo đúng pattern đã có với `taste-skill` (`.agents/skills/taste-skill/`): clone/sparse-checkout repo, giữ lại thư mục skill cần dùng:
  - `motion-framer` (React animation — dùng cho toàn bộ upgrade UI motion trong đợt này).
  - Ghi chú rõ trong README nội bộ (hoặc comment ở đầu skill) rằng `rive-interactive`/`lottie-animations` **không** áp dụng cho đợt này (quyết định dùng SVG + Framer Motion tự code) — tránh agent sau hiểu nhầm và đi lạc hướng.
- Đăng ký entry mới trong `.agents/skills.json` (xác nhận cấu trúc thật của repo sau khi clone rồi mới thêm path chính xác, ví dụ dạng `{ "path": "skills/claudedesignskills/plugins/individual/motion-framer/skills" }`).
- Chỉ thêm 1 dòng trỏ tới skill mới trong `.agents/AGENTS.md`, theo đúng format dòng đang có cho taste-skill — không viết lại rule hiện tại.

**Verify:** `.agents/skills/` có thư mục skill mới, `.agents/skills.json` liệt kê đúng path, SKILL.md đọc được.

---

## Phase 1 — Cài Framer Motion, thiết lập nền tảng motion dùng chung

- Thêm dependency `motion` (Framer Motion rebrand, theo khuyến nghị taste-skill) vào `frontend/package.json`.
- Tạo `frontend/src/components/garden/motionVariants.js` chứa các `variants` dùng chung cho mascot (idle/entering/watering/celebrating/meditating) và cho animation lặp lại nhiều nơi (fadeSlideUp, confetti, bottom-sheet), map trực tiếp từ token `--dur-*`/`--ease-*` đã có trong `tokens.css`.
- Dùng `useReducedMotion()` (hook có sẵn của Framer Motion) ở mức component thay cho blanket CSS override — cho phép graded reduced-motion (vd: giữ fade nhưng tắt bounce/scale).

**Verify:** `npm run build` pass, kiểm tra kích thước `dist/` trước/sau không tăng bất thường.

---

## Phase 2 — Vẽ lại mascot thành SVG vector + animate bằng Framer Motion

- File chính: `frontend/src/components/garden/DynamicMascot.jsx` — thay `<img src={webp}>` bằng 1 component SVG duy nhất (`MascotSVG`), giữ đúng màu sắc/phong cách nhận diện hiện tại (dùng 5 ảnh WebP gốc `/assets/mascot/mascot_{idle,waving,watering,celebrating,meditating}.webp` làm reference vẽ path, không đổi bảng màu thương hiệu).
- Thiết kế SVG theo layer để animate từng phần (tay, mắt, thân) bằng Framer Motion variants thay vì swap ảnh + CSS keyframe:
  - `idle`: breathing/sway loop (thay `mascotBreath`/`mascotSway`, dùng spring cho mượt hơn).
  - `entering`: slide-up + fade + overshoot nhẹ (thay `mascotEnter`).
  - `watering`: shake tay (thay `mascotShake`).
  - `celebrating`: jump/squash-stretch (thay `mascotJump`).
  - `meditating`: trạng thái tĩnh nhẹ hiện có trong `IsometricGarden.jsx`/`GardenScreen.jsx`.
- Xoá 2 bản keyframe trùng lặp: khối `<style>` mascot trong `DynamicMascot.jsx` (dòng 37-118) và khối keyframe mascot trong `IsometricGarden.jsx` (dòng 215-220) — thay bằng import `DynamicMascot`/`MascotSVG` dùng chung.
- Cập nhật mọi nơi đang tự vẽ mascot inline (`IsometricGarden.jsx` dòng ~202, phần mascot inline trong `GardenScreen.jsx`) để gọi `DynamicMascot` thay vì `<img>` riêng.
- Không cần giữ `onError` fallback ảnh WebP cho mascot nữa (SVG không phụ thuộc network image).
- Dọn asset thừa: 2 thư mục `mascots/`, `mascots_nobg/` (đã flag "unused, ~9MB" trong `docs/PLANT_ASSET_CONSISTENCY.md`) có thể xoá sau khi xác nhận không còn tham chiếu — **hỏi user trước khi xoá file thật**, không tự ý xoá.

**Verify:** `npm run dev`, xem mascot ở đủ 5 trạng thái tại `WaterScreen`, `GardenScreen`, `GerminationScreen`, `LevelUpScreen`, `IsometricGarden` (`FamilyScreen`) — khớp hành vi cũ, không giật/nháy khi chuyển state; test `prefers-reduced-motion: reduce` trong DevTools.

---

## Phase 3 — Nâng animation toàn màn hình bằng Framer Motion (thay dần keyframe/setTimeout)

Giữ nguyên hành vi UX, chỉ đổi cơ chế implement:
- `WaterScreen.jsx`: thay chuỗi `phase` + `setTimeout` bằng `AnimatePresence`/variants cho `dripFall`, `plantWatered`.
- `GardenScreen.jsx` (~1480 dòng, bề mặt animation lớn nhất): mascot idle/entering/watering/celebrating, chat-bubble cycling, floating "+10" points, bloom pulse, bottom-sheet slide-up — ưu tiên bottom-sheet + mascot trước (rủi ro thấp, giá trị cao), phần còn lại theo sau.
- `GerminationScreen.jsx` / `LevelUpScreen.jsx`: `seedShake→plantSway→plantGrow` và confetti chuyển sang variants + `AnimatePresence` exit.
- `SharedUI.jsx`: toast (`fadeSlideUp`) và nav transitions — đã dùng token `--dur-base`/`--ease-spring`, chỉ đổi cơ chế sang `motion.div`, giữ nguyên giá trị.
- **Không đổi cảm giác chuyển động** của `WaterScreen.jsx` (đã document là "screen-specific keyframe" cố ý trong `docs/RESTYLE_CHANGELOG.md`) — chỉ đổi cách *implement*.
- Hợp nhất render cây: chọn `PlantHero` (`PlantComponents.jsx`) làm implementation chuẩn, refactor `IsometricGarden.jsx`/`GardenPlant.jsx` gọi lại `PlantHero` thay vì tự vẽ.

**Verify:** click-through thủ công toàn bộ garden flow (Garden → Water → Germination → LevelUp → Family/IsometricGarden), 0 console error, `npm run lint` sạch, `npm run build` thành công, so sánh trước/sau bằng mắt để không lệch cảm giác chuyển động.

---

## Việc KHÔNG làm trong đợt này (out of scope, ghi rõ để tránh hiểu nhầm)

- Không tích hợp Rive (`rive-interactive`) — cần Rive Editor (GUI riêng) để tạo `.riv`, ngoài khả năng thực thi qua code.
- Không dùng Lottie nguồn ngoài — lệch thiết kế mascot gốc, rủi ro license.
- Không đổi bộ 80 ảnh WebP cây (`/assets/plants/`) — các lỗi asset đã biết (ginger/lemongrass thiếu mặt cười, licorice lv1, lotus) thuộc `docs/PLANT_ASSET_CONSISTENCY.md`, là việc art riêng, không nằm trong đợt "nâng animation code" này.
- Không refactor kiến trúc/component ngoài phần animation (giữ nguyên convention CSS custom properties, không chuyển Tailwind).

---

## File chính sẽ đụng tới

- `frontend/package.json` (thêm `motion`)
- `.agents/skills.json`, `.agents/skills/` (skill mới)
- `frontend/src/components/garden/DynamicMascot.jsx` (viết lại SVG + Framer)
- `frontend/src/components/garden/IsometricGarden.jsx` (xoá keyframe trùng, gọi `DynamicMascot`/`PlantHero`)
- `frontend/src/components/garden/GardenPlant.jsx` (hợp nhất vào `PlantHero`)
- `frontend/src/components/PlantComponents.jsx` (giữ làm chuẩn)
- `frontend/src/screens/garden/{WaterScreen,GardenScreen,GerminationScreen,LevelUpScreen}.jsx`
- `frontend/src/components/SharedUI.jsx`
- `frontend/src/theme/tokens.css` (đọc, không sửa giá trị — chỉ tái dùng)

## Verify tổng thể cuối đợt

- `npm run build`, `npm run lint`, `npm run scan:vn` sạch.
- Test thủ công 5 trạng thái mascot + toàn bộ garden flow trong browser thật (dùng skill `run` nếu cần) ở cả light/dark mode và `prefers-reduced-motion: reduce`.
- Không tăng đáng kể bundle size do thêm `motion` (kiểm tra `dist/` trước/sau).
