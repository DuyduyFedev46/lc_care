import React, { useState, useEffect } from "react";

export default function FigmaTestScreen({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [figmaData, setFigmaData] = useState({
    fileName: "Untitled",
    fileKey: "yhlvb2kMu1iLUOp8YaYIgm",
    user: "Duy Đặng (dtduy46@gmail.com)",
    lastSynced: new Date().toLocaleTimeString(),
    frame: {
      name: "Desktop - 1",
      id: "1:2",
      width: 1440,
      height: 1024,
      background: "#FFFFFF",
      imageUrl: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f9b37287-7ae9-4b57-9401-8169ef78f5c8",
      children: [
        {
          id: "1:3",
          name: "Rectangle 1",
          type: "RECTANGLE",
          width: 299,
          height: 36,
          fill: "#C4C4C4",
          x: -574,
          y: -410
        }
      ]
    }
  });

  const handleSyncFigma = async () => {
    setLoading(true);
    try {
      const token = import.meta.env.VITE_FIGMA_TOKEN || "";
      const res = await fetch(`https://api.figma.com/v1/files/${figmaData.fileKey}`, {
        headers: { "X-Figma-Token": token }
      });
      const data = await res.json();
      if (data && data.name) {
        setFigmaData(prev => ({
          ...prev,
          fileName: data.name,
          lastSynced: new Date().toLocaleTimeString()
        }));
      }
    } catch (e) {
      console.error("Failed to sync Figma data:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      color: "#f8fafc",
      fontFamily: '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      overflowY: "auto",
      padding: "24px 16px",
      boxSizing: "border-box"
    }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justify: "space-between",
        marginBottom: 20,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        padding: "16px 20px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                color: "#fff",
                borderRadius: 10,
                width: 36,
                height: 36,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              ←
            </button>
          )}
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#38bdf8" }}>
              🎨 Figma Sync Test Frame
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
              File: <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{figmaData.fileName}</span> ({figmaData.fileKey})
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSyncFigma}
          disabled={loading}
          style={{
            background: loading ? "#64748b" : "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "#ffffff",
            border: "none",
            borderRadius: 12,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
            transition: "transform 0.2s"
          }}
        >
          {loading ? "🔄 Syncing..." : "⚡ Live Sync Figma API"}
        </button>
      </div>

      {/* Main Grid: Rendered Web Frame vs Figma Spec */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 20
      }}>

        {/* Live Re-generated Web Frame */}
        <div style={{
          background: "rgba(30, 41, 59, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 18,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justify: "space-between",
            marginBottom: 14
          }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#4ade80" }}>
              🌐 Web UI Component (Desktop - 1)
            </div>
            <span style={{
              fontSize: 11,
              background: "#166534",
              color: "#86efac",
              padding: "4px 8px",
              borderRadius: 20,
              fontWeight: 600
            }}>
              Active Web Frame
            </span>
          </div>

          {/* Web Container simulating 1440x1024 scaled down */}
          <div style={{
            width: "100%",
            aspectRatio: "1440 / 1024",
            background: "#FFFFFF",
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            border: "1px solid #e2e8f0"
          }}>
            {/* Rectangle 1 Element (299x36 scaled) */}
            <div style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "45%",
              height: "12%",
              backgroundColor: figmaData.frame.children[0].fill,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justify: "center",
              color: "#334155",
              fontWeight: 700,
              fontSize: 13,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
            }}>
              Rectangle 1 (299 × 36px)
            </div>

            {/* Additional preview structure matching design layout */}
            <div style={{
              position: "absolute",
              bottom: "12%",
              left: "10%",
              right: "10%",
              top: "30%",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              justify: "center",
              alignItems: "center"
            }}>
              <div style={{ color: "#64748b", fontSize: 13, fontWeight: 600 }}>
                📱 Figma Frame Preview Canvas
              </div>
              <div style={{ color: "#94a3b8", fontSize: 11, textAlign: "center" }}>
                1440px × 1024px Desktop Base Frame
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8", textAlign: "right" }}>
            Last sync: {figmaData.lastSynced}
          </div>
        </div>

        {/* Figma API Node Specs */}
        <div style={{
          background: "rgba(30, 41, 59, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 18,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#a855f7", marginBottom: 14 }}>
            📊 Figma Node Specs & Render Image
          </div>

          {/* Figma API Render Image */}
          {figmaData.frame.imageUrl && (
            <div style={{
              marginBottom: 16,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#000"
            }}>
              <img
                src={figmaData.frame.imageUrl}
                alt="Figma Render Frame"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          )}

          {/* Node Spec Tree */}
          <div style={{
            background: "#090d16",
            padding: 14,
            borderRadius: 12,
            fontFamily: "monospace",
            fontSize: 12,
            color: "#38bdf8",
            overflowX: "auto"
          }}>
            <div><strong>FRAME:</strong> {figmaData.frame.name} (ID: {figmaData.frame.id})</div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>├─ Width: {figmaData.frame.width}px</div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>├─ Height: {figmaData.frame.height}px</div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>└─ Fill: {figmaData.frame.background}</div>

            <div style={{ marginTop: 10, color: "#f472b6" }}>
              <strong>CHILD 1:</strong> {figmaData.frame.children[0].name} ({figmaData.frame.children[0].type})
            </div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>├─ ID: {figmaData.frame.children[0].id}</div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>├─ Size: {figmaData.frame.children[0].width}×{figmaData.frame.children[0].height}px</div>
            <div style={{ color: "#94a3b8", marginLeft: 12 }}>└─ Fill: {figmaData.frame.children[0].fill}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
