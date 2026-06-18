import React from "react";
import { CompaniesDataList, FloatingActionButton, Screen } from "@/components";
import { routes } from "@/constants/routes";

export const CompaniesScreen = () => {
  return (
    <Screen>
      <CompaniesDataList />

      <FloatingActionButton
        icon="plus"
        href={routes.manage.companies.addCompany()}
      />
    </Screen>
  );
};
