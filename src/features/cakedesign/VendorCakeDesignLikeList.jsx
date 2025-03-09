import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/all.css";
import "../../assets/css/vendor/vendor.css";
import "../../assets/css/vendor/vendorCakeDesignLikeList.css";
import axios from "axios";

import VenderSidebar from "../../components/vendor/VenderSidebar";
import VenderHeader from "../../components/vendor/VenderHeader";

const VendorCakeDesignLikeList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [venderCakeDesignLikeList, setVenderCakeDesignLikeList] = useState([]);

  const handleImageClick = (cakeDesignId) => {
    navigate(`/user/cakeDesign/detail/${cakeDesignId}`);
  };

  const getCakeDesignLikeList = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/vender/cakeDesign/like/list`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json",
    })
      .then((response) => {
        console.log(response.data);

        if (response.data.result === "success") {
          setVenderCakeDesignLikeList(response.data.apiData);
        } else {
          // alert("찜한 도안이 없습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패", error);
      });
  };

  useEffect(() => {
    getCakeDesignLikeList();
  }, []);

  // 검색어에 따라 필터링된 상품 리스트
  const filteredProducts = venderCakeDesignLikeList.filter((product) =>
    product.cakeDesignTitle
      ? product.cakeDesignTitle.toLowerCase().includes(searchTerm.toLowerCase())
      : false
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
                  <h2 className="product-list-title">찜한 도안 리스트</h2>
                  <div className="button-group">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="검색어 입력"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/list")}
                    >
                      나의 도안
                    </button>
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/like/list")}
                    >
                      찜한 도안
                    </button>
                    <button
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/add")}
                    >
                      도안 등록
                    </button>
                    <button
                      className="add-button"
                      onClick={() =>
                        window.open("/user/cakeDesign/board", "_blank")
                      }
                    >
                      도안 게시판
                    </button>
                  </div>
                </header>

                <div className="cake-design-list-imgs">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((design, index) => (
                      <div key={index} className="vender-cake-design-list-box">
                        <img
                          src={design.cakeDesignImageUrl}
                          alt={design.cakeDesignTitle}
                          onClick={() => handleImageClick(design.cakeDesignId)}
                        />
                        <p className="vender-cake-design-title">
                          {design.cakeDesignTitle}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>찜한 도안이 없습니다.</p>
                  )}
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

export default VendorCakeDesignLikeList;
