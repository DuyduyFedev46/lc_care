import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../services/api";
import { auth } from "../../services/firebase";
import { signInWithCustomToken } from "firebase/auth";

/* ─── CSS Keyframes injected once ─── */
const KEYFRAMES = `
@keyframes sparkleFloat {
  0% { transform: translateY(0) scale(0); opacity: 0; }
  15% { transform: translateY(-20px) scale(1); opacity: 1; }
  85% { transform: translateY(-120px) scale(0.8); opacity: 0.6; }
  100% { transform: translateY(-160px) scale(0); opacity: 0; }
}
@keyframes petalDrift {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  50% { transform: translate(-30px, 80px) rotate(180deg); opacity: 0.5; }
  100% { transform: translate(-60px, 200px) rotate(360deg); opacity: 0; }
}
@keyframes mascotBreath {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.01); }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.1); }
  50% { box-shadow: 0 0 40px rgba(255,215,0,0.25); }
}
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes bubbleBounce {
  0% { opacity: 0; transform: scale(0.3) translateY(20px); }
  50% { opacity: 1; transform: scale(1.05) translateY(-2px); }
  70% { transform: scale(0.97) translateY(1px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
@media (max-aspect-ratio: 55/100) {
  .bg-image-responsive {
    object-position: 53.5% top;
  }
}
@media (max-aspect-ratio: 48/100) {
  .bg-image-responsive {
    object-position: 54.5% top;
  }
}
`;

/* ─── Sparkle particles config ─── */
const SPARKLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${15 + Math.random() * 70}%`,
  top: `${20 + Math.random() * 40}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 2}s`,
  size: 3 + Math.random() * 4,
}));

const PETALS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${20 + Math.random() * 60}%`,
  top: `${10 + Math.random() * 30}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${5 + Math.random() * 3}s`,
  size: 6 + Math.random() * 6,
  color: ['#FFB7C5', '#FFDAB9', '#FFF0F5', '#FFE4E1', '#F0E68C'][i % 5],
}));

export default function LoginScreen({ onLoginSuccess }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length <= 10) {
      setPhone(val);
      setError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError(t("login_phone_invalid"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { phone });
      const { customToken, role, uid } = response.data;

      if (!customToken) {
        throw new Error(t("login_no_token"));
      }

      try {
        await signInWithCustomToken(auth, customToken);
        if (onLoginSuccess) {
          onLoginSuccess({ role, phone, uid });
        }
      } catch (firebaseErr) {
        console.warn("Firebase Auth signInWithCustomToken failed, using local fallback:", firebaseErr);
        localStorage.setItem("lc_care_mock_token", uid);
        localStorage.setItem(
          "lc_care_mock_user",
          JSON.stringify({ role, phone })
        );
        if (onLoginSuccess) {
          onLoginSuccess({ role, phone, uid });
        }
      }
    } catch (err) {
      console.error("Login failed:", err);
      const errMsg = err.response?.data?.detail || err.message || t("login_failed");
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const isValid = phone && phone.length >= 10;

  return (
    <>
      {/* Inject keyframes */}
      <style>{KEYFRAMES}</style>

      <div style={styles.root}>
        {/* ═══════════════════════════════════════
            LAYER 1 — Background Comic Art
            ═══════════════════════════════════════ */}
        <div style={styles.bgLayer}>
          <img
            src="/assets/bg_panel0_login_no_bubble.png"
            alt=""
            className="bg-image-responsive"
          />
        </div>

        {/* ═══════════════════════════════════════
            LAYER 2 — Particle Effects
            ═══════════════════════════════════════ */}
        <div style={styles.effectsLayer}>
          {/* Golden sparkles */}
          {SPARKLES.map((s) => (
            <div
              key={`sparkle-${s.id}`}
              style={{
                position: "absolute",
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FFD700 0%, #FFA500 60%, transparent 100%)",
                animation: `sparkleFloat ${s.duration} ${s.delay} ease-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Falling petals */}
          {PETALS.map((p) => (
            <div
              key={`petal-${p.id}`}
              style={{
                position: "absolute",
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size * 0.6,
                borderRadius: "50% 0 50% 0",
                background: p.color,
                opacity: 0,
                animation: `petalDrift ${p.duration} ${p.delay} ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════
            LAYER 2.5 — Speech Bubble (CSS)
            ═══════════════════════════════════════ */}
        <div style={styles.bubbleLayer}>
          <div style={styles.speechBubble}>
            <span style={styles.bubbleText}>
              {t("login_bubble_text")}
            </span>
            {/* Triangle tail */}
            <div style={styles.bubbleTail} />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            LAYER 3 — CTA / UI Elements
            ═══════════════════════════════════════ */}
        <div style={styles.ctaLayer}>
          {/* Spacer to push CTA to bottom */}
          <div style={{ flex: 1 }} />

          {/* Floating glassmorphic card for UI */}
          <div style={styles.ctaCard}>
            <form onSubmit={handleLogin} style={styles.ctaArea}>
              <input
                type="tel"
                placeholder={t("login_phone")}
                value={phone}
                onChange={handlePhoneChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                  ...styles.phoneInput,
                  ...(focused ? styles.phoneInputFocus : {}),
                  ...(error ? { borderColor: '#EF4444' } : {}),
                }}
                disabled={loading}
                autoComplete="tel"
              />
              {error && <div style={styles.errorText}>{error}</div>}

              <button
                type="submit"
                disabled={loading || !isValid}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  ...styles.ctaButton,
                  ...(btnHover && isValid && !loading ? styles.ctaButtonHover : {}),
                  ...((!isValid || loading) ? styles.ctaButtonDisabled : {}),
                }}
              >
                {loading ? t("login_opening_gate") : t("continue")}
              </button>
            </form>

            {/* Footer */}
            <div style={styles.footer}>
              {t("login_terms_prefix")}
              <span style={styles.footerLink}> {t("terms")} </span>{t("and")}
              <span style={styles.footerLink}> {t("privacy_policy")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Styles ─── */
const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',
  },

  /* ── Layer 1: Background ── */
  bgLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },

  /* ── Layer 2: Effects ── */
  effectsLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    overflow: "hidden",
  },

  /* ── Layer 2.5: Speech Bubble ── */
  bubbleLayer: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  },
  speechBubble: {
    position: "relative",
    background: "#FFFFFF",
    borderRadius: 18,
    padding: "10px 16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    maxWidth: "65%",
    textAlign: "center",
    animation: "bubbleBounce 0.6s ease-out both",
    animationDelay: "0.5s",
    opacity: 0,
  },
  bubbleText: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    color: "#3D3225",
    lineHeight: 1.45,
    whiteSpace: "pre-line",
  },
  bubbleTail: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderTop: "10px solid #FFFFFF",
  },

  /* ── Layer 3: CTA ── */
  ctaLayer: {
    position: "relative",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0 16px 16px",
    boxSizing: "border-box",
  },
  ctaCard: {
    background: "rgba(253, 251, 247, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(139, 90, 43, 0.18)",
    borderRadius: 24,
    padding: "16px 16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    boxShadow: "0 8px 32px rgba(45, 37, 30, 0.08)",
    width: "100%",
    maxWidth: 290,
    alignSelf: "center",
    marginBottom: 8,
    boxSizing: "border-box",
  },

  ctaArea: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    animation: "fadeSlideUp 0.6s ease-out both",
    animationDelay: "0.3s",
  },

  phoneInput: {
    width: "100%",
    maxWidth: 240,
    alignSelf: "center",
    height: 44,
    borderRadius: 22,
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "rgba(180, 160, 130, 0.3)",
    padding: "0 16px",
    fontSize: 15,
    fontFamily: '"Be Vietnam Pro", sans-serif',
    color: "#3D3225",
    background: "rgba(255, 255, 255, 0.75)",
    boxSizing: "border-box",
    outline: "none",
    textAlign: "center",
    letterSpacing: 1,
    transition: "all 0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
  },
  phoneInputFocus: {
    borderColor: "#8B7355",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 0 0 3px rgba(139, 115, 85, 0.08)",
  },
  errorText: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 2,
    textAlign: "center",
    fontWeight: 500,
  },

  ctaButton: {
    width: "100%",
    maxWidth: 240,
    alignSelf: "center",
    height: 44,
    borderRadius: 22,
    border: "1px solid rgba(139, 90, 43, 0.22)",
    background: "rgba(253, 251, 247, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    color: "#8B5A2B",
    fontSize: 15,
    fontWeight: 800,
    fontFamily: '"Be Vietnam Pro", sans-serif',
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(45, 37, 30, 0.06)",
    transition: "all 0.2s ease",
    letterSpacing: 0.3,
  },
  ctaButtonHover: {
    background: "rgba(253, 251, 247, 0.95)",
    border: "1px solid rgba(139, 90, 43, 0.35)",
    transform: "scale(1.02)",
    boxShadow: "0 8px 24px rgba(45, 37, 30, 0.1)",
  },
  ctaButtonDisabled: {
    background: "rgba(253, 251, 247, 0.35)",
    border: "1px solid rgba(139, 90, 43, 0.12)",
    color: "rgba(74, 55, 40, 0.35)",
    cursor: "not-allowed",
    boxShadow: "none",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  footer: {
    fontSize: 10,
    color: "rgba(100, 110, 130, 0.75)",
    textAlign: "center",
    lineHeight: 1.5,
    marginTop: 4,
    padding: "0 4px",
  },
  footerLink: {
    color: "#1250DC",
    fontWeight: 600,
  },
};
