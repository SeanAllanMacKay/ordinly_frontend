import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddProjectPhaseFormFieldTypes } from "./types";
import { addProjectPhaseSchema } from "./addProjectPhaseSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddProjectPhaseProvider = ({ children }: PropsWithChildren) => {
  const taskStatuses = useGetTaskStatusesQuery();
  const taskPriorities = useGetTaskPrioritiesQuery();

  const addProjectPhaseForm = useForm<AddProjectPhaseFormFieldTypes>({
    mode: "all",
    defaultValues: {
      checklist: [{ value: "" }],
      taskIds: [],
      userIds: [],
      teamIds: [],
    },
    resolver: zodResolver(addProjectPhaseSchema),
    shouldUnregister: false,
  });

  const isLoading = taskStatuses.isLoading || taskPriorities.isLoading;

  return (
    <Form form={addProjectPhaseForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
