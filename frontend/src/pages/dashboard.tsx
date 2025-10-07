import { useEffect, useState } from "react"
import { Carrot, Droplets, Drumstick, Tractor, Utensils } from "lucide-react"
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"
import { CartSlide } from "../components/home/cart-slide"
import CitySelectionModal from "../components/home/city-selection-modal"


import type { ProductAttribute } from '@shared/types/product'
import type { CartItem } from "@/types/cart"
import Footer from "@/components/Layout/footer"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"
import { useFetchProduct, useProductState } from "@/zustand/hooks/product/product.hook"
import { CitySelector } from "@/components/city-selector"
import { Link } from "react-router-dom"
import { ProductCard } from "../components/home/product-card"
import { SectionTitle } from "@/components/section/section-title"
import { Scroller } from "@/components/scroller"

export const categories = [
  { id: 'grains', name: 'Grains & Cereal', icon: Utensils },
  { id: 'tubers', name: 'Roots & Tubers', icon: Tractor },
  { id: 'oils', name: 'Oils & Fats', icon: Droplets },
  { id: 'meat', name: 'Meat & Poultry', icon: Drumstick },
  { id: 'fruits', name: 'Fruits & Vegetables', icon: Carrot },
];


export default function MarketPlace() {
  
  useFetchProduct();
  const { data } = useProductState();

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("")
  const { data: { addToCart, cartCount }} = useCartState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = ({ id, name, image_url, price_per_portion, quantity_unit, seller_id}:Partial<ProductAttribute>) => {
    const newCartItems = { id, name, image: image_url, price: price_per_portion, unit: quantity_unit, vendor_id: seller_id  } as  CartItem

    addToCart(newCartItems)
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  }

  useEffect(()=>{
    // Check if user has already selected a city
    const savedCity = localStorage.getItem('selectedCity');
    if (!savedCity) {
      setShowCityModal(true);
    } else {
      setSelectedCity(savedCity);
    }
  }, [])

  const featuredProducts = data.products.slice(0, 6);
  const topDeals = data.products.slice(Math.max(0, featuredProducts.length - 5));

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
        {/* City Indicator */}
        <div className="container mx-auto py-2">
            <CitySelector cities={["lagos", "Ibadan", "Abuja"]} />
        </div>

        <div className="container mx-auto py-2 space-y-12">
          <section id="featured-products">
            <SectionTitle title="Featured" href="/products" />
            <Scroller onAddToCart={handleAddToCart} products={featuredProducts} />
          </section>

          <section id="top-deals">
            <SectionTitle title="Top Deals" href="/products" />
            <Scroller onAddToCart={handleAddToCart} products={topDeals} />
          </section>

          <section id="categories" className="py-12">
            <h2 className="font-headline text-2xl font-semibold text-center mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Link to={`/category/${category.id}`} key={category.id} className="group flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:bg-secondary transition-colors">
                    <category.icon className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </section>

          <section id="all-products" className="py-12">
            <h2 className="font-headline text-3xl font-semibold text-center mb-8">All Products in {selectedCity}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.products.length > 0 ? (
                data.products.map((product) => (
                  <ProductCard onAddToCart={()=>handleAddToCart(product)} key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground">No products found in {selectedCity}.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <CitySelectionModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        onCitySelect={handleCitySelect}
      />
    </div>
  )
}