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
  showAddButton = true,
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

  const commit = (explicit?: V) => {
    // a value supplied synchronously (e.g. a selected location) wins over the
    // draft, which may not have flushed to state yet in the same tick
    const candidate = explicit ?? draft;

    if (candidate === undefined || candidate === null || candidate === "") {
      return;
    }

    const error = validate?.(candidate);
    if (error) {
      setDraftError(error);
      return;
    }

    onChange([...items, candidate]);
    setDraft(undefined);
  };

  const removeAt = (index: number) =>
    onChange(items.filter((_, i) => i !== index));

  const updateAt = (index: number, newValue: V) =>
    onChange(items.map((existing, i) => (i === index ? newValue : existing)));

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={styles.inputField}>
          {component({
            value: draft,
            onChange: onChangeDraft,
            onBlur,
            onCommit: commit,
            isDisabled,
            isError: isError || !!draftError,
            label,
            isLoading,
          })}
        </View>

        {showAddButton ? (
          <Button
            icon="plus"
            label="Add"
            onPress={() => commit()}
            isDisabled={isDisabled}
          />
        ) : null}
      </View>

      {draftError ? (
        <View style={styles.errorContainer}>
          <Typography color="error">{draftError}</Typography>
        </View>
      ) : null}

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
