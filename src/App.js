import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import VenderProductList from './pages/vender/VenderProductList';
import VenderDashboard from './pages/vender/VenderDashboard';
import VenderPurchasedProducts from './pages/vender/VenderPurchasedProducts';
import VenderPurchasedProductsDetail from './pages/vender/VenderPurchasedProductsDetail';
import VenderOption from './pages/vender/VenderOption';
import VenderProductRegistrationForm from './pages/vender/VenderProductRegistrationForm';
import VenderStatistics from './pages/vender/VenderStatistics';




import AdminTest from './pages/admin/AdminTest';

import VenderCreatePage from './pages/vender/VenderCreatePage';

import VenderSupervisionList from './pages/vender/VenderSupervisionList';
import VenderAuditionAllList from './pages/vender/VenderAuditionAllList'; 
import VenderCakeDesignLikeList from './pages/vender/VenderCakeDesignLikeList';
import VenderCakeDesignList from './pages/vender/VenderCakeDesignList';
import VenderCakeDesignAdd from './pages/vender/VenderCakeDesignAdd';
import VenderCakeDesignEdit from './pages/vender/VenderCakeDesignEdit';
import VenderCakeDesignDetail from './pages/vender/VenderCakeDesignDetail';
import VenderAppealDesignDetails from './pages/vender/VenderAppealDesignDetails';


// user
import UserMain from './pages/user/include/UserMain';
import UserSidebar from './pages/user/include/UserSidebar';
import UserPersonalInfoEdit from './pages/user/userPersonalInfoEdit';
import UserLoginForm from './pages/user/userLoginForm';
import UserSignUpForm from './pages/user/UserSignupForm';
import UserSocialSignUpForm from './pages/user/UserSocialSignUpForm';
import UserSignUpSuccess from './pages/user/UserSignUpSuccess';
import VenderSignUpForm from './pages/user/VenderSignUpForm';
import VenderSignUpSuccess from './pages/user/VenderSignUpSuccess';
import UserCakeDetail from './pages/user/UserCakeDetail';
import UserOrderList from './pages/user/UserOrderList';
import UserCakeDesignBoard from './pages/user/UserCakeDesignBoard';
import UserCakeDesignAdd from './pages/user/UserCakeDesignAdd';
import UserCakeDesignEdit from './pages/user/UserCakeDesignEdit';


// board
import UserDebateInsert from './pages/user/UserDebateInsert';
import UserDebateList from './pages/user/UserDebateList';
import UserDebateView from './pages/user/UserDebateView';

import VenderProductPreview from './pages/vender/VenderProductPreview';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/vender/dashboard' element={<VenderDashboard />} />
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

          {/* User Routes */}
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
       
          {/* Main and Admin */}
          <Route path='/user/main' element={<UserMain/>}/>
          <Route path='/user/cakeDesign/board' element={<UserCakeDesignBoard/>}/>
          <Route path='/user/cakeDesign/add' element={<UserCakeDesignAdd/>}/>
          <Route path='/user/cakeDesign/edit' element={<UserCakeDesignEdit/>}/>
          <Route path='/admintest' element={<AdminTest />} />

          {/* Board Routes */}
          <Route path='/board' element={<UserDebateList />} />
          <Route path='/board/debateinsert' element={<UserDebateInsert />} />
          <Route path='/board/boardview' element={<UserDebateView />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;