// Màn 2.2 — Hạt nảy mầm (Germination Animation)
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { PlantHero } from "../../components/PlantComponents";
import { ICONS, PLANTS_DATA } from "../../config/constants";

export default function GerminationScreen() {
  const { t } = useTranslation();
  const { navigate, update, state } = useApp();
  const plantId = state.assignedPlant?.plant || "ginger";
  const plantData = PLANTS_DATA[plantId];
  const [phase, setPhase] = useState(0);
  const [plantStage, setPlantStage] = useState(0);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const seq = [
      [500, () => setPhase(1)],
      [1200, () => { setPhase(2); setPlantStage(1); }],
      [2400, () => { setPhase(3); setPlantStage(2); }],
      [3200, () => {
        setPhase(4); setPlantStage(3);
        setConfetti(Array.from({ length: 24 }, (_, i) => ({
          id: i, x: Math.random() * 100, delay: Math.random() * 0.6,
          dur: 1.4 + Math.random() * 0.8, size: 8 + Math.random() * 10,
          color: ["var(--success)", "var(--brand-light)", "#F59E0B", "#FFD700", "#FFF", "var(--success-pale)"][i % 6],
        })));
      }],
      [4000, () => setPhase(5)],
    ];
    const timers = seq.map(([ms, fn]) => setTimeout(fn, ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    update({ plantActivated: true });
    navigate("home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "linear-gradient(160deg, #0D2A18 0%, #0A1F10 100%)", overflow: "hidden", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      {confetti.map((p) => (
        <div key={p.id} style={{ position: "absolute", top: "-12px", left: `${p.x}%`, zIndex: 10, width: p.size, height: p.size, borderRadius: p.id % 3 === 0 ? "50%" : "3px", background: p.color, animation: `confettiFall ${p.dur}s ${p.delay}s ease-in infinite` }} />
      ))}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{
          marginBottom: 20,
          animation: phase === 1 ? "seedShake 0.4s ease-in-out 2" : phase >= 3 ? "plantSway 4s ease-in-out infinite" : undefined,
          transformOrigin: "center bottom", transition: "transform 0.8s ease",
        }}>
          <PlantHero plantId={plantId} level={Math.max(plantStage, 1)} size={phase >= 3 ? 130 : 100} glow={phase >= 3} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#FFF", marginBottom: 8, textAlign: "center" }}>
          {phase < 3 && <span style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><img src={ICONS.badge_sprout} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} /> {t("seed_germinating")}</span>}
          {phase === 3 && <span style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><img src={ICONS.badge_tree} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} /> {t("sprout_growing")}</span>}
          {phase >= 4 && <span style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><img src={ICONS.ui_party_celebrate} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} /> {plantData?.name || t("plant_ginger")} {t("plant_watered")}</span>}
        </div>
        {phase >= 4 && (
          <div style={{ fontSize: 15, color: "var(--brand-light)", fontWeight: 700, marginBottom: 20, animation: "fadeSlideUp 0.5s ease", display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
            <img src={plantData?.icon || ICONS.plant_ginger} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} /> {plantData?.name || t("plant_ginger")} · {plantData?.journeyLabel?.toUpperCase() || t("journey_ginger").toUpperCase()}
          </div>
        )}
        {phase >= 5 && (
          <div style={{ background: "rgba(255,255,255,0.09)", borderRadius: 20, padding: "20px", width: "100%", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#FFF", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_pharmacist} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} /> {t("pharmacist_activated_careplan")}</div>
            <div style={{ fontSize: 13, color: "#A0DEB8", marginBottom: 14, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_document_clipboard} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("careplan_label")}</div>
            {[<span key="1"><img src={ICONS.ui_pill_medicine} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> Amlodipine 5mg — {t("morning")} ({t("after_meal")})</span>, <span key="2"><img src={ICONS.ui_pill_medicine} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> Metformin 500mg — {t("morning")} & {t("evening")}</span>, <span key="3"><img src={ICONS.ui_chart_bar} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> {t("careplan_bp_item")}</span>].map((item, i) => (
              <div key={i} style={{ fontSize: 13, color: "#C8E8D0", marginBottom: 6 }}>• {item}</div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(0,146,63,0.25)", borderRadius: 10, fontSize: 13, color: "#8FD4A8" }}>
              <img src={ICONS.ui_note_pencil} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> "{t("careplan_pharmacist_note")}"
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: "#F59E0B", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_fire_streak} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("streak_maintained")}</div>
          </div>
        )}
      </div>
      {phase >= 5 && (
        <div style={{ padding: "12px 20px 16px", background: "transparent", flexShrink: 0 }}>
          <button style={{ width: "100%", height: 52, borderRadius: 16, background: "var(--success)", color: "#FFF", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', boxShadow: "0 4px 16px rgba(0,146,63,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={handleEnter}>
            {t("go_to_garden_careplan")} <img src={ICONS.badge_tree} alt="" style={{ width: 20, height: 20, objectFit: "contain" }} />
          </button>
        </div>
      )}
    </div>
  );
}
