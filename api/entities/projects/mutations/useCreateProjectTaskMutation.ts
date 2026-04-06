import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectRequests, projectRequestKeys } from "../requests";

export const useCreateProjectTaskMutation = ({
  projectId,
  onSuccess,
}: {
  projectId: string;
  onSuccess?: (
    data: Awaited<ReturnType<typeof projectRequests.tasks.createTask>>,
  ) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: projectRequestKeys.tasks.createTask({ projectId }),
    mutationFn: async (
      props: Omit<
        Parameters<typeof projectRequests.tasks.createTask>[0],
        "projectId"
      >,
    ) => await projectRequests.tasks.createTask({ ...props, projectId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: projectRequestKeys.tasks.listTasks({
          projectId,
        }),
      });

      onSuccess?.(data);
    },
  });
};
