
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
   
    const storedName = localStorage.getItem("name");
    setName(storedName || ""); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="p-4 bg-pink-600 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Sagairishta<span className=" text-xs ">.com</span>
      </Link>

      <div className="flex items-center space-x-4">
        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-pink-600 font-bold">RS</span>
        </div>
        <span className="font-medium">{name}</span>

        <button
          onClick={handleLogout}
          className="bg-white text-pink-600 px-3 py-1 rounded-md hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
