import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  CreditCard,
  Loader2,
  LogOut,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import { toast } from "sonner";
import authFetch from "../helpers/authFetch";

const KYC_VERIFY_PATH = "/auth/kyc/verify";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

const getStoredProfile = () => {
  try {
    return JSON.parse(localStorage.getItem("userDetails")) || {};
  } catch (e) {
    return {};
  }
};

function KycSelect({ value, onChange, options, placeholder, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-[44px] w-full items-center justify-between rounded-[10px] border bg-white px-3.5 text-[13px] outline-none transition focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15 disabled:opacity-60 ${
          value ? "border-[#d8d8db] text-[#252528]" : "border-[#dedee1] text-[#b7b7bb]"
        }`}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#8a8a92] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-56 overflow-auto rounded-[10px] border border-[#e4e4e6] bg-white py-1.5 shadow-[0_12px_32px_rgba(30,30,40,0.16)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-[13px] transition ${
                      isSelected ? "bg-[#fff2eb] font-medium text-[#d95422]" : "text-[#35353a] hover:bg-[#f6f6f8]"
                    }`}
                  >
                    {option.label}
                    {isSelected && <Check className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12px] font-medium text-[#45454c]">
        {label}
        {required && <span className="text-[#EA642F]">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[11px] text-red-600">{error}</span>}
    </label>
  );
}

const inputClass =
  "h-[44px] w-full rounded-[10px] border border-[#d8d8db] bg-white px-3.5 text-[13px] text-[#252528] outline-none transition placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15 disabled:opacity-60";

export default function KycVerification() {
  const navigate = useNavigate();
  const profile = getStoredProfile();

  const [form, setForm] = useState({
    firstName: profile.FirstName || "",
    lastName: profile.Surname || "",
    middleName: "",
    phoneNumber: "",
    gender: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    streetAddress: "",
    city: "",
    state: "",
    idType: "NIN",
    idNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const dob =
    form.dobYear && form.dobMonth && form.dobDay
      ? `${form.dobYear}-${String(form.dobMonth).padStart(2, "0")}-${String(form.dobDay).padStart(2, "0")}`
      : "";

  const dobDate = dob ? new Date(`${dob}T00:00:00`) : null;
  const dobValid =
    dobDate &&
    dobDate.getFullYear() === Number(form.dobYear) &&
    dobDate.getMonth() + 1 === Number(form.dobMonth) &&
    dobDate.getDate() === Number(form.dobDay) &&
    dobDate <= new Date();

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    /^\d{10,11}$/.test(form.phoneNumber.replace(/\D/g, "")) &&
    form.gender &&
    dobValid &&
    form.streetAddress.trim() &&
    form.city.trim() &&
    form.state &&
    /^\d{11}$/.test(form.idNumber);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mall-token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("kycVerified");
    navigate("/login/new", { replace: true });
  };

  const submitVerification = async (event) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await authFetch(KYC_VERIFY_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          middle_name: form.middleName.trim(),
          phone_number: form.phoneNumber.replace(/\D/g, ""),
          gender: form.gender,
          dob,
          street_address: form.streetAddress.trim(),
          city: form.city.trim(),
          state: form.state,
          id_type: form.idType.toLowerCase(),
          id_number: form.idNumber,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const fieldError = Object.values(result)
          .flatMap((value) => Array.isArray(value) ? value : [])
          .find((value) => typeof value === "string");
        throw new Error(fieldError || result.message || result.detail || "We couldn’t verify your identity. Please check your details and try again.");
      }

      // An explicit kyc_verified: false means verification failed
      if (result.kyc_verified === false) {
        throw new Error(result.message || "Your identity could not be verified. Please check your details and try again.");
      }

      localStorage.setItem("kycVerified", "true");
      toast.success(result.message || "Your identity has been verified.");
      navigate("/dashboard-v2", { replace: true });
    } catch (error) {
      const message = error instanceof TypeError
        ? "We couldn’t connect to Payarena. Check your internet connection and try again."
        : error.message || "We couldn’t verify your identity. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const stateOptions = NIGERIAN_STATES.map((s) => ({ value: s, label: s }));
  const dayOptions = DAYS.map((d) => ({ value: String(d), label: String(d) }));
  const monthOptions = MONTHS.map((m, i) => ({ value: String(i + 1), label: m }));
  const yearOptions = YEARS.map((y) => ({ value: String(y), label: String(y) }));

  const sectionTitle = "mb-3 mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8a92] first:mt-0";

  return (
    <main className="min-h-screen bg-[#f4f4f6] font-host-grotesk text-[#252528]">
      <header className="sticky top-0 z-30 flex h-[56px] items-center justify-between border-b border-[#dedee0] bg-white/90 px-4 backdrop-blur sm:px-6">
        <img className="h-[34px] w-[78px] object-contain" src={payarenaLogo} alt="Payarena" />
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12px] font-medium text-[#666] transition hover:bg-[#f0f0f2] hover:text-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      <section className="flex min-h-[calc(100svh-56px)] justify-center px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
        <div className="h-fit w-full max-w-[560px]">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EA642F] to-[#f2632a] shadow-[0_8px_20px_rgba(234,100,47,0.35)]">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-montserrat text-[22px] font-semibold sm:text-[26px]">Identity Verification</h1>
            <p className="mt-1.5 max-w-[400px] text-[13px] leading-relaxed text-[#6b6b73]">
              To keep your account secure, please verify your identity. This information must match your official records.
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-[20px] border border-[#e4e4e6] bg-white p-5 shadow-[0_4px_24px_rgba(30,30,40,0.06)] sm:p-8">
            <form onSubmit={submitVerification} noValidate>
              {/* Personal Information */}
              <h2 className={sectionTitle}>Personal Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name" required>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a0a8]" />
                    <input className={`${inputClass} pl-10`} value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} disabled={isSubmitting} autoComplete="given-name" required />
                  </div>
                </Field>
                <Field label="Last Name" required>
                  <input className={inputClass} value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} disabled={isSubmitting} autoComplete="family-name" required />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Middle Name" required={false}>
                  <input className={inputClass} value={form.middleName} onChange={(e) => updateField("middleName", e.target.value)} disabled={isSubmitting} autoComplete="additional-name" />
                </Field>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Phone Number" required error={form.phoneNumber && !/^\d{10,11}$/.test(form.phoneNumber.replace(/\D/g, "")) ? "Enter a valid 10-11 digit number" : null}>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a0a8]" />
                    <input className={`${inputClass} pl-10`} type="tel" inputMode="numeric" value={form.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value.replace(/\D/g, "").slice(0, 11))} disabled={isSubmitting} placeholder="08012345678" autoComplete="tel-national" required />
                  </div>
                </Field>
                <Field label="Gender" required>
                  <KycSelect value={form.gender} onChange={(v) => updateField("gender", v)} options={genderOptions} placeholder="Select gender" disabled={isSubmitting} />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Date of Birth" required error={form.dobYear && form.dobMonth && form.dobDay && !dobValid ? "Enter a valid past date" : null}>
                  <div className="grid grid-cols-3 gap-2.5">
                    <KycSelect value={form.dobDay} onChange={(v) => updateField("dobDay", v)} options={dayOptions} placeholder="Day" disabled={isSubmitting} />
                    <KycSelect value={form.dobMonth} onChange={(v) => updateField("dobMonth", v)} options={monthOptions} placeholder="Month" disabled={isSubmitting} />
                    <KycSelect value={form.dobYear} onChange={(v) => updateField("dobYear", v)} options={yearOptions} placeholder="Year" disabled={isSubmitting} />
                  </div>
                </Field>
              </div>

              {/* Address */}
              <h2 className={sectionTitle}>Residential Address</h2>
              <Field label="Street Address" required>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a0a0a8]" />
                  <input className={`${inputClass} pl-10`} value={form.streetAddress} onChange={(e) => updateField("streetAddress", e.target.value)} disabled={isSubmitting} placeholder="Enter your street address" autoComplete="street-address" required />
                </div>
              </Field>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="City" required>
                  <input className={inputClass} value={form.city} onChange={(e) => updateField("city", e.target.value)} disabled={isSubmitting} placeholder="Enter your city" autoComplete="address-level2" required />
                </Field>
                <Field label="State" required>
                  <KycSelect value={form.state} onChange={(v) => updateField("state", v)} options={stateOptions} placeholder="Select state" disabled={isSubmitting} />
                </Field>
              </div>

              {/* Identity */}
              <h2 className={sectionTitle}>Identity</h2>
              <Field label="ID Type" required>
                <div className="grid grid-cols-2 gap-2.5">
                  {["NIN", "BVN"].map((type) => {
                    const selected = form.idType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField("idType", type)}
                        disabled={isSubmitting}
                        className={`flex h-[44px] items-center justify-center gap-2 rounded-[10px] border text-[13px] font-medium transition ${
                          selected
                            ? "border-[#EA642F] bg-[#fff4ec] text-[#d95422]"
                            : "border-[#d8d8db] bg-white text-[#35353a] hover:border-[#c5c5ca]"
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                        {type}
                        {selected && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="mt-4">
                <Field label={`Enter ${form.idType} Number`} required error={form.idNumber && !/^\d{11}$/.test(form.idNumber) ? "Enter all 11 digits" : null}>
                  <input
                    className={inputClass}
                    value={form.idNumber}
                    onChange={(e) => updateField("idNumber", e.target.value.replace(/\D/g, "").slice(0, 11))}
                    disabled={isSubmitting}
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={11}
                    placeholder={`Enter 11-digit ${form.idType}`}
                    required
                  />
                </Field>
              </div>

              {/* Security note */}
              <div className="mt-6 flex gap-3 rounded-[12px] border border-[#fde3d3] bg-[#fff7f1] px-4 py-3.5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#EA642F]" />
                <p className="text-[12px] leading-relaxed text-[#7a5a48]">
                  <span className="font-semibold text-[#c24e1a]">Your information is secure.</span>{" "}
                  We encrypt your details and only use them to verify your identity.
                </p>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                aria-busy={isSubmitting}
                className={`relative mt-6 flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] font-inter text-[15px] font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${
                  isValid && !isSubmitting
                    ? "bg-gradient-to-r from-[#EA642F] to-[#f2632a] shadow-[0_6px_16px_rgba(234,100,47,0.35)] hover:opacity-95"
                    : "cursor-not-allowed bg-[#ffcca7] opacity-75"
                }`}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Verifying..." : "Verify Identity"}
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-[#9a9aa1]">
                By continuing, you confirm that the information provided is accurate and belongs to you.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
