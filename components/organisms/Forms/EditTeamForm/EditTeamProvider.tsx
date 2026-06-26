import { useGetTeamQuery, useGetWorkersQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditTeamFormFieldTypes } from "./types";

export const EditTeamProvider = ({
  teamId,
  children,
}: PropsWithChildren<{ teamId: string }>) => {
  const teamQuery = useGetTeamQuery({ teamId });
  const workers = useGetWorkersQuery({ page: 1 });

  const values = useMemo<EditTeamFormFieldTypes | undefined>(() => {
    if (teamQuery.data) {
      const { name, description, members } = teamQuery.data.team;

      // The member multi-select is keyed on the company-membership id (the same
      // value the workers list provides as options), so map each team member's
      // userId onto its membership id.
      const memberIds = members
        .map(
          (member) =>
            workers.data?.members.find(
              (worker) => worker.userId === member.userId,
            )?.id,
        )
        .filter((id): id is string => !!id);

      return {
        name,
        description: description ?? "",
        memberIds,
      };
    }
  }, [teamQuery.data, workers.data]);

  const editTeamForm = useForm<EditTeamFormFieldTypes>({
    mode: "all",
    values,
  });

  return (
    <Form
      form={editTeamForm}
      isLoading={teamQuery.isLoading || workers.isLoading}
    >
      {children}
    </Form>
  );
};
