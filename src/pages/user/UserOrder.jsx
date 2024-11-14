import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../../pages/user/include/UserSidebar';
import RightNavbar from './include/RightNavbar';
import '../../assets/css/user/usermain.css';
import '../../assets/css/user/userorder.css';
import Header from './include/Header';
import Footer from './include/Footer';

const UserOrder = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 컴포넌트 마운트 시 스크롤 최상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const orderStatuses = [
        { label: '결제완료', count: 0 },
        { label: '제작중', count: 0 },
        { label: '제작완료', count: 0 },
        { label: '픽업요청/배송중', count: 0 },
        { label: '픽업/배송완료', count: 0 }
    ];

    const orderList = [
        {
            id: 1,
            date: '2024-11-01',
            productName: '조끼핏 케이크',
            orderStatus: '결제완료',
            statusMessage: '업로드 미완료',
            actions: ['주문상세보기'],
            images: [],
            video: null
        },
        {
            id: 2,
            date: '2024-10-03',
            productName: '생크림 케이크',
            orderStatus: '픽업/배송완료',
            statusMessage: '업로드 완료',
            actions: ['주문상세보기', '리뷰쓰기'],
            images: ['/images/케이크 제작 1.jpg'],
            video: '/cake-video.mp4'
        }
    ];

    // 상태 클릭 핸들러 - 스크롤 처리 추가
    const handleStatusClick = (order) => {
        if (order.statusMessage === '업로드 완료') {
            window.scrollTo(0, 0);
            setSelectedOrder(order);
            setShowDetail(true);
        }
    };

    // 목록으로 돌아가기 핸들러 - 스크롤 처리 추가
    const handleBackToList = () => {
        window.scrollTo(0, 0);
        setShowDetail(false);
        setSelectedOrder(null);
    };

    // 링크 클릭 시 스크롤 처리를 위한 컴포넌트
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

    // 주문 목록 화면
    const OrderList = () => (
        <div className="main-content">
            <h2>주문조회</h2>

            {/* Order Status Description */}
            <section className="status-description">
                <h3>주문상태 안내</h3>
                <table className="description-table">
                    <tbody>
                        <tr><td>결제대기</td><td>주문완료 후 결제내역이 미확인 상태입니다.</td></tr>
                        <tr><td>결제완료</td><td>결제 및 확인이 완료되었습니다.</td></tr>
                        <tr><td>제작중</td><td>주문한 제품이 제작중입니다.</td></tr>
                        <tr><td>픽업일(D-day)</td><td>상품이 전부 준비되었습니다! 예약하신 시간에 맞게 방문해주세요!</td></tr>
                        <tr><td>픽업완료</td><td>고객에 픽업완료 된 상태입니다.</td></tr>
                        <tr><td>주문취소</td><td>고객님이나 업체측에 의하여 취소된 주문입니다.(단, 위약금 별도)</td></tr>
                    </tbody>
                </table>
            </section>

            {/* Order Status Overview */}
            <section className="order-status-container">
                {orderStatuses.map((status, index) => (
                    <div key={index} className="status-item">
                        <div className="status-count">{status.count}</div>
                        <div className="status-label">{status.label}</div>
                        {index < orderStatuses.length - 1 && <div className="status-arrow">▶</div>}
                    </div>
                ))}
            </section>

            {/* Order Search Section */}
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

            {/* Order List Section */}
            <section className="order-list">
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
                                <td>{order.orderStatus}</td>
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
                                                    to={`/user/mypage/orderdetail`}
                                                    className="action-btn"
                                                >
                                                    {action}
                                                </ScrollToTopLink>
                                            ) : action === '리뷰쓰기' ? (
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
            </section>
        </div>
    );

    // 주문 상세 화면
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

            {/* 케이크 제작 영상/사진 섹션 */}
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

                {selectedOrder.images.length > 0 && (
                    <div className="photo-container">
                        <h3>제작 사진</h3>
                        <div className="photo-gallery">
                            {selectedOrder.images.map((image, index) => (
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