import { X, Package, Heart, Bell, LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/zustand/store"
import { useFetchUser, useUserState } from "@/zustand/hooks/user/user.hook"

interface SlideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SlideMenu({ isOpen, onClose }: SlideMenuProps) {
  const { logoutAuth, isLoggedIn } = useAuthStore();
  const { data: { user } } = useUserState()

  if(isLoggedIn){
    useFetchUser()
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAuth();
    toast.success('Logging out ')
    navigate('/login')
  };

  const handleLogin = () => {
    navigate('/login')
  };

  const handleSignup = () => {
    navigate('/register')
  };

  const menuItems = [
    { icon: Package, label: "Orders", href: "/orders" },
    // { icon: Heart, label: "Wishlist", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-green-500/30 bg-opacity-20 z-50 transition-opacity" onClick={onClose} />}

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile */}
          {isLoggedIn ? (
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg sm:text-xl">{user?.firstname.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{user?.firstname} {user?.lastname}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  {/* <Edit className="w-4 h-4" /> */}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 border-b border-gray-100">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 mb-2">Welcome to Portion</h3>
                <p className="text-sm text-gray-500 mb-4">Sign in to access your account</p>
                <div className="space-y-2">
                  <Button onClick={handleLogin} className="w-full">
                    Sign In
                  </Button>
                  <Button onClick={handleSignup} variant="outline" className="w-full">
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div className="flex-1 py-4">
            {isLoggedIn ? (
              menuItems.map((item) => (
                <Link key={item.label} to={item.href}>
                <button
                  key={item.label}
                  className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">{item.label}</span>
                </button>
                </Link>
              ))
            ) : (
              <div className="px-6 py-4">
                <p className="text-sm text-gray-500 mb-4">Sign in to access:</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>Order History</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span>Wishlist</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          {isLoggedIn && (
            <div className="p-6 border-t border-gray-100">
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
