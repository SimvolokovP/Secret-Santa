import { IUser } from "../models/IUser";
import UserService from "../api/supabase/userApi";
import { TOperationStatus } from "../models/TOperationStatus";
import { TelegramWebApps } from "telegram-webapps/src";
import { create } from "zustand";

interface UserStore {
  currentUser: IUser | null;
  userStatus: TOperationStatus;
  logIn: (user: TelegramWebApps.WebAppUser) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  userStatus: {
    loading: false,
    error: null,
  },
  logIn: async (user) => {
    set((state) => ({ userStatus: { ...state.userStatus, loading: true } }));
    try {
      const loggedInUser = await UserService.logIn(user?.id || 123);
      set({ currentUser: loggedInUser });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      set((state) => ({
        userStatus: { ...state.userStatus, error: errorMessage },
      }));
    } finally {
      set((state) => ({ userStatus: { ...state.userStatus, loading: false } }));
    }
  },
}));

export default useUserStore;
