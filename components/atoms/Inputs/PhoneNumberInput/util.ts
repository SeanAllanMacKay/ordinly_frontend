import { parsePhoneNumber } from "libphonenumber-js";
import { PhoneNumberInputValue } from "./types";

// Human-readable international format for display (e.g. "+44 20 7946 0958").
export const formatPhoneNumber = (value?: PhoneNumberInputValue) => {
  if (!value?.number) {
    return "";
  }

  try {
    return parsePhoneNumber(value.number, value.region).formatInternational();
  } catch {
    return value.number;
  }
};

// E.164 string for storage / submission (e.g. "+442079460958"), or undefined.
export const toE164 = (value?: PhoneNumberInputValue) => {
  if (!value?.number) {
    return undefined;
  }

  try {
    return parsePhoneNumber(value.number, value.region).number;
  } catch {
    return undefined;
  }
};
