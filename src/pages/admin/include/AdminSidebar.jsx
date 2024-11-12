import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/all.css';
import '../../../assets/css/admin/adminSidebar.css';

const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="logo">관리자 페이지</div>
            
            <ul className="menu">
                <li><Link to="/admin">대시보드</Link></li>
                <li><Link to="/admin/status">통계</Link></li>
                <li><Link to="/admin/member">회원 관리</Link></li>
                <li><Link to="/admin/content">컨텐츠 관리</Link></li>
            </ul>

            {/* 회원 관리와 쇼핑몰 관리 사이의 구분선 */}
            <hr className="menu-divider" />

            <ul className="menu">
                <li><Link to="/admin/shopadd">쇼핑몰-페이지 등록</Link></li>
                <li><Link to="/admin/shopmanage">쇼핑몰-페이지 수정</Link></li>
                <li><Link to="/admin/shopproducts">쇼핑몰-상품 관리</Link></li>
                <li><Link to="/admin/shoporders">쇼핑몰-주문 관리</Link></li>
            </ul>

            {/* 쇼핑몰 관리와 업체 관리 사이의 구분선 */}
            <hr className="menu-divider" /> 

            <ul className="menu">
                <li><Link to="/admin/venderorder">업체-주문 관리</Link></li>
            </ul>

            <button className="logout-button">로그아웃</button>
        </aside>
    );
};

export default AdminSidebar;
