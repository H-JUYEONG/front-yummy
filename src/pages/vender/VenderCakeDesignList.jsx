import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa"; // 아이콘 추가
import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignList.css";

import VenderSidebar from "./include/VenderSidebar";

const VenderCakeDesignList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 총 페이지 수 예시

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="vender-container">
        {/* 사이드바 영역 */}
        <VenderSidebar />

        {/* 메인 콘텐츠 영역 */}
        <div className="vender-content">
          <main className="cake-design-main-content">
            <section className="cake-design-list-section">
              <header className="cake-design-list-header">
                <h2 className="cake-design-list-title">도안 리스트</h2>

                <div className="cake-design-header-right">
                  <div className="cake-design-search">
                    <FaSearch className="cake-design-search-icon" />
                    <input
                      type="text"
                      placeholder="검색어를 입력하세요"
                      className="cake-design-search-input"
                    />
                  </div>

                  <div className="cake-design-button-group">
                    <button
                      className="cake-design-add-button"
                      onClick={() => navigate("/vender/cakeDesign/list")}
                    >
                      나의 도안
                    </button>
                    <button
                      className="cake-design-add-button"
                      onClick={() => navigate("/vender/cakeDesign/list")}
                    >
                      찜한 도안
                    </button>
                    <button
                      className="cake-design-add-button"
                      onClick={() => navigate("/vender/cakeDesign/add")}
                    >
                      도안 등록하기
                    </button>
                  </div>
                </div>
              </header>

              <div className="cake-design-list-imgs">
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
                <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
              </div>

              {/* 페이지 번호 및 네비게이션 */}
              <div className="cake-design-list-pages">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-icon"
                >
                  <FaAngleLeft />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`page-button ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-icon"
                >
                  <FaAngleRight />
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default VenderCakeDesignList;
