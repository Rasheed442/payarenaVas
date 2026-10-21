import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogActions,
  catalogSelector,
} from "../../store/services/catalog/catalog.service";
import unknownIcon from "../../assets/icons/unknownIcon.svg";
import { useLocation } from "react-router-dom";

const SideSelectMobile = ({ selectedNetwork, setSelectedNetwork }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { billerData, editedCatalog, selectedBiller } =
    useSelector(catalogSelector);
  const iconRegex = /^images\/logos\/$/;

  const height = billerData?.length * 100 + "px";

  // useEffect(() => {
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

  const checkUrl = isUrl(currBiller?.Url);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  return (
    <div className="relative h-[180px]">
      <div className="flex py-[0rem] left-[0] max-w-[100%] overflow-x-scroll gap-[1rem]">
        {billerData?.map((data) => {
          return (
            <>
              {isUrl(data?.Url) ? (
                <a
                  href={data?.Url}
                  target="_blank"
                  onClick={() => {
                    dispatch(catalogActions.toggleBillerisLink(true));
                    dispatch(catalogActions.setSelectedBiller(""));
                  }}
                >
                  <Network key={data.Name}>
                    <div
                      className={
                        selectedBiller === data.Name ? "light" : "dark"
                      }
                    ></div>
                    <div className="flex items-center gap-[1.3rem] flex-col">
                      <span className="flex justify-center items-center w-[60px] h-[60px]">
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
                      </span>

                      <p
                        className={`text-[.6rem] ${
                          selectedBiller === data.Name
                            ? "text-[#000000] font-generalsans-semiBold"
                            : "text-[#667085] font-generalsans-medium"
                        } w-[70%] text-center`}
                      >
                        {data.Name}
                      </p>
                    </div>
                  </Network>
                </a>
              ) : (
                <Network
                  key={data.Name}
                  onClick={() => {
                    dispatch(catalogActions.setSelectedBiller(data.Name));
                    dispatch(catalogActions.toggleBillerisLink(false));
                  }}
                >
                  <div
                    className={selectedBiller === data.Name ? "light" : "dark"}
                  ></div>
                  <div className="flex items-center gap-[1.3rem] flex-col">
                    <span className="flex justify-center items-center w-[60px] h-[60px]">
                      <img
                        src={
                          iconRegex.test(data?.Logo)
                            ? unknownIcon
                            : `${import.meta.env.VITE_BASE_URL}app/${data.Logo}`
                        }
                        alt={`${data.Name}`}
                        className="w-[40px]"
                      />
                    </span>

                    <p
                      className={`text-[.6rem] ${
                        selectedBiller === data.Name
                          ? "text-[#000000] font-generalsans-semiBold"
                          : "text-[#667085] font-generalsans-medium"
                      } w-[70%] text-center`}
                    >
                      {data.Name}
                    </p>
                  </div>
                </Network>
              )}
            </>
          );
        })}
      </div>{" "}
      <ProgressBar></ProgressBar>
    </div>
  );
};

export default SideSelectMobile;

const Network = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  cursor: pointer;
  padding: 0rem 0;
  height: 180px;
  min-width: 130px;
  position: relative;
  /* border: 1px solid red; */
  /* position: absolute; */

  .light {
    width: 100%;
    height: 6px;
    border-radius: 40px;
    background: #f58220;
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: all 0.2s ease-in-out;
  }
  .dark {
    width: 100%;
    height: 6px;
    border-radius: 40px;
    background: #f2f4f7;
    transition: all 0s ease-in-out;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  width: 100%;
  border-radius: 40px;
  background: #f2f4f7;
  position: absolute;
  bottom: 0;
`;
