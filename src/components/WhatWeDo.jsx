import React from "react";
import WhatWeDoCarousel from "./WhatWeDoCarousel";

const WhatWeDo = () => {
  return (
    <div className="mt-[7rem] sm:mt-[2rem]">
      <p className="text-center mx-auto my-0 px-[1.4rem] py-[0.4rem] w-fit  bg-accent2 text-white rounded-lg font-generalsans-semiBold">
        What we do
      </p>
      <h2 className="text-center font-roboto text-[2.6rem] text-footer mt-[1.8rem] sm:text-[2rem]">
        One Platform, Multiple Services
      </h2>
      <p className="text-center text-gray-dark font-generalsans-light text-[1rem]  mt-[1rem] md:hidden">
        Payarena unifies all your business needs under one virtual roof. Say
        goodbye to juggling between different <br /> apps and websites to pay
        bills or make purchases. With Payarena, you can effortlessly handle all{" "}
        <br />
        transactions with just a few clicks.
      </p>
      <p className="text-center text-gray-dark font-generalsans-light text-[1rem]  mt-[1rem] hidden lg:block">
        Payarena unifies all your business needs under one virtual roof. Say
        goodbye to juggling between different apps and websites to pay bills or
        make purchases. With Payarena, you can effortlessly handle all
        transactions with just a few clicks.
      </p>
      <div className="mt-[3rem]">
        <WhatWeDoCarousel />
      </div>
    </div>
  );
};

export default WhatWeDo;
