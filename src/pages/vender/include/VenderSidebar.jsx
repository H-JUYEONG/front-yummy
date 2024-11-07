import React from 'react';
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
                <li><FaHome /> 메인페이지 바로가기</li>
                <li><FaChartBar /> 대시보드</li>
                <li><FaChartBar /> 통계보기</li>
                <li><FaShoppingCart /> 상품관리</li>
                <li><FaClipboardList /> 주문관리</li>
                <li><FaGavel /> 경매관리</li>
            </ul>
            <button className="exit-button"><FaSignOutAlt /> 로그아웃</button>
        </aside>
    );
};

export default VenderSidebar;
