import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CryptoJS from "crypto-js";
import AppModal from "../components/Modal/AppModal";
import { Field, Form, Formik } from "formik";
import { ComboSelect, Input, PinInput, TextArea } from "../components/Fields";
import Button from "../components/bits/Button";
import Iphone from "../assets/images/activeIphone.png";
import DownloadIcon from "../assets/images/feather_upload-cloud.png";
import { processBulk, validateBulk } from "../store/services/Wallet";
import { useNavigate } from "react-router-dom";

export default function BulkPaymentsModal({
  modal,
  closeModal,
  hasWallet,
  dataBalance,
}) {
  const [error, setError] = useState();
  const [pin, setPin] = useState();
  const [initialState, setInitialState] = useState(true);
  const [initialState2, setInitialState2] = useState(false);
  const [initialState3, setInitialState3] = useState(false);
  const [initialState4, setInitialState4] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  // const [batchId,setBatchId] = useState("");
  // const [totalAmount,setTotalAmount] = useState();
  // const [count,setCount] = useState();
  const [scheme, setScheme] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const openFilePicker = () => fileInputRef.current?.click();


 const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  processFile(file);
  e.target.value = ""; // lets the user re-select the same file later
};


const processFile = (file) => {
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["xls", "xlsx"].includes(ext)) {
    toast.error("Only Excel files (.xls, .xlsx) are allowed!");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    toast.error("File size exceeds 10MB");
    return;
  }

  setSelectedFile(file);
};

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("File", selectedFile);

    try {
      const res = await validateBulk(formData);
      setData(res.Data);
      setInitialState(false);
      setInitialState2(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  const makePayment = (e) => {
    e.preventDefault();
    setInitialState2(false);
    setInitialState3(true);
  };

  const processPayment = async (e) => {
    e.preventDefault();
    const key = CryptoJS.enc.Utf8.parse("240B07179B22C8B5"); // 16-byte key
    const iv = CryptoJS.enc.Utf8.parse("C267E4C6C84F1A40");
    let info = {
      Scheme: scheme,
      Pin: pin,
    };

    const dataString = JSON.stringify(info);

    const encrypted = CryptoJS.AES.encrypt(dataString, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    try {
      if (scheme === "card") {
        const res = await processBulk({
          BatchId: data.BatchId,
          Scheme: scheme,
        });
        window.location.href = res.Data.Url;
      } else {
        const res = await processBulk({
          BatchId: data.BatchId,
          Scheme: scheme,
          PaymentInformation: encryptedHex,
        });
        setInitialState3(false);
        setInitialState4(true);
        if (res.Success === true) {
          setIsSuccess(true);
        }
        setTransactionDetails(res.Data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  useEffect(() => {
    if (initialState4) {
      const timer = setTimeout(() => {
        navigate(
          `/transaction-report?transactionid=${transactionDetails?.reference}`
        ); // Replace with your actual target URL
      }, 5000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [initialState4, navigate]);

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="bg-white w-full mobile-sm:w-1/2 min-md2:w-[30%] min-h-screen flex flex-col absolute right-0 p-10">
        <svg
          onClick={() => closeModal()}
          style={{
            width: "20px",
            height: "20px",
            minWidth: "20px",
            minHeight: "20px",
            marginLeft: "auto",
            cursor: "pointer",
          }}
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

        {initialState && (
          <>
            <div>
              <p className="text-3xl font-semibold text-[#464255]">
                Bulk Payment
              </p>
              <p className="font-medium mt-1 text-lg text-[#464255]">
                To buy Data, provide the details below
              </p>
            </div>
            {hasWallet && (
              <div className="mt-4">
                <p className="text-[1rem] text-[#464255] font-poppins-light">
                  Wallet Balance
                </p>
                <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
                  ₦ {dataBalance?.Data?.balance}
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

            {/* <p className="font-medium text-[15px] text-[#004663]">
              Select Category
            </p> */}
            {/* <div className="flex">
              <div className="flex-col border-b-2 border-orange pb-2">
                <img src={Iphone} className="w-[25px] h-[25px]" />
                <p className="text-[9px] text-orange font-semibold">Airtime</p>
                <p className="text-[9px] text-orange font-semibold">Vending</p>
              </div>
            </div> */}
       <form onSubmit={initiatePayment}>
  {/* Single hidden input, outside the clickable dropzone */}
  <input
    type="file"
    ref={fileInputRef}
    accept=".xls,.xlsx"
    className="hidden"
    onChange={handleFileChange}
  />

  <div
    onClick={openFilePicker}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`border border-dashed rounded-[10px] pl-8 pr-6 py-4 flex justify-between items-center min-md2:w-[400px] mt-4 cursor-pointer ${
      isDragging ? "border-orange bg-orange bg-opacity-10" : ""
    }`}
  >
    <img src={DownloadIcon} className="h-6 w-6" alt="" />

    <div className="px-2 text-center">
      {selectedFile ? (
        <p className="font-medium text-[13px] text-[#030229] break-all">
          {selectedFile.name}
        </p>
      ) : (
        <>
          <p className="font-medium text-[13px] text-[#030229]">
            Select a file or drag and drop here
          </p>
          <p className="text-[#03022980] text-[12px]">
            Ms Excel - file size no more than 10MB
          </p>
        </>
      )}
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); // prevents the div's onClick from firing too
        openFilePicker();
      }}
      className="border border-orange text-orange px-2 w-[80px] h-[29px] rounded-[5px] text-[10px] font-bold"
    >
      {selectedFile ? "CHANGE" : "SELECT FILE"}
    </button>
  </div>

  <div className="mt-1 flex justify-center">
    <a
      href="https://payarena.com:442/app/downloads/bulk-airtime.xlsx"
      download
      className="text-[#004663] font-medium text-[10px] underline text-center"
    >
      Download Excel format here
    </a>
  </div>

  <div>
    <button
      type="submit"
      disabled={!selectedFile}
      className="bg-[#F58220] disabled:opacity-50 mobile:mt-0 md2:mt-6 min-md2:absolute min-md2:bottom-6 text-white px-4 py-3 w-full min-md2:w-[400px] h-[50px] rounded-[8px] text-[16px] font-bold"
    >
      PROCEED
    </button>
  </div>
</form>
          </>
        )}
        {initialState2 && (
          <>
            <div>
              <p className="text-3xl font-semibold text-[#464255]">
                Airtime Purchase
              </p>
              <p className="font-medium mt-1 text-lg text-[#464255]">
                To buy airtime, provide the details below
              </p>
            </div>
            {hasWallet && (
              <div className="mt-4">
                <p className="text-[1rem] text-[#464255] font-poppins-light">
                  Wallet Balance
                </p>
                <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
                  ₦ {dataBalance?.Data?.balance}
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
            <form onSubmit={makePayment}>
              <div className="flex flex-col">
                <label
                  htmlFor="payment-method"
                  className="font-medium text-[15px] text-[#004663]"
                >
                  Payment Method
                </label>
                <select
                  name="merchant"
                  className="min-md2::w-[400px] mt-1 px-2 h-16 border border-[#CDCDCD] text-[#181B24] text-[16px] font-medium rounded-[4px] focus:outline-none"
                  onChange={(e) => setScheme(e.target.value)}
                >
                  <option value="">Select Payment Method</option>
                  <option value="card">Card/Payment</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
              {scheme === "wallet" && (
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="pin"
                    className="text-[#004663] text-[15px] font-medium"
                  >
                    PIN
                  </label>
                  <input
                    type="password"
                    name="pin"
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full h-16 rounded-[4px] border border-[#CDCDCD] focus:outline-none px-4"
                  />
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="bg-[#F58220] mobile:mt-0 md2:mt-6 min-md2:absolute min-md2:bottom-6 text-white px-4 py-3 w-full min-md2:w-[400px] h-[50px] rounded-[8px] text-[16px] font-bold"
                >
                  PROCEED
                </button>
              </div>
            </form>
          </>
        )}
        {initialState3 && (
          <>
            <div>
              <p className="text-3xl font-semibold text-[#464255]">
                Airtime Purchase
              </p>
              <p className="font-medium mt-1 text-lg text-[#464255]">
                Transaction Summary
              </p>
            </div>
            {hasWallet && (
              <div className="mt-4">
                <p className="text-[1rem] text-[#464255] font-poppins-light">
                  Wallet Balance
                </p>
                <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
                  ₦ {dataBalance?.Data?.balance}
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
            <div className="border border-dashed">
              <div className="p-6 min-md:flex justify-between items-center border border-b border-[#d7d7d783]">
                <div>
                  <div className="text-sm text-[#6A6A6A]">Amount</div>
                  <div className="text-lg">₦ {data.TotalAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-[#6A6A6A] min-md:text-right">
                    Payment Method
                  </div>
                  <div className="text-lg">
                    {scheme === "card" ? "Card/Payment" : "Wallet"}
                  </div>
                </div>
              </div>
              <div className="p-6 min-md:flex justify-between items-center border border-b border-[#d7d7d783]">
                <div>
                  <div className="text-sm text-[#6A6A6A]">Transaction Type</div>
                  <div className="text-lg">Bulk Airtime Top-up</div>
                </div>
                <div>
                  <div>
                    <div className="text-sm text-[#6A6A6A] min-md:text-right">
                      Description
                    </div>
                    <div className="text-lg">{data.Description}</div>
                  </div>
                </div>
              </div>
              {/* <div className="p-6">
                <div>
                  <div className="text-sm text-[#6A6A6A]">Description</div>
                  <div className="text-lg">Airtime Top-up</div>
                </div>
              </div> */}
            </div>
            <div>
              <button
                type="button"
                onClick={processPayment}
                className="bg-[#F58220] mobile:mt-0 md2:mt-6 min-md2:absolute min-md2:bottom-6 text-white px-4 py-3 w-full min-md2:w-[400px] h-[50px] rounded-[8px] text-[16px] font-bold"
              >
                PROCEED
              </button>
            </div>
          </>
        )}
        {initialState4 && (
          <div className="flex items-center justify-center min-h-[400px] w-full">
            <div className="flex flex-col items-center">
              <span>
                {isSuccess ? (
                  <svg
                    width="70"
                    height="71"
                    viewBox="0 0 70 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.000166306 36.213C0.000166389 34.3112 0.143698 32.3736 0.466643 30.4359C2.83492 15.7597 14.7481 3.8107 29.4242 1.44242C48.2987 -1.60764 66.0967 10.5567 69.9003 29.18C70.1873 30.6512 69.2544 32.0506 67.819 32.3736C66.3478 32.6606 64.9484 31.7277 64.6255 30.2924C61.396 14.5397 46.3251 4.20541 30.2854 6.82487C17.8699 8.83432 7.78678 18.9174 5.77733 31.333C3.19375 47.4444 13.5639 62.4794 29.3883 65.673C30.8595 65.9601 31.7925 67.3954 31.5054 68.8307C31.2184 70.3019 29.7831 71.2349 28.3477 70.9478C11.5904 67.5389 0.000165577 52.8986 0.000166306 36.213Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M33.112 47.8703C32.2445 47.8703 31.4204 47.5233 30.8131 46.9161L23.9598 40.1061C22.7019 38.8482 22.6585 36.7662 23.9598 35.5083C25.2176 34.2504 27.2997 34.207 28.5576 35.5083L32.9385 39.8458L45.5174 25.1415C46.6886 23.7535 48.7272 23.6234 50.1152 24.7945C51.4599 25.9657 51.6334 28.0043 50.4622 29.3923L35.6278 46.7426C35.0205 47.4366 34.1964 47.827 33.2855 47.8703C33.1988 47.8703 33.1554 47.8703 33.112 47.8703Z"
                      fill="#27AE60"
                    />
                  </svg>
                ) : (
                  <svg
                    width="70"
                    height="71"
                    viewBox="0 0 70 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.4236e-05 35.2384C4.43192e-05 33.3366 0.143576 31.399 0.466521 29.4613C2.8348 14.7851 14.748 2.83609 29.4241 0.467808C48.2986 -2.58225 66.0965 9.58209 69.9001 28.2054C70.1872 29.6766 69.2542 31.076 67.8189 31.399C66.3477 31.686 64.9483 30.7531 64.6253 29.3177C61.3959 13.5651 46.325 3.2308 30.2853 5.85026C17.8698 7.85971 7.78666 17.9428 5.77721 30.3583C3.19363 46.4698 13.5638 61.5048 29.3882 64.6984C30.8594 64.9854 31.7924 66.4208 31.5053 67.8561C31.2183 69.3273 29.7829 70.2603 28.3476 69.9732C11.5903 66.5643 4.35067e-05 51.924 4.4236e-05 35.2384Z"
                      fill="#FF0000"
                    />
                  </svg>
                )}
              </span>
              <p className="text-[#464255] font-semibold text-2xl">
                {isSuccess
                  ? "Transaction Successful"
                  : "Transaction Unsuccessful"}
              </p>
              <p className="text-sm text-[#464255]">
                {isSuccess
                  ? "Your transaction was successful"
                  : "Your transaction was not successful"}
              </p>
              <button
                type="button"
                onClick={() => closeModal()}
                className="bg-[#F58220] mobile:mt-0 md2:mt-6 min-md2:mt-4 text-white px-4 py-3 w-full min-md2:w-[400px] h-[50px] rounded-[8px] text-[16px] font-bold"
              >
                Redirecting...
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
