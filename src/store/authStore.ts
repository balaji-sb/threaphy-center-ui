import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "therapist" | "client";
}

interface Session {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthState {
  admin: Session;
  therapist: Session;
  client: Session;
  login: (user: User, token: string) => void;
  logout: (role: "admin" | "therapist" | "client") => void;
  getActiveSession: (pathname: string) => Session;
}

const defaultSession: Session = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      admin: defaultSession,
      therapist: defaultSession,
      client: defaultSession,

      login: (user, token) =>
        set((state) => ({
          ...state,
          [user.role]: { user, token, isAuthenticated: true },
        })),

      logout: (role) =>
        set((state) => ({
          ...state,
          [role]: defaultSession,
        })),

      getActiveSession: (pathname: string) => {
        const state = get();
        if (pathname.startsWith("/admin")) return state.admin;
        if (pathname.startsWith("/therapist-dash")) return state.therapist;
        return state.client; // default for root and client pages
      },
    }),
    {
      name: "auth-storage", // stores in localStorage by default
      skipHydration: true, // we handle hydration manually for SSR if needed
    },
  ),
);
