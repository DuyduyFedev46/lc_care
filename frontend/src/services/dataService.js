import api from "./api";
import i18n from "../i18n";

export const dataService = {
  // ── Garden ──
  getGardenSummary: async () => {
    const res = await api.get("/garden/");
    return res.data;
  },
  waterPlant: async (habitId) => {
    const res = await api.post("/garden/water", { habitId });
    return res.data;
  },
  getBadges: async () => {
    const res = await api.get("/garden/badges");
    return res.data;
  },
  simulateStreak: async () => {
    const res = await api.post("/garden/simulate-streak");
    return res.data;
  },
  getAchievements: async () => {
    const res = await api.get("/garden/achievements");
    return res.data;
  },
  getQuests: async () => {
    const res = await api.get("/garden/quests");
    return res.data;
  },

  // ── Family ──
  getFamilyInfo: async () => {
    const res = await api.get("/family/");
    return res.data;
  },
  getFamilyCalendar: async () => {
    const res = await api.get("/family/calendar");
    return res.data;
  },
  addCalendarEvent: async (event) => {
    const res = await api.post("/family/calendar", event);
    return res.data;
  },
  updateCalendarEvent: async (dateFull, eventIndex, patch) => {
    const res = await api.patch(`/family/calendar/${dateFull}/${eventIndex}`, patch);
    return res.data;
  },
  deleteCalendarEvent: async (dateFull, eventIndex) => {
    const res = await api.delete(`/family/calendar/${dateFull}/${eventIndex}`);
    return res.data;
  },
  createFamilyInvite: async () => {
    const res = await api.post("/family/invite");
    return res.data; // { inviteToken, inviteUrl, expiresAt }
  },
  joinFamily: async (inviteToken) => {
    const res = await api.post("/family/join", { inviteToken });
    return res.data; // { success, familyId }
  },
  waterForMember: async (memberId) => {
    const res = await api.post(`/family/water/${memberId}`);
    return res.data; // { success, senderPoints, message }
  },

  // ── Notification ──
  registerFCMToken: async (token) => {
    const res = await api.post("/notification/register-token", { token, platform: "web" });
    return res.data;
  },

  // ── Care Plan ──
  getCarePlans: async () => {
    const res = await api.get("/careplan/");
    return res.data;
  },
  updateHabit: async (planId, habitId, patch) => {
    const res = await api.patch(`/careplan/${planId}/habits/${habitId}`, patch);
    return res.data;
  },
  addCustomHabit: async (planId, habit) => {
    const res = await api.post(`/careplan/${planId}/habits`, habit);
    return res.data;
  },

  // ── Vouchers ──
  getVouchers: async () => {
    const res = await api.get("/voucher/");
    return res.data;
  },
  getTargetedVouchers: async () => {
    const res = await api.get("/voucher/targeted");
    return res.data;
  },
  redeemVoucher: async (voucherId) => {
    const res = await api.post(`/voucher/redeem/${voucherId}`);
    return res.data;
  },

  // ── Pharmacist ──
  getPharmacistQueue: async () => {
    const res = await api.get("/pharmacist/queue");
    return res.data;
  },
  getPharmacistCustomerDetails: async (userId) => {
    const res = await api.get(`/pharmacist/customer/${userId}`);
    return res.data;
  },
  approvePharmacistDraft: async (draftId, payload) => {
    const res = await api.post(`/pharmacist/approve/${draftId}`, payload);
    return res.data;
  },
  rejectPharmacistDraft: async (draftId, payload) => {
    const res = await api.post(`/pharmacist/reject/${draftId}`, payload);
    return res.data;
  },

  // ── Auth ──
  getCurrentUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await api.patch("/auth/profile", profileData);
    return res.data;
  },

  // ── Purchases ──
  getPurchases: async () => {
    const res = await api.get("/purchase/");
    return res.data;
  },

  // ── Onboarding ──
  submitOnboarding: async (data) => {
    const res = await api.post("/onboarding/submit", {
      userProfile: data.userProfile || {},
      assignedPlants: data.assignedPlants || {},
      familyMembers: data.familyMembers || [],
      ocrResults: data.ocrResults || {},
      lang: i18n.language || "vi",
    });
    return res.data;
  },
  getOnboardingStatus: async (userId) => {
    const res = await api.get(`/onboarding/status/${userId}`);
    return res.data;
  },
};
