import { useGetProjectTaskQuery } from "@/api";
import { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { UpdateProjectTaskChecklistFormFieldTypes } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProjectTaskChecklistSchema } from "./updateProjectTaskChecklistSchema";
import { Form } from "@/components/atoms";
import React from "react";

export const UpdateProjectTaskChecklistFormProvider = ({
  children,
  projectId,
  taskId,
}: PropsWithChildren<{ projectId: string; taskId: string }>) => {
  const taskQuery = useGetProjectTaskQuery({
    projectId,
    taskId,
  });

  const defaultValues = useMemo(() => {
    if (taskQuery.data?.task) {
      const { checklist } = taskQuery.data.task;

      return {
        items: checklist?.length
          ? checklist
          : [
              {
                id: undefined,
                name: "",
                isComplete: false,
                order: 0,
              },
            ],
      };
    }

    return {
      items: [],
    };
  }, [taskQuery.data]);

  const editProjectTaskForm = useForm<UpdateProjectTaskChecklistFormFieldTypes>(
    {
      mode: "all",
      values: defaultValues,
      resolver: zodResolver(updateProjectTaskChecklistSchema),
      shouldUnregister: false,
    },
  );

  return (
    <Form form={editProjectTaskForm} isLoading={taskQuery.isLoading}>
      {children}
    </Form>
  );
};
