
import { useIsMobile } from '@/hooks/use-mobile';
import { useCartStore } from '@/zustand/store';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { formatCurrency } from '@/lib/utils';

export function FloatingCartButton() {
  const { cartItems, toggleCartSidebar } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalUniqueItems = cartItems.length;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  if (!isClient || totalUniqueItems === 0 || !isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-50 lg:hidden">
      <Button
        className="w-full h-11 text-sm shadow-lg rounded-full"
        onClick={()=>toggleCartSidebar()}
      >
        <div className="flex items-center justify-between w-full">
            <div className='flex items-center gap-2'>
                <ShoppingCart className="h-4 w-4" />
                <span>{totalUniqueItems} Item{totalUniqueItems > 1 ? 's' : ''}</span>
            </div>
            <span>View Cart ({formatCurrency(subtotal)})</span>
        </div>
      </Button>
    </div>
  );
}

    