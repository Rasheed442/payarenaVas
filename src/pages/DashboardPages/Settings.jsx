import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import ProfileSettingsModal from "../../modals/ProfileSettings";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import ChangePinModal from "../../modals/ChangePinModal";
import ResetPinModal from "../../modals/ResetPinModal";
import TransactionNotificationsModal from "../../modals/TransactionNotificationsModal";
import ArrowDownIcon from "../../icons/ArrowDown";
import Button from "../../components/bits/Button";

export default function SettingsPage() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);

  const [current, setCurrent] = useState("");

  return (
    <div>
      <DashboardHeader
        title="Settings"
        desc="Change settings based on your preference."
      />

      {/* Modals */}
      {modal && <ProfileSettingsModal modal={modal} closeModal={() => setModal(false)} />}
      {modal2 && <ChangePasswordModal modal={modal2} closeModal={() => setModal2(false)} />}
      {modal3 && <ChangePinModal modal={modal3} closeModal={() => setModal3(false)} />}
      {modal4 && <ChangePinModal modal={modal4} closeModal={() => setModal4(false)} />}
      {modal5 && <ResetPinModal modal={modal5} closeModal={() => setModal5(false)} />}
      {modal6 && <TransactionNotificationsModal modal={modal6} closeModal={() => setModal6(false)} />}

      <div className="bg-white border mt-4 border-[#F0F0F0] rounded-lg">
        {/* Profile */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "profile" ? "" : "profile"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>Profile</span> <ArrowDownIcon />
          </div>
          {current === "profile" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">
                To update your profile, click the update button to proceed.
              </span>
              <Button text="UPDATE" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal(true)} />
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "password" ? "" : "password"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>Password</span> <ArrowDownIcon />
          </div>
          {current === "password" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">To change your password, click the button below.</span>
              <Button text="CHANGE PASSWORD" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal2(true)} />
            </div>
          )}
        </div>

        {/* Card Info */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "card" ? "" : "card"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>Card Info</span> <ArrowDownIcon />
          </div>
          {current === "card" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">To add a new card, click the button below.</span>
              <Button text="ADD CARD" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal(true)} />
            </div>
          )}
        </div>

        {/* PIN Change */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "pinChange" ? "" : "pinChange"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>PIN Change</span> <ArrowDownIcon />
          </div>
          {current === "pinChange" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">To change your PIN, click the button below.</span>
              <Button text="CHANGE PIN" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal4(true)} />
            </div>
          )}
        </div>

        {/* PIN Reset */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "pinReset" ? "" : "pinReset"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>PIN Reset</span> <ArrowDownIcon />
          </div>
          {current === "pinReset" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">To reset your PIN, click the button below.</span>
              <Button text="RESET PIN" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal5(true)} />
            </div>
          )}
        </div>

        {/* Transaction Notifications */}
        <div>
          <div
            onClick={() => setCurrent((prev) => (prev === "transactions" ? "" : "transactions"))}
            className="p-6 border-b border-[#F0F0F0] text-2xl flex justify-between items-center cursor-pointer"
          >
            <span>Transaction Notifications</span> <ArrowDownIcon />
          </div>
          {current === "transactions" && (
            <div className="p-6 border-b border-[#F0F0F0] grid grid-cols-2">
              <span className="text-lg">To set up notifications, click the button below.</span>
              <Button text="GET STARTED" background="#F58220" color="#ffffff" height="50px" fontSize="13px" action={() => setModal6(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
