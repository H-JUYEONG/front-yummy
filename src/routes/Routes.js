import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import VendorRoutes from "./VendorRoutes";
import Main from "../pages/main/Main"; // 홈 화면

// 소셜 로그인 관련 컴포넌트
import UserKakaoLogin from "../features/auth/UserKakaoLogin";
import UserNaverLogin from "../features/auth/UserNaverLogin";
import UserGoogleLogin from "../features/auth/UserGoogleLogin";
import DebateRoutes from "./DebateRoutes";
import AliasToVenderRoute from "./AliasToVenderRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 기본 홈 라우트 추가 */}
                <Route path="/" element={<Main />} />

                {/* 유저 라우트 */}
                <Route path="/*" element={<UserRoutes />} />

                {/* 관리자 라우트 */}
                <Route path="/admin/*" element={<AdminRoutes />} />

                {/* 업체 라우트 */}
                <Route path="/vender/*" element={<VendorRoutes />} />

                {/* debate 라우트 */}
                <Route path="/debate/*" element={<DebateRoutes />} />

                {/* 별칭(Alias) 처리 */}
                <Route path="/:alias" element={<AliasToVenderRoute />} />

                {/* 소셜 로그인 라우트 (전역) */}
                <Route path="/auth/login/kakao" element={<UserKakaoLogin />} />
                <Route path="/auth/login/naver" element={<UserNaverLogin />} />
                <Route path="/auth/login/google" element={<UserGoogleLogin />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
