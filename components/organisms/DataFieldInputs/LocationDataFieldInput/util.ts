import { GeoCodeDataType } from "@/api/entities/types";
import { LocationValue } from "./types";

// Comma-joins the populated address fields for display in the trigger input.
export const formatLocationDisplayValue = (value?: LocationValue) => {
  if (!value) {
    return "";
  }

  return [value.address, value.city, value.region, value.postalCode, value.country]
    .filter((part): part is string => !!part)
    .join(", ");
};

// Maps a retrieved Mapbox feature into our flattened LocationValue.
export const mapFeatureToLocationValue = (
  properties: GeoCodeDataType & { name?: string },
): LocationValue => {
  const {
    mapbox_id,
    feature_type,
    name,
    coordinates: { latitude, longitude },
    context: { country, region, place, postcode, address },
  } = properties;

  return {
    type: feature_type,
    latitude,
    longitude,
    mapbox_id,
    address: address?.name,
    city: place?.name ?? (feature_type === "place" ? name : undefined),
    region: region?.name ?? (feature_type === "region" ? name : undefined),
    postalCode: postcode?.name ?? (feature_type === "postcode" ? name : undefined),
    country: country?.name ?? (feature_type === "country" ? name : undefined),
  };
};
