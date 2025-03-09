"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); 

  return (
    <div className="w-64 bg-pink-600 text-white h-screen p-4">
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
  );
}
