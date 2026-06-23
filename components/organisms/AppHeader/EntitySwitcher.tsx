import React, { useEffect, useState } from "react";
import { useGlobalSearchParams, useRouter, useSegments } from "expo-router";
import { Menu } from "react-native-paper";

import { Button } from "@/components";
import { routes } from "@/constants/routes";
import { useGetCurrentUserQuery } from "@/api";

export const EntitySwitcher = () => {
  const router = useRouter();
  const userQuery = useGetCurrentUserQuery();
  const globalParams = useGlobalSearchParams();
  const segments = useSegments();

  const [selectedEntity, setSelectedEntity] = useState(
    userQuery.data?.user?.id,
  );

  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const changeAccount = (path) => {
    router.push(path);

    closeMenu();
  };

  useEffect(() => {
    if (!segments?.includes("company")) {
      setSelectedEntity(userQuery?.data?.user?.name);
    } else {
      setSelectedEntity(
        userQuery?.data?.user?.companies?.find(
          ({ company: { id } }) => id === globalParams["companyId"],
        )?.company?.name,
      );
    }
  }, [
    segments,
    globalParams,
    userQuery?.data?.user?.name,
    userQuery?.data?.user,
  ]);

  return userQuery?.data?.user?.companies?.length ? (
    <Menu
      visible={isOpen}
      onDismiss={closeMenu}
      anchor={
        <Button icon="menu-down" onPress={openMenu} label={selectedEntity} />
      }
    >
      <Menu.Item
        title={userQuery?.data?.user?.name}
        onPress={
          userQuery?.data?.user?.name !== selectedEntity
            ? () => changeAccount(routes.manage.personal.root())
            : undefined
        }
      />

      {userQuery?.data?.user?.companies?.map(({ company: { name, id } }) => (
        <Menu.Item
          title={name}
          onPress={
            name !== selectedEntity
              ? () => changeAccount(routes.manage.company.root(id))
              : undefined
          }
        />
      ))}
    </Menu>
  ) : null;
};
