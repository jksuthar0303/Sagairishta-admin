"use client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SuccessStories() {
    const [stories, setStories] = useState([
        {
          id: 1,
          image:
            "https://images.pexels.com/photos/31048916/pexels-photo-31048916/free-photo-of-rustic-wedding-couple-on-wooden-balcony.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Rahul Sharma",
          email: "rahul@example.com",
          phone: "9876543210",
          story: "We met on this platform and got married last year. Thank you!",
          date: "2024-03-01",
          status: "approved",
        },
        {
          id: 2,
          image:
            "https://images.pexels.com/photos/20525237/pexels-photo-20525237/free-photo-of-just-married-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Neha Kapoor",
          email: "neha@example.com",
          phone: "9876541234",
          story: "This site changed my life! Found my perfect partner here.",
          date: "2024-02-20",
          status: "approved",
        },
        {
          id: 3,
          image:
            "https://images.pexels.com/photos/8549399/pexels-photo-8549399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Amit Verma",
          email: "amit@example.com",
          phone: "9123456789",
          story: "Amazing experience! The journey was smooth and beautiful.",
          date: "2024-01-15",
          status: "approved",
        },
        {
          id: 4,
          image:
            "https://images.pexels.com/photos/31048915/pexels-photo-31048915/free-photo-of-married-couple-hugging-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Rohit Malhotra",
          email: "rohit@example.com",
          phone: "9087654321",
          story: "We met here and instantly clicked! Forever grateful.",
          date: "2024-03-05",
          status: "approved",
        },
        {
          id: 5,
          image:
            "https://images.pexels.com/photos/8278380/pexels-photo-8278380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Sneha Agarwal",
          email: "sneha@example.com",
          phone: "9988776655",
          story: "Found my soulmate thanks to this wonderful platform!",
          date: "2024-02-10",
          status: "approved",
        },
        {
          id: 6,
          image:
            "https://images.pexels.com/photos/10439007/pexels-photo-10439007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Vikram Sinha",
          email: "vikram@example.com",
          phone: "9876123450",
          story: "The best decision of my life was joining this platform!",
          date: "2024-01-28",
          status: "approved",
        },
        {
          id: 7,
          image:
            "https://images.pexels.com/photos/8147353/pexels-photo-8147353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Pooja Mehta",
          email: "pooja@example.com",
          phone: "9123123123",
          story: "I was skeptical at first, but now I’m happily married!",
          date: "2024-02-14",
          status: "approved",
        },
        {
          id: 8,
          image:
            "https://images.pexels.com/photos/10439006/pexels-photo-10439006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Karan Gupta",
          email: "karan@example.com",
          phone: "9898989898",
          story: "Thank you for giving me the best gift of my life!",
          date: "2024-03-08",
          status: "approved",
        },
        {
          id: 9,
          image:
            "https://images.pexels.com/photos/7322051/pexels-photo-7322051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Ankita Roy",
          email: "ankita@example.com",
          phone: "9876540987",
          story: "I met the love of my life here! Thank you for everything!",
          date: "2024-01-20",
          status: "approved",
        },
        {
          id: 10,
          image:
            "https://images.pexels.com/photos/10751616/pexels-photo-10751616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          name: "Manish Tiwari",
          email: "manish@example.com",
          phone: "8765432109",
          story: "A beautiful journey started here, and we are so happy now!",
          date: "2024-03-12",
          status: "approved",
        },
      ]);
      

  return (
    <>
      <div className="w-full flex justify-end mt-6">
        <button
          className="fixed top-24 right-6 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition shadow-lg"
          onClick={() => alert("Open Add Success Story Form")}
        >
          Add Success Story
        </button>
      </div>
     <div className="flex flex-col items-center h-screen w-full mt-6">
  <div className="w-full mt-6 space-y-4 h-full overflow-y-auto scrollbar-hide">
    {stories.map((story) => (
      <div
        key={story.id}
        className="bg-white p-4 border-b flex gap-4 items-start justify-between"
      >
        <div className="flex gap-4">
          <img
            src={story.image}
            alt={story.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {story.name}
            </h2>
            <p className="text-sm text-gray-500">
              {story.email} | {story.phone}
            </p>
            <p className="text-gray-500 text-sm mt-1">Date: {story.date}</p>
            
          </div>
        </div>
        <p className="w-96 text-gray-700 mt-2">{story.story}</p>
        <button
          onClick={() => handleDelete(story.id)}
          className="text-red-500 flex justify-center items-center hover:text-red-700"
          title="Delete"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    ))}
  </div>
</div>

    </>
  );
}
