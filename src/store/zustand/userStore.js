import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create((set, get) => ({
  user: null,
  role: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  getUser: () => get().user,
  setRole: (role) => set({ role }),
  getRole: () => get().role,
  setAccessToken: (accessToken) => set({ accessToken }),
  getAccessToken: () => ({
    accessToken: get().accessToken,
  }),
  updateAccessToken: (accessToken) => set({ accessToken }),
  logout: () => set({ user: null, accessToken: null, role: null }),
}));

export default useUserStore;
