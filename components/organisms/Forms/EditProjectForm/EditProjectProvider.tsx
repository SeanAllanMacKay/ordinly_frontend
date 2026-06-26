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
      const { project } = projectQuery.data;
      return {
        name: project.name,
        description: project.description,
        status: project.status?.id,
        priority: project.priority?.id,
        startDate: project.startDate,
        dueDate: project.dueDate,
        location: {
          latitude: project.locations?.[0]?.latitude,
          longitude: project.locations?.[0]?.longitude,
          type: project.locations?.[0]?.type,
        },
        clientId: project.clients?.[0]?.id,
        contactIds: project.contacts?.map((contact) => contact.id) ?? [],
        userIds: project.users?.map((user) => user.id) ?? [],
        teamIds: project.teams?.map((team) => team.id) ?? [],
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
