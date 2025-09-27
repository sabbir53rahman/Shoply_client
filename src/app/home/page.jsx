import HeroBannerSlider from "@/components/Landing/Banner";
import Banner2 from "@/components/Landing/Banner2";
import CategorySection from "@/components/Landing/CategorySection";
import FeaturedCollection from "@/components/Landing/FeaturedProducts";
import React from "react";

function page() {
  return (
    <div>
      {/* <HeroBannerSlider /> */}
      <Banner2/>
      <CategorySection />
      <FeaturedCollection />
    </div>
  );
}

export default page;
