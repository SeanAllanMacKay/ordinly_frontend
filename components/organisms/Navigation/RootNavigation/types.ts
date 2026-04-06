import {
  DefaultNavigatorOptions,
  TabRouterOptions,
  TabNavigationState,
  ParamListBase,
} from "@react-navigation/native";
import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { IconProps } from "@/components/atoms";

type NavigationOptions = BottomTabNavigationOptions & {
  icon: IconProps["name"];
};

export type RootNavigationProps = DefaultNavigatorOptions<
  ParamListBase,
  string | undefined, // 2. ID (This was likely missing!)
  TabNavigationState<ParamListBase>, // 3. State
  NavigationOptions, // 4. ScreenOptions
  BottomTabNavigationEventMap, // 5. EventMap
  BottomTabNavigationProp<ParamListBase> // 6. NavigationProp
> &
  TabRouterOptions;

export type TabType = {
  isFocused: boolean;
  routeName: string;
} & NavigationOptions;

export type TabsProps = { tabs: TabType[]; onPress: (key: string) => void };
