import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const COOKIE_CATEGORIES = [
  {
    key: "necessary",
    label: "Strictly Necessary",
    description:
      "Required for the website to function properly, such as remembering your preferences and securing your session. These cookies cannot be disabled.",
    required: true,
  },
  {
    key: "functional",
    label: "Functional",
    description:
      "Enable enhanced functionality and personalization, such as remembering your settings and language preferences.",
    required: false,
  },
  {
    key: "analytics",
    label: "Analytics & Performance",
    description:
      "Help us understand how visitors interact with the site so we can improve performance and user experience.",
    required: false,
  },
  {
    key: "marketing",
    label: "Marketing & Advertising",
    description:
      "Used to deliver personalized advertisements and measure the effectiveness of our marketing campaigns.",
    required: false,
  },
];

const DEFAULT_PREFERENCES = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setIsVisible(true);
    }

    // Allow other components to reopen the preferences panel
    const openPreferences = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("cookiePreferences"));
        if (saved) {
          setPreferences({ ...DEFAULT_PREFERENCES, ...saved, necessary: true });
        }
      } catch (e) {
        // ignore malformed stored data
      }
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener("open-cookie-preferences", openPreferences);
    return () =>
      window.removeEventListener("open-cookie-preferences", openPreferences);
  }, []);

  const saveConsent = (value, prefs = null) => {
    localStorage.setItem("cookieConsent", value);
    if (prefs) {
      localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    }
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAccept = () => {
    const allAccepted = COOKIE_CATEGORIES.reduce(
      (acc, cat) => ({ ...acc, [cat.key]: true }),
      {}
    );
    saveConsent("accepted", allAccepted);
  };

  const handleDecline = () => {
    saveConsent("declined", DEFAULT_PREFERENCES);
  };

  const handleSavePreferences = () => {
    const anyAccepted = Object.values(preferences).some(Boolean);
    saveConsent(anyAccepted ? "custom" : "declined", preferences);
  };

  const togglePreference = (key) => {
    const category = COOKIE_CATEGORIES.find((c) => c.key === key);
    if (category?.required) return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenPreferences = () => {
    // Load previously saved preferences if they exist
    try {
      const saved = JSON.parse(localStorage.getItem("cookiePreferences"));
      if (saved) {
        setPreferences({ ...DEFAULT_PREFERENCES, ...saved, necessary: true });
      }
    } catch (e) {
      // ignore malformed stored data
    }
    setShowPreferences(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1210] text-white p-6 shadow-2xl border-t-4 border-[#f26a10]">
      <div className="max-w-4xl mx-auto">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
                onClick={handleOpenPreferences}
                className="h-10 px-6 rounded-lg border border-[#f26a10] text-[#f26a10] text-[13px] font-semibold hover:bg-[#f26a10]/10 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={handleAccept}
                className="h-10 px-6 rounded-lg bg-[#f26a10] text-white text-[13px] font-semibold hover:bg-[#e05e00] transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[16px] font-semibold mb-1">Cookie Preferences</h3>
                <p className="text-[13px] text-white/70">
                  Choose which categories of cookies you allow us to use.
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close preferences"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-3 mb-5">
              {COOKIE_CATEGORIES.map((category) => (
                <div
                  key={category.key}
                  className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold">{category.label}</span>
                      {category.required && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          Always on
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-white/60 mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference(category.key)}
                    disabled={category.required}
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                      preferences[category.key]
                        ? "bg-[#f26a10]"
                        : "bg-white/20"
                    } ${category.required ? "cursor-not-allowed" : "cursor-pointer"}`}
                    role="switch"
                    aria-checked={preferences[category.key]}
                    aria-label={category.label}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1 ${
                        preferences[category.key] ? "translate-x-6 ml-0.5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="h-10 px-6 rounded-lg border border-white/30 text-[13px] font-semibold hover:bg-white/10 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="h-10 px-6 rounded-lg bg-[#f26a10] text-white text-[13px] font-semibold hover:bg-[#e05e00] transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dispatch this event to reopen the cookie preferences panel,
// e.g. window.dispatchEvent(new Event("open-cookie-preferences"))
export const openCookiePreferences = () => {
  window.dispatchEvent(new Event("open-cookie-preferences"));
};

export default CookieConsent;
