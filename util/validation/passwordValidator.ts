const uppercaseRegex = /^(?=[^A-Z]*[A-Z])[ -~]*$/;
const lowercaseRegex = /^(?=[^a-z]*[a-z])[ -~]*$/;
const numberRegex = /.*[0-9].*/;

export const passwordValidator = (value: any) => {
  if (value.length < 8) {
    return "Must be at least 8 characters";
  }

  if (!value.match(uppercaseRegex)) {
    return "Must contain at least one uppecase letter";
  }

  if (!value.match(lowercaseRegex)) {
    return "Must contain at least one lowercase letter";
  }

  if (!value.match(numberRegex)) {
    return "Must contain at least one number";
  }
};
