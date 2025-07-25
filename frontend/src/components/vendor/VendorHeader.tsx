import type { UserAttributes } from "@shared/types/user";

interface VendorHeaderProps {
  vendorData: UserAttributes | null
}

const VendorHeader = ({ vendorData }: VendorHeaderProps) => {
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg sm:text-xl">{vendorData?.firstname.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{vendorData?.firstname}</h1>
            <p className="text-gray-600 text-sm sm:text-base">{vendorData?.email} • {vendorData?.role}</p>
            <p className="text-sm text-gray-500">Joined {String(vendorData?.createdAt)}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            vendorData?.kyc_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {vendorData?.kyc_verified ? '✓ Verified' : 'Pending Verification'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorHeader 