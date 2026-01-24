import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Text, View } from "react-native";

export default function Dashboard() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Dashboard" });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard</Text>
    </View>
  );
}
