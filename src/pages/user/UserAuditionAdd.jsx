import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./include/Header";
import Footer from "./include/Footer";
import "../../assets/css/user/userauditionadd.css";

const UserAuditionAdd = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("찜한 도안");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [likedDesigns, setLikedDesigns] = useState([
    { id: 1, title: "생일 케이크 도안", image: "/images/design1.png" },
    { id: 2, title: "돌잔치 케이크 도안", image: "/images/design2.png" },
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
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="user-audition-add-form">
          <button className="back-button" onClick={() => navigate(-1)}>
            {"< 뒤로가기"}
          </button>

          <h2>원하는 케이크를 등록하세요</h2>

          <div className="form-group">
            <label htmlFor="title">제작할 주제</label>
            <input type="text" id="title" placeholder="예) 생일 케이크" />
          </div>

          {/* 지역 선택 섹션 */}
          <div className="form-group">
            <label htmlFor="region">지역 선택</label>
            <select id="region">
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

          <div className="form-group">
            <label htmlFor="details">설명</label>
            <textarea
              id="details"
              placeholder="자세한 설명을 작성해 주세요."
            ></textarea>
          </div>

          {/* 탭 메뉴 */}
          <div className="user-audition-tabs">
            <button
              className={selectedTab === "찜한 도안" ? "active" : ""}
              onClick={() => handleTabChange("찜한 도안")}
            >
              찜한 도안
            </button>
            <button
              className={selectedTab === "사진 첨부" ? "active" : ""}
              onClick={() => handleTabChange("사진 첨부")}
            >
              사진 첨부
            </button>
            <button
              className={selectedTab === "사진 없음" ? "active" : ""}
              onClick={() => handleTabChange("사진 없음")}
            >
              사진 없음
            </button>
          </div>

          {/* 탭에 따른 내용 */}
          <div className="design-preview">
            {selectedTab === "찜한 도안" && (
              <div className="liked-designs">
                {likedDesigns.map((design) => (
                  <div key={design.id} className="liked-design-card">
                    <img src={design.image} alt={design.title} />
                    <p>{design.title}</p>
                  </div>
                ))}
              </div>
            )}
            {selectedTab === "사진 첨부" && (
              <div className="upload-section">
                <input type="file" onChange={handleImageUpload} />
                {uploadedImage && (
                  <div className="uploaded-image-preview">
                    <img src={uploadedImage} alt="Uploaded" />
                  </div>
                )}
              </div>
            )}
            {selectedTab === "사진 없음" && (
              <p>첨부된 사진이 없습니다.</p>
            )}
          </div>

          <button className="submit-button">등록하기</button>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionAdd;
