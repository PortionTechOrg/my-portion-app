import { useEffect } from "react";
import { useOrderStore } from "../../store";

export function useOrderState() {
    const { loading, user_order_record, error, product_orders, selected_order, user_orders } = useOrderStore();
    
    const data = {
        product_orders,
        user_orders,
        user_order_record,
        selected_order,
    }

    return {
        loading, 
        error, 
        data
    }
}


export function useFetchUserOrder() {
    const { getUserOrders } = useOrderStore();
    
    useEffect(()=>{

        const fetchProductsOrders = async () => {
            const fetches = [
                getUserOrders()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more order fetches failed:", err);
            }
        }

        fetchProductsOrders();
        
    }, [getUserOrders]);
}
