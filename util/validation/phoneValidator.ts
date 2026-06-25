import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";

// Validates a { region, number } pair as produced by the PhoneNumberInput atom.
// The number is the national number; the region (ISO alpha-2) supplies the
// country context libphonenumber-js needs to validate it.
export const phoneValidator = (
  value: { region: CountryCode; number: string } | undefined,
) => {
  if (
    !value ||
    typeof value.number !== "string" ||
    !value.region ||
    !isValidPhoneNumber(value.number, value.region)
  ) {
    return "validation:phone";
  }
};
