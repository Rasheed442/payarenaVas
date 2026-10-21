import React from "react";
import FeaturesServices from "./FeaturesServices";

const FeaturesAndBenefits = () => {
  return (
    <div className="mt-[12rem] md:mt-[6rem]">
      {" "}
      <p className="text-center mx-auto my-0 px-[1.4rem] py-[0.4rem] w-fit  bg-accent2 text-white rounded-lg font-generalsans-semiBold">
        Features and Benefits
      </p>
      <h2 className="text-center font-roboto text-[2.6rem] text-footer mt-[1.8rem] leading-snug md:hidden">
        Our cutting-edge financial solution drives global <br /> business
        innovation to new frontiers.{" "}
      </h2>
      <h2 className="text-center font-roboto text-[2.6rem] text-footer mt-[1.8rem] leading-snug md:text-[1.2rem] hidden md:block">
        Our cutting-edge financial solution drives global business innovation to
        new frontiers.{" "}
      </h2>
      <p className="text-center text-gray-dark font-generalsans-light text-[1rem]  mt-[.7rem] md:text-[0.9rem] md:hidden">
        We offer our clients cost efficient cutting edge solutions that
        positively impact <br /> their bottom lines.
      </p>
      <p className="text-center text-gray-dark font-generalsans-light text-[1rem]  mt-[.7rem] md:text-[0.9rem] hidden sm:block">
        We offer our clients cost efficient cutting edge solutions that
        positively impact their bottom lines.
      </p>
      <div className="mt-[4rem]">
        <FeaturesServices />
      </div>
    </div>
  );
};

export default FeaturesAndBenefits;
