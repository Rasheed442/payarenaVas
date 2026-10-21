import React from "react";
import styled from "styled-components";
import content3BG from "../../assets/images/content3Bg.png";
import content3Icon from "../../assets/icons/content3Icon.svg";
import arrow from "../../assets/icons/arrowBlue.svg";
import Button from "../bits/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Content3 = ({ cardType }) => {
  return (
    <motion.div
      className="bg-[#2778F5] relative h-[100%] rounded-[1.5rem] flex items-center px-[5rem] md:px-[2rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Background $cardType={cardType} src={content3BG} alt="" />
      <div>
        <img src={content3Icon} alt="" className="sm:h-[30px]" />
        <h2 className="font-roboto mt-[1rem] text-white text-[2rem]">
          Value Added Services{" "}
        </h2>
        <p className="mt-[.7rem] text-white leading-relaxed text-[.9rem]">
          You can recharge your mobile phone or phone of any chosen beneficiary{" "}
          {cardType === "bigCard" && <br />}
          with airtime through payarena®. The service is available for Virtual
          Top-Up, {cardType === "bigCard" && <br />}
          Logical or Prepaid PINs for the major Telecommunication networks
        </p>
        <Link to="/payment/airtime_recharge">
          <Button
            text="Start Shopping"
            background="#ffffff"
            width="170px"
            height="50px"
            fontSize="15px"
            icon={arrow}
            iconType="img"
            color="#2778F5"
            style={{ flexDirection: "row-reverse", marginTop: "2rem" }}
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default Content3;

const Background = styled.img`
  position: absolute;
  height: ${(props) => (props.$cardType === "smallCard" ? "60%" : "80%")};
  right: 0;
  bottom: ${(props) => (props.$cardType === "smallCard" ? "0" : "0")};
`;
