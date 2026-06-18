import { useGetProjectQuery } from "@/api";
import React, { createContext, PropsWithChildren } from "react";

export const ProjectDetailsContext = createContext<
  ReturnType<typeof useGetProjectQuery>
>({
  data: undefined,
  error: null,
  isError: false,
  isFetching: false,
  isLoading: true,
  isSuccess: false,
  status: "pending",
  // @ts-expect-error - This is a placeholder
  refetch: () => Promise.resolve(),
});

export const ProjectDetailsProvider = ({
  projectId,
  children,
}: PropsWithChildren<{ projectId: string }>) => {
  const projectQuery = useGetProjectQuery({ projectId });

  return (
    <ProjectDetailsContext.Provider value={projectQuery}>
      {children}
    </ProjectDetailsContext.Provider>
  );
};
