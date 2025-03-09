"use client"
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-pink-600 text-white h-screen p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/usersList" className="block p-2 hover:bg-pink-500 rounded">
            Users
          </Link>
        </li>
        <li>
          <Link href="/compliments" className="block p-2 hover:bg-pink-500 rounded">
            Compliments
          </Link>
        </li>
        <li>
          <Link href="/success-stories" className="block p-2 hover:bg-pink-500 rounded">
            Success-Stories
          </Link>
        </li>
        <li>
          <Link href="/users-contact" className="block p-2 hover:bg-pink-500 rounded">
            Users Contact
          </Link>
        </li>
        <li>
          <Link href="/notifications" className="block p-2 hover:bg-pink-500 rounded">
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
}
