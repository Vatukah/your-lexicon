// public/sw.js

self.addEventListener("push", event => {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification("Word of the Day", {
      body: data.body,
      icon: "/icon.png" // Optional icon
    })
  );
});

// Optional: Click handler
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("http://localhost:5173") // Redirect user
  );
});
