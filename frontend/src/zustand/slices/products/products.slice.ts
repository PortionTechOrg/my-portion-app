import { api, apiPrivate } from "@/api/temp-config";
import type { ProductWithuser, ProductWithUserAndKyc } from "@shared/types/product";
import type { ProductSchema } from "@shared/validation/product-schema";
import toast from "react-hot-toast";
import type { StateCreator } from "zustand";

export interface ProductState {
    loading: boolean,
    error: string | null,
    products: ProductWithUserAndKyc[],
    user_products: ProductWithuser[],
    selectedProduct: ProductWithUserAndKyc | null,

    clearSelectedProduct: () => void,

    getProductsById: (id:string)=> Promise<void>,
    setSelectedProduct: (id:string)=> void,
    getProducts: (page?:number, limit?:number)=> Promise<void>,
    getUserProducts: (page?:number, limit?:number)=> Promise<void>,
    createProduct: (product: ProductSchema) => Promise<void>

}

export const createProductsSlice: StateCreator<
ProductState,
[],
[],
ProductState> = ((set)=> {
return{
        loading: true,
        error: null,
        products: [],
        user_products: [],
        selectedProduct: null,

        getProductsById: async (id:string) =>{
            set({ loading: true, selectedProduct: null, error: null})
            try {
                const res = await api.get( `/product/${id}`, );
                set({ selectedProduct: res.data.data, loading: false })
            }catch(err:any){
               if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        getUserProducts: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `/product/me`, { params: { page, limit}} );
                set({ user_products: res.data.data.product, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        getProducts: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {

                const res = await api.get( `/product`, { params: { page, limit}} );
                set({ products: res.data.data.product, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        clearSelectedProduct: ()=> {
            set({ selectedProduct: null })
        },

        createProduct: async (product: ProductSchema) =>{
            set({ loading: true, error: null})
            try {
                const res = await apiPrivate.postForm( `/product/`, {
                    ...product
                } );
                toast.success(res?.data.message);
                set((state) => ({ products: [...state.products, res.data.data.product], loading: false }))

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        setSelectedProduct: (id:string) => {

            set((state) => {
                const selectedItem = state.products.find(product => product.id == id)
                return {
                    selectedProduct: selectedItem
                }
            })

        }
    }
})