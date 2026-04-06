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
import { useEditProjectMutation } from "@/api-abstraction/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { projectQueryKeys } from "@/api-abstraction/queries/queryKeys";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useGetProjectPrioritiesQuery,
  useGetProjectQuery,
  useGetProjectStatusesQuery,
} from "@/api";

export default function EditProject() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useLocalSearchParams<{ projectId: string }>();

  const projectQuery = useGetProjectQuery({
    projectId: params?.projectId,
  });
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const isLoading =
    projectPriorities.isLoading ||
    projectStatuses.isLoading ||
    projectQuery.isLoading;

  const editProjectForm = useForm<{
    name: string;
    description: string;
    status: "notStarted" | "blocked" | "inProgress" | "complete";
    priority: "critical" | "high" | "medium" | "low";
    startDate: Date;
    dueDate: Date;
  }>({
    mode: "all",
    defaultValues: {
      ...projectQuery.data?.project,
      status: projectQuery.data?.project?.status?.id,
      priority: projectQuery.data?.project?.priority?.id,
    },
  });

  const editProjectMutation = useEditProjectMutation({
    projectId: params?.projectId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.personalProjects(),
      });

      router.back();
    },
  });

  const onSubmit = editProjectForm.handleSubmit((formValues) => {
    editProjectMutation.mutate(formValues);
  });

  return (
    <Modal
      title="Edit project"
      actions={[
        <Button icon="edit" onPress={onSubmit} mode="contained" label="Save" />,
      ]}
    >
      <Form form={editProjectForm} isLoading={isLoading}>
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
            <Select {...fieldProps} options={projectStatuses.data ?? []} />
          )}
        />

        <FormField
          name="priority"
          label="Priority"
          component={(fieldProps) => (
            <Select {...fieldProps} options={projectPriorities.data ?? []} />
          )}
        />

        <FormField name="startDate" label="Start date" component={DateInput} />

        <FormField name="dueDate" label="Due date" component={DateInput} />
      </Form>
    </Modal>
  );
}
