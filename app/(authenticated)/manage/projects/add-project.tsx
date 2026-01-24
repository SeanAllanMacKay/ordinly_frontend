import React from "react";
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
import { useCreateProjectMutation } from "@/api/entities/projects";
import { useRouter } from "expo-router";
import { PROJECT_STATUSES } from "@/constants/PROJECT_STATUSES";
import { PROJECT_PRIORITIES } from "@/constants/PROJECT_PRIORITIES";

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

  const addProjectMutation = useCreateProjectMutation();

  const onSubmit = addProjectForm.handleSubmit((formValues) =>
    addProjectMutation.mutate(formValues, { onSuccess: router.back })
  );

  return (
    <Modal
      title="Add project"
      actions={[
        <Button mode="contained" onPress={onSubmit}>
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
            <Select {...fieldProps} options={PROJECT_STATUSES} />
          )}
        />

        <FormField
          name="priority"
          label="Priority"
          component={(fieldProps) => (
            <Select {...fieldProps} options={PROJECT_PRIORITIES} />
          )}
        />

        <FormField name="startDate" label="Start date" component={DateInput} />

        <FormField name="dueDate" label="Due date" component={DateInput} />
      </Form>
    </Modal>
  );
}
