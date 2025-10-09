import { useUserStore } from "@/zustand/store";
import { useEffect } from "react";

export function useUserState() {
    const { loading, error, user } = useUserStore();
    
    const data = {
        user
    }

    return {
        loading, 
        error, 
        data
    }
}

export function useFetchUser() {
    const { getUser } = useUserStore();
    
    useEffect(()=>{

        const fetchUser = async () => {
            const fetches = [
                getUser()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more dashboard analytics fetches failed:", err);
            }
        }

        fetchUser();
        
    }, [getUser]);
}
