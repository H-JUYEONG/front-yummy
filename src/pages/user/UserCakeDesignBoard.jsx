import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";

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
      nickname: "aaa11",
      title: "부모님 결혼기념일 기념 특별한 디자인",
      like: 10,
      views: "10",
      src: "/images/1.png",
    },
    {
      id: 2,
      nickname: "bbb22",
      title: "첫돌 기념 사랑스러운 디자인",
      like: 30,
      views: "2",
      src: "/images/2.png",
    },
    {
      id: 3,
      nickname: "ccc33",
      title: "친구를 위한 특별한 생일 디자인",
      like: 15,
      views: "6",
      src: "/images/3.png",
    },
    {
      id: 4,
      nickname: "ddd44",
      title: "따뜻한 연말 모임에 어울리는 디자인",
      like: 7,
      views: "10",
      src: "/images/4.png",
    },
    {
      id: 5,
      nickname: "eee55",
      title: "졸업을 축하하는 특별한 선물 디자인",
      like: 20,
      views: "8",
      src: "/images/5.png",
    },
    {
      id: 6,
      nickname: "fff66",
      title: "다크한 보석함 디자인",
      like: 25,
      views: "22",
      src: "/images/6.png",
    },
    {
      id: 7,
      nickname: "ggg77",
      title: "토이스토리 귀여운 디자인",
      like: 9,
      views: "5",
      src: "/images/7.png",
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
          <div id="user-cake-design-tip">
            <h2>케이크 디자인을 공유하는 공간입니다.</h2>
            <p>
              마음에 드는 디자인을 찾았다면 <strong>'케이크 요청'</strong>을
              통해 제작을 의뢰해보세요!
            </p>
          </div>
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
                    src={card.src}
                    onClick={handleImageClick}
                    alt="케이크 도안"
                  />
                  <div className="user-cake-design-card-likes">
                    <FaHeart className="heart-icon" />
                    <span>{card.like}</span>
                  </div>
                </div>
                <div className="user-cake-design-card-info">
                  <h3 className="user-cake-design-card-title">{card.title}</h3>
                  <p className="user-cake-design-card-subtitle">
                    {card.nickname}
                  </p>
                  <div className="user-cake-design-card-status">
                    <span>조회수: {card.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="user-cake-design-pagination">
            <button
              className="user-cake-design-prev-page"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div className="user-cake-design-page-numbers">
              {[1, 2, 3, "...", 67, 68].map((page, index) => (
                <button
                  key={index}
                  className={`user-cake-design-page-number ${
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
              className="user-cake-design-next-page"
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

export default UserCakeDesignBoard;
