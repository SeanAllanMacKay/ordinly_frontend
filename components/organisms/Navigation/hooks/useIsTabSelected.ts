import { useNavigatorContext } from "./useNavigatorContext";

/**
 * Determines if a given tab is selected
 *
 * @param name - The name of the tab we're checking
 * @returns Whether the tab is selected
 */
export const useIsTabSelected = (name: string) => {
  const { navigation } = useNavigatorContext();

  const state = navigation.getState();
  const current = state.routes.find((_route, index) => state.index === index);

  return current?.name === name;
};
