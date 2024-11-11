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
  const [selectedTab, setSelectedTab] = useState("찜한 상품");

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
  ];

  const likedProducts = [
    { id: 1, title: "상품 1", likes: 10, date: "2024-11-02" },
    { id: 2, title: "상품 2", likes: 7, date: "2024-11-03" },
  ];

  const likedDesigns = [
    { id: 3, title: "도안 1", likes: 12, date: "2024-11-04" },
    { id: 4, title: "도안 2", likes: 9, date: "2024-11-05" },
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
    console.log("Delete clicked");
  };

  // Display the list based on the selected tab
  const displayList = selectedTab === "찜한 상품" ? likedProducts : likedDesigns;

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        <UserSidebar />

        <section id="user-wrap-main">
          <h2>내가 쓴 글 조회</h2>

          {/* Tab Selection */}
          <div className="j-tab-container">
            <button
              className={`j-tab ${selectedTab === "글" ? "active" : ""}`}
              onClick={() => setSelectedTab("글")}
            >
              글
            </button>
            <button
              className={`j-tab ${selectedTab === "댓글" ? "active" : ""}`}
              onClick={() => setSelectedTab("댓글")}
            >
              댓글
            </button>
          </div>

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
                {displayList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="clickable-row"
                  >
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.likes}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        onClick={(e) => handleEditClick(e)}
                        className="action-btn"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(e)}
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

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserWritingList;
