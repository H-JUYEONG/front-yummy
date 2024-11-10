import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/all.css';
import '../../../assets/css/admin/adminSidebar.css';


const AdminSidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="logo">쇼핑몰 관리</div>
            <ul className="menu">
                <li><Link to="/admin/shop">쇼핑몰 관리 바로가기</Link></li>
                <li className="active"><Link to="/admin/dashboard">대시보드</Link></li>
                <li><Link to="/admin/stats">통계</Link></li>
                <li><Link to="/admin/products">상품 관리</Link></li>
                <li><Link to="/admin/orders">주문 관리</Link></li>
                <li><Link to="/admin/member">회원 관리</Link></li>
            </ul>
            <button className="logout-button">로그아웃</button>
        </aside>
    );
};

export default AdminSidebar;
