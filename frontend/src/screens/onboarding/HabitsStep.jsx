// Màn 1.5 — Habits: Thói quen + Vận động (Big mascot, pills & chips)
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G, lcStyles } from "../../components/DesignTokens";
import { OnboardingProgress, SpeechBubble } from "../../components/SharedUI";
import { ICONS } from "../../config/constants";
import { Dumbbell, Footprints, Sofa, Target, Moon, Wine, Utensils, Brain, Cigarette, Sparkles } from "lucide-react";

const STYLE_TAG = `
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
`;

const EXERCISE_OPTIONS = [
  { id: "active", labelKey: "exercise_regular", icon: Dumbbell, iconColor: "#10B981" },
  { id: "sometimes", labelKey: "exercise_sometimes", icon: Footprints, iconColor: "#3B82F6" },
  { id: "sedentary", labelKey: "exercise_low", icon: Sofa, iconColor: "#EA580C" },
  { id: "starting", labelKey: "exercise_start", icon: Target, iconColor: "#7C3AED" },
];

const BAD_HABITS = [
  { id: "latenight", labelKey: "bad_habit_late_sleep", icon: Moon, iconColor: "#3F51B5" },
  { id: "alcohol", labelKey: "bad_habit_alcohol", icon: Wine, iconColor: "#E91E63" },
  { id: "unhealthy_eating", labelKey: "bad_habit_rush_eating", icon: Utensils, iconColor: "#FF9800" },
  { id: "stress", labelKey: "bad_habit_stress", icon: Brain, iconColor: "#9C27B0" },
  { id: "smoking", labelKey: "bad_habit_smoking", icon: Cigarette, iconColor: "#607D8B" },
  { id: "ok", labelKey: "bad_habit_healthy_living", icon: Sparkles, iconColor: "#4CAF50", isNone: true },
];

export default function HabitsStep() {
  const { t } = useTranslation();
  const { navigate, update, state } = useApp();
  const [subStep, setSubStep] = useState(1);
  const [exercise, setExercise] = useState(state.userProfile?.exercise || "sometimes");
  const [badHabits, setBadHabits] = useState([]);
  const [btnHover, setBtnHover] = useState(false);

  const toggleHabit = (id) => {
    if (id === "ok") {
      setBadHabits(["ok"]);
      return;
    }
    setBadHabits(prev => {
      const withoutOk = prev.filter(x => x !== "ok");
      if (withoutOk.includes(id)) {
        const next = withoutOk.filter(x => x !== id);
        return next.length === 0 ? ["ok"] : next;
      }
      return [...withoutOk, id];
    });
  };

  const handleBack = () => {
    if (subStep === 2) {
      setSubStep(1);
    } else {
      const habits = badHabits.includes("ok") ? [] : badHabits;
      update({
        userProfile: { ...state.userProfile, exercise, badHabits: habits },
      });
      navigate("health-scan");
    }
  };

  const shouldShowPlantSelect = () => {
    const hs = state.userProfile?.healthStatus;
    const subs = state.userProfile?.chronicSubConditions || [];
    return hs === "chronic" && subs.length >= 2;
  };

  const handleNext = () => {
    if (subStep === 1) {
      setSubStep(2);
    } else {
      const habits = badHabits.includes("ok") ? [] : badHabits;
      update({
        userProfile: { ...state.userProfile, exercise, badHabits: habits },
      });
      navigate(shouldShowPlantSelect() ? "plant-select" : "seed-planted");
    }
  };

  const bubbleText = subStep === 1
    ? t("onboarding_exercise_question")
    : t("onboarding_bad_habit_question");

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div style={styles.root}>
        {/* Layer 1 — Background Image */}
        <div style={styles.bgLayer}>
          <img
            src="/assets/onboarding/bg_comic_p3.png"
            alt=""
            className="bg-image-responsive"
          />
        </div>

        {/* Speech Bubble — floats above mascot head */}
        <SpeechBubble text={bubbleText} />

        {/* Floating Transparent Header */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={handleBack}>
            <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        </div>
        <OnboardingProgress step={3} total={5} />

        {/* Layer 2 — UI controls */}
        <div style={styles.ctaLayer}>
          <div style={{ flex: 1 }} />

          <div style={styles.ctaCard}>
            {/* Scrollable content container */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, paddingRight: 4 }}>

              {subStep === 1 ? (
                /* Section 1: Exercise Level */
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  {EXERCISE_OPTIONS.map(opt => {
                    const active = exercise === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setExercise(opt.id)}
                        style={{
                          width: "100%",
                          padding: "12px 18px", borderRadius: 9999, fontSize: 14, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10,
                          border: "1.5px solid rgba(139, 90, 43, 0.18)",
                          background: active ? "#8B5A2B" : "#FAF5ED",
                          color: active ? "#FFFFFF" : "#4E3E31",
                          transition: "all 0.2s ease", cursor: "pointer",
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          boxShadow: "0 2px 6px rgba(93, 77, 61, 0.04)",
                          boxSizing: "border-box",
                        }}
                      >
                        {opt.icon && <opt.icon size={16} style={{ color: active ? "#FFFFFF" : opt.iconColor, flexShrink: 0 }} />}
                        <span>{t(opt.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Section 2: Habits to Improve */
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  {BAD_HABITS.map(h => {
                    const active = badHabits.includes(h.id);
                    return (
                      <button
                        key={h.id}
                        onClick={() => toggleHabit(h.id)}
                        style={{
                          width: "100%",
                          padding: "12px 18px", borderRadius: 9999, fontSize: 14, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 10,
                          border: "1.5px solid rgba(139, 90, 43, 0.18)",
                          background: active ? "#8B5A2B" : "#FAF5ED",
                          color: active ? "#FFFFFF" : "#4E3E31",
                          transition: "all 0.2s ease", cursor: "pointer",
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          boxShadow: "0 2px 6px rgba(93, 77, 61, 0.04)",
                          boxSizing: "border-box",
                        }}
                      >
                        {h.icon && <h.icon size={16} style={{ color: active ? "#FFFFFF" : h.iconColor, flexShrink: 0 }} />}
                        <span>{t(h.labelKey)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sticky footer button container */}
            <div style={{ flexShrink: 0, marginTop: 12, display: "flex", flexDirection: "column" }}>
              <button
                onClick={handleNext}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  ...styles.ctaButton,
                  ...(btnHover ? styles.ctaButtonHover : {}),
                }}
              >
                {t("next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',

  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
  header: {
    position: "absolute",
    top: "calc(10px + var(--sat, 0px))",
    left: 0,
    right: 0,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    zIndex: 10,
  },
  backBtn: {
    background: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(139, 90, 43, 0.2)",
    width: 32,
    height: 32,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  ctaLayer: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0 12px 16px",
    boxSizing: "border-box",
  },
  ctaCard: {
    padding: "16px 12px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 440,
    maxHeight: "62dvh",
    alignSelf: "stretch",
    marginBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
    boxSizing: "border-box",
  },
  ctaButton: {
    alignSelf: "center",
    background: "#FCEEDB",
    border: "1.5px solid rgba(139, 90, 43, 0.15)",
    borderRadius: 9999,
    padding: "9px 32px",
    fontSize: 15,
    fontWeight: 700,
    color: "#4E3E31",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    marginTop: 4,
    boxShadow: "0 4px 12px rgba(93, 77, 61, 0.08)",
    lineHeight: 1,
  },
  ctaButtonHover: {
    background: "#FAF0E2",
    transform: "scale(1.03)",
    boxShadow: "0 6px 16px rgba(93, 77, 61, 0.12)",
  },
};
