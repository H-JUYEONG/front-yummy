import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateList.css";
import bubuDuduGif from "../../assets/images/bubu-dudu-sseeyall.gif";

const UserDebateList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [debateList, setDebateList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");


  // Fetch Debate List
  const fetchData = async (page = 1, keyword = "", category = "" ) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/debate/board`,
        params: {
          page,
          size: 10,
          keyword,
          category,
        },
      });

      if (response.data.result === "success") {
        const data = response.data.apiData.data || [];
        setDebateList(data);
        setTotalCount(response.data.apiData.totalCount || 0);
        setTotalPages(response.data.apiData.totalPages || 1);
      } else {
        alert(response.data.message || "토크 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // Handle Search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchKeyword);
  };

  // Navigate to Debate Detail
  const handleRowClick = (debateId) => {
    navigate(`/debate/debateview/${debateId}`);
  };

  // Change Page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber, searchKeyword);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page for new category
    fetchData(1, searchKeyword, category); // Fetch data for the selected category
  };
  

  // Fetch Debate List on Mount and Pagination Change
  useEffect(() => {
    fetchData(currentPage, searchKeyword, selectedCategory);
  }, [currentPage, searchKeyword, selectedCategory]);
  

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <div className="user-debate-board-list">
          <div id="user-debate-tip">
            {/* GIF */}
            <div className="gif-container">
              <img src={bubuDuduGif} alt="부부두두 GIF" className="right-gif" />
            </div>
            <h2>고민을 나누고 다양한 의견을 들어보는 공간입니다.</h2>
            <p>
              고민이 되는 도안이나 케이크 고민이 있다면 <strong>'케이크 토크'</strong>을 통해 도움을 받아보세요!
            </p>
          </div>

          {/* Search and Filter */}
          <div id="user-debate-select-option-list">
          <div className="user-debate-select-option">
            <button
              className={selectedCategory === "" ? "active-category" : ""}
              onClick={() => handleCategoryChange("")}
            >
              전체 토크
            </button>
            <button
              className={selectedCategory === "디자인 토크" ? "active-category" : ""}
              onClick={() => handleCategoryChange("design")}
            >
              디자인 토크
            </button>
            <button
              className={selectedCategory === "베이커리 토크" ? "active-category" : ""}
              onClick={() => handleCategoryChange("vendor")}
            >
              베이커리 토크
            </button>
          </div>
            <div className="user-debate-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="게시물 검색 Enter를 누르세요"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="search-input"
              />
            </div>
          </div>

          {/* Add Button */}
          <div id="user-debate-add" className="clearfix">
            <div className="user-debate-all-count">ALL {totalCount}</div>
            <div className="user-debate-add-btn">
            <button
              onClick={() => {
                if (!token) {
                  alert("로그인 후 사용하세요");
                } else {
                  navigate("/debate/debateinsert");
                }
              }}
            >
              토크 등록하기
            </button>
            </div>
          </div>

          {/* Discussion Table */}
          <table className="j-discussion-list">
            <thead>
              <tr>
                <th className="column-id">번호</th>
                <th className="column-title">제목</th>
                <th className="column-category">카테고리</th>
                <th className="column-author">작성자</th>
                <th className="column-date">작성일</th>
                <th className="column-views">조회수</th>
              </tr>
            </thead>
            <tbody>
              {debateList.length > 0 ? (
                debateList.map((debate, index) => (
                  <tr
                    key={debate.debate_id}
                    onClick={() => handleRowClick(debate.debate_id)}
                    className="clickable-row"
                  >
                    <td className="column-id">{index + 1}</td>
                    <td className="column-title">{debate.debate_title}</td>
                    <td className="column-category">
                      {debate.debate_category === "vendor"
                        ? "베이커리 토크"
                        : debate.debate_category === "design"
                        ? "케이크 토크"
                        : debate.debate_category}
                    </td>
                    <td className="column-author">{debate.user_nickname}</td>
                    <td className="column-date">
                      {new Date(debate.debate_created_at).toLocaleDateString()}
                    </td>
                    <td className="column-views">{debate.debate_view_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    등록된 토크이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="j-pagination">
            {/* Previous Button */}
            {currentPage > 1 && (
              <button
                className="j-prev-page"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {"<"}
              </button>
            )}

            {/* Page Numbers */}
            {(() => {
              const pageNumbers = [];
              const maxPages = 5;
              let startPage = Math.max(1, currentPage - 2);
              let endPage = Math.min(totalPages, startPage + maxPages - 1);

              if (endPage - startPage + 1 < maxPages) {
                startPage = Math.max(1, endPage - maxPages + 1);
              }

              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                  <button
                    key={i}
                    className={`j-pagination-button ${
                      currentPage === i ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(i)}
                  >
                    {i}
                  </button>
                );
              }
              return pageNumbers;
            })()}

            {/* Next Button */}
            {currentPage < totalPages && (
              <button
                className="j-next-page"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateList;
