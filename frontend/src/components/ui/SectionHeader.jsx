// LC Care UI — SectionHeader primitive
// "icon + title + optional Xem tất cả ›" row used in Profile/Achievements/Care
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.icon] - emoji or React node
 * @param {string} [props.actionLabel] - mặc định t("see_all_badges")
 * @param {function} [props.onAction]
 * @param {"clinic"|"garden"} [props.variant="clinic"]
 */
export default function SectionHeader({
  title,
  icon,
  actionLabel,
  onAction,
  variant = "clinic",
}) {
  const { t } = useTranslation();
  const action = actionLabel ?? t("see_all_badges");
  const isGarden = variant === "garden";
  const titleColor = isGarden ? "var(--garden-ink)" : "var(--text)";
  const actionColor = isGarden ? "var(--garden-brown)" : "var(--brand)";

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {icon && (
          <span style={{ fontSize: 15 }}>{icon}</span>
        )}
        <span style={{
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontSize: 13,
          fontWeight: 800,
          color: titleColor,
          letterSpacing: 0.2,
        }}>
          {title}
        </span>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: actionColor,
            padding: "2px 4px",
          }}
        >
          {action} ›
        </button>
      )}
    </div>
  );
}
