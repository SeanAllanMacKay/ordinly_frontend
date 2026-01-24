import type { APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type DELETEProps = { endpoint: string };

export const DELETE = async ({
  endpoint,
}: DELETEProps): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: "DELETE",
      credentials: "include",
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
