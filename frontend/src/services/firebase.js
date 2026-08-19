// Firebase config — Firestore, Auth, Storage, Messaging (FCM)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ── FCM: request permission + get token ──────────────────────────────
// Returns token string, or null if permission denied / not supported.
export async function requestNotificationPermission() {
  try {
    const supported = await isSupported();
    if (!supported) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const messaging = getMessaging(app);
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      // VAPID key not configured — FCM token unavailable but app still works
      console.warn("[FCM] VITE_FIREBASE_VAPID_KEY not set. Push disabled.");
      return null;
    }

    const token = await getToken(messaging, { vapidKey });
    return token || null;
  } catch (err) {
    // Non-fatal: FCM unavailable in some environments (iframe, http, older browsers)
    console.warn("[FCM] requestNotificationPermission failed:", err.message);
    return null;
  }
}

// ── FCM: foreground message handler ──────────────────────────────────
// Pass a callback to receive messages while app is in foreground.
export async function onForegroundMessage(callback) {
  try {
    const supported = await isSupported();
    if (!supported) return () => {};
    const messaging = getMessaging(app);
    return onMessage(messaging, callback);
  } catch {
    return () => {};
  }
}

export default app;
