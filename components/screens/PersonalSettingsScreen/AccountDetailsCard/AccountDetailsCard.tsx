import React, { useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Card, Typography, UserAvatar } from "@/components";
import { useGetCurrentUserQuery } from "@/api";
import { profilePictureToUri } from "@/util/images";
import { useDrawers } from "@/util/navigation/useDrawers";
import { accountDetailsCardStyles as styles } from "./styles";
import { Spacing } from "@/styles";

// Read-only summary of the account. Editing happens in the edit-account-details
// drawer, launched from the header edit button.
export const AccountDetailsCard = () => {
  const { t } = useTranslation("common");
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user;
  const { open } = useDrawers();

  const avatarUri = useMemo(
    () => profilePictureToUri(user?.profilePicture),
    [user?.profilePicture],
  );

  return (
    <View style={styles.identityRow}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.md,
        }}
      >
        <UserAvatar name={user?.name ?? ""} imageURL={avatarUri} size="lg" />

        <View style={styles.identityText}>
          <Typography size="lg">{user?.name}</Typography>
          <Typography color="onSurfaceVariant">{user?.email}</Typography>
        </View>
      </View>

      <Button
        icon="edit"
        label="Edit"
        mode="text"
        onPress={() => open("edit-account-details")}
      />
    </View>
  );
};
