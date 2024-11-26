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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("게시글");
  const [debateList, setDebateList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const writingTypeOption = ["게시글", "댓글"];

  const fetchData = (url, page = 1, keyword = "") => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}${url}`,
      headers: { Authorization: `Bearer ${token}` },
      params: { page, size: 10, keyword },
    })
      .then((response) => {
        if (response.data.result === "success") {
          const data = response.data.apiData.data || [];
          setTotalPages(response.data.apiData.totalPages || 1);
          if (url.includes("debatelist")) setDebateList(data);
          if (url.includes("commentlist")) setCommentList(data);
          if (url.includes("reviewlist")) setReviewList(data);
        } else {
          alert(response.data.message || "데이터 가져오기 실패");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      });
  };

  const deleteDebate = (debate_id) => {
    if (!token) {
      alert("로그인 후 이용하세요.");
      return;
    }
  
    const confirmDelete = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;
  
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/debate/debatedel/${debate_id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.data.result === "success") {
          alert("게시글이 성공적으로 삭제되었습니다.");
          // Refresh the debate list after deletion
          fetchData("/api/user/mypage/mywriting/debatelist", 1, searchKeyword);
        } else {
          alert(response.data.message || "게시글 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      });
  };
  

  const handleSearch = () => {
    setCurrentPage(1);
    if (selectedStyle === "게시글") fetchData("/api/user/mypage/mywriting/debatelist", 1, searchKeyword);
    if (selectedStyle === "댓글") fetchData("/api/user/mypage/mywriting/commentlist", 1, searchKeyword);
    if (selectedStyle === "리뷰") fetchData("/api/user/mypage/mywriting/reviewlist", 1, searchKeyword);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setCurrentPage(1);
    setSearchKeyword("");
    handleSearch();
  };

  const handleRowClick = (id, type) => {
    if (type === "게시글" || type === "댓글") {
      navigate(`/debate/debateview/${id}`);
    }
  };

  useEffect(() => {
    const fetchDataForPage = () => {
      if (selectedStyle === "게시글") fetchData("/api/user/mypage/mywriting/debatelist", currentPage, searchKeyword);
      if (selectedStyle === "댓글") fetchData("/api/user/mypage/mywriting/commentlist", currentPage, searchKeyword);
    };
  
    fetchDataForPage();
  }, [currentPage, selectedStyle]);
  

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        <UserSidebar />
        <section id="user-wrap-main">
          <h2>내가 쓴 글 조회</h2>

          <div className="j-writinglist-container">
            {/* 검색 바 */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="글 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
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
                      className={`j-filter-btn ${selectedStyle === style ? "active" : ""}`}
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
                      <tr key={item.debate_id} onClick={() => handleRowClick(item.debate_id, "게시글")} className="clickable-row">
                        <td>{item.debate_id}</td>
                        <td>{item.debate_title}</td>
                        <td>{new Date(item.debate_created_at).toISOString().split("T")[0]}</td>
                        <td>
                          <button
                            className="j-action-btn"
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent row click
                              navigate(`/debate/debateedit/${item.debate_id}`);
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
                      <tr key={item.debate_comment_id} onClick={() => handleRowClick(item.debate_id, "댓글")} className="clickable-row">
                        <td>{item.debate_comment_id}</td>
                        <td>{item.debate_comment_content.slice(0, 10)}...</td>
                        <td>{new Date(item.debate_comment_created_at).toISOString().split("T")[0]}</td>
                        <td></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>

            {/* 페이지네이션 */}
            <div className="j-pagination">
  {/* Previous Button */}
  {currentPage > 1 && (
    <button
      className="j-pagination-button prev"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      let endPage = Math.min(totalPages, startPage + maxPages - 1);

      if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`j-pagination-button ${currentPage === i ? "active" : ""}`}
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
      className="j-pagination-button next"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    >
      {">"}
    </button>
  )}
</div>



          </div>
        </section>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserWritingList;
