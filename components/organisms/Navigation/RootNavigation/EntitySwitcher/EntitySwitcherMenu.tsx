import React, { useContext, useState } from "react";
import { Menu, useTheme } from "react-native-paper";
import { EntitySwitcherContext } from "./EntitySwitcherContext";
import { Route, useRouter } from "expo-router";
import { routes } from "@/constants/routes";
import { Button, Typography } from "@/components/atoms";
import { Pressable, View } from "react-native";
import { Spacing } from "@/styles";
import { EntitySwitcherItem } from "./EntitySwitcherItem";
import { useDrawers } from "@/util/navigation/useDrawers";
import { useLogoutMutation } from "@/api";
import { profilePictureToUri } from "@/util/images";
import { useTranslation } from "react-i18next";

export const EntitySwitcherMenu = ({
  anchor,
}: {
  anchor: React.ReactElement;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("navigation");
  const { user, companyOptions, selectedEntity } = useContext(
    EntitySwitcherContext,
  );
  const { open } = useDrawers();
  const onLogoutMutation = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const changeAccount = (path: Route) => {
    router.push(path);

    closeMenu();
  };

  return user ? (
    <Menu
      visible={isOpen}
      onDismiss={closeMenu}
      anchor={<Pressable onPress={openMenu}>{anchor}</Pressable>}
      anchorPosition="bottom"
      contentStyle={{
        backgroundColor: theme.colors.surfaceVariant,
        marginTop: Spacing.xs,
      }}
    >
      <View
        style={{
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
          gap: Spacing.sm,
        }}
      >
        {companyOptions?.length ? (
          <>
            <Typography color="onSurfaceVariant" size="xs">
              {t("entitySwitcher.personal")}
            </Typography>

            <Pressable
              onPress={
                selectedEntity?.variant === "user"
                  ? undefined
                  : () => changeAccount(routes.manage.personal.root())
              }
            >
              <EntitySwitcherItem
                variant="user"
                name={user.name}
                imageURL={profilePictureToUri(user.profilePicture)}
                description={t("entitySwitcher.personalAccount")}
              />
            </Pressable>

            <Typography color="onSurfaceVariant" size="xs">
              {t("entitySwitcher.companies")}
            </Typography>

            {companyOptions.map(({ name, id, logo }) => (
              <Pressable
                key={id}
                onPress={
                  selectedEntity?.variant === "company" &&
                  selectedEntity.id === id
                    ? undefined
                    : () => changeAccount(routes.manage.company.root(id))
                }
              >
                <EntitySwitcherItem
                  variant="company"
                  name={name}
                  imageURL={logo?.externalURL}
                  description={t("entitySwitcher.company")}
                />
              </Pressable>
            ))}
          </>
        ) : null}

        <Button
          label={t("entitySwitcher.addCompany")}
          icon="plus"
          onPress={() => open("add-company")}
        />

        <Button
          label={t("entitySwitcher.logout")}
          icon="logout"
          onPress={async () => onLogoutMutation.mutateAsync()}
        />
      </View>
    </Menu>
  ) : null;
};
