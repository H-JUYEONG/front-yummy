import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import UserSidebar from "../../pages/user/include/UserSidebar";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userwishlist.css";
import Header from "./include/Header";
import Footer from "./include/Footer";
import axios from "axios";

const UserWishList = () => {
  const token = localStorage.getItem("token");

  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 데이터 가져오기
  const fetchWishlistProducts = async (page = 1) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/wishlist/products`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          size: 6,
          style: selectedStyle,
          target: selectedTarget,
          keyword: searchKeyword,
        },
        responseType: "json",
      });

      if (response.data.result === "success") {
        console.log("위시리스트 데이터:", response.data.apiData);
        const products = response.data.apiData.content || [];
        const validProducts = products.filter(
          (product) => product && product.productId
        );
        setWishlistProducts(validProducts);
        setTotalPages(response.data.apiData.totalPages || 1);
      } else {
        alert(response.data.message || "상품 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 컴포넌트 마운트 시와 필터 변경 시 데이터 로드
  useEffect(() => {
    fetchWishlistProducts(currentPage);
  }, [currentPage, selectedStyle, selectedTarget]);

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1);
    fetchWishlistProducts(1);
  };

  // 스타일 카테고리 선택/해제 핸들러
  const handleStyleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle === style ? "" : style));
    setCurrentPage(1);
  };

  // 대상 카테고리 선택/해제 핸들러
  const handleTargetSelect = (target) => {
    setSelectedTarget((prevTarget) => (prevTarget === target ? "" : target));
    setCurrentPage(1);
  };

  return (
    <>
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap">
        <main id="user-wrap-body">
          <UserSidebar />
          <section id="user-wrap-main">
            <h2 className="user-write-main-title">찜한 상품</h2>
            <div className="wishlist-container">
              {/* 검색 바 */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="검색어를 입력해주세요."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>
                  <Search size={20} />
                </button>
              </div>

              {/* 상품 그리드 */}
              <div className="products-grid">
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((product) => (
                    <Link
                      to={`/user/cakedetail/${product.productId}`}
                      key={product.productId}
                      className="product-card"
                    >
                      <div className="product-image">
                        <img
                          src={product.productImage1Url}
                          alt={product.productName}
                        />
                      </div>
                      <div className="product-info">
                        <h3>{product.productName}</h3>
                        <p>{product.productPrice?.toLocaleString()}원</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>찜한 상품이 없습니다.</p>
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="pagination">
                <button
                  className="prev-page"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  style={{ opacity: currentPage === 1 ? 0 : 1 }}
                >
                  {"<"}
                </button>

                <div className="page-numbers">
                  {(() => {
                    const pageNumbers = [];
                    const maxPages = 5;
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(
                      totalPages,
                      startPage + maxPages - 1
                    );

                    if (endPage - startPage + 1 < maxPages) {
                      startPage = Math.max(1, endPage - maxPages + 1);
                    }

                    for (let i = startPage; i <= endPage; i++) {
                      pageNumbers.push(
                        <button
                          key={i}
                          className={`page-number ${
                            currentPage === i ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(i)}
                        >
                          {i}
                        </button>
                      );
                    }
                    return pageNumbers;
                  })()}
                </div>

                <button
                  className="next-page"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  style={{ opacity: currentPage === totalPages ? 0 : 1 }}
                >
                  {">"}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};

export default UserWishList;
