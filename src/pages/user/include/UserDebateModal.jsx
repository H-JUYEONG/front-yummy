import React, { useEffect, useState } from "react";
import { Search } from 'lucide-react';
import "../../../assets/css/user/userdebatemodal.css";
import { Link } from "react-router-dom";
import axios from "axios";


const UserDebateModal = ({ onSelectImage, onClose }) => {
  const token = localStorage.getItem("token");

  const [selectedTab, setSelectedTab] = useState("찜한 상품"); // Track selected tab default to 찜한 상품
  const [likedType, setLikedType] = useState("Product");// track the type and default to 찜한 상품 as well
  const [likedID, setLikedID] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter


/* commonly used const for list */
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [likedProducts, setLikedProducts] = useState([]);

  const [likedDesigns, setLikedDesigns] = useState([]);


  const getLikedProducts = async (page = 1) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/api/debate/debateinsert/productmodal`,
            headers: { 
                Authorization: `Bearer ${token}` 
            },
            params: {
                page: page,
                size: 8,
                keyword: searchKeyword
            },
            responseType: 'json'
        });

        if (response.data.result === "success") {
            console.log("위시리스트 데이터:", response.data.apiData);
            const products = response.data.apiData.content || [];
            const validProducts = products.filter(
                (product) => product && product.productId
            );
            setLikedProducts(validProducts);
            setTotalPages(response.data.apiData.totalPages || 1);
        } else {
            alert(response.data.message || "상품 목록 가져오기 실패");
        }
    } catch (error) {
        console.error('API Error:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
};

const getLikedDesign = async (page = 1) => {
  try {
      const response = await axios({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}/api/debate/debateinsert/designmodal`,
          headers: { 
              Authorization: `Bearer ${token}` 
          },
          params: {
              page: page,
              size: 8,
              keyword: searchKeyword
          },
          responseType: 'json'
      });

      if (response.data.result === "success") {
          console.log("위시리스트 데이터:", response.data.apiData);
          const design = response.data.apiData.content || [];
          const validDesign = design.filter(
              (design) => design && design.cake_design_id
          );
          setLikedDesigns(validDesign);
          setTotalPages(response.data.apiData.totalPages || 1);
      } else {
          alert(response.data.message || "상품 목록 가져오기 실패");
      }
  } catch (error) {
      console.error('API Error:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};



useEffect(() => {
  getLikedProducts(currentPage);
  getLikedDesign(currentPage);
  console.log(likedDesigns,toString());
  
}, [currentPage]);

// 검색 핸들러
const handleSearch = () => {
  setCurrentPage(1);
  getLikedProducts(1);
};
  



const handleImageClick = (imageUrl, likedType, likedID) => {
  console.log("Modal image click:", { imageUrl, likedType, likedID }); // Debugging log
  onSelectImage(imageUrl, likedType, likedID);
  onClose();
};

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="j-modal-container">
      <div className="j-modal-content">
        <button onClick={onClose} className="j-modal-close-btn">X</button>
        <h2>이미지 선택</h2>

        {/* Tabs for "찜한 상품" and "찜한 도안" */}
        <div className="j-tab-container">
          <button
            className={`j-tab ${selectedTab === "찜한 상품" ? "active" : ""}`}
            onClick={() => {
              setSelectedTab("찜한 상품");
              setLikedType("Product");
            }}
          >
            찜한 상품
          </button>
          <button
            className={`j-tab ${selectedTab === "찜한 도안" ? "active" : ""}`}
            onClick={() => {
              setSelectedTab("찜한 도안");
              setLikedType("Design");
            }}
          >
            찜한 도안
          </button>
        </div>

        {/* Search and Category Dropdown */}
        <div className="j-search-category-container">
          {/*
          <select
            className="j-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          */}
          <div className="j-search-bar">
            <input
              type="text"
              placeholder="검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                  }
              }}
              className="j-search-input"
            />
            <button className="j-search-button" onClick={handleSearch}>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Product grid based on selected tab */}
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
                    <img src={product.productImageUrl} alt={product.productName} />
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

        {/* Pagination */}
        <div className="j-pagination">
          <button
            className="j-prev-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            {'<'}
          </button>

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
                  className={`j-page-number ${currentPage === i ? 'active' : ''}`}
                >
                  {i}
                </button>
              );
            }
            return pageNumbers;
          })()}

          <button
            className="j-next-page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            {'>'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDebateModal;
