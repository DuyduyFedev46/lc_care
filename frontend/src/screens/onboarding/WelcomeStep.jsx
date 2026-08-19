import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";

const STYLE_TAG = `
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
.lc-pill-input-container {
  width: 100%;
  height: 42px;
  background: #FAF5ED;
  border: 1.5px solid rgba(139, 90, 43, 0.18);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
}
.lc-pill-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: "Be Vietnam Pro", "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #4E3E31;
}
.lc-pill-input::placeholder {
  color: #8A7B6E;
  opacity: 0.85;
}
.lc-pill-label {
  font-size: 14px;
  font-weight: 600;
  color: #4E3E31;
}
.lc-pill-gender-toggle {
  display: flex;
  background: #EADDCB;
  border-radius: 9999px;
  padding: 2px;
  align-items: center;
}
.lc-pill-gender-btn {
  background: transparent;
  border: none;
  border-radius: 9999px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 700;
  color: #8D7C6E;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Be Vietnam Pro", "Noto Sans JP", sans-serif;
  line-height: 1;
}
.lc-pill-gender-btn.active {
  background: #FFFFFF;
  color: #4E3E31;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.lc-pill-select {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: "Be Vietnam Pro", "Noto Sans JP", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #4E3E31;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  padding-right: 24px;
}
`;

export default function WelcomeStep() {
  const { t } = useTranslation();
  const { navigate, update, state } = useApp();

  const [fullName, setFullName] = useState(state.userProfile?.fullName || "");
  const [gender, setGender] = useState(state.userProfile?.gender || "female");
  const [yearOfBirth, setYearOfBirth] = useState(state.userProfile?.yearOfBirth || "");
  const [height, setHeight] = useState(state.userProfile?.height || "");
  const [weight, setWeight] = useState(state.userProfile?.weight || "");
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);

  const years = Array.from({ length: 2016 - 1930 + 1 }, (_, i) => String(2016 - i));

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setError(t("validation_name_short"));
      return;
    }
    if (!yearOfBirth) {
      setError(t("validation_birth_year_required"));
      return;
    }
    const yearVal = parseInt(yearOfBirth, 10);
    if (isNaN(yearVal) || yearVal < 1900 || yearVal > 2016) {
      setError(t("validation_birth_year_range"));
      return;
    }
    const h = parseInt(height, 10);
    const w = parseInt(weight, 10);
    if (isNaN(h) || h < 100 || h > 250) {
      setError(t("validation_height"));
      return;
    }
    if (isNaN(w) || w < 30 || w > 200) {
      setError(t("validation_weight"));
      return;
    }

    setError("");
    update({
      userProfile: {
        fullName: fullName.trim(),
        gender,
        yearOfBirth: String(yearVal),
        height: String(h),
        weight: String(w),
        careFor: "self",
      },
    });
    navigate("health-scan");
  };

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div style={styles.root}>
        <div style={styles.bgLayer}>
          <img src="/assets/onboarding/bg_welcome.png" alt="" className="bg-image-responsive" />
        </div>

        <div style={styles.mascotBubble}>
          {t("hello")}<br />{t("who_are_you")}
          <div style={styles.mascotBubbleTail} />
        </div>

        <div style={styles.header} />

        <div style={styles.ctaLayer}>
          <div style={{ flex: 1 }} />

          <div style={styles.ctaCard}>
            {error && (
              <div style={{ fontSize: 13, color: "#EF4444", marginBottom: 6, fontWeight: 700, textAlign: "center" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleNext} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="lc-pill-input-container">
                <input
                  className="lc-pill-input"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setError(""); }}
                  type="text"
                  placeholder={t("full_name")}
                />
              </div>

              <div className="lc-pill-input-container" style={{ justifyContent: "space-between" }}>
                <span className="lc-pill-label">{t("gender")}</span>
                <div className="lc-pill-gender-toggle">
                  <button type="button" onClick={() => { setGender("male"); setError(""); }}
                    className={`lc-pill-gender-btn ${gender === "male" ? "active" : ""}`}>
                    {t("gender_male")}
                  </button>
                  <button type="button" onClick={() => { setGender("female"); setError(""); }}
                    className={`lc-pill-gender-btn ${gender === "female" ? "active" : ""}`}>
                    {t("gender_female")}
                  </button>
                </div>
              </div>

              <div className="lc-pill-input-container" style={{ position: "relative" }}>
                <select
                  value={yearOfBirth}
                  onChange={(e) => { setYearOfBirth(e.target.value); setError(""); }}
                  className="lc-pill-select"
                  style={{ color: yearOfBirth === "" ? "#8A7B6E" : "#4E3E31" }}
                >
                  <option value="" disabled hidden>{t("birth_year")}</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <div style={styles.selectChevron}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 2L6 6L11 2" stroke="#5D4D3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, width: "100%" }}>
                <div className="lc-pill-input-container" style={{ flex: 1 }}>
                  <input className="lc-pill-input" value={height}
                    onChange={(e) => { setHeight(e.target.value); setError(""); }}
                    type="number" placeholder={t("height_cm")} />
                </div>
                <div className="lc-pill-input-container" style={{ flex: 1 }}>
                  <input className="lc-pill-input" value={weight}
                    onChange={(e) => { setWeight(e.target.value); setError(""); }}
                    type="number" placeholder={t("weight_kg")} />
                </div>
              </div>

              {height && weight && (
                <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 700, textAlign: "center", marginTop: 2 }}>
                  {t("bmi_label")} {(weight / ((height / 100) ** 2)).toFixed(1)}
                </div>
              )}

              <button
                type="submit"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{ ...styles.submitBtn, ...(btnHover ? styles.submitBtnHover : {}) }}
              >
                {t("continue_plain")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  root: { position: "relative", width: "100%", height: "100%", overflow: "hidden", fontFamily: '"Be Vietnam Pro", "Noto Sans JP", "Inter", sans-serif' },
  bgLayer: { position: "absolute", inset: 0, zIndex: 0 },
  header: { position: "absolute", top: "calc(10px + var(--sat, 0px))", left: 0, right: 0, height: 44, zIndex: 10 },
  ctaLayer: { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", padding: "0 12px 16px", boxSizing: "border-box" },
  ctaCard: { padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 365, maxHeight: "62dvh", alignSelf: "center", marginBottom: "calc(20px + env(safe-area-inset-bottom, 0px))", boxSizing: "border-box" },
  submitBtn: { alignSelf: "center", background: "#FCEEDB", border: "1.5px solid rgba(139, 90, 43, 0.15)", borderRadius: 9999, padding: "9px 32px", fontSize: 15, fontWeight: 700, color: "#4E3E31", cursor: "pointer", transition: "all 0.2s ease", fontFamily: '"Be Vietnam Pro", "Noto Sans JP", sans-serif', marginTop: 4, boxShadow: "0 4px 12px rgba(93, 77, 61, 0.08)", lineHeight: 1 },
  submitBtnHover: { background: "#FAF0E2", transform: "scale(1.03)", boxShadow: "0 6px 16px rgba(93, 77, 61, 0.12)" },
  selectChevron: { position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex", alignItems: "center" },
  mascotBubble: { position: "absolute", top: "7%", left: "10%", width: "190px", background: "#FFFFFF", border: "2px solid #2B3E51", borderRadius: "20px 20px 20px 4px", padding: "10px 14px", fontSize: 16, fontWeight: 700, color: "rgba(43, 62, 81, 0.8)", boxShadow: "0 6px 20px rgba(93, 77, 61, 0.08)", zIndex: 3, textAlign: "center", lineHeight: 1.4, boxSizing: "border-box" },
  mascotBubbleTail: { position: "absolute", bottom: -8, right: 24, width: 12, height: 12, background: "#FFFFFF", borderRight: "2px solid #2B3E51", borderBottom: "2px solid #2B3E51", transform: "rotate(45deg)" },
};
