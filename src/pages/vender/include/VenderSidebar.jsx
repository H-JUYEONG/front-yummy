import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css';
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';
import cakeLogo from '../../../assets/images/mainlogoimg02.avif';

const VenderSidebar = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림/닫힘 상태
    const [isMobile, setIsMobile] = useState(false); // 모바일 화면 여부
    const [logo, setLogo] = useState(cakeLogo); // 기본 업체 로고
    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    const venderId = authUser?.vender_id || null;

    // 화면 크기 감지
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 모바일 화면 여부 업데이트
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 업체 로고 가져오기
    const fetchLogo = () => {
        if (!venderId) return;
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/vender/sidebarLogo/${venderId}`)
            .then((response) => {
                setLogo(response.data.apiData || cakeLogo);
            })
            .catch((error) => console.error('Error fetching logo:', error));
    };

    useEffect(() => {
        fetchLogo();
    }, [venderId]);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authUser');
        setAuthUser(null);
        navigate('/');
    };

    // 사이드바 열림/닫힘 상태 변경
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="vender-container">
            {/* 모바일: 햄버거 메뉴 */}
            {isMobile && (
                <button className="hamburger-menu" onClick={toggleSidebar}>
                    ☰
                </button>
            )}

            {/* 사이드바 */}
            <aside className={`vender-sidebar ${isMobile && isSidebarOpen ? 'open' : ''}`}>
                <div className="vender-profile">
                    <Link to={`/user/storedetail/${venderId}`}>
                        <img className="profile-img" src={logo} alt="프로필 이미지" />
                    </Link>
                    <p>
                        <Link to={`/vender/venderinsertpage/${venderId}`} onClick={toggleSidebar}>
                            <FaClipboardList /> 업체사이트 관리
                        </Link>
                    </p>
                </div>
                <ul className="vender-menu">
                    <li>
                        <Link to="/vender/" onClick={toggleSidebar}>
                            <FaChartBar /> 대시보드
                        </Link>
                    </li>
                    <li>
                        <Link to="/vender/statistics" onClick={toggleSidebar}>
                            <FaChartBar /> 통계보기
                        </Link>
                    </li>
                    {/* 도안관리: vender_id가 73이 아닐 때만 표시 */}
                    {venderId !== 73 && (
                        <li>
                            <Link to="/vender/cakeDesign/list" onClick={toggleSidebar}>
                                <FaShoppingCart /> 도안관리
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/vender/productlist" onClick={toggleSidebar}>
                            <FaShoppingCart /> 상품관리
                        </Link>
                    </li>
                    <li>
                        <Link to="/vender/purchasedproducts" onClick={toggleSidebar}>
                            <FaClipboardList /> 주문관리
                        </Link>
                    </li>
                    {/* 케이크요청관리: vender_id가 73이 아닐 때만 표시 */}
                    {venderId !== 73 && (
                        <li>
                            <Link to="/vender/supervisionList" onClick={toggleSidebar}>
                                <FaGavel /> 케이크요청관리
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/" onClick={toggleSidebar}>
                            <FaHome /> 메인페이지 바로가기
                        </Link>
                    </li>
                </ul>
                <button className="exit-button" onClick={handleLogout}>
                    <FaSignOutAlt /> 로그아웃
                </button>
            </aside>

            {/* 메인 콘텐츠 */}
            <div className={`vender-content-wrapper ${isMobile && isSidebarOpen ? 'sidebar-open' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default VenderSidebar;
