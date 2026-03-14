import React, { useEffect } from "react";
import {
  Form,
  FormField,
  TextInput,
  Select,
  DateInput,
  Button,
  Modal,
} from "@/components";
import { useForm } from "react-hook-form";
import { requiredValidator } from "@/util/validation";
import {
  useCreateProjectMutation,
  useGetProjectPrioritiesQuery,
  useGetProjectStatusesQuery,
} from "@/api/entities/projects";
import { useRouter } from "expo-router";

export default function AddProject() {
  const router = useRouter();

  const addProjectForm = useForm<{
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

  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const addProjectMutation = useCreateProjectMutation();

  const onSubmit = addProjectForm.handleSubmit((formValues) =>
    addProjectMutation.mutate(formValues, { onSuccess: router.back }),
  );

  useEffect(() => {
    if (projectStatuses.data?.length) {
      addProjectForm.setValue("status", projectStatuses.data[0].value);
    }
  }, [projectStatuses.data, addProjectForm]);

  useEffect(() => {
    if (projectPriorities.data?.length) {
      addProjectForm.setValue("priority", projectPriorities.data[2].value);
    }
  }, [projectPriorities.data, addProjectForm]);

  return (
    <Modal
      title="Add project"
      actions={[
        <Button
          mode="contained"
          onPress={onSubmit}
          disabled={
            projectStatuses.isLoading ||
            projectPriorities.isLoading ||
            addProjectForm.formState.isSubmitting
          }
        >
          Add project
        </Button>,
      ]}
    >
      <Form form={addProjectForm}>
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
