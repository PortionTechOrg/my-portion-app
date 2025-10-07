import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useCartStore } from '@/zustand/store';
import { Link } from 'react-router-dom';

export function DesktopCartSummary() {
  const { cartItems } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item?.price) * Number(item?.quantity),
    0
  );
  const shipping = 500; // Example shipping cost
  const total = subtotal + shipping;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price / 100);
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
        </CardTitle>
      </CardHeader>
      {cartItems?.length === 0 ? (
        <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>Your cart is empty.</p>
            </div>
        </CardContent>
      ) : (
        <>
            <ScrollArea className="h-[300px]">
                <CardContent className="space-y-4">
                {cartItems.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <img src={product.image} alt={product.name} className="object-cover" />
                        </div>
                        <div className='flex-grow'>
                            <p className="font-semibold text-sm leading-tight">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.quantity} x {formatPrice(Number(product.price))}</p>
                        </div>
                        <p className="font-bold text-sm">{formatPrice(Number(product.price) * Number(product.quantity))}</p>
                    </div>
                ))}
                </CardContent>
            </ScrollArea>
            <CardFooter className="flex-col items-stretch space-y-4 pt-6">
                <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-semibold">{formatPrice(subtotal)}</p>
                </div>
                <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-semibold">{formatPrice(shipping)}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>{formatPrice(total)}</p>
                </div>
                 <Button asChild size="lg" className="w-full">
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </CardFooter>
        </>
      )}
    </Card>
  );
}

    