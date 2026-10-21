import DownloadAndroidIcon from "../assets/icons/downloadAndroid.png";
import DownloadAppleIcon from "../assets/icons/downloadApple.png";
import React from "react";

export default function DownloadComponent({ appName = "Payarena" }) {
  return (
    <div className=" text-[#797979] grid place-items-center font-medium w-[400px] h-[300px] px-[2%] rounded-2xl bg-[#2F3355] sm:py-[2rem] md:w-full">
      <div>
        <div className="text-white text-[2rem] font-semibold mt-[2%] text-center sm:text-[1.5rem]">
          Download {appName} <br /> Mobile today!
        </div>
        <div className=" text-[1rem] my-[7%] text-center text-white font-generalsans-light">
          It is a long established fact that a reader will be distracted layout.
        </div>

        <div className="flex justify-between">
          <a
            className="w-[66%]"
            href="https://play.google.com/store/apps/details?id=com.unifiedpayment.payarena"
            target="_blank"
          >
            {/* < width="100%" /> */}
            <img
              src={DownloadAndroidIcon}
              alt=""
              width="100%"
              className="sm:w-[130px]"
            />
          </a>
          &nbsp; &nbsp;
          <a
            className="w-[66%]"
            href="https://apps.apple.com/ng/app/payarena/id1637449009"
            target="_blank"
          >
            <img
              src={DownloadAppleIcon}
              alt=""
              width="100%"
              className="sm:w-[130px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
