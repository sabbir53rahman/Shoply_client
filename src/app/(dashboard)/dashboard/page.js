"use client";
import React from "react";
import { useSelector } from "react-redux";
import TeacherDashboard from "@/components/pages/TeacherDashboard";
import StudentDashboard from "@/components/pages/StudentDashboard";

function Dashboard() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <div className="p-4">Loading user data...</div>;
  }

  return (
    <div>
      {user.role === "teacher" ? (
        <TeacherDashboard teacherId={user._id} />
      ) : (
        <StudentDashboard studentId={user._id} />
      )}
    </div>
  );
}

export default Dashboard;
