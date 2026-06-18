import { EnrichedTypographyProps } from "./types";
import { enrichedTypographyStyles } from "./styles";
import { EnrichedTextInput as SMEnrichedTextInput } from "react-native-enriched";
import React from "react";

export const EnrichedTypography = ({ text }: EnrichedTypographyProps) => {
  return (
    <SMEnrichedTextInput
      defaultValue={text}
      editable={false}
      pointerEvents="none"
    />
  );
};
