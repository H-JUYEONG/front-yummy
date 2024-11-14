import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignList.css";

import VenderSidebar from "./include/VenderSidebar";
import VenderHeader from './include/VenderHeader';

const VenderCakeDesignList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Navigate to detail page on image click
  const handleImageClick = () => {
    navigate("/vender/cakeDesign/detail");
  };

  // 상품 리스트 데이터 예시
  const products = [
    {
      name: "초콜릿 케이크",
      type: "일반 케이크",
      price: "30,000원",
      description: "촉촉, 풍부한 초콜릿 맛",
      status: "노출",
    },
    {
      name: "바닐라 생크림 케이크",
      type: "생크림 케이크",
      price: "32,000원",
      description: "부드러운 생크림, 클래식한 맛",
      status: "임시저장",
    },
    {
      name: "바닐라 비건 케이크",
      type: "비건 케이크",
      price: "32,000원",
      description: "부드러운 비건 생크림, 클래식한 맛",
      status: "미노출",
    },
    // ... 더 많은 상품 데이터 추가 가능
  ];

  // 검색어에 따라 필터링된 상품 리스트
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 현재 페이지에 맞는 데이터 가져오기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <div className="vender-container">
        <div className="vender-content-wrapper">
          <VenderSidebar />
          <div className="vender-content">
            <header className="vender-header ">
              <VenderHeader />
            </header>
            <main className="product-list-main-content">
              <section className="product-list">
                <header className="product-list-header">
                  <h2 className="product-list-title">나의 도안 리스트</h2>
                  <div className="button-group">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="검색어 입력"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      style={{ backgroundColor: "#27ae60" }}
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/list")}
                    >
                      나의 도안
                    </button>
                    <button
                      style={{ backgroundColor: "#27ae60" }}
                      className="add-button btn-colors"
                      onClick={() => navigate("/vender/cakeDesign/like/list")}
                    >
                      찜한 도안
                    </button>
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/add")}
                    >
                      도안 등록하기
                    </button>
                  </div>
                </header>

                <div className="cake-design-list-imgs">
                  <div className="vender-cake-design-list-box">
                    <img
                      src="/images/7.png"
                      alt="케이크 이미지"
                      onClick={handleImageClick}
                    />
                    <p className="vender-cake-design-title">
                      토이스토리 컨셉 도안
                    </p>
                  </div>

                  <div className="vender-cake-design-list-box">
                    <img
                      src="/images/7.png"
                      alt="케이크 이미지"
                      onClick={handleImageClick}
                    />
                    <p className="vender-cake-design-title">
                      토이스토리 컨셉 도안
                    </p>
                  </div>

                  <div className="vender-cake-design-list-box">
                    <img
                      src="/images/7.png"
                      alt="케이크 이미지"
                      onClick={handleImageClick}
                    />
                    <p className="vender-cake-design-title">
                      토이스토리 컨셉 도안
                    </p>
                  </div>

                  <div className="vender-cake-design-list-box">
                    <img
                      src="/images/7.png"
                      alt="케이크 이미지"
                      onClick={handleImageClick}
                    />
                    <p className="vender-cake-design-title">
                      토이스토리 컨셉 도안
                    </p>
                  </div>
                </div>

                {/* 페이징 네비게이션 */}
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderCakeDesignList;
