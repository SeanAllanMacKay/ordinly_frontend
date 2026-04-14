import React from "react";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { useGetCurrentUserQuery } from "@/api";
import { Typography } from "@/components";
import { useTheme } from "react-native-paper";

export default function Projects() {
  const userQuery = useGetCurrentUserQuery();
  const theme = useTheme();

  console.log(theme.colors.onBackground);

  return userQuery?.isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.onBackground,
      }}
    >
      <Typography>Loading...</Typography>
    </View>
  ) : userQuery?.data ? (
    <Redirect href="/(authenticated)" />
  ) : (
    <Redirect href="/(unauthenticated)" />
  );
}
