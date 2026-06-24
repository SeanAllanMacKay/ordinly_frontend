import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const CompanyWorkersListEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="account"
      title="No workers yet"
      subtitle="Workers you invite will show up here."
      actions={[
        <Button
          key="add-worker"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add worker"
          onPress={() => open("add-worker")}
        />,
      ]}
    />
  );
};
