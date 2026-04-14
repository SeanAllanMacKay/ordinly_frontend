import { Button, Checkbox } from "@/components/atoms";
import { CheckboxInputField, TextInputField } from "@/components/molecules";
import { Spacing } from "@/styles";
import React from "react";
import { View } from "react-native";

export const UpdateProjectTaskChecklistItem = ({
  name,
  onRemove,
  item,
  index,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: Spacing.sm,
        alignItems: "center",
      }}
    >
      <CheckboxInputField name={`${name}.isComplete`} />

      <View style={{ flex: 1 }}>
        <TextInputField
          name={`${name}.name`}
          type="stealth"
          isAutoFocus={!item.id ? true : false}
          label={`Item ${index + 1}`}
        />
      </View>

      {onRemove ? <Button icon="remove" onPress={onRemove} /> : null}
    </View>
  );
};
