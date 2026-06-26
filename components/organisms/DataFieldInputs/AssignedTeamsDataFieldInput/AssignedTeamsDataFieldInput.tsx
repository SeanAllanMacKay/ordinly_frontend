import { useGetTeamsQuery } from "@/api";
import { AssignedTeamsFieldInput } from "@/components/molecules";
import React from "react";
import { useTranslation } from "react-i18next";
import { AssignedTeamsDataFieldInputProps } from "./types";

export const AssignedTeamsDataFieldInput = ({
  name,
  label,
  validation,
  defaultValue,
  direction,
}: AssignedTeamsDataFieldInputProps) => {
  const { t } = useTranslation("common");
  const teams = useGetTeamsQuery();

  const options = (teams.data?.teams ?? []).map((team) => ({
    value: team.id,
    label: team.name,
    members: team.members.map((member) => ({ name: member.user.name })),
  }));

  return (
    <AssignedTeamsFieldInput
      name={name}
      label={label ?? t("teams")}
      validation={validation}
      defaultValue={defaultValue}
      direction={direction}
      options={options}
      placeholder={t("selectTeams")}
      modalTitle={t("selectTeams")}
    />
  );
};
