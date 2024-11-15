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
    // other designs...
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState("픽업");

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
        <div className="user-cake-audition-board-list">
          <form className="user-cake-audition-main">
            <h1 className="user-cake-audition-title">
              원하는 케이크를 등록하세요
            </h1>

            {/* 주문 정보 입력 섹션 */}
            <div className="user-cake-audition-form-group">
              <label htmlFor="order">제목</label>
              <input
                type="text"
                id="order"
                placeholder="예: 생일 파티용 케이크 만들어 주세요."
                className="user-audition-input-text"
              />
            </div>

            <div className="user-cake-audition-form-group">
              <label htmlFor="price">가격</label>
              <input
                type="text"
                id="price"
                placeholder="예: 35,000원"
                className="user-audition-input-text"
              />
            </div>
            <div className="user-cake-audition-form-group">
              <label htmlFor="style">사이즈</label>
              <input
                type="text"
                id="style"
                placeholder="예: 12cm"
                className="user-audition-input-text"
              />
            </div>

            {/* 수령방식 */}
            <div className="user-cake-audition-form-group">
              <label htmlFor="receiveHow">수령방식</label>
              <select
                id="receiveHow"
                className="user-audition-input-text"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="픽업">픽업</option>
                <option value="배송">배송</option>
              </select>
            </div>

            {/* Conditional Rendering for Pickup or Delivery */}
            {deliveryMethod === "픽업" ? (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="PickupDate">희망 픽업일</label>
                  <input
                    type="date"
                    id="PickupDate"
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="PickupTime">희망 픽업 시간</label>
                  <select id="PickupTime" className="user-audition-input-text">
                    <option value="">시간 선택</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    {/* other times */}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="DesiredDeliveryDate">희망 수령일</label>
                  <input
                    type="date"
                    id="DesiredDeliveryDate"
                    className="user-audition-input-text"
                  />
                </div>
                <div className="user-cake-audition-form-group">
                  <label htmlFor="DesiredDeliveryTime">희망 수령 시간</label>
                  <select
                    id="DesiredDeliveryTime"
                    className="user-audition-input-text"
                  >
                    <option value="">시간 선택</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    {/* other times */}
                  </select>
                </div>
              </>
            )}

            {/* 요청사항 */}
            <div className="user-cake-audition-form-group">
              <label htmlFor="requests">요청사항</label>
              <textarea
                id="requests"
                placeholder="케이크의 컨셉, 색상, 디자인 요소 등 원하는 내용을 자세히 적어주세요."
                className="user-audition-input-text"
                rows="4"
              ></textarea>
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

      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default UserAuditionAdd;
