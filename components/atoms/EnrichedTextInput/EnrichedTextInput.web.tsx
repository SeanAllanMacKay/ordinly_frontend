import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EnrichedTextInputProps } from "./types";
import React, { useEffect, useRef, useState } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Pressable } from "react-native";
import { enrichedTextInputStyles } from "./styles";
import { useEnrichedTextInputTheme } from "./util";
import { useTheme } from "react-native-paper";
import { MenuButton } from "../MenuButton";
import { Button } from "../Button";
import { TextInput } from "../TextInput";
import { Typography } from "../Typography";
import { Spacing } from "@/styles";
import "./styles.web.css";

export const EnrichedTextInput = ({
  label,
  onChange,
  initialValue,
  isLoading,
  index,
}: EnrichedTextInputProps) => {
  // react-native-web resolves this Pressable ref to a DOM node at runtime,
  // though it is typed as a View — `any` lets us call DOM `.contains`.
  const containerRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    onUpdate: ({ editor }) => onChange(`<html>${editor.getHTML()}</html>`),
    editorProps: {
      attributes: {
        style: `font-family: "Roboto", sans-serif; outline: none; padding-left: ${Spacing.md}px; color: ${theme.colors.onBackground};`,
      },
    },
  });

  const hasContent = !!editor && !editor.isEmpty;

  const themedStyles = useEnrichedTextInputTheme({
    isFocused: isOpen,
    hasContent,
  });

  const isNormalText = !!editor && !editor.isActive("heading");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEvent = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (target && !containerRef.current?.contains(target)) {
        setIsOpen(false);
        editor?.commands.blur();
      }
    };

    document.addEventListener("mousedown", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [isOpen, editor]);

  return isLoading ? (
    <TextInput value="" isLoading={true} index={index} isEditable={false} />
  ) : (
    <Pressable
      ref={containerRef}
      onPress={() => {
        if (!isOpen) {
          setIsOpen(true);
          editor.commands.focus();
        }
      }}
    >
      <Animated.View
        layout={LinearTransition}
        style={[enrichedTextInputStyles.container, themedStyles.container]}
      >
        <Animated.View
          layout={LinearTransition}
          style={[
            enrichedTextInputStyles.labelContainer,
            themedStyles.labelContainer,
          ]}
        >
          <Typography
            size={isOpen || hasContent ? "xs" : "md"}
            color={
              isOpen ? "primary" : theme.dark ? "onSurfaceVariant" : "outline"
            }
            emphasis={theme.dark ? "medium" : "high"}
          >
            {label}
          </Typography>
        </Animated.View>

        <Animated.View
          layout={LinearTransition}
          style={[
            enrichedTextInputStyles.actionsContainer,
            themedStyles.actionsContainer,
          ]}
        >
          <MenuButton
            icon="font-size"
            options={[
              {
                label: "Normal text",
                isActive: isNormalText,
                onPress: () => editor.chain().setParagraph().focus().run(),
              },
              {
                label: "Heading 1",
                isActive: editor.isActive("heading", { level: 1 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run(),
                size: "xxxl",
              },
              {
                label: "Heading 2",
                isActive: editor.isActive("heading", { level: 2 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run(),
                size: "xxl",
              },
              {
                label: "Heading 3",
                isActive: editor.isActive("heading", { level: 3 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run(),
                size: "xl",
              },
              {
                label: "Heading 4",
                isActive: editor.isActive("heading", { level: 4 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run(),
                size: "lg",
              },
              {
                label: "Heading 5",
                isActive: editor.isActive("heading", { level: 5 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run(),
                size: "sm",
              },
              {
                label: "Heading 6",
                isActive: editor.isActive("heading", { level: 6 }),
                onPress: () =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run(),
                size: "xs",
              },
            ]}
          />

          <Button
            icon="bold"
            onPress={() => editor.chain().focus().toggleBold().run()}
            mode={editor.isActive("bold") ? "contained" : "text"}
          />

          <Button
            icon="italic"
            onPress={() => editor.chain().focus().toggleItalic().run()}
            mode={editor.isActive("italic") ? "contained" : "text"}
          />

          <MenuButton
            icon="list"
            options={[
              {
                label: "Ordered list",
                isActive: editor.isActive("orderedList"),
                onPress: () => editor.chain().focus().toggleOrderedList().run(),
              },
              {
                label: "Unordered list",
                isActive: editor.isActive("bulletList"),
                onPress: () => editor.chain().focus().toggleBulletList().run(),
              },
            ]}
          />

          <Button
            icon="strikethrough"
            onPress={() => editor.chain().focus().toggleStrike().run()}
            mode={editor.isActive("strike") ? "contained" : "text"}
          />

          <Button
            icon="underline"
            onPress={() => editor.chain().focus().toggleUnderline().run()}
            mode={editor.isActive("underline") ? "contained" : "text"}
          />

          <Button
            icon="quote"
            onPress={() => editor.chain().focus().toggleBlockquote().run()}
            mode={editor.isActive("blockquote") ? "contained" : "text"}
          />
        </Animated.View>

        <Animated.View style={{ width: "100%" }}>
          <EditorContent editor={editor} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};
