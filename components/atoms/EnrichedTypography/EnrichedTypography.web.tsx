import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EnrichedTypographyProps } from "./types";
import React from "react";
import { Spacing } from "@/styles";
import { useTheme } from "react-native-paper";

export const EnrichedTypography = ({ text }: EnrichedTypographyProps) => {
  const theme = useTheme();

  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: text,
    editorProps: {
      attributes: {
        style: `font-family: "Roboto", sans-serif; outline: none; padding-left: ${Spacing.md}px; color: ${theme.colors.onBackground};`,
      },
    },
  });

  return <EditorContent editor={editor} />;
};
