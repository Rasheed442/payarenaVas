import React, { useState, useEffect, useRef, useContext } from "react";
import backgroundImg1 from "../assets/images/l1.png";
import backgroundImg2 from "../assets/images/l2.jpeg";
import backgroundImg3 from "../assets/images/l3.jpeg";
import backgroundImg4 from "../assets/images/l4.jpeg";
import ActiveBackgroundMarker from "../components/bits/ActiveBackgroundMarker";
import people from "../assets/icons/people.svg";
import iconDivider from "../assets/icons/iconDivider.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  catalogActions,
  catalogSelector,
} from "../store/services/catalog/catalog.service";
// import { getCatalog } from "../store/api/catalog/getCatalog";
import { icons } from "../assets/svg/landingIcons";
import styled from "styled-components";
import "./Landing.css";
import Loader from "../components/Loader";
import { osName } from "react-device-detect";
import { FaArrowDown } from "react-icons/fa6";
import { toast } from "sonner";
import { countryContext } from "../context/CountryProvider";

const Landing = () => {

  const { countryCode } = useContext(countryContext);
  console.log("landing page", countryCode);
  const dispatch = useDispatch();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [backgroundIndex, setbackgroundIndex] = useState(0);
  const backgrounds = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
  ];

  const delay = 7000;
  const timeoutRef = useRef(null);
  // const storedCatalog = JSON.parse(sessionStorage.getItem("catalogs"));

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setbackgroundIndex((prevIndex) =>
          prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [backgroundIndex]);

  const { data, error, loading } = useSelector(catalogSelector);
  // useEffect(() => {
  //   if (storedCatalog === null) {
  //     dispatch(getCatalog(countryCode));
  //   }
  //   dispatch(getCatalog(countryCode));

  //   dispatch(catalogActions.setBiller(data[0]?.Merchants));
  // }, [dispatch, countryCode]);

  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const downloadAppHandler = () => {
    if (osName === "iOS") {
      window.location.href =
        "https://apps.apple.com/ng/app/payarena/id1637449009";
    } else if (osName === "Android") {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.unifiedpayment.payarena";
    } else {
      toast.error(
        "Visit payarena.com on a mobile browser to download the mobile app"
      );
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{
                transform: `translate3d(${-backgroundIndex * 100}%, 0, 0)`,
              }}
            >
              {backgrounds.map((background, idx) => (
                <div className="slide" key={idx}>
                  <img
                    src={background}
                    alt=""
                    className="w-screen h-screen object-cover sm:object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <ActiveBackgroundMarker
            currentIdx={backgroundIndex}
            backgroundLength={backgrounds}
          />
          <div className="contentContainer">
            <div className="content">
              <div className="heroTextContainer">
                {backgroundIndex == 0 && (
                  <>
                    <h1 className="text-white font-bold leading-[1.1] font-roboto">
                      Welcome to a world <br /> of more{" "}
                      <span className="hover:bg-accent1 bg-accent2 rounded-lg p-[0.2rem] px-[0.3rem] ">
                        Options
                      </span>
                    </h1>
                    <p className="text-white font-thin mt-[3%] text-lg font-generalsans-light">
                      Revolutionizing Mobile Payments: Seamlessly Innovative,{" "}
                      <br />
                      Incredibly Convenient!"
                    </p>
                  </>
                )}
                {backgroundIndex == 1 && (
                  <>
                    <h1 className="text-white font-bold leading-[1.4] font-roboto">
                      Unveil Infinite Shopping Excitement: <br /> Your{" "}
                      <span className="hover:bg-accent1 bg-accent2 rounded-lg p-[0.2rem] px-[0.3rem] ">
                        Ultimate Destination
                      </span>{" "}
                      For Everything <br /> You Need
                    </h1>
                    <p className="text-white font-thin mt-[3%] text-lg font-generalsans-light revo">
                      Revolutionizing Mobile Payments: Seamlessly Innovative,{" "}
                      <br />
                      Incredibly Convenient!"
                    </p>
                  </>
                )}
                {backgroundIndex == 2 && (
                  <>
                    <h1 className="text-white font-bold leading-[1.4] font-roboto">
                      Seamless Payments, Boundless <br />{" "}
                      <span className="hover:bg-accent1 bg-accent2 rounded-lg p-[0.2rem] px-[0.3rem] ">
                        Possibilities.
                      </span>
                    </h1>
                    <p className="text-white font-thin mt-[3%] text-lg font-generalsans-light revo">
                      Revolutionizing Mobile Payments: Seamlessly Innovative,{" "}
                      <br />
                      Incredibly Convenient!"
                    </p>
                  </>
                )}
                {backgroundIndex == 3 && (
                  <>
                    <h1 className="text-white leading-[1.4] font-roboto">
                      Where Trust Find Its <br />
                      <span className="hover:bg-accent1 bg-accent2 rounded-lg p-[0.2rem] px-[0.3rem] ">
                        Verification.{" "}
                      </span>
                    </h1>
                    <p className="text-white font-thin mt-[3%] text-lg font-generalsans-light revo">
                      Revolutionizing Mobile Payments: Seamlessly Innovative,{" "}
                      <br />
                      Incredibly Convenient!"
                    </p>
                  </>
                )}
              </div>
              <div className="actionsWrapper">
                <div className="bg-white actionContainer">
                  <div className="actionTexts">
                    <h3 className="heading">The Payarena Experience</h3>
                    <p className="empower">
                      Empower Your Mobile Experience: Cutting-edge Payment
                      Platform, Uniting Convenience and Innovation!
                    </p>
                  </div>
                  <div className="flex flex-1 items-center buttonsWrapper">
                    <PayIcon to="/payment/airtime_recharge">
                      {icons.pay}
                    </PayIcon>
                    <img src={iconDivider} alt="" className="iconDivider" />
                    <ShopIcon href="https://mall.payarena.com/" target="_blank">
                      {icons.shop}
                    </ShopIcon>
                    <img src={iconDivider} alt="" className="iconDivider" />
                    <VerifyIcon
                      href="https://payarenaverification.com/home"
                      target="_blank"
                    >
                      {icons.verify}
                    </VerifyIcon>
                  </div>
                </div>
                <div className="downloadAppContainer">
                  <DownloadIcon onClick={downloadAppHandler}>
                    <FaArrowDown />
                  </DownloadIcon>
                  <p className="font-normal text-white border-b py-2 px-2	text-xs mb-3 border-#ededed font-roboto downloadText">
                    Download Payarena Mobile
                  </p>

                  <img src={people} alt="" className="w-55 people" />
                  <p className="text-center text-[0.5rem] mt-1 text-white font-thin min-16:text-[0.7rem] users">
                    Used by 1K+ users <br /> around the Africa.
                  </p>
                </div>
                <div className="downloadMobile" onClick={downloadAppHandler}>
                  <DownloadIcon>
                    <FaArrowDown />
                  </DownloadIcon>
                  <p className="font-normal text-white border-b py-2 px-2	text-xs mb-3 border-#ededed font-roboto downloadText">
                    Download Payarena Mobile
                  </p>

                  <img src={people} alt="" className="w-55 people" />
                  <p className="text-center text-[0.5rem] mt-1 text-white font-thin min-16:text-[0.7rem] users">
                    Used by 1K+ users <br /> around the Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Landing;
const Container = styled.section`
  position: relative;
  .contentContainer {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;

    .content {
      .heroTextContainer {
        padding: 0 8rem;
        margin-bottom: 5rem;
        position: absolute;
        top: 40%;
        h1 {
          font-size: 3rem;
        }
        .revo {
          display: none;
        }
        /* .unveil {
        font-size: 1.7rem;
      } */
      }
      .actionsWrapper {
        display: flex;
        padding: 0 8rem;
        align-items: center;
        position: absolute;
        bottom: -3%;
        width: 100%;
        .actionContainer {
          display: flex;
          flex: 1;
          align-items: center;
          height: 170px;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          padding: 0 3rem;
          .actionTexts {
            flex: 0.5;
            .heading {
              font-weight: 600;
              color: #009bff;
              font-size: 1.4rem;
              margin-bottom: 1rem;
            }
            .empower {
              font-size: 0.8rem;
              /* width: 70%; */
            }
          }
          .buttonsWrapper {
            display: flex;
            flex: 1;
            gap: 3rem;
            justify-content: center;
          }
        }

        .downloadAppContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #009bff;
          width: 250px;
          height: 200px;
          border-top-right-radius: 1rem;
          border-bottom-right-radius: 1rem;
          /* padding: rem 0; */
        }
        .downloadMobile {
          display: none;
        }
      }
    }
  }

  //Mobile View Responsiveness//////////
  @media screen and (max-width: 550px) {
    .contentContainer {
      top: 50%;
      align-items: center;
      display: block;

      .content {
        margin-top: 50%;
        position: relative;
        width: 100%;
        height: 50%;
        .heroTextContainer {
          padding: 0 1.5rem;
          top: -5%;
          margin-bottom: 2rem;

          h1 {
            font-size: 2rem;
          }
          .unveil {
            font-size: 1rem;
          }
          p {
            font-size: 0.8rem;
            line-height: 1.3;
          }
          .revo {
            display: block;
            visibility: hidden;
            line-height: 1.3;
          }
        }
        .actionsWrapper {
          /* display: none; */
          padding: 0 1rem;
          flex-direction: column;
          gap: 10px;
          position: absolute;
          width: 100%;
          bottom: -3rem;
          .actionContainer {
            padding: 0rem;
            border-radius: 0.5rem;
            width: 100%;
            .actionTexts {
              display: none;
            }
            .buttonsWrapper {
              justify-content: space-around;
              padding: 0 20px;
              gap: 3px !important;
              .iconDivider {
                /* display: none; */
              }
            }
          }

          .downloadAppContainer {
            display: none;
          }
          .downloadMobile {
            background-color: #009bff;
            display: flex;
            height: 50px;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            border-radius: 10px;
            .downloadText {
              border: none;
              padding: 0;
              margin: 0;
            }
            .people {
              display: none;
            }
            .users {
              display: none;
            }
          }
        }
      }
    }
  }
  /////////////////////////////////////
  //Mini to Large Tablet View Responsiveness//////////
  @media screen and (min-width: 551px) and (max-width: 970px) {
    .contentContainer {
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: 100%;
      display: block;
      align-items: flex-end;

      .content {
        margin-top: 30%;
        /* width: 100%;
        height: 100%; */
        .heroTextContainer {
          padding: 0 1.5rem;
          margin-bottom: 2rem;

          h1 {
            font-size: 2.5rem;
          }
          .unveil {
            font-size: 1rem;
          }
          p {
            font-size: 0.8rem;
            line-height: 1.3;
          }
          .revo {
            display: block;
            visibility: hidden;
            line-height: 1.3;
          }
        }
        .actionsWrapper {
          position: absolute;
          bottom: 5%;
          /* display: none; */
          padding: 0 1rem;
          /* flex-direction: column; */
          gap: 0;
          .actionContainer {
            padding: 0rem;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
            width: 100%;
            .actionTexts {
              display: none;
            }
            .buttonsWrapper {
              justify-content: center;
              padding: 0 20px;
              gap: 10%;
            }
          }

          .downloadAppContainer {
            display: flex;
          }
          .downloadMobile {
            display: none;
            background-color: #009bff;
            height: 80px;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            border-radius: 10px;
            .downloadText {
              border: none;
              padding: 0;
              margin: 0;
            }
            .people {
              display: none;
            }
            .users {
              display: none;
            }
          }
        }
      }
    }
  }
  /////////////////////////////////////
  //Mini to Large Screen View Responsiveness//////////
  @media screen and (min-width: 971px) and (max-width: 1200px) {
    .contentContainer {
      margin: 0 auto;
      position: absolute;
      // top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: 100%;
      display: block;
      align-items: flex-end;

      .content {
        /* width: 100%;
        height: 100%; */
        margin-top: 50%;

        .heroTextContainer {
          padding: 0 3rem;
          margin-bottom: 2rem;

          h1 {
            font-size: 2.5rem;
          }
          .unveil {
            font-size: 1rem;
          }
          p {
            font-size: 1rem;
            line-height: 1.3;
          }
          .revo {
            display: block;
            visibility: hidden;
            line-height: 1.3;
          }
        }
        .actionsWrapper {
          /* display: none; */
          padding: 0 3rem;
          /* flex-direction: column; */
          gap: 0;
          .actionContainer {
            padding: 0 2rem;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
            width: 100%;
            .actionTexts {
              /* display: none; */
              .heading {
                font-weight: 600;
                color: #009bff;
                font-size: 1.2rem;
                margin-bottom: 1rem;
              }
              .empower {
                font-size: 0.7rem;
                /* width: 70%; */
              }
            }
            .buttonsWrapper {
              justify-content: center;
              padding: 0 20px;
              gap: 10%;
            }
          }

          .downloadAppContainer {
            display: flex;
          }
          .downloadMobile {
            display: none;
            background-color: #009bff;
            height: 80px;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            border-radius: 10px;
            .downloadText {
              border: none;
              padding: 0;
              margin: 0;
            }
            .people {
              display: none;
            }
            .users {
              display: none;
            }
          }
        }
      }
    }
  }
  /////////////////////////////////////

  @media screen and (min-width: 1610px) and (min-height: 890px) {
    .contentContainer {
      align-items: center;
      .content {
        .heroTextContainer {
          h1 {
            font-size: 4.5rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 2500px) and (min-height: 1300px) {
    .contentContainer {
      align-items: center;
      .content {
        .heroTextContainer {
          h1 {
            font-size: 6rem;
          }
        }
      }
    }
  }
`;

const VerifyIcon = styled.a`
  &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #008d30;
  }
  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 40px;
    }
  }
`;
const ShopIcon = styled.a`
  &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #f58220;
  }
  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 40px;
    }
  }
`;
const PayIcon = styled(Link)`
  &:hover svg path {
    transition: all 0.2s ease-in-out;
    fill: #009bff;
  }
  @media screen and (max-width: 390px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 391px) and (max-width: 480px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 481px) and (max-width: 1020px) {
    svg {
      width: 30px;
    }
  }
  @media screen and (min-width: 1021px) and (max-width: 1280px) {
    svg {
      width: 40px;
    }
  }
`;

const DownloadIcon = styled.div`
  display: flex;
  height: 55px;
  width: 55px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    color: #009bff;
  }

  &:hover {
    background-color: transparent;
    border: 3px solid #fff;

    svg {
      color: #fff;
    }
  }
  @media screen and (max-width: 550px) {
    height: 20px;
    width: 20px;
  }
`;

// const DownloadSection = styled.div``;
