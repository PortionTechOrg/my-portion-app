import { useState } from "react"
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"
import { CartSlide } from "../components/home/cart-slide"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useFetchUserOrder, useOrderState } from "@/zustand/hooks/orders/order.hook"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: { cartCount} } = useCartState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const statusColors: { [key: string]: string } = {
    Delivered: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };

  const { data: { user_orders  }} = useOrderState()

  useFetchUserOrder()

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        <Card className="p-0 rounded-none border-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Portions</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user_orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell><img src={order.product.image_url} width={32} alt={order.product.image_url} /></TableCell>
                    <TableCell>{order.product.name}</TableCell>
                    <TableCell>{order.product.category}</TableCell>
                    <TableCell>{order.portion}</TableCell>
                    <TableCell>{formatCurrency(Number(order.amount))}</TableCell>
                    <TableCell>{formatDate(String(order.createdAt))}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[order.status]} border-none`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 