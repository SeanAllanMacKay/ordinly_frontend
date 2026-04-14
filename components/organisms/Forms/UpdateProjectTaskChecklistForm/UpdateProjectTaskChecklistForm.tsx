import { Form, FormFieldArray, Typography } from "@/components/atoms";
import React, { use, useEffect, useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { UpdateProjectTaskChecklistItem } from "./UpdateProjectTaskChecklistItem";
import { View } from "react-native";
import debounce from "lodash.debounce";
import { useUpdateTaskChecklistMutation } from "@/api";

export const UpdateProjectTaskChecklistForm = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  const isFirstRender = useRef(true);
  const updateProjectTaskChecklistForm = useFormContext();
  const updateProjectTaskMutation = useUpdateTaskChecklistMutation({
    projectId,
    taskId,
  });

  const checklistItems = useWatch({
    control: updateProjectTaskChecklistForm.control,
    name: "items",
  });

  const debouncedSave = useMemo(
    () =>
      debounce(async () => {
        const isValid = await updateProjectTaskChecklistForm.trigger();

        if (isValid) {
          updateProjectTaskChecklistForm.handleSubmit((data) => {
            updateProjectTaskMutation.mutate(data);
          })();
        }
      }, 2000),
    [updateProjectTaskChecklistForm],
  );

  useEffect(() => {
    const subscription = updateProjectTaskChecklistForm.watch(
      (_value, { type }) => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }

        if (type === "change") {
          debouncedSave();
        }
      },
    );
    return () => {
      subscription.unsubscribe();
      debouncedSave.cancel();
    };
  }, [debouncedSave, updateProjectTaskChecklistForm.watch]);

  return (
    <View style={{ position: "relative" }}>
      <FormFieldArray
        name="items"
        defaultItemValue={{
          id: undefined,
          name: "",
          isComplete: false,
          order: checklistItems.length,
        }}
        wrapper={
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          />
        }
        itemComponent={({ name, onRemove, item, index }) => {
          return (
            <UpdateProjectTaskChecklistItem
              name={name}
              onRemove={() => {
                debouncedSave();
                onRemove?.();
              }}
              item={item}
              index={index}
            />
          );
        }}
      />

      {updateProjectTaskChecklistForm.formState.isSubmitting ? (
        <Typography>Saving...</Typography>
      ) : null}
    </View>
  );
};
