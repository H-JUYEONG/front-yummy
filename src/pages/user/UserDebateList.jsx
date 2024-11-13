import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateList.css";

const UserDebateList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 예시 페이지 수

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/board/boardview`);
  };

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
            <h2>고민을 나누고 다양한 의견을 들어보는 공간입니다.</h2>
            <p>
              고민이 되는 도안이나 케이크 고민이 있다면 <strong>'고민 상담'</strong>을 통해 도움을 받아보세요!
            </p>
          </div>
          <div id="user-debate-select-option-list">
            <div className="user-debate-select-option">
              <button>전체</button>
              <button>도안 고민</button>
              <button>결과물 고민</button>
            </div>
            <div className="user-debate-search">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="게시물 검색" />
            </div>
          </div>

          <div id="user-debate-add" className="clearfix">
            <div className="user-debate-all">ALL 3</div>
            <div className="user-debate-add-btn">
              <button onClick={() => navigate("/board/debateinsert")}>
                고민 등록하기
              </button>
            </div>
          </div>

          {/* Discussion Table */}
          <table className="j-discussion-list">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => handleRowClick(1)} className="clickable-row">
                <td>1</td>
                <td>캐릭터 둘 중에 어떤 게 케이크로 만드는 게 좋을까요?</td>
                <td>도안 토론</td>
                <td>캣타워</td>
                <td>2024-11-01</td>
                <td>120</td>
              </tr>
              <tr onClick={() => handleRowClick(2)} className="clickable-row">
                <td>2</td>
                <td>제가 진상인가요?</td>
                <td>업체 토론</td>
                <td>진상왕</td>
                <td>2024-11-01</td>
                <td>85</td>
              </tr>
              <tr onClick={() => handleRowClick(3)} className="clickable-row">
                <td>3</td>
                <td>스폰지밥 케이크 무엇이 좋을까요?</td>
                <td>도안 토론</td>
                <td>뚱이</td>
                <td>2024-11-01</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="user-debate-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-arrow pagination-arrow-left"
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-page-number ${
                  currentPage === index + 1 ? "pagination-page-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-arrow pagination-arrow-right"
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
