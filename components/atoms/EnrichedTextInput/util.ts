import { Spacing } from "@/styles";
import { useTheme } from "react-native-paper";

export const useEnrichedTextInputTheme = ({
  hasContent,
  isFocused,
}: {
  isFocused: boolean;
  hasContent: boolean;
}) => {
  const theme = useTheme();

  return {
    container: {
      backgroundColor: theme.colors.background,
      borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
      borderRadius: theme.roundness,
      borderWidth: isFocused ? 2 : 1,
    },
    input: {},
    actionsContainer: {
      borderBottomColor: isFocused
        ? theme.colors.primaryContainer
        : theme.colors.outline,
      height: isFocused ? "auto" : 0,
    },
    labelContainer: {
      backgroundColor: theme.colors.background,
      top: isFocused || hasContent ? -Spacing.sm : Spacing.md,
    },
  };
};
