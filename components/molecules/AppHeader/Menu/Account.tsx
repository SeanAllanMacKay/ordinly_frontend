import React, { useContext, useEffect, useState } from "react";
import {
  useGlobalSearchParams,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components";
import { routes } from "@/constants/routes";
import { useGetCurrentUserQuery } from "@/api";

export const Account = () => {
  const userQuery = useGetCurrentUserQuery();
  const globalParams = useGlobalSearchParams();
  const segments = useSegments();
  const pathname = usePathname();

  const [selectedEntity, setSelectedEntity] = useState();

  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const { top } = useSafeAreaInsets();

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
          ({ id }) => id === globalParams["companyId"],
        )?.name,
      );
    }
  }, [
    segments,
    globalParams,
    userQuery?.data?.user?.name,
    userQuery?.data?.user,
  ]);

  return (
    <Menu
      visible={isVisible}
      onDismiss={closeMenu}
      anchor={
        <Button icon="menu-down" onPress={openMenu} style={{ height: 30 }}>
          {selectedEntity}
        </Button>
      }
      style={{
        top: 40 + top,
      }}
    >
      <Menu.Item
        title={userQuery?.data?.user?.name}
        onPress={
          userQuery?.data?.user?.name !== selectedEntity
            ? () => changeAccount(routes.manage.root())
            : undefined
        }
      />

      {userQuery?.data?.user?.companies?.map(({ name, id }) => (
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
  );
};
