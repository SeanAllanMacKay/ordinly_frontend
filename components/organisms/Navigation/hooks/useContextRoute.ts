import { Navigator } from "expo-router";

/**
 * Gets a given route in the navigation context
 *
 * @param name - The name of the router to find
 * @returns A given route
 */
export const useContextRoute = (name: string) => {
  const context = Navigator.useContext();

  const { state, navigation, descriptors } = context;

  const current = state.routes.find((route) => route.name === name);

  if (!current) {
    console.warn(`Could not find route with name ${name}`);

    return null;
  }

  return {
    route: current,
    target: state.key,
    navigation,
    descriptor: descriptors[current.key],
  };
};
