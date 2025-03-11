"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeUser,
} from "../../utils/registerServiceWorker";
import { useRouter } from "next/navigation";



const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const totalMale = users.filter((user) => user.gender === "Male").length;
  const totalFemale = users.filter((user) => user.gender === "Female").length;


  useEffect(() => {
    handleNotificationSubscription();
  }, []);

  const handleNotificationSubscription = async () => {
    await requestNotificationPermission();
    await registerServiceWorker();
    await subscribeUser();
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/get-all-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this User?");
    
    if (!isConfirmed) return; 
    try {
      const apiUrl =`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-user`;
  
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId : id }), 
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("User deleted successfully!");
  
        
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
        
      } else {
        alert(data.message || "Failed to delete User.");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center h-screen w-full ">
      <h1 className="text-4xl font-extrabold text-pink-600 mt-6">
        Total Users: {users.length}
      </h1>
      <div className="flex space-x-6 mt-2">
        <p className="text-lg font-semibold text-blue-500">
          👨 Male: {totalMale}
        </p>
        <p className="text-lg font-semibold text-pink-500">
          👩 Female: {totalFemale}
        </p>
      </div>

      <div className="w-full p-2 mt-6 h-[80vh] overflow-y-auto scrollbar-hide">
  {loading ? (
    <p className="text-center text-gray-500">Loading users...</p>
  ) : users.length === 0 ? (
    <p className="text-center text-gray-500">No users found.</p>
  ) : (
    <ul className="space-y-4">
      {users.map((user) => (
        <li
          key={user._id}
          className="flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer bg-white hover:bg-pink-50 transition"
          onClick={() => router.push(`/user/${user._id}`)}
        >
          <div className="flex items-center space-x-4">
            {/* Profile Picture */}
            <img
              src={user.profilePic || "/default-avatar.png"}
              alt={user.fullName}
              className="w-20 h-20 rounded-full border border-gray-300 object-cover"
            />

            {/* User Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 text-sm">📞 {user.mobile || "N/A"}</p>
              <p className="text-gray-500 text-sm">
                🌍 {user.state}, {user.district}
              </p>
              <p className="text-gray-500 text-sm">
                🕒 Created At:{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Delete Icon */}
          <button
  className="p-2 rounded hover:bg-gray-200 transition"
  onClick={(e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    handleDelete(user._id);
  }}
>
  <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
</button>

        </li>
      ))}
    </ul>
  )}
</div>
     
    </div>
  );
};

export default UserLists;
