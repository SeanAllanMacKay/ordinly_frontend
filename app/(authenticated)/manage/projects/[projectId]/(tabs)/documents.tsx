import { useGetPersonalProjectQuery } from "@/api-abstraction/queries";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { Screen } from "@/components";

export default function ProjectDocuments() {
  const navigation = useNavigation();

  const params = useLocalSearchParams<{ projectId: string }>();

  const { data: { project } = {} } = useGetPersonalProjectQuery({
    projectId: params?.projectId,
  });

  return (
    <Screen>
      <Text>Documents</Text>
    </Screen>
  );
}
