//import 라이브러리
import React from "react";
import { Link } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/userSignUpSuccess.css";

const UserSignUpSuccess = () => {
  return (
    <div id="wrap" className="text-center">
      {/* Header */}
      <header id="wrap-head">
        <h1>Header 영역</h1>
      </header>

      <div className="user-signup-succ">
        {/* <img src={`${process.env.REACT_APP_API_URL}/upload/${product.imageSavedName}`} alt="회사 로고" /> */}
        <img src="/images/기브미 쪼꼬레또.jpg" alt="회사 로고" />
        <h2>회원가입 완료</h2>
        <p>회원가입이 완료되었습니다.</p>
        <p>Yummy의 다양한 케이크를 만나보세요.</p>
        <div className="user-goto-loginform">
          <Link to="#" rel="noreferrer noopener">
            로그인
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="full-width">
        <p>Footer 영역 - full-width 클래스가 적용되어 너비가 100%입니다.</p>
      </footer>
    </div>
  );
};
export default UserSignUpSuccess;
