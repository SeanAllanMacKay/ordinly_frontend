import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyTeamsListEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="crew"
      title="No teams yet"
      subtitle="Teams you create will show up here."
      actions={[
        <Button
          key="add-team"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add team"
          onPress={() => open("add-team")}
        />,
      ]}
    />
  );
};
