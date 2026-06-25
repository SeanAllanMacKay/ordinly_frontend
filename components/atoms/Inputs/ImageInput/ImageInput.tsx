import React, { useState } from "react";
import { Alert, Pressable, View, Image, Platform } from "react-native";
import { imageInputStyles as styles } from "./styles";
import { ImageInputProps } from "./types";
import { useGetImageMetadataQuery } from "@/api";
import { Icon } from "../../Icon";
import { useTheme } from "react-native-paper";
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { useTranslation } from "react-i18next";

export const ImageInput = ({
  value,
  onChange,
  isDisabled: isDisabledProp,
}: ImageInputProps) => {
  const [permissions, requestPermission] = useMediaLibraryPermissions();
  const theme = useTheme();
  const { t } = useTranslation("documents");
  const imageMetadataQuery = useGetImageMetadataQuery();

  const [image, setImage] = useState<string | undefined>(value?.uri);

  const isDisabled =
    isDisabledProp ||
    imageMetadataQuery.isLoading ||
    !!imageMetadataQuery.error;

  const onOpen = async () => {
    if (permissions?.status !== "granted") {
      const response = await requestPermission();

      if (!response.granted) {
        Alert.alert(t("permissionNeeded"), t("allowPhotoAccess"));
        return;
      }
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const { uri, fileName, mimeType, file } = result.assets[0];

      setImage(uri);
      onChange(
        Platform.select({
          native: { uri, type: mimeType ?? "*/*", name: fileName },
          web: file,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onOpen} disabled={isDisabled}>
        <View
          style={[
            styles.image,
            {
              backgroundColor: value
                ? "transparent"
                : theme.colors.primaryContainer,
            },
          ]}
        >
          {!image ? (
            <Icon name="image" size="xxxl" color="onPrimaryContainer" />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                marginTop: 15,
              }}
            />
          )}
        </View>
      </Pressable>
    </View>
  );
};
