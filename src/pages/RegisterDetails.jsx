import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FiArrowLeft, FiArrowRight, FiEdit2 } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payarenaLogo from "../assets/images/logo.svg";
import { FiChevronDown } from "react-icons/fi";
import RegistrationSelect from "../components/bits/RegistrationSelect";
import { LuMoveRight } from "react-icons/lu";

const initialDetails = {
  firstName: "",
  lastName: "",
  middleName: "",
  phoneNumber: "",
  gender: "",
  dateOfBirth: null,
};

export default function RegisterDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState(() => ({
    ...initialDetails,
    ...state?.details,
    dateOfBirth: state?.details?.dateOfBirth
      ? new Date(`${state.details.dateOfBirth}T12:00:00`)
      : null,
  }));

  useEffect(() => {
    if (!state?.email) navigate("/register/start", { replace: true });
  }, [state?.email, navigate]);

  if (!state?.email) return null;

  const update = (event) => setDetails((current) => ({ ...current, [event.target.name]: event.target.value }));
  const continueToDelivery = (event) => {
    event.preventDefault();
    const date = details.dateOfBirth;
    const formattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : "";
    navigate("/register/delivery", {
      state: { ...state, details: { ...details, dateOfBirth: formattedDate } },
    });
  };

  const fieldClass = "h-[36px] w-full rounded-[7px] border border-[#dedee1] bg-white px-3 pr-9 text-[11px] text-[#35353a] outline-none placeholder:text-[#b7b7bb] focus:border-[#16a6ed] focus:ring-2 focus:ring-[#16a6ed]/15";

  return (
    <main className="min-h-screen bg-[#fdfafa] font-host-grotesk text-[#252528]">
      <div className="flex min-h-[36px] items-center bg-[#454545] px-3 py-1 text-[14px] text-[#bcbcbc] mobile-sm:text-[17px]">Step 4 confirm details</div>
      <header className="relative flex h-[52px] items-center justify-center border-b border-[#dedee0] bg-[#f4f4f6]">
        <Link to="/register/verified" state={state} aria-label="Back to verification success" className="absolute left-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-[#e9e9eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff]">
          <FiArrowLeft className="h-[18px] w-[18px]" />
        </Link>
        <img className="h-[40px] w-[88px] object-contain" src={payarenaLogo} alt="Payarena" />
      </header>

      <section className="relative flex min-h-[calc(100svh-88px)] justify-center px-4 pb-8 pt-16 mobile-sm:px-5 mobile-sm:pb-10 mobile-sm:pt-6">
        <div className="absolute right-4 top-3 flex h-12 w-12 items-center justify-center rounded-full p-[5px] mobile-sm:right-[6vw] mobile-sm:top-6 mobile-sm:h-[58px] mobile-sm:w-[58px] mobile-sm:p-[6px]" style={{ background: "conic-gradient(#f2632a 0 80%, #ffd0ad 80% 100%)" }} aria-label="Step 4 of 7">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#fdfafa] font-inter text-[11px] font-semibold">4/7</span>
        </div>

        <div className="h-fit w-full max-w-[424px] rounded-[22px] border border-[#e4e4e6] bg-[#f5f5f7] px-4 pb-6 pt-6 mobile-sm:px-[34px] mobile-sm:pb-8 mobile-sm:pt-7">
          <h1 className="text-center font-montserrat text-[20px] font-medium mobile-sm:text-[22px]">Confirm Your Details</h1>
          <p className="mt-1 text-center text-[11px] leading-[1.4] mobile-sm:text-[12px]">Details are pulled from your NIN, your edits<br className="hidden mobile-sm:block" /> must match your official record.</p>

          <form className="mt-5 space-y-3 mobile-sm:mt-6" onSubmit={continueToDelivery}>
            <label className="block text-[11px] font-medium text-[#54545c]">
              First Name <span className="text-red-500">*</span>
              <span className="relative mt-1 block">
                <input className={fieldClass} name="firstName" value={details.firstName} onChange={update} required autoComplete="given-name" />
                <FiEdit2 className="pointer-events-none absolute right-3 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#9b9ba1]" />
              </span>
            </label>
            <label className="block text-[11px] font-medium text-[#54545c]">
              Last Name <span className="text-red-500">*</span>
              <span className="relative mt-1 block">
                <input className={fieldClass} name="lastName" value={details.lastName} onChange={update} required autoComplete="family-name" />
                <FiEdit2 className="pointer-events-none absolute right-3 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#9b9ba1]" />
              </span>
            </label>
            <label className="block text-[11px] font-medium text-[#54545c]">
              Middle name (optional)
              <span className="relative mt-1 block">
                <input className={fieldClass} name="middleName" value={details.middleName} onChange={update} autoComplete="additional-name" />
                <FiEdit2 className="pointer-events-none absolute right-3 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#9b9ba1]" />
              </span>
            </label>
            <label className="block text-[11px] font-medium text-[#54545c]">
              Phone Number <span className="text-red-500">*</span>
              <span className="mt-1 flex h-[36px] overflow-hidden rounded-[7px] border border-[#dedee1] bg-white focus-within:border-[#16a6ed]">
                <span className=" bg-[#f15f2b] px-2.5 text-[11px] text-white flex items-center">+234 <FiChevronDown/></span>
                <input className="min-w-0 flex-1 px-3 text-[11px] outline-none" name="phoneNumber" type="tel" value={details.phoneNumber} onChange={update} required autoComplete="tel-national" />
                <FiEdit2 className="mr-3 mt-[11px] h-[14px] w-[14px] shrink-0 text-[#9b9ba1]" />
              </span>
              <span className="mt-1 block text-[9px] font-normal text-[#aaa]">Enter your NIN or BVN phone number here</span>
            </label>
            <div className="block text-[11px] font-medium text-[#54545c]">
              Gender <span className="text-red-500">*</span>
              <RegistrationSelect
                ariaLabel="Gender"
                value={details.gender}
                onChange={(gender) => setDetails((current) => ({ ...current, gender }))}
                options={["Male", "Female"]}
                placeholder="Select gender"
                required
              />
            </div>
            <label className="block text-[11px] font-medium text-[#54545c]">
              Date of Birth <span className="text-red-500">*</span>
              <span className="mt-1 block">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={details.dateOfBirth ? dayjs(details.dateOfBirth) : null}
                  onChange={(dateOfBirth) => setDetails((current) => ({ ...current, dateOfBirth: dateOfBirth?.toDate() ?? null }))}
                  format="DD - MM - YYYY"
                  maxDate={dayjs()}
                  disableFuture
                  openTo="year"
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      placeholder: "DD - MM - YYYY",
                      autoComplete: "bday",
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          height: 36,
                          borderRadius: "7px",
                          backgroundColor: "#fff",
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: 11,
                          "& fieldset": { borderColor: "#dedee1" },
                          "&:hover fieldset": { borderColor: "#c5c5ca" },
                          "&.Mui-focused fieldset": { borderColor: "#16a6ed", borderWidth: 1 },
                        },
                        "& .MuiInputBase-input": { px: 1.5, py: 1 },
                        "& .MuiSvgIcon-root": { color: "#85858d", fontSize: 17 },
                      },
                    },
                    popper: {
                      sx: {
                        zIndex: 50,
                        "& .MuiPaper-root": { border: "1px solid #e1e1e4", borderRadius: 3, boxShadow: "0 12px 28px rgb(35 35 45 / 14%)" },
                        "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#EA642F" },
                        "& .MuiPickersDay-root.Mui-selected:hover": { backgroundColor: "#d95422" },
                      },
                    },
                  }}
                />
                </LocalizationProvider>
              </span>
            </label>
            <button className="relative mt-2 flex h-[42px] w-full items-center justify-center rounded-[10px] bg-[#EA642F] font-inter text-sm font-medium text-white transition hover:bg-[#d95422] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#079cff] focus-visible:outline-offset-2" type="submit">
              Continue <LuMoveRight className="absolute right-7 h-[18px] w-[18px]" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
