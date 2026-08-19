// Long Chau Care — Global State
import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth, requestNotificationPermission, onForegroundMessage } from "../services/firebase";
import { useFitnessSync } from "../hooks/useFitnessSync";
import i18n, { resolveInitialLang } from "../i18n";

export const AppContext = createContext(null);

const INITIAL_STATE = {
  userProfile: {
    fullName: "",
    gender: "female",
    yearOfBirth: "1985",
    careFor: "self",
    healthStatus: "healthy",
    exercise: "sometimes",
    chronicSubConditions: [],
    cycleData: null,
    lifeChanges: [],
    badHabits: [],
  },
  assignedPlant: null,
  carePlans: [],
  ocrResults: {},
  streak: 0,
  points: 0,
  plant: null,
  habits: [],
  planId: "plan-1",
  familyMembers: [],
  todayWatered: false,
  seedPlanted: false,
  plantActivated: false,
  plantApproval: null,
  plantSummary: null,
  loading: false,
  error: null,
  initialized: false,
  authUser: null,
  authRole: "user",
  authLoading: true,
  language: resolveInitialLang(),
};


export function AppProvider({ children }) {
  const authRoleRef = useRef("user");
  const [screenStack, setScreenStack] = useState(["welcome"]);
  const screen = screenStack[screenStack.length - 1];
  const prevScreen = screenStack.length > 1 ? screenStack[screenStack.length - 2] : null;
  const [state, setState] = useState(INITIAL_STATE);
  const [toast, setToast] = useState(null);
  const [animDir, setAnimDir] = useState(1);

  // Sync HTML lang attribute with resolved language on mount
  useEffect(() => {
    const lang = resolveInitialLang();
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
  }, []);

  // Keep authRoleRef in sync with state.authRole
  useEffect(() => {
    authRoleRef.current = state.authRole;
  }, [state.authRole]);

  const navigate = useCallback((s) => {
    setAnimDir(1);
    setScreenStack((prev) => [...prev, s]);
  }, []);

  const goBack = useCallback(() => {
    setScreenStack((prev) => {
      if (prev.length > 1) {
        setAnimDir(-1);
        return prev.slice(0, -1);
      }
      return prev;
    });
  }, []);

  const update = useCallback((patch) => {
    setState((prev) => {
      if (typeof patch === 'function') return { ...prev, ...patch(prev) };
      if (patch.userProfile) {
        return {
          ...prev,
          ...patch,
          userProfile: { ...prev.userProfile, ...patch.userProfile }
        };
      }
      return { ...prev, ...patch };
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const waterHabit = useCallback(async (habitId) => {
    let oldState;
    setState((prev) => {
      oldState = prev;
      const habits = prev.habits.map((h) =>
        h.id === habitId ? { ...h, done: true } : h
      );
      return {
        ...prev,
        habits,
        points: prev.points + 10,
        todayWatered: true,
        streak: prev.todayWatered ? prev.streak : prev.streak + 1,
      };
    });

    // Sync to backend
    try {
      const { dataService } = await import("../services/dataService");
      await dataService.waterPlant(habitId);
    } catch (e) {
      console.error("Failed to water plant on server", e);
      showToast(i18n.t("server_error"));
      if (oldState) {
        setState(oldState);
      }
    }
  }, [showToast]);

  const submitOnboarding = useCallback(async (profile, assignedPlant, familyMembers, ocrResults) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { dataService } = await import("../services/dataService");
      const result = await dataService.submitOnboarding({
        userProfile: profile,
        assignedPlants: { primary: assignedPlant, secondary: null, all: assignedPlant ? [assignedPlant] : [] },
        familyMembers,
        ocrResults,
      });

      const safeResult = result && typeof result === "object" ? result : {};

      setState((prev) => ({
        ...prev,
        assignedPlant: safeResult.plant || assignedPlant,
        plantApproval: safeResult.approvalStatus || "auto_approved",
        plantSummary: typeof safeResult.aiSummary === "string" ? safeResult.aiSummary : null,
        habits: Array.isArray(safeResult.habits) ? safeResult.habits : [],
        planId: safeResult.planId || "plan-1",
        loading: false,
      }));

      // Check if user arrived via invite link — join the family
      const pendingInvite = localStorage.getItem("lc_care_invite_token");
      if (pendingInvite) {
        try {
          await dataService.joinFamily(pendingInvite);
          localStorage.removeItem("lc_care_invite_token");
          // Reload family info
          const family = await dataService.getFamilyInfo();
          const familyMembers = Array.isArray(family?.members) ? family.members : [];
          setState((prev) => ({ ...prev, familyMembers }));
        } catch (e) {
          console.warn("Could not join family from invite:", e);
          localStorage.removeItem("lc_care_invite_token");
        }
      }

      return safeResult;
    } catch (e) {
      console.error("Onboarding submission failed", e);
      setState((prev) => ({ ...prev, loading: false, error: i18n.t("submit_error") }));
      return null;
    }
  }, []);

  const initializeApp = useCallback(async (roleOverride) => {
    const role = roleOverride || authRoleRef.current;
    if (role === "pharmacist") {
      setState((prev) => ({ ...prev, initialized: true, loading: false }));
      setScreenStack(["pharmacist"]);
      return;
    }
    setState((prev) => ({ ...prev, loading: true, initialized: false, error: null }));
    try {
      const { dataService } = await import("../services/dataService");

      const [garden, family, plans] = await Promise.all([
        dataService.getGardenSummary(),
        dataService.getFamilyInfo(),
        dataService.getCarePlans().catch(() => []),
      ]);

      // Defensive: ensure API responses have expected shapes
      const safeGarden = garden && typeof garden === "object" ? garden : {};
      const safeFamily = family && typeof family === "object" ? family : {};

      // Pull habits from care plan if available
      const activePlan = Array.isArray(plans) ? plans[0] : null;
      const rawHabits = activePlan?.habits || safeGarden.habits || safeGarden.carePlan?.habits;
      const planHabits = Array.isArray(rawHabits) ? rawHabits : [];
      const planId = activePlan?.id || "plan-1";

      // Defensive: ensure family members is an array
      const familyMembers = Array.isArray(safeFamily.members) ? safeFamily.members : [];

      const hasPlant = !!(safeGarden.carePlan || safeGarden.plant);

      // Derive plantApproval from care plan status for returning users
      let plantApproval = null;
      let assignedPlant = null;
      const gardenPlan = safeGarden.carePlan;
      if (gardenPlan) {
        const ps = gardenPlan.plantStatus;
        if (ps === "pending") {
          plantApproval = "pending_review";
        } else if (ps === "growing") {
          plantApproval = "auto_approved";
        }
        assignedPlant = {
          plant: gardenPlan.plantType,
          label: gardenPlan.plantLabel,
          emoji: gardenPlan.plantEmoji,
          group: gardenPlan.plantGroup,
        };
      }

      setState((prev) => ({
        ...prev,
        plant: safeGarden.carePlan || safeGarden.plant,
        carePlans: plans || [],
        points: typeof safeGarden.points === "number" ? safeGarden.points : prev.points,
        streak: typeof safeGarden.streak === "number" ? safeGarden.streak : 0,
        todayWatered: !!safeGarden.todayWatered,
        habits: planHabits,
        planId,
        familyMembers,
        waterActivity: Array.isArray(safeFamily.waterActivity) ? safeFamily.waterActivity : [],
        plantApproval: plantApproval || prev.plantApproval,
        assignedPlant: assignedPlant || prev.assignedPlant,
        plantSummary: safeGarden.aiSummary || safeGarden.carePlan?.aiSummary || prev.plantSummary || null,
        ocrResults: safeGarden.carePlan?.ocrResults || prev.ocrResults || {},
        initialized: true,
        loading: false,
      }));
      setScreenStack([hasPlant ? "home" : "welcome"]);
    } catch (e) {
      console.error("Failed to initialize app data", e);
      setState((prev) => ({
        ...prev,
        initialized: true,
        loading: false,
        error: i18n.t("connect_error"),
      }));
      setScreenStack(["welcome"]);
    }
  }, [setScreenStack]);

  const retry = useCallback(() => {
    initializeApp();
  }, [initializeApp]);

  // Toggle a habit's active state (KH bật/tắt optional habit)
  const toggleHabitActive = useCallback(async (habitId) => {
    let currentActive = null;
    let currentPlanId = "plan-1";
    setState((prev) => {
      currentPlanId = prev.planId || "plan-1";
      const habit = prev.habits.find((h) => h.id === habitId);
      currentActive = habit?.active;
      return {
        ...prev,
        habits: prev.habits.map((h) =>
          h.id === habitId ? { ...h, active: !h.active } : h
        ),
      };
    });
    try {
      const { dataService } = await import("../services/dataService");
      await dataService.updateHabit(currentPlanId, habitId, { active: !currentActive });
    } catch (e) {
      console.error("Failed to toggle habit", e);
    }
  }, []);

  // KH tự thêm habit
  const addCustomHabit = useCallback(async (name, time) => {
    const tempId = `custom_${Date.now()}`;
    const newHabit = { id: tempId, name, time: time || i18n.t("all_day"), icon: "ui_note_pencil", points: 10, active: true, done: false, isCustom: true };
    let currentPlanId = "plan-1";
    setState((prev) => {
      currentPlanId = prev.planId || "plan-1";
      return { ...prev, habits: [...prev.habits, newHabit] };
    });
    try {
      const { dataService } = await import("../services/dataService");
      const res = await dataService.addCustomHabit(currentPlanId, { name, time });
      if (res && Array.isArray(res.habits)) {
        setState((prev) => ({ ...prev, habits: res.habits }));
      }
    } catch (e) {
      console.error("Failed to add custom habit", e);
    }
  }, []);

  const setLanguage = useCallback((lang) => {
    localStorage.setItem("lc_lang", lang);
    document.documentElement.lang = lang;
    i18n.changeLanguage(lang);
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem("lc_care_mock_token");
      localStorage.removeItem("lc_care_mock_user");
      await firebaseSignOut(auth).catch(() => {});
      setScreenStack(["welcome"]);
      setState({
        ...INITIAL_STATE,
        authLoading: false,
        initialized: true,
      });
    } catch (e) {
      console.error("Sign out failed", e);
    }
  }, []);

  const simulateStreak = useCallback(async () => {
    try {
      const { dataService } = await import("../services/dataService");
      const res = await dataService.simulateStreak();
      if (res.success) {
        const [garden, family] = await Promise.all([
          dataService.getGardenSummary(),
          dataService.getFamilyInfo(),
        ]);
        
        const safeGarden = garden && typeof garden === "object" ? garden : {};
        const safeFamily = family && typeof family === "object" ? family : {};
        
        let plantApproval = null;
        let assignedPlant = null;
        const gardenPlan = safeGarden.carePlan;
        if (gardenPlan) {
          const ps = gardenPlan.plantStatus;
          if (ps === "pending") {
            plantApproval = "pending_review";
          } else if (ps === "growing") {
            plantApproval = "auto_approved";
          }
          assignedPlant = {
            plant: gardenPlan.plantType,
            label: gardenPlan.plantLabel,
            emoji: gardenPlan.plantEmoji,
            group: gardenPlan.plantGroup,
          };
        }
        
        setState((prev) => ({
          ...prev,
          plant: safeGarden.carePlan || safeGarden.plant,
          points: typeof safeGarden.points === "number" ? safeGarden.points : prev.points,
          streak: typeof safeGarden.streak === "number" ? safeGarden.streak : prev.streak,
          todayWatered: !!safeGarden.todayWatered,
          plantApproval: plantApproval || prev.plantApproval,
          assignedPlant: assignedPlant || prev.assignedPlant,
          familyMembers: Array.isArray(safeFamily.members) ? safeFamily.members : prev.familyMembers
        }));
        
        return res;
      }
    } catch (e) {
      showToast("❌ Không thể tăng streak trong DB");
    }
  }, [showToast]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setState((prev) => ({
          ...prev,
          authUser: user,
          authLoading: true,
          initialized: false,
        }));
        let role = "user";
        try {
          const { dataService } = await import("../services/dataService");
          const profile = await dataService.getCurrentUser();
          role = profile.role || "user";
          setState((prev) => ({
            ...prev,
            authRole: role,
            userProfile: {
              ...prev.userProfile,
              ...profile,
              fullName: profile.fullName || "",
              phone: profile.phone || "",
            },
          }));
        } catch (e) {
          console.error("Error loading user profile on login", e);
        } finally {
          setState((prev) => ({
            ...prev,
            authLoading: false,
          }));
          // Bắt đầu tải dữ liệu ứng dụng
          initializeApp(role);
        }
      } else {
        // Kiểm tra xem có mock token không
        const mockToken = localStorage.getItem("lc_care_mock_token");
        const mockUserStr = localStorage.getItem("lc_care_mock_user");
        if (mockToken && mockUserStr) {
          try {
            const mockUser = JSON.parse(mockUserStr);
            setState((prev) => ({
              ...prev,
              authUser: { uid: mockToken, displayName: mockUser.fullName, isMock: true },
              authRole: mockUser.role || "user",
              userProfile: {
                ...prev.userProfile,
                fullName: mockUser.fullName || "",
                phone: mockUser.phone || "",
              },
              authLoading: true,
              initialized: false,
            }));
            
            let role = mockUser.role || "user";
            try {
              const { dataService } = await import("../services/dataService");
              const profile = await dataService.getCurrentUser();
              role = profile.role || mockUser.role || "user";
              setState((prev) => ({
                ...prev,
                authRole: role,
                userProfile: {
                  ...prev.userProfile,
                  ...profile,
                  fullName: profile.fullName || mockUser.fullName || "",
                  phone: profile.phone || mockUser.phone || "",
                },
              }));
            } catch (e) {
              console.warn("Could not fetch user profile from server, using local fallback info:", e);
            } finally {
              setState((prev) => ({
                ...prev,
                authLoading: false,
              }));
              initializeApp(role);
            }
            return;
          } catch (err) {
            console.error("Failed to parse mock user or fetch mock data:", err);
          }
        }

        setState((prev) => ({
          ...prev,
          authUser: null,
          authRole: "user",
          authLoading: false,
          initialized: true,
        }));
      }
    });
    return () => unsubscribe();
  }, [initializeApp]);

  // Poll garden for pharmacist approval status change
  const approvalRef = useRef(state.plantApproval);
  useEffect(() => {
    approvalRef.current = state.plantApproval;
  }, [state.plantApproval]);

  useEffect(() => {
    if (!state.initialized || !state.authUser || state.plantApproval !== "pending_review") return;

    const interval = setInterval(async () => {
      try {
        const { dataService } = await import("../services/dataService");
        const garden = await dataService.getGardenSummary();
        const gardenPlan = garden?.carePlan;
        if (gardenPlan && gardenPlan.plantStatus !== "pending") {
          const ps = gardenPlan.plantStatus;
          const newApproval = ps === "growing" ? "auto_approved" : ps === "paused" ? "rejected" : null;
          const habits = Array.isArray(gardenPlan.habits) ? gardenPlan.habits : [];
          setState((prev) => ({
            ...prev,
            plant: gardenPlan,
            plantApproval: newApproval || prev.plantApproval,
            points: typeof garden.points === "number" ? garden.points : prev.points,
            streak: typeof garden.streak === "number" ? garden.streak : prev.streak,
            todayWatered: !!garden.todayWatered,
            habits: habits.length > 0 ? habits : prev.habits,
            assignedPlant: {
              plant: gardenPlan.plantType,
              label: gardenPlan.plantLabel,
              emoji: gardenPlan.plantEmoji,
              group: gardenPlan.plantGroup,
            },
          }));
        }
      } catch (e) {
        // Silently ignore polling errors
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [state.initialized, state.authUser, state.plantApproval]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__updateState = update;
      window.__navigate = navigate;
    }
  }, [update, navigate]);

  // Auto-sync Google Fit khi user đã đăng nhập
  useFitnessSync(state.authUser);

  // Task A2: FCM token registration — sau khi app initialized xong
  useEffect(() => {
    if (!state.initialized || !state.authUser) return;
    let cancelled = false;

    (async () => {
      const token = await requestNotificationPermission();
      if (!token || cancelled) return;
      try {
        const { dataService } = await import("../services/dataService");
        await dataService.registerFCMToken(token);
        console.log("[FCM] Token registered with backend.");
      } catch (err) {
        // Non-fatal
        console.warn("[FCM] Token register failed:", err.message);
      }
    })();

    // Subscribe to foreground messages — show as toast
    const unsubPromise = onForegroundMessage((payload) => {
      const title = payload?.notification?.title || "";
      const body  = payload?.notification?.body  || "";
      if (title || body) showToast(`${title}${title && body ? " — " : ""}${body}`);
    });

    return () => {
      cancelled = true;
      unsubPromise.then(unsub => unsub && unsub());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.initialized, state.authUser?.uid]);

  const value = {
    screen, navigate, goBack, prevScreen, animDir,
    state, update, showToast, toast,
    waterHabit, initializeApp, submitOnboarding, retry,
    toggleHabitActive, addCustomHabit, logout, simulateStreak,
    setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

