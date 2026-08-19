/**
 * GoogleFitConnect — Button kết nối / ngắt kết nối Google Fit
 *
 * Usage:
 *   <GoogleFitConnect />
 *
 * Flow:
 *   1. Gọi GET /api/fitness/auth-url → nhận URL
 *   2. Mở popup Google OAuth
 *   3. Backend callback → lưu tokens → redirect về frontend với ?fitness_status=connected
 *   4. Component lắng nghe URL param → cập nhật trạng thái
 */
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { G } from "./DesignTokens";

// Icon Google Fit (SVG inline để không cần thêm dependency)
function GoogleFitIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#EA4335" opacity="0.15" />
      <path d="M12 6.5C9 6.5 6.5 9 6.5 12S9 17.5 12 17.5 17.5 15 17.5 12 15 6.5 12 6.5z" fill="#EA4335" />
      <path d="M12 8.5C10.07 8.5 8.5 10.07 8.5 12S10.07 15.5 12 15.5 15.5 13.93 15.5 12 13.93 8.5 12 8.5z" fill="#fff" />
      <circle cx="12" cy="12" r="2" fill="#EA4335" />
    </svg>
  );
}

export default function GoogleFitConnect({ onStatusChange }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null); // null | { connected, last_synced_at }
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // Lấy trạng thái kết nối khi mount
  const fetchStatus = useCallback(async () => {
    try {
      const res = await api.get("/fitness/status");
      setStatus(res.data);
      onStatusChange?.(res.data);
    } catch (e) {
      // Không báo lỗi nếu chưa kết nối — đây là trạng thái bình thường
      setStatus({ connected: false, last_synced_at: null });
    }
  }, [onStatusChange]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Lắng nghe URL param sau khi Google redirect về
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fitnessStatus = params.get("fitness_status");
    if (fitnessStatus === "connected") {
      // Xóa param khỏi URL
      const url = new URL(window.location.href);
      url.searchParams.delete("fitness_status");
      window.history.replaceState({}, "", url.toString());
      // Refresh status
      fetchStatus();
    } else if (fitnessStatus === "error") {
      const reason = params.get("reason") || "unknown";
      setError(t("fitness_connect_failed", { reason }));
      const url = new URL(window.location.href);
      url.searchParams.delete("fitness_status");
      url.searchParams.delete("reason");
      window.history.replaceState({}, "", url.toString());
    }
  }, [fetchStatus]);

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/fitness/auth-url");
      // Mở trong cùng tab — Google không cho phép popup cho OAuth
      window.location.href = res.data.auth_url;
    } catch (e) {
      setError(t("fitness_cannot_init"));
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    try {
      await api.post("/fitness/sync");
      await fetchStatus();
    } catch (e) {
      setError(t("fitness_sync_failed_retry"));
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!window.confirm(t("disconnect_confirm"))) return;
    setLoading(true);
    try {
      await api.delete("/fitness/disconnect");
      setStatus({ connected: false, last_synced_at: null });
      onStatusChange?.({ connected: false });
    } catch (e) {
      setError(t("fitness_cannot_disconnect"));
    } finally {
      setLoading(false);
    }
  };

  const formatLastSync = (isoStr) => {
    if (!isoStr) return t("not_synced");
    const d = new Date(isoStr);
    const now = new Date();
    const diffMin = Math.floor((now - d) / 60000);
    if (diffMin < 1) return t("just_now");
    if (diffMin < 60) return t("minutes_ago", { m: diffMin });
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return t("hours_ago", { h: diffH });
    return d.toLocaleDateString();
  };

  // Chưa load xong
  if (status === null) {
    return (
      <div style={styles.card}>
        <div style={styles.skeleton} />
      </div>
    );
  }

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.iconWrap}>
          <GoogleFitIcon size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={styles.title}>Google Fit</div>
          <div style={styles.subtitle}>
            {status.connected
              ? t("last_synced", { t: formatLastSync(status.last_synced_at) })
              : t("fitness_connect_desc")}
          </div>
        </div>
        {/* Badge trạng thái */}
        <div style={{
          ...styles.badge,
          background: status.connected ? "#DCFCE7" : "#F3F4F6",
          color: status.connected ? "#16A34A" : "#6B7280",
        }}>
          {status.connected ? t("connected") : t("not_connected")}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>{error}</div>
      )}

      {/* Actions */}
      {!status.connected ? (
        <button
          onClick={handleConnect}
          disabled={loading}
          style={{ ...styles.btn, ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
        >
          <GoogleFitIcon size={16} />
          {loading ? t("redirecting") : t("connect_google_fit")}
        </button>
      ) : (
        <div style={styles.actions}>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{ ...styles.btn, ...styles.btnSecondary, flex: 1, opacity: syncing ? 0.7 : 1 }}
          >
            {syncing ? t("fitness_syncing_progress") : t("sync_now")}
          </button>
          <button
            onClick={handleDisconnect}
            disabled={loading}
            style={{ ...styles.btn, ...styles.btnDanger }}
          >
            {t("disconnect")}
          </button>
        </div>
      )}

      {/* Ghi chú bảo mật */}
      <div style={styles.note}>
        {t("fitness_privacy_note")}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--surface)",
    borderRadius: 20,
    padding: "18px 16px",
    border: `1.5px solid ${G.border}`,
    marginBottom: 14,
    fontFamily: '"Be Vietnam Pro", sans-serif',
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "#FEF2F2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontWeight: 700,
    fontSize: 15,
    color: G.text,
  },
  subtitle: {
    fontSize: 12,
    color: G.textMid,
    marginTop: 2,
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
    flexShrink: 0,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 16px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    transition: "opacity 0.15s",
  },
  btnPrimary: {
    width: "100%",
    background: G.green500,
    color: "#FFF",
  },
  btnSecondary: {
    background: G.green100,
    color: G.green500,
  },
  btnDanger: {
    background: "#FEF2F2",
    color: "#EF4444",
  },
  actions: {
    display: "flex",
    gap: 10,
  },
  errorBox: {
    background: "#FEF2F2",
    color: "#DC2626",
    fontSize: 13,
    padding: "10px 14px",
    borderRadius: 12,
    marginBottom: 12,
  },
  note: {
    fontSize: 11,
    color: G.textLight,
    marginTop: 12,
    textAlign: "center",
  },
  skeleton: {
    height: 60,
    borderRadius: 12,
    background: "var(--surface-raised)",
    animation: "pulse 1.5s infinite",
  },
};
