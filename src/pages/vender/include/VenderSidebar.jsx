import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css';
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';
import cakeLogo from '../../../assets/images/mainlogoimg02.avif';

const VenderSidebar = ({ isOpen, toggleMenu }) => {

    const navigate = useNavigate(); // 페이지 이동
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });
    const venderId = authUser?.vender_id || null; // 로그인한 유저의 venderId 가져오기
    const handleLogout = () => {
        console.log('로그아웃');

        // 로컬 스토리지에서 토큰 및 사용자 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');

        // 상태값 초기화
        setToken(null);
        setAuthUser(null);

        // 메인 페이지로 이동
        navigate('/');
    };

    return (
        <aside className={`vender-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="vender-profile">
                <Link to={`/user/storedetail/${venderId}`}>
                    <img className="profile-img" src={cakeLogo} alt="프로필 이미지" />
                </Link>
                <h3>CakeLines</h3>
                <p>
                    <Link to={`/vender/venderinsertpage/${venderId}`} onClick={toggleMenu}>
                        <FaClipboardList /> 업체사이트 관리
                    </Link>
                </p>
            </div>
            <ul className="vender-menu">
                <li>
                    <Link to="/vender/" onClick={toggleMenu}>
                        <FaChartBar /> 대시보드
                    </Link>
                </li>
                <li>
                    <Link to="/vender/statistics" onClick={toggleMenu}>
                        <FaChartBar /> 통계보기
                    </Link>
                </li>
                <li>
                    <Link to="/vender/cakeDesign/list" onClick={toggleMenu}>
                        <FaShoppingCart /> 도안관리
                    </Link>
                </li>
                <li>
                    <Link to="/vender/productlist" onClick={toggleMenu}>
                        <FaShoppingCart /> 상품관리
                    </Link>
                </li>
                <li>
                    <Link to="/vender/purchasedproducts" onClick={toggleMenu}>
                        <FaClipboardList /> 주문관리
                    </Link>
                </li>
                <li>
                    <Link to="/vender/supervisionList" onClick={toggleMenu}>
                        <FaGavel /> 케이크요청관리
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={toggleMenu}>
                        <FaHome /> 메인페이지 바로가기
                    </Link>
                </li>
            </ul>
            <button className="exit-button" onClick={handleLogout}>
                <FaSignOutAlt /> 로그아웃
            </button>
        </aside>
    );
};

export default VenderSidebar;
