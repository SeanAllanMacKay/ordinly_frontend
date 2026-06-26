import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddProjectTaskFormFieldTypes } from "./types";
import { addProjectTaskSchema } from "./addProjectTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddProjectTaskProvider = ({ children }: PropsWithChildren) => {
  const taskStatuses = useGetTaskStatusesQuery();
  const taskPriorities = useGetTaskPrioritiesQuery();

  const addProjectTaskForm = useForm<AddProjectTaskFormFieldTypes>({
    mode: "all",
    defaultValues: {
      checklist: [{ value: "" }],
      userIds: [],
      teamIds: [],
    },
    resolver: zodResolver(addProjectTaskSchema),
    shouldUnregister: false,
  });

  const isLoading = taskStatuses.isLoading || taskPriorities.isLoading;

  return (
    <Form form={addProjectTaskForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
