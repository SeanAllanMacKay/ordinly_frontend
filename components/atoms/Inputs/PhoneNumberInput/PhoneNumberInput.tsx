import React from "react";
import { View } from "react-native";
import { CountryCode } from "libphonenumber-js";
import { SelectInput } from "../SelectInput";
import { TextInput } from "../TextInput";
import { PhoneNumberInputProps } from "./types";
import { phoneNumberInputStyles as styles } from "./styles";
import {
  COUNTRY_DIAL_CODES,
  DEFAULT_DIAL_CODE_REGION,
} from "@/constants/COUNTRY_DIAL_CODES";

const regionOptions = COUNTRY_DIAL_CODES.map(({ region, dialCode, flag }) => ({
  value: region,
  label: `${flag} ${dialCode}`,
}));

export const PhoneNumberInput = ({
  value,
  onChange,
  onBlur,
  onCommit,
  isError,
  isDisabled,
  label,
  isLoading = false,
  index,
}: PhoneNumberInputProps) => {
  const region = value?.region ?? DEFAULT_DIAL_CODE_REGION;
  const number = value?.number ?? "";

  const onChangeRegion = (newRegion: CountryCode) =>
    onChange({ region: newRegion, number });

  const onChangeNumber = (newNumber: string) =>
    onChange({ region, number: newNumber });

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <SelectInput
          value={region}
          onChange={onChangeRegion}
          options={regionOptions}
          isDisabled={isDisabled}
          isError={isError}
          isLoading={isLoading}
          index={index}
        />
      </View>

      <View style={styles.number}>
        <TextInput
          value={number}
          onChange={onChangeNumber}
          onBlur={onBlur}
          onCommit={onCommit ? () => onCommit({ region, number }) : undefined}
          label={label}
          isError={isError}
          isDisabled={isDisabled}
          isLoading={isLoading}
          index={index}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};
