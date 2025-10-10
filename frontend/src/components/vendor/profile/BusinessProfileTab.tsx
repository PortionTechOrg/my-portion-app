import { CreditCard, Shield } from "lucide-react"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import type { kycAttribute } from "@shared/types/kyc"

interface BusinessProfileTabProps {
  profileData: kycAttribute | null,
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
}

const BusinessProfileTab = ({ profileData, bankDetails }: BusinessProfileTabProps) => {
  return (
    <div className="space-y-8">
      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
          Business Name
        </Label>
        <Input
          id="businessName"
          value={profileData?.kyc_business?.business_name}
          disabled
          className="bg-gray-50"
        />
      </div>

      {/* Public Contact Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Contact Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            This information is visible to customers on your storefront.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={profileData?.kyc_business?.business_email}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profileData?.kyc_business?.business_phone_number}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Default Pickup Location */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Default Pickup Location / Business Address
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your primary business address. This is suggested as the pickup location when you add new products.
        </p>
        <Input
          id="address"
          value={profileData?.kyc_business?.business_address}
          disabled
          className="bg-gray-50"
        />
      </div>

      {/* Business Description */}
      {/* <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
          Business Description (About Us)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          A short description of your business for your public storefront.
        </p>
        <Textarea
          id="description"
          value={profileData.personal}
          disabled
          className="bg-gray-50"
          rows={3}
        />
      </div> */}

      {/* Bank Account Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Account Details</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your bank account information for receiving earnings from sales.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Your financial information is secure</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your financial information is private and will never be shared. This is only used to send you your earnings.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
              Bank Name
            </Label>
            <Input
              id="bankName"
              value={bankDetails?.bankName}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              type="text"
              value={bankDetails?.accountNumber}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
            Account Name
          </Label>
          <Input
            id="accountName"
            type="text"
            value={bankDetails?.accountName}
            disabled
            className="bg-gray-50"
          />
          {bankDetails?.accountName && (
            <p className="text-sm text-green-600 flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Account verified
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessProfileTab 