"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute"; 
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen overflow-hidden">
        {!isLoginPage && <Navbar className="fixed top-0 left-0 w-full z-40 bg-white shadow-md" />}
        <div className="flex h-screen">
          {!isLoginPage && (
            <aside
              className={`bg-pink-600 text-white fixed left-0 top-0 transition-all duration-300 z-30 ${
                isSidebarOpen ? "w-64" : "w-0"
              }`}
            >
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </aside>
          )}

          {/* Main Content */}
          <main
            className={`p-4 transition-all duration-300 flex-1 bg-white h-screen overflow-auto ${
              isSidebarOpen && !isLoginPage ? "ml-64" : "ml-0"
            }`}
          >
            {/* Wrap children inside ProtectedRoute except for login */}
            {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
          </main>
        </div>
      </body>
    </html>
  );
}
