import React from "react";
import Home from "./home/page";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

function page() {
  return (
    <div>
      <Navbar/>
      <Home />
      <Footer/>
    </div>
  );
}

export default page;
