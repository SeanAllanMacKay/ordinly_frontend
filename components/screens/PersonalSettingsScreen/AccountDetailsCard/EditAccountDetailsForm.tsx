import React from "react";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, ImageFieldInput, TextFieldInput } from "@/components";
import { accountDetailsCardStyles as styles } from "./styles";
import { EditAccountDetailsFormValues } from "./types";

export const EditAccountDetailsForm = () => {
  const { t } = useTranslation("common");
  const form = useFormContext<EditAccountDetailsFormValues>();
  const picture = form.watch("profilePicture");

  return (
    <>
      <View style={styles.avatarRow}>
        <ImageFieldInput name="profilePicture" />

        {picture ? (
          <Button
            variant="secondary"
            mode="text"
            icon="remove"
            label={t("settings.removePhoto")}
            onPress={() =>
              form.setValue("profilePicture", undefined, { shouldDirty: true })
            }
          />
        ) : null}
      </View>

      {/* The backend can't update name/email yet, so they're read-only for now. */}
      <TextFieldInput
        name="name"
        label={t("settings.name")}
        isEditable={false}
      />
      <TextFieldInput
        name="email"
        label={t("settings.email")}
        isEditable={false}
      />
    </>
  );
};
