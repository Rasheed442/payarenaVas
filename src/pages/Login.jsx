import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import line1 from "../assets/images/line1.png";
import line2 from "../assets/images/line2.png";
import line3 from "../assets/images/line3.png";
import styled from "styled-components";
import "./Login.css";
import scan from "../assets/icons/scan.svg";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import Checkbox from "@mui/material/Checkbox";
import { orange } from "@mui/material/colors";
import Button from "../components/bits/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/api/auth/login";
import { loginSelector, clearState } from "../store/services/auth/login";
import { isEmail } from "../helpers/formValidator";
import { TailSpin } from "react-loader-spinner";
import { useProfile } from "../context/ProfileProvider";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputFocus, setInputFocus] = useState({
    emailFocus: false,
    passwordFocus: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const { setProfileFirstName, setProfileLastName,setProfilePic } = useProfile();

  const [labelStyle, setlabelStyle] = useState({
    emailLabel: {
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
  });

  const { authenticating, userData, authenticated } =
    useSelector(loginSelector);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isEmail(loginData.email) && loginData.password) {
      dispatch(loginUser(loginData));
    }
  };

  useEffect(() => {
    if (userData?.Success) {
      localStorage.setItem("token", userData?.Data?.access_token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(userData?.Data?.userProfile)
      );
      setProfileFirstName(userData?.Data?.userProfile?.FirstName);
      setProfileLastName(userData?.Data?.userProfile?.Surname);
      setProfilePic(userData?.Data?.userProfile?.ProfilePhoto);
      navigate("/dashboard");
    } else {
    }
  }, [userData]);

  // Load email and password from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedEmail && storedPassword) {
      setLoginData((prev) => {
        return { ...prev, email: storedEmail };
      });
      const decryptedPassword = decryptPassword(storedPassword);
      setLoginData((prev) => {
        return { ...prev, password: decryptedPassword };
      });
      setRememberMe(true);
    }
  }, []);

  // Save email and password to localStorage when "Remember Me" is checked
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", loginData.email);
      const encryptedPassword = encryptPassword(loginData.password);
      localStorage.setItem("rememberedPassword", encryptedPassword);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, [rememberMe, loginData.email, loginData.password]);

  const encryptPassword = (value) => {
    return CryptoJS.AES.encrypt(value, "secretkey123").toString();
  };

  const decryptPassword = (encryptedValue) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, "secretkey123");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return (
    <div className="py-[9rem] mb-[20rem] sm:px-[1.5rem] sm:mb-[1rem] sm:py-0 sm:pt-[9rem]">
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
            Sign into your
          </p>
          <h2 className="text-[2.5rem] leading-tight text-white font-roboto min-16:text-[4rem]  md:text-[2rem] ">
            Payarena Payment <br /> Account
          </h2>
          {/* <p className="text-[.7rem] text-white mt-[1rem] min-16:text-[1.2rem]">
            Lorem Ipsum is simply dummy text of the printing <br /> and
            typesetting industry. Lorem Ipsum has been <br /> the industry's
            standard dummy text ever since <br /> the 1500s,
          </p> */}
        </div>
        <div className="bg-white absolute top-0 right-[8rem] py-[6rem] px-[3rem] border-b border-l border-r border-[#E3E3E3] rounded-b-[1rem] md:right-2 min-16:right-[20rem] min-imac:right-[46rem]">
          <h2 className="text-[1.8rem] leading-tight font-roboto-regular">
            Enter your <br /> Login Credential
          </h2>
          <p className="mt-[1rem] text-[#767E93]">
            Please enter your credential to log into your <br /> account.
          </p>

          <form className="mt-[1.5rem]" onSubmit={handleLogin}>
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
                placeholder=" "
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((prev) => {
                    return { ...prev, email: e.target.value };
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
                        top: `${loginData.email ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${loginData.email ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label
                for="name"
                style={{
                  ...labelStyle.emailLabel,
                  ...(loginData.email || inputFocus.emailFocus
                    ? { top: "0", fontSize: "10px" }
                    : {top: "0", fontSize: "12px"}),
                }}
              >
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
                type={showPassword ? "text" : "password"}
                name="name"
                placeholder=" "
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((prev) => {
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
                        top: `${loginData.password ? "0.2rem" : "25%"}`,
                        left: "1rem",
                        fontSize: `${loginData.password ? "10px" : "16px"}`,
                        color: "#afb4c0",
                        pointerEvents: "none",
                        transition: "all 0.5s ease-in-out",
                      },
                    };
                  });
                }}
              />
              <label
                for="name"
                style={{
                  ...labelStyle.passwordLabel,
                  ...(loginData.password || inputFocus.passwordFocus
                    ? { top: "0", fontSize: "12px" }
                    : {top: "0", fontSize: "12px"}),
                }}
              >
                Password
              </label>
              {showPassword ? (
                <PiEye
                  className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                  style={
                    inputFocus.passwordFocus === false
                      ? { opacity: "0.5" }
                      : { opacity: "1" }
                  }
                  onClick={() => {
                    setShowPassword(false);
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
                    setShowPassword(true);
                  }}
                />
              )}
            </div>
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-accent1 font-generalsans-semiBold text-[.9rem]"
              >
                Forgot Password?
              </Link>
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
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <p className="text-[13px] font-medium text-[#090A0B]">
                Save your Login Details for future <br /> attempts
              </p>
            </div>
            <Button
              text={
                authenticating ? (
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
              Don’t have an account?{" "}
              <Link to="/register">
                <span className="font-generalsans-semiBold text-accent1">
                  Sign up here.
                </span>
              </Link>
            </p> */}
          </form>
        </div>
      </div>
      <div className="hidden sm:block bg-white p-[1rem] border border-[#E3E3E3] rounded-[1rem]">
        <h2 className="text-[1.3rem] leading-tight font-roboto-regular">
          Enter your Login Credential
        </h2>
        <p className="mt-[1rem] text-[#767E93] text-[0.8rem]">
          Please enter your credential to log into your <br /> account.
        </p>

        <form className="mt-[1.5rem]" onSubmit={handleLogin}>
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
              placeholder=" "
              value={loginData.email}
              onChange={(e) => {
                setLoginData((prev) => {
                  return { ...prev, email: e.target.value };
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
                      top: `${loginData.email ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${loginData.email ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label
              for="name"
              style={{
                ...labelStyle.emailLabel,
                ...(loginData.email || inputFocus.emailFocus
                  ? { top: "0", fontSize: "10px" }
                  : {}),
              }}
            >
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
              type={showPassword ? "text" : "password"}
              name="name"
              placeholder=" "
              value={loginData.password}
              onChange={(e) => {
                setLoginData((prev) => {
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
                      top: `${loginData.password ? "0.2rem" : "25%"}`,
                      left: "1rem",
                      fontSize: `${loginData.password ? "10px" : "16px"}`,
                      color: "#afb4c0",
                      pointerEvents: "none",
                      transition: "all 0.5s ease-in-out",
                    },
                  };
                });
              }}
            />
            <label
              for="name"
              style={{
                ...labelStyle.passwordLabel,
                ...(loginData.password || inputFocus.passwordFocus
                  ? { top: "0", fontSize: "10px" }
                  : {}),
              }}
            >
              Password
            </label>
            {showPassword ? (
              <PiEye
                className="w-[20px] absolute right-[1rem] cursor-pointer z-[0]"
                style={
                  inputFocus.passwordFocus === false
                    ? { opacity: "0.5" }
                    : { opacity: "1" }
                }
                onClick={() => {
                  setShowPassword(false);
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
                  setShowPassword(true);
                }}
              />
            )}
          </div>
          <div className="flex justify-end">
            <Link
              to="/reset-password"
              className="text-accent1 font-generalsans-semiBold text-[.9rem]"
            >
              Forgot Password?
            </Link>
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <p className="text-[.7rem] text-[#090A0B]">
              Save your Login Details for future attempts
            </p>
          </div>
          <Button
            text={
              authenticating ? (
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
          <p className="text-center mt-[0.8rem] text-[0.8rem]">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="font-generalsans-semiBold text-accent1">
                Sign up here.
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
