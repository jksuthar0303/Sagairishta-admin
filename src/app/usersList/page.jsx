"use client";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  registerServiceWorker,
  requestNotificationPermission,
  subscribeUser,
} from "../../utils/registerServiceWorker";

const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", location: "New York, USA", age: 30, gender: "male", createdAt: "2024-03-01T10:30:00Z" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", location: "Los Angeles, USA", age: 28, gender: "female", createdAt: "2024-02-25T14:15:00Z" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", location: "Chicago, USA", age: 35, gender: "male", createdAt: "2024-01-10T08:45:00Z" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", location: "Houston, USA", age: 26, gender: "female", createdAt: "2024-02-05T12:20:00Z" },
    { id: 5, name: "Robert Wilson", email: "robert@example.com", location: "San Francisco, USA", age: 32, gender: "male", createdAt: "2024-01-20T09:40:00Z" },
    { id: 6, name: "Sophia Johnson", email: "sophia@example.com", location: "Miami, USA", age: 29, gender: "female", createdAt: "2024-03-03T15:10:00Z" },
    { id: 7, name: "David Lee", email: "david@example.com", location: "Seattle, USA", age: 27, gender: "male", createdAt: "2024-02-12T11:55:00Z" },
    { id: 8, name: "Olivia Martinez", email: "olivia@example.com", location: "Denver, USA", age: 31, gender: "female", createdAt: "2024-01-30T13:25:00Z" },
    { id: 9, name: "James Taylor", email: "james@example.com", location: "Dallas, USA", age: 34, gender: "male", createdAt: "2024-02-08T16:45:00Z" },
    { id: 10, name: "Isabella Thomas", email: "isabella@example.com", location: "Boston, USA", age: 25, gender: "female", createdAt: "2024-03-06T08:30:00Z" },
  ];
  


  

const UserLists = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalMale = users.filter(user => user.gender === "male").length;
const totalFemale = users.filter(user => user.gender === "female").length;
  useEffect(() => {
    handleNotificationSubscription();
  }, []);

  const handleNotificationSubscription = async () => {
    await requestNotificationPermission();
    await registerServiceWorker();
    await subscribeUser();
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col items-center h-screen w-full ">
    <h1 className="text-4xl font-extrabold text-pink-600 mt-6">
    Total Users: {users.length}
  </h1>
  <div className="flex space-x-6 mt-2">
    <p className="text-lg font-semibold text-blue-500">👨 Male: {totalMale}</p>
    <p className="text-lg font-semibold text-pink-500">👩 Female: {totalFemale}</p>
  </div>
      <div className="w-full p-2 mt-6 h-[80vh] overflow-y-auto scrollbar-hide">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-4 border-b border-gray-200 cursor-pointer bg-white hover:bg-pink-50 transition"
                onClick={() => openModal(user)}
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-500 text-sm">
                    Created At: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border-t-4 border-pink-600">
            <h2 className="text-2xl font-bold text-pink-600">
              {selectedUser.name}
            </h2>
            <p className="text-gray-700 mt-2">📧 {selectedUser.email}</p>
            <p className="text-gray-700 mt-2">📍 {selectedUser.location}</p>
            <p className="text-gray-700 mt-2">🎂 Age: {selectedUser.age}</p>
            <button
              className="mt-6 bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLists;
