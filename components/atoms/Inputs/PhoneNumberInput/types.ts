import { CountryCode } from "libphonenumber-js";
import { FormFieldInputProps } from "../../Form/types";

export type PhoneNumberInputValue = {
  region: CountryCode;
  number: string;
};

export type PhoneNumberInputProps =
  FormFieldInputProps<PhoneNumberInputValue | undefined> & {
    // fired when the underlying number input commits (Enter / "done" key)
    onCommit?: (value: PhoneNumberInputValue) => void;
  };
