import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 리디렉션을 위해 react-router-dom 사용
import axios from 'axios'; // HTTP 요청 라이브러리
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
const API_URL = process.env.REACT_APP_API_URL;
const VenderDashboard = () => {
    const navigate = useNavigate(); // 페이지 이동에 사용
    const [authUser, setAuthUser] = useState(null);
    const [events, setEvents] = useState([]); // FullCalendar에서 사용할 이벤트 데이터

    // 유저 정보 가져오기
    useEffect(() => {
        const user = localStorage.getItem('authUser');
        if (user) {
            setAuthUser(JSON.parse(user));
        } else {
            alert('로그인이 필요합니다.');
            navigate('/user/login');
        }
    }, [navigate]);

    // 예약 데이터 가져오기
    useEffect(() => {
        if (authUser) {
            const fetchEvents = async () => {
                try {
                    const response = await axios.get(`${API_URL}/api/vender/dashboard`, {
                        params: { venderId: authUser.vender_id },
                    });

                    // 백엔드에서 가져온 데이터를 FullCalendar 형식으로 변환
                    const calendarEvents = response.data.map((reservation) => ({
                        title: `${reservation.product_name} (${reservation.order_status})`,
                        start: reservation.reservation_date,
                        allDay: reservation.delivery_method === 'quick',
                        extendedProps: {
                            orderId: reservation.order_id,
                            time: reservation.reservation_time,
                        },
                    }));
                    setEvents(calendarEvents);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            };

            fetchEvents();
        }
    }, [authUser]);

    // FullCalendar 옵션 설정
    const calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: koLocale,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        navLinks: true,
        selectable: true,
        editable: true,
        events: events, // 동적으로 가져온 이벤트 데이터
        eventClick: (info) => {
            alert(`주문 ID: ${info.event.extendedProps.orderId}\n시간: ${info.event.extendedProps.time}`);
        },
    };

    if (!authUser) {
        return null; // authUser가 없으면 아무것도 렌더링하지 않음
    }

    return (
        <>
            <div className="vender-container">
                <div className="vender-content-wrapper">
                    <VenderSidebar />
                    <div className="vender-content">
                        <main className="dashboard-content">
                            <header className="vender-header">
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
