import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";

const rules = [
  { label: "Minimum of 14 characters", test: (value) => value.length >= 14 },
  { label: "Uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "Lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "At least one number", test: (value) => /\d/.test(value) },
  { label: "At least one special character", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export default function RegisterPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const validPassword = rules.every((rule) => rule.test(password));
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canContinue = validPassword && passwordsMatch;

  useEffect(() => {
    if (!state?.email || !state?.details || !state?.address) {
      navigate("/register/start", { replace: true });
    }
  }, [state?.email, state?.details, state?.address, navigate]);

  if (!state?.email || !state?.details || !state?.address) return null;

  const continueToIdentity = (event) => {
    event.preventDefault();
    if (!canContinue) return;
    navigate("/register/identity", {
      state: { ...state, password, confirmPassword },
    });
  };

  const passwordClass = "h-[42px] w-full rounded-[8px] border border-[#d8d8db] bg-white px-3 pr-11 text-[13px] text-[#333] outline-none placeholder:text-[#b8b8bc] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15";

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-[40px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link to="/register/delivery" state={state} aria-label="Back to delivery address" className="absolute left-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
          <FiArrowLeft className="h-[16px] w-[16px]" />
        </Link>
        <img className="h-[34px] w-[78px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-40px)] justify-center px-4 pb-8 pt-20 mobile-sm:px-5 mobile-sm:pb-10 mobile-sm:pt-[clamp(54px,10vh,94px)]">
        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-4 mobile-sm:h-[52px] mobile-sm:w-[52px]" style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }} aria-label="Step 1 of 5">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[9px] font-semibold">1/5</span>
        </div>

        <div className="h-fit w-full max-w-[424px] rounded-[22px] border border-[#e4e4e6] bg-[#F5F5F7] px-4 pb-6 pt-6 mobile-sm:px-8 mobile-sm:pb-8 mobile-sm:pt-8">
          <h1 className="text-center font-montserrat text-[20px] font-medium leading-[1.3] mobile-sm:text-[22px]">
            Create your <span className="text-[#159fdf]">Pay</span><span className="text-[#ed6a2f]">arena</span><br />Password
          </h1>

          <form className="mt-5 mobile-sm:mt-7" onSubmit={continueToIdentity}>
            <label className="block text-[11px] font-medium text-[#52525a]" htmlFor="create-password">Password</label>
            <span className="relative mt-1 block">
              <input id="create-password" className={passwordClass} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#919198]">
                {showPassword ? <FiEyeOff className="h-[16px] w-[16px]" /> : <FiEye className="h-[16px] w-[16px]" />}
              </button>
            </span>

            <label className="mt-4 block text-[11px] font-medium text-[#52525a]" htmlFor="confirm-password">Confirm Password</label>
            <span className="relative mt-1 block">
              <input id="confirm-password" className={passwordClass} type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required />
              <button type="button" onClick={() => setShowConfirm((visible) => !visible)} aria-label={showConfirm ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#919198]">
                {showConfirm ? <FiEyeOff className="h-[16px] w-[16px]" /> : <FiEye className="h-[16px] w-[16px]" />}
              </button>
            </span>
            {confirmPassword && !passwordsMatch && <p className="mt-1.5 text-xs text-red-600" role="alert">Passwords do not match.</p>}

            <div className="mt-6 rounded-lg bg-[#edf5ff] px-4 py-3 text-[11px] leading-[1.5] text-[#50545b] shadow-[0_2px_5px_rgba(22,55,80,0.13)]">
              <p className="mb-1.5 text-xs font-light text-[#139be0]">Password must contain:</p>
              <ul className="space-y-1">
                {rules.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <li key={rule.label} className="flex items-center font-thin gap-2">
                      <span className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full ${passed ? "bg-[#55ad43] text-white" : "bg-[#d7dce3] text-white"}`}>
                        {passed && <FiCheck className="h-[10px] w-[10px]" strokeWidth={3} />}
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button type="submit" disabled={!canContinue} className={`relative mt-6 flex h-[44px] w-full items-center justify-center rounded-[10px] font-inter text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${canContinue ? "bg-[#EA642F] hover:bg-[#d95422]" : "cursor-not-allowed bg-[#ffcca7] opacity-75"}`}>
              Next <FiArrowRight className="absolute right-6 h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
