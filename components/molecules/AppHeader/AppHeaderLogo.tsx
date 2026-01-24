import React from "react";
import { StyleSheet } from "@bacons/react-views";
import { Logo } from "@/components/atoms/Logo";

import { LARGE_BREAKPOINT } from "@/constants/breakpoints";
import { useWidth } from "@/styles";

export const HeaderLogo = () => {
  const isLargeHorizontal = useWidth(LARGE_BREAKPOINT);

  return <Logo />;
};

const styles = StyleSheet.create({
  headerLogo: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
    borderRadius: 4,
    transitionProperty: ["background-color", "box-shadow"],
    transitionDuration: "200ms",
  },
});
