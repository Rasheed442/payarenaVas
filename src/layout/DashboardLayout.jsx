import React from "react";
import { Outlet } from "react-router-dom";
import DashboardTopBar from "../components/DashboardTopBar";
import DashboardSideBar from "../components/DashboardSideBar";
import Dots from "../assets/icons/dashboardIIcons/Dots";
import NotificationPanel from "../components/NotificationPanel";

const DashboardLayout = () => {
  return (
    <div className="flex w-full font-poppins-regular">
      <div className="w-[267px] min-md2:w-[10%] overflow-hidden">
        <DashboardSideBar />
      </div>
      <div className="min-md:w-[90%] w-full bg-[#F8F8F9]">
        <DashboardTopBar />
        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
