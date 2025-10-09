import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { 
  BusinessProfileTab,
  VerificationTab,
  SettingsTab
} from "../../components/vendor"
import { Button } from "../../components/ui/button"
import type { kycAttribute } from "@shared/types/kyc"
import { useFetchUser } from "@/zustand/hooks/user/user.hook"



type ProfileTab = 'business' | 'verification' | 'settings'

export default function VendorProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('business')
  const [profileData] = useState<kycAttribute|null>(null)
  const navigate = useNavigate()

  const handleUploadDocument = (documentType: string, file: File) => {
    console.log('Uploading document:', documentType, file)
  }

  const handleChangePassword = (passwords: any) => {
    console.log('Changing password:', passwords)
  }

  const handleUpdateNotifications = (preferences: any) => {
    console.log('Updating notifications:', preferences)
  }

  const handleLogout = () => {
    console.log('Logging out')
  }

  const handleBackToDashboard = () => {
    navigate('/vendor')
  }

  useFetchUser();
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'business':
        return (
          <BusinessProfileTab
            profileData={profileData}
            // @ts-expect-error
            bankDetails={profileData.bankDetails}
          />
        )
      case 'verification':
        return (
          <VerificationTab
          // @ts-expect-error
          kycStatus={profileData.kycStatus}
          // @ts-expect-error
            kycInfo={profileData.kycInfo}
            onUploadDocument={handleUploadDocument}
          />
        )
      case 'settings':
        return (
          <SettingsTab
          // @ts-expect-error
            notificationPreferences={profileData.notificationPreferences}
            onChangePassword={handleChangePassword}
            onUpdateNotifications={handleUpdateNotifications}
            onLogout={handleLogout}
          />
        )
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Coming soon...</p>
          </div>
        )
    }
  }

  const profileTabs = [
    { id: 'business', label: 'Profile' },
    { id: 'verification', label: 'Verification' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header without navbar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
            <Button
              onClick={handleBackToDashboard}
              variant="outline"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {profileTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProfileTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  )
} 