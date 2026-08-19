// Long Chau Care — PWA Full Page
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { AppProvider, useApp } from "./context/AppContext";

// Detect invite token in URL on first load and persist to localStorage
function detectInviteToken() {
  const params = new URLSearchParams(window.location.search);
  const invite = params.get("invite");
  if (invite) {
    localStorage.setItem("lc_care_invite_token", invite);
    // Clean the URL without reloading (keeps UX clean)
    params.delete("invite");
    const newSearch = params.toString();
    const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "");
    window.history.replaceState({}, "", newUrl);
  }
}
import { G } from "./components/DesignTokens";
import { BottomNav, Toast } from "./components/SharedUI";
import ErrorBoundary from "./components/ErrorBoundary";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";
import GardenScreen from "./screens/garden/GardenScreen";
import WaterScreen from "./screens/garden/WaterScreen";
import GerminationScreen from "./screens/garden/GerminationScreen";
import LevelUpScreen from "./screens/garden/LevelUpScreen";
import VoucherScreen from "./screens/voucher/VoucherScreen";
import FamilyScreen from "./screens/family/FamilyScreen";
import CalendarScreen from "./screens/family/CalendarScreen";
import CarePlanScreen from "./screens/careplan/CarePlanScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import PharmacistScreen from "./screens/pharmacist/PharmacistScreen";
import HealthTrackingScreen from "./screens/health/HealthTrackingScreen";

import LoginScreen from "./screens/auth/LoginScreen";
import OrderForScreen from "./screens/family/OrderForScreen";
import AchievementsScreen from "./screens/achievements/AchievementsScreen";
import FigmaTestScreen from "./screens/figma/FigmaTestScreen";
import MedicineReminderCard from "./components/figma/MedicineReminderCard";

const ONBOARDING_SCREENS = ["welcome", "health-scan", "habits", "plant-select", "seed-planted"];
const MAIN_TAB_SCREENS = ["home", "tab-family", "tab-care", "voucher"];




function AppRouter() {
  const { screen, navigate, state, update, toast, showToast, waterHabit, logout, initializeApp } = useApp();
  const { t } = useTranslation();

  // Sync data-screen attribute on body for CSS-driven per-screen backgrounds
  // (global.css handles [data-screen="…"] selectors — no more imperative JS bg sync)
  useEffect(() => {
    document.body.setAttribute("data-screen", screen || "");
    return () => document.body.removeAttribute("data-screen");
  }, [screen]);

  // 1. Kiểm tra trạng thái tải Auth
  if (state.authLoading) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: "100%", height: "100%", background: "var(--bg)", fontFamily: '"Be Vietnam Pro", sans-serif'
      }}>
        <div style={{
          width: 50, height: 50, border: "4px solid #D6E4FF", borderTop: "4px solid #1250DC",
          borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 16
        }} />
        <div style={{ color: "#1250DC", fontWeight: 700, fontSize: 16 }}>{t("connecting")}</div>
      </div>
    );
  }

  // 2. Kiểm tra nếu chưa đăng nhập -> Hiển thị LoginScreen
  if (!state.authUser) {
    return (
      <>
        <LoginScreen onLoginSuccess={({ role, uid, phone }) => {
          if (uid) {
            update({
              authUser: { uid, isMock: true },
              authRole: role,
              initialized: false,
              userProfile: {
                ...state.userProfile,
                phone: phone,
              }
            });
            // Must call initializeApp explicitly for mock login path.
            // onAuthStateChanged only fires for Firebase Auth, not mock setState.
            initializeApp(role);
          }
        }} />
        {toast && <Toast message={toast} />}
      </>
    );
  }

  // 2.5 Đã login nhưng chưa load xong data → show spinner (tránh flicker Welcome → Home)
  if (!state.initialized) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: "100%", height: "100%", background: "var(--bg)", fontFamily: '"Be Vietnam Pro", sans-serif'
      }}>
        <div style={{
          width: 50, height: 50, border: "4px solid #D6E4FF", borderTop: "4px solid #1250DC",
          borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 16
        }} />
        <div style={{ color: "#1250DC", fontWeight: 700, fontSize: 16 }}>{t("loading_data")}</div>
      </div>
    );
  }

  // 3. Tự động chuyển hướng vai trò khi đã đăng nhập
  const hasPlant = state.plant || state.assignedPlant || state.seedPlanted;
  const isPharmacist = state.authRole === "pharmacist";

  if (state.error && ONBOARDING_SCREENS.includes(screen)) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        width: "100%", height: "100%", background: "var(--bg)", fontFamily: '"Be Vietnam Pro", sans-serif',
        padding: "0 24px", textAlign: "center", gap: 16,
      }}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>🔌</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{t("connection_lost")}</div>
        <div style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.6, maxWidth: 280 }}>
          {state.error}
        </div>
        <button
          onClick={() => { update({ error: null }); initializeApp(); }}
          style={{
            height: 44, borderRadius: 14, padding: "0 28px",
            background: "#1250DC", color: "#FFF", border: "none",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: '"Be Vietnam Pro", sans-serif',
          }}
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  if (isPharmacist && screen !== "pharmacist") {
    setTimeout(() => navigate("pharmacist"), 0);
  } else if (!isPharmacist && screen === "pharmacist") {
    setTimeout(() => navigate(hasPlant ? "home" : "welcome"), 0);
  } else if (!isPharmacist && (state.plant || state.seedPlanted) && ONBOARDING_SCREENS.includes(screen)) {
    // Returning user: already has plant data → skip onboarding, go to home
    if (!window.__disableOnboardingRedirect) {
      setTimeout(() => navigate("home"), 0);
    }
  }

  const renderScreen = () => {
    let cmp;
    if (ONBOARDING_SCREENS.includes(screen)) {
      cmp = <OnboardingScreen />;
    } else {
      switch (screen) {
        case "home": cmp = <GardenScreen />; break;
        case "water-action": cmp = <WaterScreen />; break;
        case "germination": cmp = <GerminationScreen />; break;
        case "level-up": cmp = <LevelUpScreen />; break;
        case "voucher": cmp = <VoucherScreen />; break;
        case "tab-family": cmp = <FamilyScreen />; break;
        case "tab-calendar":
          setTimeout(() => navigate("tab-care"), 0);
          return null;
        case "tab-care": cmp = <CarePlanScreen />; break;
        case "tab-profile": 
          setTimeout(() => navigate("profile"), 0);
          return null;
        case "profile": cmp = <ProfileScreen />; break;
        case "pharmacist": cmp = <PharmacistScreen />; break;
        case "health-tracking": cmp = <HealthTrackingScreen />; break;
        case "order-for": cmp = <OrderForScreen />; break;
        case "achievements": cmp = <AchievementsScreen />; break;
        case "figma-test": cmp = <FigmaTestScreen onBack={() => navigate("home")} />; break;
        case "figma-component": cmp = <MedicineReminderCard onBack={() => navigate("home")} />; break;
        default: cmp = <GardenScreen />; break;
      }
    }
    return <ErrorBoundary key={screen}>{cmp}</ErrorBoundary>;
  };

  const showNav = MAIN_TAB_SCREENS.includes(screen);

  return (
    <>
      <ErrorBoundary>
        <div
          data-screen={screen}
          style={{
            display: "flex", flexDirection: "column", width: "100%", height: "100%",
            position: "relative", overflow: "hidden",
          }}>
          <div key={screen} style={{
            flex: 1, display: "flex", flexDirection: "column", width: "100%", overflow: "hidden",
            animation: "slideIn 0.25s ease",
          }}>
            {renderScreen()}
          </div>
          {showNav && !isPharmacist && screen === "home" && (
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 140,
              background: "linear-gradient(to top, rgba(45, 37, 30, 0.45) 0%, rgba(45, 37, 30, 0) 100%)",
              pointerEvents: "none",
              zIndex: 90,
            }} />
          )}
          {showNav && !isPharmacist && <BottomNav currentScreen={screen} navigate={navigate} />}
        </div>
      </ErrorBoundary>
      {toast && <Toast message={toast} />}
    </>
  );
}


export default function App() {
  // Run invite detection once before React renders
  detectInviteToken();
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

// ANIM_CSS removed — all keyframes now live in src/theme/global.css
