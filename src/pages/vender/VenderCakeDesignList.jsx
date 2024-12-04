import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignList.css";
import axios from "axios";
import VenderSidebar from "./include/VenderSidebar";
import VenderHeader from "./include/VenderHeader";

const VenderCakeDesignList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 8; // 한 페이지에 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [venderCakeDesignList, setVenderCakeDesignList] = useState([]);

  // Navigate to detail page on image click
  const handleImageClick = (cakeDesignId) => {
    navigate(`/vender/cakeDesign/detail/${cakeDesignId}`);
  };

  const getCakeDesignList = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return; // 오류가 있으면 함수 중단
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/vender/cakeDesign/list`,
      headers: { Authorization: `Bearer ${token}` },
      responseType: "json", // 수신 타입
    })
      .then((response) => {
        console.log(response.data); // 수신 데이터

        if (response.data.result === "success") {
          setVenderCakeDesignList(response.data.apiData); // 리스트 데이터 설정
        } else {
          // alert("등록된 도안이 없습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패", error);
      });
  };

  useEffect(() => {
    getCakeDesignList();
  }, []);

  // 검색어에 따라 필터링된 상품 리스트
  const filteredProducts = venderCakeDesignList.filter((design) =>
    design.cakeDesignTitle.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="vender-container">
        <div className="vender-content-wrapper">
          <VenderSidebar />
          <div className="vender-content">
            <header className="vender-header">
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
                      className="add-button"
                      onClick={() => navigate("/vender/cakeDesign/list")}
                    >
                      나의 도안
                    </button>
                    <button
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
                        <p
                          className={
                            design.cakeDesignVisibility
                              ? "visibility-public"
                              : "visibility-private"
                          }
                        >
                          {design.cakeDesignVisibility ? "공개" : "비공개"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="no-cake-design">등록된 도안이 없습니다.</p>
                  )}
                </div>

                {/* 페이징 네비게이션 */}
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`page-button ${currentPage === index + 1 ? "active" : ""
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

  );
};

export default VenderCakeDesignList;
