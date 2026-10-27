import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiShield } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import RegistrationSelect from "../components/bits/RegistrationSelect";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const initialAddress = { streetAddress: "", city: "", state: "" };

export default function RegisterDelivery() {
  const { state: navigationState } = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState(initialAddress);
  const ready = Object.values(address).every((value) => value.trim());

  useEffect(() => {
    if (!navigationState?.email || !navigationState?.details) {
      navigate("/register/start", { replace: true });
    }
  }, [navigationState?.email, navigationState?.details, navigate]);

  if (!navigationState?.email || !navigationState?.details) return null;

  const update = (event) => setAddress((current) => ({ ...current, [event.target.name]: event.target.value }));
  const continueToAccount = (event) => {
    event.preventDefault();
    navigate("/register/identity", {
      state: { ...navigationState, address },
    });
  };

  const fieldClass = "mt-1 h-[42px] w-full rounded-[8px] border border-[#dedee1] bg-white px-3 text-[13px] text-[#35353a] outline-none placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15";

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <header className="relative flex h-[48px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link to="/register/details" state={navigationState} aria-label="Back to confirm details" className="absolute left-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
          <FiArrowLeft className="h-[17px] w-[17px]" />
        </Link>
        <img className="h-[36px] w-[76px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-48px)] justify-center px-4 pb-8 pt-20 mobile-sm:px-5 mobile-sm:pb-10 mobile-sm:pt-[clamp(54px,10vh,94px)]">
        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-5 mobile-sm:h-[52px] mobile-sm:w-[52px]" style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }} aria-label="Step 5 of 7">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[10px] font-semibold">5/7</span>
        </div>

        <div className="h-fit w-full max-w-[424px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-4 pb-6 pt-6 mobile-sm:px-8 mobile-sm:pb-8 mobile-sm:pt-8">
          <h1 className="text-center font-montserrat text-[20px] font-medium mobile-sm:text-[22px]">Delivery Address</h1>
          <p className="mt-1 text-center text-[12px] leading-[1.4] text-[#333]">Enter your delivery address for Payarena Mall<br />purchases.</p>

          <form className="mt-5 space-y-3 mobile-sm:mt-7 mobile-sm:space-y-4" onSubmit={continueToAccount}>
            <label className="block text-[11px] font-medium text-[#52525a]">
              Street Address <span className="text-red-500">*</span>
              <input className={fieldClass} name="streetAddress" value={address.streetAddress} onChange={update} required autoComplete="street-address" placeholder="Enter street address" />
            </label>
            <label className="block text-[11px] font-medium text-[#52525a]">
              City <span className="text-red-500">*</span>
              <input className={fieldClass} name="city" value={address.city} onChange={update} required autoComplete="address-level2" placeholder="Enter city" />
            </label>
            <div className="block text-[11px] font-medium text-[#52525a]">
              State <span className="text-red-500">*</span>
              <RegistrationSelect
                ariaLabel="State"
                value={address.state}
                onChange={(selectedState) => setAddress((current) => ({ ...current, state: selectedState }))}
                options={nigerianStates}
                placeholder="Select state"
                controlHeight={42}
                fontSize={13}
              />
            </div>

            <div className="flex gap-2.5 rounded-lg bg-[#edf5ff] px-4 py-3 text-[11px] leading-[1.45] text-[#2495cb] shadow-[0_2px_5px_rgba(22,55,80,0.12)]">
              <FiShield className="mt-px h-[16px] w-[16px] shrink-0" aria-hidden="true" />
              <span><strong className="font-semibold">Your information is secure</strong><br />We use your address to deliver your Payarena Mall purchases safely.</span>
            </div>

            <button
              className={`relative flex h-[44px] w-full items-center justify-center rounded-[10px] font-inter text-sm font-medium text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2 ${ready ? "bg-[#EA642F] hover:bg-[#d95422]" : "cursor-not-allowed bg-[#ffcca7] opacity-75"}`}
              type="submit"
              disabled={!ready}
            >
              Continue <FiArrowRight className="absolute right-6 h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
