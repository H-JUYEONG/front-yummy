import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/all.css';
import '../../assets/css/vender/vender.css';
import '../../assets/css/vender/purchasedproducts.css';

import VenderSidebar from './include/VenderSidebar';
import VenderHeader from './include/VenderHeader';
const VenderPurchasedProducts = () => {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const ordersPerPage = 5; // 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const orders = [
        { id: 1001, customerName: "김철수", customerId: "user123", productName: "초콜릿 케이크", orderDate: "2024-11-10", requestDate: "2024-11-15", receiveMethod: "픽업", status: "제작 중" },
        { id: 1000, customerName: "이영희", customerId: "user456", productName: "딸기 케이크", orderDate: "2024-10-05", requestDate: "2024-10-10", receiveMethod: "배송", status: "배송 완료" },
        { id: 1002, customerName: "박민수", customerId: "user789", productName: "바닐라 케이크", orderDate: "2024-11-12", requestDate: "2024-11-18", receiveMethod: "배송", status: "주문 완료" },
        { id: 1003, customerName: "최영수", customerId: "user234", productName: "초코 무스 케이크", orderDate: "2024-11-13", requestDate: "2024-11-19", receiveMethod: "픽업", status: "결제 완료" },
        { id: 1004, customerName: "홍길동", customerId: "user567", productName: "레몬 케이크", orderDate: "2024-11-14", requestDate: "2024-11-20", receiveMethod: "픽업", status: "픽업 완료" },
        // 더 많은 주문 데이터 추가 가능
    ];

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 초기화
    };

    const filteredOrders = filter === "all" ? orders : orders.filter(order => order.status === filter);

    // 현재 페이지에 표시할 항목 계산
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // 페이지 번호 계산
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="vender-container">
            <div className="vender-content-wrapper">
                <VenderSidebar />
                <div className="vender-content">
                    <header className="vender-header ">
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
                                        <option value="주문 완료">주문 완료</option>
                                        <option value="제작 중">제작 중</option>
                                        <option value="결제 완료">결제 완료</option>
                                        <option value="배송 완료">배송 완료</option>
                                        <option value="픽업 완료">픽업 완료</option>
                                    </select>
                                </div>
                            </header>
                            <table className="vender-order-table">
                                <thead>
                                    <tr>
                                        <th>주문 번호</th>
                                        <th>고객명</th>
                                        <th>고객 아이디</th>
                                        <th>상품명</th>
                                        <th>주문 날짜</th>
                                        <th>수령 요청일자</th>
                                        <th>수령 방법</th>
                                        <th>상태</th>
                                        <th>상세 보기</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map(order => (
                                        <tr key={order.id} data-status={order.status}>
                                            <td>{order.id}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.customerId}</td>
                                            <td>{order.productName}</td>
                                            <td>{order.orderDate}</td>
                                            <td>{order.requestDate}</td>
                                            <td>{order.receiveMethod}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <button onClick={() => navigate(`/vender/purchasedproductsdetail`)}>보기</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* 페이지네이션 영역 */}
                            <div className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default VenderPurchasedProducts;
