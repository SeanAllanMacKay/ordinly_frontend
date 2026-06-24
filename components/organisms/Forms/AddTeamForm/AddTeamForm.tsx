import React from "react";
import { useGetWorkersQuery } from "@/api";
import { requiredValidator } from "@/util/validation";
import { MultiSelectInputField, TextInputField } from "@/components/molecules";

export const AddTeamForm = () => {
  const workers = useGetWorkersQuery({ page: 1 });

  const memberOptions =
    workers.data?.members.map((member) => ({
      value: member.id,
      label: member.user.name,
    })) ?? [];

  return (
    <>
      <TextInputField
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <TextInputField name="description" label="Description" />

      <MultiSelectInputField
        name="memberIds"
        label="Members"
        options={memberOptions}
      />
    </>
  );
};
