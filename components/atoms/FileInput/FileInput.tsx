import React, { useEffect, useState } from "react";
import { View, Alert, Pressable, Platform } from "react-native";
import { fileInputStyles } from "./styles";
import { FileInputProps, FileType, LocalFileType } from "./types";
import * as DocumentPicker from "expo-document-picker";
import { useGetFileMetadataQuery } from "@/api";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useTheme } from "react-native-paper";

export const FileInput = ({ value = [], onChange }: FileInputProps) => {
  const [files, setFiles] = useState<FileInputProps["value"]>(value);
  const theme = useTheme();

  const acceptedFileTypesQuery = useGetFileMetadataQuery();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedFileTypesQuery?.data?.metadata?.acceptedFileTypes,
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const newFiles = result.assets.reduce(
          (total: LocalFileType[], current) => {
            const newFile = Platform.select({
              native: { ...current, type: current.mimeType ?? "*/*" },
              web: current.file,
            });

            if (newFile) {
              return [...total, newFile];
            } else {
              return total;
            }
          },
          [],
        );

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <View style={fileInputStyles.container}>
      <Pressable onPress={pickDocument}>
        <View
          style={[
            fileInputStyles.picker,
            {
              backgroundColor: theme.colors.surfaceVariant,
              borderColor: theme.colors.onSurfaceVariant,
            },
          ]}
        >
          <Icon
            name="document-upload"
            sizeOverride={35}
            color="onSurfaceVariant"
          />
          <Typography color="onSurfaceVariant">Select a file </Typography>
        </View>
      </Pressable>

      <View style={fileInputStyles.filesContainer}>
        {files?.map(({ name }, index) => (
          <View
            style={[
              fileInputStyles.file,
              files?.length > 1
                ? index !== files.length - 1
                  ? {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.colors.surfaceVariant,
                    }
                  : null
                : null,
            ]}
          >
            <Typography>{name}</Typography>

            <Button icon="close" onPress={() => removeFile(index)} />
          </View>
        ))}
      </View>
    </View>
  );
};
