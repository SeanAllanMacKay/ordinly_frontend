import { useGetTaskPrioritiesQuery, useGetTaskStatusesQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { AddProjectMilestoneFormFieldTypes } from "./types";
import { addProjectMilestoneSchema } from "./addProjectMilestoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddProjectMilestoneProvider = ({
  children,
}: PropsWithChildren) => {
  const taskStatuses = useGetTaskStatusesQuery();

  const addProjectMilestoneForm = useForm<AddProjectMilestoneFormFieldTypes>({
    mode: "all",
    // @ts-expect-error - Native file objects are not instances of files, but are treated as such
    resolver: zodResolver(addProjectMilestoneSchema),
    shouldUnregister: false,
  });

  const isLoading = taskStatuses.isLoading;

  return (
    <Form form={addProjectMilestoneForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
