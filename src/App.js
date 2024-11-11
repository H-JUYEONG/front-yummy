import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';

import VenderProductList from './pages/vender/VenderProductList';
import VenderDashboard from './pages/vender/VenderDashboard';
import VenderPurchasedProducts from './pages/vender/VenderPurchasedProducts';
import VenderPurchasedProductsDetail from './pages/vender/VenderPurchasedProductsDetail';
import VenderOption from './pages/vender/VenderOption';
import VenderProductRegistrationForm from './pages/vender/VenderProductRegistrationForm';
import VenderStatistics from './pages/vender/VenderStatistics';
import VenderCreatePage from './pages/vender/VenderCreatePage';
import VenderSupervisionList from './pages/vender/VenderSupervisionList';
import VenderAuditionAllList from './pages/vender/VenderAuditionAllList'; 
import VenderCakeDesignLikeList from './pages/vender/VenderCakeDesignLikeList';
import VenderCakeDesignList from './pages/vender/VenderCakeDesignList';
import VenderCakeDesignAdd from './pages/vender/VenderCakeDesignAdd';
import VenderCakeDesignEdit from './pages/vender/VenderCakeDesignEdit';
import VenderCakeDesignDetail from './pages/vender/VenderCakeDesignDetail';
import VenderAppealDesignDetails from './pages/vender/VenderAppealDesignDetails';
import VenderProductPreview from './pages/vender/VenderProductPreview';
import VenderMain from './pages/vender/VenderMain';



// user
import UserSignUpForm from './pages/user/UserSignUpForm';
import UserMain from './pages/user/include/UserMain';
import UserSidebar from './pages/user/include/UserSidebar';
import UserPersonalInfoEdit from './pages/user/UserPersonalInfoEdit';
import UserLoginForm from './pages/user/UserLoginForm';
import UserSocialSignUpForm from './pages/user/UserSocialSignUpForm';
import UserSignUpSuccess from './pages/user/UserSignUpSuccess';
import VenderSignUpForm from './pages/user/VenderSignUpForm';
import VenderSignUpSuccess from './pages/user/VenderSignUpSuccess';
import UserCakeDetail from './pages/user/UserCakeDetail';
import UserOrderList from './pages/user/UserOrderList';
import UserCakeDesignBoard from './pages/user/UserCakeDesignBoard';
import UserOrderDetail from './pages/user/UserOrderDetail';
import UserOrder from './pages/user/UserOrder';
import UserWishList from './pages/user/UserWishList';
import UserCakeDesignDetail from './pages/user/UserCakeDesignDetail';
import UserCakeDesignAdd from './pages/user/UserCakeDesignAdd';
import UserCakeDesignEdit from './pages/user/UserCakeDesignEdit';

import UserMainForm from './pages/user/UserMainForm';

import UserPoint from './pages/user/UserPoint';
import UserStoreDetail from './pages/user/UserStoreDetail';
import UserPaymentDetail from './pages/user/UserPaymentDetail';
import UserMyPageCakeDesignList from './pages/user/UserMyPageCakeDesignList';
import UserMyPageCakeDesignLikeList from './pages/user/UserMyPageCakeDesignLikeList';


// board
import UserDebateInsert from './pages/user/UserDebateInsert';
import UserDebateList from './pages/user/UserDebateList';
import UserDebateView from './pages/user/UserDebateView';
import UserDebateEdit from "./pages/user/UserDebateEdit";


// admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMemberManagement from './pages/admin/AdminMemberManagement';
import AdminStatus from './pages/admin/AdminStatus';
import AdminContent from './pages/admin/AdminContent';
import AdminShopProduct from './pages/admin/AdminShopProduct';
import AdminShopProductDetail from './pages/admin/AdminShopProductDetail';
import AdminShopOrder from './pages/admin/AdminShopOrder';
import AdminVenderOrder from './pages/admin/AdminVenderOrder';
import UserWritingList from "./pages/user/UserWritingList";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/vender/' element={<VenderDashboard />} />
          <Route path='/vender/productlist' element={<VenderProductList />} />
          <Route path='/vender/option' element={<VenderOption />} />
          <Route path='/vender/registrationform' element={<VenderProductRegistrationForm />} />
          <Route path='/vender/productpreview' element={<VenderProductPreview/>} />
          <Route path='/vender/purchasedproducts' element={<VenderPurchasedProducts />} />
          <Route path='/vender/purchasedproductsdetail' element={<VenderPurchasedProductsDetail />} />
          <Route path='/vender/statistics' element={<VenderStatistics />} />
          <Route path='/vender/venderCreatePage' element={<VenderCreatePage />} />
          <Route path='/vender/supervisionList' element={<VenderSupervisionList />} />
          <Route path='/vender/auditionAllList' element={<VenderAuditionAllList />} />
          <Route path='/vender/cakeDesign/like/list' element={<VenderCakeDesignLikeList/>} />
          <Route path='/vender/cakeDesign/list' element={<VenderCakeDesignList/>} />
          <Route path='/vender/cakeDesign/add' element={<VenderCakeDesignAdd/>} />
          <Route path='/vender/cakeDesign/edit' element={<VenderCakeDesignEdit/>} />
          <Route path='/vender/cakeDesign/detail' element={<VenderCakeDesignDetail/>} />
          <Route path='/vender/venderAppealDesignDetails' element={<VenderAppealDesignDetails/>} />
          <Route path='/vender/venderMain' element={<VenderMain />} />
          <Route path='/vender/VenderCreatePage' element={<VenderCreatePage />} />
          
          {/* User Routes */}
          <Route path='/user/main' element={<UserMain/>}/>
          <Route path='/user/login' element={<UserLoginForm />} />
          <Route path='/user/signup' element={<UserSignUpForm />} />
          <Route path='/user/social/signup' element={<UserSocialSignUpForm/>} />
          <Route path='/user/signup/succ' element={<UserSignUpSuccess />} />
          <Route path='/vender/signup' element={<VenderSignUpForm/>} />
          <Route path='/vender/signup/succ' element={<VenderSignUpSuccess />} />
          <Route path='/user/userpersonalinfoedit' element={<UserPersonalInfoEdit />} />
          <Route path='/user/sidebar' element={<UserSidebar/>}/>
          <Route path='/user/test' element={<UserMain/>}/>
          <Route path='/user/cakedetail' element={<UserCakeDetail />} />
          <Route path='/user/orderlist' element={<UserOrderList/>}/>
          <Route path='/user/mypage/orderdetail' element={<UserOrderDetail/>}/>
          <Route path='/user/mypage/order' element={<UserOrder/>}/>
          <Route path='/user/mypage/wishlist' element={<UserWishList/>}/>
          <Route path='/user/cakeDesign/board' element={<UserCakeDesignBoard/>}/>
          <Route path='/user/cakeDesign/detail' element={<UserCakeDesignDetail/>}/>
          <Route path='/user/cakeDesign/add' element={<UserCakeDesignAdd/>}/>
          <Route path='/user/cakeDesign/edit' element={<UserCakeDesignEdit/>}/>

          <Route path='/user/mypage/point' element={<UserPoint/>}/>
          <Route path='/user/storedetail' element={<UserStoreDetail/>}/>
          <Route path='/user/paymentdetail' element={<UserPaymentDetail/>}/>
          <Route path='/user/mypage/cakeDesign/list' element={<UserMyPageCakeDesignList/>}/>
          <Route path='/user/mypage/cakeDesign/like/list' element={<UserMyPageCakeDesignLikeList/>}/>

          <Route path='/user/mypage/writinglist' element={<UserWritingList/>}/>
          {/* Main and Admin */}
          <Route path='/' element={<Main />} />

          {/*Admin Routes */}
          <Route path='/admin' element={<AdminDashboard/>}/>
          <Route path='/admin/member' element={<AdminMemberManagement/>}/>
          <Route path='/admin/status' element={<AdminStatus/>}/>
          <Route path='/admin/content' element={<AdminContent/>}/>
          <Route path='/admin/shopproducts' element={<AdminShopProduct/>}/>
          <Route path='/admin/shopproductsdetail' element={<AdminShopProductDetail/>}/>
          <Route path='/admin/shoporders' element={<AdminShopOrder/>}/>
          <Route path='/admin/venderorder' element={<AdminVenderOrder/>}/>

          {/* Board Routes */}
          <Route path='/board' element={<UserDebateList />} />
          <Route path='/board/debateinsert' element={<UserDebateInsert />} />
          <Route path='/board/boardview' element={<UserDebateView />} />
          <Route path="/board/debateedit" element={<UserDebateEdit />} />

          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;