import { PhoneNumberInputValue, LocationValue } from "@/components";

export type AddContactFormFieldTypes = {
  name: string;
  role?: string;
  description?: string;
  emails: string[];
  phoneNumbers: PhoneNumberInputValue[];
  locations: LocationValue[];
};
