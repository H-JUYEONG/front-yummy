import { Routes, Route } from "react-router-dom";

import UserLoginForm from "../features/auth/UserLoginForm";
import UserSignUpForm from "../features/auth/UserSignUpForm";
import UserSocialSignUpForm from "../features/auth/UserSocialSignUpForm";
import UserSignUpSuccess from "../features/auth/UserSignUpSuccess";
import UserPersonalInfoEdit from "../features/user-profile/UserPersonalInfoEdit";
import UserSidebar from "../components/user/UserSidebar";
import UserCakeDetail from "../features/orders/UserCakeDetail";
import ReviewAnalysis from "../components/user/ReviewAnalysis";
import UserOrderDetail from "../features/orders/UserOrderDetail";
import UserOrder from "../features/orders/UserOrder";
import UserWishList from "../features/user-profile/UserWishList";
import UserCakeDesignBoard from "../features/cakedesign/UserCakeDesignBoard";
import UserCakeDesignDetail from "../features/cakedesign/UserCakeDesignDetail";
import UserCakeDesignAdd from "../features/cakedesign/UserCakeDesignAdd";
import UserCakeDesignEdit from "../features/cakedesign/UserCakeDesignEdit";
import UserPoint from "../features/user-profile/UserPoint";
import UserStoreDetail from "../features/user-profile/UserStoreDetail";
import UserPaymentDetail from "../features/orders/UserPaymentDetail";
import UserMyPageCakeDesignList from "../features/user-profile/UserMyPageCakeDesignList";
import UserMyPageCakeDesignLikeList from "../features/user-profile/UserMyPageCakeDesignLikeList";
import UserOrderComplete from "../features/orders/UserOrderComplete";
import UserWritingList from "../features/user-profile/UserWritingList";
import UserSignupType from "../features/auth/UserSignupType";
import UserAuditionBoard from "../features/auctions/UserAuditionBoard";
import UserAuditionAdd from "../features/auctions/UserAuditionAdd";
import UserAuditionEdit from "../features/auctions/UserAuditionEdit";
import UserAuditionOngoing from "../features/auctions/UserAuditionOngoing";
import UserAuditionModal from "../features/auctions/UserAuditionModal";
import UserAuditionComplete from "../features/auctions/UserAuditionComplete";
import UserMyAudtion from "../features/user-profile/UserMyAudtion";
import React from "react";

const UserRoutes = () => {
    return (

            <Routes>
                <Route path='/user/login' element={<UserLoginForm />} />

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

                <Route path='/user/audition/board' element={<UserAuditionBoard />} />
                <Route path='/user/audition/add' element={<UserAuditionAdd />} />
                <Route path='/user/audition/edit/:auditionApplicationId' element={<UserAuditionEdit />} />
                <Route path='/user/audition/ongoing/:auditionApplicationId' element={<UserAuditionOngoing />} />
                <Route path='/user/audition/modal' element={<UserAuditionModal />} />
                <Route path='/user/audition/complete' element={<UserAuditionComplete />} />
                <Route path='/user/mypage/audition' element={<UserMyAudtion />} />
                <Route path='/user/mypage/writinglist' element={<UserWritingList />} />
            </Routes>

    );
};

export default UserRoutes;
