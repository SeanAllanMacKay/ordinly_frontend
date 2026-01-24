import React, { useState } from "react";
import { useRouter } from "expo-router";
import { IconButton, Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components";

export const AppSwitcher = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  const openRoute = (route: string) => {
    router.replace(route);
    closeMenu();
  };

  const { top } = useSafeAreaInsets();

  return (
    <Menu
      visible={isVisible}
      onDismiss={closeMenu}
      anchor={
        <Button
          icon="squares-four"
          onPress={openMenu}
          style={{ height: 30, width: 30 }}
        ></Button>
      }
      style={{ top: top + 40 }}
    >
      <Menu.Item title="Manage" />
      <Menu.Item title="Marketplace" />
    </Menu>
  );
};
