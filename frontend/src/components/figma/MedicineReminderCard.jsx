import React, { useState, useEffect, useRef } from "react";

const FIGMA_TOKEN = import.meta.env.VITE_FIGMA_TOKEN || "";
const FIGMA_FILE_KEY = "yhlvb2kMu1iLUOp8YaYIgm";

/**
 * Convert Figma RGBA (0-1 range) to CSS hex string.
 */
function figmaColorToHex({ r, g, b }) {
  const to255 = (v) => Math.round(v * 255);
  return `#${to255(r).toString(16).padStart(2, "0")}${to255(g).toString(16).padStart(2, "0")}${to255(b).toString(16).padStart(2, "0")}`;
}

/**
 * MedicineReminderCard — Figma-synced component.
 * Reads the first frame's design tokens (colors, dimensions) from the Figma API
 * and uses them to style a premium medication reminder card.
 */
export default function MedicineReminderCard({ onBack }) {
  const [syncing, setSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);
  const [lastSync, setLastSync] = useState(null);
  const [tokens, setTokens] = useState({
    accentColor: "#0ea5e9",
    bgColor: "#ffffff",
    cardRadius: 16,
    pillWidth: 299,
    pillHeight: 36,
    frameWidth: 1440,
    frameHeight: 1024,
  });
  const [taken, setTaken] = useState(false);
  const progressRef = useRef(null);

  // Pulse animation for the CTA button
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1500);
    return () => clearInterval(id);
  }, []);

  /**
   * Sync design tokens from Figma REST API.
   */
  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(
        `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
        { headers: { "X-Figma-Token": FIGMA_TOKEN } }
      );
      const data = await res.json();
      const page = data?.document?.children?.[0];
      const frame = page?.children?.[0];
      if (!frame) return;

      const rect = frame.children?.[0];
      const bgFill = frame.fills?.[0]?.color;
      const rectFill = rect?.fills?.[0]?.color;

      setTokens({
        accentColor: rectFill ? figmaColorToHex(rectFill) : tokens.accentColor,
        bgColor: bgFill ? figmaColorToHex(bgFill) : tokens.bgColor,
        cardRadius: 16,
        pillWidth: rect?.absoluteBoundingBox?.width ?? tokens.pillWidth,
        pillHeight: rect?.absoluteBoundingBox?.height ?? tokens.pillHeight,
        frameWidth: frame.absoluteBoundingBox?.width ?? tokens.frameWidth,
        frameHeight: frame.absoluteBoundingBox?.height ?? tokens.frameHeight,
      });
      setSyncCount((c) => c + 1);
      setLastSync(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Figma sync error:", e);
    } finally {
      setSyncing(false);
    }
  };

  // Auto-sync on mount
  useEffect(() => {
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Streak animation
  useEffect(() => {
    if (taken && progressRef.current) {
      progressRef.current.style.transition = "width 0.8s cubic-bezier(.4,0,.2,1)";
      progressRef.current.style.width = "86%";
    }
  }, [taken]);

  const medicines = [
    { name: "Amlodipine 5mg", time: "08:00 sáng", icon: "💊", color: "#3b82f6" },
    { name: "Metformin 500mg", time: "12:00 trưa", icon: "💉", color: "#10b981" },
    { name: "Vitamin D3", time: "20:00 tối", icon: "☀️", color: "#f59e0b" },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        background: "linear-gradient(160deg, #0c1222 0%, #1a1145 50%, #0f172a 100%)",
        color: "#f8fafc",
        fontFamily: '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "20px 16px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: 12,
              width: 40,
              height: 40,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>
            💊 Nhắc Uống Thuốc
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
            Component synced từ Figma API
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          style={{
            background: syncing
              ? "rgba(100,116,139,0.3)"
              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 700,
            cursor: syncing ? "wait" : "pointer",
            boxShadow: syncing
              ? "none"
              : "0 4px 16px rgba(99,102,241,0.4)",
            transition: "all 0.3s",
          }}
        >
          {syncing ? "🔄 Đang sync..." : `⚡ Sync (${syncCount})`}
        </button>
      </div>

      {/* Figma Design Token Banner */}
      <div
        style={{
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 16,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: tokens.accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
            boxShadow: `0 0 20px ${tokens.accentColor}44`,
          }}
        >
          🎨
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c4b5fd" }}>
            Figma Design Tokens (Live)
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              marginTop: 4,
              fontFamily: "monospace",
              lineHeight: 1.6,
            }}
          >
            accent: <span style={{ color: tokens.accentColor, fontWeight: 700 }}>{tokens.accentColor}</span>
            {" · "}bg: <span style={{ color: "#e2e8f0" }}>{tokens.bgColor}</span>
            {" · "}pill: {tokens.pillWidth}×{tokens.pillHeight}
            {lastSync && (
              <span style={{ color: "#4ade80" }}> · ✓ {lastSync}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Reminder Card */}
      <div
        style={{
          background: `linear-gradient(145deg, ${tokens.bgColor}11, ${tokens.accentColor}08)`,
          border: `1px solid ${tokens.accentColor}33`,
          borderRadius: tokens.cardRadius + 4,
          padding: 20,
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${tokens.accentColor}22, transparent)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 6,
            color: "#e2e8f0",
          }}
        >
          📋 Hôm nay — {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
        </div>

        {/* Streak bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>
            🔥 Streak: 6 ngày
          </div>
          <div
            style={{
              flex: 1,
              height: 6,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              ref={progressRef}
              style={{
                width: taken ? "86%" : "71%",
                height: "100%",
                background: `linear-gradient(90deg, ${tokens.accentColor}, #4ade80)`,
                borderRadius: 999,
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 700 }}>
            {taken ? "6/7" : "5/7"}
          </div>
        </div>

        {/* Medicine List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {medicines.map((med, i) => (
            <div
              key={med.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "transform 0.2s, background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `${med.color}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {med.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{med.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                  ⏰ {med.time}
                </div>
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background:
                    i === 0 && taken
                      ? "linear-gradient(135deg, #10b981, #34d399)"
                      : i === 0
                      ? `linear-gradient(135deg, ${tokens.accentColor}, ${tokens.accentColor}cc)`
                      : "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  cursor: i === 0 ? "pointer" : "default",
                  boxShadow:
                    i === 0 && !taken
                      ? `0 0 ${pulse ? 16 : 8}px ${tokens.accentColor}55`
                      : "none",
                  transition: "box-shadow 0.5s ease",
                }}
                onClick={() => {
                  if (i === 0) setTaken(true);
                }}
              >
                {i === 0 && taken ? "✅" : i === 0 ? "👆" : "⬜"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma Pill Preview (uses synced dimensions) */}
      <div
        style={{
          background: "rgba(30, 41, 59, 0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", marginBottom: 12 }}>
          🔗 Figma Pill Preview (synced dimensions)
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Scaled pill matching Figma Rectangle 1 */}
          <div
            style={{
              width: Math.min(tokens.pillWidth, 299),
              height: tokens.pillHeight,
              background: tokens.accentColor,
              borderRadius: tokens.pillHeight / 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              boxShadow: `0 4px 16px ${tokens.accentColor}44`,
              letterSpacing: 0.5,
            }}
          >
            Figma Rectangle 1 — {tokens.pillWidth}×{tokens.pillHeight}
          </div>
          <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>
            fill: {tokens.accentColor}
          </div>
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            color: "#475569",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 10,
          }}
        >
          💡 Thay đổi màu Rectangle 1 trên Figma → nhấn Sync → component tự cập nhật
        </div>
      </div>
    </div>
  );
}
