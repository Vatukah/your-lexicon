// src/hooks/useWordOfTheDaySubscription.js
import { useEffect } from "react";

export default function useWordOfTheDaySubscription(publicVapidKey) {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const subscribeUser = async () => {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const registration = await navigator.serviceWorker.register("/sw.js");

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
          });

          await fetch("http://localhost:3000/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: { "Content-Type": "application/json" }
          });

          console.log("✅ Subscribed to Word of the Day");
        } else {
          console.warn("🚫 Permission not granted for notifications");
        }
      };

      subscribeUser();
    }
  }, [publicVapidKey]);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
