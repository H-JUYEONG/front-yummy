import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/purchasedproducts.css';
import SidebarWrapper from './include/SidebarWrapper';
import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';

const API_URL = process.env.REACT_APP_API_URL; // 환경변수로 API URL 설정

const VenderPurchasedProducts = () => {
    const [orders, setOrders] = useState([]); // 주문 데이터 상태
    const [filter, setFilter] = useState("all"); // 필터 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const ordersPerPage = 5; // 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [sortOrder, setSortOrder] = useState("asc"); // 정렬 상태 추가 ("asc" 또는 "desc")
    const [authUser] = useState(() => {
        const user = localStorage.getItem('authUser');
        return user ? JSON.parse(user) : null;
    });

    const venderId = authUser?.vender_id || null; // 로그인된 유저의 venderId 가져오기
    // 윈도우 리사이즈 핸들러
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 주문 데이터 불러오기
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/api/vender/orders`, {
                    params: { venderId }, // venderId는 필요에 따라 동적으로 설정 가능
                });
                setOrders(response.data);
            } catch (error) {
                console.error('주문 데이터를 가져오는 중 오류 발생:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);

        const sortedOrders = [...orders].sort((a, b) => {
            const dateA = new Date(a.desiredDeliveryDate || a.desiredPickupDatetime);
            const dateB = new Date(b.desiredDeliveryDate || b.desiredPickupDatetime);

            return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setOrders(sortedOrders);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 초기화
    };

    const filteredOrders = filter === "all" ? orders : orders.filter(order => order.orderStatus === filter);

    // 현재 페이지에 표시할 항목 계산
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // 페이지 번호 계산
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // 현재 페이지에 표시할 번호의 범위 계산
    const maxPageNumbersToShow = 5; // 최대 표시할 페이지 번호 수
    const currentGroup = Math.ceil(currentPage / maxPageNumbersToShow); // 현재 그룹 계산
    const startPage = (currentGroup - 1) * maxPageNumbersToShow + 1;
    const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    // 현재 그룹의 페이지 번호 배열 생성
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (isLoading) {
        return <div className="loading">데이터를 불러오는 중...</div>;
    }

    return (

        <SidebarWrapper>
            <div className="vender-container">
                <div className="vender-content-wrapper">
                    <VenderSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <div className="vender-content">
                        <header className="vender-header">
                            <VenderHeader />
                        </header>
                        <main className="vender-order-list-main-content">
                            <section className="vender-order-list">
                                <header className="order-list-header">
                                    <h2>주문 리스트</h2>
                                    <div className="vender-filter-section">
                                        <label htmlFor="order-status-filter">상태별 보기:</label>
                                        <select id="order-status-filter" value={filter} onChange={handleFilterChange}>
                                            <option value="all">전체</option>
                                            <option value="결제 완료">결제 완료</option>
                                            <option value="제작 중">제작 중</option>
                                            <option value="제작 완료">제작 완료</option>
                                            <option value="픽업 요청">픽업 요청</option>
                                            <option value="배송 중">배송 중</option>
                                            <option value="수령 완료">수령 완료</option>
                                        </select>
                                    </div>
                                </header>
                                <table className="vender-order-table">
                                    <thead>
                                        <tr>
                                            <th>주문 번호</th>
                                            <th>상품명</th>
                                            <th>주문일</th>
                                            <th onClick={handleSort} style={{ cursor: "pointer" }}>
                                                요청일 {sortOrder === "asc" ? "▲" : "▼"}
                                            </th>
                                            <th>수령 방법</th>
                                            <th>상태</th>
                                            <th>상세 보기</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map(order => {
                                            const requestDate = order.desiredDeliveryDate || order.desiredPickupDatetime || 'N/A'; // 요청일 통합 로직
                                            return (
                                                <tr key={order.orderId} data-status={order.orderStatus}>
                                                    <td data-label="주문 번호">{order.orderId}</td>
                                                    <td data-label="상품명">{order.productName}</td>
                                                    <td data-label="주문일">{order.orderDate}</td>
                                                    <td data-label="요청일">{requestDate}</td> {/* 요청일 표시 */}
                                                    <td data-label="수령 방법">{order.deliveryMethod}</td>
                                                    <td data-label="상태">{order.orderStatus}</td>
                                                    <td data-label="상세 보기">
                                                        {order.orderId ? (
                                                            <button onClick={() => navigate(`/vender/purchasedproductsdetail/${order.orderId}`)}>
                                                                보기
                                                            </button>
                                                        ) : (
                                                            <span>주문 ID 없음</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {/* 페이지네이션 영역 */}
                                <div className="pagination">
                                    {startPage > 1 && (
                                        <button onClick={() => handlePageChange(startPage - 1)}>이전</button>
                                    )}
                                    {pageNumbers.map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                    {endPage < totalPages && (
                                        <button onClick={() => handlePageChange(endPage + 1)}>다음</button>
                                    )}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </SidebarWrapper>
    );
};

export default VenderPurchasedProducts;
