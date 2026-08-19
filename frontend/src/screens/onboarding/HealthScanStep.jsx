import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G, lcStyles } from "../../components/DesignTokens";
import { OnboardingProgress, SpeechBubble } from "../../components/SharedUI";
import { uploadDocument, getAISummary } from "../../services/uploadService";
import { ICONS } from "../../config/constants";
import { validateHealthScanStep } from "../../utils/validation";
import { Droplet, Heart, Activity, Bone, Flame, Camera } from "lucide-react";

const STYLE_TAG = `
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
.lc-large-pill-input-container {
  width: 100%;
  height: 52px;
  background: #FAF5ED;
  border: 1.5px solid rgba(139, 90, 43, 0.18);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 6px rgba(93, 77, 61, 0.04);
}
.lc-large-pill-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #4E3E31;
}
.lc-large-pill-input::placeholder {
  color: #8A7B6E;
  opacity: 0.85;
}
.lc-large-pill-label {
  font-size: 15px;
  font-weight: 700;
  color: #4E3E31;
}
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-slide {
  animation: fade-slide-in 0.3s ease-out forwards;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const HEALTH_OPTIONS = [
  { id: "healthy", label: "Khỏe mạnh", emoji: "🟢", color: G.green600, isDefault: true },
  { id: "monitoring", label: "Cần theo dõi sức khỏe", emoji: "🟡", color: G.gold600 },
  { id: "chronic", label: "Đang dùng thuốc mãn tính", emoji: "🟠", color: "#EA580C" },
  { id: "mental", label: "Sức khỏe tinh thần", emoji: "💜", color: "#7C3AED" },
  { id: "pregnant", label: "Mang thai / Sau sinh", emoji: "🤰", color: "#DB2777", femaleOnly: true },
  { id: "recovery", label: "Đang hồi phục", emoji: "🏥", color: "#0284C7" },
];

const CHRONIC_SUB_CONDITIONS = [
  { id: "diabetes", labelKey: "condition_diabetes", icon: Droplet, iconColor: "#EF4444" },
  { id: "hypertension", labelKey: "condition_blood_pressure", icon: Heart, iconColor: "#EF4444" },
  { id: "cholesterol", labelKey: "condition_cholesterol", icon: Activity, iconColor: "#EA580C" },
  { id: "bone_joint", labelKey: "condition_joints", icon: Bone, iconColor: "#8B5A2B" },
  { id: "digestive", labelKey: "condition_digestive", icon: Flame, iconColor: "#10B981" },
];

const DOCS = [
  { id: "rx", iconImg: ICONS.ui_document_clipboard, label: "Đơn thuốc" },
  { id: "lab", iconImg: ICONS.voucher_lab, label: "Xét nghiệm" },
  { id: "book", iconImg: ICONS.ui_store_pharmacy, label: "Sổ khám" },
  { id: "echo", iconImg: null, label: "Siêu âm" },
  { id: "vacc", iconImg: ICONS.voucher_vaccine, label: "Tiêm chủng" },
];

const Toggle = ({ active, onChange }) => {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      style={{
        width: 30,
        height: 16,
        borderRadius: 8,
        background: active ? "#8B5A2B" : "#EADDCB",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.2s",
        flexShrink: 0,
        border: "1px solid rgba(139, 90, 43, 0.15)",
      }}
    >
      <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#FFF",
        position: "absolute",
        top: 2,
        left: active ? 16 : 2,
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
};

const CameraIcon = () => <Camera size={24} style={{ color: "#3B82F6" }} />;

export default function HealthScanStep() {
  const { t } = useTranslation();
  const { navigate, showToast, update, state } = useApp();

  const [hasChronic, setHasChronic] = useState(state.userProfile?.healthStatus === "chronic");
  const [chronicSubs, setChronicSubs] = useState(state.userProfile?.chronicSubConditions || []);
  const [errors, setErrors] = useState({});

  const [uploaded, setUploaded] = useState({});
  const [ocrResults, setOcrResults] = useState({});
  const [uploading, setUploading] = useState(null);
  const fileInputRefs = useRef({});
  const [btnHover, setBtnHover] = useState(false);

  const toggleChronicSub = (id) => {
    setChronicSubs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFileSelect = async (doc, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast(t("scan_image_only"));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast(t("scan_file_too_large"));
      return;
    }

    setUploading(doc.id);
    try {
      const result = await uploadDocument(file, doc.id);
      setUploaded((p) => ({ ...p, [doc.id]: { file, preview: URL.createObjectURL(file), ...result } }));
      setOcrResults((p) => ({ ...p, [doc.id]: result }));
      update((prev) => ({ ocrResults: { ...prev.ocrResults, [doc.id]: result } }));

      try {
        const summary = await getAISummary(result, doc.id);
        const enrichedResult = { ...result, aiSummary: summary };
        setOcrResults((p) => ({ ...p, [doc.id]: enrichedResult }));
        // Also update global state so submitOnboarding gets the full data
        update((prev) => ({ ocrResults: { ...prev.ocrResults, [doc.id]: enrichedResult } }));
      } catch { /* silent fallback */ }
    } catch {
      showToast(t("scan_upload_failed"));
    }
    setUploading(null);
    e.target.value = "";
  };

  const openFilePicker = (doc) => {
    fileInputRefs.current[doc.id]?.click();
  };

  const handleNext = () => {
    const healthStatus = hasChronic ? "chronic" : "healthy";
    const validationErrors = validateHealthScanStep({
      healthStatus,
      chronicSubConditions: hasChronic ? chronicSubs : [],
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const profile = {
      ...state.userProfile,
      healthStatus,
      chronicSubConditions: hasChronic ? chronicSubs : [],
      // Chu kỳ không còn nhập ở onboarding — cập nhật sau tại Profile
      cycleData: state.userProfile?.cycleData || { tracking: false },
    };
    update({ userProfile: profile });
    navigate("habits");
  };

  const handleBack = () => {
    update({
      userProfile: {
        ...state.userProfile,
        healthStatus: hasChronic ? "chronic" : "healthy",
        chronicSubConditions: hasChronic ? chronicSubs : [],
      },
    });
    navigate("welcome");
  };

  const bubbleText = t("onboarding_garden_question");

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div style={styles.root}>
        {/* Layer 1 — Background Image */}
        <div style={styles.bgLayer}>
          <img
            src="/assets/onboarding/bg_comic_p2.png"
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
        <OnboardingProgress step={2} total={5} />

        {/* Hidden inputs for document scanning */}
        <input
          ref={(el) => (fileInputRefs.current["rx"] = el)}
          type="file" accept="image/*" capture="environment"
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect({ id: "rx" }, e)}
        />

        {/* Layer 2 — UI controls */}
        <div style={styles.ctaLayer}>
          <div style={{ flex: 1 }} />

          <div style={styles.ctaCard}>
            <div className="animate-fade-slide" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Bệnh mãn tính Toggle */}
                <div className="lc-large-pill-input-container" style={{ justifyContent: "space-between" }}>
                  <span className="lc-large-pill-label">{t("chronic_question")}</span>
                  <Toggle active={hasChronic} onChange={() => {
                    setHasChronic(!hasChronic);
                    if (!hasChronic) setChronicSubs([]);
                  }} />
                </div>

                {/* Chronic Subconditions grid */}
                {hasChronic && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxHeight: 180, overflowY: "auto", paddingRight: 4 }}>
                    {CHRONIC_SUB_CONDITIONS.map(sub => {
                      const active = chronicSubs.includes(sub.id);
                      return (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() => toggleChronicSub(sub.id)}
                          style={{
                            width: "100%",
                            height: 48,
                            borderRadius: 9999,
                            border: active ? "1.5px solid #8B5A2B" : "1.5px solid rgba(139, 90, 43, 0.18)",
                            background: active ? "#8B5A2B" : "#FAF5ED",
                            color: active ? "#FFFFFF" : "#4E3E31",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 20px",
                            gap: 12,
                            cursor: "pointer",
                            fontFamily: '"Be Vietnam Pro", sans-serif',
                            fontWeight: 700,
                            fontSize: 14,
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 6px rgba(93, 77, 61, 0.04)",
                            boxSizing: "border-box",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flexShrink: 0 }}>
                            {sub.icon && <sub.icon size={20} style={{ color: active ? "#FFFFFF" : sub.iconColor }} />}
                          </span>
                          <span style={{ flex: 1, textAlign: "left" }}>{t(sub.labelKey)}</span>
                          {active && (
                            <img
                              src={ICONS.ui_check_circle}
                              alt=""
                              style={{ width: 18, height: 18, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                {errors.chronicSubConditions && (
                  <div style={{ fontSize: 13, color: "#EF4444", fontWeight: 700, textAlign: "center", marginTop: 2 }}>{errors.chronicSubConditions}</div>
                )}

                {/* Prescription upload area */}
                <div
                  onClick={() => openFilePicker({ id: "rx" })}
                  style={{
                    width: "100%",
                    background: "#FAF5ED",
                    border: "1.5px dashed rgba(139, 90, 43, 0.35)",
                    borderRadius: 24,
                    padding: "20px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxSizing: "border-box",
                    minHeight: 130,
                  }}
                >
                  {uploading === "rx" ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2.5px solid #8B5A2B", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#8B5A2B" }}>{t("scan_analyzing_short")}</span>
                    </div>
                  ) : uploaded["rx"] ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                      <img src={uploaded["rx"].preview} alt="Prescription" style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", border: "1.5px solid #8B5A2B" }} />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#4E3E31" }}>{t("scan_uploaded")}</div>
                        <div style={{ fontSize: 11, color: "#16A34A", fontWeight: 700 }}>{t("scan_ocr_done")}</div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploaded(p => {
                            const copy = { ...p };
                            delete copy["rx"];
                            return copy;
                          });
                          setOcrResults(p => {
                            const copy = { ...p };
                            delete copy["rx"];
                            return copy;
                          });
                          update(prev => {
                            const copyOcr = { ...prev.ocrResults };
                            delete copyOcr["rx"];
                            return { ocrResults: copyOcr };
                          });
                        }}
                        style={{
                          background: "none", border: "none", color: "#EF4444", fontSize: 13, fontWeight: 700, cursor: "pointer"
                        }}
                      >
                        {t("delete")}
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ transform: "scale(1.2)", marginBottom: 4 }}>
                        <CameraIcon />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#4E3E31", textAlign: "center" }}>{t("scan_upload_prompt")}</span>
                      <span style={{ fontSize: 11, color: "#8A7B6E", textAlign: "center", lineHeight: 1.4, maxWidth: "80%" }}>
                        {t("scan_reminder")}
                      </span>
                    </div>
                  )}
                </div>

                {/* OCR results preview */}
                {Object.entries(ocrResults).map(([docId, result]) => (
                  <div key={docId} style={{
                    background: "#FAF5ED", borderRadius: 14, padding: "10px 14px",
                    border: "1.5px solid rgba(139, 90, 43, 0.18)", width: "100%", boxSizing: "border-box"
                  }}>
                    {result.medications?.length > 0 && (
                      <div style={{ fontSize: 13, color: "#4E3E31", lineHeight: 1.4, textAlign: "left", fontWeight: 600 }}>
                        <strong>{t("scan_detected_meds")}</strong> {result.medications.map(m => m.name || m).join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            {/* Tiếp tục button */}
            <button
              onClick={handleNext}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              style={{
                ...styles.ctaButton,
                ...(btnHover ? styles.ctaButtonHover : {}),
              }}
            >
              {t("continue_plain")}
            </button>
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
  headerTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#4E3E31",
    background: "rgba(255, 255, 255, 0.6)",
    padding: "4px 14px",
    borderRadius: 12,
    border: "1px solid rgba(139, 90, 43, 0.15)",
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
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 365,
    maxHeight: "62dvh",
    overflowY: "auto",
    alignSelf: "center",
    marginBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
    boxSizing: "border-box",
  },
  ctaButton: {
    alignSelf: "center",
    background: "#FCEEDB",
    border: "1.5px solid rgba(139, 90, 43, 0.15)",
    borderRadius: 9999,
    padding: "12px 48px",
    fontSize: 16,
    fontWeight: 700,
    color: "#4E3E31",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    marginTop: 16,
    boxShadow: "0 4px 12px rgba(93, 77, 61, 0.08)",
    lineHeight: 1,
  },
  ctaButtonHover: {
    background: "#FAF0E2",
    transform: "scale(1.03)",
    boxShadow: "0 6px 16px rgba(93, 77, 61, 0.12)",
  },
};
