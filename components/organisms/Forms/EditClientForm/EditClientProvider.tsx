import { useGetClientQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditClientFormFieldTypes } from "./types";

export const EditClientProvider = ({
  clientId,
  children,
}: PropsWithChildren<{ clientId: string }>) => {
  const clientQuery = useGetClientQuery({ clientId });

  const values = useMemo<EditClientFormFieldTypes | undefined>(() => {
    if (clientQuery.data) {
      const { client } = clientQuery.data;
      return {
        name: client.name,
        description: client.description ?? "",
        userIds: client.users?.map((user) => user.id) ?? [],
        teamIds: client.teams?.map((team) => team.id) ?? [],
      };
    }
  }, [clientQuery.data]);

  const editClientForm = useForm<EditClientFormFieldTypes>({
    mode: "all",
    values,
  });

  return (
    <Form form={editClientForm} isLoading={clientQuery.isLoading}>
      {children}
    </Form>
  );
};
