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
              고민이 되는 도안이나 케이크 고민이 있다면 <strong>'케이크 토크'</strong>을 통해 도움을 받아보세요!
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
                <th className="column-id">번호</th>
                <th className="column-title">제목</th>
                <th className="column-category">카테고리</th>
                <th className="column-author">작성자</th>
                <th className="column-date">작성일</th>
                <th className="column-views">조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => handleRowClick(1)} className="clickable-row">
                <td className="column-id">1</td>
                <td className="column-title">캐릭터 둘 중에 어떤 게 케이크로 만드는 게 좋을까요?</td>
                <td className="column-category">도안 토론</td>
                <td className="column-author">캣타워</td>
                <td className="column-date">2024-11-01</td>
                <td className="column-views">120</td>
              </tr>
              <tr onClick={() => handleRowClick(1)} className="clickable-row">
                <td className="column-id">2</td>
                <td className="column-title">제가 진상인가요?</td>
                <td className="column-category">업체 토론</td>
                <td className="column-author">진상왕</td>
                <td className="column-date">2024-11-01</td>
                <td className="column-views">85</td>
              </tr>
              <tr onClick={() => handleRowClick(1)} className="clickable-row">
                <td className="column-id">3</td>
                <td className="column-title">스폰지밥 케이크 무엇이 좋을까요?</td>
                <td className="column-category">도안 토론</td>
                <td className="column-author">뚱이</td>
                <td className="column-date">2024-11-01</td>
                <td className="column-views">300</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          <div className="j-pagination">
              <button className="j-prev-page">{"<"}</button>
              <div className="j-page-numbers">
                {[1, 2, 3, "...", 67, 68].map((page, index) => (
                  <button
                    key={index}
                    className={`j-page-number ${page === 1 ? "active" : ""}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="j-next-page">{">"}</button>
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
