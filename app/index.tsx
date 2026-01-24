import React from "react";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useGetCurrentUserQuery } from "@/api";

export default function Projects() {
  const userQuery = useGetCurrentUserQuery();

  return userQuery?.isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading...</Text>
    </View>
  ) : userQuery?.data ? (
    <Redirect href="/(authenticated)" />
  ) : (
    <Redirect href="/(unauthenticated)" />
  );
}
