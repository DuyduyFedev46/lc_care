# LC Care — Restyle UI/UX Changelog (Phase 2–4)
**Ngày:** 2026-06-09  
**Branch:** main  
**Deploy:** https://chauthuc.web.app

---

## Tổng quan

Nâng cấp UI/UX toàn bộ LC Care (React 18 + Vite PWA) trên nền design system sạch:
- Loại bỏ 114 hardcode màu / 25 file
- Thay thế `G.green500` (alias sai — thực ra là `#1250DC` blue) bằng `var(--success)` (`#00923F`)
- Loại bỏ `G.blue300` → `var(--brand-light)`
- Tất cả font < 12px → `var(--text-xs)` (elderly-friendly)
- Xóa 61 lần inline glass recipe trùng lặp
- Tất cả animation keyframes gom vào `global.css`

---

## Phase 1 — Foundation / Primitives

### Tokens (`frontend/src/theme/tokens.css`)
- Single source of truth cho toàn bộ design tokens
- Brand blue: `--brand`, `--brand-header`, `--brand-light`, `--brand-border`, `--brand-pale`, `--brand-subtle`
- Success green: `--success` (`#00923F`), `--success-dark`, `--success-pale`
- Garden palette: `--garden-bg`, `--garden-warm-bg`, `--garden-ink`, `--garden-brown`, `--garden-muted`, `--garden-cream`, `--garden-border`
- Herb sub-palette: `--herb-900` → `--herb-100`
- Glass recipes: `--glass-bg`, `--glass-dark-bg`, `--glass-clinic-bg`
- Spacing scale: `--sp-1` → `--sp-12`
- Border radius: `--r-sm` → `--r-full`
- Typography: `--text-xs` (12px min) → `--text-hero` (32px)
- Motion: `--dur-fast` → `--dur-slower`, 4 easing functions
- Per-plant theming: `data-plant` attribute → 16 plant color overrides
- Dark mode + high contrast media queries

### Global CSS (`frontend/src/theme/global.css`)
- Gom toàn bộ `@keyframes`: `confettiFall`, `plantGrow`, `fadeSlideUp`, `plantSway`, `floatUp`, `sparkleFloat`, `pulse`, `seedShake`, `fadeIn`, `slideUp`
- Safe area utilities
- Glass utility classes: `.glass-card`, `.glass-dark`, `.glass-clinic`

### UI Primitives (`frontend/src/components/ui/`)
- `Button.jsx` — `lcStyles.btnPrimary/Secondary/Outline/Pill*` + ad-hoc inline buttons
- `Feedback.jsx` — Toast, LoadingSpinner, EmptyState, ErrorCard
- `ProfileButton.jsx` — Tái sử dụng avatar/profile header, thay avatar copy-paste ở 4 màn
- `index.js` — Barrel export

### SharedUI (`frontend/src/components/SharedUI.jsx`)
- BottomNav: 10px label → `var(--text-xs)`, thêm `aria-current="page"`
- SegmentedControl: `G.green500` → `var(--brand)`

---

## Phase 2a — Restyle Clinic Tabs

### VoucherScreen
- Token swap + `ProfileButton` integration
- Remove inline `@keyframes`

### ProfileScreen
- Token swap, remove `onMouseOver` hack
- Fix 10/11px fonts → `var(--text-xs)`

### CarePlanScreen
- `ProfileButton` replaces avatar copy-paste
- Progress ring: `G.primary` → `var(--brand)` / `var(--brand-light)`
- Streak badge chips: `G.blue100` → `var(--brand-pale)`
- Adherence grid: `G.green500` → `var(--brand)`
- Pharmacist note block: `G.blue100` → `var(--brand-pale)`

### AchievementsScreen
- Tất cả 9/10/11px font → `var(--text-xs)`
- Plant journey timeline: `#22C55E` → `var(--success)` / `var(--success-dark)`
- Current stage badge: `--success-pale`

### FamilyScreen
- `ProfileButton` replaces avatar copy-paste
- HudChip 7px → `var(--text-xs)`
- Member count badge: `G.primary/blue100` → `var(--brand)`
- "Tưới hộ" button: `#3B82F6` → `var(--brand)`
- Invite share button: `#22C55E` → `var(--success)`
- WaterSheet success color → `var(--success)`

---

## Phase 2b — Restyle Garden Tab

### GardenScreen
- Extract inline styles → `global.css`
- `G.green500` themeColor fallback → `var(--success)`
- Retry button → `var(--success)`
- Water CTA gradient: `G.green500/600` → `var(--success)/var(--success-dark)`
- What-Next CTA card: tất cả 9/10/11px → `var(--text-xs)`
- `#8B7355` → `var(--garden-muted)`, `#4A3728` → `var(--garden-ink)`
- `#22C55E` all-done label → `var(--success)`

### WaterScreen
- `G.blue300` → `var(--brand-light)` (3 lần: all-done, animating, done labels)
- Giữ nguyên inline `@keyframes` (mascotWatering, dripFall, plantWatered — screen-specific)

### GerminationScreen
- CTA button: `G.green500` → `var(--success)`
- Activated label: `G.blue300` → `var(--brand-light)`
- Confetti palette: `G.green500/blue300` → CSS vars

### LevelUpScreen
- Xóa inline `@keyframes` (đã có trong global.css)
- CTA: `G.green500` → `var(--success)`
- Confetti: CSS vars

---

## Phase 4 — Cleanup (G.green500 / G.blue300 audit)

### Kết quả audit
- `G.green500` còn sót trong `src/screens/*`: **0**
- `G.blue300` còn sót trong `src`: **0**

### CalendarScreen (`src/screens/family/CalendarScreen.jsx`)
- 6 lần `G.green500` → `var(--success)`
- `G.green100/200` → `var(--success-pale)`
- "Hôm nay" badge: `10px` → `var(--text-xs)`

### PharmacistScreen (`src/screens/pharmacist/PharmacistScreen.jsx`)
- 10 lần `G.green500` → `var(--success)`: approve/reset buttons, queue selection border, tab indicator, low-priority dot, verified span
- `G.green100` → `var(--success-pale)` (document cards, prescription cards)
- Verified span: `10px` → `var(--text-xs)`

### PlantComponents (`src/components/PlantComponents.jsx`)
- `PlantCard` level text: `G.green500` → `var(--success)`

### ErrorBoundary (`src/components/ErrorBoundary.jsx`)
- Reload button: `G.green500` → `var(--brand)` (generic app CTA, không phải success context)

---

## Commits

| Hash | Message |
|------|---------|
| `59568e4` | feat: Phase 2a complete — CarePlanScreen, AchievementsScreen, FamilyScreen restyle |
| `826ae6d` | feat: Phase 2b complete — GerminationScreen, LevelUpScreen, GardenScreen remaining cleanup |
| `e776c52` | feat: Phase 4 — G.green500/blue300 fully eliminated from screens + components |

---

## Còn lại (Post-MVP / defer)

- 6 onboarding screens (`LifeChangesStep`, `PlantSelectStep`, `WelcomeStep`, `HealthScanStep`, `CycleTrackingStep`, `HabitsStep`) — vẫn dùng `lcStyles` (backward compat, không phá)
- `HealthMetrics.jsx` — 2 `G.green500` còn sót (analytics component, deferred)
- aria-labels cho icon-only buttons (Phase 3 còn lại)

---

## Ghi chú kỹ thuật

- Build tool: Vite 5.4.21
- CSS strategy: `var(--*)` CSS custom properties, không dùng Tailwind
- Token file: `frontend/src/theme/tokens.css` — single source of truth
- JS tokens: `G.*` object trong `DesignTokens.js` vẫn còn để backward compat — không xóa
- **Không deploy functions** — tuân thủ AGENTS.md (incident 2026-05-17)
- Deploy target: `hosting:chauthuc` → https://chauthuc.web.app
