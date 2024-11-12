import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Header from "./include/Header";
import Footer from "./include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userauditionboard.css";

const UserAuditionBoard = () => {
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
    navigate("/user/audition/ongoing");
  };

  const cardData2 = [
    {
      id: 1,
      nickname: "aaa11",
      title: "부모님 결혼기념일 기념 특별한 케이크 요청합니다.",
      author: 10,
      status: "진행중",
      src: "/images/1.png",
    },
    {
      id: 2,
      nickname: "bbb22",
      title: "첫돌 기념 사랑스러운 케이크 요청합니다.",
      author: 30,
      status: "종료",
      src: "/images/2.png",
    },
    {
      id: 3,
      nickname: "ccc33",
      title: "친구를 위한 특별한 생일 케이크 요청합니다.",
      author: 15,
      status: "진행중",
      src: "/images/3.png",
    },
    {
      id: 4,
      nickname: "ddd44",
      title: "따뜻한 연말 모임에 어울리는 케이크 요청합니다.",
      author: 7,
      status: "종료",
      src: "/images/4.png",
    },
    {
      id: 5,
      nickname: "eee55",
      title: "졸업을 축하하는 특별한 선물 케이크 요청합니다.",
      author: 20,
      status: "종료",
      src: "/images/5.png",
    },
    {
      id: 6,
      nickname: "fff66",
      title: "다크한 보석함 케이크 느낌으로 만들어주실분 구해요.",
      author: 25,
      status: "진행중",
      src: "/images/6.png",
    },
    {
      id: 7,
      nickname: "ggg77",
      title: "토이스토리 귀여운 케이크 만들어주실분 구해요.",
      author: 9,
      status: "종료",
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
              <button>전체</button>
              <button>진행중</button>
              <button>종료</button>
            </div>
            <div className="user-cake-audition-search">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="키워드 검색" />
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
            {cardData2.map((card) => (
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

          {/* Pagination */}
          <div className="user-cake-audition-pagination">
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

export default UserAuditionBoard;
