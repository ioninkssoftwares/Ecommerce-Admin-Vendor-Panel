import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import OrderManagement from "./Page/OrderManagementSection/OrderManagement";
import ProductManagement from "./Page/Product Management/ProductManagement";
import PaymentsManagementnewproduct from "./Page/Product Management/AddProduct";
import InventoryManagement from "./Page/InventoryMangement/InventoryManagement";
import AgentManagement from "./Page/AgentManagementSection/AgentManagement";
import UserManagement from "./Page/UserManagement/UserManagement";
import Login from "./Page/Login/loginadmin";
import LoginVenDor from "./VendorPanel/Pages/login/LoginVendor";
import BannerComponent from "./Page/InventoryMangement/addbaneer";
import Coupons from "./Page/Coupon Management/couponcode";
import EditProduct from "./Page/Product Management/editproduct";
import BrandsManagement from "./Page/InventoryMangement/brandmanagement";
import CategoryComponent from "./Page/InventoryMangement/CategoryMangement";
import StaffManagement from "./Page/StaffManagement/Staffmanagement";
import { ToastContainer } from "react-toastify";
import SubscriptionManagement from "./Page/Subscrption/subscription";
import { useCookies } from "react-cookie";


// Vendor Imports
import VendorManagement from "./Page/Vendormanagement/vendor";
import DashboardVendor from "./VendorPanel/Pages/dashboard/DashboardVendor";
import ProductManagementVendor from "./VendorPanel/Pages/productManagement/ProductManagementVendor";
import AddProductByAdmin from "./VendorPanel/Pages/productManagement/AddProductByAdmin";
import VendorProfile from "./VendorPanel/Pages/profile/VendorProfile";


// Function to check if the token exists in cookies
const getTokenFromCookies = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return token ? token.split("=")[1] : null;
};

// Higher-order component to check if the token exists in cookies
const ProtectedRoute = ({ element }) => {
  const token = getTokenFromCookies();

  // If token exists, render the provided element, else redirect to login
  return token ? element : <Navigate to="/loginadmin" />;
};


const VendorProtectedRoute = ({ Component, ...rest }) => {
  const [cookies] = useCookies(['vendorToken']);
  const vendorToken = cookies.vendorToken;

  const isAuthenticated = vendorToken && vendorToken !== "";

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/vendor/login" replace />
  );
};



export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/ordermanagement"
            element={<ProtectedRoute element={<OrderManagement />} />}
          />
          <Route
            path="/productmanagement"
            element={<ProtectedRoute element={<ProductManagement />} />}
          />
          <Route
            path="/usermanagement"
            element={<ProtectedRoute element={<UserManagement />} />}
          />
          <Route
            path="/agentmanagement"
            element={<ProtectedRoute element={<AgentManagement />} />}
          />
          <Route
            path="/brandmanagement"
            element={<ProtectedRoute element={<BrandsManagement />} />}
          />
          <Route
            path="/couponcodes"
            element={<ProtectedRoute element={<Coupons />} />}
          />
          <Route
            path="/editproduct/:id"
            element={<ProtectedRoute element={<EditProduct />} />}
          />
          <Route
            path="/categorymanagement"
            element={<ProtectedRoute element={<CategoryComponent />} />}
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute element={<PaymentsManagementnewproduct />} />
            }
          />
          <Route
            path="/addbanner"
            element={<ProtectedRoute element={<BannerComponent />} />}
          />
          <Route path="/loginadmin" element={<Login />} />
          <Route
            path="/inventorymanagement"
            element={<ProtectedRoute element={<InventoryManagement />} />}
          />
          <Route
            path="/staffmanagement"
            element={<ProtectedRoute element={<StaffManagement />} />}
          />
          <Route
            path="/subscription"
            element={<ProtectedRoute element={<SubscriptionManagement />} />}
          />
          <Route
            path="/vendormanagement"
            element={<ProtectedRoute element={<VendorManagement />} />}
          />

          {/************************  Vendor Panel Routes ******************************/}

          <Route
            path="/vendor/login"
            element={<LoginVenDor />}
          />

          <Route
            path="/vendor/dashboard"
            element={<VendorProtectedRoute Component={DashboardVendor} />}
          />

          <Route
            path="/vendor/profile"
            element={<VendorProtectedRoute Component={VendorProfile} />}
          />

          <Route
            path="/vendor/productManagement"
            element={<VendorProtectedRoute Component={ProductManagementVendor} />}
          />

          <Route
            path="/vendor/addProduct"
            element={<VendorProtectedRoute Component={AddProductByAdmin} />}
          />

        </Routes>

      </BrowserRouter>
    </>
  );
}
