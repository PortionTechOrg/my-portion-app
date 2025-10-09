import { useState } from "react"
import { 
  VendorHeader, 
  AddProductModal,
} from "../../components/vendor"
import { useNotificactionState, } from "@/zustand/hooks/notification/notification.hook"
import { formatDate } from "@/lib/utils"
import { useFetchUser } from "@/zustand/hooks/user/user.hook"


export default function DashboardNotificationPage() {

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
 
  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  useFetchUser();
  

  const { data: { notifications } } = useNotificactionState()
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader  />
        <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>
            <div className="space-y-4">
              {notifications.notifications?.map(notification => (
                <div key={notification.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{formatDate(String(notification.createdAt), "DD MMM, YYYY : hh:mmA ")}</p>
                    </div>
                    {!notification.is_read && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
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