import React from "react";
import { useRouter } from "expo-router";
import { AddCompanyScreen } from "@/components/screens";
import { routes } from "@/constants/routes";

const AddCompany = () => {
  const router = useRouter();

  const onClose = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.replace(routes.manage.companies.root());
    }
  };

  return <AddCompanyScreen onClose={onClose} />;
};

export default AddCompany;
