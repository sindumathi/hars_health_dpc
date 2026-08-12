import Axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { store } from "../redux/store";
import { clearAccessToken, setAccessToken } from "../redux/slice/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL="http://localhost:8000"
//const API_URL = "http://localhost:3000";

// Axios instances

export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const refreshClient = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --------------------------------------------------
// Refresh queue
// --------------------------------------------------

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });

  failedQueue = [];
};
// Request interceptor--------------------------------------------------

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state?.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// -----------------------Response interceptor---------------------------

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log("original request", originalRequest);
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(error);
    }
    //does not try refresh token if it is from login url
    if (originalRequest?.url === "/api/auth") {
      return Promise.reject(error);
    }
    // ----------------401------------------------------
    console.log("error?.response?.status", error?.response);
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // ----------------------------------------------
    // Don't refresh the refresh endpoint
    // ----------------------------------------------

    if (originalRequest.url?.includes("/api/refresh")) {
      clearAccessToken();
      return Promise.reject(error);
    }

    // ----------Prevent infinite retry------------------------------------

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // ----------------------------------------------
    // Refresh already in progress
    // ----------------------------------------------

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return axios(originalRequest);
        })
        .catch((queueError) => {
          return Promise.reject(queueError);
        });
    }

    // ----------------------------------------------
    // Start refresh
    // ----------------------------------------------

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await refreshClient.post("/api/refresh");

      const { data } = response;
      const authData = {
        accessToken: data?.accessToken,
        userName: data?.userName,
        isAuthenticated: true,
      };

      if (!data?.accessToken) {
        throw new Error("Refresh response did not contain accessToken");
      }

      setAccessToken(authData);

      // Resolve all queued requests
      processQueue(null, data?.accessToken);

      // Update original request
      originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;

      // Retry original request
      return axios(originalRequest);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);

      // Reject all queued requests
      processQueue(refreshError, null);

      // Clear authentication
      clearAccessToken();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axios;
