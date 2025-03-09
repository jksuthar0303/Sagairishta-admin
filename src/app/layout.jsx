"use client";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <div className="flex">
          {/* Sidebar on the left */}
          <aside className="w-64 bg-pink-600 text-white min-h-screen">
            <Sidebar />
          </aside>

          {/* Main Content on the right */}
          <main className="flex-1 p-4 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
