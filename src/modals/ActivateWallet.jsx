import React, { useEffect, useRef, useState } from "react";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import { ComboSelect, Input, PinInput, TextArea } from "../components/Fields";
import Button from "../components/bits/Button";
import * as Yup from "yup";
import Select from "../components/Fields/select";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { createWallet } from "../store/services/Wallet";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function ActivateWalletModal({ modal, closeModal, token }) {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [pin, setPin] = useState("");
  const [confirmedPin, setConfirmedPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [identityType, setIdentityType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [authCode, setAuthCode] = useState("");

  const queryClient = useQueryClient();

  const activateWallet = async (e) => {
    e.preventDefault();
    if (pin !== confirmedPin) {
      setError("Pins don't match");
      return;
    }
    try {
      const res = await createWallet({
        Pin: pin,
        AuthCode: authCode,
        Token: token,
        IdentityType: identityType,
        IdentityNumber: identityNumber,
      });

      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["getBalance"] });
      closeModal();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white mobile-sm:w-[30%] min-h-screen flex flex-col absolute right-0 p-10">
        <svg
          onClick={() => {
            closeModal();
          }}
          style={{
            marginLeft: "auto",
            cursor: "pointer",
          }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Stroke 2"
            d="M2.94235 1.01767L1.99908 0.0753195L0.114382 1.96186L1.05765 2.90421L2.94235 1.01767ZM17.0577 18.8886L18.0009 19.8309L19.8856 17.9444L18.9423 17.002L17.0577 18.8886ZM1.05765 17.002L0.114382 17.9444L1.99908 19.8309L2.94235 18.8886L1.05765 17.002ZM18.9423 2.90421L19.8856 1.96186L18.0009 0.0753195L17.0577 1.01767L18.9423 2.90421ZM1.05765 2.90421L17.0577 18.8886L18.9423 17.002L2.94235 1.01767L1.05765 2.90421ZM2.94235 18.8886L18.9423 2.90421L17.0577 1.01767L1.05765 17.002L2.94235 18.8886Z"
            fill="#252B33"
          />
        </svg>

        <div>
          <p className="text-3xl font-semibold">Activate Wallet</p>
          <p className="font-medium mt-1">
            To activate wallet, provide the details below
          </p>
        </div>
        <div>
          <p className="text-[1rem] text-[#464255] font-poppins-light">
            Wallet Balance
          </p>
          <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
            ₦ 0
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
        <form onSubmit={activateWallet}>
          <div className="flex flex-col relative">
            <label
              htmlFor="otp"
              className="text-[#004663] text-[15px] font-medium"
            >
              OTP
            </label>
            <input
              type={showOtp ? "text" : "password"}
              name="otp"
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full h-16 rounded-[4px] border border-[#CDCDCD] focus:outline-none px-4"
            />
            {showOtp ? (
              <PiEye
                onClick={() => setShowOtp(false)}
                className="absolute right-4 top-12"
              />
            ) : (
              <PiEyeSlash
                onClick={() => setShowOtp(true)}
                className="absolute right-4 top-12"
              />
            )}
          </div>
          <div className="flex flex-col mt-4 relative">
            <label
              htmlFor="pin"
              className="text-[#004663] text-[15px] font-medium"
            >
              Enter PIN
            </label>
            <input
              type={showPin ? "text" : "password"}
              name="pin"
              onChange={(e) => setPin(e.target.value)}
              className="w-full h-16 rounded-[4px] border border-[#CDCDCD] focus:outline-none px-4"
            />
            {showPin ? (
              <PiEye
                onClick={() => setShowPin(false)}
                className="absolute right-4 top-12"
              />
            ) : (
              <PiEyeSlash
                onClick={() => setShowPin(true)}
                className="absolute right-4 top-12"
              />
            )}
          </div>

          <div className="flex flex-col mt-4 relative">
            <label
              htmlFor="confirmPin"
              className="text-[#004663] text-[15px] font-medium"
            >
              Confirm PIN
            </label>
            <input
              type={confirmPin ? "text" : "password"}
              name="confirmPin"
              onChange={(e) => setConfirmedPin(e.target.value)}
              className="w-full h-16 rounded-[4px] border border-[#CDCDCD] focus:outline-none px-4"
            />
            {confirmPin ? (
              <PiEye
                onClick={() => setConfirmPin(false)}
                className="absolute right-4 top-12"
              />
            ) : (
              <PiEyeSlash
                onClick={() => setConfirmPin(true)}
                className="absolute right-4 top-12"
              />
            )}
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="idType"
              className="text-[#004663] text-[15px] font-medium"
            >
              Identification Type
            </label>
            <select
              name="idType"
              id="idType"
              value={identityType}
              onChange={(e) => setIdentityType(e.target.value)}
              className="h-[50px] w-full border border-[#CDCDCD] px-4 rounded-[4px] focus:outline-none"
              required
            >
              <option value="">Select Identification Type</option>

              <option value="bvn">BVN</option>
              <option value="nin">NIN</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label
              htmlFor="identificationNumber"
              className="text-[#004663] text-[15px] font-medium"
            >
              Identification Number
            </label>
            <input
              type="text"
              name="identificationNumber"
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="w-full h-16 rounded-[4px] border border-[#CDCDCD] focus:outline-none px-4"
            />
          </div>
          {error && <p className="text-red">{error}</p>}
          <button
            type="submit"
            className="w-full h-16 bg-accent1 text-white rounded-lg mt-8"
          >
            ACTIVATE WALLET
          </button>
        </form>

        {/* <div
        className={
          (steps === 1 && "opacity-1 pointer-events-auto transition-all") ||
          "opacity-0 pointer-events-none absolute top-0 transition-all"
        }
      >
       <form>

       </form>
      </div> */}
      </div>
    </div>
  );
}
