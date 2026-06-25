import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { requiredValidator } from "@/util/validation";
import { TextFieldInput } from "@/components/molecules";
import { Typography } from "@/components/atoms";
import { Spacing } from "@/styles";

export const AddRoleForm = () => {
  const { t } = useTranslation("companies");

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="description" label={t("addRole.descriptionLabel")} />

      {/* Permissions are stubbed for now — wiring them up is a larger effort
          that depends on the backend permission model. */}
      <View style={{ gap: Spacing.sm, opacity: 0.5 }}>
        <Typography emphasis="medium">{t("addRole.permissions")}</Typography>
        <Typography size="sm" color="onSurfaceVariant">
          {t("addRole.permissionsComingSoon")}
        </Typography>
      </View>
    </>
  );
};
