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
  const [userCakeDesignBoard, setUserCakeDesignBoard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 한 페이지에 보여줄 항목 수
  const maxVisiblePages = 10; // 한 번에 보일 페이지 번호의 최대 개수

  // axios 통신으로 데이터 가져오기
  const getUserCakeDesignBoard = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/cakeDesign/board`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        if (response.data.result === "success") {
          setUserCakeDesignBoard(response.data.apiData); // 서버에서 받아온 데이터 설정
        } else {
          alert("리스트 가져오기 실패");
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패", error);
      });
  };

  useEffect(() => {
    getUserCakeDesignBoard();
  }, []);

  // 현재 페이지의 데이터 필터링
  const paginatedData = userCakeDesignBoard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(userCakeDesignBoard.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePagination = () => {
    const pages = [];
    const startPage =
      Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const paginationNumbers = generatePagination();

  // 이미지 클릭 시 상세 페이지로 이동
  const handleImageClick = (cakeDesignId) => {
    navigate(`/user/cakeDesign/detail/${cakeDesignId}`);
  };

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        {/* User Cake Design Board */}
        <div className="user-cake-design-board-list">
          <div id="user-cake-design-tip">
            <h2>케이크 디자인을 공유하는 공간입니다.</h2>
            <p>
              마음에 드는 디자인을 찾았다면 <strong>'케이크 요청'</strong>을 통해
              제작을 의뢰해보세요!
            </p>
            <p>
              내가 올린 도안으로 주문이 이루어지면 <strong>'포인트'</strong>를
              받을 수 있어요!
            </p>
          </div>
          <div id="user-cake-design-select-option-list">
            <div className="user-cake-design-select-option">
              <button>전체</button>
              <button>최신순</button>
              <button>조회수순</button>
              <button>찜순</button>
            </div>
            <div className="user-cake-design-search">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="도안 검색" />
            </div>
          </div>
          <div id="user-cake-design-add" className="clearfix">
            <div className="user-cake-design-all">
              ALL {userCakeDesignBoard.length}
            </div>
            <div className="user-cake-design-add-btn">
              <button onClick={() => navigate("/user/cakeDesign/add")}>
                도안 등록하기
              </button>
            </div>
          </div>
          <div className="user-cake-design-list-grid">
            {paginatedData.map((card) => (
              <div key={card.id} className="user-cake-design-card">
                <div className="user-cake-design-card-image">
                  <img
                    src={card.cakeDesignImageUrl}
                    onClick={() => handleImageClick(card.cakeDesignId)}
                    alt="케이크 도안"
                  />
                  <div className="user-cake-design-card-likes">
                    <FaHeart className="heart-icon" />
                    <span>{card.cakeDesignWishlistCount}</span>
                  </div>
                </div>
                <div className="user-cake-design-card-info">
                  <h3 className="user-cake-design-card-title">{card.cakeDesignTitle}</h3>
                  <p className="user-cake-design-card-subtitle">
                    {card.userNickname}
                  </p>
                  <div className="user-cake-design-card-status">
                    <span>조회수: {card.cakeDesignViewCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="user-cake-design-pagination">
            <button
              className="user-cake-design-prev-page"
              onClick={() =>
                handlePageChange(Math.max(currentPage - maxVisiblePages, 1))
              }
              disabled={currentPage <= maxVisiblePages}
            >
              {"<<"}
            </button>
            <button
              className="user-cake-design-prev-page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div className="user-cake-design-page-numbers">
              {paginationNumbers.map((page) => (
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
            </div>
            <button
              className="user-cake-design-next-page"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
            <button
              className="user-cake-design-next-page"
              onClick={() =>
                handlePageChange(Math.min(currentPage + maxVisiblePages, totalPages))
              }
              disabled={currentPage > totalPages - maxVisiblePages}
            >
              {">>"}
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

export default UserCakeDesignBoard;
