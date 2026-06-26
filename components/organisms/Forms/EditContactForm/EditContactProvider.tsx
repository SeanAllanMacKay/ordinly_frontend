import { useGetClientContactQuery } from "@/api";
import { Form } from "@/components/atoms";
import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { EditContactFormFieldTypes } from "./types";
import { fromContact } from "./util";

export const EditContactProvider = ({
  clientId,
  contactId,
  children,
}: PropsWithChildren<{ clientId: string; contactId: string }>) => {
  const contactQuery = useGetClientContactQuery({ clientId, contactId });

  const values = useMemo<EditContactFormFieldTypes | undefined>(() => {
    if (contactQuery.data) {
      return fromContact(contactQuery.data.contact);
    }
  }, [contactQuery.data]);

  const editContactForm = useForm<EditContactFormFieldTypes>({
    mode: "all",
    values,
  });

  return (
    <Form form={editContactForm} isLoading={contactQuery.isLoading}>
      {children}
    </Form>
  );
};
