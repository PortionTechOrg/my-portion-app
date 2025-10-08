import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore,  } from "@/zustand/store";
import { Link, useNavigate } from "react-router-dom";
import { useCartState } from "@/zustand/hooks/cart/cart.hook";
import { formatCurrency } from "@/lib/utils";
import { Navbar } from "@/components/home/navbar";
import { SlideMenu } from "@/components/home/slide-menu";
import { CartSlide } from "@/components/home/cart-slide";

export default function CartPage() {
    
  const { data: { cartItems, cartCount, removeFromCart,  updateCartItemQuantity, clearCart } } = useCartState();
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("")
const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)


  const navigate = useNavigate()


  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const serviceCharge = 100;
  const deliveryFee = 1000;
  const shippingCost = cartItems.reduce((sum, _) => sum + deliveryFee, 0);
  const total = subtotal + serviceCharge + shippingCost;

  const handleClearCart = () => {
    clearCart();
    toast.success("All items have been removed from your cart.");
  }

  const handleCheckoutClick = () => {
    if(user) {
      navigate('/checkout');
    } else {
      toast.error("You must be logged in to checkout.");
      navigate('/login');
    }
  }

  if (!isClient) {
    return null;
  }

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

        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-8 container">
        <div className="text-center mb-12">
            <h1 className="font-headline text-2xl md:text-5xl font-bold">Your Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
        </div>
        
        {cartItems.length === 0 ? (
            <Card className="text-center py-20">
            <CardContent className="flex flex-col items-center gap-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-4">
                <Link to="/">Start Shopping</Link>
                </Button>
            </CardContent>
            </Card>
        ) : (
            <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={handleClearCart}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                </Button>
                </div>
                <div className="space-y-4">
                {cartItems.map((product) => (
                    <Card key={product.id} className="grid grid-cols-3 gap-4 items-center p-2">
                    <div className="  rounded-md overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full" />
                    </div>
                    <div className="flex-grow col-span-2">
                        <h3 className="font-semibold font-headline">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.name}</p>
                        <p className="text-lg font-bold text-primary mt-1">{formatCurrency(Number(product.price))}</p>

                        <div className="flex items-center gap-2 w-fit border rounded-md">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartItemQuantity(String(product.id), Number(product.quantity) - 1)}>
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center font-bold">{product.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateCartItemQuantity(String(product.id), Number(product.quantity) + 1)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(String(product.id))}>
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    </Card>
                ))}
                </div>
            </div>

            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-semibold">{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="flex justify-between">
                    <p className="text-muted-foreground">Service Charge</p>
                    <p className="font-semibold">{formatCurrency(serviceCharge)}</p>
                    </div>
                    <div className="flex justify-between">
                    <p className="text-muted-foreground">Delivery Fee</p>
                    <p className="font-semibold">{formatCurrency(shippingCost)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                    <p>Total</p>
                    <p>{formatCurrency(total)}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCheckoutClick} size="lg" className="w-full">
                        Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardFooter>
                </Card>
            </div>
            </div>
        )}
        </div>
    </div>
  );
}

    