// Màn 2.1 — Pharmacist Dashboard (DS side)
// Queue + Detail panel: DS xem hồ sơ, chọn cây, soạn Care Plan, duyệt
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { PLANTS_DATA, ICONS, CONDITION_SOURCE_TYPES } from "../../config/constants";
import { validatePharmacistNote } from "../../utils/validation";
import { stageName } from "../../config/stageNames";
import { dataService } from "../../services/dataService";

export default function PharmacistScreen() {
  const { showToast, logout } = useApp();
  const { t } = useTranslation();

  // Queue & Selection
  const [queue, setQueue] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Loading & Submitting
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detail Form state
  const [tab, setTab] = useState(0);
  const [plantChoice, setPlantChoice] = useState("ginger");
  const [note, setNote] = useState(() => t("careplan_pharmacist_note"));

  // Rejection Modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReasonInput, setRejectReasonInput] = useState("");

  // Success Screensavers state
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const TABS = [t("pharmacist_overview"), t("pharmacist_summary"), t("pharmacist_docs")];

  // Fetch the entire queue on mount
  const fetchQueue = async () => {
    setIsLoadingQueue(true);
    try {
      const res = await dataService.getPharmacistQueue();
      setQueue(res || []);
      if (res && res.length > 0) {
        setSelectedId(res[0].id);
      } else {
        setSelectedId(null);
        setSelectedDetails(null);
      }
    } catch (err) {
      console.error("Error fetching queue:", err);
      showToast(t("pharmacist_queue_error"));
    } finally {
      setIsLoadingQueue(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // Fetch customer details when selection changes
  useEffect(() => {
    if (!selectedId) return;
    const fetchDetails = async () => {
      setIsLoadingDetails(true);
      try {
        const queueItem = queue.find(q => q.id === selectedId);
        if (queueItem && queueItem.userId) {
          const res = await dataService.getPharmacistCustomerDetails(queueItem.userId);
          setSelectedDetails(res);

          // Pre-populate based on queue or care plan assignment
          if (queueItem.plantType) {
            setPlantChoice(queueItem.plantType);
          } else if (res?.carePlans?.[0]?.plantType) {
            setPlantChoice(res.carePlans[0].plantType);
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        showToast(t("pharmacist_detail_error"));
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchDetails();
  }, [selectedId]);

  const handleApprove = async () => {
    const validationErrors = validatePharmacistNote(note);
    if (Object.keys(validationErrors).length > 0) {
      showToast(validationErrors.note);
      return;
    }

    setIsSubmitting(true);
    try {
      const queueItem = queue.find(q => q.id === selectedId);
      if (!queueItem) return;
      await dataService.approvePharmacistDraft(queueItem.id, { note, plantType: plantChoice });

      // Determine the next queue ID to select before refreshing the list
      const currentIndex = queue.findIndex(q => q.id === selectedId);
      let nextId = null;
      if (queue.length > 1) {
        if (currentIndex < queue.length - 1) {
          nextId = queue[currentIndex + 1].id;
        } else {
          nextId = queue[0].id;
        }
      }

      setApproved(true);
      showToast(t("pharmacist_approved_success"));

      setTimeout(() => {
        handleReset(nextId);
      }, 1500);
    } catch (err) {
      console.error("Error approving draft:", err);
      showToast(t("pharmacist_approved_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectReasonInput.trim()) {
      showToast(t("pharmacist_reject_reason_required"));
      return;
    }

    setIsSubmitting(true);
    try {
      const queueItem = queue.find(q => q.id === selectedId);
      if (!queueItem) return;
      await dataService.rejectPharmacistDraft(queueItem.id, { reason: rejectReasonInput });

      // Determine the next queue ID to select before refreshing the list
      const currentIndex = queue.findIndex(q => q.id === selectedId);
      let nextId = null;
      if (queue.length > 1) {
        if (currentIndex < queue.length - 1) {
          nextId = queue[currentIndex + 1].id;
        } else {
          nextId = queue[0].id;
        }
      }

      setRejected(true);
      setRejectionReason(rejectReasonInput);
      setShowRejectModal(false);
      showToast(t("pharmacist_rejected"));

      setTimeout(() => {
        handleReset(nextId);
      }, 1500);
    } catch (err) {
      console.error("Error rejecting draft:", err);
      showToast(t("pharmacist_reject_failed"));
    } finally {
      setIsSubmitting(false);
      setRejectReasonInput("");
    }
  };

  const handleReset = async (nextIdToSelect) => {
    setApproved(false);
    setRejected(false);
    setRejectionReason("");
    setIsLoadingQueue(true);
    try {
      const res = await dataService.getPharmacistQueue();
      setQueue(res || []);
      if (res && res.length > 0) {
        const stillExists = res.some(q => q.id === nextIdToSelect);
        setSelectedId(stillExists ? nextIdToSelect : res[0].id);
      } else {
        setSelectedId(null);
        setSelectedDetails(null);
      }
    } catch (err) {
      console.error("Error reloading queue:", err);
    } finally {
      setIsLoadingQueue(false);
    }
  };

  // Resolve calculations
  const queueItem = queue.find(q => q.id === selectedId);
  const activePlan = selectedDetails?.carePlans?.[0];
  const plantStage = activePlan?.stageNames && activePlan?.plantLevel
    ? stageName(t, activePlan.plantLevel - 1, activePlan.stageNames[activePlan.plantLevel - 1]) || t("stage_sprout")
    : t("stage_sprout");
  const activePlantData = PLANTS_DATA[plantChoice] || PLANTS_DATA.ginger;

  const getAge = () => {
    if (selectedDetails?.profile?.yearOfBirth) {
      return new Date().getFullYear() - parseInt(selectedDetails.profile.yearOfBirth, 10);
    }
    return queueItem?.age || 35;
  };

  const getGenderLabel = () => {
    const gender = selectedDetails?.profile?.gender;
    if (gender === "female") return t("gender_female");
    if (gender === "male") return t("gender_male");
    return t("gender_other");
  };

  const getComplianceBadge = (purchase) => {
    const count = purchase.count || 0;
    if (count >= 6) {
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2, color: G.green600, fontWeight: 600 }}>
          {t("pharmacist_regular")} <img src={ICONS.ui_check_circle} alt="" style={{ width: 12, height: 12, objectFit: "contain" }} />
        </span>
      );
    } else {
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2, color: G.gold600, fontWeight: 600 }}>
          {t("pharmacist_irregular")} <img src={ICONS.ui_warning_triangle} alt="" style={{ width: 12, height: 12, objectFit: "contain" }} />
        </span>
      );
    }
  };

  // Warning check: if consentShared is not explicitly true on the profile
  const showConsentWarning = selectedDetails?.profile?.consentShared !== true;

  // Screen layout render
  if (approved) {
    const customerName = selectedDetails?.profile?.name || selectedDetails?.profile?.fullName || queueItem?.name || t("pharmacist_customer");
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif', alignItems: "center", justifyContent: "center", gap: 20, padding: 24, textAlign: "center" }}>
        <div style={{ background: "var(--surface)", padding: 32, borderRadius: 24, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 400, width: "100%", gap: 16 }}>
          <img src={ICONS.mascot_approval} alt="approved" style={{ width: 120, height: 120, objectFit: "contain" }} />
          <div style={{ fontSize: 20, fontWeight: 800, color: G.text }}>{t("approved_for", { name: customerName })}</div>
          <div style={{ fontSize: 14, color: activePlantData.color || "var(--success)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, background: activePlantData.colorPale || "var(--success-pale)", padding: "8px 16px", borderRadius: 20 }}>
            <img src={activePlantData.icon} alt="" style={{ width: 24, height: 24, objectFit: "contain", mixBlendMode: "multiply" }} />
            {activePlantData.name} · {activePlantData.journeyLabel}
          </div>
          <div style={{ fontSize: 13, color: G.textMid, fontWeight: 500 }}>
            {t("pharmacist_stage_label", { stage: plantStage })}
          </div>
          <div style={{ fontSize: 11, color: G.textLight, lineHeight: 1.5 }}>
            {t("pharmacist_log_sent")}
          </div>
          <button onClick={handleReset} style={{ marginTop: 8, width: "100%", height: 44, borderRadius: 14, background: "var(--success)", color: "#FFF", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', boxShadow: "0 4px 14px rgba(0,146,63,0.25)" }}>
            {t("pharmacist_back_to_queue")}
          </button>
        </div>
      </div>
    );
  }

  if (rejected) {
    const customerName = selectedDetails?.profile?.name || selectedDetails?.profile?.fullName || queueItem?.name || t("pharmacist_customer");
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif', alignItems: "center", justifyContent: "center", gap: 20, padding: 24, textAlign: "center" }}>
        <div style={{ background: "var(--surface)", padding: 32, borderRadius: 24, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 400, width: "100%", gap: 16 }}>
          <img src={ICONS.mascot_pharmacist} alt="rejected" style={{ width: 120, height: 120, objectFit: "contain" }} />
          <div style={{ fontSize: 20, fontWeight: 800, color: G.text }}>{t("rejected_for", { name: customerName })}</div>
          <div style={{ fontSize: 13, color: "#EF4444", fontWeight: 600, background: "#FEF2F2", padding: "8px 16px", borderRadius: 20, border: "1.5px solid #FCA5A5", width: "100%", boxSizing: "border-box" }}>
            {t("reject_reason_label", { reason: rejectionReason })}
          </div>
          <div style={{ fontSize: 11, color: G.textLight, lineHeight: 1.5 }}>
            {t("pharmacist_rejected_system_note")}
          </div>
          <button onClick={handleReset} style={{ marginTop: 8, width: "100%", height: 44, borderRadius: 14, background: "#EF4444", color: "#FFF", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', boxShadow: `0 4px 14px rgba(239, 68, 68, 0.25)` }}>
            {t("pharmacist_back_to_queue")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif', position: "relative" }}>
      {/* CSS Animation for high priority pulsing border */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseBorder {
          0% { border-color: rgba(239, 68, 68, 0.25); box-shadow: inset 0 0 3px rgba(239, 68, 68, 0.1); }
          100% { border-color: rgba(239, 68, 68, 0.85); box-shadow: inset 0 0 8px rgba(239, 68, 68, 0.25); }
        }
      `}} />

      {/* Header */}
      <div style={{ padding: "calc(12px + var(--sat, 0px)) 16px 8px", background: G.surface, borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: G.text, display: "flex", alignItems: "center", gap: 6 }}><img src={ICONS.mascot_pharmacist} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} /> Pharmacist Dashboard</div>
          <div style={{ fontSize: 12, color: G.textMid, marginTop: 2 }}>{t("queue_count_label", { n: queue.length })}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={fetchQueue} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, border: "1.5px solid var(--success)", background: "transparent", color: "var(--success)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
            {t("refresh")}
          </button>
          <button onClick={logout} style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #EF4444", background: "transparent", color: "#EF4444", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
            {t("logout")}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Queue panel (left) */}
        <div style={{ width: "33%", minWidth: 110, maxWidth: 150, borderRight: `1px solid ${G.border}`, overflowY: "auto", background: G.surface, flexShrink: 0 }}>
          {isLoadingQueue ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10, padding: 20 }}>
              <img src={ICONS.mascot_loading} alt="loading" style={{ width: 48, height: 48, objectFit: "contain", animation: "pulse 1.5s ease-in-out infinite" }} />
              <div style={{ fontSize: 11, color: G.textMid }}>{t("loading")}</div>
            </div>
          ) : queue.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, padding: "20px 10px", textAlign: "center" }}>
              <img src="https://chauthuc.web.app/assets/mascots_nobg/mascot_approval.webp" alt="empty" style={{ width: 80, height: 80, objectFit: "contain" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: G.green600 }}>{t("pharmacist_all_done")}</div>
              <div style={{ fontSize: 10, color: G.textLight, lineHeight: 1.4 }}>{t("pharmacist_rest")}</div>
            </div>
          ) : (
            queue.map((q) => (
              <div key={q.id} onClick={() => setSelectedId(q.id)} style={{
                padding: "12px 10px", cursor: "pointer",
                background: selectedId === q.id ? G.green100 : "transparent",
                borderBottom: `1px solid ${G.hairline}`,
                borderLeft: selectedId === q.id ? "3px solid var(--success)" : "3px solid transparent",
                border: (q.priority === "high" || q.priority === "critical") ? "1.5px solid rgba(239, 68, 68, 0.3)" : undefined,
                animation: (q.priority === "high" || q.priority === "critical") ? "pulseBorder 1.5s ease-in-out infinite alternate" : "none",
                borderRadius: (q.priority === "high" || q.priority === "critical") ? "8px" : undefined,
                margin: (q.priority === "high" || q.priority === "critical") ? "4px 6px" : undefined,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{q.name}</div>
                <div style={{ fontSize: 10, color: G.textMid, marginTop: 2 }}>{q.age}{t("age_unit")} · {q.time}</div>
                <div style={{ fontSize: 10, marginTop: 3, color: q.priority === "high" || q.priority === "critical" ? "#EF4444" : q.priority === "medium" ? G.gold600 : G.textLight, fontWeight: 600 }}>
                  {(q.priority === "high" || q.priority === "critical") ? <span style={{ display: "flex", alignItems: "center", gap: 2 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} /> {t("priority_high")}</span> : q.priority === "medium" ? <span style={{ display: "flex", alignItems: "center", gap: 2 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: G.gold600, display: "inline-block" }} /> {t("priority_medium")}</span> : <span style={{ display: "flex", alignItems: "center", gap: 2 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} /> {t("priority_low")}</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel (right) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Safety Alert Banner */}
          {selectedId && showConsentWarning && !isLoadingDetails && (
            <div style={{ background: "#FEF2F2", borderBottom: "1.5px solid #FCA5A5", padding: "10px 16px", color: "#991B1B", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <img src={ICONS.ui_lock_closed} alt="lock" style={{ width: 16, height: 16, objectFit: "contain" }} />
              <span>{t("pharmacist_no_consent")}</span>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${G.border}`, background: G.surface, flexShrink: 0 }}>
            {TABS.map((tabLabel, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                flex: 1, padding: "10px 8px", border: "none", background: "none",
                cursor: "pointer", fontSize: 11, fontWeight: tab === i ? 700 : 500,
                color: tab === i ? "var(--success)" : G.textMid,
                fontFamily: '"Be Vietnam Pro", sans-serif',
                borderBottom: tab === i ? "2px solid var(--success)" : "2px solid transparent",
              }}>{tabLabel}</button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px" }}>
            {isLoadingDetails ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10 }}>
                <img src={ICONS.mascot_loading} alt="loading" style={{ width: 48, height: 48, objectFit: "contain", animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ fontSize: 11, color: G.textMid }}>{t("pharmacist_loading_customer")}</div>
              </div>
            ) : selectedDetails ? (
              <>
                {tab === 0 && (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                      <img src={ICONS.avatar_mom} alt="" style={{ width: 18, height: 18, objectFit: "contain", borderRadius: "50%" }} />
                      {selectedDetails.profile?.name || selectedDetails.profile?.fullName || queueItem?.name || t("pharmacist_customer")} — {getAge()}{t("age_unit")}, {getGenderLabel()}
                    </div>
                    <div style={{ fontSize: 12, color: G.textMid, marginBottom: 6 }}>
                      {t("phone_short")}: {selectedDetails.profile?.phone || t("not_updated")} · {t("customer_since", { date: selectedDetails.profile?.createdAt ? new Date(selectedDetails.profile.createdAt).toLocaleDateString("vi-VN", { month: "2-digit", year: "numeric" }) : t("pharmacist_recent") })}
                    </div>
                    <div style={{ fontSize: 12, color: G.textMid, marginBottom: 14 }}>
                      {selectedDetails.profile?.familyId ? t("pharmacist_family_joined") : t("pharmacist_family_not_joined")}
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 700, color: G.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                      <img src={ICONS.ui_heart_health} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("pharmacist_health_status")}
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      {selectedDetails.conditions && selectedDetails.conditions.length > 0 ? (
                        selectedDetails.conditions.map((cond, idx) => {
                          const sourceLabel = CONDITION_SOURCE_TYPES[cond.source] || cond.source || t("pharmacist_self_reported");
                          return (
                            <div key={idx} style={{ fontSize: 11, color: G.textMid, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontWeight: 600, color: G.text }}>{cond.label || t("pharmacist_status")}:</span>
                              <span>{sourceLabel}</span>
                              {cond.verifiedBy && (
                                <span style={{ fontSize: "var(--text-xs)", color: "var(--success)", fontStyle: "italic" }}>
                                  ({t("verified_by", { name: cond.verifiedBy })})
                                </span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ fontSize: 11, color: G.textLight }}>{t("pharmacist_no_condition")}</div>
                      )}
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 700, color: G.text, marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <img src={ICONS.ui_store_pharmacy} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("pharmacist_purchase_history")}
                    </div>
                    {selectedDetails.purchases && selectedDetails.purchases.length > 0 ? (
                      selectedDetails.purchases.map((p, idx) => (
                        <div key={idx} style={{ fontSize: 11, color: G.textMid, marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>• {p.name} ({t("times_6m", { n: p.count })})</span>
                          <span>{getComplianceBadge(p)}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: 11, color: G.textLight }}>{t("pharmacist_no_purchase")}</div>
                    )}

                    {activePlan && (
                      <div style={{ background: activePlan.plantColorPale || "#E8F5EE", borderRadius: 12, padding: "10px 12px", marginTop: 16, border: `1.5px solid ${activePlan.plantColor || "#00923F"}`, display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={PLANTS_DATA[activePlan.plantType]?.icon || ICONS.plant_ginger} alt="" style={{ width: 40, height: 40, objectFit: "contain", mixBlendMode: "multiply" }} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{t("pharmacist_journey_label", { label: activePlan.journeyLabel || t("careplan_general") })}</div>
                          <div style={{ fontSize: 11, color: G.textMid, marginTop: 2 }}>{t("pharmacist_current_plant", { plant: activePlan.plantLabel || t("plant_ginger"), stage: plantStage })}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {tab === 1 && (
                  <>
                    <div style={{ background: "#FFF9E8", borderRadius: 12, padding: "12px", marginBottom: 14, border: `1px solid ${G.gold200}`, fontSize: 11, color: "#92400E", lineHeight: 1.5 }}>
                      <img src={ICONS.ui_warning_triangle} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> {t("pharmacist_disclaimer")}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: G.text, marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.mascot_insight} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} /> {t("pharmacist_auto_summary")}</div>
                    <div style={{ fontSize: 12, color: G.textMid, lineHeight: 1.6, background: G.bg, borderRadius: 10, padding: "10px 12px", border: `1px solid ${G.border}`, whiteSpace: "pre-line" }}>
                      {queueItem?.aiSummary || t("pharmacist_no_auto_summary")}
                    </div>
                  </>
                )}

                {tab === 2 && (
                  <div style={{ fontSize: 12, color: G.textMid, lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 700, color: G.text, marginBottom: 8 }}><img src={ICONS.ui_document_clipboard} alt="" style={{ width: 16, height: 16, objectFit: "contain", verticalAlign: "middle" }} /> {t("pharmacist_uploaded_docs")}</div>
                    {selectedDetails.prescriptions && selectedDetails.prescriptions.length > 0 ? (
                      selectedDetails.prescriptions.map((doc, idx) => (
                        <div key={idx} style={{ background: "var(--success-pale)", borderRadius: 10, padding: "10px", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                          <img src={ICONS.ui_check_circle} alt="" style={{ width: 14, height: 14, objectFit: "contain" }} />
                          <div>
                            <div style={{ fontWeight: 600, color: G.text }}>{doc.fileName || doc.name || t("pharmacist_doc_n", { i: idx + 1 })}</div>
                            <div style={{ fontSize: 10, color: G.textMid }}>{t("upload_date_ocr", { date: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString("vi-VN") : t("pharmacist_recent"), status: doc.ocrStatus || t("pharmacist_done") })}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <div style={{ background: "var(--success-pale)", borderRadius: 10, padding: "10px", marginBottom: 8 }}><img src={ICONS.ui_check_circle} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> {t("pharmacist_demo_prescription")}</div>
                        <div style={{ background: "var(--success-pale)", borderRadius: 10, padding: "10px" }}><img src={ICONS.ui_check_circle} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> {t("pharmacist_demo_test")}</div>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: G.textMid, fontSize: 12 }}>
                {t("pharmacist_select_from_queue")}
              </div>
            )}
          </div>

          {/* Approval form at bottom */}
          {selectedId && !isLoadingDetails && selectedDetails && (
            <div style={{ borderTop: `1px solid ${G.border}`, padding: "14px", background: G.surface, flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: G.text, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_note_pencil} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("pharmacist_decision")}</div>

              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: G.textMid, marginBottom: 3 }}>{t("pharmacist_choose_journey")}</div>
                <select value={plantChoice} onChange={(e) => setPlantChoice(e.target.value)} style={{ width: "100%", height: 36, borderRadius: 10, border: `1.5px solid ${G.border}`, padding: "0 10px", fontSize: 12, fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                  {Object.values(PLANTS_DATA).map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {p.journeyLabel}</option>
                  ))}
                </select>
                {/* Selected Plant Preview Card */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, background: activePlantData.colorPale || "#F3F4F6", padding: "8px 12px", borderRadius: 10, border: `1px solid ${activePlantData.color || "#D1D5DB"}` }}>
                  <img src={activePlantData.icon} alt="" style={{ width: 32, height: 32, objectFit: "contain", mixBlendMode: "multiply" }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{activePlantData.name} ({activePlantData.emoji})</div>
                    <div style={{ fontSize: 10, color: G.textMid }}>{activePlantData.story}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: G.textMid, marginBottom: 3 }}>{t("pharmacist_care_note")}</div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: "100%", height: 48, borderRadius: 10, border: `1.5px solid ${G.border}`, padding: "8px 10px", fontSize: 12, fontFamily: '"Be Vietnam Pro", sans-serif', resize: "none" }} />
                <div style={{ fontSize: 10, color: note.length > 2000 ? "#EF4444" : G.textLight, textAlign: "right", marginTop: 2 }}>
                  {note.length}/2000
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleApprove} disabled={isSubmitting} style={{ flex: 2, height: 40, borderRadius: 14, background: "var(--success)", color: "#FFF", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src={ICONS.ui_check_circle} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
                  {isSubmitting ? t("pharmacist_processing") : t("pharmacist_approve")}
                </button>
                <button onClick={() => setShowRejectModal(true)} disabled={isSubmitting} style={{ flex: 1, height: 40, borderRadius: 14, background: "transparent", color: "#EF4444", border: `1.5px solid #EF4444`, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src={ICONS.ui_error_cross} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
                  {t("pharmacist_reject")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rejection Modal Dialog Overlay */}
      {showRejectModal && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: G.surface, borderRadius: 20, padding: 20, maxWidth: 320, width: "100%", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <img src={ICONS.ui_warning_triangle} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
              {t("pharmacist_reject_title")}
            </div>
            <div style={{ fontSize: 11, color: G.textMid, marginBottom: 8 }}>
              {t("pharmacist_reject_reason_prompt")}
            </div>
            <textarea
              value={rejectReasonInput}
              onChange={(e) => setRejectReasonInput(e.target.value)}
              placeholder={t("pharmacist_reject_example")}
              style={{ width: "100%", height: 80, borderRadius: 10, border: `1.5px solid ${G.border}`, padding: 8, fontSize: 12, fontFamily: '"Be Vietnam Pro", sans-serif', resize: "none", boxSizing: "border-box", marginBottom: 16 }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleRejectConfirm} disabled={isSubmitting} style={{ flex: 1, height: 36, borderRadius: 10, background: "#EF4444", color: "#FFF", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                {isSubmitting ? t("saving") : t("pharmacist_reject_confirm")}
              </button>
              <button onClick={() => { setShowRejectModal(false); setRejectReasonInput(""); }} disabled={isSubmitting} style={{ flex: 1, height: 36, borderRadius: 10, background: "transparent", color: G.textMid, border: `1.5px solid ${G.border}`, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
