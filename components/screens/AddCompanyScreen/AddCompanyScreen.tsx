import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("companies");
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user;
  const isUnverified = !!user && !user.isVerified;

  const resendMutation = useResendVerificationMutation();
  const resendLabel = resendMutation.isSuccess
    ? t("addCompany.emailSent")
    : resendMutation.isPending
      ? t("addCompany.sending")
      : t("addCompany.resendEmail");

  if (isUnverified) {
    return (
      <Modal
        title={t("addCompany.verificationRequiredTitle")}
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
        <Typography>{t("addCompany.verificationRequiredBody")}</Typography>
      </Modal>
    );
  }

  return (
    <AddCompanyProvider>
      <Drawer
        title={t("addCompany.title")}
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
