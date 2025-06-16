"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "@/app/globals.css";
import useAuth from "@/Firebase/useAuth";
import { store } from "@/redux/app/store";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Loader2 } from "lucide-react";

const Spinner = () => (
  <div className="min-h-screen bg-black flex flex-col justify-center items-center gap-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-white text-xl font-medium">
          Loading details...
        </p>
      </div>
);

const LayoutContent = ({ children }) => {
  const { isAuthLoading } = useAuth();
  if (isAuthLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <LayoutContent>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
