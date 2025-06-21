export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  LISTINGS: {
    BASE: "/listings",
    BY_ID: (id: string) => `/listings/${id}`,
    BY_USER: (userId: string) => `/listings/user/${userId}`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const JWT_EXPIRES_IN = "7d";
export const BCRYPT_ROUNDS = 12;
