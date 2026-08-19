import axios from "axios";
import { getAuth } from "firebase/auth";
import app from "./firebase";

let API_BASE_URL = import.meta.env.VITE_API_URL || "https://lc-care-api-675411800433.asia-southeast1.run.app/api";

// Force HTTPS — prevent Mixed Content blocking on production (https pages can't call http)
if (!API_BASE_URL.includes("localhost") && !API_BASE_URL.includes("127.0.0.1")) {
  API_BASE_URL = API_BASE_URL.replace(/^http:\/\//i, "https://");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Fallback: use mock token stored by LoginScreen when Firebase Auth is unavailable
    const mockToken = localStorage.getItem("lc_care_mock_token");
    if (mockToken) {
      config.headers.Authorization = `Bearer ${mockToken}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
