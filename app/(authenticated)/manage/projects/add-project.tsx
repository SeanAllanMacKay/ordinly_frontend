import React, { useState } from "react";
import {
  AddProjectSubmissionButton,
  AddProjectForm,
  AddProjectProvider,
  Drawer,
  TextInput,
} from "@/components";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";

export default function AddProject() {
  const router = useRouter();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.projects.root());
    }
  };

  return (
    <AddProjectProvider>
      <Drawer
        title="Add project"
        actions={[<AddProjectSubmissionButton onSuccess={onClose} />]}
        isVisible={true}
        onClose={onClose}
      >
        <AddProjectForm />
      </Drawer>
    </AddProjectProvider>
  );
}
