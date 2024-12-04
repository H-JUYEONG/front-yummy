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
    const [monthlyOrderCount, setMonthlyOrderCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [newReviews, setNewReviews] = useState(0); // 신규 리뷰 상태 추가
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
    // 월별 주문 건수 가져오기
    useEffect(() => {
        const fetchMonthlyOrderCount = async () => {
            if (authUser) {
                try {
                    const response = await axios.get(`${API_URL}/api/vender/monthlyCount`, {
                        params: { venderId: authUser.vender_id },
                    });
                    setMonthlyOrderCount(response.data);
                } catch (error) {
                    console.error('Error fetching monthly order count:', error);
                }
            }
        };

        fetchMonthlyOrderCount();
    }, [authUser]);

    useEffect(() => {
        const fetchPoints = async () => {
            if (authUser) {
                try {
                    const response = await axios.get(`${API_URL}/api/vender/points`, {
                        params: { memberId: authUser.member_id },
                    });
                    setPoints(response.data.memberPoints || 0); // undefined 방지
                } catch (error) {
                    console.error("Error fetching points:", error);
                }
            }
        };

        fetchPoints();
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
        eventContent: (info) => {
            const statusStyles = {
                '결제 완료': { backgroundColor: '#4CAF50', color: '#fff', icon: '✔️' },
                '픽업 요청': { backgroundColor: '#2196F3', color: '#fff', icon: '📦' },
                '배송 중': { backgroundColor: '#FF9800', color: '#fff', icon: '🚚' },
                '제작 중': { backgroundColor: '#E0E0E0', color: '#757575', icon: '⚙️' },
                '수령 완료': { backgroundColor: '#F5F5F5', color: '#9E9E9E', icon: '🎉' },
            };

            // 이벤트 상태에 따라 스타일 설정
            const status = info.event.title.split('(')[1]?.split(')')[0]; // 상태 추출
            const style = statusStyles[status] || { backgroundColor: '#ddd', color: '#000', icon: 'ℹ️' };

            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        backgroundColor: style.backgroundColor,
                        color: style.color,
                    }}
                >
                    <span style={{ marginRight: '5px' }}>{style.icon}</span>
                    <span
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {info.event.title}
                    </span>
                </div>
            );
        },
        eventClick: (info) => {
            alert(`주문 ID: ${info.event.extendedProps.orderId}\n시간: ${info.event.extendedProps.time}`);
        },
    };


    // 신규 리뷰 데이터 가져오기
    useEffect(() => {
        const fetchNewReviews = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/vender/newreviews`, {
                    params: { venderId: authUser.vender_id },
                });
                setNewReviews(response.data.length); // 신규 리뷰 수 설정
            } catch (error) {
                console.error('Error fetching new reviews:', error);
            }
        };

        fetchNewReviews();
    }, [authUser]);

    if (!authUser) {
        return null; // authUser가 없으면 아무것도 렌더링하지 않음
    }

    // 현재 월 계산 (예: 11월)
    const currentMonth = new Date().toLocaleString('ko-KR', { month: 'long' });
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
                                        <h3>{currentMonth} 주문 건수</h3>
                                        <p>{monthlyOrderCount}건</p>
                                    </div>
                                    <div className="card">
                                        <h3>새로운 리뷰</h3>
                                        <p>{newReviews}건</p>
                                    </div>
                                    <div className="card">
                                        <h3>포인트</h3>
                                        <p>{points.toLocaleString()}</p>
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
