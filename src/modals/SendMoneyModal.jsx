import React, { useRef, useState } from "react";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import { ComboSelect, Input, PinInput, TextArea } from "../components/Fields";
import Button from "../components/bits/Button";
import * as Yup from "yup";
import OTPInput from "react-otp-input";

export default function SendMoneyModal({ modal, closeModal }) {
  const formRef = useRef();
  const [error, setError] = useState();
  const [pin, setPin] = useState();
  const [steps, setSteps] = useState(0);
  const [otp, setOtp] = useState("");
  const [initailState, setInitailState] = useState(true);
  const [initailState1, setInitailState1] = useState(false);
  const [initailState2, setInitailState2] = useState(false);
  const [initailState3, setInitailState3] = useState(false);
  const [initailState4, setInitailState4] = useState(true);
  console.log(initailState);
  console.log(steps);

  const handleSubmit = () => {
    setInitailState(false);
    setInitailState1(true);
  };

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white mobile-sm:w-[30%] min-h-screen flex flex-col absolute right-0 p-10">
        <svg
          onClick={() => closeModal()}
          style={{ marginLeft: "auto", cursor: "pointer" }}
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
          <p className="text-3xl font-semibold">Send Money</p>
          <p className="font-medium mt-1">
            To send money, provide the details below
          </p>
        </div>
        <div>
          <p className="mt-3 text-[1rem] text-[#464255] font-poppins-light">
            Wallet Balance
          </p>
          <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
            ₦ 9,570,000
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
        {initailState && (
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="amount">Amount</label>
              <input
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                type="number"
                error={error}
                showError={error}
                label="Amount"
                name="amount"
                placeHolder="Enter Amount"
              />
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              <label htmlFor="category"> Select Beneficiary Bank</label>
              <select
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                name="category"
                id=""
              >
                <option className="text-gray-light">select bank</option>
                <option className="text-gray-dark">Hola</option>
                <option className="text-gray-dark">Hello</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Acct">Account Number</label>
              <input
                className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                type="number"
                error={error}
                showError={error}
                label="Acct"
                name="Acct"
                placeHolder="0123456890"
              />
            </div>
            <div
              className={
                (steps === 0 &&
                  "opacity-1 pointer-events-auto relative  transition-all") ||
                "opacity-0 pointer-events-none absolute top-0 transition-all"
              }
            >
              <div className="border-dashed border rounded-lg border-[#a3a3a3c1] mt-5">
                <div className="p-6 flex justify-between items-center border-b border-[#d7d7d783]">
                  <div>
                    <div className="text-sm text-[#6A6A6A]">Account Number</div>
                    <div className="text-lg">0123456789</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#6A6A6A] text-right">
                      Bank Name
                    </div>
                    <div className="text-lg">Guarantee Trust Bank</div>
                  </div>
                </div>
                <div className="p-6">
                  <div>
                    <div className="text-sm text-[#6A6A6A]">
                      Beneficiary Name
                    </div>
                    <div className="text-lg">Daniel Adekoya</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setInitailState(false);
                  setInitailState1(true);
                  setSteps((prevSteps) => prevSteps + 1); // ✅ Correct way to increment state
                }}
                type="submit"
                className="w-full h-[50px] rounded-md flex flex-row-reverse justify-center font-semibold items-center mt-16 text-[13px] bg-[#f58220] text-white"
              >
                PROCEED
              </button>
            </div>
          </form>
        )}
        {initailState1 && (
          <div
            className={
              (steps === 1 && "opacity-1 pointer-events-auto transition-all") ||
              "opacity-0 pointer-events-none absolute top-0 transition-all"
            }
          >
            <form className="flex flex-col gap-3" action="">
              <div className="flex flex-col gap-2">
                {" "}
                <label htmlFor="category"> Payment Method</label>
                <select
                  className="border border-[#EFF0F6] rounded-[.4rem] h-[55px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                  name="category"
                  id=""
                >
                  <option disabled className="text-gray-light">
                    select payment method
                  </option>
                  <option className="text-gray-light">wallet</option>
                  <option className="text-gray-light">card</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="amount">Description</label>
                <textarea
                  className="border border-[#EFF0F6] rounded-[.4rem] h-[120px] w-[100%] px-[1rem] outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm caret-primary disabled:bg-gray-100"
                  type="number"
                  error={error}
                  showError={error}
                  label="Amount"
                  name="amount"
                  placeHolder="Enter"
                />
              </div>

              <button
                onClick={() => {
                  console.log("hello");
                  setInitailState(false);
                  setInitailState1(false);
                  setInitailState2(true);
                  setSteps((prevSteps) => prevSteps + 1); // ✅ Correct way to increment state
                }}
                type="button"
                className="w-full h-[50px] cursor-pointer rounded-md flex flex-row-reverse justify-center font-semibold items-center mt-16 text-[13px] bg-[#f58220] text-white"
              >
                PROCEED
              </button>
            </form>
          </div>
        )}
        {initailState2 && (
          <form>
            {" "}
            <div
              className={
                (steps === 2 &&
                  "opacity-1 pointer-events-auto relative  transition-all") ||
                "opacity-0 pointer-events-none absolute top-0 transition-all"
              }
            >
              <div className="border-dashed border rounded-lg border-[#a3a3a3c1] mt-5">
                <div className="p-3 py-6 flex justify-between items-center border-b border-[#d7d7d783]">
                  <div>
                    <div className="text-[11px] text-[#6A6A6A]">Amount</div>
                    <div className="text-[13px]">2,000,000</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6A6A6A]">
                      Payment Method
                    </div>
                    <div className="text-[13px]">wallet</div>
                  </div>
                </div>

                <div className="p-3 py-6 flex justify-between items-center border-b border-[#d7d7d783]">
                  <div>
                    <div className="text-[11px] mb-2 text-[#6A6A6A]">
                      Beneficiary Name
                    </div>
                    <div className="text-[13px]">Daniel Adekoya</div>
                  </div>
                  <div>
                    <div className="text-[11px] mb-2 text-[#6A6A6A]">
                      Account Number
                    </div>
                    <div className="text-[13px]">0123456789</div>
                  </div>
                  <div>
                    <div className="text-[11px] mb-2 text-[#6A6A6A] text-right">
                      Bank Name
                    </div>
                    <div className="text-[13px]">Guarantee Trust Bank</div>
                  </div>
                </div>
                <div className="p-3 py-6">
                  <div>
                    <div className="text-[11px] text-[#6A6A6A]">
                      Description
                    </div>
                    <div className="text-[13px]">
                      Payment for Inverter Installation
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setInitailState(false);
                  setInitailState1(false);
                  setInitailState2(false);
                  setInitailState3(true);
                  setSteps((prevSteps) => prevSteps + 1); // ✅ Correct way to increment state
                }}
                type="submit"
                className="w-full h-[50px] rounded-md flex flex-row-reverse justify-center font-semibold items-center mt-16 text-[13px] bg-[#f58220] text-white"
              >
                PROCEED
              </button>
            </div>
          </form>
        )}
        {initailState3 && (
          <div
            className={
              (steps === 3 && "opacity-1 pointer-events-auto transition-all") ||
              "opacity-0 pointer-events-none absolute top-0 transition-all"
            }
          >
            <div className="flex flex-col gap-4">
              <label className="text-base font-medium text-gray-500">
                Enter your four digit pin
              </label>
              <div className="flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={
                    <span className="mx-2 text-gray-500">-</span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-12 flex p-6 h-12 text-center border border-gray rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-semibold text-black"
                    />
                  )}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setInitailState(false);
                setInitailState1(false);
                setInitailState2(false);
                setInitailState3(false);
                setInitailState4(true);
                setSteps((prevSteps) => prevSteps + 1); // ✅ Correct way to increment state
              }}
              type="submit"
              className="w-full h-[50px] rounded-md flex flex-row-reverse justify-center font-semibold items-center mt-16 text-[13px] bg-[#f58220] text-white"
            >
              PROCEED
            </button>
          </div>
        )}

        {initailState4 && (
          <div
            className={
              (steps === 4 && "opacity-1 pointer-events-auto transition-all") ||
              "opacity-0 pointer-events-none absolute top-0 transition-all"
            }
          >
            <div className="flex flex-col gap-2 items-center">
              <svg
                width="70"
                height="71"
                viewBox="0 0 70 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-7.78343e-05 36.213C-7.77511e-05 34.3112 0.143454 32.3736 0.466399 30.4359C2.83468 15.7597 14.7478 3.8107 29.424 1.44242C48.2984 -1.60764 66.0964 10.5567 69.9 29.18C70.1871 30.6512 69.2541 32.0506 67.8188 32.3736C66.3476 32.6606 64.9482 31.7277 64.6252 30.2924C61.3957 14.5397 46.3249 4.20541 30.2852 6.82487C17.8697 8.83432 7.78654 18.9174 5.77709 31.333C3.19351 47.4444 13.5637 62.4794 29.3881 65.673C30.8593 65.9601 31.7923 67.3954 31.5052 68.8307C31.2181 70.3019 29.7828 71.2349 28.3475 70.9478C11.5901 67.5389 -7.85636e-05 52.8986 -7.78343e-05 36.213Z"
                  fill="#27AE60"
                />
                <path
                  d="M33.112 47.8703C32.2445 47.8703 31.4204 47.5233 30.8131 46.9161L23.9598 40.1061C22.7019 38.8482 22.6585 36.7662 23.9598 35.5083C25.2176 34.2504 27.2997 34.207 28.5576 35.5083L32.9385 39.8458L45.5174 25.1415C46.6886 23.7535 48.7272 23.6234 50.1152 24.7945C51.4599 25.9657 51.6334 28.0043 50.4622 29.3923L35.6278 46.7426C35.0205 47.4366 34.1964 47.827 33.2855 47.8703C33.1988 47.8703 33.1554 47.8703 33.112 47.8703Z"
                  fill="#27AE60"
                />
              </svg>

              <p className="text-2xl text-[#464255] font-semibold">
                Transaction Successful
              </p>
              <p className="text-sm text-[#464255">
                Your transaction was successful
              </p>
            </div>

            <button
              onClick={() => {
                // setInitailState(false);
                // setInitailState1(false);
                // setInitailState2(false);
                // setInitailState3(false);
                // setInitailState4(false);
                closeModal();
                // setSteps((prevSteps) => prevSteps + 1); // ✅ Correct way to increment state
              }}
              type="submit"
              className="w-full h-[50px] rounded-md flex flex-row-reverse justify-center font-semibold items-center mt-16 text-[13px] bg-[#f58220] text-white"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
