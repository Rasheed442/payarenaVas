import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import Card from "../../assets/images/card.png";
import NairaIcon2 from "../../assets/icons/dashboardIIcons/nairaIcon2";
import NairaIcon from "../../assets/icons/dashboardIIcons/nairaIcon";
import ApexCharts from "react-apexcharts";
import AppModal from "../../components/Modal/AppModal";
import SendMoneyModal from "../../modals/SendMoneyModal";
import MainSection from "../../components/MainSection.jsx";
import FundWalletModal from "../../modals/FundWalletModal";
import AirtimeVendingModal from "../../modals/AirtimeVendingModal";
import DataVendingModal from "../../modals/DataVendingModal";
import NotificationPanel from "../../components/NotificationPanel.jsx";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Pagination from "../../components/Pagination.jsx";
import ActivateWalletModal from "../../modals/ActivateWallet.jsx";
import {
  getGraphData,
  otpWallet,
  walletBalance,
} from "../../store/services/Wallet.jsx";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import BulkPaymentsModal from "../../modals/BulkPaymentsModal.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [hasWallet, setHasWallet] = useState(true);

  const navigate = useNavigate();
  const transactions = [
    {
      id: "#CM9801",
      Institution: "First Bank",
      BeneficiaryBank: "Zenith Bank",
      BeneficiaryName: "Meadow Lane",
      AccountNumber: "3886564237",
      TransactionType: "Transfer",
      Amount: "N150,000",
      Date: "Just now",
    },
    {
      id: "#CM9802",
      Institution: "First Bank",
      BeneficiaryBank: "Zenith Bank",
      BeneficiaryName: "Meadow Lane",
      AccountNumber: "3886564237",
      TransactionType: "Transfer",
      Amount: "N150,000",
      Date: "Just now",
    },
    {
      id: "#CM9803",
      Institution: "First Bank",
      BeneficiaryBank: "Zenith Bank",
      BeneficiaryName: "Meadow Lane",
      AccountNumber: "3886564237",
      TransactionType: "Transfer",
      Amount: "N150,000",
      Date: "Just now",
    },
  ];

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const optionsBar = {
    colors: ["#1D4ED8", "#F58220", "#29AAF3", "#22C55E"],
    dataLabels: {
      enabled: false,
    },

    chart: {
      height: 380,
      type: "bar",
      stacked: true,

      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "16%",
        labels: {
          enabled: false,
        },

        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ["#333"],
        },
        offsetX: 30,
      },
    },
    grid: {
      show: true,
      borderColor: "#EBEEF2",
      strokeDashArray: 0,

      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
          borderWidth: 4,
        },
      },
      row: {
        colors: undefined,
        opacity: 1,
      },
      column: {
        colors: undefined,
        opacity: 1,
        borderWidth: 4,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    series: [
      {
        name: "PRODUCT A",
        data: [14, 25, 21, 17, 12, 13, 11],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27, 33],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14, 15],
      },
      {
        name: "PRODUCT C",
        data: [16, 27, 7, 25, 20, 25, 24],
      },
    ],
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#B8BFCC",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Poppins-bold",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
  };
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [token, setToken] = useState("");

  // const data = [
  //   {
  //     date: "Feb 20",
  //     amount: 1210.0,
  //   },
  //   {
  //     date: "Feb 19",
  //     amount: 4740.0,
  //   },
  //   {
  //     date: "Feb 18",
  //     amount: 1100.0,
  //   },
  //   {
  //     date: "Feb 17",
  //     amount: 1148.0,
  //   },
  //   {
  //     date: "Feb 16",
  //     amount: 1790.0,
  //   },
  //   {
  //     date: "Feb 15",
  //     amount: 1647.0,
  //   },
  //   {
  //     date: "Feb 14",
  //     amount: 5285.0,
  //   },
  // ];

  const retrieveGraphData = async () => {
    try {
      const res = await getGraphData();
      // Ensure data is sorted in ascending order by date
      const sortedGraphData = res.sort(
        (a, b) => new Date(a.Date) - new Date(b.Date)
      );
      setData(sortedGraphData);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  const getOtp = async () => {
    try {
      const res = await otpWallet();
      setToken(res.Data.Token);
      setModal5(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  const checkBalance = async () => {
    try {
      const res = await walletBalance();
      if (res.Success === false) {
        setHasWallet(false);
      } else {
        setHasWallet(true);
      }
      return res;
    } catch (error) {
      if (error.response) {
        toast.error(error.response.message);
      }
    }
  };

  useEffect(() => {
    retrieveGraphData();
  }, []);

  const query = useQuery({
    queryKey: ["getBalance"],
    queryFn: checkBalance,
  });

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        desc="Realtime Insight on various transactions"
      />
      {/* <SendMoneyModal
        modal={modal}
        closeModal={() => {
          setModal(false);
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
      /> */}
      {modal5 && (
        <ActivateWalletModal
          modal={modal5}
          closeModal={() => {
            setModal5(false);
          }}
          token={token}
        />
      )}
      {modal2 && (
        <FundWalletModal
          modal={modal2}
          closeModal={() => setModal2(false)}
          hasWallet={hasWallet}
          data={query.data}
        />
      )}
      {modal4 && (
        <BulkPaymentsModal
          modal={modal4}
          closeModal={() => setModal4(false)}
          hasWallet={hasWallet}
          dataBalance={query.data}
        />
      )}
      <div className="min-md:flex gap-5">
        <div className="flex flex-col min-md:flex-[3]">
          <MainSection
            action1={setModal}
            actionTitle1="Send Money"
            action2={setModal2}
            actionTitle2="Fund Wallet"
            action3={()=> navigate("/payment/airtime_recharge")}
            actionTitle3="Bill Payment"
            action4={setModal4}
            actionTitle4="Bulk Payments"
            action5={getOtp}
            hasWallet={hasWallet}
            data={query.data}
          />
          <div className="bg-white hidden min-md:block h-[400px] min-16:h-[700px] mt-2 p-5 rounded-md">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center">
                <p className="border-r pr-4 text-sm font-bold text-black-shade">
                  Transaction Analytics
                </p>
                <div className="flex items-center border-r px-4">
                  <div className="flex items-center gap-1 mr-2">
                    <div className="rounded-full bg-orange w-[6px] h-[6px]"></div>
                    <p className="text-[12px] font-normal text-black-shade">
                      Approved
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mr-2">
                    <div className="rounded-full bg-orange w-[6px] h-[6px]"></div>
                    <p className="text-[12px] font-normal text-black-shade">
                      Declined
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-orange w-[6px] h-[6px]"></div>
                    <p className="text-[12px] font-normal text-black-shade">
                      Pending
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-r px-3">
                  <p className="text-[12px] font-normal text-black-shade">
                    Merchant
                  </p>
                  <span>
                    <svg
                      width="7"
                      height="4"
                      viewBox="0 0 7 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 0.686523L3.5 2.68652L6 0.686523"
                        stroke="#1C1C1C"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3">
                  <p className="text-[12px] font-normal text-black-shade">
                    Transaction Type: Cards
                  </p>
                  <span>
                    <svg
                      width="7"
                      height="4"
                      viewBox="0 0 7 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 0.686523L3.5 2.68652L6 0.686523"
                        stroke="#1C1C1C"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[112px] h-[30px] flex items-center gap-2 border border-[#F582204D] rounded px-2">
                  <p className="text-sm font-semibold">April 2024</p>
                  <span>
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.85303 3.49967C1.85303 2.85534 2.37536 2.33301 3.01969 2.33301H11.1864C11.8307 2.33301 12.353 2.85534 12.353 3.49967V11.6663C12.353 12.3107 11.8307 12.833 11.1864 12.833H3.01969C2.37536 12.833 1.85303 12.3107 1.85303 11.6663V3.49967Z"
                        stroke="#F58220"
                        stroke-width="1.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.43652 1.16699V3.50033"
                        stroke="#F58220"
                        stroke-width="1.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.76953 1.16699V3.50033"
                        stroke="#F58220"
                        stroke-width="1.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.85303 5.83301H12.353"
                        stroke="#F58220"
                        stroke-width="1.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <span className="border border-orange w-[30px] h-[30px] rounded p-2">
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.10319 8.16634C7.74752 8.16634 8.26986 7.64401 8.26986 6.99967C8.26986 6.35534 7.74752 5.83301 7.10319 5.83301C6.45886 5.83301 5.93652 6.35534 5.93652 6.99967C5.93652 7.64401 6.45886 8.16634 7.10319 8.16634Z"
                      stroke="#F58220"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.7697 8.16634C12.414 8.16634 12.9364 7.64401 12.9364 6.99967C12.9364 6.35534 12.414 5.83301 11.7697 5.83301C11.1254 5.83301 10.603 6.35534 10.603 6.99967C10.603 7.64401 11.1254 8.16634 11.7697 8.16634Z"
                      stroke="#F58220"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.4362 8.16634C3.08053 8.16634 3.60286 7.64401 3.60286 6.99967C3.60286 6.35534 3.08053 5.83301 2.4362 5.83301C1.79187 5.83301 1.26953 6.35534 1.26953 6.99967C1.26953 7.64401 1.79187 8.16634 2.4362 8.16634Z"
                      stroke="#F58220"
                      stroke-width="1.16667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis dataKey="Sum" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Sum"
                  stroke="#F58220"
                  fill="#ffd7b5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* <div className="grid grid-cols-10 gap-[1vw]"></div> */}
        </div>
        <div className="min-md:flex-[1] sm:hidden mt-[-5%] min-16:mt-[-3%]">
          <NotificationPanel />
        </div>
      </div>
      <div className="bg-white w-full min-md2:w-full mt-10">
        <div className="flex items-center justify-between px-5 py-4">

       
        <div className="flex items-center justify-between px-3 gap-2">
          <div className="flex items-center gap-2">
            <p className="border-r pr-5 text-sm font-semibold">
              Transaction History
            </p>
            <div className="mobile-sm:flex items-center gap-2">
              <div className="flex items-center gap-2 border-r border-[#1C1C1C33] pr-5">
                <p className="text-[12px] text-[#1C1C1C]">Transfer</p>
                <span>
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 0.75L6 5.25L10.5 0.75"
                      stroke="#464255"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-orange w-[6px] h-[6px] rounded-full"></div>
                <p className="text-[12px] text-orange">All Transaction</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-black w-[6px] h-[6px] rounded-full"></div>
                <p className="text-[12px] text-[#1C1C1C]">Approved</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-black w-[6px] h-[6px] rounded-full"></div>
                <p className="text-[12px] text-[#1C1C1C]">Failed</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer border-r border-[#1C1C1C33] pr-5">
                <div className="bg-black w-[6px] h-[6px] rounded-full"></div>
                <p className="text-[12px] text-[#1C1C1C]">Schedule</p>
              </div>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 9.375H5C4.83424 9.375 4.67527 9.44085 4.55806 9.55806C4.44085 9.67527 4.375 9.83424 4.375 10C4.375 10.1658 4.44085 10.3247 4.55806 10.4419C4.67527 10.5592 4.83424 10.625 5 10.625H15C15.1658 10.625 15.3247 10.5592 15.4419 10.4419C15.5592 10.3247 15.625 10.1658 15.625 10C15.625 9.83424 15.5592 9.67527 15.4419 9.55806C15.3247 9.44085 15.1658 9.375 15 9.375Z"
                    fill="#1C1C1C"
                  />
                  <path
                    d="M18.125 5.625H1.875C1.70924 5.625 1.55027 5.69085 1.43306 5.80806C1.31585 5.92527 1.25 6.08424 1.25 6.25C1.25 6.41576 1.31585 6.57473 1.43306 6.69194C1.55027 6.80915 1.70924 6.875 1.875 6.875H18.125C18.2908 6.875 18.4497 6.80915 18.5669 6.69194C18.6842 6.57473 18.75 6.41576 18.75 6.25C18.75 6.08424 18.6842 5.92527 18.5669 5.80806C18.4497 5.69085 18.2908 5.625 18.125 5.625Z"
                    fill="#1C1C1C"
                  />
                  <path
                    d="M11.875 13.125H8.125C7.95924 13.125 7.80027 13.1908 7.68306 13.3081C7.56585 13.4253 7.5 13.5842 7.5 13.75C7.5 13.9158 7.56585 14.0747 7.68306 14.1919C7.80027 14.3092 7.95924 14.375 8.125 14.375H11.875C12.0408 14.375 12.1997 14.3092 12.3169 14.1919C12.4342 14.0747 12.5 13.9158 12.5 13.75C12.5 13.5842 12.4342 13.4253 12.3169 13.3081C12.1997 13.1908 12.0408 13.125 11.875 13.125Z"
                    fill="#1C1C1C"
                  />
                </svg>
              </span>
            </div>
          </div>
          <Pagination
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
         <div className="flex items-center justify-end gap-3 px-2 pt-4">
          <p className="border-l border-[#00000033] pl-5 font-normal text-[12px]">
            1 Selected
          </p>

          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.875 3.75H3.125C2.77982 3.75 2.5 4.02982 2.5 4.375C2.5 4.72018 2.77982 5 3.125 5H16.875C17.2202 5 17.5 4.72018 17.5 4.375C17.5 4.02982 17.2202 3.75 16.875 3.75Z"
                fill="#1C1C1C"
              />
              <path
                d="M7.5 8.125V13.125C7.5 13.4702 7.77982 13.75 8.125 13.75C8.47018 13.75 8.75 13.4702 8.75 13.125V8.125C8.75 7.77982 8.47018 7.5 8.125 7.5C7.77982 7.5 7.5 7.77982 7.5 8.125Z"
                fill="#1C1C1C"
              />
              <path
                d="M11.25 8.125V13.125C11.25 13.4702 11.5298 13.75 11.875 13.75C12.2202 13.75 12.5 13.4702 12.5 13.125V8.125C12.5 7.77982 12.2202 7.5 11.875 7.5C11.5298 7.5 11.25 7.77982 11.25 8.125Z"
                fill="#1C1C1C"
              />
              <path
                d="M5 16.25V4.375C5 4.02982 4.72018 3.75 4.375 3.75C4.02982 3.75 3.75 4.02982 3.75 4.375V16.25C3.75 16.7678 4.11612 17.1339 4.11612 17.1339C4.48223 17.5 5 17.5 5 17.5H15C15.5178 17.5 15.8839 17.1339 15.8839 17.1339C16.25 16.7678 16.25 16.25 16.25 16.25V4.375C16.25 4.02982 15.9702 3.75 15.625 3.75C15.2798 3.75 15 4.02982 15 4.375V16.25H5Z"
                fill="#1C1C1C"
              />
              <path
                d="M6.79918 1.79917C6.25 2.34835 6.25 3.125 6.25 3.125V4.375C6.25 4.72018 6.52982 5 6.875 5C7.22018 5 7.5 4.72018 7.5 4.375V3.125C7.5 2.86612 7.68306 2.68306 7.68306 2.68306C7.86612 2.5 8.125 2.5 8.125 2.5H11.875C12.1339 2.5 12.3169 2.68306 12.3169 2.68306C12.5 2.86612 12.5 3.125 12.5 3.125V4.375C12.5 4.72018 12.7798 5 13.125 5C13.4702 5 13.75 4.72018 13.75 4.375V3.125C13.75 2.34835 13.2008 1.79917 13.2008 1.79917C12.6517 1.25 11.875 1.25 11.875 1.25H8.125C7.34835 1.25 6.79918 1.79917 6.79918 1.79917Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
          <span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12.75C9.69036 12.75 10.25 13.3096 10.25 14C10.25 14.6904 9.69036 15.25 9 15.25C8.30964 15.25 7.75 14.6904 7.75 14C7.75 13.3096 8.30964 12.75 9 12.75Z"
                fill="#1C1C1C"
              />
              <path
                d="M14 12.75C14.6904 12.75 15.25 13.3096 15.25 14C15.25 14.6904 14.6904 15.25 14 15.25C13.3096 15.25 12.75 14.6904 12.75 14C12.75 13.3096 13.3096 12.75 14 12.75Z"
                fill="#1C1C1C"
              />
              <path
                d="M20.25 14C20.25 13.3096 19.6904 12.75 19 12.75C18.3096 12.75 17.75 13.3096 17.75 14C17.75 14.6904 18.3096 15.25 19 15.25C19.6904 15.25 20.25 14.6904 20.25 14Z"
                fill="#1C1C1C"
              />
            </svg>
          </span>
        </div>
                </div>

        <div className="overflow-x-auto max-w-[320px] mobile-sm:max-w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-[#1C1C1C33]/20">
                <th className="px-3">
                  <div className="border-r border-[#0000000D]">
                    <label class="container" style={{ fontWeight: "normal" }}>
                      Tnx ID
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </th>

                <th className="px-3 py-1 overflow-hidden whitespace-nowrap text-ellipsis font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Institution</p>
                </th>
                <th className="px-3 py-1 font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Beneficiary Bank</p>
                </th>
                <th className="px-3 py-1 font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Beneficiary Name</p>
                </th>
                <th className="px-3 py-1  font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Account Number</p>
                </th>
                <th className="px-3 border-r border-[#0000000D] w-[140px] font-normal text-[12px] text-[#1C1C1C66]/40">
                  <p>Transaction Type</p>
                </th>
                <th className="px-3 border-r border-[#0000000D] w-[140px] font-normal text-[12px] text-[#1C1C1C66]/40">
                  <p>Amount</p>
                </th>
                <th className="text-[#1C1C1C66]/40 border-r border-[#0000000D] text-[12px] px-3 font-normal">
                  Date
                </th>
                <th className="text-[#1C1C1C66]/40 text-[12px] px-3 font-normal">
                  Status
                </th>
                <th></th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="10" className="text-center text-[#1C1C1C66]">
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="cursor-pointer relative">
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center text-black-shade">
                      No transactions found
                    </td>
                  </tr>
                )}
                {currentItems.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="bg-white border-b border-[#1C1C1C0D]/5 text-[12px] text-[#1C1C1C] font-normal hover:bg-[#F7F9FB]"
                  >
                    <td className="py-4 px-3 w-40">
                      <label class="container" style={{ color: "#1C1C1C" }}>
                        {transaction.id}
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td className="py-2 max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {transaction.Institution}
                    </td>

                    <td className="py-2 px-3">
                      <div>{transaction.BeneficiaryBank}</div>
                    </td>
                    <td className="py-2 px-3 w-[142px]">
                      <div className="text-wrap">
                        {transaction.BeneficiaryName}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.AccountNumber}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.TransactionType}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.Amount}</span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.5 2V1.5C10.5 1.22386 10.7239 1 11 1C11.2761 1 11.5 1.22386 11.5 1.5V2H13C13 2 13.4142 2 13.7071 2.29289C13.7071 2.29289 14 2.58579 14 3V13C14 13 14 13.4142 13.7071 13.7071C13.7071 13.7071 13.4142 14 13 14H3C3 14 2.58579 14 2.29289 13.7071C2.29289 13.7071 2 13.4142 2 13V3C2 3 2 2.58579 2.29289 2.29289C2.29289 2.29289 2.58579 2 3 2H4.5V1.5C4.5 1.22386 4.72386 1 5 1C5.27614 1 5.5 1.22386 5.5 1.5V2H10.5ZM3 6V13H13V6H3ZM13 5H3V3H4.5V3.5C4.5 3.77614 4.72386 4 5 4C5.27614 4 5.5 3.77614 5.5 3.5V3H10.5V3.5C10.5 3.77614 10.7239 4 11 4C11.2761 4 11.5 3.77614 11.5 3.5V3H13V5Z"
                              fill="#1C1C1C"
                              fill-opacity="0.4"
                            />
                          </svg>
                        </span>
                        <span className="">{transaction.Date}</span>
                      </div>
                    </td>

                    <td className="py-2 px-3">
                      <div className="bg-orange h-[13px] w-[13px] rounded-full"></div>
                    </td>

                    <td className="relative">
                      <svg
                        className="mt-2"
                        width="20"
                        height="8"
                        viewBox="0 0 19 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.3">
                          <path
                            d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z"
                            fill="#030229"
                          />
                          <path
                            d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z"
                            fill="#030229"
                          />
                          <path
                            d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z"
                            fill="#030229"
                          />
                        </g>
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <style>
        {`
        /* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 12px;
  color: rgba(28, 28, 28, 0.4);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 13.5px;
  width: 13.5px;
  background-color: #eee;
  border-radius: 3px;
  margin-top:2px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #323232;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
        `}
      </style>
    </div>
  );
}
