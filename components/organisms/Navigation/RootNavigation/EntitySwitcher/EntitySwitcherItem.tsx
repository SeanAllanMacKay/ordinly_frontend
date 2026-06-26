import React from "react";
import { View } from "react-native";
import { Spacing } from "@/styles";
import { Typography } from "@/components/atoms";
import { CompanyAvatar } from "@/components/organisms/CompanyAvatar";
import { UserAvatar } from "@/components/organisms/UserAvatar";

export const EntitySwitcherItem = ({
  name,
  description,
  variant,
  imageURL,
}: {
  name: string;
  description: string;
  variant: "user" | "company";
  imageURL?: string;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: Spacing.sm,
        alignItems: "center",
      }}
    >
      {variant === "company" ? (
        <CompanyAvatar name={name} imageURL={imageURL} />
      ) : (
        <UserAvatar name={name} imageURL={imageURL} />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: Spacing.xs,
        }}
      >
        <Typography>{name}</Typography>

        <Typography size="xs">{description}</Typography>
      </View>
    </View>
  );
};
