import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
  : "http://localhost:5002";
console.log("BASE_URL" + BASE_URL);
export const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStaticUrl = (path: string | undefined) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

api.interceptors.request.use(
  (config) => {
    // Determine the current path to fetch the correct token
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    let token = useAuthStore.getState().getActiveSession(pathname)?.token;

    // Fallback to reading directly from localStorage if Zustand hasn't hydrated yet
    if (!token && typeof window !== "undefined") {
      try {
        const storedAuth = localStorage.getItem("auth-storage");
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth);
          const state = parsed.state;
          if (pathname.startsWith("/admin")) token = state?.admin?.token;
          else if (pathname.startsWith("/therapist-dash"))
            token = state?.therapist?.token;
          else token = state?.client?.token;
        }
      } catch (e) {
        console.error("Failed to parse auth storage", e);
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
