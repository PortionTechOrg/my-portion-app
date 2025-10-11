import { useEffect, useState } from "react"
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"
import { CartSlide } from "../components/home/cart-slide"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useParams } from "react-router-dom"
import { useOrderState } from "@/zustand/hooks/orders/order.hook"
import { useOrderStore } from "@/zustand/store"
import type { Status } from "@shared/enums"

export default function OrderDetailsPage() {
  const { id } = useParams<{id:string}>() as { id: string }
  const [searchQuery, setSearchQuery] = useState("")
  const { data: { cartCount} } = useCartState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const statusColors: { [key: string]: string } = {
    Delivered: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };

  const { data: { selected_order }} = useOrderState()
  const { getOrderById } = useOrderStore()

  console.log(selected_order)

  useEffect(()=>{

    getOrderById(id)
    
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 lg:px-16 py-8">
        <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-xl font-bold">Order Details</h1>
        <p className="text-muted-foreground text-sm">Order ID: {selected_order?.id}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Order Date</p>
                  <p className="font-medium">{formatDate(String(selected_order?.createdAt))}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Total</p>
                  <p className="font-bold text-base">{formatCurrency(Number(selected_order?.portion) * Number(selected_order?.product.price_per_portion))}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={`${statusColors[selected_order?.status as Status]} border-none`}>{selected_order?.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                  <div key={selected_order?.id} className="flex items-center gap-4">
                     <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={selected_order?.product.image_url} alt={selected_order?.product.name} className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{selected_order?.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {selected_order?.portion}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">{formatCurrency(Number(selected_order?.product.price_per_portion))}</p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
      </main>
    </div>
  )
} 