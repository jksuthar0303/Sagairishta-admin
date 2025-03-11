"use client";

import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const adminId = "67cd7428246ab07f77304b8a";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/successtories/get-success-stories?adminId=${adminId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch success stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this success story?"
    );
    if (!isConfirmed) return;

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/successtories/delete-success-story`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Success Story deleted successfully!");
      } else {
        alert(data.message || "Failed to delete success story.");
      }
    } catch (error) {
      console.error("Error deleting success story:", error);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <>
      <div className="flex flex-col items-center h-screen w-full mt-6">
        <div className="w-full mt-6 space-y-4 h-full overflow-y-auto scrollbar-hide">
          {stories.map((story) => (
            <div
              key={story._id}
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
                  <div className="flex flex-col text-gray-600">
                    <a
                      href={`mailto:${story.email}`}
                      className="hover:underline cursor-pointer"
                    >
                      {story.email}
                    </a>

                    <a
                      href={`tel:${story.phone}`}
                      className="hover:underline cursor-pointer"
                    >
                      {story.phone}
                    </a>
                  </div>
                  <span
                    className={
                      story.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {story.status.charAt(0).toUpperCase() +
                      story.status.slice(1)}
                  </span>

                  <p className="text-gray-500 text-sm mt-1">
                    Date:{" "}
                    {new Date(story.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="w-96 text-gray-700 mt-2">{story.story}</p>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  console.log("Deleting Story ID:", story._id);
                  handleDelete(story._id);
                }}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
