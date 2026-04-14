import {
  useGetProjectTaskQuery,
  useGetTaskPrioritiesQuery,
  useGetTaskStatusesQuery,
} from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditProjectTaskFormFieldTypes } from "./types";
import { editProjectTaskSchema } from "./editProjectTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditProjectTaskProvider = ({
  children,
  projectId,
  taskId,
}: PropsWithChildren<{ projectId: string; taskId: string }>) => {
  const taskStatuses = useGetTaskStatusesQuery();
  const taskPriorities = useGetTaskPrioritiesQuery();

  const taskQuery = useGetProjectTaskQuery({
    projectId,
    taskId,
  });

  const defaultValues = useMemo(() => {
    if (taskQuery.data?.task) {
      console.log(taskQuery.data.task);

      const { name, description, startDate, dueDate, status, priority } =
        taskQuery.data.task;

      return {
        name,
        description: description ?? undefined,
        startDate: startDate ?? undefined,
        dueDate: dueDate ?? undefined,
        status: status?.id,
        priority: priority?.id,
      };
    }
  }, [taskQuery.data]);

  const editProjectTaskForm = useForm<EditProjectTaskFormFieldTypes>({
    mode: "all",
    values: defaultValues,
    resolver: zodResolver(editProjectTaskSchema),
    shouldUnregister: false,
  });

  const isLoading = taskStatuses.isLoading || taskPriorities.isLoading;

  return (
    <Form form={editProjectTaskForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
