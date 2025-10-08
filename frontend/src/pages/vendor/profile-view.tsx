import { useState, useEffect } from "react"
import { 
  VendorHeader, 
  BusinessProfileTab,
  AddProductModal
} from "../../components/vendor"
import KycApi from "@/api/vendor/kyc";
import type { UserAttributes } from "@shared/types/user";
import type { kycAttribute } from "@shared/types/kyc";


export default function DashboardProfilePage() {

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData] = useState<UserAttributes | null>(null)

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }
  

  const [ vendorKycDetails, setVendorKycDetails ] = useState<kycAttribute | null>(null);

  const { getKycDetails } = KycApi()

  useEffect(()=>{

    async function handleGetVendorKycDetails() {
      const response = await getKycDetails()
      setVendorKycDetails(response.data)
    }

    handleGetVendorKycDetails()

  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader />
        <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Profile Settings</h2>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Profile</h3>
                  <p className="text-gray-600 mt-1">View your business information and bank details</p>
                </div>
              </div>
              <div className="p-6">
                <BusinessProfileTab
                  profileData={vendorKycDetails}
                  // @ts-expect-error
                  bankDetails={profileData?.bankDetails}
                />
              </div>
            </div>
          </div>
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}