// Màn 1.6 — Plant Select: Chọn cây ưu tiên (Real plant images, vertical cards)
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { G, lcStyles } from "../../components/DesignTokens";
import { OnboardingProgress, SpeechBubble } from "../../components/SharedUI";
import { PLANTS_DATA, ICONS } from "../../config/constants";

import { PLANT_GROUPS } from "../../config/plantAssignment";

const STYLE_TAG = `
.bg-image-responsive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}
`;

const PLANT_OPTIONS = [
  {
    id: "bittermelon",
    image: "/assets/plants/plant_bittermelon_lv5.webp",
    color: "#65A30D",
  },
  {
    id: "ginger",
    image: "/assets/plants/plant_ginger_lv5.webp",
    color: "#00923F",
  },
  {
    id: "lemongrass",
    image: "/assets/plants/plant_lemongrass_lv5.webp",
    color: "#4A8A40",
  },
];

// Find group ID (G1-G15) by plant key
function findGroupId(plantKey) {
  const entry = Object.entries(PLANT_GROUPS).find(([, v]) => v.plant === plantKey);
  return entry ? entry[0] : null;
}

export default function PlantSelectStep() {
  const { t } = useTranslation();
  const { navigate, update } = useApp();
  const [selected, setSelected] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const handleSelect = (plantId) => {
    setSelected(plantId);
    const plantData = PLANTS_DATA[plantId];
    const groupId = findGroupId(plantId);
    update({
      assignedPlant: {
        plant: plantId,
        label: plantData?.name,
        emoji: plantData?.emoji,
        group: groupId,
        color: plantData?.color,
        colorPale: plantData?.colorPale,
        needsPharmacist: plantData?.conditionSource === "doctor_prescription",
      },
    });
  };

  const handleBack = () => {
    if (selected) {
      const plantData = PLANTS_DATA[selected];
      const groupId = findGroupId(selected);
      update({
        assignedPlant: {
          plant: selected,
          label: plantData?.name,
          emoji: plantData?.emoji,
          group: groupId,
          color: plantData?.color,
          colorPale: plantData?.colorPale,
          needsPharmacist: plantData?.conditionSource === "doctor_prescription",
        },
      });
    }
    navigate("habits");
  };

  const handleNext = () => {
    navigate("seed-planted");
  };

  return (
    <>
      <style>{STYLE_TAG}</style>
      <div style={styles.root}>
        {/* Layer 1 — Background Image */}
        <div style={styles.bgLayer}>
          <img
            src="/assets/onboarding/bg_comic_p4.png"
            alt=""
            className="bg-image-responsive"
          />
        </div>

        {/* Speech Bubble — floats above mascot head */}
        <SpeechBubble text={t("select_plant_prompt")} />

        {/* Floating Transparent Header */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={handleBack}>
            <img src={ICONS.ui_back_arrow} alt="back" style={{ width: 22, height: 22, objectFit: "contain" }} />
          </button>
        </div>
        <OnboardingProgress step={4} total={5} />

        {/* Layer 2 — UI controls */}
        <div style={styles.ctaLayer}>
          <div style={{ flex: 1 }} />

          <div style={styles.ctaCard}>
            {/* Scrollable content container */}
            <div style={{ flex: 1, overflowY: "auto", paddingRight: 4, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11, color: "#645A4D", textAlign: "center", marginBottom: 4, lineHeight: 1.4 }}>
                {t("select_plant_desc")}
              </div>

              {/* Plant Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PLANT_OPTIONS.map(plant => {
                  const active = selected === plant.id;
                  return (
                    <button
                      key={plant.id}
                      onClick={() => handleSelect(plant.id)}
                      style={{
                        width: "100%", padding: "10px 14px", borderRadius: 20,
                        display: "flex", alignItems: "center", gap: 10,
                        border: active ? `2.5px solid ${plant.color}` : "1.5px solid rgba(139, 90, 43, 0.18)",
                        background: "#FAF5ED",
                        transition: "all 0.2s ease", cursor: "pointer", textAlign: "left",
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                        boxShadow: active ? `0 4px 12px ${plant.color}15` : "0 2px 6px rgba(93, 77, 61, 0.04)",
                        boxSizing: "border-box",
                      }}
                    >
                      {/* Plant Image */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${plant.color}15`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, overflow: "hidden",
                      }}>
                        <img
                          src={plant.image}
                          alt={plant.name}
                          style={{ width: 34, height: 34, objectFit: "contain" }}
                        />
                      </div>

                      {/* Plant Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#4E3E31", marginBottom: 2 }}>
                          {t(`plant_${plant.id}`)}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: plant.color, marginBottom: 2 }}>
                          {t(`plant_select_tag_${plant.id}`)}
                        </div>
                        <div style={{ fontSize: 10, color: "#8A7B6E", fontStyle: "italic" }}>
                          "{t(`plant_select_story_${plant.id}`)}"
                        </div>
                      </div>

                      {/* Check indicator */}
                      {active && (
                        <img
                          src={ICONS.ui_check_circle}
                          alt=""
                          style={{ width: 18, height: 18, objectFit: "contain", flexShrink: 0 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky footer button container */}
            <div style={{ flexShrink: 0, marginTop: 8, display: "flex", flexDirection: "column" }}>
              <button
                style={{
                  ...styles.ctaButton,
                  opacity: selected ? 1 : 0.5,
                  cursor: selected ? "pointer" : "not-allowed",
                  ...(btnHover && selected ? styles.ctaButtonHover : {}),
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                onClick={selected ? handleNext : undefined}
                disabled={!selected}
              >
                {t("next")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    fontFamily: '"Be Vietnam Pro", "Inter", sans-serif',

  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
  header: {
    position: "absolute",
    top: "calc(10px + var(--sat, 0px))",
    left: 0,
    right: 0,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    zIndex: 10,
  },
  backBtn: {
    background: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(139, 90, 43, 0.2)",
    width: 32,
    height: 32,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  ctaLayer: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0 12px 16px",
    boxSizing: "border-box",
  },
  ctaCard: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(224, 242, 254, 0.88) 100%)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1.5px solid rgba(255, 255, 255, 0.7)",
    borderRadius: 24,
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
    width: "100%",
    maxWidth: 365,
    maxHeight: "62dvh",
    alignSelf: "center",
    marginBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
    boxSizing: "border-box",
  },
  ctaButton: {
    alignSelf: "center",
    background: "#FCEEDB",
    border: "1.5px solid rgba(139, 90, 43, 0.15)",
    borderRadius: 9999,
    padding: "9px 32px",
    fontSize: 15,
    fontWeight: 700,
    color: "#4E3E31",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: '"Be Vietnam Pro", sans-serif',
    marginTop: 4,
    boxShadow: "0 4px 12px rgba(93, 77, 61, 0.08)",
    lineHeight: 1,
  },
  ctaButtonHover: {
    background: "#FAF0E2",
    transform: "scale(1.03)",
    boxShadow: "0 6px 16px rgba(93, 77, 61, 0.12)",
  },
};
