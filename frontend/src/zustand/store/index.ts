import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCartSlice, type CartItemContextType } from "../slices/cart/cart.slice";
import { createDashboardSlice, type dashboardState } from "../slices/dashboard/dashboard.slice";
import { createProductsSlice, type ProductState } from "../slices/products/products.slice";
import { createAuthSlice, type AuthState } from "../slices/auth";
import { createAdminOrderSlice, type AdminOrdersState } from "../slices/admin/orders";
import { createOrdersSlice, type OrderState } from "../slices/orders/orders.slice";
import { createWalletSlice, type WalletState } from "../slices/wallet/wallet.slice";
import { createTransactionSlice, type TransactionState } from "../slices/transaction/transaction.slice";
import { createModalsSlice, type ModalState } from "../modal/modal.slice";
import { createNotificationsSlice, type NotificiationState } from "../slices/notification/notification.slice";
import { createUserSlice, type UserState } from "../slices/user/user.slice";
import { createBankSlice, type BankState } from "../slices/bank/bank.slice";

interface GlobalState extends 
CartItemContextType, 
dashboardState {

}

export const useCartStore = create<GlobalState>()((...a)=>(
{  ...persist(createCartSlice, 
    { 
        name: "cart-storage",
        partialize: (state) => {
            const { checkoutItem, ...rest } = state;
            return rest;
        }
    })(...a),
   ...createDashboardSlice(...a),
}
));


export const useProductStore = create<ProductState
>()((...a) =>(
{
    ...createProductsSlice(...a)
}
))

export const useModalStore = create<ModalState
>()((...a) =>(
{
    ...createModalsSlice(...a)
}
))

export const useNotificationStore = create<NotificiationState
>()((...a) =>(
{
    ...createNotificationsSlice(...a)
}
))

export const useOrderStore = create<OrderState
>()((...a) =>(
{
    ...createOrdersSlice(...a)
}
))

export const useWalletStore = create<WalletState
>()((...a) =>(
{
    ...createWalletSlice(...a)
}
))

export const useBankStore = create<BankState
>()((...a) =>(
{
    ...createBankSlice(...a)
}
))

export const useTransactionStore = create<TransactionState
>()((...a) =>(
{
    ...createTransactionSlice(...a)
}
))

export const useUserStore = create<UserState
>()((...a) =>(
{
    ...createUserSlice(...a)
}
))


export const useAuthStore = create<AuthState>()((...a) => (
{
    ...persist(createAuthSlice, { name: "auth-storage"})(...a),
}
))

type CityState = {
  city: string;
  setCity: (city: string) => void;
};

export const useCityStore = create<CityState>()(
    persist(
        (set) => ({
        city: 'All Locations',
        setCity: (city) => set({ city }),
        }), 
        { name: "city",
        }
    ))

export const useAdminStore = create<AdminOrdersState>()((...a) => (
{
    ...createAdminOrderSlice(...a),
}
))

