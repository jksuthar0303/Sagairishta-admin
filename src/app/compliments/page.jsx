"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Compliments() {
  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompliments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/compliments/get-compliments`
        );
        if (!response.ok) throw new Error("Failed to fetch compliments");
        const data = await response.json();
        setCompliments(data.compliments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompliments();
  }, []);

  // Function to delete a compliment
  const deleteCompliment = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this compliment?");
    if (!isConfirmed) return; // Stop execution if user cancels
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/compliments/delete-compliments`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete compliment");
      }
  
      alert("Compliment deleted successfully!");
      setCompliments((prev) => prev.filter((compliment) => compliment._id !== id));
    } catch (err) {
      console.error("Error deleting compliment:", err);
      alert("An error occurred while deleting the compliment.");
    }
  };
  

  return (
    <div className="h-screen p-4">
      {loading ? (
        <p className="text-center text-pink-600 font-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : compliments.length === 0 ? (
        <p className="text-center text-gray-500">No compliments available.</p>
      ) : (
        <div className="space-y-4 h-full overflow-y-auto scrollbar-hide">
          {compliments.map((compliment) => (
            <div
              key={compliment._id}
              className="p-4 border-b flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {compliment.name}
                </h2>


                <p className="text-gray-500 mb-2 text-sm">
                  📍 {compliment.city}, {compliment.state}, {compliment.country}
                </p>

                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < compliment.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  
                </div>
                
                {/* Display Date */}
                <p className="text-gray-600 text-xs">
                  🗓️{" "}
                  {new Date(compliment.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <p className="w-96 text-gray-600">{compliment.comment}</p>
              {/* Delete Button */}
              <button
                onClick={() => deleteCompliment(compliment._id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
