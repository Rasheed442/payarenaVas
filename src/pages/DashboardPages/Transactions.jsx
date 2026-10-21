import React, { useCallback, useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import NairaIcon from "../../assets/icons/dashboardIIcons/nairaIcon";
import NairaIcon2 from "../../assets/icons/dashboardIIcons/nairaIcon2";
import Card from "../../assets/images/card.png";
import MainSection from "../../components/MainSection";
import DataVendingModal from "../../modals/DataVendingModal";
import AirtimeVendingModal from "../../modals/AirtimeVendingModal";
import SendMoneyModal from "../../modals/SendMoneyModal";
import ScheduleTransferModal from "../../modals/ScheduleTransferModal";
import { Pagination } from "@mui/material";
import { getTransactions } from "../../store/services/transactionsService";
import { getDashboardData } from "../../store/services/transactions";

export default function TransactionsPage() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [transactions, setTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  // const [data, setData] = useState({});


  // const transactions = [
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },
  //   {
  //     id: "#CM9801",
  //     Institution: "First Bank",
  //     BeneficiaryBank: "Zenith Bank",
  //     BeneficiaryName: "Meadow Lane",
  //     AccountNumber: "3886564237",
  //     TransactionType: "Transfer",
  //     Amount: "N150,000",
  //     Date: "Just now",
  //   },

  // ];



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



  // Logic to get current items based on pagination

  const handleTransactions = useCallback(async () => {
    try {
      const res = await getTransactions();
      setTransactions(res);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  }, []);

  useEffect(() => {
    handleTransactions();
  }, [handleTransactions]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const fetchDashboardData = async () => {
    try {
      const res = await getDashboardData();
      setDashboardData(res);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>

      {/* <div className="bg-white w-full mt-6">
        <div className="flex items-center justify-end gap-3 px-2">
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
        <div className="flex items-center justify-between px-3 gap-2">
          <div className="flex items-center gap-2">
            <p className="border-r pr-5 text-sm font-semibold">
              Transaction History
            </p>
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
          <Pagination
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>

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
      </div> */}

      <DashboardHeader
        title="Transaction History Dashboard"
        desc="Realtime Insight on various transactions"
      />

      <article className="flex flex-col mobile-sm:flex mobile-sm:flex-row mt-4 gap-4 w-full">

        <div className="w-full mobile-sm:w-1/4 flex flex-col p-4 gap-4 bg-[#F58220] rounded-[4px] text-white">
          <section className="flex justify-between">
            <div>Total Transactions</div>
            <div>
              <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1002 8.75C8.0805 8.75 8.8752 9.30964 8.8752 10C8.8752 10.6904 8.0805 11.25 7.1002 11.25C6.11989 11.25 5.3252 10.6904 5.3252 10C5.3252 9.30964 6.11989 8.75 7.1002 8.75Z" fill="#1C1C1C" />
                <path d="M14.2002 8.75C15.1805 8.75 15.9752 9.30964 15.9752 10C15.9752 10.6904 15.1805 11.25 14.2002 11.25C13.2199 11.25 12.4252 10.6904 12.4252 10C12.4252 9.30964 13.2199 8.75 14.2002 8.75Z" fill="#1C1C1C" />
                <path d="M23.0752 10C23.0752 9.30964 22.2805 8.75 21.3002 8.75C20.3199 8.75 19.5252 9.30964 19.5252 10C19.5252 10.6904 20.3199 11.25 21.3002 11.25C22.2805 11.25 23.0752 10.6904 23.0752 10Z" fill="#1C1C1C" />
              </svg>
            </div>
          </section>

          <section className="flex justify-between">
            <div className="font-bold">{dashboardData.count}</div>
            <div className="flex text-[12px]">
              {/* <span>+5.27%</span> */}
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C" />
                </svg>
              </span>
            </div>
          </section>
        </div>



        <div className="w-full mobile-sm:w-1/4 flex flex-col p-4 gap-4 bg-white rounded-[4px]">
          <section className="flex justify-between">
            <div>Approved Sum</div>
            <div>
              <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1002 8.75C8.0805 8.75 8.8752 9.30964 8.8752 10C8.8752 10.6904 8.0805 11.25 7.1002 11.25C6.11989 11.25 5.3252 10.6904 5.3252 10C5.3252 9.30964 6.11989 8.75 7.1002 8.75Z" fill="#1C1C1C" />
                <path d="M14.2002 8.75C15.1805 8.75 15.9752 9.30964 15.9752 10C15.9752 10.6904 15.1805 11.25 14.2002 11.25C13.2199 11.25 12.4252 10.6904 12.4252 10C12.4252 9.30964 13.2199 8.75 14.2002 8.75Z" fill="#1C1C1C" />
                <path d="M23.0752 10C23.0752 9.30964 22.2805 8.75 21.3002 8.75C20.3199 8.75 19.5252 9.30964 19.5252 10C19.5252 10.6904 20.3199 11.25 21.3002 11.25C22.2805 11.25 23.0752 10.6904 23.0752 10Z" fill="#1C1C1C" />
              </svg>
            </div>
          </section>

          <section className="flex justify-between">
            <div className="font-bold">{dashboardData.approvedSum}</div>
            <div className="flex text-[12px]">
              {/* <span>-1.78%</span> */}
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14522 10.3922L2.6001 12L3.98029 6.3939L5.70206 8.0468L8.4794 5.15373C8.57369 5.05552 8.70395 5 8.8401 5C8.97624 5 9.1065 5.05552 9.20079 5.15373L11.2401 7.27801L14.2394 4.15373C14.4306 3.95453 14.7472 3.94807 14.9464 4.13931C15.1456 4.33054 15.152 4.64706 14.9608 4.84627L11.6008 8.34627C11.5065 8.44448 11.3762 8.5 11.2401 8.5C11.1039 8.5 10.9737 8.44448 10.8794 8.34627L8.8401 6.22199L6.42345 8.73933L8.14522 10.3922Z" fill="#FF0000" />
                </svg>
              </span>
            </div>
          </section>
        </div>

        <div className="w-full mobile-sm:w-1/4 flex flex-col p-4 gap-4 bg-[#2B86C7] rounded-[4px] text-white">
          <section className="flex justify-between">
            <div>Approved Transaction</div>
            <div>
              <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1002 8.75C8.0805 8.75 8.8752 9.30964 8.8752 10C8.8752 10.6904 8.0805 11.25 7.1002 11.25C6.11989 11.25 5.3252 10.6904 5.3252 10C5.3252 9.30964 6.11989 8.75 7.1002 8.75Z" fill="#1C1C1C" />
                <path d="M14.2002 8.75C15.1805 8.75 15.9752 9.30964 15.9752 10C15.9752 10.6904 15.1805 11.25 14.2002 11.25C13.2199 11.25 12.4252 10.6904 12.4252 10C12.4252 9.30964 13.2199 8.75 14.2002 8.75Z" fill="#1C1C1C" />
                <path d="M23.0752 10C23.0752 9.30964 22.2805 8.75 21.3002 8.75C20.3199 8.75 19.5252 9.30964 19.5252 10C19.5252 10.6904 20.3199 11.25 21.3002 11.25C22.2805 11.25 23.0752 10.6904 23.0752 10Z" fill="#1C1C1C" />
              </svg>
            </div>
          </section>

          <section className="flex justify-between">
            <div className="font-bold">{dashboardData.approved} </div>
            <div className="flex text-[12px]">
              {/* <span>+1.48%</span> */}
              <span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z" fill="#1C1C1C" />
                </svg>
              </span>
            </div>
          </section>
        </div>

        <div className="w-full mobile-sm:w-1/4 flex flex-col p-4 gap-4 bg-white rounded-[4px]">
          <section className="flex justify-between">
            <div>Product Count</div>
            <div>
              <svg width="29" height="20" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1002 8.75C8.0805 8.75 8.8752 9.30964 8.8752 10C8.8752 10.6904 8.0805 11.25 7.1002 11.25C6.11989 11.25 5.3252 10.6904 5.3252 10C5.3252 9.30964 6.11989 8.75 7.1002 8.75Z" fill="#1C1C1C" />
                <path d="M14.2002 8.75C15.1805 8.75 15.9752 9.30964 15.9752 10C15.9752 10.6904 15.1805 11.25 14.2002 11.25C13.2199 11.25 12.4252 10.6904 12.4252 10C12.4252 9.30964 13.2199 8.75 14.2002 8.75Z" fill="#1C1C1C" />
                <path d="M23.0752 10C23.0752 9.30964 22.2805 8.75 21.3002 8.75C20.3199 8.75 19.5252 9.30964 19.5252 10C19.5252 10.6904 20.3199 11.25 21.3002 11.25C22.2805 11.25 23.0752 10.6904 23.0752 10Z" fill="#1C1C1C" />
              </svg>
            </div>
          </section>

          <section className="flex justify-between">
            <div className="font-bold">{dashboardData.productCount} </div>
            <div className="flex text-[12px]">
              {/* <span>0.56%</span> */}
              <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1461 3.63931C15.3453 3.83054 15.3517 4.14706 15.1605 4.34627L11.8005 7.84627C11.7062 7.94448 11.576 8 11.4398 8C11.3037 8 11.1734 7.94448 11.0791 7.84627L9.0398 5.72199L6.62316 8.23933L8.34493 9.89223L2.7998 11.5L4.18 5.8939L5.90177 7.5468L8.67911 4.65373C8.7734 4.55552 8.90366 4.5 9.03981 4.5C9.17595 4.5 9.30621 4.55552 9.4005 4.65373L11.4398 6.77801L14.4391 3.65373C14.6303 3.45453 14.9469 3.44807 15.1461 3.63931Z" fill="#1C1C1C" />
                </svg>
              </span>
            </div>
          </section>
        </div>

      </article>

      {/* <section className="flex flex-col bg-white mt-10 pt-6 ">

      <div className="flex items-center justify-between px-3 gap-2">
          <div className="flex items-center gap-2">
            <p className="border-r pr-5 text-sm font-semibold">
              Transaction History
            </p>
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
          <Pagination
            totalItems={transactions.length}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />

        </div>

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
        </section> */}


      <div className="bg-white w-full min-md2:w-full mt-6">
        <div className="flex items-center justify-end gap-3 px-2">
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
        <div className="overflow-x-auto max-w-[320npx] mobile-sm:max-w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-[#1C1C1C33]/20">
                <th className="px-3">
                  <div className="border-r border-[#0000000D] flex gap-2">
                    <input type="checkbox" />
                    <label class="container" style={{ color: "rgba(28, 28, 28, 0.4)", fontSize: "12px", fontWeight: "normal" }}>
                      Product ID
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </th>

                <th className="px-3 py-1 overflow-hidden whitespace-nowrap text-ellipsis font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Description</p>
                </th>
                <th className="px-3 py-1 font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Beneficiary</p>
                </th>
                <th className="px-3 py-1 font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Fee</p>
                </th>
                <th className="px-3 py-1  font-normal text-[12px] border-r border-[#0000000D] text-[#1C1C1C66]/40">
                  <p>Name</p>
                </th>
                <th className="px-3 border-r border-[#0000000D] font-normal text-[12px] text-[#1C1C1C66]/40">
                  <p>Category</p>
                </th>
                <th className="px-3 border-r border-[#0000000D] font-normal text-[12px] text-[#1C1C1C66]/40">
                  <p>Amount</p>
                </th>
                <th className="text-[#1C1C1C66]/40 text-[12px] px-3 font-normal">
                  ParameterLabel
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
                    key={transaction.ProductId}
                    className="bg-white border-b border-[#1C1C1C0D]/5 text-[12px] text-[#1C1C1C] font-normal hover:bg-[#F7F9FB]"
                  >
                    <td className="py-4 px-3 flex gap-2">
                      <input type="checkbox" />
                      <label class="container" style={{ color: "#1C1C1C" }}>
                        {transaction.ProductId}
                        <span class="checkmark"></span>
                      </label>
                    </td>
                    <td className="py-2 max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {transaction.Description}
                    </td>

                    <td className="py-2 px-3">
                      <div>{transaction.Beneficiary}</div>
                    </td>
                    <td className="py-2 px-3">
                      <div className="text-wrap">
                        {transaction.Fee}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.Merchant.Name}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.Merchant.Category}</span>
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
                        <span className="">{transaction.Merchant.ParameterLabel}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{formatDate(transaction.Date)}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="">{transaction.Status}</span>
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

    </div>
  );
}
