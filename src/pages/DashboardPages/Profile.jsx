import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCamera,
  FiCreditCard,
  FiEdit,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiSearch,
  FiSend,
  FiShield,
  FiShoppingBag,
  FiUser,
  FiCalendar,
  FiCheck,
  FiX,
} from "react-icons/fi";
import payarenaLogo from "../../assets/images/logo.svg";
import defaultProfile from "../../assets/images/profilePicture.png";

/* ---------- Helpers ---------- */

function getUserDetails() {
  try {
    const stored = localStorage.getItem("userDetails");
    const user = stored ? JSON.parse(stored) : {};
    return user && typeof user === "object" ? user : {};
  } catch {
    return {};
  }
}

const card = "rounded-2xl bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04),0_6px_18px_rgba(26,18,16,0.04)]";
const chip = "bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)]";

/* ---------- Component ---------- */

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useMemo(() => getUserDetails(), []);
  const firstName = user.FirstName?.trim() || "David";
  const lastName = user.LastName?.trim() || "Adeleke";
  const fullName = `${firstName} ${lastName}`;
  const email = user.Email || "user@example.com";
  const phone = user.PhoneNumber || "+234 800 000 0000";
  const profilePhoto = user.ProfilePhoto || defaultProfile;

  const [editMode, setEditMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    phone,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("mall-token");
    localStorage.removeItem("mallUserInfo");
    navigate("/login/new");
  };

  const sideLinks = [
    { label: "Home", icon: FiHome, type: "route", to: "/dashboard-v2" },
    { label: "VAS", icon: FiGrid, type: "route", to: "/payment/airtime_recharge" },
    { label: "Mall", icon: FiShoppingBag, type: "route", to: "/dashboard-v2", isNew: true },
    { label: "Wallet", icon: FiCreditCard, type: "route", to: "/wallet" },
    { label: "Profile", icon: FiUser, type: "route", to: "/profile", active: true },
  ];

  const renderNavItem = ({ label, icon: Icon, type, to, active, isNew }) => {
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
        onClick={() => {
          setMobileMenuOpen(false);
        }}
        className={`${base} ${active ? on : idle}`}
      >
        {inner}
      </Link>
    );
  };

  const handleSave = () => {
    // TODO: Implement save logic
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName,
      lastName,
      email,
      phone,
    });
    setEditMode(false);
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
            onClick={() => setMobileMenuOpen(false)}
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
        {/* ===== Top bar ===== */}
        <header className="shrink-0 flex flex-wrap items-center gap-3 md:gap-2.5">
          {/* Mobile Top Row: Hamburger + Logo */}
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

            <div className={`flex h-10 items-center gap-2 rounded-xl py-1 pl-1 pr-2.5 ${chip}`}>
              <img src={profilePhoto} alt="Profile" className="h-7 w-7 rounded-lg object-cover" />
              <span className="max-w-[80px] truncate text-[12px] font-semibold">{firstName}</span>
            </div>
          </div>

          <label className={`flex h-11 w-full min-md:min-w-[220px] min-md:max-w-[520px] min-md:flex-1 items-center gap-2.5 rounded-xl px-4 ${chip}`}>
            <FiSearch size={15} className="shrink-0 text-[#8a817b]" />
            <input
              type="search"
              aria-label="Search"
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8a817b]"
            />
          </label>

          <div className="flex md:hidden ml-auto items-center gap-2.5">
            <div className={`flex h-11 items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-4 ${chip}`}>
              <img src={profilePhoto} alt="Profile" className="h-8 w-8 rounded-lg object-cover" />
              <div className="leading-tight">
                <p className="text-[12.5px] font-semibold">{fullName}</p>
                <p className="text-[10.5px] text-[#8a817b]">Tier 2 account</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== Main Content ===== */}
        <div className="mt-4 flex-1 min-h-0 flex flex-col min-md:overflow-hidden">
          <div className="flex min-w-0 flex-col gap-4 min-md:h-full min-md:overflow-y-auto min-md:pr-2 min-md:pb-4 [scrollbar-width:thin] min-md:[&::-webkit-scrollbar]:w-1.5 min-md:[&::-webkit-scrollbar-thumb]:rounded-full min-md:[&::-webkit-scrollbar-thumb]:bg-[#1a1210]/15 min-md:hover:[&::-webkit-scrollbar-thumb]:bg-[#1a1210]/25">
          {/* Profile Header Card */}
          <section className={`${card} p-6 md:p-5`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              {/* Profile Photo */}
              <div className="relative">
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden bg-[#f2f0ee]">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f26a10] text-white shadow-lg hover:bg-[#e04e05]"
                  aria-label="Change profile photo"
                >
                  <FiCamera size={16} />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[24px] md:text-[22px] font-semibold leading-tight">
                      {fullName}
                    </h2>
                    <p className="mt-1 text-[13px] text-[#8a817b]">Tier 2 account</p>
                  </div>
                  {!editMode && (
                    <button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="flex h-10 items-center gap-2 rounded-xl bg-[#f2f0ee] px-4 text-[12.5px] font-semibold hover:bg-[#e9e5e0]"
                    >
                      <FiEdit size={14} />
                      Edit Profile
                    </button>
                  )}
                </div>

                {editMode && (
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex h-10 items-center justify-center rounded-xl bg-[#f2f0ee] px-6 text-[12.5px] font-semibold hover:bg-[#e9e5e0]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#f26a10] px-6 text-[12.5px] font-semibold text-white hover:bg-[#e04e05]"
                    >
                      <FiCheck size={14} />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Personal Information Card */}
          <section className={`${card} p-6 md:p-5`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-semibold">Personal Information</h3>
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-1.5 text-[12px] font-semibold text-[#e04e05] hover:underline"
                >
                  <FiEdit size={12} />
                  Edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8a817b] uppercase tracking-wider mb-2">
                  First Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full h-11 rounded-xl border border-[#efebe6] bg-white px-4 text-[13px] outline-none focus:border-[#f26a10] transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-11 px-4">
                    <FiUser size={16} className="text-[#8a817b]" />
                    <span className="text-[13px] font-medium">{firstName}</span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8a817b] uppercase tracking-wider mb-2">
                  Last Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full h-11 rounded-xl border border-[#efebe6] bg-white px-4 text-[13px] outline-none focus:border-[#f26a10] transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-11 px-4">
                    <FiUser size={16} className="text-[#8a817b]" />
                    <span className="text-[13px] font-medium">{lastName}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8a817b] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                {editMode ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 rounded-xl border border-[#efebe6] bg-white px-4 text-[13px] outline-none focus:border-[#f26a10] transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-11 px-4">
                    <FiMail size={16} className="text-[#8a817b]" />
                    <span className="text-[13px] font-medium">{email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-[#8a817b] uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 rounded-xl border border-[#efebe6] bg-white px-4 text-[13px] outline-none focus:border-[#f26a10] transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 h-11 px-4">
                    <FiPhone size={16} className="text-[#8a817b]" />
                    <span className="text-[13px] font-medium">{phone}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Account Details Card */}
          {/* <section className={`${card} p-6 md:p-5`}>
            <h3 className="text-[16px] font-semibold mb-5">Account Details</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#efebe6]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f8f0] text-[#10a36b]">
                    <FiShield size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">Account Tier</p>
                    <p className="text-[11px] text-[#8a817b]">Tier 2 - ₦50,000 daily limit</p>
                  </div>
                </div>
                <Link
                  to="#"
                  className="text-[12px] font-semibold text-[#e04e05] hover:underline"
                >
                  Upgrade
                </Link>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[#efebe6]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8e1] text-[#f59e0b]">
                    <FiCalendar size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">Account Created</p>
                    <p className="text-[11px] text-[#8a817b]">January 2024</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1ecff] text-[#7c4dff]">
                    <FiMapPin size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">Address</p>
                    <p className="text-[11px] text-[#8a817b]">Not set</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-[12px] font-semibold text-[#e04e05] hover:underline"
                >
                  Add
                </button>
              </div>
            </div>
          </section> */}

          {/* Security Settings Card */}
          {/* <section className={`${card} p-6 md:p-5`}>
            <h3 className="text-[16px] font-semibold mb-5">Security Settings</h3>

            <div className="space-y-3">
              <Link
                to="/settings"
                className="flex items-center justify-between py-3 hover:bg-[#faf8f6] rounded-xl px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f8f0] text-[#10a36b]">
                    <FiShield size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">Change Password</p>
                    <p className="text-[11px] text-[#8a817b]">Update your password</p>
                  </div>
                </div>
                <FiArrowLeft size={16} className="rotate-180 text-[#8a817b]" />
              </Link>

              <Link
                to="/settings"
                className="flex items-center justify-between py-3 hover:bg-[#faf8f6] rounded-xl px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8e1] text-[#f59e0b]">
                    <FiShield size={18} />
                  </span>
                  <div>
                    <p className="text-[13px] font-medium">Change PIN</p>
                    <p className="text-[11px] text-[#8a817b]">Update your transaction PIN</p>
                  </div>
                </div>
                <FiArrowLeft size={16} className="rotate-180 text-[#8a817b]" />
              </Link>
            </div>
          </section> */}

          {/* Logout Button (Mobile only - in drawer on desktop) */}
          {/* <button
            type="button"
            onClick={handleLogout}
            className="md:hidden flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#fee2e2] text-[13px] font-semibold text-[#dc2626] hover:bg-[#fecaca] transition-colors"
          >
            <FiLogOut size={16} />
            Logout
          </button> */}
        </div>
      </div>
      </div>

      {/* ===== Mobile Bottom Navigation Bar ===== */}
      <nav
        aria-label="Quick mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-[#e8e3dc] bg-white/95 px-2 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] min-md:hidden"
      >
        <Link
          to="/dashboard-v2"
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiHome size={18} />
          <span>Home</span>
        </Link>

        <Link
          to="/payment/airtime_recharge"
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiGrid size={18} />
          <span>VAS</span>
        </Link>

        <Link
          to="/dashboard-v2"
          className="flex flex-col items-center gap-1 py-1 px-3 text-[10.5px] font-medium text-[#8a817b] hover:text-[#f26a10] transition-colors"
        >
          <FiShoppingBag size={18} />
          <span>Mall</span>
        </Link>

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
