import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../../assets/css/all.css';
import '../../../assets/css/admin/adminSidebar.css';

const AdminSidebar = () => {
    const navigate = useNavigate(); // 페이지 이동
    // 로그아웃 처리
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
        <aside className="admin-sidebar">
            <div className="logo">
                <Link to={`/`}>
                    <h1>YUMMY</h1>
                </Link>
            </div>

            <ul className="menu">
                <li><Link to="/admin">대시보드</Link></li>
                <li><Link to="/admin/member">회원 관리</Link></li>
                <li><Link to="/admin/content">컨텐츠 관리</Link></li>
                <li><Link to="/admin/venderorder">업체-주문 관리</Link></li>
                <li><Link to="/admin/status">통계</Link></li>
            </ul>

            {/* 회원 관리와 쇼핑몰 관리 사이의 구분선 */}
            <hr className="menu-divider" />

            <ul className="menu">
                <li><Link to="/admin/shopadd">쇼핑몰-페이지 등록</Link></li>
                <li><Link to="/admin/shopmanage">쇼핑몰-페이지 수정</Link></li>
                <li><Link to="/admin/shopproducts">쇼핑몰-상품 관리</Link></li>
                <li><Link to="/admin/shoporders">쇼핑몰-주문 관리</Link></li>
            </ul>

            <button className="exit-button" onClick={handleLogout}>
                로그아웃
            </button>
        </aside>
    );
};

export default AdminSidebar;
