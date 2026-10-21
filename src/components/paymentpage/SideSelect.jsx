import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogActions,
  catalogSelector,
} from "../../store/services/catalog/catalog.service";
import unknownIcon from "../../assets/icons/unknownIcon.svg";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import navigation from "../../helpers/paymentnavpath";
import { useNavigate } from "react-router-dom";

const SideSelect = ({ selectedNetwork, setSelectedNetwork }) => {
  const [billerConverter, setBillerConverter] = useState(null);
  const [converter, setConverter] = useState([]);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { paymenttype } = useParams();
  const { billertype } = useParams();
  const { billerData, editedCatalog, selectedBiller } =
    useSelector(catalogSelector);
  const iconRegex = /^images\/logos\/$/;

  const height = billerData?.length * 100 + "px";
  let count = 0;

  // useEffect(() => {
  // console.log("🚀 ~ billerData:", billerData);
  //   billerData?.length > 0
  //     ? dispatch(catalogActions.setSelectedBiller(billerData[0]?.Name))
  //     : null;
  // }, []);

  const isUrl = (str) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return urlPattern.test(str);
  };
  const currBiller = billerData?.find(
    (biller) => biller.Name === selectedBiller
  );
  // console.log(currBiller);
  const checkUrl = isUrl(currBiller?.Url);
  // console.log(checkUrl);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [curB, setCurB] = useState("");
  // console.log("🚀 ~ SideSelect ~ curB:", curB);

  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };
  // console.log("🚀 ~ currBiller:", currBiller);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // useEffect(() => {
  //   const storedData = sessionStorage.getItem("catalogs");
  //   if (storedData) {
  //     setLoading(false);
  //   }
  // }, []);

  // for the redirection pathname
  let data =
    JSON.parse(sessionStorage.getItem("catalogs")) === null
      ? []
      : JSON.parse(sessionStorage.getItem("catalogs"));
  // console.log(data);
  if (data.length === 0) {
    while (data.length === 0 && count < 15) {
      setTimeout(() => {
        data = sessionStorage.getItem("catalogs");
        // console.log(data);
      }, 2000);
      count++;
    }
  }
  // console.log(data);

  const neededData1 = data?.filter((obj) => obj.Merchants.length !== 0);

  const neededData = neededData1?.filter(
    (obj) => obj.Name !== "Unified Money Transfer"
  );

  ///GET DATA AND FORMAT DATA INTO AN ARRAY THAT CARRIES RESPECTIVE ICON
  const formattedData = neededData
    .filter((service) =>
      navigation?.some((icon) => icon?.name === service?.Name)
    )
    .map((service) => {
      const foundArr = navigation?.find((icon) => icon?.name === service?.Name);
      // const neededArr = foundArr.filter((obj) => obj.Merchants.length === 0);
      return { ...service, icon: foundArr?.icon, path: foundArr?.path };
    });
  localStorage.setItem("formattedData", JSON.stringify(formattedData));

  const mappedData = neededData?.map((product) => {
    const preparedMatch = navigation?.find(
      (item) => item?.name === product?.Name
    );
    if (preparedMatch) {
      return { ...product, icon: preparedMatch?.icon };
    } else {
      // return {
      //   ...product,
      //   icon: unknownSvg,
      // };
    }
  });
  // console.log(neededData);

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

  // console.log(neededData?.map((item) => item?.Merchants?.map((ig) => ig?.Url)));

  const billerService = neededData?.map((n) => {
    return nameToPathConverter(n?.Name);
  });
  // console.log(billerService);

  // const merchants = neededData?.Merchants.map((m) => {
  //   console.log(m);
  // });

  useEffect(() => {
    // Initialize variables for converter and billerConverter
    const newConverter = [];
    let newBillerConverter = null;

    neededData.forEach((p) => {
      const convertedName = `/payment/${nameToPathConverter(p?.Name)}`;
      if (location.pathname === convertedName) {
        newConverter.push(p);
        newBillerConverter = convertedName;
      }
    });

    // Update states after loop is done
    setConverter(newConverter);
    setBillerConverter(newBillerConverter);
    setCurB(location.pathname.split("/")[3]);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    setCurB(location.pathname.split("/")[3]);
  }, [location.pathname.split("/")[3]]);

  // dispatch(catalogActions.setSelectedBiller(curB.toLocaleUpperCase()));
  // dispatch(catalogActions.toggleBillerisLink(false));

  // Log the state hook after it's updated
  // console.log("Name state:", billerConverter);
  // console.log("location.pathname:", location.pathname); // Debugging info
  // console.log("location.pathname:"); // Debugging info

  // console.log(converter);

  let mainData, moreData;

  if (mappedData?.length > 9) {
    mainData = mappedData.slice(0, 8);
    moreData = mappedData.slice(8);
  } else {
    mainData = mappedData;
    moreData = [];
  }

  const jkk = paymenttype?.replace(/_/g, " ");

  const newData2 = mainData?.find(
    (item) =>
      item?.Name?.replace(/[^a-zA-Z0-9 ]/g, " ")
        .toLowerCase()
        .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "") ===
      jkk.toLowerCase().replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
  );

  const biller = decodeURI(billertype);
  const newData = billerData?.find(
    (item) => item?.Name?.toLocaleLowerCase() === biller?.toLocaleLowerCase()
  );
  useEffect(() => {
    // setBillerHandler(newData2?.Merchants);
    // console.log("ksls", newData2?.Name);
    dispatch(catalogActions.setSelectedPayment(newData2?.Name));

    dispatch(catalogActions?.setSelectedBiller(newData?.Name));
    //setBillerHandler(newData?.Merchants);
    dispatch(catalogActions?.toggleBillerisLink(false));
    // console.log(newData, "ksls");

    localStorage.setItem(
      "submittedData",
      JSON.stringify({
        ProductId: "",
        Amount: "",
        VendorParameterValue: "",
        EmailAddress: "",
        ReferrerEmailAddress: "",
      })
    );
  }, [newData]);

  // if (data.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Wrapper $height={height}>
        <ProgressBar></ProgressBar>
        <div className="flex flex-col py-[0rem] absolute left-[0]">
          {billerData?.map((data) => {
            return (
              <>
                {isUrl(data?.Url) ? (
                  <a
                    href={data?.Url}
                    target="_blank"
                    onClick={() => {
                      fetching();
                      // dispatch(catalogActions.toggleBillerisLink(true));
                      // dispatch(catalogActions.setSelectedBiller(""));
                      localStorage.setItem(
                        "submittedData",
                        JSON.stringify({
                          ProductId: "",
                          Amount: "",
                          VendorParameterValue: "",
                          EmailAddress: "",
                          ReferrerEmailAddress: "",
                        })
                      );
                    }}
                  >
                    {/* <Network key={data.Name}>
                      <div
                        className={
                          selectedBiller === data.Name ? "light" : "dark"
                        }
                      ></div>

                      <div className="flex items-center gap-[1.3rem]">
                        <img
                          src={
                            iconRegex.test(data?.Logo)
                              ? unknownIcon
                              : `${import.meta.env.VITE_BASE_URL}app/${
                                  data.Logo
                                }`
                          }
                          alt={`${data.Name}`}
                          className="w-[40px]"
                        />
                        <p
                          className={`text-[.7rem] ${
                            selectedBiller === data.Name
                              ? "text-[#000000] font-generalsans-semiBold"
                              : "text-[#667085] font-generalsans-medium"
                          }`}
                        >
                          {data.Name}
                        </p>
                      </div>
                    </Network> */}
                  </a>
                ) : (
                  <Network
                    key={data.Name}
                    onClick={(e) => {
                      console.log(
                        "🚀 ~ {billerData?.map ~ e.target:",
                        e.target.innerHTML
                      );

                      dispatch(catalogActions.setSelectedBiller(data.Name));
                      dispatch(catalogActions.toggleBillerisLink(false));
                      console.log(data, "ksls");

                      localStorage.setItem(
                        "submittedData",
                        JSON.stringify({
                          ProductId: "",
                          Amount: "",
                          VendorParameterValue: "",
                          EmailAddress: "",
                          ReferrerEmailAddress: "",
                        })
                      );
                    }}
                  >
                    <div
                      className={
                        selectedBiller === data.Name ? "light" : "dark"
                      }
                    ></div>

                    <div
                      // onClick={() => {
                      //   navigate(
                      //     `${location.pathname}/${data?.Name?.toLowerCase()}`
                      //   );
                      // }}
                      className="flex items-center gap-[1.3rem]"
                    >
                      <img
                        src={
                          iconRegex.test(data?.Logo)
                            ? unknownIcon
                            : `${import.meta.env.VITE_BASE_URL}app/${data.Logo}`
                        }
                        alt={`${data.Name}`}
                        className="w-[40px]"
                      />
                      <p
                        className={`text-[.7rem] ${
                          selectedBiller === data.Name
                            ? "text-[#000000] font-generalsans-semiBold"
                            : "text-[#667085] font-generalsans-medium"
                        }`}
                      >
                        {data.Name}
                      </p>
                    </div>
                  </Network>
                )}
              </>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

export default SideSelect;

const Wrapper = styled.div`
  height: ${(props) => props.$height};
  max-height: 500px;
  overflow-y: scroll;
  display: flex;
  position: relative;
  width: 250px;
`;

const Network = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100px;
  cursor: pointer;
  &:not(:last-child) {
  }

  .light {
    height: 100%;
    width: 8px;
    border-radius: 40px;
    background: #f58220;
    transition: all 0.2s ease-in-out;
  }
  .dark {
    height: 100%;
    width: 8px;
    border-radius: 40px;
    background: #f2f4f7;
    transition: all 0s ease-in-out;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 8px;
  border-radius: 40px;
  background: #f2f4f7;
`;
