import React from "react";
import { useGetWorkersQuery } from "@/api";
import { requiredValidator } from "@/util/validation";
import { MultiSelectFieldInput, TextFieldInput } from "@/components/molecules";

export const AddTeamForm = () => {
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
        label="Name"
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="description" label="Description" />

      <MultiSelectFieldInput
        name="memberIds"
        label="Members"
        options={memberOptions}
      />
    </>
  );
};
