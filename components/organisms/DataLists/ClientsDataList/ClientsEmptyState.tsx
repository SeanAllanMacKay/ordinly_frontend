import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ClientsEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="blueprint"
      title="No clients yet"
      subtitle="Clients you add will show up here."
      actions={[
        <Button
          key="add-client"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add client"
          onPress={() => open("add-client")}
        />,
      ]}
    />
  );
};
