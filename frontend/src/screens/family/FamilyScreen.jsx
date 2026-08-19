// Tab Family — Split layout: garden (55%) + member panel (45%)
// Sky gradient background, bottom sheet with member cards
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useApp } from "../../context/AppContext";
import { ICONS } from "../../config/constants";
import IsometricGarden from "../../components/garden/IsometricGarden";
import { dataService } from "../../services/dataService";
import { G } from "../../components/SharedUI";
import Celebration from "../../components/Celebration";
import ProfileButton from "../../components/ui/ProfileButton";

const F = '"Be Vietnam Pro", sans-serif';

const AVATAR_MAP = {
  mom: "/assets/icons/avatar_mom.webp",
  dad: "/assets/icons/avatar_dad.webp",
  child: "/assets/icons/avatar_child.webp",
  grandma: "/assets/icons/avatar_grandma.webp",
};

function resolveState(m) {
  if (m.state) return m.state;
  if (m.status === "growing") return "ACTIVE";
  if (m.status === "pending") return "PENDING";
  return "ACTIVE";
}

const STATE_CFG = {
  ACTIVE:      { color: "#22C55E", border: "rgba(34,197,94,0.5)",  label: (m) => `Lv.${m.level||1}` },
  NEEDS_WATER: { color: "#EF4444", border: "rgba(239,68,68,0.5)",  label: () => i18n.t("needs_water_label"),  pulse: true },
  PENDING:     { color: "#F59E0B", border: "rgba(245,158,11,0.5)", label: () => i18n.t("pending_label"), dashed: true },
  GRADUATED:   { color: "#A855F7", border: "rgba(168,85,247,0.5)", label: () => "🎓" },
};


export default function FamilyScreen() {
  const { t } = useTranslation();
  const { showToast, state, initializeApp, navigate, update, simulateStreak } = useApp();
  const { familyMembers = [], loading } = state;
  const [showMigrationTip, setShowMigrationTip] = useState(!localStorage.getItem('migration_v5_seen'));

  useEffect(() => {
    if (showMigrationTip) {
      const timer = setTimeout(() => {
        localStorage.setItem('migration_v5_seen', 'true');
        setShowMigrationTip(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showMigrationTip]);

  // Sort family members to place the current user (isMe === true) first
  const sortedFamilyMembers = [...familyMembers].map(m => {
    if (m.isMe) {
      return {
        ...m,
        avatar: m.avatar || state.userProfile?.avatar || ICONS.avatar_mom,
        relation: m.relation || state.userProfile?.careFor || "mom",
      };
    }
    return m;
  }).sort((a, b) => {
    if (a.isMe && !b.isMe) return -1;
    if (!a.isMe && b.isMe) return 1;
    return 0;
  });

  // Use real members only — no demo fallback
  const [membersLocal, setMembersLocal] = useState(null);
  const members = membersLocal || sortedFamilyMembers;

  const [showInviteModal, setShowInviteModal] = useState(false);
  // Water bottom sheet state (Task 3.3 / 3.4)
  const [waterTarget, setWaterTarget] = useState(null); // member object
  const [waterLoading, setWaterLoading] = useState(false);
  const [waterSuccess, setWaterSuccess] = useState(false);
  // Task B4: family milestone celebration
  const [showFamilyCelebration, setShowFamilyCelebration] = useState(false);

  // Detect when ALL active family members completed habits today (proxy: state === ACTIVE, not NEEDS_WATER)
  useEffect(() => {
    const activeNonMe = members.filter(m => !m.isMe && resolveState(m) !== "PENDING");
    const allGreen = activeNonMe.length >= 1 && activeNonMe.every(m => resolveState(m) === "ACTIVE");
    if (!allGreen) return;
    const key = `lc_care_family_milestone_${new Date().toISOString().slice(0, 10)}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, "true");
      setTimeout(() => setShowFamilyCelebration(true), 600);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members.map(m => m.state).join(",")]);

  const handleWaterPlant = useCallback((member) => {
    setWaterTarget(member);
    setWaterSuccess(false);
  }, []);

  const confirmWater = useCallback(async () => {
    if (!waterTarget || waterLoading) return;
    setWaterLoading(true);
    try {
      const res = await dataService.waterForMember(waterTarget.id);
      if (res?.success) {
        setWaterSuccess(true);
        // Update local state — plant revives
        setMembersLocal(prev => {
          const base = prev || sortedFamilyMembers;
          return base.map(m =>
            m.id === waterTarget.id
              ? { ...m, state: "ACTIVE", streak: (m.streak || 0) + 1 }
              : m
          );
        });
        showToast(t("watered_for_member", { name: waterTarget.name, p: res.senderPoints || 5 }));
        setTimeout(() => {
          setWaterTarget(null);
          setWaterSuccess(false);
        }, 2000);
      } else {
        showToast(res?.message || t("cannot_water_for_now"));
        setWaterTarget(null);
      }
    } catch (err) {
      const msg = err?.response?.data?.detail || t("cannot_connect_server_short");
      showToast(msg);
      setWaterTarget(null);
    } finally {
      setWaterLoading(false);
    }
  }, [waterTarget, waterLoading, sortedFamilyMembers, showToast]);

  // Stats for HUD
  const activePlants = members.filter(m => {
    const s = resolveState(m);
    return s === "ACTIVE" || s === "NEEDS_WATER" || s === "GRADUATED";
  }).length;
  const topStreak = Math.max(...members.map(m => m.streak || 0), 0);
  const totalPoints = members.reduce((s, m) => s + (m.streak || 0) * 10 + (m.level || 0) * 50, 0);

  const stats = {
    plants: activePlants,
    streak: topStreak,
    points: totalPoints,
    members: members.length,
  };

  const careTeamInsight = {
    text: t("family_checkup_reminder"),
    pharmacist: t("pharmacist_tanaka_aya"),
  };

  if (loading && familyMembers.length === 0 && !membersLocal) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", height: "100%",
        background: "linear-gradient(180deg, #87CEEB 0%, #B5E3F5 100%)", alignItems: "center", justifyContent: "center",
        fontFamily: F,
      }}>
        <img src={ICONS.mascot_loading} alt="loading"
          style={{ width: 64, height: 64, objectFit: "contain", marginBottom: 14, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{t("loading_garden")}</div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#D6F0FF", fontFamily: F, position: "relative",
    }}>

      {/* Header bar — Garden only */}
      <div style={{
        padding: "calc(8px + var(--sat, 0px)) 16px 6px",
        background: "linear-gradient(180deg, #87CEEB 0%, #A8DCF4 100%)",
        borderBottom: "none",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        position: "relative",
        flexShrink: 0,
      }}>
      </div>

      <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <>
          {/* === TOP: Garden (55%) === */}
            <div style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
            }}>
              <IsometricGarden
                members={members}
                onWaterPlant={handleWaterPlant}
                careTeamInsight={careTeamInsight}
                style={{ width: "100%", height: "100%" }}
              />

              {/* HUD stats bar — moved from IsometricGarden */}
              {stats && (
                <div style={{
                  position: "absolute", top: 8, left: 8, right: 8,
                  zIndex: 30, display: "flex", justifyContent: "center", gap: 5,
                }}>
                  <HudChip icon="🌱" value={`${stats.plants}`} label={t("plants_unit")} />
                  <HudChip iconSrc="/assets/icons/ui_fire_streak.webp" value={`${stats.streak}`} label={t("day_unit")} hot />
                  <HudChip icon="⭐" value={`${stats.points}`} label={t("points_unit")} />
                  <HudChip icon="👥" value={`${stats.members}/6`} label={t("members_abbr")} />
                </div>
              )}



            </div>

            {/* === BOTTOM: Member Panel (45%) === */}
            <div style={{
              flex: "none",
              background: "transparent",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: "20px 20px 0 0",
              marginTop: -12,
              boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 10,
              position: "relative",
              border: "1px solid rgba(255,255,255,0.5)",
              borderBottom: "none",
            }}>
              {/* Panel header */}
              <div style={{
                padding: "16px 20px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: G.text, fontFamily: F,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  👨‍👩‍👧‍👦 {t("family_members_panel")}
                </div>
                <span style={{
                  background: "var(--brand-pale)",
                  color: "var(--brand)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontFamily: F,
                }}>
                  {members.length}/6
                </span>
              </div>

              {/* Water Activity Feed — compact horizontal scroll */}
              {(state.waterActivity || []).length > 0 && (
                <div style={{
                  padding: "0 16px 4px",
                  overflowX: "auto",
                  display: "flex",
                  gap: 6,
                  scrollbarWidth: "none",
                  flexShrink: 0,
                }}>
                  {state.waterActivity.map((wa, i) => {
                    const targetMember = members.find(m => m.id === wa.targetId);
                    const targetName = targetMember?.name || "TV";
                    return (
                      <div key={i} style={{
                        flexShrink: 0,
                        background: "rgba(219, 234, 254, 0.8)",
                        borderRadius: 99,
                        padding: "3px 10px",
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#1E40AF",
                        whiteSpace: "nowrap",
                        fontFamily: F,
                      }}>
                        💧 {wa.senderName} → {targetName}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Horizontal scroll member cards */}
              <div style={{
                flex: "none",
                overflowX: "auto",
                overflowY: "hidden",
                padding: "0 16px 10px",
                paddingBottom: 110,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                scrollbarWidth: "none",
              }}>
                {members.map(member => (
                  <MemberCard key={member.id} member={member} onWaterClick={handleWaterPlant} />
                ))}

                {/* Add member button */}
                {members.length < 6 && (
                  <button
                    onClick={() => setShowInviteModal(true)}
                    style={{
                      flexShrink: 0,
                      width: 110,
                      minHeight: 140,
                      background: G.surface,
                      border: `2px dashed ${G.border}`,
                      borderRadius: 16,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      cursor: "pointer",
                      padding: "12px 0",
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "var(--brand-pale)", display: "flex",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 20, color: "var(--brand)" }}>+</span>
                    </div>
                    <span style={{ fontSize: "var(--text-xs)", color: G.textMid, fontWeight: 600, fontFamily: F }}>{t("invite_member_short")}</span>
                  </button>
                )}
              </div>
            </div>
        </>
      </div>

      {/* Migration Tooltip */}
      {showMigrationTip && (
        <div style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          width: "88%",
          maxWidth: 320,
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          color: "#fff",
          borderRadius: 16,
          padding: "12px 16px",
          boxShadow: "0 8px 24px rgba(4,120,87,0.3)",
          zIndex: 200,
          animation: "fadeSlideUp 0.3s ease",
          fontSize: "var(--text-xs)",
          lineHeight: 1.5,
          fontFamily: F,
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontWeight: 800, fontSize: 13 }}>{t("update_new_header")}</span>
            <button
              onClick={() => {
                localStorage.setItem('migration_v5_seen', 'true');
                setShowMigrationTip(false);
              }}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "var(--text-xs)", fontWeight: 700 }}
            >✕</button>
          </div>
          <div>{t("calendar_integrated")}</div>
          <div style={{ marginTop: 4 }}>{t("profile_moved")}</div>
        </div>
      )}

      {/* Scrollbar hide CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        div::-webkit-scrollbar { display: none; }
      `}} />

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}

      {/* Water Bottom Sheet (Task 3.4) */}
      {waterTarget && (
        <WaterSheet
          member={waterTarget}
          loading={waterLoading}
          success={waterSuccess}
          onConfirm={confirmWater}
          onClose={() => setWaterTarget(null)}
        />
      )}

      {/* Task B4: Family milestone celebration */}
      {showFamilyCelebration && (
        <Celebration
          type="milestone"
          icon="🏡"
          title={t("celebration_family_title")}
          desc={t("celebration_family_desc")}
          onClose={() => setShowFamilyCelebration(false)}
        />
      )}
    </div>
  );
}

// --- HUD stat chip (moved from IsometricGarden) ---
function HudChip({ icon, iconSrc, value, label, hot }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 3,
      background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
      borderRadius: 999, padding: "3px 8px",
      border: hot ? "1.5px solid rgba(234,88,12,0.5)" : "1px solid rgba(255,255,255,0.12)",
    }}>
      {iconSrc ? <img src={iconSrc} alt="" style={{ width: 11, height: 11 }} /> : <span style={{ fontSize: "var(--text-xs)" }}>{icon}</span>}
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "#fff", fontFamily: F }}>{value}</span>
      <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)", fontFamily: F }}>{label}</span>
    </div>
  );
}

// --- Member card for bottom panel (larger, white bg) ---
function MemberCard({ member, onWaterClick }) {
  const { t } = useTranslation();
  const s = resolveState(member);
  const cfg = STATE_CFG[s] || STATE_CFG.ACTIVE;
  const cleanPlantId = member.plant ? member.plant.replace("plant_", "").replace("-", "") : null;
  const plantSrc = cleanPlantId ? `/assets/plants/plant_${cleanPlantId}_lv${member.level || 1}.webp` : null;
  const needsWater = s === "NEEDS_WATER";

  const STATUS_BORDER = {
    ACTIVE: "#22C55E",
    NEEDS_WATER: "#EF4444",
    PENDING: "#F59E0B",
    GRADUATED: "#A855F7",
  };

  return (
    <div style={{
      flexShrink: 0,
      width: 110,
      background: needsWater ? "rgba(239,68,68,0.07)" : "var(--glass-bg)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      borderRadius: 16,
      padding: "12px 8px 10px",
      border: needsWater ? "1.5px solid rgba(239,68,68,0.4)" : "1px solid var(--glass-border)",
      borderLeft: `3px solid ${STATUS_BORDER[s] || STATUS_BORDER.ACTIVE}`,
      boxShadow: needsWater ? "0 2px 12px rgba(239,68,68,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      transition: "all 0.3s ease",
    }}>
      {/* Avatar */}
      <div style={{ position: "relative", marginBottom: 6 }}>
        <img
          src={member.avatar || AVATAR_MAP[member.relation] || "/assets/mascots_nobg/mascot_avatar.webp"}
          alt={member.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/mascots_nobg/mascot_avatar.webp";
          }}
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: `2.5px solid ${cfg.color}`,
            objectFit: "cover",
            filter: s === "PENDING" ? "grayscale(70%)" : needsWater ? "brightness(0.9)" : "none",
          }}
        />
        {/* State dot */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 10, height: 10,
          background: cfg.color,
          borderRadius: "50%",
          border: "2px solid #fff",
          animation: needsWater ? "pulse 1.2s ease-in-out infinite" : "none",
        }} />
      </div>

      {/* Plant image */}
      <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        {plantSrc ? (
          <img src={plantSrc} alt="" style={{
            maxHeight: "100%", maxWidth: 36, objectFit: "contain",
            filter: s === "PENDING"
              ? "grayscale(75%)"
              : needsWater
              ? "grayscale(50%) brightness(0.75)"  // Wilted look
              : "none",
            transition: "filter 0.4s ease",
          }} />
        ) : (
          <span style={{ fontSize: 18 }}>{needsWater ? "🤥" : "🌱"}</span>
        )}
      </div>

      {/* Name */}
      <div style={{
        fontSize: "var(--text-xs)", fontWeight: 700, color: G.text,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        width: "100%", textAlign: "center", fontFamily: F,
        marginBottom: 4,
      }}>
        {member.name}
      </div>

      {/* Streak or status */}
      {s === "PENDING" ? (
        <div style={{
          fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--accent-gold)",
          background: "rgba(245,158,11,0.1)",
          padding: "2px 8px", borderRadius: 999, fontFamily: F,
        }}>
          {t("pending_label")}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {member.streak > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: 2,
              background: G.gold100 || "#FFF9E8",
              borderRadius: 999, padding: "2px 6px",
              border: "1px solid #FFECCC",
            }}>
              <img src="/assets/icons/ui_fire_streak.webp" alt="" style={{ width: 10, height: 10 }} />
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: "#EA580C", fontFamily: F }}>{member.streak}</span>
            </div>
          )}
          <span style={{
            fontSize: "var(--text-xs)", fontWeight: 600, color: cfg.color, fontFamily: F,
          }}>
            {typeof cfg.label === "function" ? cfg.label(member) : cfg.label}
          </span>
        </div>
      )}

      {/* 💧 Tưới hộ button — shown when NEEDS_WATER and not self */}
      {needsWater && !member.isMe && onWaterClick && (
        <button
          onClick={() => onWaterClick(member)}
          style={{
            marginTop: 8,
            width: "100%",
            height: 28,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-header) 100%)",
            border: "none",
            color: "#fff",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
            boxShadow: "0 3px 8px rgba(59,130,246,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          {t("water_help_short")}
        </button>
      )}
    </div>
  );
}

// --- Invite Modal ---
function InviteModal({ onClose }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // Generate the invite link immediately on open
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dataService.createFamilyInvite()
      .then((data) => {
        if (!cancelled) setInviteUrl(data.inviteUrl);
      })
      .catch(() => {
        if (!cancelled) setError(t("cannot_create_invite"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleCopy = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (!inviteUrl) return;
    if (navigator.share) {
      navigator.share({
        title: t("invite_share_title"),
        text: t("invite_share_text"),
        url: inviteUrl,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "flex-end", zIndex: 200,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1A1A2E", borderRadius: "24px 24px 0 0",
          padding: "28px 20px 36px",
          width: "100%", fontFamily: F,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>
            {t("invite_family_btn")}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 20, lineHeight: 1.6 }}>
          {t("invite_instructions")}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "20px 0", color: "rgba(255,255,255,0.5)" }}>
            {t("creating_invite")}
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "16px", color: "#EF4444", fontSize: 13 }}>
            {error}
          </div>
        )}

        {inviteUrl && (
          <>
            <div style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.12)",
              marginBottom: 14,
              wordBreak: "break-all",
              fontSize: 12, color: "rgba(255,255,255,0.7)",
              fontFamily: "monospace",
            }}>
              {inviteUrl}
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <button
                onClick={handleCopy}
                style={{
                  flex: 1, height: 48, borderRadius: 14,
                  background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.1)",
                  border: `1.5px solid ${copied ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.2)"}`,
                  color: copied ? "#22C55E" : "#fff",
                  fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F,
                  transition: "all 0.2s",
                }}
              >
                {copied ? t("copied") : t("copy_link")}
              </button>

              <button
                onClick={handleShare}
                style={{
                  flex: 1, height: 48, borderRadius: 14,
                  background: "linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)",
                  border: "none",
                  color: "#fff", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: F,
                  boxShadow: "0 4px 12px rgba(34,197,94,0.3)",
                }}
              >
                {t("send_sms")}
              </button>
            </div>

            <div style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
              {t("invite_link_info")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// --- Water Bottom Sheet (Task 3.4) ---
function WaterSheet({ member, loading, success, onConfirm, onClose }) {
  const { t } = useTranslation();
  const plantEmoji = member.plant ? "🌿" : "🌱";
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "flex-end", zIndex: 300,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "24px 24px 0 0",
          padding: "24px 20px 36px",
          width: "100%", fontFamily: F,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
          animation: "fadeSlideUp 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 12, animation: "bounce 0.6s ease" }}>💧</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--success)", marginBottom: 6 }}>
              {t("water_success")}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>
              {t("water_success_desc", { emoji: plantEmoji, name: member.name })}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>
                {t("water_for_member_btn", { name: member.name })}
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-light)", fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 14, padding: "12px 14px", marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 6 }}>
                {t("water_for_reminder", { name: member.name })}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-mid)", lineHeight: 1.6 }}>
                {t("health_data_missing")}<br />
                {t("family_plant_wilting", { emoji: plantEmoji })}
              </div>
            </div>

            <div style={{ fontSize: 12, color: "var(--text-mid)", marginBottom: 20, lineHeight: 1.5 }}>
              {t("water_for_help_text", { name: member.name })}
            </div>

            <button
              onClick={onConfirm}
              disabled={loading}
              style={{
                width: "100%", height: 52, borderRadius: 16,
                background: loading ? "var(--hairline)" : "linear-gradient(135deg, var(--brand) 0%, var(--brand-header) 100%)",
                border: "none", color: "#fff",
                fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: F, boxShadow: loading ? "none" : "0 4px 16px rgba(59,130,246,0.4)",
                transition: "all 0.2s",
              }}
            >
              {loading ? t("watering_progress") : t("water_now")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
