import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import NairaIcon from "../../assets/icons/dashboardIIcons/nairaIcon";
import NairaIcon2 from "../../assets/icons/dashboardIIcons/nairaIcon2";
import Card from "../../assets/images/card.png";
import MainSection from "../../components/MainSection";
import DataVendingModal from "../../modals/DataVendingModal";
import AirtimeVendingModal from "../../modals/AirtimeVendingModal";
import SendMoneyModal from "../../modals/SendMoneyModal";
import ScheduleTransferModal from "../../modals/ScheduleTransferModal";

export default function PaymentsPage() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  return (
    <div>
      <DashboardHeader
        title="Transfer Dashboard"
        desc="Realtime Insight on various transactions"
      />

      <SendMoneyModal
        modal={modal}
        closeModal={() => {
          setModal(false);
        }}
      />
      <ScheduleTransferModal
        modal={modal2}
        closeModal={() => {
          setModal2(false);
        }}
      />
      <AirtimeVendingModal
        modal={modal3}
        closeModal={() => {
          setModal3(false);
        }}
      />

      <DataVendingModal
        modal={modal4}
        closeModal={() => {
          setModal4(false);
        }}
      />

      <MainSection
        action1={setModal}
        actionTitle1="Bills Payments"
        action2={setModal2}
        actionTitle2="Schedule Payments"
        action3={setModal3}
        actionTitle3="Airtime Vending"
        action4={setModal4}
        actionTitle4="Data Vending"
      />
    </div>
  );
}
