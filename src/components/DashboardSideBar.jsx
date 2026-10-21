import React, { useState } from "react";
import LogoIcon from "../assets/icons/logo.png";
import HomeIcon from "../assets/icons/dashboardIIcons/homeIcon";
import TransferIcon from "../assets/icons/dashboardIIcons/transferIcon";
import ServiceIcon from "../assets/icons/dashboardIIcons/serviceIcon";
import PaymentIcon from "../assets/icons/dashboardIIcons/paymentIcon";
import HistoryIcon from "../assets/icons/dashboardIIcons/historyIcon";
import SettingsIcon from "../assets/icons/dashboardIIcons/settingsIcon";
import { useNavigate } from "react-router-dom";

export default function DashboardSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Transfers",
      link: "/transfers",
      icon: TransferIcon,
    },
    // {
    //   name: "Payments",
    //   link: "/payments",
    //   icon: PaymentIcon,
    // },
    // {
    //   name: "Self Service",
    //   link: "/service",
    //   icon: ServiceIcon,
    // },
    {
      name: "Transaction History",
      link: "/history",
      icon: HistoryIcon,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: SettingsIcon,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="min-md:hidden fixed top-[-5px] left-1 z-50">
        <button onClick={toggleSidebar} className="p-2 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed min-md:relative inset-y-0 left-0 w-[267px] min-md:w-full bg-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } min-md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="w-full text-center flex flex-col justify-between min-md:h-full">
          <div className="text-center flex items-center justify-center py-10">
            <img src={LogoIcon} alt="Logo" />
          </div>
          <div>
            {navLinks.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.link);
                  setIsSidebarOpen(false); // Close sidebar on mobile after navigation
                }}
                className={`flex flex-col py-6 px-4 cursor-pointer transition-all ${
                  window.location.pathname === item.link &&
                  "before:transition-all before:w-[4px] before:h-full before:bg-accent1 before:absolute before:left-0 before:top-0 relative transition-all bg-[#F8F8F9]"
                } items-center justify-center`}
              >
                <item.icon
                  width="20"
                  height="20"
                  color={
                    (window.location.pathname === item.link && "#F58220") ||
                    "#464255"
                  }
                  opacity={
                    (window.location.pathname === item.link && "1") || "0.5"
                  }
                />
                <div
                  className={`text-xs mt-2 font-bold transition-all ${
                    (window.location.pathname === item.link &&
                      "text-accent1") ||
                    "text-[#464255]"
                  }`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10  min-md:bottom-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_564_3317)">
                  <path
                    d="M17 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM7 15C5.34 15 4 13.66 4 12C4 10.34 5.34 9 7 9C8.66 9 10 10.34 10 12C10 13.66 8.66 15 7 15Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_564_3317">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[#464255] text-[10px]">Dark Mode</p>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 min-md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
