import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompaniesEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="companies"
      title="No companies yet"
      subtitle="Companies you create will show up here."
      actions={[
        <Button
          key="add-company"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add company"
          onPress={() => open("add-company")}
        />,
      ]}
    />
  );
};
