import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff, FiInfo, FiLoader } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import payarenaLogo from "../assets/images/logo.svg";
import { useProfile } from "../context/ProfileProvider";

export default function NewLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setProfileFirstName, setProfileLastName, setProfilePic } = useProfile();
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (!state?.email && storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, [state?.email]);

  const submitLogin = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Enter your password to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL?.trim();
      if (!authBaseUrl) throw new Error("Sign in is temporarily unavailable. Please try again shortly.");

      const response = await fetch(`${authBaseUrl.replace(/\/+$/, "")}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password, channel: "mobile" }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const fieldError = Object.values(result)
          .flatMap((value) => Array.isArray(value) ? value : [])
          .find((value) => typeof value === "string");
        throw new Error(fieldError || result.message || result.detail || "Sign in failed. Check your details and try again.");
      }
      if (!result.identity_token) throw new Error("The sign-in service returned an incomplete response. Please try again.");

      localStorage.setItem("token", result.identity_token);
      if (result.refresh_token) localStorage.setItem("refreshToken", result.refresh_token);
      const profile = {
        FirstName: result.first_name || "",
        Surname: result.last_name || "",
        Email: result.email || email.trim(),
        ProfilePhoto: result.profile_photo || "",
      };
      localStorage.setItem("userDetails", JSON.stringify(profile));
      setProfileFirstName(profile.FirstName);
      setProfileLastName(profile.Surname);
      setProfilePic(profile.ProfilePhoto);

      if (rememberMe) localStorage.setItem("rememberedEmail", email.trim());
      else localStorage.removeItem("rememberedEmail");

      toast.success(result.message || "You’re signed in.");
      navigate("/dashboard");
    } catch (error) {
      const message = error instanceof TypeError
        ? "We couldn’t connect to Payarena. Check your internet connection and try again."
        : error.message || "Sign in failed. Check your details and try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-[62px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link to="/desktop" aria-label="Back to Payarena" className="absolute left-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#666] transition hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
          <FiArrowLeft className="h-[19px] w-[19px]" />
        </Link>
        <img className="h-[42px] w-[96px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-62px)] justify-center px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-[clamp(64px,9vh,92px)]">
        <div className="absolute right-4 top-5 flex h-[52px] w-[52px] items-center justify-center rounded-full p-[5px] sm:right-[6vw] sm:top-7 sm:h-[66px] sm:w-[66px]" style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }} aria-label="Step 1 of 5">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[10px] font-semibold sm:text-xs">1/5</span>
        </div>

        <div className="h-fit w-full max-w-[460px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-5 pb-7 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
          <h1 className="text-center font-montserrat text-[24px] font-medium leading-tight sm:text-[26px]">Welcome Back!</h1>
          <p className="mx-auto mt-2 max-w-[320px] text-center text-[14px] leading-[1.4] sm:text-[15px]">
            Enter your email and password to get back<br className="hidden sm:block" /> to your <span className="text-[#159fdf]">Pay</span><span className="text-[#ed6a2f]">arena</span> account.
          </p>

          <div className="mx-auto mt-7 flex max-w-[340px] gap-3 rounded-lg bg-[#edf5ff] px-4 py-3 text-[13px] leading-[1.5] text-[#159fe0] shadow-[0_2px_5px_rgba(22,55,80,0.13)] sm:mt-8">
            <FiInfo className="mt-0.5 h-[17px] w-[17px] shrink-0" aria-hidden="true" />
            <span>This email is registered on Payarena VAS platform. Please enter your password to continue.</span>
          </div>

          <form className="mx-auto mt-7 max-w-[380px] sm:mt-8" onSubmit={submitLogin} noValidate>
            <label className="block text-[13px] font-medium text-[#52525a]" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="mt-1.5 h-[52px] w-full rounded-[8px] border border-[#dedee1] bg-white px-3 text-[14px] outline-none placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15 sm:h-[54px]"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="Enter your email"
              required
            />

            <label className="mt-4 block text-[13px] font-medium text-[#52525a]" htmlFor="login-password">Password</label>
            <span className="relative mt-1.5 block">
              <input
                id="login-password"
                className="h-[52px] w-full rounded-[8px] border border-[#dedee1] bg-white px-3 pr-12 text-[14px] outline-none placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15 sm:h-[54px]"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#919198] hover:text-[#555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
                {showPassword ? <FiEyeOff className="h-[19px] w-[19px]" /> : <FiEye className="h-[19px] w-[19px]" />}
              </button>
            </span>

            <div className="mt-2 flex items-center justify-between gap-3 text-[12px] text-[#555b65] sm:text-[13px]">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-[#159fe0]" />
                Remember me
              </label>
              <Link to="/reset-password" className="text-[#079fe5] hover:underline">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className={`relative mt-7 flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] font-inter text-[15px] font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 sm:h-[54px] sm:text-base ${isSubmitting ? "cursor-wait bg-[#f4a47f]" : "bg-[#EA642F] hover:bg-[#d95422]"}`}>
              {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Signing in..." : "Sign In"}
              {!isSubmitting && <FiArrowRight className="absolute right-6 h-[19px] w-[19px]" />}
            </button>

            <p className="mt-5 text-center text-[12px] text-[#555b65] sm:text-[13px]">
              New to Payarena? <Link to="/register/start" className="font-medium text-[#079fe5] hover:underline">Create Account</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
