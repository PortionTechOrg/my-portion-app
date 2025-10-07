import { ShoppingCart } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import type { ProductAttribute } from "@shared/types/product"
import { Link } from "react-router-dom"

import { Progress } from "@/components/ui/progress";


interface ProductCardProps {
  product: ProductAttribute
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {

  const discountPercentage = Math.round(((product.price_per_portion - product.price_per_portion) / product.price_per_portion) * 100)
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price / 100);
  }

  const portionsPercentage = ((product.portion_size) - product.available_portions)/( product.portion_size)  * 100;

  return (

    <div className="overflow-hidden transition-shadow duration-300 hover:shadow-md rounded-lg border">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-44 object-covesr"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white">-{discountPercentage}%</Badge>
          )}
        </div>
      </Link>
      <div className="p-3">
        <h3 className="text-sm font-medium truncate leading-snug">
           <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div>
          <Progress value={portionsPercentage} aria-label={`${portionsPercentage}% of portions available`} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{product.available_portions} portions left</p>
        </div>
        <div className="flex justify-between items-center pt-1">
            <p className="text-base font-bold">
              {formatPrice(product.price_per_portion)}
            </p>
            <Button size="icon" className="h-8 w-8" onClick={onAddToCart}>
                <ShoppingCart className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  )
}
