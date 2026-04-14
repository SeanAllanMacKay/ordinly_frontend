import {
  BottomTabNavigationEventMap,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
} from "@react-navigation/native";
import { NavigationOptions } from "expo-router/build/global-state/routing";

export type TopTabNavigationProps = DefaultNavigatorOptions<
  ParamListBase,
  string | undefined, // 2. ID (This was likely missing!)
  TabNavigationState<ParamListBase>, // 3. State
  NavigationOptions, // 4. ScreenOptions
  BottomTabNavigationEventMap, // 5. EventMap
  BottomTabNavigationProp<ParamListBase> // 6. NavigationProp
> &
  TabRouterOptions;
