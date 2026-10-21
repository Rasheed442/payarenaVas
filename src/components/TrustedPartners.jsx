import React from "react";
import Partners from "./Partners";
import stars from "../assets/icons/partners/stars.svg";

const TrustedPartners = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <span className="flex items-center gap-[.6rem]">
          <p className="text-[.8rem]">Trusted By 20,000+ clients</p>
          <img src={stars} alt="" />
        </span>
        <h2 className="font-roboto text-[2.5rem] sm:text-[1.4rem]">
          They Trust Us.
        </h2>
      </div>
      <Partners />
    </div>
  );
};

export default TrustedPartners;
