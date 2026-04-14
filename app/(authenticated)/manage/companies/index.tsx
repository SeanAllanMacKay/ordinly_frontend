import React from "react";
import { CompaniesDataList, Screen } from "@/components";
import { routes } from "@/constants/routes";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";

export default function Projects() {
  return (
    <Screen>
      <CompaniesDataList />

      <FloatingActionButton
        icon="plus"
        label="Add company"
        href={routes.manage.companies.addCompany()}
      />
    </Screen>
  );
}
