import type { ProductAttribute } from "@shared/types/product";
import { ProductCard } from "./home/product-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";


export function Scroller({ products, onAddToCart  }: { onAddToCart: (product: ProductAttribute)=>void,  products: ProductAttribute[] }) {
  return (
    <ScrollArea>
      <div className="flex space-x-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="w-52 min-w-52">
            <ProductCard onAddToCart={()=>onAddToCart(product)} product={product} />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}