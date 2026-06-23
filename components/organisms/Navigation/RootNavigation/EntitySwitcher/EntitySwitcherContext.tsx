import { useGetCompaniesQuery, useGetCurrentUserQuery } from "@/api";
import { useGlobalSearchParams } from "expo-router";
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
} from "react";

type EntitySwitcherUser = NonNullable<
  ReturnType<typeof useGetCurrentUserQuery>["data"]
>["user"];

type EntitySwitcherCompanyOptions = NonNullable<
  NonNullable<ReturnType<typeof useGetCompaniesQuery>["data"]>["companies"]
>;

type EntitySwitcherCompany = EntitySwitcherCompanyOptions[number];

type EntitySwitcherSelectedEntity = {
  variant: "user" | "company";
  id: EntitySwitcherUser["id"] | EntitySwitcherCompany["id"];
  name: EntitySwitcherUser["name"] | EntitySwitcherCompany["name"];
};

export const EntitySwitcherContext = createContext<{
  selectedEntity: EntitySwitcherSelectedEntity | null;
  user: EntitySwitcherUser | null;
  companyOptions: EntitySwitcherCompanyOptions;
}>({
  selectedEntity: null,
  user: null,
  companyOptions: [],
});

export const EntitySwitcherProvider = ({ children }: PropsWithChildren) => {
  const userQuery = useGetCurrentUserQuery();
  const user = userQuery.data?.user ?? null;

  const companiesQuery = useGetCompaniesQuery({ page: 1 });
  const companyOptions = companiesQuery.data?.companies ?? [];

  const { companyId } = useGlobalSearchParams<{ companyId?: string }>();

  const selectedEntity = useMemo<EntitySwitcherSelectedEntity | null>(() => {
    if (!user) {
      return null;
    }

    if (companyId) {
      const match = companyOptions.find((c) => c.id === companyId);

      if (match) {
        return {
          variant: "company",
          id: match.id,
          name: match.name,
        };
      }
    }

    return { variant: "user", id: user.id, name: user.name };
  }, [user, companyId, companyOptions]);

  return (
    <EntitySwitcherContext.Provider
      value={{
        selectedEntity,
        user,
        companyOptions,
      }}
    >
      {children}
    </EntitySwitcherContext.Provider>
  );
};
