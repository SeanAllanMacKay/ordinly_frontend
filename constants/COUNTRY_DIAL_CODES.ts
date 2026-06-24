import { CountryCode } from "libphonenumber-js";

export type CountryDialCode = {
  region: CountryCode;
  dialCode: string;
  flag: string;
  name: string;
};

// Hard-coded subset of supported countries for the phone number selector.
// `region` is the ISO 3166-1 alpha-2 code libphonenumber-js validates against.
export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { region: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { region: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { region: "IE", dialCode: "+353", flag: "🇮🇪", name: "Ireland" },
  { region: "CA", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { region: "AU", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { region: "NZ", dialCode: "+64", flag: "🇳🇿", name: "New Zealand" },
  { region: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { region: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { region: "ES", dialCode: "+34", flag: "🇪🇸", name: "Spain" },
  { region: "IT", dialCode: "+39", flag: "🇮🇹", name: "Italy" },
  { region: "NL", dialCode: "+31", flag: "🇳🇱", name: "Netherlands" },
  { region: "IN", dialCode: "+91", flag: "🇮🇳", name: "India" },
];

export const DEFAULT_DIAL_CODE_REGION: CountryCode = "GB";

export const getCountryDialCode = (region: CountryCode) =>
  COUNTRY_DIAL_CODES.find((country) => country.region === region);
