import { useEffect } from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";

export default function RegisterVerified() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;
  const registrationCompleted = state?.successType === "registration" && state?.completion;
  const identityVerified = state?.successType === "identity" && state?.identity;

  useEffect(() => {
    if (!email) navigate("/register/start", { replace: true });
  }, [email, navigate]);

  if (!email) return null;

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-[52px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        {registrationCompleted ? (
          <button type="button" onClick={() => navigate("/dashboard")} aria-label="Go to dashboard" className="absolute left-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
            <FiArrowLeft className="h-[18px] w-[18px]" />
          </button>
        ) : (
          <Link to={identityVerified ? "/register/identity" : "/register/verify"} state={state} aria-label={identityVerified ? "Back to identity verification" : "Back to email verification"} className="absolute left-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
            <FiArrowLeft className="h-[18px] w-[18px]" />
          </Link>
        )}
        <img className="h-[40px] w-[88px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="flex min-h-[calc(100svh-52px)] items-start justify-center px-4 pb-10 pt-12 mobile-sm:px-5 mobile-sm:pb-12 mobile-sm:pt-[clamp(72px,12vh,86px)]">
        <div className="w-full max-w-[464px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-5 pb-6 pt-6 text-center mobile-sm:px-8 mobile-sm:pb-8 mobile-sm:pt-8">
          <div className="relative mx-auto mb-8 flex h-[min(68vw,268px)] w-[min(68vw,268px)] items-center justify-center mobile-sm:mb-12 mobile-sm:h-[268px] mobile-sm:w-[268px]">
            <span className="absolute inset-0 rounded-full bg-[#e9fff1]" />
            <span className="absolute inset-[18px] rounded-full bg-[#d1f9dc]" />
            <span className="absolute inset-[34px] flex items-center justify-center rounded-full bg-[#55ad43]">
              <FiCheck className="h-[104px] w-[104px] text-white" strokeWidth={2.5} />
            </span>
            <i className="absolute left-1 top-[18px] h-[11px] w-[11px] rounded-full bg-[#ff7b3b]" />
            <i className="absolute right-[28px] top-0 h-4 w-4 rounded-full bg-[#4e7dc5]" />
            <i className="absolute right-0 top-[72px] h-4 w-4 rounded-full bg-[#55ad43]" />
            <i className="absolute -left-4 top-1/2 h-4 w-4 rounded-full bg-[#e85bb8]" />
            <i className="absolute bottom-0 left-[34px] h-4 w-4 rounded-full bg-[#55ad43]" />
            <i className="absolute bottom-2 right-4 h-[27px] w-[27px] rounded-full bg-[#ff7b3b]" />
          </div>

          <h1 className="font-montserrat text-[18px] font-medium leading-snug mobile-sm:text-[20px]">
            {registrationCompleted ? "Account Created Successfully" : identityVerified ? "Identity Verified Successfully" : "Email Verified Successfully"}
          </h1>
          <p className="mt-2 text-[12px] leading-[1.45] text-[#555] mobile-sm:text-[13px]">
            {registrationCompleted
              ? <>Your Payarena account is ready.<br />You can now continue to your dashboard.</>
              : identityVerified
              ? <>Your identity has been verified.<br />Let’s continue creating your account.</>
              : <>Your email has been verified.<br />Let’s continue creating your account.</>}
          </p>
          <button
            type="button"
            onClick={() => registrationCompleted
              ? navigate("/dashboard")
              : identityVerified
                ? navigate("/register", { state })
                : navigate("/register/details", { state })}
            className="mt-6 h-[44px] w-full max-w-[330px] rounded-[10px] bg-[#EA642F] font-inter text-sm font-medium text-white transition hover:bg-[#d95422] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 mobile-sm:mt-7"
          >
            {registrationCompleted ? "Go to Dashboard" : "Continue"}
          </button>
        </div>
      </section>
    </main>
  );
}
