import React, { useState } from "react";
import VenderSidebar from "./include/VenderSidebar";

import "../../assets/css/all.css";
import "../../assets/css/vender/vender.css";
import "../../assets/css/vender/venderCakeDesignAdd.css";

function VenderCakeDesignAdd() {
  const [cakeDesignName, setCakeDesignName] = useState("");
  const [cakeDesignDescription, setCakeDesignDescription] = useState("");
  const [cakeDesignEvent, setCakeDesignEvent] = useState("");

  const handleCakeDesignName = (e) => {
    setCakeDesignName(e.target.value);
  };

  const handleCakeDesignDescription = (e) => {
    setCakeDesignDescription(e.target.value);
  };

  const handleCakeDesignEvent = (e) => {
    setCakeDesignEvent(e.target.value);
  };

  return (
    <div className="vender-container cake-design-add">
      <VenderSidebar />
      <div className="vender-content">
        <form className="cake-design-main">
          <h1 className="cake-design-title">도안 등록</h1>

          <div className="cake-design-imgs">
            {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
            <img src="/images/2호_일반케이크.jpg" alt="회사 로고" />
 
          </div>
          <div className="cake-design-form-group">
            <label htmlFor="cake-design-name">제목</label>
            <input
              type="text"
              id="cake-design-name"
              placeholder="예: 몽환의 숲"
              value={cakeDesignName}
              onChange={handleCakeDesignName}
              className="input-text"
            />
          </div>

          <div className="cake-design-form-group">
            <label htmlFor="cake-design-description">설명</label>
            <textarea
              id="cake-design-description"
              placeholder="도안의 주요 특징과 콘셉트를 설명해주세요."
              value={cakeDesignDescription}
              onChange={handleCakeDesignDescription}
              className="input-text"
              rows="4" // 원하는 행 수
            />
          </div>

          <div className="cake-design-form-group">
            <label htmlFor="cake-design-event">적용 가능 이벤트</label>
            <input
              type="text"
              id="cake-design-event"
              placeholder="예: 생일, 기념일"
              value={cakeDesignEvent}
              onChange={handleCakeDesignEvent}
              className="input-text"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="cake-design-add-button">
              상품 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VenderCakeDesignAdd;
