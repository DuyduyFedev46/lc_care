// Màn 1.5 — Seed Planted: Phân tích hồ sơ (loading) → vào thẳng Khu Vườn
// Bảng tóm tắt (Cây nhận / AI khuyên / Hồ sơ) hiển thị trên Home (HealthSummaryBoard)
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { OnboardingProgress } from "../../components/SharedUI";
import { CheckCircle2, Loader2, Bot } from "lucide-react";

const STYLE_TAG = `
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default function SeedPlantedStep() {
  const { t } = useTranslation();
  const { navigate, update, state, submitOnboarding } = useApp();
  const [progress, setProgress] = useState(0);
  const submittedRef = useRef(false);

  // Submit to backend + progress animation (ref-guarded, call once only)
  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const profile = state.userProfile || {};
    const plant = state.assignedPlant;
    const familyMembers = state.familyMembers || [];
    const ocrResults = state.ocrResults || {};

    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 80);

    Promise.all([
      submitOnboarding(profile, plant, familyMembers, ocrResults),
      new Promise(r => setTimeout(r, 3000)),
    ]).then(([result]) => {
      // Lỗi submit → AppContext set state.error, App.jsx hiện màn "Mất kết nối"
      if (!result) return;
      // Cờ để Home tự mở rộng bảng tóm tắt lần đầu
      localStorage.setItem("lc_care_summary_intro", "1");
      update({ seedPlanted: true });
      navigate("home");
    });

    return () => clearInterval(interval);
  }, []);

  const hasOcr = Object.keys(state.ocrResults || {}).length > 0;

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div style={styles.root}>
        {/* Layer 1 — Background */}
        <div style={styles.bgLayer}>
          <img
            src="/assets/onboarding/bg_comic_p4.png"
            alt=""
            className="bg-image-responsive"
          />
        </div>

        {/* Floating Transparent Header */}
        <div style={styles.header}>
          <div style={{ width: 32 }} />
          <div style={styles.headerTitle}>Long Châu Care</div>
          <div style={{ width: 32 }} />
        </div>
        <OnboardingProgress step={5} total={5} />

        {/* Layer 2 — UI controls */}
        <div style={styles.ctaLayer}>
          <div style={{ flex: 1 }} />

          <div style={styles.ctaCard}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#3D3225", textAlign: "center", marginBottom: 2 }}>
              {t("analyzing_profile")}
            </div>
            <div style={{ fontSize: 11, color: "#645A4D", textAlign: "center", marginBottom: 8, lineHeight: 1.4 }}>
              {t("system_aggregating")}
            </div>

            {/* Progress Bar */}
            <div style={{
              width: "100%", height: 6, background: "rgba(139, 90, 43, 0.15)",
              borderRadius: 99, marginBottom: 6, overflow: "hidden",
            }}>
              <div style={{
                height: "100%", background: "#8B5A2B", borderRadius: 99,
                width: `${progress}%`, transition: "width 0.12s linear",
              }} />
            </div>
            <div style={{ fontSize: 11, color: "#8B5A2B", fontWeight: 800, marginBottom: 10, textAlign: "center" }}>
              {t("processing_data", { progress })}
            </div>

            {/* Status Checklist */}
            <div style={{
              width: "100%", background: "#FAF5ED",
              border: "1.5px solid rgba(139, 90, 43, 0.18)",
              borderRadius: 16, padding: "10px 14px", marginBottom: 8,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: progress >= 20 ? "#16A34A" : "#645A4D", fontWeight: 700 }}>
                {progress >= 20 ? (
                  <CheckCircle2 size={13} style={{ color: "#16A34A", flexShrink: 0 }} />
                ) : (
                  <Loader2 size={13} style={{ color: "#8B5A2B", animation: "spin 1.2s linear infinite", flexShrink: 0 }} />
                )}
                <span>{t("reading_survey")}</span>
              </div>
              {hasOcr && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: progress >= 50 ? "#16A34A" : "#645A4D", fontWeight: 700 }}>
                  {progress >= 50 ? (
                    <CheckCircle2 size={13} style={{ color: "#16A34A", flexShrink: 0 }} />
                  ) : (
                    <Loader2 size={13} style={{ color: "#8B5A2B", animation: "spin 1.2s linear infinite", flexShrink: 0 }} />
                  )}
                  <span>{t("analyzing_docs")}</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: state.plantSummary ? "#16A34A" : "#645A4D", fontWeight: 700 }}>
                {state.plantSummary ? (
                  <CheckCircle2 size={13} style={{ color: "#16A34A", flexShrink: 0 }} />
                ) : (
                  <Loader2 size={13} style={{ color: "#8B5A2B", animation: "spin 1.2s linear infinite", flexShrink: 0 }} />
                )}
                <span>{t("creating_summary")}</span>
              </div>
            </div>

            {/* AI Summary Preview */}
            {state.plantSummary && (
              <div style={{
                width: "100%", maxHeight: 120, overflowY: "auto",
                background: "#FAF5ED",
                border: "1.5px solid rgba(139, 90, 43, 0.18)",
                borderRadius: 14, padding: 10, textAlign: "left",
                boxShadow: "0 4px 12px rgba(45, 37, 30, 0.04)",
              }}>
                <div style={{
                  fontWeight: 800, color: "#8B5A2B", marginBottom: 4,
                  display: "flex", alignItems: "center", gap: 6, fontSize: 11,
                  borderBottom: "1px solid rgba(139, 90, 43, 0.15)", paddingBottom: 4
                }}>
                  <Bot size={13} style={{ color: "#8B5A2B" }} />
                  <span>{t("lc_care_analyzing")}</span>
                </div>
                <div style={{
                  fontSize: 11, color: "#3D3225", lineHeight: 1.5,
                  whiteSpace: "pre-line", maxHeight: 80, overflowY: "auto"
                }}>
                  {state.plantSummary}
                </div>
              </div>
            )}
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
    margin: "0 auto",
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
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(224, 242, 254, 0.88) 100%)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1.5px solid rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
    width: "100%",
    maxWidth: 365,
    maxHeight: "65dvh",
    alignSelf: "center",
    marginBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
    boxSizing: "border-box",
  },
};
