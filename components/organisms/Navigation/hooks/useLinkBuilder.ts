import { useCallback, useContext } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  LinkingContext,
  type NavigationHelpers,
  NavigationHelpersContext,
  type NavigationProp,
  type ParamListBase,
} from "@react-navigation/native";

type NavigationObject =
  | NavigationHelpers<ParamListBase>
  | NavigationProp<ParamListBase>;

type MinimalState = {
  index: number;
  routes: { name: string; params?: object; state?: MinimalState }[];
};

/**
 * Recursively gets the root navigation element of an arbitrarily nested stack.
 *
 * @param navigation - A react-navigation navigation object
 * @param state - The navigation state
 *
 * @returns The root navigation element for a stack or substack
 */
const getRootForNavigation = (
  navigation: NavigationObject,
  state: MinimalState
): MinimalState => {
  const parent = navigation.getParent();

  if (parent) {
    const parentState = parent.getState();

    return getRootForNavigation(parent, {
      index: 0,
      routes: [{ ...parentState.routes[parentState.index], state }],
    });
  }

  return state;
};

/**
 * Builds a dstination link for a navigation action.
 */
export const useLinkBuilder = () => {
  const navigation = useContext(NavigationHelpersContext);
  const linking = useContext(LinkingContext);
  const localParams = useLocalSearchParams();

  const buildLink = useCallback(
    (name: string, params?: object) => {
      const state = navigation
        ? getRootForNavigation(navigation, {
            index: 0,
            routes: [{ name, params: { ...localParams, ...params } }],
          })
        : {
            index: 0,
            routes: [{ name, params: { ...localParams, ...params } }],
          };

      const out = linking.options!.getPathFromState?.(
        state,
        linking.options!.config
      );

      return out;
    },
    [linking, navigation, localParams]
  );

  return buildLink;
};
