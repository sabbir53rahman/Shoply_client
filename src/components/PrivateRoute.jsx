"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is null or undefined, redirect to login
    if (!user) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

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

  return <>{children}</>;
};

export default PrivateRoute;
