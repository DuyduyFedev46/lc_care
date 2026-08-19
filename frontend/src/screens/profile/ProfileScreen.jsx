// Tab Profile — Stats + Badges + Heatmap + Vườn Lưu Niệm
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { BADGES, ICONS, PLANTS_DATA } from "../../config/constants";
import { ACHIEVEMENTS } from "../../config/achievements";
import GoogleFitConnect from "../../components/GoogleFitConnect";
import HealthMetrics from "../../components/HealthMetrics";
import SectionHeader from "../../components/ui/SectionHeader";
import Sheet from "../../components/ui/Sheet";
import { validateCycleTrackingStep } from "../../utils/validation";

export default function ProfileScreen() {
  const { state, logout, update, showToast, goBack, navigate, setLanguage } = useApp();
  const { t } = useTranslation();
  const { streak = 0, points = 0, language = "vi" } = state;
  const fullName = state.userProfile?.fullName || t("profile_user");
  const birthYear = parseInt(state.userProfile?.yearOfBirth || "1985");
  const age = new Date().getFullYear() - birthYear;
  const genderText = state.userProfile?.gender === "male" ? t("gender_male") : t("gender_female");
  const isFemale = state.userProfile?.gender === "female";

  const [showEditSheet, setShowEditSheet] = useState(false);

  // ── Chu kỳ (chỉ nữ) — chuyển từ onboarding sang Profile ──
  const cycleData = state.userProfile?.cycleData;
  const [showCycleSheet, setShowCycleSheet] = useState(false);
  const [cycleLastDate, setCycleLastDate] = useState(cycleData?.lastPeriodDate || "");
  const [cycleLen, setCycleLen] = useState(String(cycleData?.cycleLength || "28"));
  const [cycleErrors, setCycleErrors] = useState({});
  const [savingCycle, setSavingCycle] = useState(false);

  const nextCycleDate = (() => {
    if (!cycleData?.lastPeriodDate) return null;
    const d = new Date(cycleData.lastPeriodDate);
    if (isNaN(d.getTime())) return null;
    d.setDate(d.getDate() + (parseInt(cycleData.cycleLength) || 28));
    return d.toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
  })();

  const saveCycle = async () => {
    const errs = validateCycleTrackingStep({ lastDate: cycleLastDate, cycleLength: cycleLen });
    if (!cycleLastDate) errs.lastPeriodDate = t("cycle_last_date_required");
    if (Object.keys(errs).length > 0) {
      setCycleErrors(errs);
      return;
    }
    setCycleErrors({});
    setSavingCycle(true);
    try {
      const { dataService } = await import("../../services/dataService");
      const updatedProfile = await dataService.updateProfile({
        cycleData: { tracking: true, lastPeriodDate: cycleLastDate, cycleLength: parseInt(cycleLen) || 28 },
      });
      update({ userProfile: updatedProfile });
      showToast(t("cycle_updated"));
      setShowCycleSheet(false);
    } catch (e) {
      showToast(t("cycle_save_error"));
    } finally {
      setSavingCycle(false);
    }
  };

  // Fetch unified achievements from backend
  const [serverAchievements, setServerAchievements] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { dataService } = await import("../../services/dataService");
        const data = await dataService.getAchievements();
        setServerAchievements(data);
      } catch { /* fallback to local */ }
    })();
  }, []);

  const unlockedIds = JSON.parse(localStorage.getItem("lc_care_achievements") || "[]");
  const localState = { streak, points, plantLevel: 1, familyMembers: state.familyMembers || [] };
  const achievementDisplay = ACHIEVEMENTS.map((ach) => {
    if (serverAchievements) {
      const srv = serverAchievements.find((s) => s.id === ach.id);
      if (srv) return { ach, unlocked: srv.unlocked };
    }
    return { ach, unlocked: unlockedIds.includes(ach.id) || ach.trigger(localState) };
  });
  const unlockedCount = achievementDisplay.filter((d) => d.unlocked).length;
  const [editedName, setEditedName] = useState(state.userProfile?.fullName || "");
  const [editedGender, setEditedGender] = useState(state.userProfile?.gender || "female");
  const [editedBirthYear, setEditedBirthYear] = useState(state.userProfile?.yearOfBirth || "1985");
  const [saving, setSaving] = useState(false);

  const totalWatered = Math.floor(points / 10) || 0;
  const graduatedPlants = (state.carePlans || []).filter(p => p.plantStatus === "graduated");

  const heatmap = Array.from({ length: 84 }, (_, i) => {
    return i >= 84 - streak ? 1 : 0;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      {/* Top Header Overlay with Back Button */}
      <div style={{ padding: "calc(12px + var(--sat, 0px)) 20px 12px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${G.hairline}`, background: G.surface }}>
        <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 22, height: 22, objectFit: "contain" }} />
        </button>
        <div style={{ fontWeight: 800, color: G.text, fontSize: 18 }}>{t("my_profile")}</div>
      </div>
      
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 110px" }}>
        {/* Avatar card */}
        <div style={{ background: G.surface, borderRadius: 20, padding: "20px", marginBottom: 14, border: `1.5px solid ${G.border}`, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 30, background: `linear-gradient(135deg, var(--brand) 0%, var(--brand-header) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><img src={ICONS.avatar_mom} alt="avatar" style={{ width: 48, height: 48, objectFit: "contain" }} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: G.text }}>{fullName}</div>
              <button 
                onClick={() => {
                  setEditedName(state.userProfile?.fullName || "");
                  setEditedGender(state.userProfile?.gender || "female");
                  setEditedBirthYear(state.userProfile?.yearOfBirth || "1985");
                  setShowEditSheet(true);
                }}
                style={{ background: "none", border: "none", color: "var(--brand)", fontWeight: 700, fontSize: "var(--text-sm)", cursor: "pointer", padding: "2px 8px", borderRadius: 8, fontFamily: '"Be Vietnam Pro", sans-serif' }}
              >
                {t("edit")}
              </button>
            </div>
            <div style={{ fontSize: 13, color: G.textMid, marginTop: 2 }}>
              {(() => {
                const joined = state.userProfile?.createdAt ? new Date(state.userProfile.createdAt) : null;
                const joinedYear = joined && !isNaN(joined.getTime()) ? joined.getFullYear() : null;
                return joinedYear ? t("profile_member_since", { y: joinedYear }) : "";
              })()}{t("age_gender", { gender: genderText, age })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <span style={{ background: "var(--brand-pale)", color: "var(--brand)", fontSize: "var(--text-xs)", fontWeight: 700, padding: "3px 10px", borderRadius: 16, display: "flex", alignItems: "center", gap: 3 }}><img src={ICONS.ui_fire_streak} alt="" style={{ width: 14, height: 14, objectFit: "contain" }} /> {streak} {t("days_unit")}</span>
              <span style={{ background: "var(--accent-gold-bg)", color: "var(--accent-gold)", fontSize: "var(--text-xs)", fontWeight: 700, padding: "3px 10px", borderRadius: 16, display: "flex", alignItems: "center", gap: 3 }}><img src={ICONS.ui_points_grain} alt="" style={{ width: 14, height: 14, objectFit: "contain" }} /> {points} {t("points_unit")}</span>
            </div>
          </div>
        </div>


        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[{ label: t("total_points_stat"), value: points, icon: ICONS.ui_points_grain }, { label: t("water_count_stat"), value: totalWatered, icon: ICONS.ui_water_drop }, { label: t("planted_stat"), value: graduatedPlants.length, icon: ICONS.badge_tree }].map((s, i) => (
            <div key={i} style={{ background: G.surface, borderRadius: 16, padding: "14px 10px", textAlign: "center", border: `1.5px solid ${G.border}` }}>
              <img src={s.icon} alt={s.label} style={{ width: 24, height: 24, objectFit: "contain" }} />
              <div style={{ fontSize: 18, fontWeight: 800, color: G.text, marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--text-mid)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chu kỳ — chỉ hiện với nữ (chuyển từ onboarding sang) */}
        {isFemale && (
          <>
            <SectionHeader
              title={t("cycle_title")}
              icon="🌸"
              actionLabel={t("update")}
              onAction={() => {
                setCycleLastDate(cycleData?.lastPeriodDate || "");
                setCycleLen(String(cycleData?.cycleLength || "28"));
                setCycleErrors({});
                setShowCycleSheet(true);
              }}
            />
            <div style={{ background: G.surface, borderRadius: 16, padding: "16px", marginBottom: 14, border: `1.5px solid ${G.border}` }}>
              {nextCycleDate ? (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 22, background: "#FDF2F8",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
                  }}>🌸</div>
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", color: G.textMid, fontWeight: 700 }}>{t("cycle_next_predicted")}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: G.text, marginTop: 2 }}>{nextCycleDate}</div>
                    <div style={{ fontSize: "var(--text-xs)", color: G.textLight, marginTop: 1 }}>{t("cycle_n_days", { n: cycleData?.cycleLength || 28 })}</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: G.textMid, lineHeight: 1.6, textAlign: "center" }}>
                  {t("cycle_not_tracked")}
                </div>
              )}
            </div>
          </>
        )}

        {/* Badges — unified, from backend */}
        <SectionHeader
          title={t("badges_count", { u: unlockedCount, n: ACHIEVEMENTS.length })}
          icon={<img src={ICONS.ui_medal_badge} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />}
          actionLabel={t("see_all")}
          onAction={() => navigate("achievements")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {achievementDisplay.slice(0, 4).map(({ ach, unlocked }) => (
            <div
              key={ach.id}
              onClick={() => navigate("achievements")}
              style={{
                background: unlocked ? `${ach.gradient[0]}12` : G.surface,
                borderRadius: 16, padding: "12px",
                border: `1.5px solid ${unlocked ? `${ach.gradient[0]}35` : "#E8E8E8"}`,
                opacity: unlocked ? 1 : 0.5,
                display: "flex", gap: 10, alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: unlocked ? `linear-gradient(135deg, ${ach.gradient[0]}, ${ach.gradient[1]})` : "#E8E8E8",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
              }}>
                {ach.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "var(--text-xs)", color: "var(--text)", lineHeight: 1.3 }}>{t(`${ach.bkey}_title`)}</div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--text-mid)", marginTop: 1 }}>{t(`${ach.bkey}_desc`)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Streak heatmap */}
        <SectionHeader
          title={t("streak_12_weeks")}
          icon={<img src={ICONS.ui_fire_streak} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />}
        />
        <div style={{ background: G.surface, borderRadius: 18, padding: "16px", marginBottom: 14, border: `1.5px solid ${G.border}` }}>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {heatmap.map((v, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: v ? "var(--brand)" : "var(--hairline)" }} />)}
          </div>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--text-mid)", marginTop: 10 }}>{t("heatmap_1_square")} <img src={ICONS.badge_tree} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /></div>
        </div>

        {/* Google Fit Integration */}
        <SectionHeader title={t("health_connect")} icon="❤️" />
        <GoogleFitConnect />
        <HealthMetrics />

        {/* Memorial garden */}
        <SectionHeader
          title={t("memorial_garden")}
          icon={<img src={ICONS.ui_graduate_cap} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />}
        />
        {graduatedPlants.length > 0 ? (
          graduatedPlants.map((p, i) => {
            const pData = PLANTS_DATA[p.plantType] || {};
            return (
              <div key={i} style={{ background: G.surface, borderRadius: 16, padding: "14px 16px", border: `1.5px solid ${G.border}`, display: "flex", gap: 14, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 32 }}>{pData.emoji || "🌱"}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: G.text, display: "flex", alignItems: "center", gap: 4 }}>
                    {t(`plant_${p.plantType}`, { defaultValue: pData.name || p.plantLabel })} <img src={ICONS.ui_graduate_cap} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: 12, color: G.textMid, marginTop: 2 }}>{t("plant_journey", { label: p.plantLabel || pData.name || "Health" })}</div>
                  <div style={{ fontSize: 11, color: G.textLight, marginTop: 1 }}>{t("saved_to_memorial")}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ background: G.surface, borderRadius: 16, padding: "20px", border: `1.5px solid ${G.border}`, textAlign: "center", color: G.textLight, fontSize: 13 }}>
            {t("no_graduated_plants")}
          </div>
        )}

        {/* Language toggle */}
        <div style={{ marginTop: 24, background: G.surface, borderRadius: 16, padding: "14px 16px", border: `1.5px solid ${G.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 10 }}>{t("language_toggle")}</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ code: "vi", label: t("lang_vi") }].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  border: `2px solid ${language === code ? "var(--brand)" : "var(--border)"}`,
                  background: language === code ? "var(--brand-pale)" : "var(--surface-raised)",
                  color: language === code ? "var(--brand)" : "var(--text-mid)",
                  cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            marginTop: 14,
            width: "100%",
            padding: "14px",
            borderRadius: 16,
            border: "1.5px solid #EF4444",
            background: "transparent",
            color: "#EF4444",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: '"Be Vietnam Pro", sans-serif',
            transition: "background-color var(--dur-fast) var(--ease-out)",
          }}
        >
          {t("logout_account")}
        </button>

        <div style={{ height: 24 }} />
      </div>

      {/* Edit Profile Bottom Sheet */}
      {showEditSheet && (
        <>
          <div 
            onClick={() => setShowEditSheet(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.4)", zIndex: 100 }}
          />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: G.bg, borderRadius: "24px 24px 0 0",
            boxShadow: "0 -8px 32px rgba(15, 23, 42, 0.15)", zIndex: 101,
            padding: "24px 20px 32px",
            fontFamily: '"Be Vietnam Pro", sans-serif',
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: G.text }}>{t("profile_edit")}</div>
              <button
                onClick={() => setShowEditSheet(false)}
                style={{ background: "none", border: "none", fontSize: 14, color: G.textMid, cursor: "pointer", fontWeight: 700 }}
              >
                {t("close")}
              </button>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 6 }}>{t("full_name")}</div>
              <input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder={t("full_name")}
                style={{ width: "100%", height: 44, borderRadius: 12, border: `1.5px solid ${G.border}`, padding: "0 14px", fontSize: 14, fontFamily: '"Be Vietnam Pro", sans-serif', background: G.surface, color: G.text, boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 6 }}>{t("gender")}</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ id: "female", label: t("gender_female") }, { id: "male", label: t("gender_male") }].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setEditedGender(opt.id)}
                    style={{
                      flex: 1, padding: "12px 0", borderRadius: 14, fontSize: 14, fontWeight: 600,
                      border: `2px solid ${editedGender === opt.id ? "var(--brand)" : "var(--border)"}`,
                      background: editedGender === opt.id ? "var(--brand-pale)" : "var(--surface-raised)",
                      color: editedGender === opt.id ? "var(--brand)" : "var(--text-mid)",
                      cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 6 }}>{t("birth_year")}</div>
              <input
                value={editedBirthYear}
                onChange={(e) => setEditedBirthYear(e.target.value)}
                type="number"
                placeholder={t("birth_year")}
                style={{ width: "100%", height: 44, borderRadius: 12, border: `1.5px solid ${G.border}`, padding: "0 14px", fontSize: 14, fontFamily: '"Be Vietnam Pro", sans-serif', background: G.surface, color: G.text, boxSizing: "border-box" }}
              />
            </div>
            
            <button
              disabled={saving}
              onClick={async () => {
                if (!editedName.trim()) {
                  showToast(t("name_required"));
                  return;
                }
                const currentYear = new Date().getFullYear();
                const yearNum = parseInt(editedBirthYear);
                if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear) {
                  showToast(t("birth_year_invalid", { y: currentYear }));
                  return;
                }
                setSaving(true);
                try {
                  const { dataService } = await import("../../services/dataService");
                  const updatedProfile = await dataService.updateProfile({
                    fullName: editedName.trim(),
                    gender: editedGender,
                    yearOfBirth: editedBirthYear,
                  });
                  update({ userProfile: updatedProfile });
                  showToast(t("profile_update_success"));
                  setShowEditSheet(false);
                } catch (e) {
                  showToast(t("profile_update_error"));
                } finally {
                  setSaving(false);
                }
              }}
              style={{
                width: "100%", height: 50, borderRadius: 16,
                background: "var(--brand)",
                color: "#FFF", border: "none", fontSize: 15, fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer", fontFamily: '"Be Vietnam Pro", sans-serif'
              }}
            >
              {saving ? t("saving") : t("save_changes")}
            </button>
          </div>
        </>
      )}

      {/* Cycle Tracking Bottom Sheet (chỉ nữ) */}
      <Sheet open={showCycleSheet} onClose={() => setShowCycleSheet(false)} title={t("cycle_update")}>
        <div style={{ padding: "16px 20px 32px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 6 }}>{t("cycle_last_date")}</div>
            <input
              type="date"
              value={cycleLastDate}
              onChange={(e) => { setCycleLastDate(e.target.value); setCycleErrors(p => ({ ...p, lastPeriodDate: undefined })); }}
              style={{
                width: "100%", height: 44, borderRadius: 12,
                border: `1.5px solid ${cycleErrors.lastPeriodDate ? "#EF4444" : G.border}`,
                padding: "0 14px", fontSize: 14, fontFamily: '"Be Vietnam Pro", sans-serif',
                background: G.surface, color: G.text, boxSizing: "border-box",
              }}
            />
            {cycleErrors.lastPeriodDate && (
              <div style={{ fontSize: 12, color: "#EF4444", marginTop: 4, fontWeight: 700 }}>{cycleErrors.lastPeriodDate}</div>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.textMid, marginBottom: 6 }}>{t("cycle_avg_length")}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => { setCycleLen(p => String(Math.max(18, (parseInt(p) || 28) - 1))); setCycleErrors(p => ({ ...p, cycleLength: undefined })); }}
                style={{
                  width: 40, height: 40, borderRadius: 20, border: `1.5px solid ${G.border}`,
                  background: G.surface, fontSize: 18, color: G.text, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                }}
              >
                −
              </button>
              <input
                type="number"
                value={cycleLen}
                onChange={(e) => { setCycleLen(e.target.value); setCycleErrors(p => ({ ...p, cycleLength: undefined })); }}
                min="18" max="45"
                style={{
                  width: 76, height: 44, textAlign: "center", fontSize: 18, fontWeight: 800,
                  borderRadius: 12, border: `1.5px solid ${cycleErrors.cycleLength ? "#EF4444" : G.border}`,
                  fontFamily: '"Be Vietnam Pro", sans-serif', color: G.text,
                  background: G.surface, outline: "none", boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => { setCycleLen(p => String(Math.min(45, (parseInt(p) || 28) + 1))); setCycleErrors(p => ({ ...p, cycleLength: undefined })); }}
                style={{
                  width: 40, height: 40, borderRadius: 20, border: `1.5px solid ${G.border}`,
                  background: G.surface, fontSize: 18, color: G.text, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                }}
              >
                +
              </button>
              <span style={{ fontSize: 14, color: G.textMid, fontWeight: 600 }}>{t("days_unit")}</span>
            </div>
            {cycleErrors.cycleLength && (
              <div style={{ fontSize: 12, color: "#EF4444", marginTop: 6, fontWeight: 700, textAlign: "center" }}>{cycleErrors.cycleLength}</div>
            )}
          </div>

          {/* Preview dự kiến kỳ tiếp theo theo input hiện tại */}
          {cycleLastDate && !isNaN(new Date(cycleLastDate).getTime()) && (
            <div style={{
              background: "#FDF2F8", borderRadius: 12, padding: "10px 14px",
              marginBottom: 20, textAlign: "center", border: "1px solid #FBCFE8",
            }}>
              <div style={{ fontSize: "var(--text-xs)", color: "#BE185D", fontWeight: 700 }}>{t("cycle_next_predicted")}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: G.text, marginTop: 2 }}>
                {(() => {
                  const d = new Date(cycleLastDate);
                  d.setDate(d.getDate() + (parseInt(cycleLen) || 28));
                  return d.toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
                })()}
              </div>
            </div>
          )}

          <button
            disabled={savingCycle}
            onClick={saveCycle}
            style={{
              width: "100%", height: 50, borderRadius: 16,
              background: "var(--brand)", color: "#FFF", border: "none",
              fontSize: 15, fontWeight: 700,
              cursor: savingCycle ? "not-allowed" : "pointer",
              fontFamily: '"Be Vietnam Pro", sans-serif',
            }}
          >
            {savingCycle ? t("saving") : t("cycle_save")}
          </button>
        </div>
      </Sheet>
    </div>
  );
}
