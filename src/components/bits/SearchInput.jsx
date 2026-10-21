import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import "./SearchInput.css";
import { catalogActions } from "../../store/services/catalog/catalog.service";

const SearchInput = ({ width }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [shouldSearchExpand, setShouldSearchExpand] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data =
    JSON.parse(localStorage.getItem("neededData")) === null
      ? []
      : JSON.parse(localStorage.getItem("neededData"));

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);

    const result = data.filter((item) => {
      if (searchText === "") {
        return;
      } else {
        return (
          item.Name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
          item.Name.includes(searchText.trim())
        );
      }
    });

    setSearchResult(result);
  };

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

  // const handleBlur = () => {
  //   setSearchTerm("");
  // };
  const handleRoute = (nav) => {
    navigate(`/payment/${nameToPathConverter(nav.Name)}`);
    dispatch(catalogActions.setBiller(nav.Merchants));
    dispatch(catalogActions.setSelectedPayment(nav?.Name));
    // setSearchResult(null);
    setSearchTerm("");
  };
  useEffect(() => {}, [dispatch]);

  return (
    <Container
      $width={width}
      $searchTerm={searchTerm}
      // className={
      //   searchResult?.length > 0
      //     ? "border border-[#f6923a] rounded-t-[6px]"
      //     : "border border-[#f6923a] rounded-t-[6px] rounded-b-[6px]"
      // }
      // className={
      //   searchResult?.length > 0
      //     ? "border border-[#f6923a] rounded-t-[6px]"
      //     : "border border-[#f6923a] rounded-t-[6px] rounded-b-[6px]"
      // }
    >
      {/* <div className="searchInputContainer">
        <input
          type="text"
          className={
            !shouldSearchExpand
              ? "hidden"
              : "border placeholder:text-[.8rem] placeholder:font-generalsans-regular text-[.8rem] text-[#3d3d3d]"
          }
          placeholder="Search for any product"
          value={searchTerm}
          onChange={handleSearch}
          onBlur={() => {
            setShouldSearchExpand(false);
          }}
        />
        <span className="absolute top-1/2 left-[94%] transform -translate-x-1/2 -translate-y-1/2 sm:left-[90%]">
          <IoSearch
            color={shouldSearchExpand ? "#f6923a" : "#000"}
            onClick={handleSearchExpansion}
          />
        </span>
      </div> */}
      <div className="flex justify-end w-full">
        <div className="search-container">
          <input
            className="search"
            type="text"
            name="q"
            placeholder="Search for any product"
            value={searchTerm}
            // onBlur={handleBlur}
            onChange={handleSearch}
          />
          <label className="button searchbutton" for="searchright">
            <span className="mglass">&#9906;</span>
          </label>
        </div>
      </div>

      {searchTerm && searchResult?.length > 0 && (
        <div className="suggestionsBox z-[99999999999999] flex flex-col gap-5 border border-[#f6923a]">
          {searchResult &&
            searchResult?.map((item) => {
              return (
                <p
                  onClick={() => {
                    handleRoute(item);
                  }}
                  className="cursor-pointer font-generalsans-regular text-[#3d3d3d] text-[0.8rem] hover:text-accent1"
                >
                  {item?.Name}
                </p>
              );
            })}
        </div>
      )}
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  width: ${(props) => (props.$width ? props.$width : "350px")};
  min-height: 35px;
  /* border: 1px solid #f6923a; */
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 99999999;

  /* .searchInputContainer {
    display: flex;
    position: relative;
    height: 35px;
    width: ${(props) => (props.$width ? props.$width : "350px")};
    padding-left: 3px;
    input {
      width: ${(props) => (props.$width ? "200px" : "310px")};
      border: none;
      outline: none;
      padding: 0 10px;
    }
  } */
  .suggestionsBox {
    position: absolute;
    top: 35px;
    width: ${(props) => (props.$width ? props.$width : "350px")};
    max-height: 220px;
    overflow-y: scroll;
    left: 0;
    background: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 8px 13px;
    a {
      font-size: 0.8rem;
    }
  }

  .search-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    height: 35px;
    width: 100%;
    vertical-align: bottom;
    .searchbutton {
      position: absolute;
      font-size: 22px;
      width: 100%;
      margin: 0;
      padding: 0;
      .mglass {
        display: inline-block;
        pointer-events: none;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
      }
    }
    .button {
      display: inline-block;
      background-color: transparent;
      font-size: 14px;
      height: 35px;
      width: 35px;
      line-height: 35px;
      text-align: center;
      color: black;
      text-decoration: none;
      cursor: pointer;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:hover {
        transition-duration: 0.4s;
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        background-color: red;
        color: black;
      }
    }
    .search {
      position: absolute;
      z-index: 1;
      right: 0;
      background-color: transparent;
      outline: none;
      padding: 0;
      width: ${(props) => (props.$searchTerm === "" ? "35px" : "350px")};
      border: ${(props) =>
        props.$searchTerm === "" ? "none" : "1px solid #f6923a"};
      padding: ${(props) => (props.$searchTerm === "" ? "0px" : "0 16px")};
      font-size: 0.8rem;
      height: 100%;
      transition-duration: 0.4s;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;

      &::placeholder {
        font-size: 0px;
      }
      &:focus {
        width: ${(props) => (props.$width ? props.$width : "350px")};
        padding: 0 16px;
        border: 1px solid #f6923a;
        ::placeholder {
          font-size: 10px;
        }
      }
      &:focus + .searchbutton {
        transition-duration: 0.4s;
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        color: black;
      }
    }

    .expandright {
      left: auto;
      right: 34px; /* Button width-1px */
      &:focus {
        padding: 0 0 0 16px;
      }
    }
  }
  @media only screen and (max-width: 889px) {
    .search-container {
      .search {
        width: ${(props) => (props.$searchTerm === "" ? "35px" : props.$width)};
      }
    }
  }
`;
