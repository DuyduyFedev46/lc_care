// LC Care UI — StatChip + Pill primitives
// StatChip: glass chip used in Garden HUD (streak, points, water, level)
// Pill:     compact tag used for journey labels, status indicators

/**
 * StatChip — Garden HUD glass chip
 * @param {object} props
 * @param {string|React.ReactNode} props.icon
 * @param {string|React.ReactNode} props.label
 * @param {function} [props.onClick]
 * @param {object} [props.style]
 */
export function StatChip({ icon, label, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        borderRadius: "var(--r-full)",
        padding: "6px 12px",
        color: "var(--garden-ink)",
        fontSize: "var(--text-xs)",       /* 12px — minimum allowed */
        fontWeight: "var(--fw-bold)",
        boxShadow: "var(--elev-garden-1)",
        fontFamily: '"Be Vietnam Pro", sans-serif',
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

/**
 * Pill — compact tag/badge
 * @param {object} props
 * @param {string|React.ReactNode} props.children
 * @param {string} [props.color] - text + border color
 * @param {string} [props.bg] - background (defaults to color + "22" via rgba)
 * @param {"sm"|"md"} [props.size="sm"]
 * @param {object} [props.style]
 */
export function Pill({ children, color = "var(--brand)", bg, size = "sm", style }) {
  const sizes = {
    sm: { fontSize: "var(--text-xs)", padding: "3px 10px" },
    md: { fontSize: "var(--text-sm)", padding: "5px 14px" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        background: bg ?? `color-mix(in srgb, ${color} 13%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
        borderRadius: "var(--r-full)",
        fontFamily: '"Be Vietnam Pro", sans-serif',
        fontWeight: "var(--fw-bold)",
        letterSpacing: 0.3,
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
