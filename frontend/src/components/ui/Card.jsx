// LC Care UI — Card primitive
// Replaces the repeated white card surface in Care/Profile/Achievements.
// Extends the SharedUI Card with token-based styling.

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {function} [props.onClick]
 * @param {string|number} [props.radius=18]
 * @param {string|number} [props.padding="16px"]
 * @param {boolean} [props.elevated=false] - adds stronger shadow
 * @param {object} [props.style]
 */
export default function Card({
  children,
  onClick,
  radius = 18,
  padding = "16px",
  elevated = false,
  style,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)",
        borderRadius: radius,
        border: "1.5px solid var(--border)",
        boxShadow: elevated ? "var(--elev-2)" : "var(--elev-1)",
        padding,
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
