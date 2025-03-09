"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/get`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
            credentials: "include",
          }
        );
  
        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }
  
        const data = await res.json();
  

        const sortedNotifications = data.notifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, []);
  

  const deleteNotification = async (notificationId) => {

    const updatedNotifications = notifications.filter(
      (notification) => notification._id !== notificationId
    );
    setNotifications(updatedNotifications);
  
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notificationId }),
        }
      );
  
      if (!res.ok) {
        throw new Error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      setNotifications((prev) => [...prev, notifications.find(n => n._id === notificationId)]);
    }
  };
  

  return (
    <div className="h-screen p-4">
      {loading ? (
        <p className="text-center text-pink-600 font-semibold flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-pink-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading...
        </p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications available.</p>
      ) : (
        <div className="w-full p-4 border-b h-full overflow-y-auto scrollbar-hide ">
          {notifications.map((notification) => (
            <div key={notification._id} className="border-b py-3 last:border-b-0 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-pink-600">
                {notification.title}
              </h2>
              <p className="text-gray-700">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            <button onClick={() => deleteNotification(notification._id)} className="text-red-500 hover:text-red-700">
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}
