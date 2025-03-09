//import 라이브러리
import React from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { Link } from "react-router-dom";

//css
import "../../assets/css/all.css";
import "../../assets/css/user/usermain.css";
import "../../assets/css/user/userSignUpSuccess.css";

const UserSignUpSuccess = () => {
  return (
    <>
      {/* Header */}
      <header id="user-wrap-head">
        <Header />
      </header>
      <div id="user-wrap" className="user-text-center">
        <div className="user-signup-succ">
          <img src="/images/logo2.png" alt="회사 로고" />
          <h2>회원가입 완료</h2>
          <p>회원가입이 완료되었습니다.</p>
          <p>YUMMY의 다양한 케이크를 만나보세요.</p>
          <div id="user-goto-loginform-btn">
            <div className="user-goto-loginform">
              <Link to="/user/login" rel="noreferrer noopener">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer id="user-wrap-footer">
        <Footer />
      </footer>
    </>
  );
};
export default UserSignUpSuccess;
