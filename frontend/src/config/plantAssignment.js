// 14 nhóm → 14 cây, single-plant deterministic
// Mỗi người 1 cây — 1 cây có thể có nhiều care plan dựa trên bệnh lý
export const PLANT_GROUPS = {
  G1:  { plant: "mint",        label: "Bạc Hà",      emoji: "🌿", color: "#10B981", needsPharmacist: false },
  G2:  { plant: "ginger",      label: "Gừng",         emoji: "🫚", color: "#00923F", needsPharmacist: true },
  G3:  { plant: "bittermelon", label: "Khổ Qua",      emoji: "🥒", color: "#65A30D", needsPharmacist: true },
  G4:  { plant: "lotus",       label: "Sen",           emoji: "🪷", color: "#DB2777", needsPharmacist: false },
  G5:  { plant: "basil",       label: "Húng Quế",      emoji: "🌿", color: "#F59E0B", needsPharmacist: false },
  G6:  { plant: "aloe",        label: "Lô Hội",        emoji: "🪴", color: "#059669", needsPharmacist: false },
  G7:  { plant: "turmeric",    label: "Nghệ",          emoji: "🟡", color: "#D97706", needsPharmacist: true },
  G8:  { plant: "lavender",    label: "Oải Hương",     emoji: "🪻", color: "#7C3AED", needsPharmacist: true },
  G9:  { plant: "ginseng",     label: "Nhân Sâm",      emoji: "🥔", color: "#9CA3AF", needsPharmacist: false },
  G10: { plant: "pennywort",   label: "Rau Má",        emoji: "🌾", color: "#0284C7", needsPharmacist: false },
  G11: { plant: "licorice",    label: "Cam Thảo",      emoji: "🌿", color: "#B45309", needsPharmacist: false },
  G12: { plant: "lemongrass",  label: "Sả",            emoji: "🌿", color: "#4A8A40", needsPharmacist: false },
  G13: { plant: "eucommia",    label: "Đỗ Trọng",      emoji: "🌳", color: "#8B5CF6", needsPharmacist: true },
  G14: { plant: "phyllanthus", label: "Diệp Hạ Châu",  emoji: "🌿", color: "#059669", needsPharmacist: true },
  G15: { plant: "tea",         label: "Lá Trà",        emoji: "🍵", color: "#3B82F6", needsPharmacist: true },
};

// G3 sub-condition → plant mapping
export const DISEASE_TO_PLANT = {
  diabetes:     "bittermelon",
  hypertension: "ginger",
  cholesterol:  "tea",
  bone_joint:   "eucommia",
  digestive:    "phyllanthus",
};

const MEDICAL_GROUPS = ["G2", "G3", "G7", "G8", "G13", "G14", "G15"];

export function isMedicalGroup(groupId) {
  return MEDICAL_GROUPS.includes(groupId);
}

// Find group ID by plant key
function findGroupByPlant(plantKey) {
  const entry = Object.entries(PLANT_GROUPS).find(([, v]) => v.plant === plantKey);
  return entry ? { ...entry[1], group: entry[0] } : null;
}

// Single plant assignment — each person gets exactly 1 plant
export function assignPlant(profile) {
  const { healthStatus, yearOfBirth, exercise, careFor, chronicSubConditions } = profile || {};
  const age = new Date().getFullYear() - (yearOfBirth || 1990);
  const subs = chronicSubConditions || [];

  // Priority 1: Medical (use first chronic sub-condition for mapping)
  if (healthStatus === "chronic" && subs.length > 0) {
    const plantKey = DISEASE_TO_PLANT[subs[0]] || "bittermelon";
    return findGroupByPlant(plantKey) || { ...PLANT_GROUPS.G3, group: "G3" };
  }
  if (healthStatus === "chronic") {
    return { ...PLANT_GROUPS.G3, group: "G3" };
  }
  if (healthStatus === "mental") {
    return { ...PLANT_GROUPS.G8, group: "G8" };
  }
  if (healthStatus === "recovery") {
    return { ...PLANT_GROUPS.G7, group: "G7" };
  }
  if (healthStatus === "monitoring") {
    return { ...PLANT_GROUPS.G2, group: "G2" };
  }

  // Priority 2: Life stage — pregnant overrides age
  if (healthStatus === "pregnant") return { ...PLANT_GROUPS.G4, group: "G4" };
  if (age < 18) return { ...PLANT_GROUPS.G5, group: "G5" };
  if (age >= 60) return { ...PLANT_GROUPS.G6, group: "G6" };

  // Priority 3: Lifestyle
  if (exercise === "active") return { ...PLANT_GROUPS.G9, group: "G9" };
  if (careFor === "family") return { ...PLANT_GROUPS.G11, group: "G11" };
  if (exercise === "sedentary") return { ...PLANT_GROUPS.G10, group: "G10" };

  // Default
  return { ...PLANT_GROUPS.G1, group: "G1" };
}
