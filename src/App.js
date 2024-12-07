import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";  // useNavigate 추가
import './assets/css/App.css'; // 스타일 적용
//소영 미리보기페이지용
import { VenderProvider } from '../src/context/VenderContext';
import axios from "axios";

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
import VenderReview from './pages/vender/VenderReview';
import VenderHeader from './pages/vender/include/VenderHeader';
import VenderInsertPage from './pages/vender/VenderInsertPage';
import VenderAuditionRequest from './pages/vender/VenderAuditionRequest';
import VenderAuditionRequestModal from './pages/vender/VenderAuditionRequestModal';

// user
import UserSignupType from './pages/user/UserSignupType';
import UserSignUpForm from './pages/user/UserSignUpForm';
import UserMain from './pages/user/include/UserMain';
import UserSidebar from './pages/user/include/UserSidebar';
import UserPersonalInfoEdit from './pages/user/UserPersonalInfoEdit';
import UserLoginForm from './pages/user/UserLoginForm';
import UserKakaoLogin from './pages/user/UserKakaoLogin'; // 화면 아님
import UserNaverLogin from './pages/user/UserNaverLogin'; // 화면 아님
import UserGoogleLogin from './pages/user/UserGoogleLogin'; // 화면 아님
import UserSocialSignUpForm from './pages/user/UserSocialSignUpForm';
import UserSignUpSuccess from './pages/user/UserSignUpSuccess';
import VenderSignUpForm from './pages/user/VenderSignUpForm';
import VenderSignUpSuccess from './pages/user/VenderSignUpSuccess';
import UserCakeDetail from './pages/user/UserCakeDetail';
import ReviewAnalysis from './pages/user/include/ReviewAnalysis';
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
import UserOrderComplete from './pages/user/UserOrderComplete';
import UserWritingList from "./pages/user/UserWritingList";
import UserAuditionBoard from './pages/user/UserAuditionBoard';
import UserAuditionAdd from './pages/user/UserAuditionAdd';
import UserAuditionEdit from './pages/user/UserAuditionEdit';
import UserAuditionOngoing from './pages/user/UserAuditionOngoing';
import UserAuditionModal from './pages/user/UserAuditionModal.jsx';
import UserAuditionComplete from './pages/user/UserAuditionComplete.jsx';
import UserMyAudtion from './pages/user/UserMyAudtion';
import UserExeStoreDetail from './pages/user/UserExeStoreDetail';

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
import AdminShopManage from './pages/admin/AdminShopManage';
import AdminShopAdd from './pages/admin/AdminShopAdd';
import VenderInsertAudition from './pages/vender/VenderInsertAudition';
import VenderProductRegistrationFormEdit from './pages/vender/VenderProductRegistrationFormEdit';
import WebRTCReceiver from './pages/user/WebRTCReceiver';

//GPT
import ChatGPTApp from './pages/main/ChatGPTApp.jsx';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // 챗봇 열림/닫힘 상태
  const [isTooltipVisible, setIsTooltipVisible] = useState(true); // 말풍선 보임 상태
  const [isAnimationRunning, setIsAnimationRunning] = useState(true); // 말풍선 애니메이션 상태

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // 챗봇 열림/닫힘 상태 토글
    setIsAnimationRunning(false); // 애니메이션 멈춤
    setIsTooltipVisible(false); // 말풍선 숨기기
  };


  useEffect(() => {
    // 애니메이션이 활성화된 경우에만 말풍선 반복 동작
    let interval;
    if (isAnimationRunning) {
      interval = setInterval(() => {
        setIsTooltipVisible((prev) => !prev);
      }, 3000); // 3초 간격으로 토글
    }
    console.log('isTooltipVisible:', isTooltipVisible);
    console.log('isChatOpen:', isChatOpen);

    return () => {
      if (interval) clearInterval(interval); // 컴포넌트 언마운트 시 정리
    };
  }, [isAnimationRunning]); // 애니메이션 상태가 변경될 때만 실행

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path='/vender/:venderId' element={<VenderDashboard />} />
          <Route path='/vender/' element={<VenderDashboard />} />
          <Route path='/vender/productlist' element={<VenderProductList />} />
          <Route path='/vender/option' element={<VenderOption />} />
          <Route path='/vender/registrationform' element={<VenderProductRegistrationForm />} />
          <Route path='/vender/productpreview/' element={<VenderProductPreview />} />
          <Route path='/vender/purchasedproducts/' element={<VenderPurchasedProducts />} />
          <Route path='/vender/purchasedproductsdetail/:orderId' element={<VenderPurchasedProductsDetail />} />
          <Route path='/vender/statistics' element={<VenderStatistics />} />
          <Route path='/vender/venderCreatePage' element={<VenderCreatePage />} />
          <Route path='/vender/supervisionList' element={<VenderSupervisionList />} />
          <Route path='/vender/auditionAllList' element={<VenderAuditionAllList />} />
          <Route path='/vender/cakeDesign/like/list' element={<VenderCakeDesignLikeList />} />
          <Route path='/vender/cakeDesign/list' element={<VenderCakeDesignList />} />
          <Route path='/vender/cakeDesign/add' element={<VenderCakeDesignAdd />} />
          <Route path='/vender/cakeDesign/edit/:cakeDesignId' element={<VenderCakeDesignEdit />} />
          <Route path='/vender/cakeDesign/detail/:cakeDesignId' element={<VenderCakeDesignDetail />} />
          <Route path='/vender/venderAppealDesignDetails' element={<VenderAppealDesignDetails />} />

          {/* <Route path='/vender/venderMain' element={<VenderMain />} /> */}
          <Route path='/vender/VenderCreatePage' element={<VenderCreatePage />} />
          <Route path='/vender/signup' element={<VenderSignUpForm />} />
          <Route path='/vender/signup/succ' element={<VenderSignUpSuccess />} />
          <Route path="/vender/review" element={<VenderReview />} />
          <Route path="/vender/VenderHeader" element={<VenderHeader />} />
          <Route path="/vender/VenderInsertPage/:venderId" element={<VenderProvider><VenderInsertPage /></VenderProvider>} />
          <Route path='/vender/exeStoreDetail/:venderId' element={<VenderProvider><UserExeStoreDetail /></VenderProvider>} />
          <Route path="/vender/venderInsertAudition/:auditionId" element={<VenderInsertAudition />} />
          <Route path="/vender/venderauditonrequest/:venderId/:productId/:auditionId" element={<VenderAuditionRequest />} />
          <Route path='/vender/venderauditionrequestmodal' element={<VenderAuditionRequestModal />} />
          <Route path='/vender/registrationformedit/:productId' element={<VenderProductRegistrationFormEdit />} />

          {/* User Routes */}
          <Route path='/user/test' element={<UserMain />} />
          <Route path='/user/login' element={<UserLoginForm />} />
          <Route path='/auth/login/kakao' element={<UserKakaoLogin />} />
          <Route path='/auth/login/naver' element={<UserNaverLogin />} />
          <Route path='/auth/login/google' element={<UserGoogleLogin />} />
          <Route path='/user/signup/type' element={<UserSignupType />} />
          <Route path='/user/signup' element={<UserSignUpForm />} />
          <Route path='/user/social/signup' element={<UserSocialSignUpForm />} />
          <Route path='/user/signup/succ' element={<UserSignUpSuccess />} />
          <Route path='/user/mypage/userpersonalinfoedit' element={<UserPersonalInfoEdit />} />
          <Route path='/user/sidebar' element={<UserSidebar />} />
          <Route path='/user/cakedetail/:productId/:venderId' element={<UserCakeDetail />} />
          <Route path='/user/review/analysis' element={<ReviewAnalysis />} />
          <Route path='/user/mypage/orderdetail/:orderId' element={<UserOrderDetail />} />
          <Route path='/user/mypage/order' element={<UserOrder />} />
          <Route path='/user/mypage/wishlist' element={<UserWishList />} />
          <Route path='/user/cakeDesign/board' element={<UserCakeDesignBoard />} />
          <Route path='/user/cakeDesign/detail/:cakeDesignId' element={<UserCakeDesignDetail />} />
          <Route path='/user/cakeDesign/add' element={<UserCakeDesignAdd />} />
          <Route path='/user/cakeDesign/edit/:cakeDesignId' element={<UserCakeDesignEdit />} />
          <Route path='/user/mypage/point' element={<UserPoint />} />
          <Route path='/user/storedetail/:venderId' element={<UserStoreDetail />} />
          <Route path="/user/paymentdetail/:venderId" element={<UserPaymentDetail />} />
          <Route path='/user/mypage/cakeDesign/list' element={<UserMyPageCakeDesignList />} />
          <Route path='/user/mypage/cakeDesign/like/list' element={<UserMyPageCakeDesignLikeList />} />
          <Route path='/user/ordercomplete' element={<UserOrderComplete />} />
          <Route path='/' element={<UserMainForm />} />
          <Route path='/user/audition/board' element={<UserAuditionBoard />} />
          <Route path='/user/audition/add' element={<UserAuditionAdd />} />
          <Route path='/user/audition/edit/:auditionApplicationId' element={<UserAuditionEdit />} />
          <Route path='/user/audition/ongoing/:auditionApplicationId' element={<UserAuditionOngoing />} />
          <Route path='/user/audition/modal' element={<UserAuditionModal />} />
          <Route path='/user/audition/complete' element={<UserAuditionComplete />} />
          <Route path='/user/mypage/audition' element={<UserMyAudtion />} />
          <Route path='/user/mypage/writinglist' element={<UserWritingList />} />
          <Route path='/stream/:orderId' element={<WebRTCReceiver />} />

          {/* alias 기반 라우트 */}
          <Route path="/:alias" element={<AliasToVenderRoute />} />

          {/*Admin Routes */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/member' element={<AdminMemberManagement />} />
          <Route path='/admin/status' element={<AdminStatus />} />
          <Route path='/admin/content' element={<AdminContent />} />
          <Route path='/admin/shopproducts' element={<AdminShopProduct />} />
          <Route path='/admin/shopproductsdetail' element={<AdminShopProductDetail />} />
          <Route path='/admin/shoporders' element={<AdminShopOrder />} />
          <Route path='/admin/venderorder' element={<AdminVenderOrder />} />
          <Route path='/admin/shopmanage' element={<AdminShopManage />} />
          <Route path='/admin/shopadd' element={<AdminShopAdd />} />
          {/* Board Routes */}
          <Route path='/debate/board' element={<UserDebateList />} />
          <Route path='/debate/debateinsert' element={<UserDebateInsert />} />
          <Route path='/debate/debateview/:debateId' element={<UserDebateView />} />
          <Route path='/debate/debateedit/:debateId' element={<UserDebateEdit />} />

          {/* GPT Routes */}
          <Route path='/gpt' element={<ChatGPTApp />} />
        </Routes>
      </BrowserRouter>

      {/* 오른쪽 하단 플로팅 버튼 */}
      {/* 플로팅 버튼과 말풍선 */}
      <div className="floating-chat-container">
        <div className={`chat-tooltip ${isTooltipVisible ? "visible" : "hidden"}`}>
          <div className="tooltip-text">
            <span>도움이 필요하시면</span>
            <br />
            <strong>눌러주세요!</strong>
          </div>
          <div className="tooltip-arrow"></div>
        </div>
        <div className="floating-chat-button" onClick={toggleChat}>
          🍰
        </div>
      </div>
      {/* 플로팅 버튼에서 열리는 ChatGPTApp */}
      {isChatOpen && (
        <div className="chat-bot-container">
          <div className="chat-header">
            <span>🍰 YUMMY 상담 봇</span>
            <button className="close-chat" onClick={toggleChat}>
              ×
            </button>
          </div>
          <ChatGPTApp />
        </div>
      )}
    </div>
  );
}
// Alias to venderId mapping route
const AliasToVenderRoute = () => {
  const { alias } = useParams();
  console.log("Alias value:", alias);
  const [venderId, setVenderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (alias) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/vender/getIdByAlias/${alias}`, {
          headers: { 'Accept': 'application/xml' }
        })
        .then((response) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "application/xml");
          const venderId = xmlDoc.getElementsByTagName("Long")[0].childNodes[0].nodeValue;

          if (venderId) {
            setVenderId(venderId);
          } else {
            console.error('Invalid alias:', alias);
            navigate('/404');
          }
        })
        .catch((error) => {
          console.error("Error fetching venderId by alias:", error);
          navigate('/404');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [alias, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!venderId) {
    return <Navigate to="/404" replace />;
  }

  return <Navigate to={`/user/storedetail/${venderId}`} replace />;
};

export default App;