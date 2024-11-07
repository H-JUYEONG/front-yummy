import React from 'react';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';

const VenderSidebar = () => {
    return (
        <aside className="vender-sidebar">
            <div className="vender-profile">
                <img className="profile-img" src="https://via.placeholder.com/80" alt="프로필 이미지" />
                <h3>업체 이름</h3>
                <p><FaClipboardList /> 업체사이트 관리</p>
            </div>
            <ul className="vender-menu">
                <li><Link to="/"><FaHome /> 메인페이지 바로가기</Link></li>
                <li><Link to="/vender/dashboard"><FaChartBar /> 대시보드</Link></li>
                <li><Link to="/vender/statistics"><FaChartBar /> 통계보기</Link></li>
                <li><Link to="/vender/productlist"><FaShoppingCart /> 상품관리</Link></li>
                <li><Link to="/order-management"><FaClipboardList /> 주문관리</Link></li>
                <li><Link to="/auction-management"><FaGavel /> 경매관리</Link></li>
            </ul>
            <button className="exit-button"><FaSignOutAlt /> 로그아웃</button>
        </aside>
    );
};

export default VenderSidebar;
