import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiCheckCircle,
  FiCreditCard,
  FiGrid,
  FiHeadphones,
  FiHome,
  FiLock,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSend,
  FiShield,
  FiShoppingBag,
  FiUser,
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

const card = "rounded bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04),0_6px_18px_rgba(26,18,16,0.04)]";
const chip = "bg-white shadow-[0_1px_2px_rgba(26,18,16,0.04)]";
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-[#f26a10]/50";
const outlineBtn = `h-9 shrink-0 rounded-lg border border-[#e8e3dc] bg-white px-4 text-[12px] font-semibold text-[#1a1210] transition-colors hover:bg-[#f6f3ee] ${focus}`;

/* ---------- Small building blocks ---------- */

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${focus} ${
        checked ? "bg-[#f26a10]" : "bg-[#d9d3cb]"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function Row({ title, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#efebe6] px-5 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium">{title}</p>
        {desc && <p className="mt-0.5 text-[12px] leading-snug text-[#8a817b]">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Panel({ title, desc, children }) {
  return (
    <section className={`${card} overflow-hidden`}>
      <div className="border-b border-[#efebe6] px-5 py-4">
        <h2 className="text-[16px] font-semibold">{title}</h2>
        <p className="mt-0.5 text-[12px] text-[#8a817b]">{desc}</p>
      </div>
      {children}
    </section>
  );
}

/* ---------- Component ---------- */

export default function SettingsV2Page() {
  const navigate = useNavigate();
  const user = useMemo(() => getUserDetails(), []);
  const firstName = user.FirstName?.trim() || "David";
  const lastName = user.LastName?.trim() || "Adeleke";
  const fullName = `${firstName} ${lastName}`;
  const profilePhoto = user.ProfilePhoto || defaultProfile;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("account");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [prefs, setPrefs] = useState({
    biometric: true,
    twoFactor: false,
    txnAlerts: true,
    securityAlerts: true,
    push: true,
    offers: false,
  });
  const flip = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // TODO: Add API call to change password
    console.log("Password change requested:", passwordForm);
    setPasswordModalOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    ["token", "refreshToken", "userDetails", "mall-token", "mallUserInfo"].forEach((k) =>
      localStorage.removeItem(k)
    );
    navigate("/login/new");
  };

  const sideLinks = [
    { label: "Home", icon: FiHome, type: "route", to: "/dashboard-v2" },
    { label: "VAS", icon: FiGrid, type: "route", to: "/payment/airtime_recharge" },
    { label: "Mall", icon: FiShoppingBag, type: "external", to: "https://mall.payarena.com", isNew: true },
    { label: "Wallet", icon: FiCreditCard, type: "route", to: "/wallet" },
    { label: "Profile", icon: FiUser, type: "route", to: "/profile" },
    { label: "Settings", icon: FiShield, type: "route", to: "/settings-v2", active: true },
  ];

  const renderNavItem = ({ label, icon: Icon, type, to, active, isNew }) => {
    const base = `flex h-10 w-full items-center gap-3 rounded-xl px-3.5 text-left text-[13px] font-medium transition-colors ${focus}`;
    const cls = `${base} ${active ? "bg-[#2a201c] text-white" : "text-white/60 hover:bg-white/5"}`;
    const inner = (
      <>
        <Icon size={16} className={`shrink-0 ${active ? "text-[#f26a10]" : ""}`} />
        <span className="flex-1">{label}</span>
        {isNew && <span className="rounded-full bg-[#f26a10] px-2 py-0.5 text-[9px] font-semibold text-white">New</span>}
        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#f26a10]" />}
      </>
    );
    return type === "external" ? (
      <a key={label} href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    ) : (
      <Link key={label} to={to} onClick={() => setMobileMenuOpen(false)} className={cls} aria-current={active ? "page" : undefined}>
        {inner}
      </Link>
    );
  };

  /* Shared by the desktop sidebar and the mobile drawer */
  const renderSidebarBody = () => (
    <>
      <p className="mt-6 px-3 text-[11px] font-medium text-white/40">Menu</p>
      <nav aria-label="Dashboard navigation" className="mt-2 flex flex-col gap-1 overflow-y-auto">
        {sideLinks.map(renderNavItem)}
      </nav>

      <div className="relative mt-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#f56a10] to-[#e04e05] p-4 text-white">
        <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
        <FiHeadphones size={18} />
        <p className="mt-2 text-[14px] font-semibold">Need help?</p>
        <p className="mt-1 text-[11px] leading-snug text-white/80">Chat with support every day, 7am to 10pm.</p>
        <button type="button" className={`mt-3 h-9 w-full rounded-lg bg-white text-[12px] font-semibold text-[#e04e05] hover:bg-white/90 ${focus}`}>
          Start chat
        </button>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className={`mt-3 flex h-10 items-center gap-3 rounded-xl px-3.5 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 ${focus}`}
      >
        <FiLogOut size={16} className="shrink-0" />
        Log out
      </button>
    </>
  );

  const categories = [
    { id: "account", label: "Account", icon: FiUser, description: "Your profile and details" },
    { id: "security", label: "Security", icon: FiLock, description: "Password, PIN and sign-in" },
    { id: "notifications", label: "Notifications", icon: FiBell, description: "Alerts and updates" },
    { id: "support", label: "Help and support", icon: FiHeadphones, description: "Get in touch with us" },
  ];

  const accountFields = [
    ["Full name", fullName],
    ["Email address", user.Email || "Not added"],
    ["Phone number", user.PhoneNumber || "Not added"],
    ["Account tier", "Tier 2"],
  ];

  return (
    <div
      className="min-h-screen min-md:h-screen min-md:overflow-hidden bg-[#f6f3ee] p-3 pb-24 min-md:p-4 text-[13px] text-[#1a1210] flex flex-col min-md:flex-row gap-4"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ===== Desktop sidebar ===== */}
      <aside
        className="flex md:hidden sticky top-4 w-[232px] shrink-0 flex-col self-start rounded-3xl bg-[#1a1210] p-4"
        style={{ height: "calc(100vh - 2rem)" }}
      >
        <Link to="/dashboard-v2" aria-label="Payarena home" className="flex items-center px-1.5 pt-1">
          <img src={payarenaLogo} alt="Payarena" className="h-8 w-auto object-contain brightness-0 invert" />
        </Link>
        {renderSidebarBody()}
      </aside>

      {/* ===== Mobile drawer ===== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm min-md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] max-w-[85vw] flex-col bg-[#1a1210] p-5 shadow-2xl transition-transform duration-300 ease-in-out min-md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link to="/dashboard-v2" onClick={() => setMobileMenuOpen(false)} aria-label="Payarena home">
            <img src={payarenaLogo} alt="Payarena" className="h-8 w-auto object-contain brightness-0 invert" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20 ${focus}`}
          >
            <FiX size={18} />
          </button>
        </div>
        {renderSidebarBody()}
      </div>

      <div className="min-w-0 flex-1 min-md:flex min-md:flex-col min-md:h-full min-md:overflow-hidden">
        {/* ===== Top bar ===== */}
        <header className="shrink-0 flex flex-wrap items-center gap-3 md:gap-2.5">
          <div className="flex min-md:hidden w-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${chip} ${focus}`}
              >
                <FiMenu size={18} />
              </button>
              <Link to="/dashboard-v2" aria-label="Payarena home">
                <img src={payarenaLogo} alt="Payarena" className="h-7 w-auto object-contain" />
              </Link>
            </div>
            <div className={`flex h-10 items-center gap-2 rounded-xl py-1 pl-1 pr-2.5 ${chip}`}>
              <img src={profilePhoto} alt="" className="h-7 w-7 rounded-lg object-cover" />
              <span className="max-w-[80px] truncate text-[12px] font-semibold">{firstName}</span>
            </div>
          </div>

          <label className={`flex h-11 w-full min-md:min-w-[220px] min-md:max-w-[520px] min-md:flex-1 items-center gap-2.5 rounded-xl px-4 focus-within:ring-2 focus-within:ring-[#f26a10]/40 ${chip}`}>
            <FiSearch size={15} className="shrink-0 text-[#8a817b]" />
            <input
              type="search"
              aria-label="Search"
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#8a817b]"
            />
          </label>

          <div className="flex md:hidden ml-auto items-center">
            <div className={`flex h-11 items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-4 ${chip}`}>
              <img src={profilePhoto} alt="" className="h-8 w-8 rounded-lg object-cover" />
              <div className="leading-tight">
                <p className="text-[12.5px] font-semibold">{fullName}</p>
                <p className="text-[10.5px] text-[#8a817b]">Tier 2 account</p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== Main content ===== */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col min-md:overflow-hidden">
          <div className="flex min-w-0 flex-col gap-5 min-md:h-full min-md:overflow-y-auto min-md:pr-2 min-md:pb-4 [scrollbar-width:thin]">
            <div className="shrink-0">
              <h1 className="text-[24px] font-semibold leading-tight tracking-tight">Settings</h1>
              <p className="mt-1 text-[13px] text-[#8a817b]">Manage your account, security and preferences.</p>
            </div>

            <div className="flex flex-col gap-4 min-md:flex-row min-md:items-start">
              {/* Category list: pills on mobile, vertical list on desktop */}
              <nav
                aria-label="Settings sections"
                className={`flex gap-2 overflow-x-auto p-1.5 [scrollbar-width:none] min-md:w-[250px] min-md:shrink-0 min-md:flex-col min-md:gap-1 min-md:overflow-visible ${card}`}
              >
                {categories.map(({ id, label, icon: Icon, description }) => {
                  const on = activeView === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveView(id)}
                      aria-current={on ? "page" : undefined}
                      className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors min-md:w-full ${focus} ${
                        on ? "bg-[#fff0e6]" : "hover:bg-[#f6f3ee]"
                      }`}
                    >
                      <Icon size={17} className={`shrink-0 ${on ? "text-[#e04e05]" : "text-[#8a817b]"}`} />
                      <span className="min-w-0">
                        <span className={`block text-[14px] font-medium ${on ? "text-[#e04e05]" : ""}`}>{label}</span>
                        <span className="hidden text-[12px] font-thin  text-[#8a817b] min-md:block">{description}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Active panel */}
              <div className="min-w-0 flex-1">
                {activeView === "account" && (
                  <Panel title="Account" desc="Your personal details on Payarena.">
                    <div className="flex items-center gap-4 border-b border-[#efebe6] px-5 py-5">
                      <img src={profilePhoto} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[16px] font-semibold">{fullName}</p>
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#e6f8f0] px-2.5 py-0.5 text-[11px] font-medium text-[#0b7a51]">
                          <FiCheckCircle size={11} /> Tier 2 verified
                        </span>
                      </div>
                      <Link to="/profile" className={`${outlineBtn} flex items-center`}>
                        Edit profile
                      </Link>
                    </div>
                    {accountFields.map(([label, value]) => (
                      <Row key={label} title={label}>
                        <p className="min-w-0 truncate text-[13px] text-[#5d544e]">{value}</p>
                      </Row>
                    ))}
                  </Panel>
                )}

                {activeView === "security" && (
                  <Panel title="Security" desc="Keep your money and your sign-in protected.">
                    <Row title="Password" desc="Use a strong password you don't use anywhere else.">
                      <button type="button" onClick={() => setPasswordModalOpen(true)} className={outlineBtn}>Change password</button>
                    </Row>
                    <Row title="Transaction PIN" desc="Required to confirm every payment and transfer.">
                      <button type="button" className={outlineBtn}>Change PIN</button>
                    </Row>
                    {/* <Row title="Biometric sign-in" desc="Use fingerprint or face recognition on supported devices.">
                      <Toggle checked={prefs.biometric} onChange={() => flip("biometric")} label="Biometric sign-in" />
                    </Row> */}
                    <Row title="Two-factor authentication" desc="Ask for a one-time code when you sign in on a new device.">
                      <Toggle checked={prefs.twoFactor} onChange={() => flip("twoFactor")} label="Two-factor authentication" />
                    </Row>
                  </Panel>
                )}

                {activeView === "notifications" && (
                  <Panel title="Notifications" desc="Choose what you hear from us.">
                    <Row title="Transaction alerts" desc="Get notified when money enters or leaves your wallet.">
                      <Toggle checked={prefs.txnAlerts} onChange={() => flip("txnAlerts")} label="Transaction alerts" />
                    </Row>
                    <Row title="Security alerts" desc="New sign-ins and changes to your account.">
                      <Toggle checked={prefs.securityAlerts} onChange={() => flip("securityAlerts")} label="Security alerts" />
                    </Row>
                    <Row title="Push notifications" desc="Reminders and status updates on your device.">
                      <Toggle checked={prefs.push} onChange={() => flip("push")} label="Push notifications" />
                    </Row>
                    <Row title="Offers and news" desc="Product updates and promotions.">
                      <Toggle checked={prefs.offers} onChange={() => flip("offers")} label="Offers and news" />
                    </Row>
                  </Panel>
                )}

                {activeView === "support" && (
                  <Panel title="Help and support" desc="We're here when you need us.">
                    <Row title="Live chat" desc="Talk to support every day, 7am to 10pm.">
                      <button type="button" className={outlineBtn}>Start chat</button>
                    </Row>
                    <Row title="Report a problem" desc="Tell us about a failed payment or an issue with your account.">
                      <button type="button" className={outlineBtn}>Report</button>
                    </Row>
                  </Panel>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile bottom navigation ===== */}
      <nav
        aria-label="Quick mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-[#e8e3dc] bg-white/95 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md min-md:hidden"
      >
        {[
          { to: "/dashboard-v2", icon: FiHome, label: "Home" },
          { to: "/payment/airtime_recharge", icon: FiGrid, label: "VAS" },
          { to: "https://mall.payarena.com", icon: FiShoppingBag, label: "Mall", external: true },
          { to: "/transfers", icon: FiSend, label: "Send" },
        ].map(({ to, icon: Icon, label, external }) => {
          const cls = "flex flex-col items-center gap-1 px-3 py-1 text-[10.5px] font-medium text-[#8a817b] transition-colors hover:text-[#f26a10]";
          return external ? (
            <a key={label} href={to} target="_blank" rel="noopener noreferrer" className={cls}>
              <Icon size={18} />
              <span>{label}</span>
            </a>
          ) : (
            <Link key={label} to={to} className={cls}>
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1 text-[10.5px] font-medium text-[#8a817b] transition-colors hover:text-[#f26a10]"
        >
          <FiMenu size={18} />
          <span>More</span>
        </button>
      </nav>

      {/* ===== Change Password Modal ===== */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`${card} w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-semibold">Change Password</h2>
              <button
                type="button"
                onClick={() => {
                  setPasswordModalOpen(false);
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                aria-label="Close modal"
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2f0ee] text-[#8a817b] hover:bg-[#e9e5e0] ${focus}`}
              >
                <FiX size={16} />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-[12px] font-medium text-[#1a1210] mb-1.5">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  className={`w-full h-10 rounded-lg border border-[#e8e3dc] bg-white px-3.5 text-[13px] outline-none transition-colors focus:border-[#f26a10] focus:ring-2 focus:ring-[#f26a10]/20 placeholder:text-[#d4cfc8]`}
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-[12px] font-medium text-[#1a1210] mb-1.5">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className={`w-full h-10 rounded-lg border border-[#e8e3dc] bg-white px-3.5 text-[13px] outline-none transition-colors focus:border-[#f26a10] focus:ring-2 focus:ring-[#f26a10]/20 placeholder:text-[#d4cfc8]`}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-[12px] font-medium text-[#1a1210] mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className={`w-full h-10 rounded-lg border border-[#e8e3dc] bg-white px-3.5 text-[13px] outline-none transition-colors focus:border-[#f26a10] focus:ring-2 focus:ring-[#f26a10]/20 placeholder:text-[#d4cfc8]`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className={`flex-1 h-10 rounded-lg border border-[#e8e3dc] bg-white px-4 text-[13px] font-semibold text-[#1a1210] transition-colors hover:bg-[#f6f3ee] ${focus}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 h-10 rounded-lg bg-[#f26a10] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#e05e00] ${focus}`}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}