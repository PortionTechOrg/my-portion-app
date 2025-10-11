
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Minus, Plus, Scale, Package, Store, CalendarDays, ChevronRight, ArrowLeft } from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartStore, useProductStore } from "@/zustand/store";
import { useCartState } from "@/zustand/hooks/cart/cart.hook";
import { useProductState } from "@/zustand/hooks/product/product.hook";
import type { CartItem } from "@/types/cart";
import { categories } from "@/lib/data";
import { DesktopCartSummary } from "@/components/desktop-cart-summary";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ProductCard } from "@/components/home/product-card";
import { FloatingCartButton } from "@/components/button/floating-cart-button";
import { Navbar } from "@/components/home/navbar";
import { SlideMenu } from "@/components/home/slide-menu";
import { CartSlide } from "@/components/home/cart-slide";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const { getProductsById, clearSelectedProduct } = useProductStore()
    const { data: { addToCart, cartCount, updateCartItemQuantity  } } = useCartState()

    const { toggleCartSidebar, isSideBarOpen } = useCartStore()
    const { data } = useProductState()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const [quantity, setQuantity] = useState<number>(1);


    const product = data.selectedProduct
    
      const handleAddToCart = () => {
        if (!product) return
        const newCartItem = {
          id: product.id,
          name: product.name,
          image: product.image_url,
          price: product.price_per_portion,
          unit: product.quantity_unit,
          quantity,
          vendor_id: product.seller_id,
        } as CartItem

        updateCartItemQuantity(String(product.id), quantity)
        addToCart(newCartItem),
        
        toast.success(`${quantity} x ${product.name} has been added to your cart.`);

      }
    
    
  useEffect(() => {
      getProductsById(String(id));
  
      return () => {
        clearSelectedProduct()
      }
      
    }, [id, getProductsById])

    if (!product) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Loading product details...</span>
          </div>
        )
      }

      const relatedProducts = data.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
  const category = categories.find(c => c.id === product.category);
  const portionsPercentage = ((product.portion_size) - product.available_portions)/( product.portion_size)  * 100;
 

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

          <div className="max-w-7xl mx-auto px-4 lg:px-16 py-8 container">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        {category && (
            <Link to={`/category/${category.id}`} className="hover:text-primary">{category.name}</Link>
        )}
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground truncate">{product.name}</span>
      </div>
      <Button variant="outline" onClick={() => navigate('/')} className="my-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Button>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="aspect-square relative rounded-lg overflow-hidden w-full shadow-lg h-[250px]">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full"
              />
            </div>

            <div className="my-8">
              <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              <Card className="mb-6 bg-background/50">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-bold font-headline text-primary">
                      {formatCurrency(product.price_per_portion)}
                    </span>
                    <span className="text-sm text-muted-foreground">per portion</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>Available Portions</span>
                      <span>{product.portion_size - product.available_portions } / { product.portion_size }</span>
                    </div>
                    <Progress value={portionsPercentage} aria-label={`${portionsPercentage}% of portions available`} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center gap-4 mb-6">
                <p className="font-medium">Quantity:</p>
                <div className="flex items-center gap-2 border rounded-md p-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, Number(q) - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q =>   Number(q) + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg h-12" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
              <DesktopCartSummary />
          </div>
        </div>
      </div>
      
      <div className="mt-16 space-y-6 lg:col-span-2">
        <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Product Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                  <Scale className="h-5 w-5"/>
                  <span><span className="font-semibold text-foreground">{product.portion_size.toFixed(1)} {product.quantity_unit}</span> per portion</span>
              </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5"/>
                  <span>From a bulk size of <span className="font-semibold text-foreground">{product.total_quantity} {product.quantity_unit}</span></span>
              </div>
            </CardContent>
        </Card>
        
        {(
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-xl">Vendor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Store className="h-5 w-5"/>
                    <span>Sold by <span className="font-semibold text-foreground">{ product.user.kyc_business?.business_name }</span></span>
                </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <CalendarDays className="h-5 w-5"/>
                    <span>Listed on <span className="font-semibold text-foreground">{formatDate(String(product.createdAt))}</span></span>
                </div>
              </CardContent>
          </Card>
        )}
      </div>


       <div className="mt-24">
        <h2 className="font-headline text-3xl font-semibold text-center mb-8">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} onAddToCart={()=>handleAddToCart()} product={p} />
          ))}
        </div>
      </div>
      <FloatingCartButton />
    </div>
        
    </div>
    
  );
}
