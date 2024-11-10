import React from "react";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userorderlist.css";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { useNavigate } from "react-router-dom";

const UserOrderList = () => {
  const navigate = useNavigate();

  const orderList = [
    {
      id: 13,
      title: "기념일 이벤트 1",
      likes: 5,
      date: "2024-11-01",
      actions: ["수정", "삭제"],
    },
    {
      id: 12,
      title: "기념일 이벤트 2",
      likes: 2,
      date: "2024-10-25",
      actions: ["수정", "삭제"],
    },
    // Add more list items as necessary
  ];

  const handleRowClick = (id) => {
    navigate(`/event/${id}`);
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
          <h2>기념일 조회</h2>

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
                      <button className="action-btn">수정</button>
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
