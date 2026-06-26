import {
  useGetProjectPrioritiesQuery,
  useGetProjectQuery,
  useGetProjectStatusesQuery,
} from "@/api";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { EditProjectFormFieldTypes } from "./types";
import { requiredValidator } from "@/util/validation";
import {
  DateFieldInput,
  EnrichedTextFieldInput,
  SelectFieldInput,
  TextFieldInput,
} from "@/components/molecules";
import {
  ClientDataFieldInput,
  LocationDataFieldInput,
  MultiContactDataFieldInput,
  MultiTeamDataFieldInput,
  MultiWorkerDataFieldInput,
  formatLocationDisplayValue,
  mapFeatureToLocationValue,
} from "@/components/organisms/DataFieldInputs";
import { useActiveCompanyId } from "@/util/navigation/useActiveCompanyId";

export const EditProjectForm = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation("projects");
  const editProjectForm = useFormContext<EditProjectFormFieldTypes>();
  const companyId = useActiveCompanyId();
  const projectStatuses = useGetProjectStatusesQuery();
  const projectPriorities = useGetProjectPrioritiesQuery();
  const projectQuery = useGetProjectQuery({ projectId });

  const min = useWatch({ control: editProjectForm.control, name: "startDate" });
  const max = useWatch({ control: editProjectForm.control, name: "dueDate" });

  // Contacts are scoped to the selected client; clear chosen contacts when the
  // user switches client. Only clear when moving away from a previously-selected
  // client so the async prefill (undefined -> stored client) keeps its contacts.
  const selectedClientId = useWatch({
    control: editProjectForm.control,
    name: "clientId",
  });
  const { setValue } = editProjectForm;
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

  const storedLocation = projectQuery?.data?.project?.locations?.[0];

  return (
    <>
      <TextFieldInput
        name="name"
        label={t("name")}
        validation={{ requiredValidator }}
      />

      <EnrichedTextFieldInput name="description" label={t("description")} />

      <SelectFieldInput
        name="status"
        label={t("status")}
        options={projectStatuses.data ?? []}
      />

      <SelectFieldInput
        name="priority"
        label={t("priority")}
        options={projectPriorities.data ?? []}
      />

      <DateFieldInput name="startDate" label={t("startDate")} max={max} />

      <DateFieldInput name="dueDate" label={t("dueDate")} min={min} />

      <LocationDataFieldInput
        name="location"
        label={t("address")}
        defaultDisplayValue={
          storedLocation
            ? formatLocationDisplayValue(mapFeatureToLocationValue(storedLocation))
            : undefined
        }
      />

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
