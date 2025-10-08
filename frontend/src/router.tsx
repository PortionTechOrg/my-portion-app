import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterBuyer from "./pages/register-buyer";
import RegisterVendor from "./pages/register-vendor";
import HomePage from "./pages/home";
import MarketPlace from "./pages/dashboard";
import OrdersPage from "./pages/orders";
import DashboardPage from "./pages/vendor/vendor";
import KYCPage from "./pages/vendor/kyc";
import ProtectedRoutes from "./hooks/protected-routes";
import Checkout from "./pages/check-out";
import CompleteCheckOutPayment from "./pages/complete-checkout-payment";
import VendorDashboardLayout from "./components/Layout/vendor-dashboard-layout";
import VendorProductsPage from "./pages/vendor/products";
import DashboardNotificationPage from "./pages/vendor/notification";
import DashboardProfilePage from "./pages/vendor/profile-view";
import DashboardWalletPage from "./pages/vendor/wallet";
import DashboardOrdersPage from "./pages/vendor/orders";
import AdminDashboardLayout from "./components/Layout/admin-dashboard-layout";
import AdminDashboardPage from "./pages/admin";
import AdminOrdersPage from "./pages/admin/orders";
import ProductDetailPage from "./pages/product-details";
import FeaturedProductedPage from "./pages/featured-product-page";
import CartPage from "./pages/cart";

const AppRouter = () => (
  
        <Routes>
          
          <Route path="/" element={<MarketPlace />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/products" element={<FeaturedProductedPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterBuyer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/complete-payment/:order_record_id" element={<CompleteCheckOutPayment />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" >
              <Route path="kyc" element={<KYCPage />} />
              <Route element={<VendorDashboardLayout></VendorDashboardLayout>}>
                <Route path="" element={<DashboardPage />} />
                <Route path="overview" element={<DashboardPage />} />
                <Route path="products" element={<VendorProductsPage />} />
                <Route path="orders" element={<DashboardOrdersPage />} />
                <Route path="wallet" element={<DashboardWalletPage />} />
                <Route path="profile" element={<DashboardProfilePage />} />
                <Route path="notification" element={<DashboardNotificationPage />} />
              </Route>
            </Route>

            <Route path="/admin">
              <Route element={<AdminDashboardLayout></AdminDashboardLayout>}>
                <Route path="" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
);

export default AppRouter;
