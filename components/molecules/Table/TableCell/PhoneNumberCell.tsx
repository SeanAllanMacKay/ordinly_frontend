import { Typography } from "@/components/atoms";
import React from "react";
import { PhoneNumberCellProps } from "../types";
import parsePhoneNumber from "libphonenumber-js";

export const PhoneNumberCell = ({ value }: PhoneNumberCellProps) => {
  const phoneNumber = value
    ? parsePhoneNumber(`${value}`)?.formatInternational()
    : "-";

  return <Typography>{phoneNumber}</Typography>;
};
