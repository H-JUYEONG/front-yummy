import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwritinglist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";

const UserWritingList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const writingList = [
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate("/board/debateedit");
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    // Implement delete functionality here
    console.log("Delete clicked");
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

          {/* Category Dropdown */}
          <div className="category-dropdown">
            <label htmlFor="category-select">카테고리 선택: </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">전체</option>
              <option value="question">질문</option>
              <option value="review">리뷰</option>
              <option value="discussion">토론</option>
            </select>
          </div>

          {/* Writing List Section */}
          <section className="writing-list">
            <table className="writing-table">
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
                {writingList.map((writing) => (
                  <tr
                    key={writing.id}
                    onClick={() => handleRowClick(writing.id)}
                    className="clickable-row"
                  >
                    <td>{writing.id}</td>
                    <td>{writing.title}</td>
                    <td>{writing.likes}</td>
                    <td>{writing.date}</td>
                    <td>
                      <Link to="/board/debateedit"
                        onClick={handleEditClick}
                        className="action-btn"
                      >
                        수정
                      </Link>
                      <button
                        onClick={handleDeleteClick}
                        className="action-btn delete-btn"
                      >
                        삭제
                      </button>
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

export default UserWritingList;
