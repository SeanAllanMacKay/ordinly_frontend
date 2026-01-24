import { POST, GET, REQUEST_ACTIONS } from "@/api/requests";

export type UserAuthArgs = {
  email: string;
  password: string;
};

export type UserGETArgs = {
  userId: string;
};

export type UserType = {};

export const userRequests = {
  signUp: async (body: UserAuthArgs) =>
    await POST<{ user: UserType }>({
      endpoint: "/user/sign-up",
      body,
    }),

  verifyAccount: async (body: { code: string }) =>
    await POST({
      endpoint: "/user/verify-account",
      body,
    }),

  login: async (body: UserAuthArgs) =>
    await POST<{ user: UserType }>({ endpoint: "/user/login", body }),

  logout: async () => {},

  persistentLogin: async () =>
    await POST({ endpoint: "/user/persistent-login" }),

  getCurrentUser: async () => await GET({ endpoint: "/user" }),

  getUserById: async ({ userId }: UserGETArgs) =>
    await GET({ endpoint: `/user/${userId}` }),

  updateUser: async () => {},

  deleteUser: async () => {},

  projects: {
    listProjects: async () => {},
    getProject: async () => {},
    createProject: async () => {},
    deleteProject: async () => {},
    editProject: async () => {},

    tasks: {
      listTasks: async () => {},
      createTask: async () => {},
      editTask: async () => {},
      deleteTask: async () => {},
    },
  },
};

const base = "user";

export const userRequestKeys = {
  signUp: () => [REQUEST_ACTIONS.POST, base, "sign-up"],
  verifyAccount: () => [REQUEST_ACTIONS.POST, base, "verify-account"],
  login: () => [REQUEST_ACTIONS.POST, base, "login"],
  logout: () => [REQUEST_ACTIONS.POST, base, "logout"],
  persistentLogin: () => [REQUEST_ACTIONS.POST, base, "persistent-login"],
  getCurrentUser: () => [REQUEST_ACTIONS.GET, base, "current"],
  getUserById: (userId: string) => [REQUEST_ACTIONS.GET, base, userId],
};
