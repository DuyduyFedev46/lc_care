// Tab Calendar — Month grid view (MS Teams style) + Appointment CRUD
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { G } from "../../components/DesignTokens";
import { ICONS } from "../../config/constants";
import { dataService } from "../../services/dataService";
import Sheet from "../../components/ui/Sheet";

function getMonthGridDates(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Start from Monday of the week containing the 1st
  const firstWeekMonday = new Date(firstDay);
  firstWeekMonday.setDate(firstDay.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));

  const dates = [];
  let current = new Date(firstWeekMonday);

  // Generate 5-6 weeks (35-42 days), stopping when we've covered the entire month
  while (current <= lastDay || dates.length % 7 !== 0) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
    if (dates.length >= 42) break; // Cap at 42 days (6 weeks)
  }

  return dates;
}

export default function CalendarScreen({ isSubView = false }) {
  const { t, i18n } = useTranslation();
  const { navigate, state, showToast } = useApp();
  const [batchAccepted, setBatchAccepted] = useState(false);
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const f = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${f(now.getMonth() + 1)}-${f(now.getDate())}`;
  });
  const [eventSheet, setEventSheet] = useState(null);
  const [eventSheetLoading, setEventSheetLoading] = useState(false);

  const formatDigit = (n) => String(n).padStart(2, '0');
  const dayLabel = (date) => {
    const MAP = { 0: t("day_sun"), 1: t("day_mon"), 2: t("day_tue"), 3: t("day_wed"), 4: t("day_thu"), 5: t("day_fri"), 6: t("day_sat") };
    return MAP[date.getDay()] || "";
  };

  const now = new Date();
  const todayFullStr = `${now.getFullYear()}-${formatDigit(now.getMonth() + 1)}-${formatDigit(now.getDate())}`;

  const monthGridDates = getMonthGridDates(viewDate.getFullYear(), viewDate.getMonth());
  const monthLabel = viewDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });

  useEffect(() => {
    dataService.getFamilyCalendar()
      .then(res => {
        if (res && res.length > 0) {
          setCalendar(res);
        } else {
          setCalendar([]);
        }
      })
      .catch(() => {
        setCalendar([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAcceptBatch = () => {
    setBatchAccepted(true);
    if (calendar) {
      const updated = calendar.map(dayData => {
        if (dayData.day === "T3") {
          return {
            ...dayData,
            events: dayData.events.filter(ev => ev.key !== "mom_refill")
          };
        }
        if (dayData.day === "T4") {
          const hasEvent = dayData.events.some(ev => ev.key === "mom_refill");
          if (hasEvent) return dayData;
          return {
            ...dayData,
            events: [
              ...dayData.events,
              { key: "mom_refill", member: t("cal_member_mom"), activity: t("cal_ev_refill_bp"), location: t("cal_loc_lc_caugiay"), color: "#00923F", batch: true }
            ]
          };
        }
        return dayData;
      });
      setCalendar(updated);
    }
  };

  const handleOpenEventSheet = (dateFull, date, eventIndex = null) => {
    setEventSheet({
      dateFull,
      date,
      eventIndex,
      member: "",
      activity: "",
      location: "",
      color: "#00923F",
    });
  };

  const handleSaveEvent = async () => {
    if (!eventSheet || !eventSheet.member || !eventSheet.activity) {
      showToast(t("calendar_event_error"));
      return;
    }

    setEventSheetLoading(true);
    try {
      const eventData = {
        dateFull: eventSheet.dateFull,
        member: eventSheet.member,
        activity: eventSheet.activity,
        location: eventSheet.location,
        color: eventSheet.color,
      };

      let response;
      if (eventSheet.eventIndex !== null && eventSheet.eventIndex !== undefined) {
        response = await dataService.updateCalendarEvent(eventSheet.dateFull, eventSheet.eventIndex, eventData);
      } else {
        response = await dataService.addCalendarEvent(eventData);
      }

      if (response && response.events) {
        setCalendar((prev) => {
          if (!prev) return null;
          return prev.map((day) =>
            day.dateFull === eventSheet.dateFull ? { ...day, events: response.events } : day
          );
        });
        showToast(t("calendar_event_saved"));
        setEventSheet(null);
      }
    } catch (err) {
      console.error("Save event error:", err);
      showToast(err?.response?.data?.detail || t("calendar_event_error"));
    } finally {
      setEventSheetLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventSheet || eventSheet.eventIndex === null || eventSheet.eventIndex === undefined) return;
    if (!confirm(t("confirm_delete"))) return;

    setEventSheetLoading(true);
    try {
      await dataService.deleteCalendarEvent(eventSheet.dateFull, eventSheet.eventIndex);
      setCalendar((prev) => {
        if (!prev) return null;
        return prev.map((day) =>
          day.dateFull === eventSheet.dateFull
            ? { ...day, events: day.events.filter((_, i) => i !== eventSheet.eventIndex) }
            : day
        );
      });
      showToast(t("calendar_event_deleted"));
      setEventSheet(null);
    } catch (err) {
      console.error("Delete event error:", err);
      showToast(err?.response?.data?.detail || t("calendar_event_error"));
    } finally {
      setEventSheetLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: G.bg, alignItems: "center", justifyContent: "center", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        <img src={ICONS.mascot_loading} alt="loading" style={{ width: 60, height: 60, objectFit: "contain", marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ fontSize: 14, color: G.textMid }}>{t("loading_calendar")}</div>
      </div>
    );
  }

  // Build event map by dateFull for fast lookup
  const eventMap = {};
  if (calendar && Array.isArray(calendar)) {
    calendar.forEach(day => {
      if (day.dateFull && day.events) {
        eventMap[day.dateFull] = day.events;
      }
    });
  }

  // Get selected day events
  const selectedDayEvents = selectedDate ? (eventMap[selectedDate] || []) : [];

  const isCurrentMonth = viewDate.getFullYear() === now.getFullYear() && viewDate.getMonth() === now.getMonth();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: isSubView ? "transparent" : G.bg, fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      {!isSubView && (
        <div style={{ padding: "calc(16px + var(--sat, 0px)) 20px 8px" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: G.text, display: "flex", alignItems: "center", gap: 6 }}><img src={ICONS.ui_calendar_date} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} /> {t("family_calendar_title")}</div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: isSubView ? "12px 16px 110px" : "4px 16px 110px" }}>
        {!batchAccepted ? (
          <div style={{ background: G.gold100, borderRadius: 16, padding: "16px", marginBottom: 16, border: `1.5px solid ${G.gold200}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_lightbulb_insight} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("smart_suggestion")}</div>
            <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.6, marginBottom: 14 }}>
              {t("calendar_batch_suggestion")}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleAcceptBatch} style={{ background: "var(--success)", color: "#FFF", border: "none", borderRadius: 20, height: 38, padding: "0 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', flex: 1 }}>{t("move_to_wed")}</button>
              <button style={{ background: "transparent", color: G.textMid, border: `1.5px solid ${G.border}`, borderRadius: 20, height: 38, padding: "0 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: '"Be Vietnam Pro", sans-serif', flex: 1 }}>{t("skip")}</button>
            </div>
          </div>
        ) : (
          <div style={{ background: "var(--success-pale)", borderRadius: 16, padding: "14px", marginBottom: 16, border: "1.5px solid var(--success)" }}>
            <div style={{ fontSize: 13, color: "var(--success-dark)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}><img src={ICONS.ui_check_circle} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("moved_to_wed_confirmed")}</div>
          </div>
        )}

        {/* Month Navigation + Grid */}
        <div style={{ background: G.surface, borderRadius: 18, padding: "16px", marginBottom: 14, border: `1.5px solid ${G.border}` }}>
          {/* Month header with nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <button
              onClick={() => {
                const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
                setViewDate(prev);
                setSelectedDate(null);
              }}
              style={{ background: "none", border: "none", cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: G.text }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ fontSize: 15, fontWeight: 700, color: G.text, minWidth: 180, textAlign: "center" }}>
              {monthLabel}
            </div>
            <button
              onClick={() => {
                const next = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
                setViewDate(next);
                setSelectedDate(null);
              }}
              style={{ background: "none", border: "none", cursor: "pointer", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: G.text }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5, 6, 0].map((dayNum) => (
              <div key={dayNum} style={{ textAlign: "center", fontSize: 11, color: G.textMid, fontWeight: 600, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {dayLabel(new Date(2024, 0, dayNum))}
              </div>
            ))}
          </div>

          {/* Month grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, minHeight: 200 }}>
            {monthGridDates.map((date, i) => {
              const dateFull = `${date.getFullYear()}-${formatDigit(date.getMonth() + 1)}-${formatDigit(date.getDate())}`;
              const isThisMonth = date.getMonth() === viewDate.getMonth();
              const isToday = isCurrentMonth && dateFull === todayFullStr;
              const isSelected = dateFull === selectedDate;
              const dayEvents = eventMap[dateFull] || [];
              const hasEvents = dayEvents.length > 0;

              // Get unique colors from events (max 3)
              const uniqueColors = [...new Set(dayEvents.map(e => e.color))].slice(0, 3);

              return (
                <div
                  key={i}
                  onClick={() => isThisMonth && setSelectedDate(dateFull)}
                  style={{
                    aspect: "1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 6,
                    borderRadius: 10,
                    background: isSelected && isThisMonth ? "var(--brand-pale)" : isToday ? "rgba(34,197,94,0.1)" : "transparent",
                    border: isToday ? "1.5px solid var(--success)" : isSelected && isThisMonth ? `1.5px solid var(--brand)` : "1px solid transparent",
                    cursor: isThisMonth ? "pointer" : "default",
                    opacity: isThisMonth ? 1 : 0.35,
                    transition: "all 0.15s",
                  }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isToday ? "var(--success)" : "transparent",
                    color: isToday ? "#FFF" : G.text,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: isToday ? 800 : 600,
                  }}>
                    {date.getDate()}
                  </div>
                  {hasEvents && (
                    <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
                      {uniqueColors.map((color, j) => (
                        <div key={j} style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: color,
                        }} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day details */}
        {selectedDate ? (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10 }}>
              {(() => {
                const d = new Date(selectedDate + 'T00:00:00');
                return `${dayLabel(d)} ${d.getDate()}/${formatDigit(d.getMonth() + 1)}/${d.getFullYear()}`;
              })()}
            </div>

            {selectedDayEvents.length > 0 ? (
              <div style={{ background: G.surface, borderRadius: 18, border: `1.5px solid ${G.border}`, overflow: "hidden", marginBottom: 14 }}>
                {selectedDayEvents.map((ev, j, arr) => (
                  <div key={j}>
                    <div
                      onClick={() => !ev.isDemo && handleOpenEventSheet(selectedDate, selectedDate, j)}
                      style={{
                        background: ev.color + "18",
                        borderRadius: 0,
                        padding: "12px 14px",
                        borderLeft: `4px solid ${ev.color}`,
                        cursor: !ev.isDemo ? "pointer" : "default",
                        opacity: ev.isDemo ? 0.65 : 1,
                      }}>
                      <div style={{ fontSize: 13, color: G.text, fontWeight: 700 }}>{ev.member} · {ev.activity}</div>
                      <div style={{ fontSize: 11, color: G.textMid, marginTop: 2 }}>{ev.location} {ev.batch && t("batch_label")}</div>
                    </div>
                    {j < arr.length - 1 && <div style={{ height: 1, background: G.hairline }} />}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: G.textMid, marginBottom: 14, padding: "12px 0" }}>
                {t("calendar_no_events")}
              </div>
            )}

            <button
              onClick={() => handleOpenEventSheet(selectedDate, selectedDate)}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 12,
                background: "var(--brand)",
                color: "#FFF",
                border: "none",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: '"Be Vietnam Pro", sans-serif',
                marginBottom: 14,
              }}>
              + {t("calendar_add_event")}
            </button>
          </>
        ) : (
          <div style={{ fontSize: 13, color: G.textMid, padding: "20px 0", textAlign: "center" }}>
            {t("calendar_pick_date_hint")}
          </div>
        )}

        {/* Medication Schedule Section */}
        {state.habits && state.habits.length > 0 && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
              <img src={ICONS.ui_pill_medicine} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} /> {t("calendar_med_section_title")}
            </div>
            <div style={{ background: G.surface, borderRadius: 18, border: `1.5px solid ${G.border}`, overflow: "hidden", marginBottom: 14 }}>
              {state.habits.map((h, i, arr) => (
                <div key={i}>
                  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={ICONS[h.icon] || h.icon || ICONS.ui_heart_health} alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{h.name}</div>
                      <div style={{ fontSize: 12, color: G.textMid, marginTop: 1 }}>{h.time || t("all_day")}</div>
                    </div>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: h.done ? "var(--success)" : G.hairline,
                      border: h.done ? "2px solid var(--success)" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#fff", fontWeight: 700
                    }}>
                      {h.done && "✓"}
                    </div>
                  </div>
                  {i < arr.length - 1 && <div style={{ height: 1, background: G.hairline, margin: "0 16px" }} />}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Event Add/Edit Sheet */}
        <Sheet open={!!eventSheet} onClose={() => setEventSheet(null)} title={eventSheet?.eventIndex !== null && eventSheet?.eventIndex !== undefined ? t("calendar_edit_event") : t("calendar_add_event")} variant="clinic">
          {eventSheet && (
            <div style={{ padding: "16px 20px 40px", fontFamily: '"Be Vietnam Pro", sans-serif' }}>
              {/* Date info */}
              <div style={{ fontSize: 12, color: G.textMid, marginBottom: 16 }}>
                {(() => {
                  const d = new Date(eventSheet.dateFull + 'T00:00:00');
                  return `${dayLabel(d)} ${d.getDate()}/${formatDigit(d.getMonth() + 1)}/${d.getFullYear()} (${eventSheet.dateFull})`;
                })()}
              </div>

              {/* Member field */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: G.text, display: "block", marginBottom: 6 }}>{t("calendar_event_member")}</label>
                <input
                  type="text"
                  value={eventSheet.member}
                  onChange={(e) => setEventSheet({ ...eventSheet, member: e.target.value })}
                  placeholder="e.g. Mẹ, Bố"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${G.border}`,
                    fontSize: 14,
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Activity field */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: G.text, display: "block", marginBottom: 6 }}>{t("calendar_event_activity")}</label>
                <input
                  type="text"
                  value={eventSheet.activity}
                  onChange={(e) => setEventSheet({ ...eventSheet, activity: e.target.value })}
                  placeholder="e.g. Khám huyết áp"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${G.border}`,
                    fontSize: 14,
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Location field */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: G.text, display: "block", marginBottom: 6 }}>{t("calendar_event_location")}</label>
                <input
                  type="text"
                  value={eventSheet.location}
                  onChange={(e) => setEventSheet({ ...eventSheet, location: e.target.value })}
                  placeholder="e.g. LC Cầu Giấy"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${G.border}`,
                    fontSize: 14,
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Color picker */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: G.text, display: "block", marginBottom: 8 }}>{t("calendar_event_color")}</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["#00923F", "#3B82F6", "#D97706", "#7C3AED"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setEventSheet({ ...eventSheet, color: c })}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: c,
                        border: eventSheet.color === c ? `3px solid ${G.text}` : "2px solid rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                {eventSheet.eventIndex !== null && eventSheet.eventIndex !== undefined && (
                  <button
                    onClick={handleDeleteEvent}
                    disabled={eventSheetLoading}
                    style={{
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(239, 68, 68, 0.1)",
                      color: "#EF4444",
                      border: "1px solid #EF4444",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: eventSheetLoading ? "not-allowed" : "pointer",
                      fontFamily: '"Be Vietnam Pro", sans-serif',
                      flex: 1,
                    }}>
                    {t("calendar_delete_event")}
                  </button>
                )}
                <button
                  onClick={handleSaveEvent}
                  disabled={eventSheetLoading}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    background: eventSheetLoading ? G.hairline : "var(--brand)",
                    color: "#FFF",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: eventSheetLoading ? "not-allowed" : "pointer",
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    flex: 1,
                  }}>
                  {eventSheetLoading ? t("saving") : t("save_changes")}
                </button>
              </div>
            </div>
          )}
        </Sheet>
      </div>
    </div>
  );
}
