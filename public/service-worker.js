self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
  
    self.registration.showNotification(data.title || "New Notification", {
      body: data.message || "You have a new notification.",
      icon: "/icon.png", // Change to your app icon
      badge: "/badge.png", // Optional
      data: data.url || "/",
    });
  });
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data || "/")
    );
  });
  