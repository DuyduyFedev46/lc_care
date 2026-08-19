// Màn 3.2 — Tưới cây (Water Action)
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { PlantHero } from "../../components/PlantComponents";
import { ICONS, PLANTS_DATA } from "../../config/constants";

export default function WaterScreen() {
  const { t } = useTranslation();
  const { navigate, state, update, waterHabit } = useApp();
  const allHabits = Array.isArray(state.habits) ? state.habits : [];
  // Only show active habits that haven't been completed
  const habits = allHabits.filter(h => h.active && !h.done);
  const allDone = allHabits.filter(h => h.active).length > 0 && allHabits.filter(h => h.active).every(h => h.done);
  const { plant } = state;
  const plantId = state.assignedPlant?.plant || "ginger";
  const plantData = PLANTS_DATA[plantId];
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("choose");
  const [drops, setDrops] = useState([]);
  const [floatingPts, setFloatingPts] = useState(null);

  const confirm = (habitId) => {
    setSelected(habitId);
    setPhase("animating");
    setDrops(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.12,
      xOffset: -6 + Math.random() * 12,
      yOffset: -6 + Math.random() * 12,
    })));
    setTimeout(() => {
      setFloatingPts(t("plus_10_points"));
      waterHabit(habitId);
      setPhase("done");
    }, 1800);
    setTimeout(() => navigate("home"), 3800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "linear-gradient(160deg, #083D1A 0%, #0D2A16 100%)", color: "#FFF", overflow: "hidden", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      <style>{`
        @keyframes mascotWatering {
          0% { transform: translate(50px, -20px) rotate(0deg); opacity: 0; }
          15% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          30% { transform: translate(-8px, 6px) rotate(-16deg); }
          75% { transform: translate(-8px, 6px) rotate(-16deg); }
          90% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        }
        @keyframes dripFall {
          0% { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          80% { transform: translate(-45px, 85px) scale(1) rotate(15deg); opacity: 1; }
          100% { transform: translate(-55px, 115px) scale(0.8) rotate(30deg); opacity: 0; }
        }
        @keyframes plantWatered {
          0% { transform: scale(1); }
          30% { transform: scale(1); }
          40% { transform: scale(1.06) rotate(1.5deg); filter: brightness(1.15) drop-shadow(0 0 10px rgba(74,222,128,0.6)); }
          55% { transform: scale(0.97) rotate(-1.5deg); }
          70% { transform: scale(1.04) rotate(1deg); filter: brightness(1.1) drop-shadow(0 0 8px rgba(74,222,128,0.4)); }
          85% { transform: scale(0.99) rotate(-0.5deg); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ width: "100%", display: "flex", alignItems: "center", paddingTop: "calc(8px + var(--sat, 0px))", marginBottom: 20 }}>
          <button onClick={() => navigate("home")} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, width: 40, height: 40, color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><img src={ICONS.ui_back_arrow} alt="back" style={{ width: 24, height: 24, objectFit: "contain" }} /></button>
          <div style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 17 }}><img src={ICONS.ui_water_drop} alt="" style={{ width: 20, height: 20, objectFit: "contain", verticalAlign: "middle" }} /> {t("water_plant_title", { name: plantData?.name || t("plant_ginger") })}</div>
          <div style={{ width: 40 }} />
        </div>

        <div style={{
          position: "relative",
          width: "280px",
          height: "220px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: 20,
          marginTop: 10
        }}>
          {/* Mascot pouring water */}
          {phase === "animating" && (
            <div style={{
              position: "absolute",
              top: "-15px",
              right: "-25px",
              width: "120px",
              height: "120px",
              zIndex: 3,
              animation: "mascotWatering 1.8s ease-in-out forwards",
              transformOrigin: "bottom left",
              pointerEvents: "none",
            }}>
              <img src={ICONS.mascot_watering} alt="Mascot" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          )}

          {/* Water drops coming from the spout */}
          {phase === "animating" && drops.map((d) => (
            <div key={d.id} style={{
              position: "absolute",
              top: `${45 + d.yOffset}px`,
              right: `${75 + d.xOffset}px`,
              zIndex: 4,
              animation: `dripFall 0.8s ${d.delay}s linear infinite`,
              pointerEvents: "none",
            }}>
              <img src={ICONS.ui_water_drop} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
            </div>
          ))}

          {/* Plant */}
          <div style={{
            animation: phase === "animating" ? "plantWatered 1.8s ease-in-out" : "plantSway 4s ease-in-out infinite",
            transformOrigin: "center bottom",
            zIndex: 2,
            marginBottom: 10
          }}>
            <PlantHero plantId={plant?.type || "ginger"} level={plant?.stage || 3} size={135} glow={phase !== "choose"} />
          </div>
        </div>

        {floatingPts && <div style={{ fontSize: 22, fontWeight: 800, color: "#F59E0B", animation: "floatUp 1.2s ease forwards", marginBottom: 8 }}>{floatingPts}</div>}

        {phase === "choose" && (
          <div style={{ width: "100%" }}>
            <div style={{ textAlign: "center", fontSize: 15, color: G.textLight, marginBottom: 20 }}>{t("water_which_habit")}</div>
            {habits.filter((h) => !h.done).map((h) => (
              <button key={h.id} onClick={() => confirm(h.id)} style={{
                width: "100%", background: "rgba(255,255,255,0.09)", border: "1.5px solid rgba(0,200,80,0.35)",
                borderRadius: 16, padding: "16px 18px", marginBottom: 12, cursor: "pointer", color: "#FFF",
                fontFamily: '"Be Vietnam Pro", sans-serif', textAlign: "left", display: "flex", alignItems: "center", gap: 12,
              }}>
                <img src={ICONS.ui_pill_medicine} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{h.name}</div>
                  <div style={{ fontSize: 13, color: G.textLight, marginTop: 2 }}>{h.time}</div>
                </div>
              </button>
            ))}
            {habits.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px", fontSize: 15, color: "var(--brand-light)" }}><img src={ICONS.ui_party_celebrate} alt="" style={{ width: 18, height: 18, objectFit: "contain", verticalAlign: "middle" }} /> {t("all_habits_done")}</div>
            )}
            <button onClick={() => navigate("home")} style={{ width: "100%", background: "none", border: "none", color: "#6B9A78", fontSize: 14, cursor: "pointer", marginTop: 4, fontFamily: '"Be Vietnam Pro", sans-serif' }}>{t("back")}</button>
          </div>
        )}

        {phase === "animating" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--brand-light)", marginBottom: 8 }}>{t("watering")}</div>
            <div style={{ fontSize: 14, color: G.textLight }}><img src={ICONS.ui_water_drop} alt="" style={{ width: 16, height: 16, objectFit: "contain", verticalAlign: "middle" }} /><img src={ICONS.ui_water_drop} alt="" style={{ width: 16, height: 16, objectFit: "contain", verticalAlign: "middle" }} /><img src={ICONS.ui_water_drop} alt="" style={{ width: 16, height: 16, objectFit: "contain", verticalAlign: "middle" }} /> {t("water_soaking")}</div>
          </div>
        )}

        {phase === "done" && (
          <div style={{ textAlign: "center", animation: "fadeSlideUp 0.5s ease" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--brand-light)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><img src={ICONS.ui_check_circle} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} /> {t("plant_watered")}</div>
            <div style={{ fontSize: 15, color: G.textLight, marginBottom: 4 }}>{t("streak_continues")} <img src={ICONS.ui_fire_streak} alt="" style={{ width: 16, height: 16, objectFit: "contain", verticalAlign: "middle" }} /></div>
            <div style={{ fontSize: 13, color: "#6B9A78" }}>{t("returning_home")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
