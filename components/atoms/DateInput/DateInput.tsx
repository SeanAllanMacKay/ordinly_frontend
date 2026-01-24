import React, { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { format } from "date-fns";

export type DateInputProps = {
  value: Date;
  onChange: (newValue: Date) => void;
  onBlur: () => void;
  isError: boolean;
  isDisabled?: boolean;
  label?: string;
};

export const DateInput = ({
  value,
  onChange,
  isError,
  isDisabled,
  label,
}: DateInputProps) => {
  const [isOpen, setOpen] = useState(false);

  const displayValue = useMemo(
    () => (value ? format(value, "dd MMM yyyy") : ""),
    [value]
  );

  const onOpen = () => {
    setOpen(true);
  };

  const onDismiss = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params: { date: Date }) => {
    setOpen(false);
    onChange(params.date);
  };

  return (
    <>
      <Pressable onPress={!isDisabled ? onOpen : undefined}>
        <TextInput
          value={displayValue}
          error={isError}
          label={label}
          mode={"outlined"}
        />
      </Pressable>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={isOpen}
        onDismiss={onDismiss}
        date={value}
        onConfirm={onConfirmSingle}
        saveLabel="Save"
        uppercase={false}
        label="Select date"
        presentationStyle="pageSheet"
      />
    </>
  );
};
