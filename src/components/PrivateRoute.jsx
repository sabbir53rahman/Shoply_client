"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useAuth from "@/Firebase/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!user) {
      router.replace("/auth/login"); // ✅ use replace instead of push
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-l-blue-500 dark:border-t-cyan-400 dark:border-l-cyan-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg font-semibold">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
