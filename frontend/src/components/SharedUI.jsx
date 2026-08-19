// Long Chau Care — Shared UI Components
// Refactored Phase 1: use design tokens, fix BottomNav label 10px→12px,
// fix SegmentedControl hardcoded green→brand token, add aria attrs.
import { Sprout, Users, HeartPulse, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { G } from "./DesignTokens";
import { ICONS } from "../config/constants";
import { useApp } from "../context/AppContext";
import ProfileButton from "./ui/ProfileButton";

export function Icon({ name, size = 24, style, ...props }) {
  const src = ICONS[name];
  if (!src) {
    const fallback = ICONS[`ui_${name}`] || ICONS[name];
    if (!fallback) return null;
    return <img src={fallback} alt={name} style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, ...style }} {...props} />;
  }
  return <img src={src} alt={name} style={{ width: size, height: size, objectFit: "contain", flexShrink: 0, ...style }} {...props} />;
}

export function BottomNav({ currentScreen, navigate }) {
  const { t } = useTranslation();
  const tabs = [
    { id: "home",       Icon: Sprout,     label: t("nav_garden") },
    { id: "tab-family", Icon: Users,      label: t("nav_family") },
    { id: "tab-care",   Icon: HeartPulse, label: t("nav_care")   },
    { id: "voucher",    Icon: Gift,       label: t("nav_gift")   },
  ];

  return (
    <nav
      aria-label={t("aria_main_nav")}
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: 360,
        height: 72,
        background: "var(--glass-bg)",
        borderRadius: "var(--r-2xl)",
        boxShadow: "var(--elev-garden-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
        zIndex: "var(--z-nav)",
        border: "1px solid var(--garden-border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {tabs.map((t) => {
        const active = currentScreen === t.id || (t.id === "home" && currentScreen === "water-action");
        return (
          <button
            key={t.id}
            onClick={() => navigate(t.id)}
            aria-current={active ? "page" : undefined}
            aria-label={t.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 10px",
              minWidth: 44,
              minHeight: 44,
              fontFamily: '"Be Vietnam Pro", sans-serif',
              transition: "transform var(--dur-fast) var(--ease-out)",
            }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: active ? "rgba(139, 90, 43, 0.15)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background var(--dur-base), transform var(--dur-base)",
              transform: active ? "scale(1.08)" : "none",
            }}>
              <t.Icon size={20} color={active ? "var(--garden-brown)" : "var(--garden-muted)"} style={{ transition: "color var(--dur-base)" }} />
            </div>
            <span style={{
              fontSize: "var(--text-xs)",  /* 12px — was 10px — fixed for elderly */
              fontWeight: active ? 800 : 600,
              color: active ? "var(--garden-brown)" : "var(--garden-muted)",
              transition: "color var(--dur-base)",
            }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function Toast({ message, onDone }) {
  if (!message) return null;
  return (
    <div style={{
      position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)",
      background: G.text, color: "#FFF", fontSize: "var(--text-sm)", fontWeight: 600,
      padding: "10px 20px", borderRadius: "var(--r-full)", zIndex: "var(--z-toast)",
      whiteSpace: "nowrap",
      boxShadow: "var(--elev-3)", pointerEvents: "none",
      animation: "fadeSlideUp 0.3s ease",
    }}>
      {message}
    </div>
  );
}

export function JourneyTag({ journey, color = G.brand }) {
  return (
    <span style={{
      background: color + "22", color: color, borderRadius: 99,
      fontSize: "var(--text-xs)", fontWeight: 700,
      fontFamily: '"Be Vietnam Pro", sans-serif',
      padding: "3px 10px", letterSpacing: 0.5, textTransform: "uppercase",
    }}>{journey}</span>
  );
}

export function StreakBadge({ streak }) {
  const { t } = useTranslation();
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      background: G.surface, borderRadius: 20, padding: "6px 14px",
      border: `1.5px solid ${G.border}`,
    }}>
      <img src={ICONS.ui_fire_streak} alt="streak" style={{ width: 18, height: 18, objectFit: "contain" }} />
      <span style={{ fontWeight: 800, color: G.orange, fontSize: 16 }}>{streak}</span>
      <span style={{ fontSize: "var(--text-sm)", color: G.textMid }}>{t("day_unit")}</span>
    </div>
  );
}

export function LevelDots({ level, max = 5, color = G.brand }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{
          width: i < level ? 7 : 5, height: i < level ? 7 : 5,
          borderRadius: 99, transition: "all 0.3s",
          background: i < level ? color : "rgba(0,0,0,0.12)",
        }} />
      ))}
    </div>
  );
}

export function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--surface)",
      borderRadius: "var(--r-lg)",
      border: "1.5px solid var(--border)",
      boxShadow: "var(--elev-1)",
      ...style,
      cursor: onClick ? "pointer" : undefined,
    }}>{children}</div>
  );
}

export function BackButton({ onClick, label }) {
  const { t } = useTranslation();
  const text = label ?? t("back");
  return (
    <button
      onClick={onClick}
      aria-label={text}
      style={{
        background: "none", border: "none", cursor: "pointer", width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: '"Be Vietnam Pro", sans-serif', lineHeight: 1,
      }}
    >
      <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 24, height: 24, objectFit: "contain" }} />
    </button>
  );
}

// ── Onboarding Progress Bar ──────────────────────────────────────────
export function OnboardingProgress({ step, total = 7 }) {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "10px 24px 4px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            role="presentation"
            style={{
              height: 4, flex: 1, borderRadius: 99,
              background: i < step ? "var(--brand)" : "var(--hairline)",
              transition: "background 0.35s ease",
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: "var(--text-xs)", color: G.textLight, marginTop: 5, textAlign: "right" }}>
        {t("step_n_total", { step, total })}
      </div>
    </div>
  );
}

export function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: "flex",
      background: "var(--glass-bg)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      border: "1px solid var(--glass-border)",
      borderRadius: "var(--r-lg)",
      padding: 4,
      margin: "4px 0",
      position: "sticky",
      top: 60,
      zIndex: "var(--z-overlay)",
    }}>
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "7px 10px",
              border: "none",
              // Fixed: was hardcoded #059669/#047857 — now uses --brand (clinic context)
              background: active ? "linear-gradient(135deg, var(--brand) 0%, var(--brand-header) 100%)" : "transparent",
              borderRadius: "var(--r-md)",
              color: active ? "white" : G.textMid,
              fontWeight: 600,
              boxShadow: active ? "0 4px 12px rgba(18,80,220,0.25)" : "none",
              transform: active ? "scale(1.02)" : "scale(1)",
              transition: `all var(--dur-base) var(--ease-spring)`,
              cursor: "pointer",
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: "var(--text-sm)",
            }}
          >
            <span style={{ fontSize: 15 }}>{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function AppHeader({ title, showBack = false, rightElement }) {
  const { navigate } = useApp();
  
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "calc(12px + var(--sat, 0px)) 20px 12px",
      background: "var(--surface)",
      borderBottom: `1px solid var(--hairline)`,
      zIndex: "var(--z-hud)",
      fontFamily: '"Be Vietnam Pro", sans-serif',
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label={t("aria_back")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        )}
        <h1 style={{ fontSize: "var(--text-lg)", fontWeight: 800, color: "var(--text)", margin: 0 }}>
          {title}
        </h1>
      </div>
      
      {rightElement !== undefined
        ? rightElement
        : <ProfileButton variant="clinic" size={34} />
      }
    </header>
  );
}

export function SpeechBubble({ text, style }) {
  if (!text) return null;
  return (
    <div style={{
      position: "absolute",
      top: "calc(56px + env(safe-area-inset-top, 0px))",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(255, 255, 255, 0.88)",
      border: "1.5px solid rgba(139, 90, 43, 0.15)",
      borderRadius: "var(--r-lg)",
      padding: "7px 14px",
      maxWidth: 260,
      width: "auto",
      boxShadow: "var(--elev-garden-2)",
      zIndex: "var(--z-raised)",
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: "var(--text-base)",   /* 15px — was 14px, elderly-friendly */
      fontWeight: 700,
      color: "#3D3225",
      textAlign: "center",
      lineHeight: "var(--lh-normal)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      ...style,
    }}>
      {text}
      {/* Tail pointing DOWN toward mascot */}
      <div style={{
        position: "absolute",
        bottom: -7,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 11,
        height: 11,
        background: "rgba(255, 255, 255, 0.88)",
        borderRight: "1.5px solid rgba(139, 90, 43, 0.15)",
        borderBottom: "1.5px solid rgba(139, 90, 43, 0.15)",
      }} />
    </div>
  );
}

export { G };
