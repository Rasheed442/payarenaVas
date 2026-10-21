import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const ErrorEl = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      window.location.pathname === "/app/transactions/spectranet" ||
      window.location.pathname === "/spectranet"
    ) {
      navigate("/payment/internet_services/spectranet");
    } else if (
      window.location.pathname === "/app/transactions/eko%20electricity" ||
      window.location.pathname === "/eko%20electricity"
    ) {
      navigate("/payment/electricity/eko electricity");
    } else {
      return;
    }
    console.log(window.location.pathname);
  }, []);

  // console.log(window.location.pathname);

  return (
    <main className="relative">
      <MobileNav />
      <Navbar />
      <div className="flex items-center justify-center h-[80vh] flex-col">
        <img src={logo} alt="" className="opacity-50" />
        {/* <h3 className="text-accent2 font-roboto text-6xl">Uh Uh!</h3> */}
        <p className="mt-[1rem] text-center">
          An error has occurred. Kindly refresh the page or go back to the{" "}
          <Link to="/" style={{ color: "#009BFF" }}>
            homepage
          </Link>
          .
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default ErrorEl;
