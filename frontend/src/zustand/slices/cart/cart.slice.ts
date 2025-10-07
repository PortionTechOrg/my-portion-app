import { apiPrivate } from "@/api/temp-config";
import type { CartItem } from "@/types/cart";
import { useModalStore } from "@/zustand/store";
import type { OrderAttribute } from "@shared/types/order";
import type { CheckOutSchema } from "@shared/validation/check-out-schema";
import toast from "react-hot-toast";
import type { StateCreator } from "zustand";

interface checkoutItem {
        id: string,
        product_id: string[],
        status: string,
        order_ids: string[],
        user_id: string,
        updatedAt: string,
        createdAt: string,
        orders: OrderAttribute[]
    }

export type CartItemContextType = {
  isSideBarOpen: boolean,
  toggleCartSidebar: () => void,
  cartItems: Partial<CartItem>[];
  addToCart: (item: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  updateCartItemQuantity: (id:string, quantity: number) => void;
  ckStore: Partial<CartItem>[];   // looks like a cookie-store mirror?
  ckStoreCount: number;
  checkoutItem: checkoutItem | null,
  loading: boolean,
  error: string | null,
  checkout: (product: CheckOutSchema, cartItem: Partial<CartItem>[]) => Promise<void>,
};

export const createCartSlice: StateCreator<
  CartItemContextType,
  [],
  [],
  CartItemContextType
> = (set) => ({
  isSideBarOpen: false,
  toggleCartSidebar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
  checkoutItem: null,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  ckStore: [],
  ckStoreCount: 0,
  loading: true,
  error: null,
  updateCartItemQuantity: (id, newQuantity) =>
        set((state) => {
          if (newQuantity <= 0) {
            // if you want to remove item when qty = 0
            const updated = state.cartItems.filter((item) => item.id !== id);
            return {
              cartItems: updated,
              cartCount: updated.length,
              cartTotal: updated.reduce(
                (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
                0
              ),
            };
          }

          const updated = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );

          return {
            cartItems: updated,
            cartCount: updated.length,
            cartTotal: updated.reduce(
              (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
              0
            ),
          };
        }),
  clearCart: () =>
    set(() => ({
      cartItems: [],
      ckStore: [],
      cartCount: 0,
      cartTotal: 0,
      ckStoreCount: 0,
    })),

  removeFromCart: (id: string) =>
    set((state) => {
      const filtered = state.cartItems.filter((item) => item.id !== id);

      return {
        cartItems: filtered,
        cartCount: filtered.length,
        cartTotal: filtered.reduce(
          (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
          0
        ),
        ckStore: filtered,
        ckStoreCount: filtered.reduce(
          (acc, cur) => acc + (cur.quantity ?? 0),
          0
        ),
      };
    }),

  addToCart: (item: Partial<CartItem>) =>
    set((state) => {
      let updated: Partial<CartItem>[];

      const found = state.cartItems.find((ci) => ci.id === item.id);

      if (!found) {
        updated = [...state.cartItems, { ...item, quantity: 1 }];
      } else {
        updated = state.cartItems.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: (ci.quantity ?? 1) + 1 }
            : ci
        );
      }

      return {
        cartItems: updated,
        cartCount: updated.length,
        cartTotal: updated.reduce(
          (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
          0
        ),
        ckStore: updated,
        ckStoreCount: updated.reduce(
          (acc, cur) => acc + (cur.quantity ?? 0),
          0
        ),
      };
    }),

  checkout: async(product: CheckOutSchema, cartItems: Partial<CartItem>[]) => {
    set({ loading: true, error: null})
      try {
          const res = await apiPrivate.post( `/product/check-out`, {
              ...product, cartItems
          } );
          toast.success(res?.data.message);
          set(({ checkoutItem: res.data.data, loading: false }))
          useModalStore.getState().togglePaymentModal()
        }catch(err:any){
          if (err.response) {
              toast.error(err.response.data.message, { duration: 5000})                    
            } else {
              toast.error(err.message, { duration: 5000})
          }
      }
    }
});
