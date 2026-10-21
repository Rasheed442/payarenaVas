import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Suscribe from "../components/Suscribe";
import { BiMenuAltRight } from "react-icons/bi";
import MobileNav from "../components/MobileNav";

const SharedLayout = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="relative">
      <MobileNav />
      <Navbar />
      <Outlet />
      {location.pathname === "/" ? null : (
        <div className="px-[9rem] my-[6rem] w-full max-w-[1440px] mx-auto sm:px-[0rem] md2:px-[0rem]">
          <Suscribe />
        </div>
      )}
      <Footer />
    </main>
  );
};

export default SharedLayout;
