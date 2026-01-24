export const requiredValidator = (value: any) => {
  if ([null, undefined, ""].includes(value)) {
    return "Required";
  }
};
