import React, { useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import _ from "lodash";
import { useDebounce } from "../../lib/hooks";
import {
  formatAutocompleteAddress,
  formatGeocodeAddress,
} from "../../lib/geocoding";

let sessionToken;
let autocomplete;
let geocoder;
const isBrowser = typeof window !== "undefined";

// Input field component that knows how to use google addresses
const Component = ({
  obj,
  onSelected,
  onChange,
  onBlur,
  value = "",
  ...props
}) => {
  const [selectedAddress, setSelectedAddress] = useState(obj);
  const [searchInput, setSearchInput] = useState(value);
  const debouncedSearchInput = useDebounce(searchInput, 100);
  const [isEnabled, setIsEnabled] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  // const [sessionToken, setSessionToken] = useState()

  useEffect(() => {
    setSearchInput(value);
  }, [value]);

  // Always run once and only at the top
  useEffect(() => {
    //TODO undo comment when tis time to use
    sessionToken =
      isBrowser &&
      window?.google &&
      new window.google.maps.places.AutocompleteSessionToken();
    autocomplete =
      isBrowser && window.google
        ? new window.google.maps.places.AutocompleteService()
        : null;
    geocoder =
      isBrowser && window.google ? new window.google.maps.Geocoder() : null;
    // setSessionToken(token)
  }, []);

  useEffect(() => {
    if (!_.isEmpty(debouncedSearchInput)) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }

    if (debouncedSearchInput && autocomplete && shouldSearch) {
      setIsSearching(true);
      // const componentRestrictions = formRef && formRef.current && formRef.current.values ? { country: formRef.current.values.country || "" } : {};
      autocomplete.getPlacePredictions(
        { input: debouncedSearchInput, sessionToken },
        (predictions, status) => {
          // TODO undo comment when its time to use
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const choices = predictions?.map((address) =>
              formatAutocompleteAddress(address)
            );
            setFilteredOptions(choices);
            // setSearching(false);
          } else {
            setFilteredOptions([]);
          }

          setIsSearching(false);
        }
      );
    }
  }, [debouncedSearchInput, isEnabled]);

  const onAddressSelected = useCallback((address) => {
    const { place_id } = address;
    setShouldSearch(false);
    setIsEnabled(false);
    setFilteredOptions([]);
    // setSearchInput(address[initValue]);
    // TODO undo comment when its time to use
    geocoder.geocode({ placeId: place_id }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const addr = formatGeocodeAddress(results, address);
        onSelected && onSelected(addr);
      }
    });
  }, []);

  const onInputChanged = (val) => {
    setShouldSearch(true);
    setSearchInput(val);
  };

  const clearSelection = () => {
    setSearchInput("");
    setIsEnabled(false);
    setShouldSearch(false);
  };

  // @ts-ignore
  return (
    <div className="min-w-0 flex flex-col flex-1 relative">
      <div className="min-w-0 flex flex-1 bg-white relative">
        <input
          {...props}
          value={searchInput}
          onChange={(e) => onInputChanged(e.target.value)}
          onBlur={onBlur}
          autoComplete="off"
        />
        {/* {searchInput && (
                    <div className="absolute z-10 inset-y-0 right-0 px-2 flex items-center justify-center">
                        <button onClick={() => clearSelection()} className="text-sm text-gray-500 outline-none focus:outline-none">
                            <XCircleIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                        </button>
                    </div>
                )} */}
      </div>
      <Listbox
        value={selectedAddress}
        onChange={(val) => {
          onAddressSelected(val);
        }}
      >
        <Transition
          show={isEnabled && shouldSearch}
          enter="transition duration-150 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-150"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 bg-white mt-1.5 max-h-60 w-full divide-y divide-gray-100 overflow-auto bg-white py-0.5 sm:text-sm shadow-lg shadow-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {filteredOptions.map((address) => (
              <Listbox.Option
                as="div"
                key={address.place_id}
                value={address}
                className="relative cursor-pointer select-none py-3 pl-3 pr-10"
              >
                {({ active }) => (
                  <div className="space-y-0.5">
                    <p className="sm:text-sm font-medium">
                      {address.main_text}
                    </p>
                    <p className="text-xs capitalize text-gray-400">
                      {address.secondary_text}
                    </p>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default Component;
