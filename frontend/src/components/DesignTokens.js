// Long Chau Care — Design System Tokens
// Extracted from nhathuoclongchau.com.vn (May 2026)
// Brand: Blue #1250DC primary, header #2167F5, bg #EDF3FF
//
// POST-RESTYLE NOTE (Phase 0):
// CSS custom properties are now the single source of truth (src/theme/tokens.css).
// G.* values remain for backward compat across ~25 files.
// Values prefixed with var(--…) work as CSS strings in JSX style props.
// ⚠ MIGRATION: patterns like G.foo + "22" (alpha concat) must be
//   rewritten to explicit color stops — e.g. "rgba(0,146,63,0.13)"

export const G = {
  // ═══ Primary — Long Châu Blue ═══
  blue900: "#0B3299",     // darkest brand
  blue700: "#1250DC",     // primary brand (buttons, links, icons)
  blue500: "#2167F5",     // header, navbar background
  blue300: "#6D9DF8",     // hover, lighter accent
  blue200: "#B3CDFA",     // borders, outlines
  blue100: "#EDF3FF",     // light background tint
  blue50:  "#F5F8FF",     // subtle background

  // ═══ Semantic — correct names, correct values ═══
  brand:        "#1250DC",   // Long Châu brand blue (replaces green500 lie)
  brandHeader:  "#2167F5",
  brandPale:    "#EDF3FF",
  success:      "#00923F",   // actual brand green (theme-color in index.html)
  successDark:  "#006B2E",
  successPale:  "#E8F5EE",
  gold:         "#D97706",   // streak, reward
  goldLight:    "#FDE68A",
  goldBg:       "#FFF9E8",
  danger:       "#E52D2D",
  dangerBg:     "#FFEBEB",

  // Garden palette — explicitly named, no more ambiguity
  gardenInk:    "var(--garden-ink)",   // primary text on garden screens
  gardenBrown:  "var(--garden-brown)",   // secondary garden text, borders
  gardenMuted:  "var(--garden-muted)",   // muted garden text / caption
  gardenCream:  "var(--garden-cream)",   // card surface on garden
  gardenBg:     "var(--garden-bg)",   // garden screen background
  gardenWarmBg: "var(--garden-warm-bg)",   // warm garden home background

  // Aliases — backward compat + semantic naming
  primary:      "#1250DC",
  primaryLight: "#2167F5",
  primaryBg:    "#EDF3FF",

  // ═══ Accent ═══
  green800: "#006B2E",    // dark success, health indicators
  green600: "#00923F",    // success, health indicators (CORRECT green)
  green100: "#E8F5EE",    // success background
  orange600: "#E67822",   // sale badge, promo price
  orange100: "#FFF3E8",
  red500: "#E52D2D",      // error, alert, strikethrough price
  red100: "#FFEBEB",
  gold600: "#D97706",     // streak, reward
  gold200: "#FDE68A",
  gold100: "#FFF9E8",

  // ═══ Herb Green Palette — Task 5.3 (Ghibli-style nature, health & garden screens) ═══
  herb800: "#1A4A2E",     // deep forest — dark backgrounds
  herb600: "#2D7A4F",     // herb primary — buttons, icons
  herb500: "#3D9B6A",     // herb mid — progress bars, accents
  herb400: "#5BB88A",     // herb light — borders, chips
  herb100: "#EBF7F1",     // herb tint — card backgrounds

  // ═══ Neutral ═══
  text: "var(--text)",        // primary text (near black)
  textMid: "var(--text-mid)",     // secondary text (gray-500)
  textLight: "var(--text-light)",   // muted text (gray-400)
  border: "var(--border)",      // standard border (gray-300)
  hairline: "var(--hairline)",    // subtle divider (gray-200)
  bg: "var(--bg)",          // page background (blue-tinted)
  surface: "var(--surface)",     // card surface
  darkBg: "var(--dark-bg)",     // dark mode / overlay

  // ═══ Legacy aliases (for gradual migration) ═══
  // ⚠ FIXED: green500 previously pointed to #1250DC (blue!) — now correct
  green900: "#0B3299",   // was blue900 (backward compat alias)
  green700: "#1250DC",   // was blue700 (backward compat alias — still brand blue)
  green500: "#1250DC",   // ⚠ LEGACY: still blue for code that depends on it being brand
                          //   migrate usages to G.brand or G.success as appropriate
  green200: "#B3CDFA",   // was blue200 (backward compat alias)
  pink: "#DB2777",
  blue: "#1250DC",
  orange: "#E67822",
};

// ─── lcStyles — shared styles object ────────────────────────────────────────
// Status: Used by onboarding screens. Will migrate to primitives in Phase 4.
// Other 6 main screens have already dropped this in favor of inline (Phase 2
// will convert them to components/ui/* primitives).
export const lcStyles = {
  screen: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    overflowY: "hidden",
    background: G.bg,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "calc(12px + var(--sat, 0px)) 20px 8px",
    borderBottom: `1px solid ${G.hairline}`,
    background: G.surface,
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: G.text,
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: 28,
    color: G.primary,
    cursor: "pointer",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    lineHeight: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: G.textMid,
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    border: `1.5px solid ${G.border}`,
    padding: "0 16px",
    fontSize: 15,
    fontFamily: '"Be Vietnam Pro", sans-serif',
    color: G.text,
    outline: "none",
    background: G.surface,
  },
  inputSm: {
    width: "100%",
    height: 42,
    borderRadius: 12,
    border: `1.5px solid ${G.border}`,
    padding: "0 12px",
    fontSize: 14,
    fontFamily: '"Be Vietnam Pro", sans-serif',
    color: G.text,
    outline: "none",
    background: G.surface,
  },
  btnPrimary: {
    width: "100%",
    height: 52,
    borderRadius: 16,
    background: G.primary,
    color: "#FFF",
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnSecondary: {
    width: "100%",
    height: 52,
    borderRadius: 16,
    background: G.blue100,
    color: G.primary,
    border: `1.5px solid ${G.blue200}`,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
  btnOutline: {
    width: "100%",
    height: 44,
    borderRadius: 14,
    background: "transparent",
    color: G.primary,
    border: `1.5px solid ${G.primary}`,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPillGreen: {
    height: 38,
    borderRadius: 20,
    background: G.primary,
    color: "#FFF",
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  btnPillGhost: {
    height: 38,
    borderRadius: 20,
    background: "transparent",
    color: G.textMid,
    border: `1.5px solid ${G.border}`,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomArea: {
    padding: "12px 20px 16px",
    background: G.surface,
    borderTop: `1px solid ${G.hairline}`,
    flexShrink: 0,
  },
  toast: {
    position: "absolute",
    top: 70,
    left: "50%",
    transform: "translateX(-50%)",
    background: G.text,
    color: "#FFF",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 24,
    zIndex: 200,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    pointerEvents: "none",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    marginBottom: 4,
  },
  logoLeaf: { width: 40, height: 40, objectFit: "contain" },
  logoText: { fontSize: 20, fontWeight: 900, color: G.primary, letterSpacing: 1 },
  logoSub: { fontSize: 14, color: G.textMid, textAlign: "center", fontStyle: "italic" },
};
