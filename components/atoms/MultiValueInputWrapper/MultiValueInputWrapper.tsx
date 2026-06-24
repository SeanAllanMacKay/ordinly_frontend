import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { MultiValueInputWrapperProps } from "./types";
import { multiValueInputWrapperStyles as styles } from "./styles";

export const MultiValueInputWrapper = <V,>({
  value,
  onChange,
  onBlur,
  isDisabled,
  isError,
  label,
  isLoading = false,
  component,
  item,
  variant = "compact",
  validate,
}: MultiValueInputWrapperProps<V>) => {
  const [draft, setDraft] = useState<V | undefined>(undefined);
  const [draftError, setDraftError] = useState<string | undefined>(undefined);

  const items: V[] = Array.isArray(value) ? value : [];

  const onChangeDraft = (newValue: V | undefined) => {
    if (draftError) {
      setDraftError(undefined);
    }
    setDraft(newValue);
  };

  const commit = () => {
    if (draft === undefined || draft === null || draft === "") {
      return;
    }

    const error = validate?.(draft);
    if (error) {
      setDraftError(error);
      return;
    }

    onChange([...items, draft]);
    setDraft(undefined);
  };

  const removeAt = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  const updateAt = (index: number, newValue: V) =>
    onChange(items.map((existing, i) => (i === index ? newValue : existing)));

  return (
    <View style={styles.container}>
      {component({
        value: draft,
        onChange: onChangeDraft,
        onBlur,
        isDisabled,
        isError: isError || !!draftError,
        label,
        isLoading,
      })}

      {draftError ? (
        <View style={styles.errorContainer}>
          <Typography color="error">{draftError}</Typography>
        </View>
      ) : null}

      <View style={styles.actionContainer}>
        <Button
          icon="plus"
          label="Add"
          onPress={commit}
          isDisabled={isDisabled}
        />
      </View>

      {items.length ? (
        <View
          style={variant === "list" ? styles.itemsList : styles.itemsCompact}
        >
          {items.map((itemValue, index) => (
            <React.Fragment key={index}>
              {item({
                value: itemValue,
                index,
                onChange: (newValue: V) => updateAt(index, newValue),
                onRemove: () => removeAt(index),
                isDisabled,
                isError,
                isLoading,
              })}
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
};
