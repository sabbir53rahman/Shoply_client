"use client";
import { useSelector } from "react-redux";
import AdminDashboard from "@/components/pages/AdminDashboard";
import UserDashboard from "@/components/pages/UserDashboard";

function Dashboard() {
  const currentUser = useSelector(state => state?.user?.user);
  

  if (!currentUser) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div>
      {currentUser?.role === "admin" ? (
        <AdminDashboard currentUser={currentUser} />
      ) : (
        <UserDashboard currentUser={currentUser} />
      )}
    </div>
  );
}

export default Dashboard;
