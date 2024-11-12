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
              <div className="user-cake-design-write-date">
                <p>2024.11.10 13:00:00&emsp;|</p>
                <p> 조회: 7</p>
              </div>
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

          <div id="user-cake-design-detail-box">
            <div className="user-cake-design-detail-area">
              <div id="user-cake-design-detail-imgs-area">
                {/* Image Section */}
                <div className="user-cake-designs-detail-imgs">
                  <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                  <div className="user-cake-designs-detail-sub-imgs">
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                  </div>
                </div>
              </div>

              <div id="user-cake-design-detail-txt-area">
                {/* Description Section */}
                <div className="user-cake-designs-detail-txt">
                  <h2>어떤 디자인인가요?</h2>
                  <p>
                    이 케이크는 환갑을 맞이한 분을 위한 특별한 디자인으로,
                    따뜻하고 축하의 의미가 가득 담긴 세련된 스타일의
                    케이크입니다. 케이크의 메인 색상은 부드러운 핑크빛으로,
                    사랑과 축복을 상징하는 컬러로 제작되었습니다.
                  </p>
                  <h2>어떤분들이 선호하나요?</h2>
                  <p>20~30대 여성</p>
                  <h2>추천하는 이벤트가 있나요?</h2>
                  <p>추천 행사: 환갑 잔치</p>

                  <div id="cake-design-action-btns" className="clearfix">
                    {/* Favorite Button */}
                    <div className="user-favorite-section">
                      <button className="user-favorite-button">
                        <FaRegHeart className="users-heart-icon" />
                        <span className="users-favorite-count">10</span>
                      </button>
                    </div>
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
              </div>
            </div>

            {/* Businesses Using This Design */}
            <div className="user-cakes-section">
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
            </div>

            {/* Reviews Section */}
            <div className="user-review-section">
              <h2>도안 사용 후기</h2>
              <div className="user-cake-designs-review-item">
                <div className="user-review-header">
                  <span className="user-review-email-id">dud9902****</span>
                  <span className="user-review-date">2022.10.04</span>
                </div>
                <div className="user-review-body">
                  <img
                    src="/images/2호_일반케이크.jpg"
                    alt="리뷰 이미지"
                    className="user-cake-designs-review-image"
                  />
                  <div className="user-review-text">
                    아버님 환갑이셔서 컵케이크로 준비했어요! 보내드렸더니
                    너무너무 좋아하셨어요! 그리고 전에 맛보니깐 아직도 잊
                    못하겠음요~
                    <p className="user-review-stars">★★★★★</p>
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