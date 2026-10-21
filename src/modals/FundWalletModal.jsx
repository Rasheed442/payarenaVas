import React, { useEffect, useRef, useState } from "react";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import { ComboSelect, Input, PinInput, TextArea } from "../components/Fields";
import Button from "../components/bits/Button";
import * as Yup from "yup";
import { GetReward } from "../store/services/Wallet";

export default function FundWalletModal({
  modal,
  closeModal,
  hasWallet,
  data,
}) {
  const formRef = useRef();
  const [reward, setReward] = useState();
  const [pin, setPin] = useState();

  const [steps, setSteps] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        toast.error("Unable to copy to clipboard. Please try again.");
        console.error("Copy to clipboard failed:", err);
      });
  };

  const handleCopyToClipboard = (textToCopy) => {
    copyToClipboard(textToCopy);
  };
   const LoyaltyReward = async () => {
     try {
       const res = await GetReward();
       if (res.Success === true) {
         setReward(res.Data);
       } else {
         setReward(false);
       }
       return res;
     } catch (error) {
       if (error.response) {
         toast.error(error.response.message);
       }
     }
   };
 useEffect(()=>{
  LoyaltyReward()
 }, [])

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white mobile-sm:w-[30%] h-screen flex flex-col absolute right-0 p-10">
        <svg
          onClick={() => {
            closeModal();
          }}
          style={{
            width: "60px",
            marginLeft: "auto",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          width="40"
          height="42"
          viewBox="0 0 40 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.5002 9.99224C30.1888 9.66455 29.7661 9.48039 29.3252 9.48039C28.8843 9.48039 28.4616 9.66455 28.1502 9.99224L20.0002 18.5322L11.8502 9.97474C11.5388 9.64705 11.1161 9.46289 10.6752 9.46289C10.2343 9.46289 9.81158 9.64705 9.5002 9.97474C8.8502 10.6572 8.8502 11.7597 9.5002 12.4422L17.6502 20.9997L9.5002 29.5572C8.8502 30.2397 8.8502 31.3422 9.5002 32.0247C10.1502 32.7072 11.2002 32.7072 11.8502 32.0247L20.0002 23.4672L28.1502 32.0247C28.8002 32.7072 29.8502 32.7072 30.5002 32.0247C31.1502 31.3422 31.1502 30.2397 30.5002 29.5572L22.3502 20.9997L30.5002 12.4422C31.1335 11.7772 31.1335 10.6572 30.5002 9.99224Z"
            fill="#212121"
          />
        </svg>
        <div>
          <p className="text-3xl font-semibold">Fund Wallet</p>
          <p className="font-medium mt-1">
            To fund wallet, transfer to the account details below
          </p>
        </div>
        {hasWallet && (
          <div>
            <p className="text-[1rem] text-[#464255] font-poppins-light">
              Wallet Balance
            </p>
            <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
              ₦ {data?.Data?.balance}
            </h3>
            <svg
              className="my-[6%]"
              width="102"
              height="1"
              viewBox="0 0 102 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.498372"
                d="M1 0.499512H101"
                stroke="#A7A9C0"
                stroke-linecap="square"
              />
            </svg>
          </div>
        )}
        <div className="border-dashed border rounded-lg border-[#a3a3a3c1]">
          <div className="p-6 min-md:flex justify-between items-center border-b border-[#d7d7d783]">
            <div>
              <div className="text-sm text-[#6A6A6A] flex gap-3">
                <p>Account Number</p>
                <span
                  onClick={() =>
                    handleCopyToClipboard(data?.Data?.accountNumber)
                  }
                  className="cursor-pointer"
                >
                  <svg
                    width="60"
                    height="15"
                    viewBox="0 0 60 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Original clipboard icon with corrected style prop */}
                    <mask
                      id="mask0_4938_97"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="15"
                      height="15"
                    >
                      <path
                        d="M0.5 0.971924H14.5V14.9719H0.5V0.971924Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_4938_97)">
                      <path
                        d="M10.4994 4.10059C10.702 4.10059 10.8982 4.1712 11.0531 4.29785L11.1166 4.35547C11.2596 4.49831 11.3486 4.68539 11.3685 4.88477L11.3724 4.9707V13.4717C11.372 13.6731 11.3017 13.867 11.1752 14.0215L11.1176 14.0859C10.9544 14.2491 10.733 14.3406 10.5023 14.3408H2.00134C1.52109 14.3407 1.13237 13.9519 1.1322 13.4717V4.97168L1.13611 4.88574C1.15298 4.71496 1.21987 4.55277 1.32849 4.41992L1.38708 4.35547C1.52989 4.21267 1.71716 4.1244 1.91638 4.10449L2.00232 4.10059H10.4994Z"
                        stroke="#515151"
                        strokeWidth="1.25926"
                      />
                      <path
                        d="M13.0006 1.60083C13.2016 1.60164 13.3953 1.67168 13.5494 1.7981L13.6129 1.85571C13.7763 2.01908 13.8678 2.24089 13.8678 2.47192V11.4709L13.8639 11.5569C13.8449 11.7496 13.7611 11.9304 13.6266 12.0715V4.96997L13.6227 4.80884C13.5372 3.1567 12.1704 1.84204 10.4967 1.84204H3.39807C3.53898 1.70825 3.71964 1.62567 3.91174 1.60669L3.99768 1.60181H13.0006V1.60083Z"
                        stroke="#515151"
                        strokeWidth="1.25926"
                      />
                    </g>

                    {/* "Copy" text added */}
                    <text
                      x="22"
                      y="12"
                      fontFamily="Arial, sans-serif"
                      fontSize="12"
                      fill="#515151"
                      fontWeight="500"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </text>
                  </svg>
                </span>
              </div>
              <div className="text-lg">{data?.Data?.accountNumber}</div>
            </div>
            <div>
              <div className="text-sm text-[#6A6A6A] min-md:text-right">
                Bank Name
              </div>
              <div className="text-lg">Hope Bank</div>
            </div>
          </div>
          <div className="p-6">
            <div>
              <div className="text-sm text-[#6A6A6A]">Beneficiary Name</div>
              <div className="text-lg">{data?.Data?.accountName}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-3">
          {reward}
          <div><button className="flex bg-[#F58220] p-1 text-white rounded-md text-sm ">Claim Reward</button></div>
        </div>
        <Button
          text="DONE"
          background="#F58220"
          color="#ffffff"
          style={{ flexDirection: "row-reverse", marginTop: "4rem" }}
          height="50px"
          fontSize="13px"
        />
      </div>
    </div>
  );
}
