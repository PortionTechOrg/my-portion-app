import { useEffect } from "react";
import { useBankStore } from "../../store";

export function useBankState() {
    const { loading, error, banks } = useBankStore();
    
    const data = {
        banks
    }

    return {
        loading, 
        error, 
        data
    }
}

export function useFetchBanks() {
    const { getBanks } = useBankStore();
    
    useEffect(()=>{

        const fetchUserBanks = async () => {
            const fetches = [
                getBanks()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more bank fetches failed:", err);
            }
        }

        fetchUserBanks();
        
    }, [getBanks]);
}
