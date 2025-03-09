"use client"

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-pink-600 text-white flex justify-between items-center">
      {/* Logo/Brand Name */}
      <Link href="/" className="text-xl font-bold">SagaIRishta</Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
     <div className="bg-white w-10 h-10 rounded-full">
    <span className="text-black font-bold flex justify-center mt-2">RJ</span>
     </div>
        {/* Username */}
        <span className="font-medium">John Doe</span>

        {/* Logout Button */}
        <button className="bg-white text-pink-600 px-3 py-1 rounded-md hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
}
