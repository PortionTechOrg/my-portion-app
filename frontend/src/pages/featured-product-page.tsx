
import { CitySelector } from '@/components/city-selector';
import { CartSlide } from '@/components/home/cart-slide';
import { Navbar } from '@/components/home/navbar';
import { ProductCard } from '@/components/home/product-card';
import { SlideMenu } from '@/components/home/slide-menu';
import type { CartItem } from '@/types/cart';
import { useCartState } from '@/zustand/hooks/cart/cart.hook';
import { useProductState } from '@/zustand/hooks/product/product.hook';
import { useCartStore, useCityStore } from '@/zustand/store';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FeaturedProductedPage() {
  const { city } = useCityStore();
  const { data: { products, selectedProduct }} = useProductState()
  const { data: { addToCart, cartCount }} = useCartState()

  const [isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);

  const { toggleCartSidebar, isSideBarOpen } = useCartStore()
  
  const cities = ["All Locations", ...Array.from(new Set(products.map(p => p.location)))];

  const product = selectedProduct
    
      const handleAddToCart = () => {
        if (!product) return
        const newCartItem = {
          id: product.id,
          name: product.name,
          image: product.image_url,
          price: product.price_per_portion,
          unit: product.quantity_unit,
          vendor_id: product.seller_id,
        } as CartItem
        addToCart(newCartItem),
        
        toast.success(`${product.name} has been added to your cart.`);

      }

  return (

    <div className="min-h-screen bg-gray-50">
              <Navbar
                searchQuery=""
                setSearchQuery={()=>{}}
                cartItems={cartCount}
                onMenuClick={() => setIsMenuOpen(true)}
                onCartClick={() => toggleCartSidebar()}
              />
        
              <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
              <CartSlide isOpen={isSideBarOpen} onClose={() => toggleCartSidebar()} />


    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Browse all available products in {city}.</p>
        </div>
        <div className="w-full sm:w-auto">
          <CitySelector cities={["lagos", "All locations", "Ibadan", "Abuja"]} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard onAddToCart={handleAddToCart} key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No products found in {city}.</p>
        )}
      </div>
    </div>
    </div>
  );
}
