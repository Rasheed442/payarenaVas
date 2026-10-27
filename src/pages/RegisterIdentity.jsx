import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiInfo, FiLoader, FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import { toast } from "sonner";

export default function RegisterIdentity() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [idType, setIdType] = useState(state?.identity?.type || "NIN");
  const [idNumber, setIdNumber] = useState(state?.identity?.number || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifiedBiodata, setVerifiedBiodata] = useState(state?.verifiedBiodata || null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const isValid = /^\d{11}$/.test(idNumber);
  const emailToken = state?.emailToken || state?.email_token;

  useEffect(() => {
    if (!state?.email || !emailToken || !state?.details || !state?.address) {
      navigate("/register/start", { replace: true });
    }
  }, [state?.email, emailToken, state?.details, state?.address, navigate]);

  if (!state?.email || !emailToken || !state?.details || !state?.address) return null;

  const submitIdentity = async (event) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;
    if (verifiedBiodata) {
      setShowOtpModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim();
      if (!authBaseUrl) throw new Error("Registration is temporarily unavailable. Please try again shortly.");

      const details = state.details;
      const address = state.address;
      let biodata = verifiedBiodata;
      if (!biodata) {
        const payload = {
          email_token: emailToken,
          first_name: details.firstName,
          last_name: details.lastName,
          middle_name: details.middleName || "",
          phone_number: details.phoneNumber,
          gender: String(details.gender || "").toLowerCase(),
          dob: details.dateOfBirth,
          street_address: address.streetAddress,
          city: address.city,
          state: address.state,
          id_type: idType.toLowerCase(),
          id_number: idNumber,
        };
        const biodataResponse = await fetch(
          `${authBaseUrl.replace(/\/+$/, "")}/auth/register/biodata-verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
          },
        );
        biodata = await biodataResponse.json().catch(() => ({}));
        if (!biodataResponse.ok) throw new Error(biodata.message || biodata.detail || "We couldn’t verify your details. Please check them and try again.");
        if (biodata.kyc_verified !== true) throw new Error(biodata.message || "Your identity could not be verified. Please check your details and try again.");
        setVerifiedBiodata(biodata);
      }
      toast.success(biodata.message || "Your details were verified. Enter the six-digit code sent to your email.");
      setOtpCode("");
      setShowOtpModal(true);
    } catch (error) {
      const message = error instanceof TypeError
        ? "We couldn’t connect to Payarena. Check your internet connection and try again."
        : error.message || "We couldn’t verify your details. Please check them and try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otpCode) || !verifiedBiodata || isSubmitting) return;
    toast.success("Verification code saved. Create a password to finish registration.");
    navigate("/register/password", {
      state: {
        ...state,
        identity: { type: idType, number: idNumber },
        biodataOtp: otpCode,
        verifiedBiodata,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-[40px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link to="/register/delivery" state={state} aria-label="Back to delivery address" className="absolute left-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
          <FiArrowLeft className="h-[16px] w-[16px]" />
        </Link>
        <img className="h-[34px] w-[78px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-40px)] justify-center px-4 pb-8 pt-20 mobile-sm:px-5 mobile-sm:pb-10 mobile-sm:pt-[clamp(54px,10vh,94px)]">
        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-4 mobile-sm:h-[52px] mobile-sm:w-[52px]" style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }} aria-label="Step 6 of 7">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[10px] font-semibold">6/7</span>
        </div>

        <div className="h-fit w-full max-w-[424px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-4 pb-6 pt-6 mobile-sm:px-8 mobile-sm:pb-8 mobile-sm:pt-8">
          <h1 className="text-center font-montserrat text-[20px] font-medium mobile-sm:text-[22px]">Identity Verification</h1>
          <p className="mt-1 text-center text-[12px] leading-[1.4]">Please verify your identity to<br />secure your account.</p>

          <form className="mt-5 mobile-sm:mt-7" noValidate onSubmit={submitIdentity}>
            <fieldset>
              <legend className="mb-2 text-[11px] font-medium text-[#52525a]">Select ID Type</legend>
              <div className="space-y-2">
                {["NIN", "BVN"].map((type) => (
                  <label key={type} className="flex h-[42px] cursor-pointer items-center gap-2.5 rounded-[8px] border border-[#e0e0e2] bg-white px-3 text-[13px] text-[#333]">
                    <input className="h-[15px] w-[15px] " type="radio" name="identity-type" value={type} checked={idType === type} onChange={() => setIdType(type)} />
                    {type}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-4 block text-[11px] font-medium text-[#52525a]" htmlFor="identity-number">
              Enter {idType} Number
              <span className="relative mt-1 block">
                <input
                  id="identity-number"
                  className="h-[42px] w-full rounded-[8px] border border-[#dedee1] bg-white px-3 pr-10 text-[13px] font-normal outline-none placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15"
                  value={idNumber}
                  onChange={(event) => setIdNumber(event.target.value.replace(/\D/g, "").slice(0, 11))}
                  disabled={isSubmitting}
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={11}
                  pattern="[0-9]{11}"
                  placeholder={`Enter 11 - digit ${idType}`}
                  required
                />
                <FiUser className="pointer-events-none absolute right-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#9a9aa1]" aria-hidden="true" />
              </span>
              {idNumber.length > 0 && !isValid && <span className="mt-1.5 block text-xs font-normal text-red-600" role="alert">Enter all 11 digits.</span>}
            </label>

            <div className="mt-6 flex gap-2.5 rounded-lg bg-[#edf5ff] px-4 py-3 text-[11px] leading-[1.5] text-[#555b65] shadow-[0_2px_5px_rgba(22,55,80,0.13)]">
              <FiInfo className="mt-px h-[16px] w-[16px] shrink-0 text-[#149fe0]" aria-hidden="true" />
              <span><strong className="font-medium text-[#159fe0]">Your information is secure</strong><br />We’ll verify your identity details before continuing.</span>
            </div>

            <button type="submit" disabled={!isValid || isSubmitting} aria-busy={isSubmitting} className={`relative mt-6 flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] font-inter text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${isValid && !isSubmitting ? "bg-[#EA642F] hover:bg-[#d95422]" : "cursor-not-allowed bg-[#ffcca7] opacity-75"}`}>
              {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Verifying details..." : verifiedBiodata ? "Enter Email Code" : "Verify Identity"}
              {!isSubmitting && <FiArrowRight className="absolute right-6 h-[18px] w-[18px]" />}
            </button>
          </form>
        </div>
      </section>

      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !isSubmitting) setShowOtpModal(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="email-otp-title" className="w-full max-w-[440px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-5 py-7 shadow-2xl sm:px-9 sm:py-9">
            <h2 id="email-otp-title" className="text-center font-montserrat text-[22px] font-medium sm:text-[24px]">Verify your email</h2>
            <p className="mx-auto mt-2 max-w-[340px] text-center text-[14px] leading-relaxed text-[#555b65]">
              Enter the six-digit code sent to <span className="font-medium text-[#159fe0]">{state.email}</span> to continue to password setup.
            </p>
            <form className="mt-7" onSubmit={submitOtp}>
              <label htmlFor="registration-email-otp" className="block text-[13px] font-medium text-[#52525a]">Email verification code</label>
              <input
                id="registration-email-otp"
                className="mt-2 h-[56px] w-full rounded-[10px] border border-[#d8d8db] bg-white px-4 text-center font-inter text-[22px] tracking-[0.55em] outline-none placeholder:tracking-normal placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-describedby="registration-otp-help"
                value={otpCode}
                onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
                maxLength={6}
                required
                autoFocus
              />
              <p id="registration-otp-help" className="mt-2 text-[12px] text-[#777]">The code contains 6 digits.</p>
              <button type="submit" disabled={!/^\d{6}$/.test(otpCode) || isSubmitting} aria-busy={isSubmitting} className={`relative mt-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-[10px] font-inter text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${/^\d{6}$/.test(otpCode) && !isSubmitting ? "bg-[#EA642F] hover:bg-[#d95422]" : "cursor-not-allowed bg-[#ffcca7] opacity-75"}`}>
                {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {isSubmitting ? "Completing registration..." : "Verify and Create Account"}
                {!isSubmitting && <FiArrowRight className="absolute right-5 h-[18px] w-[18px]" />}
              </button>
              <button type="button" onClick={() => setShowOtpModal(false)} disabled={isSubmitting} className="mt-3 h-[42px] w-full rounded-[10px] font-inter text-sm font-medium text-[#555] transition hover:bg-[#e9e9eb] disabled:opacity-50">
                Cancel
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
