import React from 'react';
import '../../assets/css/all.css'; // 전역 css
import '../../assets/css/vender/vender.css'; // 업체 페이지 전용 스타일
import '../../assets/css/vender/dashboard.css'; // 업체 페이지 전용 스타일
import FullCalendar from '@fullcalendar/react'; // FullCalendar 컴포넌트 가져오기
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';

import VenderHeader from './include/VenderHeader';

import VenderSidebar from './include/VenderSidebar';
const VenderDashboard = () => {
    // FullCalendar 컴포넌트에 필요한 설정들을 정의합니다.
    const calendarOptions = {
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
    };

    return (
        <>
            <div className="vender-container">
                <div class="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <main className="dashboard-content">
                            <header className="vender-header ">
                                <VenderHeader />
                            </header>
                            <section className="dashboard-summary">
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
                                <FullCalendar {...calendarOptions} />
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VenderDashboard;
