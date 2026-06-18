import React, { useContext } from "react";
import { ProjectDetailsContext } from "./ProjectDetailsProvider";
import { View } from "react-native";
import { Tag } from "@/components/atoms";

export const ProjectDetailsTags = () => {
  const { isLoading, data } = useContext(ProjectDetailsContext);

  const status = data?.project.status;
  const priority = data?.project.priority;

  return status || priority ? (
    <View>
      {status ? (
        <Tag variant={status.name} text={status.name} color={status.color} />
      ) : null}

      {priority ? (
        <Tag
          variant={priority.name}
          text={priority.name}
          color={priority.color}
        />
      ) : null}
    </View>
  ) : null;
};
