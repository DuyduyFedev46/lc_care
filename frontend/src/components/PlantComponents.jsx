// Long Chau Care — Plant Hero: hiển thị ảnh cây từ assets có sẵn
import { G } from "../components/DesignTokens";
import { PLANTS_DATA, ICONS } from "../config/constants";

// Plants with processed growth stage images (all 16 plants have lv1-lv5 webp)
const PROCESSED_PLANTS = new Set([
  "ginger", "lemongrass", "lotus",
  "turmeric", "pennywort", "perilla", "tea",
  "mint", "basil", "aloe", "licorice",
  "bittermelon", "lavender", "ginseng", "eucommia", "phyllanthus"
]);

export const ROOT_FILE_MAP = {
  ginger: "gung",
  turmeric: "nghe",
  lemongrass: "sa",
  pennywort: "rauma",
  lotus: "sen",
  perilla: "tiato",
  tea: "tra",
  mint: "bacha",
  basil: "hungque",
  aloe: "lohoi",
  licorice: "camthao",
  bittermelon: "khoqua",
  lavender: "oaihuong",
  ginseng: "nhansam",
  eucommia: "dotrong",
  phyllanthus: "diephachau",
};

export function GenericGrowthStage({ stage, size = 120, plantColor = "#10B981", plantColorPale = "#D1FAE5", hidePot = false }) {
  const viewBox = hidePot ? "38 68 44 44" : "0 0 120 160";
  const aspect = hidePot ? 1 : 160 / 120;
  const height = size * aspect;
  return (
    <svg viewBox={viewBox} width={size} height={height} style={{ overflow: "visible", display: "block" }}>
      {/* Shadow under the pot */}
      {!hidePot && <ellipse cx="60" cy="156" rx="28" ry="4" fill="rgba(0,0,0,0.06)" />}
      
      {/* Pot body */}
      {!hidePot && <path d="M34,115 L38,153 L82,153 L86,115 Z" fill="#D97706" opacity="0.85" />}
      {!hidePot && <path d="M34,115 L38,153 L60,153 Z" fill="#F59E0B" opacity="0.15" />}
      
      {/* Pot rim */}
      {!hidePot && <rect x="28" y="108" width="64" height="10" rx="4" fill="#B45309" />}
      {!hidePot && <rect x="30" y="109" width="60" height="3" rx="1.5" fill="#F59E0B" opacity="0.3" />}
      
      {/* Soil in pot */}
      {!hidePot && <ellipse cx="60" cy="111" rx="27" ry="4.5" fill="#451A03" />}
      
      {/* Plant growth based on stage */}
      {stage === 1 && (
        <g>
          {/* Seed/Tiny shoot */}
          <path d="M60,111 Q57,105 57,102 Q61,104 60,111" fill={plantColor} />
          <path d="M59,111 Q63,106 64,104 Q62,109 59,111" fill={plantColor} opacity="0.8" />
        </g>
      )}
      
      {stage === 2 && (
        <g>
          {/* Stem */}
          <path d="M60,111 Q58,98 56,92" stroke={plantColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Left cotyledon leaf */}
          <path d="M56,92 Q47,90 46,94 Q52,96 56,92" fill={plantColor} />
          {/* Right cotyledon leaf */}
          <path d="M56,92 Q65,88 66,92 Q60,95 56,92" fill={plantColor} opacity="0.9" />
        </g>
      )}
      
      {stage === 3 && (
        <g>
          {/* Stem */}
          <path d="M60,111 Q59,94 58,80" stroke={plantColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          
          {/* Lower left leaf branch */}
          <path d="M59,96 Q50,94 46,98" stroke={plantColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M46,98 Q38,98 39,94 Q44,94 46,98" fill={plantColor} />
          
          {/* Lower right leaf branch */}
          <path d="M59,91 Q68,88 72,92" stroke={plantColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M72,92 Q80,90 79,94 Q74,96 72,92" fill={plantColor} opacity="0.9" />
          
          {/* Top leaves */}
          <path d="M58,80 Q50,75 51,70 Q56,73 58,80" fill={plantColor} />
          <path d="M58,80 Q66,74 67,79 Q62,82 58,80" fill={plantColor} opacity="0.85" />
        </g>
      )}
    </svg>
  );
}

export function PlantHero({ plantId, level = 1, size = 200, glow = false, animate = true, hidePot = false }) {
  const plant = PLANTS_DATA[plantId];
  if (!plant) return null;

  const stage = Math.min(Math.max(level || 1, 1), 5);

  let renderContent;
  if (!PROCESSED_PLANTS.has(plantId) && stage <= 3) {
    renderContent = (
      <GenericGrowthStage
        stage={stage}
        size={hidePot ? size * 1.4 : size * 0.7}
        plantColor={plant.color}
        plantColorPale={plant.colorPale}
        hidePot={hidePot}
      />
    );
  } else {
    let imgSrc;
    if (PROCESSED_PLANTS.has(plantId)) {
      imgSrc = `/assets/plants/plant_${plantId}_lv${stage}.webp`;
    } else {
      if (stage === 4) {
        imgSrc = plant.icon;
      } else if (stage === 5) {
        imgSrc = `/assets/plants/plant_${plantId}_lv5.webp`;
      }
    }

    renderContent = imgSrc ? (
      <img
        src={imgSrc}
        alt={plant.name}
        style={{ width: "90%", height: "90%", objectFit: "contain", imageRendering: "auto" }}
        onError={(e) => {
          if (plant.icon && e.target.src !== plant.icon) {
            e.target.src = plant.icon;
          } else {
            e.target.style.display = "none";
            const fb = e.target.parentNode?.querySelector(".plant-fallback");
            if (fb) fb.style.display = "flex";
          }
        }}
      />
    ) : (
      <span style={{ fontSize: size * 0.4, display: "flex", alignItems: "center", justifyContent: "center" }}>{plant.emoji}</span>
    );
  }

  return (
    <div style={{
      width: size, height: size * 1.15, borderRadius: hidePot ? "none" : "50%", position: "relative",
      display: "flex", alignItems: hidePot ? "flex-end" : "center", justifyContent: "center",
      animation: animate ? "plantSway 4s ease-in-out infinite" : "none",
      filter: hidePot
        ? (glow ? `drop-shadow(0 0 12px ${plant.color}aa)` : "none")
        : (glow
          ? `drop-shadow(0 0 18px ${plant.color}88) drop-shadow(0 12px 24px rgba(0,0,0,0.18))`
          : `drop-shadow(0 12px 24px rgba(0,0,0,0.12))`),
    }}>
      {renderContent}
      <span className="plant-fallback" style={{
        display: "none", fontSize: size * 0.4, position: "absolute",
        alignItems: "center", justifyContent: "center",
      }}>{plant.emoji}</span>
    </div>
  );
}

// Generic Seed (trước khi Dược sĩ duyệt)
export function SeedPlant({ size = 110, sparkle = false, hidePot = false }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg viewBox="0 0 120 160" width={size} height={size * 160 / 120} style={{ overflow: "visible", display: "block" }}>
        {!hidePot && <path d="M32,115 L36,155 L84,155 L88,115 Z" fill="#C07040" />}
        {!hidePot && <rect x="26" y="109" width="68" height="11" rx="5" fill="#A0582C" />}
        {!hidePot && <rect x="28" y="109" width="64" height="4" rx="3" fill="#D4885A" opacity="0.45" />}
        {!hidePot && <ellipse cx="60" cy="115" rx="32" ry="6" fill="#3A1E08" />}
        {!hidePot && <ellipse cx="60" cy="113" rx="27" ry="4.5" fill="#5C3318" />}
        <ellipse cx="60" cy="110" rx="9" ry="4" fill="#98C060" />
        <path d="M60,110 Q54,96 50,88" stroke="#5AA030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M60,110 Q66,96 70,88" stroke="#5AA030" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="87" rx="5" ry="3" fill="#7BC048" transform="rotate(-25,50,87)" />
        <ellipse cx="70" cy="87" rx="5" ry="3" fill="#7BC048" transform="rotate(25,70,87)" />
      </svg>
      {sparkle && ["✨", "✨", "✨"].map((s, i) => (
        <span key={i} style={{
          position: "absolute", fontSize: 16 + i * 4,
          top: [10, 22, 2][i], left: [-18, size - 10, -8][i],
          animation: `sparkleFloat ${1.2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
          pointerEvents: "none",
        }}>{s}</span>
      ))}
    </div>
  );
}

// Plant card hiển thị tên + level (dùng trong Garden Hero)
export function PlantCard({ plantId, level = 1, glow = false, onClick }) {
  const plant = PLANTS_DATA[plantId];
  if (!plant) return null;

  // Use plant icon or emoji fallback
  const iconSrc = plant.icon;

  return (
    <div onClick={onClick} style={{
      background: G.surface, borderRadius: 24, padding: "20px",
      border: `1.5px solid ${G.border}`,
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      position: "relative", overflow: "hidden", cursor: onClick ? "pointer" : "default",
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${plant.colorPale}, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ animation: "plantSway 4s ease-in-out infinite", transformOrigin: "center bottom" }}>
        <PlantHero plantId={plantId} level={level} size={90} glow={glow} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: G.text, display: "flex", alignItems: "center", gap: 6 }}>
          {iconSrc ? (
            <img src={iconSrc} alt={plant.name} style={{ width: 24, height: 24, objectFit: "contain" }} onError={(e) => { e.target.style.display = "none"; }} />
          ) : (
            <span style={{ fontSize: 20 }}>{plant.emoji}</span>
          )}
          {plant.name}
        </div>
        <div style={{ fontSize: 13, color: "var(--success)", fontWeight: 700, marginTop: 2 }}>
          Level {level} — {plant.stageNames[level]}
        </div>
        <div style={{ fontSize: 11, color: G.textMid, fontWeight: 600, letterSpacing: 0.5, marginTop: 3 }}>
          {plant.journeyLabel.toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: G.textLight, marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>
          "{plant.story}"
        </div>
      </div>
    </div>
  );
}
