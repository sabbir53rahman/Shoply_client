import PrivateRoute from "@/components/PrivateRoute";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="flex">
      <div className=" w-64 fixed top-0 left-0 h-screen  md:shadow-md md:overflow-y-auto">
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
      </div>

      {/* Main Content - Takes full width and scrolls */}
      <div className="flex-1 md:ml-64 pt-[20px]">{children}</div>
    </div>
  );
}

export default Layout;
