import React from "react";
import {
  AddCompanyForm,
  AddCompanyProvider,
  AddCompanySubmissionButton,
  Button,
  Drawer,
  Modal,
  Typography,
} from "@/components";
import { useGetCurrentUserQuery, useResendVerificationMutation } from "@/api";
import { AddCompanyScreenProps } from "./types";

export const AddCompanyScreen = ({ onClose }: AddCompanyScreenProps) => {
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user;
  const isUnverified = !!user && !user.isVerified;

  const resendMutation = useResendVerificationMutation();
  const resendLabel = resendMutation.isSuccess
    ? "Email sent"
    : resendMutation.isPending
      ? "Sending…"
      : "Resend email";

  if (isUnverified) {
    return (
      <Modal
        title="Verification required"
        isVisible
        actions={[
          <Button
            key="resend"
            label={resendLabel}
            onPress={() => resendMutation.mutate()}
            isLoading={resendMutation.isPending}
            isDisabled={resendMutation.isPending || resendMutation.isSuccess}
          />,
        ]}
        onClose={onClose}
      >
        <Typography>
          Your account must be verified to create a company.
        </Typography>
      </Modal>
    );
  }

  return (
    <AddCompanyProvider>
      <Drawer
        title="Add company"
        actions={[
          <AddCompanySubmissionButton key="submit" onSuccess={onClose} />,
        ]}
        isVisible={true}
        onClose={onClose}
      >
        <AddCompanyForm />
      </Drawer>
    </AddCompanyProvider>
  );
};
