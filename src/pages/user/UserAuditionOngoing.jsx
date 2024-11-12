import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import "../../assets/css/user/userauditionongoing.css";
import { FaStar } from "react-icons/fa";

const UserAuditionOngoing = () => {
  const navigate = useNavigate();
  const [isEnded, setIsEnded] = useState(false); // 오디션 상태 (기본값: 진행 중)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? "#FFD700" : "#ddd"} />
    ));
  };

  // 선택된 업체 정보
  const selectedCompany = {
    id: 1,
    name: "주영공주 베이커리",
    rating: 4,
    bidAmount: "39,000원",
    image: "/images/goodcake.png",
  };

  // 오디션 참가 업체 리스트
  const participatingCompanies = [
    {
      id: 1,
      name: "주영공주 베이커리",
      rating: 4,
      bidAmount: "39,000원",
      image: "/images/goodcake.png",
    },
    {
      id: 2,
      name: "황후의 베이커리",
      rating: 5,
      bidAmount: "45,000원",
      image: "/images/goodcake.png",
    },
  ];

  return (
    <div id="user-wrap" className="text-center ongoing-audition">
      <header id="user-wrap-head">
        <Header />
      </header>
      <main id="user-wrap-body" className="clearfix ongoing-content">
        <div className="user-design-header">
          <div className="user-cake-designs-title">
            <span>친구를 위한 특별한 생일 케이크 요청합니다.</span>
          </div>
          <div className="user-design-info">
            <p className="user-cake-design-write-date">2024.11.10 13:00:00</p>
            <p className="user-cake-design-hit">조회 7</p>
            <div className="user-control-section">
              {/* <button
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
              </button> */}
              <div className="toggles-status-container">
  <button
    className={isEnded ? "ended-button" : "ongoing-button"}
    onClick={() => setIsEnded(!isEnded)}
  >
    {isEnded ? "진행 중 보기" : "종료 상태 보기"}
  </button>
</div>

            </div>
          </div>
        </div>

        <div className="ongoing-main-content">
          <div className="ongoing-auction-info">
            <h2>경매 의뢰 확인</h2>
            <div className="ongoing-cake-info">
              <h3>케이크 정보</h3>
              <p>주문 번호: 102</p>
              <p>주문: 바닐라 생크림 케이크</p>
              <p>스타일: 도시락케이크</p>
              <p>가격: 35,000원</p>
              <p>수령일: 예약</p>
              <p>지역: 서울 강남구</p>
              <p>요청사항: 텍스트나 추가 설명</p>
            </div>
            <div className="ongoing-design-preview">
              <h3>예시도안</h3>
              <img src="/images/3.png" alt="예시 도안" />
              <p>친구야 생일 축하해!</p>
            </div>
          </div>

          <div className="ongoing-participating-companies">
            <h2>오디션 참가 업체</h2>
            {isEnded ? (
              // 오디션 종료 상태에서는 선택된 업체만 표시
              <div className="ongoing-company">
                <img src={selectedCompany.image} alt="선택된 케이크 이미지" />
                <div className="ongoing-company-info">
                  <p>{selectedCompany.name}</p>
                  <div className="ongoing-company-rating">
                    {renderStars(selectedCompany.rating)}
                  </div>
                  <p>제시금액: {selectedCompany.bidAmount}</p>
                </div>
              </div>
            ) : (
              // 진행 중일 때는 모든 업체를 표시
              participatingCompanies.map((company) => (
                <div key={company.id} className="ongoing-company">
                  <img src={company.image} alt="케이크 이미지" />
                  <div className="ongoing-company-info">
                    <p>{company.name}</p>
                    <div className="ongoing-company-rating">
                      {renderStars(company.rating)}
                    </div>
                    <p>제시금액: {company.bidAmount}</p>
                  </div>
                  <button className="ongoing-select-button">선택하기</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionOngoing;
