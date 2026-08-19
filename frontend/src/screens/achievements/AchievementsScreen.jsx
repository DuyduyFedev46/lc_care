import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { ACHIEVEMENTS } from "../../config/achievements";
import { PLANTS_DATA, ICONS } from "../../config/constants";
import { ArrowLeft, Trophy, Lock, Share2 } from "lucide-react";
import i18n from "../../i18n";

const SHARE_URL = "https://chauthuc.web.app";

const BADGE_KEY_MAP = {
  first_water: "badge_first_sprout",
  streak_7: "badge_golden_week",
  streak_30: "badge_habit_month",
  level_up: "badge_strong_plant",
  family_joined: "badge_full_garden",
  water_for_family: "badge_water_for_family",
  voucher_redeemed: "badge_first_harvest",
  points_100: "badge_100pts",
};

const PLANT_JOURNEY = [
  { level: 1, labelKey: "stage_germinate", rangeKey: "days_range_0_7", icon: "🌱" },
  { level: 2, labelKey: "stage_young", rangeKey: "days_range_8_14", icon: "🌿" },
  { level: 3, labelKey: "stage_mature", rangeKey: "days_range_15_29", icon: "🌳" },
  { level: 4, labelKey: "stage_bloom", rangeKey: "days_range_30_plus", icon: "🌸" },
];

function shareAchievement(ach) {
  const tFn = (k, o) => i18n.t(k, o);
  const titleKey = BADGE_KEY_MAP[ach.id];
  const title = titleKey ? tFn(`${titleKey}_title`) : ach.title;
  const text = `🏆 ${title} — LC Care ${ach.icon}\n\n${tFn("share_achievement_tagline")}\n\n#LCCare #LongChau`;
  if (navigator.share) {
    navigator.share({ title: `LC Care — ${title}`, text, url: SHARE_URL }).catch(() => {});
  } else {
    const fbUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(text)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer,width=626,height=436");
  }
}

function AchievementCard({ ach, unlocked, current, target }) {
  const { t } = useTranslation();
  const titleKey = BADGE_KEY_MAP[ach.id];
  const title = titleKey ? t(`${titleKey}_title`) : ach.title;
  const desc = titleKey ? t(`${titleKey}_desc`) : ach.desc;
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return (
    <div style={{
      background: unlocked
        ? `linear-gradient(135deg, ${ach.gradient[0]}18, ${ach.gradient[1]}10)`
        : G.surface,
      borderRadius: 18,
      padding: "16px",
      border: unlocked
        ? `1.5px solid ${ach.gradient[0]}40`
        : `1.5px solid ${G.border}`,
      opacity: unlocked ? 1 : 0.72,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Shimmer on unlocked */}
      {unlocked && (
        <div style={{
          position: "absolute", top: 0, left: "-40%", width: "30%", height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          transform: "skewX(-20deg)",
          pointerEvents: "none",
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: unlocked
            ? `linear-gradient(135deg, ${ach.gradient[0]}, ${ach.gradient[1]})`
            : G.hairline,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
          boxShadow: unlocked ? `0 4px 12px ${ach.gradient[0]}55` : "none",
        }}>
          {unlocked ? ach.icon : <Lock size={18} color="#94A3B8" />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: unlocked ? G.text : G.textMid }}>
              {title}
            </span>
            {unlocked && (
              <span style={{
                fontSize: "var(--text-xs)", fontWeight: 800, color: ach.gradient[0],
                background: `${ach.gradient[0]}18`, borderRadius: 6, padding: "2px 6px",
                letterSpacing: 0.4,
              }}>{t("badge_achieved")}</span>
            )}
          </div>
          <div style={{ fontSize: "var(--text-xs)", color: G.textMid, marginBottom: unlocked ? 0 : 6 }}>
            {desc}
          </div>
          {!unlocked && (
            <>
              <div style={{
                width: "100%", height: 5, background: G.hairline,
                borderRadius: 3, overflow: "hidden",
              }}>
                <div style={{
                  width: `${pct}%`, height: "100%",
                  background: `linear-gradient(90deg, ${ach.gradient[0]}, ${ach.gradient[1]})`,
                  borderRadius: 3, transition: "width 0.6s ease",
                }} />
              </div>
              <div style={{ fontSize: "var(--text-xs)", color: G.textLight, marginTop: 3 }}>
                {current}/{target} · {pct}%
              </div>
            </>
          )}
        </div>
        {/* Share button — only for unlocked */}
        {unlocked && (
          <button
            onClick={() => shareAchievement(ach)}
            style={{
              background: `${ach.gradient[0]}15`, border: `1px solid ${ach.gradient[0]}30`,
              borderRadius: 10, padding: "6px 10px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              flexShrink: 0,
            }}
          >
            <Share2 size={13} color={ach.gradient[0]} />
            <span style={{ fontSize: 10, fontWeight: 700, color: ach.gradient[0] }}>{t("share")}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function AchievementsScreen() {
  const { goBack, state } = useApp();
  const { t } = useTranslation();
  const { streak = 0, points = 0, familyMembers = [] } = state;

  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { dataService } = await import("../../services/dataService");
        const data = await dataService.getAchievements();
        setServerData(data);
      } catch {
        // fallback to local computation
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Build display list — server data wins, fallback to local trigger
  const unlockedIds = JSON.parse(localStorage.getItem("lc_care_achievements") || "[]");
  const localState = { streak, points, plantLevel: state.plantLevel || 1, familyMembers, wateredForOthers: 0, vouchersRedeemed: 0 };

  const displayList = ACHIEVEMENTS.map((ach) => {
    if (serverData) {
      const srv = serverData.find((s) => s.id === ach.id);
      if (srv) {
        return { ach, unlocked: srv.unlocked, current: srv.current, target: srv.target };
      }
    }
    const p = ach.progress(localState);
    const unlocked = unlockedIds.includes(ach.id) || ach.trigger(localState);
    return { ach, unlocked, current: p.current, target: p.target };
  });

  const unlockedCount = displayList.filter((d) => d.unlocked).length;

  // Next achievement (closest to completion, not yet unlocked)
  const nextUp = displayList
    .filter((d) => !d.unlocked && d.target > 0)
    .sort((a, b) => (b.current / b.target) - (a.current / a.target))[0];

  // Plant level derived from streak
  let plantLevel = 1;
  if (streak >= 30) plantLevel = 4;
  else if (streak >= 15) plantLevel = 3;
  else if (streak >= 8) plantLevel = 2;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: "calc(12px + var(--sat, 0px)) 20px 12px",
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: `1px solid ${G.hairline}`, background: G.surface,
      }}>
        <button onClick={goBack} style={{
          background: "none", border: "none", cursor: "pointer",
          width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowLeft size={22} color={G.text} />
        </button>
        <div>
          <div style={{ fontWeight: 800, color: G.text, fontSize: 18 }}>{t("badges_and_achievements")}</div>
          <div style={{ fontSize: 12, color: G.textMid, marginTop: 1 }}>
            {unlockedCount}/{ACHIEVEMENTS.length} {t("unlocked")}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Trophy size={22} color="#F59E0B" fill="#F59E0B" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>

        {/* Progress bar */}
        <div style={{
          background: G.surface, borderRadius: 18, padding: "16px",
          marginBottom: 16, border: `1.5px solid ${G.border}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{t("total_progress")}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#F59E0B" }}>
              {unlockedCount}/{ACHIEVEMENTS.length} 🏆
            </span>
          </div>
          <div style={{ width: "100%", height: 8, background: G.hairline, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%`,
              height: "100%",
              background: "linear-gradient(90deg, #F59E0B, #EAB308)",
              borderRadius: 4, transition: "width 0.8s ease",
            }} />
          </div>
        </div>

        {/* Next achievement hero */}
        {nextUp && (
          <div style={{
            background: `linear-gradient(135deg, ${nextUp.ach.gradient[0]}15, ${nextUp.ach.gradient[1]}08)`,
            borderRadius: 18, padding: "16px",
            border: `1.5px solid ${nextUp.ach.gradient[0]}30`,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: nextUp.ach.gradient[0], letterSpacing: 0.8, marginBottom: 8 }}>
              {t("badge_next")}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: `linear-gradient(135deg, ${nextUp.ach.gradient[0]}, ${nextUp.ach.gradient[1]})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, boxShadow: `0 4px 14px ${nextUp.ach.gradient[0]}44`,
              }}>
                {nextUp.ach.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: G.text, marginBottom: 4 }}>
                  {BADGE_KEY_MAP[nextUp.ach.id] ? t(`${BADGE_KEY_MAP[nextUp.ach.id]}_title`) : nextUp.ach.title}
                </div>
                <div style={{ width: "100%", height: 6, background: G.hairline, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${Math.min(100, Math.round((nextUp.current / nextUp.target) * 100))}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${nextUp.ach.gradient[0]}, ${nextUp.ach.gradient[1]})`,
                    borderRadius: 3,
                  }} />
                </div>
                <div style={{ fontSize: "var(--text-xs)", color: G.textMid, marginTop: 4 }}>
                  {nextUp.current}/{nextUp.target} · {t("almost_there", { n: nextUp.target - nextUp.current })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All achievements grid */}
        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10 }}>
          {t("all_badges")}
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: 32, color: G.textMid, fontSize: 13 }}>{t("loading")}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {displayList
              .sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0))
              .map(({ ach, unlocked, current, target }) => (
                <AchievementCard
                  key={ach.id}
                  ach={ach}
                  unlocked={unlocked}
                  current={current}
                  target={target}
                />
              ))}
          </div>
        )}

        {/* Plant journey */}
        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10, marginTop: 4 }}>
          {t("plant_growth_journey")}
        </div>
        <div style={{
          background: G.surface, borderRadius: 18, padding: "16px",
          border: `1.5px solid ${G.border}`,
        }}>
          {PLANT_JOURNEY.map((stage, i) => {
            const isActive = plantLevel === stage.level;
            const isPast = plantLevel > stage.level;
            return (
              <div key={stage.level} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                marginBottom: i < PLANT_JOURNEY.length - 1 ? 12 : 0,
              }}>
                {/* Timeline dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isActive
                      ? "linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)"
                      : isPast
                      ? "var(--success-pale)"
                      : G.hairline,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16,
                    border: isActive ? "2px solid var(--success-dark)" : "none",
                    boxShadow: isActive ? "0 4px 12px rgba(34,197,94,0.35)" : "none",
                  }}>
                    {stage.icon}
                  </div>
                  {i < PLANT_JOURNEY.length - 1 && (
                    <div style={{
                      width: 2, height: 20,
                      background: isPast ? "var(--success)" : G.hairline,
                      margin: "3px 0",
                    }} />
                  )}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{
                    fontSize: 13, fontWeight: isActive ? 800 : 600,
                    color: isActive ? G.text : isPast ? G.textMid : G.textLight,
                  }}>
                    Lv.{stage.level} — {t(stage.labelKey)}
                    {isActive && (
                      <span style={{
                        marginLeft: 6, fontSize: "var(--text-xs)", fontWeight: 800,
                        color: "var(--success-dark)", background: "var(--success-pale)",
                        borderRadius: 6, padding: "2px 6px", letterSpacing: 0.4,
                      }}>{t("badge_current")}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "var(--text-xs)", color: G.textLight, marginTop: 1 }}>{t(stage.rangeKey)}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
