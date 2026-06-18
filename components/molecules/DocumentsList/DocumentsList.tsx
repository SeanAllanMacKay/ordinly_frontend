import { DocumentType } from "@/api";
import { Button, Typography } from "@/components/atoms";
import { format } from "date-fns";
import React from "react";
import { Pressable, View, Linking, Alert } from "react-native";
import { downloadFile } from "@/util/files";
import { documentsListStyles } from "./styles";
import { useTheme } from "react-native-paper";

export const DocumentsList = ({
  documents,
  getDownloadURL,
}: {
  documents: DocumentType[];
  getDownloadURL: (document: DocumentType) => Promise<string>;
}) => {
  const theme = useTheme();
  const openFile = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "No app installed to open this file.");
      }
    } catch (error) {
      console.error("An error occurred", error);
      Alert.alert("Error", "Unable to open file preview.");
    }
  };

  const onDownload = async (document: DocumentType) => {
    try {
      const downloadURL = await getDownloadURL(document);

      downloadFile(downloadURL, document.name);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "An unexpected error occurred during download.");
    }
  };

  return (
    <View style={documentsListStyles.container}>
      {documents.map(
        ({ externalURL, name, createdDate, ...restDocument }, index) => (
          <View
            style={[
              documentsListStyles.itemContainer,
              documents.length > 1 &&
                index !== documents.length - 1 && {
                  ...documentsListStyles.itemUnder,
                  borderBottomColor: theme.colors.surfaceVariant,
                },
              index > 0 && documentsListStyles.itemAbove,
            ]}
          >
            <Pressable
              onPress={() => {
                openFile(externalURL);
              }}
              style={{ flex: 1 }}
            >
              <View style={[documentsListStyles.info]}>
                <Typography canWrap={false}>{name}</Typography>
                <Typography emphasis="low" size="sm" color="onSurfaceVariant">
                  {format(new Date(createdDate), "MMM dd, yyyy")}
                </Typography>
              </View>
            </Pressable>

            <Button
              icon="download"
              onPress={() =>
                onDownload({ ...restDocument, externalURL, name, createdDate })
              }
            />
          </View>
        ),
      )}
    </View>
  );
};
