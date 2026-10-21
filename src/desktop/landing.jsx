import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInfo, FiShare2 } from "react-icons/fi";
import payIllustration from "../assets/desktop/pay.png";
import payarenaLogo from "../assets/images/logo.svg";
import { LuMoveRight } from "react-icons/lu";

const focusRing =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#079cff]";
const lift = "motion-safe:transition motion-safe:hover:-translate-y-px";

export default function DesktopLanding() {
  const [shareMessage, setShareMessage] = useState("");
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (message) => {
    window.clearTimeout(timer.current);
    setShareMessage(message);
    timer.current = window.setTimeout(() => setShareMessage(""), 2400);
  };

  const shareApp = async () => {
    const shareData = {
      title: "Payarena",
      text: "Pay, shop and access amazing services with one secure account.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        flash("Link copied");
      }
    } catch (error) {
      if (error?.name !== "AbortError") flash("Unable to share right now");
    }
  };

  return (
    // Always two columns, side by side: 47% showcase | 53% actions
    <main className="grid min-h-screen desktop:grid-cols-[47%_53%] bg-[#F5F5F7] font-host-grotesk text-[#3d3d3f]">
      {/* LEFT: headline + illustration */}
      <section
        className="hidden desktop:flex min-w-0 flex-col bg-[#f4f4f6] px-[clamp(20px,5.7vw,56px)] pt-[clamp(34px,8vh,58px)]"
        aria-label="Payarena services"
      >
        <div>
          <h1 className="font-montserrat font-semibold text-[clamp(22px,3.2vw,34px)] leading-[1.08] tracking-[-1.3px] text-[#2f2f31]">
            One Account
            <br />
            Unlimited Possibilities
          </h1>
          <p className="mt-3.5 max-w-[34ch] text-[clamp(13px,1.6vw,17px)] leading-[1.4] text-[#4a4a4d]">
            Pay, shop and access amazing services with one secure account
          </p>
        </div>

        <div className="mt-8 flex flex-1 items-center justify-center">
          <img
            className="h-auto w-full max-w-[540px] object-contain"
            src={payIllustration}
            alt="Payarena brings your wallet, bills, shopping and other services together"
            decoding="async"
          />
        </div>
      </section>

      {/* RIGHT: logo + actions */}
      <section
        className="flex min-w-0 flex-col items-center bg-[#FDF9F8] px-[clamp(20px,4vw,40px)] pb-8 pt-[clamp(30px,7.5vh,58px)]"
        aria-label="Get started with Payarena"
      >
        <img
          className="block  w-32 object-contain"
          src={payarenaLogo}
          alt="Payarena, a world of more options"
          fetchpriority="high"
        />

        {/* pb shifts the group slightly above true center, matching the original design */}
        <div className="flex w-full flex-1 items-center justify-center pb-[12vh]">
          <div className="flex w-full max-w-[400px] flex-col items-stretch">
            <Link
              className={`relative flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#EA642F] px-10 font-inter text-[15px] font-medium text-white hover:bg-[#b93a13] ${lift} ${focusRing}`}
              to="/register/start"
            >
              <span>Create Account</span>
              <LuMoveRight className="absolute right-5 h-[15px] w-[15px]" aria-hidden="true" />
            </Link>

            <Link
              className={`mt-3.5 flex min-h-[44px] items-center justify-center rounded-[10px] border border-[#13a5fb] font-inter text-[15px] font-medium text-[#22AAE2] hover:bg-[#f1f9ff] ${lift} ${focusRing}`}
              to="/login/new"
            >
              Sign In
            </Link>

            <p className="mt-3 flex items-center font-light justify-center gap-1.5 text-xs text-[#4c4c4e]">
              Secure. Fast. Reliable.
              <FiInfo className="h-[14px] w-[14px] fill-[#12a3ee] text-white" aria-hidden="true" />
              <span className="sr-only">Your account is protected</span>
            </p>

            <button
              className={`mt-5 inline-flex min-h-[42px] w-[170px] items-center justify-center gap-2 self-center rounded-[11px] border border-[#e1e1e1] bg-white font-inter text-xs text-[#444] hover:bg-[#f8f8f8] ${lift} ${focusRing}`}
              type="button"
              onClick={shareApp}
            >
              <FiShare2 className="h-[14px] w-[14px]" aria-hidden="true" />
              Share App
            </button>

            <span className="mt-1.5 min-h-4 text-center text-[11px] text-[#146fa3]" role="status" aria-live="polite">
              {shareMessage}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
