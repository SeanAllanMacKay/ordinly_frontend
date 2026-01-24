import { REQUEST_ACTIONS, type APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type UPLOADProps = {
  action?: (typeof REQUEST_ACTIONS)["POST"] | (typeof REQUEST_ACTIONS)["PUT"];
  endpoint: string;
  body?: { [key: string]: any };
};

export const UPLOAD = async <T = {}>({
  action = REQUEST_ACTIONS.POST,
  endpoint,
  body,
}: UPLOADProps): Promise<APIResponse & T> => {
  try {
    const formData = new FormData();

    Object.entries(body ?? {}).forEach(([key, value]: [string, any]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof Blob)
      ) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: action,
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw { response };
    }
  } catch (caught: any) {
    const { response } = caught;

    if (response) {
      const { error } = await response.json();

      if (error) {
        throw { status: response.status, error };
      }
    }

    throw caught;
  }
};
