import Axios from "axios";
import { store } from "../redux/store";
import { setAccessToken } from "../redux/slice/authSlice";

const API_URL = "http://localhost:8000";
const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

console.log("axios", axios);
axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state?.auth?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post("/token");
        store.dispatch(setAccessToken(data.accessToken));
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
export default axios;
