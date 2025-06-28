"use client";
import { useSelector } from "react-redux";
import AdminDashboard from "@/components/pages/AdminDashboard";
import UserDashboard from "@/components/pages/UserDashboard";

function Dashboard() {
  const currentUser = useSelector(state => state?.user?.user);
  const user =   {
    name: "Sabbir Hossain",
    email: "sabbir@example.com",
    role: "user",
  }

  if (!user) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div>
      {user.role === "admin" ? (
        <AdminDashboard currentUser={currentUser} />
      ) : (
        <UserDashboard currentUser={currentUser} />
      )}
    </div>
  );
}

export default Dashboard;
