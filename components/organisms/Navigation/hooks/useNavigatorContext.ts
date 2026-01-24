import { Navigator } from "expo-router";
import { TabRouter } from "@react-navigation/routers";
/**
 * A helper hook to get the navigation context
 *
 * @returns The current Navigator context
 */
export const useNavigatorContext = () => {
  const context = Navigator.useContext();

  if (process.env.NODE_ENV !== "production") {
    if (
      !(
        context.router.name === "TabRouter" ||
        context.router instanceof TabRouter
      )
    ) {
      throw new Error(
        "useTabbedSlot must be used inside of a Navigator with a tab router"
      );
    }
  }

  return context;
};
