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

  const [authUser, setAuthUser] = useState(null); // 현재 로그인된 사용자 정보

  // 데이터 가져오기 함수
  const fetchData = async (url, page = 1, search = "") => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}${url}`,
        params: {
          page: page, // 서버에 현재 페이지 전달
          size: itemsPerPage, // 서버에 요청 크기 전달
          search: search,
        },
        responseType: "json",
      });
      if (response.data.result === "success") {
        const data = response.data.apiData;
        console.log(`Page ${page}:`, data); // 페이지별 데이터 확인
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
        url = "/api/user/audition/board/end";
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
    loadAuditions(currentPage);
  }, [currentPage, selectedStyle]);

  // 클릭시 상세페이지로 이동
  const handleAuditionClick = (auditionApplicationId) => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/audition/views/${auditionApplicationId}`,
    })
      .then((response) => {
        if (response.data.result === "success") {
          console.log("조회수 증가 성공:", response.data);
          navigate(`/user/audition/ongoing/${auditionApplicationId}`);
        }
      })
      .catch((error) => {
        console.error("조회수 증가 실패:", error);
      });
  };

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    loadAuditions(1);
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
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-design-board-list">
          <div id="user-cake-design-tip">
            <h2>나만의 케이크를 의뢰하는 공간입니다.</h2>
            <p>
              마음에 드는 디자인을 찾았다면 케이크 요청을 통해 제작을
              의뢰해보세요!
            </p>
          </div>

          <div className="user-cake-design-options-container">
            {/* 상단 옵션 */}
            <div
              id="user-cake-design-select-option-list"
              className="user-cake-design-options"
            >
              <div className="user-cake-design-select-option">
                {["전체", "진행중", "종료"].map((style) => (
                  <button
                    key={style}
                    className={selectedStyle === style ? "active-option" : ""}
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
              <div className="user-cake-design-search">
                <FaSearch className="search-icon" onClick={handleSearch} />
                <input
                  type="text"
                  placeholder="게시글 제목 검색"
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
                  <button onClick={() => handleNavigate("/user/audition/add")}>
                    제작 요청하기
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 리스트 그리드 */}
          <div className="user-cake-design-list-container">
            {userAuditionBoard.length > 0 ? (
              <div className="user-cake-design-list-grid">
                {userAuditionBoard.map((card, index) => (
                  <div
                    key={index}
                    className="user-cake-design-card"
                    onClick={() =>
                      handleAuditionClick(card.auditionApplicationId)
                    }
                  >
                    <div className="user-cake-design-card-image">
                      <img
                        src={
                          card.imageUrl ||
                          "https://placehold.co/300x200?text=No+Image"
                        }
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
                    <div className="user-cake-design-card-info">
                      <p className="user-cake-design-card-subtitle">
                        {card.userNickname}
                      </p>
                      <h3 className="user-cake-design-card-title">
                        {card.auditionApplicationTitle}
                      </h3>
                      <div className="user-cake-design-card-status">
                        <span>
                          조회 {card.auditionViewCount} &nbsp;|&nbsp; 참여{" "}
                          {card.participationCount}
                        </span>
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

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionBoard;
