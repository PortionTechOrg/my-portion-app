import { apiPrivate } from "@/api/temp-config";
import type { ProductWithOrders } from "@shared/types/product";
import type { OrderWithProductAndUser, OrderWithUserAndOrderRecordAndProduct } from "@shared/types/order";

import type { StateCreator } from "zustand";

interface OrderResponseType {
    product_orders: ProductWithOrders[],
    all_products_count: number,
    pending_products_count: number,
    delivered_products_count: number,
}

export interface OrderState {
    loading: boolean,
    error: string | null,
    product_orders: OrderResponseType,
    user_orders: OrderWithUserAndOrderRecordAndProduct[],
    user_order_record: OrderWithUserAndOrderRecordAndProduct[],
    selected_order: OrderWithProductAndUser | null,
    selected_user_order_record: ProductWithOrders | null,
    
    clearSelectedProductOrder: () => void,

    getOrderById: (id:string)=> Promise<void>,
    getProductOrderRecordById: (id:string)=> Promise<void>,
    getProductOrders: (page?:number, limit?:number)=> Promise<void>,
    getUserOrders: (page?:number, limit?:number) => Promise<void>

}

export const createOrdersSlice: StateCreator<
OrderState,
[],
[],
OrderState> = ((set)=> {
return{
        loading: true,
        error: null,
        product_orders: {
            all_products_count: 0,
            delivered_products_count: 0,
            pending_products_count: 0,
            product_orders: []
        },
        user_orders: [],
        user_order_record: [],
        selected_order: null,
        selected_user_order_record: null,

        getOrderById: async (id:string) =>{
            set({ loading: true, error: null})
            try {
                const res = await apiPrivate.get( `/order/${id}`, {} );
                console.log(res.data)
                set({ selected_order: res.data.data.orders, loading: false })
            }catch(err:any){
               if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },
        
        getProductOrderRecordById: async (id:string) =>{
            set({ loading: true, selected_order: null, error: null})
            try {
                const res = await apiPrivate.get( `/order/${id}`, {} );
                set({ selected_order: res.data.data.product, loading: false })
            }catch(err:any){
               if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },


        getProductOrders: async (page:number=1, limit:number=10, status: string = '') =>{
            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `product/order-record`, { params: { page, limit, status}} );
                set({ product_orders: res.data.data, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        clearSelectedProductOrder: ()=> {
            set({ selected_order: null })
        },

        getUserOrders: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `/order`, { params: { page, limit}} );
                set({ user_orders: res.data.data.orders, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }

        },
    }
})