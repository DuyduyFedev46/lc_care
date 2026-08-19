// Màn 4.1 — Level Up + Badge
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { PlantHero } from "../../components/PlantComponents";
import { ICONS } from "../../config/constants";

export default function LevelUpScreen() {
  const { t } = useTranslation();
  const { navigate, state, update } = useApp();
  const [phase, setPhase] = useState(0);
  const [confetti, setConfetti] = useState([]);

  const streak = state.streak ?? 14;
  const plantId = state.assignedPlant?.plant || "ginger";
  const stage = state.plant?.stage || 3;
  const badgeName = streak >= 30 ? t("badge_name_garden") : streak >= 14 ? t("badge_name_tree") : t("badge_name_sprout");
  const badgeIcon = streak >= 30 ? ICONS.badge_garden : streak >= 14 ? ICONS.badge_tree : ICONS.badge_sprout;
  
  const ms = { days: streak, badge: badgeIcon, name: badgeName, pts: 50, stage: stage };

  useEffect(() => {
    setTimeout(() => { setPhase(1); setConfetti(Array.from({ length: 30 }, (_, i) => ({ id: i, x: Math.random() * 100, delay: Math.random() * 0.8, dur: 1.5 + Math.random(), size: 8 + Math.random() * 10, color: ["var(--success)", "var(--brand-light)", "#F59E0B", "#FFD700", "#FFF", "var(--success-pale)"][i % 6] }))); }, 300);
    setTimeout(() => setPhase(2), 1200);
    setTimeout(() => setPhase(3), 2000);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0D2A18", overflow: "hidden", fontFamily: '"Be Vietnam Pro", sans-serif', position: "relative" }}>


      {confetti.map((p) => (
        <div key={p.id} style={{ position: "absolute", top: "-12px", left: `${p.x}%`, width: p.size, height: p.size, borderRadius: p.id % 4 === 0 ? "3px" : "50%", background: p.color, animation: `confettiFall ${p.dur}s ${p.delay}s ease-in infinite`, zIndex: 1 }} />
      ))}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", zIndex: 2, position: "relative" }}>
        {phase >= 1 && (
          <div style={{ animation: "plantGrow 0.6s ease" }}>
            <PlantHero plantId={plantId} level={ms.stage} size={140} glow={true} />
          </div>
        )}
        {phase >= 2 && (
          <div style={{ animation: "fadeSlideUp 0.5s ease", textAlign: "center", marginTop: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FFF", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}><img src={ICONS.ui_party_celebrate} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} /> Level Up!</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--brand-light)", marginTop: 6 }}>{t("days_continuous", { n: ms.days })}</div>
          </div>
        )}
        {phase >= 3 && (
          <div style={{ animation: "fadeSlideUp 0.5s ease", background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "24px", width: "100%", marginTop: 20, border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <img src={ms.badge} alt={ms.name} style={{ width: 56, height: 56, objectFit: "contain", margin: "0 auto", display: "block" }} />
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FFF", marginTop: 8 }}>{t("new_badge_short")}: {ms.name}</div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {[<span key="1" style={{ display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_fire_streak} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("days_continuous", { n: ms.days })}</span>, <span key="2" style={{ display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_trophy_cup} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("new_badge_short")}</span>, <span key="3" style={{ display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_gift_box} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("plus_n_points", { pts: ms.pts })}</span>].map((item, i) => (
                <div key={i} style={{ background: "rgba(0,146,63,0.25)", borderRadius: 12, padding: "8px 14px", fontSize: 13, color: "#C0E8C8", fontWeight: 600 }}>{item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      {phase >= 3 && (
        <div style={{ padding: "12px 20px 16px", background: "transparent", flexShrink: 0 }}>
          <button style={{ width: "100%", height: 52, borderRadius: 16, background: "var(--success)", color: "#FFF", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}
            onClick={() => { update({ plant: { stage: ms.stage }, points: (state.points || 0) + ms.pts }); navigate("home"); }}>
            {t("keep_growing")} <img src={ms.badge} alt="" style={{ width: 20, height: 20, objectFit: "contain", verticalAlign: "middle" }} />
          </button>
        </div>
      )}
    </div>
  );
}
