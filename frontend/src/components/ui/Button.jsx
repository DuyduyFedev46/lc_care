// LC Care UI — Button primitive
// Consolidates lcStyles.btnPrimary/Secondary/Outline/Pill* + ad-hoc inline buttons.
// Removes all onMouseOver state hacks (hover now via CSS :hover).
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * @param {"primary"|"secondary"|"outline"|"pill"|"pill-ghost"|"danger"|"ghost"} [props.variant="primary"]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {function} props.onClick
 * @param {React.ReactNode} props.children
 * @param {object} [props.style]
 * @param {string} [props.type="button"]
 * @param {string} [props.ariaLabel]
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  style,
  type = "button",
  ariaLabel,
}) {
  const { t } = useTranslation();
  const heights = { sm: 38, md: 44, lg: 52 };
  const fontSizes = { sm: 13, md: 14, lg: 15 };
  const radii = { sm: 12, md: 14, lg: 16 };

  const base = {
    height: heights[size],
    borderRadius: radii[size],
    fontSize: fontSizes[size],
    fontWeight: 700,
    fontFamily: '"Be Vietnam Pro", sans-serif',
    cursor: disabled || loading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    transition: "opacity 0.15s ease, transform 0.15s ease",
    opacity: disabled || loading ? 0.55 : 1,
    width: fullWidth ? "100%" : undefined,
    flexShrink: 0,
  };

  const variants = {
    primary: {
      background: "var(--brand)",
      color: "#FFF",
    },
    secondary: {
      background: "var(--brand-pale)",
      color: "var(--brand)",
      border: "1.5px solid var(--brand-border)",
    },
    outline: {
      background: "transparent",
      color: "var(--brand)",
      border: "1.5px solid var(--brand)",
    },
    pill: {
      background: "var(--brand)",
      color: "#FFF",
      borderRadius: 99,
      padding: `0 ${size === "sm" ? 14 : 18}px`,
    },
    "pill-ghost": {
      background: "transparent",
      color: "var(--text-mid)",
      border: "1.5px solid var(--border)",
      borderRadius: 99,
      padding: `0 ${size === "sm" ? 14 : 16}px`,
    },
    danger: {
      background: "var(--danger)",
      color: "#FFF",
    },
    ghost: {
      background: "none",
      color: "var(--brand)",
      border: "none",
    },
    // Garden variants
    "garden-primary": {
      background: "var(--theme, var(--success))",
      color: "#FFF",
    },
    "garden-outline": {
      background: "transparent",
      color: "var(--garden-brown)",
      border: "1.5px solid var(--garden-border-active)",
    },
  };

  return (
    <button
      type={type}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      style={{
        ...base,
        ...(variants[variant] || variants.primary),
        ...style,
      }}
    >
      {loading ? (
        <>
          <span style={{
            width: 14, height: 14,
            border: "2px solid rgba(255,255,255,0.3)",
            borderTop: "2px solid #FFF",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            flexShrink: 0,
          }} />
          {t("processing")}
        </>
      ) : children}
    </button>
  );
}
