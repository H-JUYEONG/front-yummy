import { Routes, Route } from "react-router-dom";
import React from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminMemberManagement from "../pages/admin/AdminMemberManagement";
import AdminStatus from "../pages/admin/AdminStatus";
import AdminContent from "../pages/admin/AdminContent";
import AdminShopProduct from "../pages/admin/AdminShopProduct";
import AdminShopProductDetail from "../pages/admin/AdminShopProductDetail";
import AdminShopOrder from "../pages/admin/AdminShopOrder";
import AdminVendorOrder from "../pages/admin/AdminVendorOrder";
import AdminShopManage from "../pages/admin/AdminShopManage";
import AdminShopAdd from "../pages/admin/AdminShopAdd";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminDashboard />} />
            <Route path='/member' element={<AdminMemberManagement />} />
            <Route path='/status' element={<AdminStatus />} />
            <Route path='/content' element={<AdminContent />} />
            <Route path='/shopproducts' element={<AdminShopProduct />} />
            <Route path='/shopproductsdetail' element={<AdminShopProductDetail />} />
            <Route path='/shoporders' element={<AdminShopOrder />} />
            <Route path='/venderorder' element={<AdminVendorOrder />} />
            <Route path='/shopmanage' element={<AdminShopManage />} />
            <Route path='/shopadd' element={<AdminShopAdd />} />
        </Routes>
    );
};

export default AdminRoutes;
