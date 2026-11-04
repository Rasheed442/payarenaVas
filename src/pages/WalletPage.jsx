import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiCopy,
  FiCreditCard,
  FiDollarSign,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiHeadphones,
  FiLock,
  FiShare2,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import payarenaLogo from "../assets/images/logo.svg";

function getUserDetails() {
  try {
    const stored = localStorage.getItem("userDetails");
    const user = stored ? JSON.parse(stored) : {};
    return user && typeof user === "object" ? user : {};
  } catch {
    return {};
  }
}

export default function WalletPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useMemo(() => getUserDetails(), []);

  const returnPath =
    location.state?.returnTo ||
    sessionStorage.getItem("returnTo") ||
    "/dashboard-v2";

  // Step flow: "secure" | "details" | "about" | "fund" | "confirm" | "success"
  const [step, setStep] = useState("secure");
  const [isWalletSecured, setIsWalletSecured] = useState(false);

  // Form states for "Secure your Wallet"
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");

  // Funding Flow States
  const [fundAmount, setFundAmount] = useState("25000");
  const [showPinModal, setShowPinModal] = useState(false);
  const [txnPin, setTxnPin] = useState(["", "", "", ""]);
  const pinInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [referenceId, setReferenceId] = useState("PAY250897059784");
  const [txnDate, setTxnDate] = useState("22nd September 2026, 09:41 AM");

  // User details for "Wallet Details"
  const firstName = user.FirstName?.trim()?.split(/\s+/)[0] || "David";
  const lastName = user.LastName?.trim()?.split(/\s+/)[0] || "Obalola";
  const walletName = `${firstName} ${lastName}`.trim() || "David Obalola";
  const walletNumber =
    user.PhoneNumber || user.WalletNumber || user.AccountNumber || "1234567890";
  const bankName = "Hope Bank";

  // Validation rules for "Secure your Wallet" PIN
  const isLengthValid = pin.length === 6;
  const isNumbersOnly = pin.length > 0 && /^\d+$/.test(pin);
  const doPinsMatch = pin.length === 6 && confirmPin.length === 6 && pin === confirmPin;
  const isFormValid = isLengthValid && isNumbersOnly && doPinsMatch;

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(val);
    setErrorMessage("");
  };

  const handleConfirmPinChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setConfirmPin(val);
    setErrorMessage("");
  };

  const handleSecureWallet = (e) => {
    e.preventDefault();
    if (!isLengthValid) {
      setErrorMessage("PIN must be a 6-digit number.");
      return;
    }
    if (!isNumbersOnly) {
      setErrorMessage("PIN must contain numbers only.");
      return;
    }
    if (pin !== confirmPin) {
      setErrorMessage("PINs do not match. Please re-enter.");
      return;
    }

    try {
      localStorage.setItem("payarena_wallet_pin", pin);
      localStorage.setItem("payarena_wallet_active", "true");
    } catch (err) {
      console.error(err);
    }

    setIsWalletSecured(true);
    setStep("details");
  };

  const handleCopy = (text, label) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${label} copied!`);
    setTimeout(() => setCopyFeedback(""), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Payarena Wallet",
      text: "Pay bills, transfer funds, and shop effortlessly with Payarena Wallet!",
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Ignored
      }
    } else {
      handleCopy(window.location.origin, "App link");
    }
  };

  const handleReturn = () => {
    sessionStorage.removeItem("fromDashboard");
    sessionStorage.removeItem("returnTo");
    navigate(returnPath);
  };

  // Format funding amount with commas
  const formattedAmount = useMemo(() => {
    const num = parseInt(fundAmount.replace(/\D/g, "") || "0", 10);
    return num.toLocaleString();
  }, [fundAmount]);

  // Txn PIN input handler (4-box OTP style)
  const handleTxnPinChange = (index, value) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    const newPin = [...txnPin];
    newPin[index] = clean;
    setTxnPin(newPin);

    // Auto focus next box
    if (clean && index < 3) {
      pinInputRefs[index + 1].current?.focus();
    }

    // If all 4 digits entered, complete transaction automatically
    if (clean && index === 3 && newPin.every((d) => d !== "")) {
      setTimeout(() => {
        // Generate ref and timestamp
        const randomRef = "PAY" + Math.floor(100000000000 + Math.random() * 900000000000);
        setReferenceId(randomRef);
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        setTxnDate(`${dateStr}, ${timeStr}`);

        setShowPinModal(false);
        setTxnPin(["", "", "", ""]);
        setStep("success");
      }, 400);
    }
  };

  const handleTxnPinKeyDown = (index, e) => {
    if (e.key === "Backspace" && !txnPin[index] && index > 0) {
      pinInputRefs[index - 1].current?.focus();
    }
  };

  useEffect(() => {
    if (showPinModal) {
      setTimeout(() => pinInputRefs[0].current?.focus(), 150);
    }
  }, [showPinModal]);

  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-[#1a1210] flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#e5e7eb] bg-white/95 px-4 sm:px-8 backdrop-blur-md">
        <Link
          to={returnPath}
          aria-label="Payarena home"
          className="flex items-center gap-2"
        >
          <img
            src={payarenaLogo}
            alt="Payarena"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* View Switcher Tabs - Wallet Details is hidden until PIN validation is passed */}
        <div className="flex items-center gap-1 rounded-xl bg-[#f1f5f9] p-1 text-[12px] font-medium">
          <button
            type="button"
            onClick={() => setStep("secure")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              step === "secure"
                ? "bg-white text-[#f26a10] shadow-sm font-semibold"
                : "text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            <FiLock size={13} />
            <span>Secure Wallet</span>
          </button>
          {isWalletSecured && (
            <button
              type="button"
              onClick={() => setStep("details")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all animate-fade-in ${
                step === "details" || step === "about" || step === "fund" || step === "confirm" || step === "success"
                  ? "bg-white text-[#f26a10] shadow-sm font-semibold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <FiCreditCard size={13} />
              <span>Wallet Details</span>
            </button>
          )}
        </div>

        {/* Return Button */}
        <button
          type="button"
          onClick={handleReturn}
          className="flex items-center gap-2 rounded-xl bg-[#f26a10] px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-[#e05a06] transition-colors"
        >
          <FiArrowLeft size={16} />
          <span className="hidden sm:inline">Return to Dashboard</span>
          <span className="sm:hidden">Back</span>
        </button>
      </header>

      {/* Copy Notification Toast */}
      {copyFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#1e293b] px-4 py-2 text-[12.5px] font-medium text-white shadow-lg flex items-center gap-2 animate-fade-in">
          <FiCheck size={14} className="text-[#22c55e]" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        {/* ============================================================== */}
        {/* STEP 1: SECURE YOUR WALLET */}
        {/* ============================================================== */}
        {step === "secure" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-center transition-all">
            <h1 className="text-[26px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
              Secure your Wallet
            </h1>
            <p className="mt-2 text-[13.5px] text-[#4b5563]">
              Create a 6 - digit PIN for your Payarena wallet.
            </p>

            {/* Blue Info Notice */}
            {/* <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f0f8ff] p-4 text-left">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0284c7] text-white text-[10px] font-bold">
                i
              </div>
              <p className="text-[12.5px] leading-relaxed text-[#0284c7] font-medium">
                This email is registered on Payarena Mall platform. Please enter your password to continue
              </p>
            </div> */}

            {/* PIN Inputs Form */}
            <form onSubmit={handleSecureWallet} className="mt-6 text-left">
              {/* Enter PIN */}
              <div>
                <label className="block text-[13px] font-semibold text-[#374151] mb-2">
                  Enter PIN
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPin ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={handlePinChange}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-[#d1d5db] px-4 py-3.5 text-[15px] tracking-[0.25em] text-[#111827] placeholder:text-[#9ca3af] placeholder:tracking-[0.2em] focus:border-[#f26a10] focus:outline-none focus:ring-2 focus:ring-[#f26a10]/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 text-[#9ca3af] hover:text-[#4b5563] transition-colors p-1"
                    aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm PIN */}
              <div className="mt-4">
                <label className="block text-[13px] font-semibold text-[#374151] mb-2">
                  Confirm PIN
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPin ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={6}
                    value={confirmPin}
                    onChange={handleConfirmPinChange}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-[#d1d5db] px-4 py-3.5 text-[15px] tracking-[0.25em] text-[#111827] placeholder:text-[#9ca3af] placeholder:tracking-[0.2em] focus:border-[#f26a10] focus:outline-none focus:ring-2 focus:ring-[#f26a10]/20 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="absolute right-4 text-[#9ca3af] hover:text-[#4b5563] transition-colors p-1"
                    aria-label={showConfirmPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showConfirmPin ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="mt-2 text-[12px] font-medium text-[#dc2626]">
                  {errorMessage}
                </p>
              )}

              {/* Mismatch Warning */}
              {confirmPin.length === 6 && pin.length === 6 && pin !== confirmPin && (
                <p className="mt-2 text-[12px] font-medium text-[#dc2626]">
                  PINs do not match
                </p>
              )}

              {/* Validation Requirements Box - only checked when conditions are met */}
              <div className="mt-5 rounded-2xl bg-[#f0f8ff] p-4 text-left">
                <p className="text-[13px] font-bold text-[#0ea5e9]">PIN must be:</p>
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center gap-2.5 text-[13px] text-[#4b5563]">
                    {isLengthValid ? (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white text-[10px] transition-all">
                        <FiCheck strokeWidth={3} size={10} />
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#9ca3af] bg-transparent transition-all" />
                    )}
                    <span>Must be a 6 - digit number</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[13px] text-[#4b5563]">
                    {isNumbersOnly ? (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white text-[10px] transition-all">
                        <FiCheck strokeWidth={3} size={10} />
                      </span>
                    ) : (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#9ca3af] bg-transparent transition-all" />
                    )}
                    <span>Numbers only</span>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-white transition-all ${
                  isFormValid
                    ? "bg-[#f26a10] hover:bg-[#e05a06] shadow-md shadow-[#f26a10]/20 cursor-pointer"
                    : "bg-[#fcd3b6] cursor-not-allowed"
                }`}
              >
                <span>Continue</span>
                <FiArrowRight size={18} />
              </button>
            </form>

            {/* Footer Notice */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-[#0ea5e9]">
              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#0ea5e9] text-[9px] font-bold leading-none">
                i
              </div>
              <span>This wwill only take a few seconds</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: WALLET DETAILS */}
        {/* ============================================================== */}
        {step === "details" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-6 sm:p-9 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
            {/* Account Details Box */}
            <div className="rounded-2xl bg-[#f0f8ff] p-6 text-left">
              {/* Wallet Name */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#4b5563]">
                    Your Payarena Wallet Name
                  </p>
                  <p className="mt-1 text-[16px] font-bold text-[#111827]">
                    {walletName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(walletName, "Wallet name")}
                  className="text-[#4b5563] hover:text-[#111827] p-1.5 rounded-lg hover:bg-black/5 transition-colors"
                  title="Copy wallet name"
                  aria-label="Copy wallet name"
                >
                  <FiCopy size={16} />
                </button>
              </div>

              {/* Wallet Number */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#4b5563]">
                    Your Payarena Wallet Number
                  </p>
                  <p className="mt-1 text-[16px] font-bold tracking-wide text-[#111827]">
                    {walletNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(walletNumber, "Wallet number")}
                  className="text-[#4b5563] hover:text-[#111827] p-1.5 rounded-lg hover:bg-black/5 transition-colors"
                  title="Copy wallet number"
                  aria-label="Copy wallet number"
                >
                  <FiCopy size={16} />
                </button>
              </div>

              {/* Bank Name */}
              <div className="mt-5">
                <p className="text-[12px] font-medium text-[#4b5563]">Bank Name</p>
                <p className="mt-1 text-[16px] font-bold text-[#111827]">
                  {bankName}
                </p>
              </div>
            </div>

            {/* Instruction Notice */}
            <div className="mt-5 flex items-center gap-2 text-[12px] text-[#4b5563]">
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0ea5e9] text-white text-[10px] font-bold">
                i
              </div>
              <p>
                Send money to this wallet and choose{" "}
                <span className="font-semibold text-[#111827]">Hope PSB</span> as bank
              </p>
            </div>

            {/* Action 1: Fund your wallet */}
            <button
              type="button"
              onClick={() => setStep("fund")}
              className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ea580c] py-3.5 text-[15px] font-semibold text-white shadow-md shadow-[#ea580c]/20 hover:bg-[#c2410c] transition-all cursor-pointer"
            >
              <span>Fund your wallet</span>
              <FiArrowRight size={18} />
            </button>

            {/* Action 2: About payarena wallet */}
            <button
              type="button"
              onClick={() => setStep("about")}
              className="mt-3 flex h-13 w-full items-center justify-center rounded-2xl border border-[#38bdf8] py-3.5 text-[15px] font-semibold text-[#0284c7] hover:bg-[#f0f9ff] transition-colors cursor-pointer"
            >
              About payarena wallet
            </button>

            {/* Action 3: Share App pill */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-6 py-2.5 text-[13px] font-semibold text-[#374151] shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
              >
                <FiShare2 size={15} />
                <span>Share App</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP A: ABOUT PAYARENA WALLET (IMAGE 1) */}
        {/* ============================================================== */}
        {step === "about" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-left transition-all relative">
            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep("details")}
              className="mb-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors"
            >
              <FiArrowLeft size={14} /> Back to wallet
            </button>

            {/* Orange Wallet Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-[#e8590c] mx-auto flex items-center justify-center text-white shadow-md">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>

            {/* Section 1 */}
            <h2 className="text-[17px] font-bold text-[#111827] mt-8">
              How to fund Payarena wallet
            </h2>

            <div className="mt-3">
              <p className="text-[13px] font-semibold text-[#111827]">Option 1</p>
              <p className="text-[13px] text-[#4b5563] mt-1 leading-relaxed">
                Transfer funds from any bank into your Payarena wallet number and select{" "}
                <span className="font-semibold text-[#111827]">Hope PSB</span> as the bank name
              </p>
            </div>

            <div className="mt-4">
              <p className="text-[13px] font-semibold text-[#111827]">Option 2</p>
              <p className="text-[13px] text-[#4b5563] mt-1 leading-relaxed">
                Under profile setting, click <span className="font-semibold text-[#111827]">Manage Accounts</span> menu, select the bank that has the account you want to link and complete the linking process as determined by your bank.
              </p>
            </div>

            {/* Section 2 */}
            <h2 className="text-[17px] font-bold text-[#111827] mt-7">
              How to use Payarena wallet
            </h2>
            <p className="text-[13px] text-[#4b5563] mt-2 leading-relaxed">
              Use your wallet as the fastest means of paying for items purchased at checkout.
            </p>

            {/* Need Help link */}
            <div className="mt-9 flex justify-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Support hotline: 0700-PAYARENA (0700-72927362) | Email: support@payarena.com");
                }}
                className="flex items-center gap-2 text-[13px] font-medium text-[#0284c7] hover:underline"
              >
                <FiHeadphones size={15} />
                <span>Need Help? Contact Support</span>
              </a>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP B: FUND YOUR WALLET INPUT (IMAGE 2) */}
        {/* ============================================================== */}
        {step === "fund" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-center transition-all relative">
            {/* Back button */}
            <div className="text-left mb-2">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                <FiArrowLeft size={14} /> Back
              </button>
            </div>

            {/* Orange Wallet Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-[#e8590c] mx-auto flex items-center justify-center text-white shadow-md">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </div>

            <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#111827] mt-6 tracking-tight leading-snug">
              Fund your wallet with payment card & more
            </h2>

            {/* Amount input */}
            <div className="mt-7">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-[15px] font-semibold text-[#9ca3af]">₦</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formattedAmount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setFundAmount(raw);
                  }}
                  placeholder="Enter amount"
                  className="w-full rounded-2xl border border-[#e5e7eb] pl-9 pr-4 py-3.5 text-[15px] font-semibold text-[#111827] placeholder:text-[#9ca3af] placeholder:font-normal focus:border-[#f26a10] focus:outline-none focus:ring-2 focus:ring-[#f26a10]/20 transition-all text-center"
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => {
                if (parseInt(fundAmount, 10) > 0) {
                  setStep("confirm");
                }
              }}
              disabled={!fundAmount || parseInt(fundAmount, 10) <= 0}
              className={`mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-white transition-all ${
                fundAmount && parseInt(fundAmount, 10) > 0
                  ? "bg-[#ea580c] hover:bg-[#c2410c] shadow-md shadow-[#ea580c]/20 cursor-pointer"
                  : "bg-[#fcd3b6] cursor-not-allowed"
              }`}
            >
              <span>Continue</span>
              <FiArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP C: CONFIRM DETAILS (IMAGE 3) */}
        {/* ============================================================== */}
        {step === "confirm" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-center transition-all relative">
            {/* Back button */}
            <div className="text-left mb-2">
              <button
                type="button"
                onClick={() => setStep("fund")}
                className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                <FiArrowLeft size={14} /> Back
              </button>
            </div>

            {/* Blue Lock Badge with light blue outer ring */}
            <div className="w-20 h-20 rounded-full bg-[#0284c7] ring-8 ring-[#e0f2fe] mx-auto flex items-center justify-center text-white shadow-md">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>

            <h2 className="text-[22px] font-bold text-[#111827] mt-6 tracking-tight">
              Confirm Details
            </h2>
            <p className="text-[13px] text-[#6b7280] mt-1.5">
              Review the details below before proceeding to pay
            </p>

            {/* Transaction Details Box */}
            <div className="mt-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] p-5 text-left space-y-3.5">
              <p className="text-[13px] font-bold text-[#374151]">Transaction Details</p>

              {/* Merchant */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiShoppingBag size={14} className="text-[#0284c7]" />
                  Merchant
                </span>
                <span className="font-semibold text-[#111827]">Payarena Mall</span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiDollarSign size={14} className="text-[#ea580c]" />
                  Amount
                </span>
                <span className="font-extrabold text-[#111827]">₦{formattedAmount}.00</span>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiCreditCard size={14} className="text-[#0284c7]" />
                  Payment Method
                </span>
                <span className="font-semibold text-[#111827]">Payarena Wallet</span>
              </div>

              {/* Wallet Owner */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiUser size={14} className="text-[#0284c7]" />
                  Wallet Owner
                </span>
                <span className="font-semibold text-[#111827]">{walletName}</span>
              </div>
            </div>

            {/* Proceed to Pay Button */}
            <button
              type="button"
              onClick={() => setShowPinModal(true)}
              className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ea580c] py-3.5 text-[15px] font-semibold text-white shadow-md shadow-[#ea580c]/20 hover:bg-[#c2410c] transition-all cursor-pointer"
            >
              <span>Proceed to Pay</span>
              <FiArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP D: ENTER TRANSACTION PIN MODAL (IMAGE 4) */}
        {/* ============================================================== */}
        {showPinModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-[340px] rounded-3xl bg-white p-6 sm:p-7 shadow-2xl relative text-center">
              {/* Close Button top-left */}
              <button
                type="button"
                onClick={() => {
                  setShowPinModal(false);
                  setTxnPin(["", "", "", ""]);
                }}
                className="absolute top-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[#9ca3af] hover:text-[#4b5563] transition-colors"
                aria-label="Close"
              >
                <FiX size={15} />
              </button>

              <h3 className="text-[16px] font-bold text-[#111827] mt-4">
                Enter Transaction PIN
              </h3>

              {/* 4 OTP Digit Boxes */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    ref={pinInputRefs[idx]}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={txnPin[idx]}
                    onChange={(e) => handleTxnPinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleTxnPinKeyDown(idx, e)}
                    className={`h-12 w-12 rounded-xl text-center text-[18px] font-bold text-[#111827] outline-none transition-all ${
                      txnPin[idx]
                        ? "border-2 border-[#ea580c] bg-white shadow-sm"
                        : "border border-gray-300 bg-white focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/20"
                    }`}
                  />
                ))}
              </div>

              {/* Forgot link */}
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("To reset your transaction PIN, please visit Security Settings or contact support.");
                }}
                className="mt-6 block text-[13px] font-semibold text-[#0284c7] hover:underline"
              >
                Forgot Transaction PIN?
              </a>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP E: TRANSACTION APPROVED (IMAGE 5) */}
        {/* ============================================================== */}
        {step === "success" && (
          <div className="w-full max-w-[460px] rounded-[32px] border border-[#e5e7eb] bg-white p-7 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-center transition-all">
            {/* Green Badge with Festive Confetti Dots */}
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              {/* Confetti dots */}
              <span className="absolute -top-1 left-4 h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="absolute top-1 right-3 h-2 w-2 rounded-full bg-[#0ea5e9]" />
              <span className="absolute bottom-2 -left-1 h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="absolute -bottom-1 right-5 h-2.5 w-2.5 rounded-full bg-[#ea580c]" />
              <span className="absolute top-8 -left-3 h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span className="absolute top-10 -right-2 h-2 w-2 rounded-full bg-[#8b5cf6]" />

              {/* Main Green Check Badge */}
              <div className="w-18 h-18 rounded-full bg-[#22c55e] flex items-center justify-center text-white shadow-lg shadow-[#22c55e]/30">
                <FiCheck size={34} strokeWidth={3.5} />
              </div>
            </div>

            <h2 className="text-[22px] font-bold text-[#111827] mt-5 tracking-tight">
              Transaction Approved
            </h2>
            <p className="text-[13px] text-[#6b7280] mt-1.5">
              Your payment was successful
            </p>

            {/* Approved Details Box */}
            <div className="mt-6 rounded-2xl bg-[#f8fafc] border border-[#f1f5f9] p-5 text-left space-y-3.5">
              <p className="text-[13px] font-bold text-[#374151]">Transaction Details</p>

              {/* Merchant */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiShoppingBag size={14} className="text-[#0284c7]" />
                  Merchant
                </span>
                <span className="font-semibold text-[#111827]">Payarena Mall</span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiDollarSign size={14} className="text-[#ea580c]" />
                  Amount
                </span>
                <span className="font-extrabold text-[#111827]">₦{formattedAmount}.00</span>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiCreditCard size={14} className="text-[#0284c7]" />
                  Payment Method
                </span>
                <span className="font-semibold text-[#111827]">Payarena Wallet</span>
              </div>

              {/* Wallet Owner */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiUser size={14} className="text-[#0284c7]" />
                  Wallet Owner
                </span>
                <span className="font-semibold text-[#111827]">{walletName}</span>
              </div>

              {/* Date & Time */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiCalendar size={14} className="text-[#10b981]" />
                  Date & Time
                </span>
                <span className="font-medium text-[#111827]">{txnDate}</span>
              </div>

              {/* Reference ID */}
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-[#64748b]">
                  <FiFileText size={14} className="text-[#64748b]" />
                  Reference ID
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#111827] flex items-center gap-1.5">
                  {referenceId}
                  <button
                    type="button"
                    onClick={() => handleCopy(referenceId, "Reference ID")}
                    className="text-[#64748b] hover:text-[#111827]"
                  >
                    <FiCopy size={13} />
                  </button>
                </span>
              </div>
            </div>

            {/* Action 1: View Receipt */}
            <button
              type="button"
              onClick={() => {
                handleCopy(`Receipt: Payarena Mall | ₦${formattedAmount}.00 | Ref: ${referenceId}`, "Receipt details");
              }}
              className="mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#ea580c] py-3.5 text-[15px] font-semibold text-white shadow-md shadow-[#ea580c]/20 hover:bg-[#c2410c] transition-all cursor-pointer"
            >
              <span>View Receipt</span>
              <FiArrowRight size={18} />
            </button>

            {/* Action 2: Done */}
            <button
              type="button"
              onClick={() => setStep("details")}
              className="mt-3 flex h-13 w-full items-center justify-center rounded-2xl border border-[#38bdf8] py-3.5 text-[15px] font-semibold text-[#0284c7] hover:bg-[#f0f9ff] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
