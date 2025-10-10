import { useEffect, useState } from "react"
import { Bell, Package, ShoppingCart, DollarSign, TrendingUp, Users, Plus, Eye, Edit3, Share2, MoreHorizontal } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Modal from "../components/ui/modal"
import KycApi from "@/api/vendor/kyc";
import type { kycAttribute } from "@shared/types/kyc";

// Types and Interfaces
type TabId = 'dashboard' | 'products' | 'orders' | 'wallet' | 'profile' | 'notifications';
type ProductStatus = 'active' | 'pending_approval' | 'inactive';
type OrderStatus = 'pending' | 'processing' | 'delivered';

interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  totalQuantity: number;
  totalPortions: number;
  availablePortions: number;
  bookedPortions: number;
  image: string;
  status: ProductStatus;
  created: string;
  category: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
}

interface Order {
  id: string;
  productName: string;
  customerName: string;
  portions: number;
  price: number;
  phone: string;
  deliveryAddress: string;
  deliveryType: 'Pickup' | 'Delivery';
  status: OrderStatus;
  orderDate: string;
  timeAgo: string;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
  trend?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onShare: (product: Product) => void;
  onView: (product: Product) => void;
}

interface OrderCardProps {
  order: Order;
  onMarkDelivered: (orderId: string) => void;
}

const dashboardStats = {
  totalProducts: 8,
  activeProducts: 6,
  pendingOrders: 4,
  completedOrders: 23,
  walletBalance: 125000,
  monthlyRevenue: 450000,
  totalCustomers: 45
}

const vendorProducts: Product[] = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    price: 45000,
    unit: "50kg bag",
    totalQuantity: 100,
    totalPortions: 20,
    availablePortions: 13,
    bookedPortions: 7,
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    created: "2024-01-15",
    category: "Grains",
    pickupAvailable: true,
    deliveryAvailable: true
  },
  {
    id: 2,
    name: "Brown Beans (Oloyin)",
    price: 38000,
    unit: "50kg bag",
    totalQuantity: 50,
    totalPortions: 10,
    availablePortions: 2,
    bookedPortions: 8,
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    created: "2024-01-10",
    category: "Legumes",
    pickupAvailable: true,
    deliveryAvailable: false
  },
  {
    id: 3,
    name: "Fresh Yam Tubers",
    price: 25000,
    unit: "100kg",
    totalQuantity: 200,
    totalPortions: 8,
    availablePortions: 8,
    bookedPortions: 0,
    image: "/placeholder.svg?height=200&width=300",
    status: "pending_approval",
    created: "2024-01-20",
    category: "Tubers",
    pickupAvailable: true,
    deliveryAvailable: true
  }
]

const recentOrders: Order[] = [
  {
    id: "ORD001",
    productName: "Premium Basmati Rice",
    customerName: "John Doe",
    portions: 2,
    price: 9000,
    phone: "08012345678",
    deliveryAddress: "Lagos Island, Lagos",
    deliveryType: "Delivery",
    status: "pending",
    orderDate: "2024-01-21",
    timeAgo: "2 hours ago"
  },
  {
    id: "ORD002",
    productName: "Brown Beans (Oloyin)",
    customerName: "Jane Smith",
    portions: 1,
    price: 3800,
    phone: "08087654321",
    deliveryAddress: "Pickup Location",
    deliveryType: "Pickup",
    status: "delivered",
    orderDate: "2024-01-20",
    timeAgo: "1 day ago"
  },
  {
    id: "ORD003",
    productName: "Premium Basmati Rice",
    customerName: "Mike Johnson",
    portions: 3,
    price: 13500,
    phone: "08098765432",
    deliveryAddress: "Victoria Island, Lagos",
    deliveryType: "Delivery",
    status: "processing",
    orderDate: "2024-01-21",
    timeAgo: "4 hours ago"
  }
]

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "John Doe placed an order for Premium Basmati Rice",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "₦3,800 credited to your wallet",
    time: "1 day ago",
    read: false
  },
  {
    id: 3,
    type: "product",
    title: "Product Approved",
    message: "Brown Beans (Oloyin) has been approved and is now live",
    time: "2 days ago",
    read: true
  }
]

// Enhanced components
interface VendorNavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  notificationCount: number;
}

const VendorNavbar = ({ activeTab, setActiveTab, notificationCount }: VendorNavbarProps) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'wallet', label: 'Wallet', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-green-600">Portions</h1>
            <span className="text-sm text-gray-500">Vendor Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.id === 'notifications' && notificationCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

const StatsCard = ({ title, value, subtitle, icon: Icon, color = "bg-blue-500", trend }: StatsCardProps) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`${color} rounded-full p-3`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
)

const ProductCard = ({ product, onEdit, onShare, onView }: ProductCardProps) => {
  const getStatusColor = (status: ProductStatus): string => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: ProductStatus): string => {
    switch(status) {
      case 'active': return 'Active'
      case 'pending_approval': return 'Pending Approval'
      case 'inactive': return 'Inactive'
      default: return 'Unknown'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-green-600 font-bold text-xl mb-2">₦{product.price.toLocaleString()}</p>
        <p className="text-gray-600 text-sm mb-2">{product.unit} • {product.category}</p>
        
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Available: {product.availablePortions}/{product.totalPortions}</span>
          <span>Bookeds: {product.bookedPortions}</span>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          {product.pickupAvailable && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Pickup</span>
          )}
          {product.deliveryAvailable && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Delivery</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onView(product)}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <Eye size={16} className="mr-1" />
            View
          </button>
          <button 
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 flex items-center justify-center"
          >
            <Edit3 size={16} className="mr-1" />
            Edit
          </button>
          <button 
            onClick={() => onShare(product)}
            className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 flex items-center justify-center"
          >
            <Share2 size={16} className="mr-1" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

const OrderCard = ({ order, onMarkDelivered }: OrderCardProps) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  const getStatusColor = (status: OrderStatus): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{order.productName}</h3>
          <p className="text-gray-600 text-sm">Order #{order.id}</p>
          <p className="text-gray-500 text-sm">{order.timeAgo}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Customer:</span>
          <span className="font-medium">{order.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Portions:</span>
          <span className="font-medium">{order.portions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-bold text-green-600">₦{order.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery:</span>
          <span className="font-medium">{order.deliveryType}</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={() => setShowCustomerModal(true)}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        title="Customer Details"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">{order.customerName}</h4>
            <p className="text-sm text-gray-500">{order.timeAgo}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Address:</span>
              <span className="font-medium text-right">{order.deliveryAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Type:</span>
              <span className="font-medium">{order.deliveryType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Portions:</span>
              <span className="font-medium">{order.portions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-green-600">₦{order.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          
          {order.status === 'pending' && (
            <button 
              onClick={() => {
                onMarkDelivered(order.id)
                setShowCustomerModal(false)
              }}
              className="w-full bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default function EnhancedVendorDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const unreadNotifications = notifications.filter(n => !n.read).length

  // Event handlers with proper type annotations
  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product)
  }

  const handleShareProduct = (product: Product) => {
    console.log('Share product:', product)
  }

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product)
  }

  const handleMarkDelivered = (orderId: string) => {
    console.log('Mark delivered:', orderId)
  }



  const handleAddProduct = () => {
    console.log('Add new product')
  }

  const renderDashboardContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                title="Total Products" 
                value={dashboardStats.totalProducts} 
                icon={Package}
                color="bg-blue-500"
              />
              <StatsCard 
                title="Active Products" 
                value={dashboardStats.activeProducts} 
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatsCard 
                title="Pending Orders" 
                value={dashboardStats.pendingOrders} 
                icon={ShoppingCart}
                color="bg-yellow-500"
              />
              <StatsCard 
                title="Wallet Balance" 
                value={`₦${dashboardStats.walletBalance.toLocaleString()}`} 
                icon={DollarSign}
                color="bg-purple-500"
                subtitle="Available for withdrawal"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map(order => (
                    <div key={order.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{order.productName}</p>
                          <p className="text-sm text-gray-600">{order.customerName} • {order.timeAgo}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₦{order.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{order.portions} portions</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Products</h2>
              <button 
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onEdit={handleEditProduct}
                  onShare={handleShareProduct}
                  onView={handleViewProduct}
                />
              ))}
            </div>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Orders</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">All ({recentOrders.length})</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Pending ({recentOrders.filter(o => o.status === 'pending').length})</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Delivered ({recentOrders.filter(o => o.status === 'delivered').length})</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onMarkDelivered={handleMarkDelivered}
                />
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Coming soon...</p>
          </div>
        )
    }
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
      <VendorNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notificationCount={unreadNotifications}
      />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        {/* Vendor Info Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">{vendorKycDetails?.kyc_personal?.firstname.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{vendorKycDetails?.kyc_personal?.firstname}</h1>
                <p className="text-gray-600">{vendorKycDetails?.kyc_personal?.email} • {vendorKycDetails?.kyc_personal?.city}</p>
                <p className="text-sm text-gray-500">Joined {String(vendorKycDetails?.kyc_personal?.createdAt)}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                vendorKycDetails ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {vendorKycDetails ? '✓ Verified' : 'Pending Verification'}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {renderDashboardContent()}
      </main>
    </div>
  )
}