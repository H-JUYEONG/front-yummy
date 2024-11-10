// Import libraries
import React from "react";
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateList.css";
import Header from "../include/Header";
import Footer from "../include/Footer";

const UserDebateList = () => {
  return (
    <div id="user-wrap" className="user-text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* Main Section */}
        <section id="user-wrap-main">
          {/* Search and Filter Toolbar */}
          <div className="j-discussion-toolbar">
            <select className="j-category-select">
              <option value="all">전체</option>
              <option value="design">도안 토론</option>
              <option value="vendor">업체 토론</option>
            </select>
            <div className="j-search-bar">
              <input type="text" placeholder="검색어를 입력하세요" />
              <button className="j-search-btn">검색</button>
            </div>
          </div>

          {/* Section Title and Description */}
          <h2>토론 게시판</h2>
          <p>원하는 토론 주제를 선택하거나 새 글을 작성해보세요.</p>

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
              <tr>
                <td>1</td>
                <td>첫 번째 토론 주제</td>
                <td>도안 토론</td>
                <td>작성자A</td>
                <td>2024-11-01</td>
                <td>120</td>
              </tr>
              <tr>
                <td>2</td>
                <td>두 번째 토론 주제</td>
                <td>업체 토론</td>
                <td>작성자B</td>
                <td>2024-11-01</td>
                <td>85</td>
              </tr>
              <tr>
                <td>3</td>
                <td>세 번째 토론 주제</td>
                <td>도안 토론</td>
                <td>작성자C</td>
                <td>2024-11-01</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>

          {/* Write Button */}
          <div className="j-toolbar">
            <button className="j-write-btn">글쓰기</button>
          </div>

          {/* Pagination */}
          <div className="j-pagination">
            <button className="j-page-btn">1</button>
            <button className="j-page-btn">2</button>
            <button className="j-page-btn">3</button>
            <button className="j-next-btn">다음 &gt;</button>
          </div>
        </section>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserDebateList;
