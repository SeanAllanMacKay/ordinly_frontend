import { FormFieldInputProps, FormFieldProps } from "@/components/atoms/Form/types";

// Structured address written to the form. Derived from Mapbox's GeoCodeDataType /
// the backend LocationType, but flattened to the fields we capture + coordinates.
export type LocationValue = {
  type: string;
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  mapbox_id?: string;
};

export type LocationSearchInputProps =
  FormFieldInputProps<LocationValue | undefined> & {
    defaultDisplayValue?: string;
    // fired when the user selects a location (same moment as onChange)
    onCommit?: (value: LocationValue) => void;
  };

export type LocationDataFieldInputProps = Omit<
  FormFieldProps,
  "component" | "isLoading"
> & {
  defaultDisplayValue?: string;
};
