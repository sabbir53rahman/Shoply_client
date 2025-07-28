"use client";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/Firebase/useAuth";

const AdminRoute = ({ role, children }) => {
  const currentUser = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(true);
  //   const { user } = useAuth();
  const router = useRouter();
  console.log("Current User:", currentUser);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="w-full flex h-screen justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const isMatched = role.includes(currentUser?.role);
  if (!isMatched) {
    return router.push("/auth/login");
  }

  return <div className="w-full">{children}</div>;
};

export default AdminRoute;
