import React, { useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";

// css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userCakeDesignDetail.css";

const UserCakeDesignDetail = () => {
  

  return (
    <div id="user-wrap" className="text-center">
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>

      {/* Main Content */}
      <main id="user-wrap-body" className="clearfix">
        <div className="user-cake-designs-details">
          <h1 className="user-cake-designs-title">골프장 테마 케이크 도안</h1>
          <div className="cake-designs-detail-imgs">
            {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
            <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
            <div className="cake-designs-detail-sub-imgs">
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
              <img src="/images/2호_일반케이크.jpg" alt="케이크 이미지" />
            </div>
          </div>

          {/* 설명 */}
          <div className="cake-designs-detail-txt">
            <h2>몽환의 숲</h2>
            {/* <h3>도안 설명</h3> */}
            <p>
              설명: 꽃과 풀이 가득한 초원 위에서 밤하늘을 바라보는 디자인입니다.
            </p>
            {/* <h3>추천 행사</h3> */}
            <p>추천 행사: 생일, 기념일</p>
            <div className="cake-designs-detail-buttons">
              <button>수정</button>
              {/* 삭제는 alert 띄우기!!!!!! */}
              <button>삭제</button>
              <button>뒤로가기</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="user-full-width">
        <Footer />
      </footer>
    </div>
  );
};

export default UserCakeDesignDetail;
