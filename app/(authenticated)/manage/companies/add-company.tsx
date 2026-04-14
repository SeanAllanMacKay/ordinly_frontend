import React from "react";
import {
  AddCompanyForm,
  AddCompanyProvider,
  AddCompanySubmissionButton,
  Button,
  Drawer,
  EnrichedTextInputField,
  Form,
  FormField,
  Modal,
  TextInput,
} from "@/components";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { requiredValidator } from "@/util/validation";
import { routes } from "@/constants/routes";

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

  const onSubmit = addCompanyForm.handleSubmit((formValues) => {});

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.companies.root());
    }
  };

  return (
    <AddCompanyProvider>
      <Drawer
        title="Add company"
        actions={[<AddCompanySubmissionButton onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddCompanyForm />
      </Drawer>
    </AddCompanyProvider>
  );
}
