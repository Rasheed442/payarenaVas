import Card from "../assets/images/card.png";
import NairaIcon from "../assets/icons/dashboardIIcons/nairaIcon.jsx";
import NairaIcon2 from "../assets/icons/dashboardIIcons/nairaIcon2.jsx";
import React from "react";

export default function MainSectionCardTransfer({
  actionTitle1,
  actionTitle2,
  action1,
  action2,
}) {
  return (
    <div className="col-span-2 text-center grid place-items-center pr-[1.2vw]">
      <div className="w-[80%]">
        <div
          onClick={() => {
            action1(true);
          }}
          className="p-[0.7vw] cursor-pointer bg-white shadow-xl rounded-lg flex justify-between items-center flex-col"
        >
          <NairaIcon />
          <div className="text-[10px] font-bold">{actionTitle1}</div>
        </div>
        {/* 
        <div
          onClick={() => {
            action2(true);
          }}
          className="p-[0.7vw] cursor-pointer bg-accent1 rounded-lg flex justify-between items-center mt-4 flex-col"
        >
          <NairaIcon2 width="50" />
          <div className="text-white text-[10px] font-bold">{actionTitle2}</div>
        </div> */}
      </div>
    </div>
  );
}
