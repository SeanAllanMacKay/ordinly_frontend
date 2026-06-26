import {
  useGetProjectPrioritiesQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";

export const AddProjectProvider = ({ children }: PropsWithChildren) => {
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const isLoading = projectPriorities.isLoading || projectStatuses.isLoading;

  const addProjectForm = useForm<AddProjectFormFieldTypes>({
    mode: "all",
    defaultValues: {
      contactIds: [],
      userIds: [],
      teamIds: [],
    },
  });

  return (
    <Form form={addProjectForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
