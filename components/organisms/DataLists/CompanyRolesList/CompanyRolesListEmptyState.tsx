import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyRolesListEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="identification-card"
      title="No roles yet"
      subtitle="Roles you create will show up here."
      actions={[
        <Button
          key="add-role"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add role"
          onPress={() => open("add-role")}
        />,
      ]}
    />
  );
};
