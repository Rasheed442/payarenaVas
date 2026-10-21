/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import navigation from "../helpers/paymentnavpath";
import { Link, useLocation, useParams } from "react-router-dom";
import { getCatalog } from "../store/api/catalog/getCatalog";
import { useDispatch, useSelector } from "react-redux";
import { catalogActions } from "../store/services/catalog/catalog.service";
import { motion, AnimatePresence } from "framer-motion";
import { unknownSvg } from "../helpers/paymentnavpath";

const PaymentNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const data =
    JSON.parse(sessionStorage.getItem("catalogs")) === null
      ? []
      : JSON.parse(sessionStorage.getItem("catalogs"));

  // console.log(data, "hjk");

  //const neededData1 = data?.filter((obj) => obj.Merchants.length !== 0);
  const neededData1 = data;
  /*   const neededData = neededData1?.filter(
    (obj) => obj.Name !== "Unified Money Transfer"
  ); */
  const neededData = neededData1;

  ///GET DATA AND FORMAT DATA INTO AN ARRAY THAT CARRIES RESPECTIVE ICON
  const formattedData = neededData
    .filter((service) => navigation.some((icon) => icon.name === service.Name))
    .map((service) => {
      const foundArr = navigation.find((icon) => icon.name === service.Name);
      // const neededArr = foundArr.filter((obj) => obj.Merchants.length === 0);
      return { ...service, icon: foundArr.icon, path: foundArr.path };
    });
  localStorage.setItem("formattedData", JSON.stringify(formattedData));
  const mappedData = neededData?.map((product) => {
    const preparedMatch = navigation.find(
      (item) => item?.name === product?.Name
    );

    if (preparedMatch) {
      return { ...product, icon: preparedMatch.icon };
    } else {
      return {
        ...product,
        icon: unknownSvg,
      };
    }
  });

  let mainData, moreData;

  if (mappedData?.length > 9) {
    mainData = mappedData.slice(0, 8);
    moreData = mappedData.slice(8);
  } else {
    mainData = mappedData;
    moreData = [];
  }
  // console.log(mappedData);
  const nameToPathConverter = (string) => {
    if (string.includes("&")) {
      return string
        .toLowerCase()
        .replace(/\s+&\s+/g, "_")
        .replace("&", "")
        .replace(/\s+/g, "");
    } else if (string.includes(" ")) {
      return string.split(" ").join("_").toLowerCase();
    } else if (string.includes("/")) {
      return string.split("/").join("_").toLowerCase();
    } else {
      return string.toLowerCase();
    }
  };

  const setBillerHandler = (payload) => {
    dispatch(catalogActions.setBiller(payload));
  };

  const handleMoreButtonClick = () => {
    if (moreData.length === 0) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const editedCatalogArr = [...formattedData, ...moreData];

  useEffect(() => {
    localStorage.setItem("neededData", JSON.stringify(neededData));

    dispatch(catalogActions.setEditedData(editedCatalogArr));
    const currCatalog = editedCatalogArr.filter((data) => {
      return data.path === `/payment/${paymenttype}`;
    });
    dispatch(catalogActions.setBiller(currCatalog[0]?.Merchants));
  }, []);

  const { paymenttype } = useParams();
  const jkk = paymenttype?.replace(/_/g, " ");
  const newData2 = mainData?.find(
    (item) =>
      item?.Name?.replace(/[^a-zA-Z0-9 ]/g, " ")
        .toLowerCase()
        .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "") ===
      jkk.toLowerCase().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
  );
  // console.log(newData2, "kslss");
  return (
    <>
      <Wrapper className="w-100 bg-footer px-[8rem] h-[130px] py-[1.4rem]  sm:hidden">
        <div className="flex items-center justify-between sticky top-[-1px] z-[1] sm:overflow-scroll sm:px-[1rem] md:px-[1.5rem] max-w-[1440px] mx-auto">
          {mainData?.map((nav) => {
            return (
              <Link
                key={nav.id}
                to={nameToPathConverter(nav?.Name)}
                onClick={() => {
                  setBillerHandler(nav?.Merchants);
                  dispatch(catalogActions.setSelectedPayment(nav?.Name));
                  setIsOpen(false);
                  console.log(nav, "sns");
                }}
              >
                <div
                  className={`flex flex-col items-center cursor-pointer text-white hover:text-accent1 h-[90px] w-[90px] justify-around relative pb-2 ${
                    location.pathname ===
                    `/payment/${nameToPathConverter(nav.Name)}`
                      ? "active"
                      : ""
                  }`}
                >
                  <div>{nav.icon}</div>
                  <p className="text-[.8rem] text-center w-[100%] leading-tight">
                    {nav?.Name}
                  </p>
                </div>
              </Link>
            );
          })}
          <MoreButton
            onClick={handleMoreButtonClick}
            disabled={moreData.length === 0}
            className="disabled:cursor-not-allowed"
            $moreDataLength={moreData.length}
          >
            <div
              className={
                moreData.length === 0
                  ? "flex flex-col items-center cursor-pointer text-[#aeaeae] h-[90px] w-[90px] justify-around relative pb-2"
                  : `flex flex-col items-center cursor-pointer text-white hover:text-accent1 h-[90px] w-[90px] justify-around relative pb-2`
              }
            >
              <div>
                <svg
                  width="35"
                  height="8"
                  viewBox="0 0 35 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  $moreDataLength={moreData.length}
                >
                  <circle
                    cx="4.5"
                    cy="4"
                    r="4"
                    fill={moreData.length === 0 ? "#aeaeae" : "white"}
                  />
                  <circle
                    cx="17.5"
                    cy="4"
                    r="4"
                    fill={moreData.length === 0 ? "#aeaeae" : "white"}
                  />
                  <circle
                    cx="30.5"
                    cy="4"
                    r="4"
                    fill={moreData.length === 0 ? "#aeaeae" : "white"}
                  />
                </svg>
              </div>
              <p className="text-[.8rem] text-center w-[100%] leading-tight">
                More
              </p>
            </div>
          </MoreButton>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="bg-white absolute shadow-more-products p-[2rem] rounded-[1rem] bottom-[-325px] h-350px max-h-[350px] overflow-y-scroll"
                key="moreOption"
                whileHover={{ scale: 1.02 }}
                initial={{
                  right: "-100%",
                  display: "none",
                }}
                animate={{
                  right: "4%",
                  display: "block",
                }}
                exit={{
                  right: "-100%",
                }}
                transition={{ duration: 0.5 }}
                transitionEnd={{
                  display: "none",
                }}
              >
                <MoreWrapper className="flex flex-col gap-[2rem]">
                  {moreData?.map((data) => {
                    return (
                      <Link
                        to={nameToPathConverter(data?.Name)}
                        className=""
                        onClick={() => {
                          setBillerHandler(data.Merchants);
                          dispatch(
                            catalogActions.setSelectedPayment(data?.Name)
                          );
                          setIsOpen(false);
                        }}
                      >
                        {/* <li>{data?.Name}</li> */}
                        <div className="flex gap-[1rem] hover:text-accent1">
                          <p>{data?.icon}</p>
                          <p className="text-[.8rem]">{data?.Name}</p>
                        </div>
                      </Link>
                    );
                  })}
                </MoreWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Wrapper>
      <Wrapper className="w-100 bg-footer px-[8rem] py-[1.4rem]  items-center justify-between sticky top-[-1px] z-[10000] sm:overflow-scroll sm:px-[1rem] md:px-[1.5rem] hidden sm:flex gap-[0.8rem]">
        {mappedData.map((nav) => {
          return (
            <Link
              key={nav.id}
              to={nameToPathConverter(nav.Name)}
              onClick={() => {
                setBillerHandler(nav.Merchants);
                dispatch(catalogActions.setSelectedPayment(nav?.Name));
              }}
            >
              <div
                className={`flex flex-col items-center cursor-pointer text-white hover:text-accent1 h-[80px] w-[80px] justify-around relative pb-2 ${
                  location.pathname ===
                  `/payment/${nameToPathConverter(nav.Name)}`
                    ? "active"
                    : ""
                }`}
              >
                <div>{nav.icon}</div>
                <p className="text-[.6rem] text-center w-[100%] leading-tight">
                  {nav.Name}
                </p>
              </div>
            </Link>
          );
        })}
        {/* <button onClick={handleMoreButtonClick}>
          <div
            className={`flex flex-col items-center cursor-pointer text-white hover:text-accent1 h-[90px] w-[90px] justify-around relative pb-2`}
          >
            <div>
              <svg
                width="35"
                height="8"
                viewBox="0 0 35 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4.5" cy="4" r="4" fill="white" />
                <circle cx="17.5" cy="4" r="4" fill="white" />
                <circle cx="30.5" cy="4" r="4" fill="white" />
              </svg>
            </div>
            <p className="text-[.8rem] text-center w-[100%] leading-tight">
              More
            </p>
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="bg-white absolute shadow-more-products p-[2rem] rounded-[1rem] bottom-[-350px]"
              key="moreOption"
              whileHover={{ scale: 1.02 }}
              initial={{
                right: "-100%",
                display: "none",
              }}
              animate={{
                right: "4%",
                display: "block",
              }}
              exit={{
                right: "-100%",
              }}
              transition={{ duration: 0.5 }}
              transitionEnd={{
                display: "none",
              }}
            >
              <ul className="flex flex-col gap-[1.4rem]">
                {moreData?.map((data) => {
                  return (
                    <Link
                      to={data?.path}
                      className=""
                      onClick={() => {
                        setBillerHandler(data.Merchants);
                        setIsOpen(false);
                      }}
                    >
                      <li>{data?.Name}</li>
                    </Link>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence> */}
      </Wrapper>
    </>
  );
};

export default PaymentNav;
const Wrapper = styled.section`
  a,
  button {
    div {
      &:hover svg path,
      &:hover svg circle {
        /* fill: ${(props) =>
          props.$moreDataLength === 0 ? "#aeaeae" : "#f58220"}; */
        fill: #f58220;
      }

      p {
        transition: all 0.15s ease-in-out;
      }
      div {
        svg {
          width: 30px;
          height: 30px;
          path,
          circle {
            transition: all 0.15s ease-in-out;
          }
        }
      }
    }
    .active {
      border-bottom: 2px solid #f58220;
      svg path,
      svg circle {
        fill: #f58220;
      }

      p {
        transition: all 0.15s ease-in-out;
        color: #f58220;
      }
      div {
        svg {
          width: 30px;
          path,
          circle {
            transition: all 0.15s ease-in-out;
          }
        }
      }
    }
  }
  a {
    div {
      div {
        svg {
          fill: #ffffff;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    a,
    button {
      div {
        div {
          svg {
            width: 20px;
          }
        }
      }
    }
  }
`;

const MoreWrapper = styled.div`
  &:hover {
    a {
      div {
        /* p {
          transition: all 0.15s ease-in-out;
          color: #f58220;
        } */
      }
    }
  }
  a {
    div {
      p {
        svg {
          width: 20px;
          height: 20px;
          fill: #000000;
          path {
            fill: #000000;
          }
          circle {
            fill: #000000;
          }
        }
      }
    }
  }
`;

const MoreButton = styled.button`
  div {
    &:hover svg path,
    &:hover svg circle {
      fill: ${(props) =>
        props.$moreDataLength === 0 ? "#aeaeae !important" : "#f58220"};
      /* fill: #f58220; */
    }

    p {
      transition: all 0.15s ease-in-out;
    }
    div {
      svg {
        width: 30px;
        height: 30px;
        path,
        circle {
          transition: all 0.15s ease-in-out;
        }
      }
    }
  }
`;
