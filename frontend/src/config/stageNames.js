// Ánh xạ index giai đoạn cây (constants.js PLANTS_DATA.stageNames) → key i18n.
// stageNames VI: ["Chờ duyệt","Mầm non","Cây non","Trưởng thành","Đang nụ","Nở hoa"]
export const STAGE_KEYS = [
  "stage_pending",  // 0 Chờ duyệt
  "stage_sprout",   // 1 Mầm non
  "stage_young",    // 2 Cây non
  "stage_growing",  // 3 Trưởng thành
  "stage_budding",  // 4 Đang nụ
  "stage_blooming", // 5 Nở hoa
];

// Trả về tên giai đoạn đã dịch theo index; fallback = chuỗi VI gốc nếu thiếu key.
export const stageName = (t, idx, fallback = "") => {
  const k = STAGE_KEYS[idx];
  return k ? t(k, { defaultValue: fallback }) : fallback;
};
