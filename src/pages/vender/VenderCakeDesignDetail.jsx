import React from "react";
import VenderSidebar from "./include/VenderSidebar";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignDetail.css";

function VenderCakeDesignDetail() {
  return (
    <div className="vender-container cake-design-detail">
      <VenderSidebar />
      <div className="vender-content">
        <div className="cake-design-detail-main">
          <h1 className="cake-design-detail-title">도안 상세정보</h1>

          <div className="cake-design-detail-content">
            {/* 이미지 */}
            <div className="cake-design-detail-imgs">
              {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              <div className="cake-design-detail-sub-imgs">
                <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
                <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              </div>
            </div>

            {/* 설명 */}
            <div className="cake-design-detail-txt">
              <h2>몽환의 숲</h2>
              {/* <h3>도안 설명</h3> */}
              <p>
                설명: 꽃과 풀이 가득한 초원 위에서 밤하늘을 바라보는
                디자인입니다.
              </p>
              {/* <h3>추천 행사</h3> */}
              <p>추천 행사: 생일, 기념일</p>
              <div className="cake-design-detail-buttons">
                <button>수정</button>
                {/* 삭제는 alert 띄우기!!!!!! */}
                <button>삭제</button>
                <button>뒤로가기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenderCakeDesignDetail;
