import React from "react";
import { useTranslation } from "react-i18next";
import { useGetWorkersQuery } from "@/api";
import { requiredValidator } from "@/util/validation";
import { MultiSelectFieldInput, TextFieldInput } from "@/components/molecules";

export const AddTeamForm = () => {
  const { t } = useTranslation("companies");
  const workers = useGetWorkersQuery({ page: 1 });

  const memberOptions =
    workers.data?.members.map((member) => ({
      value: member.id,
      label: member.user.name,
    })) ?? [];

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="description" label={t("description")} />

      <MultiSelectFieldInput
        name="memberIds"
        label={t("addTeam.members")}
        options={memberOptions}
      />
    </>
  );
};
