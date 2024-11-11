import React, { useState } from "react";
import { Link } from 'react-router-dom';

import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userorderlist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

const UserOrderList = () => {
  const navigate = useNavigate();

  const orderList = [
    {
      id: 13,
      title: "스폰지밥 케이크 골라주세요",
      likes: 5,
      date: "2024-11-01",
      actions: ["수정", "삭제"],
    },
    {
      id: 12,
      title: "둘중 어떤게 좋을까요?",
      likes: 2,
      date: "2024-10-25",
      actions: ["수정", "삭제"],
    },
    // Add more list items as necessary
  ];

  const handleRowClick = (id) => {
    navigate(`/board/boardview`);
  };

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Section */}
        <section id="user-wrap-main">
          <h2>내가 쓴 글 조회</h2>

          {/* Order List Section */}
          <section className="order-list">
            <table className="order-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>추천수</th>
                  <th>작성일시</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleRowClick(order.id)}
                    className="clickable-row"
                  >
                    <td>{order.id}</td>
                    <td>{order.title}</td>
                    <td>{order.likes}</td>
                    <td>{order.date}</td>
                    <td>
                      <Link to="/board" className="action-btn">수정</Link>
                      <button className="action-btn delete-btn">삭제</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserOrderList;
