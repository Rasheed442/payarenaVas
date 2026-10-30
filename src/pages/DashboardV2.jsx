import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowDownLeft,
  FiArrowLeft,
  FiArrowRight,
  FiBell,
  FiClock,
  FiCreditCard,
  FiExternalLink,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiLogOut,
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
  FiZap,
} from "react-icons/fi";

import defaultProfile from "../assets/images/profilePicture.png";

/* ---------- Data ---------- */

const quickActions = [
  { label: "Airtime", icon: FiSmartphone, fg: "#f26a10", bg: "#fff0e6", href: "/payment/airtime_recharge" },
  { label: "Data", icon: FiWifi, fg: "#1b9ad6", bg: "#e8f5fd", href: "/payment/data" },
  { label: "Electricity", icon: FiZap, fg: "#f59e0b", bg: "#fff8e1", href: "/payment/electricity" },
  { label: "Pay bills", icon: FiFileText, fg: "#7c4dff", bg: "#f1ecff", href: "/payments" },
  { label: "Send", icon: FiSend, fg: "#10a36b", bg: "#e6f8f0", href: "/transfers" },
  { label: "More", icon: FiMoreHorizontal, fg: "#9a948f", bg: "#f2f0ee", href: "/payments", muted: true },
];

const recentTransactions = [
  { title: "Airtime purchase", detail: "MTN · 10:24 AM", amount: "−₦0", icon: FiSmartphone, fg: "#1a1210", bg: "#f2f0ee", positive: false },
  { title: "Money received", detail: "John Ade · 09:15 AM", amount: "+₦0", icon: FiArrowDownLeft, fg: "#10a36b", bg: "#e6f8f0", positive: true },
  { title: "Electricity", detail: "Ikeja Electric · 08:45 AM", amount: "−₦0", icon: FiZap, fg: "#f59e0b", bg: "#fff8e1", positive: false },
];

// Replace `avatar` with each contact's real photo when available
const sendAgainContacts = [
  { name: "John", avatar: defaultProfile },
  { name: "Amaka", avatar: defaultProfile },
  { name: "Tunde", avatar: defaultProfile },
];

const spendingData = [
  { category: "Airtime & data", amount: 0, color: "#f26a10" },
  { category: "Utilities", amount: 0, color: "#fbbf24" },
  { category: "Transfers", amount: 0, color: "#1a1210" },
];

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

const card = "rounded-2xl bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04),0_6px_18px_rgba(26,18,16,0.04)]";
const chip = "bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)]";

/* ---------- Component ---------- */

export default function DashboardV2() {
  const navigate = useNavigate();
  const user = useMemo(() => getUserDetails(), []);
  const firstName = user.FirstName?.trim()?.split(/\s+/)[0] || "David";
  const lastName = user.LastName?.trim()?.split(/\s+/)[0] || "Adeleke";
  const fullName = `${firstName} ${lastName}`;
  const profilePhoto = user.ProfilePhoto || defaultProfile;

  // "home" = normal dashboard, "mall" = embedded Payarena Mall inside the dashboard
  const [activeView, setActiveView] = useState("home");
  const [mallUrl, setMallUrl] = useState("");
  const [mallLoading, setMallLoading] = useState(true);
  const [mallKey, setMallKey] = useState(0); // bump to reload the iframe

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [search, setSearch] = useState("");

  const openMall = () => {
    // Build the URL at open time so the latest token is always used
    setMallUrl(getMallAuthLink());
    setMallLoading(true);
    setMallKey((k) => k + 1);
    setActiveView("mall");
  };

  const goHome = () => setActiveView("home");

  const reloadMall = () => {
    setMallUrl(getMallAuthLink());
    setMallLoading(true);
    setMallKey((k) => k + 1);
  };

  const sideLinks = [
    { label: "Home", icon: FiHome, type: "view", onClick: goHome, active: activeView === "home" },
    { label: "VAS", icon: FiGrid, type: "route", to: "/payment/airtime_recharge" },
    { label: "Mall", icon: FiShoppingBag, type: "view", onClick: openMall, active: activeView === "mall", isNew: true },
    { label: "Wallet", icon: FiCreditCard, type: "route", to: "#" },
    { label: "Profile", icon: FiUser, type: "route", to: "#" },
  ];

  const filteredTransactions = recentTransactions.filter((t) =>
    `${t.title} ${t.detail}`.toLowerCase().includes(search.trim().toLowerCase())
  );

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

    // In-dashboard views (Home / Mall): swap the main content, no navigation
    if (type === "view") {
      return (
        <button
          key={label}
          type="button"
          onClick={onClick}
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
        }}
        className={`${base} ${idle}`}
      >
        {inner}
      </Link>
    );
  };

  return (
    <div
      className="min-h-screen bg-[#f6f3ee] p-3 text-[13px] text-[#1a1210] flex gap-5 p-4"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ===== Sidebar ===== */}
      <aside
        className="sticky top-4 w-[232px] shrink-0 flex-col self-start rounded-3xl bg-[#1a1210] p-4 flex"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <Link
          to="/dashboard-v2"
          onClick={goHome}
          aria-label="Payarena home"
          className="flex items-center gap-2.5 px-1.5 pt-1"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8a3d] to-[#e8520a] text-[17px] font-bold text-white">

          </span>
          <span>
            <span className="block text-[17px] font-bold leading-tight text-white">payarena</span>
            <span className="block text-[10px] text-white/50">A world of more options</span>
          </span>
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

      <div className="min-w-0 flex-1">
        {/* ===== Top bar (shared by both views) ===== */}
        <header className="flex flex-wrap items-center gap-3">
          <label className={`flex h-11 min-w-[220px] max-w-[520px] flex-1 items-center gap-2.5 rounded-xl px-4 ${chip}`}>
            <FiSearch size={15} className="shrink-0 text-[#8a817b]" />
            <input
              type="search"
              aria-label="Search services and transactions"
              placeholder="Search service, product and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8a817b]"
            />
            <kbd className="hidden rounded-md bg-[#f2f0ee] px-2 py-1 text-[10px] font-semibold text-[#8a817b] sm:block">
              ⌘ K
            </kbd>
          </label>

          <div className="ml-auto flex items-center gap-2.5">
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
            className={`${card} mt-4 flex flex-col overflow-hidden`}
            style={{ height: "calc(100vh - 2rem - 44px - 1rem)" }}
          >
            {/* Toolbar */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#efebe6] px-4 py-2.5">
              <button
                type="button"
                onClick={goHome}
                className="flex h-8 items-center gap-1.5 rounded-lg bg-[#f2f0ee] px-3 text-[12px] font-semibold hover:bg-[#e9e5e0]"
              >
                <FiArrowLeft size={13} /> Dashboard
              </button>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#f26a10] px-2.5 py-1 text-[10.5px] font-semibold text-white">
                  Payarena Mall
                </span>
                <span className="hidden truncate text-[11.5px] text-[#8a817b] sm:block">mall.payarena.com</span>
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
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-[#f2f0ee] px-3 text-[12px] font-semibold hover:bg-[#e9e5e0]"
                >
                  <FiExternalLink size={13} /> Open in new tab
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
                src={mallUrl}
                title="Payarena Mall"
                className="h-full w-full border-0"
                allow="payment; clipboard-write; geolocation"
                sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-top-navigation-by-user-activation"
                onLoad={() => setMallLoading(false)}
              />
            </div>
          </section>
        )}

        {/* ===== HOME VIEW ===== */}
        {activeView === "home" && (
          <>
            {/* Greeting */}
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 text-[13px] text-[#8a817b]">
                  {getGreeting()} <FiSun size={13} className="text-[#f26a10]" />
                </p>
                <h1 className="mt-0.5 text-[26px] font-medium leading-tight tracking-tight">
                  Welcome back, {firstName}
                </h1>
              </div>
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium ${chip}`}>
                <FiShield size={12} className="text-[#f26a10]" />
                Daily limit ₦0 · 0% used
              </div>
            </div>

            {/* Grid */}
            <div className="mt-4 grid gap-4 grid-cols-[minmax(0,1fr)_340px]">
              {/* Left column */}
              <div className="flex min-w-0 flex-col gap-4">
                {/* Wallet card */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff7a22] via-[#f56a10] to-[#e04e05] p-6 text-white shadow-[0_12px_30px_rgba(240,100,20,0.22)]">
                  <span className="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full bg-white/10" />
                  <span className="pointer-events-none absolute -bottom-32 left-[55%] h-64 w-64 rounded-full bg-white/10" />

                  <div className="relative flex flex-wrap items-start justify-between gap-5">
                    <div className="min-w-[200px]">
                      <button
                        type="button"
                        onClick={() => setBalanceVisible((v) => !v)}
                        aria-label={balanceVisible ? "Hide wallet balance" : "Show wallet balance"}
                        className="flex items-center gap-2 text-[12.5px] text-white/85"
                      >
                        Wallet balance
                        {balanceVisible ? <FiEye size={12} /> : <FiEyeOff size={12} />}
                      </button>

                      <p className="mt-3 text-[38px] font-extrabold leading-none tracking-tight">
                        {balanceVisible ? (
                          <>
                            ₦0<span className="text-[22px] font-bold text-white/60">.00</span>
                          </>
                        ) : (
                          "₦••••••••"
                        )}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-medium">
                        <FiTrendingUp size={12} />
                        +₦0 this week
                      </span>
                    </div>

                    {/* Linked card */}
                    <div className="w-full max-w-[230px] rounded-xl bg-[#2b1810]/90 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-white/55">Linked card</p>
                        <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-extrabold italic text-[#1a3a8f]">
                          VISA
                        </span>
                      </div>
                      <p className="mt-5 text-[16px] font-semibold tracking-[0.2em]">•••• 8888</p>
                      <div className="mt-4 flex items-center justify-between text-[10px] text-white/55">
                        <span>{fullName}</span>
                        <span>09/28</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-7 grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white text-[12.5px] font-medium text-[#e04e05] hover:bg-white/90"
                    >
                      <FiPlus size={14} /> Add money
                    </button>
                    <Link
                      to="/transfers"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white/15 text-[12.5px] font-medium hover:bg-white/25"
                    >
                      <FiRepeat size={14} /> Transfer
                    </Link>
                    <Link
                      to="/history"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white/15 text-[12.5px] font-medium hover:bg-white/25"
                    >
                      <FiClock size={14} /> Transactions
                    </Link>
                  </div>
                </section>

                {/* Quick actions */}
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[16px] font-bold">Quick actions</h2>
                    <Link to="/payments" className="flex items-center gap-1 text-[12px] font-semibold text-[#e04e05] hover:underline">
                      See all <FiArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 md:grid-cols-6">
                    {quickActions.map(({ label, icon: Icon, fg, bg, href, muted }) => (
                      <Link
                        key={label}
                        to={href}
                        state={{ fromDashboard: true, returnTo: "/dashboard-v2" }}
                        onClick={() => {
                          sessionStorage.setItem("fromDashboard", "true");
                          sessionStorage.setItem("returnTo", "/dashboard-v2");
                        }}
                        className={`${card} flex flex-col items-center gap-2 px-2 py-4 text-[12px] font-medium transition-shadow hover:shadow-md ${muted ? "text-[#8a817b]" : ""
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
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Payarena Mall promo: opens the embedded Mall view */}
                  <button
                    type="button"
                    onClick={openMall}
                    className="relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-2xl bg-[#1a1210] p-5 text-left text-white"
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
                  </button>

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

              {/* Right column */}
              <div className="flex min-w-0 flex-col gap-4">
                {/* Send again */}
                <section className={`${card} p-5`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-medium">Send again</h2>
                    <Link to="/transfers" className="text-[12px] font-semibold text-[#e04e05] hover:underline">
                      All
                    </Link>
                  </div>
                  <div className="mt-4 flex gap-3.5">
                    <Link to="/transfers" className="flex flex-col items-center gap-1.5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-dashed border-[#d9d3cd] text-[#8a817b]">
                        <FiPlus size={15} />
                      </span>
                      <span className="text-[11.5px] font-medium">New</span>
                    </Link>
                    {sendAgainContacts.map((c) => (
                      <Link to="/transfers" key={c.name} className="flex flex-col items-center gap-1.5">
                        <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-xl object-cover" />
                        <span className="text-[11.5px] font-medium">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Recent activity */}
                <section className={`${card} p-5`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-medium">Recent activity</h2>
                    <Link to="/history" className="text-[12px] font-semibold text-[#e04e05] hover:underline">
                      See all
                    </Link>
                  </div>
                  <div className="mt-3 space-y-0.5">
                    {filteredTransactions.length === 0 && (
                      <p className="py-5 text-center text-[12px] text-[#8a817b]">No matching activity</p>
                    )}
                    {filteredTransactions.map(({ title, detail, amount, icon: Icon, fg, bg, positive }) => (
                      <Link
                        to="/history"
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
                    ))}
                  </div>
                </section>

                {/* Spending */}
                <section className={`${card} p-5`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-bold">Spending</h2>
                    <span className="text-[11.5px] text-[#8a817b]">This month</span>
                  </div>
                  <p className="mt-3 text-[24px] font-extrabold tracking-tight">₦{totalSpending.toLocaleString()}</p>

                  <div className="mt-3 flex h-2 gap-1" role="img" aria-label="Spending breakdown by category">
                    {spendingData.map((d) => (
                      <span
                        key={d.category}
                        className="h-full rounded-full"
                        style={{ flexGrow: d.amount, backgroundColor: d.color }}
                      />
                    ))}
                  </div>

                  <ul className="mt-4 space-y-3">
                    {spendingData.map((d) => (
                      <li key={d.category} className="flex items-center gap-2.5 text-[12.5px]">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="flex-1 font-medium">{d.category}</span>
                        <span className="font-semibold">₦{d.amount.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}