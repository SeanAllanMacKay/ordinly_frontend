import React from "react";
import {
  Form,
  FormField,
  Modal,
  TextInput,
  Select,
  DateInput,
  Button,
} from "@/components";
import { useForm } from "react-hook-form";
import { requiredValidator } from "@/util/validation";
import { useCreateProjectTaskMutation } from "@/api-abstraction/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { projectQueryKeys } from "@/api-abstraction/queries/queryKeys";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { TASK_PRIORITIES } from "@/constants/TASK_PRIORITIES";
import { TASK_STATUSES } from "@/constants/TASK_STATUSES";

export default function AddTask() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useGlobalSearchParams<{ projectId: string }>();

  const addTaskForm = useForm<{
    name: string;
    description: string;
    status: "notStarted" | "blocked" | "inProgress" | "complete";
    priority: "critical" | "high" | "medium" | "low";
    startDate: Date;
    dueDate: Date;
  }>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      status: "notStarted",
      priority: "medium",
    },
  });

  const addTaskMutation = useCreateProjectTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.personalProjectTasks(params?.projectId),
      });

      router.back();
    },
  });

  const onSubmit = addTaskForm.handleSubmit((formValues) =>
    addTaskMutation.mutate(formValues)
  );

  return (
    <Modal
      title="Add task"
      actions={[
        <Button icon="plus" onPress={onSubmit} mode="contained">
          Add task
        </Button>,
      ]}
    >
      <Form form={addTaskForm}>
        <FormField
          name="name"
          label="Name"
          component={TextInput}
          validation={{ requiredValidator }}
        />

        <FormField
          name="description"
          label="Description"
          component={(fieldProps) => (
            <TextInput {...fieldProps} type="multiline" />
          )}
        />

        <FormField
          name="status"
          label="Status"
          component={(fieldProps) => (
            <Select {...fieldProps} options={TASK_STATUSES} />
          )}
        />

        <FormField
          name="priority"
          label="Priority"
          component={(fieldProps) => (
            <Select {...fieldProps} options={TASK_PRIORITIES} />
          )}
        />

        <FormField name="startDate" label="Start date" component={DateInput} />

        <FormField name="dueDate" label="Due date" component={DateInput} />
      </Form>
    </Modal>
  );
}
