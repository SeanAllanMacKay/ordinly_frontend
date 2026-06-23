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

export const EntitySwitcherMenu = ({
  anchor,
}: {
  anchor: React.ReactElement;
}) => {
  const router = useRouter();
  const theme = useTheme();
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
              Personal
            </Typography>

            <Pressable
              onPress={
                selectedEntity?.variant === "user"
                  ? undefined
                  : () => changeAccount(routes.manage.personal.root())
              }
            >
              <EntitySwitcherItem
                name={user.name}
                description="Personal account"
              />
            </Pressable>

            <Typography color="onSurfaceVariant" size="xs">
              Companies
            </Typography>

            {companyOptions.map(({ name, id }) => (
              <Pressable
                key={id}
                onPress={
                  selectedEntity?.variant === "company" &&
                  selectedEntity.id === id
                    ? undefined
                    : () => changeAccount(routes.manage.company.root(id))
                }
              >
                <EntitySwitcherItem name={name} description="Company" />
              </Pressable>
            ))}
          </>
        ) : null}

        <Button
          label="Add a company"
          icon="plus"
          onPress={() => open("add-company")}
        />

        <Button
          label="Log out"
          icon="logout"
          onPress={async () => onLogoutMutation.mutateAsync()}
        />
      </View>
    </Menu>
  ) : null;
};
