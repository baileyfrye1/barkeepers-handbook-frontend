import { create } from "zustand";
import { User } from "../types/types";

interface UserStoreType {
  user: User;
  setUser: (user: User) => void;
}

const initialState: User = {
  created_at: "",
  email: "",
  id: "",
  phone: "",
  role: "",
  updated_at: "",
};

export const useUserStore = create<UserStoreType>((set) => ({
  user: initialState,
  setUser: (user) => {
    set({ user });
  },
}));
