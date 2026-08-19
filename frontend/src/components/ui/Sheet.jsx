// LC Care UI — Sheet primitive
// Bottom sheet: backdrop + slideUp animation + drag handle.
// Replaces duplicated implementations in GardenScreen & ProfileScreen.

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {React.ReactNode} props.children
 * @param {string} [props.title]
 * @param {string|number} [props.maxHeight="85vh"]
 * @param {"garden"|"clinic"} [props.variant="clinic"]
 */
export default function Sheet({
  open,
  onClose,
  children,
  title,
  maxHeight = "85vh",
  variant = "clinic",
}) {
  const { t } = useTranslation();

  // Close on Escape key — accessibility
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const isGarden = variant === "garden";

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: "var(--z-sheet)",
          animation: "backdropFade 0.25s ease",
        }}
      />

      {/* Sheet panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title || "Panel"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight,
          background: isGarden ? "var(--garden-cream)" : "var(--surface)",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
          zIndex: "calc(var(--z-sheet) + 1)",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.3s var(--ease-spring-sm)",
          overflowY: "hidden",
          paddingBottom: "var(--sab, 0px)",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
          <div style={{
            width: 36,
            height: 4,
            borderRadius: 99,
            background: isGarden ? "rgba(139,90,43,0.25)" : "var(--border)",
          }} />
        </div>

        {/* Header with title + close */}
        {title && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 20px 12px",
            borderBottom: `1px solid ${isGarden ? "rgba(139,90,43,0.1)" : "var(--hairline)"}`,
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontWeight: 800,
              fontSize: 16,
              color: isGarden ? "var(--garden-ink)" : "var(--text)",
            }}>
              {title}
            </span>
            <button
              onClick={onClose}
              aria-label={t("aria_close")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 22,
                color: isGarden ? "var(--garden-muted)" : "var(--text-mid)",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Scrollable content */}
        <div style={{
          overflowY: "auto",
          flex: 1,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
          {children}
        </div>
      </div>
    </>
  );
}
