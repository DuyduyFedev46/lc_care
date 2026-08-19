// IsometricGarden — Game garden with transform: scale() approach
// Image + overlay scale together → % positions always match image pixels
// HUD stays outside scaled wrapper → no distortion
import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const F = '"Be Vietnam Pro", sans-serif';

const ASSETS = {
  bg: "/assets/backgrounds/bg_family_garden.webp?v=9",
  mascot: {
    idle: "/assets/mascot/mascot_waving.webp",
    celebrate: "/assets/mascot/mascot_celebrating.webp",
  },
  icons: {
    fire: "/assets/icons/ui_fire_streak.webp",
    water: "/assets/icons/ui_water_drop.webp",
    clock: "/assets/icons/ui_pending_clock.webp",
    cap: "/assets/icons/ui_graduate_cap.webp",
  },
  plants: {
    gung: "/assets/plants/plant_ginger_lv5.webp",
    nghe: "/assets/plants/plant_turmeric_lv5.webp",
    rauma: "/assets/plants/plant_pennywort_lv5.webp",
    sa: "/assets/plants/plant_lemongrass_lv5.webp",
    tiato: "/assets/plants/plant_perilla_lv5.webp",
    sen: "/assets/plants/plant_lotus_lv5.webp",
    tra: "/assets/plants/plant_tea_lv5.webp",
  },
};

// Tọa độ đã được chỉnh tay trên DevTools — verified.
const PLOTS = [
  { id: 0, x: 39,   y: 41 },  // back-left
  { id: 1, x: 62,   y: 62 },  // mid-left
  { id: 2, x: 53,   y: 46 },  // front-left
  { id: 3, x: 53,   y: 37 },  // back-right
  { id: 4, x: 76,   y: 50 },  // mid-right
  { id: 5, x: 66,   y: 40 },  // front-right
];
const MASCOT_POS = { x: 43, y: 63 };

function getPlantAsset(id, level = 1) {
  if (!id) return null;
  const cleanId = id.replace("plant_", "").replace("-", "");
  const stage = Math.min(Math.max(level || 1, 1), 5);
  return `/assets/plants/plant_${cleanId}_lv${stage}.webp`;
}
function getState(m) {
  if (m.state) return m.state;
  return m.status === "growing" ? "ACTIVE" : m.status === "pending" ? "PENDING" : "ACTIVE";
}
const SC = { ACTIVE: "#4CAF50", PENDING: "#F59E0B", NEEDS_WATER: "#EF4444", GRADUATED: "#A855F7" };

export default function IsometricGarden({ members = [], onWaterPlant, stats, careTeamInsight, style }) {
  const { t } = useTranslation();
  const [mState, setMState] = useState("IDLE");
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState(null);
  const [showBubble, setShowBubble] = useState(true);

  // Auto-hide speech bubble after 5s so it doesn't block plants
  useEffect(() => {
    if (showBubble) {
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showBubble]);

  const slots = PLOTS.map((p, i) => ({ ...p, member: members[i] || null }));

  const water = useCallback((member, id) => {
    const s = getState(member);
    if (s !== "ACTIVE" && s !== "NEEDS_WATER") return;
    if (mState !== "IDLE") return;
    setActiveId(id); setMState("MOVING");
    setTimeout(() => setMState("WATERING"), 600);
    setTimeout(() => setMState("BURST"), 1800);
    setTimeout(() => {
      setMState("CELEBRATION");
      setToast(t("iso_watered_toast", { plant: member.plantName || t("your_plant"), name: member.name }));
      if (onWaterPlant) onWaterPlant(member);
    }, 2800);
    setTimeout(() => { setMState("IDLE"); setActiveId(null); setToast(null); }, 5000);
  }, [mState, onWaterPlant]);

  const ap = activeId !== null ? PLOTS[activeId] : null;
  const mx = ap ? ap.x : MASCOT_POS.x;
  const my = ap ? ap.y : MASCOT_POS.y;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "var(--garden-sky)", overflow: "hidden", ...style }}>

      {/* ===== SCALED SCENE: image + overlays scale together ===== */}
      <div style={{
        position: "relative",
        width: "100%",
        transform: "scale(1.3)",
        transformOrigin: "center 45%",
      }}>
        {/* Island image — determines scene dimensions */}
        <img src={ASSETS.bg} alt={t("aria_garden_bg")} style={{ width: "100%", display: "block", userSelect: "none", pointerEvents: "none" }} />

        {/* Overlay: same size as image. All children use image-% coordinates */}
        <div style={{ position: "absolute", inset: 0 }}>

          {/* Plants on soil circles */}
          {slots.map(slot => {
            const m = slot.member;
            const s = m ? getState(m) : null;
            const plant = m ? getPlantAsset(m.plant, m.level) : null;
            const isT = activeId === slot.id;
            const burst = isT && mState === "BURST";
            const watering = isT && mState === "WATERING";
            const canW = s === "ACTIVE" || s === "NEEDS_WATER";
            return (
              <div key={slot.id}
                onClick={() => m && canW && water(m, slot.id)}
                style={{
                  position: "absolute", left: `${slot.x}%`, top: `${slot.y}%`,
                  transform: "translate(-50%,-85%)",
                  zIndex: Math.floor(slot.y / 10),
                  display: "flex", flexDirection: "column", alignItems: "center",
                  cursor: m && canW ? "pointer" : "default",
                }}>
                {!m ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 32, height: 16, border: "2px dashed rgba(255,255,255,0.3)", borderRadius: 999, background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContext: "center" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 700 }}>+</span>
                    </div>
                    <span style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", fontFamily: F, marginTop: 1 }}>{t("invite_member_short")}</span>
                  </div>
                ) : !plant ? (
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 32, height: 16, border: "2px dashed #F59E0B", borderRadius: 999, background: "rgba(245,158,11,0.1)" }} />
                    <img src={ASSETS.icons.clock} alt="" style={{ position: "absolute", top: -12, right: -8, width: 14, height: 14, animation: "pp 1.8s ease-in-out infinite" }} />
                    <Tag m={m} s={s} />
                  </div>
                ) : (
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={plant} alt={m.plantName || ""} style={{
                      width: 80, height: 80, objectFit: "contain",
                      transformOrigin: "bottom center",
                      transition: "transform 0.5s ease, filter 0.4s",
                      transform: burst ? "scale(1.25)" : "scale(1)",
                      filter: [
                        s === "PENDING" ? "grayscale(75%)" : "",
                        s === "NEEDS_WATER" ? "grayscale(25%) brightness(0.78)" : "",
                        s === "ACTIVE" ? "drop-shadow(0 0 5px rgba(0,146,63,0.5))" : "",
                        s === "GRADUATED" ? "drop-shadow(0 0 7px rgba(168,85,247,0.6))" : "",
                        burst ? "drop-shadow(0 0 14px rgba(0,230,118,0.9)) brightness(1.2)" : "",
                      ].filter(Boolean).join(" ") || "none",
                      animation: s === "ACTIVE" ? "sway 3s ease-in-out infinite" : "none",
                    }} />
                    {s === "PENDING" && (
                      <img src={ASSETS.icons.clock} alt="" style={{ position: "absolute", top: 12, right: 6, width: 14, height: 14, animation: "pp 1.8s ease-in-out infinite" }} />
                    )}
                    {watering && [...Array(4)].map((_, i) => (
                      <img key={i} src={ASSETS.icons.water} alt="" style={{
                        position: "absolute", width: 8, height: 8,
                        left: `${15 + i * 20}%`, top: `${-5 + (i % 2) * 15}%`,
                        animation: `wf 0.8s ease-in ${i * 0.1}s infinite`,
                      }} />
                    ))}
                    {burst && <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", color: "#F59E0B", fontWeight: 800, fontSize: 10, animation: "fu 1s ease-out forwards", whiteSpace: "nowrap", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontFamily: F }}>+10 ⭐</div>}
                    <Tag m={m} s={s} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Mascot on stone pathway */}
          <div style={{
            position: "absolute", left: `${mx}%`, top: `${my}%`,
            transform: "translate(-50%,-90%)", zIndex: 10,
            display: "flex", flexDirection: "column", alignItems: "center",
            pointerEvents: "none",
            transition: "left 0.7s cubic-bezier(0.34,1.2,0.64,1), top 0.7s cubic-bezier(0.34,1.2,0.64,1)",
          }}>
            {mState === "IDLE" && showBubble && careTeamInsight ? (
              <div style={{
                maxWidth: 140, background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))",
                border: "1.5px solid var(--garden-border-active)", borderRadius: "10px 10px 10px 2px",
                padding: "4px 7px", marginBottom: 3, fontFamily: F,
                boxShadow: "var(--glass-shadow)",
                animation: "sb 3s ease-in-out infinite",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
                  <span style={{ fontSize: 6, fontWeight: 800, color: "var(--success)" }}>CARE TEAM</span>
                  <span style={{ background: "var(--success-pale)", color: "var(--success)", fontSize: 5, fontWeight: 700, padding: "0 3px", borderRadius: 999 }}>✅</span>
                </div>
                <div style={{ fontSize: 8, color: "var(--text)", lineHeight: 1.4 }}>{careTeamInsight.text}</div>
                <div style={{ fontSize: 6, color: "var(--text-mid)", marginTop: 1 }}>— {careTeamInsight.pharmacist}</div>
              </div>
            ) : mState === "IDLE" ? (
              <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "10px 10px 10px 2px", padding: "2px 7px", fontSize: 8, fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", boxShadow: "0 2px 6px rgba(0,0,0,0.12)", marginBottom: 2, fontFamily: F, animation: "sb 2.5s ease-in-out infinite" }}>
                {t("iso_water_cta")}
              </div>
            ) : null}
            <img src={mState === "CELEBRATION" ? ASSETS.mascot.celebrate : ASSETS.mascot.idle} alt="Mascot"
              style={{
                width: 52, objectFit: "contain",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
                transform: mState === "WATERING" ? "rotate(15deg) scale(0.92)" : mState === "BURST" || mState === "CELEBRATION" ? "translateY(-6px) scale(1.08)" : "none",
                animation: mState === "IDLE" ? "mb 3s ease-in-out infinite" : "none",
              }} />
          </div>
        </div>
      </div>
      {/* ===== END SCALED SCENE ===== */}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sway { 0%,100%{transform:rotate(-1.5deg) scale(1)} 50%{transform:rotate(1.5deg) scale(1.02)} }
        @keyframes pp { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.88)} }
        @keyframes wf { 0%{transform:translateY(-4px);opacity:1} 100%{transform:translateY(16px);opacity:0} }
        @keyframes fu { 0%{transform:translateX(-50%) translateY(0);opacity:1} 100%{transform:translateX(-50%) translateY(-18px);opacity:0} }
        @keyframes mb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes sb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-2px) scale(1.01)} }
      `}} />
    </div>
  );
}

function Tag({ m, s }) {
  const c = SC[s] || SC.ACTIVE;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -2 }}>
      <div style={{ position: "relative" }}>
        {s === "NEEDS_WATER" && <img src={ASSETS.icons.water} alt="" style={{ position: "absolute", top: -2, right: -12, width: 12, height: 12, zIndex: 10, animation: "pp 1s ease-in-out infinite" }} />}
        {s === "GRADUATED" && <img src={ASSETS.icons.cap} alt="" style={{ position: "absolute", top: -4, right: -12, width: 14, height: 14, zIndex: 10 }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", borderRadius: 999, padding: "1px 5px 1px 2px", border: `1.5px solid ${c}55`, boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
          {m.avatar && (
            <img 
              src={m.avatar} 
              alt="" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/mascot/mascot_avatar.webp";
              }}
              style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid #fff", objectFit: "cover", filter: s === "PENDING" ? "grayscale(100%)" : "none" }} 
            />
          )}
          <span style={{ fontSize: 7, fontWeight: 700, color: "#fff", fontFamily: F }}>{m.name}</span>
        </div>
      </div>
      {(m.streak > 0 || s === "ACTIVE") && s !== "PENDING" && (
        <div style={{ marginTop: 1, display: "flex", alignItems: "center", gap: 1, background: "var(--surface)", borderRadius: 999, padding: "0 4px 0 3px", border: "1px solid var(--border)" }}>
          <img src={ASSETS.icons.fire} alt="" style={{ width: 7, height: 7 }} />
          <span style={{ fontSize: 6, fontWeight: 800, color: "var(--accent-gold)", fontFamily: F }}>{m.streak || 0}</span>
        </div>
      )}
      {s === "PENDING" && <div style={{ marginTop: 1, fontSize: 6, fontWeight: 700, color: "var(--accent-gold)", background: "var(--accent-gold-bg)", padding: "0 6px", borderRadius: 999, fontFamily: F }}>{i18n.t("pending_label")}</div>}
    </div>
  );
}

function HP({ icon, iconSrc, v, l, hot }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: 999, padding: "3px 8px", border: hot ? "1.5px solid rgba(234,88,12,0.5)" : "1px solid rgba(255,255,255,0.12)" }}>
      {iconSrc ? <img src={iconSrc} alt="" style={{ width: 11, height: 11 }} /> : <span style={{ fontSize: 10 }}>{icon}</span>}
      <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: F }}>{v}</span>
      <span style={{ fontSize: 7, color: "rgba(255,255,255,0.6)", fontFamily: F }}>{l}</span>
    </div>
  );
}
