import { User as FBUser } from "firebase/auth";
import { create, StateCreator } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { Balance, Transaction, User } from "../functions/types";

export type AuthState = {
  isAuthenticated: boolean;
  fbUser?: FBUser;
  user?: User;
  balance?: Balance;
  transactions: Transaction[];
};

export type AuthActions = {
  setIsAuthenticatedState: (isAuthenticated: boolean) => void;
  setFbUserState: (fbUser?: FBUser) => void;
  setUserState: (user?: User) => void;
  setBalanceState: (balance: Balance) => void;
  setTransactionsState: (transactions: Transaction[]) => void;

  clearAuth: () => void;
  signOut: () => void;
};

const authStorage: StateStorage = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : "false";
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const initializer: StateCreator<AuthState & AuthActions> = (set) => ({
  isAuthenticated: false,
  fbUser: undefined,
  user: undefined,
  balance: undefined,
  transactions: [],
  setIsAuthenticatedState: (isAuthenticated: boolean) =>
    set({ isAuthenticated }),
  setFbUserState: (fbUser?: FBUser) => set({ fbUser }),
  setUserState: (user?: User) => set({ user }),
  setBalanceState: (balance: Balance) => set({ balance }),
  setTransactionsState: (transactions: Transaction[]) => set({ transactions }),
  clearAuth: () =>
    set({
      balance: undefined,
      transactions: undefined,
      user: undefined,
      fbUser: undefined,
      isAuthenticated: false,
    }),
  signOut: () => {
    set({
      isAuthenticated: false,
    });
  },
});

const persistedAuthState = persist<AuthState & AuthActions>(initializer, {
  name: "auth",
  storage: createJSONStorage(() => authStorage),
});

export const useAuthState = create<
  AuthState & AuthActions,
  [["zustand/persist", AuthState & AuthActions]]
>(persistedAuthState);
