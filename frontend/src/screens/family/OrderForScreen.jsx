// OrderForScreen.jsx — Task 4.4: Đặt thuốc hộ người thân
// Caregiver orders refill meds for family member who struggles with tech
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { ICONS } from "../../config/constants";

const F = '"Be Vietnam Pro", sans-serif';

// Demo refill items — in production sourced from member's care plan (name via i18n key)
const DEMO_ITEMS = [
  { id: "metformin", nameKey: "order_item_metformin", qty: 30, price: 45000, checked: true },
  { id: "glucometer", nameKey: "order_item_glucometer", qty: 1, price: 128000, checked: true },
  { id: "bp_monitor_strip", nameKey: "order_item_bp_battery", qty: 1, price: 25000, checked: false },
];

function formatVnd(n) {
  return n.toLocaleString() + i18n.t("currency_vnd");
}

function generateOrderCode() {
  return `LC-CARE-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function OrderForScreen() {
  const { t } = useTranslation();
  const { goBack, state, showToast } = useApp();
  const [items, setItems] = useState(DEMO_ITEMS);
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [payment, setPayment] = useState("cod"); // cod | lcpay

  // Derive target member from state (set when navigating to order-for)
  const targetMember = state.orderForMember || {
    name: t("family_member"),
    relation: "mom",
    address: t("order_demo_address"),
    avatar: null,
  };

  const checkedItems = items.filter(i => i.checked);
  const total = checkedItems.reduce((s, i) => s + i.price * i.qty, 0);

  const toggleItem = (id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  };

  const handleOrder = async () => {
    if (checkedItems.length === 0) {
      showToast(t("select_at_least_one"));
      return;
    }
    setLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    const code = generateOrderCode();
    setSuccessOrder(code);
    setLoading(false);
  };

  if (successOrder) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, fontFamily: F }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
          {/* Trophy modal */}
          <div style={{ fontSize: 72, marginBottom: 16, animation: "bounce 0.6s ease" }}>🏆</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: G.text, marginBottom: 8, textAlign: "center", fontFamily: F }}>
            {t("order_success_title")}
          </div>
          <div style={{ fontSize: 14, color: G.textMid, marginBottom: 24, textAlign: "center", lineHeight: 1.6, fontFamily: F }}>
            {t("order_helped_streak", { name: targetMember.name })}
          </div>

          <div style={{
            background: "#F0FDF4", border: "1.5px solid #86EFAC",
            borderRadius: 16, padding: "16px 20px", width: "100%", marginBottom: 20,
          }}>
            <div style={{ fontSize: 12, color: G.textMid, marginBottom: 4, fontFamily: F }}>{t("order_code_label")}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#16A34A", fontFamily: "monospace", letterSpacing: 2 }}>
              {successOrder}
            </div>
            <div style={{ fontSize: 11, color: G.textLight, marginTop: 4, fontFamily: F }}>
              {t("delivery_eta")}
            </div>
          </div>

          <div style={{ fontSize: 13, color: G.textMid, marginBottom: 28, textAlign: "center", fontFamily: F }}>
            {t("total_colon")} <strong style={{ color: G.text }}>{formatVnd(total)}</strong>
            {" "}{payment === "lcpay" ? t("lcpay_label") : t("cod_label")}
          </div>

          <button
            onClick={goBack}
            style={{
              width: "100%", height: 52, borderRadius: 16,
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              border: "none", color: "#fff",
              fontSize: 16, fontWeight: 800, cursor: "pointer",
              fontFamily: F, boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
            }}
          >
            {t("back_to_home")}
          </button>
        </div>
      </div>
    );
  }

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
        <div style={{ flex: 1, fontWeight: 800, color: G.text, fontSize: 17 }}>{t("order_for_family_title")}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 130px" }}>

        {/* Target member info */}
        <div style={{
          background: G.surface, borderRadius: 18, padding: "14px 16px", marginBottom: 16,
          border: `1.5px solid ${G.hairline}`,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>
            {targetMember.avatar
              ? <img src={targetMember.avatar} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
              : "👤"
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: G.text, marginBottom: 2 }}>
              {t("ordering_for", { name: targetMember.name })}
            </div>
            <div style={{ fontSize: 12, color: G.textMid }}>
              📍 {targetMember.address || t("delivery_address")}
            </div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700,
            background: G.blue100, color: G.primary,
            padding: "3px 10px", borderRadius: 999,
          }}>
            {t("relative_tag")}
          </span>
        </div>

        {/* Medication list */}
        <div style={{ fontSize: 13, fontWeight: 800, color: G.text, marginBottom: 10 }}>
          {t("refill_list_title")}
        </div>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              background: item.checked ? "#F0FDF4" : G.surface,
              border: `1.5px solid ${item.checked ? "#86EFAC" : G.hairline}`,
              borderRadius: 14, padding: "12px 14px", marginBottom: 8,
              display: "flex", alignItems: "center", gap: 12,
              transition: "all 0.2s",
            }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
              style={{ width: 18, height: 18, accentColor: "#22C55E", cursor: "pointer", flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 2 }}>{t(item.nameKey)}</div>
              <div style={{ fontSize: 11, color: G.textMid }}>x{item.qty} · {formatVnd(item.price)}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.checked ? "#16A34A" : G.textLight }}>
              {formatVnd(item.price * item.qty)}
            </div>
          </div>
        ))}

        {/* Payment method */}
        <div style={{ fontSize: 13, fontWeight: 800, color: G.text, marginBottom: 10, marginTop: 16 }}>
          {t("payment_method_title")}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { id: "lcpay", label: t("lcpay_wallet"), icon: "💚" },
            { id: "cod",   label: t("cod"), icon: "💵" },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setPayment(opt.id)}
              style={{
                flex: 1, height: 48, borderRadius: 14,
                background: payment === opt.id ? "#EFF6FF" : G.surface,
                border: `1.5px solid ${payment === opt.id ? G.primary : G.border}`,
                color: payment === opt.id ? G.primary : G.text,
                fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: F,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: G.surface, borderTop: `1px solid ${G.hairline}`,
        padding: "16px 16px calc(16px + var(--sab, 0px))",
        display: "flex", flexDirection: "column", gap: 8,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: G.textMid, fontFamily: F }}>
            {t("items_selected", { n: checkedItems.length })}
          </span>
          <span style={{ fontSize: 16, fontWeight: 900, color: G.text, fontFamily: F }}>
            {t("total_colon")} {formatVnd(total)}
          </span>
        </div>
        <button
          onClick={handleOrder}
          disabled={loading || checkedItems.length === 0}
          style={{
            width: "100%", height: 54, borderRadius: 18,
            background: loading || checkedItems.length === 0
              ? "#E5E7EB"
              : "linear-gradient(135deg, #2563EB, #1D4ED8)",
            border: "none", color: loading || checkedItems.length === 0 ? "#9CA3AF" : "#fff",
            fontSize: 16, fontWeight: 900, cursor: loading || checkedItems.length === 0 ? "not-allowed" : "pointer",
            fontFamily: F, letterSpacing: 0.3,
            boxShadow: loading || checkedItems.length === 0 ? "none" : "0 4px 20px rgba(37,99,235,0.4)",
            transition: "all 0.2s",
          }}
        >
          {loading
            ? t("processing_order")
            : t("order_now_btn", { amount: formatVnd(total) })}
        </button>
      </div>
    </div>
  );
}
