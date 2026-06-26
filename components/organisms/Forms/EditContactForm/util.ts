import { parsePhoneNumber } from "libphonenumber-js";
import { ContactType } from "@/api/entities/types";
import { EditContactFormFieldTypes } from "./types";

// Reverse of AddContactForm's `toContactInput`: maps a fetched contact onto the
// form's field shape so the edit drawer opens pre-populated. Phone numbers are
// stored E.164, so the region is recovered by parsing; locations are mapped
// best-effort from the stored feature for display.
export const fromContact = (
  contact: ContactType,
): EditContactFormFieldTypes => ({
  name: contact.name,
  role: contact.role ?? "",
  description: contact.description ?? "",
  emails: contact.emails?.map((email) => email.email) ?? [],
  phoneNumbers:
    contact.phoneNumbers?.map((phone) => {
      try {
        const parsed = parsePhoneNumber(phone.number);
        return {
          region: parsed?.country ?? "US",
          number: parsed?.number ?? phone.number,
        };
      } catch {
        return { region: "US" as const, number: phone.number };
      }
    }) ?? [],
  locations:
    contact.locations?.map((location) => ({
      type: location.type,
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      address:
        location.full_address ?? location.place_formatted ?? location.name,
      mapbox_id: location.mapbox_id,
    })) ?? [],
});
