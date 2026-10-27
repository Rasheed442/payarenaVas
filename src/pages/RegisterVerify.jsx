import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiInfo, FiLoader } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import { toast } from "sonner";

const CODE_LENGTH = 6;
const RESEND_DELAY = 10 * 60;

export default function RegisterVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Number(location.state?.expiresIn) || RESEND_DELAY
  );
  const [notice, setNotice] = useState("");
  const [noticeIsError, setNoticeIsError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate("/register/start", { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft === 0) return undefined;
    const timerId = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [secondsLeft]);

  const updateCode = (index, rawValue) => {
    const digits = rawValue.replace(/\D/g, "");
    if (digits.length > 1) {
      const next = [...code];
      const pastedDigits = digits.slice(0, CODE_LENGTH - index);
      pastedDigits.split("").forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      setCode(next);
      setNotice("");
      setNoticeIsError(false);
      inputRefs.current[Math.min(index + pastedDigits.length, CODE_LENGTH - 1)]?.focus();
      return;
    }

    const digit = digits.slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    setNotice("");
    setNoticeIsError(false);
    if (digit && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = [...Array(CODE_LENGTH)].map((_, index) => digits[index] ?? "");
    setCode(next);
    setNotice("");
    setNoticeIsError(false);
    inputRefs.current[Math.min(digits.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    const otpCode = code.join("");
    if (!/^\d{6}$/.test(otpCode) || isVerifying) return;

    setNotice("");
    setIsVerifying(true);
    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim();
      if (!authBaseUrl) throw new Error("Registration is temporarily unavailable. Please try again shortly.");

      const response = await fetch(
        `${authBaseUrl.replace(/\/+$/, "")}/auth/register/email/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, otp_code: otpCode }),
        },
      );
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || result.detail || "That code couldn’t be verified. Check it and try again.");
      if (!result.email_token) throw new Error("The verification service returned an incomplete response. Please try again.");

      toast.success(result.message || "Your email has been verified.");
      navigate("/register/verified", {
        state: {
          email: result.email || email,
          emailToken: result.email_token,
          expiresIn: result.expires_in,
          legacyAccountFound: result.legacy_account_found,
          system: result.system,
          prefill: result.prefill,
        },
      });
    } catch (error) {
      const message = error instanceof TypeError
        ? "We couldn’t connect to Payarena. Check your internet connection and try again."
        : error.message || "That code couldn’t be verified. Check it and try again.";
      setNotice(message);
      setNoticeIsError(true);
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    const biodataToken = location.state?.biodataToken || location.state?.biodata_token;
    if (!biodataToken) {
      const message = "A resend token wasn’t provided by the email service. Please restart registration to request a new code.";
      setNotice(message);
      setNoticeIsError(true);
      toast.error(message);
      return;
    }

    setNotice("");
    setIsResending(true);
    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim();
      if (!authBaseUrl) throw new Error("Registration is temporarily unavailable. Please try again shortly.");

      const response = await fetch(
        `${authBaseUrl.replace(/\/+$/, "")}/auth/register/otp/resend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ biodata_token: biodataToken }),
        },
      );
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || result.detail || "We couldn’t resend the code. Please try again.");

      setCode(Array(CODE_LENGTH).fill(""));
      setSecondsLeft(RESEND_DELAY);
      setNoticeIsError(false);
      const message = result.message || "A new verification code has been sent.";
      setNotice(message);
      toast.success(message);
      inputRefs.current[0]?.focus();
    } catch (error) {
      const message = error instanceof TypeError
        ? "We couldn’t connect to Payarena. Check your internet connection and try again."
        : error.message || "We couldn’t resend the code. Please try again.";
      setNotice(message);
      setNoticeIsError(true);
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  if (!email) return null;

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
     

      <header className="relative flex h-[60px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link
          to="/register/start"
          state={{ email }}
          aria-label="Back to email entry"
          className="absolute left-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]"
        >
          <FiArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <img className="h-[40px] w-[88px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-60px)] justify-center px-4 pb-10 pt-20 mobile-sm:px-5 mobile-sm:pb-12 mobile-sm:pt-[clamp(110px,19vh,172px)]">
        <div
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-10 mobile-sm:h-[66px] mobile-sm:w-[66px] mobile-sm:p-[7px]"
          style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }}
          aria-label="Step 2 of 7"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-xs font-semibold">2/7</span>
        </div>

        <div className="h-fit w-full max-w-[465px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-4 pb-6 pt-7 mobile-sm:rounded-[26px] mobile-sm:px-10 mobile-sm:pb-8 mobile-sm:pt-10">
          <h1 className="text-center font-montserrat text-[22px] font-medium leading-tight mobile-sm:text-[26px]">Verify your email</h1>
          <p className="mt-2 text-center text-[13px] leading-[1.4] text-[#333] mobile-sm:text-[14px]">
            A 6-digit verification code will be sent to:<br />
            <span className="break-all text-[#079fe4]">{email}</span>
          </p>

          <form noValidate onSubmit={verifyCode}>
            <p className="mt-7 text-center text-[13px] text-[#333] mobile-sm:mt-9">Enter the code sent to your email</p>
            <div className="mt-6 flex justify-center gap-1.5 mobile-sm:mt-8 mobile-sm:gap-3" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => { inputRefs.current[index] = element; }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Verification code digit ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(event) => updateCode(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  disabled={isVerifying || isResending}
                  className="h-8 w-8 rounded-[8px] border border-[#d8d8db] bg-transparent text-center font-inter text-[18px] font-semibold outline-none transition focus:border-[#f2632a] focus:ring-1 focus:ring-[#f2632a] mobile-sm:h-[42px] mobile-sm:w-[42px] mobile-sm:rounded-[10px] mobile-sm:text-[22px]"
                />
              ))}
            </div>

            <div className="mx-auto mt-6 flex min-h-[44px] max-w-[320px] items-center justify-center gap-1.5 rounded-md bg-[#edf5ff] px-3 py-2 text-[12px] text-[#159fe0] shadow-[0_2px_5px_rgba(22,55,80,0.15)] mobile-sm:mt-8 mobile-sm:text-[13px]">
              <FiInfo className="h-[15px] w-[15px] shrink-0 fill-[#19a9df] text-white" aria-hidden="true" />
              <span>Code will expire in <strong className="font-medium text-[#ff8a00]">{minutes}:{seconds}</strong></span>
            </div>

            <p className="mt-6 text-center text-[12px] leading-relaxed text-[#555] mobile-sm:mt-7 mobile-sm:text-[13px]">
              Didn’t receive the Code?{" "}
              <button className="inline-flex items-center gap-1 text-[#079fe4] underline underline-offset-2 disabled:cursor-wait disabled:opacity-60" type="button" onClick={handleResend} disabled={isResending || isVerifying}>
                {isResending && <FiLoader className="h-3 w-3 animate-spin" aria-hidden="true" />}
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </p>
            {notice && <p className={`mt-3 rounded-md px-3 py-2 text-center text-[12px] leading-relaxed ${noticeIsError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`} role={noticeIsError ? "alert" : "status"}>{notice}</p>}
            <button
              type="submit"
              onClick={verifyCode}
              disabled={!code.every(Boolean) || isVerifying || isResending}
              aria-busy={isVerifying}
              className={`mt-5 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] font-inter text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${code.every(Boolean) && !isVerifying && !isResending ? "bg-[#EA642F] hover:bg-[#d95422]" : "bg-[#ffcca7]"}`}
            >
              {isVerifying && <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isVerifying ? "Verifying code..." : "Verify Code"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
