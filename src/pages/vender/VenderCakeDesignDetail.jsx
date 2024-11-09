import React from "react";
import VenderSidebar from "./include/VenderSidebar";
import { useNavigate } from "react-router-dom";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignDetail.css";

const VenderCakeDesignDetail = () => {
  const navigate = useNavigate();

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
                      src="/images/2호_일반케이크.jpg"
                      alt="케이크 이미지"
                      className="cake-design-detail-main-img"
                    />
                    <div className="cake-design-detail-sub-imgs">
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                      <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                    </div>
                  </div>

                  {/* 설명 섹션 */}
                  <div className="cake-design-detail-txt">
                    <h2>몽환의 숲</h2>
                    <p>설명: 꽃과 풀이 가득한 초원 위에서 밤하늘을 바라보는 디자인입니다.</p>
                    <p>추천 행사: 생일, 기념일</p>
                    <div className="cake-design-detail-buttons">
                      <button onClick={() => navigate("/vender/cakeDesign/edit")}>수정</button>
                      <button onClick={() => navigate("/vender/cakeDesign/list")}>삭제</button>
                      <button onClick={() => navigate("/vender/cakeDesign/list")}>뒤로가기</button>
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
