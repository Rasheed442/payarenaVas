import { useState } from "react";
import { FiArrowLeft, FiInfo, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import { LuMoveRight } from "react-icons/lu";
import { toast } from "sonner";

export default function RegisterStart() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const continueToVerification = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (isSubmitting) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail)) {
      const message = "Enter a valid email address.";
      setEmailError(message);
      toast.error(message);
      return;
    }

    setEmailError("");
    setIsSubmitting(true);
    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim();
      if (!authBaseUrl) {
        throw new Error("Registration is temporarily unavailable. Please try again shortly.");
      }

      const response = await fetch(
        `${authBaseUrl.replace(/\/+$/, "")}/auth/register/email/initiate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: normalizedEmail }),
        },
      );
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "We couldn’t send a verification code. Please try again.");
      }

      toast.success(result.message || "Verification code sent to your email address.");
      navigate("/register/verify", {
        state: {
          email: result.email || normalizedEmail,
          expiresIn: result.expires_in,
          biodataToken: result.biodata_token,
        },
      });
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "We couldn’t connect to Payarena. Check your internet connection and try again."
          : error.message || "We couldn’t send a verification code. Please try again.";
      setEmailError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-12 items-center justify-center border-b border-[#e1e1e3] bg-[#f4f4f6]">
        <Link
          to="/desktop"
          aria-label="Back to Payarena landing page"
          className="absolute left-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] transition hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]"
        >
          <FiArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <img className="h-[36px] w-[74px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-48px)] justify-center px-4 pb-10 pt-20 mobile-sm:px-5 mobile-sm:pb-12 mobile-sm:pt-[clamp(72px,15vh,106px)]">
        <div
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-8 mobile-sm:h-[54px] mobile-sm:w-[54px] mobile-sm:p-[6px]"
          style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }}
          aria-label="Step 1 of 7"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[11px] font-semibold">1/7</span>
        </div>

        <div className="h-fit w-full max-w-[424px] rounded-[22px] border border-[#ebebec] bg-[#f5f5f7] px-5 pb-6 pt-7 shadow-[0_1px_2px_rgba(0,0,0,0.02)] mobile-sm:px-8 mobile-sm:pb-8 mobile-sm:pt-8">
          <h1 className="text-center font-montserrat text-[22px] font-medium leading-tight">Let’s get started</h1>
          <p className="mt-1 text-center text-[13px] leading-[1.35] text-[#333]">
            Enter your email address to create<br />your <span className="text-[#13a8e6]">Pay</span><span className="text-[#ef672f]">arena</span> account.
          </p>

          <div className="mx-auto mt-6 flex min-h-[68px] max-w-[320px] gap-2.5 rounded-lg bg-[#edf5ff] px-4 py-3 text-[11px] leading-[1.45] text-[#139be0] shadow-[0_2px_5px_rgba(22,55,80,0.15)]">
            <FiInfo className="mt-px h-[16px] w-[16px] shrink-0 fill-[#19a9df] text-white" aria-hidden="true" />
            <span>We’ll check if you already have an account with us and send a verification code to validate the email address.</span>
          </div>

          <form className="mt-7" noValidate onSubmit={continueToVerification}>
            <label className="mb-1 block text-[11px] font-medium text-[#303036]" htmlFor="registration-email">Email</label>
            <input
              id="registration-email"
              name="registration-email"
              type="text"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "registration-email-error" : undefined}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              placeholder="exampleemail@email.com"
              className={`h-[42px] w-full rounded-[8px] border bg-white px-3 text-[13px] text-[#333] outline-none transition placeholder:text-[#b8b8bc] focus:ring-2 focus:ring-[#16a6ed]/15 ${emailError ? "border-red-400 focus:border-red-500" : "border-[#d9d9dc] focus:border-[#16a6ed]"}`}
            />
            {emailError && <p id="registration-email-error" className="mt-2 rounded-md bg-red-50 px-3 py-2 text-[12px] leading-relaxed text-red-700" role="alert">{emailError}</p>}
            <button
              type="submit"
              onClick={continueToVerification}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={`relative mt-6 flex h-[48px] w-full items-center justify-center gap-2 rounded-[10px] font-inter text-sm font-medium text-white shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${isSubmitting ? "cursor-wait bg-[#d95422]" : "bg-[#EA642F] hover:bg-[#d95422]"}`}
            >
              {isSubmitting ? (
                <><FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending verification code...</>
              ) : (
                <>Create Account <LuMoveRight className="absolute right-6 h-[18px] w-[18px]" aria-hidden="true" /></>
              )}
            </button>
            <p className="sr-only" role="status" aria-live="polite">
              {isSubmitting ? "Sending verification code to your email." : ""}
            </p>
          </form>
          <p className="mt-3 text-[11px] font-light leading-[1.5] text-[#2e2e32]">
            By creating an account, you agree to the <a className="underline underline-offset-2" href="https://payarena.com">Terms of use</a> and <Link className="underline underline-offset-2" to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
