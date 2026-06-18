import { Alert } from "react-native";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

export const downloadFile = async (downloadURL: string, fileName: string) => {
  try {
    const destination = new File(Paths.document, fileName);
    const output = await File.downloadFileAsync(downloadURL, destination);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(output.uri);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Download failed.");
  }
};
