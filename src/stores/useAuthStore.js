import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),

  // Fetch current user from /api/me
  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();
      set({ user: data.user || null, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      set({ user: null, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
