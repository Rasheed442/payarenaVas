import _ from "lodash";

/**
 * Module to use google's geocoding & reverse geocoding.
 */

export const formatAutocompleteAddress = (address) => {
  const {
    place_id,
    reference,
    id,
    structured_formatting: { main_text, secondary_text },
    description,
  } = address;
  return { id, place_id, reference, main_text, secondary_text, description };
};

export const formatGeocodeAddress = (address, autoCompleteAddress) => {
  // extract the actual address Fields in a structured way based on google geocoding address
  // extract the primary features
  if (!address || address.length === 0) {
    return {};
  }

  const result = address[0];
  const { address_components, formatted_address, place_id, geometry } = result;

  const country = _.find(address_components, (elem) =>
    elem.types.includes("country")
  );
  const state = _.find(address_components, (elem) =>
    elem.types.includes("administrative_area_level_1")
  );
  const city = _.find(address_components, (elem) =>
    elem.types.includes("postal_town")
  );
  const level_2 = _.find(address_components, (elem) =>
    elem.types.includes("administrative_area_level_2")
  );
  const neighborhood = _.find(address_components, (elem) =>
    elem.types.includes("neighborhood")
  );
  const locality = _.find(address_components, (elem) =>
    elem.types.includes("locality")
  );
  const route = _.find(address_components, (elem) =>
    elem.types.includes("route")
  );
  const street_number = _.find(address_components, (elem) =>
    elem.types.includes("street_number")
  );
  const post_code = _.find(address_components, (elem) =>
    elem.types.includes("postal_code")
  );

  const { location } = geometry;

  let mainCityProp, backupCityProp;
  switch (country.short_name) {
    case "NG":
      mainCityProp = neighborhood;
      backupCityProp = locality;
      break;
    case "UK":
      mainCityProp = city;
      backupCityProp = level_2;
      break;
    case "US":
      mainCityProp = locality;
      backupCityProp = neighborhood;
      break;
    default:
      mainCityProp = city;
      backupCityProp = locality;
  }

  const { main_text, secondary_text } = autoCompleteAddress;

  const parts = _.compact([
    street_number ? street_number.long_name : "",
    route ? route.long_name : "",
  ]).join(" ");
  const street = _.compact(
    _.uniq([autoCompleteAddress ? autoCompleteAddress.main_text : "", parts])
  ).join(" - ");
  const formattedAddress = {
    formatted_address,
    place_id,
    lat: location ? location.lat() : null,
    lng: location ? location.lng() : null,
    country: country
      ? { name: country.long_name, code: country.short_name }
      : null,
    state: state ? state.long_name : null,
    city: mainCityProp
      ? mainCityProp.long_name
      : "" || backupCityProp
      ? backupCityProp.long_name
      : "" || autoCompleteAddress
      ? autoCompleteAddress.secondary_text
      : "" || null,
    post_code: post_code ? post_code.long_name : null,
    street,
    formatted: true,
    main_text,
    secondary_text,
  };

  return formattedAddress;
};
