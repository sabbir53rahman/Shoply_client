"use client";
import React from "react";
import Image from "next/image";
import AboutHero from "@/components/pages/about/AboutHero";
import MissionVision from "@/components/pages/about/MissionVision";
import CompanyStory from "@/components/pages/about/CompanyStory";
import CompanyValues from "@/components/pages/about/CompanyValues";
import TeamSection from "@/components/pages/about/TeamSection";
import CompanyCulture from "@/components/pages/about/CompanyCulture";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <AboutHero/>
      <MissionVision/>
      <CompanyStory/>
      <CompanyValues/>
      <TeamSection/>
      <CompanyCulture/>
    </div>
  );
};

export default AboutUs;
