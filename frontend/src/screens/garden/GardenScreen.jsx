// Màn 3.1 — Home Screen: single-plant garden + approval-gated + Family + Plant-themed
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { SeedPlant, PlantHero } from "../../components/PlantComponents";
import { StreakBadge, JourneyTag } from "../../components/SharedUI";
import { PLANTS_DATA, ICONS } from "../../config/constants";
import { stageName } from "../../config/stageNames";
import { Droplet, ClipboardList, ArrowLeft, Gift, Trophy, X, Plus, Sparkles, Heart, RefreshCw, Bell, Lock } from "lucide-react";
import DynamicMascot from "../../components/garden/DynamicMascot";
import Celebration from "../../components/Celebration";
import HealthSummaryBoard from "../../components/HealthSummaryBoard";
import { checkNewAchievements, getNextAchievement, ACHIEVEMENTS } from "../../config/achievements";

function getGreeting(t) {
  const h = new Date().getHours();
  if (h < 12) return t("greeting_morning");
  if (h < 18) return t("greeting_afternoon");
  return t("greeting_evening");
}

function formatDate(t) {
  const d = new Date();
  const days = [t("day_sun"), t("day_mon"), t("day_tue"), t("day_wed"), t("day_thu"), t("day_fri"), t("day_sat")];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${days[d.getDay()]}, ${dd}/${mm}/${d.getFullYear()}`;
}

const WORLD_W = 576, WORLD_H = 1024;
const POT_X = 50, POT_Y = 73;
const MASCOT_X = 65, MASCOT_Y = 73;

export default function GardenScreen() {
  const { t } = useTranslation();
  const { navigate, goBack, state, update, showToast, waterHabit, retry, toggleHabitActive, addCustomHabit, simulateStreak } = useApp();
  const { streak = 0, points = 0, todayWatered, loading, error, initialized } = state;

  // Defensive: ensure habits is always an array
  const habits = Array.isArray(state.habits) ? state.habits : [];
  const assignedPlant = state.assignedPlant;
  const plantApproval = state.plantApproval;

  // Real plant from assignment, with fallback
  const plantId = assignedPlant?.plant || "ginger";

  // Determine plant level dynamically based on current streak (synced with backend logic)
  let plantLevel = 1;
  if (streak >= 30) {
    plantLevel = 4;
  } else if (streak >= 15) {
    plantLevel = 3;
  } else if (streak >= 8) {
    plantLevel = 2;
  }
  // Defensive: ensure plantSummary is a renderable string, not an object
  const plantSummary = typeof state.plantSummary === "string" ? state.plantSummary : null;
  // Defensive: ensure familyMembers is always an array
  const familyMembers = Array.isArray(state.familyMembers) ? state.familyMembers : [];

  // Split habits into active daily tasks and optional (unlockable)
  const activeHabits = habits.filter((h) => h.active);
  const optionalHabits = habits.filter((h) => !h.active);
  const allDone = activeHabits.length > 0 && activeHabits.every((h) => h.done);

  // Custom habit add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitTime, setNewHabitTime] = useState("");
  const [showOptional, setShowOptional] = useState(false);

  // Slide-up bottom sheet state
  const [showHabitsSheet, setShowHabitsSheet] = useState(false);
  // Points → Voucher nudge sheet
  const [showPointsSheet, setShowPointsSheet] = useState(false);
  // First-run coachmark
  const [showCoach, setShowCoach] = useState(() => !localStorage.getItem("lc_care_home_coach_seen"));
  const [coachStep, setCoachStep] = useState(0);
  // Health Summary sheet (triggered from sidebar)
  const [showHealthSummary, setShowHealthSummary] = useState(false);


  // Water floater & Milestone Popup states
  const [floaters, setFloaters] = useState([]);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [mascotState, setMascotState] = useState("idle");
  const [allDoneCelebration, setAllDoneCelebration] = useState(false);
  // Task B3: achievement celebration queue
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [sceneScale, setSceneScale] = useState(1);

  // Monitor streak to show milestone popups
  useEffect(() => {
    if (initialized && (streak === 7 || streak === 14 || streak === 30)) {
      const key = `lc_care_milestone_seen_${streak}`;
      if (!localStorage.getItem(key)) {
        setActiveMilestone(streak);
      }
    }
  }, [streak, initialized]);

  const closeMilestone = () => {
    if (activeMilestone) {
      localStorage.setItem(`lc_care_milestone_seen_${activeMilestone}`, "true");
      setActiveMilestone(null);
    }
  };

  // Mascot entrance effect on mount
  useEffect(() => {
    setMascotState("entering");
    const t = setTimeout(() => setMascotState("idle"), 1300);
    return () => clearTimeout(t);
  }, []);

  // Mascot chat bubble — contextual by plant + level
  const [mascotBubble, setMascotBubble] = useState(null);

  // Mascot celebration effect on level up
  const prevLevelRef = useRef(plantLevel);
  useEffect(() => {
    if (initialized && plantLevel > prevLevelRef.current) {
      setMascotState("celebrating");
      const t = setTimeout(() => {
        setMascotState("idle");
        navigate("level-up");
      }, 1500);
      prevLevelRef.current = plantLevel;
      return () => clearTimeout(t);
    }
    prevLevelRef.current = plantLevel;
  }, [plantLevel, initialized, navigate]);

  useEffect(() => {
    const root = document.getElementById("root");
    const recalc = () => {
      const w = root?.clientWidth || window.innerWidth;
      const h = root?.clientHeight || window.innerHeight;
      setSceneScale(Math.max(w / WORLD_W, h / WORLD_H));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const markHabit = (id) => {
    setMascotState("watering");
    waterHabit(id);
    const newFloater = { id: Date.now(), text: "+10 💧" };
    setFloaters((prev) => [...prev, newFloater]);
    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== newFloater.id));
    }, 2000);

    // Check if this was the last undone habit → All-Done celebration
    const remainingUndone = activeHabits.filter(h => !h.done && h.id !== id);
    if (remainingUndone.length === 0 && activeHabits.length > 0) {
      setTimeout(() => {
        setMascotState("celebrating");
        setAllDoneCelebration(true);
        showToast(t("all_tasks_done"));

        // Task B3: check for newly unlocked achievements
        const alreadyUnlocked = JSON.parse(localStorage.getItem("lc_care_achievements") || "[]");
        const newBadges = checkNewAchievements(
          { ...state, streak: (state.streak || 0) + 1, plantLevel },
          alreadyUnlocked
        );
        if (newBadges.length > 0) {
          const newIds = newBadges.map(b => b.id);
          localStorage.setItem("lc_care_achievements", JSON.stringify([...alreadyUnlocked, ...newIds]));
          // Queue after allDone animation (2s delay so they don't overlap)
          setTimeout(() => setAchievementQueue(newBadges), 2000);
        }
      }, 800);
      setTimeout(() => {
        setAllDoneCelebration(false);
        setMascotState("idle");
      }, 4500);
    } else {
      setTimeout(() => {
        setMascotState("idle");
      }, 2500);
    }
  };



  const plantData = PLANTS_DATA[plantId];
  const isPending = plantApproval === "pending_review";

  // Mascot bubble effect — must be after plantData/isPending
  useEffect(() => {
    if (!initialized) return;
    const plantName = t(`plant_${plantId}`, { defaultValue: plantData?.name || "" });
    // Plant-specific messages by level — using i18n keys
    const levelMsgs = {
      pending: [
        t("mascot_water_seed", { name: plantName }),
        t("mascot_waiting", { name: plantName }),
        t("mascot_pharmacist_choosing", { name: plantName }),
        t("mascot_start_day"),
      ],
      1: [
        t("mascot_germinated", { name: plantName }),
        t("mascot_small_water_more", { name: plantName }),
        t("mascot_sprout_needs_care", { name: plantName }),
        t("mascot_few_more_days", { name: plantName }),
      ],
      2: [
        t("mascot_growing_fast", { name: plantName }),
        t("mascot_green_happy", { name: plantName }),
        t("mascot_almost_mature"),
        t("mascot_healthy_thanks_to_you", { name: plantName }),
      ],
      3: [
        t("mascot_grown_up", { name: plantName }),
        t("mascot_almost_bud"),
        t("mascot_good_care", { name: plantName }),
      ],
      4: [
        t("mascot_almost_bloom", { name: plantName }),
        t("mascot_almost_goal"),
        t("mascot_will_bloom", { name: plantName }),
      ],
      5: [
        t("mascot_bloomed", { name: plantName }),
        t("mascot_best_gardener"),
        t("mascot_wonderful_journey"),
      ],
    };
    // General tips — friendly, conversational
    const generalTips = [
      t("mascot_invite_family"),
      t("mascot_remind_meds"),
      t("mascot_voucher_waiting"),
      t("mascot_see_summary"),
      t("mascot_streak_badge"),
      t("mascot_connect_fit"),
      t("mascot_each_task_grows"),
      t("mascot_take_photo"),
      t("mascot_drink_water"),
      t("mascot_deep_breath"),
      t("mascot_walked_today"),
      t("mascot_sleep_7_8"),
      t("mascot_eat_veggies"),
      t("mascot_schedule_checkup"),
      t("mascot_plant_healthy"),
      t("mascot_always_here"),
      t("mascot_longer_streak"),
      t("mascot_add_family"),
    ];
    const key = isPending ? "pending" : plantLevel;
    const pool = [...(levelMsgs[key] || levelMsgs[1]), ...generalTips];
    // Shuffle
    const shuffled = pool.sort(() => Math.random() - 0.5);
    let i = 0;
    // Show first after 1.5s
    const firstShow = setTimeout(() => setMascotBubble(shuffled[0]), 1500);
    // Cycle: 7s visible + 3s hidden = 10s per message
    const cycle = setInterval(() => {
      i = (i + 1) % shuffled.length;
      setMascotBubble(null);
      setTimeout(() => setMascotBubble(shuffled[i]), 300);
    }, 15000);
    return () => { clearTimeout(firstShow); clearInterval(cycle); setMascotBubble(null); };
  }, [initialized, plantLevel, isPending, plantData]);

  // Real user name from profile
  const profile = state.userProfile || {};
  const displayName = profile.fullName || t("you_default");
  const greeting = getGreeting(t);
  const dateStr = formatDate(t);

  // ── Loading state ──
  if (!initialized && loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, alignItems: "center", justifyContent: "center", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        <img src={ICONS.mascot_loading} alt="loading" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 16, animation: "pulse 2s ease-in-out infinite" }} />
        <div style={{ fontSize: 15, color: G.textMid }}>{t("loading_garden")}</div>
      </div>
    );
  }

  // ── Error state ──
  if (error && !loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, alignItems: "center", justifyContent: "center", padding: "0 28px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔌</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: G.text, marginBottom: 8, textAlign: "center" }}>{t("cannot_connect_short")}</div>
        <div style={{ fontSize: 13, color: G.textMid, marginBottom: 24, textAlign: "center", lineHeight: 1.5 }}>{error}</div>
        <button onClick={retry} style={{
          height: 44, borderRadius: 14, background: "var(--success)", color: "#FFF",
          border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
          fontFamily: '"Be Vietnam Pro", sans-serif', padding: "0 24px",
        }}>{t("retry")}</button>
      </div>
    );
  }

  const themeColor = plantData?.color || "var(--success)";
  const themeColorPale = plantData?.colorPale || "#D1FAE5";
  const journeyLabel = t(`journey_${plantId}`, { defaultValue: plantData?.journeyLabel || t("health_summary") });

  const getLevelProgress = () => {
    const d = t("day_unit");
    if (plantLevel === 1) return { current: streak, max: 8, label: `${streak}/8 ${d}` };
    if (plantLevel === 2) return { current: streak - 8, max: 7, label: `${streak - 8}/7 ${d}` };
    if (plantLevel === 3) return { current: streak - 15, max: 15, label: `${streak - 15}/15 ${d}` };
    return { current: 100, max: 100, label: null };
  };
  const progress = getLevelProgress();
  const progressPercent = Math.min(100, Math.max(0, (progress.current / progress.max) * 100));

  const glassCardStyle = {
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    borderRadius: "16px",
    padding: "8px 12px",
    boxShadow: "var(--glass-shadow)",
  };

  const floatingIconStyle = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    boxShadow: "var(--elev-garden-1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform var(--dur-base) var(--ease-out)",
  };

  const statChipStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    borderRadius: "var(--r-full)",
    padding: "6px 12px",
    color: "var(--garden-ink)",
    fontSize: "var(--text-xs)",  /* 12px */
    fontWeight: "700",
    boxShadow: "var(--elev-garden-1)",
  };

  return (
    <div
      data-plant={plantId}
      style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "var(--garden-bg)", fontFamily: '"Be Vietnam Pro", sans-serif', position: "relative", overflow: "hidden" }}
    >


      {/* SCENE: background scaled to cover — same coordinate system as plant/mascot overlay */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, background: "var(--garden-bg)" }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(-50%, -50%) scale(${sceneScale})`,
          transformOrigin: "center center",
        }}>
          <img
            src="/assets/bg2_garden_home_v2.png"
            alt="Garden Background"
            style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none", userSelect: "none" }}
          />
        </div>
      </div>

      {/* Top Gradient Overlay (Sky Zone legibility) */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 140,
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 100%)",
        pointerEvents: "none",
        zIndex: 5
      }} />

      {/* Layer 2: FX / Particles Layer */}
      <div className="sunbeams-overlay" />
      <div className="leaf-drift" style={{ left: "25%", top: "-5%", animationDelay: "0s" }} />
      <div className="leaf-drift" style={{ left: "65%", top: "-5%", animationDelay: "3s" }} />

      {/* Top Header Overlay */}
      <div style={{ padding: "calc(12px + var(--sat, 0px)) 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
        <button
          onClick={goBack}
          style={{
            width: 36, height: 36, borderRadius: "50%", background: "var(--glass-bg)",
            backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
            border: "1px solid var(--glass-border)", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
          }}
        >
          <ArrowLeft size={18} color="var(--garden-ink)" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--garden-ink)" }}>
            {isPending ? t("waiting_approval") : t("garden_day_streak", { streak })}
          </div>
          {import.meta.env.DEV && (
            <button
              onClick={async () => {
                const res = await simulateStreak();
                if (res?.success) {
                  showToast(`🔥 Tăng streak trong DB thành công! (${res.targetDate})`);
                }
              }}
              style={{
                padding: "4px 8px",
                background: "#EF4444",
                color: "#FFF",
                border: "none",
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(239,68,68,0.3)",
                fontFamily: '"Be Vietnam Pro", sans-serif'
              }}
            >
              🔥 +7 ngày
            </button>
          )}
        </div>
        <button
          onClick={() => navigate("profile")}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid var(--theme, #059669)",
            background: "var(--glass-bg-solid)",
            padding: 2,
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          <img
            src={state.userProfile?.avatar || ICONS.avatar_mom}
            alt="Profile"
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        </button>
      </div>

      {/* Stats HUD Bar Overlay (Glassmorphism chips) */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "8px 16px 0", zIndex: 10 }}>
        <div
          onClick={() => setShowPointsSheet(true)}
          style={{ ...statChipStyle, cursor: "pointer" }}
        >
          <span>⭐</span>
          <span>{points}{t("points_unit")}</span>
        </div>
        <div style={statChipStyle}>
          <span>🔥</span>
          <span>{streak}{t("day_unit")}</span>
        </div>
        <div
          onClick={() => navigate("water-action")}
          style={{ ...statChipStyle, cursor: "pointer" }}
        >
          <span>💧</span>
          <span>{todayWatered ? t("watered") : t("water")}</span>
        </div>
        <div style={statChipStyle}>
          <span>🌱 Lv.{plantLevel}</span>
        </div>
      </div>


      {/* Plant + mascot overlay — same scale system as background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 2, pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(-50%, -50%) scale(${sceneScale})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}>
          <div
            onClick={() => setShowHabitsSheet(true)}
            className="plant-pedestal-container"
            style={{
              position: "absolute",
              left: `${POT_X}%`,
              top: `${POT_Y}%`,
              transform: "translate(-50%, -100%)",
              width: 170,
              height: 170,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              cursor: "pointer",
              pointerEvents: "auto"
            }}
          >
            {/* Plant or Seed (No extra pedestal image is drawn to let the background pot show) */}
            <div style={{
              zIndex: 15,  // Task A4: raised from 3 so plant renders above terracotta pot edge
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              pointerEvents: "none"
            }}>
              {/* Task A4: bloom light radial gradient behind plant */}
              <div style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 130,
                borderRadius: "50%",
                background: allDone
                  ? "radial-gradient(ellipse, rgba(34,197,94,0.28) 0%, transparent 70%)"
                  : "radial-gradient(ellipse, rgba(134,239,172,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
                transition: "background 0.8s ease",
              }} />
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                position: "relative", zIndex: 1,
              }}>
                {isPending ? (
                  plantData?.icon ? (
                    <img src={plantData.icon} alt={plantData.name} style={{ width: 100, height: 100, objectFit: "contain", opacity: 1 }} />
                  ) : (
                    <SeedPlant size={110} sparkle={true} hidePot={false} />
                  )
                ) : (
                  // Task A4: size 155 (up from 135) for better visual presence
                  <PlantHero plantId={plantId} level={plantLevel} size={155} glow={allDone} hidePot={false} animate={false} />
                )}
              </div>
            </div>

            {/* Floating water drops animation */}
            {floaters.map((f) => (
              <div
                key={f.id}
                style={{
                  position: "absolute",
                  bottom: 120,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#3B82F6",
                  fontWeight: 800,
                  fontSize: 20,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  animation: "floatUp 1.5s ease-out forwards",
                  pointerEvents: "none",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Mascot — % coords within world — keyframes now in global.css */}
          <div style={{ position: "absolute", left: `${MASCOT_X}%`, top: `${MASCOT_Y}%`, transform: "translate(-50%, -100%)", zIndex: 3, pointerEvents: "none" }}>
            {/* Chat bubble */}
            {mascotBubble && (
              <div style={{
                position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
                marginBottom: 6,
                background: "var(--surface)", borderRadius: 12, padding: "6px 12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                fontSize: 11, fontWeight: 700, color: "var(--garden-ink)",
                fontFamily: '"Be Vietnam Pro", sans-serif',
                animation: "fadeIn 0.3s ease", pointerEvents: "auto",
                maxWidth: 260, whiteSpace: "normal", textAlign: "center", lineHeight: 1.4,
              }}>
                {mascotBubble}
                <div style={{
                  position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                  width: 0, height: 0,
                  borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
                  borderTop: "6px solid var(--surface)",
                }} />
              </div>
            )}
            <img
              src={
                mascotState === "watering"
                  ? "/assets/mascot/mascot_watering.webp"
                  : mascotState === "entering"
                    ? "/assets/mascot/mascot_waving.webp"
                    : mascotState === "celebrating"
                      ? "/assets/mascot/mascot_celebrating.webp"
                      : "/assets/mascot/mascot_idle.webp"
              }
              alt="Mascot"
              className={`mascot-img ${mascotState === "entering"
                ? "is-entering"
                : mascotState === "watering"
                  ? "is-watering"
                  : mascotState === "celebrating"
                    ? "is-celebrating"
                    : "is-idle"
                }`}
            />
          </div>
        </div>
      </div>


      {/* Right-side vertical icon sidebar */}
      <div style={{
        position: "absolute",
        right: 10,
        top: "28%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        zIndex: 20,
      }}>
        <button
          onClick={() => navigate("health-tracking")}
          className="floating-action-btn"
          style={{
            width: 48, height: 48, borderRadius: "50%", background: "var(--surface)",
            border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#10B981", padding: 0, gap: 1,
          }}
        >
          <RefreshCw size={18} />
          <span style={{ fontSize: 6, fontWeight: 800, letterSpacing: 0.2, lineHeight: 1 }}>{t("health_tab")}</span>
        </button>
        <button
          onClick={() => setShowHealthSummary(true)}
          className="floating-action-btn"
          style={{
            width: 48, height: 48, borderRadius: "50%", background: "var(--surface)",
            border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--garden-brown)", padding: 0, gap: 1,
          }}
        >
          <Sparkles size={18} />
          <span style={{ fontSize: 6, fontWeight: 800, letterSpacing: 0.2, lineHeight: 1 }}>{t("health_summary")}</span>
        </button>
      </div>

      {/* Mid Zone — "What Next" Card + Quest Strip */}
      <div style={{
        position: "absolute",
        bottom: "12%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        zIndex: 10,
      }}>


        {/* "What Next" main card */}
        <div style={glassCardStyle}>
          {/* Plant level header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>{isPending ? "🌱" : plantData?.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: "var(--garden-ink)" }}>
                {isPending ? (plantData ? t(`plant_${plantId}`, { defaultValue: plantData.name }) : t("new_seed")) : t(`plant_${plantId}`, { defaultValue: plantData?.name })}
              </span>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: themeColor }}>
                {isPending ? t("waiting_approval_short") : t("level_stage", { lv: plantLevel, stage: stageName(t, plantLevel, plantData?.stageNames?.[plantLevel]) })}
              </span>
            </div>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--garden-muted)", fontWeight: 700 }}>{progress.label || t("max_level")}</span>
          </div>
          <div style={{ width: "100%", height: 4, background: "var(--garden-border)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
            <div style={{
              width: `${progressPercent}%`, height: "100%",
              background: `linear-gradient(90deg, ${themeColor}, ${themeColor}CC)`,
              borderRadius: 2, transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ height: "1px", background: "rgba(139,90,43,0.15)", margin: "0 -4px 6px" }} />

          {/* CTA section: context-aware */}
          {isPending ? (
            /* PENDING STATE */
            <div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--garden-muted)", fontWeight: 700, marginBottom: 5 }}>
                {t("pharmacist_reviewing_eta")}
              </div>
              <button
                onClick={() => { navigate("water-action"); }}
                style={{
                  width: "100%", height: 36, borderRadius: 10,
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}CC)`,
                  color: "#FFF", border: "none", fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                <Droplet size={14} /> {t("water_today")}
              </button>
            </div>
          ) : allDone ? (
            /* ALL DONE — celebrate + next achievement nudge */
            (() => {
              const unlockedIds = JSON.parse(localStorage.getItem("lc_care_achievements") || "[]");
              const next = getNextAchievement({ streak, points, plantLevel, familyMembers }, unlockedIds);
              return (
                <div>
                  <div style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--success)", marginBottom: 4, textAlign: "center" }}>
                    {t("all_tasks_done")}
                  </div>
                  {next && (
                    <div
                      onClick={() => navigate("achievements")}
                      style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: `${next.gradient[0]}12`,
                        border: `1px solid ${next.gradient[0]}25`,
                        borderRadius: 10, padding: "6px 10px", cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{next.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: next.gradient[0] }}>{t("badge_next")}</div>
                        <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--garden-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {next.bkey ? t(`${next.bkey}_title`) : next.title}
                        </div>
                      </div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--garden-muted)" }}>›</span>
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            /* NORMAL — show next undone habit prominently */
            (() => {
              const nextHabit = activeHabits.find((h) => !h.done);
              const doneCount = activeHabits.filter((h) => h.done).length;
              return (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "var(--garden-muted)", letterSpacing: 0.4 }}>
                      {t("today_tasks_count", { done: doneCount, total: activeHabits.length })}
                    </span>
                    {activeHabits.length > 1 && (
                      <span
                        onClick={() => setShowHabitsSheet(true)}
                        style={{ fontSize: "var(--text-xs)", color: "var(--garden-brown)", fontWeight: 700, cursor: "pointer" }}
                      >
                        {t("see_all")}
                      </span>
                    )}
                  </div>
                  {nextHabit ? (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: `${themeColor}12`,
                      border: `1px solid ${themeColor}25`,
                      borderRadius: 10, padding: "7px 10px",
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--garden-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {nextHabit.name}
                        </div>
                        {nextHabit.time && nextHabit.time !== t("all_day") && (
                          <div style={{ fontSize: "var(--text-xs)", color: "var(--garden-muted)", marginTop: 1 }}>{nextHabit.time}</div>
                        )}
                      </div>
                      <button
                        onClick={() => markHabit(nextHabit.id)}
                        style={{
                          background: themeColor, color: "#FFF", border: "none",
                          borderRadius: 8, padding: "5px 12px", fontSize: "var(--text-xs)", fontWeight: 700,
                          cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', flexShrink: 0,
                        }}
                      >
                        {t("done_mark")} ✓
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--garden-muted)", textAlign: "center", padding: "4px 0" }}>
                      {t("pharmacist_making_plan")}
                    </div>
                  )}
                  {/* Remaining habits mini-list */}
                  {activeHabits.length > 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 5 }}>
                      {activeHabits.filter((h) => h.id !== nextHabit?.id).slice(0, 1).map((h) => (
                        <div key={h.id} style={{
                          display: "flex", alignItems: "center", gap: 5,
                          opacity: h.done ? 0.55 : 0.85,
                        }}>
                          <div
                            onClick={() => !h.done && markHabit(h.id)}
                            style={{
                              width: 13, height: 13, borderRadius: 3,
                              border: h.done ? "none" : "1px solid rgba(139,90,43,0.35)",
                              background: h.done ? themeColor : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              cursor: h.done ? "default" : "pointer", flexShrink: 0,
                            }}
                          >
                            {h.done && <img src={ICONS.ui_check_circle} alt="" style={{ width: 8, height: 8 }} />}
                          </div>
                          <span style={{ fontSize: 10, color: "var(--garden-ink)", textDecoration: h.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                            {h.name}
                          </span>
                          {h.done && <span style={{ fontSize: 9, color: themeColor, fontWeight: 700, flexShrink: 0 }}>+{h.points || 10}{t("points_unit")}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>

        {/* Bảng tóm tắt sức khỏe — trigger + sheet chi tiết (thay màn result onboarding cũ) */}
        <HealthSummaryBoard externalOpen={showHealthSummary} onExternalClose={() => setShowHealthSummary(false)} />
      </div>


      {/* Slide-up Bottom Sheet (Habits Checklist & Codebase Features) */}
      {showHabitsSheet && (
        <>
          {/* Sheet Backdrop Dimmer */}
          <div
            onClick={() => setShowHabitsSheet(false)}
            style={{
              position: "absolute", inset: 0, background: "rgba(15, 23, 42, 0.4)",
              zIndex: 100, animation: "backdropFade 0.25s ease-out"
            }}
          />

          {/* Sheet Body Container */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "72%", background: G.bg, borderRadius: "24px 24px 0 0",
            boxShadow: "0 -8px 32px rgba(15, 23, 42, 0.15)", zIndex: 101,
            display: "flex", flexDirection: "column", overflow: "hidden",
            animation: "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            {/* Slide Down Drag Indicator Handle */}
            <div
              onClick={() => setShowHabitsSheet(false)}
              style={{ display: "flex", justifyContent: "center", padding: "14px 0 10px", cursor: "pointer", flexShrink: 0 }}
            >
              <div style={{ width: 44, height: 5, borderRadius: 2.5, background: "#CBD5E1" }} />
            </div>

            {/* Scrollable Sheet Content Panel */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Header Greeting & Date */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 4 }}>
                <div>

                  <div style={{ fontSize: 18, fontWeight: 800, color: G.text }}>{greeting}, {displayName} 👋</div>
                  <div style={{ fontSize: 13, color: G.textMid, marginTop: 2 }}>{dateStr}</div>
                </div>
                {!isPending && <JourneyTag journey={journeyLabel} color={themeColor} />}
              </div>

              {/* ──────────────── PENDING STATE DETAILS ──────────────── */}
              {isPending && (
                <>
                  <div style={{ fontSize: 16, fontWeight: 800, color: G.text, marginTop: 8, textAlign: "center" }}>
                    {plantData ? `${plantData.emoji} ${t(`plant_${plantId}`, { defaultValue: plantData.name })} ${t("waiting_approval_short")}` : t("seed_waiting")}
                  </div>

                  <div style={{ fontSize: 14, color: G.textMid, textAlign: "center", lineHeight: 1.6, padding: "0 10px", alignSelf: "center" }}>
                    {t("pharmacist_reviewing")}
                  </div>

                  <div style={{ fontSize: 13, color: G.textLight, textAlign: "center", marginBottom: 4 }}>
                    {t("eta_2h")}
                  </div>

                  {plantSummary && (() => {
                    // Split summary into sections by double newline
                    const sections = plantSummary.split(/\n\n+/).filter(s => s.trim());
                    return (
                      <div style={{ background: "rgba(245,158,11,0.06)", borderRadius: 16, padding: "14px 16px", border: "1px solid rgba(245,158,11,0.15)" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#D97706", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                          <Sparkles size={14} strokeWidth={2.5} color="#D97706" /> {t("profile_summary")}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          {sections.map((section, i) => {
                            const trimmed = section.trim();
                            // First section = greeting, rest = info blocks
                            const isGreeting = i === 0 && trimmed.startsWith("🌱");
                            return (
                              <div key={i} style={{
                                fontSize: 13, color: isGreeting ? G.text : G.textMid,
                                lineHeight: 1.65,
                                fontWeight: isGreeting ? 600 : 400,
                                ...(i > 0 ? {
                                  background: "var(--surface)",
                                  borderRadius: 12,
                                  padding: "10px 12px",
                                  border: "1px solid var(--garden-border)",
                                } : {}),
                              }}>
                                {trimmed}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  <button onClick={() => { setShowHabitsSheet(false); navigate("water-action"); }} style={{
                    width: "100%", height: 52, borderRadius: 16,
                    background: `linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)`,
                    color: "#FFF",
                    border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer",
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 4px 14px rgba(0,146,63,0.2)",
                    marginTop: 8,
                  }}>
                    <Droplet size={18} /> {t("water_daily")}
                  </button>
                </>
              )}

              {/* ──────────────── ACTIVE STATE DETAILS ──────────────── */}
              {!isPending && (
                <>
                  {/* Plant story card */}
                  {plantData?.story && (
                    <div style={{
                      background: `linear-gradient(135deg, ${themeColor}12, ${themeColorPale})`,
                      borderRadius: 14, padding: "12px 14px",
                      border: `1px solid ${themeColor}20`,
                      display: "flex", alignItems: "flex-start", gap: 10,
                    }}>
                      <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{plantData.emoji}</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: themeColor, letterSpacing: 0.4, marginBottom: 2 }}>
                          {journeyLabel.toUpperCase()}
                        </div>
                        <div style={{ fontSize: 13, color: G.textMid, lineHeight: 1.5, fontStyle: "italic" }}>
                          "{t(`story_${plantId}`, { defaultValue: plantData.story })}"
                        </div>
                        {plantData.whyThisPlant && (
                          <div style={{ fontSize: 11, color: G.textMid, lineHeight: 1.5, marginTop: 4, fontWeight: 500 }}>
                            💡 {t(`why_${plantId}`, { defaultValue: plantData.whyThisPlant })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Today tasks — active habits */}
                  {activeHabits.length > 0 ? (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, marginTop: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, letterSpacing: 0.4 }}>
                          {t("today").toUpperCase()} ({activeHabits.filter(h => h.done).length}/{activeHabits.length})
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, color: "#F59E0B", fontWeight: 800 }}>
                          <span>⭐</span> {points} {t("points_unit")}
                        </div>
                      </div>
                      <div style={{ background: G.surface, borderRadius: 18, border: `1.5px solid ${G.border}`, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                        {activeHabits.map((h, i) => (
                          <div key={h.id} style={{
                            padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                            borderBottom: i < activeHabits.length - 1 ? `1px solid ${G.hairline}` : "none",
                            opacity: h.done ? 0.65 : 1, transition: "opacity 0.3s",
                          }}>
                            <div onClick={() => !h.done && markHabit(h.id)} className={h.done ? "" : "habit-checkbox"} style={{
                              width: 24, height: 24, borderRadius: 8,
                              border: h.done ? "none" : `2px solid ${G.border}`,
                              background: h.done ? themeColor : "transparent",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              cursor: h.done ? "default" : "pointer", flexShrink: 0,
                            }}>{h.done && <img src={ICONS.ui_check_circle} alt="done" style={{ width: 14, height: 14, objectFit: "contain" }} />}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: h.done ? 500 : 600, color: G.text, textDecoration: h.done ? "line-through" : "none" }}>
                                {h.name}{h.isCustom && <span style={{ fontSize: 10, color: themeColor, marginLeft: 4, fontWeight: 700 }}>{t("custom")}</span>}
                              </div>
                              <div style={{ fontSize: 12, color: G.textMid, marginTop: 1 }}>{h.time}</div>
                            </div>
                            {!h.done && (
                              <button onClick={() => markHabit(h.id)} style={{ background: themeColor, color: "#FFF", border: "none", borderRadius: 12, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                                {t("done_mark")}
                              </button>
                            )}
                            {h.done && <span style={{ fontSize: 13, color: themeColor, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><img src={ICONS.ui_check_circle} alt="done" style={{ width: 14, height: 14, objectFit: "contain" }} /> +{h.points || 10}</span>}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ marginTop: 4, background: themeColorPale, borderRadius: 16, padding: "20px", textAlign: "center", border: `1.5px dashed ${themeColor}40`, marginBottom: 6 }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>{plantData?.emoji || "🌱"}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 4 }}>{t("no_care_habit")}</div>
                      <div style={{ fontSize: 13, color: G.textMid }}>{t("pharmacist_making_plan")}</div>
                    </div>
                  )}

                  {/* Optional habits unlock section */}
                  {optionalHabits.length > 0 && (
                    <div>
                      <button onClick={() => setShowOptional(!showOptional)} style={{
                        width: "100%", background: "transparent", border: `1.5px dashed ${themeColor}40`,
                        borderRadius: 12, padding: "10px 16px", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: themeColor }}>
                          {t("optional_habits_count", { count: optionalHabits.length })}
                        </span>
                        <span style={{ fontSize: 11, color: G.textMid }}>{showOptional ? "▲" : "▼"}</span>
                      </button>
                      {showOptional && (
                        <div style={{ background: G.surface, borderRadius: 12, border: `1px solid ${G.border}`, marginTop: 6, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                          {optionalHabits.map((h, i) => (
                            <div key={h.id} style={{
                              padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
                              borderBottom: i < optionalHabits.length - 1 ? `1px solid ${G.hairline}` : "none",
                            }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: G.textMid }}>{h.name}</div>
                                <div style={{ fontSize: 12, color: G.textLight, marginTop: 1 }}>{h.time} · +{h.points || 10} {t("points_unit")}</div>
                              </div>
                              <button onClick={() => toggleHabitActive(h.id)} style={{
                                background: themeColor, color: "#FFF", border: "none",
                                borderRadius: 10, padding: "5px 12px", fontSize: 12, fontWeight: 600,
                                cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                              }}>{t("turn_on")}</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Add custom habit button */}
                  <button onClick={() => setShowAddModal(true)} style={{
                    width: "100%", background: "transparent",
                    border: `1.5px dashed ${G.border}`, borderRadius: 12,
                    padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 600,
                    color: G.textMid, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                  }}>
                    <Plus size={16} /> {t("add_your_habit")}
                  </button>



                  {/* Family garden mini */}
                  <div style={{ background: G.surface, borderRadius: 18, border: `1.5px solid ${G.border}`, padding: "14px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                      <img src={ICONS.badge_family} alt="family" style={{ width: 20, height: 20, objectFit: "contain" }} /> {t("family_garden")}
                    </div>
                    {familyMembers.filter((m) => !m.isMe).length === 0 ? (
                      <div style={{ fontSize: 13, color: G.textLight, textAlign: "center", padding: "12px 0" }}>
                        {t("add_member_prompt")}
                      </div>
                    ) : (
                      familyMembers.filter((m) => !m.isMe).map((m, i, arr) => {
                        const p = m.plant ? PLANTS_DATA[m.plant] : null;
                        return (
                          <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < arr.length - 1 ? 10 : 0 }}>
                            <div style={{ fontSize: 13, color: G.text, display: "flex", alignItems: "center", gap: 6 }}>
                              <img src={m.avatarIcon || ICONS.avatar_mom} alt={m.name} style={{ width: 18, height: 18, objectFit: "contain", borderRadius: "50%" }} />
                              <span>{m.name} · {p ? <><img src={p.icon || ""} alt={p.name} style={{ width: 16, height: 16, objectFit: "contain", display: "inline-block", verticalAlign: "middle" }} onError={(e) => { e.target.style.display = "none"; }} /> {p.name}</> : t("no_plant")}</span>
                            </div>
                            {m.status === "pending" ? (
                              <span style={{ fontSize: 12, color: G.gold600, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
                                <span style={{ fontSize: 12 }}>⏰</span> {t("waiting_approval")}
                              </span>
                            ) : (
                              <div style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 13, color: G.orange, fontWeight: 700 }}>
                                <span>🔥</span> {m.streak || 0}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        </>
      )}

      {/* Add Custom Habit Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "flex-end", zIndex: 120,
        }} onClick={() => setShowAddModal(false)}>
          <div style={{
            background: G.bg, borderRadius: "24px 24px 0 0", padding: "24px 20px 32px",
            width: "100%", fontFamily: '"Be Vietnam Pro", sans-serif',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: G.text }}>
                {t("add_your_habit_plus")}
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={20} color={G.textMid} />
              </button>
            </div>
            <div style={{ fontSize: 13, color: G.textMid, marginBottom: 6 }}>{t("habit_name")}</div>
            <input
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder={t("habit_name_placeholder")}
              style={{
                width: "100%", height: 44, borderRadius: 12, border: `1.5px solid ${G.border}`,
                padding: "0 14px", fontSize: 14, fontFamily: '"Be Vietnam Pro", sans-serif',
                background: G.surface, color: G.text, boxSizing: "border-box", marginBottom: 12,
              }}
            />
            <div style={{ fontSize: 13, color: G.textMid, marginBottom: 6 }}>{t("habit_time_optional")}</div>
            <input
              value={newHabitTime}
              onChange={(e) => setNewHabitTime(e.target.value)}
              placeholder={t("habit_time_placeholder")}
              style={{
                width: "100%", height: 44, borderRadius: 12, border: `1.5px solid ${G.border}`,
                padding: "0 14px", fontSize: 14, fontFamily: '"Be Vietnam Pro", sans-serif',
                background: G.surface, color: G.text, boxSizing: "border-box", marginBottom: 20,
              }}
            />
            <button
              onClick={() => {
                if (!newHabitName.trim()) {
                  showToast(t("habit_name_required"));
                  return;
                }
                addCustomHabit(newHabitName.trim(), newHabitTime.trim());
                setNewHabitName("");
                setNewHabitTime("");
                setShowAddModal(false);
              }}
              style={{
                width: "100%", height: 50, borderRadius: 16,
                background: `linear-gradient(135deg, ${themeColor}, ${themeColor}DD)`,
                color: "#FFF", border: "none", fontSize: 16, fontWeight: 700,
                cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
              }}
            >{t("add_to_list")}</button>
          </div>
        </div>
      )}

      {/* All-Done Mini Celebration Confetti */}
      {allDoneCelebration && (
        <>
          <style>{`
            @keyframes allDoneConfetti {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(80vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={`adc-${i}`} style={{
              position: "fixed",
              top: "-10px",
              left: `${6 + Math.random() * 88}%`,
              width: 8 + Math.random() * 8,
              height: 8 + Math.random() * 8,
              borderRadius: i % 3 === 0 ? "50%" : "2px",
              background: ["#F59E0B", "#10B981", "#3B82F6", "#EF4444", "#8B5CF6", "#FFD700"][i % 6],
              animation: `allDoneConfetti ${1.5 + Math.random() * 1}s ${Math.random() * 0.5}s ease-in forwards`,
              zIndex: 150,
              pointerEvents: "none",
            }} />
          ))}
        </>
      )}

      {/* Milestone Achievement Popup */}
      {activeMilestone && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", zIndex: 130,
        }} onClick={closeMilestone}>
          <div style={{
            background: `linear-gradient(180deg, rgba(20, 35, 25, 0.95) 0%, rgba(10, 20, 15, 0.98) 100%)`,
            borderTop: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: "28px 28px 0 0", padding: "32px 24px 40px",
            width: "100%", fontFamily: '"Be Vietnam Pro", sans-serif',
            textAlign: "center",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.4)"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)",
              margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid rgba(74, 222, 128, 0.3)",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
              fontSize: 48,
            }}>
              {activeMilestone === 7 ? "🌱" : activeMilestone === 14 ? "🌳" : "🏡"}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#4ADE80", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>
              {t("milestone_glory")}
            </div>

            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFF", marginBottom: 12 }}>
              {t("milestone_days", { count: activeMilestone })}
            </div>

            <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: "20px", padding: "0 16px", marginBottom: 28 }}>
              {activeMilestone === 7 ? t("milestone_7_desc") : activeMilestone === 14 ? t("milestone_14_desc") : t("milestone_30_desc")}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "12px 20px",
              marginBottom: 32,
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}>
                {t("new_badge_label", { name: activeMilestone === 7 ? t("milestone_badge_7") : activeMilestone === 14 ? t("milestone_badge_14") : t("milestone_badge_30") })}
              </span>
            </div>

            <button
              onClick={closeMilestone}
              style={{
                width: "100%", height: 50, borderRadius: 16,
                background: "linear-gradient(135deg, #10B981, #059669)",
                color: "#FFF", border: "none", fontSize: 16, fontWeight: 700,
                cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
              }}
            >
              {t("continue_journey")}
            </button>
          </div>
        </div>
      )}
      {/* Achievement celebration overlay */}
      {achievementQueue.length > 0 && (
        <Celebration
          type="badge"
          badge={achievementQueue[0]}
          onClose={() => setAchievementQueue(prev => prev.slice(1))}
        />
      )}

      {/* Points → Voucher nudge sheet */}
      {showPointsSheet && (() => {
        const VOUCHERS_LIST = [
          { labelKey: "voucher_lab_title", cost: 500, icon: "🧪" },
          { labelKey: "voucher_vaccine_title", cost: 500, icon: "💉" },
          { labelKey: "voucher_omega_title", cost: 300, icon: "🐟" },
        ];
        return (
          <>
            <div
              onClick={() => setShowPointsSheet(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 140 }}
            />
            <div style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              background: "#FAFAF8", borderRadius: "24px 24px 0 0",
              boxShadow: "0 -8px 32px rgba(15,23,42,0.15)", zIndex: 141,
              padding: "20px 20px 36px",
              fontFamily: '"Be Vietnam Pro", sans-serif',
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 40, height: 4, borderRadius: 2, background: "#CBD5E1" }} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>
                {t("your_points_count", { points })}
              </div>
              <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>
                {t("earn_points_for_voucher")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                {VOUCHERS_LIST.map((v) => {
                  const canRedeem = points >= v.cost;
                  return (
                    <div key={v.labelKey} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: canRedeem ? "#F0FDF4" : "#F8FAFC",
                      border: `1.5px solid ${canRedeem ? "#22C55E40" : "#E2E8F0"}`,
                      borderRadius: 14, padding: "12px 14px",
                    }}>
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{v.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{t(v.labelKey)}</div>
                        <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>
                          {canRedeem
                            ? t("voucher_can_redeem", { cost: v.cost })
                            : t("voucher_need_more", { x: v.cost - points })}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 13, fontWeight: 800,
                        color: canRedeem ? "#16A34A" : "#94A3B8",
                      }}>
                        {v.cost}{t("points_unit")}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => { setShowPointsSheet(false); navigate("voucher"); }}
                style={{
                  width: "100%", height: 50, borderRadius: 16,
                  background: "linear-gradient(135deg, #22C55E, #16A34A)",
                  color: "#FFF", border: "none", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                }}
              >
                {t("see_redeem_voucher")}
              </button>
            </div>
          </>
        );
      })()}

      {/* First-run Coachmark (3 steps) */}
      {showCoach && initialized && !isPending && (
        (() => {
          const steps = [
            {
              emoji: "🌱",
              title: t("coach_plant_title"),
              desc: t("coach_plant_desc"),
              highlight: null,
            },
            {
              emoji: "✅",
              title: t("coach_tasks_title"),
              desc: t("coach_tasks_desc"),
              highlight: null,
            },
            {
              emoji: "⭐",
              title: t("coach_points_title"),
              desc: t("coach_points_desc"),
              highlight: null,
            },
          ];
          const step = steps[coachStep];
          const isLast = coachStep === steps.length - 1;
          return (
            <>
              <div style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)",
                zIndex: 160, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", padding: "0 28px",
              }}>
                <div style={{
                  background: "#FAFAF8", borderRadius: 24,
                  padding: "28px 24px", width: "100%", maxWidth: 340,
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  textAlign: "center",
                  animation: "fadeIn 0.3s ease",
                }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{step.emoji}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 8 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 24 }}>
                    {step.desc}
                  </div>
                  {/* Step dots */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
                    {steps.map((_, i) => (
                      <div key={i} style={{
                        width: i === coachStep ? 20 : 6,
                        height: 6, borderRadius: 3,
                        background: i === coachStep ? "#22C55E" : "#CBD5E1",
                        transition: "width 0.3s ease",
                      }} />
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (isLast) {
                        localStorage.setItem("lc_care_home_coach_seen", "true");
                        setShowCoach(false);
                      } else {
                        setCoachStep((s) => s + 1);
                      }
                    }}
                    style={{
                      width: "100%", height: 50, borderRadius: 16,
                      background: "linear-gradient(135deg, #22C55E, #16A34A)",
                      color: "#FFF", border: "none", fontSize: 15, fontWeight: 700,
                      cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                    }}
                  >
                    {isLast ? t("start_now") : t("next_arrow")}
                  </button>
                  {coachStep > 0 && (
                    <button
                      onClick={() => {
                        localStorage.setItem("lc_care_home_coach_seen", "true");
                        setShowCoach(false);
                      }}
                      style={{
                        marginTop: 10, background: "none", border: "none",
                        fontSize: 12, color: "#94A3B8", cursor: "pointer",
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                      }}
                    >
                      {t("skip")}
                    </button>
                  )}
                </div>
              </div>
            </>
          );
        })()
      )}
    </div>
  );
}
