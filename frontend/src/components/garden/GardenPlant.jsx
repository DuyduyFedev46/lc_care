// GardenPlant — một cây thảo dược đặt lên đảo vườn 2D
// Dùng ảnh webp thật từ assets/plants/
import { PLANTS_DATA } from "../../config/constants";

// Map plant ID → fallback icon
const PLANT_ICON = {
  ginger: "/assets/icons/plant_ginger.webp",
  turmeric: "/assets/icons/plant_turmeric.webp",
  lemongrass: "/assets/icons/plant_lemongrass.webp",
  lotus: "/assets/icons/plant_lotus.webp",
  pennywort: "/assets/icons/plant_pennywort.webp",
  perilla: "/assets/icons/plant_perilla.webp",
  tea: "/assets/icons/plant_tea.webp",
  mint: "/assets/icons/plant_mint.webp",
  basil: "/assets/icons/plant_basil.webp",
  aloe: "/assets/icons/plant_aloe.webp",
  licorice: "/assets/icons/plant_licorice.webp",
};

export default function GardenPlant({ plantId, label, x, y, size = 64 }) {
  const plant = PLANTS_DATA[plantId];
  const assetPath = `/assets/plants/plant_${plantId}_lv5.webp`;
  const iconPath = PLANT_ICON[plantId] || "/assets/icons/plant_ginger.webp";

  return (
    <div style={{
      position: "absolute",
      left: x,
      top: y,
      transform: "translate(-50%, -50%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      zIndex: 5,
      transition: "transform 0.2s ease",
    }}>
      {/* Plant image circle */}
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 60%, ${plant?.colorPale || "#E8F5EE"} 0%, ${plant?.colorPale || "#E8F5EE"}44 55%, transparent 75%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
      }}>
        {assetPath ? (
          <img src={assetPath} alt={label}
            style={{ width: "78%", height: "78%", objectFit: "contain" }}
            onError={(e) => { if (iconPath) e.target.src = iconPath; }} />
        ) : iconPath ? (
          <img src={iconPath} alt={label}
            style={{ width: "65%", height: "65%", objectFit: "contain" }} />
        ) : (
          <span style={{ fontSize: size * 0.4 }}>{plant?.emoji || "🌱"}</span>
        )}
      </div>

      {/* Label */}
      <span style={{
        fontSize: 10, fontWeight: 700, color: "#3E2723",
        marginTop: 2,
        background: "rgba(255,255,255,0.88)",
        padding: "2px 8px", borderRadius: 10,
        whiteSpace: "nowrap",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}>{label}</span>
    </div>
  );
}
