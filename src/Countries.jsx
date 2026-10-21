import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { countryContext } from "./context/CountryProvider";
import NGA from "./assets/flags/NGA.png";
import CAN from "./assets/flags/CAN.png";
import CHE from "./assets/flags/CHE.png";
import ITA from "./assets/flags/ITA.png";
import USA from "./assets/flags/USA.png";
import GBR from "./assets/flags/GBR.png";

// import flagSrc from "./assets/";

const Countries = () => {
  const [countries, setCountries] = useState([]); // State to hold country data
  const [loading, setLoading] = useState(false); // State to indicate loading
  const { countryCode, setCountryCode } = useContext(countryContext);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const flagMap = {
    GBR: GBR,
    CAN: CAN,
    ITA: ITA,
    NGA: NGA,
    USA: USA,
    CHE: CHE,
  };

  const fetchCountries = async () => {
    try {
      setLoading(true);

      const BASE_URL = import.meta.env.VITE_BASE_URL;
      if (!BASE_URL)
        throw new Error("API Base URL is missing. Check your .env file.");

      const fetchCountriesUrl = `${BASE_URL}internationalairtime/fetchcountries`;

      const res = await fetch(fetchCountriesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();

      if (data && Array.isArray(data.Data)) {
        setCountries(data.Data);
      } else {
        throw new Error("Invalid data structure received from API.");
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (country) => {
    setSelected(country);
    const selectedCode = country.Code;
    setCountryCode(selectedCode); // Update context
    localStorage.setItem("code", selectedCode); // Save to localStorage
    setOpen(!open);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="flex justify-end">
      <div className="relative w-52">
        {/* Selected Country Display */}
        <div
          className="flex items-center justify-between bg-white border border-gray-light rounded-md shadow-md p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {selected ? (
            <div className="flex items-center space-x-2">
              <img
                src={flagMap[selected.Code]}
                alt={selected.Name}
                className="w-6 h-4"
              />
              <span>{selected.Name}</span>
            </div>
          ) : (
            <span className="text-gray-400">
              {" "}
              {loading
                ? "Loading countries..."
                : countryCode
                ? countries.find((country) => country.Code === countryCode)
                    ?.Name || "Select a country"
                : "Select a country"}
            </span>
          )}
        </div>

        {/* Dropdown List */}
        {open && (
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
            {countries.map((country) => {
              const flagSrc = flagMap[country.Code];

              return (
                <div
                  key={country.Code}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(country)}
                >
                  <img
                    src={flagSrc}
                    alt={country.name}
                    className="w-6 h-4 mr-2"
                  />
                  <span>{country.Name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
