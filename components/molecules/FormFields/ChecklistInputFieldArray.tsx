import { FormFieldArray } from "@/components/atoms";
import { ChecklistInputFieldProps } from "./types";
import React from "react";
import { ChecklistItem, ChecklistWrapper } from "../Checklist";

export const ChecklistInputFieldArray = ({
  name,
  label,
}: ChecklistInputFieldProps) => {
  return (
    <FormFieldArray
      name={name}
      label={label}
      defaultItemValue={{ value: false }}
      wrapper={<ChecklistWrapper />}
      itemComponent={(props) => <ChecklistItem {...props} />}
    />
  );
};
