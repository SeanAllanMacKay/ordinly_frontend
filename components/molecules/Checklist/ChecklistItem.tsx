import React from "react";
import { List } from "react-native-paper";
import { ChecklistItemProps } from "./types";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Button } from "@/components/atoms";

export const ChecklistItem = ({
  label,
  value,
  onChange,
  onRemove,
}: ChecklistItemProps) => {
  return (
    <List.Item
      title={label}
      left={() => <Checkbox value={value} onChange={onChange} />}
      right={() =>
        onRemove ? <Button icon="remove" onPress={onRemove} /> : null
      }
    />
  );
};
