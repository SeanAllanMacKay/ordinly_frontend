import { REQUEST_ACTIONS, serializePayload, type APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type PUTProps = {
  endpoint: string;
  body?: { [key: string]: any };
};

export const PUT = async <T = {}>({
  endpoint,
  body,
}: PUTProps): Promise<APIResponse & T> => {
  try {
    const serializedPayload = await serializePayload(body);

    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: REQUEST_ACTIONS.PUT,
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
