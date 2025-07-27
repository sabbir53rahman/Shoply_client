import HeroBannerSlider from "@/components/Landing/Banner";
import CategorySection from "@/components/Landing/CategorySection";
import FeaturedCollection from "@/components/Landing/FeaturedProducts";
import React from "react";

function page() {
  return (
    <div>
      <HeroBannerSlider />
      <CategorySection />
      <FeaturedCollection />
    </div>
  );
}

export default page;
