│ Plan: UI Hardening Pass — LC Care Frontend (kỹ thuật đúng, không lỗi/vỡ)                       │
│                                                                                                │
│ Context                                                                                        │
│                                                                                                │
│ agents.md (repo root) bắt buộc mọi task Frontend/UI/PWA/CSS phải đọc và áp dụng                │
│ .agents/skills/taste-skill/skills/taste-skill/SKILL.md trước khi làm. Lịch sử git gần đây      │
│ cho thấy đợt cải tiến UI trước giờ mang tính phản ứng (reactive): sửa từng bug khi bị phát     │
│ hiện — render crash ở CarePlanScreen (ReferenceError: plan is not defined), rò rỉ tiếng        │
│ Việt trong bản JP, aria/alt thiếu, asset cây không nhất quán. Hai audit đã có sẵn              │
│ (docs/RESTYLE_CHANGELOG.md, docs/PLANT_ASSET_CONSISTENCY.md) đều liệt kê rõ các mục            │
│ "còn lại / ngoài phạm vi đợt này" nhưng chưa được đóng.                                        │
│                                                                                                │
│ Mục tiêu đợt này: chuyển từ vá lỗi bị động sang một lượt càn (sweep) chủ động, có checklist,   │
│ đóng hết các mục tồn đọng đã biết + bắt các lỗi render/crash chưa được phát hiện — đúng tinh   │
│ thần "đúng kỹ thuật, không lỗi/vỡ" mà user yêu cầu, dùng taste-skill làm khung quy trình bắt   │
│ buộc (đọc brief → audit trước khi sửa → Pre-Flight Checklist trước khi coi là xong — §11 và    │
│ §14 của SKILL.md).                                                                             │
│                                                                                                │
│ Lưu ý về phạm vi của taste-skill: SKILL.md tự nhậg/marketing      │
│ page, không phải dashboard/product UI dày đặc như các screen của LC Care (Garden, CarePlan,    │
│ Health Tracking...). Vì agents.md vẫn bắt buộc dù đợt này áp      │
│ dụng nó theo hướng: lấy Design Engineering Directives (contrast, spacing, motion, aria,        │
│ one-accent/one-radius/one-theme) và Pre-Flight Ch chất lượng      │
│ bắt buộc, còn các rule đặc thù landing page (hero copy ≤2 dòng, CTA, hero padding...) đánh dấu │
│ N/A cho các màn hình app. Cách tiếp cận tổng thể a" ở §11, vì đây │
│ là redesign trên codebase có sẵn chứ không phải làm mới.                                       │
│                                                                   │
│ Phạm vi đã chốt với user (all-in): quét crash/lỗi render toàn bộ 19 screen, dọn nợ             │
│ design-token, accessibility pass, và asset shot-lnt tối thiểu     │
│ làm cổng chặn lỗi.                                                                             │
│                                                                   │
│ ---                                                                                            │
│ Phase 0 — Tooling gate (ESLint tối thiểu)                         │
│                                                                                                │
│ Hiện frontend/package.json không có lint/typechecild/preview      │
│ - scan:vn). Đây là lý do bug kiểu ReferenceError ở CarePlanScreen lọt tới runtime.             │
│                                                                   │
│ - Thêm devDependencies: eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh,        │
│ @eslint/js, globals (flat config, tương thích Vit                 │
│ - Tạo frontend/eslint.config.js: bật no-undef, no-unused-vars,                                 │
│ react-hooks/rules-of-hooks (error), react-hooks/e ép              │
│ reformat toàn bộ code, không bật rule style/format.                                            │
│ - Thêm script "lint": "eslint src" vào frontend/p                 │
│ - Chạy npm run lint ngay để lấy baseline lỗi — danh sách này là input cho Phase 1.             │
│                                                                   │
│ Verify: npm run lint chạy được, output baseline được ghi lại để đối chiếu ở Phase 1.           │
│                                                                   │
│ ---                                                                                            │
│ Phase 1 — Quét crash/lỗi render toàn bộ 19 screen                 │
│                                                                                                │
│ Danh sách cần đi qua (từ frontend/src/screens/):                  │
│ (WelcomeStep, PlantSelectStep, HealthScanStep, HabitsStep, SeedPlantedStep, và 2               │
│ bước không nằm trong flow chính nhưng còn code — gStep) →         │
│ CarePlanScreen → Garden (GardenScreen, GerminationScreen, WaterScreen,                         │
│ LevelUpScreen) → FamilyScreen/CalendarScreen/Ordereen             │
│ → AchievementsScreen → VoucherScreen → ProfileScreen → PharmacistScreen.                       │
│                                                                   │
│ - Chạy npm run dev, mở từng screen trong browser thật (dùng skill run nếu cần), theo dõi       │
│ DevTools console — bắt mọi error/warning (không c                 │
│ - Đối chiếu song song với output ESLint từ Phase 0 (đặc biệt no-undef và                       │
│ rules-of-hooks — đúng loại lỗi từng gây crash Car                 │
│ - Có thể tái dùng logic từ archive/frontend-scratch/test_console_errors.cjs và                 │
│ test_navigation_flow.cjs (Playwright, đã có sẵn d động thay       │
│ vì click tay, nếu muốn resumable/regression-proof — đặt bản mới (không sửa archive) tại        │
│ frontend/scripts/ nếu quyết định giữ lại.                         │
│ - Fix từng lỗi tìm được tại đúng file/dòng.                                                    │
│                                                                   │
│ Verify: 0 console error trên toàn bộ 19 screens; npm run lint sạch (hoặc mọi warning còn       │
│ lại đã được triage có lý do); npm run scan:vn sạchi sửa code);    │
│ npm run build thành công.                                                                      │
│                                                                   │
│ ---                                                                                            │
│ Phase 2 — Dọn nợ design-token                                     │
│                                                                                                │
│ Theo docs/RESTYLE_CHANGELOG.md mục "còn lại": 6 styles/hex        │
│ hardcode thay vì token (đã xác nhận qua đọc WelcomeStep.jsx — hardcode #FAF5ED,                │
│ #4E3E31, #8A7B6E...), và HealthMetrics.jsx còn 2 ực ra            │
│ là blue #1250DC, phải là var(--success)).                                                      │
│                                                                   │
│ - File cần sửa: frontend/src/screens/onboarding/{WelcomeStep,PlantSelectStep,                  │
│ HealthScanStep,HabitsStep,LifeChangesStep,CycleTr                 │
│ frontend/src/components/HealthMetrics.jsx.                                                     │
│ - Áp dụng đúng mapping đã dùng ở Phase 1–4 restyl                 │
│ docs/RESTYLE_CHANGELOG.md để tái dùng convention: G.green500 → var(--success),                 │
│ G.blue300 → var(--brand-light), hex nền/chữ → tok                 │
│ frontend/src/theme/tokens.css).                                                                │
│ - Grep toàn repo xác nhận không còn sót: G\.(gree trần trong      │
│ frontend/src/screens/onboarding/ + HealthMetrics.jsx.                                          │
│                                                                   │
│ Verify: so sánh trực quan trước/sau từng onboarding step trong dev server (light mode,         │
│ dark mode, high-contrast — cả 3 đều định nghĩa trual              │
│ regression; cập nhật mục "Còn lại" trong docs/RESTYLE_CHANGELOG.md thành đã đóng.              │
│                                                                   │
│ ---                                                                                            │
│ Phase 3 — Accessibility pass (aria-label + contra                 │
│                                                                                                │
│ docs/RESTYLE_CHANGELOG.md ghi nhận icon-only buttabel.            │
│                                                                                                │
│ - Grep các <button></button>/clickable chỉ chứa icon (lucithị, trên        │
│ toàn frontend/src/components/ và frontend/src/screens/ (ứng viên: BottomNav,                   │
│ ProfileButton, Sheet close button, controls trong                 │
│ IsometricGarden.jsx).                                                                          │
│ - Thêm aria-label qua t() (i18next) cho từng nút,                 │
│ - Spot-check contrast WCAG AA (4.5:1) cho các cặp text/nền dùng --text-xs trên nền             │
│ --glass-bg/--garden-* — đây là yêu cầu "elderly-fog.              │
│                                                                                                │
│ Verify: chạy Lighthouse/axe DevTools accessibilitn (Home/         │
│ CarePlan, Garden, một bước Onboarding, Voucher) — không còn cảnh báo missing aria-label hay    │
│ contrast fail.                                                    │
│                                                                                                │
│ ---                                                               │
│ Phase 4 — Plant asset shot-list (art correctness)                                              │
│                                                                   │
│ Theo docs/PLANT_ASSET_CONSISTENCY.md, còn tồn đọng cụ thể:                                     │
│ - ginger: thiếu mặt cười trên chậu (lv1–4), lv1/lg.               │
│ - lemongrass: thiếu mặt cười (lv3–5).                                                          │
│ - licorice lv1: trông quá trưởng thành (phải là mỳ).              │
│ - lotus: hiện là bồn nước, cần vẽ lại thành chậu cây có pot/mặt cười như các cây khác, ở       │
│ toàn bộ 5 level.                                                  │
│ - Text tiếng Việt bake sẵn trên chậu lv5 (aloe, licorice — "Cam Thảo") chặn i18n JP.           │
│ - scripts/plant_asset_audit.py verify hiện báo FAe lv1,           │
│ lotus lv1, lotus lv2.                                                                          │
│ - Việc này là asset/art, không phải code thuần — e-gen/thiết kế   │
│ cho 4 cây trên rồi thả vào đúng thư mục asset hiện tại, hoặc (b) nếu không regenerate được     │
│ toàn bộ trong đợt này, tối thiểu phải xử lý (cropệt bake sẵn      │
│ trên pot lv5 — đây là blocker i18n cứng, ưu tiên cao hơn phần thẩm mỹ mặt cười.                │
│ - Sau mỗi lần thay ảnh, chạy lại python scripts/p                 │
│                                                                                                │
│ Verify: plant_asset_audit.py verify không còn FAIet của           │
│ audit script và review lại bằng mắt cho 4 cây bị ảnh hưởng.                                    │
│                                                                   │
│ ---                                                                                            │
│ Phase 5 — Final gate: taste-skill Pre-Flight Chec                 │
│                                                                                                │
│ - Chạy checklist §14 (Pre-Flight Check) của tasteen đã sửa:       │
│ contrast, không dùng pure black/white, một accent/một radius-system/một theme xuyên suốt,      │
│ motion tôn trọng prefers-reduced-motion, không còmục nào N/A      │
│ vì đây là product UI chứ không phải landing page (hero rules, CTA rules...).                   │
│ - Regression cuối: npm run build, npm run lint, n                 │
│ python scripts/plant_asset_audit.py verify, click-through thủ công lại toàn bộ 19 screens      │
│ một lần nữa.                                                      │
│ - Cập nhật docs/RESTYLE_CHANGELOG.md và docs/PLANT_ASSET_CONSISTENCY.md: đóng các mục đã       │
│ fix, note rõ phần cố tình để lại ngoài phạm vi (lestore —         │
│ habitCatalog/plantGroups field _ja, seed_firestore_ja.py, quy đổi ¥, văn phong                 │
│ keigo mascot — đây là track content/data, không phông block       │
│ đợt này).                                                                                      │
│                                                                   │
│ Verify: toàn bộ lệnh trên pass sạch; checklist Pre-Flight có bằng chứng (ghi lại trong         │
│ changelog) chứ không chỉ "cảm thấy ổn".                           │
│                                                                                                │
│ ---                                                               │
│ Ghi chú thực thi                                                                               │
│                                                                   │
│ - Thứ tự Phase có chủ đích: tooling trước để bắt lỗi ngay từ Phase 1; crash sweep (mức độ      │
│ nghiêm trọng nhất — đúng nghĩa "vỡ") trước khi độp hơn); asset    │
│ shot-list để cuối vì cần công đoạn art/design ngoài code, thời gian không chắc chắn.           │
│ - Không refactor kiến trúc ngoài phạm vi (không đr+inline sang    │
│ Tailwind/CSS-modules — giữ nguyên convention hiện tại của repo).                               │
│ - Track "Firestore JP content" nêu ở Phase 5 là bng đợt UI này —  │
│ chỉ ghi nhận để không bị hiểu nhầm là đã xong.
