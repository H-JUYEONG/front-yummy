import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css';
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';


const VenderSidebar = ({ isOpen, toggleMenu }) => {

    //업체 프로필사진
    const [logo, setLogo] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // 페이지 이동
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    const venderId = authUser?.vender_id || null; // 로그인한 유저의 venderId 가져오기

    // 유저 정보 가져오기
    useEffect(() => {
        if (!authUser) {
            alert('로그인이 필요합니다.');
            navigate('/user/login');
        }
    }, [authUser, navigate]);


    //업체별 로고사진 가져오기
    const getLogo = () => {
        if (!venderId) return;

        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/vender/sidebarLogo/${venderId}`)
            .then((response) => {
                setLogo(response.data.apiData || '/path/to/default-image.jpg');
            })
            .catch((error) => {
                console.error('Error fetching logo:', error);
                setLogo('/path/to/default-image.jpg');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getLogo();
    }, [venderId]);

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
                    {loading ? <p>로딩 중...</p> : <img className="profile-img" src={logo} alt="프로필 이미지" />}
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
