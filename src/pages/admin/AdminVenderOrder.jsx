import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/admin/adminvenderorder.css";
import AdminSidebar from './include/AdminSidebar';

const AdminVenderOrder = () => {
    const [orders, setOrders] = useState([]);

    const [filter, setFilter] = useState({
        venderName: "",
        recipientName: "",
        startDate: "",
        endDate: ""
    });
    // 페이징 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // 페이지당 데이터 개수
    // 필터 입력값 변경 핸들러


    useEffect(() => {
        // API 호출
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/allOrders`)
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    // 필터된 주문 리스트
    const filteredOrders = orders.filter((order) => {
        const isVenderNameMatch = filter.venderName === "" || order.venderName.includes(filter.venderName);
        const isUserNameMatch = filter.recipientName === "" || order.recipientName.includes(filter.recipientName);
        const isStartDateMatch = filter.startDate === "" || new Date(order.orderDate) >= new Date(filter.startDate);
        const isEndDateMatch = filter.endDate === "" || new Date(order.orderDate) <= new Date(filter.endDate);
        return isVenderNameMatch && isUserNameMatch && isStartDateMatch && isEndDateMatch;
    });

    // 현재 페이지에 해당하는 데이터 계산
    const indexOfLastOrder = currentPage * pageSize;
    const indexOfFirstOrder = indexOfLastOrder - pageSize;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    // 페이지 변경 핸들러
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <button className="filter-button">검색</button>
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
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
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
                        {Array.from({ length: Math.ceil(filteredOrders.length / pageSize) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminVenderOrder;
