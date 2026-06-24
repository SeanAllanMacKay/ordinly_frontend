import { useGetWorkersQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddTeamFormFieldTypes } from "./types";

export const AddTeamProvider = ({ children }: PropsWithChildren) => {
  const addTeamForm = useForm<AddTeamFormFieldTypes>({
    mode: "all",
    defaultValues: { memberIds: [] },
  });

  const workers = useGetWorkersQuery({ page: 1 });

  return (
    <Form form={addTeamForm} isLoading={workers.isLoading}>
      {children}
    </Form>
  );
};
