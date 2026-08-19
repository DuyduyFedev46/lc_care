/**
 * AppointmentConfirmSheet — Bottom sheet xác nhận lịch tái khám từ OCR
 *
 * Props:
 *   ocrResult   — kết quả OCR, có thể có next_appointment_date, appointment_note
 *   onClose()   — đóng sheet (cancel / outside tap)
 *   onSaved()   — callback sau khi ghi thành công vào Firestore
 */
import { useState, useEffect, useRef } from "react";
import { dataService } from "../../services/dataService";

// Màu cho từng thành viên theo thứ tự
const MEMBER_COLORS = [
  "#00923F", "#1250DC", "#D97706", "#7C3AED", "#E52D2D", "#0891B2",
];

/**
 * Parse ngày tái khám về dạng YYYY-MM-DD cho input[type="date"]
 * Hỗ trợ: dd/mm/yyyy, dd-mm-yyyy, yyyy-mm-dd
 */
function parseToISODate(raw) {
  if (!raw) return "";
  raw = raw.trim();
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(raw)) {
    const [y, m, d] = raw.split("-");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const match = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  }
  return "";
}

const SHEET_CSS = `
@keyframes apptFadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes apptSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
.appt-sheet-anim { animation: apptSlideUp 0.28s cubic-bezier(0.34,1.56,0.64,1); }
.appt-member-pill {
  height: 36px; border-radius: 18px; padding: 0 14px; flex-shrink: 0;
  font-size: 13px; font-weight: 600; font-family: "Be Vietnam Pro", sans-serif;
  cursor: pointer; border: 1.5px solid transparent; white-space: nowrap;
  transition: all 0.18s ease;
}
.appt-member-pill.active { background: #00923F; color: #fff; border-color: #00923F; }
.appt-member-pill.inactive { background: #F0F4FF; color: #334155; border-color: #E2E8F0; }
.appt-member-pill.inactive:hover { border-color: #00923F; color: #00923F; }
.appt-field-input {
  width: 100%; height: 46px; border-radius: 10px; border: 1.5px solid #E2E8F0;
  padding: 0 14px; font-size: 14px; font-family: "Be Vietnam Pro", sans-serif;
  font-weight: 600; color: #1E293B; background: #F8FAFC;
  box-sizing: border-box; outline: none; transition: border-color 0.18s;
}
.appt-field-input:focus { border-color: #00923F; background: #fff; }
.appt-save-btn {
  width: 100%; height: 50px; border-radius: 25px; background: #00923F; color: #fff;
  border: none; font-size: 15px; font-weight: 700; font-family: "Be Vietnam Pro", sans-serif;
  cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 16px rgba(0,146,63,0.28);
}
.appt-save-btn:hover:not(:disabled) { background: #006B2E; transform: translateY(-1px); }
.appt-save-btn:active:not(:disabled) { transform: scale(0.98); }
.appt-save-btn:disabled { background: #94A3B8; box-shadow: none; cursor: not-allowed; }
`;

export default function AppointmentConfirmSheet({ ocrResult, onClose, onSaved }) {
  const [dateValue, setDateValue] = useState("");
  const [activity, setActivity] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const sheetRef = useRef(null);

  // Init từ ocrResult
  useEffect(() => {
    if (ocrResult?.next_appointment_date) {
      setDateValue(parseToISODate(ocrResult.next_appointment_date));
    }
    setActivity(ocrResult?.appointment_note || "Tái khám");
  }, [ocrResult]);

  // Load thành viên gia đình
  useEffect(() => {
    dataService.getFamilyInfo()
      .then((data) => {
        const mems = data?.members || [];
        setMembers(mems);
        const me = mems.find((m) => m.isMe);
        setSelectedMember(me || mems[0] || null);
      })
      .catch(() => { /* non-critical */ });
  }, []);

  const handleOverlayClick = (e) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target)) onClose();
  };

  const handleSave = async () => {
    if (!dateValue) { setError("Vui lòng chọn ngày khám."); return; }
    if (!activity.trim()) { setError("Vui lòng nhập hoạt động."); return; }
    setError(null);
    setSaving(true);
    try {
      const memberIdx = selectedMember ? members.indexOf(selectedMember) : 0;
      await dataService.addFamilyCalendarEvent({
        dateFull: dateValue,
        activity: activity.trim(),
        member: selectedMember?.name || null,
        color: MEMBER_COLORS[memberIdx % MEMBER_COLORS.length] || "#00923F",
        note: ocrResult?.appointment_note || null,
        sourceType: "ocr",
      });
      onSaved?.();
    } catch (err) {
      setError("Không thể lưu. Vui lòng thử lại.");
      console.error("[AppointmentConfirmSheet]", err);
    } finally {
      setSaving(false);
    }
  };

  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "flex-end",
        animation: "apptFadeIn 0.2s ease-out",
      }}
    >
      <style>{SHEET_CSS}</style>
      <div
        ref={sheetRef}
        className="appt-sheet-anim"
        style={{
          width: "100%", maxWidth: 480, margin: "0 auto",
          background: "#fff", borderRadius: "24px 24px 0 0",
          padding: `0 20px calc(28px + env(safe-area-inset-bottom, 0px))`,
          boxSizing: "border-box", maxHeight: "88dvh", overflowY: "auto",
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#E2E8F0" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1E293B" }}>
              Thêm vào lịch khám gia đình
            </div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 3 }}>
              {ocrResult?.next_appointment_date
                ? "Phát hiện ngày tái khám từ đơn thuốc"
                : "Nhập ngày lịch hẹn thủ công"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#F1F5F9", border: "none", width: 32, height: 32,
              borderRadius: 16, cursor: "pointer", fontSize: 18, color: "#64748B",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 2, lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Ngày khám */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>
            Ngày khám <span style={{ color: "#E52D2D" }}>*</span>
          </label>
          <input
            id="appt-date-input"
            type="date"
            className="appt-field-input"
            value={dateValue}
            min={todayISO}
            onChange={(e) => { setDateValue(e.target.value); setError(null); }}
          />
        </div>

        {/* Hoạt động */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>
            Hoạt động <span style={{ color: "#E52D2D" }}>*</span>
          </label>
          <input
            id="appt-activity-input"
            type="text"
            className="appt-field-input"
            value={activity}
            placeholder="VD: Tái khám tim mạch, Lấy thuốc định kỳ..."
            onChange={(e) => { setActivity(e.target.value); setError(null); }}
            maxLength={200}
          />
        </div>

        {/* Thành viên */}
        {members.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", display: "block", marginBottom: 8 }}>
              Dành cho
            </label>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {members.map((m) => (
                <button
                  key={m.id}
                  id={`appt-member-${m.id}`}
                  className={`appt-member-pill ${selectedMember?.id === m.id ? "active" : "inactive"}`}
                  onClick={() => setSelectedMember(m)}
                >
                  {m.name}{m.isMe ? " (Tôi)" : ""}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bác sĩ từ OCR */}
        {ocrResult?.doctor_name && (
          <div style={{
            background: "#F0FDF4", border: "1px solid #BBF7D0",
            borderRadius: 10, padding: "8px 12px", marginBottom: 16,
            fontSize: 12, color: "#166534", lineHeight: 1.5,
          }}>
            <strong>Bác sĩ kê đơn:</strong> {ocrResult.doctor_name}
            {ocrResult?.patient_name && (
              <> &nbsp;·&nbsp; <strong>Bệnh nhân:</strong> {ocrResult.patient_name}</>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FCA5A5",
            borderRadius: 10, padding: "10px 12px", marginBottom: 14,
            fontSize: 13, color: "#DC2626", fontWeight: 600,
          }}>
            {error}
          </div>
        )}

        {/* Nút lưu */}
        <button
          id="appt-save-btn"
          className="appt-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "Thêm vào lịch khám gia đình"}
        </button>

        {/* Bỏ qua */}
        <button
          id="appt-skip-btn"
          onClick={onClose}
          style={{
            width: "100%", background: "none", border: "none",
            color: "#94A3B8", fontSize: 13, fontWeight: 600,
            cursor: "pointer", marginTop: 10, padding: "8px 0",
            fontFamily: '"Be Vietnam Pro", sans-serif',
          }}
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
