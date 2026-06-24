import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ClientContactsEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="identification-card"
      title="No contacts yet"
      subtitle="Contacts you add for this client will show up here."
      actions={[
        <Button
          key="add-contact"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add contact"
          onPress={() => open("add-contact")}
        />,
      ]}
    />
  );
};
