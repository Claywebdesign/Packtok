import { useAuthStore } from "../store/auth-store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    if (!config.headers) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config.headers = {} as any;
    }
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest?._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        api
          .post("/api/v1/auth/refresh")
          .then(({ data }) => {
            const newToken = data.data?.accessToken as string;
            if (newToken) {
              useAuthStore.getState().setAccessToken(newToken);
              api.defaults.headers.common["Authorization"] =
                `Bearer ${newToken}`;
            }
            processQueue(null, newToken);
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            }
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            useAuthStore.getState().logout();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
