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
                <Route path='/login' element={<UserLoginForm />} />

                <Route path='/signup/type' element={<UserSignupType />} />
                <Route path='/signup' element={<UserSignUpForm />} />
                <Route path='/social/signup' element={<UserSocialSignUpForm />} />
                <Route path='/signup/succ' element={<UserSignUpSuccess />} />
                <Route path='/mypage/userpersonalinfoedit' element={<UserPersonalInfoEdit />} />
                <Route path='/sidebar' element={<UserSidebar />} />
                <Route path='/cakedetail/:productId/:venderId' element={<UserCakeDetail />} />
                <Route path='/review/analysis' element={<ReviewAnalysis />} />
                <Route path='/mypage/orderdetail/:orderId' element={<UserOrderDetail />} />
                <Route path='/mypage/order' element={<UserOrder />} />
                <Route path='/mypage/wishlist' element={<UserWishList />} />
                <Route path='/cakeDesign/board' element={<UserCakeDesignBoard />} />
                <Route path='/cakeDesign/detail/:cakeDesignId' element={<UserCakeDesignDetail />} />
                <Route path='/cakeDesign/add' element={<UserCakeDesignAdd />} />
                <Route path='/cakeDesign/edit/:cakeDesignId' element={<UserCakeDesignEdit />} />
                <Route path='/mypage/point' element={<UserPoint />} />
                <Route path='/storedetail/:venderId' element={<UserStoreDetail />} />
                <Route path="/paymentdetail/:venderId" element={<UserPaymentDetail />} />
                <Route path='/mypage/cakeDesign/list' element={<UserMyPageCakeDesignList />} />
                <Route path='/mypage/cakeDesign/like/list' element={<UserMyPageCakeDesignLikeList />} />
                <Route path='/ordercomplete' element={<UserOrderComplete />} />

                <Route path='/audition/board' element={<UserAuditionBoard />} />
                <Route path='/audition/add' element={<UserAuditionAdd />} />
                <Route path='/audition/edit/:auditionApplicationId' element={<UserAuditionEdit />} />
                <Route path='/audition/ongoing/:auditionApplicationId' element={<UserAuditionOngoing />} />
                <Route path='/audition/modal' element={<UserAuditionModal />} />
                <Route path='/audition/complete' element={<UserAuditionComplete />} />
                <Route path='/mypage/audition' element={<UserMyAudtion />} />
                <Route path='/mypage/writinglist' element={<UserWritingList />} />
            </Routes>

    );
};

export default UserRoutes;
