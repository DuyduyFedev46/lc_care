// Bảng tóm tắt sức khỏe trên Home — thay cho màn result cuối onboarding (SeedPlantedStep cũ)
// Trigger card nhỏ trên scene vườn + Sheet chi tiết: Cây đồng hành / AI phân tích / Hồ sơ khảo sát
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { PLANTS_DATA } from "../config/constants";
import { isMedicalGroup } from "../config/plantAssignment";
import { buildSurveyItemsI18n } from "../config/profileLabels";
import Sheet from "./ui/Sheet";
import { Sparkles, Bot, ClipboardList, Sprout, Clock, CheckCircle2, FileText } from "lucide-react";

const INTRO_FLAG = "lc_care_summary_intro";

export default function HealthSummaryBoard({ triggerStyle, externalOpen, onExternalClose }) {
  const { t } = useTranslation();
  const { state } = useApp();
  // Lần đầu vào Home sau onboarding → tự mở sheet
  const [open, setOpen] = useState(() => localStorage.getItem(INTRO_FLAG) === "1");

  useEffect(() => {
    if (open) localStorage.removeItem(INTRO_FLAG);
  }, [open]);

  const plant = state.assignedPlant;
  const plantData = plant ? PLANTS_DATA[plant.plant] : null;
  const approval = state.plantApproval;
  const isApproved = approval === "auto_approved" || approval === "approved";
  const needsPharmacist = plant ? isMedicalGroup(plant.group) : false;
  const plantSummary = typeof state.plantSummary === "string" ? state.plantSummary : null;
  const surveyItems = buildSurveyItemsI18n(state.userProfile || {}, t);

  // Extract OCR AI summaries from ocrResults
  const ocrEntries = Object.entries(state.ocrResults || {}).filter(
    ([, res]) => res?.aiSummary || res?.medications?.length > 0
  );

  const DOC_LABEL_KEYS = {
    rx: "doc_rx",
    lab: "doc_lab",
    book: "doc_book",
    echo: "doc_echo",
    vacc: "doc_vacc",
  };

  // Không có gì để tóm tắt → không render
  if (!plant && !plantSummary && surveyItems.length === 0) return null;

  const sectionTitle = (Icon, text) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 12, fontWeight: 800, color: "var(--garden-brown)",
      marginBottom: 8,
    }}>
      <Icon size={14} style={{ color: "var(--garden-brown)" }} />
      <span>{text}</span>
    </div>
  );

  const card = {
    background: "#FAF5ED",
    borderRadius: 16,
    padding: "12px 14px",
    border: "1.5px solid rgba(139, 90, 43, 0.18)",
  };

  const isOpen = open || externalOpen;
  const handleClose = () => {
    setOpen(false);
    if (onExternalClose) onExternalClose();
  };

  // Plant display names from i18n keys
  const plantName = plant ? t(`plant_${plant.plant}`, { defaultValue: plantData?.name || plant.label }) : "";
  const plantStory = plant ? t(`story_${plant.plant}`, { defaultValue: plantData?.story || "" }) : "";
  const plantWhy = plant ? t(`why_${plant.plant}`, { defaultValue: plantData?.whyThisPlant || "" }) : "";

  return (
    <>
      {createPortal(
        <Sheet open={isOpen} onClose={handleClose} title={t("health_summary_title")} variant="garden" maxHeight="78%">
          <div style={{ padding: "14px 20px 28px", display: "flex", flexDirection: "column", gap: 14, fontFamily: '"Be Vietnam Pro", sans-serif' }}>

            {/* ── Cây đồng hành ── */}
            {plant && (
              <div>
                {sectionTitle(Sprout, t("companion_plant"))}
                <div style={{
                  ...card,
                  background: isApproved ? "rgba(220, 252, 231, 0.7)" : "#FAF5ED",
                  border: `1.5px solid ${isApproved ? "#16A34A" : "rgba(139, 90, 43, 0.18)"}`,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 34, marginBottom: 4 }}>
                    {isApproved ? (plantData?.emoji || "🌱") : "🌰"}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#4E3E31", marginBottom: 2 }}>
                    {isApproved ? plantName : t("seed_waiting")}
                  </div>
                  <div style={{ fontSize: 12, color: "#8A7B6E", lineHeight: 1.5 }}>
                    {isApproved
                      ? (plantStory || t("companion_plant_desc"))
                      : t("pharmacist_choosing_plant")}
                  </div>
                  {isApproved && plantWhy && (
                    <div style={{ fontSize: 11, color: "#6B5E50", lineHeight: 1.5, marginTop: 6, fontWeight: 500, textAlign: "left", background: "rgba(139, 90, 43, 0.06)", borderRadius: 8, padding: "6px 10px" }}>
                      💡 {plantWhy}
                    </div>
                  )}
                  {!isApproved && (
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      background: "#FEF9C3", borderRadius: 8, padding: "4px 8px",
                      fontSize: 11, fontWeight: 800, color: "#854D0E", marginTop: 8,
                    }}>
                      <Clock size={12} style={{ color: "#854D0E" }} />
                      {t("pharmacist_approve_2h")}
                    </div>
                  )}
                </div>

                {needsPharmacist && !isApproved && (
                  <div style={{ ...card, marginTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#8B5A2B", marginBottom: 6 }}>
                      {t("care_team_forwarded")}
                    </div>
                    {[
                      t("analysis_health_metrics"),
                      t("select_best_plant"),
                      t("create_careplan_dedicated"),
                      t("pharmacist_response_2h"),
                    ].map((text, i) => (
                      <div key={i} style={{
                        fontSize: 12, color: "#4E3E31", marginBottom: 4,
                        display: "flex", gap: 6, alignItems: "center", fontWeight: 600,
                      }}>
                        <CheckCircle2 size={12} style={{ color: "#16A34A", flexShrink: 0 }} />
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── AI phân tích ── */}
            {plantSummary && (
              <div>
                {sectionTitle(Bot, t("lc_care_analysis"))}
                <div style={{
                  ...card,
                  background: "rgba(220, 252, 231, 0.6)",
                  border: "1.5px solid #86EFAC",
                }}>
                  <div style={{
                    fontSize: 12, color: "#164E63", lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}>
                    {plantSummary}
                  </div>
                </div>
              </div>
            )}

            {/* ── Kết quả phân tích tài liệu y tế ── */}
            {ocrEntries.length > 0 && (
              <div>
                {sectionTitle(FileText, t("doc_analysis_result"))}
                {ocrEntries.map(([docId, res]) => (
                  <div key={docId} style={{
                    ...card,
                    marginBottom: 6,
                    background: "rgba(219, 234, 254, 0.6)",
                    border: "1.5px solid #93C5FD",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#1E40AF", marginBottom: 4 }}>
                      📄 {t(DOC_LABEL_KEYS[docId] || "doc_rx", { defaultValue: docId })}
                    </div>
                    {res.medications?.length > 0 && (
                      <div style={{ fontSize: 11, color: "#4E3E31", fontWeight: 600, marginBottom: 4 }}>
                        {t("detected_meds")} {res.medications.map(m => m.name || m).join(", ")}
                      </div>
                    )}
                    {res.aiSummary && (
                      <div style={{
                        fontSize: 11, color: "#164E63", lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}>
                        {res.aiSummary}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Hồ sơ khảo sát ── */}
            {surveyItems.length > 0 && (
              <div>
                {sectionTitle(ClipboardList, t("survey_records"))}
                <div style={{ ...card, display: "flex", flexDirection: "column", gap: 7 }}>
                  {surveyItems.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontSize: 11, color: "#8A7B6E", fontWeight: 700, flexShrink: 0 }}>
                        {item.label}
                      </span>
                      <span style={{
                        fontSize: 11, color: "#4E3E31", fontWeight: 700,
                        textAlign: "right", wordBreak: "break-word",
                      }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Sheet>,
        document.getElementById("root")
      )}
    </>
  );
}
