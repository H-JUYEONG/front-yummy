import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwritinglist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Search } from "lucide-react";

const UserWritingList = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const token = localStorage.getItem("token"); // 로컬 스토리지에서 사용자 토큰 가져오기

  // 상태 관리 변수들
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [selectedStyle, setSelectedStyle] = useState("게시글"); // 선택된 스타일 (게시글, 댓글 등)
  const [debateList, setDebateList] = useState([]); // 게시글 리스트
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [reviewList, setReviewList] = useState([]); // 리뷰 리스트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const writingTypeOption = ["게시글", "댓글"]; // 글 종류 옵션

  // 데이터 가져오기
  const fetchData = (url, page = 1, keyword = "") => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}${url}`, // API URL
      headers: { Authorization: `Bearer ${token}` }, // 인증 헤더
      params: { page, size: 10, keyword }, // 페이지네이션 및 검색 키워드 전달
    })
      .then((response) => {
        if (response.data.result === "success") {
          const data = response.data.apiData.data || [];
          setTotalPages(response.data.apiData.totalPages || 1); // 전체 페이지 수 설정
          if (url.includes("debatelist")) setDebateList(data); // 게시글 데이터 설정
          if (url.includes("commentlist")) setCommentList(data); // 댓글 데이터 설정
          if (url.includes("reviewlist")) setReviewList(data); // 리뷰 데이터 설정
        } else {
          alert(response.data.message || "데이터 가져오기 실패"); // 실패 시 알림
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다."); // 에러 처리
      });
  };

  // 게시글 삭제
  const deleteDebate = (debate_id) => {
    if (!token) {
      alert("로그인 후 이용하세요."); // 로그인 필요 알림
      return;
    }

    const confirmDelete = window.confirm(
      "관련된 댓글들 또한 삭제됩니다.\n정말로 이 게시글을 삭제하시겠습니까?"
    ); // 삭제 확인 알림
    if (!confirmDelete) return;

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/debate/debatedel/${debate_id}`, // 삭제 API 호출
      headers: { Authorization: `Bearer ${token}` }, // 인증 헤더
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("게시글이 성공적으로 삭제되었습니다."); // 성공 알림
          fetchData("/api/user/mypage/mywriting/debatelist", 1, searchKeyword); // 데이터 새로고침
        } else {
          alert(response.data.message || "게시글 삭제 실패"); // 실패 알림
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        alert("게시글 삭제 중 오류가 발생했습니다."); // 에러 처리
      });
  };

  // 검색 버튼 클릭 시 데이터 가져오기
  const handleSearch = () => {
    setCurrentPage(1); // 페이지 초기화
    if (selectedStyle === "게시글")
      fetchData("/api/user/mypage/mywriting/debatelist", 1, searchKeyword); // 게시글 검색
    if (selectedStyle === "댓글")
      fetchData("/api/user/mypage/mywriting/commentlist", 1, searchKeyword); // 댓글 검색
    if (selectedStyle === "리뷰")
      fetchData("/api/user/mypage/mywriting/reviewlist", 1, searchKeyword); // 리뷰 검색
  };

  // 글 종류 선택 시 데이터 새로고침
  const handleStyleSelect = (style) => {
    setSelectedStyle(style); // 스타일 업데이트
    setCurrentPage(1); // 페이지 초기화
    setSearchKeyword(""); // 검색어 초기화
    handleSearch(); // 데이터 새로고침
  };

  // 글 클릭 시 상세 페이지로 이동
  const handleRowClick = (id, type) => {
    if (type === "게시글" || type === "댓글") {
      navigate(`/debate/debateview/${id}`); // 토론 상세 페이지로 이동
    }
  };

  // 컴포넌트 마운트 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    const fetchDataForPage = () => {
      if (selectedStyle === "게시글")
        fetchData(
          "/api/user/mypage/mywriting/debatelist",
          currentPage,
          searchKeyword
        ); // 게시글 데이터 가져오기
      if (selectedStyle === "댓글")
        fetchData(
          "/api/user/mypage/mywriting/commentlist",
          currentPage,
          searchKeyword
        ); // 댓글 데이터 가져오기
    };

    fetchDataForPage(); // 데이터 호출
  }, [currentPage, selectedStyle]); // 페이지 또는 스타일 변경 시 호출

  return (
    <>
      {/* 헤더 */}
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap">
        <main id="user-wrap-body">
          <UserSidebar />
          <section id="user-wrap-main">
            <h2 className="user-write-main-title">내가 쓴 글 조회</h2>

            <div className="wishlist-container">
              {/* 검색 바 */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch(); // Enter 키 입력 시 검색
                    }
                  }}
                  className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>
                  <Search size={20} />
                </button>
              </div>

              {/* 카테고리 필터 */}
              <div className="category-filters">
                <div className="filter-group">
                  <h3>글 종류</h3>
                  <div className="filter-options">
                    {writingTypeOption.map((style) => (
                      <button
                        key={style}
                        className={`filter-btn ${
                          selectedStyle === style ? "active" : ""
                        }`}
                        onClick={() => handleStyleSelect(style)}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 글 목록 */}
              <section className="writing-list">
                <table className="writing-table">
                  <thead>
                    <tr>
                      {selectedStyle === "게시글" && (
                        <>
                          <th className="j-writing-table-num">번호</th>
                          <th className="j-writing-table-title">제목</th>
                          <th className="j-writing-table-date">작성일시</th>
                          <th className="j-writing-table-btn">관리</th>
                        </>
                      )}
                      {selectedStyle === "댓글" && (
                        <>
                          <th className="j-writing-table-num">번호</th>
                          <th className="j-writing-table-title">댓글 내용</th>
                          <th className="j-writing-table-date">작성일시</th>
                          <th className="j-writing-table-btn">관리</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStyle === "게시글" &&
                      debateList.map((item) => (
                        <tr
                          key={item.debate_id}
                          onClick={() =>
                            handleRowClick(item.debate_id, "게시글")
                          }
                          className="clickable-row"
                        >
                          <td>{item.debate_id}</td>
                          <td>{item.debate_title}</td>
                          <td>
                            {
                              new Date(item.debate_created_at)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>
                            <button
                              className="j-action-btn"
                              onClick={(event) => {
                                event.stopPropagation(); // Prevent row click
                                navigate(
                                  `/debate/debateedit/${item.debate_id}`
                                );
                              }}
                            >
                              수정
                            </button>
                            <button
                              className="j-action-btn delete-btn"
                              onClick={(event) => {
                                event.stopPropagation(); // Prevent row click
                                deleteDebate(item.debate_id);
                              }}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))}
                    {selectedStyle === "댓글" &&
                      commentList.map((item) => (
                        <tr
                          key={item.debate_comment_id}
                          onClick={() => handleRowClick(item.debate_id, "댓글")}
                          className="clickable-row"
                        >
                          <td>{item.debate_comment_id}</td>
                          <td>{item.debate_comment_content.slice(0, 10)}...</td>
                          <td>
                            {
                              new Date(item.debate_comment_created_at)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </section>

              {/* 페이지네이션 */}
              <div className="pagination">
                {/* Previous Button */}
                {currentPage > 1 && (
                  <button
                    className="prev-page"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    {"<"}
                  </button>
                )}

                {/* Page Numbers */}
                <div className="page-numbers">
                  {(() => {
                    const pageNumbers = [];
                    const maxPages = 5;
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(
                      totalPages,
                      startPage + maxPages - 1
                    );

                    if (endPage - startPage + 1 < maxPages) {
                      startPage = Math.max(1, endPage - maxPages + 1);
                    }

                    for (let i = startPage; i <= endPage; i++) {
                      pageNumbers.push(
                        <button
                          key={i}
                          className={`page-number ${
                            currentPage === i ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(i)}
                        >
                          {i}
                        </button>
                      );
                    }
                    return pageNumbers;
                  })()}
                </div>

                {/* Next Button */}
                {currentPage < totalPages && (
                  <button
                    className="next-page"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    {">"}
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="user-wrap-footer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default UserWritingList;
