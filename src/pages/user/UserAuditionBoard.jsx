import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userauditionboard.css";

const UserAuditionBoard = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("전체");
  const [userAuditionBoard, setUserAuditionBoard] = useState([]); // 오디션 리스트
  const [totalAllCount, setTotalAllCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;

  // 데이터 가져오기 함수
  const fetchData = async (url, page = 1, search = "") => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}${url}`,
        params: {
          page: page,
          size: itemsPerPage,
          search: search,
        },
        responseType: "json",
      });
      if (response.data.result === "success") {
        const data = response.data.apiData;
        setUserAuditionBoard(data.data || []);
        setTotalAllCount(data.totalCount || 0);
      } else {
        alert("리스트 가져오기 실패");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  // 데이터 로드 함수
  const loadAuditions = (page = 1) => {
    let url = "/api/user/audition/board";
    switch (selectedStyle) {
      case "진행중":
        url = "/api/user/audition/board/ongoing";
        break;
      case "종료":
        url = "/api/user/cakeDesign/board/end";
        break;
      default:
        url = "/api/user/audition/board";
    }
    fetchData(url, page, searchTerm);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      loadAuditions(page);
    }
  };

  // 페이지네이션 생성
  const totalPages = Math.ceil(totalAllCount / itemsPerPage);
  const generatePagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadAuditions(currentPage);
  }, [currentPage, selectedStyle]);

  // 이미지 클릭시 상세페이지로 이동
  const handleImageClick = (auditionApplicationId) => {
    navigate(`/user/audition/ongoing/${auditionApplicationId}`);
  };

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    loadAuditions(1);
  };

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* User Cake Audition Board */}
        <div className="user-cake-audition-board-list">
          <div id="user-cake-audition-tip">
            <h2>나만의 케이크를 의뢰하는 공간입니다.</h2>
            <p>
              마음에 드는 디자인을 찾았다면 <strong>'케이크 요청'</strong>을
              통해 제작을 의뢰해보세요!
            </p>
          </div>
          <div id="user-cake-audition-select-option-list">
            <div className="user-cake-audition-select-option">
              {["전체", "진행중", "종료"].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedStyle(style);
                    setCurrentPage(1);
                    setSearchTerm(""); // 검색어 초기화
                    loadAuditions(1); // 초기화된 상태로 데이터 로드
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
            <div className="user-cake-audition-search">
              <FaSearch className="search-icon" onClick={handleSearch} />
              <input
                type="text"
                placeholder="키워드 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
          <div id="user-cake-audition-add" className="clearfix">
            <div className="user-cake-audition-all">ALL 7</div>
            <div className="user-cake-audition-add-btn">
              <button onClick={() => navigate("/user/audition/add")}>
                제작 요청하기
              </button>
            </div>
          </div>
          <div className="user-cake-audition-list-grid">
            {userAuditionBoard.map((card) => (
              <div key={card.id} className="user-cake-audition-card">
                <div className="user-cake-audition-card-image">
                  <img
                    src={card.src}
                    onClick={handleImageClick}
                    alt="케이크 도안"
                  />
                  <div
                    className={`user-cake-audition-status ${
                      card.status === "진행중"
                        ? "status-in-progress"
                        : "status-completed"
                    }`}
                  >
                    <span>{card.status}</span>
                  </div>
                </div>
                <div className="user-cake-audition-card-info">
                  <h3 className="user-cake-audition-card-title">
                    {card.title}
                  </h3>
                  <p className="user-cake-audition-card-subtitle">
                    {card.nickname}
                  </p>
                  <div className="user-cake-audition-card-status">
                    <span>참여: {card.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="user-audition-pagination">
            <button
              className="user-audition-prev-page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div className="user-audition-page-numbers">
              {[1, 2, 3, "...", 67, 68].map((page, index) => (
                <button
                  key={index}
                  className={`user-audition-page-number ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="user-audition-next-page"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
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

export default UserAuditionBoard;
