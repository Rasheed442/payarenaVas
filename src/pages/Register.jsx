import React, { useId, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

import line1 from "../assets/images/line1.png";
import line2 from "../assets/images/line2.png";
import line3 from "../assets/images/line3.png";
import scan from "../assets/icons/scan.svg";
import Button from "../components/bits/Button";

/* ------------------------------------------------------------------ */
/* Field config: one entry per input. Add/remove fields here only.     */
/* `name` is the exact key sent in the payload.                        */
/* ------------------------------------------------------------------ */
const FIELDS = [
  { name: "LastName", label: "Surname", scan: true },
  { name: "FirstName", label: "First Name", scan: true },
  { name: "OtherName", label: "Other Name", scan: true },
  { name: "Dob", label: "Date of birth", type: "date" },
  { name: "Email", label: "Email Address", type: "email", scan: true },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
  { name: "Gender", label: "Gender", scan: true },
  { name: "PhoneNumber", label: "Phonenumber", type: "tel", scan: true },
];

/* ------------------------------------------------------------------ */
/* Reusable floating-label field.                                      */
/* Defined OUTSIDE Register so it isn't remounted on every render      */
/* (which would make inputs lose focus while typing).                  */
/* ------------------------------------------------------------------ */
const Field = ({ name, label, type = "text", value, onChange, scan: showScan }) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";
  // Date inputs always show a format placeholder, so the label must stay floated.
  const floated = focused || Boolean(value) || type === "date";
  const iconStyle = { opacity: focused ? 1 : 0.5 };

  return (
    <div
      className="input-container"
      style={focused ? { border: "1px solid #000000" } : {}}
    >
      <input
        id={id}
        name={name}
        type={isPassword && visible ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={isPassword ? "new-password" : "off"}
      />

      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "1rem",
          top: floated ? "0.2rem" : "25%",
          fontSize: floated ? "10px" : "16px",
          color: "#afb4c0",
          pointerEvents: "none",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {label}
      </label>

      {showScan && (
        <img
          src={scan}
          alt=""
          className="w-[20px] absolute right-[1rem] cursor-pointer"
          style={iconStyle}
        />
      )}

      {isPassword &&
        (visible ? (
          <PiEye
            className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
            style={iconStyle}
            onClick={() => setVisible(false)}
          />
        ) : (
          <PiEyeSlash
            className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
            style={iconStyle}
            onClick={() => setVisible(true)}
          />
        ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [authenticate, setAuthenticate] = useState(false);
  const [registerData, setRegisterData] = useState({
    LastName: location.state?.details?.lastName ?? "",
    FirstName: location.state?.details?.firstName ?? "",
    OtherName: location.state?.details?.middleName ?? "",
    Dob: location.state?.details?.dateOfBirth ?? "",
    Email: location.state?.email ?? "", // single email key (no more duplicate in payload)
    password: location.state?.password ?? "",
    confirmPassword: location.state?.confirmPassword ?? "",
    Gender: location.state?.details?.gender ?? "",
    PhoneNumber: location.state?.details?.phoneNumber ?? "",
  });

  const handleChange = (key) => (e) => {
    const { value } = e.target;
    setRegisterData((prev) => ({ ...prev, [key]: value }));
  };

  const formatMessage = (msg) =>
    typeof msg === "string" ? msg : msg ? JSON.stringify(msg) : "";

  async function RegisterHandler(e) {
    e.preventDefault();
    if (authenticate) return;

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("error", {
        description: "Passwords do not match.",
        style: { color: "red" },
      });
      return;
    }

    setAuthenticate(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}account/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(registerData),
        }
      );
      const server = await response.json();

      if (server?.Success) {
        toast.success("", {
          description: formatMessage(server?.Message),
          style: { color: "green" },
        });
        navigate("/login");
      } else {
        toast.error("error", {
          description: formatMessage(server?.Message),
          style: { color: "red" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("error", {
        description: "Something went wrong. Please try again.",
        style: { color: "red" },
      });
    } finally {
      setAuthenticate(false);
    }
  }

  /* The form is built once and used in both the desktop and mobile layouts. */
  const renderForm = ({ compact = false } = {}) => (
    <form className="mt-[1.5rem]" onSubmit={RegisterHandler}>
      {FIELDS.map((field) => (
        <Field
          key={field.name}
          {...field}
          value={registerData[field.name]}
          onChange={handleChange(field.name)}
        />
      ))}

      <div className="flex items-center gap-[0.2rem] mt-[1rem]">
        <Checkbox
          sx={{
            color: orange[800],
            "&.Mui-checked": { color: orange[600] },
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p className={compact ? "text-[.7rem] text-[#090A0B]" : "text-[.9rem] text-[#090A0B]"}>
          Save your Login Details for future attempts
        </p>
      </div>

      <Button
        text={
          authenticate ? (
            <TailSpin
              height="30"
              width="30"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Continue"
          )
        }
        background="#F58220"
        style={{
          marginTop: "3rem",
          borderRadius: "1rem",
          fontFamily: "GeneralSans-SemiBold",
        }}
        height="60px"
      />

      {compact && (
        <p className="text-center mt-[0.8rem] text-[0.8rem]">
          Have an account?{" "}
          <Link to="/login">
            <span className="font-generalsans-semiBold text-accent1">
              Login here.
            </span>
          </Link>
        </p>
      )}
    </form>
  );

  return (
    <div className="py-[9rem] mb-[20rem] sm:px-[1.5rem] sm:mb-[1rem] sm:py-0 sm:pt-[9rem]">
      {/* ---------- Desktop ---------- */}
      <div className="bg-accent1 h-[26rem] max-h-[26rem] relative px-[8rem] md:px-[2rem] sm:hidden">
        <img
          src={line1}
          alt=""
          className="absolute left-0 opacity-[.7] h-[26rem]"
        />
        <img
          src={line2}
          alt=""
          className="absolute right-0 opacity-[.7] h-[26rem]"
        />
        <img
          src={line3}
          alt=""
          className="absolute right-0 bottom-0 opacity-[.7] h-[60%]"
        />

        <div className="flex flex-col justify-center h-[100%] w-full max-w-[1440px] mx-auto">
          <p className="text-white font-generalsans-regular mb-[1rem]">
            Create your
          </p>
          <h2 className="text-[2.5rem] leading-tight text-white font-roboto md:text-[2rem] min-16:text-[4rem]">
            Payarena Payment <br /> Account
          </h2>
        </div>

        <div
          style={{ height: "130%", overflow: "scroll" }}
          className="bg-white absolute top-0 right-[8rem] py-[6rem] px-[3rem] border-b border-l border-r border-[#E3E3E3] rounded-b-[1rem] md:right-2 min-16:right-[20rem] min-imac:right-[46rem]"
        >
          <h2 className="text-[1.6rem] leading-tight font-roboto-regular text-[#090A0B]">
            Create your <br /> Login Credential
          </h2>
          <p className="mt-[1rem] text-[#767E93]">
            Please enter your credential to log into your <br /> account.
          </p>
          {renderForm()}
        </div>
      </div>

      {/* ---------- Mobile ---------- */}
      <div className="hidden sm:block bg-white right-[8rem] py-[1rem] px-[1rem] border border-[#E3E3E3] rounded-[1rem]">
        <h2 className="text-[1.3rem] leading-tight font-roboto-regular text-[#090A0B]">
          Create your Login Credential
        </h2>
        <p className="mt-[1rem] text-[#767E93] text-[0.8rem]">
          Please enter your credential to log into your account.
        </p>
        {renderForm({ compact: true })}
      </div>
    </div>
  );
};

export default Register;