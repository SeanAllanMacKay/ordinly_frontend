import React from "react";
import { TextFieldInputArray } from "@/components/molecules";
import { useWatch } from "react-hook-form";

export const AddProjectTaskChecklistInputs = () => {
  return <TextFieldInputArray name="checklist" />;
};
