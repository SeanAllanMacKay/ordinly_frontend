import {
  EnrichedTextInput as SMEnrichedTextInput,
  EnrichedTextInputInstance,
  OnChangeStateEvent,
} from "react-native-enriched";
import { useState, useRef, useCallback } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Button } from "../Button";
import { MenuButton } from "../MenuButton";
import { TextInput } from "../TextInput";
import { Typography } from "../Typography";
import { EnrichedTextInputProps } from "./types";
import { enrichedTextInputStyles } from "./styles";
import React from "react";
import { htmlHasContent, useEnrichedTextInputTheme } from "./util";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Portal, useTheme } from "react-native-paper";

export const EnrichedTextInput = ({
  label,
  onChange,
  initialValue,
  isLoading = false,
  index,
}: EnrichedTextInputProps) => {
  const ref = useRef<EnrichedTextInputInstance>(null);
  const containerRef = useRef<View>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const theme = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [stylesState, setStylesState] = useState<OnChangeStateEvent | null>();

  const hasContent = htmlHasContent(value);

  const themedStyles = useEnrichedTextInputTheme({
    isFocused,
    hasContent,
  });

  // Measure the input's position in the window so the dismiss overlay can be
  // rendered around it (leaving a cut-out so the toolbar stays tappable).
  const measure = useCallback(() => {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      setRect({ x, y, width, height });
    });
  }, []);

  return isLoading ? (
    <TextInput value="" isLoading={true} index={index} isEditable={false} />
  ) : (
    <>
      <Pressable
        ref={containerRef}
        onPress={() => ref.current?.focus()}
        onLayout={() => {
          if (isFocused) {
            measure();
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
              size={isFocused || hasContent ? "xs" : "md"}
              color={
                isFocused
                  ? "primary"
                  : theme.dark
                    ? "onSurfaceVariant"
                    : "outline"
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
              options={[
                {
                  label: "Normal text",
                  onPress: () => {
                    if (stylesState?.h1.isActive) {
                      ref.current?.toggleH1();
                    }

                    if (stylesState?.h2.isActive) {
                      ref.current?.toggleH2();
                    }

                    if (stylesState?.h3.isActive) {
                      ref.current?.toggleH3();
                    }

                    if (stylesState?.h4.isActive) {
                      ref.current?.toggleH4();
                    }

                    if (stylesState?.h6.isActive) {
                      ref.current?.toggleH5();
                    }

                    if (stylesState?.h1.isActive) {
                      ref.current?.toggleH6();
                    }
                  },
                  size: "md",
                  isActive:
                    !stylesState?.h1.isActive &&
                    !stylesState?.h2.isActive &&
                    !stylesState?.h3.isActive &&
                    !stylesState?.h4.isActive &&
                    !stylesState?.h5.isActive &&
                    !stylesState?.h6.isActive,
                },
                {
                  label: "Heading 1",
                  onPress: () => {
                    if (!stylesState?.h1.isActive) {
                      ref.current?.toggleH1();
                    }
                  },
                  size: "xxxl",
                  isActive: stylesState?.h1.isActive,
                },
                {
                  label: "Heading 2",
                  onPress: () => {
                    if (!stylesState?.h2.isActive) {
                      ref.current?.toggleH2();
                    }
                  },
                  size: "xxl",
                  isActive: stylesState?.h2.isActive,
                },
                {
                  label: "Heading 3",
                  onPress: () => {
                    if (!stylesState?.h3.isActive) {
                      ref.current?.toggleH3();
                    }
                  },
                  size: "xl",
                  isActive: stylesState?.h3.isActive,
                },
                {
                  label: "Heading 4",
                  onPress: () => {
                    if (!stylesState?.h4.isActive) {
                      ref.current?.toggleH4();
                    }
                  },
                  size: "lg",
                  isActive: stylesState?.h4.isActive,
                },
                {
                  label: "Heading 5",
                  onPress: () => {
                    if (!stylesState?.h5.isActive) {
                      ref.current?.toggleH5();
                    }
                  },
                  size: "sm",
                  isActive: stylesState?.h5.isActive,
                },
                {
                  label: "Heading 6",
                  onPress: () => {
                    if (!stylesState?.h6.isActive) {
                      ref.current?.toggleH6();
                    }
                  },
                  size: "xs",
                  isActive: stylesState?.h6.isActive,
                },
              ]}
              icon="font-size"
            />

            <Button
              icon="bold"
              onPress={() => ref.current?.toggleBold()}
              mode={stylesState?.bold.isActive ? "contained" : "text"}
            />

            <Button
              icon="italic"
              onPress={() => ref.current?.toggleItalic()}
              mode={stylesState?.italic.isActive ? "contained" : "text"}
            />

            <MenuButton
              options={[
                {
                  label: "Ordered list",
                  onPress: () => ref.current?.toggleOrderedList(),
                  isActive: stylesState?.orderedList.isActive,
                },
                {
                  label: "Unordered list",
                  onPress: () => ref.current?.toggleUnorderedList(),
                  isActive: stylesState?.unorderedList.isActive,
                },
              ]}
              icon="list"
            />

            <Button
              icon="strikethrough"
              onPress={() => ref.current?.toggleStrikeThrough()}
              mode={stylesState?.strikeThrough.isActive ? "contained" : "text"}
            />

            <Button
              icon="underline"
              onPress={() => ref.current?.toggleUnderline()}
              mode={stylesState?.underline.isActive ? "contained" : "text"}
            />

            <Button
              icon="quote"
              onPress={() => ref.current?.toggleBlockQuote()}
              mode={stylesState?.blockQuote.isActive ? "contained" : "text"}
            />
          </Animated.View>

          <Animated.View
            layout={LinearTransition}
            style={{ flex: 1, width: "100%" }}
          >
            <SMEnrichedTextInput
              defaultValue={initialValue}
              ref={ref}
              onChangeHtml={({ nativeEvent: { value } }) => {
                setValue(value);
                onChange(value);
              }}
              onChangeState={(e) => setStylesState(e.nativeEvent)}
              style={enrichedTextInputStyles.input}
              onFocus={() => {
                setIsFocused(true);
                measure();
              }}
              onBlur={() => {
                setIsFocused(false);
                setRect(null);
              }}
            />
          </Animated.View>
        </Animated.View>
      </Pressable>

      {isFocused && !!rect && (
        <Portal>
          <Pressable
            onPress={() => ref.current?.blur()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: windowWidth,
              height: rect.y,
            }}
          />
          <Pressable
            onPress={() => ref.current?.blur()}
            style={{
              position: "absolute",
              top: rect.y + rect.height,
              left: 0,
              width: windowWidth,
              height: windowHeight - (rect.y + rect.height),
            }}
          />
          <Pressable
            onPress={() => ref.current?.blur()}
            style={{
              position: "absolute",
              top: rect.y,
              left: 0,
              width: rect.x,
              height: rect.height,
            }}
          />
          <Pressable
            onPress={() => ref.current?.blur()}
            style={{
              position: "absolute",
              top: rect.y,
              left: rect.x + rect.width,
              width: windowWidth - (rect.x + rect.width),
              height: rect.height,
            }}
          />
        </Portal>
      )}
    </>
  );
};
