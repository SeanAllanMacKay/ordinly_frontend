// Validators return an i18n key (namespace:key) rather than a literal message.
// The key is translated centrally in the FormField error slot, keeping
// validators pure, shareable by reference, and reactive to language changes.
export const requiredValidator = (value: any) => {
  if ([null, undefined, ""].includes(value)) {
    return "validation:required";
  }
};
