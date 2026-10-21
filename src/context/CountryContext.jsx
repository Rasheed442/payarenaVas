import React, { createContext } from "react";

// const CountryContext = createContext("");
const CountryContext = createContext({
  assignCountryCode: () => {},
});

export default CountryContext;
