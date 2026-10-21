import React from "react";
import content1BG from "../../assets/images/content1bg.png";
import content1Icon from "../../assets/icons/content1Icon.svg";
import arrow from "../../assets/icons/arrow.svg";
import Button from "../bits/Button";
import styled from "styled-components";
import { motion } from "framer-motion";

const Content1 = ({ cardType }) => {
  return (
    <motion.div
      className="bg-footer  relative h-[100%] rounded-[1.5rem] flex items-center px-[5rem] md:px-[2rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Background $cardType={cardType} src={content1BG} alt="" />
      <div className="">
        <img src={content1Icon} alt="" className="sm:h-[30px]" />
        <h2 className="font-roboto mt-[2rem] text-white text-[2rem]">
          Payarena Shopping Mall
        </h2>
        <p className="mt-[.7rem] text-white leading-relaxed text-[1rem]">
          You can be sure to discover what you're looking for with our{" "}
          {cardType === "bigCard" && <br />}
          wide variety of merchants.{" "}
          {cardType === "bigCard" ? (
            <span>
              As a Seller, you have easy access to <br />
              your customers. Head over to our mall now!
            </span>
          ) : (
            ""
          )}
        </p>
        <a href="https://mall.payarena.com/" target="_blank">
          <Button
            text="Start Shopping"
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

export default Content1;

const Background = styled.img`
  position: absolute;
  height: ${(props) => (props.$cardType === "smallCard" ? "60%" : "100%")};
  right: 0;
  top: ${(props) => (props.$cardType === "smallCard" ? "0" : "")};
`;
