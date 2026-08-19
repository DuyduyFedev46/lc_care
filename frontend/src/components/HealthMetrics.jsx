/**
 * HealthMetrics — Hiển thị dữ liệu sức khoẻ từ Google Fit
 * Raw data only — KHÔNG suy ra bệnh (Rule #0)
 */
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import i18n from "../i18n";
import { G } from "./DesignTokens";
import { useApp } from "../context/AppContext";

const DAY_KEYS = ["day_sun", "day_mon", "day_tue", "day_wed", "day_thu", "day_fri", "day_sat"];

// ── Helpers ──────────────────────────────────────────────────────────────────

function sumValues(bucket) {
  return bucket?.values?.reduce((a, b) => a + b, 0) ?? null;
}

function avgValues(bucket) {
  const v = bucket?.values ?? [];
  if (!v.length) return null;
  return v.reduce((a, b) => a + b, 0) / v.length;
}

/** Lấy 7 ngày gần nhất, fill null nếu không có data */
function buildWeekSeries(data7d, reducer = sumValues) {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const bucket = data7d?.find((b) => b.date === dateStr);
    const value = bucket ? reducer(bucket) : null;
    return {
      date: dateStr,
      label: i18n.t(DAY_KEYS[d.getDay()]),
      value,
    };
  });
}

function fmt(val, decimals = 0) {
  if (val === null || val === undefined) return "—";
  return Number(val).toFixed(decimals);
}

// ── Mini bar chart ────────────────────────────────────────────────────────────

function BarChart({ series, color, unit }) {
  const max = Math.max(...series.map((s) => s.value ?? 0), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
      {series.map((s, i) => {
        const pct = s.value !== null ? (s.value / max) * 100 : 0;
        const isToday = i === 6;
        return (
          <div key={s.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: "100%", height: 36, display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: `${Math.max(pct, s.value !== null ? 8 : 0)}%`,
                borderRadius: "4px 4px 0 0",
                background: s.value !== null
                  ? (isToday ? color : color + "99")
                  : G.hairline,
                transition: "height 0.3s ease",
              }} />
            </div>
            <div style={{ fontSize: 9, color: isToday ? G.text : G.textLight, fontWeight: isToday ? 700 : 400 }}>
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────

function MetricCard({ icon, title, value, unit, subtitle, color, series, reducer }) {
  const week = series ? buildWeekSeries(series, reducer) : null;
  const todayVal = week ? week[6].value : null;
  const displayVal = todayVal !== null ? fmt(todayVal, unit === "kg" ? 1 : 0) : value;

  return (
    <div style={{
      background: G.surface,
      borderRadius: 18,
      padding: "14px 14px 12px",
      border: `1.5px solid ${G.border}`,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: color + "22",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 11, color: G.textMid, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: G.text, lineHeight: 1.1 }}>
            {displayVal !== null && displayVal !== "—" ? displayVal : "—"}
            {displayVal !== "—" && <span style={{ fontSize: 12, fontWeight: 600, color: G.textMid, marginLeft: 3 }}>{unit}</span>}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      {week && <BarChart series={week} color={color} unit={unit} />}

      {/* Subtitle */}
      {subtitle && (
        <div style={{ fontSize: 11, color: G.textLight }}>{subtitle}</div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HealthMetrics() {
  const { t } = useTranslation();
  const { state, navigate } = useApp();
  const [metrics, setMetrics] = useState(null); // null = loading
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const loadMetrics = useCallback(async () => {
    try {
      const res = await api.get("/fitness/data");
      // res.data.metrics = array of { date, source, raw, synced_at }
      // Gộp raw data từ tất cả ngày thành series
      const allMetrics = res.data.metrics ?? [];
      if (!allMetrics.length) {
        setMetrics("empty");
        return;
      }

      // Flatten: mỗi doc có raw.steps_7d, raw.heart_rate_7d, ...
      // Lấy doc mới nhất (đã sort DESC từ backend)
      const latest = allMetrics[0];
      setMetrics({
        steps: latest.raw?.steps_7d ?? [],
        heartRate: latest.raw?.heart_rate_7d ?? [],
        weight: latest.raw?.weight_latest ?? [],
        sleep: latest.raw?.sleep_7d ?? [],
        syncedAt: latest.synced_at,
      });
    } catch (e) {
      setError(t("cannot_load_health"));
    }
  }, [t]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await api.post("/fitness/sync");
      await loadMetrics();
    } catch (e) {
      setError(t("sync_failed"));
    } finally {
      setSyncing(false);
    }
  };

  const formatSyncTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString(undefined, { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
  };

  // ── Render states ──

  if (metrics === null) {
    return (
      <div style={styles.wrap}>
        <div style={styles.sectionTitle}>{t("health_metrics_title")}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ ...styles.skeleton, height: 110 }} />
          ))}
        </div>
      </div>
    );
  }

  if (metrics === "empty" || error) {
    return (
      <div style={styles.wrap}>
        <div style={styles.sectionTitle}>{t("health_metrics_title")}</div>
        <div style={{
          background: G.surface, borderRadius: 16, padding: "20px 16px",
          border: `1.5px solid ${G.border}`, textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏃</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 4 }}>
            {error ?? t("no_data")}
          </div>
          <div style={{ fontSize: 12, color: G.textMid, marginBottom: 14 }}>
            {t("connect_and_sync_prompt")}
          </div>
          <button onClick={handleSync} disabled={syncing} style={styles.syncBtn}>
            {syncing ? t("fitness_syncing_progress") : t("sync_now")}
          </button>
        </div>
      </div>
    );
  }

  // Tính tổng bước chân 7 ngày
  const totalSteps7d = metrics.steps
    .reduce((sum, b) => sum + (sumValues(b) ?? 0), 0);

  // Nhịp tim trung bình 7 ngày
  const hrValues = metrics.heartRate
    .flatMap((b) => b.values ?? [])
    .filter((v) => v > 0);
  const avgHr = hrValues.length ? hrValues.reduce((a, b) => a + b, 0) / hrValues.length : null;

  // Cân nặng mới nhất
  const weightBuckets = metrics.weight.filter((b) => (b.values ?? []).length > 0);
  const latestWeight = weightBuckets.length
    ? weightBuckets[weightBuckets.length - 1].values[0]
    : null;

  // Giấc ngủ trung bình — values[0] = phút (từ Sessions API)
  const sleepDays = metrics.sleep.filter((b) => (b.values?.[0] ?? 0) > 0);
  const avgSleepHours = sleepDays.length
    ? sleepDays.reduce((sum, b) => sum + b.values[0], 0) / sleepDays.length / 60
    : null;

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={styles.sectionTitle}>{t("health_metrics_title")}</div>
        <button onClick={handleSync} disabled={syncing} style={styles.syncBtnSmall}>
          {syncing ? "..." : "↻ Sync"}
        </button>
      </div>

      {/* Sync time */}
      {metrics.syncedAt && (
        <div style={{ fontSize: 11, color: G.textLight, marginBottom: 10 }}>
          {t("last_synced", { t: formatSyncTime(metrics.syncedAt) })}
        </div>
      )}

      {/* 4 metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <MetricCard
          icon="👟"
          title={t("todays_steps")}
          unit={t("steps_unit")}
          color="#10B981"
          series={metrics.steps}
          reducer={sumValues}
          subtitle={t("week_steps", { n: totalSteps7d.toLocaleString() })}
        />
        <MetricCard
          icon="❤️"
          title={t("avg_heart_rate")}
          unit="bpm"
          color="#EF4444"
          series={metrics.heartRate}
          reducer={avgValues}
          subtitle={avgHr ? t("week_bpm", { n: fmt(avgHr) }) : t("device_needed")}
        />
        <MetricCard
          icon="⚖️"
          title={t("body_weight")}
          unit="kg"
          color="#8B5CF6"
          series={metrics.weight}
          reducer={(b) => b?.values?.[0] ?? null}
          subtitle={latestWeight ? `${fmt(latestWeight, 1)} kg` : t("no_data")}
        />
        <MetricCard
          icon="😴"
          title={t("avg_sleep")}
          unit={t("hours_unit")}
          color="#3B82F6"
          series={metrics.sleep}
          reducer={(b) => {
            // values[0] = tổng phút ngủ trong ngày (từ Sessions API)
            const mins = b?.values?.[0] ?? null;
            return mins !== null ? mins / 60 : null;
          }}
          subtitle={avgSleepHours ? t("week_sleep", { n: fmt(avgSleepHours, 1) }) : t("no_data")}
        />
      </div>

      {/* Wellness Insight Card */}
      {metrics.steps && ((() => {
        const stepsWeek = buildWeekSeries(metrics.steps, sumValues);
        const todaySteps = stepsWeek[6]?.value ?? 0;
        return (
          <div style={{
            marginTop: 14,
            background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
            borderRadius: 18,
            padding: "16px",
            border: `1.5px solid #A7F3D0`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            textAlign: "left",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24 }}>🌿</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46" }}>{t("advice_from_garden")}</div>
                <div style={{ fontSize: 12, color: "#047857", marginTop: 4, lineHeight: 1.5 }}>
                  {todaySteps >= 10000
                    ? t("exceeded_goal")
                    : `${t("steps_charged_plant", { steps: todaySteps.toLocaleString() })} ${t("steps_to_goal", { x: Math.max(0, 10000 - todaySteps).toLocaleString() })}`}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("home")}
              style={{
                background: "#059669",
                color: "#FFF",
                border: "none",
                borderRadius: 12,
                height: 38,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: '"Be Vietnam Pro", sans-serif',
                width: "100%",
                marginTop: 4,
              }}
            >
              {t("back_to_garden")}
            </button>
          </div>
        );
      })())}

      {/* Disclaimer — tuân thủ Rule #0 */}
      <div style={styles.disclaimer}>
        {t("health_data_disclaimer")}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: G.text,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  skeleton: {
    borderRadius: 18,
    background: "#F3F4F6",
  },
  syncBtn: {
    background: G.green500,
    color: "#FFF",
    border: "none",
    borderRadius: 12,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
  syncBtnSmall: {
    background: G.green100,
    color: G.green500,
    border: "none",
    borderRadius: 10,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
  disclaimer: {
    fontSize: 11,
    color: G.textLight,
    marginTop: 10,
    textAlign: "center",
    padding: "0 8px",
  },
};
