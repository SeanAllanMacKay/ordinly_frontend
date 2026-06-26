import React, { PropsWithChildren, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/atoms";
import { useGetCurrentUserQuery } from "@/api";
import { profilePictureToUri } from "@/util/images";
import { EditAccountDetailsFormValues } from "./types";

// Seeds the edit form from the current user. The drawer only mounts while open,
// so the picker re-seeds cleanly each time it's launched.
export const EditAccountDetailsProvider = ({ children }: PropsWithChildren) => {
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user;

  const values = useMemo<EditAccountDetailsFormValues | undefined>(() => {
    if (!user) return undefined;

    const uri = profilePictureToUri(user.profilePicture);

    return {
      profilePicture: uri
        ? { uri, type: "image/jpeg", name: "profile" }
        : undefined,
      name: user.name,
      email: user.email,
    };
  }, [user]);

  const form = useForm<EditAccountDetailsFormValues>({ mode: "all", values });

  return (
    <Form form={form} isLoading={userQuery.isLoading}>
      {children}
    </Form>
  );
};
