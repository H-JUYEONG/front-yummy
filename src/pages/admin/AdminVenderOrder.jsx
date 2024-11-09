import React, { useState } from 'react';
import "../../assets/css/admin/adminvenderorder.css";
import AdminSidebar from './include/AdminSidebar';

const AdminVenderOrder = () => {
    const [orders, setOrders] = useState([
        {
            orderId: "1001",
            venderName: "케이크 공방 A",
            userName: "유저123",
            orderDate: "2024-11-01",
            totalAmount: "150,000원",
            status: "배송 중"
        },
        {
            orderId: "1002",
            venderName: "베이커리 B",
            userName: "유저456",
            orderDate: "2024-11-02",
            totalAmount: "200,000원",
            status: "배송 준비 중"
        }
    ]);

    const [filter, setFilter] = useState({
        venderName: "",
        userName: "",
        startDate: "",
        endDate: ""
    });

    // 필터 입력값 변경 핸들러
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
        const isUserNameMatch = filter.userName === "" || order.userName.includes(filter.userName);
        const isStartDateMatch = filter.startDate === "" || new Date(order.orderDate) >= new Date(filter.startDate);
        const isEndDateMatch = filter.endDate === "" || new Date(order.orderDate) <= new Date(filter.endDate);
        return isVenderNameMatch && isUserNameMatch && isStartDateMatch && isEndDateMatch;
    });

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
                            name="userName"
                            value={filter.userName}
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
                                <th>유저 이름</th>
                                <th>주문 날짜</th>
                                <th>총 금액</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.venderName}</td>
                                    <td>{order.userName}</td>
                                    <td className="date">{order.orderDate}</td> {/* 주문 날짜를 오른쪽 정렬 */}
                                    <td className="amount">{order.totalAmount}</td> {/* 총 금액을 오른쪽 정렬 */}
                                    <td className="status">{order.status}</td> {/* 상태 값을 수평, 수직 가운데 정렬 */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminVenderOrder;
