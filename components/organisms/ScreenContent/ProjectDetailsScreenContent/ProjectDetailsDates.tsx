import { Typography } from "@/components/atoms";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ProjectDetailsContext } from "./ProjectDetailsProvider";
import { format } from "date-fns";

export const ProjectDetailsDates = () => {
  const { t } = useTranslation("projects");
  const { isLoading, data } = useContext(ProjectDetailsContext);

  const startDate = data?.project.startDate;
  const endDate = data?.project.dueDate;

  return (
    <View>
      {startDate ? (
        <View>
          <Typography>{t("details.start")}</Typography>
          <Typography>{format(new Date(startDate), "MMMM d, yyyy")}</Typography>
        </View>
      ) : null}

      {endDate ? (
        <View>
          <Typography>{t("details.end")}</Typography>
          <Typography>{format(new Date(endDate), "MMMM d, yyyy")}</Typography>
        </View>
      ) : null}
    </View>
  );
};
