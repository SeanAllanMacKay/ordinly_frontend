const uppercaseRegex = /^(?=[^A-Z]*[A-Z])[ -~]*$/;
const lowercaseRegex = /^(?=[^a-z]*[a-z])[ -~]*$/;
const numberRegex = /.*[0-9].*/;

export const passwordValidator = (value: any) => {
  if (value.length < 8) {
    return "validation:passwordMinLength";
  }

  if (!value.match(uppercaseRegex)) {
    return "validation:passwordUppercase";
  }

  if (!value.match(lowercaseRegex)) {
    return "validation:passwordLowercase";
  }

  if (!value.match(numberRegex)) {
    return "validation:passwordNumber";
  }
};
