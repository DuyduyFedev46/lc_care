// Celebration.jsx — Task B2: Wow overlay for achievements & milestones
// Used for: streak badges, family milestones, voucher redeem, level-up
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const F = '"Be Vietnam Pro", sans-serif';

// ── Simple canvas confetti ────────────────────────────────────────────
function Confetti({ active }) {
  useEffect(() => {
    if (!active) return;
    const canvas = document.getElementById("lc-confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = ["#22C55E","#F59E0B","#3B82F6","#EC4899","#8B5CF6","#10B981","#EAB308"];
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 40,
      r: 4 + Math.random() * 5,
      d: 3 + Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleInc: 0.07 + Math.random() * 0.05,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.d;
        p.x += Math.sin(p.tiltAngle) * 1.2;
        p.tilt = Math.sin(p.tiltAngle) * 13;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.45, (p.tilt * Math.PI) / 180, 0, 2 * Math.PI);
        ctx.fill();
        if (p.y > canvas.height + 20) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      id="lc-confetti-canvas"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998 }}
    />
  );
}

// ── Badge reveal card ─────────────────────────────────────────────────
function BadgeCard({ badge }) {
  const { t } = useTranslation();
  return (
    <div style={{
      background: `linear-gradient(135deg, ${badge.gradient[0]}, ${badge.gradient[1]})`,
      borderRadius: 24, padding: "28px 24px",
      textAlign: "center", color: "#fff",
      boxShadow: `0 12px 40px ${badge.gradient[0]}55`,
      animation: "celebrationPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", top: 0, left: "-60%", width: "50%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        animation: "shimmerSweep 1.5s ease 0.3s forwards",
        pointerEvents: "none",
      }} />
      <div style={{ fontSize: 56, marginBottom: 12, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>
        {badge.icon}
      </div>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.85, marginBottom: 6, fontFamily: F }}>
        {t("new_badge")}
      </div>
      <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, fontFamily: F }}>
        {badge.bkey ? t(`${badge.bkey}_title`) : badge.title}
      </div>
      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, fontFamily: F }}>
        {badge.bkey ? t(`${badge.bkey}_desc`) : badge.desc}
      </div>
    </div>
  );
}

// ── Main Celebration Overlay ──────────────────────────────────────────
// Props:
//   type: "badge" | "milestone" | "voucher"
//   badge: achievement object (type="badge")
//   title / desc / icon: for milestone & voucher
//   onClose: () => void
export default function Celebration({ type = "badge", badge, title, desc, icon, onClose }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  // Auto-dismiss after 4s
  useEffect(() => {
    const t = setTimeout(handleClose, 4000);
    return () => clearTimeout(t);
  }, [handleClose]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes celebrationPop {
          0%   { transform: scale(0.5) translateY(20px); opacity: 0; }
          100% { transform: scale(1)   translateY(0);    opacity: 1; }
        }
        @keyframes shimmerSweep {
          0%   { left: -60%; }
          100% { left: 160%; }
        }
        @keyframes celebFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
      <Confetti active={true} />
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,0,0,0.65)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          animation: "celebFadeIn 0.25s ease",
        }}
        onClick={handleClose}
      >
        <div style={{ width: "100%", maxWidth: 340 }} onClick={e => e.stopPropagation()}>
          {type === "badge" && badge ? (
            <BadgeCard badge={badge} />
          ) : (
            // Generic milestone/voucher card
            <div style={{
              background: "linear-gradient(135deg, #1A4A2E, #2D7A4F)",
              borderRadius: 24, padding: "28px 24px",
              textAlign: "center", color: "#fff",
              boxShadow: "0 12px 40px rgba(45,122,79,0.45)",
              animation: "celebrationPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>{icon || "🎉"}</div>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, fontFamily: F }}>
                {title || t("congrats")}
              </div>
              <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, fontFamily: F }}>
                {desc || ""}
              </div>
            </div>
          )}

          <button
            onClick={handleClose}
            style={{
              marginTop: 20, width: "100%", height: 52, borderRadius: 16,
              background: "rgba(255,255,255,0.18)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#fff", fontSize: 16, fontWeight: 700,
              cursor: "pointer", fontFamily: F, backdropFilter: "blur(8px)",
            }}
          >
            {t("keep_going")}
          </button>
        </div>
      </div>
    </>
  );
}

// ── useCelebration hook ───────────────────────────────────────────────
// Manages a queue of celebrations so they don't overlap
import { useRef } from "react";

export function useCelebration() {
  const [queue, setQueue] = useState([]);

  const celebrate = useCallback((item) => {
    setQueue(prev => [...prev, { ...item, key: Date.now() + Math.random() }]);
  }, []);

  const dismissTop = useCallback(() => {
    setQueue(prev => prev.slice(1));
  }, []);

  const current = queue[0] || null;

  return { current, celebrate, dismissTop };
}
