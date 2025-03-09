"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      router.replace("/login"); 
    } else {
      setIsAuthenticated(true); 
    }
  }, []);

  if (!isAuthenticated) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return children;
}
