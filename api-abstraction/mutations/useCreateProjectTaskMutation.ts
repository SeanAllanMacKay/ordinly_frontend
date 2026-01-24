import { useMutation } from "@tanstack/react-query";
import { models } from "..";

export const useCreateProjectTaskMutation = ({
  onSuccess: onSuccessCallback,
}: {
  onSuccess?: (
    user: Awaited<ReturnType<typeof models.Project.createProject>>["project"]
  ) => void;
} = {}) =>
  useMutation({
    mutationFn: models.Project.createProject,
    onSuccess: ({ project }) => {
      onSuccessCallback?.(project);
    },
  });
