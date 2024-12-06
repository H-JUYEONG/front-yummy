import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "../../../assets/css/user/userdebatemodal.css";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDebateModal = ({ onSelectImage, onClose }) => {
  const token = localStorage.getItem("token");

  const [selectedTab, setSelectedTab] = useState("찜한 상품"); // 기본적으로 "찜한 상품" 탭 선택
  const [likedType, setLikedType] = useState("Product"); // "찜한 상품"으로 초기 타입 설정
  const [likedID, setLikedID] = useState(""); // 찜한 상품 또는 도안의 ID 저장
  const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리 필터

  /* 검색과 페이지네이션 관련 상태 변수 */
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const [likedProducts, setLikedProducts] = useState([]); // 찜한 상품 리스트
  const [likedDesigns, setLikedDesigns] = useState([]); // 찜한 도안 리스트

  // 찜한 상품 데이터 가져오기
  const getLikedProducts = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/debate/debateinsert/productmodal`,
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰
        },
        params: {
          page: page,
          size: 8,
          keyword: searchKeyword, // 검색 키워드 필터
        },
        responseType: "json",
      });

      if (response.data.result === "success") {
        console.log("위시리스트 데이터:", response.data.apiData);
        const products = response.data.apiData.content || [];
        const validProducts = products.filter(
          (product) => product && product.productId // 유효한 상품 필터링
        );
        setLikedProducts(validProducts); // 찜한 상품 설정
        setTotalPages(response.data.apiData.totalPages || 1); // 총 페이지 수 설정
      } else {
        alert(response.data.message || "상품 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 찜한 도안 데이터 가져오기
  const getLikedDesign = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/debate/debateinsert/designmodal`,
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰
        },
        params: {
          page: page,
          size: 8,
          keyword: searchKeyword, // 검색 키워드 필터
        },
        responseType: "json",
      });

      if (response.data.result === "success") {
        console.log("위시리스트 데이터:", response.data.apiData);
        const design = response.data.apiData.content || [];
        const validDesign = design.filter(
          (design) => design && design.cake_design_id // 유효한 도안 필터링
        );
        setLikedDesigns(validDesign); // 찜한 도안 설정
        setTotalPages(response.data.apiData.totalPages || 1); // 총 페이지 수 설정
      } else {
        alert(response.data.message || "상품 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 컴포넌트 마운트 및 currentPage 변경 시 데이터 로드
  useEffect(() => {
    getLikedProducts(currentPage); // 찜한 상품 데이터 로드
    getLikedDesign(currentPage); // 찜한 도안 데이터 로드
    console.log(likedDesigns, toString());
  }, [currentPage]);

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1); // 페이지 초기화
    getLikedProducts(1); // 검색 결과 가져오기
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl, likedType, likedID) => {
    console.log("Modal image click:", { imageUrl, likedType, likedID }); // 디버깅 로그
    onSelectImage(imageUrl, likedType, likedID); // 선택된 이미지 전달
    onClose(); // 모달 닫기
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 변경
  };

  return (
    <div className="j-modal-container">
      <div className="j-modal-content">
        <button onClick={onClose} className="j-modal-close-btn">
          X
        </button>
        <h2>이미지 선택</h2>

        {/* "찜한 상품"과 "찜한 도안" 탭 */}
        <div className="j-tab-container">
          <button
            className={`j-tab ${selectedTab === "찜한 상품" ? "active" : ""}`}
            onClick={() => {
              setSelectedTab("찜한 상품"); // 탭 변경
              setLikedType("Product"); // 타입 설정
            }}
          >
            찜한 상품
          </button>
          <button
            className={`j-tab ${selectedTab === "찜한 도안" ? "active" : ""}`}
            onClick={() => {
              setSelectedTab("찜한 도안"); // 탭 변경
              setLikedType("Design"); // 타입 설정
            }}
          >
            찜한 도안
          </button>
        </div>

        {/* 검색 바 */}
        <div className="j-search-category-container">
          <div className="j-search-bar">
            <input
              type="text"
              placeholder="검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)} // 검색 키워드 업데이트
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch(); // 엔터 키로 검색 실행
                }
              }}
              className="j-search-input"
            />
            <button className="j-search-button" onClick={handleSearch}>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* 상품 및 도안 그리드 */}
        <div className="j-products-grid">
          {selectedTab === "찜한 상품" ? (
            likedProducts.length > 0 ? (
              likedProducts.map((product) => (
                <div
                  key={product.productId}
                  className="j-product-card"
                  onClick={() =>
                    handleImageClick(
                      product.productImageUrl,
                      "Product",
                      product.productId
                    )
                  }
                >
                  <div className="j-product-image">
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                    />
                  </div>
                  <div className="j-product-info">
                    <h3>{product.productName}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p>찜한 상품이 없습니다.</p>
            )
          ) : likedDesigns.length > 0 ? (
            likedDesigns.map((design) => (
              <div
                key={design.cake_design_id}
                className="j-product-card"
                onClick={() =>
                  handleImageClick(
                    design.cake_design_image_url,
                    "Design",
                    design.cake_design_id
                  )
                }
              >
                <div className="j-product-image">
                  <img src={design.cake_design_image_url} alt="Design Image" />
                </div>
                <div className="j-product-info">
                  <h3>{design.cake_design_title || "Untitled Design"}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>찜한 도안이 없습니다.</p>
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="j-pagination">
          {/* < 버튼은 현재 페이지가 1보다 클 때만 표시 */}
          {currentPage > 1 && (
            <button
              className="j-prev-page"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              {"<"}
            </button>
          )}

          {(() => {
            const pageNumbers = [];
            const maxPages = 5;
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + maxPages - 1);

            if (endPage - startPage + 1 < maxPages) {
              startPage = Math.max(1, endPage - maxPages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`j-page-number ${
                    currentPage === i ? "active" : ""
                  }`}
                >
                  {i}
                </button>
              );
            }
            return pageNumbers;
          })()}

          {/* > 버튼은 현재 페이지가 총 페이지 수보다 작을 때만 표시 */}
          {currentPage < totalPages && (
            <button
              className="j-next-page"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              {">"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDebateModal;
