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
  useEffect(() => {
    location.pathname === "/" ? setisHomePage(true) : setisHomePage(false);
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
                to="/login/new"
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
                href="https://mall.payarena.com/"
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
               {isLoggedIn() ? (
      <span className="font-generalsans-medium text-[.75rem] text-black">
        Hello, {user?.FirstName || "User"}
      </span>
    ) : (
              <Link
                to="/login/new"
                className="font-generalsans-medium text-[.75rem] text-black hover:text-accent1 cursor-pointer"
              >
                Login
              </Link>
                  )}
                {/* <Button
                text="Get Started"
                disabled={true}
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
              /> */}
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
