import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Button from "./bits/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchInput from "./bits/SearchInput";
import Countries from "../Countries";
import { useDispatch, useSelector } from "react-redux";
import { getCatalog } from "../store/api/catalog/getCatalog";
import {
  catalogActions,
  catalogSelector,
} from "../store/services/catalog/catalog.service";
import { countryContext } from "../context/CountryProvider";
import { isLoggedIn, getUser } from "../axios/data";

const Navbar = () => {
  const { countryCode } = useContext(countryContext);
  console.log("landing page", countryCode);
  const dispatch = useDispatch();
  const user = getUser();

  // Helper to generate Mall auth link with token
  const getMallAuthLink = () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("mall-token");
      const mallUrl =  "https://mall.payarena.com";

      if (!token) return mallUrl;

      // Pass token as query parameter
      return `${mallUrl}/?token=${token}`;
    } catch (error) {
      console.error("Failed to generate Mall auth link:", error);
      return "https://mall.payarena.com/";
    }
  };

  // const isLoggedIn = !!localStorage.getItem("bearerToken");

  const storedCatalog = JSON.parse(sessionStorage.getItem("catalogs"));

  const { data, error, loading } = useSelector(catalogSelector);
  useEffect(() => {
    if (storedCatalog === null) {
      dispatch(getCatalog(countryCode));
    }
    dispatch(getCatalog(countryCode));

    dispatch(catalogActions.setBiller(data[0]?.Merchants));
  }, [dispatch, countryCode]);

  const links = [
    { path: "/", name: "Home" },
    { path: "/about-us", name: "About us" },
    { path: "/contact-us", name: "Contact us" },
    // { path: "/deleteAcct", name: "Delete Account" },
  ];
  const paymentLinks = [{ path: "/", name: "Home" }];
  const navigate = useNavigate();
  const [isHomePage, setisHomePage] = useState(true);
  const [currPath, setcurrPath] = useState("/");
  const location = useLocation();
  const isFromDashboard = Boolean(
    location.state?.fromDashboard ||
    sessionStorage.getItem("fromDashboard") === "true"
  );
  const returnPath =
    location.state?.returnTo ||
    sessionStorage.getItem("returnTo") ||
    "/dashboard-v2";

  useEffect(() => {
    if (location.pathname === "/") {
      setisHomePage(true);
      sessionStorage.removeItem("fromDashboard");
      sessionStorage.removeItem("returnTo");
    } else {
      setisHomePage(false);
    }
  }, [location.pathname]);
  const handleNavigation = () => {
    navigate( "/register");
  };
  return (
    <>
      {location.pathname === "/" ? (
        <div className="flex justify-center">
          <NavWrapper
            isHomePage={isHomePage}
            location={location.pathname}
            currPath={currPath}
            className="w-full max-w-[1600px] justify-between inline-flex items-center  px-[8rem] z-[9101] h-[100px] md:hidden lg2:px-[3rem]"
          >
            <div className="flex items-center gap-[1.8rem]">
              <Link to="/">
                <img src={logo} alt="" className="w-[120px]" />
              </Link>
              {links.map((link, idx) => {
                let id = `li${idx}`;

                return (
                  <Link
                    className={`${
                      location.pathname === link.path
                        ? `text-accent1`
                        : `text-white`
                    } font-generalsans-medium text-[.75rem]`}
                    key={id}
                    to={link.path}
                    onClick={() => {
                      setcurrPath(link.path);
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className={
                  location.pathname === "/lo"
                    ? "font-generalsans-medium text-[.75rem] text-white hover:text-accent1 cursor-pointer hidden"
                    : "font-generalsans-medium text-[.75rem] text-black hover:text-accent1 cursor-pointer hidden"
                }
              >
                Login
              </Link>
              {/* <Countries /> */}
            <div>
  {isLoggedIn() ? (
    <Link
      to="/dashboard"
      className="bg-[#F58220] text-white text-sm px-4 py-2 rounded"
    >
      Return to Dashboard
    </Link>
  ) : (
    <Button
      text="Get Started"
      background="#F58220"
      color="#fff"
      width="120px"
      height="40px"
      borderRadius="9px"
      fontSize="13px"
      fontFamily="GeneralSans-Regular, sans-serif"
      style={
        isHomePage ? { boxShadow: "0px 4px 20px 0px #00000059" } : {}
      }
      action={handleNavigation}
    />
  )}
            </div>

            </div>
          </NavWrapper>
        </div>
      ) : (
        <div className="flex justify-center">
          <NavWrapper
            isHomePage={isHomePage}
            location={location.pathname}
            currPath={currPath}
            className="w-full max-w-[1600px] justify-between inline-flex items-center px-[8rem] z-[9101] h-[100px] md:hidden lg2:px-[3rem]"
          >
            <div className="flex items-center gap-[1.8rem]">
              <Link to="/">
                <img src={logo} alt="" className="w-[120px]" />
              </Link>
              {links.map((link, idx) => {
                let id = `li${idx}`;

                return (
                  <Link
                    className={`${
                      location.pathname === link.path
                        ? `text-accent1`
                        : `text-black`
                    } font-generalsans-medium text-[.75rem]`}
                    key={id}
                    to={link.path}
                    onClick={() => {
                      setcurrPath(link.path);
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/payment/airtime_recharge"
                className={`${
                  location.pathname.includes("/payment")
                    ? `text-accent1`
                    : `text-black`
                } font-generalsans-medium text-[.75rem]`}
              >
                Payment
              </Link>
              <a
                href={getMallAuthLink()}
                target="_blank"
                className="text-black font-generalsans-medium text-[.75rem]"
              >
                Shopping
              </a>
              <a
                href="https://payarenaverification.com/home"
                target="_blank"
                className="text-black font-generalsans-medium text-[.75rem]"
              >
                Verification
              </a>
            </div>
            <div className="flex items-center gap-[2rem]">
              {/* 2nd country */}
              <Countries />
              {isFromDashboard ? (
                /* When routed from sideLinks: Login & Sign up buttons are commented out and replaced with a return button */
                <button
                  onClick={() => {
                    sessionStorage.removeItem("fromDashboard");
                    sessionStorage.removeItem("returnTo");
                    navigate(returnPath);
                  }}
                  className="bg-[#F58220] text-white text-sm px-4 py-2 rounded font-generalsans-medium hover:bg-[#e07110] transition-colors"
                >
                  Return to Dashboard
                </button>
              ) : (
                <>
                  {isLoggedIn() ? (
                    <span className="font-generalsans-medium text-[.75rem] text-black">
                      Hello, {user?.FirstName || "User"}
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="font-generalsans-medium text-[.75rem] text-black hover:text-accent1 cursor-pointer"
                    >
                      Login
                    </Link>
                  )}
                  <div>
                    {isLoggedIn() ? (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-[#F58220] w-full text-white text-sm px-4 py-2 rounded"
                      >
                        Return to Dashboard
                      </button>
                    ) : (
                      <Button
                        text="Sign up"
                        background="#F58220"
                        color="#fff"
                        width="120px"
                        height="40px"
                        borderRadius="9px"
                        fontSize="13px"
                        fontFamily="GeneralSans-Regular, sans-serif"
                        style={
                          isHomePage ? { boxShadow: "0px 4px 20px 0px #00000059" } : {}
                        }
                        action={handleNavigation}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </NavWrapper>
        </div>
      )}
    </>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  position: ${(props) => (props.isHomePage ? "fixed" : "absolute")};
  top: 0;
  div {
  }
`;
