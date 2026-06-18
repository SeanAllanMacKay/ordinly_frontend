import React from "react";
import { useRouter } from "expo-router";
import { AddProjectScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const AddProject = () => {
  const router = useRouter();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.projects.root());
    }
  };

  return <AddProjectScreen onClose={onClose} />;
};

export default AddProject;
