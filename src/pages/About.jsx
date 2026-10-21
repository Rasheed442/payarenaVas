import React from "react";
import AboutFirstSection from "../components/AboutFirstSection";
import Navbar2 from "../components/Navbar2";
import NewsLetter from "../components/NewsLetter";
import WhatWeDo from "../components/WhatWeDo";
import bg from "../assets/images/about-patterns.svg";
import FeaturesAndBenefits from "../components/FeaturesAndBenefits";
import Testimonials from "../components/Testimonials";
import PaginationProvider from "../context/pagination/PaginationProvider";
import PowerOfPayarena from "../components/PowerOfPayarena";
import TrustedPartners from "../components/TrustedPartners";
import GetInTouch from "../components/GetInTouch";
import Suscribe from "../components/Suscribe";

const About = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto relative">
      <img src={bg} alt="" className="w-screen absolute z-[-1] lg:hidden" />
      <div className="px-[9rem] md:px-[1.5rem]">
        <AboutFirstSection />
        <WhatWeDo />
        <FeaturesAndBenefits />
      </div>
      <div>
        <PaginationProvider>
          <Testimonials />
        </PaginationProvider>
        <PowerOfPayarena />
        <TrustedPartners />
      </div>
      {/* <div className="px-[9rem] my-[6rem] sm:px-[1.5rem]">
        <GetInTouch />
      </div> */}
    </section>
  );
};

export default About;
