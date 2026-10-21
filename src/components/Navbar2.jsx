import React from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Button from "./bits/Button";
import Countries from "../Countries";

const Navbar2 = () => {
  const links = [
    { path: "/", name: "Home" },
    { path: "/about-us", name: "About us" },
    { path: "/contact-us", name: "Contact us" },
  ];
  return (
    <nav className=" w-full flex items-center justify-between px-[13%] py-[2rem] z-10 top-0">
      <div className="flex items-center gap-[1.6rem]">
        <Link to="/">
          <img src={logo} alt="" width="90px" />
        </Link>

        {links.map((link, idx) => {
          let id = `li${idx}`;
          return (
            <Link
              className="text-black font-generalsans-semiBold text-[.8vw] font-bold"
              key={id}
              to={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Countries />
        <Button
          text="Get Started"
          background="#F58220"
          color="#fff"
          width="110px"
          height="36px"
          borderRadius="9px"
          fontSize="10px"
          fontFamily="GeneralSans-SemiBold, sans-serif"
        />
      </div>
    </nav>
  );
};

export default Navbar2;
