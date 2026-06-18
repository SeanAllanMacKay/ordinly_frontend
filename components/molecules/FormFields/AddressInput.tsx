import { addressRequests, useGetAddressSuggestionsQuery } from "@/api";
import { FormField, Icon, TextInput, Typography } from "@/components/atoms";
import { PHONE_WIDTH } from "@/constants/breakpoints";
import { Spacing } from "@/styles";
import { useQueryClient } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import React, { useCallback, useMemo } from "react";
import { useState } from "react";
import {
  Modal,
  Pressable,
  useWindowDimensions,
  View,
  StyleSheet,
} from "react-native";
import { PaperProvider, TouchableRipple, useTheme } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  SlideInDown,
} from "react-native-reanimated";
import { addressInputStyles } from "./styles";
import * as Location from "expo-location";

export const formatAddressDisplayValue = (value: any) => {
  if (!value) {
    return "";
  }

  let returnValue = "";

  if (value?.address) {
    returnValue += value?.address;
  }

  if (value?.city) {
    returnValue += (returnValue.length ? ", " : "") + value?.city;
  }

  if (value?.region) {
    returnValue += (returnValue.length ? ", " : "") + value?.region;
  }

  if (value?.postalCode) {
    returnValue += (returnValue.length ? ", " : "") + value?.postalCode;
  }

  if (value?.country) {
    returnValue += (returnValue.length ? ", " : "") + value?.country;
  }

  return returnValue;
};

export const AddressInputContent = ({
  value,
  defaultDisplayValue,
  onChange,
  type,
  label,
  isLoading,
  index,
  isDisabled,
  isError,
}: {}) => {
  const { height, width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const isPhone = width <= PHONE_WIDTH;

  const [formattedValue, setFormattedValue] = useState(
    defaultDisplayValue ?? "",
  );

  const handleTextChange = (text: string) => {
    setDisplayValue(text);
    updateDebounce(text);
  };

  const suggestionsQuery = useGetAddressSuggestionsQuery({
    searchTerm,
    proximity: userCoords,
  });

  const onOpen = async () => {
    setOpen(true);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
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

  const updateDebounce = useCallback(
    debounce((nextValue: string) => {
      setSearchTerm(nextValue);
    }, 500),
    [],
  );

  const onPressItem = async ({ mapbox_id }) => {
    const {
      features: [
        {
          properties: {
            coordinates: { latitude, longitude },
            context: { country, region, place, postcode, address },
            feature_type,
            name,
          },
        },
      ],
    } = await addressRequests.retrieveAddress({
      mapboxId: mapbox_id,
      sessionId: suggestionsQuery.sessionId,
    });

    onChange({
      type: feature_type,
      latitude,
      longitude,
    });

    setFormattedValue(
      formatAddressDisplayValue({
        country:
          country.country_code ??
          (feature_type === "country" ? name : undefined),
        region: region?.name ?? (feature_type === "region" ? name : undefined),
        city: place?.name ?? (feature_type === "place" ? name : undefined),
        postalCode:
          postcode?.name ?? (feature_type === "postcode" ? name : undefined),
        address: address?.name,
      }),
    );

    handleTextChange("");
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
              addressInputStyles.background,
              {
                justifyContent: isPhone ? "flex-end" : "center",
                backgroundColor: theme.dark ? "#ffffff25" : "#00000025",
              },
            ]}
          >
            <Pressable onPress={onDismiss} style={StyleSheet.absoluteFill} />

            <Animated.View
              style={[
                addressInputStyles.container,
                {
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
              <TextInput
                label={"Search"}
                onChange={handleTextChange}
                value={displayValue}
                icon="map-search"
              />

              <View
                style={{
                  gap: Spacing.sm,
                  paddingTop: Spacing.md,
                  marginBottom: Spacing.lg,
                }}
              >
                {suggestionsQuery.data?.suggestions?.length ? (
                  suggestionsQuery.data?.suggestions?.map(
                    ({ name, place_formatted, ...rest }) => {
                      return (
                        <TouchableRipple
                          style={{
                            borderRadius: theme.roundness,
                          }}
                          onPress={() =>
                            onPressItem({ name, place_formatted, ...rest })
                          }
                        >
                          <View style={{ padding: Spacing.sm }}>
                            <Typography emphasis="high">{name}</Typography>
                            <Typography emphasis="low" size="sm">
                              {place_formatted}
                            </Typography>
                          </View>
                        </TouchableRipple>
                      );
                    },
                  )
                ) : (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: Spacing.sm,
                      marginTop: Spacing.md,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 100,
                          padding: Spacing.md,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: Spacing.sm,
                        },
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
                      Search to find the address you're looking for
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

export const AddressInput = ({ name, label, defaultDisplayValue }) => {
  return (
    <FormField
      name={name}
      label={label}
      component={(props) => (
        <AddressInputContent
          {...props}
          defaultDisplayValue={defaultDisplayValue}
        />
      )}
    />
  );
};
