import React, { useState } from "react";
import dollarTag from "../assets/icons/dollarTag.svg";
import check from "../assets/icons/check.svg";
import featuresPhone from "../assets/images/featuresPhone.png";
import shoppingServices from "../assets/images/weekendsale.png";
import shoppingFull from "../assets/images/shoppingFull.svg";
import verificationFull from "../assets/images/verificationFull.svg";
import verificationServices from "../assets/images/duedilligence.png";
import Button from "./bits/Button";
import styled from "styled-components";
import { icons } from "../assets/svg/landingIcons";
import { Link } from "react-router-dom";

const FeaturesServices = () => {
  const [active, setActive] = useState("VAS Payments");
  return (
    <div
      className={
        active === "VAS Payments"
          ? "bg-gray-light py-[1rem] px-[5rem] md:px-[2rem] h-[783.69px]"
          : active === "Shopping Mall"
          ? "bg-gray-light py-[1rem] pl-[5rem] md:px-[2rem] h-[783.69px]"
          : active === "Verification Services"
          ? "bg-gray-light py-[1rem] pl-[5rem] md:px-[2rem] h-[783.69px]"
          : ""
      }
    >
      <div className="flex items-center justify-center gap-[3rem] md:hidden">
        <button
          className={
            active === "VAS Payments"
              ? "flex items-center bg-black text-white px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
              : "flex items-center text-gray-dark px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
          }
          onClick={() => setActive("VAS Payments")}
        >
          {active === "VAS Payments" && <img src={dollarTag} alt="" />}
          VAS Payments
        </button>

        <button
          className={
            active === "Shopping Mall"
              ? "flex items-center bg-black text-white px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
              : "flex items-center text-gray-dark px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
          }
          onClick={() => setActive("Shopping Mall")}
        >
          {active === "Shopping Mall" && <img src={dollarTag} alt="" />}
          Shopping Mall{" "}
        </button>
        <button
          className={
            active === "Verification Services"
              ? "flex items-center bg-black text-white px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
              : "flex items-center text-gray-dark px-[1.8rem] py-[0.8rem] gap-[1rem] font-generalsans-semiBold text-[1.1rem] rounded-lg md:hidden"
          }
          onClick={() => setActive("Verification Services")}
        >
          {active === "Verification Services" && <img src={dollarTag} alt="" />}
          Verification Services
        </button>
      </div>
      <div className="hidden md:flex items-center justify-between">
        {" "}
        <PayIcon $active={active} onClick={() => setActive("VAS Payments")}>
          {icons.pay}
        </PayIcon>
        <ShopIcon $active={active} onClick={() => setActive("Shopping Mall")}>
          {icons.shop}
        </ShopIcon>
        <VerifyIcon
          $active={active}
          onClick={() => setActive("Verification Services")}
        >
          {icons.verify}
        </VerifyIcon>
      </div>

      {active === "VAS Payments" && (
        <div className="flex justify-between mt-[5rem] md:flex-col md:gap-[4rem] md:mt-[2rem]">
          <div className="flex-1">
            <h2 className="font-roboto text-[1.8rem]  md:text-[1.3rem]">
              Payarena provides customers with a seamless payments
              experience.
            </h2>
            <p className="text-[.88rem] font-generalsans-medium mt-[1rem] leading-relaxed">
              Welcome to Payarena, we give our customers the gift of modern,
              frictionless, <br /> painless payments. Our Value added services
              let our customers pay for <br /> whatever they want. We are the
              ultimate all-in-one payment platform designed <br /> to simplify
              your financial life.
            </p>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Create an Account or Sign-up seamlessly
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Buy or Make Payments with little to no stress.{" "}
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                We automatically route payments through the most optimal
                channels, <br />
                ensuring the highest transaction success rates in the market.{" "}
              </p>
            </span>
            <Link to="/payment/airtime_recharge">
              <Button
                text="Learn more"
                background="#009BFF"
                width="150px"
                height="45px"
                fontSize="14px"
                style={{ marginTop: "3rem" }}
              />
            </Link>
          </div>
          <div>
            <img src={featuresPhone} alt="" width="400px" />
          </div>
        </div>
      )}
      {active === "Shopping Mall" && (
        <div className="flex justify-between mt-[5rem] md:flex-col md:gap-[4rem] md:mt-[2rem]">
          <div className="flex-1">
            <h2 className="font-roboto text-[1.8rem]  md:text-[1.3rem]">
              Your Comprehensive One-Stop Destination for Infinite Delights!
            </h2>
            <p className="text-[.88rem] font-generalsans-medium mt-[1rem] leading-relaxed">
              Welcome to Payarena, we give our customers the gift of modern,
              frictionless, <br /> painless payments. Our Value added services
              let our customers pay for <br /> whatever they want. We are the
              ultimate all-in-one payment platform designed <br /> to simplify
              your financial life.
            </p>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Create an Account or Sign-up seamlessly
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Buy or Make Payments with little to no stress.{" "}
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                We automatically route payments through the most optimal
                channels, <br />
                ensuring the highest transaction success rates in the market.{" "}
              </p>
            </span>
            <a href="https://mall.payarena.com/" target="_blank">
              <Button
                text="Learn more"
                background="#009BFF"
                width="150px"
                height="45px"
                fontSize="14px"
                style={{ marginTop: "3rem" }}
              />
            </a>
          </div>
          <div>
            <img
              src={shoppingServices}
              alt=""
              className="w-[500px] sm:hidden"
            />
            <img src={shoppingFull} alt="" className="hidden sm:block" />
          </div>
        </div>
      )}
      {active === "Verification Services" && (
        <div className="flex justify-between mt-[5rem] md:flex-col md:gap-[4rem] md:mt-[2rem]">
          <div className="flex-1">
            <h2 className="font-roboto text-[1.8rem] md:text-[1.3rem]">
              Verified Assurance: Bridging Authenticity and Trust with
              Impeccable Verification.
            </h2>
            <p className="text-[.88rem] font-generalsans-medium mt-[1rem] leading-relaxed">
              Welcome to Payarena, we give our customers the gift of modern,
              frictionless, <br /> painless payments. Our Value added services
              let our customers pay for <br /> whatever they want. We are the
              ultimate all-in-one payment platform designed <br /> to simplify
              your financial life.
            </p>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Create an Account or Sign-up seamlessly
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                Buy or Make Payments with little to no stress.{" "}
              </p>
            </span>
            <span className="flex items-center gap-[1rem] mt-[1.5rem]">
              <img src={check} alt="" />
              <p className="text-[.88rem] font-generalsans-medium">
                We automatically route payments through the most optimal
                channels, <br />
                ensuring the highest transaction success rates in the market.{" "}
              </p>
            </span>
            <a href="https://payarenaverification.com/home" target="_blank">
              <Button
                text="Learn more"
                background="#009BFF"
                width="150px"
                height="45px"
                fontSize="14px"
                style={{ marginTop: "3rem" }}
              />
            </a>
          </div>
          <div>
            <img
              src={verificationServices}
              alt=""
              className="w-[500px] sm:hidden"
            />
            <img src={verificationFull} alt="" className="hidden sm:block" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesServices;

const VerifyIcon = styled.button`
  background-color: ${(props) =>
    props?.$active === "Verification Services" ? "#000" : "transparent"};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  /* &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #008d30;
  } */
  svg path {
    fill: ${(props) =>
      props?.$active === "Verification Services" ? "#fff" : "#475467"};
  }

  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 30px;
    }
  }
`;
const ShopIcon = styled.button`
  background-color: ${(props) =>
    props?.$active === "Shopping Mall" ? "#000" : "transparent"};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #f58220;
  } */
  svg path {
    fill: ${(props) =>
      props?.$active === "Shopping Mall" ? "#fff" : "#475467"};
  }
  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 30px;
    }
  }
`;
const PayIcon = styled.button`
  background-color: ${(props) =>
    props?.$active === "VAS Payments" ? "#000" : "transparent"};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #009bff;
  } */
  svg path {
    fill: ${(props) =>
      props?.$active === "VAS Payments" ? "#fff" : "#475467"};
  }
  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 30px;
    }
  }
`;
