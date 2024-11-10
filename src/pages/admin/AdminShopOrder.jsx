import React, { useState } from 'react';
import "../../assets/css/admin/adminshoporder.css";
import AdminSidebar from './include/AdminSidebar';

const AdminShopOrder = () => {
    const [orders, setOrders] = useState([
        {
            orderId: "001",
            customerName: "김현성",
            productName: "밀가루 (1kg)",
            quantity: 2,
            price: "10,000원",
            orderDate: "2024-11-05",
            deliveryStatus: "배송 준비 중"
        },
        {
            orderId: "002",
            customerName: "박지수",
            productName: "설탕 (500g)",
            quantity: 5,
            price: "10,000원",
            orderDate: "2024-11-06",
            deliveryStatus: "배송 중"
        },
        {
            orderId: "003",
            customerName: "이민호",
            productName: "초코칩 (200g)",
            quantity: 3,
            price: "7,500원",
            orderDate: "2024-11-07",
            deliveryStatus: "배송 완료"
        }
    ]);

    const [filterStatus, setFilterStatus] = useState("전체");

    // 배송 상태 업데이트 핸들러
    const handleUpdateStatus = (id, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === id ? { ...order, deliveryStatus: newStatus } : order
            )
        );
    };

    // 필터링된 주문 리스트 반환
    const filteredOrders = orders.filter((order) => 
        filterStatus === "전체" ? true : order.deliveryStatus === filterStatus
    );

    return (
        <div className="admin-container">
            {/* 사이드바 */}
            <AdminSidebar />
            <div className="admin-shoporder-page">
                <header className="admin-shoporder-header">
                    <h1>쇼핑몰 주문 관리</h1>
                </header>

                <section>
                    <div className="filter-container">
                        <label htmlFor="filter">배송 상태 필터:</label>
                        <select
                            id="filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="전체">전체</option>
                            <option value="배송 준비 중">배송 준비 중</option>
                            <option value="배송 중">배송 중</option>
                            <option value="배송 완료">배송 완료</option>
                        </select>
                    </div>

                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>주문 번호</th>
                                <th>고객명</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>가격</th>
                                <th>주문 날짜</th>
                                <th>배송 상태</th>
                                <th>상태 업데이트</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryStatus}</td>
                                    <td>
                                        {order.deliveryStatus !== "배송 완료" && (
                                            <div className="update-status-button-container">
                                                <button
                                                    className="update-status-button"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            order.orderId,
                                                            order.deliveryStatus === "배송 준비 중"
                                                                ? "배송 중"
                                                                : "배송 완료"
                                                        )
                                                    }
                                                >
                                                    {order.deliveryStatus === "배송 준비 중"
                                                        ? "배송 중으로 변경"
                                                        : "배송 완료로 변경"}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminShopOrder;
