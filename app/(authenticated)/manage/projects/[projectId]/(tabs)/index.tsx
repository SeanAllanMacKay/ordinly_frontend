import { useGetPersonalProjectQuery } from "@/api-abstraction/queries";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Button, Card, Screen } from "@/components";
import { format } from "date-fns";
import { Tag } from "@/components/atoms/Tag";
import { Spacing } from "@/constants/Spacing";
import { routes } from "@/constants/routes";

const detailsItems = [
  "name",
  "description",
  "priority",
  "status",
  "startDate",
  "dueDate",
];

const labelMapping: Record<(typeof detailsItems)[number], any> = {
  name: "Name",
  description: "Description",
  priority: "Priority",
  status: "Status",
  startDate: "Start date",
  dueDate: "Due date",
};

const valueFormatter = ({ key, value }) => {
  if (["name", "description"].includes(key)) {
    return value;
  }

  if (!isNaN(new Date(value).getTime())) {
    return format(new Date(value), "dd MMM yyyy");
  }

  if (["priority", "status"].includes(key)) {
    return <Tag variant={value} />;
  }

  return value;
};

const detailsSelector = ({ project }) => ({
  project: Object.entries(project).reduce((aggregator, [key, value]) => {
    if (detailsItems.includes(key)) {
      return [
        ...aggregator,
        { label: labelMapping[key], value: valueFormatter({ key, value }) },
      ];
    }

    return aggregator;
  }, []),
});

export default function ProjectDetails() {
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ projectId: string }>();

  const { data: { project } = {} } = useGetPersonalProjectQuery({
    projectId: params?.projectId,
    options: {
      select: detailsSelector,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: project?.name,
    });
  }, [navigation, project?.name]);

  return (
    <Screen>
      <Card
        title="Details"
        style={{ maxWidth: 1500 }}
        headerRight={
          <Button
            icon="pencil-outline"
            style={{ marginRight: Spacing.m }}
            href={routes.manage.projects.editProject(params.projectId)}
          >
            Edit
          </Button>
        }
      ></Card>
    </Screen>
  );
}
