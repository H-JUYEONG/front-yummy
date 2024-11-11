import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css';
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';

const VenderSidebar = ({ isOpen, toggleMenu }) => {
    return (
        <aside className={`vender-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="vender-profile">
                <Link to='/vender/venderMain'>
                    <img className="profile-img" src="https://via.placeholder.com/80" alt="프로필 이미지" />
                </Link>
                <h3>업체 이름</h3>
                <p><Link to="/vender/venderCreatePage" onClick={toggleMenu}><FaClipboardList /> 업체사이트 관리</Link></p>
            </div>
            <ul className="vender-menu">
                <li><Link to="/user/userMainForm" onClick={toggleMenu}><FaHome /> 메인페이지 바로가기</Link></li>
                <li><Link to="/vender" onClick={toggleMenu}><FaChartBar /> 대시보드</Link></li>
                <li><Link to="/vender/statistics" onClick={toggleMenu}><FaChartBar /> 통계보기</Link></li>
                <li><Link to="/vender/cakeDesign/list" onClick={toggleMenu}><FaShoppingCart /> 도안관리</Link></li>
                <li><Link to="/vender/productlist" onClick={toggleMenu}><FaShoppingCart /> 상품관리</Link></li>
                <li><Link to="/vender/purchasedproducts" onClick={toggleMenu}><FaClipboardList /> 주문관리</Link></li>
                <li><Link to="/vender/supervisionList" onClick={toggleMenu}><FaGavel /> 오디션관리</Link></li>
            </ul>
            <button className="exit-button"><FaSignOutAlt /> 로그아웃</button>
        </aside>
    );
};

export default VenderSidebar;
