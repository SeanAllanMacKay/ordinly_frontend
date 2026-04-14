export const REQUEST_ACTIONS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const serializePayload = async (data?: Record<string, any>) => {
  const hasFile = Object.values(data ?? {}).some((value) => !!value?.fileType);

  if (hasFile) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data ?? {})) {
      if (value === null || value === undefined) continue;

      if (value.fileType && value.uri) {
        if (value.file instanceof Blob) {
          formData.append(key, value.file, value.fileName);
        } else {
          const response = await fetch(value.uri);
          const blob = await response.blob();

          formData.append(key, blob, value.fileName);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    }

    return {
      body: formData,
      isMultipart: true,
    };
  }

  return {
    body: JSON.stringify(data),
    isMultipart: false,
  };
};
