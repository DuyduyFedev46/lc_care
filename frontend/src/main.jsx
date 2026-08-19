import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App";
import "./theme/tokens.css";
import "./theme/global.css";

// Connect React DevTools standalone in development
if (import.meta.env.DEV) {
  const script = document.createElement("script");
  script.src = "http://localhost:8097";
  document.head.appendChild(script);
}

// Force cache buster for PWA assets on version bump
const APP_VERSION = "1.0.4";
if (localStorage.getItem("lc_care_app_version") !== APP_VERSION) {
  localStorage.setItem("lc_care_app_version", APP_VERSION);
  if ("caches" in window) {
    caches.keys().then((names) => {
      Promise.all(names.map((name) => caches.delete(name))).then(() => {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            Promise.all(registrations.map((r) => r.unregister())).then(() => {
              window.location.reload();
            });
          });
        } else {
          window.location.reload();
        }
      });
    });
  } else {
    window.location.reload();
  }
}

// Register PWA service worker
if ("serviceWorker" in navigator) {
  let refreshing = false;
  // Capture whether we had an active controller at load time
  const hadController = !!navigator.serviceWorker.controller;
  
  // Listen for the controllerchange event (fires when a new service worker takes over)
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    
    // Only reload if we had a controller initially (indicating an update, not first-time install)
    if (hadController) {
      refreshing = true;
      window.location.reload();
    }
  });

  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
