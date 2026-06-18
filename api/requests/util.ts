import isNil from "lodash.isnil";

export const REQUEST_ACTIONS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const isValueFileObject = (value: any) => {
  if (!!value?.uri && !!value?.type) {
    return true;
  }

  return false;
};

export const isValueFileLike = (value: any) => {
  if (value instanceof Blob) {
    return true;
  }

  if (isValueFileObject(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isValueFileLike);
  }

  return false;
};

const getBlobValue = async (value: any) => {
  if (!isValueFileLike(value)) {
    return;
  }

  if (value instanceof Blob) {
    return value;
  }

  if (isValueFileObject(value)) {
    const response = await fetch(value.uri);
    return await response.blob();
  }
};

export const serializePayload = async (data?: Record<string, any>) => {
  const formData = new FormData();
  let hasFile = false;

  const entries = Object.entries(data ?? {});

  for (const [key, value] of entries) {
    if (isNil(value)) {
      continue;
    }

    if (!isValueFileLike(value)) {
      formData.append(key, value);
      continue;
    }

    if (value instanceof Blob) {
      formData.append(key, value, key);
      hasFile = true;
      continue;
    }

    if (isValueFileObject(value)) {
      const blob = await getBlobValue(value);

      if (!blob) {
        continue;
      }

      formData.append(key, blob, value?.name ?? key);
      hasFile = true;
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const blob = await getBlobValue(item);

        if (!blob) {
          continue;
        }

        formData.append(key, blob, item?.name ?? key);
        hasFile = true;
      }
    }
  }

  if (hasFile) {
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
