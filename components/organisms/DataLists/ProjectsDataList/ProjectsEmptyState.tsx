import React from "react";
import { Button, EmptyState } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";

export const ProjectsEmptyState = () => {
  const { open } = useDrawers();

  return (
    <EmptyState
      icon="projects"
      title="No projects yet"
      subtitle="Projects you create will show up here."
      actions={[
        <Button
          key="add-project"
          variant="primary"
          mode="contained"
          icon="plus"
          label="Add project"
          onPress={() => open("add-project")}
        />,
      ]}
    />
  );
};
