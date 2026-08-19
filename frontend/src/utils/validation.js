// Validation helpers for LC_Care onboarding forms
// Mirrors backend/shared/validation.py constants
import i18n from "../i18n";
const t = (k, o) => i18n.t(k, o);

// ── Enum value sets ──
const GENDERS = ["male", "female"];
const CARE_FOR = ["self", "child", "parents", "family"];
const HEALTH_STATUS = ["healthy", "monitoring", "chronic", "mental", "pregnant", "recovery"];
const CHRONIC_SUB_CONDITIONS = ["diabetes", "hypertension", "cholesterol", "bone_joint", "digestive"];
const EXERCISE = ["active", "sometimes", "sedentary", "starting"];
const BAD_HABITS = ["latenight", "alcohol", "unhealthy_eating", "stress", "smoking", "skip_meals", "sleep_late", "ok"];
const LIFE_CHANGES = ["job", "move", "pregnant", "baby", "retired", "travel", "none"];

// ── Field limits ──
const NAME_MAX_LENGTH = 100;
const YEAR_MIN = 1900;
const YEAR_MAX = 2016;
const CYCLE_LENGTH_MIN = 18;
const CYCLE_LENGTH_MAX = 45;
const NOTE_MAX_LENGTH = 2000;

// ── Welcome Step ──
export function validateWelcomeStep(data) {
  const errors = {};
  const name = (data.fullName || "").trim();

  if (!name) {
    errors.fullName = t("validation_name_required");
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.fullName = t("validation_name_length", { max: NAME_MAX_LENGTH });
  }

  if (!GENDERS.includes(data.gender)) {
    errors.gender = t("validation_gender_required");
  }

  const year = parseInt(data.yearOfBirth, 10);
  if (isNaN(year) || year < YEAR_MIN || year > YEAR_MAX) {
    errors.yearOfBirth = t("validation_birth_year_range", { min: YEAR_MIN, max: YEAR_MAX });
  }

  return errors;
}

// ── Health Scan Step ──
export function validateHealthScanStep(data) {
  const errors = {};

  if (!HEALTH_STATUS.includes(data.healthStatus)) {
    errors.healthStatus = t("validation_health_status");
  }

  if (data.healthStatus === "chronic" && (!data.chronicSubConditions || data.chronicSubConditions.length === 0)) {
    errors.chronicSubConditions = t("validation_chronic");
  }

  return errors;
}

// ── Cycle Tracking Step ──
export function validateCycleTrackingStep(data) {
  const errors = {};

  if (data.lastDate) {
    const d = new Date(data.lastDate);
    if (isNaN(d.getTime())) {
      errors.lastPeriodDate = t("validation_date_invalid");
    } else if (d > new Date()) {
      errors.lastPeriodDate = t("validation_date_future");
    }
  }

  const cycleLen = parseInt(data.cycleLength, 10);
  if (isNaN(cycleLen) || cycleLen < CYCLE_LENGTH_MIN || cycleLen > CYCLE_LENGTH_MAX) {
    errors.cycleLength = t("validation_cycle_length", { min: CYCLE_LENGTH_MIN, max: CYCLE_LENGTH_MAX });
  }

  return errors;
}

// ── Habits Step ──
export function validateHabitsStep(data) {
  const errors = {};

  if (!EXERCISE.includes(data.exercise)) {
    errors.exercise = t("validation_exercise");
  }

  return errors;
}

// ── Pharmacist Note ──
export function validatePharmacistNote(note) {
  const errors = {};
  if (note && note.length > NOTE_MAX_LENGTH) {
    errors.note = t("validation_note_length", { max: NOTE_MAX_LENGTH });
  }
  return errors;
}
