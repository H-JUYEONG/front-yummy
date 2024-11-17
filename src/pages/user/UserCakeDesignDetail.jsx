import React, { useEffect, useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignDetail.css";

const UserCakeDesignDetail = () => {
  const navigate = useNavigate();
  const { cakeDesignId } = useParams(); // URL에서 cakeDesignId를 가져옴
  const [isFavorited, setIsFavorited] = useState(false);
  const [mainImage, setMainImage] = useState(""); // Default main image
  const [subImages, setSubImages] = useState([]); // 서브 이미지 배열
  const [cakeDesignDetail, setCakeDesignDetail] = useState([]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

  console.log("Request Data:", { isFavorited: !isFavorited });
  console.log("Token:", token);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/favorite/${cakeDesignId}`,
        { isFavorited: !isFavorited }, // 현재 상태 반대로 전송
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result === "success") {
        // 서버에서 반환된 데이터를 반영
        setIsFavorited(response.data.isFavorited);
        setCakeDesignDetail((prevDetail) => ({
          ...prevDetail,
          cakeDesignWishlistCount: response.data.updatedWishlistCount,
        }));
      } else {
        alert(response.data.message || "찜 상태를 변경하는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("찜 상태 변경 실패:", error);
      alert("찜 상태를 변경하는 중 문제가 발생했습니다.");
    }
  };

  const handleSubImageClick = (imageSrc) => {
    setMainImage(imageSrc); // Update main image when a sub-image is clicked
  };

  // 서버에서 도안 상세 정보를 가져오는 함수
  const getCakeDesignDetail = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("토큰이 없습니다. 로그인하세요.");
      navigate("/user/login");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/detail/${cakeDesignId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result === "success") {
        const detail = response.data.apiData;

        console.log(detail); // 데이터 확인 로그

        // 메인 이미지와 서브 이미지 설정
        setMainImage(detail.mainImageUrl || ""); // 메인 이미지
        setSubImages(detail.subImages || []); // 서브 이미지 배열
        setCakeDesignDetail(detail); // 도안 상세 정보 설정
        setIsFavorited(detail.isFavorited || false); // 초기 찜 상태 설정
      } else {
        alert("도안 정보를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("도안 정보 불러오기 실패:", error);
      alert("도안 정보를 가져오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    getCakeDesignDetail();
  }, [cakeDesignId]);

  return (
    <div id="user-wrap">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="user-clearfix">
        <div className="user-cake-designs-details">
          <div className="user-design-header">
            <div className="user-cake-designs-title">
              <span>{cakeDesignDetail.cakeDesignTitle || "도안 제목"}</span>
            </div>
            <div className="user-design-info">
              <p className="user-cake-design-write-date">
                {cakeDesignDetail.cakeDesignCreatedAt}
              </p>
              <p className="user-cake-design-hit">
                조회 {cakeDesignDetail.cakeDesignViewCount}
              </p>
              <p className="user-cake-design-author">
                작성자{" "}
                {cakeDesignDetail.type === "업체"
                  ? "업체"
                  : cakeDesignDetail.userNickname || "익명"}
              </p>
              <div className="user-control-section">
                <button
                  className="user-cake-edit-button"
                  onClick={() => navigate("/user/cakeDesign/edit")}
                >
                  수정
                </button>
                <button
                  className="user-cake-delete-button"
                  onClick={() => alert("삭제 기능")}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>

          <div id="user-cake-design-detail-box">
            <div className="user-cake-design-detail-area">
              <div id="user-cake-design-detail-imgs-area">
                {/* Image Section */}
                <div className="user-cake-designs-detail-imgs">
                  <img src={mainImage} alt="케이크 이미지" />
                  <div className="user-cake-designs-detail-sub-imgs">
                    {subImages.map((imageSrc, index) => (
                      <img
                        key={index}
                        src={imageSrc}
                        alt={`서브 이미지 ${index + 1}`}
                        onClick={() => handleSubImageClick(imageSrc)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div id="user-cake-design-detail-txt-area">
                {/* Description Section */}
                <div className="user-cake-designs-detail-txt">
                  <div id="detail-txt1">
                    <h2>어떤 디자인인가요?</h2>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {cakeDesignDetail.cakeDesignDescription ||
                        "도안에 대한 설명이 없습니다."}
                    </p>
                  </div>

                  <div id="detail-txt2">
                    <h2>선호하는 케이크 형태가 있나요?</h2>
                    <p>
                      {cakeDesignDetail.cakeDesignPreferredShape || "정보 없음"}
                    </p>
                  </div>

                  <div id="detail-txt3">
                    <h2>어떤분들이 선호하나요?</h2>
                    <p>
                      {cakeDesignDetail.cakeDesignPreferredAge || "정보 없음"}
                    </p>
                  </div>

                  <div id="detail-txt4">
                    <h2>추천하는 이벤트가 있나요?</h2>
                    <p>
                      {cakeDesignDetail.cakeDesignRecommendedEvent ||
                        "정보 없음"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="cake-design-action-btns" className="clearfix">
              {/* Favorite Button */}
              <div className="user-favorite-section">
                <button
                  className="user-favorite-button"
                  onClick={toggleFavorite}
                >
                  {isFavorited ? (
                    <FaHeart className="users-heart-icon" />
                  ) : (
                    <FaRegHeart className="users-heart-icon" />
                  )}
                  <span className="users-favorite-count">
                    {cakeDesignDetail.cakeDesignWishlistCount || "0"}
                  </span>
                </button>
              </div>
              <div className="user-action-buttons">
                <button
                  className="user-audition-button"
                  data-tooltip-id="audition-tooltip"
                  data-tooltip-content="이 도안으로 케이크를 만들어주실 분을 찾아보세요!"
                  onClick={() => window.open("/user/audition/add", "_blank")}
                >
                  케이크 요청하기
                </button>
                <Tooltip
                  id="audition-tooltip"
                  place="top"
                  style={{
                    fontSize: "1em",
                    backgroundColor: "#333",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "8px",
                  }}
                />
              </div>
            </div>

            {/* Reviews Section */}
            <div className="user-review-section">
              <h2>도안 사용 후기</h2>
              <div className="user-cake-designs-review-item">
                <div className="user-review-header">
                  <span className="user-review-email-id">dud9902</span>
                  <span className="user-review-date">2022.10.04</span>
                  <span className="user-review-stars">★★★★★</span>
                </div>
                <div className="user-review-body">
                  <img
                    src="/images/goodcake.png"
                    alt="리뷰 이미지"
                    className="user-cake-designs-review-image"
                  />
                  <div className="user-review-text">
                    <p className="bakery-name">달콤 베이커리</p>
                    <p className="cake-name">하늘나라 케이크</p>
                    <p className="review-content">
                      하늘 아래 푸른 초원에서 친구들과 함께하는 평화로운 장면이
                      마음에 들어 이 도안으로 케이크를 주문했어요. 케이크가 너무
                      예쁘고 포근한 느낌을 주어 가족들도 정말 좋아했습니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
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

export default UserCakeDesignDetail;
