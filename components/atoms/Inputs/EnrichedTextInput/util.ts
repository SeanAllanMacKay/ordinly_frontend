import { Spacing } from "@/styles";
import { useTheme } from "react-native-paper";

/**
 * Returns true when the given HTML string contains actual user content
 * (i.e. once tags/whitespace are stripped there is still text). Empty
 * wrappers like `<html></html>` or `<p></p>` are treated as empty.
 */
export const htmlHasContent = (html?: string) => {
  if (!html) {
    return false;
  }

  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return text.length > 0;
};

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
