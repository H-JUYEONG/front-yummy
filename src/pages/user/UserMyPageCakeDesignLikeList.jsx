import React, { useEffect, useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import UserSidebar from "./include/UserSidebar";
import "../../assets/css/user/usermain.css";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";

const UserMyPageCakeDesignLikeList = () => {
  const token = localStorage.getItem("token");

  const [selectedStyle, setSelectedStyle] = useState("");
  const [userCakeDesignList, setUserCakeDesignList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // 서버로부터 도안 리스트 가져오기
  const fetchData = (url, page = 1, keyword = "") => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}${url}`,
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: page,
        size: 8, // 한 페이지당 8개 아이템
        keyword: keyword,
      },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          console.log(response.data);
          setUserCakeDesignList(response.data.apiData.content || []); // 페이징된 데이터
          setTotalPages(response.data.apiData.totalPages || 1); // 전체 페이지 수
        } else {
          alert(response.data.message || "리스트 가져오기 실패");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      });
  };

  // 데이터 가져오기 함수
  const loadCakeDesigns = (page = 1) => {
    switch (selectedStyle) {
      case "최신순":
        fetchData("/api/mypage/cakeDesign/myLikes/latest", page, searchKeyword);
        break;
      case "조회수순":
        fetchData("/api/mypage/cakeDesign/myLikes/veiws", page, searchKeyword);
        break;
      case "찜순":
        fetchData("/api/mypage/cakeDesign/myLikes/likes", page, searchKeyword);
        break;
      default:
        fetchData("/api/mypage/cakeDesign/myLikes", page, searchKeyword);
        break;
    }
  };

  // 컴포넌트가 마운트되거나 상태가 변경될 때 데이터를 가져옴
  useEffect(() => {
    loadCakeDesigns(currentPage);
  }, [currentPage, selectedStyle]);

  // 검색 핸들러
  const handleSearch = () => {
    loadCakeDesigns(1);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 스타일 선택 핸들러
  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setCurrentPage(1);
    setSearchKeyword(""); // 검색어 초기화
    loadCakeDesigns(1);
  };

  return (
    <div id="user-wrap">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body">
        <UserSidebar />
        <section id="user-wrap-main">
          <h2 className="user-write-main-title">내가 찜한 도안</h2>
          <div className="wishlist-container">
            {/* 검색 바 */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="도안 검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // 폼 제출 방지
                    handleSearch(); // 엔터 눌렀을 때만 검색 실행
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
                <h3>정렬 옵션</h3>
                <div className="filter-options">
                  {["최신순", "조회수순", "찜순"].map((style) => (
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

            {/* 상품 그리드 - 서버에서 가져온 데이터로 렌더링 */}
            <div className="products-grid">
              {userCakeDesignList.length > 0 ? (
                userCakeDesignList.map((cakeDesign, index) => (
                  <Link
                    to={`/user/cakeDesign/detail/${cakeDesign.cakeDesignId}`}
                    key={index}
                    className="product-card"
                  >
                    <div className="product-image">
                      <img
                        src={cakeDesign.cakeDesignImageUrl}
                        alt={cakeDesign.cakeDesignTitle}
                      />
                    </div>
                    <div className="product-infos">
                      <h3>{cakeDesign.cakeDesignTitle}</h3>
                      <p>{cakeDesign.userNickname}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>리스트가 없습니다.</p>
              )}
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
              <button
                className="prev-page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                style={{ opacity: currentPage === 1 ? 0 : 1 }}
              >
                {"<"}
              </button>

              <div className="page-numbers">
                {(() => {
                  const pageNumbers = [];
                  const maxPages = 5; // 한 번에 보여줄 최대 페이지 번호 수
                  let startPage = Math.max(1, currentPage - 2);
                  let endPage = Math.min(totalPages, startPage + maxPages - 1);

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

              <button
                className="next-page"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                style={{ opacity: currentPage === totalPages ? 0 : 1 }}
              >
                {">"}
              </button>
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

export default UserMyPageCakeDesignLikeList;
