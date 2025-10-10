import { useFetchUser } from "@/zustand/hooks/user/user.hook"
import { OrderCard } from "./index"
import { useFetchOrders, useOrderState } from "@/zustand/hooks/orders/order.hook"

interface OrdersContentProps {
  onMarkDelivered: (productId: number) => void
}

const OrdersContent = ({ onMarkDelivered }: OrdersContentProps) => {
  const { data: { product_orders } } = useOrderState()

  useFetchOrders()
  useFetchUser();
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Orders</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm">
            All ({product_orders.all_products_count})
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm">
            Pending ({product_orders.pending_products_count})
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm">
            Delivered ({product_orders.delivered_products_count})
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {product_orders.product_orders.map(order => (
          <OrderCard 
            key={order.id} 
            order={order}
            onMarkDelivered={onMarkDelivered}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersContent 