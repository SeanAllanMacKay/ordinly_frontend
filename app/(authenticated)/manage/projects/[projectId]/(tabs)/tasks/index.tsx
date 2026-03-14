import { useGetPersonalProjectTasksQuery } from "@/api-abstraction/queries";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useCallback } from "react";
import { Text, useWindowDimensions } from "react-native";
import { EmptyState, FlatList, Screen } from "@/components";
import { ProjectCard } from "@/components/molecules/Cards/ProjectCard";
import { ProjectType } from "@/api-abstraction/models";
import { FloatingActionButton } from "@/components/atoms/FloatingActionButton";
import { routes } from "@/constants/routes";

export default function TaskDetails() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const params = useGlobalSearchParams<{ projectId: string }>();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    refetch,
  } = useGetPersonalProjectTasksQuery({
    projectId: params?.projectId,
  });

  const numColumns = Math.floor(width / 300) || 1;

  const onFetchNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  return (
    <Screen isLoading={isLoading}>
      {data?.pages?.[0].totalItems ? (
        <FlatList<ProjectType>
          items={data?.pages.reduce(
            (aggregator, { projects }) => [...aggregator, ...projects],
            [] as ProjectType[],
          )}
          card={({ item }) => (
            <ProjectCard
              item={item}
              href={routes.manage.projects.projectDetails(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          onFetchNextPage={onFetchNextPage}
          refetch={refetch}
          isFetching={isFetching}
          key={numColumns}
        />
      ) : (
        <EmptyState variant="tasks" />
      )}

      <FloatingActionButton
        icon="plus"
        label="Add task"
        href={routes.manage.projects.tasks.addTask(params?.projectId)}
      />
    </Screen>
  );
}
