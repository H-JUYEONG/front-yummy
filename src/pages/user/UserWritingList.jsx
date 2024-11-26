import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwritinglist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { Search } from 'lucide-react';

const UserWritingList = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [searchText, setSearchText] = useState(''); // State for search input
  const [selectedStyle, setSelectedStyle] = useState('게시글'); // Default to "리뷰"
  const [selectedTab, setSelectedTab] = useState("게시글"); // Default to "글" on load

  const [debateList, setDebateList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getDebateList = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/mypage/mywriting/debatelist`, // Correct endpoint
        headers: { Authorization: `Bearer ${token}` }, // Add Authorization header
        params: {
          page, // Pass page number
          size: 10, // Default size of 10
          keyword: searchKeyword, // Search keyword
        },
      });
  
      if (response.data.result === "success") {
        const debates = response.data.apiData.data || [];
        setDebateList(debates); // Update debate list
        setTotalPages(response.data.apiData.totalPages || 1); // Update total pages
      } else {
        alert(response.data.message || "토론 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };
  const getCommentList = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/mypage/mywriting/commentlist`,
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          size: 10,
          keyword: searchKeyword,
        },
      });
  
      if (response.data.result === "success") {
        const comments = response.data.apiData.data || []; // Ensure 'data' contains the list
        setCommentList(comments); // Update the comment list state
        setTotalPages(response.data.apiData.totalPages || 1); // Update total pages for pagination
      } else {
        alert(response.data.message || "댓글 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const getReviewList = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/user/mypage/mywriting/reviewlist`,
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          size: 10,
          keyword: searchKeyword,
        },
      });
  
      if (response.data.result === "success") {
        const reviews = response.data.apiData.data || []; // Extract data
        setReviewList(reviews); // Update review list
        setTotalPages(response.data.apiData.totalPages || 1); // Update pagination
      } else {
        alert(response.data.message || "리뷰 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("리뷰 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };
  


  const writingTypeOption = ["게시글", "댓글", "리뷰"]; // Options for 글 종류 filter

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

  const handleSearch = () => {
    setCurrentPage(1);
    getDebateList(1);
    getCommentList(1);

    
    getReviewList(1);
  };

  useEffect(() => {
    getDebateList();
    getCommentList();
    getReviewList();
    console.log(reviewList.toString());
    console.log("마운트 됨");
  }, []);


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
          <div className="j-search-bar">
            <input
              type="text"
              placeholder="검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                  }
              }}
              className="j-search-input"
            />
            <button className="j-search-button" onClick={handleSearch}>
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
                  {selectedStyle === "리뷰" && (
                    <>
                      <th className="j-writing-table-num">번호</th>
                      <th className="j-writing-table-title">리뷰 상품</th>
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
                    key={item.debate_id} // Ensure `debate_id` is unique
                    onClick={() => handleRowClick(`/debate/debateview/${item.debate_id}`)}
                    className="clickable-row"
                  >
                    <td>{item.debate_id}</td>
                    <td>{item.debate_title}</td>
                    <td>{item.debate_created_at}</td>
                    <td>
                      <button className="j-action-btn">수정</button>
                      <button className="j-action-btn delete-btn">삭제</button>
                    </td>
                  </tr>
                ))}

                {selectedStyle === "댓글" &&
                  commentList.map((item) => (
                    <tr
                      key={item.debate_comment_id} // Ensure `debate_comment_id` is unique
                      onClick={() => handleRowClick(`/debate/debateview/${item.debate_id}`)}
                      className="clickable-row"
                    >
                      <td>{item.debate_comment_id}</td>
                      <td>{item.debate_comment_content.slice(0, 10)}...</td>
                      <td>{item.debate_comment_created_at}</td>
                      <td>
                        <button className="j-action-btn">수정</button>
                        <button className="j-action-btn delete-btn">삭제</button>
                      </td>
                    </tr>
                  ))}

                  {selectedStyle === "리뷰" &&
                    reviewList.map((item) => (
                      <tr
                        key={item.reviewId} // Ensure `reviewId` is unique
                        onClick={() => handleRowClick(`/board/review/${item.reviewId}`)}
                        className="clickable-row"
                      >
                        <td>{item.reviewId}</td>
                        <td>{item.productName}</td>
                        <td>{item.reviewCreatedAt}</td>
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
