"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-42 z-50 p-2 bg-pink-600 text-white rounded-md shadow-md"
      >
        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      <div
        className={`fixed left-0 top-14 h-screen bg-pink-600 text-white p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        } overflow-x-hidden`}
      >
        <ul className="space-y-2">
          {[  
            { name: "Users", path: "/usersList" },
            { name: "Compliments", path: "/compliments" },
            { name: "Success-Stories", path: "/success-stories" },
            { name: "Users Contact", path: "/users-contact" },
            { name: "Notifications", path: "/notifications" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-2 rounded transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-white text-pink-600 shadow-lg shadow-pink-400/50 font-semibold"
                    : "hover:bg-pink-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
