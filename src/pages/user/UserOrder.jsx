import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSidebar from '../../pages/user/include/UserSidebar';
import RightNavbar from './include/RightNavbar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userorder.css';
import Header from './include/Header';
import Footer from './include/Footer';
import WebRTCReceiver from "./WebRTCReceiver"; //실시간 방송

const UserOrder = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderList, setOrderList] = useState([]);
    const [statusCounts, setStatusCounts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    //실시간 방송
    const [isBroadcastActive, setIsBroadcastActive] = useState(false);
    const [offer, setOffer] = useState("");

    useEffect(() => {
        // 서버에서 방송 상태 및 Offer 정보 가져오기
        const fetchBroadcastStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/broadcast/${selectedOrder.id}`);
                setIsBroadcastActive(response.data.isActive);
                setOffer(response.data.offer);
            } catch (error) {
                console.error("방송 상태 가져오기 실패:", error);
            }
        };

        fetchBroadcastStatus();
    }, [selectedOrder]);
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        checkAuthAndFetchData();
    }, []);

    const checkAuthAndFetchData = async () => {
        if (!authUser || !authUser.user_id) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }
        await Promise.all([
            fetchOrderList(),
            fetchStatusCounts()
        ]);
    };

    const fetchOrderList = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/orders`, {
                params: { userId: authUser.user_id }
            });
            const formattedOrders = response.data.map(order => ({
                ...order,
                actions: order.actions ? order.actions.split(',') : []
            }));
            setOrderList(formattedOrders);
        } catch (error) {
            console.error('Error fetching order list:', error);
            setError('주문 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStatusCounts = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/mypage/orders/status-count`,
                { params: { userId: authUser.user_id } }
            );
            setStatusCounts(response.data);
        } catch (error) {
            console.error('Error fetching status counts:', error);
        }
    };

    const fetchOrderDetail = async (orderId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/orders/${orderId}`);
            setSelectedOrder(response.data);
            setShowDetail(true);
        } catch (error) {
            console.error('Error fetching order detail:', error);
            alert('주문 상세 정보를 불러오는 중 오류가 발생했습니다.');
        }
    };

    const updateOrderStatus = async (orderId) => {
        try {
            const confirmed = window.confirm("물품을 수령하신게 맞으신가요? 확인 버튼을 누르면 수령이 완료된 것으로 처리됩니다!");
            if (confirmed) {
                // API 요청 URL 확인을 위한 로그
                console.log('Request URL:', `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`);

                // 요청 데이터 확인을 위한 로그
                const requestData = { status: "수령 완료" };
                console.log('Request Data:', requestData);

                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/status`,
                    requestData
                );

                // 응답 확인을 위한 로그
                console.log('Response:', response.data);

                await Promise.all([
                    fetchOrderList(),
                    fetchStatusCounts()
                ]);
            }
        } catch (error) {
            // 에러 상세 정보 출력
            console.error('Error details:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config
            });
            alert('상태 업데이트 중 오류가 발생했습니다.');
        }
    };

    const orderStatuses = [
        {
            label: '결제 완료',
            count: statusCounts?.paymentCompletedCount || 0,
            description: '결제가 완료되었습니다'
        },
        {
            label: '제작 중',
            count: statusCounts?.inProductionCount || 0,
            description: '케이크를 제작중입니다'
        },
        {
            label: '제작 완료',
            count: statusCounts?.productionCompletedCount || 0,
            description: '케이크 제작이 완료되었습니다'
        },
        {
            label: '픽업 요청/배송 중',
            count: statusCounts?.deliveryCount || 0,
            description: '배송중이거나 픽업 대기중입니다'
        },
        {
            label: '수령 완료',
            count: statusCounts?.completedCount || 0,
            description: '주문이 완료되었습니다'
        }
    ];

    const handleStatusClick = (order) => {
        if (order.statusMessage === '업로드 완료') {
            window.scrollTo(0, 0);
            fetchOrderDetail(order.id);
        }
    };

    const handleBackToList = () => {
        window.scrollTo(0, 0);
        setShowDetail(false);
        setSelectedOrder(null);
    };

    const ScrollToTopLink = ({ to, className, children, state }) => {
        const handleClick = () => {
            window.scrollTo(0, 0);
        };

        return (
            <Link to={to} className={className} state={state} onClick={handleClick}>
                {children}
            </Link>
        );
    };

    const OrderList = () => (
        <div className="main-content">
            <h2>주문조회</h2>

            <section className="status-description">
                <h3>주문상태 안내</h3>
                <table className="description-table">
                    <tbody>
                        <tr><td>결제 완료</td><td>결제가 완료되었습니다.</td></tr>
                        <tr><td>제작 중</td><td>케이크를 제작중입니다.</td></tr>
                        <tr><td>제작 완료</td><td>케이크 제작이 완료되었습니다.</td></tr>
                        <tr><td>픽업 요청/배송 중</td><td>배송중이거나 픽업 대기중입니다.</td></tr>
                        <tr><td>수령 완료</td><td>수령이 완료되었습니다</td></tr>
                    </tbody>
                </table>
            </section>

            <section className="order-status-container">
                {orderStatuses.map((status, index) => (
                    <div key={index} className="status-item">
                        <div className="status-count">{status.count}</div>
                        <div className="status-label">{status.label}</div>
                        {index < orderStatuses.length - 1 && (
                            <div className="status-arrow">▶</div>
                        )}
                    </div>
                ))}
            </section>

            <section className="order-search">
                <div className="date-filter">
                    <input type="date" defaultValue="2024-10-03" />
                    <span>~</span>
                    <input type="date" defaultValue="2024-11-03" />
                    <button className="period-btn">최근 1주일</button>
                    <button className="period-btn">최근 1개월</button>
                    <button className="period-btn">최근 3개월</button>
                    <button className="period-btn">최근 6개월</button>
                </div>
                <div className="notice">
                    <p>* 주문상태 새로고침 버튼을 이용하시면 현재의 주문상태를 확인할 수 있습니다</p>
                    <p>* 제작된 제품사진/영상은 계속해서 보실 수 있습니다.</p>
                </div>
            </section>

            <section className="order-list">
                {loading && <div>로딩 중...</div>}
                {error && <div className="error-message">{error}</div>}
                {!loading && !error && (
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>등록 날짜</th>
                                <th>제품명</th>
                                <th>주문상태</th>
                                <th>제작영상/사진</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.date}</td>
                                    <td>{order.productName}</td>
                                    <td>
                                        {order.orderStatus}
                                        {["픽업 요청", "배송 중"].includes(order.orderStatus) && (
                                            <button
                                                onClick={() => updateOrderStatus(order.id)}
                                                className="confirm-receipt-btn"
                                                style={{
                                                    display: 'block',
                                                    marginTop: '5px',
                                                    padding: '5px 10px',
                                                    fontSize: '12px',
                                                    backgroundColor: '#ff6f61',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                수령 확인
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className={order.statusMessage === '업로드 완료' ? 'clickable-status' : ''}
                                            onClick={() => handleStatusClick(order)}
                                        >
                                            {order.statusMessage}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {order.actions.map((action, idx) => (
                                                action === '주문상세보기' ? (

                                                    <ScrollToTopLink
                                                        key={idx}
                                                        to={`/user/mypage/orderdetail/${order.id}`}
                                                        className="action-btn"
                                                    >
                                                        {action}
                                                    </ScrollToTopLink>
                                                ) : action === '리뷰쓰기' ? (

                                                    <ScrollToTopLink
                                                        key={idx}
                                                        to={`/user/mypage/orderdetail/${order.id}`} // 여기서 order.id 값 console.log로 확인
                                                        className="action-btn"
                                                    >
                                                        {action}
                                                        {console.log("order id:", order.id)}
                                                    </ScrollToTopLink>
                                                )

                                                    : action === '리뷰쓰기' ? (
                                                        <ScrollToTopLink
                                                            key={idx}
                                                            to="/user/cakedetail"
                                                            state={{ openReview: true }}
                                                            className="action-btn"
                                                        >
                                                            {action}
                                                        </ScrollToTopLink>
                                                    ) : (
                                                        <button key={idx} className="action-btn">
                                                            {action}
                                                        </button>
                                                    )
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );

    const OrderDetail = () => (
        <div className="order-detail-container">
            <div className="header-actions">
                <h2 className="order-title">제작 과정 상세</h2>
                <button onClick={handleBackToList} className="back-to-list">
                    주문목록으로
                </button>
            </div>

            <div className="order-info">
                <p>주문번호: {selectedOrder.id}</p>
                <p>주문일자: {selectedOrder.date}</p>
                <p>상품명: {selectedOrder.productName}</p>
            </div>

            <div className="cake-media-section">
                {selectedOrder.video && (
                    <div className="video-container">
                        <h3>제작 영상</h3>
                        <div className="video-wrapper">
                            <video controls className="cake-video">
                                <source src={selectedOrder.video} type="video/mp4" />
                                동영상을 재생할 수 없습니다.
                            </video>
                        </div>
                    </div>
                )}

                {isBroadcastActive && offer && (
                    <div className="live-stream">
                        <h3>실시간 방송</h3>
                        <WebRTCReceiver offer={offer} />
                    </div>
                )}

                {selectedOrder.image1 && (
                    <div className="photo-container">
                        <h3>제작 사진</h3>
                        <div className="photo-gallery">
                            {[
                                selectedOrder.image1,
                                selectedOrder.image2,
                                selectedOrder.image3,
                                selectedOrder.image4
                            ].filter(Boolean).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`케이크 제작 과정 ${index + 1}`}
                                    className="cake-photo"
                                    onError={(e) => {
                                        e.target.src = '/images/케이크 제작 1.jpg';
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div id="user-wrap">
            <header id="user-wrap-head">
                <Header />
            </header>
            <RightNavbar />
            <main id="user-wrap-body">
                <UserSidebar />
                {showDetail ? <OrderDetail /> : <OrderList />}
            </main>
            <footer id="user-wrap-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default UserOrder;