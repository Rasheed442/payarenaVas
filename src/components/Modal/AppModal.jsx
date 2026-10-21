import React from "react";
import styled from "styled-components";
import ModalLayout from "./ModalLayout";
import DashboardHeader from "../DashboardHeader";

export default function AppModal({
  children,
  heading = "Heading",
  closeModal,
  maxWidth,
  headingSize,
  desc = "To send money, provide the details below",
  modalState,
  walletBalance = true,
}) {
  return (
    <ModalLayout
      maxWidth={maxWidth}
      closeModal={closeModal}
      modalState={modalState}
    >
      <div className="relative">
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

        <div className="relative w-full px-1 h-[85vh] overflow-hidden overflow-y-scroll">
          <DashboardHeader title={heading} desc={desc} />{" "}
          <div className="mt-[1.5rem]">
            {walletBalance && (
              <p className="text-[1rem] text-[#464255] font-poppins-light">
                Wallet Balance
              </p>
            )}
            {walletBalance && (
              <h3 className="text-[1.5rem] text-[#E66500] font-poppins-semiBold">
                ₦ 9,570,000
              </h3>
            )}
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
            <div>{children}</div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
