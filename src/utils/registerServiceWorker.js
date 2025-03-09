export const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        console.log("Service Worker registered:", registration);
        return registration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  };
  
  export const requestNotificationPermission = async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    }
};
  


const VAPID_PUBLIC_KEY = "BJebf-NGXwccTjFAyQ3MyYdd1ljQfPRuO1_xcDImgn__6ypWpgRIp9abGcmkSmqz-2xZmKkvrGnC2Yt7FLpCQ9w";

export const subscribeUser = async () => {
  try {
    const registration = await registerServiceWorker();
    if (!registration.pushManager) {
      console.error("Push messaging is not supported.");
      return;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    console.log("User is subscribed:", subscription);

    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subscription }),
    });

  } catch (error) {
    console.error("Failed to subscribe user:", error);
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}
