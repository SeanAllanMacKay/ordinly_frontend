import React from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, FloatingActionButton, Screen, Typography } from "@/components";
import { useDrawers } from "@/util/navigation/useDrawers";
import { useModals } from "@/util/navigation/useModals";
import { Spacing } from "@/styles";

export const ClientDetailsScreen = ({
  clientId: _clientId,
}: {
  clientId: string;
}) => {
  const { t } = useTranslation("clients");
  const { open: openDrawer } = useDrawers();
  const { open: openModal } = useModals();

  return (
    <Screen>
      <ScrollView>
        <Typography>{t("details.title")}</Typography>

        <View style={{ flexDirection: "row", padding: Spacing.md }}>
          <Button
            variant="danger"
            mode="contained"
            icon="remove"
            permission="all_clients:delete"
            label={t("deleteClient.trigger")}
            onPress={() => openModal("confirm-delete-client")}
          />
        </View>
      </ScrollView>

      <FloatingActionButton
        icon="edit"
        permission="all_clients:update"
        onPress={() => openDrawer("edit-client")}
      />
    </Screen>
  );
};
