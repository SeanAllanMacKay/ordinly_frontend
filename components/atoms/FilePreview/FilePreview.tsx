import React from "react";
import { View } from "react-native";
import { filePreviewStyles } from "./styles";
import { FilePreviewProps } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

export const FilePreview = ({ size, name }: FilePreviewProps) => {
  return (
    <View>
      <Icon name="document" size="xs" />

      <Typography>{name.split(".").pop()}</Typography>
    </View>
  );
};
