import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

// CSS 파일 임포트
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/debateList.css";

const UserDebateList = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  const token = localStorage.getItem("token"); // 사용자 인증 토큰 가져오기

  // 상태 관리
  const [debateList, setDebateList] = useState([]); // 토론 목록
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [totalCount, setTotalCount] = useState(0); // 전체 게시글 수
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리

  // 토론 목록 데이터 가져오기
  const fetchData = async (page = 1, keyword = "", category = "") => {
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
        setDebateList(data); // 토론 데이터 설정
        setTotalCount(response.data.apiData.totalCount || 0); // 전체 게시글 수 설정
        setTotalPages(response.data.apiData.totalPages || 1); // 전체 페이지 수 설정
      } else {
        alert(response.data.message || "토크 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 페이지를 첫 번째로 초기화
    fetchData(1, searchKeyword); // 검색어를 기반으로 데이터 가져오기
  };

  // 토론 상세 페이지로 이동
  const handleRowClick = (debateId) => {
    navigate(`/debate/debateview/${debateId}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 업데이트
    fetchData(pageNumber, searchKeyword); // 새로운 페이지의 데이터 가져오기

    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 설정
    setCurrentPage(1); // 페이지를 첫 번째로 초기화
    fetchData(1, searchKeyword, category); // 선택된 카테고리에 따른 데이터 가져오기
  };

  // 컴포넌트 마운트 및 페이지/카테고리 변경 시 데이터 가져오기
  useEffect(() => {
    fetchData(currentPage, searchKeyword, selectedCategory);
  }, [currentPage, selectedCategory]);

  return (
    <>
      {/* 헤더 섹션 */}

      <Header />
      <div id="user-wrap" className="text-center">
        {/* 메인 섹션 */}
        <main id="user-wrap-body" className="clearfix">
          <div className="user-debate-board-list">
            {/* 소개 섹션 */}
            <div id="user-cake-design-tip">
              <h2>고민과 의견을 나누는 공간입니다.</h2>
              <p>도안이나 케이크 고민은 케이크 토크에서 해결하세요!</p>
            </div>

            {/* 검색 및 필터 섹션 */}
            <div id="user-cake-design-select-option-list">
              {/* 카테고리 버튼 */}
              <div className="user-cake-design-select-option">
                <button
                  className={`category-button ${
                    selectedCategory === "" ? "active-option" : ""
                  }`}
                  onClick={() => handleCategoryChange("")}
                >
                  전체
                </button>
                <button
                  className={`category-button ${
                    selectedCategory === "design" ? "active-option" : ""
                  }`}
                  onClick={() => handleCategoryChange("design")}
                >
                  디자인 토크
                </button>
                <button
                  className={`category-button ${
                    selectedCategory === "vendor" ? "active-option" : ""
                  }`}
                  onClick={() => handleCategoryChange("vendor")}
                >
                  베이커리 토크
                </button>
              </div>

              {/* 검색 입력창 */}
              <div className="user-cake-design-search">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="게시글 제목 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />
              </div>
            </div>

            {/* 토크 등록 버튼 */}
            <div id="user-cake-design-add" className="clearfix">
              <div className="user-cake-design-all">ALL {totalCount}</div>
              <div className="user-cake-design-add-btn">
                <button
                  onClick={() => {
                    if (!token) {
                      alert("로그인이 필요합니다.");
                    } else {
                      navigate("/debate/debateinsert");
                    }
                  }}
                >
                  토크 등록하기
                </button>
              </div>
            </div>

            {/* 토론 목록 테이블 */}
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
                        {new Date(debate.debate_created_at)
                          .toLocaleDateString("ko-KR")
                          .replace(/\.$/, "")}
                      </td>
                      <td className="column-views">
                        {debate.debate_view_count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="user-cake-design-pagination">
              {/* 이전 페이지 버튼 */}
              {currentPage > 1 && (
                <button
                  className="user-cake-design-prev-page"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {"<"}
                </button>
              )}

              {/* 페이지 번호 */}
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
                      className={`user-cake-design-page-number ${
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

              {/* 다음 페이지 버튼 */}
              {currentPage < totalPages && (
                <button
                  className="user-cake-design-next-page"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {">"}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* 푸터 섹션 */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserDebateList;
