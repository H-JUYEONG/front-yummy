import { Routes, Route } from "react-router-dom";
import { VenderProvider } from '../context/VenderContext';
import VendorProductList from '../features/products/VendorProductList';
import VendorDashboard from '../features/vendor-dashboard/VendorDashboard';
import VendorPurchasedProducts from '../features/products/VendorPurchasedProducts';
import VenderPurchasedProductsDetail from '../features/products/VendorPurchasedProductsDetail';
import VendorOption from '../features/products/VendorOption';
import VenderProductRegistrationForm from '../features/products/VendorProductRegistrationForm';
import VendorStatistics from '../features/reviews/VendorStatistics';
import VendorCreatePage from '../features/vendor-dashboard/VendorCreatePage';
import VendorSupervisionList from '../features/auctions/VendorSupervisionList';
import VenderAuditionAllList from '../features/auctions/VendorAuditionAllList';
import VendorCakeDesignLikeList from '../features/cakedesign/VendorCakeDesignLikeList';
import VendorCakeDesignList from '../features/cakedesign/VendorCakeDesignList';
import VendorCakeDesignAdd from '../features/cakedesign/VendorCakeDesignAdd';
import VendorCakeDesignEdit from '../features/cakedesign/VendorCakeDesignEdit';
import VendorCakeDesignDetail from '../features/cakedesign/VendorCakeDesignDetail';
import VendorAppealDesignDetails from '../features/auctions/VendorAppealDesignDetails';
import VendorProductPreview from '../features/products/VendorProductPreview';
import VenderReview from '../features/reviews/VendorReview';
import VenderHeader from '../components/vendor/VenderHeader';
import VendorInsertPage from '../features/vendor-dashboard/VendorInsertPage';
import VenderAuditionRequest from '../features/auctions/VendorAuditionRequest';
import VendorAuditionRequestModal from '../features/auctions/VendorAuditionRequestModal';

import VendorSignUpForm from '../features/auth/VendorSignUpForm';
import VendorSignUpSuccess from '../features/auth/VendorSignUpSuccess';
import VendorInsertAudition from '../features/auctions/VendorInsertAudition';
import VendorProductRegistrationFormEdit from '../features/products/VendorProductRegistrationFormEdit';
import UserExeStoreDetail from '../pages/user/UserExeStoreDetail';
import React from "react";

const VendorRoutes = () => {
    return (

        <Routes>




<Route path='/:venderId' element={<VendorDashboard />} />
<Route path='/' element={<VendorDashboard />} />
<Route path='/productlist' element={<VendorProductList />} />
<Route path='/option' element={<VendorOption />} />
<Route path='/registrationform' element={<VenderProductRegistrationForm />} />
<Route path='/productpreview/' element={<VendorProductPreview />} />
<Route path='/purchasedproducts/' element={<VendorPurchasedProducts />} />
<Route path='/purchasedproductsdetail/:orderId' element={<VenderPurchasedProductsDetail />} />
<Route path='/statistics' element={<VendorStatistics />} />
<Route path='/venderCreatePage' element={<VendorCreatePage />} />
<Route path='/supervisionList' element={<VendorSupervisionList />} />
<Route path='/auditionAllList' element={<VenderAuditionAllList />} />
<Route path='/cakeDesign/like/list' element={<VendorCakeDesignLikeList />} />
<Route path='/cakeDesign/list' element={<VendorCakeDesignList />} />
<Route path='/cakeDesign/add' element={<VendorCakeDesignAdd />} />
<Route path='/cakeDesign/edit/:cakeDesignId' element={<VendorCakeDesignEdit />} />
<Route path='/cakeDesign/detail/:cakeDesignId' element={<VendorCakeDesignDetail />} />
<Route path='/venderAppealDesignDetails' element={<VendorAppealDesignDetails />} />
<Route path='/VendorCreatePage' element={<VendorCreatePage />} />
<Route path='/signup' element={<VendorSignUpForm />} />
<Route path='/signup/succ' element={<VendorSignUpSuccess />} />
<Route path="/review" element={<VenderReview />} />
<Route path="/VenderHeader" element={<VenderHeader />} />
<Route path="/VendorInsertPage/:venderId" element={<VenderProvider><VendorInsertPage /></VenderProvider>} />
<Route path='/exeStoreDetail/:venderId' element={<VenderProvider><UserExeStoreDetail /></VenderProvider>} />
<Route path="/venderInsertAudition/:auditionId" element={<VendorInsertAudition />} />
<Route path="/venderauditonrequest/:venderId/:productId/:auditionId" element={<VenderAuditionRequest />} />
<Route path='/venderauditionrequestmodal' element={<VendorAuditionRequestModal />} />
<Route path='/registrationformedit/:productId' element={<VendorProductRegistrationFormEdit />} />

        </Routes>

    );
};

export default VendorRoutes;
