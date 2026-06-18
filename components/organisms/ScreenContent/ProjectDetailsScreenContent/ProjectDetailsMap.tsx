import React, { useContext } from "react";
import { Map } from "@/components/molecules";
import { ProjectDetailsContext } from "./ProjectDetailsProvider";

export const ProjectDetailsMap = () => {
  const { isLoading, data } = useContext(ProjectDetailsContext);

  const primaryLocation = data?.project?.locations?.[0];

  return primaryLocation ? (
    <Map
      center={
        primaryLocation
          ? [
              primaryLocation.coordinates.longitude,
              primaryLocation.coordinates.latitude,
            ]
          : undefined
      }
      markers={
        primaryLocation
          ? [
              [
                primaryLocation.coordinates.longitude,
                primaryLocation.coordinates.latitude,
              ],
            ]
          : undefined
      }
    />
  ) : null;
};
