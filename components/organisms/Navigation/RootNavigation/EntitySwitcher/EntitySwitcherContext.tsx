import { CompanyType, useGetCurrentUserQuery } from "@/api";
import { useGlobalSearchParams } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

type EntitySwitcherUser = NonNullable<
  ReturnType<typeof useGetCurrentUserQuery>["data"]
>["user"];

type EntitySwitcherCompany = EntitySwitcherUser["companies"][number];

type EntitySwitcherSelectedEntity = {
  variant: "user" | "company";
  id: EntitySwitcherUser["id"] | EntitySwitcherCompany["company"]["id"];
  name: EntitySwitcherUser["name"] | EntitySwitcherCompany["company"]["name"];
};

export const EntitySwitcherContext = createContext<{
  selectedEntity: EntitySwitcherSelectedEntity | null;
  user: EntitySwitcherUser | null;
  companyOptions: EntitySwitcherUser["companies"];
}>({
  selectedEntity: null,
  user: null,
  companyOptions: [],
});

export const EntitySwitcherProvider = ({ children }: PropsWithChildren) => {
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user ?? null;
  const companyOptions = user?.companies ?? [];

  const { companyId } = useGlobalSearchParams<{ companyId?: string }>();

  const selectedEntity = useMemo<EntitySwitcherSelectedEntity | null>(() => {
    if (!user) {
      return null;
    }

    if (companyId) {
      const match = companyOptions.find((c) => c.company.id === companyId);

      if (match) {
        return {
          variant: "company",
          id: match.company.id,
          name: match.company.name,
        };
      }
    }

    return { variant: "user", id: user.id, name: user.name };
  }, [user, companyId, companyOptions]);

  return (
    <EntitySwitcherContext.Provider
      value={{
        selectedEntity,
        user: userQuery?.data?.user ?? null,
        companyOptions,
      }}
    >
      {children}
    </EntitySwitcherContext.Provider>
  );
};
