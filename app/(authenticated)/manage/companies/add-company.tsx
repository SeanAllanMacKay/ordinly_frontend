import React from "react";
import { Pressable, Text } from "react-native";
import { Button, Form, FormField, Modal, TextInput } from "@/components";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { companyQueryKeys } from "@/api-abstraction/queries/queryKeys/companyQueryKeys";
import { useCreateCompanyMutation } from "@/api-abstraction/mutations";
import { requiredValidator } from "@/util/validation";

export default function AddCompany() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addCompanyForm = useForm<{
    name: string;
    description: string;
  }>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const addCompanyMutation = useCreateCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: companyQueryKeys.root(),
      });

      router.back();
    },
  });

  const onSubmit = addCompanyForm.handleSubmit((formValues) =>
    addCompanyMutation.mutate(formValues)
  );

  return (
    <Modal
      title="Add company"
      actions={[
        <Button icon="plus" onPress={onSubmit} mode="contained">
          Add company
        </Button>,
      ]}
    >
      <Form form={addCompanyForm}>
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
      </Form>
    </Modal>
  );
}
