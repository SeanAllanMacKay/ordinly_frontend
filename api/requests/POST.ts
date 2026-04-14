import { REQUEST_ACTIONS, serializePayload, type APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type POSTProps = {
  endpoint: string;
  body?: Record<string, any>;
};

export const POST = async <T = {}>({
  endpoint,
  body,
}: POSTProps): Promise<APIResponse & T> => {
  try {
    const serializedPayload = await serializePayload(body);

    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: REQUEST_ACTIONS.POST,
      credentials: "include",
      headers: {
        ...(serializedPayload.isMultipart
          ? {}
          : { "Content-Type": "application/json" }),
      },
      body: serializedPayload.body,
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
