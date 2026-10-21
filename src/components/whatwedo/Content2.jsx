import React from "react";
import styled from "styled-components";
import content2BG from "../../assets/images/content2bg.png";
import content2Icon from "../../assets/icons/content2Icon.svg";
import Button from "../bits/Button";
import arrow from "../../assets/icons/arrow.svg";
import { motion } from "framer-motion";

const Content2 = ({ cardType }) => {
  return (
    <motion.div
      className="bg-white relative h-[100%] rounded-[1.5rem] flex items-center px-[3rem] md:px-[2rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Background $cardType={cardType} src={content2BG} alt="" />
      <div className="">
        <img src={content2Icon} alt="" className="sm:h-[30px]" />
        <h2 className="font-roboto mt-[2rem] text-black text-[2rem]">
          Verification Services{" "}
        </h2>
        <p className="mt-[.7rem] text-black leading-relaxed text-[1rem] font-generalsans-light">
          Validate the credibility and authenticity of information, people,{" "}
          <br /> or processes with our professional verification services.
        </p>
        <a href="https://payarenaverification.com/home" target="_blank">
          <Button
            text="Learn More"
            background="#009bff"
            width="170px"
            height="50px"
            fontSize="15px"
            icon={arrow}
            iconType="img"
            style={{ flexDirection: "row-reverse", marginTop: "2rem" }}
          />
        </a>
      </div>
    </motion.div>
  );
};

export default Content2;

const Background = styled.img`
  position: absolute;
  right: 0;
  top: ${(props) => (props.$cardType === "smallCard" ? "0" : "0")};
  width: ${(props) => (props.$cardType === "smallCard" ? "70%" : "60%")};
  height: ${(props) => (props.$cardType === "smallCard" ? "45%" : "70%")};
  /* width: 50%; */
  /* height: 60%; */
`;
