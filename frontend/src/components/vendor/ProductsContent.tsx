import { Package, Plus } from "lucide-react"
import { useState } from "react"
import { VendorProductCard } from "../shared/ProductCard"
import ProductDetailsModal from "./ProductDetailsModal"
import type { ProductAttribute } from "@shared/types/product"
import { useFetchUserProduct, useProductState } from "@/zustand/hooks/product/product.hook"
import { useFetchUser, useUserState } from "@/zustand/hooks/user/user.hook"

interface ProductsContentProps {
  onAddProduct: () => void
  onEditProduct: (product: ProductAttribute) => void
  onShareProduct: (product: ProductAttribute) => void
}

const ProductsContent = ({
  onAddProduct, 
  onEditProduct, 
  onShareProduct 
}: ProductsContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductAttribute | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleViewProduct = (product: ProductAttribute) => {
    setSelectedProduct(product)
    setShowDetailsModal(true)
  }

  const { data: { user} } = useUserState();

  const { data: { user_products } } = useProductState()
  useFetchUserProduct()
  useFetchUser();
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">My Products</h2>
        <button 
          disabled={Boolean(!user?.kyc_verified)}
          onClick={onAddProduct}
          className={`${Boolean(!user?.kyc_verified) ? "bg-slate-300 text-slate-500 hover:bg-slate-400" : "bg-green-500 text-white hover:bg-green-600"} px-4 sm:px-6 py-2 sm:py-3 rounded-lg  flex items-center font-medium w-full sm:w-auto justify-center"`}
        >
          <Plus size={20} className="mr-2" />
          Add New Product
        </button>
      </div>
      {user_products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {user_products.map(product => (
            <VendorProductCard 
              key={product.id} 
              product={product}
              onEdit={onEditProduct}
              onShare={onShareProduct}
              onView={handleViewProduct}
            />
          ))}
        </div>
      ): (
        <div className="text-center py-8 sm:py-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Welcome to Portions!
          </h3>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
            Your storefront is ready. Let's add your first product to start selling.
          </p>
          <button 
            onClick={onAddProduct}
            className={`${Boolean(!user?.kyc_verified) ? "bg-slate-300 text-slate-500 hover:bg-slate-400" : "bg-green-500 text-white hover:bg-green-600"} px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center mx-auto text-base sm:text-lg font-semibold w-full sm:w-auto justify-center`}
          >
            <Plus size={20} className="mr-2" />
            ADD MY FIRST PRODUCT
          </button>
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={selectedProduct}
        onEdit={onEditProduct}
        onShare={onShareProduct}
      />
    </div>
  )
}

export default ProductsContent 