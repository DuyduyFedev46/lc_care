// LC Care UI — ProfileButton primitive
// Avatar button → navigate to profile. Copy-pasted 3× before.
// Used in: GardenScreen header, AppHeader (SharedUI), CarePlanScreen

import { ICONS } from "../../config/constants";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

/**
 * @param {object} props
 * @param {"garden"|"clinic"} [props.variant="clinic"]
 * @param {number} [props.size=36]
 * @param {function} [props.onClick] - defaults to navigate("profile")
 */
export default function ProfileButton({ variant = "clinic", size = 36, onClick }) {
  const { navigate, state } = useApp();
  const { t } = useTranslation();
  const avatar = state?.userProfile?.avatar || ICONS.avatar_mom;
  const handleClick = onClick ?? (() => navigate("profile"));

  const isGarden = variant === "garden";

  return (
    <button
      onClick={handleClick}
      aria-label={t("aria_profile")}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${isGarden ? "#059669" : "var(--brand)"}`,
        background: isGarden
          ? "rgba(253, 251, 247, 0.95)"
          : "var(--glass-clinic-bg)",
        padding: 2,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isGarden
          ? "var(--elev-garden-1)"
          : "var(--elev-1)",
        ...(isGarden ? {
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        } : {}),
        transition: "transform var(--dur-fast) var(--ease-out)",
        flexShrink: 0,
      }}
    >
      <img
        src={avatar}
        alt="Avatar"
        style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
      />
    </button>
  );
}
