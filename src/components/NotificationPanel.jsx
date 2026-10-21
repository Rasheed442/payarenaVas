import React from "react";
import Bug from "../assets/icons/Bug";
import NotiBug from "../assets/images/Noti-bug.png";
import Dots from "../assets/icons/dashboardIIcons/Dots";

export default function NotificationPanel() {
  return (
    <div className="rounded-xl bg-white p-[10%] h-full">
      <div className="flex items-center justify-between">
        <div className="font-bold">Notifications</div>
        <Dots className="cursor-pointer" />
      </div>

      <div>
        <div className="flex mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start mt-[8%]">
          <img src={NotiBug} className="w-6 h-6" />
          <div className="ml-[6%] text-[0.8vw]">
            <div>
              First of Nigeria is currently experiencing transaction downtime.
            </div>
            <div className="text-[#00000066]">Just now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
