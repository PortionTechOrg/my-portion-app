import type { loginProps } from "@/types/api-response-type";
import type { UserWithKycAttributes } from "@shared/types/product";
import type { StateCreator } from "zustand";

export type AuthState = {
    loginAuth: ( { }: loginProps) => void;
    logoutAuth: () => void;
    token: string;
    setToken: ( token:string ) => void;
    refreshToken: string;
    isLoggedIn:boolean,
    isLoading:boolean,
    user: UserWithKycAttributes | null,
    role: string;
}


export const createAuthSlice: StateCreator<
  AuthState,
  [],
  [],
  AuthState
> = (set) => ({

    loginAuth: ({ token, refreshToken, user}) => {
        set({ token, refreshToken, role: user?.role, isLoggedIn: true, user: user,  })
    },
    logoutAuth: () => {
        set({ token: '', refreshToken: '', isLoggedIn: false, role: '', user: null })
    },
    token: "",
    setToken: (token) => {
        set({ token })
    },
    refreshToken: "",
    isLoggedIn: false,
    isLoading: false,
    user: null,
    role: "",
});
