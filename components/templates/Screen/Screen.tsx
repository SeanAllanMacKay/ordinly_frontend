import { Spacing } from "@/constants/Spacing";
import React, { PropsWithChildren } from "react";
import {
  useWindowDimensions,
  View,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { Text } from "react-native-paper";

export const Screen = ({
  children,
  isLoading,
  backgroundImage,
}: PropsWithChildren<{
  isLoading?: boolean;
  backgroundImage?: ImageSourcePropType;
}>) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ padding: Spacing.s, flex: 1, position: "relative" }}>
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height,
            width,
          }}
          resizeMode="cover"
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#00000045",
            }}
          />
        </ImageBackground>
      ) : null}

      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      ) : (
        <View
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <View style={{ flex: 1 }}>{children}</View>
        </View>
      )}
    </View>
  );
};
