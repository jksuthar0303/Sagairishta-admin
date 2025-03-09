"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Compliments() {
    const [compliments, setCompliments] = useState([
        {
          id: 1,
          name: "Rahul Sharma",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          message: "Amazing experience! The service was excellent.",
          rating: 5,
        },
        {
          id: 2,
          name: "Priya Mehta",
          city: "Delhi",
          state: "Delhi",
          country: "India",
          message: "Really impressed with the support team!",
          rating: 4,
        },
        {
          id: 3,
          name: "Amit Verma",
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
          message: "Good platform, but can be improved.",
          rating: 3,
        },
        {
          id: 4,
          name: "Sakshi Agarwal",
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
          message: "Loved the user-friendly interface!",
          rating: 5,
        },
        {
          id: 5,
          name: "Vikram Singh",
          city: "Pune",
          state: "Maharashtra",
          country: "India",
          message: "Smooth process, very happy with the service.",
          rating: 4,
        },
        {
          id: 6,
          name: "Anjali Das",
          city: "Kolkata",
          state: "West Bengal",
          country: "India",
          message: "Had some issues, but customer support was great.",
          rating: 4,
        },
        {
          id: 7,
          name: "Rohan Gupta",
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
          message: "Decent experience, but needs more features.",
          rating: 3,
        },
        {
          id: 8,
          name: "Neha Kapoor",
          city: "Jaipur",
          state: "Rajasthan",
          country: "India",
          message: "Highly recommend! Exceeded my expectations.",
          rating: 5,
        },
        {
          id: 9,
          name: "Arjun Nair",
          city: "Kochi",
          state: "Kerala",
          country: "India",
          message: "Great platform, but a few bugs need fixing.",
          rating: 3,
        },
        {
          id: 10,
          name: "Meera Iyer",
          city: "Ahmedabad",
          state: "Gujarat",
          country: "India",
          message: "Superb service! Will use it again for sure.",
          rating: 5,
        },
      ]);
      

  // Function to handle deletion of a compliment
  const deleteCompliment = (id) => {
    setCompliments(compliments.filter((compliment) => compliment.id !== id));
  };

  return (
    <div className="h-screen">
      <div className="space-y-4 h-full overflow-y-auto scrollbar-hide">
        {compliments.map((compliment) => (
          <div
            key={compliment.id}
            className="p-4 border-b  flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{compliment.name}</h2>
              <p className="text-gray-600">{compliment.message}</p>
              <p className="text-gray-500 text-sm">
                📍 {compliment.city}, {compliment.state}, {compliment.country}
              </p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-xl ${i < compliment.rating ? "text-yellow-500" : "text-gray-300"}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            {/* Delete Button with Heroicon */}
            <button
              onClick={() => deleteCompliment(compliment.id)}
              className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
