import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { AddProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  ClientDataFieldInput,
  LocationDataFieldInput,
  MultiContactDataFieldInput,
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
  ProjectPriorityDataFieldInput,
  ProjectStatusDataFieldInput,
} from "@/components/organisms/DataFieldInputs";
import { View } from "react-native";
import { Spacing } from "@/styles";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const AddProjectForm = () => {
  const { t } = useTranslation("projects");
  const addProjectForm = useFormContext<AddProjectFormFieldTypes>();
  const companyId = useActiveCompanyId();

  const min = useWatch({ control: addProjectForm.control, name: "startDate" });
  const max = useWatch({ control: addProjectForm.control, name: "dueDate" });

  // Contacts are scoped to the selected client; clear any chosen contacts when
  // the user switches client so we never submit contacts from a different one.
  // Only clear when moving *away* from a previously-selected client, so async
  // edit prefill (undefined -> stored client) doesn't wipe prefilled contacts.
  const selectedClientId = useWatch({
    control: addProjectForm.control,
    name: "clientId",
  });
  const { setValue } = addProjectForm;
  const prevClientIdRef = useRef(selectedClientId);
  useEffect(() => {
    const prevClientId = prevClientIdRef.current;
    if (prevClientId !== selectedClientId) {
      prevClientIdRef.current = selectedClientId;
      if (prevClientId) {
        setValue("contactIds", []);
      }
    }
  }, [selectedClientId, setValue]);

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: Spacing.md }}>
        <ProjectPriorityDataFieldInput name="priority" />
        <ProjectStatusDataFieldInput name="status" />
      </View>

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />

      <LocationDataFieldInput name="location" label={t("address")} />

      <ClientDataFieldInput
        name="clientId"
        label={t("client")}
        companyId={companyId ?? ""}
      />

      <MultiContactDataFieldInput
        name="contactIds"
        label={t("contacts")}
        companyId={companyId ?? ""}
        clientId={selectedClientId ?? ""}
      />

      <MultiWorkerDataFieldInput
        name="userIds"
        label={t("workers")}
        companyId={companyId ?? ""}
      />

      <MultiTeamDataFieldInput
        name="teamIds"
        label={t("teams")}
        companyId={companyId ?? ""}
      />
    </>
  );
};
