import React, { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { DatePickerModal } from "./DatePickerModal";
import { format } from "date-fns";
import { TextInput } from "../TextInput";
import { DateInputProps } from "./types";

export const DateInput = ({
  value,
  onChange,
  onBlur,
  isError,
  isDisabled,
  label,
  isLoading = false,
  index = 0,
  min,
  max,
}: DateInputProps) => {
  const [isOpen, setOpen] = useState(false);

  const displayValue = useMemo(() => {
    return value ? format(value, "dd MMM yyyy") : "";
  }, [value]);

  const onOpen = () => {
    setOpen(true);
  };

  const onDismiss = () => {
    setOpen(false);
    onBlur?.();
  };

  const onConfirmSingle = (date: Date | undefined) => {
    setOpen(false);
    onChange(date);
    onBlur?.();
  };

  return isLoading ? (
    <TextInput value="" isLoading={true} index={index} isEditable={false} />
  ) : (
    <>
      <Pressable onPress={!isDisabled ? onOpen : undefined}>
        <TextInput
          value={displayValue}
          isError={isError}
          label={label}
          onPress={onOpen}
          isEditable={false}
          icon="calendar"
          onClear={!isDisabled ? () => onChange(undefined) : undefined}
        />
      </Pressable>

      <DatePickerModal
        isOpen={isOpen}
        value={value}
        onChange={onConfirmSingle}
        onClose={onDismiss}
        min={min}
        max={max}
      />
    </>
  );
};
