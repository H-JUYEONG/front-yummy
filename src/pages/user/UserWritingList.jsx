import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwritinglist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Search } from 'lucide-react';

const UserWritingList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(''); // State for search input
  const [selectedStyle, setSelectedStyle] = useState('리뷰'); // Default to "리뷰"
  const [selectedTab, setSelectedTab] = useState("글"); // Default to "글" on load

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

  const writingTypeOption = ["리뷰", "게시글", "뎃글"]; // Options for 글 종류 filter

  const handleRowClick = (id) => {
    navigate(`/board/boardview`);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(prevStyle => prevStyle === style ? '' : style);
  };

  const handleSearchTextChange = (e) => setSearchText(e.target.value);
  const handleSearchClick = () => {
    console.log("Searching for:", searchText);
    // Implement search functionality here
  };

  // Display the list based on the selected tab
  const displayList = selectedTab === "글" ? likedProducts : likedDesigns;

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        <UserSidebar />

        <section id="user-wrap-main">
          <h2>내가 쓴 글 조회</h2>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchText}
              onChange={handleSearchTextChange}
              className="search-input"
            />
            <button className="search-button" onClick={handleSearchClick}>
              <Search size={20} />
            </button>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            <div className="filter-group">
              <h3>글 종류</h3>
              <div className="filter-options">
                {writingTypeOption.map((style) => (
                  <button
                    key={style}
                    className={`filter-btn ${selectedStyle === style ? 'active' : ''}`}
                    onClick={() => handleStyleSelect(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Writing List Section */}
          <section className="writing-list">
            <table className="writing-table">
              <thead>
                <tr>
                  <th className="j-writing-table-num">번호</th>
                  <th className="j-writing-table-title">제목</th>
                  <th className="j-writing-table-date">작성일시</th>
                  <th className="j-writing-table-btn">관리</th>
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
                    <td>{item.date}</td>
                    <td>
                      <button className="j-action-btn">수정</button>
                      <button className="j-action-btn delete-btn">삭제</button>
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
