// LC Care UI — Spinner + ErrorState primitives
// Each is copy-pasted 3× across App.jsx + GardenScreen before.

import { useTranslation } from "react-i18next";
import { G } from "../DesignTokens";
import Button from "./Button";

/**
 * Spinner — loading indicator
 * @param {object} props
 * @param {string} [props.message="Đang tải..."]
 * @param {"brand"|"garden"} [props.variant="brand"]
 * @param {object} [props.style]
 */
export function Spinner({ message, variant = "brand", style }) {
  const { t } = useTranslation();
  const msg = message ?? t("loading");
  const color = variant === "garden" ? G.success : G.brand;
  const trackColor = variant === "garden" ? "#D1FAE5" : "#D6E4FF";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      fontFamily: '"Be Vietnam Pro", sans-serif',
      gap: 16,
      ...style,
    }}>
      <div style={{
        width: 50,
        height: 50,
        border: `4px solid ${trackColor}`,
        borderTop: `4px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <div style={{ color, fontWeight: 700, fontSize: 16 }}>
        {msg}
      </div>
    </div>
  );
}

/**
 * ErrorState — connection/error fallback
 * @param {object} props
 * @param {string} [props.message]
 * @param {string} [props.emoji="🔌"]
 * @param {string} [props.title="Mất kết nối"]
 * @param {function} [props.onRetry]
 * @param {string} [props.retryLabel="Thử lại"]
 * @param {object} [props.style]
 */
export function ErrorState({
  message,
  emoji = "🔌",
  title,
  onRetry,
  retryLabel,
  style,
}) {
  const { t } = useTranslation();
  const titleText = title ?? t("cannot_connect");
  const retryText = retryLabel ?? t("retry");
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      fontFamily: '"Be Vietnam Pro", sans-serif',
      padding: "0 24px",
      textAlign: "center",
      gap: 12,
      ...style,
    }}>
      <div style={{ fontSize: 48 }}>{emoji}</div>
      <div style={{ fontWeight: 800, fontSize: 16, color: G.text }}>{titleText}</div>
      {message && (
        <div style={{ fontSize: 14, color: G.textMid, lineHeight: 1.6, maxWidth: 280 }}>
          {message}
        </div>
      )}
      {onRetry && (
        <Button onClick={onRetry} size="sm" style={{ marginTop: 8, padding: "0 28px" }}>
          {retryText}
        </Button>
      )}
    </div>
  );
}
