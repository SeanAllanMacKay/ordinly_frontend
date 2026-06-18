import {
  useGetProjectPrioritiesQuery,
  useGetProjectQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditProjectFormFieldTypes } from "./types";

export const EditProjectProvider = ({
  projectId,
  children,
}: PropsWithChildren<{ projectId: string }>) => {
  const projectQuery = useGetProjectQuery({ projectId });

  const values = useMemo(() => {
    if (projectQuery.data) {
      return {
        name: projectQuery.data.project.name,
        description: projectQuery.data.project.description,
        status: projectQuery.data.project.status?.id,
        priority: projectQuery.data.project.priority?.id,
        startDate: projectQuery.data.project.startDate,
        dueDate: projectQuery.data.project.dueDate,
        location: {
          latitude: projectQuery.data.project.locations?.[0]?.latitude,
          longitude: projectQuery.data.project.locations?.[0]?.longitude,
          type: projectQuery.data.project.locations?.[0]?.type,
        },
      };
    }
  }, [projectQuery.data]);

  const editProjectForm = useForm<EditProjectFormFieldTypes>({
    mode: "all",
    values,
  });

  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();

  const isLoading = projectPriorities.isLoading || projectStatuses.isLoading;

  return (
    <Form form={editProjectForm} isLoading={isLoading}>
      {children}
    </Form>
  );
};
