import { POST, GET, PATCH, PUT, DELETE, REQUEST_ACTIONS } from "@/api/requests";

// A file-like value `serializePayload` can upload (native image-picker object or
// a web File/Blob). Declared here so the API layer stays independent of the UI
// `ImageType`, while remaining structurally compatible with it.
export type ProfilePictureUpload =
  | Blob
  | { uri: string; type: string; name?: string | null };

export type UserAuthArgs = {
  email: string;
  password: string;
};

export type UserSignUpArgs = UserAuthArgs & {
  name: string;
  /** The user's browser/device language as a BCP-47 tag (e.g. "en-US"). */
  preferredLanguage?: string;
};

export type UserGETArgs = {
  userId: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  companies: {
    company: {
      id: string;
      name: string;
    };
  }[];
  personalCompany: {
    id: string;
    name: string;
  };
  isVerified: boolean;
  createdDate: Date;
  /** The user's persisted language as a BCP-47 tag (e.g. "en-US"). */
  preferredLanguage: string;
  /**
   * The user's profile picture as the backend serializes it (raw image bytes
   * keyed by index), or `null` when none is set. Use `profilePictureToUri` to
   * turn it into a renderable data URI.
   */
  profilePicture: Record<string, number | string> | { data: number[] } | null;
};

export const userRequests = {
  signUp: async (body: UserSignUpArgs) =>
    await POST<{ user: UserType }>({
      endpoint: "/user/sign-up",
      body,
    }),

  verifyAccount: async (body: { code: string }) =>
    await POST({
      endpoint: "/user/verify-account",
      body,
    }),

  resendVerification: async () =>
    await POST({ endpoint: "/user/resend-verification" }),

  login: async (body: UserAuthArgs) =>
    await POST<{ user: UserType }>({ endpoint: "/user/login", body }),

  logout: async () => await POST({ endpoint: "/user/logout" }),

  persistentLogin: async () =>
    await POST({ endpoint: "/user/persistent-login" }),

  getCurrentUser: async () =>
    await GET<{ message: string; user: UserType }>({ endpoint: "/user" }),

  getUserById: async ({ userId }: UserGETArgs) =>
    await GET({ endpoint: `/user/${userId}` }),

  updateUser: async (body: { preferredLanguage: string }) =>
    await PATCH({ endpoint: "/user", body }),

  // `serializePayload` detects the file-like `profilePicture` value and sends
  // the request as multipart/form-data with a `profilePicture` part.
  updateProfilePicture: async (body: { profilePicture: ProfilePictureUpload }) =>
    await PUT({ endpoint: "/user/profile-picture", body }),

  deleteProfilePicture: async () =>
    await DELETE({ endpoint: "/user/profile-picture" }),

  deleteUser: async (body: { password: string }) =>
    await DELETE({ endpoint: "/user", body }),

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
  resendVerification: () => [REQUEST_ACTIONS.POST, base, "resend-verification"],
  login: () => [REQUEST_ACTIONS.POST, base, "login"],
  logout: () => [REQUEST_ACTIONS.POST, base, "logout"],
  persistentLogin: () => [REQUEST_ACTIONS.POST, base, "persistent-login"],
  getCurrentUser: () => [REQUEST_ACTIONS.GET, base, "current"],
  getUserById: (userId: string) => [REQUEST_ACTIONS.GET, base, userId],
  updateUser: () => [REQUEST_ACTIONS.PATCH, base],
  updateProfilePicture: () => [REQUEST_ACTIONS.PUT, base, "profile-picture"],
  deleteProfilePicture: () => [REQUEST_ACTIONS.DELETE, base, "profile-picture"],
  deleteUser: () => [REQUEST_ACTIONS.DELETE, base],
};
