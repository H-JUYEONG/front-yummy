import React from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignDetail.css";

const UserCakeDesignDetail = () => {
  const navigate = useNavigate();

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
              <span>친구를 위한 특별한 생일 디자인</span>
            </div>
            <div className="user-design-info">
              <p className="user-cake-design-write-date">2024.11.10 13:00:00</p>
              <p className="user-cake-design-hit">조회 7</p>
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
                  <img src="/images/3.png" alt="케이크 이미지" />
                  <div className="user-cake-designs-detail-sub-imgs">
                    <img src="/images/3.png" alt="도안 이미지" />
                    <img src="/images/3.png" alt="도안 이미지" />
                    <img src="/images/3.png" alt="도안 이미지" />
                    <img src="/images/3.png" alt="도안 이미지" />
                    <img src="/images/3.png" alt="도안 이미지" />
                    <img src="/images/3.png" alt="도안 이미지" />
                  </div>
                </div>
              </div>

              <div id="user-cake-design-detail-txt-area">
                {/* Description Section */}
                <div className="user-cake-designs-detail-txt">
                  <div id="detail-txt1">
                    <h2>어떤 디자인인가요?</h2>
                    <p style={{ whiteSpace: "pre-line" }}>
                      푸른 밤하늘 아래, 잔잔한 초원에 누워 있는 두 친구의
                      평화로운 순간이 담긴 그림입니다. 다양한 색의 작은 꽃들이
                      자연스럽게 펼쳐져 있어 따뜻하고 포근한 느낌을 줍니다. 큰
                      귀를 가진 사랑스러운 동물 캐릭터와 돌 모양의 친구가
                      함께하며 조용한 유대감을 표현합니다. 동화 속 한 장면처럼,
                      소중한 추억과 편안한 휴식을 상징하는 이 그림은 보는
                      이에게도 잔잔한 미소를 선사합니다.
                    </p>
                  </div>

                  <div id="detail-txt2">
                    <h2>어떤분들이 선호하나요?</h2>
                    <p>20~30대 여성</p>
                  </div>

                  <div id="detail-txt3">
                    <h2>추천하는 이벤트가 있나요?</h2>
                    <p>생일</p>
                  </div>

                  <div id="detail-txt4">
                    <h2>연관 키워드</h2>
                    <div id="cake-design-hash-tag-box">
                      <p className="cake-design-hash-tag">밤하늘</p>
                      <p className="cake-design-hash-tag">유성</p>
                      <p className="cake-design-hash-tag">초원</p>
                      <p className="cake-design-hash-tag">꽃밭</p>
                      <p className="cake-design-hash-tag">친구</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Businesses Using This Design */}
            {/* <div className="user-cakes-section">
              <h2>이 도안을 사용한 케이크</h2>
              <div className="user-cakes-list">
                <div className="user-cakes-item">
                  <p className="vender-use-name">달콤 베이커리</p>
                  <p className="vender-sub-txt">서울 강남구</p>
                  <p className="vender-sub-txt">★ 4.7</p>
                </div>
                <div className="user-cakes-item">
                  <p className="vender-use-name">해피 케이크</p>
                  <p className="vender-sub-txt">경기 이천시</p>
                  <p className="vender-sub-txt">★ 4.8</p>
                </div>
                <div className="user-cakes-item">
                  <p className="vender-use-name">케이크 하우스</p>
                  <p className="vender-sub-txt">경기 하남시</p>
                  <p className="vender-sub-txt">★ 4.9</p>
                </div>
              </div>
            </div> */}

            <div id="cake-design-action-btns" className="clearfix">
              {/* Favorite Button */}
              <div className="user-favorite-section">
                <button className="user-favorite-button">
                  <FaRegHeart className="users-heart-icon" />
                  <span className="users-favorite-count">10</span>
                </button>
              </div>
              <div className="user-action-buttons">
                <button
                  className="user-audition-button"
                  data-tooltip-id="audition-tooltip"
                  data-tooltip-content="이 도안으로 케이크를 만들어주실 분을 찾아보세요!"
                >
                  케이크 요청하기
                </button>
                <Tooltip
                  id="audition-tooltip"
                  place="top"
                  style={{
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
