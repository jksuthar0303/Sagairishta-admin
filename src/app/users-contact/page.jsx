"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function UsersContact() {
  // Dummy data for contact form submissions
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 9876543210",
      message: "I need help regarding my profile verification.I need help regarding my profile verificationI need help regarding my profile verification",
      date: "2025-03-09",
    },
    {
      id: 2,
      name: "Priya Mehta",
      email: "priya.mehta@example.com",
      phone: "+91 9988776655",
      message: "Can I change my subscription plan?",
      date: "2025-03-08",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit.verma@example.com",
      phone: "+91 9123456789",
      message: "Facing issues while uploading my profile picture.",
      date: "2025-03-07",
    },
  ]);

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="p-2 h-screen">
      <ul className="space-y-4 h-full overflow-y-auto scrollbar-hide">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className=" p-4 border-b flex justify-between items-start"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${contact.email}`} className="text-pink-600 hover:underline">
                  {contact.email}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href={`tel:${contact.phone}`} className="text-pink-600 hover:underline">
                  {contact.phone}
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-2">Received on: {contact.date}</p>
            </div>
            <p className=" w-96 text-gray-600 italic mt-3">"{contact.message}"</p>
            <button
              onClick={() => handleDelete(contact.id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}