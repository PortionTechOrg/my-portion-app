import { apiPrivate } from "@/api/temp-config";
import type { StateCreator } from "zustand";
import type { BankAttributes } from "@shared/types/bank";



export interface BankState {
    loading: boolean,
    error: string | null,
    banks: BankAttributes[],

    getBanks: () => void,
    setBank: (bank_details: BankAttributes[]) => void,
}

export const createBankSlice: StateCreator<
BankState,
[],
[],
BankState> = ((set) => {
    return {
        loading: true,
        error: null,
        getBanks: async () => {
            set({ loading: true, error: null })

            try {
                const response = await apiPrivate.get('bank', { } )
                set( { banks: response.data.data })
            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },
        setBank: async (bank_details: BankAttributes[]) => {
            set({ loading: true, error: null })

            try {
                await apiPrivate.get('bank', { } )
                set( { banks: bank_details })
            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },
        banks: [],


        
    }
})
