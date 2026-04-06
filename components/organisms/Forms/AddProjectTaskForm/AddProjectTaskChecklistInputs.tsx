import React from "react";
import { TextInputFieldArray } from "@/components/molecules";
import { useWatch } from "react-hook-form";

export const AddProjectTaskChecklistInputs = () => {
  const asdf = useWatch();

  console.log({ asdf });
  return <TextInputFieldArray name="checklist" />;
};
