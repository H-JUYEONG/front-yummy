import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";

import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/user/userMainForm.css";
import storeLogo from "../../assets/images/cake-logo1.png"; // 매장 로고 이미지
import mapImg from "../../assets/images/서울시 구 지도.png";

import {
  FaBirthdayCake,
  FaMapMarkerAlt, // 지도 아이콘
} from "react-icons/fa";

AOS.init();

const Main = () => {
  const navigate = useNavigate();
  // 상품 리스트 컨테이너의 ref
  const productListRef = useRef(null);
  //구 카테고리
  const [selectedRegion, setSelectedRegion] = useState("");

  //상품 카테고리
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortOrder, setSortOrder] = useState("rating");
  const [sortDirection, setSortDirection] = useState("desc");
  const [productList, setProductList] = useState([]); // 상품 데이터를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 12; // 페이지당 상품 개수
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    // 상품 데이터를 가져오는 API 호출
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/allList`);
        console.log("Fetched Products:", response.data); // 확인용 로그
        const data = Array.isArray(response.data) ? response.data : [];
        setProductList(data); // 배열만 상태로 설정
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchProducts();
  }, []);

  const Banner = () => (
    <div className="banner">
      <h1>세상에 하나뿐인 케이크</h1>
      <p>당신만의 특별한 순간을 케이크로 만들어 드립니다</p>
      <button
        className="create-cake-btn"
        onClick={() => navigate("user/audition/board")}
      >
        Let's GO
      </button>
    </div>
  );

  // 클릭된 구의 이름을 처리할 함수
  const handleClick = (guName) => {
    alert(`${guName}이 클릭되었습니다!`);
    setSelectedRegion(guName);
  };

  const mapList = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((star, index) => (
            <span key={`full-${index}`} style={{ color: "#FFD700" }}>
              {star}
            </span>
          ))}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} style={{ color: "#FFD700" }}>
              {star}
            </span>
          ))}
      </>
    );
  };

  const filteredProducts = productList
    .filter((product) => {
      const matchesRegion = selectedRegion
        ? product.district === selectedRegion
        : true;

      const matchesCategory =
        selectedCategory === "" || selectedCategory === "전체"
          ? true
          : product.optionValueName.trim() === selectedCategory.trim();
      // vender_id 73을 제외
      const excludeVender = product.venderId !== 73;

      return matchesRegion && matchesCategory && excludeVender;
    })
    .sort((a, b) => {
      if (sortOrder === "rating") {
        const ratingA = parseFloat(a.reviewRating) || 0; // reviewRating이 숫자인지 확인
        const ratingB = parseFloat(b.reviewRating) || 0;
        return sortDirection === "asc" ? ratingA - ratingB : ratingB - ratingA;
      } else if (sortOrder === "price") {
        const priceA = parseFloat(a.price) || 0; // price가 숫자인지 확인
        const priceB = parseFloat(b.price) || 0;
        return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
      }
      return 0;
    });


  const handleSort = (order) => {
    if (sortOrder === order) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOrder(order);
      setSortDirection("desc");
    }
  };

  const categories = [
    "전체",
    "도시락 케이크",
    "일반 케이크",
    "떡 케이크",
    "반려동물 케이크",
  ];

  // 페이징 관련 데이터
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Header />
      <div id="user-wrap" className="text-center userMainFormContainer">
        <div className="banner">
          <Banner />
        </div>
        <div className="main-wrap">
          <div
            className="map-box aos-init"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <h3 className="sy-user-main-title">위치 찾기</h3>
            <div className="map-img-box">
              <div className="map-img">
                <p>지도에서 원하시는 '구'를 클릭해주세요!</p>
                <img src={mapImg} alt="지도" usemap="#seoulMap" />
              </div>
              <map name="seoulMap">
                <area
                  shape="poly"
                  target="rect"
                  coords="173,75,200,67,208,79,186,128,165,144,143,151,149,128,154,92"
                  onClick={() => handleClick("은평구")}
                  style={{ cursor: "pointer" }}
                  className={
                    selectedRegion == "은평구"
                      ? "active-region"
                      : "hover-region"
                  }
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="232,83,234,56,250,29,267,45,263,63,266,72,299,101,285,118,267,114"
                  onClick={() => handleClick("강북구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="265,8,260,24,266,36,267,64,288,83,305,65,296,20"
                  onClick={() => handleClick("도봉구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="307,21,307,79,297,92,312,108,358,103,356,78,336,20"
                  onClick={() => handleClick("노원구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="324,115,369,109,357,148,352,166,333,168"
                  onClick={() => handleClick("중랑구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="333,170,352,170,358,190,346,220,310,220,330,1844"
                  onClick={() => handleClick("광진구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="259,197,267,206,286,204,307,215,321,185,292,167"
                  onClick={() => handleClick("성동구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="275,161,320,128,316,140,329,167,311,174"
                  onClick={() => handleClick("동대문구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="234,87,267,119,283,119,301,106,315,122,289,143,271,160,246,139,229,134"
                  onClick={() => handleClick("성북구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="202,103,222,92,234,124,221,132,246,145,273,167,208,170"
                  onClick={() => handleClick("종로구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="151,158,159,151,175,149,197,124,200,158,215,177,182,188"
                  onClick={() => handleClick("서대문구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="106,163,127,149,180,189,211,188,196,207,143,192"
                  onClick={() => handleClick("마포구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="201,209,209,234,230,242,264,210,248,197,216,190"
                  onClick={() => handleClick("용산구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="215,184,218,171,270,167,270,184,257,197"
                  onClick={() => handleClick("중구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="49,122,6,193,65,204,70,195,86,222,106,216,104,195,120,194,120,185"
                  onClick={() => handleClick("강서구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="69,202,64,242,81,248,100,244,118,250,123,225,134,218,127,202,112,197,105,220,84,223"
                  onClick={() => handleClick("양천구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="67,247,58,283,93,284,111,262,143,277,129,241,115,250,99,244,77,257"
                  onClick={() => handleClick("구로구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="119,276,147,335,171,313,155,299,152,280,134,280"
                  onClick={() => handleClick("금천구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="157,278,184,335,233,308,229,289,210,282,203,270,176,268"
                  onClick={() => handleClick("관악구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="227,280,228,252,195,238,171,245,161,263,196,260,214,264,216,276"
                  onClick={() => handleClick("동작구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="146,267,165,249,170,235,192,233,188,215,132,200,139,214,126,233,138,242"
                  onClick={() => handleClick("영등포구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="237,251,260,228,281,275,299,291,315,296,333,288,346,311,325,326,303,343,285,302,266,306,251,296,238,300,232,277"
                  onClick={() => handleClick("서초구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="264,222,285,217,317,234,319,254,340,259,371,295,347,308,332,282,299,291"
                  onClick={() => handleClick("강남구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="324,233,371,209,374,222,400,240,397,249,417,258,381,294,359,261,331,254"
                  onClick={() => handleClick("송파구")}
                ></area>
                <area
                  shape="poly"
                  target="rect"
                  coords="368,202,385,171,406,172,431,157,438,200,406,218,397,231,380,222,378,206"
                  onClick={() => handleClick("강동구")}
                ></area>
              </map>

              <div className="category-map-container">
                <h3 className="icon-text">
                  <FaMapMarkerAlt className="styled-map-icon" />
                  <span className="icon-label">지역을 선택하세요</span>
                </h3>
                <div className="map-click">
                  <button
                    className={!selectedRegion ? "active" : ""}
                    onClick={() => setSelectedRegion("")}
                  >
                    전체
                  </button>
                  {mapList.map((region) => (
                    <button
                      key={region}
                      className={selectedRegion === region ? "active" : ""}
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
                <h3 className="icon-text">
                  <FaBirthdayCake className="styled-cake-icon" />
                  <span className="icon-label">카테고리를 선택하세요</span>
                </h3>
                <div className="category-box">
                  <ul>
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className={
                            selectedCategory === category ? "active" : ""
                          }
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={productListRef} className="sub-title-box">
          <div className="sort-box">
            <button onClick={() => handleSort("rating")}>
              별점순{" "}
              {sortOrder === "rating"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
            <button onClick={() => handleSort("price")}>
              가격순{" "}
              {sortOrder === "price"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          </div>
          <span>총 상품 {filteredProducts.length}개</span>
        </div>
        <div className="allList-box">
          {currentProducts.map((item) => (
            <div className="all-product-item" key={item.productId}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault(); // 기본 동작 방지
                  window.open(
                    `/user/cakedetail/${item.productId}/${item.venderId}`,
                    "_blank"
                  );
                }}
                className="list_hover_img"
              >
                <img src={item.productImage1Url} alt={item.productName} />
                <div className="store-info">
                  {/* 매장 로고 */}
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault(); // 기본 동작 방지
                      e.stopPropagation(); // 부모 클릭 이벤트 방지
                      window.open(
                        `/user/storedetail/${item.venderId}`,
                        "_blank"
                      );
                    }}
                  >
                    <img
                      src={item.venderProfileImageUrl || storeLogo}
                      alt={`${item.venderName} 로고`}
                      className="store-logo"
                    />
                  </Link>
                  {/* 매장 이름 */}
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault(); // 기본 동작 방지
                      e.stopPropagation(); // 부모 클릭 이벤트 방지
                      window.open(
                        `/user/storedetail/${item.venderId}`,
                        "_blank"
                      );
                    }}
                  >
                    <b>{item.venderName}</b>
                  </Link>
                </div>
              </Link>
              <div className="product-info">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault(); // 기본 동작 방지
                    e.stopPropagation(); // 부모 클릭 이벤트 방지
                    window.open(
                      `/user/cakedetail/${item.productId}/${item.venderId}`,
                      "_blank"
                    );
                  }}
                >
                  <p>{item.productName}</p>
                </Link>
                <p>가격: {item.price.toLocaleString()}원</p>
                <p>
                  평점: {renderStars(item.reviewRating)} ({item.reviewRating})
                </p>
                <p>지역: {item.district} </p>
              </div>
            </div>
          ))}
        </div>
        {/* 페이징 버튼 */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Main;
