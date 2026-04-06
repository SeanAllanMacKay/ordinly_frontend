import { REQUEST_ACTIONS, type APIResponse } from "./";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type GETProps = {
  endpoint: string;
  type?: string;
  queryParams?: Record<string | number, string | number | string[] | number[]>;
};

export const GET = async <T = {}>({
  endpoint,
  type = "application/json",
  queryParams = {},
}: GETProps): Promise<APIResponse & T> => {
  try {
    const queryParamString = queryParams
      ? new URLSearchParams(
          Object.entries(queryParams).reduce((aggregator, [key, value]) => {
            const formattedKey = typeof key === "string" ? key : String(key);

            let formattedValue = "";

            if (Array.isArray(value)) {
              formattedValue = value.join(",");
            } else {
              formattedValue = String(value);
            }

            return { ...aggregator, [formattedKey]: formattedValue };
          }, {}),
        )
      : null;

    const response = await fetch(
      `${API_URL}/api${endpoint}${
        queryParamString ? `?${queryParamString.toString()}` : ""
      }`,
      {
        method: REQUEST_ACTIONS.GET,
        credentials: "include",
        headers: {
          "Content-Type": type,
        },
      },
    );

    if (response.ok) {
      if (type === "application/json") {
        return await response?.json();
      }
    }

    throw { response };
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
