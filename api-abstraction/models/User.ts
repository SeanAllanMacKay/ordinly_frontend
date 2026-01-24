import { requests } from "../";

export type UserAuthArgs = {
  email: string;
  password: string;
};

export type UserGETArgs = {
  userId: string;
};

export type UserType = {};

export const User = {
  signUp: async (body: UserAuthArgs) =>
    await requests.POST<{ user: UserType }>({
      endpoint: "/user/sign-up",
      body,
    }),

  verifyAccount: async (body: { code: string }) =>
    await requests.POST({
      endpoint: "/user/verify-account",
      body,
    }),

  login: async (body: UserAuthArgs) =>
    await requests.POST<{ user: UserType }>({ endpoint: "/user/login", body }),

  persistentLogin: async () =>
    await requests.POST({ endpoint: "/user/persistent-login" }),

  getUserById: async ({ userId }: UserGETArgs) =>
    requests.GET({ endpoint: `/user/${userId}` }),

  updateUser: async () => {},

  deleteUser: async () => {},
};
