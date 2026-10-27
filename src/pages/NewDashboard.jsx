
import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiArrowDownLeft,
  FiArrowRight,
  FiBell,
  FiChevronRight,
  FiCreditCard,
  FiClock,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGrid,
  FiHome,
  FiMoreHorizontal,
  FiPlus,
  FiSearch,
  FiSend,
  FiShoppingBag,
  FiSmartphone,
  FiUser,
  FiWifi,
  FiZap,
} from "react-icons/fi";
import { LuScanLine } from "react-icons/lu";

import payarenaLogo from "../assets/images/logo.svg";
import defaultProfile from "../assets/images/profilePicture.png";

const quickActions = [
  {
    label: "Airtime",
    icon: FiSmartphone,
    color: "#22aee5",
    href: "/payment/airtime_recharge",
  },
  {
    label: "Data",
    icon: FiWifi,
    color: "#f56a3c",
    href: "/payment/data",
  },
  {
    label: "Electricity",
    icon: FiZap,
    color: "#1aa9df",
    href: "/payment/electricity",
  },
  {
    label: "Pay Bills",
    icon: FiFileText,
    color: "#f56a3c",
    href: "/payments",
  },
  {
    label: "Transfer",
    icon: FiSend,
    color: "#22aee5",
    href: "/transfers",
  },
];

const recentTransactions = [
  {
    title: "Airtime Purchase",
    detail: "MTN 0812 345 6789",
    amount: "−₦1,000.00",
    date: "Today, 10:24 AM",
    icon: FiSmartphone,
    color: "#18aee5",
    positive: false,
  },
  {
    title: "Money Received",
    detail: "From John Ade",
    amount: "+₦20,000.00",
    date: "Today, 09:15 AM",
    icon: FiArrowDownLeft,
    color: "#36b653",
    positive: true,
  },
  {
    title: "Electricity Payment",
    detail: "Ikeja Electric",
    amount: "−₦5,500.00",
    date: "Today, 08:45 AM",
    icon: FiZap,
    color: "#18aee5",
    positive: false,
  },
];

const sideLinks = [
  { label: "Home", icon: FiHome, to: "/dashboard" },
  {
    label: "VAS",
    icon: FiGrid,
    to: "https://www.payarena.com/",
    external: true,
  },
  {
    label: "Mall",
    icon: FiShoppingBag,
    to: "https://mall.payarena.com/",
    external: true,
  },
  { label: "Wallet", icon: FiCreditCard, to: "/dashboard" },
  { label: "Profile", icon: FiUser, to: "/settings" },
];

function getUserDetails() {
  try {
    const storedUser = localStorage.getItem("userDetails");
    const user = storedUser ? JSON.parse(storedUser) : {};

    return user && typeof user === "object" ? user : {};
  } catch {
    return {};
  }
}

export default function NewDashboard() {
  const user = useMemo(() => getUserDetails(), []);

  const firstName =
    user.FirstName?.trim()?.split(/\s+/)[0] || "David";

  const profilePhoto = user.ProfilePhoto || defaultProfile;

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [search, setSearch] = useState("");

  const filteredTransactions = recentTransactions.filter(
    (transaction) =>
      `${transaction.title} ${transaction.detail}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#fdfafa] font-host-grotesk text-[#242428]">
      {/* Sidebar */}
      <aside className="flex w-[68px] shrink-0 flex-col rounded-r-[18px] bg-white px-2 py-4 lg:w-[170px] lg:px-[13px] lg:py-5">
        <Link
          to="/dashboard"
          aria-label="Payarena home"
          className="flex h-[50px] items-center justify-center lg:h-[54px]"
        >
          <img
            src={payarenaLogo}
            alt="Payarena"
            className="w-[48px] object-contain lg:w-[136px]"
          />
        </Link>

        <nav
          aria-label="Dashboard navigation"
          className="mt-7 flex flex-col gap-3 lg:mt-8 lg:gap-4"
        >
          {sideLinks.map(({ label, icon: Icon, to, external }) => {
            const baseClassName =
              "flex min-h-[40px] items-center justify-center gap-3 rounded-[6px] px-2 text-[12px] transition-colors lg:justify-start lg:px-3";

            const contents = (
              <>
                <Icon size={20} strokeWidth={1.7} className="shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </>
            );

            if (external) {
              return (
                <a
                  key={label}
                  href={to}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseClassName} text-[#69696d] hover:bg-[#f6f6f7]`}
                >
                  {contents}
                </a>
              );
            }

            return (
              <NavLink
                key={label}
                to={to}
                title={label}
                className={({ isActive }) =>
                  `${baseClassName} ${
                    isActive && label !== "Wallet"
                      ? "bg-[#f2632a] text-white"
                      : "text-[#69696d] hover:bg-[#f6f6f7]"
                  }`
                }
              >
                {contents}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <header className="flex h-[58px] items-center justify-end gap-5 border-b border-[#f1eeee] bg-white px-5 sm:px-8">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-[#77777b] hover:text-[#f2632a]"
          >
            <FiBell size={19} fill="currentColor" />
            <span className="absolute -right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-[#f2632a]" />
          </button>

          <button
            type="button"
            aria-label="Profile menu"
            className="flex items-center gap-1.5"
          >
            <img
              src={profilePhoto}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <FiChevronRight
              size={14}
              className="rotate-90 text-[#77777b]"
            />
          </button>
        </header>

        <main className="min-h-[calc(100vh-58px)] px-5 py-6 sm:px-8 lg:px-14 lg:py-5">
          <div className="mx-auto max-w-[1120px]">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:gap-[9%]">
              {/* Wallet and quick actions */}
              <section aria-label="Wallet and quick actions">
                <p className="text-[13px]">Welcome back,</p>

                <h1 className="mt-1 text-[20px] font-medium">
                  {firstName} <span aria-hidden="true">👋</span>
                </h1>

                {/* Wallet card */}
                <div className="mt-8 rounded-[17px] bg-[#fb8128] px-4 py-4 text-white shadow-sm sm:px-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[12px] font-medium">
                        PayArena Wallet
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setBalanceVisible((visible) => !visible)
                        }
                        className="mt-1 inline-flex items-center gap-2 text-[10px] text-white/90"
                        aria-label={
                          balanceVisible
                            ? "Hide wallet balance"
                            : "Show wallet balance"
                        }
                      >
                        Available Balance
                        {balanceVisible ? (
                          <FiEye size={12} />
                        ) : (
                          <FiEyeOff size={12} />
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[10px] font-medium text-[#f27a2c] hover:bg-orange-50"
                    >
                      <FiPlus size={12} />
                      Add Money
                    </button>
                  </div>

                  <p className="mt-3 text-[22px] font-semibold tracking-wide">
                    {balanceVisible ? "₦ 125,450.00" : "₦ ••••••••"}
                  </p>

                  <p className="mt-1 text-[11px] tracking-[2px]">
                    •••• •••• •••• 8888
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/50 pt-3">
                    <Link
                      to="/transfers"
                      className="inline-flex items-center gap-2 text-[12px] hover:text-white/80"
                    >
                      <FiSend size={15} />
                      Transfer
                    </Link>

                    <Link
                      to="/history"
                      className="inline-flex items-center gap-2 text-[12px] hover:text-white/80"
                    >
                      <FiClock size={15} />
                      Transaction
                    </Link>

                    <Link
                      to="/history"
                      aria-label="View transactions"
                      className="p-1"
                    >
                      <FiChevronRight size={17} />
                    </Link>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="mt-8 rounded-[9px] border border-[#efeff0] bg-white px-3 py-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[12px] font-medium">
                      Quick Actions
                    </h2>

                    <Link
                      to="/payments"
                      className="inline-flex items-center gap-1 text-[12px] text-[#f15f2c]"
                    >
                      See All
                      <FiChevronRight size={13} />
                    </Link>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-2">
                    {quickActions.map(
                      ({ label, icon: Icon, color, href }) => (
                        <Link
                          key={label}
                          to={href}
                          className="flex flex-col items-center gap-1.5 text-center text-[10px] hover:opacity-75"
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#f1f9fc]"
                            style={{ color }}
                          >
                            <Icon size={15} />
                          </span>
                          {label}
                        </Link>
                      )
                    )}

                    <Link
                      to="/payments"
                      className="flex flex-col items-center gap-1.5 text-center text-[10px] hover:opacity-75"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#fff4ef] text-[#f56a3c]">
                        <FiMoreHorizontal size={16} />
                      </span>
                      More
                    </Link>
                  </div>
                </div>

                {/* Payarena Mall banner */}
                <a
                  href="https://mall.payarena.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex min-h-[58px] items-center gap-3 rounded-[17px] bg-[#fff0e7] px-4 sm:px-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fb8128] text-white">
                    <FiShoppingBag size={17} />
                  </span>

                  <span className="whitespace-nowrap text-[13px] font-medium">
                    <span className="text-[#159fdf]">Pay</span>
                    <span className="text-[#f16a2d]">arena</span> Mall
                  </span>

                  <span className="ml-auto max-w-[150px] text-[9px] leading-tight text-[#48484b]">
                    Shop top Products, at the best prices
                  </span>

                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#fb8128] text-white">
                    <FiArrowRight size={12} />
                  </span>
                </a>

                {/* VAS banner */}
                <a
                  href="https://www.payarena.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-[58px] items-center gap-3 rounded-[17px] bg-[#eaf3ff] px-4 sm:px-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#20afe2] text-[10px] text-white">
                    VAS
                  </span>

                  <span className="whitespace-nowrap text-[13px] font-medium">
                    <span className="text-[#159fdf]">Pay</span>
                    <span className="text-[#f16a2d]">arena</span>
                  </span>

                  <span className="ml-auto max-w-[150px] text-[9px] leading-tight text-[#48484b]">
                    Airtime, Data, Bill Payment &amp; More
                  </span>

                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#20afe2] text-white">
                    <FiArrowRight size={12} />
                  </span>
                </a>
              </section>

              {/* Search and transactions */}
              <section
                aria-label="Search and recent transactions"
                className="pt-1 lg:pt-[76px]"
              >
                <div className="flex gap-2.5">
                  <label className="flex h-[50px] min-w-0 flex-1 items-center gap-3 rounded-[10px] border border-[#d4d2d2] bg-white px-3.5 text-[#4d4d50]">
                    <FiSearch size={20} className="shrink-0" />

                    <input
                      type="search"
                      aria-label="Search services and transactions"
                      className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#b5b3b4]"
                      placeholder="Search service, product and more..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>

                  <button
                    type="button"
                    aria-label="Scan"
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[10px] bg-[#fb8128] text-white hover:bg-[#ec7020]"
                  >
                    <LuScanLine size={27} />
                  </button>
                </div>

                {/* Recent transactions */}
                <div className="mt-5 rounded-[10px] border border-[#efeff0] bg-white px-2.5 py-2">
                  <div className="mb-1 flex items-center justify-between px-0.5">
                    <h2 className="text-[12px] font-medium">
                      Recent Transactions
                    </h2>

                    <Link
                      to="/history"
                      className="inline-flex items-center gap-1 text-[12px] text-[#f15f2c]"
                    >
                      See All
                      <FiChevronRight size={13} />
                    </Link>
                  </div>

                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => {
                      const {
                        title,
                        detail,
                        amount,
                        date,
                        icon: Icon,
                        color,
                        positive,
                      } = transaction;

                      return (
                        <Link
                          to="/history"
                          key={title}
                          className="flex min-h-[50px] items-center gap-2.5 border-t border-[#f1f1f2] px-0.5 py-2 first:border-t-0"
                        >
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#f3fafc]"
                            style={{ color }}
                          >
                            <Icon size={14} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[10px] font-medium">
                              {title}
                            </span>

                            <span className="mt-0.5 block truncate text-[10px] text-[#92929c]">
                              {detail}
                            </span>
                          </span>

                          <span className="shrink-0 text-right">
                            <span
                              className={`block text-[10px] ${
                                positive
                                  ? "text-[#35b54b]"
                                  : "text-[#36363a]"
                              }`}
                            >
                              {amount}
                            </span>

                            <span className="mt-0.5 block text-[9px] text-[#92929c]">
                              {date}
                            </span>
                          </span>

                          <FiChevronRight
                            size={13}
                            className="shrink-0 text-[#8b8b91]"
                          />
                        </Link>
                      );
                    })
                  ) : (
                    <p className="border-t border-[#f1f1f2] py-5 text-center text-xs text-[#92929c]">
                      No transactions match your search.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

