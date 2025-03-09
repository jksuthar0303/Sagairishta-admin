"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute"; 
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {!isLoginPage && <Navbar />}
        <div className="flex">
          {!isLoginPage && (
            <aside className="w-64 bg-pink-600 text-white min-h-screen">
              <Sidebar />
            </aside>
          )}
          <main className={`flex-1 p-4 ${isLoginPage ? "bg-gray-100" : "bg-white"}`}>
            {/* Wrap children inside ProtectedRoute except for login */}
            {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
          </main>
        </div>
      </body>
    </html>
  );
}
