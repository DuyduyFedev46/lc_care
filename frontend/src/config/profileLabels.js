// Nhãn hiển thị hồ sơ khảo sát — dùng chung cho onboarding & bảng tóm tắt trên Home
export const PROFILE_LABELS = {
  gender: { label: "Giới tính", map: { male: "Nam", female: "Nữ", other: "Khác" } },
  yearOfBirth: { label: "Năm sinh" },
  careFor: { label: "Chăm sóc cho", map: { self: "Bản thân", family: "Gia đình", both: "Cả hai" } },
  healthStatus: { label: "Tình trạng sức khỏe", map: { healthy: "Khỏe mạnh", chronic: "Đang dùng thuốc mãn tính", monitoring: "Cần theo dõi sức khỏe", mental: "Sức khỏe tinh thần", pregnant: "Mang thai / Sau sinh", recovery: "Đang hồi phục" } },
  exercise: { label: "Vận động", map: { active: "Rất đều đặn", sometimes: "Thỉnh thoảng", sedentary: "Khá ít vận động", starting: "Đang muốn bắt đầu" } },
};

export const CONDITION_LABELS = {
  diabetes: "Tiểu đường", hypertension: "Huyết áp", cholesterol: "Mỡ máu",
  bone_joint: "Xương khớp", digestive: "Tiêu hóa / Gan",
};

// Vẫn giữ để hiển thị dữ liệu của user cũ (màn nhập đã bỏ khỏi onboarding)
export const LIFE_CHANGE_LABELS = {
  job: "Bắt đầu công việc mới", move: "Chuyển nơi ở", pregnant: "Mang thai",
  baby: "Vừa chào đón em bé", retired: "Bắt đầu nghỉ hưu",
  travel: "Đi công tác / nước ngoài", none: "Không có thay đổi lớn",
  stress: "Stress công việc",
};

export const HABIT_LABELS = {
  latenight: "Hay thức khuya", alcohol: "Rượu bia", unhealthy_eating: "Ăn vội vàng",
  stress: "Hay căng thẳng", smoking: "Hút thuốc", skip_meals: "Bỏ bữa",
  sleep_late: "Ngủ muộn", ok: "Sống lành mạnh",
};

export const mapCodes = (codes, labelMap) => codes.map((c) => labelMap[c] || c).join(", ");

// Build danh sách { label, value } từ userProfile để render bảng tóm tắt (VI fallback)
export function buildSurveyItems(profile = {}) {
  const items = [];
  Object.entries(PROFILE_LABELS).forEach(([key, cfg]) => {
    const val = profile[key];
    if (!val) return;
    const display = cfg.map ? (cfg.map[val] || val) : val;
    items.push({ label: cfg.label, value: display });
  });
  if (profile.chronicSubConditions?.length > 0)
    items.push({ label: "Nhóm quan tâm", value: mapCodes(profile.chronicSubConditions, CONDITION_LABELS) });
  if (profile.lifeChanges?.length > 0)
    items.push({ label: "Giai đoạn sống", value: mapCodes(profile.lifeChanges, LIFE_CHANGE_LABELS) });
  if (profile.badHabits?.length > 0)
    items.push({ label: "Thói quen cần cải thiện", value: mapCodes(profile.badHabits, HABIT_LABELS) });
  return items;
}

// i18n-aware version — dùng t() để dịch label + value
const PROFILE_LABEL_KEYS = {
  gender:       { label: "gender",            map: { male: "gender_male", female: "gender_female", other: "gender_other" } },
  yearOfBirth:  { label: "label_year_of_birth" },
  careFor:      { label: "label_care_for",    map: { self: "care_self", family: "care_family", both: "care_both" } },
  healthStatus: { label: "label_health_status", map: { healthy: "health_healthy", chronic: "health_chronic", monitoring: "health_monitoring", mental: "health_mental", pregnant: "health_pregnant", recovery: "health_recovery" } },
  exercise:     { label: "label_exercise",    map: { active: "exercise_active", sometimes: "exercise_sometimes", sedentary: "exercise_sedentary", starting: "exercise_starting" } },
};
const CONDITION_KEYS = { diabetes: "interest_diabetes", hypertension: "interest_hypertension", cholesterol: "interest_cholesterol", bone_joint: "interest_bone_joint", digestive: "interest_digestive" };
const HABIT_KEYS = { latenight: "habit_latenight", alcohol: "habit_alcohol", unhealthy_eating: "habit_unhealthy_eating", stress: "habit_stress", smoking: "habit_smoking", skip_meals: "habit_skip_meals", sleep_late: "habit_sleep_late", ok: "habit_ok" };

export function buildSurveyItemsI18n(profile = {}, t) {
  const items = [];
  Object.entries(PROFILE_LABEL_KEYS).forEach(([key, cfg]) => {
    const val = profile[key];
    if (!val) return;
    const valueKey = cfg.map ? (cfg.map[val] || val) : null;
    items.push({
      label: t(cfg.label),
      value: valueKey ? t(valueKey, { defaultValue: val }) : val,
    });
  });
  if (profile.chronicSubConditions?.length > 0)
    items.push({ label: t("label_interest_group"), value: profile.chronicSubConditions.map(c => t(CONDITION_KEYS[c] || c, { defaultValue: c })).join(", ") });
  if (profile.lifeChanges?.length > 0)
    items.push({ label: t("label_life_stage"), value: mapCodes(profile.lifeChanges, LIFE_CHANGE_LABELS) });
  if (profile.badHabits?.length > 0)
    items.push({ label: t("habits_improve"), value: profile.badHabits.map(c => t(HABIT_KEYS[c] || c, { defaultValue: c })).join(", ") });
  return items;
}
