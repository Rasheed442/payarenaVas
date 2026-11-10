import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1210] text-white p-6 shadow-2xl border-t-4 border-[#f26a10]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-[16px] font-semibold mb-2">Cookie Notice</h3>
          <p className="text-[13px] text-white/80 leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
            By continuing to use this site, you consent to our use of cookies. You can decline if you prefer.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 mt-4 md:mt-0">
          <button
            onClick={handleDecline}
            className="h-10 px-6 rounded-lg border border-white/30 text-[13px] font-semibold hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="h-10 px-6 rounded-lg bg-[#f26a10] text-white text-[13px] font-semibold hover:bg-[#e05e00] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
