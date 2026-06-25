import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { addDays, format, isValid, startOfWeek } from "date-fns";
import { useTranslation } from "react-i18next";
import { dateFnsLocale } from "@/i18n/dateLocale";
import { Week } from "./Week";
import { DatePickerContext, DatePickerProvider } from "./DatePickerContext";
import { MonthSelector } from "./MonthSelector";
import { PaperProvider, useTheme } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  SlideInDown,
} from "react-native-reanimated";
import { PHONE_WIDTH } from "@/constants/breakpoints";
import { Spacing } from "@/styles";
import { DatePickerModalContentProps, DatePickerModalProps } from "../types";
import { dayStyles, weekStyles } from "../styles";
import { Typography } from "../../../Typography";

const DatePickerModalContent = ({
  isOpen,
  onClose,
}: DatePickerModalContentProps) => {
  const { height, width } = useWindowDimensions();
  const theme = useTheme();

  const isPhone = width <= PHONE_WIDTH;

  const { activeMonth } = useContext(DatePickerContext);

  const { i18n } = useTranslation();
  const locale = dateFnsLocale(i18n.language);

  // The calendar grid renders Sunday-first (see `getWeeksOfMonth`), so derive
  // the header letters from a Sunday-anchored week and localize each via the
  // active date-fns locale (`EEEEE` = narrow weekday).
  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    format(addDays(startOfWeek(new Date()), index), "EEEEE", { locale }),
  );

  return (
    <Modal transparent={true} visible={isOpen}>
      <PaperProvider>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: isPhone ? "flex-end" : "center",
            backgroundColor: theme.dark ? "#ffffff25" : "#00000025",
          }}
        >
          <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />

          <Animated.View
            style={[
              {
                minWidth: 300,
                maxWidth: 500,
                backgroundColor: theme.colors.surface,
                padding: Spacing.md,
                ...(isPhone
                  ? {
                      width,
                      borderTopLeftRadius: Spacing.md,
                      borderTopRightRadius: Spacing.md,
                    }
                  : {
                      width: width * 0.8,
                      borderRadius: Spacing.md,
                      maxHeight: height * 0.75,
                    }),
              },
            ]}
            entering={isPhone ? SlideInDown : FadeInDown}
            exiting={FadeOutUp}
          >
            <MonthSelector />

            <View style={weekStyles.container}>
              {weekdayLabels.map((weekday, index) => (
                <View style={dayStyles.container} key={index}>
                  <Typography color="onSurfaceVariant">{weekday}</Typography>
                </View>
              ))}
            </View>

            {activeMonth.map((week) => (
              <Week days={week} key={week[0].toString()} />
            ))}
          </Animated.View>
        </Animated.View>
      </PaperProvider>
    </Modal>
  );
};

export const DatePickerModal = ({
  value,
  onChange,
  min,
  max,
  ...restProps
}: DatePickerModalProps) => {
  const parsedDate = value ? new Date(value) : undefined;

  return (
    <DatePickerProvider
      value={isValid(parsedDate) ? parsedDate : new Date()}
      onChange={onChange}
      min={min}
      max={max}
    >
      <DatePickerModalContent {...restProps} />
    </DatePickerProvider>
  );
};
