import { useState, useEffect } from "react"
import { 
  VendorHeader, 
  DashboardContent, 
  AddProductModal,
  type TabId,  
  dashboardStats,
} from "../../components/vendor"
import type { ProductAttribute } from "@shared/types/product";
import type { UserAttributes } from "@shared/types/user";


export default function DashboardPage() {


  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData] = useState<UserAttributes | null>(null)
  const [redirectToBankSection, setRedirectToBankSection] = useState(false)

  // Reset redirect flag when wallet tab is accessed normally
  useEffect(() => {
    if (activeTab === 'wallet' && !redirectToBankSection) {
      setRedirectToBankSection(false)
    }
  }, [activeTab, redirectToBankSection])

  // Event handlers
  const handleEditProduct = (product: ProductAttribute) => {
    console.log('Edit product:', product)
  }

  const handleShareProduct = (product: ProductAttribute) => {
    console.log('Share product:', product)
  }


  const handleAddProduct = () => {
    setIsAddProductModalOpen(true)
  }

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const handleWithdrawFunds = (amount: number) => {
    console.log('Withdraw funds:', amount)
  }

  const handleRedirectToBank = () => {
    setActiveTab('wallet')
    // The WalletContent component will handle showing the bank account section
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader />
        <DashboardContent
          dashboardStats={dashboardStats}
          // @ts-expect-error
          bankDetails={profileData?.bankDetails}
          kycStatus={Boolean(profileData?.kyc_verified)}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onShareProduct={handleShareProduct}
          onWithdrawFunds={handleWithdrawFunds}
          onRedirectToBank={handleRedirectToBank}
        />
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}