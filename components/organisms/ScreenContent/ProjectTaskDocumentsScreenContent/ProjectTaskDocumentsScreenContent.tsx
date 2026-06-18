import { useGetProjectTaskQuery, DocumentType } from "@/api";
import { projectRequests } from "@/api/entities/projects/requests";
import { DocumentsList } from "@/components/molecules";
import React from "react";

export const ProjectTaskDocumentsScreenContent = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  const taskQuery = useGetProjectTaskQuery({ projectId, taskId });

  const getDownloadURL = async (document: DocumentType) => {
    const { downloadURL } =
      await projectRequests.tasks.documents.getDocumentDownloadURL({
        projectId,
        taskId,
        documentId: document.id,
      });

    return downloadURL;
  };

  return (
    <DocumentsList
      documents={taskQuery.data?.task.documents ?? []}
      getDownloadURL={getDownloadURL}
    />
  );
};
