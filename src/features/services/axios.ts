import Axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { store } from "../redux/store";
import { setAccessToken } from "../redux/slice/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
//const API_URL="http://localhost:8000"
//const API_URL = "http://localhost:3000";
let refreshPromise: Promise<string> | null = null;

export function getAccessToken() {
  const state = store.getState();
  const token = state?.auth?.accessToken;
  return token;
}

export function isLoggedIn() {
  const token = getAccessToken();
  return !!token;
}

// export function redirectToLogin() {
//   clearAccessToken();
//   redirect("/login");
// }

// ---------- axios instance ----------
export const axios: AxiosInstance = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
async function refreshAccessToken() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = Axios.post("/api/refresh", null, {
    withCredentials: true,
  })
    .then((res) => {
      const { data } = res;
      const authData = {
        accessToken: data?.accessToken,
        userName: data?.userName,
        isAuthenticated: true,
      };

      if (!data?.accessToken) {
        throw new Error("Refresh response did not contain accessToken");
      }

      setAccessToken(authData);
      return data?.access_token;
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
// ---------- request interceptor ----------
axios.interceptors.request.use(
  async (config) => {
    const url = config.url || "";
    const isLoginRoute = /^\/?api\/(auth|resetPassword|refresh)/.test(url);

    if (!isLoginRoute) {
      if (isLoggedIn()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
        return config;
      }
      try {
        const refreshToken = refreshAccessToken();
        config.headers.Authorization = `Bearer ${refreshToken}`;
        return config;
      } catch (err) {
        return Promise.reject(err);
      }
    }
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---------- response interceptor----------
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isLoginRoute = /^\/?api\/(auth|resetPassword|refresh)/.test(
      originalRequest?.url,
    );
    if (
      error.response?.status === 401 &&
      !isLoginRoute &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest); // retry the original request
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default axios;
