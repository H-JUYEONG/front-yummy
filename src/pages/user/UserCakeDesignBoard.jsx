import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignBoard.css";

const UserCakeDesignBoard = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("최신순");
  const [userCakeDesignBoard, setUserCakeDesignBoard] = useState([]);
  const [totalAllCount, setTotalAllCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 12;

  const [authUser, setAuthUser] = useState(null); // 현재 로그인된 사용자 정보

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
        console.log(response.data.apiData);
        setUserCakeDesignBoard(data.data || []);
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
  const loadCakeDesigns = (page = 1) => {
    let url = "/api/user/cakeDesign/board/latest";
    switch (selectedStyle) {
      case "최신순":
        url = "/api/user/cakeDesign/board/latest";
        break;
      case "조회수순":
        url = "/api/user/cakeDesign/board/views";
        break;
      case "찜순":
        url = "/api/user/cakeDesign/board/likes";
        break;
      default:
        url = "/api/user/cakeDesign/board/latest";
    }
    fetchData(url, page, searchTerm);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      loadCakeDesigns(page);

      // 페이지 상단으로 스크롤
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  };

  // 페이지네이션 생성
  const totalPages = Math.ceil(totalAllCount / itemsPerPage);

  const generatePagination = () => {
    const pages = [];
    const pageGroupSize = 10; // 한 번에 보여줄 페이지 번호 개수

    // 현재 페이지가 속한 그룹의 시작과 끝 페이지 계산
    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    const startPage = (currentGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

    // 페이지 번호 생성
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 초기 데이터 로드
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);
    loadCakeDesigns(currentPage);
  }, [currentPage, selectedStyle]);

  // 클릭시 상세페이지로 이동
  const handleCakeDesignClick = (cakeDesignId) => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/cakeDesign/views/${cakeDesignId}`,
    })
      .then((response) => {
        if (response.data.result === "success") {
          console.log("조회수 증가 성공:", response.data);
          navigate(`/user/cakeDesign/detail/${cakeDesignId}`);
        }
      })
      .catch((error) => {
        console.error("조회수 증가 실패:", error);
      });
  };

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    loadCakeDesigns(1);
  };

  // 토큰 확인 및 페이지 이동 함수
  const handleNavigate = (path) => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 확인
    if (!token) {
      alert("로그인이 필요합니다."); // 토큰이 없으면 알림 표시
      navigate("/user/login"); // 로그인 폼으로 이동
    } else {
      navigate(path); // 토큰이 있으면 지정된 경로로 이동
    }
  };

  return (
    <>
      {/* Header */}
      <Header />
      <div id="user-wrap" className="text-center">
        {/* Main Content */}
        <main id="user-wrap-body" className="clearfix">
          <div className="user-cake-design-board-list">
            <div id="user-cake-design-tip">
              <h2>케이크 디자인을 공유하는 공간입니다.</h2>
              <p>케이크 디자인을 공유하고 포인트를 받아보세요!</p>
            </div>

            <div className="user-cake-design-options-container">
              {/* 상단 옵션 */}
              <div
                id="user-cake-design-select-option-list"
                className="user-cake-design-options"
              >
                <div className="user-cake-design-select-option">
                  {["최신순", "조회수순", "찜순"].map((style) => (
                    <button
                      key={style}
                      className={selectedStyle === style ? "active-option" : ""}
                      onClick={() => {
                        setSelectedStyle(style);
                        setCurrentPage(1);
                        setSearchTerm(""); // 검색어 초기화
                        loadCakeDesigns(1); // 초기화된 상태로 데이터 로드
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
                <div className="user-cake-design-search">
                  <FaSearch className="search-icon" onClick={handleSearch} />
                  <input
                    type="text"
                    placeholder="도안 이름 검색"
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

              {/* 추가 버튼 */}
              <div id="user-cake-design-add" className="clearfix">
                <div className="user-cake-design-all">ALL {totalAllCount}</div>
                <div className="user-cake-design-add-btn">
                  {authUser?.type !== "업체" && (
                    <button
                      onClick={() => handleNavigate("/user/cakeDesign/add")}
                    >
                      도안 등록하기
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 리스트 그리드 */}
            <div className="user-cake-design-list-container">
              {userCakeDesignBoard.length > 0 ? (
                <div className="user-cake-design-list-grid">
                  {userCakeDesignBoard.map((card, index) => (
                    <div
                      key={index}
                      className="user-cake-design-card"
                      onClick={() => handleCakeDesignClick(card.cakeDesignId)}
                    >
                      <div className="user-cake-design-card-image">
                        <img src={card.cakeDesignImageUrl} alt="케이크 도안" />
                        <div className="user-cake-design-card-likes">
                          <FaHeart className="heart-icon" />
                          <span>{card.cakeDesignWishlistCount}</span>
                        </div>
                      </div>
                      <div className="user-cake-design-card-info">
                        <p className="user-cake-design-card-subtitle">
                          {card.venderName ? (
                            <>
                              {card.venderName}{" "}
                              <span className="vendor-badge">업체</span>
                            </>
                          ) : (
                            card.userNickname || "익명"
                          )}
                        </p>
                        <h3 className="user-cake-design-card-title">
                          {card.cakeDesignTitle}
                        </h3>
                        <div className="user-cake-design-card-status">
                          <span>조회 {card.cakeDesignViewCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="user-cake-design-empty-grid">
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </div>

            {/* 페이지네이션 */}
            <div className="user-cake-design-pagination">
              {/* 이전 페이지 버튼 */}
              {currentPage > 1 ? (
                <button
                  className="user-cake-design-prev-page"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </button>
              ) : (
                <button
                  className="user-cake-design-prev-page"
                  style={{ visibility: "hidden" }}
                >
                  &lt;
                </button>
              )}

              {/* 페이지 번호 */}
              {generatePagination().map((page) => (
                <button
                  key={page}
                  className={`user-cake-design-page-number ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              {/* 다음 페이지 버튼 */}
              {currentPage < totalPages ? (
                <button
                  className="user-cake-design-next-page"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </button>
              ) : (
                <button
                  className="user-cake-design-next-page"
                  style={{ visibility: "hidden" }}
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserCakeDesignBoard;
