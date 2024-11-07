import React, { useEffect } from 'react';
import '../../../assets/css/all.css';
import '../../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import { FaHome, FaChartBar, FaShoppingCart, FaClipboardList, FaGavel, FaSignOutAlt } from 'react-icons/fa';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

const VenderSidebar = () => {
    return (
        <aside className="vender-sidebar">
            <div className="vender-profile">
                <img className="profile-img" src="https://via.placeholder.com/80" alt="프로필 이미지" />
                <h3>업체 이름</h3>
                <li><FaClipboardList style={{ marginRight: '5px' }} /> 업체사이트 관리</li>
            </div>
            <ul className="vender-menu">
                <li><FaHome style={{ marginRight: '5px' }} /> 메인페이지 바로가기</li>
                <li><FaChartBar style={{ marginRight: '5px' }} /> 대시보드</li>
                <li><FaChartBar style={{ marginRight: '5px' }} /> 통계보기</li>
                <li><FaShoppingCart style={{ marginRight: '5px' }} /> 상품관리</li>
                <li><FaClipboardList style={{ marginRight: '5px' }} /> 주문관리</li>
                <li><FaGavel style={{ marginRight: '5px' }} /> 경매관리</li>
            </ul>
            <button className="exit-button"><FaSignOutAlt style={{ marginRight: '5px' }} /> 로그아웃</button>
        </aside>
    );
};

const VenderDashboard = () => {
    useEffect(() => {
        // FullCalendar 관련 설정
        const calendarEl = document.getElementById('calendar');
        if (calendarEl) {
            new FullCalendar.Calendar(calendarEl, {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: koLocale,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                navLinks: true,
                selectable: true,
                editable: true,
                events: [
                    {
                        title: '예약된 케이크 제작 (주문 5건)',
                        start: '2024-11-05',
                        end: '2024-11-05'
                    },
                    {
                        title: '고객 픽업 예약 (주문 3건)',
                        start: '2024-11-10',
                        end: '2024-11-10'
                    },
                    {
                        title: '주문 처리 (주문 8건)',
                        start: '2024-11-15',
                        end: '2024-11-15'
                    },
                    {
                        title: '고객 픽업 예약 (주문 2건)',
                        start: '2024-11-20',
                        end: '2024-11-20'
                    }
                ]
            }).render();
        }
    }, []);

    return (
        <>
            <div className="vender-container">
                <VenderSidebar />
                <div className="vender-content">
                    <main className="main-content">
                        <section className="dashboard-summary">
                            <h2>통계 요약</h2>
                            <div className="summary-cards">
                                <div className="card">
                                    <h3>총 주문 건수</h3>
                                    <p>120건</p>
                                </div>
                                <div className="card">
                                    <h3>총 매출</h3>
                                    <p>3,200,000원</p>
                                </div>
                                <div className="card">
                                    <h3>새로운 리뷰</h3>
                                    <p>12건</p>
                                </div>
                                <div className="card">
                                    <h3>포인트</h3>
                                    <p>2,000</p>
                                </div>
                            </div>
                        </section>
                        <section className="scheduler-section">
                            <h2>예약 스케쥴러</h2>
                            <div id="calendar"></div>
                        </section>
                    </main>
                </div>
            </div>
            <footer>
                <p>케이크 사이트 &copy; 2024. 모든 권리 보유.</p>
            </footer>
        </>
    );
};

export { VenderSidebar, VenderDashboard };