// Firebase Cloud Messaging Service Worker
// Required for background push notifications
// Place in /public/ so it is served at the root path
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// Config is duplicated here because service workers cannot access import.meta.env
// These values are public (Firebase client config is safe to expose)
firebase.initializeApp({
  apiKey: "AIzaSyBXm5VSqqr0yjVWdREhDEo8cOnH_JC029k",
  authDomain: "keolai-63ec1.firebaseapp.com",
  projectId: "keolai-63ec1",
  storageBucket: "keolai-63ec1.firebasestorage.app",
  messagingSenderId: "675411800433",
  appId: "1:675411800433:web:8b5f7e40ce80504a5f46d0",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title = "Long Châu Care", body = "" } = payload.notification || {};
  self.registration.showNotification(title, {
    body,
    icon: "/assets/mascots_nobg/mascot_avatar.webp",
    badge: "/favicon.ico",
    tag: "lc-care-push",
    renotify: true,
    data: payload.data || {},
  });
});

// On notification click — open/focus the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});
