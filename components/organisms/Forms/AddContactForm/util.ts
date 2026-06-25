import { toE164, formatLocationDisplayValue } from "@/components";
import { useCreateClientContactMutation } from "@/api";
import { AddContactFormFieldTypes } from "./types";

type ContactInput = Parameters<
  ReturnType<typeof useCreateClientContactMutation>["mutateAsync"]
>[0];

// Maps the form's rich field values onto the backend contact-create input shape.
// Empty arrays are omitted so the optional API fields are left unset.
export const toContactInput = ({
  name,
  role,
  description,
  emails,
  phoneNumbers,
  locations,
}: AddContactFormFieldTypes): ContactInput => ({
  name,
  role,
  description,
  emails: emails.length ? emails.map((email) => ({ email })) : undefined,
  phoneNumbers: phoneNumbers.length
    ? phoneNumbers.map((phone) => ({ number: toE164(phone) ?? phone.number }))
    : undefined,
  locations: locations.length
    ? locations.map((location) => ({
        address: location.address ?? formatLocationDisplayValue(location),
        city: location.city,
        region: location.region,
        country: location.country,
        type: location.type,
        latitude:
          location.latitude != null ? String(location.latitude) : undefined,
        longitude:
          location.longitude != null ? String(location.longitude) : undefined,
      }))
    : undefined,
});
