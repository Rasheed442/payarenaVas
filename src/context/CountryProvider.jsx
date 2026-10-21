/* eslint-disable react/prop-types */
import { useState, useContext, createContext } from "react";
// import CountryContext from "./CountryContext";

export const countryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState("NGA"); // State to hold country Code

  const assignCountryCode = (code) => {
    setCountryCode(code);
  };

  return (
    <countryContext.Provider
      value={{ countryCode, assignCountryCode, setCountryCode }}
    >
      {children}
    </countryContext.Provider>
  );
};

// export const useCountry = () => {
//   return useContext(CountryContext);
// };
