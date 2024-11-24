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

  // Fetch Debate List
  const getDebateList = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/debate/board`,
        params: {
          page,
          size: 10,
          keyword: searchKeyword,
        },
      });
      
  
      if (response.data.result === "success") {
        const debates = response.data.apiData.data || []; // Use `data` instead of `content`
        setDebateList(debates);
        setTotalPages(response.data.apiData.totalPages || 1);
      } else {
        alert(response.data.message || "토론 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };
  

  // Handle Search
  const handleSearch = () => {
    setCurrentPage(1);
    getDebateList(1);
  };

  // Navigate to Debate Detail
  const handleRowClick = (debateId) => {
    navigate(`/debate/debateview/${debateId}`);
  };

  // Change Page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getDebateList(pageNumber);
  };

  // Fetch Debate List on Mount and Pagination Change
  useEffect(() => {
    getDebateList(currentPage);
  }, [currentPage]);

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
              <button>전체</button>
              <button>디자인 토크</button>
              <button>업체 토론</button>
            </div>
            <div className="user-debate-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="게시물 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="search-input"
              />
              <button className="search-button" onClick={handleSearch}>
                검색
              </button>
            </div>
          </div>

          {/* Add Button */}
          <div id="user-debate-add" className="clearfix">
            <div className="user-debate-all-count">ALL {debateList.length}</div>
            <div className="user-debate-add-btn">
              <button onClick={() => navigate("/debate/debateinsert")}>
                고민 등록하기
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
                  console.log(debate), // Debug each debate
                  <tr key={debate.debate_id} onClick={() => handleRowClick(debate.debate_id)} className="clickable-row">
                    <td className="column-id">{debate.debate_id}</td>
                    <td className="column-title">{debate.debate_title}</td>
                    <td className="column-category">{debate.debate_category}</td>
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
                    등록된 토론이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>

          </table>

          {/* Pagination */}
          <div className="j-pagination">
            <button
              className="j-prev-page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`j-page-number ${currentPage === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="j-next-page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {">"}
            </button>
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
