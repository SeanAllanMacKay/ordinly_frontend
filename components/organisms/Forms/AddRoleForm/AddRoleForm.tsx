import React from "react";
import { View } from "react-native";
import { requiredValidator } from "@/util/validation";
import { TextFieldInput } from "@/components/molecules";
import { Typography } from "@/components/atoms";
import { Spacing } from "@/styles";

export const AddRoleForm = () => {
  return (
    <>
      <TextFieldInput
        name="name"
        label="Name"
        validation={{ requiredValidator }}
      />

      <TextFieldInput name="description" label="Description (optional)" />

      {/* Permissions are stubbed for now — wiring them up is a larger effort
          that depends on the backend permission model. */}
      <View style={{ gap: Spacing.sm, opacity: 0.5 }}>
        <Typography emphasis="medium">Permissions</Typography>
        <Typography size="sm" color="onSurfaceVariant">
          Permission management is coming soon.
        </Typography>
      </View>
    </>
  );
};
