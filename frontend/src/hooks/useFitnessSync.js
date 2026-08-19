/**
 * useFitnessSync — Auto-sync Google Fit khi app mở
 *
 * Gọi hook này trong App.jsx hoặc màn hình chính.
 * Tự động sync nếu:
 *   - User đã đăng nhập
 *   - Đã kết nối Google Fit
 *   - Chưa sync trong 30 phút qua
 */
import { useEffect, useRef } from "react";
import api from "../services/api";

const SYNC_INTERVAL_MS = 30 * 60 * 1000; // 30 phút

export function useFitnessSync(authUser) {
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!authUser || syncedRef.current) return;

    const autoSync = async () => {
      try {
        // Kiểm tra trạng thái kết nối
        const statusRes = await api.get("/fitness/status");
        const { connected, last_synced_at } = statusRes.data;

        if (!connected) return;

        // Kiểm tra xem có cần sync không
        if (last_synced_at) {
          const lastSync = new Date(last_synced_at);
          const elapsed = Date.now() - lastSync.getTime();
          if (elapsed < SYNC_INTERVAL_MS) {
            console.log("[FitnessSync] Skipped — synced recently");
            return;
          }
        }

        // Sync
        console.log("[FitnessSync] Auto-syncing Google Fit data...");
        await api.post("/fitness/sync");
        console.log("[FitnessSync] Done");
        syncedRef.current = true;
      } catch (e) {
        // Silent fail — không block app nếu sync lỗi
        console.warn("[FitnessSync] Auto-sync failed:", e?.response?.data?.detail || e.message);
      }
    };

    autoSync();
  }, [authUser]);
}
