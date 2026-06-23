import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { loadingStateStyles } from "./styles";

export const LoadingState = () => {
  return (
    <View style={loadingStateStyles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};
