// Màn Theo Dõi Sức Khỏe — Task 5.4 — Dashboard 2×2 + Sync Banner + Wellness Insight
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { ICONS } from "../../config/constants";
import GoogleFitConnect from "../../components/GoogleFitConnect";
import HealthMetrics from "../../components/HealthMetrics";

const F = '"Be Vietnam Pro", sans-serif';

// Herb tokens from DesignTokens Task 5.3
const herb = { bg: "#EBF7F1", mid: "#3D9B6A", primary: "#2D7A4F", border: "#5BB88A" };

function MetricCard({ icon, label, value, unit, color, alert, alertLabel }) {
  return (
    <div style={{
      background: alert ? "rgba(239,68,68,0.05)" : "#FFFFFF",
      borderRadius: 18,
      padding: "16px 14px",
      border: `1.5px solid ${alert ? "rgba(239,68,68,0.3)" : G.hairline}`,
      boxShadow: alert ? "0 4px 12px rgba(239,68,68,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex", flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {alert && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          fontSize: 10, fontWeight: 700, color: "#DC2626",
          background: "#FEE2E2", padding: "2px 8px", borderRadius: 999,
        }}>
          {alertLabel}
        </div>
      )}
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: G.textMid, marginBottom: 4, fontFamily: F }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 28, fontWeight: 900, color: alert ? "#DC2626" : color, fontFamily: F, lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontSize: 12, color: G.textLight, fontWeight: 600, fontFamily: F }}>{unit}</span>
      </div>
    </div>
  );
}

export default function HealthTrackingScreen() {
  const { goBack, state } = useApp();
  const { t } = useTranslation();
  const metrics = state.healthMetrics || {};

  // Demo data fallback for presentation
  const steps = metrics.steps ?? 8523;
  const heartRate = metrics.heartRate ?? 72;
  const sleep = metrics.sleepHours ?? 7.2;
  const weight = metrics.weight ?? 62;

  // Rule #0 compliance: flag but never diagnose
  const heartRateAlert = heartRate > 120 || heartRate < 50;
  const heartRateWarning = heartRateAlert ? t("heart_rate_abnormal") : null;

  const [syncExpanded, setSyncExpanded] = useState(false);

  // Wellness insight based on steps
  const stepsInsight = steps >= 8000
    ? t("steps_charged_plant", { steps: steps.toLocaleString() })
    : t("steps_to_goal", { x: (8000 - steps).toLocaleString() });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: F }}>
      {/* Header */}
      <div style={{
        padding: "calc(12px + var(--sat, 0px)) 20px 12px",
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: `1px solid ${G.hairline}`, background: G.surface,
        flexShrink: 0,
      }}>
        <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 22, height: 22, objectFit: "contain" }} />
        </button>
        <div style={{ flex: 1, fontWeight: 800, color: G.text, fontSize: 18 }}>{t("health_tracking_title")}</div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: herb.primary,
          background: herb.bg, padding: "4px 10px", borderRadius: 999,
          border: `1px solid ${herb.border}`,
        }}>
          {t("syncing")}
        </div>
      </div>

      {/* Scroll content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 110px" }}>

        {/* === Sync Banner — Task 5.4 === */}
        <div
          onClick={() => setSyncExpanded(p => !p)}
          style={{
            background: `linear-gradient(135deg, ${herb.primary} 0%, #1A4A2E 100%)`,
            borderRadius: 18, padding: "14px 16px", marginBottom: 16,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(45,122,79,0.3)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", marginBottom: syncExpanded ? 12 : 0, display: "flex", alignItems: "center", gap: 8 }}>
            {t("sync_device")}
            <span style={{ marginLeft: "auto", fontSize: 14, opacity: 0.7 }}>{syncExpanded ? "▲" : "▼"}</span>
          </div>
          {syncExpanded && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {[
                { icon: "⌚", label: t("wearable") },
                { icon: "🍎", label: "Apple Health / Google Fit" },
                { icon: "🏃", label: "LC Care App" },
                { icon: "🌿", label: t("herb_garden_good") },
              ].map((step, i, arr) => (
                <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18 }}>{step.icon}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.75)", fontFamily: F, marginTop: 2, maxWidth: 60 }}>{step.label}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>→</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === Wellness Insight Card === */}
        <div style={{
          background: `linear-gradient(135deg, ${herb.bg} 0%, #D1FAE5 100%)`,
          borderRadius: 16, padding: "14px 16px", marginBottom: 16,
          border: `1px solid ${herb.border}`,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ fontSize: 28 }}>🌿</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: herb.primary, marginBottom: 2, fontFamily: F }}>{t("todays_comment")}</div>
            <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5, fontFamily: F }}>{stepsInsight}</div>
          </div>
        </div>

        {/* === Heart Rate Alert (Rule #0: no diagnosis) === */}
        {heartRateWarning && (
          <div style={{
            background: "#FEF2F2", borderRadius: 14, padding: "12px 14px", marginBottom: 16,
            border: "1.5px solid rgba(239,68,68,0.3)",
          }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 4, fontFamily: F }}>
              {t("heart_rate_warning")}
            </div>
            <div style={{ fontSize: 12, color: "#B91C1C", lineHeight: 1.5, fontFamily: F }}>
              {heartRateWarning}
            </div>
          </div>
        )}

        {/* === 2×2 Metrics Grid === */}
        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10, fontFamily: F }}>
          {t("todays_metrics")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <MetricCard icon="🚶" label={t("step_count")} value={steps.toLocaleString()} unit={t("steps_unit")} color={herb.mid} />
          <MetricCard icon="❤️" label={t("heart_rate")} value={heartRate} unit="bpm" color="#EF4444" alert={heartRateAlert} alertLabel={t("attention_needed")} />
          <MetricCard icon="😴" label={t("sleep_hours")} value={sleep} unit={t("hours_unit")} color="#6366F1" />
          <MetricCard icon="⚖️" label={t("body_weight")} value={weight} unit="kg" color="#F59E0B" />
        </div>

        {/* === Google Fit Connection === */}
        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 6, fontFamily: F }}>
          {t("health_connect_title")}
        </div>
        <GoogleFitConnect />

        {/* === Health Metrics (existing component) === */}
        <HealthMetrics />
      </div>
    </div>
  );
}
