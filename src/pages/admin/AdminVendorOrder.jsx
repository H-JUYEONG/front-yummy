import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/admin/adminvendororder.css";
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminVendorOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState({
        venderName: "",
        recipientName: "",
        startDate: "",
        endDate: ""
    });

    // 페이징 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // 한 페이지당 데이터 개수
    const [maxPageButtons] = useState(10); // 한 번에 표시할 페이지 버튼 개수
    useEffect(() => {
        // API 호출
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/allOrders`)
            .then(response => {
                setOrders(response.data);
                setFilteredOrders(response.data); // 초기 상태로 모든 데이터 설정
            })
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        const filtered = orders.filter((order) => {
            const isVenderNameMatch = filter.venderName === "" || order.venderName.includes(filter.venderName);
            const isUserNameMatch = filter.recipientName === "" || order.recipientName.includes(filter.recipientName);
            const isStartDateMatch = filter.startDate === "" || new Date(order.orderDate) >= new Date(filter.startDate);
            const isEndDateMatch = filter.endDate === "" || new Date(order.orderDate) <= new Date(filter.endDate);
            return isVenderNameMatch && isUserNameMatch && isStartDateMatch && isEndDateMatch;
        });
        setFilteredOrders(filtered);
        setCurrentPage(1); // 검색 후 페이지를 1로 초기화
    };

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastOrder = currentPage * pageSize;
    const indexOfFirstOrder = indexOfLastOrder - pageSize;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredOrders.length / pageSize);
    // 페이징 버튼 계산
    const getPageNumbers = () => {
        const startPage = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
        const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    // 페이지 변경 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // "이전" 페이지 이동
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // "다음" 페이지 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="admin-venderorder-page">
                <header className="admin-venderorder-header">
                    <h1>업체별 주문 내역</h1>
                </header>

                <section>
                    <div className="filter-container">
                        <input
                            type="text"
                            name="venderName"
                            value={filter.venderName}
                            onChange={handleFilterChange}
                            placeholder="업체명으로 검색"
                            className="filter-input"
                        />
                        <input
                            type="text"
                            name="recipientName"
                            value={filter.recipientName}
                            onChange={handleFilterChange}
                            placeholder="유저명으로 검색"
                            className="filter-input"
                        />
                        <input
                            type="date"
                            name="startDate"
                            value={filter.startDate}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={filter.endDate}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                        <button className="filter-button" onClick={handleSearch}>검색</button>
                    </div>

                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>주문 번호</th>
                                <th>업체 이름</th>
                                <th>주문 날짜</th>
                                <th>상태</th>
                                <th>총 금액</th>
                                <th>유저 이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.venderName}</td>
                                        <td>{order.orderDate}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.recipientName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">검색 결과가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* 페이징 버튼 */}
                    <div className="pagination">
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            이전
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={currentPage === pageNumber ? "active" : ""}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            다음
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminVendorOrder;
