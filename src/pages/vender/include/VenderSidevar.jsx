import React from 'react';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일

const VenderSidebar = () => {
    return (
        <aside className="vender-sidebar">
            <div className="vender-profile">
                <img className="profile-img" src="https://via.placeholder.com/80" alt="프로필 이미지" />
                <h3>홍길동</h3>
                <p>CEO</p>
            </div>
            <ul className="vender-menu">
                <li className="active">대시보드</li>
                <li>주문 관리</li>
                <li>매출 분석</li>
                <li>리뷰 관리</li>
                <li>설정</li>
            </ul>
            <button className="exit-button">로그아웃</button>
        </aside>
    );
};

export default VenderSidebar;
