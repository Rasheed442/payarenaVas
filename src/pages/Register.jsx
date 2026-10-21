import React, { useState } from "react";
import line1 from "../assets/images/line1.png";
import line2 from "../assets/images/line2.png";
import line3 from "../assets/images/line3.png";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/bits/Button";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import scan from "../assets/icons/scan.svg";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
const Register = () => {
  const location = useLocation();
  const [registerData, setRegisterData] = useState({
    LastName: location.state?.details?.lastName ?? "",
    FirstName: location.state?.details?.firstName ?? "",
    OtherName: location.state?.details?.middleName ?? "",
    Dob: location.state?.details?.dateOfBirth ?? "",
    Email: location.state?.email ?? "",
    email: location.state?.email ?? "",
    password: location.state?.password ?? "",
    confirmPassword: location.state?.confirmPassword ?? "",
    Gender: location.state?.details?.gender ?? "",
    PhoneNumber: location.state?.details?.phoneNumber ?? "",
  });
  const [authenticate, setAuthenticate] = useState(false);

  const [inputFocus, setInputFocus] = useState({
    SurnameFocus: false,
    FirstNameFocus: false,
    OtherNameFocus: false,
    BirthDateFocus: false,
    emailFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false,
    GenderFocus: false,
    PhoneNumberFocus: false,
  });
  const [showPassword, setShowPassword] = useState({
    showPassword1: false,
    showPassword2: false,
  });

  const token = localStorage.getItem("token");

  const [labelStyle, setlabelStyle] = useState({
    firstnamelabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    lastnamelabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    othernamelabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    emailLabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    dateofbirthlabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    passwordLabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    confirmPasswordLabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    genderlabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
    phonenumberlabel: {
      position: "absolute",
      top: "25%",
      left: "1rem",
      fontSize: "16px",
      color: "#afb4c0",
      pointerEvents: "none",
      transition: "all 0.5s ease-in-out",
    },
  });

  async function RegisterHandler(e) {
    e.preventDefault();
    setAuthenticate(true);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}account/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(registerData),
      }
    );
    const server = await response.json();
    console.log(server?.Messages);
    setAuthenticate(false);

    if (server?.Success) {
      toast.success("", {
        description: JSON.stringify(server?.Message),
        style: { color: "green" },
      });
      setAuthenticate(false);
    } else {
      toast.error("error", {
        description: JSON.stringify(server?.Message),
        style: { color: "red" },
      });
      setAuthenticate(false);
    }
  }
  return (
    <div className="py-[9rem] mb-[20rem] sm:px-[1.5rem] sm:mb-[1rem] sm:py-0 sm:pt-[9rem]">
      {" "}
      <div className="bg-accent1 h-[26rem] max-h-[26rem] relative px-[8rem] md:px-[2rem] sm:hidden">
        <img
          src={line1}
          alt="line1"
          className="absolute left-0 opacity-[.7] h-[26rem]"
        />
        <img
          src={line2}
          alt="line2"
          className="absolute right-0 opacity-[.7] h-[26rem]"
        />
        <img
          src={line3}
          alt="line3"
          className="absolute right-0 bottom-0 opacity-[.7] h-[60%]"
        />
        <div className="flex flex-col justify-center h-[100%] w-full max-w-[1440px] mx-auto">
          <p className="text-white font-generalsans-regular mb-[1rem]">
            Create your
          </p>
          <h2 className="text-[2.5rem] leading-tight text-white font-roboto md:text-[2rem] min-16:text-[4rem]">
            Payarena Payment <br /> Account
          </h2>
          {/* <p className="text-[.7rem] text-white mt-[1rem] min-16:text-[1.2rem]">
            Lorem Ipsum is simply dummy text of the printing <br /> and
            typesetting industry. Lorem Ipsum has been <br /> the industry's
            standard dummy text ever since <br /> the 1500s,
          </p> */}
        </div>
        <div
          style={{ height: "130%", overflow: "scroll" }}
          className="bg-white absolute top-0 right-[8rem] py-[6rem] px-[3rem] border-b border-l border-r border-[#E3E3E3] rounded-b-[1rem] md:right-2  min-16:right-[20rem] min-imac:right-[46rem]"
        >
          <h2 className="text-[1.6rem] leading-tight font-roboto-regular text-[#090A0B]">
            Create your <br /> Login Credential
          </h2>
          <p className="mt-[1rem] text-[#767E93]">
            Please enter your credential to log into your <br /> account.
          </p>

          <form className="mt-[1.5rem]" onSubmit={RegisterHandler}>
            <div
              className="input-container"
              style={
                inputFocus.SurnameFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.LastName}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, LastName: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, SurnameFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      firstnamelabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, SurnameFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      firstnamelabel: {
                        position: "absolute",
                        top: `${registerData.Surname ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.Surname ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.firstnamelabel}>
                Surname
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.Surname === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>

            {/* lastname label */}
            <div
              className="input-container"
              style={
                inputFocus.FirstNameFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.FirstName}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, FirstName: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, FirstNameFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      lastnamelabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, FirstNameFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      lastnamelabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.lastnamelabel}>
                First Name
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.emailFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>
            {/* other name label */}
            <div
              className="input-container"
              style={
                inputFocus.OtherNameFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.OtherName}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, OtherName: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, OtherNameFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      othernamelabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, OtherNameFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      othernamelabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.othernamelabel}>
                Other Name
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.OtherNameFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>
            {/* date of birth label */}
            <div
              className="input-container"
              style={
                inputFocus.BirthDateFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="date"
                name="name"
                value={registerData.Dob}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, Dob: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, BirthDateFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      dateofbirthlabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, BirthDateFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      dateofbirthlabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.dateofbirthlabel}>
                Date of birth
              </label>
              {/* <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.BirthDateFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              /> */}
            </div>

            {/* email or phone number label */}
            <div
              className="input-container"
              style={
                inputFocus.emailFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.Email}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, Email: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, emailFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      emailLabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, emailFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      emailLabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.emailLabel}>
                Email Address
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.emailFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>
            <div
              className="input-container"
              style={
                inputFocus.passwordFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type={showPassword.showPassword1 ? "text" : "password"}
                name="password"
                value={registerData.password}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, passwordFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      passwordLabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, passwordFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      passwordLabel: {
                        position: "absolute",
                        top: `${registerData.password ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.password ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.passwordLabel}>
                Password
              </label>
              {showPassword.showPassword1 ? (
                <PiEye
                  className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                  style={
                    inputFocus.passwordFocus === false
                      ? { opacity: "0.5" }
                      : { opacity: "1" }
                  }
                  onClick={() => {
                    setShowPassword((prev) => {
                      return { ...prev, showPassword1: false };
                    });
                  }}
                />
              ) : (
                <PiEyeSlash
                  className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                  style={
                    inputFocus.passwordFocus === false
                      ? { opacity: "0.5" }
                      : { opacity: "1" }
                  }
                  onClick={() => {
                    setShowPassword((prev) => {
                      return { ...prev, showPassword1: true };
                    });
                  }}
                />
              )}
            </div>
            <div
              className="input-container"
              style={
                inputFocus.confirmPasswordFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type={showPassword.showPassword2 ? "text" : "password"}
                name="name"
                value={registerData.confirmPassword}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, confirmPassword: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, confirmPasswordFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      confirmPasswordLabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, confirmPasswordFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      confirmPasswordLabel: {
                        position: "absolute",
                        top: `${
                          registerData.confirmPassword ? "0.2rem" : "25%"
                        }`,
                        left: "1rem",
                        fontSize: `${
                          registerData.confirmPassword ? "10px" : "16px"
                        }`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.confirmPasswordLabel}>
                Confirm Password
              </label>
              {showPassword.showPassword2 ? (
                <PiEye
                  className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                  style={
                    inputFocus.confirmPasswordFocus === false
                      ? { opacity: "0.5" }
                      : { opacity: "1" }
                  }
                  onClick={() => {
                    setShowPassword((prev) => {
                      return { ...prev, showPassword2: false };
                    });
                  }}
                />
              ) : (
                <PiEyeSlash
                  className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                  style={
                    inputFocus.confirmPasswordFocus === false
                      ? { opacity: "0.5" }
                      : { opacity: "1" }
                  }
                  onClick={() => {
                    setShowPassword((prev) => {
                      return { ...prev, showPassword2: true };
                    });
                  }}
                />
              )}
            </div>

            <div
              className="input-container"
              style={
                inputFocus.GenderFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.Gender}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, Gender: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, GenderFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      genderlabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, GenderFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      genderlabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.genderlabel}>
                Gender
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.GenderFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>
            <div
              className="input-container"
              style={
                inputFocus.PhoneNumberFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.PhoneNumber}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, PhoneNumber: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, PhoneNumberFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      phonenumberlabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, PhoneNumberFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      phonenumberlabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.phonenumberlabel}>
                Phonenumber
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.PhoneNumberFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div>

            {/* <div
              className="input-container"
              style={
                inputFocus.UserNameFocus === true
                  ? { border: "1px solid #000000" }
                  : {}
              }
            >
              <input
                type="text"
                name="name"
                value={registerData.UserName}
                onChange={(e) => {
                  setRegisterData((prev) => {
                    return { ...prev, UserName: e.target.value };
                  });
                }}
                onFocus={() => {
                  setInputFocus((prev) => {
                    return { ...prev, UserNameFocus: true };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      usernamelabel: {
                        position: "absolute",
                        left: "1rem",
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                        top: "0.2rem",
                        fontSize: "10px",
                      },
                    };
                  });
                }}
                onBlur={() => {
                  setInputFocus((prev) => {
                    return { ...prev, UserNameFocus: false };
                  });
                  setlabelStyle((prev) => {
                    return {
                      ...prev,
                      usernamelabel: {
                        position: "absolute",
                        top: `${registerData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${registerData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label for="name" style={labelStyle.usernamelabel}>
                Username
              </label>
              <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.UserNameFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              />
            </div> */}

            <div className="flex items-center gap-[0.2rem] mt-[1rem]">
              <Checkbox
                sx={{
                  color: orange[800],
                  "&.Mui-checked": {
                    color: orange[600],
                  },
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p className="text-[.9rem] text-[#090A0B]">
                Save your Login Details for future <br /> attempts
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
            {/* <p className="text-center mt-[0.8rem] text-[0.8rem]">
              Have an account?{" "}
              <Link to="/login">
                <span className="font-generalsans-semiBold text-accent1">
                  Login here.
                </span>
              </Link>
            </p> */}
          </form>
        </div>
      </div>
      <div className="hidden sm:block bg-white right-[8rem] py-[1rem] px-[1rem] border border-[#E3E3E3] rounded-[1rem]">
        <h2 className="text-[1.3rem] leading-tight font-roboto-regular text-[#090A0B]">
          Create your Login Credential
        </h2>
        <p className="mt-[1rem] text-[#767E93] text-[0.8rem]">
          Please enter your credential to log into your account.
        </p>

        <form className="mt-[1.5rem]" onSubmit={RegisterHandler}>
          <div
            className="input-container"
            style={
              inputFocus.SurnameFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.LastName}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, LastName: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, SurnameFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    firstnamelabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, SurnameFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    firstnamelabel: {
                      position: "absolute",
                      top: `${registerData.Surname ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.Surname ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.firstnamelabel}>
              Surname
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.Surname === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>

          {/* lastname label */}
          <div
            className="input-container"
            style={
              inputFocus.FirstNameFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.FirstName}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, FirstName: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, FirstNameFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    lastnamelabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, FirstNameFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    lastnamelabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.lastnamelabel}>
              First Name
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.emailFocus === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>
          {/* other name label */}
          <div
            className="input-container"
            style={
              inputFocus.OtherNameFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.OtherName}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, OtherName: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, OtherNameFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    othernamelabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, OtherNameFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    othernamelabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.othernamelabel}>
              Other Name
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.OtherNameFocus === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>
          {/* date of birth label */}
          <div
            className="input-container"
            style={
              inputFocus.BirthDateFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="date"
              name="name"
              value={registerData.Dob}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, Dob: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, BirthDateFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    dateofbirthlabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, BirthDateFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    dateofbirthlabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.dateofbirthlabel}>
              Date of birth
            </label>
            {/* <img
                src={scan}
                alt=""
                className="w-[20px] absolute right-[1rem] cursor-pointer"
                style={
                  inputFocus.BirthDateFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
              /> */}
          </div>
          <div
            className="input-container"
            style={
              inputFocus.emailFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.email}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, Email: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, emailFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    emailLabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, emailFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    emailLabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.emailLabel}>
              Phone number/Email Address
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.emailFocus === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>
          <div
            className="input-container"
            style={
              inputFocus.passwordFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type={showPassword.showPassword1 ? "text" : "password"}
              name="password"
              value={registerData.password}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, passwordFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    passwordLabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, passwordFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    passwordLabel: {
                      position: "absolute",
                      top: `${registerData.password ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.password ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.passwordLabel}>
              Password
            </label>
            {showPassword.showPassword1 ? (
              <PiEye
                className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                style={
                  inputFocus.passwordFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
                onClick={() => {
                  setShowPassword((prev) => {
                    return { ...prev, showPassword1: false };
                  });
                }}
              />
            ) : (
              <PiEyeSlash
                className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                style={
                  inputFocus.passwordFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
                onClick={() => {
                  setShowPassword((prev) => {
                    return { ...prev, showPassword1: true };
                  });
                }}
              />
            )}
          </div>
          <div
            className="input-container"
            style={
              inputFocus.confirmPasswordFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type={showPassword.showPassword2 ? "text" : "password"}
              name="name"
              value={registerData.confirmPassword}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, confirmPasswordFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    confirmPasswordLabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, confirmPasswordFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    confirmPasswordLabel: {
                      position: "absolute",
                      top: `${registerData.confirmPassword ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${
                        registerData.confirmPassword ? "10px" : "16px"
                      }`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.confirmPasswordLabel}>
              Confirm Password
            </label>
            {showPassword.showPassword2 ? (
              <PiEye
                className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                style={
                  inputFocus.confirmPasswordFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
                onClick={() => {
                  setShowPassword((prev) => {
                    return { ...prev, showPassword2: false };
                  });
                }}
              />
            ) : (
              <PiEyeSlash
                className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                style={
                  inputFocus.confirmPasswordFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
                onClick={() => {
                  setShowPassword((prev) => {
                    return { ...prev, showPassword2: true };
                  });
                }}
              />
            )}
          </div>
          <div
            className="input-container"
            style={
              inputFocus.GenderFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.Gender}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, Gender: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, GenderFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    genderlabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, GenderFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    genderlabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.genderlabel}>
              Gender
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.GenderFocus === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>
          <div
            className="input-container"
            style={
              inputFocus.PhoneNumberFocus === true
                ? { border: "1px solid #000000" }
                : {}
            }
          >
            <input
              type="text"
              name="name"
              value={registerData.PhoneNumber}
              onChange={(e) => {
                setRegisterData((prev) => {
                  return { ...prev, PhoneNumber: e.target.value };
                });
              }}
              onFocus={() => {
                setInputFocus((prev) => {
                  return { ...prev, PhoneNumberFocus: true };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    phonenumberlabel: {
                      position: "absolute",
                      left: "1rem",
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                      top: "0.2rem",
                      fontSize: "10px",
                    },
                  };
                });
              }}
              onBlur={() => {
                setInputFocus((prev) => {
                  return { ...prev, PhoneNumberFocus: false };
                });
                setlabelStyle((prev) => {
                  return {
                    ...prev,
                    phonenumberlabel: {
                      position: "absolute",
                      top: `${registerData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${registerData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label for="name" style={labelStyle.phonenumberlabel}>
              Phonenumber
            </label>
            <img
              src={scan}
              alt=""
              className="w-[20px] absolute right-[1rem] cursor-pointer"
              style={
                inputFocus.PhoneNumberFocus === false
                  ? { opacity: "0.5" }
                  : { opacity: "1" }
              }
            />
          </div>

          <div className="flex items-center gap-[0.2rem] mt-[1rem]">
            <Checkbox
              sx={{
                color: orange[800],
                "&.Mui-checked": {
                  color: orange[600],
                },
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p className="text-[.7rem] text-[#090A0B]">
              Save your Login Details for future attempts
            </p>
          </div>
          <Button
            text="Continue"
            background="#F58220"
            style={{
              marginTop: "3rem",
              borderRadius: "1rem",
              fontFamily: "GeneralSans-SemiBold",
            }}
            height="60px"
          />
          <p className="text-center mt-[0.8rem] text-[0.8rem]">
            Have an account?{" "}
            <Link to="/login">
              <span className="font-generalsans-semiBold text-accent1">
                Login here.
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
