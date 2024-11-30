import React, { useState, useEffect } from 'react';
import VenderSidebar from './VenderSidebar';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css';

const SidebarWrapper = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 화면 크기 감지
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 모바일 화면인지 판단
        };

        handleResize(); // 초기 실행
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // 리스너 해제
        };
    }, []);

    const toggleMenu = () => {
        setSidebarOpen((prev) => !prev); // 사이드바 열림/닫힘 상태 변경
    };

    return (
        <div className="vender-container">
            {/* 모바일에서만 햄버거 메뉴와 사이드바 표시 */}
            {isMobile && (
                <>
                    <button className="hamburger-menu" onClick={toggleMenu}>
                        ☰
                    </button>
                    <VenderSidebar isOpen={isSidebarOpen} toggleMenu={toggleMenu} />
                </>
            )}

            {/* 메인 콘텐츠 */}
            <div className={`vender-content-wrapper ${isSidebarOpen && isMobile ? 'sidebar-open' : ''}`}>
                {children} {/* 하위 컴포넌트 렌더링 */}
            </div>
        </div>
    );
};

export default SidebarWrapper;
