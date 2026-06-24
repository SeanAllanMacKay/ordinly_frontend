import { FormFieldArray } from "@/components/atoms";
import { ChecklistFieldInputArrayProps } from "./types";
import React from "react";
import { ChecklistItem, ChecklistWrapper } from "../../Checklist";

export const ChecklistFieldInputArray = ({
  name,
  label,
  defaultItemValue,
  valueKey,
  labelKey,
}: ChecklistFieldInputArrayProps) => {
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
