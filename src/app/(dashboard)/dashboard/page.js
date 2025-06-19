"use client";
import { useSelector } from "react-redux";
import AdminDashboard from "@/components/pages/AdminDashboard";
import UserDashboard from "@/components/pages/UserDashboard";

function Dashboard() {
  // const user = useSelector((state) => state.user.user);
  const user =   {
    name: "Sabbir Hossain",
    email: "sabbir@example.com",
    role: "admin",
  }

  if (!user) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div>
      {user.role === "admin" ? (
        <AdminDashboard userId={user._id} />
      ) : (
        <UserDashboard userId={user._id} />
      )}
    </div>
  );
}

export default Dashboard;
