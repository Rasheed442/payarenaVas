import React from "react";
import Button from "./bits/Button";

const GetInTouch = () => {
  return (
    <div className="bg-[#F9FAFB] flex justify-between px-[2rem] py-[3rem] items-center rounded-[1.3rem] md:flex-col md:px-[1rem]">
      <div>
        <h2 className="font-roboto text-[1.5rem] md:text-[0.9rem] md:text-center">
          Send a message, or just ask us anything
        </h2>
        <p className="font-generalsans-extralight text-[.75rem] md:text-center md:text-[0.65rem] md:w-[80%] md:mx-auto">
          One of our business consultant will surely get in touch you within 24
          hours.
        </p>
      </div>
      <form
        action=""
        className="flex gap-[1.3rem] items-center md:flex-col md:mt-[1rem]"
      >
        <input
          type="email"
          className="w-[300px] h-[40px] px-[0.4rem] placeholder:text-[.8rem] border border-[#D0D5DD] rounded-lg outline-none text-[.9rem] text-[#4c4c4c]"
          placeholder="Enter your email"
        />
        <Button
          text="Get In Touch"
          background="#24B0FF"
          color="#ffffff"
          fontSize="14px"
          width="140px"
          height="40px"
        />
      </form>
    </div>
  );
};

export default GetInTouch;
