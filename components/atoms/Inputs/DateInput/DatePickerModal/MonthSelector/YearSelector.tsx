import React, { useContext, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { getWeeksOfMonth } from "../util";
import { DatePickerContext } from "../DatePickerContext";
import {
  format,
  getYear,
  setYear,
  eachYearOfInterval,
  subYears,
  addYears,
  isBefore,
  isAfter,
  isSameYear,
} from "date-fns";
import { Menu, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { dateFnsLocale } from "@/i18n/dateLocale";
import { Button } from "../../../../Button";
import { Text } from "../../../../Text";
import { Typography } from "../../../../Typography";
import { yearSelectorStyles } from "../../styles";

const RANGE = 10;

export const YearSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { i18n } = useTranslation();
  const locale = dateFnsLocale(i18n.language);
  const { defaultDate, setActiveMonth, min, max, midpoint } =
    useContext(DatePickerContext);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const onPress = (newDate: Date) => {
    const newYear = setYear(new Date(defaultDate.getTime()), getYear(newDate));

    setActiveMonth(getWeeksOfMonth(newYear));

    closeMenu();
  };

  const options = useMemo(() => {
    const clonedDefaultDate = new Date(defaultDate.getTime());

    return eachYearOfInterval({
      start: subYears(clonedDefaultDate, RANGE),
      end: addYears(clonedDefaultDate, RANGE),
    });
  }, []);

  return (
    <Menu
      visible={isOpen}
      onDismiss={closeMenu}
      anchor={
        <Button
          icon="menu-down"
          onPress={openMenu}
          label={format(midpoint, "MMMM, yyyy", { locale })}
        />
      }
      contentStyle={yearSelectorStyles.contentContainer}
      anchorPosition="bottom"
    >
      <View style={yearSelectorStyles.container}>
        {options.map((date) => {
          const isDisabled =
            (min && isBefore(date, min)) || (max && isAfter(date, max));

          const isSelectedYear = isSameYear(midpoint, date);

          return (
            <Pressable
              style={[
                yearSelectorStyles.year,
                isSelectedYear && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => onPress(date)}
              disabled={isDisabled}
            >
              <Typography
                color={
                  isDisabled
                    ? "onBackground"
                    : isSelectedYear
                      ? "onPrimary"
                      : undefined
                }
              >
                {format(date, "yyyy")}
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </Menu>
  );
};
