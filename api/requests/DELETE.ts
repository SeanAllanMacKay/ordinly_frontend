import { REQUEST_ACTIONS, serializePayload, type APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type DELETEProps = { endpoint: string; body?: Record<string, any> };

export const DELETE = async ({
  endpoint,
  body,
}: DELETEProps): Promise<APIResponse> => {
  try {
    const serializedPayload = await serializePayload(body);

    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: REQUEST_ACTIONS.DELETE,
      credentials: "include",
      headers: {
        ...(serializedPayload.isMultipart
          ? {}
          : { "Content-Type": "application/json" }),
      },
      ...(body ? { body: serializedPayload.body } : {}),
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
