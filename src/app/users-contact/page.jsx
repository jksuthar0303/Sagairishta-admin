"use client";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function UsersContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/get-contacts`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this contact message?");
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/delete-contact`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Contact message deleted successfully!");
        fetchContacts(); // Refresh contacts after deletion
      } else {
        alert(data.error || "Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-2 h-screen mb-14">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4 h-full overflow-y-auto scrollbar-hide">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <li key={contact._id} className="p-4 border-b flex justify-between items-start">
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
                  <p className="text-gray-500 text-sm mt-2">
                    Received on: {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="w-96 text-gray-600 italic mt-3">"{contact.message}"</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(contact._id);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No contact messages found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
