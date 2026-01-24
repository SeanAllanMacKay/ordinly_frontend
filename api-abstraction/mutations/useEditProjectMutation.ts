import { useMutation } from "@tanstack/react-query";
import { models } from "..";

export const useEditProjectMutation = ({
  projectId,
  onSuccess: onSuccessCallback,
}: {
  projectId: string;
  onSuccess?: (
    user: Awaited<ReturnType<typeof models.Project.editProject>>["project"]
  ) => void;
}) =>
  useMutation({
    mutationFn: (args: Record<string, any>) =>
      models.Project.editProject({ projectId, ...args }),
    onSuccess: ({ project }) => {
      onSuccessCallback?.(project);
    },
  });
