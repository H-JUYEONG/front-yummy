import React, { useState } from "react";
import VenderSidebar from "./include/VenderSidebar";
import { useNavigate } from "react-router-dom";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignDetail.css";

const VenderCakeDesignDetail = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState("/images/7.png"); // 기본 메인 이미지

  const handleSubImageClick = (imageSrc) => {
    setMainImage(imageSrc); // 서브 이미지를 클릭했을 때 메인 이미지 변경
  };

  return (
    <>
      <div className="vender-container">
        <div className="vender-content-wrapper">
          <VenderSidebar />
          <div className="vender-content">
            <main className="product-list-main-content">
              <section className="product-list">
                <header className="product-list-header">
                  <h2 className="product-list-title">도안 상세정보</h2>
                </header>

                <div className="cake-design-detail">
                  {/* 이미지 섹션 */}
                  <div className="cake-design-detail-imgs">
                    <img
                      src={mainImage}
                      alt="케이크 이미지"
                      className="cake-design-detail-main-img"
                    />
                    <div className="cake-design-detail-sub-imgs-wrapper">
                      <div className="cake-design-detail-sub-imgs">
                        <img
                          src="/images/1.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/1.png")}
                        />
                        <img
                          src="/images/2.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/2.png")}
                        />
                        <img
                          src="/images/3.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/3.png")}
                        />
                        <img
                          src="/images/4.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/4.png")}
                        />
                        <img
                          src="/images/5.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/5.png")}
                        />
                        <img
                          src="/images/6.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/6.png")}
                        />
                        <img
                          src="/images/7.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/7.png")}
                        />
                        <img
                          src="/images/7.png"
                          alt="케이크 이미지"
                          onClick={() => handleSubImageClick("/images/7.png")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 설명 섹션 */}
                  <div className="cake-design-detail-txt">
                    <h2>토이스토리 컨셉 도안</h2>
                    <h3>설명</h3>
                    <p style={{ whiteSpace: "pre-line" }}>
                      → 장난감 친구들과 함께하는 유쾌한 파티를 주제로 한 케이크
                      디자인. <br />
                      하단은 크림으로 마무리하고 상단에는 반짝이는 스파클링
                      장식으로 포인트!
                    </p>
                    <h3>선호하는 케이크 형태</h3>
                    <p>→ 1호 원형 케이크</p>
                    <h3>선호하는 연령대</h3>
                    <p>→ 20~30대 여성</p>
                    <h3>적용 가능 이벤트</h3>
                    <p>→ 생일</p>
                    <div className="cake-design-detail-buttons">
                      <button
                        onClick={() => navigate("/vender/cakeDesign/edit")}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => navigate("/vender/cakeDesign/list")}
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => navigate("/vender/cakeDesign/list")}
                      >
                        뒤로가기
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderCakeDesignDetail;
