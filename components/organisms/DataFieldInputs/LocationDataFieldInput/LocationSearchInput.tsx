import { addressRequests, useGetAddressSuggestionsQuery } from "@/api";
import { Icon, TextInput, Typography } from "@/components/atoms";
import { PHONE_WIDTH } from "@/constants/breakpoints";
import { Spacing } from "@/styles";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { PaperProvider, TouchableRipple, useTheme } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  SlideInDown,
} from "react-native-reanimated";
import * as Location from "expo-location";
import { locationInputStyles as styles } from "./styles";
import { formatLocationDisplayValue, mapFeatureToLocationValue } from "./util";
import { LocationSearchInputProps } from "./types";

export const LocationSearchInput = ({
  value,
  onChange,
  onCommit,
  defaultDisplayValue,
  label,
  isLoading,
  index,
  isDisabled,
  isError,
}: LocationSearchInputProps) => {
  const { height, width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const queryClient = useQueryClient();
  const theme = useTheme();

  const isPhone = width <= PHONE_WIDTH;

  const formattedValue =
    formatLocationDisplayValue(value) || defaultDisplayValue || "";

  const suggestionsQuery = useGetAddressSuggestionsQuery({
    searchTerm,
    proximity: userCoords,
  });

  const updateDebounce = useCallback(
    debounce((nextValue: string) => {
      setSearchTerm(nextValue);
    }, 500),
    [],
  );

  const handleTextChange = (text: string) => {
    setDisplayValue(text);
    updateDebounce(text);
  };

  const onOpen = async () => {
    setOpen(true);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (location) {
        setUserCoords({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    }
  };

  const onDismiss = () => {
    queryClient.removeQueries({ queryKey: suggestionsQuery.queryKey });
    handleTextChange("");
    setOpen(false);
  };

  const onPressItem = async ({ mapbox_id }: { mapbox_id: string }) => {
    const {
      features: [{ properties }],
    } = await addressRequests.retrieveAddress({
      mapboxId: mapbox_id,
      sessionId: suggestionsQuery.sessionId,
    });

    const location = mapFeatureToLocationValue(properties);
    onChange(location);
    onCommit?.(location);
    onDismiss();
  };

  return isLoading ? (
    <TextInput value="" isLoading={true} index={index} isEditable={false} />
  ) : (
    <>
      <Pressable onPress={!isDisabled ? onOpen : undefined}>
        <TextInput
          isError={isError}
          label={label}
          onPress={onOpen}
          isEditable={false}
          value={formattedValue}
        />
      </Pressable>

      <Modal transparent={true} visible={isOpen}>
        <PaperProvider>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              styles.background,
              {
                justifyContent: isPhone ? "flex-end" : "center",
                backgroundColor: theme.dark ? "#ffffff25" : "#00000025",
              },
            ]}
          >
            <Pressable onPress={onDismiss} style={StyleSheet.absoluteFill} />

            <Animated.View
              style={[
                styles.container,
                {
                  backgroundColor: theme.colors.surface,
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
              <TextInput
                label={"Search"}
                onChange={handleTextChange}
                value={displayValue}
                icon="map-search"
              />

              <View style={styles.suggestions}>
                {suggestionsQuery.data?.suggestions?.length ? (
                  suggestionsQuery.data?.suggestions?.map((suggestion) => (
                    <TouchableRipple
                      key={suggestion.mapbox_id}
                      style={{ borderRadius: theme.roundness }}
                      onPress={() => onPressItem(suggestion)}
                    >
                      <View style={styles.suggestionItem}>
                        <Typography emphasis="high">
                          {suggestion.name}
                        </Typography>
                        <Typography emphasis="low" size="sm">
                          {suggestion.place_formatted}
                        </Typography>
                      </View>
                    </TouchableRipple>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <View
                      style={[
                        styles.emptyStateIcon,
                        { backgroundColor: theme.colors.primaryContainer },
                      ]}
                    >
                      <Icon
                        name="map-search"
                        size="xxl"
                        color="onPrimaryContainer"
                      />
                    </View>

                    <Typography size="lg" emphasis="high" color="onBackground">
                      {"Search to find the address you're looking for"}
                    </Typography>
                  </View>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </PaperProvider>
      </Modal>
    </>
  );
};
