import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import logo from "../assets/images/logo.svg";
import { mNavLinks } from "../utils/mobileNavLinks";
import { Link } from "react-router-dom";
import Button from "./bits/Button";
import { useNavigate, useLocation } from "react-router-dom";
import SearchInput from "./bits/SearchInput";

const MobileNav = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to generate Mall auth link with token as query parameter
  const getMallAuthLink = () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("mall-token");
      const mallUrl = "https://mall.payarena.com";

      if (!token) return mallUrl;

      // Pass token as query parameter
      return `${mallUrl}/?token=${token}`;
    } catch (error) {
      console.error("Failed to generate Mall auth link:", error);
      return "https://mall.payarena.com/";
    }
  };

  const handleNavigation = () => {
    navigate("/register");
  };
  return (
    <div
      className={`absolute top-[0] z-[9238783700] w-full ${
        showNav ? "h-screen" : "h-[unset]"
      } hidden md:block`}
    >
      <div className="flex items-center justify-between px-[1.5rem] pt-[1rem]">
        <Link to="/">
          <img src={logo} alt="" className="w-[80px] top-[3%]" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="bg-accent1 text-white w-[120px] h-[40px] rounded-lg text-[13px] hidden"
            onClick={handleNavigation}
          >
            Get Started
          </button>
          {location.pathname.includes("/payment") && (
            <SearchInput width="220px" />
          )}
          <div
            className="hidden md:block cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          >
            <BiMenuAltRight
              className={`${
                location.pathname === "/" ? "text-white" : "text-accent1"
              } text-[2rem]`}
            />
          </div>
        </div>
      </div>

      <div
        className={`bg-white w-[300px] h-[100%] fixed top-0 transform ${
          showNav ? "translate-x-[0]" : "translate-x-[-300px]"
        } transition delay-500 ease-in-out px-[1rem] py-[3rem]`}
      >
        <div className="flex flex-col gap-[2rem] mt-[5rem]">
          {location.pathname === "/" ? (
            <>
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? `text-accent1` : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Home
              </Link>

              <Link
                to="/about-us"
                className={`${
                  location.pathname === "/about-us"
                    ? `text-accent1`
                    : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className={`${
                  location.pathname === "/contact-us"
                    ? `text-accent1`
                    : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Contact Us
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? `text-accent1` : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Home
              </Link>

              <Link
                to="/about-us"
                className={`${
                  location.pathname === "/about-us"
                    ? `text-accent1`
                    : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className={`${
                  location.pathname === "/contact-us"
                    ? `text-accent1`
                    : `text-black`
                } font-generalsans-medium text-[1rem]`}
                onClick={() => {
                  setShowNav(false);
                }}
              >
                Contact Us
              </Link>

              <a
                href={getMallAuthLink()}
                target="_blank"
                onClick={() => {
                  setShowNav(false);
                }}
                className="font-generalsans-medium text-[1rem]"
              >
                Shopping
              </a>
              <a
                href="https://payarenaverification.com/home"
                target="_blank"
                onClick={() => {
                  setShowNav(false);
                }}
                className="font-generalsans-medium text-[1rem]"
              >
                Verification
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
