import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userauditionadd.css";

const UserAuditionAdd = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("찜한 도안");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [likedDesigns, setLikedDesigns] = useState([
    { id: 1, title: "생일 케이크 도안", image: "/images/2.png" },
    { id: 2, title: "생일 케이크 도안", image: "/images/2.png" },
    { id: 3, title: "생일 케이크 도안", image: "/images/2.png" },
    { id: 4, title: "생일 케이크 도안", image: "/images/2.png" },
  ]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-audition-board-list">
          <form className="user-cake-audition-main">
            <h1 className="user-cake-audition-title">
              원하는 케이크를 등록하세요
            </h1>

            {/* 주문 정보 입력 섹션 */}
            <div className="user-cake-audition-form-group">
              <label htmlFor="order">주문</label>
              <input
                type="text"
                id="order"
                placeholder="예) 바닐라 생크림 케이크"
                className="user-audition-input-text"
              />
            </div>
            <div className="user-cake-audition-form-group">
              <label htmlFor="style">스타일</label>
              <input
                type="text"
                id="style"
                placeholder="예) 도시락케이크"
                className="user-audition-input-text"
              />
            </div>
            <div className="user-cake-audition-form-group">
              <label htmlFor="price">가격</label>
              <input
                type="text"
                id="price"
                placeholder="예) 35,000원"
                className="user-audition-input-text"
              />
            </div>
            <div className="user-cake-audition-form-group">
              <label htmlFor="receiveDate">수령일</label>
              <input
                type="text"
                id="receiveDate"
                placeholder="예) 예약"
                className="user-audition-input-text"
              />
            </div>
            {/* 지역 선택 섹션 */}
            <div className="user-cake-audition-form-group">
              <label htmlFor="regionSelect">지역 선택</label>
              <select id="regionSelect" className="user-audition-input-text">
                <option>서울</option>
                <option>경기</option>
                <option>인천</option>
                <option>대전</option>
                <option>대구</option>
                <option>부산</option>
                <option>광주</option>
                <option>울산</option>
                <option>세종</option>
                <option>강원</option>
                <option>충북</option>
                <option>충남</option>
                <option>전북</option>
                <option>전남</option>
                <option>경북</option>
                <option>경남</option>
                <option>제주</option>
              </select>
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="requests">요청사항</label>
              <textarea
                id="requests"
                placeholder="텍스트나 추가 설명을 작성해 주세요."
                className="user-audition-input-text"
                rows="4"
              ></textarea>
            </div>

            {/* 탭 메뉴 */}
            <div className="user-audition-tabs">
              <button
                type="button" // 추가: type="button"으로 설정하여 새로고침 방지
                className={selectedTab === "찜한 도안" ? "active" : ""}
                onClick={() => handleTabChange("찜한 도안")}
              >
                찜한 도안
              </button>
              <button
                type="button" // 추가: type="button"으로 설정하여 새로고침 방지
                className={selectedTab === "사진 첨부" ? "active" : ""}
                onClick={() => handleTabChange("사진 첨부")}
              >
                사진 첨부
              </button>
              <button
                type="button" // 추가: type="button"으로 설정하여 새로고침 방지
                className={selectedTab === "사진 없음" ? "active" : ""}
                onClick={() => handleTabChange("사진 없음")}
              >
                사진 없음
              </button>
            </div>

            {/* 탭에 따른 내용 */}
            <div className="user-audition-design-preview">
              {selectedTab === "찜한 도안" && (
                <div className="user-audition-liked-designs">
                  {likedDesigns.map((design) => (
                    <div
                      key={design.id}
                      className="user-audition-liked-design-card"
                    >
                      <img src={design.image} alt={design.title} />
                      <p>{design.title}</p>
                    </div>
                  ))}
                </div>
              )}
              {selectedTab === "사진 첨부" && (
                <div className="user-audition-upload-section">
                  <input type="file" onChange={handleImageUpload} />
                  {uploadedImage && (
                    <div className="user-audition-uploaded-image-preview">
                      <img src={uploadedImage} alt="Uploaded" />
                    </div>
                  )}
                </div>
              )}
              {selectedTab === "사진 없음" && <p>첨부된 사진이 없습니다.</p>}
            </div>

            {/* 등록 버튼 */}
            <div className="user-audition-add">
              <button type="submit" className="user-cake-audition-add-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionAdd;
