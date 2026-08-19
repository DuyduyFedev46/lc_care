// achievements.js — Single source of truth for achievement metadata
// IDs match backend achievements_catalog.py exactly.
// Rule #0: no medical diagnosis, badges are BEHAVIOURAL milestones only

export const ACHIEVEMENTS = [
  {
    id: "first_water",
    bkey: "badge_first_sprout",
    title: "Mầm Xanh Đầu Tiên 🌱",
    desc: "Hoàn thành thói quen lần đầu tiên",
    icon: "🌱",
    gradient: ["#22C55E", "#16A34A"],
    trigger: (state) => (state.streak || 0) >= 1,
    progress: (state) => ({ current: Math.min(state.streak || 0, 1), target: 1, label: `${Math.min(state.streak||0,1)}/1 ngày` }),
  },
  {
    id: "streak_7",
    bkey: "badge_golden_week",
    title: "Tuần Lễ Vàng 🔥",
    desc: "7 ngày liên tiếp hoàn thành thói quen",
    icon: "🔥",
    gradient: ["#F59E0B", "#D97706"],
    trigger: (state) => (state.streak || 0) >= 7,
    progress: (state) => ({ current: Math.min(state.streak || 0, 7), target: 7, label: `${Math.min(state.streak||0,7)}/7 ngày` }),
  },
  {
    id: "streak_30",
    bkey: "badge_habit_month",
    title: "Tháng Thói Quen 🏆",
    desc: "30 ngày kiên trì — cây bắt đầu ra hoa!",
    icon: "🏆",
    gradient: ["#8B5CF6", "#7C3AED"],
    trigger: (state) => (state.streak || 0) >= 30,
    progress: (state) => ({ current: Math.min(state.streak || 0, 30), target: 30, label: `${Math.min(state.streak||0,30)}/30 ngày` }),
  },
  {
    id: "level_up",
    bkey: "badge_strong_plant",
    title: "Cây Lớn Mạnh 🌿",
    desc: "Cây đã lên level 2",
    icon: "🌿",
    gradient: ["#10B981", "#059669"],
    trigger: (state) => (state.plantLevel || 1) >= 2,
    progress: (state) => ({ current: Math.min(state.plantLevel||1, 2), target: 2, label: `Lv.${state.plantLevel||1}/2` }),
  },
  {
    id: "family_joined",
    bkey: "badge_full_garden",
    title: "Vườn Nhà Đầy Đủ 🏡",
    desc: "Có ít nhất 1 thành viên gia đình tham gia",
    icon: "🏡",
    gradient: ["#3B82F6", "#2563EB"],
    trigger: (state) => (state.familyMembers || []).filter(m => !m.isMe && m.status !== "PENDING").length >= 1,
    progress: (state) => {
      const c = Math.min((state.familyMembers||[]).filter(m=>!m.isMe&&m.status!=="PENDING").length, 1);
      return { current: c, target: 1, label: `${c}/1 thành viên` };
    },
  },
  {
    id: "water_for_family",
    bkey: "badge_water_for_family",
    title: "Người Thân Chu Đáo 💧",
    desc: "Đã tưới hộ cây cho người thân",
    icon: "💧",
    gradient: ["#06B6D4", "#0891B2"],
    trigger: (state) => (state.wateredForOthers || 0) >= 1,
    progress: (state) => ({ current: Math.min(state.wateredForOthers||0,1), target: 1, label: `${Math.min(state.wateredForOthers||0,1)}/1 lần` }),
  },
  {
    id: "voucher_redeemed",
    bkey: "badge_first_harvest",
    title: "Thu Hoạch Đầu Mùa 🎁",
    desc: "Đổi voucher chăm sóc sức khỏe lần đầu",
    icon: "🎁",
    gradient: ["#EC4899", "#DB2777"],
    trigger: (state) => (state.vouchersRedeemed || 0) >= 1,
    progress: (state) => ({ current: Math.min(state.vouchersRedeemed||0,1), target: 1, label: `${Math.min(state.vouchersRedeemed||0,1)}/1 voucher` }),
  },
  {
    id: "points_100",
    bkey: "badge_100pts",
    title: "Tích Lũy 100 Điểm ⭐",
    desc: "Có tổng cộng 100 điểm sức khỏe",
    icon: "⭐",
    gradient: ["#EAB308", "#CA8A04"],
    trigger: (state) => (state.points || 0) >= 100,
    progress: (state) => ({ current: Math.min(state.points||0,100), target: 100, label: `${Math.min(state.points||0,100)}/100 điểm` }),
  },
];

/** Trả về danh sách badge vừa unlock. So sánh với alreadyUnlocked để tránh trigger lặp. */
export function checkNewAchievements(state, alreadyUnlocked = []) {
  return ACHIEVEMENTS.filter(
    (a) => !alreadyUnlocked.includes(a.id) && a.trigger(state)
  );
}

/** Huy hiệu kế tiếp gần đạt nhất (dùng cho nudge "Next achievement"). */
export function getNextAchievement(state, unlockedIds = []) {
  const locked = ACHIEVEMENTS.filter((a) => !unlockedIds.includes(a.id));
  if (!locked.length) return null;
  return locked.reduce((best, a) => {
    const p = a.progress(state);
    const bestP = best.progress(state);
    const ratio = p.current / p.target;
    const bestRatio = bestP.current / bestP.target;
    return ratio > bestRatio ? a : best;
  }, locked[0]);
}
