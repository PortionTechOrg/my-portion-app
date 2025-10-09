import { apiPrivate } from "@/api/temp-config";
import type { UserWithKycAttributes } from "@shared/types/product";
import type { StateCreator } from "zustand";

export type UserState = {
    loading: boolean,
    error: string | null,
    user: UserWithKycAttributes | null,
    getUser: () => Promise<void>
    setUser: (user:UserWithKycAttributes | null) => void,

}


export const createUserSlice: StateCreator<
  UserState,
  [],
  [],
  UserState
> = (set) => ({

    loading: false,
    error: null,
    user: null,
    getUser: async () =>{
        set({ loading: true, error: null})
        try {
            const res = await apiPrivate.get( `/user/me` );
            console.log(res)
            set({ user: res.data.data, loading: false })
            

        }catch(err:any){
            if (err.response) {
                set({ error: err.response.data.message, loading: false })
            } else {
                set({ error: err.message, loading: false })
            }
        }
    },

    setUser: (user) => {
        set({ user})
    }
});
