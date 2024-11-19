import React, { useState } from "react";
import Header from "./include/Header";
import Footer from "./include/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userauditionadd.css";

const UserAuditionAdd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // 글 제목
  const [price, setPrice] = useState(""); // 희망 가격
  const [size, setSize] = useState(""); // 희망 사이즈
  const [deliveryMethod, setDeliveryMethod] = useState("픽업"); // 수령 방식
  const [desiredDate, setDesiredDate] = useState(""); // 희망 날짜
  const [desiredTime, setDesiredTime] = useState(""); // 희망 시간
  const [recipient, setRecipient] = useState(""); // 받는 사람
  const [region, setRegion] = useState("강남구"); // 지역 구
  const [requests, setRequests] = useState(""); // 요청사항
  const [uploadedImage, setUploadedImage] = useState(null); // 이미지 업로드

  const [selectedTab, setSelectedTab] = useState("찜한 도안");
  const [likedDesigns] = useState([
    { id: 1, title: "생일 케이크 도안", image: "/images/2.png" },
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("deliveryMethod", deliveryMethod);
    formData.append("desiredDate", desiredDate);
    formData.append("desiredTime", desiredTime);
    formData.append("recipient", recipient);
    formData.append("region", region);
    formData.append("requests", requests);
    if (uploadedImage) {
      formData.append("uploadedImage", uploadedImage);
    }

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/auditions`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        responseType: "json",
      });

      if (response.data.result === "success") {
        navigate("/audition/success");
      } else {
        alert("등록 실패");
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <div id="user-wrap" className="text-center">
      <header id="user-wrap-head">
        <Header />
      </header>

      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-audition-board-list">
          <form className="user-cake-audition-main" onSubmit={handleFormSubmit}>
            <h1 className="user-cake-audition-title">
              케이크 정보를 입력해주세요!
            </h1>

            <div className="user-cake-audition-form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 생일 파티용 케이크 만들어 주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="price">가격</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="예: 35,000원"
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="size">사이즈</label>
              <input
                type="text"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="예: 12cm"
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="deliveryMethod">수령방식</label>
              <select
                id="deliveryMethod"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="user-audition-input-text"
              >
                <option value="픽업">픽업</option>
                <option value="배송">배송</option>
              </select>
            </div>

            {deliveryMethod === "픽업" ? (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredDate">희망 픽업일</label>
                  <input
                    type="date"
                    id="desiredDate"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredTime">희망 픽업 시간</label>
                  <select
                    id="desiredTime"
                    value={desiredTime}
                    onChange={(e) => setDesiredTime(e.target.value)}
                    className="user-audition-input-text"
                  >
                    <option value="">시간 선택</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredDate">희망 수령일</label>
                  <input
                    type="date"
                    id="desiredDate"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="desiredTime">희망 수령 시간</label>
                  <select
                    id="desiredTime"
                    value={desiredTime}
                    onChange={(e) => setDesiredTime(e.target.value)}
                    className="user-audition-input-text"
                  >
                    <option value="">시간 선택</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                  </select>
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="recipient">받는 사람</label>
                  <input
                    type="text"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="예: 홍길동"
                    className="user-audition-input-text"
                  />
                </div>
              </>
            )}

            <div className="user-cake-audition-form-group">
              <label htmlFor="region">구 선택</label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="user-audition-input-text"
              >
                <option value="강남구">강남구</option>
                <option value="종로구">종로구</option>
                <option value="중구">중구</option>
                <option value="용산구">용산구</option>
              </select>
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="requests">요청사항</label>
              <textarea
                id="requests"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                placeholder="케이크의 컨셉, 색상, 디자인 요소 등 원하는 내용을 적어주세요."
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

            <div className="user-audition-add">
              <button type="submit" className="user-cake-audition-add-button">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionAdd;
