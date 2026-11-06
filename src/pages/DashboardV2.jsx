import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../helpers/http";
import { getGraphData } from "../store/services/Wallet";
import { getDashboardData } from "../store/services/transactions";
import {
  FiArrowDownLeft,
  FiArrowLeft,
  FiArrowRight,
  FiBell,
  FiClock,
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMoreHorizontal,
  FiPlus,
  FiRefreshCw,
  FiRepeat,
  FiSearch,
  FiSend,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiSun,
  FiTrendingUp,
  FiUser,
  FiWifi,
  FiX,
  FiZap,
} from "react-icons/fi";
import payarenaLogo from "../assets/images/logo.svg";
import defaultProfile from "../assets/images/profilePicture.png";

/* ---------- Data ---------- */

const quickActions = [
  { label: "Airtime", icon: FiSmartphone, fg: "#f26a10", bg: "#fff0e6", href: "/payment/airtime_recharge" },
  { label: "Data", icon: FiWifi, fg: "#1b9ad6", bg: "#e8f5fd", href: "/payment/data" },
  { label: "Electricity", icon: FiZap, fg: "#f59e0b", bg: "#fff8e1", href: "/payment/electricity" },
  { label: "Pay bills", icon: FiFileText, fg: "#7c4dff", bg: "#f1ecff", href: "/payment/airtime_recharge" },
  { label: "Transfer", icon: FiSend, fg: "#10a36b", bg: "#e6f8f0", href: "/transfers" },
  // { label: "More", icon: FiMoreHorizontal, fg: "#9a948f", bg: "#f2f0ee", href: "/payments", muted: true },
];



// Replace `avatar` with each contact's real photo when available
const sendAgainContacts = [
  { name: "John", avatar: defaultProfile },
  { name: "Amaka", avatar: defaultProfile },
  { name: "Tunde", avatar: defaultProfile },
];

// Helper to transform API transaction data to UI format
const formatTransaction = (trx) => {
  const description = trx.Description || "";
  const amount = parseFloat(trx.Amount?.replace(/,/g, '')) || 0;
  const status = trx.Status || "";

  // Determine if transaction is credit or debit based on status or description
  const isCredit = status === "CREDIT" || description.toLowerCase().includes("received") || description.toLowerCase().includes("credit");

  // Map transaction types to icons and colors based on description
  const typeConfig = {
    dstv: { icon: FiFileText, fg: "#7c4dff", bg: "#f1ecff" },
    airtime: { icon: FiSmartphone, fg: "#1a1210", bg: "#f2f0ee" },
    data: { icon: FiWifi, fg: "#1b9ad6", bg: "#e8f5fd" },
    electricity: { icon: FiZap, fg: "#f59e0b", bg: "#fff8e1" },
    transfer: { icon: FiSend, fg: "#10a36b", bg: "#e6f8f0" },
    credit: { icon: FiArrowDownLeft, fg: "#10a36b", bg: "#e6f8f0" },
    default: { icon: FiFileText, fg: "#7c4dff", bg: "#f1ecff" },
  };

  const descLower = description.toLowerCase();
  let config = typeConfig.default;

  if (descLower.includes("dstv") || descLower.includes("gotv")) config = typeConfig.dstv;
  else if (descLower.includes("airtime")) config = typeConfig.airtime;
  else if (descLower.includes("data")) config = typeConfig.data;
  else if (descLower.includes("electricity") || descLower.includes("ekedc") || descLower.includes("ikedc")) config = typeConfig.electricity;
  else if (descLower.includes("transfer")) config = typeConfig.transfer;
  else if (isCredit) config = typeConfig.credit;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // Format is "11/4/2026 3:45 PM"
    return dateStr;
  };

  return {
    title: description,
    detail: `${trx.Merchant?.name || "Payarena"} · ${formatDate(trx.Date)}`,
    amount: isCredit ? `+₦${amount.toLocaleString()}` : `−₦${amount.toLocaleString()}`,
    icon: config.icon,
    fg: config.fg,
    bg: config.bg,
    positive: isCredit,
  };
};



/* ---------- Helpers ---------- */

function getMallAuthLink() {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("mall-token");
    const mallUrl = "https://mall.payarena.com";

    if (!token) return mallUrl;

    // Pass token as query parameter (simpler, Mall app can easily read it)
    return `${mallUrl}/?token=${token}`;
  } catch (error) {
    console.error("Failed to generate Mall auth link:", error);
    return "https://mall.payarena.com/";
  }
}

function getUserDetails() {
  try {
    const stored = localStorage.getItem("userDetails");
    const user = stored ? JSON.parse(stored) : {};
    return user && typeof user === "object" ? user : {};
  } catch {
    return {};
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const card = "rounded-2xl h-full bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04),0_6px_18px_rgba(26,18,16,0.04)]";
const chip = "bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)]";

/* ---------- Component ---------- */

export default function DashboardV2() {
  const navigate = useNavigate();
  const user = useMemo(() => getUserDetails(), []);
  const firstName = user.FirstName?.toUpperCase()?.trim()?.split(/\s+/)[0] || "David";
  const lastName = user.LastName?.trim()?.split(/\s+/)[0] || "Adeleke";
  const fullName = `${firstName} ${lastName}`;
  const profilePhoto = user.ProfilePhoto || defaultProfile;

  // "home" = normal dashboard, "mall" = embedded Payarena Mall inside the dashboard
  const [activeView, setActiveView] = useState("home");
  const [mallUrl, setMallUrl] = useState("");
  const [mallLoading, setMallLoading] = useState(true);
  const [mallKey, setMallKey] = useState(0); // bump to reload the iframe
  const iframeRef = useRef(null);

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dashboard data states
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openMall = () => {
    // Build the URL at open time so the latest token is always used
    setMallUrl(getMallAuthLink());
    setMallLoading(true);
    setMallKey((k) => k + 1);
    setActiveView("mall");
    setMobileMenuOpen(false);
  };

  const goHome = () => {
    setActiveView("home");
    setMobileMenuOpen(false);
  };

  const reloadMall = () => {
    setMallUrl(getMallAuthLink());
    setMallLoading(true);
    setMallKey((k) => k + 1);
  };

  // Handle postMessage from Mall iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Ignore React DevTools messages
      if (event.data?.source === 'react-devtools-content-script') {
        return;
      }

      const allowedOrigins = [
        'https://test.mall.payarena.com',
        'https://mall.payarena.com',
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:4200',
      ];

      const incomingOrigin = (() => {
        try {
          return new URL(event.origin).origin;
        } catch {
          return event.origin.trim().replace(/\/+$/, '');
        }
      })();

      if (!allowedOrigins.includes(incomingOrigin)) {
        console.warn('Message ignored due to origin mismatch:', incomingOrigin);
        return;
      }

      const { type, data } = event.data || {};

      if (type === 'UPDATE_LOCAL_STORAGE' && data && typeof data === 'object') {
        const ALLOWED_UPDATE_KEYS = new Set([
          'mall-token',
          'mallUserInfo',
          'token',
          'refreshToken',
          'ionic',
        ]);

        Object.entries(data).forEach(([key, value]) => {
          if (!ALLOWED_UPDATE_KEYS.has(key)) return;
          if (value) {
            const strVal = typeof value === 'object' ? JSON.stringify(value) : value;
            localStorage.setItem(key, strVal);
          } else {
            localStorage.removeItem(key);
          }
        });
        console.log('Updated storage from Mall:', data);
      } else if (type === 'IFRAME_READY') {
        console.log('Mall iframe ready, sending localStorage');
        sendLocalStorageToIframe(event.source, event.origin);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendLocalStorageToIframe = (targetWindow, targetOrigin) => {
    if (targetWindow) {
      const data = {
        'mall-token': localStorage.getItem('mall-token') || localStorage.getItem('token'),
        'mallUserInfo': localStorage.getItem('mallUserInfo'),
      };

      if (!data['mall-token'] && !data['mallUserInfo']) {
        console.info('Mall data not ready');
        return;
      }

      console.log('Sending SYNC_LOCAL_STORAGE to Mall:', targetOrigin, {
        hasMallToken: Boolean(data['mall-token']),
        hasMallUserInfo: Boolean(data['mallUserInfo']),
      });

      targetWindow.postMessage(
        {
          type: 'SYNC_LOCAL_STORAGE',
          data: {
            ...data,
            ionic: true,
          },
        },
        targetOrigin,
      );
    }
  };

  const onIframeLoad = () => {
    setMallLoading(false);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const targetOrigin = new URL(mallUrl || getMallAuthLink()).origin;
      setTimeout(() => {
        sendLocalStorageToIframe(iframeRef.current.contentWindow, targetOrigin);
      }, 1000);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch balance from /wallet/balance
        const balanceRes = await http().get("/wallet/balance");
        setBalance(balanceRes.data);

        // Fetch transactions from /transaction/list
        const transactionsRes = await http().get("/transaction/list");
        // Handle different response structures
        const transactionsData = transactionsRes.data?.data || transactionsRes.data || [];
        setTransactions(Array.isArray(transactionsData) ? transactionsData : []);

        // Fetch graph data
        const graphRes = await getGraphData();
        setGraphData(graphRes);

        // Fetch dashboard data
        const dashboardRes = await getDashboardData();
        setDashboardData(dashboardRes);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const sideLinks = [
    { label: "Home", icon: FiHome, type: "view", onClick: goHome, active: activeView === "home" },
    { label: "VAS", icon: FiGrid, type: "route", to: "/payment/airtime_recharge" },
    { label: "Mall", icon: FiShoppingBag, type: "external", to: getMallAuthLink(), isNew: true },
    { label: "Wallet", icon: FiCreditCard, type: "route", to: "/wallet" },
    { label: "Profile", icon: FiUser, type: "route", to: "/profile" },
    { label: "Settings", icon: FiShield, type: "route", to: "/settings-v2" },
  ];

  const filteredTransactions = (Array.isArray(transactions) ? transactions : [])
    .slice(0, 10)
    .map(formatTransaction)
    .filter((t) =>
      `${t.title} ${t.detail}`.toLowerCase().includes(search.trim().toLowerCase())
    );

  // Derive spending data from graphData
  const spendingData = useMemo(() => {
    if (!graphData || !graphData.Data) {
      return [
        { category: "Airtime & data", amount: 0, color: "#f26a10" },
        { category: "Utilities", amount: 0, color: "#fbbf24" },
        { category: "Transfers", amount: 0, color: "#1a1210" },
      ];
    }

    const data = graphData.Data;
    return [
      { category: "Airtime & data", amount: data.airtimeData || 0, color: "#f26a10" },
      { category: "Utilities", amount: data.utilities || 0, color: "#fbbf24" },
      { category: "Transfers", amount: data.transfers || 0, color: "#1a1210" },
    ];
  }, [graphData]);

  const totalSpending = spendingData.reduce((sum, d) => sum + d.amount, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("mall-token");
    localStorage.removeItem("mallUserInfo");
    navigate("/login/new");
  };

  const renderNavItem = ({ label, icon: Icon, type, to, onClick, active, isNew }) => {
    const base =
      "flex h-10 w-full items-center gap-3 rounded-xl px-3.5 text-left text-[13px] font-medium transition-colors";
    const idle = "text-white/60 hover:bg-white/5";
    const on = "bg-[#2a201c] text-white";

    const inner = (
      <>
        <Icon size={16} className={`shrink-0 ${active ? "text-[#f26a10]" : ""}`} />
        <span className="flex-1">{label}</span>
        {isNew && (
          <span className="rounded-full bg-[#f26a10] px-2 py-0.5 text-[9px] font-semibold text-white">New</span>
        )}
        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#f26a10]" />}
      </>
    );

    if (type === "view") {
      return (
        <button
          key={label}
          type="button"
          onClick={() => {
            onClick?.();
            setMobileMenuOpen(false);
          }}
          aria-current={active ? "page" : undefined}
          className={`${base} ${active ? on : idle}`}
        >
          {inner}
        </button>
      );
    }

    if (type === "external") {
      return (
        <a key={label} href={to} target="_blank" rel="noopener noreferrer" className={`${base} ${idle}`}>
          {inner}
        </a>
      );
    }

    return (
      <Link
        key={label}
        to={to}
        state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
        onClick={() => {
          sessionStorage.setItem("fromDashboard", "true");
          sessionStorage.setItem("returnTo", "/dashboard-v2");
          setMobileMenuOpen(false);
        }}
        className={`${base} ${idle}`}
      >
        {inner}
      </Link>
    );
  };

  return (
    <div
      className="min-h-screen min-md:h-screen min-md:overflow-hidden bg-[#f6f3ee] p-3 pb-24 min-md:p-4 text-[13px] text-[#1a1210] flex flex-col min-md:flex-row gap-4"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ===== Desktop Sidebar ===== */}
      <aside
        className="flex md:hidden sticky top-4 w-[232px] shrink-0 flex-col self-start rounded-3xl bg-[#1a1210] p-4"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <Link
          to="/dashboard-v2"
          onClick={goHome}
          aria-label="Payarena home"
          className="flex items-center px-1.5 pt-1"
        >
          <img
            src={payarenaLogo}
            alt="Payarena"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </Link>

        <p className="mt-7 px-3 text-[10px] font-semibold tracking-wider text-white/40">MENU</p>
        <nav aria-label="Dashboard navigation" className="mt-2 flex flex-col gap-1">
          {sideLinks.map(renderNavItem)}
        </nav>

        <div className="relative mt-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#f56a10] to-[#e04e05] p-4 text-white">
          <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <FiHeadphones size={18} />
          <p className="mt-3 text-[14px] font-semibold">Need help?</p>
          <p className="mt-1 text-[11px] leading-snug text-white/80">Chat with support every day, 7am to 10pm.</p>
          <button
            type="button"
            className="mt-3 h-9 w-full rounded-lg bg-white text-[12px] font-semibold text-[#e04e05] hover:bg-white/90"
          >
            Start chat
          </button>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex h-10 items-center gap-3 rounded-xl px-3.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5"
        >
          <FiLogOut size={16} className="shrink-0" />
          <span className="flex-1">Logout</span>
        </button>
      </aside>

      {/* ===== Mobile Navigation Drawer Backdrop ===== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm min-md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ===== Mobile Navigation Drawer ===== */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[270px] max-w-[85vw] flex flex-col bg-[#1a1210] p-5 shadow-2xl transition-transform duration-300 ease-in-out min-md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Link
            to="/dashboard-v2"
            onClick={() => {
              goHome();
              setMobileMenuOpen(false);
            }}
            aria-label="Payarena home"
            className="flex items-center"
          >
            <img
              src={payarenaLogo}
              alt="Payarena"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
          >
            <FiX size={18} />
          </button>
        </div>

        <p className="mt-6 px-3 text-[10px] font-semibold tracking-wider text-white/40">MENU</p>
        <nav aria-label="Mobile Dashboard navigation" className="mt-2 flex flex-col gap-1.5 overflow-y-auto">
          {sideLinks.map(renderNavItem)}
        </nav>

        <div className="relative mt-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#f56a10] to-[#e04e05] p-4 text-white">
          <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <FiHeadphones size={18} />
          <p className="mt-2 text-[13px] font-semibold">Need help?</p>
          <p className="mt-1 text-[11px] leading-snug text-white/80">Chat with support every day, 7am to 10pm.</p>
          <button
            type="button"
            className="mt-3 h-8 w-full rounded-lg bg-white text-[12px] font-semibold text-[#e04e05] hover:bg-white/90"
          >
            Start chat
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex h-10 items-center gap-3 rounded-xl px-3.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5"
        >
          <FiLogOut size={16} className="shrink-0" />
          <span className="flex-1">Logout</span>
        </button>
      </div>

      <div className="min-w-0 flex-1 min-md:flex min-md:flex-col min-md:h-full min-md:overflow-hidden">
        {/* ===== Top bar (shared by both views) ===== */}
        <header className="shrink-0 flex flex-wrap items-center gap-3 md:gap-2.5">
          {/* Mobile Top Row: Hamburger + Logo + Notifications + Avatar */}
          <div className="flex min-md:hidden items-center justify-between w-full">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${chip}`}
              >
                <FiMenu size={18} />
              </button>
              <Link to="/dashboard-v2" aria-label="Payarena home">
                <img src={payarenaLogo} alt="Payarena" className="h-7 w-auto object-contain" />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${chip}`}
              >
                <FiBell size={16} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-[1.5px] border-white bg-[#f26a10]" />
              </button>
              <div className={`flex h-10 items-center gap-2 rounded-xl py-1 pl-1 pr-2.5 ${chip}`}>
                <img src={profilePhoto} alt="Profile" className="h-7 w-7 rounded-lg object-cover" />
                <span className="max-w-[80px] truncate text-[12px] font-semibold">{firstName}</span>
              </div>
            </div>
          </div>

          <label className={`flex h-11 w-full min-md:min-w-[220px] min-md:max-w-[520px] min-md:flex-1 items-center gap-2.5 rounded-xl px-4 ${chip}`}>
            <FiSearch size={15} className="shrink-0 text-[#8a817b]" />
            <input
              type="search"
              aria-label="Search services and transactions"
              placeholder="Search service, product and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8a817b]"
            />
            <kbd className="rounded-md bg-[#f2f0ee] px-2 py-1 text-[10px] font-semibold text-[#8a817b] md:hidden">
              ⌘ K
            </kbd>
          </label>

          <div className="flex md:hidden ml-auto items-center gap-2.5">
            <button
              type="button"
              aria-label="Notifications"
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${chip}`}
            >
              <FiBell size={16} />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full border-[1.5px] border-white bg-[#f26a10]" />
            </button>
            <div className={`flex h-11 items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-4 ${chip}`}>
              <img src={profilePhoto} alt="Profile" className="h-8 w-8 rounded-lg object-cover" />
              <div className="leading-tight">
                <p className="text-[12.5px] font-semibold">{fullName}</p>
                <p className="text-[10.5px] text-[#8a817b]">Tier 2 account</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== MALL VIEW: embedded web view inside the dashboard ===== */}
        {activeView === "mall" && (
          <section
            className={`${card} mt-4 flex flex-col overflow-hidden h-[calc(100vh-160px)] min-md:h-auto min-md:flex-1 min-md:min-h-0`}
          >
            {/* Toolbar */}
            <div className="flex shrink-0 items-center gap-3 md:gap-2 border-b border-[#efebe6] px-4 md:px-3 py-2.5 md:py-2">
              <button
                type="button"
                onClick={goHome}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-[#f2f0ee] px-3 md:px-2.5 text-[12px] font-semibold hover:bg-[#e9e5e0]"
              >
                <FiArrowLeft size={13} /> Dashboard
              </button>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#f26a10] px-2.5 py-1 text-[10.5px] font-semibold text-white">
                  Mall
                </span>
                <span className="truncate text-[11.5px] text-[#8a817b] md:hidden">mall.payarena.com</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={reloadMall}
                  aria-label="Reload Mall"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f0ee] hover:bg-[#e9e5e0]"
                >
                  <FiRefreshCw size={13} />
                </button>
                <a
                  href={mallUrl || getMallAuthLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-[#f2f0ee] px-3 md:px-2.5 text-[12px] font-semibold hover:bg-[#e9e5e0]"
                >
                  Open in new tab
                </a>
              </div>
            </div>

            {/* Web view */}
            <div className="relative min-h-0 flex-1 bg-white">
              {mallLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
                  <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#f2f0ee] border-t-[#f26a10]" />
                  <p className="text-[12px] text-[#8a817b]">Loading Payarena Mall…</p>
                </div>
              )}
              <iframe
                key={mallKey}
                ref={iframeRef}
                src={mallUrl}
                title="Payarena Mall"
                className="h-full w-full border-0"
                allow="payment; clipboard-write; geolocation; camera; microphone"
                referrerPolicy="no-referrer"
                onLoad={onIframeLoad}
              />
            </div>
          </section>
        )}

        {/* ===== HOME VIEW ===== */}
        {activeView === "home" && (
          <div className="flex-1 min-h-0 flex flex-col min-md:overflow-hidden">
            {/* Greeting */}
            <div className="shrink-0 mt-5 md:mt-4 flex flex-wrap items-end justify-between gap-3 md:gap-2.5">
              <div>
                <p className="flex items-center gap-1.5 text-[13px] md:text-[12.5px] text-[#8a817b]">
                  {getGreeting()} <FiSun size={13} className="text-[#f26a10]" />
                </p>
                <h1 className="mt-0.5 text-[26px] md:text-[22px] font-medium capitalise leading-tight tracking-tight">
                  Welcome Back, {firstName}
                </h1>
                {error && (
                  <p className="mt-2 text-[12px] text-red-600">Failed to load dashboard data. Please refresh.</p>
                )}
              </div>
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 md:px-3.5 md:py-1.5 text-[11.5px] md:text-[11px] font-light ${chip}`}>
                <FiShield size={12} className="text-[#f26a10]" />
                Account: {balance?.accountNumber || "N/A"}
              </div>
            </div>

            {/* Grid */}
            <div className="mt-4 grid gap-4 grid-cols-[minmax(0,1fr)_340px] md:grid-cols-1 flex-1 min-h-0 min-md:overflow-hidden">
              {/* Center scrollable column */}
              <div className="flex min-w-0 flex-col gap-4 min-md:h-full min-md:overflow-y-auto min-md:pr-2 min-md:pb-4 [scrollbar-width:thin] min-md:[&::-webkit-scrollbar]:w-1.5 min-md:[&::-webkit-scrollbar-thumb]:rounded-full min-md:[&::-webkit-scrollbar-thumb]:bg-[#1a1210]/15 min-md:hover:[&::-webkit-scrollbar-thumb]:bg-[#1a1210]/25">
                {/* Wallet card */}
            <section className="relative shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff7a22] via-[#f56a10] to-[#e04e05] p-5 text-white shadow-[0_12px_30px_rgba(240,100,20,0.22)] md:p-6">
  {loading && (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f56a10]/80">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-white/30 border-t-white" />
    </div>
  )}
  <span className="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full bg-white/10" />
  <span className="pointer-events-none absolute -bottom-32 left-[55%] h-64 w-64 rounded-full bg-white/10" />

  {/* Top row: balance left, card top right */}
  <div className="relative flex items-start justify-between gap-4">
    {/* Left: balance */}
    <div className="min-w-0 flex-1">
      <button
        type="button"
        onClick={() => setBalanceVisible((v) => !v)}
        aria-label={balanceVisible ? "Hide wallet balance" : "Show wallet balance"}
        className="flex items-center gap-2 text-[12.5px] text-white/85"
      >
        Wallet balance
        {balanceVisible ? <FiEye size={12} /> : <FiEyeOff size={12} />}
      </button>

      <p className="my-6 text-[44px] sm:[30px] font-extrabold leading-none tracking-tight lg:text-[34px]">
        {balanceVisible ? (
          <>
            ₦{parseFloat(balance?.currentBalance || 0).toLocaleString()}
            <span className="text-[18px] font-bold text-white/60 lg:text-[20px]">.00</span>
          </>
        ) : (
          "₦••••••••"
        )}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-light">
        <FiTrendingUp size={12} />
        +₦{graphData?.weeklyGrowth || 0} This week
      </span>
    </div>

    {/* Right: linked card (slightly smaller) */}
    <div className="w-[240px] shrink-0 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#1e120b] via-[#2b1810] to-[#3a2218] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.32)] sm:w-[265px] md:w-[295px] xl:w-[330px] xl:p-5">
      <div className="flex min-h-[155px] flex-col justify-between gap-3 md:min-h-[165px] xl:min-h-[185px]">
        {/* Top: label + brand */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium text-white/50">Linked card</p>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-extrabold italic text-[#1a3a8f] shadow-sm">
            VISA
          </span>
        </div>

        {/* Middle: chip + number */}
        <div>
          <div className="mb-3 h-8 w-11 rounded-md bg-gradient-to-br from-[#e8c76a] to-[#c9a23a] shadow-inner xl:h-9 xl:w-12" />
          <p className="flex items-center gap-2.5 whitespace-nowrap text-[14px] font-semibold tracking-[0.12em] md:text-[15px] xl:gap-3 xl:text-[17px]">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>8888</span>
          </p>
        </div>

        {/* Bottom: holder + expiry */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Card holder</p>
            <p className="mt-0.5 truncate text-[12px] font-semibold text-white/80 xl:text-[13px]">
              {balance?.accountName || fullName}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[9px] uppercase tracking-wider text-white/40">Account</p>
            <p className="mt-0.5 text-[12px] font-semibold text-white/80 xl:text-[13px]">
              {balance?.accountNumber || "•••• •••• •••• 8888"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Actions */}
  <div className="relative mt-6 grid grid-cols-3 gap-2 md:gap-3">
    <Link
      to="/wallet"
      state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
      onClick={() => {
        sessionStorage.setItem("fromDashboard", "true");
        sessionStorage.setItem("returnTo", "/dashboard-v2");
      }}
      className="flex h-11 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-2 text-[12px] font-medium text-[#e04e05] hover:bg-white/90 md:text-[12.5px]"
    >
      <FiPlus size={14} /> Add money
    </Link>
    <Link
      to="#"
      className="flex h-11 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-white/15 px-2 text-[12px] font-medium hover:bg-white/25 md:text-[12.5px]"
    >
      <FiRepeat size={14} /> Transfer
    </Link>
    <Link
      to="#"
      className="flex h-11 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-white/15 px-2 text-[12px] font-medium hover:bg-white/25 md:text-[12.5px]"
    >
      <FiClock size={14} /> Transactions
    </Link>
  </div>
</section> 

                {/* Quick actions */}
                <section>
                  {/* <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[16px] font-medium">Quick actions</h2>
                    <Link to="#" className="flex items-center gap-1 text-[12px] font-semibold text-[#e04e05] hover:underline">
                      See all <FiArrowRight size={12} />
                    </Link>
                  </div> */}
                  <div className="flex items-center gap-4 justify-center">
                    {quickActions.map(({ label, icon: Icon, fg, bg, href, muted }) => (
                      <Link
                        key={label}
                        to={href}
                        state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
                        onClick={() => {
                          sessionStorage.setItem("fromDashboard", "true");
                          sessionStorage.setItem("returnTo", "/dashboard-v2");
                        }}
                        className={`${card} flex flex-col items-center gap-2 px-10 py-6 text-[12px] font-medium transition-shadow hover:shadow-md ${muted ? "text-[#8a817b]" : ""
                          }`}
                      >
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ color: fg, backgroundColor: bg }}
                        >
                          <Icon size={18} />
                        </span>
                        {label}
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Promo cards */}
                <div className="grid gap-3 grid-cols-2 md:grid-cols-1">
                  {/* Payarena Mall promo: opens mall in new tab */}
                  <a
                    href={getMallAuthLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-[#1a1210] p-5 text-left text-white hover:opacity-90 transition-opacity"
                  >
                    <FiShoppingBag
                      size={96}
                      strokeWidth={1.2}
                      className="pointer-events-none absolute -bottom-2 right-2 text-white/10"
                    />
                    <span className="relative w-fit rounded-full bg-[#f26a10] px-2.5 py-1 text-[10.5px] font-semibold">
                      Payarena Mall
                    </span>
                    <div className="relative">
                      <p className="max-w-[210px] text-[16px] font-bold leading-snug">
                        Shop top products at the best prices
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#ff7a22]">
                        Shop now <FiArrowRight size={12} />
                      </p>
                    </div>
                  </a>

                  <Link
                    to="/payment/airtime_recharge"
                    state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
                    onClick={() => {
                      sessionStorage.setItem("fromDashboard", "true");
                      sessionStorage.setItem("returnTo", "/dashboard-v2");
                    }}
                    className="relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-[#fdeee3] p-5"
                  >
                    <FiZap
                      size={104}
                      strokeWidth={1}
                      className="pointer-events-none absolute -bottom-2 right-0 fill-[#ffd9c2] text-[#ffd9c2]"
                    />
                    <span className="relative w-fit rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold">
                      Payarena VAS
                    </span>
                    <div className="relative">
                      <p className="max-w-[210px] text-[16px] font-bold leading-snug">
                        Airtime, data, bills and so much more
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-[#e04e05]">
                        Pay now <FiArrowRight size={12} />
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right column (fixed on desktop) */}
              <div className="flex min-w-0 flex-col gap-4 min-md:h-full min-md:overflow-y-auto min-md:pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* Send again */}
                {/* <section className={`${card} p-5 md:p-4`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] md:text-[15px] font-light">Send again</h2>
                    <Link to="#" className="text-[12px] font-semibold text-[#e04e05] hover:underline">
                      All
                    </Link>
                  </div>
                  <div className="mt-4 md:mt-3.5 flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                    <Link to="/transfers" className="flex flex-col items-center gap-1.5 shrink-0">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-[#d9d3cd] text-[#8a817b]">
                        <FiPlus size={15} />
                      </span>
                      <span className="text-[11.5px] font-medium">New</span>
                    </Link>
                    {sendAgainContacts.map((c) => (
                      <Link to="/transfers" key={c.name} className="flex flex-col items-center gap-1.5 shrink-0">
                        <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-xl object-cover" />
                        <span className="text-[11.5px] font-medium">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </section> */}

                {/* Recent activity */}
                <section className={`${card} p-5 md:p-4`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] md:text-[15px] font-light">Recent Transaction</h2>
                    <Link to="#" className="text-[12px] font-semibold text-[#e04e05] hover:underline">
                      See all
                    </Link>
                  </div>
                  <div className="mt-3 space-y-0.5">
                    {loading ? (
                      <div className="py-5 flex justify-center">
                        <span className="h-12 w-12 animate-spin rounded-full border-[2px] border-[#f2f0ee] border-t-[#f26a10]" />
                      </div>
                    ) : filteredTransactions.length === 0 ? (
                      <div className="py-16 flex flex-col items-center justify-center gap-2">
                        <FiFileText size={42} className="text-[#d4cfc8]" />
                        <p className="text-center text-[12px] text-[#8a817b]">No matching activity</p>
                      </div>
                    ) : (
                      filteredTransactions.map(({ title, detail, amount, icon: Icon, fg, bg, positive }) => (
                        <Link
                          to="#"
                          key={title}
                          className="flex items-center gap-3 rounded-xl py-2.5 transition-colors hover:bg-[#faf8f6]"
                        >
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                            style={{ color: fg, backgroundColor: bg }}
                          >
                            <Icon size={15} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-semibold">{title}</span>
                            <span className="mt-0.5 block truncate text-[11px] text-[#8a817b]">{detail}</span>
                          </span>
                          <span className={`shrink-0 text-[13px] font-semibold ${positive ? "text-[#0f9d63]" : ""}`}>
                            {amount}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                </section>

                {/* Spending */}
                {/* <section className={`${card} p-5 md:p-4`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] md:text-[15px] font-light">Spending</h2>
                    <span className="text-[11.5px] text-[#8a817b]">This month</span>
                  </div>
                  <p className="mt-3 text-[24px] md:text-[22px] font-extrabold tracking-tight">₦{totalSpending.toLocaleString()}</p>

                  <div className="mt-3 flex h-2 gap-1" role="img" aria-label="Spending breakdown by category">
                    {spendingData.map((d) => (
                      <span
                        key={d.category}
                        className="h-full rounded-full font-light"
                        style={{ flexGrow: d.amount, backgroundColor: d.color }}
                      />
                    ))}
                  </div>

                  <ul className="mt-4 space-y-3">
                    {spendingData.map((d) => (
                      <li key={d.category} className="flex items-center gap-2.5 text-[12.5px]">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="flex-1 font-light">{d.category}</span>
                        <span className="font-semibold">₦{d.amount.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </section> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== Mobile Bottom Navigation Bar ===== */}
      <nav
        aria-label="Quick mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-[#e8e3dc] bg-white/95 px-2 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] min-md:hidden"
      >
        <Link
          to="/dashboard-v2"
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#f26a10] transition-colors"
        >
          <FiHome size={18} />
          <span>Home</span>
        </Link>

        <Link
          to="/payment/airtime_recharge"
          state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
          onClick={() => {
            sessionStorage.setItem("fromDashboard", "true");
            sessionStorage.setItem("returnTo", "/dashboard-v2");
          }}
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiGrid size={18} />
          <span>VAS</span>
        </Link>

        <a
          href={getMallAuthLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiShoppingBag size={18} />
          <span className="relative">
            Mall
            <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-[#f26a10]" />
          </span>
        </a>

        <Link
          to="/transfers"
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiSend size={18} />
          <span>Send</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiMenu size={18} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}