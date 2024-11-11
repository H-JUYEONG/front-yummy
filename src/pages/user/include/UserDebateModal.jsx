import React, { useState } from 'react';
import { Search } from 'lucide-react';
import "../../../assets/css/user/userdebatemodal.css";

const UserDebateModal = ({ onSelectImage, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("찜한 상품"); // Track selected tab
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filter
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const likedProducts = [
    { id: 1, image: "/images/2호_일반케이크.jpg", name: "초코 도안", type: "product" },
    { id: 2, image: "/images/4호_골프장 케이크.png", name: "골프장 도안", type: "product" },
    { id: 3, image: "/images/4호_달걀 한판 케이크.png", name: "달걀 도안", type: "design" },
    { id: 4, image: "/images/3호_특별한케이크(달력).jpg", name: "달력 도안", type: "design" },
    { id: 5, image: "/images/2호_일반케이크.jpg", name: "도안 5", type: "design" },
    { id: 6, image: "/images/2호_일반케이크.jpg", name: "도안 6", type: "product" },
    { id: 7, image: "/images/2호_일반케이크.jpg", name: "도안 7", type: "product" },
    { id: 8, image: "/images/2호_일반케이크.jpg", name: "도안 8", type: "design" },
  ];

  const likedDesigns = [
    { id: 1, image: "/images/2호_일반케이크.jpg", name: "초코 도안", type: "product" },
    { id: 2, image: "/images/4호_골프장 케이크.png", name: "골프장 도안", type: "product" },
    { id: 3, image: "/images/4호_달걀 한판 케이크.png", name: "달걀 도안", type: "design" },
    { id: 4, image: "/images/3호_특별한케이크(달력).jpg", name: "달력 도안", type: "design" },

  ];

  const categories = ["전체", "케이크", "초콜릿", "쿠키"]; // Sample categories

  const handleImageClick = (imageUrl) => {
    onSelectImage(imageUrl);
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
            onClick={() => setSelectedTab("찜한 상품")}
          >
            찜한 상품
          </button>
          <button
            className={`j-tab ${selectedTab === "찜한 도안" ? "active" : ""}`}
            onClick={() => setSelectedTab("찜한 도안")}
          >
            찜한 도안
          </button>
        </div>

        {/* Search and Category Dropdown */}
        <div className="j-search-category-container">
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

          <div className="j-search-bar">
            <input
              type="text"
              placeholder="도안 검색"
              className="j-search-input"
            />
            <button className="j-search-button">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Product grid based on selected tab */}
        <div className="j-products-grid">
          {(selectedTab === "찜한 상품" ? likedProducts : likedDesigns).map((item) => (
            <div
              key={item.id}
              className="j-product-card"
              onClick={() => handleImageClick(item.image)}
            >
              <div className="j-product-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="j-product-info">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="j-pagination">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`j-page-number ${currentPage === page ? "active" : ""}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDebateModal;
