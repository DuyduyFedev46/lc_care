// LC Care UI — GlassCard primitive
// Replaces 38 backdropFilter inline patterns + 17 literal glass color combos.
// Two flavors: garden (warm) and dark (water/germination screens).

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {"garden"|"dark"|"clinic"} [props.variant="garden"] 
 * @param {string|number} [props.radius="16px"]
 * @param {string} [props.padding="8px 12px"]
 * @param {function} [props.onClick]
 * @param {object} [props.style] - extra style overrides
 * @param {string} [props.className] - extra CSS classes
 */
export default function GlassCard({
  children,
  variant = "garden",
  radius = "16px",
  padding = "8px 12px",
  onClick,
  style,
  className = "",
}) {
  const variantStyles = {
    garden: {
      background: "var(--glass-bg)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      border: "1px solid var(--glass-border)",
      boxShadow: "var(--glass-shadow)",
    },
    dark: {
      background: "var(--glass-dark-bg)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      border: "1px solid var(--glass-dark-border)",
    },
    clinic: {
      background: "var(--glass-clinic-bg)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid var(--glass-clinic-border)",
      boxShadow: "var(--elev-1)",
    },
  };

  return (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      style={{
        borderRadius: radius,
        padding,
        ...variantStyles[variant],
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
