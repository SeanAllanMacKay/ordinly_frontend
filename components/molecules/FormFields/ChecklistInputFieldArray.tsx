import { FormFieldArray } from "@/components/atoms";
import { ChecklistInputFieldProps } from "./types";
import React from "react";
import { ChecklistItem, ChecklistWrapper } from "../Checklist";

export const ChecklistInputFieldArray = ({
  name,
  label,
  defaultItemValue,
  valueKey,
  labelKey,
}: ChecklistInputFieldProps) => {
  return (
    <FormFieldArray
      name={name}
      label={label}
      defaultItemValue={defaultItemValue ?? { value: false }}
      wrapper={<ChecklistWrapper />}
      itemComponent={(props) => {
        return (
          <ChecklistItem
            {...props}
            label={labelKey ? props.item[labelKey] : props.item}
            value={valueKey ? props.item[valueKey] : props.value}
          />
        );
      }}
    />
  );
};
