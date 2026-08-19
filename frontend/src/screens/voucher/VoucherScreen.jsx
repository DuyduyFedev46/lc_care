// Màn 4.2 — Thu hoạch Voucher
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { VOUCHERS, ICONS } from "../../config/constants";
import { dataService } from "../../services/dataService";
import Celebration from "../../components/Celebration";
import ProfileButton from "../../components/ui/ProfileButton";
import Sheet from "../../components/ui/Sheet";

function drawMockQRCode(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  // Drawing helper for black boxes
  ctx.fillStyle = "#1E293B"; // Dark slate color

  const drawFinderPattern = (x, y, w) => {
    // Outer square
    ctx.fillRect(x, y, w, w);
    // Inner white square
    ctx.fillStyle = "#FFFFFF";
    const whiteOffset = w / 7;
    ctx.fillRect(x + whiteOffset, y + whiteOffset, w - 2 * whiteOffset, w - 2 * whiteOffset);
    // Inner black square
    ctx.fillStyle = "#1E293B";
    const blackOffset = 2 * whiteOffset;
    ctx.fillRect(x + blackOffset, y + blackOffset, w - 2 * blackOffset, w - 2 * blackOffset);
  };

  const finderSize = size * (7 / 21); // Size of finder patterns
  // Top-left
  drawFinderPattern(0, 0, finderSize);
  // Top-right
  drawFinderPattern(size - finderSize, 0, finderSize);
  // Bottom-left
  drawFinderPattern(0, size - finderSize, finderSize);

  // Draw alignment pattern or timing patterns
  ctx.fillStyle = "#1E293B";
  const numGrid = 21;
  const cellSize = size / numGrid;

  // Seed random based on the text hash so it's deterministic per code
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  const seededRandom = (s) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  let seed = hash;
  for (let r = 0; r < numGrid; r++) {
    for (let c = 0; c < numGrid; c++) {
      // Skip finder pattern areas
      const isTopLeft = r < 8 && c < 8;
      const isTopRight = r < 8 && c >= numGrid - 8;
      const isBottomLeft = r >= numGrid - 8 && c < 8;
      if (isTopLeft || isTopRight || isBottomLeft) continue;

      // Draw random pixels
      const rand = seededRandom(seed++);
      if (rand > 0.45) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize + 0.5, cellSize + 0.5);
      }
    }
  }
}

export default function VoucherScreen() {
  const { navigate, state, update, showToast } = useApp();
  const { t } = useTranslation();
  const [modal, setModal] = useState(null);
  const [redeemed, setRedeemed] = useState({});
  const [vouchers, setVouchers] = useState(VOUCHERS);
  const [loadingRedeem, setLoadingRedeem] = useState(false);
  const [successVoucher, setSuccessVoucher] = useState(null);
  const [targetedVouchers, setTargetedVouchers] = useState([]);
  const [showRedeemCelebration, setShowRedeemCelebration] = useState(false);
  const points = state.points || 0;
  const canvasRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const familyMembers = state.familyMembers || [];
  const familyPoints = familyMembers.reduce((s, m) => s + (m.streak || 0) * 10 + (m.level || 0) * 50, 0);

  // Dịch field voucher theo id (lab/vacc/supp) — fallback chuỗi gốc nếu thiếu key.
  const VOUCHER_KEY = { lab: "voucher_lab", vacc: "voucher_vaccine", supp: "voucher_omega" };
  const vField = (v, field) => {
    const prefix = VOUCHER_KEY[v?.id];
    const suffix = { type: "title", desc: "desc", value: "value" }[field];
    return prefix ? t(`${prefix}_${suffix}`, { defaultValue: v[field] }) : v[field];
  };

  const filteredVouchers = vouchers.filter(v => {
    if (activeFilter === "all") return true;
    if (activeFilter === "redeemed") return redeemed[v.id];
    return v.id === activeFilter;
  });

  useEffect(() => {
    dataService.getVouchers().then(res => {
      if (res && res.length > 0) {
        const mapped = res.map(v => {
          const local = VOUCHERS.find(lv => lv.id === v.id);
          return {
            ...v,
            iconImg: local ? local.iconImg : ICONS.voucher_lab,
            type: v.type || (local ? local.type : v.name),
            desc: v.desc || (local ? local.desc : ""),
            cost: v.cost || (local ? local.cost : 0),
            value: v.value || (local ? local.value : ""),
          };
        });
        setVouchers(mapped);
      }
    });
    // Task 4.3: Also fetch personalised targeted vouchers
    dataService.getTargetedVouchers().then(res => {
      if (res && res.length > 0) setTargetedVouchers(res);
    }).catch(() => {}); // non-critical
  }, []);

  // Draw QR code on modal mount/update
  useEffect(() => {
    if (successVoucher && canvasRef.current) {
      drawMockQRCode(canvasRef.current, successVoucher.code);
    }
  }, [successVoucher]);

  const redeem = async (v) => {
    if (points < v.cost) return;
    setLoadingRedeem(true);
    try {
      const res = await dataService.redeemVoucher(v.id);
      if (res && res.success) {
        setRedeemed((p) => ({ ...p, [v.id]: true }));
        update({ points: res.remainingPoints });

        // Generate a mock barcode/QR code text
        const randCode = `LC-${v.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
        setSuccessVoucher({
          ...v,
          code: randCode
        });
        setModal(null);
        // Task B5: confetti celebration on redeem
        setShowRedeemCelebration(true);
      } else {
        showToast(res?.messageKey ? t(res.messageKey, { cost: res.cost, current: res.current, defaultValue: res.message }) : t("voucher_error"));
      }
    } catch (err) {
      showToast(t("connect_error"));
    } finally {
      setLoadingRedeem(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: '"Be Vietnam Pro", sans-serif' }}>

      <Sheet open={!!modal} onClose={() => { if (!loadingRedeem) setModal(null); }} title={t("voucher_confirm")}>
        {modal && (
          <div style={{ padding: "16px 24px 32px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
            <div style={{ fontSize: 15, color: G.textMid, marginBottom: 20 }}>
              <img src={modal.iconImg} alt={vField(modal, "type")} style={{ width: 24, height: 24, objectFit: "contain", verticalAlign: "middle" }} /> {vField(modal, "type")}: {vField(modal, "desc")}<br />
              <span style={{ color: G.orange, fontWeight: 700 }}>{t("deduct_points", { n: modal.cost })}</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button disabled={loadingRedeem} onClick={() => setModal(null)} style={{ flex: 1, height: 44, borderRadius: 14, background: "transparent", color: "var(--brand)", border: "1.5px solid var(--brand)", fontSize: 14, fontWeight: 600, cursor: loadingRedeem ? "not-allowed" : "pointer", fontFamily: '"Be Vietnam Pro", sans-serif' }}>{t("cancel")}</button>
              <button disabled={loadingRedeem} onClick={() => redeem(modal)} style={{ flex: 2, height: 44, borderRadius: 14, background: loadingRedeem ? "var(--hairline)" : "var(--brand)", color: "#FFF", border: "none", fontSize: 14, fontWeight: 700, cursor: loadingRedeem ? "not-allowed" : "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                {loadingRedeem ? (
                  <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #FFF", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                ) : (
                  <>
                    <img src={ICONS.ui_gift_box} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
                    <span>{t("voucher_harvest")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Sheet>

      {successVoucher && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
          padding: "0 24px", backdropFilter: "blur(8px)"
        }} onClick={() => setSuccessVoucher(null)}>
        <div style={{
            background: "var(--surface)", borderRadius: 24, padding: "20px 20px 24px", width: "100%", maxWidth: 340,
            textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontFamily: '"Be Vietnam Pro", sans-serif'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: G.text, marginBottom: 2 }}>{t("voucher_success")}</div>
            <div style={{ fontSize: 12, color: G.textMid, marginBottom: 12 }}>{t("voucher_scan_at_counter")}</div>

            {/* Voucher name inline */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 12, fontSize: 13, fontWeight: 700, color: G.text,
            }}>
              <img src={successVoucher.iconImg} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
              <span>{successVoucher.desc}</span>
            </div>

            {/* QR & Barcode */}
            <div style={{
              background: "#F8FAFC", border: `1px solid ${G.border}`, borderRadius: 14,
              padding: "14px 12px", marginBottom: 16
            }}>
              <div style={{ background: "#FFF", padding: 10, borderRadius: 10, display: "inline-block", border: "1px solid #E2E8F0", marginBottom: 10 }}>
                <canvas ref={canvasRef} width={110} height={110} style={{ display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: 2, height: 36, width: "100%", justifyContent: "center", background: "#FFF", padding: "6px 10px", borderRadius: 6, boxSizing: "border-box", border: "1px solid #E2E8F0" }}>
                {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 1, 4, 2, 1, 2, 1, 3, 2, 1, 2].map((w, idx) => (
                  <div key={idx} style={{ width: w, background: idx % 2 === 0 ? "#1E293B" : "transparent", height: "100%" }} />
                ))}
              </div>
              <div style={{ fontSize: 12, color: G.text, marginTop: 6, fontWeight: 700, letterSpacing: 2 }}>
                {successVoucher.code}
              </div>
            </div>

            <button
              onClick={() => setSuccessVoucher(null)}
              style={{
                width: "100%", height: 44, borderRadius: 12,
              background: "var(--brand)", color: "#FFF", border: "none",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: '"Be Vietnam Pro", sans-serif'
              }}
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: "calc(16px + var(--sat, 0px)) 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${G.hairline}`, background: G.surface }}>
        <div style={{ fontWeight: 800, color: G.text, fontSize: 18, display: "flex", alignItems: "center", gap: 6 }}>
          <img src={ICONS.ui_gift_box} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} /> {t("voucher_harvest_title")}
        </div>

        <ProfileButton variant="clinic" size={36} />
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        padding: "10px 16px 10px",
        borderBottom: `1px solid ${G.hairline}`,
        background: G.surface,
        scrollbarWidth: "none"
      }}>
        {[
          { id: "all", label: t("filter_all") },
          { id: "supp", label: t("filter_supp") },
          { id: "lab", label: t("filter_lab") },
          { id: "vacc", label: t("filter_vacc") },
          { id: "redeemed", label: t("filter_redeemed") },
        ].map(f => {
          const active = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 16,
                border: `1.5px solid ${activeFilter === f.id ? "var(--brand)" : "var(--border)"}`,
                background: activeFilter === f.id ? "var(--brand-pale)" : "var(--surface)",
                color: activeFilter === f.id ? "var(--brand)" : "var(--text-mid)",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: '"Be Vietnam Pro", sans-serif',
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px 110px" }}>
        {/* Double-display points card (Individual & Family Wallet) */}
        <div style={{
          background: `linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%)`,
          borderRadius: 20,
          padding: "20px 24px",
          marginBottom: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          boxShadow: "0 6px 20px rgba(5,150,105,0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

          <div style={{ borderRight: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.75)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("your_points")}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#FFF", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              {points} <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{t("points_unit")}</span>
            </div>
          </div>

          <div style={{ paddingLeft: 8 }}>
            <div style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.75)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("family_fund")}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#FFF", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              {familyPoints} <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>⭐</span>
            </div>
          </div>

          <button
            onClick={() => navigate("home")}
            style={{
              gridColumn: "1 / -1", marginTop: 2,
              background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 12, padding: "8px 0",
              color: "#FFF", fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: '"Be Vietnam Pro", sans-serif',
            }}
          >
            {t("earn_more_points")}
          </button>
        </div>

        {/* Task 4.3: "Dành Riêng Cho Bạn" — Targeted Gold Vouchers */}
        {targetedVouchers.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: "#B45309",
              marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
            }}>
              {t("for_you_vouchers")}
            </div>
            {targetedVouchers.map(v => (
              <div
                key={v.id}
                style={{
                  background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                  border: "1.5px solid #F59E0B",
                  borderRadius: 18,
                  padding: "14px 16px",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: "0 4px 16px rgba(245,158,11,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Gold shimmer accent */}
                <div style={{
                  position: "absolute", top: -10, right: -10,
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(245,158,11,0.15)", pointerEvents: "none",
                }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0,
                }}>
                  {v.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#92400E", marginBottom: 2 }}>
                    {v.key ? t(`${v.key}_title`, { defaultValue: v.title }) : v.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#B45309", marginBottom: 6, lineHeight: 1.4 }}>
                    {v.key ? t(`${v.key}_desc`, { defaultValue: v.desc }) : v.desc}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 800, color: "#D97706",
                      background: "rgba(245,158,11,0.15)", padding: "2px 8px", borderRadius: 999,
                    }}>
                      🏷️ {v.key ? t(`${v.key}_discount`, { defaultValue: v.discount }) : v.discount}
                    </span>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-light)" }}>• {v.cost} {t("points_unit")}</span>
                  </div>
                </div>
                <button
                  disabled={v.redeemed || points < v.cost}
                  onClick={() => setModal(v)}
                  style={{
                    flexShrink: 0,
                    height: 36, padding: "0 14px",
                    borderRadius: 12,
                    background: v.redeemed
                      ? "#E5E7EB"
                      : points < v.cost
                      ? "#E5E7EB"
                      : "linear-gradient(135deg, #F59E0B, #D97706)",
                    border: "none",
                    color: v.redeemed || points < v.cost ? "#9CA3AF" : "#fff",
                    fontSize: 12, fontWeight: 700,
                    cursor: v.redeemed || points < v.cost ? "not-allowed" : "pointer",
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    boxShadow: v.redeemed || points < v.cost ? "none" : "0 3px 8px rgba(245,158,11,0.4)",
                  }}
                >
                  {v.redeemed ? `✓ ${t("filter_redeemed")}` : t("filter_redeem")}
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_gift_box} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} /> {t("available_vouchers_list")}</div>

        {filteredVouchers.length === 0 && (
          <div style={{ background: G.surface, borderRadius: 18, padding: "32px 20px", border: `1.5px dashed ${G.border}`, textAlign: "center", color: G.textLight, fontSize: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
            <div>{t("no_voucher_in_category")}</div>
          </div>
        )}

        {filteredVouchers && filteredVouchers.map((v) => (
          <div key={v.id} style={{ background: G.surface, borderRadius: 18, marginBottom: 12, border: `1.5px solid ${G.border}`, opacity: redeemed[v.id] ? 0.6 : 1, position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 18px 14px" }}>
              <img src={v.iconImg} alt={vField(v, "type")} style={{ width: 36, height: 36, objectFit: "contain" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: G.text, fontSize: 15 }}>{vField(v, "type")}</div>
                <div style={{ fontSize: 13, color: G.textMid, marginTop: 3, lineHeight: 1.5 }}>{vField(v, "desc")}</div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: G.orange, fontWeight: 700 }}>{v.cost} {t("points_unit")}</span>
                  <span style={{ background: "var(--success-pale)", color: "var(--success)", fontSize: "var(--text-sm)", fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{vField(v, "value")}</span>
                </div>
              </div>
            </div>
            {/* Ticket perforation — dashed divider + 2 notch tròn 2 bên */}
            <div style={{ position: "relative", borderTop: `1.5px dashed ${G.border}`, margin: "0 12px" }}>
              <div style={{ position: "absolute", top: -9, left: -21, width: 18, height: 18, borderRadius: "50%", background: G.bg, border: `1.5px solid ${G.border}` }} />
              <div style={{ position: "absolute", top: -9, right: -21, width: 18, height: 18, borderRadius: "50%", background: G.bg, border: `1.5px solid ${G.border}` }} />
            </div>
            <div style={{ padding: "12px 18px 16px" }}>
              <button disabled={redeemed[v.id] || points < v.cost} onClick={() => setModal(v)} style={{
                width: "100%", height: 44, borderRadius: 14, fontSize: 14, fontWeight: 700,
                border: "none", cursor: redeemed[v.id] || points < v.cost ? "not-allowed" : "pointer",
                fontFamily: '"Be Vietnam Pro", sans-serif',
                background: redeemed[v.id] ? "var(--hairline)" : points < v.cost ? "var(--brand-pale)" : "var(--brand)",
                color: redeemed[v.id] || points < v.cost ? "var(--text-light)" : "#FFF",
              }}>
                {redeemed[v.id] ? t("voucher_harvested") : points < v.cost ? t("voucher_need_more", { x: v.cost - points }) : <span style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}><img src={ICONS.ui_points_grain} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("voucher_harvest_now")}</span>}
              </button>
            </div>
          </div>
        ))}

        <div style={{ padding: "16px", background: G.gold100, borderRadius: 14, border: `1px solid ${G.gold200}`, fontSize: 13, color: "#856A20", lineHeight: 1.6, marginBottom: 8 }}>
          <img src={ICONS.ui_warning_triangle} alt="" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle" }} /> {t("voucher_disclaimer")}
        </div>
      </div>

      {/* Task B5: confetti celebration on voucher redeem */}
      {showRedeemCelebration && (
        <Celebration
          type="milestone"
          icon="🎁"
          title={t("voucher_success")}
          desc={t("voucher_redeem_success")}
          onClose={() => setShowRedeemCelebration(false)}
        />
      )}
    </div>
  );
}
