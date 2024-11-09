import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "../include/Header";
import Footer from "../include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignBoard.css";

const UserCakeDesignBoard = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 예시 페이지 수

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 이미지 클릭시 상세페이지로 이동
  const handleImageClick = () => {
    navigate("/user/cakeDesign/detail");
  };

  const cardData = [
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    {
      id: 1,
      title: "dud9902",
      subtitle: "아버지 테마의 도안이에요",
      views: 30,
      likes: 1,
    },
    // 다른 카드 데이터도 여기에 추가
  ];

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
          <div id="user-cake-design-select-option-list">
            <div className="user-cake-design-select-option">
              <button>최신순</button>
              <button>좋아요순</button>
              <button>조회수순</button>
            </div>
            <div className="user-cake-design-search">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="도안 검색" />
            </div>
          </div>
          <div id="user-cake-design-add" className="clearfix">
            <div className="user-cake-design-all">ALL 7</div>
            <div className="user-cake-design-add-btn">
              <button onClick={() => navigate("/user/cakeDesign/add")}>
                도안 등록하기
              </button>
            </div>
          </div>
          <div className="user-cake-design-list-grid">
            {cardData.map((card) => (
              <div key={card.id} className="user-cake-design-card">
                <div className="user-cake-design-card-image">
                  <img
                    src="/images/2호_일반케이크.jpg"
                    onClick={handleImageClick}
                    alt="케이크 도안"
                  />
                  <div className="user-cake-design-card-likes">
                    <FaHeart className="heart-icon" />
                    <span>10</span>
                  </div>
                </div>
                <div className="user-cake-design-card-info">
                  <h3 className="user-cake-design-card-title">
                    축하케이크 도안~
                  </h3>
                  <p className="user-cake-design-card-subtitle">dud9902</p>
                  <div className="user-cake-design-card-stats">
                    <span>조회수: {card.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="user-cake-design-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-arrow pagination-arrow-left"
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-page-number ${
                  currentPage === index + 1 ? "pagination-page-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-arrow pagination-arrow-right"
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

export default UserCakeDesignBoard;
